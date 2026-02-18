# Music Technology Exam Question Types
## A-Level Component 4: Producing and Analysing

This document categorizes question types from the Pearson Edexcel A-Level Music Technology exam for quiz generation purposes, based on analysis of exam papers and official mark schemes.

---

## MARKING STRUCTURE AND ASSESSMENT OBJECTIVES

### Assessment Objectives (AOs)
- **AO3:** Demonstrate knowledge and understanding of production techniques and technology
- **AO4:** Analyse, evaluate and compare recordings and production techniques

### Marking Approaches Used

**1. Point-Based Marking (1-8 marks)**
- Each criterion worth specific marks
- Can accumulate marks from different elements
- E.g., "Correct rhythm (1), F# (1), E (1), D (1), C# (1)"

**2. Levels-Based Marking (typically 0-3 marks)**
- Holistic assessment against descriptors
- Common in practical tasks
- E.g., "Level 3: No glitches, correct timing. Level 2: Slight glitches. Level 1: Intrusive glitches"

**3. Extended Response Levels (0-20 marks)**
- Split across AO3 and AO4
- Five levels with detailed descriptors
- Used for analytical/evaluative questions

### Conditional Marking
Mark schemes include conditional statements:
- "Max 3 if there are additional drums"
- "Max 4 if the kick and snare are off centre"
- "Only assess timing if not soloed/metronome left on"
- "Award 1 mark if candidate completed using other samples/sounds"

This recognizes partial credit and alternative approaches.

---

## 1. MULTIPLE CHOICE QUESTIONS (MCQs)

### 1.1 Technical Concepts
**Topics:**
- Quantization settings (1/16, 1/32, 1/8, triplets)
- Pitch intervals (semitones, octaves, perfect fifths)
- MIDI pitch bend values
- Data compression types (lossy/lossless)
- Bitrate values (kbps)
- Noise gate functionality
- Measurement units (dB, Hz, ms, V)
- RMS level behavior with signal processing

**Example Questions with Mark Scheme Rationales:**

1. **Quantize Settings**
   - "What quantize value should be used for semiquaver/16th note passages?"
     - A) 1/32 (Incorrect - could move notes more out of time)
     - B) 1/16 ✓ (Correct)
     - C) 1/8T (Incorrect - rhythm isn't triplets)
     - D) 1/8 (Incorrect - would turn semiquavers into quavers)

2. **Pitch Intervals**
   - "A pitch bend moves down by 12 semitones. What interval is this?"
     - A) A tone (Incorrect - 12 semitones is an octave, not a tone)
     - B) A perfect fifth (Incorrect - this is 7 semitones)
     - C) An octave ✓ (Correct)
     - D) Two octaves (Incorrect - would be 24 semitones)

3. **Data Compression**
   - "Which format uses lossy compression?"
     - A) Bit crusher (Incorrect - this is an effect, not data compression)
     - B) Dynamic compression (Incorrect - not a form of data compression)
     - C) AAC (Incorrect - AAC is lossy, but this wasn't the answer marked)
     - D) Lossy compression ✓ (Correct)

4. **Bitrate Selection**
   - "What is an appropriate bitrate for streaming music?"
     - A) 1 kbps (Incorrect - would create indecipherable noise)
     - B) 16 kbps (Incorrect - significant artefacts)
     - C) 64 kbps (Incorrect - noticeable artefacts)
     - D) 256 kbps ✓ (Correct - good quality, reasonable file size)

**Difficulty:** Low to Medium
**Marks:** 1 mark each
**Skills Tested:** Recognition, recall of technical terminology, understanding of distractors

---

## 2. CALCULATION AND CONVERSION QUESTIONS

### 2.1 Binary/Decimal Conversions (MIDI Data)
**Topics:**
- MIDI velocity values (0-127)
- Binary representation of decimal values
- Understanding 7-bit limitations

**Example Questions:**

**Table Completion:**
| Velocity in decimal | Velocity in binary |
|---------------------|-------------------|
| 98                  | 01100010          |
| 99 (1 mark)         | 01100011 (1 mark) |
| 95 (1 mark)         | 01011111 (1 mark) |

**Marks:** 1 mark per correct answer (4 marks total)

**Explanation Question (2 marks):**
"Explain why the maximum MIDI velocity value is 127, not 128."

**Model Answer (from mark scheme):**
- With 7 bits, there are 7 0s and 1s (1)
- 127 is 1111111 in binary (1)
- 2×2×2×2×2×2×2 / 2^7 = 128 (1)
- There are 128 combinations of 7 0s and 1s (1)
- 0 is a value too, which is why the range is 0-127, not 1-128 (1)
- For a value greater than 127, another bit would be required (1)

**Note:** This is a 2-mark question but the mark scheme shows 6 possible marking points. Candidates need any 2 valid points.

### 2.2 MIDI Timing Calculations
**Topics:**
- Bar, Beat, Division, Tick notation
- Understanding DAW timing resolution
- Precise placement calculations

**Example Question:**
"Complete the table showing the position of a note"

| Bar | Beat | Div | Tick |
|-----|------|-----|------|
| 14  | 1 (1)| 3 (1)| 161 |

**Marks:** 1 mark for Beat, 1 mark for Div (2 marks total)

### 2.3 Digital Audio File Size Calculations
**Topics:**
- Converting between mono/stereo
- Sample rate conversions (44.1 kHz, 88.2 kHz)
- Bit depth changes (16-bit, 24-bit)
- File size multiplication factors

**Example Questions:**
- "An audio file has a file size of 10 MB with properties: .wav, mono, 44.1 kHz, 16 bit. Calculate the file size if converted to stereo."
  - Answer: 20 MB (×2 for stereo)

