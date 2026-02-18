# Music Tech Dictionary
## Volume 3: Synthesis Complete - FULL COMPREHENSIVE EDITION
### Part 1 of 4: Basic Components & Waveforms

---

# PART 1: SYNTHESIS FUNDAMENTALS

## 1. Basic Components

### Oscillator (VCO/DCO)
The sound source that generates waveforms - the heart of any synthesizer.

**VCO (Voltage Controlled Oscillator):**
- Analog circuitry generating continuous waveform
- Frequency controlled by input voltage
- Temperature sensitive (can drift out of tune)
- Warm, organic character
- Found in: vintage analog synths

**DCO (Digitally Controlled Oscillator):**
- Digital control of analog oscillator
- Stable tuning (doesn't drift)
- Retains analog sound
- Found in: 1980s analog synths (Roland Juno series)

**Digital Oscillator:**
- Completely digital waveform generation
- Perfect stability
- Can generate any waveform mathematically
- Found in: modern digital/virtual analog synths

**Key Parameters:**
- **Pitch/Frequency:** Musical note being played (A4 = 440Hz)
- **Octave:** Coarse tuning (doubling/halving frequency)
- **Fine Tune:** Small pitch adjustments (cents, 100 cents = 1 semitone)
- **Waveform:** Shape of wave (sine, saw, square, triangle, etc.)
- **Pulse Width:** Width of pulse wave (10%-90%, 50% = square)

**Multiple Oscillators:**
- Most synths: 2-3 oscillators per voice
- Detuning: Slight pitch differences create thickness
- Layering: Different waveforms combined
- Sync: One oscillator resets another (creates harmonic tones)

**Oscillator Modes:**
- **Free-running:** Continuous oscillation
- **Hard sync:** Oscillator 1 resets oscillator 2 at its frequency
- **Soft sync:** Partial reset, smoother
- **FM (Frequency Modulation):** One oscillator modulates another's frequency

**Famous Oscillator Designs:**
- Moog ladder oscillator: Warm, fat, slightly detuned
- Roland DCO: Stable, bright, precise
- Oberheim SEM: Rich, complex waveforms
- Sequential Circuits: Fat, analog warmth

**Professional Understanding:** The oscillator is the raw material. Everything else (filter, envelope) shapes this raw sound. Choice of waveform and oscillator count determines basic character.

---

### Filter (VCF/DCF)
Removes or emphasizes specific frequencies from oscillator output - shapes the tone.

**VCF (Voltage Controlled Filter):**
- Analog filter circuit
- Resonance can self-oscillate
- Character varies by design
- Can be "warm," "creamy," "aggressive"

**DCF (Digitally Controlled Filter):**
- Digital control of analog filter
- Stable, recallable settings
- Retains analog character

**Filter Types:**
- **Low-Pass (LP):** Removes highs, allows lows (most common)
- **High-Pass (HP):** Removes lows, allows highs
- **Band-Pass (BP):** Allows middle frequencies, removes highs and lows
- **Band-Reject/Notch:** Removes middle frequencies, allows highs and lows
- **Comb:** Multiple evenly-spaced notches (used for special effects)
- **Formant:** Multiple band-pass filters (creates vocal-like tones)

**Key Parameters:**
- **Cutoff Frequency:** Where filter starts working (20Hz-20kHz)
- **Resonance (Q or Emphasis):** Boost at cutoff frequency
- **Slope:** How steep the filtering (6dB, 12dB, 18dB, 24dB per octave)
- **Envelope Amount:** How much envelope affects cutoff
- **Keyboard Tracking:** Filter follows played note (higher note = higher cutoff)

**Filter Characteristics by Design:**

**Moog Ladder (24dB/octave):**
- Warm, fat, smooth
- Can self-oscillate (creates sine wave at full resonance)
- Found in: Minimoog, Moog Voyager
- Character: Bass-heavy, analog warmth

**Roland IR3109 (24dB/octave):**
- Bright, aggressive, squelchy
- Sharp resonance
- Found in: Jupiter-8, Juno series
- Character: Cutting, electronic

**Oberheim SEM (12dB/octave):**
- Smooth, musical
- Multiple modes (LP, HP, BP, Notch)
- Found in: Oberheim OB-X, OB-Xa
- Character: Versatile, organic

**Curtis/SSM (24dB/octave):**
- Clean, precise
- Found in: Prophet-5, many 80s synths
- Character: Professional, reliable

**Korg MS-20 (6dB and 12dB):**
- Aggressive, screaming
- Very high resonance possible
- Character: Raw, wild, unpredictable

**Self-Oscillation:**
- Filter resonates at maximum
- Creates pure sine wave at cutoff frequency
- Can be played as additional oscillator
- Useful for: bass tones, lead tones, special effects

**Professional Practice:** Filter is primary tone-shaping tool. Low-pass most common (removes harshness from bright waveforms like saw). Resonance adds character and emphasis. Envelope modulation creates movement over time.

---

### Amplifier (VCA/DCA)
Controls volume/amplitude of signal - shapes loudness over time.

**VCA (Voltage Controlled Amplifier):**
- Analog circuit controlling gain
- Voltage input controls output level
- Typically controlled by envelope generator

**DCA (Digitally Controlled Amplifier):**
- Digital control of gain
- Precise, recallable

**Function:**
- Gates signal on/off (when key pressed/released)
- Shapes volume envelope (ADSR)
- Can be modulated by LFO (tremolo effect)
- Final stage before output

**Control Sources:**
- **Envelope Generator:** Primary control (ADSR shapes volume)
- **LFO:** Creates tremolo/amplitude modulation
- **Velocity:** Key velocity affects final level
- **Aftertouch:** Pressure adds volume swell

**In Signal Chain:**
Oscillator → Filter → VCA → Output

**Why Needed:** Without VCA, sound would be continuous drone. VCA allows:
- Notes to start and stop
- Volume to change over time
- Dynamic expression
- Rhythmic effects

**Professional Understanding:** VCA is controlled by envelope, which determines how sound evolves over time (attack, sustain, release). This is what makes synth sound musical rather than continuous tone.

---

### Envelope Generator
Creates control voltage that changes over time - defines how sound evolves.

**Purpose:** Controls other parameters (VCA volume, filter cutoff, pitch, etc.) over time.

**ADSR (Most Common):**
Four stages defining how parameter changes:

**Attack (A):**
- Time from note-on to maximum level
- Range: 0ms (instant) to 10+ seconds
- Controls: how quickly sound reaches full volume/brightness
- Fast attack (0-10ms): percussive, punchy (drums, plucks)
- Slow attack (100ms-5s): swells, pads, strings

**Decay (D):**
- Time to fall from maximum to sustain level
- Range: 0ms to 10+ seconds
- Creates: initial brightness/volume that fades
- Fast decay: plucky, percussive
- Slow decay: smooth transition

**Sustain (S):**
- Level maintained while key held
- NOT a time - it's a level (0-100%)
- 100% sustain: holds at peak
- 0% sustain: falls to silence (percussive)
- 50% sustain: moderate level

**Release (R):**
- Time to fall to zero after key released
- Range: 0ms to 10+ seconds
- Fast release (0-50ms): abrupt stop
- Slow release (1-10s): natural decay, piano-like

**Common ADSR Settings:**

**Pluck (Guitar/Synth Bass):**
- A: 0-5ms (instant attack)
- D: 100-500ms (quick decay)
- S: 0% (no sustain)
- R: 50-200ms (short release)

**Pad (Strings/Atmosphere):**
- A: 500ms-2s (slow swell)
- D: 500ms-1s (gentle decay)
- S: 60-80% (high sustain)
- R: 2-5s (long release)

**Lead (Synth Lead):**
- A: 0-20ms (quick attack)
- D: 100-300ms (moderate decay)
- S: 50-70% (medium sustain)
- R: 100-500ms (moderate release)

**Brass:**
- A: 50-100ms (slight attack)
- D: 200-500ms (decay)
- S: 70-90% (high sustain)
- R: 100-300ms (moderate release)

**Multiple Envelopes:**
Modern synths typically have:
- **Envelope 1 (Amp):** Controls VCA (volume)
- **Envelope 2 (Filter):** Controls filter cutoff (brightness)
- **Envelope 3+ (Modulation):** Controls pitch, PWM, other parameters

**Envelope Types Beyond ADSR:**

**AD (Attack-Decay):**
- No sustain stage
- Always percussive
- Found in: drum synths

**ADSR + Delay:**
- Delay before attack
- Creates: rhythmic effects

**Multi-Stage:**
- 4, 6, or 8+ stages
- Complex evolving sounds
- Modern digital synths

**Professional Practice:** Envelope settings define whether sound is percussive (fast attack, no sustain) or sustained (slow attack, high sustain). Filter envelope typically mirrors amp envelope but can create unique timbral movement.

---

### LFO (Low Frequency Oscillator)
Oscillator running below audible range (typically 0.1-20Hz) used for modulation.

**Purpose:** Create repeating changes (vibrato, tremolo, filter sweeps, etc.)

**Frequency Range:**
- 0.1Hz: Very slow (6-second cycle)
- 1Hz: One cycle per second
- 10Hz: Fast modulation
- 20Hz+: Can become audible (ring modulation territory)

**Common LFO Waveforms:**
- **Sine:** Smooth vibrato/tremolo (natural sounding)
- **Triangle:** Similar to sine, slightly more linear
- **Square:** On/off switching, abrupt changes
- **Sawtooth:** Ramp up then sudden drop (or reverse)
- **Sample & Hold (S&H):** Random stepped values (R2-D2 sounds)
- **Random:** Smooth random values

**LFO Destinations (What It Modulates):**

**Pitch (Vibrato):**
- Rate: 4-7Hz typical for musical vibrato
- Depth: ±5-20 cents typical
- Creates: singing quality, expressiveness
- Use: leads, strings, brass

**Amplitude (Tremolo):**
- Rate: 2-8Hz typical
- Depth: 10-50% volume variation
- Creates: wavering, pulsing
- Use: Rhodes piano, guitar, pads

**Filter Cutoff (Wah Effect):**
- Rate: 0.5-4Hz typical
- Depth: varies by desired effect
- Creates: rhythmic filter sweeps
- Use: basses, pads, effects

**Pulse Width (PWM - Pulse Width Modulation):**
- Rate: 0.1-2Hz typical (slow)
- Creates: chorus-like thickness
- Classic analog sound

**Pan (Auto-Pan):**
- Rate: 0.5-4Hz
- Creates: stereo movement
- Use: pads, effects, atmosphere

**LFO Parameters:**

**Rate/Speed:**
- How fast LFO cycles
- Tempo sync: locked to song tempo (1/4, 1/8, 1/16 notes)
- Free-running: independent of tempo

**Depth/Amount:**
- How much modulation is applied
- 0%: no effect
- 100%: maximum modulation

**Delay:**
- Time before LFO starts
- Useful for: vibrato that fades in (realistic strings/brass)
- Range: 0-5 seconds typical

**Phase/Offset:**
- Starting position in LFO cycle
- Stereo: different phase left/right creates width

**Sync:**
- Reset: LFO restarts with each note
- Free: LFO runs continuously

**Multiple LFOs:**
Modern synths have 2-4+ LFOs:
- LFO 1: Vibrato/tremolo
- LFO 2: Filter modulation
- LFO 3+: Complex modulation

**Professional Applications:**

**Vibrato (Pitch):**
- Sine wave, 5-6Hz, ±10 cents
- Delay: 500ms (fades in naturally)
- Use: realistic instrument emulation

**Trance Gate (Amplitude):**
- Square wave, 1/16 note synced
- 50-100% depth
- Creates: rhythmic stuttering

**Dubstep Wobble (Filter):**
- Sine/square, 1/4 to 1/8 note synced
- High resonance on filter
- Extreme depth

**Chorus (Pulse Width):**
- Sine/triangle, 0.3-0.8Hz
- Subtle depth
- Creates: vintage analog thickness

**Professional Understanding:** LFO adds movement and life to static sounds. Slow rates (0.1-2Hz) create evolving textures. Fast rates (4-10Hz) create vibrato and rhythmic effects. Tempo sync essential for rhythmic music.

---

## 2. Oscillator Waveforms & Harmonics

### Sine Wave
The purest waveform - fundamental frequency only, no harmonics.

**Harmonic Content:**
- Fundamental frequency only (1st harmonic)
- No overtones whatsoever
- Mathematically: A × sin(2πft)

**Sound Character:**
- Pure, smooth, hollow
- Flute-like quality
- Whistle-like
- No brightness or edge

**Frequency Response:**
- Single frequency (pure tone)
- No additional harmonics above fundamental

**Applications:**
- Sub-bass (clean low-end foundation)
- FM synthesis (carrier and modulator)
- Additive synthesis (building block)
- Test tones and tuning
- Pure bass tones

**Why Important:** Sine waves are building blocks. All complex sounds can be built from sine waves (Fourier theorem). All other waveforms contain multiple sine waves at different frequencies (harmonics).

**In Subtractive Synthesis:** Rarely used alone (too plain). Often mixed with other waveforms for sub-bass foundation.

**Professional Use:** Add sine wave one octave below sawtooth/square for massive bass. Use as FM modulator. Starting point for additive synthesis.

---

### Sawtooth Wave
Brightest waveform - contains all harmonics at decreasing amplitude.

**Harmonic Content:**
- **Contains all harmonics** (1st, 2nd, 3rd, 4th, 5th, etc. to infinity)
- Amplitude decreases as 1/n (fundamental is loudest, each harmonic half as loud as previous)
- Odd and even harmonics present
- Fundamental: 100%
- 2nd harmonic: 50%
- 3rd harmonic: 33%
- 4th harmonic: 25%
- And so on...

**Sound Character:**
- Very bright, buzzy, brassy
- Cutting, aggressive
- Full-bodied with filter
- Most versatile for filtering

**Frequency Response:**
- Rich harmonic spectrum extending to Nyquist frequency
- Slopes downward (higher harmonics quieter)

**Applications:**
- **String sounds:** Filtered sawtooth = strings, pads
- **Brass sounds:** Bright, full spectrum
- **Lead sounds:** Cuts through mix
- **Bass sounds:** Full-bodied when filtered
- **General purpose:** Most common starting waveform

**Why So Useful:** Rich harmonic content gives filter something to work with. When low-pass filtered, can create vast range of timbres. Starting point for most classic analog sounds.

**Detuned Saws:** Multiple sawtooth oscillators slightly detuned creates:
- Massive "supersaw" lead sound
- Classic trance/EDM leads
- Thick pad sounds
- Reason: slight pitch differences create beating and phasing

**Professional Standard:** Sawtooth = workhorse waveform. Most filtered sounds start here. Too bright alone, perfect with filter. Used in: Prophet-5, Jupiter-8, most classic leads/strings/brass.

---

### Square Wave
Contains only odd harmonics - hollow, woody character.

**Harmonic Content:**
- **Odd harmonics only** (1st, 3rd, 5th, 7th, 9th, etc.)
- Amplitude decreases as 1/n
- No even harmonics (2nd, 4th, 6th missing)
- Fundamental: 100%
- 3rd harmonic: 33%
- 5th harmonic: 20%
- 7th harmonic: 14%
- And so on...

**Waveform Shape:**
- 50% duty cycle (equal high and low time)
- Symmetrical
- Abrupt transitions (rise/fall)

**Sound Character:**
- Hollow, woody, clarinet-like
- Thinner than sawtooth
- Less bright than sawtooth
- Nasal quality

**Applications:**
- **Clarinet sounds:** Natural hollow quality
- **Hollow bass:** Video game bass sounds
- **Reed instruments:** Oboe, bassoon approximations
- **8-bit/chiptune:** Classic video game sounds (NES, C64)
- **Leads:** Thinner, more focused than saw

**Historical Significance:** Original video game consoles (Atari, NES, Game Boy) used primarily square waves. Defines "8-bit" sound aesthetic.

**Versus Pulse Wave:** Square wave is special case of pulse wave at exactly 50% width. Pulse waves at other widths (10%, 25%, 75%) have different harmonic content.

**Professional Use:** Great for bass (not as heavy as saw, but focused). Good for leads needing clarity without excessive brightness. Mix with sawtooth for complex timbres.

---

### Triangle Wave
Softest waveform - only odd harmonics, dropping off very quickly.

**Harmonic Content:**
- **Odd harmonics only** (like square, but much quieter)
- Amplitude decreases as 1/n² (much faster than square or saw)
- Fundamental: 100%
- 3rd harmonic: 11% (1/9 of fundamental)
- 5th harmonic: 4% (1/25)
- 7th harmonic: 2% (1/49)
- Higher harmonics: essentially inaudible

**Waveform Shape:**
- Linear rise and fall
- Symmetrical
- Smooth transitions (not abrupt like square)

**Sound Character:**
- Soft, mellow, flute-like
- Hollow (like square but softer)
- Warm, gentle
- Almost sine-like but slightly richer

**Applications:**
- **Flute sounds:** Soft, breathy quality
- **Soft pads:** Gentle background textures
- **Sub-bass:** Warmer than sine, still focused
- **Mellow leads:** Soft, not aggressive
- **FM synthesis:** As modulator for gentler FM tones

**Frequency Response:**
- Mostly fundamental
- Very few audible harmonics
- Similar to sine but slightly richer

**Versus Sine:** Triangle has harmonics (sine doesn't), but so few that it's nearly as pure. Slightly warmer and richer than sine.

**Versus Square:** Same odd-only harmonics, but triangle drops off much faster (softer, less hollow).

**Professional Use:** When you need warmth but not brightness. Sub-bass between sine and square. Soft melodic lines. Starting point for gentle filter sweeps.

---

### Pulse Wave / Variable Pulse
Variation of square wave with adjustable duty cycle (width).

**Duty Cycle (Pulse Width):**
- Percentage of time waveform is high vs low
- 10%: narrow pulse (mostly low)
- 25%: narrow
- 50%: square wave (symmetrical)
- 75%: inverse of 25%
- 90%: very narrow pulse (mostly high)

**Harmonic Content (varies with width):**
- **50% (square):** Odd harmonics only, no even
- **25% or 75%:** Both odd and even, different pattern
- **Very narrow (10%):** All harmonics present, bright
- **Width affects:** which harmonics are present/absent

**Sound Character by Width:**
- **50%:** Hollow, woody (square wave)
- **25%/75%:** Thin, reedy, nasal
- **10%/90%:** Bright, buzzy, complex

**PWM (Pulse Width Modulation):**
Modulating pulse width over time (typically with LFO):
- Creates: chorus-like effect, movement, thickness
- Classic analog sound
- Width changes: harmonics shift, creates phasing
- Slow modulation (0.2-0.8Hz): lush, evolving
- Found in: Juno-106, Prophet-5, most classic analog synths

**Applications:**
- **PWM pads:** Classic analog strings, thick pads
- **Bass:** Hollow bass tones (50%), funky bass (25%)
- **Leads:** Nasal, biting quality
- **Effects:** Movement and animation

**Professional Wisdom:** PWM is secret to classic analog thickness. Slow triangle LFO modulating pulse width creates instant vintage character. Essential for authentic analog emulation.

---

*[Content continues in Part 2 with remaining waveforms, noise, and more]*

