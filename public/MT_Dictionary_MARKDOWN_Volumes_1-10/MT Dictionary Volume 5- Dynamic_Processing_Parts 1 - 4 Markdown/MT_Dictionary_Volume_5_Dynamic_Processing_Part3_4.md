# Music Tech Dictionary
## Volume 5: Dynamic Processing Complete - FULL COMPREHENSIVE EDITION
### Parts 3 & 4 of 4: Limiting, Gates, Expanders, De-essers, Mixing/Mastering & Sidechain

---

# PART 3: LIMITING, GATES & EXPANSION

## 4. Limiting Complete

### Brick-Wall Limiting
**Preventing signal from exceeding specific maximum level (ceiling).**

**Definition:**
- Ratio: ∞:1 (infinite ratio)
- Signal absolutely cannot exceed ceiling
- Hard threshold (no signal above)
- Essential final stage in mastering

**How It Works:**
- Input exceeds ceiling: instant gain reduction
- Reduces by exact amount to keep at ceiling
- No overshoot allowed
- True peak limiting: accounts for inter-sample peaks

**Difference from Compression:**
- Compression: reduces proportionally (ratios like 4:1)
- Limiting: prevents exceeding completely (∞:1)
- Compression: musical control
- Limiting: protection/maximization

### Peak Limiter
**Fast limiter controlling transient peaks.**

**Attack Time:** 0.01ms-1ms (extremely fast)
**Release:** Fast to medium (10ms-100ms)
**Purpose:** Catch and control brief peaks
**Use:** Prevent clipping, maximize loudness

### True Peak Limiting
**Accounts for inter-sample peaks that occur during D/A conversion.**

**Inter-Sample Peaks (ISP):**
- Peaks between digital samples
- Created during reconstruction (D/A conversion)
- Can exceed 0dBFS digitally
- Cause: clipping in analog domain

**True Peak Measurement:**
- 4x or 8x oversampling
- Measures what will exist after D/A
- Measured in dBTP (True Peak)
- Essential for mastering

**Target Levels:**
- -1.0dBTP: Safe for all platforms
- -0.3dBTP: Aggressive but safe
- 0dBTP: Risk of analog clipping

**Why Important:**
- Prevents clipping during playback
- Streaming services require (Spotify, Apple Music)
- Broadcast standards
- Professional mastering standard

### Lookahead (1-5ms)
**Limiter previews signal ahead to react before peak arrives.**

**How It Works:**
1. Input signal delayed (lookahead time)
2. Sidechain reads ahead of delayed signal
3. Limiter knows peak is coming
4. Applies gain reduction before peak
5. Result: smooth limiting without overshoot

**Lookahead Time:**
- 1ms: Minimal latency, slight smoothing
- 3ms: Good balance (common)
- 5ms: Smoothest, most transparent
- Longer: smoother but more latency

**Advantages:**
- No overshoot (perfect ceiling)
- Smoother gain reduction
- More transparent sound
- Less distortion

**Disadvantage:**
- Adds latency (typically 1-5ms)
- Automatic delay compensation needed

**Professional Standard:** Essential for modern mastering limiters. Most use 3-5ms lookahead.

### Release Time (Limiting)
**How quickly limiter stops limiting after peak passes.**

**Settings:**
- Fast (10-50ms): Follows signal closely, can pump
- Medium (50-200ms): Balanced, natural
- Slow (200-1000ms): Smooth, less pumping
- Auto: Adjusts based on material (most common)

### Ceiling (-0.3dBFS typical)
**Maximum output level of limiter.**

**Common Settings:**
- -0.1dBFS: Aggressive, risk of ISP
- -0.3dBFS: Safe, modern standard
- -0.5dBFS: Conservative
- -1.0dBFS: Very safe, broadcast

**Mastering Targets:**
- Spotify: -1.0dBFS or -1.0dBTP
- Apple Music: -1.0dBFS
- Streaming: -0.3 to -1.0dBTP recommended
- CD: -0.3dBFS typical

### ISP (Inter-Sample Peaks)
**Peaks between samples occurring during D/A conversion.**

**Problem:**
- Digital looks fine (peaks at 0dBFS)
- Reconstruction filter creates peaks above 0dB
- Causes analog clipping
- Sounds: harsh, distorted

**Solution:**
- True peak limiting
- Leave headroom (-0.3 to -1.0dBTP)
- Oversample during limiting
- Measure with true peak meters

### Loudness Maximization
**Using limiting to achieve competitive loudness.**

**Process:**
1. Set ceiling (-0.3dBFS)
2. Raise input level
3. Limiter controls peaks
4. Result: louder average level

