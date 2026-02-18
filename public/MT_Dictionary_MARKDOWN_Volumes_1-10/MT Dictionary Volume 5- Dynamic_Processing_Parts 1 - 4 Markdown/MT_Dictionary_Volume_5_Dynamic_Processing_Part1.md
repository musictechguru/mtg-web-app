# Music Tech Dictionary
## Volume 5: Dynamic Processing Complete - FULL COMPREHENSIVE EDITION
### Part 1 of 4: Compression Theory & Core Parameters

---

# PART 1: COMPRESSION FUNDAMENTALS

## 1. Compression Theory

### Compression Definition
**Automatic reduction of dynamic range - making loud parts quieter and/or quiet parts louder.**

**What is Dynamic Range:**
- Difference between loudest and quietest parts of audio
- Wide dynamic range: Large difference (classical music, acoustic recordings)
- Narrow dynamic range: Small difference (modern pop, radio-ready)

**What Compression Does:**
- Reduces peaks (makes loud parts quieter)
- Can raise average level (makeup gain)
- Creates more consistent level
- Controls dynamics automatically

**Why Use Compression:**
- **Control peaks:** Prevent clipping
- **Increase perceived loudness:** Raise average level
- **Consistency:** Even out performance dynamics
- **Tone shaping:** Add punch, sustain, character
- **Glue:** Make elements sit together in mix
- **Creative effect:** Pumping, breathing, vintage character

**How It Works:**
1. Signal exceeds threshold
2. Compressor reduces gain (based on ratio)
3. Reduction happens over attack time
4. Signal returns to normal over release time
5. Makeup gain added if desired

**Types of Dynamic Processing:**
- **Downward Compression:** Reduces level above threshold (most common)
- **Upward Compression:** Raises level below threshold (less common)
- **Limiting:** Extreme compression preventing signal exceeding ceiling
- **Expansion:** Increases dynamic range
- **Gating:** Silences signal below threshold

---

### Threshold (in dB)
**Level at which compression begins to activate.**

**Definition:**
- Signal level where compressor starts working
- Above threshold: compression applied
- Below threshold: signal passes unaffected
- Measured in: dBFS (digital) or dBu (analog)

**Setting Threshold:**
- Higher threshold (-10dB): Less compression, only loudest peaks affected
- Medium threshold (-20dB): Moderate compression, balanced
- Lower threshold (-40dB): More compression, affects more of signal
- Very low threshold (-60dB): Almost entire signal compressed

**Visual Indicators:**
- Gain reduction meter shows compression amount
- More gain reduction = lower threshold or higher ratio
- Typical: 3-10dB gain reduction for subtle compression
- Heavy: 10-20dB+ gain reduction for obvious effect

**Threshold by Application:**
- **Vocals:** -15dB to -25dB (moderate, controls peaks)
- **Drums:** -10dB to -20dB (varies by drum)
- **Bass:** -20dB to -30dB (lower, more compression)
- **Mix Bus:** -5dB to -10dB (high, gentle compression)

**Relationship with Ratio:**
- Lower threshold + lower ratio: Gentle overall compression
- Higher threshold + higher ratio: Aggressive peak control
- Interactive: Both affect amount of compression

**Auto Threshold:**
- Some compressors: automatically set threshold
- Adapts to: input signal level
- Less common: manual control preferred for precision

---

### Ratio (2:1, 4:1, 10:1, ∞:1)
**Amount of compression applied to signal exceeding threshold.**

**Definition:**
- Input:Output ratio
- Example: 4:1 = 4dB input increase creates 1dB output increase
- Higher ratio: more compression (more aggressive)
- Lower ratio: less compression (more transparent)

**Common Ratios:**

**2:1 (Gentle):**
- Very subtle compression
- Transparent, natural
- Use: Overall mix control, mastering, gentle leveling
- Effect: Barely noticeable, smooth
- Application: Mix bus, mastering, classical music

**4:1 (Moderate):**
- Standard compression
- Musical, versatile
- Use: Vocals, bass, instruments
- Effect: Noticeable but natural
- Application: Most music production, general purpose

**6:1 to 8:1 (Heavy):**
- Strong compression
- Obvious effect
- Use: Aggressive vocal control, pumping effects
- Effect: Clear compression, sustained notes
- Application: Parallel compression, special effects

**10:1 to 20:1 (Limiting):**
- Very aggressive compression
- Approaching limiting
- Use: Peak control, protection
- Effect: Very sustained, controlled
- Application: Peak limiting, drum transient control

**∞:1 (Brick-Wall Limiting):**
- True limiting
- Signal cannot exceed threshold
- Use: Final limiter, absolute peak control
- Effect: Hard ceiling, no peaks above threshold
- Application: Mastering limiter, live sound protection

**Calculation Example:**
- Threshold: -20dB
- Ratio: 4:1
- Input peak: -10dB (10dB above threshold)
- Compression: 10dB ÷ 4 = 2.5dB allowed through
- Output: -20dB + 2.5dB = -17.5dB
- Gain reduction: 7.5dB

