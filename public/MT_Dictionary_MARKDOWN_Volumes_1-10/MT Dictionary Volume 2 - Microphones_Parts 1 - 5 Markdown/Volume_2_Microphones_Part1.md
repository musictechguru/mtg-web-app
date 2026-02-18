# Music Tech Dictionary
## Volume 2: Microphones Complete - FULL COMPREHENSIVE EDITION
### Part 1 of 5: Gain/Signal Path & Microphone Types

---

# PART 1: MICROPHONE FUNDAMENTALS

## 1. Gain and Signal Path

### Microphone Level
The electrical signal output directly from a microphone - the weakest signal in the entire audio chain.

**Signal Strength:** Typically -60dBu to -40dBu (extremely weak, measured in millivolts).

**Why So Weak:**
- Sound pressure waves move microphone diaphragm
- Creates very small electrical voltage (millivolts)
- Acoustic to electrical transduction inherently produces tiny signal
- Requires significant amplification to be usable

**Variation by Microphone Type:**
- **Dynamic microphones:** -54 to -60dBV/Pa (less sensitive, need more gain)
- **Condenser microphones:** -34 to -42dBV/Pa (more sensitive, need less gain)
- **Ribbon microphones:** -54 to -60dBV/Pa or lower (least sensitive, need most gain)

**Measured in:** dBu (voltage relative to 0.775V) or dBV (voltage relative to 1V).

**Professional Understanding:** This is the most critical point in signal chain. Any noise introduced here gets amplified by everything downstream. Quality preamp essential for clean signal. Proper gain staging begins at this first stage.

**Comparison:** Approximately 1000 times weaker than line level. Must be brought up to line level (+4dBu professional standard) through preamp.

---

### Preamp Gain
Amount of amplification applied to microphone signal by preamplifier.

**Gain Range:** Typically 0dB to 70dB available on professional preamps.

**Typical Gain Requirements by Source:**
- **Dynamic microphones on loud sources:** 30-45dB (guitar amp, snare drum)
- **Dynamic microphones on quiet sources:** 45-60dB (soft vocals, quiet acoustic instruments)
- **Condenser microphones on loud sources:** 15-30dB (close-miked vocals, acoustic guitar)
- **Condenser microphones on quiet sources:** 30-45dB (distant acoustic sources, classical)
- **Ribbon microphones:** 50-70dB (very low output, needs excellent preamp)

**Goal:** Bring microphone-level signal to line level (approximately +4dBu or -18dBFS digital).

**Controls:** Usually single knob labeled "Gain," "Trim," or "Input." Some preamps have stepped controls (detented positions) for recall.

**Quality Matters:**
- **Low noise floor:** Critical at high gain settings
- **Wide frequency response:** 20Hz-20kHz ideally
- **Low distortion:** <0.01% THD for clean preamps
- **High headroom:** Prevents overload on loud transients
- **Character:** Clean/transparent vs colored/warm (Neve, API)

**Famous Preamps:**
- **Neve 1073:** Warm British sound, Class A, transformer-coupled ($3,000-5,000)
- **API 512c:** Punchy American sound, discrete op-amp ($1,500-2,000)
- **Universal Audio 610:** Tube warmth, smooth highs ($1,800-2,200)
- **Grace M101:** Ultra-clean, transparent reference ($1,500)
- **SSL VHD:** Versatile, clean to colored modes ($1,200)

**Professional Practice:** Set gain while performer plays loudest part. Watch meter for peaks around -12dB to -6dBFS. Leave 6dB headroom for unexpected peaks.

---

### Line Level
Standard operating level for professional audio equipment interconnections.

**Professional Standard:** +4dBu (1.228V RMS)
**Consumer Standard:** -10dBV (0.316V RMS)

**Approximately 1000 times stronger than microphone level** - much more robust signal.

**Achieved After:** Microphone preamp amplification (mic level → line level).

**Used For:**
- Equipment interconnections (synth to interface, outboard gear)
- Mixing console signal flow
- Effects sends and returns
- DAW inputs/outputs
- Patch bay connections

**Output Sources:**
- Preamps (after amplifying mic signal)
- Mixers (summed/processed signals)
- Synthesizers, samplers, drum machines
- Effects processors (reverb, delay units)
- Digital converters (D/A output)
- CD/media players

**Why Important:** Most audio processing equipment expects line-level input. Too low = noise, too high = clipping. Plugins in DAW designed for line-level signals.