**Loudness Units:**
- **LUFS:** Loudness Units Full Scale (modern standard)
- **dBFS:** Peak level (not loudness)
- **RMS:** Average level (older measurement)

**Modern Targets:**
- Spotify: -14 LUFS integrated
- Apple Music: -16 LUFS
- YouTube: -13 LUFS
- CD: -8 to -10 LUFS typical

**Loudness War:**
- Race to make music louder
- Heavy limiting, reduced dynamics
- Listener fatigue
- Streaming normalized levels (war over)

### Limiter Applications
**Where and how to use limiting.**

**Mastering (Primary Use):**
- Final stage before export
- Maximize loudness
- Prevent clipping
- Target LUFS

**Mix Bus:**
- Gentle limiting (1-2dB reduction)
- Control peaks
- Not for loudness (save for mastering)

**Individual Tracks:**
- Vocals (control peaks)
- Drums (tighten transients)
- Bass (control dynamic range)

**Live Sound:**
- Protect speakers
- Prevent feedback
- Safety limiting

### Modern Loudness Targets (LUFS)
**Integrated Loudness Units Full Scale.**

**Streaming Platforms:**
- Spotify: -14 LUFS
- Apple Music: -16 LUFS (Sound Check)
- YouTube: -13 to -14 LUFS
- Amazon Music: -14 LUFS
- Tidal: -14 LUFS

**Broadcasting:**
- European EBU R128: -23 LUFS
- US ATSC A/85: -24 LKFS (same as LUFS)
- Broadcast stricter than streaming

**Mastering Strategy:**
- Target -14 LUFS for streaming
- -0.3dBTP ceiling
- Preserves dynamics
- Sounds good on all platforms

**If Louder Than Target:**
- Platform turns down (reduces quality)
- Wasted dynamics
- No benefit to louder

**Professional Practice:**
- Master to -14 LUFS integrated
- -0.3 to -1.0dBTP ceiling
- Preserve dynamics
- Don't chase loudness

---

## 5. Noise Gates

### Noise Gate Definition
**Silences signal when below threshold (opposite of compressor).**

**Purpose:**
- Remove background noise during silence
- Eliminate bleed from other sources
- Clean up recordings
- Create rhythmic effects

**How It Works:**
- Signal below threshold: gate closes (silence)
- Signal above threshold: gate opens (passes signal)
- Opposite of compressor (which acts above threshold)

### Threshold
**Level below which gate closes.**

**Setting:**
- Above noise floor
- Below desired signal
- Find balance: silence noise, pass wanted sound

**Common Mistake:**
- Too high: cuts off quiet parts of signal
- Too low: doesn't remove noise

### Range/Reduction
**Amount of attenuation when gate closed.**

**Settings:**
- -∞dB: Complete silence (hard gate)
- -40dB: Gentle reduction (soft gate)
- -20dB: Moderate reduction

**Hard vs Soft Gate:**
- Hard (-∞dB): Complete silence, obvious
- Soft (-20 to -40dB): Reduces noise, more natural

### Attack Time (Gate)
**How quickly gate opens when signal exceeds threshold.**

**Settings:**
- 0.1ms-1ms: Instant (percussive sounds)
- 1ms-10ms: Fast (most sounds)
- 10ms-50ms: Slow (smooth, gentle)

**Too Fast:** Can click
**Too Slow:** Cuts off attack transient

**Typical:** 1-5ms for drums, 5-20ms for vocals

### Hold Time
**Time gate stays open after signal falls below threshold.**

**Purpose:**
- Prevents chattering (rapid open/close)
- Keeps gate open through brief dips
- More natural decay

**Settings:**
- 10ms-50ms: Percussive
- 50ms-200ms: Standard
- 200ms-1000ms: Long holds

### Release Time (Gate)
**How quickly gate closes after hold time.**

**Settings:**
- 10ms-50ms: Fast (abrupt)
- 50ms-300ms: Medium (natural)
- 300ms-1000ms+: Slow (smooth)

**Too Fast:** Unnatural cutoff
**Too Slow:** Doesn't silence noise quickly

**Musical Timing:**
- Set to song tempo
- Quarter note, eighth note values
- Rhythmic gating

### Hysteresis
**Different thresholds for opening and closing gate.**

**Opening Threshold:** -20dB (example)
**Closing Threshold:** -25dB (5dB lower)

**Purpose:**
- Prevents chattering
- Gate doesn't rapidly open/close
- More stable behavior

**Amount:**
- 3-10dB typical
- Larger = more stable, less sensitive

### Lookahead (Gate)
**Gate previews signal to open before transient.**

**Benefits:**
- Preserves attack transients
- Gate opens before hit
- No transient loss
- Adds latency (1-5ms)

### Sidechain (Gate)
**External signal controls gate (not input signal).**