- "Calculate the file size if converted to: .wav, stereo, 88.2 kHz, 24 bit"
  - Answer: 60 MB (×2 for stereo, ×2 for sample rate, ×1.5 for bit depth)

**Difficulty:** Low to High (depending on complexity)
**Marks:** 1-2 marks per calculation
**Skills Tested:** Mathematical reasoning, understanding of digital audio properties, binary mathematics

---

## 3. SHORT ANSWER THEORY QUESTIONS

### 3.1 Single-Word or Brief Answers (1 mark)
**Topics:**
- Identifying equipment types
- Naming effects/processes
- Technical terminology

**Example Questions from Mark Scheme:**

1. **Filter Types:**
   - "What type of filter is this?"
     - Answer: "Low pass" OR "high cut" (both acceptable)
   
2. **Tape Characteristics:**
   - "Name three characteristics of analogue tape recording"
     - Hiss (1)
     - Warm [accept any similar analogue descriptor] (1)
     - Wow and flutter (1)

3. **Compression Benefits:**
   - "Give one reason for using lossy compression for streaming"
     - Smaller file size (1)
     - Quicker upload/download speed/easier to stream (1)

**Marks:** 1 mark each
**Note:** Mark schemes often show multiple acceptable answers

### 3.2 Labeling Tasks (1-2 marks each)
**Topics:**
- Graph axes
- ADSR envelope sections
- Equipment parts

**Example Question:**
"Label the axes on this graph showing frequency response"
- X-axis: Frequency/Hertz/Hz (1)
- Y-axis: Amplitude/volume/dB/gain (1)

**Total:** 2 marks

### 3.3 Extended Description (2-4 marks)
**Topics:**
- Explaining processing decisions
- Technical specifications and their implications
- Workflow considerations

**Example Questions with Detailed Mark Schemes:**

1. **Envelope Description (7 marks total):**
   "Draw and label an ADSR envelope on the graph provided"
   
   **Marking Criteria:**
   - (i) Axes labeled: Time/s/ms (1) + Amplitude/volume/dB/gain (1)
   - (ii) Envelope shape:
     - Attack almost instant or instant (1)
     - Decay must decay in some way (1)
     - Sustain could be any length, but must be flat and equal/lower to diagram (1)
     - Release almost instant or instant (1)
   - (iii) ADSR correctly labeled (1)

2. **Processing Explanation:**
   "Describe why it is important to apply a noise gate to this style of electric guitar." (2 marks)
   
   **Expected answers:**
   - To remove unwanted noise between notes (1)
   - High gain creates hiss/buzz that needs controlling (1)
   - Keeps recording clean (1)
   
   [Award any 2 valid points]

**Difficulty:** Medium
**Marks:** 2-7 marks
**Skills Tested:** Application of knowledge, explanation skills, accurate terminology

### 3.4 Identification from Lists (1 mark)
**Topics:**
- Recognizing characteristics
- Matching descriptions to terms

**Example:**
"Which characteristic is specific to analogue tape?"
Multiple valid answers accepted according to context.

**Marking Note:** Examiners look for alternative phrasings and give credit for understanding even if exact wording differs.

---

## 4. DIAGRAM AND GRAPH QUESTIONS

### 4.1 Filter Response Graphs (HIGH STAKES)
**Topics:**
- HPF (High Pass Filter)
- LPF (Low Pass Filter)
- Filter slopes (6, 12, 24, 48 dB per octave)
- Frequency response visualization
- Cutoff frequency placement

**Detailed Marking Example (7 marks total):**

**Question:** "Draw a low-pass filter response on the graph"

**Mark Scheme Breakdown:**
1. **Curve identification:** LPF correct orientation (1)
2. **Slope:** 
   - Must be steep, not vertical
   - Steeper than 45º 
   - Must hit -20dB line
   - No resonance peak (1)
   - NOTE: Don't allow HPF by mistake
3. **Frequency placement:** LPF starts on x-axis between 2kHz-10kHz (1)
4. **Penalty:** Max 1 mark if any additional boosts or cuts present

**Additional marking for cutoff point:**
- Cutoff marked between -1dB and -5dB (specific range required)

**Common Mistakes to Penalize:**
- Vertical drop (not realistic filter response)
- Wrong frequency range
- Adding unwanted resonance
- Drawing wrong filter type (HPF instead of LPF)

### 4.2 Waveform Drawing
**Topics:**
- Basic waveforms (square, sine, sawtooth, triangle)
- Polarity inversion
- Amplitude and period labeling

**Example Questions:**
- "On the graph below, draw a square wave" (1 mark)
- "Label the axes" (2 marks - one for each axis: Time/Amplitude)
- "Label the amplitude of the wave" (1 mark)
- "Label the period of the wave" (1 mark)
- "Draw the same wave with the polarity inverted" (1 mark)

**Difficulty:** Low to Medium
**Marks:** 1-2 marks per element
**Skills Tested:** Visual representation of audio concepts

### 4.3 MIDI Piano Roll Editing (4 marks)
**Topics:**
- Note placement accuracy
- Rhythm correctness
- Visual representation of MIDI data

**Marking Criteria:**
- "1 mark for each correct beat"
- Must show correct rhythm
- Must be placed at right time position
- Visual accuracy matters

**Example:**
Bars 193-194 showing specific melodic pattern
- Each beat/bar correct = 1 mark
- Total possible: 4 marks

### 4.4 Envelope Drawing (ADSR)
**Topics:**
- Attack, Decay, Sustain, Release stages
- Time/amplitude relationship
- Realistic envelope shapes

**Detailed Marking (from mark scheme):**

