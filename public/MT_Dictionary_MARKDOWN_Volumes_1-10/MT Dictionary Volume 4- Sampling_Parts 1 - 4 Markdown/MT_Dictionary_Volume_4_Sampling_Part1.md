# Music Tech Dictionary
## Volume 4: Sampling & Sequencing Complete - FULL COMPREHENSIVE EDITION
### Part 1 of 4: Sample Editing & Digital Audio Theory

---

# PART 1: SAMPLING FUNDAMENTALS

## 1. Sample Editing Techniques

### Cutting/Trimming
**Removing unwanted portions from beginning or end of sample.**

**Process:**
1. Load sample into editor
2. Identify desired section (zoom in for precision)
3. Set start point (beginning of wanted audio)
4. Set end point (end of wanted audio)
5. Crop/trim to selection

**Why Important:**
- Removes silence (saves memory, faster loading)
- Removes unwanted sounds (breaths, noise, bleed)
- Creates clean sample boundaries
- Reduces file size

**Best Practices:**
- Zoom in to sample level (see individual samples)
- Don't cut too close (may create clicks)
- Leave tiny bit of silence (3-10ms) before transient
- Check fade-in/out needed after trim
- Save original (non-destructive workflow)

**Common Mistakes:**
- Cutting too close to transient (creates click)
- Removing natural decay (sample sounds unnatural)
- Not checking for silence before first sound
- Cutting in middle of waveform (creates DC offset)

**Applications:** All sample editing, drum sample preparation, loop creation, vocal sample cleanup.

---

### Zero-Crossing Edits
**Making cuts only at zero-crossing points where waveform crosses zero amplitude.**

**What are Zero Crossings:**
- Points where waveform amplitude = 0
- Crosses from positive to negative (or vice versa)
- Natural points for clean cuts
- Occur many times per second (frequency-dependent)

**Why Zero Crossings:**
- Prevents clicks (cutting mid-waveform creates discontinuity)
- Clean edits (no pop or artifact)
- Seamless transitions (when cutting and moving)
- Professional standard

**How to Find:**
- Most editors: "Snap to Zero Crossing" option
- Automatically finds nearest zero crossing to cursor
- Visual: look for waveform crossing center line
- Zoom in: verify exact zero point

**When Essential:**
- Cutting samples
- Loop points (critical for seamless loops)
- Editing percussive material
- Any sample manipulation

**When Less Critical:**
- When using crossfades (fade smooths discontinuity)
- Very short edits (<1ms)
- Material with continuous sound

**Professional Practice:** Always enable "Snap to Zero Crossing" when editing. Only disable for specific creative effects or when using crossfades.

---

### Fades (In/Out)
**Gradually increasing (fade in) or decreasing (fade out) volume at sample boundaries.**

**Fade In:**
- Start: 0% volume (silence)
- End: 100% volume (full sample)
- Duration: 1ms-5000ms depending on application
- Prevents: clicks at sample start
- Smooths: entry into sound

**Fade Out:**
- Start: 100% volume (full sample)
- End: 0% volume (silence)
- Duration: 10ms-10000ms depending on application
- Creates: natural decay
- Removes: abrupt ending

**Fade Curves:**
- **Linear:** Straight line volume change (mathematical, can sound unnatural)
- **Exponential:** Curved (sounds more natural to human ear)
- **Logarithmic:** Inverse curve
- **S-Curve:** Slow start, fast middle, slow end

**Fade Durations by Application:**
- **Percussive (drums, hits):** 1-10ms (just removes click)
- **Sustaining instruments:** 20-100ms in, 100-1000ms out
- **Ambient/pads:** 500-3000ms (smooth, atmospheric)
- **Crossfades between samples:** 20-50ms typical

**Applications:**
- Remove clicks at boundaries
- Create smooth transitions
- Natural decay simulation
- Crossfading between samples
- Loop points (crossfade loop end to start)

**Best Practices:**
- Shorter fades: percussive material (preserve attack)
- Longer fades: sustained material (smooth and natural)
- Exponential curves: usually sound more natural than linear
- Test fade length: too long = loss of attack, too short = click
- Crossfades: overlap region equal to fade length

---

### Crossfade Looping
**Creating seamless loop by crossfading loop end into loop start.**

**Process:**
1. Find loop start point (zero crossing)
2. Find loop end point (zero crossing, compatible phase)
3. Create overlap region (loop end overlaps start)
4. Crossfade: end fades out while start fades in
5. Result: seamless continuous loop