**Uses:**
- Key gate with different source
- Rhythmic gating effects
- Ducking
- Creative effects

**Example:** Kick drum triggers gate on bass (tight rhythmic relationship)

### Ducking
**Reducing level when external signal present (opposite of gating).**

**Example:** Lower music when voice present (podcast/radio)

**Setup:**
- Sidechain input: voice
- Gate on music
- Inverted: closes when voice present

### Applications (Gate)
**Common uses for noise gates.**

**Drum Gating:**
- Remove ring and bleed
- Tighten sound
- Control sustain
- Especially: toms, snare bottom mic

**Vocal Gating:**
- Remove breath noise
- Clean up between phrases
- Gentle settings (not obvious)

**Guitar Amp:**
- Remove hum and noise
- Between notes/phrases
- Tight, controlled sound

**Live Sound:**
- Reduce feedback potential
- Clean up monitors
- Tighten overall sound

---

## 6. Expanders & De-essers

### Expander (Downward)
**Opposite of compressor - increases dynamic range.**

**How It Works:**
- Signal below threshold: reduced further
- Signal above threshold: passes normally
- Like gentle gate (reduction not silence)

**Ratio:**
- 1:2 typical (opposite of 2:1 compressor)
- Signal 2dB below threshold = 3dB reduction (1dB more)

**Uses:**
- Gentle noise reduction
- Increase dynamics
- "Open up" compressed material
- More natural than gate

### Upward Expander
**Increases dynamics by raising loud parts.**

**Opposite of Upward Compression:**
- Makes loud parts louder
- Below threshold passes normally
- Increases dynamic range from top

**Rare:** Less common, specialized use

### De-esser
**Specialized compressor reducing harsh sibilance (s, t, sh sounds).**

**Problem:**
- Sibilance (s, t, sh): 4kHz-10kHz
- Too loud/harsh in recordings
- Exaggerated by compression

**How It Works:**
1. Sidechain filters 4-8kHz (sibilance range)
2. Compressor triggered by filtered signal
3. Reduces overall level when sibilance present
4. Or reduces only 4-8kHz band

**Types:**

**Broadband:**
- Reduces entire signal
- When sibilance detected
- Simpler, can sound more natural

**Split-band (Multiband):**
- Reduces only sibilant frequencies
- More precise
- Can sound more transparent

**Sibilance Frequency Range:**
- Male vocals: 4-6kHz
- Female vocals: 6-8kHz
- Some extends to 10kHz

**Settings:**
- **Threshold:** -20dB to -10dB (where sibilance occurs)
- **Ratio:** 3:1 to 6:1 (moderate to aggressive)
- **Frequency:** 4-8kHz (sweep to find sibilance)

**De-esser Threshold:**
- Set while vocalist sings "s" sounds
- Reduce only sibilance (not entire vocal)
- 3-6dB reduction typical

**Professional Practice:**
- Use after compression (compression makes sibilance worse)
- Gentle reduction (3-6dB)
- Check doesn't dull overall vocal
- Essential vocal processing tool

---

# PART 4: DYNAMICS IN PRODUCTION

## 7. Dynamics in Mixing & Mastering

### Dynamic Range (Complete)
**Difference between loudest and quietest parts of audio.**

**Measurement:**
- In decibels (dB)
- Peak minus noise floor = maximum possible
- Crest factor = peak / RMS (program dynamic range)

**By Genre:**
- Classical: 20-30dB (very wide)
- Jazz: 15-25dB (wide)
- Rock: 10-15dB (moderate)
- Pop: 6-12dB (narrow)
- EDM/Hip-Hop: 4-8dB (very narrow)

### Gain Staging (Dynamics Context)
**Maintaining optimal levels for dynamic processors.**

**Goals:**
- Hit compressor at optimal level
- Maintain headroom
- Proper level for A/D converters
- Consistent gain structure

**Targets:**
- Into compressor: -18dBFS to -12dBFS
- Out of compressor: -12dBFS to -6dBFS
- Master bus: -6dBFS to -3dBFS (before limiting)

### RMS vs Peak Metering
**Two different ways to measure audio level.**

**Peak Meter:**
- Shows instantaneous peak level
- Catches transient spikes
- Important: preventing clipping
- Doesn't represent loudness

**RMS Meter (Root Mean Square):**
- Shows average level over time
- Represents perceived loudness better
- Slower response
- Used: for compression, dynamics

**Both Important:**
- Watch peaks: prevent clipping
- Watch RMS: manage loudness and dynamics

### LUFS (Loudness Units Full Scale)
**Modern loudness measurement standard.**

**Why LUFS:**
- Better than RMS
- Matches human perception
- Industry standard
- Streaming platform standard

