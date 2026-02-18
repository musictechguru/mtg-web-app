# Music Tech Dictionary
## Volume 4: Sampling & Sequencing Complete - FULL COMPREHENSIVE EDITION
### Part 2 of 4: Digital Audio Theory Continued & Sample Playback

---

# PART 1 CONTINUED: DIGITAL AUDIO THEORY

### Nyquist Frequency/Theorem
**Must sample at rate greater than twice the highest frequency to accurately capture signal.**

**Nyquist-Shannon Sampling Theorem:**
- Sample rate must be >2× highest frequency
- **Nyquist Frequency** = Sample Rate ÷ 2 (maximum capturable frequency)
- Below Nyquist: perfectly captured
- At Nyquist: theoretically captured
- Above Nyquist: aliasing (false frequencies created)

**Examples:**
- 44.1kHz sample rate → 22.05kHz Nyquist frequency
- 48kHz sample rate → 24kHz Nyquist frequency
- 96kHz sample rate → 48kHz Nyquist frequency

**Why 44.1kHz for CD:**
- Human hearing: 20Hz-20kHz
- Nyquist: need >40kHz to capture 20kHz
- 44.1kHz captures up to 22.05kHz (exceeds requirement)
- Historical: compatibility with video equipment (NTSC/PAL)

**Practical Implications:**
- Anti-aliasing filter needed before A/D conversion
- Removes frequencies above Nyquist
- Prevents aliasing artifacts
- Higher sample rates: easier filter design (gentler slope)

---

### Aliasing and Anti-Aliasing Filters
**False frequencies created when sampling signal containing frequencies above Nyquist.**

**What is Aliasing:**
- Input frequency >Nyquist frequency
- Creates "mirror" or "alias" frequency below Nyquist
- Formula: Alias Frequency = |Sample Rate - Input Frequency|
- Inharmonic (not musically related to input)
- Sounds: harsh, metallic, digital

**Example:**
- Sample rate: 44.1kHz (Nyquist: 22.05kHz)
- Input frequency: 25kHz (above Nyquist)
- Alias frequency: 44.1kHz - 25kHz = 19.1kHz (false tone created)

**Anti-Aliasing Filter:**
- **Location:** Before A/D converter (analog domain)
- **Type:** Low-pass filter
- **Cutoff:** Just below Nyquist frequency
- **Slope:** Very steep (brick-wall)
- **Purpose:** Remove all frequencies above Nyquist

**Filter Characteristics:**
- Passband: 0Hz to ~20kHz (let through unaffected)
- Transition band: 20kHz to Nyquist (steep roll-off)
- Stopband: Above Nyquist (complete attenuation)

**Higher Sample Rates Help:**
- 44.1kHz: very steep filter needed (can affect audio quality)
- 96kHz: gentler filter possible (better sound quality)
- 192kHz: even gentler (minimal filter artifacts)

**Digital Processing Aliasing:**
- Can occur inside plugins (non-linear processing)
- Distortion, saturation, waveshaping create harmonics
- Good plugins: oversample internally (prevent aliasing)
- Poor plugins: audible aliasing artifacts

**Professional Practice:** Use quality A/D converters with good anti-aliasing filters. Enable oversampling in plugins for non-linear processing.

---

### Quantization
**Rounding continuous amplitude values to nearest discrete level (determined by bit depth).**

**Process:**
1. Continuous analog voltage measured
2. A/D converter assigns closest digital value
3. Limited by bit depth (number of available levels)
4. Difference between actual and assigned = quantization error

**Quantization Error:**
- Difference between true value and quantized value
- Maximum error = ½ LSB (Least Significant Bit)
- Creates noise at noise floor
- Lower bit depth = larger quantization error (more noise)

**Quantization Error by Bit Depth:**
- **8-bit:** Very audible quantization noise (sounds like distortion/hiss)
- **16-bit:** Audible in quiet passages (dithering masks it)
- **24-bit:** Inaudible (below hearing threshold)
- **32-bit float:** Essentially zero quantization error