**Crossfade Length:**
- Short (10-50ms): percussive, rhythmic material
- Medium (50-200ms): sustained tones, pads
- Long (200-1000ms): ambient, atmospheric

**Loop Point Selection:**
- Similar waveform shapes at start/end (visual matching)
- Same phase relationship (positive-to-positive or negative-to-negative)
- Matching frequency content (spectral similarity)
- Similar amplitude (level matching)

**Why Crossfading:**
- Prevents click/pop at loop point
- Smooths timbral differences
- Creates seamless sustain
- Professional loop quality

**Challenges:**
- Pitched material: must loop at exact wavelength multiple
- Evolving sounds: hard to find matching sections
- Short samples: limited loop options

**Applications:**
- Sampler instruments (sustain portion of samples)
- Pad sounds (continuous sustain)
- Drones (infinite sustain)
- Sound design (seamless textures)

**Professional Tip:** Loop to exact wavelength multiples for pitched material (use tempo/BPM calculator). For example, at 440Hz A4, one wavelength = 109.4 samples at 48kHz.

---

### Reverse Samples
**Playing sample backwards creating reversed effect.**

**Process:**
1. Select sample or region
2. Apply reverse function (flips sample end-to-start)
3. Result: playback from end to beginning

**Sound Characteristics:**
- Reversed attack/decay (decay becomes attack, attack becomes decay)
- Unnatural, ethereal quality
- Smooth fade-in (from reversed decay)
- Abrupt ending (reversed attack)

**Applications:**
- **Reverse cymbals:** Crash becomes rising whoosh (common in transitions)
- **Reverse reverb:** Reverb tail before dry signal (psychedelic, special effect)
- **Reverse vocals:** Unintelligible, textural (experimental, hip-hop)
- **Reverse snare:** Rising snare (fill endings, drops)
- **Creative effects:** Any reversed sound for unique textures

**Techniques:**
- Reverse cymbal before drop (EDM standard)
- Reverse reverb on vocals (Beatles, psychedelic rock)
- Reverse kick/snare in patterns (glitch, experimental)
- Layer reversed with forward (thick, complex)

**Famous Uses:**
- "Tomorrow Never Knows" (Beatles - reversed guitar, vocals)
- EDM builds (reversed crash cymbals)
- Film sound design (reversed sounds create tension)

**Processing Reversed Samples:**
- Add reverb to reversed sample (becomes reversed reverb when played forward)
- Time-stretch reversed samples (elongate whoosh effects)
- Pitch-shift reversed material (change character)

---

### Normalize
**Increasing overall level of sample to maximum without clipping.**

**Process:**
1. Scan entire sample for highest peak
2. Calculate gain needed to bring peak to 0dBFS (or target level)
3. Apply equal gain to entire sample
4. Result: loudest possible sample without distortion

**Peak Normalization:**
- Finds highest peak in sample
- Brings peak to 0dBFS or specified level (e.g., -0.3dBFS, -1dBFS)
- All samples increased by same amount
- Preserves dynamic relationships

**RMS Normalization:**
- Normalizes based on average level (RMS) not peak
- More consistent perceived loudness
- Can create clipping if peaks much higher than average

**When to Use:**
- Samples too quiet (maximize signal)
- Consistent level across sample library
- Before further processing (optimal level)
- Final export (maximum loudness)

**When NOT to Use:**
- Sample already at good level (unnecessary)
- Want to preserve relative levels between samples
- Peak is short transient with quiet body (RMS better)

**Target Levels:**
- **-0.3dBFS:** Safe maximum (leaves tiny headroom for interpolation)
- **-1dBFS:** Conservative (leaves clear headroom)
- **-6dBFS:** Processing headroom (leaves room for effects)

**Alternatives:**
- **Compression:** Makes quiet parts louder (changes dynamics)
- **Limiting:** Prevents peaks, raises average level
- **Manual gain:** Specific amount of gain

**Professional Practice:** Normalize to -0.3dBFS or -1dBFS for final samples. Leave more headroom (-6dB) if further processing planned.

---

### DC Offset Removal
**Removing DC offset - unwanted shift of waveform above or below zero line.**

**What is DC Offset:**
- Waveform centered above or below 0V (zero line)
- Should oscillate equally around zero
- Offset = average value not zero
- Visual: waveform appears shifted up or down

**Causes:**
- Poor A/D converter calibration
- Recording hardware issues
- Some audio processing
- Asymmetrical waveforms

