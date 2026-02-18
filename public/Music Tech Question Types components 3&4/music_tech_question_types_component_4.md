# Music Technology Exam Question Types
## A-Level Component 4: Producing and Analysing

This document categorizes question types from the Pearson Edexcel A-Level Music Technology exam for quiz generation purposes.

---

## 1. MULTIPLE CHOICE QUESTIONS (MCQs)

### 1.1 Audio Processing Concepts
**Topics:**
- Noise gate functionality
- Measurement units (dB, Hz, ms, V)
- RMS level behavior with signal processing
- Center position values in MIDI controllers

**Example Questions:**
- "Which one best describes the action of a noise gate?"
  - A) The gate cuts all sound above the threshold
  - B) The gate cuts all sound below the threshold ✓
  - C) The gate cuts frequencies below the threshold
  - D) The gate cuts low velocities

- "Identify the unit used to measure the threshold value"
  - A) dB ✓
  - B) Hz
  - C) ms
  - D) V

- "Identify the value of pitch bend when at centre position"
  - A) 1
  - B) 127
  - C) 8192 ✓
  - D) 32768

**Difficulty:** Low to Medium
**Marks:** 1 mark each
**Skills Tested:** Recognition, recall of technical terminology

---

## 2. CALCULATION QUESTIONS

### 2.1 Digital Audio File Size Calculations
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

**Difficulty:** Medium
**Marks:** 1 mark each
**Skills Tested:** Mathematical reasoning, understanding of digital audio properties

### 2.2 MIDI Data Conversions
**Topics:**
- Decimal to binary conversion
- MIDI velocity ranges (0-127)
- LSB/MSB byte structure

**Example Questions:**
- "Complete the table to give the velocity in decimal and in binary of the highest velocity value in the MIDI file"
  - Decimal: 127
  - Binary: 0111 1111

- "Identify how MIDI would transmit the value of 16383" (with LSB/MSB options)

**Difficulty:** Medium to High
**Marks:** 1-2 marks
**Skills Tested:** Binary mathematics, MIDI protocol knowledge

---

## 3. SHORT ANSWER THEORY QUESTIONS

### 3.1 Conceptual Understanding (1-2 marks)
**Topics:**
- Purpose of processing techniques
- Technical definitions
- Cause and effect relationships

**Example Questions:**
- "State the reason that the drum programmer chose to have notes with different velocity." (1 mark)
  - Expected: To create dynamic variation / make it sound more realistic / add expression

- "State how many bytes MIDI uses to represent the range of values of pitch bend." (1 mark)
  - Answer: 2 bytes (or "two")

- "Describe what would happen if the waveforms from parts (a) and (b) were added together." (1 mark)
  - Answer: Phase cancellation / silence / no sound

**Difficulty:** Low to Medium
**Marks:** 1 mark
**Skills Tested:** Recall, basic understanding

### 3.2 Extended Description (2-4 marks)
**Topics:**
- Explaining processing decisions
- Technical specifications and their implications
- Workflow considerations

**Example Questions:**
- "Explain what 48 dB/octave refers to." (2 marks)
  - Expected: The steepness/slope of the filter / How much the signal is attenuated / For every octave above/below the cutoff frequency, the signal is reduced by 48 dB

- "Describe why it is important to apply a noise gate to this style of electric guitar." (2 marks)
  - Expected: To remove unwanted noise between notes / High gain creates hiss/buzz / Keeps recording clean

- "Describe a situation where it is important to check the polarity of recorded signals." (2 marks)
  - Expected: When using multiple microphones / Recording the same source / To avoid phase cancellation / Drum recording with multiple mics

**Difficulty:** Medium
**Marks:** 2-4 marks
**Skills Tested:** Application of knowledge, explanation skills

---

## 4. DIAGRAM AND GRAPH QUESTIONS

### 4.1 Waveform Drawing
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

### 4.2 Filter Response Graphs
**Topics:**
- HPF (High Pass Filter)
- LPF (Low Pass Filter)
- Filter slopes (6 dB, 12 dB, 24 dB, 48 dB per octave)
- Frequency response visualization

**Example Questions:**
- "On the graph below, draw the HPF" (3 marks)
  - Must show: correct orientation, appropriate slope, correct frequency axis positioning

**Difficulty:** Medium to High
**Marks:** 3 marks
**Skills Tested:** Understanding of filter characteristics, graph interpretation

---

## 5. PRACTICAL DAW TASK QUESTIONS

These questions require hands-on work in a Digital Audio Workstation. For quiz purposes, these can be adapted to scenario-based questions or technical procedure descriptions.

### 5.1 MIDI Editing Tasks
**Topics:**
- Reassigning drum sounds
- Note placement and timing
- Velocity editing

**Example Question Format:**
- "You have a MIDI drum file with incorrectly assigned sounds. Describe the process to reassign notes to: Kick drum, Snare, Open hi-hat, Ride cymbal bell, Rack tom, Floor tom, Two different crash cymbals. You must not change the rhythm." (8 marks)

**Adapted Quiz Format:**
- Scenario-based: "What is the correct workflow for reassigning MIDI notes to different drum sounds?"
- Multiple choice on best practices
- Ordering tasks in correct sequence

### 5.2 Audio Editing Tasks
**Topics:**
- Noise removal using noise profiles
- Pitch correction
- Time-based copying and pasting
- Crossfading and glitch removal

**Example Question Format:**
- "Complete the lead guitar part by: removing noise from bar 9, copying bars 18-25 to bars 26-33, ensuring no clicks or glitches" (4 marks)

