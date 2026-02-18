# Music Tech Dictionary
## Volume 6: EQ & Stereo Complete - FULL COMPREHENSIVE EDITION
### Part 3 of 3: Stereo Imaging, M/S Processing & Width

---

# PART 3: STEREO CONCEPTS

## 5. Stereo Fundamentals

### Stereo Field
**Three-dimensional sound space created by two speakers (left and right).**

**Dimensions:**
- **Width (Horizontal):** Left to right placement
- **Depth (Front-Back):** Near vs far perception
- **Height (Vertical):** Perceived height (subtle, mostly psychoacoustic)

**Stereo Width:**
- **Center (Mono):** Sound equally in both speakers
- **Hard Left:** Sound only in left speaker
- **Hard Right:** Sound only in right speaker
- **Stereo Spread:** Placement between extremes

**Creating Depth:**
- Volume: Louder = closer, quieter = farther
- Reverb: More reverb = farther, less = closer
- Frequency: Brighter = closer, darker = farther
- Pre-delay: Longer pre-delay = farther

**Stereo Image Goals:**
- Width: Use full stereo field (left to right)
- Clarity: Each element has own space
- Depth: Front-to-back dimension
- Focus: Important elements prominent
- Balance: Even distribution of energy

---

### Pan (Panning/Panorama)
**Positioning sound between left and right speakers.**

**Pan Law:**
- Determines level change at center
- **-3dB (most common):** 3dB quieter at center
- **-4.5dB:** More quieter at center
- **-6dB:** Maximum quieter at center (equal power)
- **0dB:** No level change (less common)

**Pan Values:**
- **Center (C or 0):** Equal in both speakers (mono)
- **Hard Left (100L):** Only left speaker
- **Hard Right (100R):** Only right speaker
- **Halfway Left (50L):** More left, some right
- **Halfway Right (50R):** More right, some left

**Panning Strategy:**

**Center:**
- Kick drum
- Bass
- Lead vocal
- Snare (usually)
- Main elements

**Wide (Hard Left/Right):**
- Doubled guitars (L/R)
- Doubled vocals (L/R)
- Background vocals spread
- Percussion details
- Room mics/ambience

**Moderate (30-70% L/R):**
- Hi-hats (slightly off-center)
- Toms (spread across)
- Background elements
- Effects returns
- Most instruments

**Panning Approaches:**

**Symmetrical:**
- Balanced: Equal energy left and right
- Example: Guitar left, keys right
- Professional: Sounds balanced

**Asymmetrical:**
- Unbalanced: More weight one side
- Creative: Can work if intentional
- Risky: Can sound lopsided

**Frequency-Based:**
- Low frequencies: Center (bass, kick)
- High frequencies: Can be wider
- Reason: Low frequencies harder to locate (omnidirectional)

**LCR Panning (Left-Center-Right):**
- Only three positions: Hard left, center, hard right
- Vintage approach (1960s-70s)
- Clear separation
- Classic sound
- Used: Beatles, Led Zeppelin

**Percentage Panning:**
- Modern: Any position between left and right
- More flexibility
- Subtle positioning
- Current standard

---

### Stereo Width
**Perceived distance between left and right extremes of stereo field.**

**Width Perception:**
- **Narrow:** Sounds close together (mono-like)
- **Normal:** Typical speaker width
- **Wide:** Sounds beyond speakers (psychoacoustic effect)
- **Hyper-wide:** Unnaturally wide (special effect)

**Creating Width:**

**Natural Stereo Recording:**
- Two microphones capturing space
- X/Y, ORTF, spaced pair techniques
- Acoustic instruments
- Real spatial information

**Doubling:**
- Record two takes
- Pan hard left and right
- Example: Double-tracked guitars, vocals
- Creates: Natural width, thickness

**Delays:**
- Short delay (10-30ms) on one side
- Haas effect: Creates width illusion
- Be careful: Can cause phase issues

**Stereo Widening Plugins:**
- Analyze and enhance stereo information
- Various algorithms
- Can sound artificial if overdone
- Examples: iZotope Ozone Imager, Waves S1

**M/S Processing:**
- Boost sides relative to mid
- Powerful width control
- Professional technique

---

### Mono Compatibility
**How mix translates when summed to mono (single speaker/phone/Bluetooth).**

