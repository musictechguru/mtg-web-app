# Music Tech Dictionary
## Volume 8: Mastering & Audio Editing Complete - FULL COMPREHENSIVE EDITION
### Part 3 of 3: Audio Editing Complete

---

# PART 3: AUDIO EDITING

## 5. Editing Fundamentals

### Audio Editing Definition
**Manipulating recorded audio through cutting, arranging, processing, and correcting.**

**Types of Editing:**
- **Destructive:** Permanently alters audio file
- **Non-destructive:** Original file untouched (DAW standard)
- **Waveform editing:** Visual editing of audio waveform
- **Arrangement:** Moving, copying, deleting regions
- **Corrective:** Fixing problems (clicks, pops, noise)
- **Creative:** Creating new arrangements, effects

**Common Editing Tasks:**
- Cutting and trimming
- Crossfading
- Comping (composite from multiple takes)
- Timing correction
- Pitch correction
- Noise removal
- Click/pop removal
- Restoration

---

### Regions/Clips
**Sections of audio that can be moved, copied, edited independently.**

**What They Are:**
- Pointers to audio file
- Can be trimmed, moved, copied
- Non-destructive (original file unchanged)
- Multiple regions can reference same file

**Region Operations:**

**Trim:**
- Adjust start/end points
- Shorten or lengthen region
- Original audio still exists

**Split/Cut:**
- Divide region into two or more parts
- Creates new region boundaries
- Each part independently editable

**Copy/Duplicate:**
- Create identical region copy
- References same audio file
- Useful for repeating sections

**Move:**
- Reposition in timeline
- Change location in arrangement
- Snap to grid or free positioning

**Fade In/Out:**
- Gradual volume change at start/end
- Prevents clicks
- Smooth transitions

---

### Crossfading
**Overlapping two audio regions with one fading out while other fades in.**

**Purpose:**
- Smooth transition between takes
- Eliminate clicks at edit points
- Blend different performances
- Create seamless edits

**Crossfade Length:**
- **Short (5-20ms):** Quick transition, minimal overlap
- **Medium (20-100ms):** Standard, smooth transition
- **Long (100-500ms):** Gradual blend, obvious transition

**Crossfade Curves:**
- **Linear:** Straight fade (can dip in middle)
- **Equal Power:** Maintains perceived loudness (standard)
- **Exponential:** Faster start/end, slower middle
- **S-Curve:** Smooth acceleration/deceleration

**When to Use:**
- Edit points (all cuts should have crossfade)
- Comping (blending takes)
- Arrangement transitions
- Removing clicks

**Professional Practice:** Every edit should have crossfade (even short). Equal power curve standard. Adjust length by ear. Check for phase issues.

---

### Comping (Composite Recording)
**Creating single perfect performance from multiple takes.**

**Process:**
1. Record multiple full takes
2. Listen to each take
3. Select best parts from each
4. Compile into single composite
5. Crossfade between sections
6. Result: "perfect" performance

**Workflow:**

**Playlisting:**
- Record each take to playlist/lane
- View all takes simultaneously
- Easy comparison
- Visual selection

**Selection:**
- Listen critically
- Mark best sections
- Consider: performance, timing, tone, feel
- Not always "perfect" = best (feel matters)

**Editing:**
- Create new track for comp
- Copy best sections to comp track
- Crossfade between sections (20-100ms)
- Fine-tune transitions

**Common for:**
- **Vocals:** Almost always comped
- **Guitars:** Lead parts, solos
- **Bass:** Complex parts
- **Any critical performance**

**Professional Practice:** Record 3-5 takes minimum. Don't just pick "perfect" notes (consider feel). Smooth crossfades essential. Check entire comp in context.

---

### Timing Correction
**Adjusting audio timing to align with tempo grid or fix rhythmic issues.**

**Methods:**

**Manual Editing:**
- Cut and move audio
- Align to grid
- Most precise control
- Time-consuming

**Elastic Audio/Flex Time:**
- DAW stretches/compresses audio
- Non-destructive
- Align to grid automatically
- Can sound unnatural if extreme

**Beat Detective/Similar:**
- Analyzes transients
- Quantizes to grid
- Creates cuts automatically
- For drums, percussive material

**Time-Stretching:**
- Changes length without pitch
- Align longer sections
- Quality depends on algorithm

**Applications:**