**Quantization Noise:**
- Appears as noise floor
- Constant level regardless of signal
- Correlates with signal (causes harmonic distortion patterns)
- **Dithering:** Breaks correlation, converts to random noise

**Signal-to-Quantization-Noise Ratio:**
- 16-bit: 96dB (98dB with proper dithering)
- 24-bit: 144dB (far exceeds human hearing)
- Each bit: adds ~6dB S/QNR

**Professional Understanding:** Quantization unavoidable in digital audio. Use adequate bit depth (24-bit) to make quantization noise inaudible. Dither when reducing bit depth.

---

### Dithering (Complete)
**Adding very low-level noise when reducing bit depth to mask quantization distortion.**

**Purpose:**
- Randomizes quantization error
- Prevents harmonic distortion patterns
- Makes quantization noise sound like random noise (more pleasant)
- Extends effective resolution below bit depth
- Essential for 24-bit → 16-bit conversion

**How It Works:**
1. Add tiny amount of noise (~1 LSB amplitude)
2. Noise randomizes rounding decisions
3. Quantization error becomes random (not correlated)
4. Result: smooth, natural-sounding noise instead of distortion

**Dither Types:**

**TPDF (Triangular Probability Density Function):**
- Most common, industry standard
- White noise with triangular probability
- Flat frequency response
- Simple, effective
- 1 LSB amplitude

**POW-R (Psychoacoustically Optimized Wordlength Reduction):**
- Shaped dither (noise pushed to less sensitive frequencies)
- Noise above 10kHz (less audible)
- Sounds "quieter" than TPDF
- More complex algorithm
- Professional mastering standard

**Noise Shaping:**
- Pushes dither noise to higher frequencies (less audible region)
- Human hearing: less sensitive >10kHz
- Can use with or without dither
- Very effective for CD mastering

**When to Dither:**
- **Yes:** Reducing 24-bit to 16-bit for CD
- **Yes:** Final export to 16-bit
- **No:** Staying at 24-bit or 32-bit
- **No:** Multiple times (only once at final stage)
- **No:** Before further processing

**Dither Amount:**
- Typically 1 LSB (Least Significant Bit)
- About -90dBFS for 16-bit
- Barely audible even in silence
- Trade-off: tiny noise vs quantization distortion

**Professional Practice:**
- Dither ONCE at final conversion to 16-bit
- Use POW-R or noise-shaped dither for masters
- Never dither intermediate files (accumulates noise)
- TPDF sufficient for most applications

**Famous Dither Algorithms:**
- Apogee UV22/UV22HR
- POW-R 1/2/3
- iZotope MBIT+
- Waves IDR

---

### Binary Representation
**How digital audio stores amplitude values as binary numbers (1s and 0s).**

**Binary Basics:**
- Only two values: 0 and 1 (bits)
- Each bit position: power of 2
- Rightmost bit (LSB): 2^0 = 1
- Leftmost bit (MSB): 2^(n-1) where n = bit depth

**16-bit Example:**
- 16 bits can represent 2^16 = 65,536 different values
- Range: 0 to 65,535 (unsigned)
- Or: -32,768 to +32,767 (signed, audio uses this)

**Amplitude Representation:**
- 0 (binary) = maximum negative amplitude
- 32,768 (binary 1000000000000000) = zero amplitude (no sound)
- 65,535 (binary 1111111111111111) = maximum positive amplitude

**Least Significant Bit (LSB):**
- Rightmost bit
- Smallest possible change (1 step)
- Determines quantization resolution
- 16-bit: LSB = 1/32,768 of full scale
- 24-bit: LSB = 1/8,388,608 of full scale

**Most Significant Bit (MSB):**
- Leftmost bit
- Contributes most to value
- Sign bit in signed representation (0=positive, 1=negative)