**Nominal Level:** Allows adequate headroom for signal peaks while maintaining good signal-to-noise ratio.

**Professional Practice:** Understand difference between mic and line level. Never connect line-level output directly to mic input (will overload/clip). Use DI box or pad when necessary.

---

### Pad (Attenuation)
Switch that reduces input signal level by fixed amount before preamp gain stage.

**Typical Attenuation:** -10dB or -20dB (halves or quarters the signal)

**Location:**
- On microphone itself (switchable pad on mic body)
- On preamp/interface (pad button per channel)
- Sometimes both available

**When to Use:**
- **Very loud sources:** Close-miked kick drum, snare drum, guitar/bass amps at high volume
- **Condenser mics on loud sources:** Prevents capsule overload
- **High-output microphones:** Some mics produce stronger signal
- **Brass instruments:** Trumpet, trombone close-miked
- **Loud vocals:** Screaming, aggressive performances

**How It Works:** Reduces signal before it reaches preamp circuitry, preventing overload of preamp input stage.

**Example Scenario:** Condenser microphone on kick drum. Full signal might overload preamp. Engage -20dB pad, then increase preamp gain to compensate. Result: clean signal without distortion.

**Alternative Solutions:**
- Move microphone farther from source (inverse square law)
- Use less sensitive microphone (dynamic instead of condenser)
- Reduce sound source volume (if possible)

**Professional Practice:** Use pad when seeing preamp overload (distortion) even with gain at minimum. Not substitute for proper mic placement, but essential tool for very loud sources.

---

### Phantom Power (+48V)
DC voltage supplied through microphone cable to power condenser microphones.

**Standard Voltage:** 48 volts DC (can range 12-48V, but 48V is universal standard)

**Delivery Method:**
- Sent through XLR pins 2 and 3 (positive voltage)
- Returns via pin 1 (ground/shield)
- Balanced delivery (equal voltage on both signal pins)
- Doesn't affect audio signal

**Powers:**
- **All condenser microphones** (unless battery-powered)
- **Active DI boxes** (some models)
- **Active ribbon microphones** (modern designs with internal electronics)

**Safe For:**
- **Dynamic microphones:** Completely ignore phantom power (balanced design rejects it)
- **Passive ribbon microphones (modern):** Most modern ribbons are phantom-safe

**Dangerous For:**
- **Vintage ribbon microphones:** Can damage delicate ribbon element (permanent damage)
- **Some unbalanced equipment:** If incorrectly wired

**Toggle Control:**
- Usually single switch for 2-8 channels (not always individual)
- Some interfaces: individual +48V per channel
- Professional consoles: typically per channel or per group

**Indicator:** Usually red LED when engaged

**Best Practices:**
- **Turn on for condensers:** Required for operation (no phantom power = no signal)
- **Turn off when not needed:** Saves power, prevents accidental damage
- **Check before connecting ribbons:** Vintage ribbons especially vulnerable
- **Mute channel when toggling:** Prevents loud pop in monitors
- **Wait 10 seconds after engaging:** Allows voltage to stabilize

**Troubleshooting:**
- Condenser mic not working? Check phantom power is on
- Condenser sounds weak? Phantom power may not be delivering full 48V (cheap interface)
- Popping sounds when connecting? Mute channel first

**Phantom Power Standards:**
- P48: 48V ±4V, 10mA max current (international standard IEC 61938)
- P24: 24V (less common, some equipment)
- P12: 12V (rare, vintage equipment)

---

### Impedance Matching
Relationship between source (microphone) output impedance and load (preamp) input impedance.

**Microphone Output Impedance:**
- Low impedance: 50-600Ω (professional standard)
- High impedance: >10,000Ω (vintage mics, guitar pickups)

**Preamp Input Impedance:**
- Professional: 1,000-10,000Ω (typically 1.5kΩ to 2.5kΩ)
- High-Z inputs: >1MΩ (for instruments)

**Matching Rule:** Load impedance should be **5-10 times higher** than source impedance.

**Example:** 200Ω microphone into 2,000Ω preamp input = 10:1 ratio (ideal)

**Why It Matters:**
- **Properly matched:** Maximum power transfer, flat frequency response, low noise, optimal damping
- **Mismatched (load too low):** Loss of level, frequency response changes, increased distortion
- **Mismatched (load too high):** Generally acceptable, minimal effect

