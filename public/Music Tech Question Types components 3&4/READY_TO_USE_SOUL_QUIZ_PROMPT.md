# READY-TO-USE PROMPT: COMPONENT 3 QUIZ - SOUL & MOTOWN
## Copy and paste this entire prompt into your AI assistant

---

# COMPONENT 3 QUIZ GENERATION REQUEST
## Music Technology - Listening and Analysing
### Genre: SOUL / MOTOWN (1960-1975)

You are an expert Music Technology examiner creating a Component 3: Listening and Analysing exam in the **SOUL / MOTOWN** genre following the Pearson Edexcel Level 3 GCE specification.

---

## EXAM SPECIFICATIONS

**Total Marks:** 75
**Time:** 1 hour 30 minutes
**Structure:**
- Section A: 40 marks (4 questions × 10 marks each)
- Section B: 35 marks (1 question × 15 marks + 1 question × 20 marks)

---

## SECTION A REQUIREMENTS (40 marks)

Create **FOUR questions** (10 marks each) featuring different SOUL tracks from the 1960s-1970s. Each question should use a different question type combination from the following:

### Question Type Reference:

**Type 1: Identification - Multiple Items** (2-4 marks)
- "Identify [X] effects/instruments..."
- 1 mark per correct answer

**Type 2: Single Process/Solution** (1 mark)
- "Identify ONE process/technique... e.g., Wall of Sound"

**Type 3: Multiple Choice** (1 mark)
- Technical parameters (e.g., Recording Tape Width, Reverb type)
- 4 options (A, B, C, D)

**Type 4A: Visual - EQ/Control Drawing** (2 marks)
- Draw settings on control diagrams (e.g., Passive EQ for Bass)

**Type 4B: Visual - Musical Notation** (2 marks)
- Complete/draw missing notes on grid (e.g., Bass Hook rhythm)

**Type 5: Problem + Solutions** (3 marks total)
- Part (i): Identify problem (e.g., Distortion/Spill) (1 mark)
- Part (ii): Identify 2 solutions (2 marks)

**Type 6: Short Technical Description** (2-4 marks)
- Describe Echo Chamber/DI technique

**Type 7: Change/Comparison** (1-3 marks)
- Part (i): Describe change (1 mark)
- Part (ii): How to recreate in DAW (2 marks)

**Type 8: How Equipment Works** (4 marks)
- Technical explanation (e.g., Plate Reverb, Dynamic Mic focus)

**Type 9: Technology Impact** (3 marks)
- "How does [technology] affect the sound?"

**Type 10: Historical Evolution** (6 marks)
- Compare Mono 60s Mix vs Stereo 70s Mix

**Type 11: Historical Technique** (4 marks)
- Explain 2 ways [effect] was achieved in [year]

---

### SECTION A STRUCTURE TEMPLATE:

**Question 1:** [Soul Track 1] - 10 marks
(Use typical Soul Q types: Identify Instrument (Horns) + Choice + List recording techniques)

**Question 2:** [Soul Track 2] - 10 marks
(Use types: Choice + Ordering Signal Path (Echo Chamber) + Drawing EQ)

**Question 3:** [Soul Track 3] - 10 marks
(Use types: Multi-select + List arrangement techniques)

**Question 4:** [Soul Track 4] - 10 marks
(Use types: Choice + Sorting)

---

## SECTION B REQUIREMENTS (35 marks)

### Question 5: Comparative Analysis (15 marks)

Compare TWO versions of the same SOUL song - ideally an original 1960s Motown/Stax version vs a 1980s or Modern cover.

**Format:**
```
Track 5: [Artist] - [Song Title] (Original 60s Version)
and
Track 6: [Artist] - [Song Title] (Modern/80s Cover)

Evaluate the production techniques used in typical 60s Soul recordings compared to modern interpretations.

Your response may consider:
• Mono vs Stereo Mixing
• Live constraints vs Multitrack freedom
• DI Bass vs Synth Bass
• Real Strings vs String Machines/Samples
• Dynamic Range
• Reverb (Chamber vs Digital)
```

**Marking:** AO3 (5 marks) + AO4 (10 marks)
**Must include:**
- Indicative content table
- Focus on Soul techniques: "The Sound of Young America", Berry Gordy's quality control, Funk Brothers musicianship.
- Level descriptors.

---

### Question 6: Effect Analysis + Historical Development (20 marks)

Analyze ONE specific effect's use in a SOUL track + its historical development.

