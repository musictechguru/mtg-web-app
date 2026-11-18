# Edexcel A-Level Music Technology (9MT0) — Quiz & Practical Edit Protocol

This reference guide captures the agreed editing, UX, and syllabus standards for **Music Tech Guru** (`src/data/course_data.json` and interactive quiz components).

> **Related Files:**
> - Active agent rule: [`.agents/rules/question_review.md`](../.agents/rules/question_review.md)
> - Step-by-step review workflow: [`QUESTION_REVIEW_WORKFLOW.md`](../QUESTION_REVIEW_WORKFLOW.md)

---

## 1. Core 7-Point Quiz Edit Protocol

1. **Target Audience (16–18 Year Olds) & Strict Edexcel 9MT0 Scope:**
   - Write in plain, direct **British English** (*equalisation, analogue, synthesiser, quantised, modelled, centre, colour*).
   - Stick strictly to the **Pearson Edexcel A-Level Music Technology (9MT0)** syllabus (Components 3 & 4).
   - **Never include degree-level / out-of-scope audio engineering topics** such as Mid-Side (M-S) matrix decoding, Blumlein pairs, ORTF (`17 cm / 110°`), Helmholtz resonance, or pressure-gradient transducer physics. Keep stereo miking focused on **Spaced Pair (A-B)** and **Coincident Pair (X-Y)**.

2. **Short Question Stems (1 Sentence):**
   - Cut filler and ask directly.
   - For `drag_drop` ordering tasks, state direction explicitly in the prompt (e.g., `QUIETEST at the top → LOUDEST at the bottom`) and set `top_label` / `bottom_label` badges.
   - For `signal-flow-label` matching tasks that are **not** sequential chains, set `hide_arrows: true` so arrows are omitted.

3. **Punchy, Single-Line Answer Options (1–6 Words):**
   - Keep MCQ options concise (~1–6 words) and balanced in character length so the right answer never stands out by length.

4. **4 Realistic Studio Options (for MCQs) & Varied Answer Positions:**
   - Standard topic/practical MCQs always use **4 plausible studio options** (no duplicate meanings, no joke/non-studio distractors like `HDMI Cable` or `240 Volts`).
   - Distribute `is_true: "yes"` evenly across positions `0, 1, 2, 3` (A–D) — never leave the correct answer at index `0` for consecutive questions.

5. **Concise 1–2 Sentence Expert Explanations (Always Synced):**
   - Limit explanations to **1–2 plain-English sentences** (*Sentence 1: what it is; Sentence 2: why it matters in a studio/DAW*).
   - Strip university electronics/physics equations (`1.228 V RMS`, `20 µPa`, `CMRR` formulas, `multi-megohm`).
   - Always keep **both** `q.expert_explanation` and `q.explanation` (with `<img ...>`) synced, plus `q.img` and `q.explanation_image` pointing to a verified file in `public/images/`.

6. **Simple A-Level Studio Maths (Zero LaTeX):**
   - Use 60 seconds for BPM delay maths (`120 BPM = 2 beats/sec → 500 ms quarter note → 250 ms eighth note`, never `60,000 ms`).
   - Octave doubling/halving (`Octave up = ×2 Hz / down = ÷2 Hz`), `44.1 kHz / 16-bit`, `6 dB per bit`, `3:1 mic rule`.
   - Zero raw LaTeX (`$$`, `\frac`, `\text`).

7. **Proposal, Approval & Validation Workflow:**
   - Present proposed options to the user and wait for explicit approval before modifying `src/data/course_data.json` (unless batch-authorised).
   - Always validate JSON after editing:
     ```bash
     node -e "JSON.parse(require('fs').readFileSync('src/data/course_data.json'))"
     ```

---

## 2. Case Study True/False Cleanup Rules (e.g. *Heartbreak Hotel*)

When keeping a **Case Study** in its fast `True` / `False` format:
1. **Remove Spoiler Titles:** Never leave `(False)` or `(True)` in `q.title` (e.g., `Statement 8: Guitar Solo`, not `Statement 8: Sampling (False)`).
2. **1-Sentence British-English Statements:** Tighten multi-clause statements to 1 crisp sentence with British spellings.
3. **Strip Out-of-Scope Jargon:** Replace degree-level terms (`mid-side`, VCA circuit topology, etc.) with A-Level studio concepts.
4. **Sync `expert_explanation` & `explanation`:** Ensure every statement has a concise 1–2 sentence `expert_explanation` paired with its existing verified `explanation_image` / `img`.

---

## 3. Interactive Practical Quiz UX Standards (`MicrophonePlacementQuiz`)

- **Free Placement Anywhere (No Auto-Snap):** Keep the mic capsule at the exact `(x, y)` coordinates clicked/dragged on a locked `16:10` stage (`width: ${spot.radius * 2}%`, aspect-ratio corrected distance `Math.hypot(spot.x - pos.x, (spot.y - pos.y) / 1.6)`).
- **No Spoiler Stage Labels:** Show clean dashed target rings without text labels so students can get placements wrong.
- **Manual `0°–360°` Rotate Control + `I'm Not Sure` Reveal:** Provide `0°–360°` slider, quick vertical/horizontal presets (`↑ 0°`, `→ 90°`, `↓ 180°`, `← 270°`), on-mic drag handle, and a purple dashed **`I'm Not Sure`** button that reveals the optimal mic type, sweet spot, angle, and explanation.
