# Music Tech Dictionary
## Volume 3: Synthesis Complete - FULL COMPREHENSIVE EDITION
### Part 2 of 4: More Waveforms, Filters & Modulation

---

# PART 1 CONTINUED: REMAINING WAVEFORMS

### Noise (White & Pink)

**White Noise:**
- All frequencies present at equal energy per Hz
- Frequency spectrum: flat across entire range
- Sound: Bright hissing, like static
- Harmonic content: Infinite random frequencies

**Pink Noise:**
- Equal energy per octave (not per Hz)
- Frequency spectrum: Rolls off -3dB per octave
- Sound: Softer hiss, more natural than white
- More low-frequency energy than white noise

**Other Noise Colors:**
- **Red/Brown Noise:** -6dB per octave (even darker, rumbling)
- **Blue Noise:** +3dB per octave (brighter than white)
- **Violet Noise:** +6dB per octave (very bright)

**Applications:**
- **Snare drums:** Mixed with tone for snare wires
- **Hi-hats/Cymbals:** Primarily noise with subtle pitch
- **Wind effects:** Filtered noise
- **Ocean/waves:** Pink noise, low-pass filtered
- **Breath sounds:** Soft filtered noise
- **Percussion:** Noise + pitch for realistic attacks
- **Special effects:** Whooshes, air, atmosphere

**In Synthesis:**
- Dedicated noise oscillator
- Mixed with tonal oscillators
- Run through filter for shaping
- Modulated for movement

**Professional Use:**
- Snare: White noise through band-pass filter, envelope
- Hi-hat: White noise through high-pass filter, short envelope
- Wind: Pink noise, slow filter sweep with LFO
- Attack: Brief noise burst for percussive attack

---

### Sub-Oscillator
Oscillator running one or two octaves below main oscillator.

**Frequency:**
- -1 octave: Half frequency of main oscillator
- -2 octaves: Quarter frequency of main oscillator
- Always locked to main oscillator pitch (cannot detune)

**Waveform:**
- Usually square wave (simple, focused)
- Sometimes pulse or sine
- Always simpler than main oscillator

**Sound Character:**
- Adds deep sub-bass foundation
- Thickens low end without muddying mids
- Powerful fundamental
- No phase issues (locked to main)

**Applications:**
- **808-style bass:** Massive sub-bass (iconic hip-hop/trap bass)
- **Kick drums:** Deep thump, fundamental weight
- **Bass sounds:** Additional low-end without filtering out main tone
- **Pads:** Low-end support, warmth
- **Leads:** Powerful foundation without muddiness

**Famous Uses:**
- Roland TB-303: Sub-oscillator essential to acid bass character
- Minimoog: Sub-oscillator adds depth to bass patches
- Modern trap/dubstep: Huge sub-bass fundamental
- EDM kicks: Sub provides ultra-low weight

**Professional Practice:**
- Mix subtly (10-30% vs main oscillator)
- Use on bass and kick primarily
- Can't detune (always exact interval)
- Instant thickness at low end

---

### Sync Oscillator (Hard Sync)
One oscillator forcibly resets another, creating harmonic-rich tones.

**How It Works:**
- **Master oscillator:** Sets reset rate
- **Slave oscillator:** Gets reset by master
- When master completes cycle: slave instantly resets to zero
- Creates: additional harmonics, aggressive timbres

**Sound Character:**
- Bright, harsh, aggressive
- Harmonic overtones added
- Buzzsaw quality
- Sync sweep: distinctive metallic/harmonic sweep

**Modulation:**
Sweeping slave oscillator pitch while being synced:
- Creates signature sync sweep sound
- Harmonic content changes
- Classic lead sound (PPG Wave, Prophet VS)

**Applications:**
- **Aggressive leads:** Cutting, bright
- **Special effects:** Metallic, harmonic
- **Timbral modulation:** Changing harmonics dynamically
- **Classic sounds:** 1970s-80s synth leads

**Famous Examples:**
- Cars "Let's Go" (sync lead)
- Eddie Van Halen synth lead tones
- 1980s new wave synth leads

---

# PART 2: FILTER TYPES COMPLETE

