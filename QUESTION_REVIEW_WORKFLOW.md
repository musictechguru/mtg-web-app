# A-Level Music Technology Quiz Revision & Standardization Workflow

This Markdown instruction guide documents the exact interactive workflow for reviewing, refining, and validating questions in `src/data/course_data.json` for Edexcel A-Level Music Technology revision quizzes.

---

## 1. Core Principles & Edit Protocol (16–18 A-Level Music Tech)

### A. Question & Distractor Guidelines
1. **Target Audience & Syllabus Relevance**: Write for **16–18 year old Edexcel A-Level Music Technology (9MT0)** students revising for Component 3 & Component 4. Keep language plain, direct, and studio-focused. Stick strictly to the Edexcel 9MT0 A-Level syllabus: do not include degree-level audio engineering topics such as Mid-Side (M-S) matrix decoding, Blumlein pairs, ORTF (`17 cm / 110°`), Helmholtz resonance, or pressure-gradient transducer physics (keep stereo miking focused on **Spaced Pair (A-B)** and **Coincident Pair (X-Y)**).
2. **Short Question Stems (1 Sentence)**:
   - Cut filler words and ask directly (e.g., *"Which cable connects a studio microphone to a preamp?"*).
   - For drag-and-drop ordering questions, state direction explicitly (`QUIETEST at the top → LOUDEST at the bottom`) and set `top_label` and `bottom_label`.
3. **Punchy, Single-Line Answer Options (1–6 Words)**:
   - Keep every option under ~6 words so it scans cleanly on one line (e.g., `Boost a mic signal to line level`, `Stop plosive air bursts ('p' & 'b')`).
   - Balance character lengths across all 4 options so the right answer doesn't stand out by length.
4. **4 Realistic Studio Options (No Duplicates or Joke Answers)**:
   - Always provide **4 options** (upgrade 3-option questions).
   - Never have two near-duplicate options that mean the same thing.
   - Replace silly non-studio distractors (`HDMI Cable`, `Microphone Stand`, `240 Volts`) with credible studio terms.
5. **Simple A-Level Studio Maths (Zero LaTeX)**:
   - Stick to core 9MT0 rules (`120 BPM = 2 beats/sec → 500 ms quarter note → 250 ms eighth note` using **60 seconds**, never `60,000 ms`; `Octave up = ×2 Hz / Octave down = ÷2 Hz`; `44.1 kHz / 16-bit`; `6 dB per bit`; `3:1 mic rule`).
   - Never leave raw LaTeX (`$$`, `\frac`, `\text`) in questions or explanations.
6. **Question Titles**: Replace placeholder titles (e.g. `"Q8: Question 8"`) with descriptive, concept-focused titles (e.g. `"Q8: Kick Drum Resonant Head Placement"`).

### B. Expert Explanations & Quotes
1. **Concise 2-Sentence Explanations**: Limit explanations to **1–2 plain-English sentences** (Sentence 1: *what it is*; Sentence 2: *why it matters in a studio/DAW*). Strip out university-level physics/electronics jargon (`1.228 V RMS`, `20 µPa`, `PCM`, `CMRR` equations, `multi-megohm`).
2. **Keep Both Fields Synced**: Always update **both** `q.expert_explanation` and the `<p>` paragraph inside `q.explanation` (preserving any `<img ...>` and `<blockquote>...</blockquote>` tags) so the Expert Explanation panel always displays the updated text.
3. **Authoritative Quotes**:
   - Replace generic or placeholder quotes (e.g. *"Small improvements lead to big results"*, *"Drum Tuning"*).
   - Use quotes from authentic production standards, audio recording textbooks, or recognized engineering principles.

### C. Image Selection & Generation Policy
1. **Search Existing Pool First**:
   - Always search local repository directories first:
     - `public/images/`
     - `public/images/Dictiionary_Quiz_image_Pool/`
     - `public/images/svg/`
     - `public/images/gen/`
2. **Evaluation Criteria**:
   - Does the image accurately depict the exact concept in the question?
   - Is the visual high quality, clean, and legible?
   - If an existing image is an exact match (e.g. studio close-up of tom mics, kick drum cutaway), present it as the primary option.
3. **Generate When Necessary**:
   - If existing images are missing, low-resolution, or misleading, generate a dedicated high-resolution, modern studio diagram or infographic (16:9 aspect ratio, clean studio aesthetic).
   - When generating, copy the generated asset from the artifact temp directory into `public/images/gen/` with a clean, descriptive filename.

---

## 2. Step-by-Step Question Review Protocol