**Why Important:**
- Smartphones (mono playback)
- Bluetooth speakers (often mono)
- PA systems (some mono)
- Compatibility check

**Testing Mono Compatibility:**
1. Sum stereo to mono (utility plugin or mixer setting)
2. Listen for phase cancellation
3. Check if elements disappear
4. Ensure mix still sounds good

**Common Mono Problems:**

**Phase Cancellation:**
- Out-of-phase stereo information cancels when summed
- Result: Thin, weak, elements disappear
- Caused by: Stereo widening, delays, phase issues

**Stereo Effects:**
- Some stereo effects disappear in mono
- Stereo delays collapse
- Wide pads become thin

**Hard-Panned Elements:**
- Stay in mono (just quieter)
- Not a problem typically

**Solutions:**

**Check Regularly:**
- Toggle to mono frequently during mix
- Ensure critical elements audible in mono

**Avoid Extreme Phase Manipulation:**
- Stereo widening: Use cautiously
- Mid/Side: Don't remove too much mid
- Delays: Check in mono

**Keep Low End Mono:**
- Bass and kick: Always centered
- Low frequencies: Naturally mono anyway
- Prevents: Phase issues in subs

**Professional Practice:** Check mono compatibility throughout mix. Important elements should survive mono summing. Width is bonus, not requirement.

---

### Phase Correlation Meter
**Visual display showing phase relationship between left and right channels.**

**Display:**
- **+1 (Fully In Phase):** Perfect correlation, mono
- **0 (Uncorrelated):** No relationship, random
- **-1 (Fully Out of Phase):** Perfect opposition, cancels in mono

**Meter Reading:**
- **+1.0 to +0.8:** Excellent correlation, mono-compatible
- **+0.8 to +0.5:** Good correlation, safe
- **+0.5 to +0.3:** Some phase issues, check carefully
- **+0.3 to 0:** Significant phase issues, will have mono problems
- **Below 0:** Serious phase problems, will cancel in mono

**What Causes Poor Correlation:**
- Stereo widening (reduces correlation)
- M/S processing (boosting sides)
- Phase-inverted signals
- Extreme stereo delays
- Poor mic placement (multi-mic)

**Professional Targets:**
- **Mixing:** Stay above +0.5 typically
- **Mastering:** Keep above +0.7 for safety
- **Important elements:** Should be highly correlated
- **Effects/ambience:** Can have lower correlation

**Famous Correlation Meters:**
- **iZotope Ozone Imager:** Visual correlation
- **Waves PAZ Analyzer:** Phase meter
- **FabFilter Pro-L 2:** Correlation meter

---

## 6. M/S Processing (Mid/Side)

### M/S Technique Definition
**Processing center (mid) and sides separately using M/S encoding/decoding.**

**Concept:**
- **Mid (M):** Mono sum of left + right (center information)
- **Side (S):** Difference between left and right (stereo information)
- **Conversion:** L/R ↔ M/S mathematically

**M/S Math:**
- Mid = (Left + Right) / 2
- Side = (Left - Right) / 2
- Left = Mid + Side
- Right = Mid - Side

**What's in Mid:**
- Center-panned elements (vocals, bass, kick, snare)
- Mono information
- Focused, direct sound

**What's in Side:**
- Stereo width
- Ambience, reverb
- Panned elements
- Spatial information

---

### M/S EQ
**Applying different EQ to mid and side signals independently.**

**Mid EQ Applications:**

**Clean Up Center:**
- Cut 200-500Hz: Remove mud from center
- Result: Clear, focused center, bass punch

**Add Vocal Presence:**
- Boost 3-5kHz on mid
- Result: Vocal clarity without harshness on sides

**Control Bass:**
- EQ only mid (bass is mostly mono anyway)
- Cut/boost affects center only

**Side EQ Applications:**

**Add Width Without Mud:**
- HPF sides at 200-300Hz
- Result: Wide highs, tight focused lows

**Enhance Stereo Shimmer:**
- High-shelf +2dB on sides at 10kHz
- Result: Wider, more spacious highs

**Reduce Harshness in Width:**
- Cut 3-4kHz on sides
- Result: Wide but not harsh

**Professional Technique:**
- Mix in L/R, process in M/S
- Very powerful for mastering
- Surgical control of stereo image