**Attack:** Almost instant or instant (1)
**Decay:** Must decay in some way - cannot be flat (1)
**Sustain:** Could be any length, but must be:
- Flat (horizontal line)
- Equal to or lower than shown in reference diagram (1)
**Release:** Almost instant or instant (1)

**Additional:** Correctly labeling A, D, S, R positions (1)

**Total:** Up to 5 marks for complete envelope

**Important Note:** "Almost instant" is acceptable for instant - allows some drawing tolerance

**Difficulty:** Medium to High (3-7 marks typical)
**Skills Tested:** 
- Understanding of filter characteristics
- Graph interpretation
- Spatial reasoning
- Technical accuracy
- Following specific constraints

---

## 5. PRACTICAL DAW TASK QUESTIONS (LEVELS-BASED MARKING)

These questions use **holistic assessment** with level descriptors rather than individual mark points.

### 5.1 Audio Timing Correction (5 marks)

**Task Example:** "Correct the timing of the bass part in bars 23-25"

**Mark Scheme (from November 2021):**
```
Reference: Bass shifted late 1 semiquaver + 50ish ticks
'MS q1.wav' shows the edit for full marks

Marking criteria:
- The bass is in time during 23-24 (1)
- The bass is in time throughout all bars (1)
- The bass is playing the correct rhythm, including pitch bends in 23-24 (1)
- No glitches/changes in level at bar 23. Slight glitches must be quieter or equal to X (1)
- No glitches/changes in level at bar 25. Slight glitches must be quieter or equal to Y (1)

Conditional marking:
- If bass not soloed/metronome left on, only assess timing
- If incomplete bass track bounced, assess from Q5 mix audio; max 1 mark
```

**Key Teaching Points:**
- Tolerance for "slight" glitches if below reference level
- Different assessment if submission format is wrong
- Reference files provided showing correct solution

### 5.2 Noise Removal (3 marks - LEVELS)

**Task:** "Remove noise from vocal in bar 3 and bar 18"

**Level 3 (3 marks):**
- Hiss and breath removed without cutting any words
- No glitches
- Similar to reference 'MS q3.wav'

**Level 2 (2 marks):**
- Slight transient noise OR glitches in either bar 3 or 18

**Level 1 (1 mark):**
- Intrusive longer noise or glitches
- OR parts of vocal cut out
- OR not soloed/metronome left on

**Level 0 (0 marks):**
- No attempt to cut out noise
- OR completely silent track

### 5.3 Pitch Correction with Sample Editing (8 marks)

**Task:** "Correct pitches in bar 28 to F#, E, D, C# and copy to bars 30-31"

**Detailed Marking:**

**Pitch and Rhythm (6 marks):**
- Correct rhythm, including early beat 3 (1)
- F# (1)
- E (1)
- D (1)
- C# (1)
- Bars 30-31 match bars 28-29 (1)

**Sample Editing Quality (2 marks):**
- No clicks, not cut off, no timing issues from loose edits (1)
- No intrusive pitch artifacts, correctly panned hard left (1)
- Allow artefacts/tone changes from pitch processing

**Conditional:**
- If not soloed: assess pitch and rhythm only, not sample editing
- Award 1 mark if correct pitch/rhythm achieved using OTHER samples/sounds

### 5.4 Drum Sound Assignment (5 marks)

**Task:** "Assign MIDI notes to correct drum sounds"

**Marking:**
- 1 mark for each correctly assigned drum sound
- Must play correct rhythm
- Must stay in sync throughout

**Penalties:**
- Max 3 if additional drums present
- Max 4 if kit is unbalanced
- Max 4 if kick/snare are off-centre
- If not soloed/metronome on: assess what can be heard clearly

### 5.5 Panning Automation (2 marks - LEVELS)

**Task:** "Automate bass pan from hard left to hard right in bars 25-27, returning to center in bar 28"

**Level 2 (2 marks):**
- L → R as directed
- Hard panned (not just slight movement)
- Returns to centre correctly

**Level 1 (1 mark):**
- R → L (backwards)
- OR C → R (only half the movement)
- OR L → C (only half the movement)
- OR not hard panned (similar to reference X)
- OR glitch/click on the edit

**Level 0 (0 marks):**
- Erratic panning
- AND/OR bass in single position (not centre)
- AND/OR bass doesn't reset to centre in bar 28
- AND/OR bass panned but other parts panned noticeably off-centre
- OR no audible panning automation
- OR no mix present

### 5.6 Sidechain/Keyed Gating (3 marks - LEVELS)

**Task:** "Gate synth chords using bass as key input"

**Level 3 (3 marks):**
- Synth chords only play simultaneously with bass (keyed gate working correctly)

**Level 2 (2 marks):**
- Rhythm correct BUT gated chords too short
- OR release too long/fades
- OR glitches present

**Level 1 (1 mark):**
- Keyed gate present BUT other bars affected (not just target bars)
- OR incorrect rhythm

**Level 0 (0 marks):**
- No audible evidence of keyed gating
- OR no mix present

### 5.7 Delay/Reverb Matching (5 marks)

**Task:** "Recreate the delay on word 'coffee' at 0:16"

**Point-Based Marking:**
- Delay/reverb used (1)
- Delay is 1/4 note timing (1)
- Delay is one repeat, wet quieter than dry (1)
- Reverb added to wet signal only, not dry (1)
- Reverb time >4s with high send amount (1)

**Key Detail:** Very specific requirements for delay/reverb routing

### 5.8 Vocal Extension (5 marks)

**Task:** "Extend vocal in bar 26 to pitch C#"