**Types:**
- Integrated LUFS: Overall average entire track
- Short-term LUFS: 3-second average
- Momentary LUFS: 400ms average

**Mastering Targets:**
- Spotify: -14 LUFS integrated
- Apple Music: -16 LUFS
- YouTube: -13 LUFS
- Amazon: -14 LUFS

### Crest Factor
**Ratio between peak and RMS level.**

**Formula:** Peak (dB) - RMS (dB) = Crest Factor

**High Crest Factor (15-20dB):**
- Dynamic material
- Classical, jazz
- Lots of peaks, lower average
- Wide dynamic range

**Low Crest Factor (4-8dB):**
- Heavily compressed
- Modern pop, EDM
- Peaks close to average
- Narrow dynamic range

**Professional Understanding:**
- High = dynamic, natural
- Low = compressed, loud
- Balance based on genre

### Headroom (Before Mastering)
**Leaving level space before mastering stage.**

**Target:**
- -6dBFS on master bus peaks (ideal)
- -3dBFS minimum
- Leaves room for mastering processing

**Why Needed:**
- Mastering adds level
- Processing adds level
- Prevents clipping
- Allows mastering engineer to work

**Common Mistake:**
- Mixing to 0dBFS (no headroom)
- Mastering engineer can't add anything
- Must lower level first (reduces quality)

### Mastering Dynamics
**Dynamic processing in final mastering stage.**

**Chain:**
1. EQ (broad, subtle)
2. Multiband compression (optional)
3. Compression (1-3dB glue)
4. Limiting (loudness, ceiling)

**Goals:**
- Subtle enhancement
- Competitive loudness
- Maintain dynamics as much as possible
- Polish and finalize

**Modern Approach:**
- Less compression than past (loudness war over)
- Target LUFS not maximum loudness
- Preserve dynamics
- Transparent processing

---

## 8. Sidechain Processing

### Sidechain Compression (Complete)
**Using external signal to trigger compression.**

**Setup:**
1. Compressor on track A (bass)
2. Sidechain input: track B (kick drum)
3. When kick hits: bass compresses
4. Result: bass "ducks" out of way of kick

**Famous Use:**
- Dance music (bass ducks for kick)
- "Pumping" effect (EDM, house)
- Creates space for kick
- Rhythmic, musical

**Settings:**
- Fast attack (0.1-5ms)
- Fast release (50-150ms)
- Moderate ratio (4:1-8:1)
- 3-6dB reduction

**Applications:**
- Bass/Kick relationship (make room)
- Vocals/Music (music ducks for vocals)
- Lead/Pads (pads duck for lead)
- Rhythmic effects

### Sidechain EQ
**EQ'd sidechain signal (compress only specific frequencies).**

**Use Case:**
- De-esser (compress only when sibilance present)
- Frequency-specific ducking
- Kick only triggers on low frequencies

**Setup:**
1. High-pass filter on sidechain
2. Only low frequencies trigger
3. More precise control

### Sidechain for Ducking
**Automatic volume reduction when other source present.**

**Podcast/Radio:**
- Music ducks when voice present
- Automatically
- Smooth, professional

**Setup:**
- Compressor on music
- Sidechain: microphone
- Fast attack (1-5ms)
- Medium release (100-300ms)
- 6-12dB reduction

### Creative Sidechain Effects
**Artistic uses beyond utility.**

**Rhythmic Pumping:**
- EDM/Dance standard
- Obvious pumping effect
- Musical, rhythmic
- Part of genre aesthetic

**Gated Reverb:**
- Gate on reverb
- Triggered by dry signal
- Classic 80s effect
- Phil Collins drum sound

**Tremolo Effect:**
- LFO triggers sidechain
- Rhythmic pulsing
- Tempo-synced

---

## Summary: Volume 5 Complete

**Part 1:** Compression Theory - 9 Core Parameters (Threshold, Ratio, Attack, Release, Knee, Makeup Gain, Metering, Input/Output)

**Part 2:** 7 Compressor Types (VCA, FET, Optical, Variable-Mu, Tube, Diode Bridge, Digital) + Advanced Compression (Parallel, Serial, Upward)

**Part 3:** Limiting Complete (10 concepts), Noise Gates (11 parameters), Expanders, De-essers

**Part 4:** Dynamics in Mixing/Mastering (9 concepts: Dynamic Range, Gain Staging, RMS vs Peak, LUFS, Crest Factor, Headroom, etc.) + Sidechain Processing (8 techniques)

**Total Coverage:** 71 comprehensive entries covering all aspects of dynamic processing from basic compression to advanced mastering techniques.

---

*Music Tech Dictionary - Volume 5 of 10*
*Complete Dynamic Processing Reference*
*© 2024 - Educational Use*

