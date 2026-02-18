# Music Tech Dictionary
## Volume 8: Mastering & Audio Editing Complete - FULL COMPREHENSIVE EDITION
### Part 2 of 3: Mastering Processing Chain & Techniques

---

# PART 2: MASTERING PROCESSING

## 3. Mastering Chain (Processing Order)

### Mastering Signal Chain
**Typical order of processors in professional mastering - order is critical.**

**Standard Mastering Chain:**
1. **Corrective EQ:** Fix problems first (mud, harshness, resonances)
2. **Multiband Compression** (optional): Frequency-specific dynamics
3. **Broadband Compression:** Glue, cohesion (1-3dB reduction)
4. **Tonal EQ:** Enhancement (air, warmth, presence)
5. **Saturation** (optional): Analog character, harmonic enhancement
6. **Stereo Enhancement** (optional): Width, M/S processing
7. **Limiting:** Final loudness, peak control
8. **Dithering:** Only if reducing to 16-bit (absolute last)

**Why Order Matters:**
- Each processor affects what follows
- EQ before compression: Compression reacts to EQ'd signal
- Limiting last: Sets absolute ceiling
- Dithering absolute last: Final bit-depth conversion

**Alternative Chains:**
- Some prefer: Compression → EQ (EQ compensates compression)
- "Sandwich EQ": EQ → Compression → EQ (corrective then creative)
- Experimentation encouraged (trust ears)
- But limiting always last (before dither)

**Parallel Mastering:**
- Some processes in parallel (wet/dry blend)
- Especially: Heavy compression, saturation
- Maintains dynamics while adding character

---

### Corrective EQ (Mastering)
**First EQ stage - fixing tonal problems and imbalances.**

**Purpose:**
- Remove mud (200-500Hz)
- Reduce harshness (2-4kHz)
- Control excessive bass
- Fix obvious problems
- Prepare for compression

**Characteristics:**
- **Subtractive:** More cuts than boosts
- **Broad Q:** Wide curves (0.5-1.5)
- **Subtle:** ±1-3dB typical
- **Transparent:** Shouldn't be obvious
- **Linear-phase:** Often used (preserve stereo image)

**Common Corrective Moves:**

**High-Pass Filter:**
- 20-30Hz cutoff
- Remove sub-rumble, unnecessary lows
- 12dB/octave slope
- Always applied

**Cut 200-400Hz (Mud):**
- Wide Q (0.7-1.0)
- -1 to -3dB reduction
- Most common correction
- Opens up mix

**Cut 2-4kHz (Harshness):**
- Narrower Q (1.5-2.5)
- -1 to -2dB reduction
- If mix harsh/aggressive
- Smooth without dulling

**Cut 6-8kHz (Sibilance):**
- Narrow Q (2-4)
- -1 to -3dB reduction
- If vocals too sibilant
- Or use de-esser

**Professional Practice:** Surgical cuts, musical results. If major EQ needed (>6dB cuts), consider mix revision. Mastering EQ should be subtle refinement, not transformation.

---

### Multiband Compression (Mastering)
**Optional frequency-specific compression for targeted control.**

**When to Use:**
- Bass too dynamic (tighten lows without affecting highs)
- Vocal sibilance (compress highs only when sibilant)
- Frequency imbalance (one range louder than others)
- Not every master needs it (optional tool)

**Typical Band Configuration:**

**3-Band:**
- Low: 20-250Hz
- Mid: 250Hz-5kHz  
- High: 5-20kHz

**4-Band (More Control):**
- Low: 20-120Hz
- Low-Mid: 120Hz-1kHz
- High-Mid: 1-6kHz
- High: 6-20kHz

**Settings Per Band:**

**Low Band (20-250Hz):**
- Tighten bass and kick
- Ratio: 2:1 to 3:1
- Reduction: 1-3dB
- Slow attack (30-50ms)
- Medium release (200-400ms)

**Mid Band (250Hz-5kHz):**
- Usually left alone or very gentle
- Ratio: 1.5:1 to 2:1
- Reduction: 0-2dB
- Medium attack/release

**High Band (5-20kHz):**
- Control cymbals, sibilance
- Ratio: 2:1 to 3:1
- Reduction: 1-2dB
- Fast attack (5-15ms)
- Fast release (50-150ms)

**Crossover Frequencies:**
- Smooth, gentle slopes
- Not at instrument fundamentals
- 120Hz, 1kHz, 6kHz common points