**Marking:**
- Vocal extended in bar 26 (1)
- Pitch is C# (1)
- No clicks or glitches (1)
- The "D" consonant of "head" is present (1)
- The "D" of "head" is at start of bar 27 (1)

**Note:** Highly specific about timing and presence of consonants

### 5.9 Harmonized Backing Vocal Creation (8 marks)

**Task Example (November 2021):** "Create a harmonised backing vocal track in bars 28–31"

**Specific Requirements:**
- The pitch of first note in lead vocal is given (e.g., A indicated on piano roll)
- Backing vocal should use same syllables as lead vocal
- Backing vocal should be in rhythmic unison with lead vocal
- Pitch and rhythm provided in piano roll editor
- Panning requirement (e.g., pan backing vocal hard left)

**Marking Breakdown:**
- **Pitch accuracy:** Following provided piano roll correctly
- **Rhythm accuracy:** Matching lead vocal timing exactly
- **Syllable matching:** Using same words/phonemes as lead
- **Sample editing quality:** No clicks, clean edits
- **Panning:** Correctly positioned as specified
- **Overall blend:** Works with lead vocal

**Skills Required:**
- Pitch manipulation of vocal samples
- Time-stretching while maintaining pitch
- Audio editing for syllable extraction
- Phoneme matching
- Vocal doubling techniques

**Common Issues:**
- Pitch tracking artifacts
- Clicks at edit points
- Syllable mismatch (e.g., "ah" instead of "oh")
- Incorrect panning
- Timing drift from lead vocal

**Note:** This task appeared in November 2021 but not in June 2024, showing variation in practical tasks between exam sittings.

**Difficulty:** High
**Marks:** 8 marks (substantial practical task)

### 5.10 Balance and Blend (3 marks - LEVELS)

**Task:** "Balance all tracks in final mix"

**Reference information provided:**
- Bass should be quiet
- Vocals should be quiet
- Synth chords should be loudest
- Drums are MIDI

**Level 3 (3 marks):**
- Balanced and blended across all parts
- Vocals sit on top of mix
- Synth chords equal or louder than reference X

**Level 2 (2 marks):**
- Most tracks balanced with some masking
- Few misjudgements (e.g., bass under/drums under)

**Level 1 (1 mark):**
- One track barely audible (e.g., chords <= reference level)
- OR not all of a track present, affecting balance
- OR additional tracks added
- OR erratic volume changes

**Level 0 (0 marks):**
- No mix on CD
- OR not all tracks present

**Important:** Ignore previously assessed work (e.g., synth chord gating already marked)

### 5.11 Mix Presentation (3 marks - LEVELS)

**Task:** "Prepare final mix with professional presentation"

**Level 3 (3 marks):**
- Beginning/end don't cut out music or tails
- Beginning/end have <1 second silence
- Mix output near normalized with no distortion

**Level 2 (2 marks):**
- Beginning/end don't cut out BUT >1 second silence
- OR mix output too low
- OR mix is compressed
- OR slight distortion
- OR louder than reference "q5 mixed"
- OR delay/reverb/bass tail cut
- OR slightly out of sync drums (<1 bpm tempo error)

**Level 1 (1 mark):**
- Obviously chopped start/ending (not including tails)
- OR mix output unacceptably low or too high (distorted)
- OR excessive mix compression causes pumping
- OR metronome not turned off
- OR any part noticeably out of sync/tune/missing
- OR additional intrusive processing/EQ

**Level 0 (0 marks):**
- No mix present

**Important:** "IGNORE previously assessed work: e.g., bass out of sync in bars 23-24"

**Difficulty:** High (practical)
**Marks:** 1-8 marks depending on complexity
**Skills Tested:** 
- Technical proficiency
- Practical application
- Attention to detail
- Quality control
- Problem-solving

---

## 6. EXTENDED RESPONSE / EVALUATION QUESTIONS (20 MARKS)

This question type uses **five-level holistic marking** with separate assessment of AO3 (knowledge) and AO4 (analysis/evaluation).

### Assessment Split
- **AO3:** 5 marks maximum - Knowledge and understanding
- **AO4:** 15 marks maximum - Analysis, evaluation, critical judgements

### Marking Approach
**IF candidate demonstrates ONLY AO3 without any AO4:**
- Level 1 AO3 performance: 1 mark
- Level 2 AO3 performance: 2 marks
- Level 3 AO3 performance: 3 marks
- Level 4 AO3 performance: 4 marks
- Level 5 AO3 performance: 5 marks

### Full Level Descriptors

**Level 0 (0 marks):**
- No rewardable material

**Level 1 (1-4 marks):**
- **AO3:** Demonstrates limited knowledge and understanding of production techniques/technology, some of which may be misunderstood or confused
- **AO4:** Shows limited analysis and deconstruction with little attempt at chains of reasoning
- **AO4:** Makes limited evaluative/critical judgements
- **AO4:** Makes unsupported or generic conclusion from unbalanced or incoherent argument

**Level 2 (5-8 marks):**
- **AO3:** Demonstrates knowledge and understanding which are occasionally relevant but may include some inaccuracies
- **AO4:** Shows some analysis and deconstruction with simplistic chains of reasoning
- **AO4:** Makes some evaluative/critical judgements
- **AO4:** Comes to conclusion partially supported by unbalanced argument with limited coherence

**Level 3 (9-12 marks):**
- **AO3:** Demonstrates clear knowledge and understanding, mostly relevant and accurate
- **AO4:** Shows clear analysis and deconstruction with competent chains of reasoning
- **AO4:** Makes clear evaluative and critical judgements
- **AO4:** Comes to conclusion generally supported by argument that may be unbalanced or partially coherent