## Low-Pass Filter (LPF)
Allows frequencies below cutoff to pass, removes frequencies above.

**Operation:**
- Frequencies below cutoff: Pass through
- Cutoff frequency: -3dB point
- Frequencies above cutoff: Attenuated
- Slope determines: how quickly highs removed

**Slopes (Filter Order):**
- **6dB/octave (1-pole):** Gentle, subtle
- **12dB/octave (2-pole):** Moderate, musical
- **18dB/octave (3-pole):** Steep, pronounced
- **24dB/octave (4-pole):** Very steep, dramatic (most common)

**Resonance (Q Factor):**
- Boost at cutoff frequency
- 0%: Natural roll-off, no emphasis
- 30-50%: Musical emphasis
- 70-90%: Strong resonance, character
- 100%: Self-oscillation (filter becomes sine oscillator)

**Self-Oscillation:**
- Filter generates pure sine tone at cutoff
- Can be played as additional oscillator
- Useful for: bass tones, special effects
- Classic analog behavior

**Sound Character:**
- Removes brightness ("opens" and "closes")
- Creates warmth when closed
- Classic "wah" filter sweep
- Fundamental to subtractive synthesis

**Applications:**
- **Bass synthesis:** Cutoff 200-600Hz, high resonance, envelope opens on attack
- **Pad sounds:** Cutoff 1-6kHz, gentle resonance, slow filter envelope
- **Lead sounds:** Cutoff 1-4kHz, moderate resonance, envelope modulation
- **String sounds:** Filtered sawtooth, cutoff 1-3kHz
- **Classic analog:** Foundation of all subtractive sounds

**Famous LPF Designs:**
- **Moog Ladder (24dB):** Warm, fat, smooth (Minimoog, Voyager)
- **Curtis/SSM (24dB):** Clean, punchy (Prophet-5, OB-X)
- **Roland IR3109 (24dB):** Smooth, liquid (Juno-60, Jupiter-8)
- **TB-303 Filter (24dB):** Squelchy, acid, screaming resonance
- **Korg MS-20 (6dB/12dB):** Aggressive, raw

**Professional Settings:**
- **Fat bass:** Saw wave, cutoff 300Hz, resonance 40%, slow attack envelope
- **Synth pad:** Multiple saws, cutoff 3kHz, resonance 15%, slow attack/release
- **Lead:** Saw wave, cutoff 2kHz, resonance 50%, fast envelope attack opening filter

---

## High-Pass Filter (HPF)
Allows frequencies above cutoff to pass, removes frequencies below.

**Operation:**
- Opposite of low-pass
- Frequencies above cutoff: Pass through
- Frequencies below cutoff: Attenuated
- Same slopes as LPF (6dB, 12dB, 18dB, 24dB per octave)

**Sound Character:**
- Removes bass and body
- Thin, airy, bright
- Can sound hollow
- Emphasizes treble

**Applications:**
- **Hi-hats:** Remove low-end rumble (cutoff 200-800Hz)
- **Thin leads:** Emphasize high frequencies
- **Layering:** Remove bass from upper layer to avoid mud
- **Special effects:** Filter sweeps (opposite direction from LPF)

**Resonance:**
- Emphasizes cutoff frequency
- Less commonly used than LPF resonance
- Can create resonant peak in highs

**Professional Use:**
- Clean up low-end on non-bass instruments
- Create thin, bright textures
- High-pass everything except bass and kick (mixing)
- Opposite filter sweep from LPF

---

## Band-Pass Filter (BPF)
Allows frequencies around cutoff (band) to pass, removes highs and lows.

**Operation:**
- Center frequency (cutoff): Peak of pass-band
- Q (resonance): Width of pass-band
- High and low frequencies: Removed

**Q Factor:**
- Low Q (wide): Broader range passes (more musical)
- High Q (narrow): Very focused, nasal
- Very high Q: Almost pure tone (telephone-like)

**Sound Character:**
- Focused, nasal
- Midrange-emphasized
- Thin (lows and highs removed)
- Vocal formant-like