**Caution:**
- Easy to over-process (sound unnatural)
- Use sparingly (not every master)
- Solo bands to check (should sound natural)
- A/B frequently (bypass and compare)

**Tools:**
- FabFilter Pro-MB ($199)
- iZotope Ozone Dynamics ($249 in suite)
- Waves Linear Phase Multiband ($299)

**Professional Practice:** Only use if specific frequency needs control. Very gentle ratios and reductions. Smooth crossovers. Bypass frequently to verify necessity.

---

### Broadband Compression (Mastering)
**Full-spectrum gentle compression for glue and cohesion.**

**Purpose:**
- Add "glue" (make elements sit together)
- Subtle dynamic control
- Professional sheen and polish
- Gentle energy and punch
- Bring quieter elements forward slightly

**Target Settings:**

**Ratio:**
- 1.5:1 to 2:1 (very gentle)
- 2:1 to 3:1 (moderate)
- Never above 4:1 in mastering

**Threshold:**
- Set for 1-3dB gain reduction maximum
- Should barely see meter moving
- Gentle, transparent

**Attack:**
- Slow: 30-100ms
- Preserves transients (punch, snap)
- Lets peaks through
- Natural sound

**Release:**
- Auto (if available)
- Or 200-500ms (slow, musical)
- Should recover between beats
- Smooth, not pumping

**Knee:**
- Soft knee (smooth transition)
- More transparent than hard knee
- Musical, gentle

**Makeup Gain:**
- Compensate for gain reduction
- Match bypassed level (honest comparison)
- Or boost slightly for final level

**Compressor Types:**

**VCA (SSL, API):**
- Punchy, controlled
- Good for rock, pop
- Adds slight edge
- Industry standard

**Optical (LA-2A style):**
- Smooth, musical
- Natural compression
- Good for vocals, acoustic
- Very forgiving

**Variable-Mu (Fairchild):**
- Ultimate glue
- Smoothest compression
- Expensive (hardware $30k+)
- Vintage character

**Famous Mastering Compressors:**
- SSL Bus Compressor (VCA, punchy, $3k-8k)
- Manley Variable Mu (tube, smooth, $4k)
- Tube-Tech CL 1B (optical, warm, $3k)
- Shadow Hills Mastering Compressor (multiple topologies, $10k+)
- UAD Fairchild 670 (plugin emulation, $349)

**Gain Reduction Targets:**
- 1-2dB: Subtle glue, transparent
- 2-3dB: Noticeable but musical
- 3-5dB: Obvious (only if intentional)
- >5dB: Too much for mastering

**Professional Practice:** Very gentle compression. 1-2dB reduction ideal. Slow attack preserves punch. Soft knee for musicality. Should enhance, not transform.

---

### Tonal/Enhancement EQ
**Second EQ stage - adding character and final polish.**

**Purpose:**
- Add air and sparkle (8-15kHz)
- Add warmth and body (80-150Hz)
- Enhance presence (3-5kHz)
- Final tonal shaping
- Make mix "pop"

**Characteristics:**
- **Additive:** Usually boosting
- **Broad:** Wide shelving or gentle bells
- **Subtle:** +1-3dB typical
- **Musical:** Pleasant enhancements
- **Genre-specific:** Match style expectations

**Common Enhancement Moves:**

**High-Shelf +1-2dB at 10-12kHz:**
- Add air, openness, "hi-fi" quality
- Wide Q or shelf
- Brightens without harshness
- Almost always beneficial

**Low-Shelf +1-2dB at 100Hz:**
- Add warmth, fullness, weight
- Gentle, wide curve
- Fills out bottom end
- Careful not to add mud

**Bell +1-2dB at 3-4kHz:**
- Add presence, clarity
- Medium Q (1.0-2.0)
- Helps vocal intelligibility
- Brings mix forward

**Bell +1-2dB at 8kHz:**
- Add definition, edge
- Narrow than air boost
- Sharpness and detail
- Use carefully (can be harsh)

**Pultec Curve (Classic):**
- Boost lows (30-100Hz) with bandwidth control
- Boost highs (10-16kHz) shelving
- Slight dip in low-mids (200-400Hz)
- Vintage, musical character

**Famous Mastering EQs:**
- Pultec EQP-1A (tube, vintage, $3k-6k)
- Maag EQ4 (air band, mastering favorite, $500-1k)
- Massive Passive (Manley, wide and smooth, $5k)
- GML 8200 (parametric, transparent, $6k+)
- Sontec MEP-250EX (legendary, $10k+)