**Level 4 (13-16 marks):**
- **AO3:** Demonstrates detailed knowledge and understanding, relevant and accurate
- **AO4:** Shows detailed and accurate analysis and deconstruction, with logical chains of reasoning on occasion
- **AO4:** Makes detailed and valid evaluative/critical judgements
- **AO4:** Comes to conclusion largely supported by balanced argument

**Level 5 (17-20 marks):**
- **AO3:** Demonstrates sophisticated and accurate knowledge and understanding throughout
- **AO4:** Shows sophisticated and accurate analysis throughout, deconstructs with logical chains of reasoning throughout
- **AO4:** Makes sophisticated and valid evaluative/critical judgements
- **AO4:** Comes to rational, substantiated conclusion, fully supported by balanced argument drawn together coherently

### Example Question (November 2021)

**Task:** "Compare and evaluate two drum recording setups shown in Figures 1 and 2"

**Figure 1:** Multi-mic setup (large room, multiple close mics, overheads, room mics)
**Figure 2:** Glyn Johns technique (3 mics - overhead, side, kick)

### Indicative Content Framework

The mark scheme provides **indicative content** - points that candidates MIGHT make (not prescriptive):

**AO3 - Knowledge Points (identify features):**
- Large room vs small room acoustics
- Concrete surfaces vs soft treatment
- Multiple close mics vs minimal micing
- Condenser vs dynamic microphones
- XLR balanced cables
- Shock mounts
- Glyn Johns technique identification
- Distance of mics from sound source

**AO4 - Analysis Points (implications/effects):**
- Long pre-delay increases reverb
- No acoustic treatment = more reflections
- Angled surfaces reduce standing waves
- Close mic = less reverb captured
- Phase problems with multiple mics
- Equidistant placement required for Glyn Johns
- More mics = more control but more phase issues
- Fewer mics = fewer tracks in 1960s (historical context)

**Don't Double Credit:**
Mark scheme specifically states: "Don't double credit points in italics"
Example: If a student says "concrete surfaces" (AO3) they cannot also get AO4 credit for "concrete surfaces increase reflections" unless they explicitly make the analytical connection.

### Critical Success Factors for High Marks:

**For Level 4-5 (13-20 marks):**
1. **Chains of reasoning:** "Because X, therefore Y, which means Z"
   - Example: "Overhead mic is equidistant from snare (AO3), which prevents phase cancellation (AO4), resulting in a fuller sound with better mono compatibility (AO4 - evaluation)"

2. **Comparative evaluation:** Not just describing both setups, but comparing and judging relative merits
   - "While Figure 1 provides more control over individual drums, Figure 2's minimal approach creates a more cohesive, natural kit sound and was practical for 1960s recording limitations"

3. **Substantiated conclusions:** Final judgement supported by evidence from the analysis
   - Not: "Figure 1 is better"
   - But: "Figure 1 is more suitable for modern production requiring precise control, while Figure 2 is better for capturing natural room sound with fewer tracks"

4. **Technical accuracy:** Correct terminology throughout
5. **Balanced argument:** Considering both advantages and disadvantages

### Common Pitfalls (Lower Levels):

**Level 1-2 Issues:**
- Listing features without explaining implications
- Misunderstanding technical terms
- Generic statements ("this is good", "this is professional")
- No comparison between the two figures
- Conclusion not supported by previous points

**Level 3 Issues:**
- Mostly descriptive with some analysis
- Chains of reasoning attempted but not always logical
- Unbalanced (heavily favoring one setup)
- Partially coherent argument

### Quiz Adaptation Strategies:

1. **Identify features:** Show image, ask to list technical features (AO3 practice)
2. **Explain implications:** Given a feature, explain its effect (AO4 practice)
3. **Compare scenarios:** Two setups, identify key differences and implications
4. **Structured response:** Provide framework for chains of reasoning
5. **Vocabulary building:** Match technical terms to explanations

**Difficulty:** Very High
**Marks:** 20 marks (highest value single question)
**Time:** Approximately 25-30 minutes recommended
**Skills Tested:** 
- Comprehensive technical knowledge
- Critical analysis
- Comparative evaluation
- Extended writing
- Structured argumentation
- Synthesis of information

---

## 7. EFFECTS AND PROCESSING ANALYSIS (8 MARKS)

This question type requires identifying processing characteristics AND analyzing their effect.

### 7.1 Compression Analysis (8 marks: 4×AO3 + 4×AO4)

**Task Example:** "Analyze the compression settings used on this vocal and evaluate their effectiveness"

**Marking Structure:**
- 1 mark for each **feature** identified (AO3) - maximum 4
- 1 mark for each **analysis** of effect (AO4) - maximum 4

**Example Marking Points:**

| AO3 - Feature | AO4 - Analysis/Effect |
|---------------|------------------------|
| High ratio / ratio higher than 4:1 (1) | Heavy compression (1) |
| Low threshold (1) | Increases breath noise (1)<br>Increases reverb (1)<br>Increases hiss (1) |
| Controls wide dynamic range (1) | "Before" is brought up to match other words (1)<br>Helps vocal sit with narrow dynamic range of electronic backing (1) |
| | Increases average volume (1)<br>Increases RMS volume (1) |
| High gain makeup (1) | To compensate for high gain reduction (1) |
| Attack slow (1) | Some transients aren't fully controlled (1)<br>E.g., "only", "even", "argue" not controlled (1) |
| Opto compressor (1) | |
| Release fast (1) | Pumping of reverb (1) |
| | Slight distortion (1)<br>Slightly brighter (1) |

**Key Teaching Points:**
1. Must identify **specific settings** (AO3) AND **explain effects** (AO4)
2. Can't just say "compression is used" - must specify ratio, threshold, attack, release
3. Analysis must connect cause and effect
4. Maximum 4 marks each for AO3/AO4 even if more valid points made

