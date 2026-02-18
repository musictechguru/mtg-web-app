# Music Tech Dictionary
## Volume 8: Mastering & Audio Editing Complete - FULL COMPREHENSIVE EDITION
### Part 1 of 3: Mastering Fundamentals & Loudness Standards

---

# PART 1: MASTERING FUNDAMENTALS

## 1. Mastering Concepts

### Mastering Definition
**Final creative and technical process preparing mixed audio for distribution across all playback systems.**

**Purpose:**
- **Optimize:** Mix for all playback systems (phones to clubs)
- **Enhance:** Subtle improvements (clarity, depth, cohesion)
- **Balance:** Tonal balance and frequency spectrum
- **Loudness:** Achieve competitive levels (genre-appropriate)
- **Consistency:** Make tracks sound cohesive (album context)
- **Technical:** Meet distribution specs (streaming, CD, vinyl)
- **Translation:** Ensure mix works everywhere

**Mastering vs Mixing:**
- **Mixing:** Balancing individual tracks, building the mix
- **Mastering:** Enhancing completed stereo mix, final polish
- **Mixing:** Creative decisions, arrangement, effects
- **Mastering:** Subtle refinement, technical preparation
- **Mixing:** Works with multitracks
- **Mastering:** Works with stereo file

**What Mastering Does:**
1. **EQ:** Broad tonal shaping (subtle, musical)
2. **Compression:** Glue, control dynamics (1-3dB maximum)
3. **Limiting:** Loudness maximization, peak control
4. **Stereo Enhancement:** Width, imaging refinement
5. **Sequencing:** Track order, spacing, fades
6. **Technical Delivery:** File formats, metadata, ISRC codes

**What Mastering Doesn't Do:**
- Fix bad mixes (can only enhance good mix)
- Change arrangement or balance
- Re-mix or rebuild
- Add missing elements
- Work miracles (garbage in = garbage out)

**Professional Mastering:**
- Fresh ears and perspective
- Specialized room (acoustically treated)
- High-end monitoring (revealing speakers)
- Experience and references
- Objective viewpoint

---

### Headroom (Mastering Context)
**Available level space before 0dBFS in mix sent to mastering.**

**Why Mastering Needs Headroom:**
- Processing adds level (EQ, compression, saturation)
- Prevents clipping during mastering
- Allows mastering engineer to work
- Safety margin for peaks

**Target Headroom:**
- **-6dBFS peaks:** Ideal (standard professional)
- **-3dBFS peaks:** Minimum acceptable
- **-10dBFS peaks:** Conservative (extra safe)
- **0dBFS peaks:** No headroom (problematic)

**Peak vs RMS:**
- Measure peaks: Highest transient level
- Not RMS: Average level doesn't matter
- Leave headroom for peaks specifically

**How to Check:**
1. Load mix in DAW
2. Check master fader meter
3. Find loudest peak in song
4. Should be -6dBFS or lower

**If Mix Too Loud:**
- Lower master fader before export
- Re-export with more headroom
- Don't use limiter on mix (leave for mastering)