**Plugin Alternatives:**
- UAD Pultec ($149)
- Plugin Alliance Maag EQ4 ($199)
- Acustica Audio Aqua ($169)

**Professional Practice:** Enhance after compression (compression reacts to enhanced signal). Trust references (A/B with pro masters). Subtle boosts only. Check on multiple systems.

---

### Saturation (Mastering)
**Subtle harmonic distortion for warmth, glue, and analog character.**

**Purpose:**
- Add warmth (even harmonics)
- Analog "glue"
- Subtle thickness and density
- Vintage character
- "3D" quality

**Types:**

**Tape Saturation:**
- Even harmonics
- Gentle compression
- High-frequency roll-off
- Warm, full, smooth
- Universal Studer A800

**Tube Saturation:**
- Even harmonics (2nd, 4th)
- Warm, thick
- Musical compression
- Vintage color
- Manley Variable Mu

**Console Saturation:**
- Mix of harmonics
- Subtle coloration
- "Board" sound
- SSL, Neve, API character

**Transformer Saturation:**
- Primarily even harmonics
- Iron core character
- Low-frequency thickness
- Neve, API transformers

**Amount:**
- Very subtle in mastering
- 1-3dB of drive typical
- Barely audible harmonics
- Accumulates with other processing

**Controls:**

**Drive/Input:**
- How hard into saturation circuit
- More drive = more harmonics
- Find sweet spot by ear

**Output:**
- Compensate for level increase
- Match bypassed level for comparison

**Mix/Blend:**
- Parallel saturation option
- Blend saturated with clean
- Preserves dynamics while adding character

**Famous Mastering Saturators:**
- UAD Studer A800 (tape, $299)
- Slate VTM (tape, $149)
- Soundtoys Decapitator (analog, $199)
- FabFilter Saturn 2 (multiband, $139)
- Plugin Alliance Black Box (analog, $199)

**Professional Practice:** Subtle saturation throughout chain adds up. Use sparingly. Check that it improves mix (A/B). Parallel processing preserves dynamics.

---

### Stereo Enhancement (Mastering)
**Adjusting stereo width and imaging - use carefully.**

**Techniques:**

**M/S EQ:**
- Different EQ on mid vs sides
- Most powerful width tool
- Precise control

**M/S Processing:**
- **Boost sides 8-15kHz (+1-3dB):** Wider, more spacious highs
- **Cut sides <150Hz (HPF):** Mono bass, tight and focused
- **Boost mid 3-5kHz (+1dB):** Center presence
- Result: Focused center, wide highs, tight lows

**Stereo Widening:**
- Plugins analyze and enhance width
- Various algorithms (Haas, phase, MS)
- Can cause phase issues if excessive
- Check mono compatibility

**When to Use:**
- Mix lacks width (sounds narrow)
- Genre expectations (EDM, pop = wide)
- Low end not focused
- Professional sheen