**Drum Timing:**
- Tighten kick, snare to grid
- Subtle correction (don't over-quantize)
- Preserve human feel

**Bass Alignment:**
- Lock to kick drum
- Tight rhythm section
- Professional sound

**Vocal Timing:**
- Align consonants to beat
- Subtle corrections
- Don't lose natural feel

**Professional Practice:** Subtle corrections only. Preserve human feel (don't over-quantize). Use best tool for material. Check in context.

---

### Pitch Correction
**Adjusting pitch of recorded audio to correct tuning or create effects.**

**Tools:**

**Autotune/Melodyne (Automatic):**
- Detects pitch
- Snaps to nearest note
- Speed control (natural to robotic)
- Real-time or offline

**Manual Pitch Editing:**
- Melodyne/Pitcher
- Visual note editing
- Precise control
- Note-by-note adjustment

**Applications:**

**Vocal Tuning:**
- Correct off-pitch notes
- Subtle: 20-50% correction (sounds natural)
- Obvious: 100% (Autotune effect)
- Preserve vibrato and character

**Instrument Tuning:**
- Guitar, bass intonation issues
- Brass, string pitch correction
- Preserve timbre

**Creative Effects:**
- Hard Autotune (T-Pain effect)
- Harmony generation
- Pitch shifting for effect

**Natural vs Effect:**
- Natural: Slow retune speed, preserve formants
- Effect: Fast retune, hard correction
- Context determines approach

**Famous Pitch Correction:**
- Antares Auto-Tune ($99-399)
- Celemony Melodyne ($99-849)
- Waves Tune ($79-179)
- Logic Flex Pitch (built-in)

**Professional Practice:** Subtle correction preserves natural sound. Don't correct vibrato. Check consonants (can sound robotic). Use for polish, not to fix bad performance.

---

## 6. Audio Restoration

### Noise Reduction
**Removing unwanted background noise while preserving wanted signal.**

**Types of Noise:**
- **Broadband:** White noise, hiss, HVAC
- **Tonal:** Hum (50/60Hz), power line noise
- **Impulsive:** Clicks, pops, crackle
- **Environmental:** Traffic, room tone, wind

**Broadband Noise Reduction:**

**Process:**
1. Select noise-only section (noise profile)
2. Algorithm learns noise characteristics
3. Applies reduction across entire file
4. Adjusts amount by ear

**Settings:**
- Reduction amount: 6-15dB typical
- Threshold: How much noise to remove
- Reduce: Aggressiveness (higher = more artifacts)

**Tools:**
- iZotope RX (industry standard, $399-1299)
- Accusonus ERA Noise Remover ($99)
- Waves NS1/X-Noise ($99-299)
- Adobe Audition Noise Reduction

**Professional Practice:** Learn noise profile from clean section. Reduce conservatively (too much = artifacts). Check for "underwater" sound. Process in passes (multiple gentle passes better than one heavy).

---

### De-Clicking/De-Popping
**Removing clicks, pops, and mouth sounds.**

**Sources:**
- Vinyl record clicks
- Digital clicks (errors, glitches)
- Mouth noises (vocals)
- Cable/connector issues

**Automatic Detection:**
- Algorithm finds transients
- Distinguishes clicks from music
- Repairs automatically
- Adjustable sensitivity

**Manual Removal:**
- Find click visually (spike in waveform)
- Select small section
- Use healing/repair brush
- Interpolates audio

**Settings:**
- Sensitivity: How aggressive (higher = more removals)
- Size: Click duration threshold
- Preview: Listen before applying

**Tools:**
- iZotope RX De-click ($399 in RX suite)
- Waves X-Click ($99)
- Accusonus ERA De-Esser Pro ($149)

**Professional Practice:** Start conservative (low sensitivity). Increase gradually. Check music not affected. Manual for stubborn clicks. Preview before committing.

---

### De-Essing (Restoration)
**Removing excessive sibilance (s, t, sh sounds) from vocals.**

**What is Sibilance:**
- High-frequency content (4-10kHz)
- "S", "T", "SH" sounds
- Can be harsh, distracting
- Exaggerated by compression/EQ

**De-Esser Operation:**
- Detects sibilant frequencies (6-8kHz typical)
- Compresses only when sibilance present
- Leaves rest of vocal unaffected
- Frequency-specific compression

**Settings:**

**Frequency:**
- Male vocals: 4-6kHz
- Female vocals: 6-9kHz
- Sweep to find sibilance
- Narrow band (high Q)

**Threshold:**
- Set so only sibilance triggers
- Too low: affects entire vocal
- Too high: doesn't catch sibilance

**Reduction:**
- 3-6dB typical
- More if very sibilant
- Check doesn't sound lispy

**Types:**
- **Broadband:** Reduces entire signal when sibilance present
- **Split-band:** Reduces only sibilant frequencies (more transparent)

**Tools:**
- FabFilter Pro-DS (excellent, $149)
- Waves DeEsser ($79)
- iZotope RX De-ess (surgical, $399 in suite)
- Most channel strips include de-esser

**Professional Practice:** Use after EQ and compression (they increase sibilance). Split-band more transparent. 3-6dB reduction typical. Don't over-process (lisp).

---

### De-Humming
**Removing 50Hz/60Hz electrical hum and harmonics.**

**Sources:**
- Power line interference (50/60Hz)
- Ground loops
- Lighting fixtures
- Electrical equipment

**Hum Frequencies:**
- Fundamental: 50Hz (Europe) or 60Hz (US)
- Harmonics: 100/120Hz, 150/180Hz, 200/240Hz, etc.
- May need to remove multiple harmonics

**Methods:**

**Notch Filters:**
- Very narrow cuts (Q 20-50)
- Precisely at hum frequencies
- Surgical removal
- Minimal effect on music

**Hum Removal Plugins:**
- Automatic detection
- Removes fundamental + harmonics
- Adjustable number of harmonics
- Intelligent processing

**Settings:**
- Frequency: 50 or 60Hz (or both)
- Harmonics: Remove up to 8-10 harmonics
- Amount: How much reduction

**Tools:**
- iZotope RX De-hum ($399 in suite)
- Waves X-Hum ($99)
- Accusonus ERA Noise Remover ($99)

**Professional Practice:** Identify frequency (50 or 60Hz). Remove fundamental + harmonics (up to 5-6). Check music not affected. Use during recording to prevent hum (proper grounding).

---

### Spectral Editing
**Visual editing in frequency-time domain for surgical repair.**

**What It Is:**
- View audio as spectrogram (frequency vs time)
- Select and edit specific frequencies at specific times
- Surgical precision
- Remove unwanted sounds without affecting rest

**Spectrogram Display:**
- X-axis: Time
- Y-axis: Frequency
- Color/brightness: Amplitude
- Visual representation of frequency content

**Applications:**

**Removing Specific Sounds:**
- Cough in middle of vocal take
- Car horn in background
- String squeak
- Breath noise (selective)

**Resonance Removal:**
- Guitar body resonance
- Room modes
- Cabinet resonances
- Without affecting entire signal

**Sibilance Control:**
- Reduce specific "S" sounds
- Leave others untouched
- More precise than de-esser

**Process:**
1. View in spectrogram
2. Identify unwanted sound (visual)
3. Select frequency-time region
4. Reduce or remove
5. Algorithm fills in intelligently

**Tools:**
- iZotope RX Spectral Editor (industry standard)
- SpectraLayers Pro (advanced)
- Adobe Audition Spectral Display

**Professional Practice:** Surgical for specific problems. Can sound unnatural if overused. Check entire file (some fixes create artifacts elsewhere). Last resort (prevention better).

---

## 7. Advanced Editing Techniques

### Strip Silence
**Automatically removing silence between audio sections.**

**Purpose:**
- Clean up tracks (remove noise between takes)
- Tighten performances
- Reduce file size
- Prepare for quantizing

**Settings:**

**Threshold:**
- Level below which audio considered "silence"
- Adjust to catch wanted audio
- Typical: -40 to -60dB

**Minimum Duration:**
- How long silence must be to remove
- Prevents removing short pauses
- 100-500ms typical

**Pre-Roll/Post-Roll:**
- Keep audio before/after detected region
- Prevents cutting off attacks/decays
- 10-50ms typical

**Applications:**
- Drum recording cleanup
- Dialogue editing
- Remove noise between sections
- Prepare loops for quantizing

**Professional Practice:** Conservative threshold (don't cut wanted audio). Add crossfades after. Check manually (automatic not perfect). Use for utility, not creative.

---

### Bouncing/Rendering
**Creating new audio file from processed tracks or regions.**

**When to Bounce:**
- Commit effects (save CPU)
- Export stems
- Create submixes
- Finalize edits

**Bounce Options:**

**Offline (Render):**
- Faster than real-time
- Consistent quality
- No real-time performance issues
- Standard approach

**Real-Time:**
- Plays and records
- Includes external hardware
- Slower
- For analog processing

**Settings:**
- Sample rate: Match project (don't convert)
- Bit depth: 24-bit (or match project)
- File format: WAV or AIFF (uncompressed)
- Normalize: Usually off (preserve levels)
- Dither: Only if reducing to 16-bit

**Bounce in Place:**
- Replaces track with bounced audio
- Commits processing
- Original still exists (non-destructive)
- Saves CPU

**Professional Practice:** Bounce offline for speed and quality. 24-bit WAV format. Don't normalize (preserve mix levels). Keep original (non-destructive).

---

### Fades and Fade Curves
**Gradual volume changes - essential for smooth editing.**

**Fade Types:**

**Fade In:**
- 0% to 100% volume
- Start of region
- Smooth entry
- Prevents click

**Fade Out:**
- 100% to 0% volume
- End of region
- Natural decay
- Clean ending

**Crossfade:**
- One fades out, another fades in
- Smooth transition
- Blend takes/sections

**Fade Curves:**

**Linear:**
- Straight line
- Equal volume change per unit time
- Can sound unnatural (dip in middle of crossfade)

**Exponential:**
- Curved (logarithmic)
- Sounds more natural to human ear
- Perception matches curve

**Equal Power:**
- Maintains constant perceived loudness
- Best for crossfades
- Standard choice

**S-Curve:**
- Slow start, fast middle, slow end
- Smooth acceleration
- Musical feel

**Fade Durations:**
- **Fade in:** 10-100ms (quick, prevents click)
- **Fade out:** 100-1000ms (musical ending)
- **Crossfade:** 20-100ms (smooth transition)
- **Long fade:** 2-10 seconds (musical fade out)

**Professional Practice:** Equal power curve default. Short fades for edits (20-50ms). Musical fades for artistic endings (2-5s). Always use fades (never abrupt cuts).

---

### Time-Stretching Algorithms (Editing)
**Different algorithms for time manipulation without pitch change.**

**Algorithms:**

**Transient (Percussive):**
- Best for drums, percussion
- Preserves attack
- Can sound unnatural on sustained
- Minimal smearing

**Monophonic:**
- Single melodic lines (vocals, leads)
- Better pitch tracking
- Can glitch on chords

**Polyphonic:**
- Full mixes, chords, complex material
- General purpose
- Balanced quality

**Varispeed:**
- Changes pitch with time (classic)
- Tape-style
- Not "time-stretching" (affects pitch)

**Professional Time-Stretch:**
- Élastique (Pro Tools, Logic, Studio One)
- Zplane (Ableton, Cubase)
- Flex/Elastic Audio (DAW-specific)

**Quality Factors:**
- Amount of stretch (less = better)
- Algorithm selection (match material)
- Source quality (better in = better out)

**Professional Practice:** Choose algorithm for material type. Smaller stretches sound better (chain multiple small changes). Render/commit (save CPU). Check quality (some artifacts acceptable).

---

## Summary: Volume 8 Complete

**Part 1:** Mastering Fundamentals (7 concepts: Definition, Headroom, References, LUFS, True Peak, Dynamic Range, Crest Factor, Dithering, SRC, Sequencing)

**Part 2:** Mastering Processing Chain (8 stages: Signal Chain, Corrective EQ, Multiband Compression, Broadband Compression, Tonal EQ, Saturation, Stereo Enhancement, Limiting) + Techniques (Vinyl, Stem Mastering)

**Part 3:** Audio Editing Complete (12 techniques: Regions, Crossfading, Comping, Timing Correction, Pitch Correction, Noise Reduction, De-clicking, De-essing, De-humming, Spectral Editing, Strip Silence, Bouncing, Fades, Time-Stretching)

**Total Coverage:** 62 comprehensive entries covering complete mastering workflow from fundamentals through delivery, plus all essential audio editing techniques.

---

*Music Tech Dictionary - Volume 8 of 10*
*Complete Mastering & Audio Editing Reference*
*© 2024 - Educational Use*

