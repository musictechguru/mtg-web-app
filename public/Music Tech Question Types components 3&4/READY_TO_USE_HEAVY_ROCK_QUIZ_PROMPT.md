# READY-TO-USE PROMPT: COMPONENT 3 QUIZ - HEAVY ROCK
## Copy and paste this entire prompt into your AI assistant

---

# COMPONENT 3 QUIZ GENERATION REQUEST
## Music Technology - Listening and Analysing
### Genre: HEAVY ROCK / METAL (1970-1985)

You are an expert Music Technology examiner creating a Component 3: Listening and Analysing exam in the **HEAVY ROCK** genre following the Pearson Edexcel Level 3 GCE specification.

---

## EXAM SPECIFICATIONS

**Total Marks:** 75
**Time:** 1 hour 30 minutes
**Structure:**
- Section A: 40 marks (4 questions × 10 marks each)
- Section B: 35 marks (1 question × 15 marks + 1 question × 20 marks)

---

## SECTION A REQUIREMENTS (40 marks)

Create **FOUR questions** (10 marks each) featuring different HEAVY ROCK tracks from the 1970s-mid 80s era. Each question should use a different question type combination from the following:

### Question Type Reference:

**Type 1: Identification - Multiple Items** (2-4 marks)
- "Identify [X] effects/instruments..."
- 1 mark per correct answer

**Type 2: Single Process/Solution** (1 mark)
- "Identify ONE process/technique... e.g., Double Tracking"

**Type 3: Multiple Choice** (1 mark)
- Technical parameters (e.g., Microphone type, Reverb size)
- 4 options (A, B, C, D)

**Type 4A: Visual - EQ/Control Drawing** (2 marks)
- Draw settings on control diagrams (e.g., High Gain Amp EQ)

**Type 4B: Visual - Musical Notation** (2 marks)
- Complete/draw missing notes on grid (e.g., Guitar Riff rhythm)

**Type 5: Problem + Solutions** (3 marks total)
- Part (i): Identify problem (e.g., Phase cancellation, Feedback) (1 mark)
- Part (ii): Identify 2 solutions (2 marks)

**Type 6: Short Technical Description** (2-4 marks)
- Describe distortion/dynamics/ADT

**Type 7: Change/Comparison** (1-3 marks)
- Part (i): Describe change (1 mark)
- Part (ii): How to recreate in DAW (2 marks)

**Type 8: How Equipment Works** (4 marks)
- Technical explanation (e.g., Valve Amplifier Saturation, Dynamic Microphone)

**Type 9: Technology Impact** (3 marks)
- "How does [technology] affect the sound?"

**Type 10: Historical Evolution** (6 marks)
- Compare 70s Tape Saturation vs 80s High Gain Digital

**Type 11: Historical Technique** (4 marks)
- Explain 2 ways [effect] was achieved in [year]

---

### SECTION A STRUCTURE TEMPLATE:

**Question 1:** [Rock Track 1] - 10 marks
(Use typical Rock Q types: Identify Distorted Guitar + Choice + List mic types)

**Question 2:** [Rock Track 2] - 10 marks
(Use types: Choice + Ordering Signal Path (Amp Stack) + Drawing EQ)

**Question 3:** [Rock Track 3] - 10 marks
(Use types: Multi-select + List drum recording techniques)

**Question 4:** [Rock Track 4] - 10 marks
(Use types: Choice + Sorting Distortion vs Clean)

---

## SECTION B REQUIREMENTS (35 marks)

### Question 5: Comparative Analysis (15 marks)

Compare TWO versions of the same ROCK song - ideally an original 70s Classic Rock version vs a polished 80s/90s Metal cover.

**Format:**
```
Track 5: [Artist] - [Song Title] (Original Version)
and
Track 6: [Artist] - [Song Title] (Cover Version)

Evaluate the production techniques used in each version.

Your response may consider:
• Drum recording (Roomy/Led Zep vs Gated/Tight)
• Guitar Tones (Overdrive/Fuzz vs High Gain Distortion)
• Vocal processing (Dry/Plate vs Delay/Double Tracking)
• Dynamic range differences (Tape compression vs Digital Limiting)
• Stereo Width
```

**Marking:** AO3 (5 marks) + AO4 (10 marks)
**Must include:**
- Indicative content table
- Focus on Rock techniques: Miking amps (SM57), Marshall Stacks, Tape Saturation, Multi-tracking guitars.
- Level descriptors.

---

### Question 6: Effect Analysis + Historical Development (20 marks)

Analyze ONE specific effect's use in a HEAVY ROCK track + its historical development.

**Suggested effects for Heavy Rock:**
- **Distortion / Overdrive / Fuzz** (Valve amps vs Pedals)
- **Tape Flanging** (The "Jet Plane" effect on drums/entire mix)
- **Gated Reverb** (On snare drums in the 80s)
- **Double Tracking (ADT)** (Thickening guitars and vocals)

**Format:**
```
Track 7: [Artist] - [Rock Song] ([Year])

This song uses [effect].

Evaluate:
• The use of [effect] within this song
• The development of [effect/technology] from the 1960s through to the present day
```

**Marking:**
- Part 1 (Song analysis): ~8-10 marks
- Part 2 (Historical development): ~12-15 marks

---

## TRACK SELECTION GUIDELINES FOR HEAVY ROCK

**Essential ROCK production characteristics:**
- **Guitars:** Multi-tracked distorted guitars (L/R panning), Feedback, Palm Muting.
- **Amps:** Valve Amplification (Marshall, Orange, Mesa Boogie).
- **Drums:** Heavy kick, loud snare, "Room Sound" capture (John Bonham style) vs Close Miking.
- **Vocals:** High dynamic range, Belted delivery, Handheld Dynamic mics (SM58) or LDC.
- **Bass:** Often distorted/driven, played with pick for attack.
- **Technology:** 24-track tape, large format analogue consoles, outboard compression (1176).

**Suggested HEAVY ROCK tracks:**
- Led Zeppelin - Whole Lotta Love / Kashmir / Black Dog
- Black Sabbath - Paranoid / Iron Man
- Deep Purple - Smoke on the Water / Highway Star
- Van Halen - Runnin' with the Devil / Eruption (Phaser focus)
- AC/DC - Back in Black (Production purity)
- Queen - Bohemian Rhapsody (Overdubbing focus)
- Iron Maiden - The Trooper
- Aerosmith - Walk This Way

---

## OUTPUT JSON FORMAT

Please generate the JSON output matching this schema EXACTLY:

```json
{
    "id": "c3_heavyrock",
    "title": "Component 3: Listening and Analysing - HEAVY ROCK",
    // ... Copy standard fields
    "totalMarks": 75,
    "timeLimitMinutes": 90,
    "description": "Examination of Heavy Rock production techniques (1970-1985).",
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
                    "track": { "artist": "...", "title": "...", "year": 197X, "filename": "Music/C3_ROCK/Q1_C3_Filename.mp3" },
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
                        "year": "197X",
                        "filename": "Music/C3_ROCK/Q5_C3_Orig.mp3",
                        "compareFilename": "Music/C3_ROCK/Q5_C3_Cover.mp3"
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
                    "track": { "artist": "...", "title": "...", "year": 19XX, "filename": "Music/C3_ROCK/Q6_C3_Filename.mp3" },
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
