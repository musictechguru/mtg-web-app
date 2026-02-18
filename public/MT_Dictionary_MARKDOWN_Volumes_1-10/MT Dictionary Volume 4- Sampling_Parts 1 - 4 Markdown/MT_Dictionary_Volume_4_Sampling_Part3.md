# Music Tech Dictionary
## Volume 4: Sampling & Sequencing Complete - FULL COMPREHENSIVE EDITION
### Part 3 of 4: Multi-Sampling & Time-Stretching Techniques

---

# PART 2: MULTI-SAMPLING TECHNIQUES

## 4. Multi-Sampling Advanced

### Velocity Layers
**Multiple samples recorded at different playing intensities mapped to velocity ranges.**

**Concept:**
- Same note recorded at multiple dynamics
- Soft hit: quiet sample
- Medium hit: medium sample
- Hard hit: loud sample
- Velocity value (0-127) determines which sample plays

**Typical Layers:**
- **Basic:** 2 layers (soft/loud)
- **Standard:** 3-4 layers (soft/medium/loud/very loud)
- **Professional:** 5-8 layers (very detailed dynamics)
- **Premium:** 12-16+ layers (extremely realistic, large library size)

**Velocity Ranges:**
- **2 layers:** 1-63 (soft), 64-127 (loud)
- **3 layers:** 1-42 (soft), 43-85 (medium), 86-127 (loud)
- **4 layers:** 1-31, 32-63, 64-95, 96-127

**Why Needed:**
- Realistic dynamics (not just volume change)
- Timbral differences (soft hit sounds different than quiet loud hit)
- Attack variation (soft = slower attack typically)
- Harmonic content changes (loud = more harmonics)

**Example - Piano:**
- Soft (pp): Warm, mellow, fewer harmonics
- Medium (mf): Balanced, natural
- Loud (f): Bright, percussive, many harmonics
- Very Loud (ff): Brilliant, full harmonic spectrum

**Crossfading Between Layers:**
- Smooth transition between velocity layers
- Overlap region: 5-20 MIDI values
- Both samples play simultaneously in overlap
- Crossfade prevents abrupt switching
- More realistic dynamic response

**Memory vs Realism:**
- More layers: more realistic, larger file size
- Fewer layers: less realistic, smaller file size
- Modern computers: handle many layers easily
- Trade-off less critical than past

---

### Velocity Crossfade
**Smooth blending between velocity layers in overlap regions.**

**Process:**
1. Define overlap zone (e.g., velocity 60-70)
2. Layer 1: full volume at velocity 60, fades out to velocity 70
3. Layer 2: fades in from velocity 60, full volume at velocity 70
4. In overlap: both layers play, crossfading

**Crossfade Width:**
- **Narrow (5-10 values):** More distinct layers, less smooth
- **Medium (10-20 values):** Balanced, natural
- **Wide (20-40 values):** Very smooth, less layer definition

**Curves:**
- **Linear:** Straight crossfade (can sound unnatural)
- **Equal Power:** Maintains perceived loudness during crossfade
- **Exponential:** More natural to human perception

**Advantages:**
- Eliminates abrupt switching between samples
- More realistic dynamic response
- Smoother playing experience
- Professional sound quality

**Applications:**
- Piano (essential for realistic dynamics)
- Strings (bow pressure variations)
- Brass/Woodwinds (breath pressure)
- Drums (stick velocity)

---

### Round Robin
**Alternating between multiple recordings of same note to avoid machine-gun effect.**

**Problem Solved:**
- Same sample repeated: sounds mechanical ("machine-gun effect")
- Especially noticeable: repeated hits (hi-hats, snare, strummed guitars)
- Unrealistic: real instruments vary slightly each hit

**Solution:**
- Record same note multiple times (3-8 takes typical)
- Each recording slightly different (timing, tone, attack)
- Sampler cycles through recordings
- Each hit sounds unique

**Round Robin Count:**
- **2-3 samples:** Basic variation, reduces machine-gun effect
- **4-6 samples:** Good variation, natural sound
- **8-12 samples:** Excellent variation, very realistic
- **16+ samples:** Ultimate realism (premium libraries)

**Cycling Methods:**
- **Sequential (Round Robin):** 1 → 2 → 3 → 1 → 2 → 3... (most common)
- **Random:** Computer randomly selects sample each hit
- **Velocity-triggered:** Different samples at different velocities

**Applications:**
- **Drums:** Hi-hats, snares, toms (repeated hits)
- **Guitar:** Strums, picks (each strum slightly different)
- **Percussion:** Shakers, tambourine, claves
- **Piano:** Soft repeated notes (subtle variation)
- **Orchestral:** Staccato strings, woodwinds

**Memory Impact:**
- Round robin multiplies samples needed
- 88 piano keys × 4 velocity layers × 6 round robins = 2,112 samples
- Modern computers handle easily
- Streaming from disk helps (not all in RAM)

---

### Key Zones (Key Mapping)
**Assigning samples to specific keyboard ranges.**

**Concept:**
- Each sample assigned to range of MIDI notes
- Sample pitched up/down across zone
- Multiple zones cover entire keyboard

**Mapping Strategies:**

**Single Sample Across Keyboard:**
- One sample stretched across all keys
- Extreme pitch-shifting (sounds unnatural)
- Low quality, small file size
- Acceptable for: sound effects, simple tones

**Multi-Sample Every Octave:**
- Sample every 12 notes (C, C, C...)
- Each sample covers octave (±6 semitones)
- Good balance: quality vs file size
- Piano: 8 samples cover 88 keys

**Multi-Sample Every Few Notes:**
- Sample every 3-6 notes (every minor 3rd to tritone)
- Higher quality (less pitch-shifting)
- Larger file size
- Professional libraries

