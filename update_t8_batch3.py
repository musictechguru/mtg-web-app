import json

def update_t8_batch3():
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
        "Q7: Question 7",
        "If applying 'Dithering' to a final digital master, where in the processing chain must it exclusively reside?",
        [
            {"text": "As the absolute first plugin", "is_true": False},
            {"text": "As the absolute final step in the entire chain, directly after the volume Limiter", "is_true": True},
            {"text": "Exactly before the final compressor", "is_true": False},
            {"text": "Only applied to the bass track", "is_true": False}
        ],
        "Dither is low-level noise added to audio to prevent quantization errors when reducing bit depth. If you add EQ or compression after dither, you destroy that delicate mathematical noise floor.",
        "Dithering is the absolute final coat of wax on your car. If you apply the wax and then start sanding the paint again, you have ruined everything.",
        "Bob Ludwig",
        "t8_q7_dithering_chain_hq"
    ))

    questions.append(make_q(
        "Q8: Question 8",
        "When mastering a highly sibilant vocal mix, what specific EQ cut is often carefully employed?",
        [
            {"text": "A massive aggressive 20dB cut at 100Hz", "is_true": False},
            {"text": "A highly precise, subtle musical cut carefully placed around the extremely harsh 6kHz to 8kHz range", "is_true": True},
            {"text": "A severe sweeping boost directly at 20Hz", "is_true": False},
            {"text": "Removing all high frequency treble", "is_true": False}
        ],
        "Mastering EQ puts the overall tonal balance in check. Sibilance ('S' sounds) fiercely exists between 5k and 8k. A gentle, wide dynamic EQ cut here smooths out the vocal without killing the track's fundamental brightness.",
        "Mastering is surgery with a butter knife. You cannot aggressively chop out a lead vocal's harshness without accidentally butchering the beautiful crash cymbals sitting right next to it in the exact same stereo frequency space.",
        "Bernie Grundman",
        "t8_q8_sibilance_mastering_hq"
    ))

    questions.append(make_q(
        "Q9: Question 9",
        "How much specific gain reduction (compression) is typically considered appropriate during professional Mastering?",
        [
            {"text": "An aggressive 20dB to 30dB specifically", "is_true": False},
            {"text": "A very gentle, subtle 1dB to 3dB specifically designed perfectly to 'glue' the mix together", "is_true": True},
            {"text": "Exactly zero compression entirely ever", "is_true": False},
            {"text": "It specifically requires a massive 50dB", "is_true": False}
        ],
        "Mastering compression is about musical 'glue', thickness, and density, not aggressive sudden volume leveling. Low ratios (1.5:1) and slow attacks are common to let transients pass while thickening the musical body gently.",
        "If the needle on my mastering compressor moves more than precisely 2 decibels, I immediately stop and politely ask the client to remix their song.",
        "Chris Gehringer",
        "t8_q9_mastering_compression_hq"
    ))

    questions.append(make_q(
        "Q10: Question 10",
        "To guarantee a final digital master does not distort massively when encoded to streaming MP3, what precise True Peak ceiling is standard?",
        [
            {"text": "Exactly 0.0 dBFS", "is_true": False},
            {"text": "Precisely -1.0 dBTP (True Peak)", "is_true": True},
            {"text": "+6.0 dBFS limit", "is_true": False},
            {"text": "-20.0 dBTP True Peak", "is_true": False}
        ],
        "A Limiter prevents signal from exceeding a ceiling. True Peak (dBTP) anticipates 'inter-sample peaks' that occur when digital audio is converted to analog (D/A) or transcoded to MP3. Setting the limit to -1.0 dBTP ensures safe conversion.",
        "Leave exactly 1 decibel of true peak headroom at the absolute end of the chain. Trust me, the Spotify conversion algorithm hates flat-topped clipping.",
        "Mastering Engineer",
        "t8_q10_limiter_ceiling_hq"
    ))

    with open('t8_q7_to_10.json', 'w') as f:
        json.dump(questions, f)

if __name__ == '__main__':
    update_t8_batch3()