### 7.2 Effects Matching Tasks

**Task:** "Match the distortion settings to bar 32"

**Marking:**
- Distortion has been used (1)
- Drive and tone match bar 32 (1)
- Level matches bar 32 (1)

**Total:** 3 marks

**Teaching Point:** "Matching" requires multiple parameters to align, not just that effect is present

## 8. SEQUENCING AND ORDERING TASKS

These questions test understanding of correct workflow and process order.

**Topics:**
- Signal flow
- Processing chains
- Production workflows

**Example Question Format:**
- "Place the following mixing tasks in the most appropriate order:"
  1. Remove noise
  2. Apply EQ/filtering
  3. Apply compression
  4. Apply effects (reverb/delay)
  5. Balance levels
  6. Final limiting/maximizing

**Difficulty:** Medium
**Marks:** 2-3 marks
**Skills Tested:** Procedural knowledge, understanding of signal flow

## 9. LABELING AND IDENTIFICATION TASKS

**Topics:**
- Equipment identification
- Parameter naming
- Control identification on synthesizers/processors

**Example Question Format:**
- "Label the main sections of this synthesizer" (showing MODULATOR, VCO, SOURCE MIXER, VCF, VCA, ENV)
- "Identify these controls and their function" (showing various knobs/sliders)

**Difficulty:** Low to Medium
**Marks:** 1 mark per correct identification
**Skills Tested:** Recognition, terminology knowledge

---

## SUMMARY OF QUESTION TYPES BY DIFFICULTY AND MARKING APPROACH

### By Difficulty Level

**Low Difficulty (Foundation Knowledge) - 1-2 marks each**
- Basic MCQs on terminology
- Single-word identifications
- Simple labeling (axes, parts)
- Recognition tasks
- Total typically: 5-10 marks across paper

**Medium Difficulty (Application) - 2-5 marks each**
- Calculations (file sizes, binary conversion)
- Short answer explanations (2-4 marks)
- Filter graph drawing
- MIDI piano roll editing
- Waveform/envelope drawing
- Total typically: 30-40 marks across paper

**High Difficulty (Practical Application) - 3-8 marks each**
- Audio editing with quality assessment
- Effects matching
- Noise removal
- Pitch correction
- Panning automation
- Sidechain/keyed gating
- Total typically: 40-50 marks across paper

**Very High Difficulty (Analysis & Evaluation) - 8-20 marks**
- Compression analysis (8 marks: AO3+AO4 split)
- Extended comparative evaluation (20 marks: 5 AO3 + 15 AO4)
- Complex mixing tasks
- Total typically: 20-28 marks across paper

### By Marking Approach

**Point-Based Marking:**
- Most MCQs (1 mark each)
- Calculations (1-2 marks)
- Pitch correction (8 marks: 6 for notes, 2 for quality)
- Delay/reverb matching (5 marks: specific criteria)
- Vocal extension (5 marks: specific criteria)

**Levels-Based Marking (Holistic):**
- Noise removal (0-3)
- Panning automation (0-2)
- Keyed gating (0-3)
- Balance and blend (0-3)
- Mix presentation (0-3)

**Split AO3/AO4 Marking:**
- Compression analysis (4+4 = 8 marks)
- Extended response (5+15 = 20 marks)

---

## DETAILED MARK ALLOCATION (VARIES BY EXAM SITTING)

**Important:** Mark allocations vary between exam sittings. Below shows data from two actual papers.

**Section A (Production) - 85 marks**

### Question 1 - MIDI/Bass Editing
**Mark range: 14-20 marks (varies significantly)**

**Common elements:**
- MCQ - quantization (1)
- MCQ - pitch intervals (1)
- MIDI timing table: Bar/Beat/Div/Tick (2)
- MIDI piano roll editing (4)
- ADSR envelope (2-7 marks - varies)
- Audio timing correction (5)

**Specific paper breakdowns:**
- **June 2024:** 14 marks total
  - ADSR task was simpler
- **November 2021:** 20 marks total
  - (d)(i) Label axes (2)
  - (d)(ii) Draw ADSR envelope (4)
  - (d)(iii) Label four stages (1)
  - Total ADSR: 7 marks

### Question 2 - Drums
**Mark range: 10-11 marks**

**Common elements:**
- Binary/decimal conversion table (4)
  - First THREE events in MIDI file
  - 1 mark each for decimal, 1 mark each for binary
- Explanation of 7-bit limitation (2)
- Drum sound assignment with electronic kit (5)

**Specific totals:**
- **June 2024:** Data not fully analyzed
- **November 2021:** 11 marks exactly

### Question 3 - Filter/Synth Processing
**Mark range: 7-10 marks**

**November 2021 structure (7 marks):**
- (a) Identify filter type (1) - "Low pass" / "high cut"
- (b) Label axes (2) - Frequency/Hz, Amplitude/dB
- (c) Mark cutoff frequency with cross (1)
- (d) Draw filter at different position (3)

**Note:** This question focuses on **filter automation** creating rhythmic effects by alternating cutoff frequency.

### Question 4 - Vocals/Processing
**Mark range: 15-23 marks (varies significantly)**

**Common elements:**
- MCQ - recording medium characteristics (1)
- MCQ - data compression types (1)
- Advantage of format/compression (1)
- MCQ - bitrate (1)
- Noise removal (3 marks - levels-based)
- Compression/processing evaluation (8 marks: AO3+AO4)