**File Size Calculation:**
- File size = Sample Rate × Bit Depth × Channels × Duration
- Example: 44.1kHz × 16-bit × 2 channels × 60 seconds
- = 44,100 samples/sec × 16 bits × 2 × 60 sec
- = 84,672,000 bits = 10,584,000 bytes = ~10.1 MB

---

### PCM (Pulse Code Modulation)
**Standard method of encoding analog audio as digital samples.**

**Process:**
1. **Sampling:** Measure amplitude at regular intervals (sample rate)
2. **Quantization:** Round to nearest digital value (bit depth)
3. **Encoding:** Convert to binary (PCM code)
4. **Storage:** Save as digital file

**PCM Characteristics:**
- Uncompressed (lossless)
- Linear encoding (equal steps)
- Used in: WAV, AIFF files
- CD audio: PCM encoded (16-bit/44.1kHz)

**Variants:**
- **LPCM (Linear PCM):** Standard audio PCM
- **DPCM (Differential PCM):** Stores differences between samples
- **ADPCM (Adaptive DPCM):** Variable quantization

**Advantages:**
- Simple, straightforward
- Lossless (perfect reconstruction within bit depth)
- Universal compatibility
- No processing needed for playback

**Disadvantages:**
- Large file sizes (uncompressed)
- No error correction built-in

---

### Digital Clipping
**Distortion when digital signal exceeds maximum representable value (0dBFS).**

**What Happens:**
- Signal tries to exceed 0dBFS (maximum)
- Cannot represent values above maximum
- Waveform peaks "clipped off" flat
- Creates square wave distortion
- Sounds: harsh, unpleasant, "crunchy"

**Why Digital Clipping Sounds Bad:**
- Immediate hard clipping (no gradual saturation)
- Creates odd-order harmonics (harsh)
- Square-wave like distortion
- Cannot be fixed after recording

**0dBFS:**
- Maximum possible digital level
- 0 dB Full Scale
- All bits = 1 (maximum binary value)
- Absolutely cannot exceed (hard ceiling)

**Prevention:**
- Proper gain staging (headroom)
- Record peaks at -12dB to -6dBFS
- Leave 6dB headroom minimum
- Use limiters on critical signals
- 32-bit float recording (prevents clipping mathematically)

**Analog vs Digital Clipping:**
- **Analog:** Soft saturation, even-order harmonics, gradually increasing
- **Digital:** Instant hard clipping, odd-order harmonics, abrupt

**Recovery:**
- Cannot be fixed (data permanently lost)
- Some restoration tools help reduce (but not remove)
- Must re-record if possible

---

### File Formats (WAV, AIFF, MP3, FLAC)

**WAV (Waveform Audio File Format):**
- **Developer:** Microsoft/IBM
- **Type:** Uncompressed PCM
- **Quality:** Lossless
- **Compression:** None
- **Metadata:** Limited (BWF extension adds more)
- **Platform:** Windows standard, universal
- **Use:** Professional recording, archival, CD burning

**AIFF (Audio Interchange File Format):**
- **Developer:** Apple
- **Type:** Uncompressed PCM
- **Quality:** Lossless
- **Compression:** None (AIFF-C has compression option)
- **Metadata:** Better than WAV
- **Platform:** Mac standard, universal
- **Use:** Mac ecosystem, professional recording

**MP3 (MPEG-1 Audio Layer 3):**
- **Developer:** Fraunhofer/Thomson
- **Type:** Lossy compressed
- **Quality:** Variable (64-320kbps)
- **Compression:** 10:1 typical (128kbps)
- **Metadata:** ID3 tags (extensive)
- **Platform:** Universal
- **Artifacts:** Pre-echo, stereo imaging issues, high-frequency roll-off
- **Use:** Distribution, streaming, portable devices
- **Quality:** 320kbps transparent for most listeners, <128kbps noticeably degraded

