# READY-TO-USE PROMPT: COMPONENT 3 QUIZ - SYNTH POP
## Copy and paste this entire prompt into your AI assistant

---

# COMPONENT 3 QUIZ GENERATION REQUEST
## Music Technology - Listening and Analysing
### Genre: SYNTH POP (1978-1985 Focus)

You are an expert Music Technology examiner creating a Component 3: Listening and Analysing exam in the **SYNTH POP** genre following the Pearson Edexcel Level 3 GCE specification.

---

## EXAM SPECIFICATIONS

**Total Marks:** 75
**Time:** 1 hour 30 minutes
**Format:** JSON Data Structure (Strictly consistent with existing App schema)

---

## SECTION A: LISTENING (40 marks)

Generate **FOUR questions** (10 marks each) featuring iconic SYNTH POP tracks.
Each question must use specific JSON types: `matching`, `multiple_choice`, `list`, `sorting`, or `short_answer`.

### Question 1: The Human League - "Don't You Want Me" (1981)
**Focus:** Drum Machines & Sequencing
- **Part (a):** Identify the drum machine used (Linn LM-1) and its synthesis method (Samples vs Analogue). (Multiple Choice)
- **Part (b):** Match sequencer terms (Quantise, Step Time, Gate Time) to their definitions. (Matching)
- **Part (c):** Short answer on the "Sterile / Robotic" production aesthetic. (List)

### Question 2: Eurythmics - "Sweet Dreams (Are Made of This)" (1983)
**Focus:** Synthesizers & Signal Flow
- **Part (a):** Identify the main synth riff characteristic (Analogue, Monophonic, Detuned). (Multiple Choice)
- **Part (b):** Match the synth component (VCO, VCF, VCA, LFO) to its function in creating the bass sound. (Matching)
- **Part (c):** Identify effects used on the vocals (Close mic, Plate Reverb, Double Tracking). (List)

### Question 3: New Order - "Blue Monday" (1983)
**Focus:** Sampling & Rhythm
- **Part (a):** Identify the playing technique/programming of the kick drum (Stutter / rapid re-triggering). (Multiple Choice)
- **Part (b):** Identify sources of samples used (e.g., Orchestral Hit, Choir). (List)
- **Part (c):** Select common issues with early samplers (Low bit-rate, Limited memory, Aliasing). (Multi-Select)

### Question 4: Depeche Mode - "Just Can't Get Enough" (1981)
**Focus:** Texture & Production
- **Part (a):** Categorise statements into "Monophonic Synth" vs "Polyphonic Synth" characteristics. (Sorting)
- **Part (b):** Identify production techniques for the "Pop" vocal sound (Bright EQ, Compression, Short Delay). (Matching / List)

---

## SECTION B: EXTENDED RESPONSES (35 marks)

### Question 5: Comparative Analysis (15 marks)
**Track A:** Gloria Jones - "Tainted Love" (1964 - Soul/Northern Soul)
**Track B:** Soft Cell - "Tainted Love" (1981 - Synth Pop)
**Task:** Comparative Cloze Test (15 blanks).
Contrast the production approaches:
- **Rhythm:** Live Drum Kit vs Electronic Drum Machine (Kik/Snare vs Synthetic Punch).
- **Bass:** Electric Bass vs Synthesized Bass (Continuous vs Sequenced/Staccato).
- **Instrumentation:** Brass/Strings vs Synths/Samples.
- **Vocal:** Soulful/Belting vs Detached/Deadpan.
- **Ambience:** Live Room vs Artificial Reverb/Gated effects.

### Question 6: Synthesis & Signal Processing (20 marks)
**Track:** Kraftwerk - "The Model" (or "The Robots")
**Topic:** Vocoders & Electronic Production
- **Part (a):** Reconstruct the signal path of a **Vocoder** (Modulator vs Carrier). (Ordering - 4 marks)
- **Part (b):** Cloze text analysing the "Man-Machine" concept and the use of technology to dehumanize the voice. (6 marks)
- **Part (c):** Extended Essay / 10-point checklist comparisons of Analogue vs Digital recording workflows in the early 80s. (10 marks)

---

## JSON OUTPUT FORMAT
Please output the exam content in the following JSON structure (do not include markdown fencing around the JSON if possible, or keep it clean):

```json
{
    "examTitle": "Component 3: Synth Pop (1978-1985)",
    "timeLimitMinutes": 90,
    "sections": [
        {
            "id": "A",
            "title": "Section A: Listening & Analysing",
            "marks": 40,
            "questions": [
                {
                    "id": "q1",
                    "title": "Question 1",
                    "totalMarks": 10,
                    "track": {
                        "artist": "The Human League",
                        "title": "Don't You Want Me",
                        "year": 1981,
                        "filename": "Music/C3_SYNTHPOP/Q1_C3_DontYouWantMe.mp3"
                    },
                    "parts": [
                        {
                            "id": "a",
                            "type": "multiple_choice",
                            "marks": 1,
                            "question": "...",
                            "options": ["...", "..."],
                            "answer": "...",
                            "rationale": "..."
                        }
                        // ... other parts
                    ]
                }
                // ... Q2, Q3, Q4
            ]
        },
        {
            "id": "B",
            "title": "Section B: Extended Response",
            "marks": 35,
            "questions": [
                {
                    "id": "q5",
                    "title": "Question 5",
                    "totalMarks": 15,
                    "track": {
                        "artist": "Comparison",
                        "title": "Tainted Love (1964) vs Tainted Love (1981)",
                        "year": "1964/1981",
                        "filename": "Music/C3_SYNTHPOP/Q5_C3_TaintedLove_Synth.mp3",
                        "compareFilename": "Music/C3_SYNTHPOP/Q5_C3_TaintedLove_Soul.mp3"
                    },
                    "parts": [
                        {
                            "id": "a",
                            "type": "cloze",
                            "marks": 15,
                            "question": "Complete the comparison...",
                            "text": ["..."],
                            "options": [[]],
                            "answer": [],
                            "rationale": "..."
                        }
                    ]
                },
                {
                    "id": "q6",
                    // ... Vocoder Ordering & Cloze
                }
            ]
        }
    ]
}
```