---

### M/S Compression
**Compressing mid and side signals separately.**

**Mid Compression:**
- Controls center elements
- Tightens bass, kick, vocals
- More compression = more focused center

**Side Compression:**
- Controls stereo width
- Affects ambience, reverb, panned elements
- More compression = narrower image

**Applications:**

**Tighten Center, Widen Sides:**
- Compress mid heavily (4:1, 6dB reduction)
- Compress sides lightly (2:1, 2dB reduction)
- Result: Tight focused center, wide spacious sides

**Control Drum Overheads:**
- Compress mid (snare focus)
- Less compression on sides (cymbal space)

**Vocal Mix:**
- Compress mid (vocal control)
- Light/no compression on sides (space preserved)

---

### M/S Width Control
**Adjusting balance between mid and sides to control stereo width.**

**Width Adjustment:**
- **Boost Sides:** Wider stereo image
- **Cut Sides:** Narrower stereo image
- **Boost Mid:** More centered, focused
- **Cut Mid:** Less center, more width

**Typical Adjustments:**
- **Normal Width:** 0dB mid, 0dB side
- **Wider:** 0dB mid, +2 to +4dB side
- **Narrower:** 0dB mid, -2 to -4dB side
- **Mono:** 0dB mid, -∞dB side (mute sides)

**Frequency-Specific Width:**
- Wide highs: Boost sides above 4kHz
- Mono lows: Cut sides below 200Hz
- Result: Tight low end, wide highs (professional standard)

**M/S Widening vs Stereo Widening:**
- M/S: More transparent, predictable
- Stereo widening: Can introduce artifacts
- M/S: Better mono compatibility control

**Professional Practice:**
- Keep lows mono (cut sides <150Hz)
- Widen highs carefully (+2 to +4dB on sides >4kHz)
- Check mono compatibility always
- Don't overdo (less is more)

---

### M/S Recording
**Recording technique using mid mic (cardioid facing source) and side mic (figure-8 sideways).**

**Setup:**
- **Mid Mic:** Cardioid facing sound source (captures center)
- **Side Mic:** Figure-8 at 90° (captures left-right difference)
- **Position:** Coincident (same point in space)

**Advantages:**
- Adjustable width in post (change M/S balance)
- Perfect mono compatibility (just use mid)
- Flexible (decide width later)

**Famous Uses:**
- Acoustic instruments
- Orchestral recording
- Room ambience
- Stereo sources where width control needed

**Decoding:**
- Record as M and S
- Decode to L/R for mixing
- Or process in M/S domain

---

## 7. Advanced Stereo Techniques

### Haas Effect (Precedence Effect)
**Psychoacoustic phenomenon creating width perception from short delay (10-40ms).**

**How It Works:**
1. Duplicate signal
2. Delay one side by 10-40ms
3. Pan origina left, delayed right (or vice versa)
4. Brain perceives: Single wider source (not delayed)