**Variable elements:**
- **June 2024:** Pitch correction with sample editing (8 marks)
- **November 2021:** Create harmonized backing vocal (8 marks)
  - Must use same syllables as lead vocal
  - Rhythmic unison with lead vocal
  - Follow provided piano roll for pitch/rhythm
  - Pan backing vocal hard left

**Specific totals:**
- **June 2024:** ~20 marks estimated
- **November 2021:** 23 marks

### Question 5 - Final Mix
**Mark range: 24 marks (consistent)**

**Standard structure:**
- (a) Panning automation (2 marks - levels)
- (b) Effect matching/recreation (3 marks)
- (c) Sidechain/keyed gating (3 marks - levels)
- (d) Delay/reverb on specific word (5 marks)
- (e) Vocal effect recreation (5 marks)
- (f) Balance levels (3 marks - levels)
- (g) Final mix presentation (3 marks - levels)

**Total:** 24 marks (both June 2024 and November 2021)

**Section B (Analysis) - 20 marks**

### Question 6 - Extended Response
**Marks: 20 (consistent across papers)**

**Structure:**
- AO3: Knowledge and understanding (5 marks max)
- AO4: Analysis, evaluation, reasoning (15 marks max)
- Five-level holistic marking
- Typical topics: recording techniques comparison, equipment evaluation

**Example topics:**
- **June 2024:** Roland SH-101 synthesizer settings for bass
- **November 2021:** Drum recording techniques (2010s vs late 1960s)

---

## ACTUAL PAPER TOTALS

**November 2021:**
- Q1: 20 marks
- Q2: 11 marks
- Q3: 7 marks
- Q4: 23 marks
- Q5: 24 marks
- Q6: 20 marks
- **Total: 105 marks** ✓

**June 2024:**
- Q1: 14 marks
- Q2: 11 marks (estimated)
- Q3: 10 marks (estimated)
- Q4: 25 marks (estimated)
- Q5: 24 marks
- Q6: 20 marks
- **Total: ~104-105 marks**

**Time Allocation:**
- 2 hours 15 minutes (135 minutes) examination
- Plus 10 minutes setup time
- Approximately 1.3 minutes per mark
- Recommend 25-30 minutes for Question 6 (20 marks)

**Setup Variations Between Papers:**
- **Tempo:** 100 bpm (Nov 2021) vs 170 bpm (June 2024)
- **Sample rate:** Always 16-bit/44.1kHz
- **Starting instruments:** Both papers start with bass track imported
- **Audio files:** Vary by paper (different musical content)

---

## KEY MARKING PRINCIPLES FROM MARK SCHEMES

### Tolerance and Flexibility

1. **Alternative Acceptable Answers**
   - Mark schemes provide multiple valid answers
   - Example: "Low pass" OR "high cut" (both acceptable)
   - Example: "Time/s/ms" (all three acceptable)
   - "Accept any similar analogue descriptor" for tape warmth

2. **Comparative Language**
   - "Almost instant" acceptable for "instant"
   - "Slight glitches" acceptable if "quieter or equal to X"
   - "Similar to reference file" (provides tolerance threshold)

3. **Conditional Assessment**
   - "If not soloed/metronome left on, only assess timing"
   - "If incomplete track bounced, assess from Q5 mix audio; max 1 mark"
   - Shows flexibility in assessment approach

### Penalty Structures

1. **Maximum Mark Reductions**
   - "Max 3 if additional drums present"
   - "Max 4 if kick and snare are acoustic" (when electronic expected)
   - "Max 4 if kit is unbalanced"
   - "Max 1 if any additional boosts or cuts" (filter drawing)

2. **Graduated Penalties**
   - Distinguishes between "slight" and "intrusive" issues
   - "Slight transient noise" (Level 2) vs "Intrusive longer noise" (Level 1)

3. **Cumulative Issues**
   - Multiple problems can reduce from Level 3 to Level 1
   - Each issue specified may reduce level

### Quality Thresholds

**Acceptable (Full Marks):**
- "Similar to 'MS q3.wav'" (reference provided)
- "No glitches" or "slight glitches quieter than X"
- "Balanced across all parts"
- "Correctly labeled"

**Reduced Marks:**
- "Some masking" (Level 2)
- "Few misjudgements" (Level 2)
- "Slight transient noise" (Level 2)

**Minimum Marks:**
- "One track barely audible" (Level 1)
- "Intrusive longer noise" (Level 1)
- "Parts of vocal cut out" (Level 1)

**Zero Marks:**
- "No mix present"
- "No attempt"
- "Completely silent track"
- "No audible evidence of [required technique]"

### Technical Specifications

1. **Precise Ranges**
   - "Cutoff marked between -1dB and -5dB" (not just "around -3dB")
   - "Bass shifted late 1 semiquaver + 50ish ticks" (very specific)
   - "Reverb time >4s" (not just "long reverb")

2. **Directional Accuracy**
   - "L → R" (correct) vs "R → L" (backwards, reduced marks)
   - "Hard panned" (not just slight movement)
   - "Steeper than 45º" (filter slope requirement)

3. **Timing Precision**
   - "At the start of bar 27" (exact placement)
   - "Beginning/end have <1 second silence"
   - "Slightly out of sync by <1 bpm" (tolerance defined)

### Assessment Priorities

1. **Primary Assessment**
   - What is explicitly asked for receives full attention
   - Example: If "correct rhythm" is requested, rhythm weighted heavily

2. **Secondary Considerations**
   - Quality markers (glitches, levels) assessed after primary criteria
   - "Allow artefacts/tone changes from pitch processing" (acceptable trade-off)

3. **Ignore Previous Assessment**
   - "Ignore previously assessed work: e.g., bass out of sync in bars 23-24"
   - Ensures no double penalty for same issue

### Alternative Approaches

