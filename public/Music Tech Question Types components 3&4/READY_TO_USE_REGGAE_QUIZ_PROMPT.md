# READY-TO-USE PROMPT: COMPONENT 3 QUIZ - REGGAE
## Copy and paste this entire prompt into your AI assistant

---

# COMPONENT 3 QUIZ GENERATION REQUEST
## Music Technology - Listening and Analysing
### Genre: REGGAE & DUB

You are an expert Music Technology examiner creating a Component 3: Listening and Analysing exam in the **REGGAE** genre following the Pearson Edexcel Level 3 GCE specification.

---

## EXAM SPECIFICATIONS

**Total Marks:** 75
**Time:** 1 hour 30 minutes
**Structure:**
- Section A: 40 marks (4 questions × 10 marks each)
- Section B: 35 marks (1 question × 15 marks + 1 question × 20 marks)

---

## SECTION A REQUIREMENTS (40 marks)

Create **FOUR questions** (10 marks each) featuring different REGGAE/DUB tracks from the 1970s-1980s. Each question should use a different question type combination from the following:

### Question Type Reference:

**Type 1: Identification - Multiple Items** (2-4 marks)
- "Identify [X] effects/instruments..."
- 1 mark per correct answer

**Type 2: Single Process/Solution** (1 mark)
- "Identify ONE process/technique..."

**Type 3: Multiple Choice** (1 mark)
- Technical parameters (e.g., Delay time, Reverb type)
- 4 options (A, B, C, D)

**Type 4A: Visual - EQ/Control Drawing** (2 marks)
- Draw settings on control diagrams (e.g., Filter curve for Dub Bass)

**Type 4B: Visual - Musical Notation** (2 marks)
- Complete/draw missing notes on grid (e.g., "One Drop" drum pattern)

**Type 5: Problem + Solutions** (3 marks total)
- Part (i): Identify problem (e.g., Tape Hiss, Spill) (1 mark)
- Part (ii): Identify 2 solutions (2 marks)

**Type 6: Short Technical Description** (2-4 marks)
- Describe delay feedback/spring reverb

**Type 7: Change/Comparison** (1-3 marks)
- Part (i): Describe change (1 mark)
- Part (ii): How to recreate in DAW (2 marks)

**Type 8: How Equipment Works** (4 marks)
- Technical explanation (e.g., Spring Reverb, Tape Echo mechanics)

**Type 9: Technology Impact** (3 marks)
- "How does [technology] affect the sound?"

**Type 10: Historical Evolution** (6 marks)
- Compare Analogue Dub vs Digital Dub

**Type 11: Historical Technique** (4 marks)
- Explain 2 ways [effect] was achieved in [year]

---

### SECTION A STRUCTURE TEMPLATE:

**Question 1:** [Reggae Track 1] - 10 marks
(Use typical Reggae Q types: Identify Instrument + Choice + List)

**Question 2:** [Reggae Track 2] - 10 marks
(Use typical Dub Q types: Choice + Ordering Signal Path + Drawing EQ)

**Question 3:** [Reggae Track 3] - 10 marks
(Use types: Multi-select + List differences)

**Question 4:** [Reggae Track 4] - 10 marks
(Use types: Choice + Sorting)

---

## SECTION B REQUIREMENTS (35 marks)

### Question 5: Comparative Analysis (15 marks)

Compare TWO versions of the same REGGAE/DUB song - ideally an original vocal version vs the Dub B-side version.

**Format:**
```
Track 5: [Artist] - [Song Title] (Vocal Version)
and
Track 6: [Artist] - [Song Title] (Dub Version)

Evaluate the production techniques used in typical Dub remixes compared to their original tracks.

Your response may consider:
• Use of mixing desk as an instrument
• Removal of vocals/instruments
• Application of Delay and Reverb effects
• EQ and Bass enhancement
• Dynamic processing
• Use of Samples/Sound Effects
```

**Marking:** AO3 (5 marks) + AO4 (10 marks)
**Must include:**
- Indicative content table
- Focus on "Dub" techniques: King Tubby / Lee Scratch Perry style remixing (dropping faders, sending sends to tape echo, spring reverb).
- Level descriptors.

---

### Question 6: Effect Analysis + Historical Development (20 marks)

Analyze ONE specific effect's use in a REGGAE track + its historical development.

**Suggested effects for Reggae/Dub:**
- **Spring Reverb** (The "splashy" sound on snares/guitars)
- **Tape Delay / Space Echo** (Roland RE-201)
- **Phasing** (Lee Perry's Black Ark sound)
- **Filter Sweeps** (High Pass on Hi-Hats)

**Format:**
```
Track 7: [Artist] - [Reggae Song] ([Year])

This song uses [effect].

Evaluate:
• The use of [effect] within this song
• The development of [effect/technology] from the 1960s through to the present day
```

**Marking:**
- Part 1 (Song analysis): ~8-10 marks
- Part 2 (Historical development): ~12-15 marks

---

## TRACK SELECTION GUIDELINES FOR REGGAE

**Essential REGGAE production characteristics:**
- **Drums:** "One Drop" rhythm (Kick/Snare on beat 3), high-tuned snare (timbales sound).
- **Bass:** Deep, heavy sub-bass (often rolled off treble), melodic lines.
- **Guitar:** "Skank" rhythm (chops on off-beats), clean or slight drive.
- **Organ:** Bubble shuffle (Hammond/Lowrey).
- **Effects:** Heavy use of Tape Echo (triplets/feedback), Spring Reverb, Phaser.
- **Mixing:** "Dub" mixing technique - actively manipulating faders and sends during the mixdown.

**Suggested REGGAE tracks:**
- Bob Marley - Exodus / Jamming / Three Little Birds
- The Upsetters / Lee Scratch Perry - Super Ape (Dub)
- King Tubby - A Murderous Dub
- Augustus Pablo - King Tubby Meets Rockers Uptown
- Toots and the Maytals - 54-46 Was My Number
- Black Uhuru - Sponji Reggae
- UB40 - Red Red Wine (for 80s digital comparison)

---

## OUTPUT JSON FORMAT

Please generate the JSON output matching this schema EXACTLY:

```json
{
    "id": "c3_reggae",
    "title": "Component 3: Listening and Analysing - REGGAE",
    // ... Copy standard fields
    "totalMarks": 75,
    "timeLimitMinutes": 90,
    "description": "Examination of Reggae and Dub production techniques (1970-1985).",
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
                    "track": { "artist": "...", "title": "...", "year": 197X, "filename": "Music/C3_REGGAE/Q1_C3_Filename.mp3" },
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
                            "pairs": [ { "item": "A", "match": "B" } ], // Use 'pairs' schema
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
                        "title": "Vocal vs Dub",
                        "year": "197X",
                        "filename": "Music/C3_REGGAE/Q5_C3_Vocal.mp3",
                        "compareFilename": "Music/C3_REGGAE/Q5_C3_Dub.mp3"
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
                    "track": { "artist": "...", "title": "...", "year": 19XX, "filename": "Music/C3_REGGAE/Q6_C3_Filename.mp3" },
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