**Low Impedance Advantages:**
- Can use long cables (100+ feet) without signal loss
- Better rejection of electromagnetic interference
- Industry standard for professional audio
- Balanced connections (XLR)

**High Impedance Issues:**
- Limited cable length (<20 feet before significant loss)
- Susceptible to noise and interference
- Frequency response degrades with long cables
- Requires direct connection or transformer

**Modern Practice:** All professional microphones are low impedance. All professional preamps have appropriate input impedance. Matching is automatic. Only concern when using vintage equipment or adapting instruments.

**Transformers:** Can match impedances between incompatible devices. Used in some vintage equipment and DI boxes.

---

### Gain Structure
Optimizing signal levels throughout complete recording chain.

**Complete Chain:** Microphone → Preamp → Converter → DAW → Processing → Output

**Each Stage Affects:**
- Noise floor (cumulative)
- Headroom (available level before clipping)
- Signal-to-noise ratio
- Distortion characteristics

**Goal:** Maximize signal-to-noise ratio while preventing clipping at any stage.

**Proper Gain Structure Process:**

**Stage 1 - Microphone Preamp (most critical):**
- Set gain while performer plays loudest part
- Target: Peaks around -12dB to -6dBFS on interface meter
- Leave 6dB headroom for unexpected peaks
- If clipping: reduce preamp gain (not interface level)

**Stage 2 - Interface Input:**
- Should receive healthy level from preamp
- Most interfaces: unity gain after preamp (no additional gain needed)
- Monitor input level on interface hardware meters

**Stage 3 - DAW Track Input:**
- Confirm proper level on track meter
- Peaks: -12dB to -6dBFS
- Average: around -18dBFS
- Leave headroom for processing

**Stage 4 - Plugin Processing:**
- Plugins expect appropriate input levels
- Some plugins: work better with specific input levels
- Watch output levels after processing
- Maintain headroom

**Stage 5 - Master Bus:**
- Sum of all tracks
- Before mastering: peaks around -6dB to -3dBFS
- Maintain headroom for mastering processing

**Common Mistakes:**
- Recording too hot (clipping, no headroom)
- Recording too quiet (noise becomes audible)
- Adjusting wrong stage (interface gain vs preamp gain)
- Ignoring cumulative gain through processing

**Professional Standard:** Conservative levels throughout. Can always add more gain, cannot remove clipping. Headroom is insurance against disasters.

**Digital vs Analog:** Digital has hard ceiling (0dBFS). Analog has softer clipping. Digital requires more conservative approach.

---

## 2. Microphone Types & Characteristics

### Dynamic Microphone (Moving Coil)

**Technology/Operating Principle:**
Electromagnetic induction using moving coil attached to diaphragm. Sound pressure waves move diaphragm → coil moves within magnetic field → generates voltage through electromagnetic induction. Simple, passive design with no active electronics.

**Construction:**
- Diaphragm (very thin plastic/Mylar film)
- Voice coil (fine wire coiled around former)
- Magnet assembly (permanent magnet creating field)
- Case/housing (protects internals)

**Key Characteristics:**
- **Rugged/Durable:** Can handle rough treatment, drops, moisture
- **High SPL handling:** 140dB+ typical (can handle extremely loud sources)
- **No power required:** Works passively (no batteries, no phantom power)
- **Less sensitive:** Than condensers (captures less detail but more focused)
- **Limited frequency response:** Typically 50Hz-15kHz (adequate for most sources)
- **Presence peak:** Usually 3-5kHz for vocal clarity and "bite"
- **High maximum SPL:** Won't distort even with very loud sources

**Frequency Response:** 
- Low end: 50-80Hz roll-off (reduces handling noise, rumble)
- Midrange: relatively flat 200Hz-5kHz
- Presence peak: 3-5kHz boost (adds clarity, intelligibility)
- High end: gradual roll-off above 10kHz

**Impedance:** Low (150-600Ω) - professional standard

**Proximity Effect:** Present (bass boost when close, typically 6-12dB at 100Hz when <6 inches)

**Applications:**
- **Live vocals:** Feedback resistant, rugged (SM58 standard)
- **Drums:** High SPL handling (snare, toms, kick - SM57, Beta 52A)
- **Guitar amplifiers:** Can handle volume (SM57 industry standard)
- **Bass amplifiers:** Low-end reproduction
- **High SPL sources:** Brass, loud vocals, percussion
- **Budget recording:** Affordable, versatile
- **Environments:** Where ruggedness matters (touring, clubs)