**Delay Ranges:**
- **0-10ms:** Comb filtering (phase issues, don't use)
- **10-20ms:** Haas effect zone (width without obvious delay)
- **20-40ms:** Maximum width (still fused into one)
- **>40ms:** Perceived as echo/delay (separate event)

**Applications:**
- Mono source made stereo (vocals, instruments)
- Width enhancement
- Doubling effect
- Stereo from mono

**Caution:**
- Check mono compatibility (can cancel)
- Don't use on bass/kick (phase issues)
- Can sound artificial if obvious

**Professional Use:** Stereo enhancement technique. Better results from real double-tracking, but useful for mono sources.

---

### Pseudo-Stereo (Mono to Stereo)
**Converting mono signal to stereo using various techniques.**

**Methods:**

**Haas Effect (Delay):**
- Short delay (15-30ms) on one side
- Simple, effective
- Mono compatibility issues

**EQ Difference:**
- Slightly different EQ left vs right
- Small differences create width illusion
- Better mono compatibility

**Reverb/Delay:**
- Add stereo reverb to mono signal
- Spatial impression without phase issues
- Natural-sounding width

**Stereo Imager Plugins:**
- Analyze and synthesize stereo from mono
- Various algorithms
- Results vary

**Professional Practice:** Real stereo always better (mic techniques, double-tracking). Pseudo-stereo: Last resort for mono sources needing width.

---

### Stereo Imaging Plugins
**Specialized tools for analyzing and manipulating stereo field.**

**Famous Stereo Imaging Tools:**

**iZotope Ozone Imager (Free):**
- Visual stereo field display
- Width control per band
- Mono-ize low end
- Free, excellent

**Waves S1 Stereo Imager:**
- M/S manipulation
- Width control
- Shuffling (L/R adjustment)
- Industry standard, $179

**Brainworx bx_digital V3:**
- M/S EQ
- Stereo width
- Mono maker
- Professional tool, $199

**FabFilter Pro-L 2:**
- Stereo field display
- Correlation meter
- Width limiting
- Part of limiter, $179

**Features to Look For:**
- Visual feedback (see stereo field)
- Frequency-specific width control
- Mono compatibility checking
- Phase correlation meter

---

### Correlation and Phase Issues
**Problems from poor phase relationships in stereo signal.**

**Phase Problems:**
- Left and right out of phase
- Cancellation when summed to mono
- Thin, weak sound
- Elements disappear

**Causes:**
- Stereo widening overuse
- Poor mic placement (drums)
- Polarity inversion
- Delay-based widening
- M/S processing (excessive side boost)

**Detection:**
- Phase correlation meter (should be positive)
- Mono check (elements disappear?)
- Sound thin/weak when mono

**Solutions:**
- Reduce stereo widening
- Check polarity (phase invert if needed)
- Use less M/S side boost
- High-pass sides (remove low-frequency phase issues)
- Re-record with better mic technique

**Professional Practice:** Always check phase correlation. Keep above +0.5 for safety. Important elements should be highly correlated.

---

### Stereo Spreading Best Practices
**Guidelines for professional stereo image.**

**Width Guidelines:**

**Keep Centered:**
- Bass (under 200Hz)
- Kick drum
- Lead vocals
- Snare (usually)
- Primary elements

**Can Be Wide:**
- High frequencies (above 4kHz)
- Ambience and reverb
- Doubled elements
- Background elements
- Effects

**Frequency-Specific Width:**
- **Low (20-200Hz):** Mono (focused, powerful)
- **Low-Mid (200-500Hz):** Mostly mono (clarity)
- **Mid (500Hz-2kHz):** Moderate width (natural)
- **High-Mid (2-4kHz):** Wider (space, clarity)
- **High (4kHz+):** Widest (air, space)

**Professional Rules:**
1. Mono low end (high-pass sides at 150-300Hz)
2. Center important elements (vocals, bass, kick)
3. Use width for enhancement, not necessity
4. Check mono compatibility always
5. Less is more (don't over-widen)
6. Width is bonus, not requirement

**Common Mistakes:**
- Too wide low end (phase issues, weak bass)
- Everything wide (no focus, tiring)
- Phase issues from over-processing
- Not checking mono compatibility
- Width for its own sake

**Professional Result:**
- Focused, powerful center (bass, kick, vocals)
- Wide, spacious highs (air, dimension)
- Clear separation (each element has space)
- Mono compatible (sounds good everywhere)
- Dimensional but cohesive

---

## Summary: Volume 6 Complete

**Part 1:** EQ Fundamentals (Frequency, Gain, Q, Phase Shift) + 6 Filter Types (HPF, LPF, Band-Pass, Shelf, Bell, Notch)

**Part 2:** 6 EQ Types (Parametric, Graphic, Channel Strip, Dynamic, Linear-Phase, Minimum-Phase) + 7 EQ Techniques (Subtractive, Additive, Surgical, Musical, EQ Matching, M/S EQ, Automation)

**Part 3:** 5 Stereo Fundamentals (Stereo Field, Pan, Width, Mono Compatibility, Correlation) + 5 M/S Techniques (M/S Concept, EQ, Compression, Width Control, Recording) + 5 Advanced Stereo (Haas Effect, Pseudo-Stereo, Imaging Plugins, Phase Issues, Best Practices)

**Total Coverage:** 71 comprehensive entries covering all aspects of EQ and stereo imaging from fundamentals to professional mastering techniques.

---

*Music Tech Dictionary - Volume 6 of 10*
*Complete EQ & Stereo Reference*
*© 2024 - Educational Use*