**When NOT to Use:**
- Mix already has good width
- Acoustic/jazz (natural width better)
- Would cause phase problems
- Mono sources (can't create width from nothing)

**Mono Compatibility:**
- Always check mono (utility plugin or mono speaker)
- Phase meter (should stay positive)
- Elements shouldn't disappear in mono
- Correlation meter (>+0.5 minimum)

**Tools:**
- iZotope Ozone Imager (excellent, free)
- Brainworx bx_digital V3 (M/S, $199)
- Waves S1 Stereo Imager ($149)
- FabFilter Pro-Q 3 (M/S mode, $179)

**Professional Practice:** Subtle width enhancement only. Mono bass always (HPF sides at 100-200Hz). Check mono compatibility religiously. Less is more.

---

### Limiting (Mastering)
**Final stage - loudness maximization and absolute peak control.**

**Purpose:**
- Maximize loudness (competitive level)
- Set absolute ceiling (prevent clipping)
- Achieve target LUFS
- True peak control

**Critical Settings:**

**Ceiling:**
- **-1.0 dBTP:** Universal safe target
- **-0.3 dBTP:** Aggressive but usually safe
- **-0.5 dBTP:** Middle ground
- True peak, not sample peak

**Threshold:**
- Lower threshold = more limiting = louder output
- Adjust to achieve target LUFS (-14 typical)
- Monitor gain reduction meter

**Release:**
- **Auto:** Best option (adapts to material)
- **Fast (10-50ms):** Tight, controlled, can pump
- **Medium (50-150ms):** Balanced
- **Slow (150-500ms):** Smooth, transparent

**Lookahead:**
- 3-5ms typical
- Allows limiter to "see" peaks coming
- Smoother limiting, no overshoot
- Essential for transparent limiting

**Target LUFS:**
- **-14 LUFS:** Streaming standard
- **-16 LUFS:** Apple Music preferred
- **-10 to -12 LUFS:** CD (can be louder)
- **-8 LUFS:** Very loud (quality suffers)

**Gain Reduction Amounts:**
- Light: 3-5dB GR (dynamic, transparent)
- Moderate: 6-8dB GR (competitive, good balance)
- Heavy: 10-15dB GR (very loud, dynamics sacrificed)
- Extreme: >15dB GR (loudness war, fatiguing)

**Limiter Types:**

**Transparent:**
- FabFilter Pro-L 2 (industry standard)
- DMG Limitless (modern, clean)
- Preserves transients
- Minimal distortion

**Character:**
- Waves L2/L3 (classic color)
- Izotope Ozone Maximizer (intelligent)
- Can add pleasing distortion
- More aggressive

**Multiband:**
- iZotope Ozone Maximizer
- Frequency-specific limiting
- More control, more complex
- Can sound unnatural if overdone

**Famous Mastering Limiters:**
- FabFilter Pro-L 2 ($199)
- iZotope Ozone Maximizer ($249 in suite)
- Waves L2/L3 Ultramaximizer ($179)
- DMG Limitless ($199)
- Sonnox Oxford Limiter ($225)
- PSP Xenon ($149)

**Professional Practice:** Target -14 LUFS integrated, -1.0 dBTP ceiling. Use auto release. Enable true peak limiting. Don't chase maximum loudness. Preserve dynamics.

---

## 4. Mastering Techniques

### Mastering for Vinyl
**Special considerations for vinyl record cutting and playback.**

**Vinyl Limitations:**
- Low-frequency stereo width causes groove problems
- Excessive sibilance causes distortion
- Very loud cuts reduce playing time
- Physical medium constraints

**Vinyl Mastering Requirements:**

**Mono Low End:**
- Bass <100Hz must be mono
- Stereo bass causes stylus jumping
- Use M/S EQ: HPF sides at 100-150Hz
- Critical for vinyl cutting

**De-essing:**
- Sibilance (5-8kHz) causes distortion on vinyl
- More critical than digital
- Use de-esser or multiband compression
- Target 3-6dB reduction on sibilance

**Loudness Limits:**
- Can't be as loud as digital
- Excessive level = distortion, reduced playing time
- Dynamics preserved (benefit!)
- Typically -12 to -16 LUFS

**High-Frequency Roll-off:**
- Gentle high-shelf cut above 15kHz (-1 to -2dB)
- Reduces surface noise
- Smoother playback

**Playing Time:**
- Longer side = quieter cutting
- Ideal: <22 minutes per side (12" LP)
- Maximum: ~28 minutes (quality suffers)
- Communicate with cutting engineer

**Test Pressing:**
- Always get test pressing
- Check for distortion, skips, quality
- Approve before full run

**Professional Practice:** Work with experienced cutting engineer. Mono bass essential. De-ess more than digital. Accept lower loudness. Test pressing critical.

---

### Stem Mastering
**Mastering from grouped stems instead of stereo mix - more flexibility.**

**What Are Stems:**
- Grouped mix elements
- Typical: Drums, Bass, Vocals, Instruments, Effects
- 5-8 stems common
- More control than stereo, less than full mix

**Advantages:**
- Independent processing per stem group
- Fix balance issues (vocals too quiet)
- Enhance specific elements (add vocal presence)
- More options than stereo mastering

**Disadvantages:**
- More complex (longer process)
- More expensive (mastering engineer time)
- Can lead to over-processing (more options)
- Defeats point of trusting mix

**When to Use:**
- Mix has balance issues (can't be fixed in mix)
- Need maximum flexibility
- Artist requests (wants control)
- Remix versions (easier to create)

**Typical Stem Groups:**
- Drums (all percussion together)
- Bass (bass instruments)
- Vocals (lead and backgrounds)
- Instruments (guitars, keys, etc.)
- Effects (reverbs, delays)

**Professional Practice:** Stereo mastering preferred (trust mixer). Stem mastering when balance needs adjustment. Keep stem count low (5-8). Export at same level/processing as final mix.

---

*[Content continues in Part 3 with Audio Editing Complete]*