**Common Mistakes:**
- Mixing to 0dBFS (no headroom)
- Using limiter on mix (mastering engineer can't work)
- Not checking peaks before export
- Assuming louder is better (it's not)

**Professional Practice:** Always export mixes at -6dBFS peaks for mastering. Remove all limiters from master bus. Let mastering engineer handle final loudness.

---

### Reference Tracks
**Professional masters used as comparison for tonal balance, loudness, and quality.**

**Purpose:**
- Tonal balance reference (frequency spectrum)
- Loudness target (competitive level)
- Quality benchmark (professional standard)
- Genre appropriate sound
- Translation check

**Choosing References:**
- **Same genre:** Match style and expectations
- **Recent releases:** Current production standards
- **Professional masters:** High-quality, well-mastered
- **Multiple references:** 3-5 tracks (not just one)
- **Love the sound:** Aspire to similar quality

**How to Use:**

**A/B Comparison:**
1. Load reference in DAW
2. Match levels (very important!)
3. Compare frequency balance
4. Note differences (more bass? brighter? wider?)
5. Make subtle adjustments toward reference

**Level Matching Critical:**
- Louder always sounds "better" (Fletcher-Munson)
- Must match perceived loudness
- Use LUFS meter to match (±1 LU)
- Or adjust by ear (quick A/B)

**What to Compare:**
- **Low end:** How much bass? How tight?
- **Midrange:** Clarity, presence, body
- **High end:** Air, sparkle, brightness
- **Stereo width:** How wide? Mono lows?
- **Loudness:** How loud? Dynamic range?
- **Overall tone:** Warm? Bright? Balanced?

**Don't Copy Blindly:**
- Use as guide, not gospel
- Your mix may need different approach
- References show possibilities, not rules
- Trust your ears and taste

**Professional Practice:** Always use references when mastering. Match levels precisely. Compare frequently throughout process. Aim for similar quality, not identical sound.

---

## 2. Loudness Standards & Measurement

### LUFS (Loudness Units Full Scale)
**Modern loudness measurement standard accounting for human perception.**

**What is LUFS:**
- Loudness Units relative to Full Scale
- Psychoacoustic weighting (matches human hearing)
- Industry standard (replaced RMS, peak)
- Streaming platform standard
- Broadcasting standard

**Why LUFS:**
- Better than peak (doesn't show loudness)
- Better than RMS (simple average)
- Matches human perception
- Standardizes across platforms
- Ends loudness war

**LUFS Types:**

**Integrated LUFS:**
- Average loudness of entire track
- Most important measurement
- Used for streaming targets
- -14 LUFS = Spotify target

**Short-Term LUFS:**
- Average over 3 seconds
- Shows loudness changes
- Useful for dynamics

**Momentary LUFS:**
- Average over 400ms
- Instant loudness
- Real-time monitoring

**LU (Loudness Units):**
- Relative measurement
- 1 LU = 1 dB difference
- Used for dynamic range

**Loudness Range (LRA):**
- Dynamic range measurement
- Variation between loud and quiet
- High LRA = dynamic
- Low LRA = compressed

---

### Streaming Loudness Targets
**Platform-specific integrated LUFS targets for music streaming services.**

**Major Platform Targets:**

**Spotify:**
- Target: -14 LUFS integrated
- Normalization: ON by default
- Louder tracks: Turned down
- Quieter tracks: NOT turned up (limited to -14 LUFS)
- Recommendation: Master to -14 LUFS, -1dBTP

**Apple Music (iTunes):**
- Target: -16 LUFS integrated (Sound Check)
- Normalization: ON by default
- Recommendation: -16 LUFS for Apple, or -14 LUFS (works for both)

**YouTube:**
- Target: -13 to -14 LUFS integrated
- Normalization: ON always
- Recommendation: -14 LUFS works well

**Amazon Music:**
- Target: -14 LUFS integrated (Amazon Music HD)
- -9 to -13 LUFS (standard)
- Recommendation: -14 LUFS safe

**Tidal:**
- Target: -14 LUFS integrated
- Normalization: Available
- Recommendation: -14 LUFS

**Deezer:**
- Target: -14 to -15 LUFS
- Recommendation: -14 LUFS

**Universal Mastering Target:**
- **-14 LUFS integrated** (works for all platforms)
- **-1.0 dBTP** (true peak ceiling)
- Optimized for streaming era
- Preserves dynamics
- Sounds great everywhere

**Why Not Master Louder:**
- Platforms turn down loud masters
- Reduces quality (volume automation artifacts)
- Wastes dynamic range
- No benefit (doesn't sound louder on platform)
- Can sound worse (over-compressed)

**Professional Practice:** Master to -14 LUFS integrated, -1.0 dBTP true peak. Forget loudness war. Preserve dynamics. Trust platform normalization.

---

### True Peak (dBTP)
**Peak level accounting for inter-sample peaks during D/A conversion.**

**What Are Inter-Sample Peaks (ISP):**
- Peaks between digital samples
- Created during analog reconstruction (D/A conversion)
- Can exceed 0dBFS digitally
- Cause analog clipping in converters
- Inaudible in digital, clip in analog

**Why True Peak Matters:**
- Streaming services require (Spotify, Apple, etc.)
- Prevents clipping during playback
- Ensures clean D/A conversion
- Broadcasting standard (EBU R128)
- Professional requirement

**Measurement:**
- Oversampling (4x or 8x typical)
- Measures peaks after reconstruction
- Shows what will exist in analog domain
- Measured in dBTP (True Peak)

**Target Levels:**
- **-1.0 dBTP:** Universal safe target (recommended)
- **-0.3 dBTP:** Aggressive but generally safe
- **-2.0 dBTP:** Conservative (broadcasting)
- **0.0 dBTP:** Risk of clipping (not recommended)

**Platform Requirements:**
- Spotify: -1.0 dBTP or lower
- Apple Music: -1.0 dBTP
- Loudness.info (mastering): -1.0 dBTP standard
- Broadcasting: -2.0 dBTP often required

**How to Achieve:**
- Use true peak limiter (not just peak)
- Set ceiling to -1.0 dBTP
- Most modern limiters include true peak
- Check with true peak meter

**Famous True Peak Limiters:**
- FabFilter Pro-L 2 (excellent, $199)
- iZotope Ozone Maximizer ($249 in Ozone)
- Waves L2/L3 (industry standard, $179)
- DMG Limitless ($199)

**Professional Practice:** Always use true peak limiting. Set ceiling to -1.0 dBTP. Check with true peak meter before delivery. Required for professional mastering.

---

### Dynamic Range (Mastering)
**Difference between loudest and quietest parts, crucial for musicality and quality.**

**Measurement:**
- Peak minus RMS (simplified)
- Loudness Range (LRA) in LUFS
- DR meter (TT Dynamic Range)
- Crest factor

**Dynamic Range by Genre:**

**High Dynamic Range (15-20+ dB):**
- Classical music (20-30 dB typical)
- Jazz (15-25 dB)
- Acoustic music
- Singer-songwriter
- Natural, dynamic

**Medium Dynamic Range (8-14 dB):**
- Rock (10-15 dB)
- Indie (10-14 dB)
- Alternative (9-13 dB)
- Balanced dynamics

**Low Dynamic Range (4-8 dB):**
- Pop (6-10 dB)
- EDM (4-8 dB)
- Hip-Hop (5-9 dB)
- Modern commercial
- Highly compressed

**Very Low Dynamic Range (<4 dB):**
- Over-compressed
- Loudness war casualties
- Fatiguing to listen
- Quality suffers

**Modern Trend:**
- Moving away from extreme compression
- Streaming normalization ends loudness war
- More dynamics = better sound
- Target: 8-12 dB for most modern music

**Checking Dynamic Range:**
- TT Dynamic Range Meter (free)
- LUFS meter (Loudness Range - LRA)
- Visual: Waveform shouldn't look like solid brick

**Professional Practice:** Preserve dynamics. Don't over-compress chasing loudness. 8-12 dB dynamic range for modern pop/rock. More for acoustic/classical. Check DR meter before delivery.

---

### Crest Factor
**Ratio between peak and RMS level, indicates dynamic range.**

**Formula:** Peak (dB) - RMS (dB) = Crest Factor (dB)

**High Crest Factor (15-20 dB):**
- Very dynamic material
- Large difference between peaks and average
- Classical, jazz, acoustic
- Natural, uncompressed
- Wide dynamic range

**Medium Crest Factor (8-14 dB):**
- Moderate dynamics
- Balanced compression
- Rock, indie, most modern music
- Professional mastering
- Musical and competitive

**Low Crest Factor (4-8 dB):**
- Heavily compressed
- Small difference between peaks and average
- Pop, EDM, commercial
- Loud but potentially fatiguing

**Very Low Crest Factor (<4 dB):**
- Over-compressed
- Brick-walled
- Loudness war
- Quality degraded
- Avoid

**What Crest Factor Shows:**
- Higher = more dynamic, less compressed
- Lower = more compressed, louder average
- Balance needed for modern music
- Genre-dependent appropriate level

**Professional Practice:** Aim for 8-12 dB crest factor for modern music. Higher for dynamic genres. Monitor during mastering to avoid over-compression.

---

### Dithering (Mastering)
**Adding very low-level noise when reducing bit depth to mask quantization distortion.**

**When to Dither:**
- **YES:** Reducing 24-bit to 16-bit (for CD)
- **YES:** Final export to lower bit depth
- **NO:** Staying at same bit depth (24-bit to 24-bit)
- **NO:** Multiple times (only once at final stage)
- **NO:** Before further processing

**Where to Apply:**
- **Final stage only:** Last plugin in chain
- **After limiting:** After all processing
- **Before export:** Right before file creation
- **Once only:** Multiple dithering adds noise

**Dither Types:**

**TPDF (Triangular Probability Density Function):**
- Standard, simple
- Flat frequency response
- 1 LSB of noise
- Safe, effective
- Use when unsure

**POW-R (Psychoacoustically Optimized Wordlength Reduction):**
- Shaped noise (pushed to less sensitive frequencies)
- Sounds quieter than TPDF
- More sophisticated
- Professional mastering standard
- POW-R 1, 2, or 3 (different curves)

**Noise Shaping:**
- Pushes dither noise above 10kHz
- Leverages hearing insensitivity
- Very effective for CD mastering
- Can sound cleaner than TPDF

**Amount:**
- Always 1 LSB (Least Significant Bit)
- About -90dBFS for 16-bit
- Barely audible even in silence
- Trade-off: tiny noise vs quantization distortion

**Professional Practice:**
- Dither ONCE at final 24→16 bit conversion
- Use POW-R or noise-shaped dither for mastering
- TPDF safe default
- Never dither intermediate files

---

### Sample Rate Conversion (SRC)
**Changing sample rate (e.g., 48kHz to 44.1kHz) requires resampling.**

**Common Conversions:**
- 48kHz → 44.1kHz (studio to CD)
- 96kHz → 44.1kHz or 48kHz (hi-res to distribution)
- 44.1kHz → 48kHz (CD to video)

**SRC Quality:**
- **Excellent:** Modern algorithms transparent
- **Good:** Proper resampling maintains quality
- **Poor:** Low-quality SRC damages audio
- **Critical:** Algorithm quality matters greatly

**When Needed:**
- Converting studio files (48/96kHz) to CD (44.1kHz)
- Matching video frame rate requirements
- Distribution to different formats

**Best Practices:**
- **Use high-quality SRC:** iZotope RX, r8brain, SoX
- **Avoid real-time:** Render/bounce for quality
- **Match at recording:** Record at target rate if possible
- **Limit conversions:** Each conversion degrades slightly

**Professional SRC Tools:**
- iZotope RX (excellent quality)
- r8brain (free, excellent)
- SoX (free, command-line, excellent)
- DAW built-in (usually good in modern DAWs)

**Professional Practice:** Avoid sample rate conversion when possible. Record at target rate. If conversion needed, use highest quality algorithm. Render offline, not real-time.

---

### Mastering Order/Sequencing
**Arranging tracks in final album order with appropriate spacing and transitions.**

**Track Order Considerations:**
- **Energy flow:** Build and release throughout album
- **Key relationships:** Complementary or contrasting keys
- **Tempo:** Smooth or jarring transitions
- **Mood:** Emotional journey through album
- **Singles placement:** Typically track 1, 3, or 5

**Track Spacing:**
- **Standard:** 2 seconds silence between tracks
- **Flowing:** 0-1 second (continuous feel)
- **Dramatic pause:** 3-5 seconds (build anticipation)
- **Crossfade:** Overlap tracks (DJ-style)
- **No gap:** Immediate transition (0 seconds)

**Fades:**
- **Fade out:** Gradual volume decrease to silence
- **Fade in:** Gradual volume increase from silence
- **Crossfade:** One track fades out while next fades in
- **Duration:** 1-10 seconds typical (musical, not abrupt)

**Album Flow:**
- Strong opener (capture attention)
- Build energy, then release
- Variety (fast/slow, loud/soft)
- Strategic single placement
- Memorable closer

**CD/Vinyl Considerations:**
- **CD:** 99 tracks maximum, track IDs
- **Vinyl:** Side A/B balance, running time limits
- **Streaming:** Track order still matters (albums)

**Professional Practice:** Sequence for energy flow and emotional arc. 2-second spacing default. Fade durations musical (not too long). Check entire album front-to-back.

---

*[Content continues in Part 2 with Mastering Processing Chain and Techniques]*