**Problems Caused:**
- Wasted headroom (limits maximum level)
- Click at loop points (non-zero value)
- Artifacts when processing (especially reversing)
- Encoding errors (some formats)
- Reduces effective bit depth

**How to Fix:**
1. Detect: Check waveform (should be centered)
2. Measure: Tools show DC offset value
3. Remove: High-pass filter at 5-10Hz OR DC offset removal tool
4. Verify: Waveform now centered

**Detection:**
- Visual: Waveform shifted up/down
- Meters: DC offset measurement tool
- Audio: Click when looping

**Removal Methods:**
- **DC Offset Removal Filter:** Dedicated tool (best, preserves audio)
- **High-Pass Filter:** 5-10Hz HPF (simple, effective)
- **Fade In/Out:** From/to zero (crude but works)

**Professional Practice:** Always check for and remove DC offset before normalization, export, or loop creation. Standard step in mastering.

---

### Time-Stretching
**Changing duration of sample without affecting pitch.**

**Algorithms:**
- **WSOLA (Waveform Similarity Overlap-Add):** Good quality, moderate CPU
- **Phase Vocoder:** Classic algorithm, good for moderate changes
- **Élastique:** High quality, professional (Pro Tools, Logic)
- **Zplane:** Modern, excellent quality (Ableton)
- **Paulstretch:** Extreme stretching (100x+), creates drones

**Quality Factors:**
- Amount of stretch (less = better quality)
- Algorithm choice (modern = better)
- Source material type (some stretch better)
- Processing settings (formant preservation, etc.)

**Stretch Amounts:**
- **Subtle (90-110%):** Excellent quality, nearly transparent
- **Moderate (75-125%):** Good quality, acceptable artifacts
- **Significant (50-150%):** Noticeable artifacts, musical still
- **Extreme (25-200%):** Obvious artifacts, creative use
- **Ultra (10-1000%+):** Dramatic artifacts, sound design

**Artifacts:**
- Phasiness, chorusing (moderate stretching)
- Warbling, metallic (significant stretching)
- Granular texture (extreme stretching)
- Formant shifting (pitch character changes)

**Applications:**
- **Beat matching:** Tempo sync without pitch change
- **Vocal timing:** Fit vocals to track
- **Sound design:** Create evolving textures
- **Remix/mashup:** Match song tempos
- **Paulstretch:** Create ambient drones from short sounds

**Best Practices:**
- Use highest quality algorithm available
- Smaller changes sound better (chain multiple small changes)
- Enable formant preservation for vocals
- Render/bounce after stretching (save CPU)

---

### Pitch-Shifting
**Changing pitch of sample without affecting duration.**

**Methods:**
- **Resampling + Time-Stretch:** Change pitch via sample rate, time-stretch back to original duration
- **Granular:** Granular synthesis-based (good for large shifts)
- **Formant-Preserving:** Maintains vocal character (better for vocals)
- **FFT-Based:** Frequency domain processing (modern, high quality)

**Shift Amounts:**
- **Subtle (±1-3 semitones):** Excellent quality, tuning correction
- **Moderate (±5-7 semitones):** Good quality, noticeable but musical
- **Large (±12 semitones/1 octave):** Noticeable artifacts, still usable
- **Extreme (±24+ semitones):** Heavy artifacts, creative effect

**Formant Preservation:**
- Maintains vocal character when shifting
- Essential for realistic vocal pitch correction
- Prevents "chipmunk" (shifted up) or "monster" (shifted down) effect
- Enable for: vocals, speech
- Disable for: creative effects, instruments

**Applications:**
- **Pitch correction:** Fix out-of-tune notes (±50 cents)
- **Harmony creation:** Generate harmonies from single vocal
- **Transposition:** Change key without re-recording
- **Creative effects:** Extreme shifts for special effects
- **Sound design:** Create variations from single sample

**Quality Tips:**
- Modern algorithms (Melodyne, Élastique) = best quality
- Formant preservation ON for vocals
- Multiple small shifts better than one large shift
- Some sources shift better (sustained tones vs transients)

---

### Destructive vs Non-Destructive Editing
**Permanent changes to audio file vs. reversible edits.**

**Destructive Editing:**
- Permanently alters original audio file
- Changes written to disk immediately
- Cannot undo after saving
- Original data lost forever
- Faster (no real-time processing needed)
- Less CPU (no processing during playback)

