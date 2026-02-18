# Music Technology Quiz Question Generator
## Complete Framework for Component 3: Listening and Analysing

Version: Final (incorporating 2023 & 2024 exam analysis)

---

## TABLE OF CONTENTS

1. [Section A Question Types](#section-a-question-types)
   - [Type 1: Identification - Multiple Items](#type-1-identification---multiple-items)
   - [Type 2: Single Process/Solution Identification](#type-2-single-processsolution-identification)
   - [Type 3: Multiple Choice - Technical Parameters](#type-3-multiple-choice---technical-parameters)
   - [Type 4: Visual/Graphical Tasks](#type-4-visualgraphical-tasks)
   - [Type 5: Problem Identification + Solutions](#type-5-problem-identification--solutions)
   - [Type 6: Short Technical Description](#type-6-short-technical-description)
   - [Type 7: Change/Comparison Description](#type-7-changecomparison-description)
   - [Type 8: How Equipment Works (Technical Explanation)](#type-8-how-equipment-works-technical-explanation)
   - [Type 9: Technology Impact on Sound](#type-9-technology-impact-on-sound)
   - [Type 10: Historical Evolution](#type-10-historical-evolution)
   - [Type 11: Historical Technique Explanation](#type-11-historical-technique-explanation)

2. [Section B Question Types](#section-b-question-types)
   - [Type 12: Comparative Analysis (15 marks)](#type-12-comparative-analysis-15-marks)
   - [Type 13: Technique Use + Broader Impact (20 marks)](#type-13-technique-use--broader-impact-20-marks)
   - [Type 14: Effect Use + Historical Development (20 marks)](#type-14-effect-use--historical-development-20-marks)

3. [Question Generation Templates](#question-generation-templates)
4. [Assessment Criteria Reference](#assessment-criteria-reference)

---

## SECTION A QUESTION TYPES

### TYPE 1: Identification - Multiple Items

**Mark Value:** 2-4 marks (1 mark per item)
**AO:** AO3 (Knowledge)

**Format:**
- "Name/Identify [NUMBER] [effects/instruments/sounds/features]..."
- Common exclusions: "Apart from EQ, reverb, compression..."
- Time range specified
- Multiple acceptable terms for each answer

**Examples from Exams:**

**2024 Exam:**
- "Identify four effects/production features on vocals (apart from EQ, reverb, compression)" (4 marks)
- "Name two percussion sounds not part of standard drum kit" (2 marks)
- "Name two instruments featuring wah wah" (2 marks)

**2023 Exam:**
- "Name two modulation effects heard on electric guitars" (2 marks)

**Quiz Generation Template:**

```markdown
## Question [X] - [SONG TITLE] by [ARTIST] ([YEAR])
Track [X]

### Part [X]

**Task:** Name/Identify [NUMBER] [CATEGORY] heard on the [INSTRUMENT/SECTION]
**Time Range:** [START:END]
**Exclusions:** [If applicable: Apart from X, Y, Z]
**Marks:** [NUMBER] (1 mark per correct answer)

1. _____________________
2. _____________________
3. _____________________ [if needed]
4. _____________________ [if needed]

---

**MARKING GUIDE:**

Acceptable answers (any [NUMBER] of):
• [ANSWER 1 with alternatives: Term A / Term B / Term C]
• [ANSWER 2 with alternatives]
• [ANSWER 3 with alternatives]
• [ANSWER 4 with alternatives]
• [ANSWER 5 with alternatives]
• [ANSWER 6 with alternatives]

Examples based on mark schemes:
• AutoTune / pitch correction / vocal tuning
• Vocoder / harmoniser / talkbox
• Distortion / clipping / bit-crusher / overdrive
• Double-tracking / ADT / stereo widener / ping pong / alternating panning
• Chorus / ensemble
• Flanger / jet / phaser
```

**Common Categories:**

| Category | Examples with Acceptable Alternatives |
|----------|--------------------------------------|
| **Modulation Effects** | Chorus/ensemble, Flanger/jet, Phaser, Tremolo/amplitude modulation, Vibrato/pitch modulation, Ring modulation |
| **Pitch Effects** | Auto-Tune/pitch correction, Vocoder/harmoniser, Pitch shift/transpose/octaver, Harmonisation |
| **Distortion Effects** | Distortion/overdrive/saturation, Clipping/bit-crusher, Fuzz |
| **Production Features** | Double-tracking/ADT, Layering/overdubbing, Sampling/looping, Stuttering/chopping/glitching, Reverse/backwards |
| **Percussion (non-kit)** | Conga/bongo/djembe/hand drum, Shaker/cabasa/maraca, Cowbell, Triangle, Tambourine |
| **Synthesis** | Saw wave/sawtooth, Square/pulse, PWM/pulse width modulation, Filter sweep, LFO modulation |

---

### TYPE 2: Single Process/Solution Identification

**Mark Value:** 1 mark
**AO:** AO3 (Knowledge)

**Format:**
- "Identify one [process/method/technique]..."
- Typically very focused, specific problem
- Short answer (one line)

**Examples from Exams:**

**2023:**
- "Identify one process that could be used to reduce sibilance" (1 mark)

**2024:**
- "Identify one unwanted noise heard at the start" (1 mark)

**Quiz Generation Template:**

```markdown
### Part [X]

**Task:** Identify ONE [process/technique/problem] that [describes situation]
**Time Range:** [START:END]
**Marks:** 1

_____________________

---

**MARKING GUIDE:**

Acceptable answers:
• [PRIMARY TERM 1 / Alternative term 1A / Alternative term 1B]
• [PRIMARY TERM 2 / Alternative term 2A]
• [PRIMARY TERM 3]

Example from mark schemes:
**For sibilance reduction:**
• De-esser / sibilance reducer
• EQ / high frequency reduction
• Multiband compression

**For unwanted noise identification:**
• Hiss / white noise
• Hum / mains hum / 50Hz/60Hz hum
• Crackle / vinyl noise
• Pop / plosive
• Room noise / ambient noise
```

---

### TYPE 3: Multiple Choice - Technical Parameters

**Mark Value:** 1 mark
**AO:** AO3 (Knowledge)

**Format:**
- Four options (A, B, C, D)
- Requires listening and technical knowledge
- Typically rhythmic or musical parameters

**Example from 2023 Exam:**

```
(a) Identify the most likely quantise value used on the kick drum 
    in the introduction (0:01–0:16).

□ A  1/4
□ B  1/4 triplet
□ C  1/8
□ D  1/8 triplet
```

**Quiz Generation Template:**

```markdown
### Part [X]

**Task:** Identify the most likely [PARAMETER] used on [INSTRUMENT]
**Time Range:** [START:END]
**Marks:** 1

□ A  [OPTION A]
□ B  [OPTION B]
□ C  [OPTION C]
□ D  [OPTION D]

---

**MARKING GUIDE:**

Correct Answer: [LETTER]

Rationale: [Brief explanation of why this is correct]

Distractors:
- Option [X]: [Why this might be confused but is wrong]
- Option [Y]: [Why this might be confused but is wrong]
```

**Common Multiple Choice Topics:**

| Topic | Options Format | Example |
|-------|---------------|---------|
| **Quantise Value** | Musical note values | 1/4, 1/4 triplet, 1/8, 1/8 triplet, 1/16 |
| **Time Signature** | Musical meters | 3/4, 4/4, 5/4, 6/8 |
| **Tempo** | BPM ranges | 60-80 BPM, 80-100 BPM, 100-120 BPM, 120-140 BPM |
| **Filter Type** | Filter names | Low pass, High pass, Band pass, Notch |
| **Reverb Type** | Reverb algorithms | Room, Hall, Plate, Spring |
| **Microphone Type** | Mic categories | Dynamic, Condenser, Ribbon, Piezo |
| **Compression Ratio** | Ratio values | 2:1, 4:1, 8:1, 20:1 |

---

### TYPE 4: Visual/Graphical Tasks

**Mark Value:** 2 marks typically
**AO:** AO3 (Knowledge)

**Sub-categories:**

#### 4A: EQ Controls (Drawing)

**2024 Example:**
"Draw one line on each control to show EQ settings"
- Mark scheme: HF boost of 3dB or more, LF cut of 3dB or more

```markdown
### Part [X]

**Task:** Draw [NUMBER] line(s) on [the control(s)] to show how you would recreate the [PARAMETER] heard on the [INSTRUMENT]
**Time Range:** [START:END]
**Marks:** 2

[INSERT CONTROL DIAGRAM]

---

**MARKING GUIDE:**

• [CONTROL 1]: [Specific requirement with threshold]
  Example: Allow boosts of 3dB or more

• [CONTROL 2]: [Specific requirement with threshold]
  Example: Allow any cut of 3dB or more

Key Principle: Look for specific thresholds, not just direction
```

#### 4B: Musical Notation (Drawing/Completing)

**2023 Example:**
"Draw the two missing notes from the first four bars of the bass line"

```markdown
### Part [X]

**Task:** Draw the [NUMBER] missing [notes/elements] from [description]
**Time Range:** [START:END]
**Marks:** 2

[INSERT MUSICAL GRID/STAFF]

---

**MARKING GUIDE:**

Missing elements should be:
• [Note 1]: [Pitch] at [Position/Time]
• [Note 2]: [Pitch] at [Position/Time]

Award:
- 1 mark for each correctly placed note (pitch + position)
- OR 2 marks if both perfect
- OR 1 mark if both recognizable but minor inaccuracies
```

---

### TYPE 5: Problem Identification + Solutions

**Mark Value:** 1 mark (problem) + 2 marks (solutions) = 3 marks total
**AO:** AO3 (Knowledge)

**Format:**
- Part (i): Identify one problem
- Part (ii): Identify two ways to avoid/solve it

**Example from 2023:**
- (c)(i) "Identify one capture problem heard in lead vocal" (1 mark)
- (c)(ii) "Identify two ways the problem could be avoided during capture" (2 marks)

**Example from 2024:**
- (b) "Clipping can be heard. Identify three ways clipping could have been avoided" (3 marks)

**Quiz Generation Template:**

```markdown
### Part [X]

**(i) Task:** Identify ONE [problem type] heard in/on the [INSTRUMENT]
**Time Range:** [START:END]
**Marks:** 1

_____________________

**(ii) Task:** Identify TWO ways the problem heard in (i) could be [avoided/reduced/solved] during [recording/mixing/production]
**Marks:** 2

1. _____________________
   _____________________

2. _____________________
   _____________________

---

**MARKING GUIDE:**

**(i) Problem Identification - Acceptable Answers:**
• [PROBLEM 1 / Alternative term 1]
• [PROBLEM 2 / Alternative term 2]

Examples: Clipping/distortion, Plosives/p-pops, Sibilance, 
Proximity effect/bass boost, Phase cancellation, Room noise/bleed

**(ii) Solutions - Acceptable Answers (any two of):**

✓ [SOLUTION 1 with alternatives]
✓ [SOLUTION 2 with alternatives]
✓ [SOLUTION 3 with alternatives]
✓ [SOLUTION 4 with alternatives]

❌ REJECTED PHRASINGS:
• [Incorrect phrasing 1]
• [Incorrect phrasing 2]

Example from mark scheme (Clipping):
✓ Increase mic distance
✓ Use less sensitive mic / higher SPL mic / dynamic mic
✓ Reduce recording level / gain
✓ Engage pad / attenuator
✓ Angle mic off-axis
✓ Use compressor / limiter
✓ Reduce source volume / play more quietly

❌ "Turn mic down"
❌ "Decrease mic level"
```

**Common Problem-Solution Pairs:**

| Problem | Solutions |
|---------|-----------|
| **Clipping** | Increase distance, Less sensitive mic, Reduce gain, Engage pad, Angle off-axis, Use limiter, Reduce source volume |
| **Sibilance** | De-esser, EQ/cut highs, Multiband compression, Off-axis miking, Pop filter, Mic placement |
| **Plosives** | Pop filter, Angle mic off-axis, Increase distance, High-pass filter, Pencil technique |
| **Room Noise** | Close miking, Directional mic, Acoustic treatment, Isolation, Gate, Multiple takes |
| **Proximity Effect** | Increase distance, High-pass filter, Omni mic, EQ correction |
| **Phase Issues** | Check polarity, Proper spacing, Mono compatibility check, Time alignment |

---

### TYPE 6: Short Technical Description

**Mark Value:** 2-4 marks
**AO:** AO3 (Knowledge)

**Format:**
- "Describe the [parameter/sound/technique]..."
- May include exclusions
- Requires technical terminology
- Multiple points needed

**Examples from Exams:**

**2024:**
- "Describe the reverb used on lead vocal" (3 marks)
- "Describe oscillator settings for synth bass" (2 marks)
- "Describe filter settings on synth bass" (3 marks)

**2023:**
- "Describe acoustic guitar capture and processing (excluding EQ)" (4 marks)
- "Describe production techniques on clap sound" (2 marks)
- "Describe amplitude envelope settings on lead synth" (3 marks)

**Quiz Generation Template:**

```markdown
### Part [X]

**Task:** Describe the [PARAMETER/TECHNIQUE] [used on/heard on] the [INSTRUMENT]
**Time Range:** [START:END]
**Exclusions:** [If applicable]
**Marks:** [2-4]

_____________________
_____________________
_____________________
_____________________
_____________________
_____________________

---

**MARKING GUIDE:**

Award up to [NUMBER] marks for any valid points:

**[Category 1]:**
✓ [Valid point 1 with alternatives]
✓ [Valid point 2 with alternatives]

**[Category 2]:**
✓ [Valid point 3]
✓ [Valid point 4]

❌ REJECTED:
• [Vague descriptor 1]
• [Incorrect term 1]

Max [X] marks per category (if categories apply)
```

**Framework for Different Description Types:**

#### Reverb Description (3 marks typically):

```
Acceptable points (any 3):
✓ Size: Small/large room, hall, cathedral, chamber, plate
  - With values: e.g., "reverb time of 1.5 to 4 secs"
✓ Pre-delay: Short/medium/long/noticeable
  - Specific: e.g., "20-50ms pre-delay"
  ❌ "Short pre-delay" (when actually long)
✓ Tonality: Bright, dark, mid-range, dense, HF damping, low-passed
✓ Mix/send level: Low/medium/high, wet/dry, percentage (20-70%)
✓ Type: Digital, convolution, plate, hall, chamber, spring
✓ Stereo/mono
✓ Processing: Ducked, automated, gated, freeze, reverse
```

#### Synthesis - Oscillators (2 marks typically):

```
Acceptable points (any 2):
✓ Waveform: Sine, saw/sawtooth, square, pulse, triangle, rich harmonics
✓ Multiple oscillators / detuning / unison / PWM
✓ Octave settings: Low octave, same octave, range
✓ Fine tuning / cent detuning
❌ Sub-oscillator (may be rejected in specific contexts)
```

#### Synthesis - Filter (3 marks typically):

```
Acceptable points (any 3):
✓ Type: Low pass (LPF), high pass (HPF), band pass, notch, high cut, low cut
✓ Cutoff frequency: Low, mid, high, specific frequency
✓ Resonance: Used, resonant, high resonance
  ❌ "Slight resonance" / "Low resonance" (too vague)
✓ Slope: Gentle, steep, 12dB/octave, 24dB/octave
✓ Modulation: Filter envelope, ADSR to cutoff, LFO
✓ Envelope settings: Short/long attack, decay, sustain, release
```

#### Synthesis - Envelope (3 marks typically):

```
Acceptable points (any 3):
✓ Attack: Fast/slow/instant, specific time
✓ Decay: Fast/slow/medium, specific time
✓ Sustain: Low/medium/high level, percentage
✓ Release: Fast/slow/medium, specific time
✓ Overall shape: Percussive, pad-like, plucked

May need to reference specific ADSR stages heard
```

#### Capture and Processing (4 marks typically):

```
May include (any 4 valid points):
✓ Mic type: Condenser, dynamic, ribbon
✓ Mic pattern: Cardioid, omni, figure-8
✓ Mic placement: Close, distant, on-axis, off-axis
✓ Multiple mics / stereo pair
✓ Room acoustics / ambient sound
✓ Effects: Reverb, delay, compression, etc.
✓ Processing: Doubling, layering, automation
```

---

### TYPE 7: Change/Comparison Description

**Mark Value:** 1-2 marks
**AO:** AO3 (Knowledge)

**Format:**
- Describe how something changes at a specific moment
- May exclude certain aspects
- Focus on before/after comparison

**Examples from Exams:**

**2024:**
- "Describe the change in lead vocal reverb at end of song" (1 mark)

**2023:**
- "Identify one way reverb on cowbells changes at 0:59 (excluding panning)" (1 mark)

**Quiz Generation Template:**

```markdown
### Part [X]

**(i) Task:** [Excluding X], identify ONE way the [PARAMETER] on [INSTRUMENT] changes at [TIME] when compared to [previous section/earlier]
**Marks:** 1

_____________________

**(ii) Task:** State TWO ways of recreating the change heard in (i) using a DAW
**Marks:** 2

1. _____________________
   _____________________

2. _____________________
   _____________________

---

**MARKING GUIDE:**

**(i) Change identification:**
Acceptable answers:
• [Change description 1]
• [Change description 2]
• [Change description 3]

Example: Reverb time increases / reverb becomes longer
         Reverb level increases / more wet
         Reverb bypasses / turns off / goes dry

**(ii) DAW recreation methods:**
Acceptable answers (any 2):
• Automation of [parameter]
• [Plugin] parameter change
• [Technique description]

Examples:
• Automate reverb send level
• Automate reverb decay time
• Create a new track with different reverb settings
• Use automation lane for reverb bypass
• Change reverb preset at the time point
```

**Common Change Types:**

| Change Category | Description Examples |
|-----------------|---------------------|
| **Effect On/Off** | Bypassed/muted/turned off, Engaged/turned on, Dry/wet |
| **Level Changes** | Increase/decrease, Fade in/out, Jump/step change |
| **Parameter Changes** | Longer/shorter decay, Higher/lower feedback, More/less resonance |
| **Spatial Changes** | Pan left/right/center, Wider/narrower stereo, Mono to stereo |
| **Tonal Changes** | Brighter/darker, More/less high frequency, Filter opens/closes |

---

### TYPE 8: How Equipment Works (Technical Explanation)

**Mark Value:** 4 marks typically
**AO:** AO3 (Knowledge) + AO4 (Understanding)

**Format:**
- "Describe how [equipment/technique] works"
- Requires technical process explanation
- Often signal flow or processing chain

**Example from 2023:**
"A vocoder is used on vocals. Describe how a vocoder works." (4 marks)

**Quiz Generation Template:**

```markdown
### Part [X]

**Context:** [Brief description of where/how effect is used in track]
**Task:** Describe how [EQUIPMENT/TECHNIQUE] works
**Marks:** 4

_____________________
_____________________
_____________________
_____________________
_____________________
_____________________
_____________________
_____________________

---

**MARKING GUIDE:**

Award up to 4 marks for accurate description including:

**Essential Elements (must have for full marks):**
1. [Core concept 1]
2. [Core concept 2]
3. [Technical process]
4. [Result/output]

**Example - Vocoder:**
1. Two inputs: modulator (vocal) and carrier (synth)
2. Both signals split into frequency bands using filters/analysis
3. Amplitude envelope of modulator controls carrier in each band
4. Bands recombined to create robotic/synthetic voice effect

**Example - Compressor:**
1. Signal continuously monitored against threshold
2. When signal exceeds threshold, gain reduction applied
3. Amount of reduction determined by ratio
4. Attack/release times control how quickly compression engages/disengages

**Example - Delay:**
1. Input signal captured and stored in buffer/memory
2. Signal repeated after specified delay time
3. Feedback control determines how many repeats
4. Wet/dry mix blends delayed signal with original
```

**Common Equipment for "How It Works" Questions:**

| Equipment | Key Points to Cover |
|-----------|---------------------|
| **Vocoder** | Two inputs (modulator/carrier), frequency band analysis, amplitude envelope extraction, bands recombined |
| **Compressor** | Threshold, ratio, gain reduction, attack/release, makeup gain |
| **Limiter** | Ceiling/threshold, prevents signal exceeding, high ratio (20:1+), brick wall |
| **Gate** | Threshold, signal below closes gate, attack/release, reduces noise |
| **Reverb** | Reflections, early/late reflections, decay time, frequency response |
| **Delay** | Buffer/memory, delay time, feedback/regeneration, wet/dry mix |
| **Chorus** | Delayed copies, slight pitch variation, LFO modulation, mixing |
| **Phaser** | All-pass filters, phase shifts, notches in frequency, LFO sweep |
| **Flanger** | Short delay, feedback, comb filtering, LFO modulation |
| **Auto-Tune** | Pitch detection, correction to nearest note, retune speed, scale |
| **De-esser** | Frequency-specific compression, triggers on sibilants (4-8kHz), reduces harsh sounds |

---

### TYPE 9: Technology Impact on Sound

**Mark Value:** 3 marks typically
**AO:** AO3 (Knowledge) + AO4 (Understanding)

**Format:**
- "Describe how [technology] affects/impacts the sound"
- Focus on sonic characteristics and limitations
- May be historical or vintage technology

**Example from 2023:**
"The song uses a synthesiser riff produced using an 8-bit chip from a 1980s home computer. Describe how this technology is likely to affect the sound." (3 marks)

**Quiz Generation Template:**

```markdown
### Part [X]

**Context:** [Description of technology/equipment used]
**Task:** Describe how this technology [is likely to affect / affects] the sound
**Marks:** 3

_____________________
_____________________
_____________________
_____________________
_____________________
_____________________

---

**MARKING GUIDE:**

Award up to 3 marks for valid points about sonic characteristics:

**Technical Limitations:**
✓ [Limitation 1 and its sonic result]
✓ [Limitation 2 and its sonic result]

**Sonic Characteristics:**
✓ [Character 1]
✓ [Character 2]
✓ [Character 3]

**Example - 8-bit chip:**
✓ Limited bit depth / 8-bit resolution → Quantization noise, gritty texture
✓ Simple waveforms / limited polyphony → Basic, lo-fi sound
✓ Low sample rate → Aliasing, metallic quality
✓ Square waves, simple pulse waves → Harsh, buzzy timbre
✓ Characteristic of 8-bit games → Nostalgic, retro aesthetic
```

**Technology Categories and Their Sonic Impact:**

#### Vintage Digital (8-bit, 12-bit, early samplers):
- **Characteristics:** Lo-fi, gritty, crunchy, aliasing, quantization noise
- **Causes:** Low bit depth, low sample rate, limited memory
- **Result:** Distinctive character, nostalgia, retro aesthetic

#### Analog Technology (Tape, vinyl, tube):
- **Characteristics:** Warm, saturated, smooth, compressed, harmonic distortion
- **Causes:** Tape saturation, physical limitations, non-linearity
- **Result:** Musical distortion, "warmth", reduced dynamic range

#### Early Digital Reverb (1980s):
- **Characteristics:** Metallic, digital, bright, unrealistic, "80s sound"
- **Causes:** Early algorithms, limited processing power
- **Result:** Distinctive era sound, less natural than modern reverbs

#### Analog Synthesis (Moog, ARP, etc.):
- **Characteristics:** Rich, fat, warm, unstable tuning, organic
- **Causes:** Voltage-controlled circuits, component drift
- **Result:** Character and variation, "alive" sound

#### Early Auto-Tune (late 1990s):
- **Characteristics:** Robotic artifacts, obvious correction, "Cher effect"
- **Causes:** Limited algorithms, used on extreme settings
- **Result:** Became stylistic choice, defining sound of era

---

### TYPE 10: Historical Evolution

**Mark Value:** 6 marks typically
**AO:** AO3 (Knowledge) + AO4 (Understanding/Analysis)

**Format:**
- "Describe how [aspect of production] has changed since [year]"
- Requires comparison between eras
- Must reference both technical and aesthetic changes

**Example from 2023:**
"Describe how lead vocal production has changed since the song was recorded in 1968." (6 marks)

**Quiz Generation Template:**

```markdown
### Part [X]

**Context:** [Song details - Artist, Title, Year]
**Task:** Describe how [ASPECT OF PRODUCTION] has changed since the song was recorded in [YEAR]
**Marks:** 6

_____________________
_____________________
_____________________
_____________________
_____________________
_____________________
_____________________
_____________________
_____________________

---

**MARKING GUIDE:**

Award up to 6 marks for valid points comparing [YEAR] to present day:

**[YEAR/ERA] - Characteristics:**
✓ [Historical technique 1]
✓ [Historical technique 2]
✓ [Historical approach 3]

**MODERN/CURRENT - Characteristics:**
✓ [Modern technique 1]
✓ [Modern technique 2]
✓ [Modern approach 3]

**Must show CHANGE/EVOLUTION between eras**

Example - Lead Vocal Production Since 1968:

**1968 Era:**
✓ Minimal processing, natural sound
✓ Simple compression, limited effects
✓ Tape-based recording, analog warmth
✓ Room ambience, natural reverb
✓ Less precise tuning (no pitch correction)
✓ More breath sounds, imperfections left in

**Modern Era:**
✓ Heavy processing, highly produced
✓ Multiple compressors, extensive effects chains
✓ Digital recording, pristine quality
✓ Artificial reverbs and delays
✓ Auto-Tune/Melodyne pitch correction
✓ Cleaned up, perfected takes
✓ Layered vocals, extensive harmonies
✓ De-essing, sibilance control
✓ Automation, detailed level control
```

**Historical Evolution Topics:**

| Topic | Key Evolution Points |
|-------|---------------------|
| **Vocal Production** | 60s: Natural, minimal processing → Now: Heavy Auto-Tune, layers, detailed processing |
| **Drum Recording** | 60s: Simple miking, room sound → Now: Close-miking, samples, triggers, replacement |
| **Mixing Techniques** | 60s: Limited tracks, simple panning → Now: Automation, extensive processing, stem mixing |
| **Mastering** | 60s: Basic leveling, tape → Now: Digital mastering, loudness wars, stem mastering |
| **Recording Technology** | 60s: Tape, limited tracks → Now: DAWs, unlimited tracks, non-destructive |
| **Effects** | 60s: Spring reverb, tape echo → Now: Plugins, convolution, endless possibilities |

---

### TYPE 11: Historical Technique Explanation (with AO3/AO4 split)

**Mark Value:** 4 marks (2 techniques × 2 marks each)
**AO:** AO3 (1 mark per technique) + AO4 (1 mark per explanation)

**Format:**
- "Explain [NUMBER] ways [technique/effect] may have been achieved when produced in [YEAR]"
- Part (i) = Technical point (AO3)
- Part (ii) = Explanation of how it works (AO4)
- Must be era-appropriate

**Example from 2024:**
"Explain two ways the reverb heard on the strings may have been achieved when the song was produced in 1969." (4 marks)

**2023:**
"This recording is from a remastered compilation released in 2000. Explain two types of EQ or filter that may have been used in the remastering process." (4 marks)

**Quiz Generation Template:**

```markdown
### Part [X]

**Context:** This song was produced in [YEAR]
**Task:** Explain [NUMBER] ways the [TECHNIQUE/EFFECT] [may have been / could have been] achieved when the song was produced in [YEAR]
**Marks:** 4

**Marking Structure:** 1 mark for each POINT (AO3) + 1 mark for each EXPLANATION (AO4)

1. _____________________
   _____________________
   _____________________
   _____________________

2. _____________________
   _____________________
   _____________________
   _____________________

---

**MARKING GUIDE:**

Award marks as follows:
- 1 mark for naming the technique (AO3)
- 1 mark for explaining how it works/was implemented (AO4)
- Repeat for second technique

**Acceptable Answers:**

| POINT (AO3 - 1 mark) | EXPLANATION (AO4 - 1 mark) |
|----------------------|----------------------------|
| [TECHNIQUE 1 with alternatives] | [How it works / how it was implemented / technical process] |
| [TECHNIQUE 2 with alternatives] | [How it works / implementation details] |
| [TECHNIQUE 3 with alternatives] | [How it works / implementation details] |

Example - Reverb in 1969:

| POINT (AO3) | EXPLANATION (AO4) |
|-------------|-------------------|
| Natural reverb / ambient miking / room mics / room reverb / strings played in acoustic space | Placing mics at far distance / using omni mic / use reverberant space / large space/hall / space with reflective surfaces / recorded track played back in reverberant space and re-recorded |
| Chamber reverb | Use a reverberant space / large space / hall / recorded track played back in reverberant space and re-recorded |
| Plate reverb | Signal fed to metal sheet / vibrating metal / uses transducers / pickups |

Example - Remastering EQ in 2000:

| POINT (AO3) | EXPLANATION (AO4) |
|-------------|-------------------|
| High shelf EQ / presence boost | Boost high frequencies / add brightness / compensate for tape roll-off / modern competitive sound |
| Low pass filter / high cut | Remove tape hiss / reduce noise / clean up top end |
| High pass filter / low cut / rumble filter | Remove low frequency noise / remove rumble / tighten bass / improve clarity |
| Parametric EQ | Surgical frequency correction / target specific problem frequencies / smooth response |
```

**Era-Appropriate Technologies:**

**1960s:**
- Spring reverb (guitar amps, studios)
- Plate reverb (EMT plates)
- Chamber reverb (echo chambers in studios)
- Natural room ambience
- Tape echo (Echoplex, Space Echo)
- Simple EQ (passive, shelving)

**1970s:**
- Above plus:
- Oil can delay (Binson Echorec)
- Bucket brigade delays
- Early synthesizers (Moog, ARP)
- 16/24-track tape
- Improved EQ (active, parametric)

**1980s:**
- Above plus:
- Digital reverb (Lexicon 224, AMS RMX16)
- Digital delays (rack units)
- Gated reverb
- MIDI sequencing
- Drum machines
- Early samplers (Fairlight, Emulator)

**2000s (Remastering Era):**
- Digital EQ (parametric, linear phase)
- Multi-band compression
- Digital limiting
- Restoration plugins (iZotope RX)
- Harmonic enhancement (Aphex Aural Exciter)
- Stem mastering
- Loudness maximization

---

## SECTION B QUESTION TYPES

### TYPE 12: Comparative Analysis (15 marks)

**AO Split:** AO3 (5 marks) + AO4 (10 marks)

**Format:**
- Two versions of same song (original vs cover/remake)
- Evaluate production techniques in each version
- Suggested aspects provided as guidance

**Examples:**
- **2024:** TOTO: Africa (1982) vs BACALL & Malo: Africa (2016)
- **2023:** Van Halen: Jump (1983) vs Paul Anka: Jump (2005)

**Full Template:**

```markdown
## Question [X] - [SONG TITLE]

**Track [X]:** [ARTIST 1] - [SONG TITLE] ([YEAR 1])

and

**Track [Y]:** [ARTIST 2] - [SONG TITLE] ([YEAR 2])

### Task

Evaluate the production techniques used in each version of the song.

Your response may consider the following production aspects:
• Capture, production approach and music style
• Synthesis [and/or other relevant aspects like sequencing, sampling]
• EQ and filtering
• Dynamic processing
• Pan and stereo field
• Effects

**Marks:** 15 (AO3: 5 marks, AO4: 10 marks)

**Time:** Approximately 18-20 minutes

---

**MARKING CRITERIA:**

This question requires:
- **AO3 (5 marks):** Technical facts, identification of techniques, equipment, settings
- **AO4 (10 marks):** Explanations of WHY/HOW techniques are used, musical purpose, comparisons

**Level Descriptors:**

| Level | Marks | Characteristics |
|-------|-------|-----------------|
| **5** | 13-15 | **SOPHISTICATED** - All/most AO3 explained for AO4, specific timestamps/instruments, wide scope, accurate throughout |
| **4** | 10-12 | **DETAILED** - Most AO3 with functional AO4, applied to specific songs, parameters detailed, largely accurate<br>OR highly detailed but limited scope |
| **3** | 7-9 | **CLEAR/GENERAL** - Valid AO3, limited AO4, general points that could apply to any song, limited processor discussion |
| **2** | 4-6 | **LIMITED** - Mainly AO3, some basic AO4, some inaccuracies |
| **1** | 1-3 | **VERY LIMITED** - Few AO3, no AO4, many inaccuracies |

**KEY ASSESSMENT POINTS:**
- ✓ Pair every technical point (AO3) with explanation (AO4)
- ✓ Reference specific instruments and timestamps
- ✓ Compare between versions, not just describe
- ✓ Cover wide scope (multiple production aspects)
- ✓ Song-specific NOT general statements
- ❌ Don't repeat points in different words
- ❌ Don't make statements that could apply to any song

---

**INDICATIVE CONTENT FRAMEWORK:**

Create a two-column table for marking:

| AO3 - Technical Points | AO4 - Explanations |
|------------------------|---------------------|
| **[Version 1]: [Year]** | **Purpose/Impact/Musical Context** |
| [Technical fact 1] | [Why used / Effect created / Musical purpose] |
| [Technical fact 2] | [Comparison to other version / Era context] |
| **[Version 2]: [Year]** | **Purpose/Impact/Musical Context** |
| [Technical fact 3] | [Why used / Effect created / Musical purpose] |
| [Technical fact 4] | [Comparison to other version / Era context] |

**Example Structure - Capture & Production:**

| AO3 | AO4 |
|-----|-----|
| V1: Large format multitrack/analogue/tape | Tape saturation, likely 24 tracks, warm sound |
| V1: Live-recorded tracks | Less rigid rhythmically, reflects relaxed approach |
| V2: DAW production, heavily reliant on sequencing | Tighter rhythms, mechanical, perfect timing |
| V2: Samples parts of original | Remixer must have used stems/acapella |

**Suggested Content Areas:**

1. **Capture & Production Approach** (AO3 → AO4)
   - Recording technology (tape vs DAW, analog vs digital)
   - Live instruments vs programmed/virtual instruments
   - Multi-track layout and approach
   - Music style implications

2. **Synthesis/Sequencing/Sampling** (AO3 → AO4)
   - Synthesis methods (analog, FM, PCM, subtractive)
   - Oscillator settings, waveforms
   - Sequencing (MIDI, quantization, velocity)
   - Sampling techniques

3. **EQ & Filtering** (AO3 → AO4)
   - Frequency balance (bright vs warm)
   - Specific EQ moves (HF boost, LF cut)
   - Filter sweeps, movements
   - Purpose (cut through mix, era-appropriate sound)

4. **Dynamic Processing** (AO3 → AO4)
   - Compression (light vs heavy, parallel, sidechain)
   - Limiting (mastering approach, loudness)
   - Transient shaping
   - Musical effect (pumping, glue, punch)

5. **Pan & Stereo Field** (AO3 → AO4)
   - Stereo width (narrow vs wide)
   - Specific pan positions
   - Movement, automation
   - Mono compatibility considerations

6. **Effects** (AO3 → AO4)
   - Reverb (type, size, decay, purpose)
   - Delay (time, feedback, rhythmic)
   - Modulation (chorus, flanger, phaser)
   - Creative effects
   - Era-appropriate choices

**Assessment Reminders:**
- Don't credit repeated points
- General statements score lower than specific ones
- Must show understanding of both technical AND musical aspects
- Comparison between versions essential for high marks
```

---

### TYPE 13: Technique Use + Broader Impact (20 marks)

**Format:**
- Single track provided
- Two-part question:
  1. How technique is used in THIS specific song (~5-8 marks)
  2. Broader impact on recorded music (~12-15 marks)

**Example from 2023:**
"Michael Kiwanuka: Hero (2019) - Lo-fi and retro production techniques"
- Evaluate use within the song
- Evaluate wider impact on recorded music

**Full Template:**

```markdown
## Question [X] - [ARTIST]: [SONG TITLE] ([YEAR])

**Track [X]**

### Context
This song uses [TECHNIQUE/APPROACH] to [describe purpose/effect].

### Task

Evaluate:
• the use of [TECHNIQUE] within [ARTIST]'s [SONG TITLE]
• the wider impact that [TECHNIQUE] [has had / have had] on recorded music

**Marks:** 20

**Time:** Approximately 25-27 minutes

---

**MARKING STRUCTURE:**

This question has TWO distinct parts:

**PART 1: Song-Specific Analysis** (~40% - aim for 8-10 marks worth of content)
- AO3: Identify techniques used in the song
- AO4: Explain purpose, effect, musical context
- **Must include specific timestamps**

**PART 2: Broader Impact** (~60% - aim for 10-15 marks worth of content)
- AO3: Historical context, examples from other artists/genres
- AO4: Explanation of influence, evolution, aesthetic impact
- **Can earn up to 15 marks for AO4 in this section**

---

**MARKING CRITERIA:**

Similar to Type 14 (Effect + Historical), but focused on aesthetic/production approach rather than single effect.

Award marks for:
- **Part 1:** Specific examples from song with timestamps, paired AO3/AO4
- **Part 2:** Historical context, genre impact, artist examples, technological factors, aesthetic evolution

**Quality Indicators:**
- ✓ Specific timestamps in Part 1
- ✓ Named artists/albums/genres in Part 2
- ✓ Technical depth (how techniques achieved)
- ✓ Aesthetic understanding (why techniques used)
- ✓ Historical evolution shown
- ✓ Multiple genres/eras covered
- ❌ Repetition of same points
- ❌ Vague generalizations without examples

---

**INDICATIVE CONTENT FRAMEWORK:**

### PART 1: Song-Specific (Organized by Timestamp)

```
(Throughout / Introduction / [Timestamp])
• [Technical detail - AO3] → [Musical/artistic impact - AO4]
• [Parameter/setting - AO3] → [Result/purpose - AO4]

Example Structure:
(0:00-0:30 - Introduction)
• Lo-fi tape saturation/distortion (AO3) → Creates warm, vintage feel (AO4)
• Limited frequency range/rolled off highs (AO3) → Simulates old recordings, nostalgic (AO4)

(Vocals throughout)
• Tape compression/limiting (AO3) → Reduces dynamic range, cohesive sound (AO4)
• Analog warmth/saturation (AO3) → Musical, pleasant distortion (AO4)
```

### PART 2: Broader Impact (Organized by Theme/Era)

```
**Historical Development:**
• [Era/movement - AO3] → [Impact/influence - AO4]
• [Technology - AO3] → [Aesthetic result - AO4]

**Genre Impact:**
• [Genre/style - AO3] → [Characteristics/examples - AO4]

**Artist Examples:**
• [Artist/album - AO3] → [Techniques/approach - AO4]

**Technological Factors:**
• [Technology limitation/choice - AO3] → [Musical outcome - AO4]

Example Content:

**Hip-Hop & Lo-Fi:**
• Boom-bap aesthetic (AO3) → Warm, dusty, sample-based sound (AO4)
• SP-1200 sampler (AO3) → 12-bit crunch, limited memory shaped sound (AO4)
• J Dilla, Madlib (AO3) → Pioneers of intentional lo-fi aesthetic (AO4)

**Indie/Alternative:**
• Bedroom recording aesthetic (AO3) → Authentic, intimate, DIY ethos (AO4)
• Ariel Pink, Mac DeMarco (AO3) → Cassette recording, vintage gear (AO4)

**Electronic Music:**
• Chillhop/Lo-fi hip-hop (AO3) → Study beats, relaxation genre (AO4)
• Vinyl crackle, tape hiss (AO3) → Nostalgic textures, atmosphere (AO4)

**Technical Aspects:**
• Bit-crushing (AO3) → Intentional degradation, character (AO4)
• Tape wow/flutter (AO3) → Pitch instability, organic feel (AO4)
• Analog emulation plugins (AO3) → Access to vintage sound in digital (AO4)

**Cultural Impact:**
• Rejection of "perfection" (AO3) → Counter to loudness wars (AO4)
• Nostalgia trend (AO3) → Connects with vinyl revival, analog appreciation (AO4)
```

---

**TOPIC-SPECIFIC FRAMEWORKS:**

#### Lo-Fi/Retro Production:

**Song-Specific Points:**
- Tape saturation/distortion
- Vinyl crackle/surface noise
- Reduced frequency range
- Analog warmth
- Wow/flutter, pitch instability
- Bit-crushing/reduction
- Old microphone emulation
- Room ambience/natural reverb

**Broader Impact Points:**
- Hip-hop sampling tradition (SP-1200, MPC)
- Bedroom recording movement
- Lo-fi hip-hop genre emergence
- Rejection of digital perfection
- Vinyl revival connection
- Chillwave, vaporwave aesthetics
- Notable artists: J Dilla, Mac DeMarco, Ariel Pink
- Plugins enabling access (RC-20, Izotope Vinyl)

---

**ASSESSMENT REMINDERS:**

For Part 1 (Song Analysis):
- MUST include timestamps
- MUST describe specific techniques heard
- MUST explain musical/artistic purpose

For Part 2 (Broader Impact):
- Should reference multiple genres/movements
- Should name specific artists/albums
- Should explain technological factors
- Should discuss aesthetic/cultural impact
- Can earn substantial marks (up to 15 for AO4)

**Balance:** Aim for roughly 40% Part 1, 60% Part 2 in student responses
```

---

### TYPE 14: Effect Use + Historical Development (20 marks)

**Format:**
- Single track provided
- Two-part question:
  1. How effect is used in THIS specific song
  2. Historical development from 1940s to present

**Example from 2024:**
"Keane: Atlantic (2006) - Delay effects"
- Evaluate use of delay within the song
- Evaluate methods to create delay from 1940s through present day

**Full Template:**

```markdown
## Question [X] - [ARTIST]: [SONG TITLE] ([YEAR])

**Track [X]**

### Context
This song uses [EFFECT NAME] effects.

### Task

Evaluate:
• the use of [EFFECT] effects within the song
• the methods used to create [EFFECT] effects from the [START DECADE] through to the present day

**Marks:** 20

**Time:** Approximately 25-27 minutes

---

**MARKING STRUCTURE:**

**PART 1: Song-Specific Analysis** (aim for 8-10 marks of content)
- Organized by TIMESTAMP
- Technical details (AO3) + Musical impact (AO4)
- Must reference specific sections/instruments

**PART 2: Historical Development** (can earn up to 15 marks for AO4)
- Organized by ERA/TECHNOLOGY
- Technology (AO3) + How it works + Musical context (AO4)
- Should cover multiple eras
- Should link to genres/artists (max 1 mark per effect type)

---

**PART 1 FRAMEWORK: Song-Specific Analysis**

Organize by TIMESTAMP with paired AO3/AO4:

```
(Throughout / [Timestamp])
• [Technical detail - AO3] → [Musical/artistic impact - AO4]
• [Parameter/setting - AO3] → [Result/purpose - AO4]

(Next section / [Timestamp])
• [Technical detail - AO3] → [Impact - AO4]

Example for Delay:

(Throughout)
• Tape/analog delay (AO3) → Swirling/resonant/layered/atmospheric (AO4)
• Multiple delays layered (AO3) → Thick texture, complex soundscape (AO4)
• High feedback (AO3) → Regeneration, more intense, lasts longer (AO4)

(Drum entry 0:20)
• Slap back delay on snare (AO3) → Adds sustain without cluttering (AO4)
• Single repeat, no feedback (AO3) → Keeps rhythm tight (AO4)
• 120-150ms delay time (AO3) → Matches tempo, doubling effect (AO4)

(1:03 onwards - Vocal)
• 8th note delay, 400-600ms (AO3) → Fills gaps in slow tempo song (AO4)
• Low/medium feedback (AO3) → Few repeats, adds space (AO4)
• Tape/analog delay (AO3) → Lo-fi, filtered, warm character (AO4)

(2:33 onwards - Hi-hat)
• 16th note, short delay time (AO3) → Adds rhythm/complex/mechanical (AO4)
• High feedback, increases (AO3) → Builds intensity, regeneration (AO4)
• Feedback automated (AO3) → Dynamic, evolves through section (AO4)
• Filtered, LPF (AO3) → Sounds become dull, pitch variations (AO4)
```

---

**PART 2 FRAMEWORK: Historical Development**

Organize by ERA with technology + context:

```
**[Decade/Era]:**
• Technology: [Name/type]
• How it works: [Technical explanation]
• Characteristics: [Sonic qualities]
• Musical context: [Genres, artists, uses]
• Impact: [What it enabled]
```

**EXAMPLE: DELAY/ECHO HISTORICAL DEVELOPMENT**

```markdown
**1940s-1950s-1960s-1970s: TAPE DELAY**

Technology:
• Tape machines/tape loops/tape delay
• Space Echo/Copycat/Echorec/Echoplex/EchoSonic
• Tape speed/head selection controls delay time

How it Works:
• Signal recorded to tape
• Played back from playback head(s)
• Multiple heads create multiple taps
• Feedback loop for repeats
• Erase head can be removed (sound-on-sound)

Sonic Characteristics:
• Lo-fi, warm sound
• Restricted high end/warm
• Creates swirling/resonant/layered/trippy sounds
• Degrades over time (pitch/frequency imperfections)
• Tape speed changes give pitch effects
• Saturation/soft clipping from overloading
• Wow/flutter (pitch instability)

Uses & Context:
• Difficult to achieve accurate delay times/no tempo sync
• Popular in science fiction soundtracks
• Electroacoustic composers (Stockhausen)
• Dub/reggae/punk/electronica/prog rock
• Reverse delays possible
• More than 100% feedback = infinite/regenerating delays

Slap-Back Delay (Specific Use):
• Rock and roll (Elvis)
• 80-150ms, single repeat
• High wet level/loud repeat
• Most used on vocals
• Doubling/layered effect without affecting clarity

---

**Late 1950s-1960s: OIL CAN / DRUM DELAY**

Technology:
• Oil can delay (Gibson/Fender guitar amps)
• Drum delay (Binson Echorec)

Characteristics:
• More compact than tape delay
• Used by Pink Floyd (Echorec)

---

**Late 1960s-1970s: BUCKET BRIGADE (BBD) DELAY**

Technology:
• Solid state, capacitor-based
• Guitar delay pedals (Memory Man, Boss DM2)

How it Works:
• Uses capacitors to store/pass signal
• Charge passed through stages

Characteristics:
• Short delays only
• Easily overloads, limited dynamic range
• Saturation/soft clipping, warm sound
• Noisy, clock noise
• More compact than tape

Uses:
• Automatic double-tracking (ADT)
• Karaoke machines
• Guitar pedals
• More than 100% feedback possible

---

**1970s-1980s: DIGITAL DELAY (DDL)**

Technology:
• Solid state, DSP-based
• Outboard/rack units
• Guitar delay pedals

How it Works:
• Signal converted to digital
• Stored in memory buffer
• Converted back to analog

Characteristics & Advantages:
• More accurate delay times
• Tempo/beat sync/tap tempo
• More accurate copy of original signal
• More control over delay patterns/repeat volumes/multi-tap
• Stereo/panned/ping-pong delay
• Different delay times for each channel
• Filtering (low pass/high pass)
• Reverse delays

Processing:
• MIDI control/automation
• Presets can be stored
• More than 100% feedback = infinite/regenerating

Uses & Context:
• Used to create reverb
• Modulated effects (chorus/flange/phaser)
• Resonant/metallic delay (short delay + feedback)
• The Edge/U2 (layering effect on guitars)

---

**1990s-2000s-PRESENT: PLUGINS/DAW**

Technology:
• Software emulation/convolution
• All features of digital delay
• Emulation of earlier types

Characteristics:
• More control, more accurate
• Tempo/beat sync, tap tempo
• Stereo/ping-pong, filtering
• MIDI/automation, presets
• Freeze/infinite sustain

Processing:
• Creates reverb/modulation effects
• Resonant/metallic delay (EDM - short delays + feedback)
• More than 100% feedback

Uses:
• All previous delay types can be emulated
• Convolution of hardware units
```

---

**SPECIAL MARKING RULES:**

From Mark Scheme:
• Max 1 mark for linking artist/genre to specific technology
• Max 1 mark for linking decade to technology (must have detail)
• Don't credit repeated points

Example:
✓ "Tape delay used in dub reggae for psychedelic effects" (1 mark)
✓ "1980s: Digital delay units like Lexicon provided accurate delay times and MIDI sync" (1 mark)
❌ "1980s: Digital delay" with no other detail (0 marks)

---

**ASSESSMENT CRITERIA:**

**For HIGH marks students need:**
- Part 1: Timestamps, specific techniques, paired AO3/AO4
- Part 2: Multiple eras covered, technical depth, musical context
- Link technology to genres/artists appropriately
- Show evolution and development
- Explain how technology shaped music
- Balance between technical and musical understanding

**Common pitfalls:**
- Just listing technologies without explaining how they work
- No musical context (genres, artists, uses)
- Insufficient detail in song analysis
- No timestamps in Part 1
- Repetition of same information
- Anachronistic technologies (e.g., plugins for 1960s)
```

---

## QUESTION GENERATION TEMPLATES

### Quick Reference Template Structure

```markdown
## Question [NUMBER] - [ARTIST]: [SONG] ([YEAR])
Track [NUMBER]

### Part [LETTER] ([MARKS] marks)

**Type:** [Question Type from above]
**AO:** [AO3 / AO4 / AO3+AO4]

**Task:** [Question text]
**Time Range:** [START:END] (if applicable)
**Exclusions:** [If applicable]

[ANSWER SPACE or DIAGRAM]

---

**MARKING GUIDE:**

[Marking criteria based on question type]
```

---

## ASSESSMENT CRITERIA REFERENCE

### Section A Questions (1-10 marks each)

**Simple Identification (1-2 marks):**
- Correct term(s) required
- Accept alternative terminology
- Some terms explicitly rejected
- 1 mark per correct answer

**Description Questions (2-4 marks):**
- Multiple valid points needed
- Must use technical terminology
- "Any X of the following..."
- Vague terms often rejected

**Historical/Explanation (4 marks):**
- AO3 (point) + AO4 (explanation) × 2
- Must be era-appropriate
- Both elements needed for full marks

**Extended Description (6 marks):**
- Multiple aspects covered
- Wide scope required
- Specific details valued
- Era knowledge demonstrated

---

### Section B Questions (15-20 marks)

**15-Mark Questions:**
- AO3: 5 marks
- AO4: 10 marks
- Must pair technical points with explanations

**20-Mark Questions:**
- Can earn up to 15 marks for AO4 in historical section
- Balance between song analysis and broader discussion
- Multiple eras/genres expected

**Level Boundaries:**
- Level 5 (13-15 or 17-20): Sophisticated, specific, wide scope
- Level 4 (10-12 or 14-16): Detailed, functional explanations
- Level 3 (7-9 or 11-13): Clear but general
- Level 2 (4-6 or 7-10): Limited, mainly facts
- Level 1 (1-3 or 1-6): Very limited

---

## TECHNICAL TERMINOLOGY REFERENCE

### Effects Terms (with alternatives):

| Effect | Acceptable Terms |
|--------|------------------|
| Delay | Delay, Echo |
| Reverb | Reverb, Reverberation, Room, Hall, Plate, Spring, Chamber |
| Chorus | Chorus, Ensemble |
| Flanger | Flanger, Jet, Flanging |
| Phaser | Phaser, Phasing |
| Distortion | Distortion, Overdrive, Saturation, Drive, Clipping, Bit-crusher |
| Auto-Tune | Auto-Tune, Pitch correction, Vocal tuning, Pitch shift (when corrective) |
| Vocoder | Vocoder, Harmoniser (in some contexts), Talkbox |
| Tremolo | Tremolo, Amplitude modulation, AM |
| Vibrato | Vibrato, Pitch modulation |
| Compression | Compression, Dynamic range compression, Compressor |
| De-essing | De-esser, De-essing, Sibilance reducer |
| ADT | ADT, Artificial double tracking, Automatic double tracking, Double tracking |

### Synthesis Terms:

| Element | Acceptable Terms |
|---------|------------------|
| Waveforms | Sine, Saw/Sawtooth/Ramp, Square/Pulse/Rectangular, Triangle |
| Filter Types | Low pass/LPF/High cut, High pass/HPF/Low cut, Band pass/BPF, Notch/Band reject |
| Modulation | LFO, Low frequency oscillator, Modulation |
| Envelope | ADSR, Envelope, Amplitude envelope, Filter envelope |
| PWM | PWM, Pulse width modulation, Variable pulse width |

### Recording Terms:

| Aspect | Acceptable Terms |
|--------|------------------|
| Gain Control | Reduce recording level, Reduce gain, Lower input level |
| Mic Distance | Increase mic distance, Move mic further, Back off mic |
| Attenuation | Pad, Attenuator, Attenuation, -10dB pad |
| Pan Position | Pan, Panning, Stereo position, L/C/R, Hard left/right |

### REJECTED Terms:

❌ "Turn mic down" (correct: reduce recording level)
❌ "Decrease mic level" (correct: reduce recording level)
❌ "Use a mute" (for reducing level)
❌ "Short pre-delay" when actually long
❌ "Slight resonance" / "Low resonance" (too vague)
❌ "Nice reverb" / "Good sound" (not technical)

---

## TIME MANAGEMENT GUIDE

**Section A (40 marks) - 45 minutes:**
- 1-2 mark questions: 1-2 minutes
- 3-4 mark questions: 3-5 minutes
- 6 mark question: 8-10 minutes
- Total: approximately 1 minute per mark

**Section B (35 marks) - 45 minutes:**
- 15-mark question: 18-20 minutes
- 20-mark question: 25-27 minutes
- Slightly more than 1 minute per mark for writing time

**Total Exam: 1 hour 30 minutes (75 marks)**

---

## APPENDIX: Era-Specific Technology

### 1940s-1950s:
- Tape delay, echo chambers
- Plate reverb (late 50s)
- Tube/valve equipment
- Mono recording
- Direct-to-disc (early)
- Limited multi-tracking (2-track by late 50s)

### 1960s:
- 4-track, 8-track recording
- Spring reverb
- ADT (Artificial Double Tracking)
- Leslie speakers
- Oil can delay
- Early synthesizers (late 60s: Moog)
- Improved microphones

### 1970s:
- 16/24-track recording
- Bucket brigade delays
- Analog synthesizers (Moog, ARP, Oberheim)
- Improved plate reverbs
- Phasing, flanging units
- Early drum machines

### 1980s:
- Digital reverb (Lexicon, AMS)
- Digital delay
- MIDI (1983 onwards)
- Drum machines (808, 909, LinnDrum)
- Samplers (Fairlight, Emulator)
- FM synthesis (DX7)
- Gated reverb
- Early DAWs (end of decade)

### 1990s:
- DAW recording widespread
- Software plugins emerge
- CD recording standard
- Auto-Tune (1997)
- Loop-based production
- Virtual instruments

### 2000s:
- DAWs standard
- Extensive plugin libraries
- Melodyne
- Convolution reverb
- Amp modeling
- Stems and mixing in the box
- Loudness wars peak

### 2010s-Present:
- Sophisticated plugins
- Machine learning/AI processing
- Streaming optimization
- Spatial audio
- Modular synthesis revival
- Analog emulation refined

---

*End of Quiz Generation Framework*

---

## USAGE NOTES FOR QUIZ CREATORS

1. **Always specify time ranges** - Students must know exactly when to listen
2. **Include mark allocations** - Guides how much detail to provide
3. **Provide alternative terminology** - Mark schemes accept multiple terms
4. **Note explicit rejections** - Some phrasings are always wrong
5. **Ensure era-appropriate technology** - Don't suggest DAWs for 1960s
6. **Balance AO3 and AO4** - Extended responses need both facts and explanations
7. **Use specific thresholds** - e.g., "3dB or more", not just "boost"
8. **Organize by timestamp** - Especially for song analysis questions
9. **Include quality audio** - Effects must be clearly audible
10. **Test questions yourself** - Ensure they're answerable from the audio

Remember: The goal is to assess both technical knowledge (AO3) and musical understanding (AO4).