**Ratio by Genre:**
- **Classical/Jazz:** 2:1 to 3:1 (preserve dynamics)
- **Rock/Pop:** 4:1 to 6:1 (controlled, consistent)
- **Electronic/Hip-Hop:** 6:1 to 10:1 (aggressive, loud)
- **Mastering:** 1.5:1 to 3:1 (very gentle)

**Variable Ratio:**
- Some compressors: ratio changes with input level
- Example: Gentle at low levels, aggressive at peaks
- More musical: responds to dynamics naturally

---

### Attack Time (0.1ms - 100ms)
**Time compressor takes to react after signal exceeds threshold.**

**Definition:**
- Time to reach full compression amount
- Fast attack: quick response (0.1-10ms)
- Slow attack: delayed response (20-100ms)
- Controls: how much transient passes through

**Attack Time Effects:**

**Fast Attack (0.1-5ms):**
- Catches transients immediately
- Reduces peak level effectively
- Sounds: controlled, tight, less dynamic
- Use: Aggressive compression, peak control
- Application: Limiters, bass compression, drum control
- Trade-off: Can sound squashed, loss of punch

**Medium Attack (5-20ms):**
- Lets some transient through
- Balances control and impact
- Sounds: natural, punchy, controlled
- Use: General purpose, most mixing
- Application: Vocals, guitars, general instruments
- Sweet spot: Musical and effective

**Slow Attack (20-100ms+):**
- Lets transients pass unaffected
- Compresses sustain/body only
- Sounds: punchy, dynamic, natural
- Use: Preserve impact, enhance punch
- Application: Drums (enhance attack), bass (preserve pick/slap)
- Adds: apparent punchiness

**Attack by Instrument:**
- **Drums:** 5-30ms (preserve attack, control sustain)
- **Bass:** 10-40ms (let pick/slap through, control body)
- **Vocals:** 5-20ms (fast enough to control, not too aggressive)
- **Guitar:** 10-30ms (preserve pick attack)
- **Mix Bus:** 20-50ms (gentle, musical)

**Attack and Transients:**
- Faster attack: less transient through (less punch)
- Slower attack: more transient through (more punch)
- Paradox: Slow attack can make drums sound louder/punchier
- Transient passes: perceived as louder even though sustain compressed

**Auto Attack:**
- Some compressors: automatically adjust attack
- Program-dependent: responds to material
- Examples: LA-2A (optical), certain digital compressors

---

### Release Time (10ms - 5 seconds)
**Time compressor takes to return to unity gain after signal drops below threshold.**

**Definition:**
- Time for gain reduction to return to 0dB
- Fast release: quick recovery (10-100ms)
- Slow release: slow recovery (500ms-5s)
- Controls: how compression "breathes"

**Release Time Effects:**

**Fast Release (10-100ms):**
- Quickly returns to normal
- Follows dynamics closely
- Sounds: Pumping, breathing, obvious
- Use: Creative pumping effects, sidechaining
- Risk: Distortion on low frequencies, obvious pumping

**Medium Release (100-500ms):**
- Balanced recovery
- Musical, transparent
- Sounds: Natural, smooth
- Use: General compression, most mixing
- Sweet spot: Works for most material

**Slow Release (500ms-5s):**
- Slow return to normal
- Smooth, gentle
- Sounds: Sustained, even, glue
- Use: Bus compression, gentle leveling, glue
- Application: Mix bus, mastering, pads

**Auto Release:**
- Compressor adapts release time automatically
- Responds to: program material
- Fast release: for fast transients
- Slow release: for sustained material
- Examples: 1176 (all buttons), many modern compressors

**Release by Application:**
- **Drums:** 50-200ms (quick recovery between hits)
- **Bass:** 100-400ms (follows note pattern)
- **Vocals:** 100-500ms (smooth, natural)
- **Mix Bus:** 300ms-1s (slow, smooth, glue)
- **Parallel Compression:** 10-50ms (fast, aggressive)

**Release and Pumping:**
- Too fast: audible pumping/breathing
- Too slow: compression doesn't recover, sounds over-compressed
- Match tempo: Musical release times sync with tempo
- Example: 120 BPM = 500ms per beat (try 250ms, 500ms, 1000ms)

**Rule of Thumb:**
- Set release: so gain reduction returns to ~0dB before next transient
- Too fast: distortion, pumping
- Too slow: doesn't recover in time
- Just right: smooth, musical

---

### Knee (Hard vs Soft)
**How gradually compression transitions from no compression to full compression.**

**Hard Knee:**
- Abrupt transition at threshold
- Compression starts immediately when signal crosses threshold
- Full ratio applied instantly
- Characteristics: Precise, controlled, obvious
- Sound: Can be harsh, aggressive
- Use: Peak limiting, aggressive compression, precise control
- Visual: Sharp angle at threshold on curve

**Soft Knee:**
- Gradual transition around threshold
- Compression starts below threshold gradually increasing
- Reaches full ratio above threshold
- Characteristics: Smooth, musical, natural
- Sound: Transparent, gentle, musical
- Use: Subtle compression, musical control, mix bus
- Visual: Rounded curve at threshold

