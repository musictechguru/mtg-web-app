# Rule: Interactive Question Review & Edit Protocol for course_data.json

When reviewing, editing, or authoring revision questions in `src/data/course_data.json`:

## A-Level Music Technology (9MT0) Quiz Edit Protocol
1. **Target Audience (16–18 Year Olds) & Edexcel 9MT0 Syllabus:** Write for Edexcel A-Level Music Technology (9MT0) students revising for Component 3 & Component 4. Keep language plain, direct, and studio-focused. Do not include degree-level audio engineering topics such as Mid-Side (M-S) matrix decoding, Blumlein pairs, ORTF (`17 cm / 110°`), Helmholtz resonance, or pressure-gradient transducer physics — keep stereo miking focused on **Spaced Pair (A-B)** and **Coincident Pair (X-Y)**.
2. **Short Question Stems (1 Sentence):** Cut filler words and ask directly (e.g., *"Which cable connects a studio microphone to a preamp?"*). For drag-and-drop ordering questions, state the direction explicitly (e.g., `QUIETEST at the top → LOUDEST at the bottom`) and set `top_label` and `bottom_label`.
3. **Punchy, Single-Line Answer Options (1–6 Words):** Keep every option short (~1–6 words) so it fits on a single line, and balance character lengths across all 4 options so the correct answer never stands out by length.
4. **4 Realistic Studio Options (No Duplicates, No Joke Answers, Varied Positions):** Always provide 4 options, distribute `is_true: "yes"` evenly across positions `0–3` (never leave the correct answer at index `0` on consecutive questions), never include near-duplicate options that mean the same thing, and replace silly non-studio distractors (`HDMI Cable`, `Microphone Stand`, `240 Volts`) with credible studio terms.
5. **Concise 2-Sentence Expert Explanations:** Limit explanations to 1–2 plain-English sentences (Sentence 1: *what it is*; Sentence 2: *why it matters in a studio/DAW*). Strip out university-level physics or electronics jargon (`1.228 V RMS`, `20 µPa`, `PCM`, `CMRR` equations, `multi-megohm`). **Always update both `q.expert_explanation` and the `<p>` inside `q.explanation`** (while preserving existing `<img ...>` and `<blockquote>...</blockquote>` tags).
6. **Simple A-Level Studio Maths (Zero LaTeX):** Stick to core 9MT0 rules (`120 BPM = 2 beats/sec → 500 ms quarter note → 250 ms eighth note` using **60 seconds**, never `60,000 ms`; `Octave up = ×2 Hz / Octave down = ÷2 Hz`; `44.1 kHz / 16-bit`; `6 dB per bit`; `3:1 mic rule`). Never use raw LaTeX (`$$`, `\frac`, `\text`).
7. **Review & Validation Workflow:**
   - Check existing repository images first (`public/images/`, `public/images/svg/`, `public/images/gen/`); only generate crisp studio diagrams when needed.
   - Present proposed changes and wait for explicit approval before editing `src/data/course_data.json` (unless the user explicitly authorises a batch pass).
   - Always run `node -e "JSON.parse(require('fs').readFileSync('src/data/course_data.json'))"` after editing `src/data/course_data.json`.