**Multi-Sample Every Note:**
- Every single note recorded (88 samples for piano)
- No pitch-shifting needed
- Maximum realism
- Very large file size
- Premium sample libraries

**Crossfading Between Zones:**
- Overlap zones with crossfade
- Smooth transition between samples
- Prevents abrupt timbre changes
- Overlap: 2-6 semitones typical

---

### Sample Start Offset
**Beginning point of sample playback (skips attack portion).**

**Purpose:**
- Skip attack transient
- Start from sustained portion
- Create variations from single sample
- Timing adjustment

**Applications:**
- **Legato playing:** Skip attack on overlapping notes
- **Variation:** Different start points = different character
- **Timing:** Fine-tune sample timing
- **Loops:** Start from loop point immediately

**Modulation:**
- **Velocity:** Harder hit = earlier start (more attack)
- **Random:** Slight randomization (variation)
- **LFO:** Cyclic offset changes (experimental)

---

### Release Samples
**Dedicated sample for note release (key-off) sounds.**

**Concept:**
- Separate sample triggered when key released
- Captures: string release noise, key click, resonance tail
- More realistic: natural instrument behavior

**Examples:**
- **Piano:** Key release thunk, string resonance
- **Guitar:** Fret noise, string release
- **Organ:** Click of key release (Hammond organ essential)
- **Electric Piano:** Release click (Rhodes, Wurlitzer)

**Triggering:**
- Plays when: MIDI note-off received
- Volume: Often velocity-dependent
- Duration: Usually short (50-500ms)

**Professional Libraries:**
- Premium piano libraries: include release samples
- Adds: realism, organic quality
- Subtle but important: for authentic sound

---

## 5. Time-Stretching Techniques

### WSOLA (Waveform Similarity Overlap-Add)
**Time-stretching algorithm based on waveform matching.**

**How It Works:**
1. Divide audio into short segments (grains)
2. Find similar waveforms in adjacent segments
3. Overlap and crossfade similar sections
4. Result: time-stretched without pitch change

**Characteristics:**
- Good quality for moderate stretching (75-150%)
- Maintains transients reasonably well
- Moderate CPU usage
- Better for: rhythmic material, speech

**Artifacts:**
- Phasiness (moderate stretching)
- Smearing (extreme stretching)
- Transient blurring (significant stretching)

**Best For:**
- Beat matching (90-110% tempo changes)
- Vocal timing correction
- General time-stretching

---

### Phase Vocoder
**Frequency-domain time-stretching using FFT (Fast Fourier Transform).**

**How It Works:**
1. Convert audio to frequency domain (FFT)
2. Adjust phase relationships between frequency bins
3. Reconstruct audio at new duration
4. Pitch remains constant

**Characteristics:**
- Excellent for sustained tones (pads, strings)
- Good quality for moderate changes
- CPU-intensive
- Poor for: transients, percussive material

**Artifacts:**
- Phasiness (characteristic phase vocoder sound)
- Transient smearing (percussive attacks blurred)
- Pre-echo (energy before transients)

**Best For:**
- Pads and atmospheric sounds
- Sustained tones
- Moderate time changes (80-125%)
- Non-percussive material

---

### Élastique (Zplane)
**Professional-grade time-stretching algorithm (industry standard).**

**Characteristics:**
- Highest quality commercially available
- Handles wide range of stretching (25-400%)
- Excellent transient preservation
- Formant preservation options
- Used in: Pro Tools, Logic Pro, Studio One

**Modes:**
- **Efficient:** Fast, good quality, moderate CPU
- **Pro:** Best quality, more CPU
- **Mobile:** Optimized for iOS devices
- **Soloist:** Monophonic material (vocals, leads)

**Advantages:**
- Industry-leading quality
- Minimal artifacts
- Wide stretching range
- Professional standard

**Best For:**
- All material types
- Extreme time changes
- Professional productions
- Final masters

---

### Paulstretch
**Extreme time-stretching algorithm creating drone-like textures.**

**How It Works:**
1. Stretches audio to extreme lengths (100x to 1000x+)
2. Phase randomization
3. Creates smooth, evolving drones
4. Completely transforms original

**Characteristics:**
- Extreme stretching only (100x-1000x+)
- Creates ethereal, ambient textures
- Original becomes unrecognizable
- Smooth, evolving sound

**Parameters:**
- Stretch amount (100x typical minimum)
- Window size (affects texture grain)

**Applications:**
- Ambient music (drones from any sound)
- Sound design (create evolving pads)
- Film scoring (atmospheric textures)
- Experimental music

**Famous Uses:**
- Aphex Twin (ambient works)
- Film sound design (tension, atmosphere)
- Ambient producers worldwide

---

### Time-Stretch Artifacts
**Common problems and solutions in time-stretching.**

**Phasiness/Chorusing:**
- Cause: FFT processing, grain overlap
- Sounds like: Slight chorus/flange effect
- Reduce: Use transient-preserving algorithms, smaller stretch amounts

**Transient Smearing:**
- Cause: Algorithm averages attack transients
- Sounds like: Blurred, soft attacks
- Reduce: Transient-detection algorithms, manual transient preservation

**Warbling/Modulation:**
- Cause: Pitch inconsistencies during stretch
- Sounds like: Pitch wobbling
- Reduce: Better algorithms, formant preservation

**Metallic Quality:**
- Cause: Frequency bin artifacts
- Sounds like: Digital, robotic
- Reduce: Higher quality algorithms, smaller window sizes

**Solutions:**
- Use best algorithm for material type
- Smaller stretches sound better (chain multiple small stretches)
- Enable formant preservation (vocals)
- Manual transient preservation
- Accept artifacts as creative effect

---

*[Content continues in Part 4 with complete MIDI coverage]*