**Non-Destructive Editing:**
- Original file remains untouched
- Edits stored as instructions/metadata
- Unlimited undo (until close session)
- Can revert to original anytime
- Requires CPU (processing during playback)
- More flexible

**Modern Standard:** Non-destructive by default in all DAWs.

**When Destructive Necessary:**
- Rendering effects permanently (save CPU)
- Preparing final files (sample libraries)
- Editing in waveform editor (often destructive)
- Certain batch processing

**Professional Practice:**
- Keep original files always (backup)
- Use non-destructive when possible
- Render destructively only when final
- "Bounce in place" creates new file (keeps original)

---

## 2. Digital Audio Theory

### Bit Depth (Complete)
**Number of bits used to represent each sample's amplitude.**

**Bit Depth Values:**
- **8-bit:** 256 possible levels (2^8), 48dB dynamic range
- **16-bit:** 65,536 levels (2^16), 96dB dynamic range (CD quality)
- **24-bit:** 16,777,216 levels (2^24), 144dB dynamic range (professional)
- **32-bit float:** ~16.7 million levels with floating point, ~1,680dB dynamic range

**Formula:** Dynamic Range (dB) = Bit Depth × 6.02

**Each Bit:**
- Adds approximately 6dB of dynamic range
- Doubles number of possible amplitude values
- Lowers noise floor by 6dB

**16-bit Characteristics:**
- CD standard (Red Book audio)
- 96dB dynamic range (adequate for listening)
- Quantization noise audible in very quiet passages
- Requires dithering when mastering
- Limited headroom for processing

**24-bit Characteristics:**
- Professional recording/mixing standard
- 144dB dynamic range (exceeds human hearing ~120dB)
- Quantization noise inaudible
- Ample headroom for processing
- No dithering needed during recording/mixing
- Only dither when converting to 16-bit

**32-bit Float Characteristics:**
- Virtually unlimited dynamic range
- Cannot clip mathematically (values can exceed 0dBFS internally)
- Automatic gain management
- Perfect for recording (prevents clipping)
- Large file sizes
- Overkill for final delivery

**Noise Floor by Bit Depth:**
- 8-bit: -48dBFS (very audible hiss)
- 16-bit: -96dBFS (audible in quiet passages)
- 24-bit: -144dBFS (inaudible, below hearing threshold)
- 32-bit float: >-1600dBFS (essentially zero noise)

**Professional Standard:** Record at 24-bit minimum. Export at 16-bit for CD (with dithering). 32-bit float becoming standard for recording safety.

---

### Sample Rate (Complete)
**Number of times per second audio is sampled (measured in Hz or kHz).**

**Common Sample Rates:**
- **44,100Hz (44.1kHz):** CD standard, originated from video equipment
- **48,000Hz (48kHz):** Professional audio/video standard, broadcasting
- **88,200Hz (88.2kHz):** 2× CD rate (44.1kHz × 2)
- **96,000Hz (96kHz):** 2× professional rate (48kHz × 2)
- **176,400Hz (176.4kHz):** 4× CD rate
- **192,000Hz (192kHz):** 4× professional rate, high resolution

**Nyquist Theorem:**
- Must sample at >2× highest frequency to capture accurately
- **Nyquist Frequency** = Sample Rate ÷ 2
- 44.1kHz captures up to 22.05kHz (exceeds human hearing 20kHz)
- 48kHz captures up to 24kHz
- 96kHz captures up to 48kHz

**Higher Sample Rates:**
**Advantages:**
- Easier anti-aliasing filter design (gentler slope)
- More headroom for digital processing (reduces aliasing in plugins)
- Captures ultrasonic content (>20kHz)
- Better for extreme pitch-shifting
- Higher time resolution

**Disadvantages:**
- Larger file sizes (2× rate = 2× size)
- More CPU usage (more samples to process)
- No audible benefit above Nyquist for listening
- Storage/bandwidth requirements

**When to Use High Sample Rates:**
- Recording for extensive pitch-shifting
- Sound design with heavy processing
- Archival purposes (future-proofing)
- Extreme processing scenarios

**Professional Standard:** 48kHz most common (video standard). 96kHz for high-resolution. 44.1kHz only when delivering to CD.

**File Size Impact:**
- 44.1kHz baseline: 100%
- 48kHz: ~109% (slightly larger)
- 88.2kHz: 200% (double)
- 96kHz: ~218%
- 192kHz: ~436%

---

*[Content continues in Part 2 with more Digital Audio Theory, Sample Playback, and Multi-Sampling]*