1. **Credit for Different Methods**
   - "Award 1 mark if correct pitch/rhythm achieved using OTHER samples/sounds"
   - Recognizes multiple valid solutions
   - Doesn't penalize creative problem-solving

2. **Partial Credit Structures**
   - Point-based: Can earn marks for different elements independently
   - Levels-based: Describes what each level achieves

### Reference Files

Mark schemes reference specific audio files:
- 'MS q1.wav' - shows the edit for full marks
- 'MS q3.wav' - correct noise removal
- 'q5 mixed' - reference mix level
- '2020 MS task 3 unbalanced' - example of unbalanced mix

These provide **concrete examples** of quality standards.

### Common Assessment Issues

**In Practical Tasks:**
- **Metronome left on** → Reduces to Level 1 or "only assess what can be heard clearly"
- **Track not soloed** → "Assess what can be heard clearly"
- **Wrong export** → Conditional marking applied
- **Additional tracks** → Maximum marks reduced

**In Theoretical Tasks:**
- **Additional elements** → "Max marks if X present"
- **Wrong approach** → Zero or partial credit depending on context
- **Misunderstanding** → No marks for incorrect concepts

---

## QUIZ GENERATION RECOMMENDATIONS

### For Automated Quiz Systems:

1. **MCQs** - Easily automated, good for quick knowledge checks
2. **Calculations** - Can provide formula and expect numerical input
3. **Short Answer** - Use keyword matching or provide model answers
4. **Scenario-Based** - Describe practical situation, ask for best approach
5. **Matching Tasks** - Match terms to definitions, parameters to units
6. **Ordering Tasks** - Arrange workflow steps in correct sequence
7. **Image-Based** - Show waveforms/equipment, ask identification questions

### Difficulty Progression:
- Start with terminology and recall
- Progress to application and calculation
- Advance to analysis and evaluation
- Include mixed-format questions for comprehensive assessment

### Topic Coverage:
- MIDI protocol and data (10%)
- Digital audio theory (15%)
- Signal processing (25%)
- Recording techniques (15%)
- Mixing and production (20%)
- Synthesis and sound design (15%)

---

## EXAMPLE QUIZ QUESTION BANK STRUCTURE

```markdown
### Question Type: MCQ - Audio Processing
**Difficulty:** Easy
**Topic:** Noise Gate
**Marks:** 1

What does a noise gate do?
A) Amplifies quiet sounds
B) Removes sounds below a threshold level ✓
C) Removes sounds above a threshold level
D) Changes the pitch of the sound

**Explanation:** A noise gate attenuates (reduces) audio signals that fall below a set threshold level, effectively "closing" to block unwanted noise.

---

### Question Type: Calculation
**Difficulty:** Medium
**Topic:** File Size Calculation
**Marks:** 1

A mono audio file at 44.1 kHz, 16-bit has a file size of 5 MB. What would the file size be if converted to stereo at 88.2 kHz, 24-bit?

**Answer:** 30 MB

**Working:**
- Stereo: ×2
- Double sample rate: ×2
- Bit depth increase (16 to 24): ×1.5
- Calculation: 5 × 2 × 2 × 1.5 = 30 MB

---

### Question Type: Short Answer
**Difficulty:** Medium
**Topic:** Phase Cancellation
**Marks:** 2

Describe what would happen if you recorded the same audio source with two microphones, then inverted the polarity of one recording and combined them.

**Model Answer:**
Phase cancellation would occur [1 mark]. The two signals would be out of phase and would partially or completely cancel each other out, resulting in a thin/hollow sound or complete silence [1 mark].

---

### Question Type: Extended Response
**Difficulty:** Hard
**Topic:** Monitoring Equipment
**Marks:** 8

Evaluate the suitability of using studio monitor speakers versus laptop speakers for mixing a music production.

**Mark Scheme:**
- Frequency response comparison (2 marks)
- Stereo imaging discussion (2 marks)
- Accuracy and reliability for mixing decisions (2 marks)
- Real-world translation considerations (2 marks)

**Model Answer Points:**
- Studio monitors: flat frequency response, accurate representation
- Laptop speakers: limited bass, colored sound
- Studio monitors: clear stereo field
- Laptop speakers: common listening format (good for reference)
- Conclusion: Studio monitors for main mixing, laptop for checking translation
```

---

## ADAPTIVE LEARNING PATHS

Based on question types, create learning pathways:

**Beginner Path:**
1. Terminology MCQs
2. Basic calculations
3. Simple waveform identification
4. Single-effect processing questions

**Intermediate Path:**
1. Complex calculations
2. Multi-choice scenarios
3. Workflow sequencing
4. Effect chain ordering

**Advanced Path:**
1. Equipment evaluation
2. Synthesizer analysis
3. Multi-parameter optimization
4. Production problem-solving

---

**Document Created:** 2026-01-30
**Document Updated:** 2026-01-30 (analyzed both June 2024 and November 2021 papers)
**Exam Board:** Pearson Edexcel
**Qualification:** A-Level Music Technology (9MT0)
**Component:** 4 - Producing and Analysing
**Papers Analyzed:** 
- 9MT0/41 June 2024 (Question Paper)
- 9MT0/04 November 2021 (Question Paper + Mark Scheme)

**Document Purpose:**
This comprehensive guide categorizes all question types used in A-Level Music Technology exams, with detailed marking criteria, level descriptors, and examples from actual mark schemes. Analysis of multiple exam sittings reveals both consistent question types and variable mark allocations. Designed to support:
- Quiz and assessment generation
- Student preparation and revision
- Understanding of marking standards and variation
- Development of teaching materials
- Recognition of how tasks vary between exam sittings

