# Music Tech Dictionary
## Volume 6: EQ & Stereo Complete - FULL COMPREHENSIVE EDITION
### Part 2 of 3: EQ Types, Techniques & Applications

---

# PART 2: EQ TYPES & TECHNIQUES

## 3. EQ Types (By Design)

### Parametric EQ
**Full control over frequency, gain, and bandwidth (Q) for each band.**

**Features:**
- Adjustable frequency: 20Hz-20kHz continuously variable
- Adjustable gain: ±12dB to ±20dB typical
- Adjustable Q: 0.5 to 10+ (narrow to wide)
- Multiple bands: 4-8 bands typical
- Most versatile: Complete control

**Band Types:**
- Bell/peak filters (parametric)
- High-pass and low-pass filters
- High-shelf and low-shelf filters
- All adjustable

**Advantages:**
- Maximum flexibility
- Surgical precision when needed
- Musical adjustments when needed
- Industry standard for mixing

**Famous Parametric EQs:**
- **FabFilter Pro-Q 3:** Most popular plugin, $179, visual feedback
- **Waves SSL E-Channel:** SSL console EQ, $179
- **UAD Neve 1073:** Vintage Neve character, $299
- **API 550A/550B:** Classic API punch, $299
- **Pultec EQP-1A:** Vintage tube EQ, $299

**Professional Use:** Standard in all mixing. Essential tool. Every engineer uses parametric EQ.

---

### Graphic EQ
**Fixed frequencies with slider faders for gain adjustment.**

**Features:**
- Fixed frequencies: Pre-determined bands
- Fader controls: Gain only (no frequency or Q adjustment)
- Visual display: Faders show curve visually
- Band count: 10-band, 15-band, 31-band typical

**Band Spacing:**
- **Octave EQ:** 10 bands (one per octave)
- **2/3 Octave EQ:** 15 bands
- **1/3 Octave EQ:** 31 bands (most precise)

**Fixed Frequencies (31-band example):**
- 20, 25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800Hz
- 1k, 1.25k, 1.6k, 2k, 2.5k, 3.15k, 4k, 5k, 6.3k, 8k, 10k, 12.5k, 16k, 20kHz

**Applications:**
- Live sound (main FOH EQ, monitor EQ)
- Room tuning (correct acoustic problems)
- Quick visual EQ (see curve immediately)
- Feedback elimination (notch specific frequencies)

**Advantages:**
- Fast visual feedback (see curve shape)
- Consistent frequencies (standardized)
- Easy to learn (just boost/cut faders)
- Good for room correction