**Adapted Quiz Format:**
- "What tool would you use to remove unwanted background noise?" (Noise reduction/gate)
- "How do you avoid clicks when editing audio?" (Crossfades, zero-crossing edits)

### 5.3 Signal Processing Tasks
**Topics:**
- Filter application and matching
- Double tracking and panning
- Compression settings
- Sidechain gating
- Delay effects

**Example Question Format:**
- "Apply a filter to the rhythm guitar in bars 2-9. The filter characteristics should match the bass guitar filtering in bars 2-9." (3 marks)

**Adapted Quiz Format:**
- "What parameters define filter characteristics?" (Cutoff frequency, slope, resonance)
- "How do you create double tracking for guitars?" (Duplicate track, slight timing offset, pan hard left/right)

### 5.4 Final Mix Tasks
**Topics:**
- Level balancing
- Dynamic range optimization
- Export settings
- File naming conventions

**Example Question Format:**
- "Produce a final stereo mix ensuring: mix output at highest level possible, free from distortion, no limiting/compression on mix bus, proper beginning/end timing" (3 marks)

**Difficulty:** High (practical)
**Marks:** 1-8 marks depending on complexity
**Skills Tested:** Technical proficiency, practical application

---

## 6. EXTENDED RESPONSE / EVALUATION QUESTIONS

### 6.1 Equipment Analysis (4-8 marks)
**Topics:**
- Microphone polar patterns and frequency response
- Monitoring equipment comparison
- Recording technique implications

**Example Questions:**
- "Analyse how the polar response of this microphone (Shure SM7B) changes according to frequency and the implications when recording a vocal." (4 marks)
  
**Expected Response Structure:**
- At low frequencies (250-1000 Hz): broader/more omnidirectional pattern
- At high frequencies (2500-6300 Hz): narrower/more directional pattern
- Implication: Singer position affects frequency balance
- Implication: More consistent sound on-axis
- Implication: Better rejection of room noise at high frequencies

- "Evaluate the suitability of nearfield studio monitors vs mobile phone speakers to monitor this song during mixing." (8 marks)

**Expected Response Structure:**
Nearfield monitors:
- Flat/accurate frequency response
- Wide frequency range
- Stereo imaging
- Good for making mixing decisions

Mobile phone speaker:
- Limited frequency range (no bass)
- Mono or narrow stereo
- Real-world listening scenario
- Good for checking vocal/mid clarity
- Common listening format

**Difficulty:** High
**Marks:** 4-8 marks
**Skills Tested:** Critical analysis, application of knowledge, evaluation, comparison

### 6.2 Synthesizer Settings Evaluation (20 marks)
**Topics:**
- Synthesizer architecture (VCO, VCF, VCA, ENV, LFO)
- Sound design principles
- Suitability for specific musical applications

**Example Question:**
- "Figure 1 shows a monophonic synthesiser from 1982 (Roland SH-101). Evaluate the suitability of the settings to produce a synth bass." (20 marks)

**Expected Response Structure:**
Must analyze:
- **Oscillator (VCO) settings:**
  - Waveform selection (sawtooth/square/pulse appropriate for bass)
  - Pulse width setting
  - Sub oscillator usage
  - Pitch/tuning

- **Filter (VCF) settings:**
  - Cutoff frequency (low for bass)
  - Resonance amount
  - Envelope modulation depth
  - Keyboard tracking

- **Amplifier (VCA) envelope:**
  - Attack time (fast for bass)
  - Decay time
  - Sustain level
  - Release time

- **Modulation (LFO):**
  - Whether modulation enhances/detracts from bass sound
  - Rate and depth settings

- **Overall suitability conclusion**

**Assessment Criteria:**
- Technical accuracy of analysis
- Understanding of synthesis principles
- Appropriate terminology
- Evaluation of suitability (not just description)
- Suggestions for improvement

**Difficulty:** Very High
**Marks:** 20 marks (longest response in exam)
**Skills Tested:** Synthesis knowledge, critical evaluation, technical expertise, extended writing

---

## 7. SEQUENCING AND ORDERING TASKS

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

---

## 8. LABELING AND IDENTIFICATION TASKS

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

## SUMMARY OF QUESTION TYPES BY DIFFICULTY

### Low Difficulty (Foundation Knowledge)
- Basic MCQs on terminology
- Simple waveform identification
- Equipment/parameter identification
- Single-mark definitions

### Medium Difficulty (Application)
- Calculations (file sizes, binary conversion)
- Short answer explanations (2-4 marks)
- Filter graph drawing
- Workflow sequencing
- Processing technique descriptions

### High Difficulty (Analysis & Evaluation)
- Complex practical scenarios
- Equipment comparison evaluations (8 marks)
- Extended analytical responses
- Synthesizer parameter evaluation (20 marks)
- Real-world application of multiple concepts

---

## MARK ALLOCATION SUMMARY

**Section A (Production):** 85 marks
- Question 1 (Drums): 14 marks
- Question 2 (Guitars): 14 marks
- Question 3 (Bass): 8 marks
- Question 4 (Vocals): 25 marks
- Question 5 (Final Mix): 24 marks

**Section B (Analysis):** 20 marks
- Question 6 (Synthesizer Evaluation): 20 marks

**Total:** 105 marks

**Time:** 2 hours 15 minutes (plus 10 minutes setup)

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
**Exam Board:** Pearson Edexcel
**Qualification:** A-Level Music Technology (9MT0)
**Component:** 4 - Producing and Analysing
**Paper:** 9MT0/41