```mermaid
flowchart TD
    A["1. Read Target Question from course_data.json"] --> B["2. Audit Content & Identify Flaws"]
    B --> C["3. Search Repository for Matching Images"]
    C --> D["4. Draft Options (Option 1 vs Option 2 + Image Choices)"]
    D --> E["5. Present Options to User (STOP & AWAIT EXPLICIT APPROVAL)"]
    E --> F["6. User Provides Choice or Custom Feedback"]
    F --> G["7. Apply Approved Update to course_data.json"]
    G --> H["8. Run JSON Validation Command"]
    H --> I["9. Confirm Completion & Advance to Next Question"]
```

### **Step 1: Inspect Target Question**
Locate the question in `src/data/course_data.json`:
- `sections[1]` contains Topic Mastery Quizzes.
- Note the quiz ID (e.g. `quiz-topic-2_p1`, `quiz-topic-2_p2`), question index, and total line range.
- Examine:
  - `content` (question text)
  - `answers` (distractors and correct flag)
  - `expert_explanation`
  - `expert_quote`
  - `img` path
  - `title`

### **Step 2: Identify Deficiencies**
Check for:
- True/False questions that should be converted to multi-choice.
- Misaligned images (e.g. vocal mic linked to a kick drum question).
- Placeholder/tangential quotes or explanations.
- Overly wordy or ambiguous options.

### **Step 3: Search for Media**
Use search commands to find candidate graphics:
```bash
# Search for keyword in image directory
fd -e png -e svg -e jpg "<keyword>" public/images
```
Review the candidate images and verify clarity.

### **Step 4: Formulate Proposal Options**
Draft two structured options:
- **Option 1 (Recommended)**: Focused, modern, syllabus-aligned rephrasing with punchy, high-discrimination answers.
- **Option 2 (Faithful)**: Keeps the core spirit of the existing question, fixing only obvious grammatical flaws and distractors.
- **Image Options**: List Option A (repo diagram), Option B (repo photo), or Option C (new generation).

### **Step 5: Present to User & Wait**
> **CRITICAL RULE**: Never modify `course_data.json` before presenting the proposed options to the user and receiving explicit approval.

Format the proposal clearly:
```markdown
### Proposed Options for Review:

#### Option 1: [Concept Title] (Recommended)
- **Question**: "[Question text]"
- **Answers**:
  - A. [Answer 1] (Correct)
  - B. [Answer 2]
  - C. [Answer 3]
  - D. [Answer 4]
- **Expert Explanation**: [Clear, concept-driven explanation]
- **Quote**: "[Memorable engineering quote]" — [Author/Source]

#### Image Options:
- **Option A**: [Path and description]
- **Option B**: [Path and description]
```

### **Step 6: Execute Approved Changes**
Once the user replies with their choice:
1. Update `src/data/course_data.json` with `replace_file_content`.
   - Update `content`, `answers`, `expert_explanation`, `expert_quote`, `img`, `title`, and the formatted HTML `explanation` string (including the embedded `<img>` tag and `<blockquote>`).
2. Run JSON syntax verification immediately:
   ```bash
   node -e "JSON.parse(require('fs').readFileSync('src/data/course_data.json')) && console.log('JSON VALID')"
   ```
3. Confirm the update to the user and present the next question in sequence.

---

## 3. Progress Tracking Checklist

### **Topic 1: Sound & Audio Fundamentals**
- [x] Part 1 (`quiz-topic-1_p1`): Q1 to Q10 **(Complete)**
- [x] Part 2 (`quiz-topic-1_p2`): Q11 to Q20 **(Complete)**

### **Topic 2: Microphones**
- [x] Part 1 (`quiz-topic-2_p1`): Q1 to Q10 **(Complete)**
- [ ] Part 2 (`quiz-topic-2_p2`):
  - [ ] **Q1 (Q11 overall)**: Distance Micing in Untreated Rooms *(Pending approval)*
  - [ ] **Q2 (Q12 overall)**: Mic Pad (-20 dB) usage
  - [ ] **Q3 (Q13 overall)**: Ribbon mic care / phantom power
  - [ ] **Q4 (Q14 overall)**: Dynamic vs Condenser SPL handling
  - [ ] **Q5 (Q15 overall)**: Proximity effect
  - [ ] **Q6 (Q16 overall)**: Pop filter purpose & placement
  - [ ] **Q7 (Q17 overall)**: Stereo micing techniques (X-Y, Spaced Pair, Mid-Side)
  - [ ] **Q8 (Q18 overall)**: Snare drum top/bottom phase inversion
  - [ ] **Q9 (Q19 overall)**: Overhead mic placement (ORTF / Spaced Pair)
  - [ ] **Q10 (Q20 overall)**: Off-axis coloration and polar pattern rejection