**FLAC (Free Lossless Audio Codec):**
- **Developer:** Xiph.Org Foundation
- **Type:** Lossless compressed
- **Quality:** Perfect (bit-for-bit identical to source)
- **Compression:** 40-50% file size reduction typical
- **Metadata:** Vorbis comments (extensive)
- **Platform:** Universal, open-source
- **Use:** Archival, hi-fi playback, streaming (Tidal, Qobuz)

**Sample Rate Conversion:**
- Changing sample rate (e.g., 48kHz → 44.1kHz)
- Requires resampling algorithm
- Quality varies by algorithm
- Can introduce artifacts
- Best: avoid if possible (record at target rate)

**Bit Depth Conversion:**
- Changing bit depth (e.g., 24-bit → 16-bit)
- Always use dithering when reducing
- No dithering when increasing (just padding)

---

## 3. Sample Playback Parameters

### Root Note/Key
**Original pitch of sample (MIDI note number used for playback at original pitch).**

**Definition:**
- MIDI note number (0-127) where sample plays at recorded pitch
- C4 (Middle C) = note 60 (common default)
- Playing this note: sample at 100% original speed (1:1 playback)

**Why Important:**
- Determines pitch reference for transposition
- Affects pitch-shifting calculations
- Critical for realistic instrument samples
- Sampler knows how much to pitch-shift

**Setting Root Note:**
- Auto-detect: Some samplers detect pitch
- Manual: Set by ear or tuner
- MIDI note: Assign specific note number
- Percussion: Often C3 (note 48) or C4 (note 60)

**Playback:**
- Play root note: 100% speed (original pitch)
- Play above root: faster playback (higher pitch)
- Play below root: slower playback (lower pitch)
- Transposition = (Played Note - Root Note) semitones

---

### Pitch/Transpose
**Playback speed adjustment creating pitch change.**

**How It Works:**
- Speed up playback: higher pitch
- Slow down playback: lower pitch
- 100% = original pitch (at root note)
- 200% = one octave higher
- 50% = one octave lower

**Relationship:**
- Semitone change ≈ 5.946% speed change
- One octave = 12 semitones = 2× or 0.5× speed
- Perfect fifth (7 semitones) = 1.498× speed

**Limitations:**
- Large pitch shifts: sound unnatural (chipmunk/monster effect)
- Timbre changes with pitch (formants shift)
- Time/duration changes with pitch (linked)

**Solutions:**
- Multi-sampling (different samples for different pitches)
- Formant preservation (advanced algorithms)
- Time-stretching (independent time/pitch control)
- Sample multiple velocities and pitches

---

### Loop Start/End Points
**Defining sustain portion of sample that repeats indefinitely.**

**Loop Anatomy:**
- **Attack:** Plays once (initial transient, 0 to loop start)
- **Loop:** Repeats continuously (loop start to loop end)
- **Release:** Plays once when note released (optional)

**Setting Loop Points:**
1. Find suitable loop region (similar waveform at start/end)
2. Set loop start point (zero crossing)
3. Set loop end point (zero crossing, matching phase)
4. Test loop (listen for clicks, timbral changes)
5. Adjust as needed (crossfade if necessary)

**Loop Types:**
- **Forward:** Plays loop start → end, repeats
- **Forward-Backward (Ping-Pong):** Plays forward then backward
- **Backward:** Plays loop end → start (rare)

**Loop Length:**
- **Short (1-10ms):** Can create pitched tone/resonance
- **Medium (10-500ms):** Standard sustain loops
- **Long (500ms+):** Natural, evolving loops

**Successful Loops:**
- Zero crossings at both points
- Matching waveform shapes
- Similar spectral content
- Correct phase relationship
- Crossfade if needed (20-50ms)

**Applications:**
- Sustaining samples (strings, pads, organs)
- Reducing sample length (shorter files)
- Creating infinite sustain from short samples

---

*[Content continues in Part 3 with Multi-Sampling, Time-Stretching, and MIDI fundamentals]*