**Knee Range:**
- **0dB (Hard Knee):** No transition zone
- **6dB:** Small transition zone (3dB below to 3dB above threshold)
- **12dB:** Medium transition zone (6dB below to 6dB above)
- **24dB+:** Wide transition zone (very gradual)

**How Soft Knee Works:**
- 12dB soft knee, -20dB threshold:
- Compression starts: -26dB (6dB below threshold)
- Gradually increases
- Reaches full ratio: -14dB (6dB above threshold)

**Applications:**
- **Hard Knee:** Limiters, aggressive compression, electronic music, precise peak control
- **Soft Knee:** Mix bus, mastering, gentle compression, natural control, vocals (transparent)

**Tonal Character:**
- Hard knee: More obvious, can add character
- Soft knee: More transparent, less noticeable
- Some compressors: switchable, some fixed

---

### Makeup Gain
**Adds gain after compression to restore output level.**

**Purpose:**
- Compression reduces level (gain reduction)
- Makeup gain restores perceived loudness
- Brings signal back to desired level
- Allows: A/B comparison at matched levels

**Auto Makeup Gain:**
- Automatically compensates for gain reduction
- Output level: matches input level
- Convenient: no manual adjustment
- Found in: many modern compressors
- Can be: slightly imprecise

**Manual Makeup Gain:**
- User sets output level manually
- More precise control
- Better for: critical listening, subtle compression
- Professional preference: manual control

**How Much Makeup Gain:**
- General rule: Add back 50-75% of gain reduction
- Example: 10dB gain reduction → add 5-7dB makeup gain
- Why not 100%: Compressed signal has higher average level
- Goal: Match perceived loudness, not peak level

**Listening Levels:**
- Critical: Compare bypassed vs compressed at same perceived level
- Louder: always sounds "better" (Fletcher-Munson)
- Match levels: for honest comparison
- Use: makeup gain to match loudness

**Applications:**
- Always use: makeup gain for fair comparison
- Parallel compression: less makeup gain (blending with dry)
- Heavy compression: more makeup gain needed
- Gentle compression: minimal makeup gain

---

### Gain Reduction (Metering)
**Visual display showing amount of compression being applied.**

**What It Shows:**
- How much gain is being reduced
- Measured in: negative dB (-3dB, -6dB, -10dB)
- Real-time display
- Essential for: setting compression amount

**Reading Gain Reduction Meter:**
- **0dB:** No compression (signal below threshold or bypassed)
- **-3dB:** Light compression
- **-6dB:** Moderate compression
- **-10dB:** Heavy compression
- **-15dB+:** Very aggressive compression

**Typical Gain Reduction by Application:**
- **Subtle compression:** 1-3dB (transparent, gentle)
- **Standard compression:** 3-8dB (musical, controlled)
- **Heavy compression:** 8-15dB (obvious, aggressive)
- **Limiting:** 10-20dB+ (peak control, loudness)

**Watching Gain Reduction:**
- Constant: May be over-compressed (release too slow)
- Pumping: Normal for dynamic material
- Only peaks: Good (threshold set correctly)
- Never triggering: Threshold too high or ratio too low

**Gain Reduction vs Ratio:**
- Same gain reduction: can be achieved different ways
- Low threshold + low ratio: Gentle overall compression
- High threshold + high ratio: Aggressive peak compression
- Sound different: even with same meter reading

**Professional Practice:**
- Set threshold/ratio: watching gain reduction meter
- Aim for: 3-6dB on most material (starting point)
- More compression: if desired effect
- Less compression: if sounding squashed

---

### Input and Output Gain
**Controls signal level going into and coming out of compressor.**

**Input Gain:**
- Boosts signal before compression
- More input gain: More gain reduction (pushes into threshold)
- Used in: vintage compressors (control compression amount)
- Modern digital: Typically not used (set threshold instead)

**Output Gain:**
- Same as: Makeup gain
- Boosts signal after compression
- Restores: apparent loudness
- Balances: input and output levels

**Gain Staging:**
- Input: Set for appropriate level into compressor
- Threshold: Set for desired compression amount
- Output: Match original level (or desired level)
- Goal: No level change when bypassing (fair comparison)

---

### Input vs Output (A/B Comparison)
**Comparing compressed signal to original at matched levels.**

**Why Important:**
- Louder: always sounds "better"
- Compression: often makes signal louder
- Must compare: at same level for honest assessment
- Only way: to judge if compression improving sound

**How to Compare:**
1. Set compression as desired
2. Add makeup gain to match bypassed level
3. A/B bypass on/off rapidly
4. Listen for: tonal changes, control, character (not loudness)

**What to Listen For:**
- Tighter control: Good compression
- Loss of punch: Too much compression or too fast attack
- Pumping/breathing: Inappropriate attack/release times
- Distortion: Too much gain reduction or fast attack/release
- Character: Tonal coloration (can be good or bad)

**Professional Practice:**
- Always match levels before deciding
- If unsure: bypass and compare
- Compression should: improve sound, not just make louder

---

*[Content continues in Part 2 with Compressor Types]*