**Applications:**
- **Vocal simulation:** Formant filtering (vowel sounds)
- **Telephone effect:** Narrow band 300-3000Hz
- **Wah-wah:** Sweeping band-pass filter
- **Percussion:** Focused pitched percussion (congas, bongos)
- **Special effects:** Resonant, hollow sounds

**Bandwidth:**
- Wide: Musical, rich character
- Medium: Focused, clear tone
- Narrow: Nasal, telephone-like
- Very narrow: Almost sine wave

**Professional Practice:**
- Use for vocal formants (sweep 400-2000Hz)
- Wah effect: LFO or envelope modulating cutoff
- Percussion: Fixed band-pass for tom/conga character

---

## Notch Filter (Band-Reject)
Removes frequencies around cutoff, allows highs and lows to pass.

**Operation:**
- Opposite of band-pass
- Center frequency: Point of maximum attenuation
- Q determines: Width of notch
- Frequencies above and below: Pass through

**Sound Character:**
- Scooped, hollow
- Phaser-like when swept
- Creates gap in spectrum

**Applications:**
- **Phaser effect:** Sweeping notches
- **Problem-solving:** Remove resonances
- **Special effects:** Unusual timbres
- Less common in synthesis (more in mixing)

---

# PART 3: ENVELOPE GENERATORS

## ADSR Envelope Complete

**Attack Time (A):**
Time from key press to maximum level.

**Range:** 0ms - 10 seconds (typical)

**Settings by Sound:**
- **Percussive (0-10ms):** Instant attack (drums, plucks, pizzicato)
- **Fast (10-50ms):** Quick but not instant (piano, guitar)
- **Medium (50-200ms):** Noticeable swell (brass, some strings)
- **Slow (200ms-2s):** Gradual fade-in (pads, strings with bow)
- **Very slow (2-10s):** Cinematic swells (sound design, atmospheres)

**Controls:** How quickly sound speaks/starts

---

**Decay Time (D):**
Time from peak to sustain level.

**Range:** 0ms - 10 seconds

**Only occurs:** If sustain level is below 100%

**Settings:**
- **Fast (10-100ms):** Percussive, immediate decay
- **Medium (100-500ms):** Natural instrument decay
- **Slow (500ms-2s):** Gradual fall to sustain
- **Very slow (2-10s):** Long evolving sounds

**Controls:** How long initial impact/brightness lasts before settling to sustained level

---

**Sustain Level (S):**
Level held while key is pressed.

**IMPORTANT:** This is a LEVEL (0-100%), NOT a time value

**Settings:**
- **0%:** No sustain (fully percussive - falls to silence)
- **25-50%:** Moderate sustain (guitar, soft sounds)
- **60-80%:** High sustain (pads, strings, most sustained sounds)
- **100%:** Maximum sustain (organ-style, no decay)

**Controls:** How loud sound is while key held

---

**Release Time (R):**
Time from key release to complete silence.

**Range:** 0ms - 10 seconds (or more)

**Settings:**
- **Instant (0-10ms):** Abrupt stop (staccato)
- **Fast (10-50ms):** Quick fade (short notes)
- **Medium (50-200ms):** Natural release (piano)
- **Slow (200ms-1s):** Noticeable tail (pads, reverberant sounds)
- **Very slow (1-10s):** Long sustaining tail (ambient, orchestral)

**Controls:** How sound fades after key release

---

## Common ADSR Presets

**Piano:**
- A: 0-5ms (instant)
- D: 500ms-1s (natural decay)
- S: 30-50% (moderate)
- R: 500ms-1s (natural)

**Synth Bass:**
- A: 0-3ms (instant)
- D: 100-300ms (quick decay)
- S: 60-80% (high)
- R: 50-100ms (short)

**Pad/String:**
- A: 500ms-2s (slow swell)
- D: 500ms-1s (gentle)
- S: 70-90% (very high)
- R: 2-5s (long tail)

**Lead:**
- A: 5-20ms (quick but not instant)
- D: 100-300ms (moderate)
- S: 50-70% (medium)
- R: 100-500ms (moderate)