**Disadvantages:**
- Less flexible (can't adjust frequency)
- Fixed Q (usually narrow, can sound unmusical)
- Not ideal for mixing (parametric better)

**Professional Use:** Live sound standard. Less common in studio mixing.

---

### Channel Strip EQ
**EQ built into mixing console channels or as dedicated outboard unit.**

**Features:**
- Limited bands: 3-4 bands typical
- Semi-parametric: Some controls fixed
- Simplified: Fast workflow
- Integrated: Part of complete channel strip

**Typical Configuration:**
- High-shelf: Fixed or sweepable
- High-mid parametric: Full control
- Low-mid parametric: Full control  
- Low-shelf: Fixed or sweepable
- HPF: Sweepable cutoff

**Famous Channel Strip EQs:**
- **Neve 1073:** 3-band + HPF, fixed frequencies, $3,000-5,000
- **SSL E/G-Series:** 4-band parametric, $2,000-4,000 per channel
- **API 550A:** 4-band, fixed frequencies, switched, $1,500-2,000
- **Focusrite Red 2:** Parametric, $1,800

**Advantages:**
- Fast workflow (limited options = faster decisions)
- Musical (designed for specific sound)
- Character (analog coloration)
- All-in-one (EQ + other processing)

**Disadvantages:**
- Less flexible (limited control)
- Expensive (hardware)
- Takes up space

**Professional Use:** High-end studios with analog consoles. Character and workflow. Neve 1073 vocals standard.

---

### Dynamic EQ
**EQ that only activates when signal exceeds threshold (frequency-specific compression).**

**Concept:**
- Combines EQ + compressor
- EQ band has threshold
- Only active when frequency exceeds threshold
- Returns to flat when below threshold

**How It Works:**
1. Set frequency, gain, Q (like regular EQ)
2. Set threshold (level where EQ activates)
3. Set ratio (how much EQ applied)
4. Set attack/release (how fast EQ responds)

**Difference from Multiband Compression:**
- Dynamic EQ: Affects only specific frequencies
- Multiband: Affects entire frequency bands
- Dynamic EQ: More surgical, transparent

**Applications:**

**De-essing:**
- Target: 6-8kHz (sibilance)
- Cut only: When sibilance exceeds threshold
- Transparent: Doesn't affect rest of performance

**De-harshing:**
- Target: 2-4kHz (harshness)
- Cut only: When harsh frequencies too loud
- Natural: Only when needed

**Controlling Resonances:**
- Target: Specific resonant frequency
- Cut: Only when resonance excited
- Example: Guitar body resonance at 280Hz

**Enhancing Transients:**
- Target: 3-5kHz (attack)
- Boost: Only on transients (snare crack)
- Dynamic: Adds impact without brightening sustain

**Famous Dynamic EQs:**
- **FabFilter Pro-Q 3:** Built-in dynamic mode, $179
- **Waves F6:** Floating-Band dynamic EQ, $179
- **DMG EQuilibrium:** Dynamic EQ, $199
- **Sonnox Oxford Dynamic EQ:** Professional standard, $349

**Professional Use:** Modern mixing essential. More transparent than multiband compression. Solving problems without affecting entire mix.

---

### Linear-Phase EQ
**Digital EQ that maintains phase relationships (no phase shift).**

**What It Does:**
- No phase shift (unlike minimum-phase EQ)
- Maintains timing relationships between frequencies
- Perfect mono compatibility
- Preserves stereo image

**How It Works:**
- FFT (Fast Fourier Transform) processing
- Lookahead + time alignment
- Digital only (impossible in analog)
- High CPU usage

**Advantages:**
- Perfect phase coherence
- Better mono compatibility
- Maintains stereo width
- Ideal for mastering

**Disadvantages:**
- Pre-ringing (energy before transient)
- Can sound less natural on drums
- Higher latency
- More CPU intensive
- Can smear transients

**When to Use:**
- **Mastering:** Preserve stereo image
- **Stereo sources:** Maintain width
- **Mono compatibility critical:** Broadcasting
- **Parallel processing:** EQ within dry signal

**When NOT to Use:**
- Drums (pre-ringing affects punch)
- Solo instruments (minimum-phase sounds better)
- Creative EQ (character)
- Tracking (latency issues)

**Famous Linear-Phase EQs:**
- **FabFilter Pro-Q 3:** Best linear-phase mode, $179
- **Waves Q10:** Linear phase option, $179
- **DMG EQuilibrium:** Excellent linear-phase, $199

**Professional Practice:** Use minimum-phase for mixing, linear-phase for mastering or when phase critical.

---

### Minimum-Phase EQ (Standard)
**Traditional EQ with natural phase shift (most common type).**

**Characteristics:**
- Phase shift increases with gain
- Phase shift increases with Q
- Natural EQ behavior
- All analog EQs are minimum-phase
- Most plugins default to minimum-phase

**Advantages:**
- Natural, musical sound
- No pre-ringing
- Lower CPU usage
- Better on transients (drums)
- Lower latency

**Disadvantages:**
- Phase shift (can affect stereo image slightly)
- Potential mono compatibility issues
- Frequency-dependent delay

**When to Use:**
- All mixing (default choice)
- Drums and percussion
- Creative EQ
- Tracking
- Any solo instrument

**Professional Practice:** Default choice for 95% of EQ tasks. Only use linear-phase when phase specifically matters.

---

## 4. EQ Techniques

### Subtractive EQ (Cutting)
**Removing problematic frequencies rather than boosting desired ones.**

**Philosophy:** "Cut to fix, boost to enhance"

**Why Cut First:**
- More transparent (less phase shift)
- Increases headroom (reduces level)
- Solves problems (doesn't mask)
- More natural sounding
- Professional standard approach

**Finding Problems:**
1. Set large boost (+10dB)
2. Set narrow Q (3-5)
3. Sweep through frequency range
4. Listen for harsh, muddy, or problematic frequencies
5. When found, switch to cut (-3 to -6dB)
6. Widen Q slightly (1.5-2.5)

**Common Problem Frequencies:**
- **80-120Hz:** Boominess, unwanted bass resonance
- **200-400Hz:** Mud, boxiness (most common problem area)
- **500Hz-1kHz:** Honkiness, nasality
- **2-4kHz:** Harshness, aggressiveness
- **6-8kHz:** Sibilance, excessive brightness

**Subtractive EQ Guidelines:**
- Wider Q for cuts (more musical)
- Larger cuts acceptable (up to -10dB)
- Multiple small cuts better than one large
- High-pass everything except kick/bass

**Professional Practice:** Always start with subtractive EQ. Fix problems before enhancing. Creates cleaner, clearer mix with more headroom.

---

### Additive EQ (Boosting)
**Enhancing desired frequencies to add character or presence.**

**When to Boost:**
- After cutting problems
- Adding presence or air
- Enhancing character
- Creating separation
- Making elements shine

**Boost Guidelines:**
- **Subtle:** +1-3dB (transparent, natural)
- **Moderate:** +3-6dB (noticeable, musical)
- **Aggressive:** +6-10dB (obvious, special effect)
- Wider Q: More musical boosts
- Smaller boosts: Sound more natural

**Common Enhancement Frequencies:**
- **60-80Hz:** Sub-bass weight, power
- **100-200Hz:** Warmth, body, fullness
- **3-5kHz:** Presence, clarity, "poking through"
- **8-12kHz:** Air, space, openness, "hi-fi"
- **10-15kHz:** Shimmer, sparkle, top-end extension

**Additive EQ Applications:**

**Vocals:**
- +3dB at 10kHz (Q 0.7): Air and presence
- +2dB at 3kHz (Q 2.0): Clarity and definition

**Kick Drum:**
- +3dB at 60Hz (Q 1.5): Sub-bass weight
- +4dB at 3-5kHz (Q 2.0): Beater click, definition

**Snare:**
- +3dB at 200Hz (Q 1.5): Body
- +4dB at 3kHz (Q 2.0): Crack, snap

**Acoustic Guitar:**
- +2dB at 12kHz (Q 0.7): Shimmer, air
- +3dB at 3-4kHz (Q 1.5): Presence, pick attack

**Caution:**
- Boosting adds level (reduces headroom)
- Boosting creates phase shift
- Too much boosting: harsh, fatiguing
- Always check in context (not solo)

---

### Surgical EQ
**Precise, narrow-band EQ for removing specific problem frequencies.**

**Characteristics:**
- Very narrow Q (5-20)
- Targeted frequency (precise)
- Usually cutting (problem removal)
- Transparent (shouldn't be obvious)

**Finding Resonances:**
1. Boost +10 to +15dB
2. Narrow Q (5-10)
3. Sweep slowly through range
4. Listen for ugly resonances, ringing, harshness
5. When found, cut -3 to -10dB at that exact frequency

**Common Problems:**
- **Resonant frequencies:** Instrument body, room modes
- **Cabinet resonances:** Guitar amps, speakers
- **String buzz:** Specific pitch ringing
- **Room modes:** Standing waves at specific frequencies
- **Microphone resonances:** Capsule resonances

**Applications:**

**Acoustic Guitar Body Resonance:**
- Often: 200-400Hz
- Cut: -4 to -8dB
- Q: 5-8 (very narrow)

**Snare Drum Ring:**
- Often: 300-600Hz
- Cut: -3 to -6dB
- Q: 4-6

**Vocal Harshness:**
- Often: 2.5-3.5kHz
- Cut: -2 to -5dB
- Q: 3-5

**Room Mode:**
- Often: 80-150Hz
- Cut: -3 to -8dB
- Q: 8-15 (very narrow)

**Professional Practice:**
- Use sparingly (only for real problems)
- Always bypass and check necessity
- Multiple small narrow cuts better than one huge
- Don't overdo (can make sound lifeless)

---

### Musical EQ (Broad, Gentle)
**Wide, gentle EQ for tonal shaping and enhancement.**

**Characteristics:**
- Wide Q (0.5-1.5)
- Gentle boosts/cuts (±1-4dB)
- Natural, transparent
- Musical, pleasant
- Affects multiple frequencies together

**Philosophy:**
- Shape overall tonal balance
- Enhance character
- Sit elements in mix
- Create cohesion

**Guidelines:**
- Use after surgical EQ (fix problems first)
- Wider curves sound more natural
- Smaller adjustments (1-3dB)
- Always check in mix context

**Applications:**

**Vocals - Air and Presence:**
- High-shelf +2dB at 10kHz (Q 0.7)
- Bell +3dB at 3kHz (Q 1.0)
- Result: Clear, present, airy

**Mix Bus - Gentle Enhancements:**
- High-shelf +1dB at 12kHz (Q 0.7): Air
- Bell +1.5dB at 3kHz (Q 1.0): Presence
- Low-shelf -1dB at 200Hz (Q 0.7): Clean low-mids

**Acoustic Guitar - Warmth and Shimmer:**
- Low-shelf +2dB at 150Hz (Q 0.7): Body
- High-shelf +3dB at 8kHz (Q 0.7): Sparkle

**Professional Standard:** Most mixing EQ should be musical (broad, gentle). Surgical EQ only for specific problems.

---

### EQ Matching
**Analyzing and copying frequency response from one source to another.**

**How It Works:**
1. Load reference track (desired sound)
2. Analyzer learns frequency curve
3. Creates inverse EQ curve
4. Applies to your track (matches reference)

**Uses:**
- Match mastering EQ from reference
- Match specific instrument tone
- Learn from professional mixes
- Starting point for EQ

**Famous EQ Matching Plugins:**
- **FabFilter Pro-Q 3:** EQ Match feature, $179
- **iZotope Ozone:** Match EQ module, $249
- **Waves Scheps 73:** Tone matching, $179

**Limitations:**
- Not magic (can't fix arrangement, performance)
- Works best on similar material
- Should be starting point, not final
- Requires tweaking after match

**Professional Use:** Learning tool. Starting point for mastering EQ. Understanding target frequency balance.

---

### Mid/Side EQ
**Separate EQ for center (mid) and sides (stereo) information.**

**Concept:**
- Mid: Mono information (center)
- Side: Stereo information (sides)
- Independent EQ for each
- Powerful stereo manipulation

**Applications:**

**Widen Mix - Boost Sides:**
- High-shelf +3dB on sides at 8kHz
- Result: Wider, more spacious highs

**Clean Up Center - Cut Mid:**
- Cut 200-500Hz on mid
- Result: Clear center, bass stays focused

**Add Width Without Mud:**
- Cut lows on sides (HPF at 150-300Hz)
- Result: Width without low-end phase issues

**Vocal Clarity:**
- Boost mid at 3-5kHz (clarity in center)
- Cut sides at same frequency (reduce bleed)

**Famous Mid/Side EQ:**
- **FabFilter Pro-Q 3:** M/S mode, $179
- **Brainworx bx_digital V3:** M/S EQ, $199
- **iZotope Ozone:** M/S EQ, $249

**Professional Use:** Mastering standard. Advanced mixing technique. Powerful for stereo enhancement.

---

### EQ Automation
**Changing EQ settings over time using automation.**

**Applications:**

**Vocal Automation:**
- Boost presence (3-5kHz) during verse for clarity
- Reduce in dense chorus (make room for instruments)
- Result: Vocals sit perfectly throughout song

**Build Intensity:**
- Gradually high-pass less during build
- Open up low end as song progresses
- Result: Increasing energy and fullness

**Remove Problem Only When Present:**
- Cut resonance only in specific section
- Example: Guitar feedback in quiet part only

**Dynamic Sections:**
- Different EQ for verse vs chorus
- Adapt to arrangement density

**Professional Use:** Advanced mixing technique. Subtle changes make huge difference. Essential for dynamic mixes.

---

*[Content continues in Part 3 with Stereo Imaging and M/S Processing]*