**Suggested effects for Soul:**
- **Echo Chamber Reverb** (The Motown Attic)
- **Direct Injection (DI)** (James Jamerson's Bass tone)
- **Tape Saturation** (Driving the preamps hot)
- **Wall of Sound** (Phil Spector influence - Layering)

**Format:**
```
Track 7: [Artist] - [Soul Song] ([Year])

This song uses [effect].

Evaluate:
• The use of [effect] within this song
• The development of [effect/technology] from the 1950s through to the present day
```

**Marking:**
- Part 1 (Song analysis): ~8-10 marks
- Part 2 (Historical development): ~12-15 marks

---

## TRACK SELECTION GUIDELINES FOR SOUL

**Essential SOUL production characteristics:**
- **Vocals:** Call and response, lead + backing harmonies (The Supremes/Temptations).
- **Bass:** Melodic, busy, syncopated. Often recorded DI (Motown) or Ampeg B-15 (Stax).
- **Drums:** Tambourine on backbeat, snare fills, "Four on the snare" (Motown beat).
- **Guitars:** Clean, chop chords on independent beats (Steve Cropper).
- **Arrangement:** Horn sections (Stax), String sections (Motown).
- **Reverb:** Acoustic Echo Chambers (Detroit) or Plate Reverb.

**Suggested SOUL tracks:**
- The Supremes - You Can't Hurry Love / Baby Love
- The Temptations - My Girl
- Marvin Gaye - I Heard It Through The Grapevine / What's Going On
- Stevie Wonder - Superstition / Sir Duke
- Otis Redding - Sittin' On The Dock Of The Bay
- Aretha Franklin - Respect
- Sam & Dave - Soul Man
- The Four Tops - Reach Out I'll Be There

---

## OUTPUT JSON FORMAT

Please generate the JSON output matching this schema EXACTLY:

```json
{
    "id": "c3_soul",
    "title": "Component 3: Listening and Analysing - SOUL",
    // ... Copy standard fields
    "totalMarks": 75,
    "timeLimitMinutes": 90,
    "description": "Examination of Soul and Motown production techniques (1960-1975).",
    "sections": [
        {
            "id": "A",
            "title": "Section A: Listening and Analysing",
            "marks": 40,
            "questions": [
               {
                    "id": "q1",
                    "title": "Question 1",
                    "totalMarks": 10,
                    "track": { "artist": "...", "title": "...", "year": 196X, "filename": "Music/C3_SOUL/Q1_C3_Filename.mp3" },
                    "parts": [
                        {
                            "id": "a_i",
                            "type": "multiple_choice",
                            "marks": 1,
                            "question": "...",
                            "options": ["A", "B", "C", "D"],
                            "answer": "A",
                            "rationale": "..."
                        },
                         {
                            "id": "b",
                            "type": "list",
                            "marks": 2,
                            "question": "...",
                            "items": 2,
                            "markScheme": ["..."]
                        },
                        {
                            "id": "c",
                            "type": "matching",
                            "marks": 4,
                            "question": "...",
                            "pairs": [ { "item": "A", "match": "B" } ],
                            "options": ["B", "C", "D"]
                        }
                    ]
               }
               // Use standard Q structure for Q2, Q3, Q4...
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
                        "title": "Orig vs Cover",
                        "year": "196X",
                        "filename": "Music/C3_SOUL/Q5_C3_Orig.mp3",
                        "compareFilename": "Music/C3_SOUL/Q5_C3_Cover.mp3"
                    },
                    "parts": [
                         {
                            "id": "a",
                            "type": "cloze",
                            "marks": 15,
                            "question": "Comparison...",
                            "text": ["Sentence {0}", "Sentence {1}"],
                            "options": [["A","B"]],
                            "answer": ["A"],
                            "rationale": "..."
                        }
                    ]
                },
                {
                    "id": "q6",
                    "title": "Question 6",
                    "totalMarks": 20,
                    "track": { "artist": "...", "title": "...", "year": 19XX, "filename": "Music/C3_SOUL/Q6_C3_Filename.mp3" },
                    "parts": [
                        { "id": "a", "type": "ordering", "marks": 4, "question": "...", "items": [{"id":"1","content":"..."}] },
                        { "id": "b", "type": "cloze", "marks": 6, "question": "...", "text": "...", "options": [], "answer": [] },
                        { "id": "c", "type": "essay_short", "marks": 10, "question": "...", "answer": "...", "rationale": "..." }
                    ]
                }
            ]
        }
    ]
}
```