**Famous Examples:**
- **Shure SM57:** Industry standard instrument mic, $99, found in every studio
- **Shure SM58:** Most popular live vocal mic, $99, nearly indestructible
- **Sennheiser MD421:** Versatile large-diaphragm dynamic, excellent on toms/guitar, $379
- **Electro-Voice RE20:** Broadcast standard, kick drum favorite, reduced proximity effect, $449
- **Shure Beta 57A/58A:** Higher output versions, tighter pattern, $159

**Typical Specifications:**
- Sensitivity: -54dBV/Pa (less sensitive than condenser)
- Max SPL: 140-150dB (extremely loud before distortion)
- Frequency Response: 50Hz-15kHz (±3dB)
- Impedance: 150-300Ω (low, professional)
- Self-noise: N/A (passive, no self-noise)

**Advantages:**
- Extremely rugged and reliable
- No power needed
- High SPL handling
- Less sensitive to room acoustics
- Affordable
- Feedback resistant (live sound)

**Disadvantages:**
- Less detailed than condensers
- Limited high-frequency extension
- Less sensitive (needs more gain)
- Heavier (more mass to move)

**Professional Uses:** First choice for live sound. Studio use for drums, guitar amps, and sources where robustness and high SPL handling needed. SM57 on snare drum is industry standard.

---

### Condenser Microphone (Large Diaphragm)

**Technology/Operating Principle:**
Capacitor-based transduction. Two plates form capacitor: front plate (diaphragm - movable) and back plate (fixed). Fixed electrical charge applied. Sound pressure moves diaphragm → changes distance between plates → changes capacitance → creates voltage change proportional to sound. Requires active electronics to maintain charge and buffer output signal.

**Construction:**
- Capsule (diaphragm + backplate forming capacitor)
- Polarization circuit (maintains charge - externally or permanently polarized)
- Impedance converter (FET or tube - buffers signal)
- Output transformer (some models - adds character)
- Power required (phantom power or battery)

**Power Requirements:**
- Phantom power: +48V most common (international standard)
- Some models: battery powered (9V internal battery)
- Permanently polarized: still need power for impedance converter

**Key Characteristics:**
- **Very sensitive:** Captures fine detail and nuance
- **Extended frequency response:** 20Hz-20kHz+ (full audible spectrum)
- **Wide dynamic range:** Excellent for studio recording (quiet to loud)
- **Requires phantom power:** +48V standard
- **More fragile:** Sensitive to humidity, shock, vibration
- **Lower max SPL:** 120-135dB typical (140dB with pad engaged)