**Pluck:**
- A: 0-5ms (instant)
- D: 200-800ms (natural decay)
- S: 0% (no sustain)
- R: 100-300ms (short)

---

# PART 4: MODULATION

## Vibrato (Pitch Modulation)
Cyclic pitch variation creating expressiveness.

**Implementation:**
- Source: LFO (sine or triangle wave)
- Destination: Oscillator pitch
- Typical rate: 4-7Hz (musical vibrato)
- Typical depth: 5-30 cents

**Rate Settings:**
- **Slow (2-4Hz):** Gentle, classical (violin, cello)
- **Medium (4-6Hz):** Standard vocal/string vibrato
- **Fast (6-8Hz):** Expressive, emotional
- **Very fast (8-10Hz):** Aggressive, unnatural

**Depth Settings:**
- **Subtle (3-10 cents):** Barely noticeable, natural
- **Moderate (10-25 cents):** Standard musical vibrato
- **Wide (25-50 cents):** Exaggerated, emotional
- **Extreme (>50 cents):** Special effect, siren-like

**Delay:**
- Time before vibrato starts
- 0ms: Vibrato present from note start
- 200-500ms: Fades in naturally (realistic)
- 1-2s: Late vibrato (expressive)

**Applications:**
- **Strings:** 5-6Hz, 15-20 cents, 300-500ms delay
- **Brass:** 4-5Hz, 10-15 cents, 200-400ms delay
- **Lead synth:** Wheel-controlled, 5-7Hz, 20-40 cents
- **Vocal simulation:** 5-6Hz, 10-20 cents, variable delay

---

## Tremolo (Amplitude Modulation)
Cyclic volume variation.

**Implementation:**
- Source: LFO
- Destination: Amplifier/VCA
- Rate: 1-8Hz typical
- Depth: 20-80%

**Waveforms:**
- **Sine:** Smooth pulsing (natural)
- **Triangle:** Similar but more linear
- **Square:** Abrupt on/off (trill, gating effect)

**Applications:**
- **Subtle movement:** 2-3Hz, 20-30% depth
- **Obvious tremolo:** 4-6Hz, 50-70% depth
- **Helicopter effect:** 8-12Hz square wave, 80-100% depth
- **Retro sounds:** Electric piano (Rhodes), guitar amps

**Tempo-Synced:**
- Rate locked to BPM
- 1/4 note, 1/8 note, 1/16 note
- Creates rhythmic pulsing

---

## Filter Modulation
Modulating filter cutoff for timbral evolution.

**Envelope to Filter:**
- Most common modulation
- Controls how brightness evolves over time
- Amount: 0-100% (how much envelope affects cutoff)
- Velocity: Harder key = brighter sound

**Common Filter Envelopes:**
- **Pluck:** Fast attack, fast decay (bright attack, quick close)
- **Pad:** Slow attack, slow decay (gentle brightness evolution)
- **Bass:** Medium attack, medium decay (punchy but controlled)

**LFO to Filter:**
- Auto-wah effect
- Rate: 0.5-4Hz typical
- Depth: Controls sweep range
- Tempo-sync: Rhythmic filtering (dance music)

**Keyboard Tracking:**
- Higher notes = higher cutoff
- 0%: No tracking (darker as you go higher)
- 50%: Moderate tracking (natural)
- 100%: Full tracking (maintains brightness)

---

## Pulse Width Modulation (PWM)
Modulating width of pulse wave.

**Implementation:**
- Source: LFO (triangle or sine)
- Destination: Pulse width parameter
- Rate: 0.2-2Hz (slow)
- Depth: 10-40% width modulation

**Effect:**
- Creates chorus-like thickness
- Sounds like multiple detuned oscillators
- Classic analog character
- Harmonic content shifts

**Settings:**
- **Slow (0.2-0.5Hz):** Gentle, evolving
- **Medium (0.5-1Hz):** Classic analog movement
- **Fast (1-2Hz):** Obvious modulation

**Applications:**
- **String sounds:** Essential (Juno-106 strings)
- **Pads:** Depth without detuning
- **Bass:** Timbral interest
- **Classic analog:** Signature sound

---

*[Content continues in Parts 3 and 4]*