**Large Diaphragm Specifics:**
- **Diaphragm size:** ≥1 inch (25mm) diameter (typically 1" or 34mm)
- **Character:** Warmer, slightly colored sound (pleasant distortion)
- **Proximity effect:** Present and usable (bass boost when close)
- **Low-end response:** Extended and full
- **Self-noise:** 7-20dB SPL-A typical (slightly higher than small diaphragm)
- **Polar patterns:** Often switchable (cardioid, omni, figure-8)

**Frequency Response:**
- Extended low end: 20Hz (some models down to 10Hz)
- Flat midrange: accurate reproduction
- Extended highs: 20kHz+ (air and detail)
- Presence peak: some models have slight boost 5-10kHz

**Applications:**
- **Studio vocals:** Primary choice (warmth, detail, presence)
- **Voiceover/broadcast:** Clarity and intimacy
- **Acoustic instruments:** Guitar, piano, strings (captures detail)
- **Overhead cymbals:** Smooth, detailed reproduction
- **Room microphones:** Ambient capture in good-sounding rooms
- **Any source:** Requiring detail, warmth, and professional quality

**Famous Examples:**
- **Neumann U87:** Industry standard, versatile, $3,200 (most recorded vocal mic)
- **AKG C414:** Versatile, 9 polar patterns, $1,099 (studio workhorse)
- **Audio-Technica AT4050:** Affordable quality, multi-pattern, $699
- **Rode NT1:** Extremely quiet (4.5dB self-noise), $229 (incredible value)
- **Sony C800G:** High-end vocal mic, tube, $10,000+ (Mariah Carey, Michael Jackson)
- **Neumann U47:** Vintage legend, tube, $8,000+ used (Beatles, Sinatra)
- **Telefunken U47:** Modern reissue, $9,000 (vintage sound, modern reliability)

**Typical Specifications:**
- Sensitivity: -36dBV/Pa (much more sensitive than dynamic)
- Max SPL: 120-135dB without pad, 140-145dB with pad
- Frequency Response: 20Hz-20kHz (±2dB)
- Impedance: 200Ω (low, professional)
- Self-noise: 7-20dB SPL-A (quiet to very quiet)
- Requires: +48V phantom power

**Advantages:**
- Extremely detailed and accurate
- Extended frequency response
- Captures subtle nuances
- Professional sound quality
- Versatile (vocals, instruments, ambience)

**Disadvantages:**
- Requires phantom power
- More fragile (sensitive electronics)
- Lower max SPL (without pad)
- More expensive
- Sensitive to humidity and temperature
- Can capture too much detail (room noise)

**Professional Uses:** Studio standard for vocals. Recording acoustic instruments. Any application where detail and quality paramount. Not typically for live sound (feedback prone, fragile).

---

### Condenser Microphone (Small Diaphragm)

**Technology/Operating Principle:**
Same capacitor principle as large diaphragm condenser. Smaller diaphragm (less mass) allows faster response to transients.

**Diaphragm Size:** <1 inch (typically 12-18mm diameter) - sometimes called "pencil condensers"

**Key Characteristics:**
- **More accurate:** Flatter frequency response than large diaphragm
- **Extended high frequency:** Excellent high-frequency extension to 20kHz+
- **Faster transient response:** Less mass = quicker response (better for percussive sounds)
- **Lower self-noise:** Typically quieter than large diaphragm (5-15dB SPL-A)
- **Less proximity effect:** More consistent tone off-axis and at varying distances
- **Tighter polar patterns:** More directional, better rejection

**Construction:**
- Smaller capsule (6mm-18mm diameter)
- Usually fixed pattern (cardioid most common)
- Matched pairs common (stereo recording)
- Often transformerless design (lower noise)
- Pencil form factor typical

**Frequency Response:**
- Very flat: 20Hz-20kHz (minimal coloration)
- Extended highs: Some models to 25kHz+
- No presence peaks: accuracy over character
- Slight low-end roll-off: natural in small diaphragm design

**Applications:**
- **Acoustic instruments:** Guitar, mandolin, violin, banjo (accuracy)
- **Cymbals and hi-hats:** Detailed, clear, accurate reproduction
- **Piano:** Stereo pair captures full instrument (clarity and detail)
- **String sections:** Accurate ensemble capture
- **Percussion:** Fast transient response
- **Overhead drums:** Detailed cymbal reproduction
- **Classical/orchestral:** Accuracy and precision required
- **Any source:** Where accuracy more important than character

**Famous Examples:**
- **Neumann KM184:** Industry reference standard, $699 each (professional studios)
- **AKG C451B:** Modern version of legendary C451, $449 (discontinued original highly sought)
- **Shure SM81:** Affordable studio standard, $349 (extremely versatile)
- **Rode NT5:** Excellent value matched pair, $429/pair (home studios)
- **DPA 4011:** Ultra-accurate, expensive, $1,150 (classical recording)
- **Sennheiser e914:** Live and studio use, $599 (rugged design)
- **Schoeps CMC6/MK4:** Ultimate accuracy, modular, $1,400+ (classical, film)

**Typical Specifications:**
- Sensitivity: -36dBV/Pa to -40dBV/Pa (similar to large diaphragm)
- Max SPL: 130-140dB without pad, 145-150dB with pad
- Frequency Response: 20Hz-20kHz (flat ±2dB)
- Impedance: 50-200Ω (very low)
- Self-noise: 5-15dB SPL-A (very quiet)
- Polar pattern: Cardioid fixed (some switchable models)

**Advantages:**
- Most accurate frequency response
- Fastest transient response
- Extended high frequency
- Lowest self-noise
- Consistent off-axis response
- Excellent for stereo techniques

**Disadvantages:**
- Less character/warmth than large diaphragm
- Can sound clinical (too accurate)
- More expensive than dynamics
- Requires phantom power
- Fragile like all condensers

**Professional Uses:** Classical recording standard. Drum overheads. Acoustic instruments. Any application where accuracy and speed crucial. Matched pairs for stereo recording (X/Y, ORTF, spaced pair).

---

*[Content continues in Part 2 with Ribbon Microphones and additional microphone types]*

