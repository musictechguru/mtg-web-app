# Music Tech Dictionary
## Volume 3: Synthesis Complete - FULL COMPREHENSIVE EDITION
### Part 3 of 3: Types of Synthesis, Performance Controls & Classic Synths

---

# PART 3: SYNTHESIS TYPES & PERFORMANCE

## 6. Types of Synthesis

### Subtractive Synthesis
**Most common synthesis method - starts with harmonically rich waveform, removes frequencies with filters.**

**Process:**
1. **Oscillators:** Generate harmonically rich waveforms (sawtooth, square, pulse)
2. **Filter:** Removes unwanted frequencies (typically low-pass filter)
3. **Amplifier:** Shapes volume over time (VCA with envelope)
4. **Modulation:** LFOs and envelopes add movement

**Principle:** "Subtract" harmonics from rich source to sculpt desired timbre.

**Advantages:**
- Intuitive workflow (generate → filter → shape)
- Immediate, responsive control
- Classic analog sound
- Easy to understand
- Most synthesizers use this method

**Sound Character:**
- Warm, organic (analog implementations)
- Rich harmonics when filter open
- Smooth filter sweeps
- Classic "synth" sound

**Famous Subtractive Synths:**
- Minimoog (1970) - monophonic bass/lead legend
- Prophet-5 (1978) - first polyphonic programmer
- Jupiter-8 (1981) - lush pads and strings
- Juno-106 (1984) - affordable classic
- TB-303 (1982) - acid bass machine

**Applications:** Bass, leads, pads, strings, brass - essentially all traditional synth sounds.

**Modern Examples:** Virtually all analog synths, most soft synths include subtractive engines.

---

### Additive Synthesis
**Building sounds by adding together multiple sine waves at different frequencies and amplitudes.**

**Process:**
1. **Multiple sine oscillators:** Each generates pure sine wave
2. **Frequency control:** Each sine at different pitch (harmonics)
3. **Amplitude control:** Each sine at different volume
4. **Envelope per sine:** Each sine can have independent envelope
5. **Sum:** All sines combined create complex timbre

**Principle:** Any sound can be recreated by summing enough sine waves (Fourier theorem).

**Advantages:**
- Precise control over harmonic content
- Can recreate any sound theoretically
- Smooth timbres possible
- Bell-like, organ-like tones

**Disadvantages:**
- Complex to program (many parameters)
- CPU-intensive (many oscillators)
- Difficult to predict results
- Not intuitive for most users

**Parameters:**
- Number of partials: 8-256+ (more = more complex)
- Frequency of each partial
- Amplitude of each partial
- Envelope for each partial (advanced)

**Sound Character:**
- Smooth, pure tones
- Organ-like
- Bell-like
- Glassy, crystalline
- Electronic, precise

**Famous Additive Synths:**
- Hammond organ (tonewheel additive - drawbars control harmonics)
- Kawai K5/K5000 series
- Synclavier (partial additive)
- Various software synths (Harmor, Razor)

**Applications:** Organs, bells, electronic tones, precise sound design, experimental sounds.

**Modern Use:** Mostly in software synths due to CPU requirements. Some hardware uses limited additive (drawbar organs).

---

### FM Synthesis (Frequency Modulation)
**Using one oscillator to modulate the frequency of another, creating complex harmonic sidebands.**

**Process:**
1. **Carrier oscillator:** Produces fundamental pitch (heard tone)
2. **Modulator oscillator:** Modulates carrier frequency (usually not heard directly)
3. **Modulation depth:** Controls intensity of modulation
4. **Modulation rate:** Speed of modulation (usually in audio range)

**Principle:** When modulator frequency is audio rate, creates new harmonics (sidebands). Sidebands = carrier ± (modulator × integer).

**Algorithms:**
- Multiple operators (oscillators) arranged in configurations
- Series: Carrier modulated by modulator modulated by another
- Parallel: Multiple carriers with different modulators
- Feedback: Operator modulates itself
- Yamaha DX7: 6 operators, 32 algorithms

**Advantages:**
- Extremely wide range of timbres
- Complex sounds from simple components
- Bell-like, metallic tones easy
- Bright, clear digital sound
- Memory-efficient (few oscillators create rich sound)

**Disadvantages:**
- Difficult to program (non-intuitive)
- Hard to predict results
- Can sound harsh, digital
- Requires understanding of algorithms

**Parameters:**
- **Carrier frequency:** Fundamental pitch
- **Modulator frequency:** Ratio to carrier (1:1, 2:1, 3.5:1, etc.)
- **Modulation index:** Depth of modulation (brightness)
- **Envelope per operator:** Volume contour of each operator
- **Algorithm:** Routing configuration

**Sound Character:**
- Bright, metallic
- Bell-like, glassy
- Electric piano (classic DX7)
- Plucked strings
- Brass (with right programming)
- Digital, precise

**Famous FM Synths:**
- **Yamaha DX7 (1983):** Defined 1980s sound, 6-operator, most successful synth ever
- **Yamaha DX100/DX27:** Compact, affordable FM
- **Yamaha TX81Z:** 4-operator rack, popular
- **Native Instruments FM8:** Software, modern FM

**Applications:** Electric pianos (DX7 Rhodes), bells, bass (FM bass), brass, percussion, aggressive leads.

**Modern Use:** Software implementations common. Hardware FM less popular but cult following.

---

### Wavetable Synthesis
**Smoothly transitioning between multiple sampled waveforms (wavetables) creating evolving timbres.**

**Process:**
1. **Wavetable:** Collection of single-cycle waveforms (64-256 waveforms)
2. **Position control:** Selects which waveform from table
3. **Scanning:** Smoothly interpolates between adjacent waveforms
4. **Modulation:** Position modulated for timbral evolution

**Principle:** Each position in wavetable contains different waveform. Scanning through creates smooth timbral changes impossible with basic waveforms.

**Wavetable Contents:**
- Single-cycle waveforms
- Can be: drawn, sampled, mathematically generated
- Arranged: to create smooth transitions
- Example: Sine → triangle → sawtooth → square → pulse

**Advantages:**
- Smooth timbral evolution
- Complex sounds from simple control
- Wide range of textures
- Morphing between different characters

**Parameters:**
- **Wave position:** Location in wavetable (0-100%)
- **Position modulation:** LFO or envelope scanning table
- **Wavetable selection:** Choose different wavetables
- **All standard synthesis:** plus wavetable-specific controls

**Sound Character:**
- Smooth transitions
- Evolving, organic (when modulated)
- Digital, precise
- Can be very complex and rich

**Famous Wavetable Synths:**
- **PPG Wave 2.x (1981):** First popular wavetable synth
- **Waldorf Microwave/Wave:** Modern wavetable classics
- **Serum (software):** Modern wavetable powerhouse
- **Korg Wavestation:** Advanced vector synthesis with wavetables

**Applications:** Pads (evolving textures), leads (movement and interest), soundscapes, digital textures, modern electronic music.

**Modern Use:** Very popular in software synths. Serum, Massive, Pigments all use wavetables extensively.

---

### Granular Synthesis
**Splitting sound into tiny grains (1-100ms) and reassembling with different timing, pitch, position.**

**Process:**
1. **Source audio:** Sample or real-time input
2. **Grain extraction:** Divide into tiny segments (grains)
3. **Grain parameters:** Pitch, duration, position, density
4. **Reassembly:** Grains played back (overlapping, scattered, modified)

**Grain Parameters:**
- **Grain size:** 1-100ms typical (shorter = more granular, textured)
- **Grain density:** How many grains per second
- **Position:** Where in source grains extracted
- **Pitch:** Grain playback speed (independent of position)
- **Spray/Randomization:** Random variation in parameters

**Advantages:**
- Time-stretching without pitch change
- Pitch-shifting without time change
- Textural, atmospheric sounds
- Microscopic audio manipulation

**Sound Character:**
- Textured, grainy (at small grain sizes)
- Smooth (at larger grain sizes)
- Atmospheric, evolving
- Glitchy (with high randomization)
- Cloud-like, swarming

**Applications:** Atmospheric pads, soundscapes, time/pitch manipulation, experimental sounds, textural layers.

**Famous Granular Tools:**
- **Granulator (Ableton Max device)**
- **Borderlands (iOS granular app)**
- **Granite (New Sonic Arts)**
- **Various software synths** (Omnisphere, Pigments)

**Modern Use:** Mainly software-based. Popular for sound design, film scoring, experimental music.

---

### Physical Modeling
**Mathematically modeling physical properties of real instruments.**

**Process:**
1. **Model physical components:** Strings, tubes, resonators, hammers
2. **Calculate vibration:** Using physics equations
3. **Synthesize sound:** Based on mathematical model
4. **Control parameters:** Excitation, resonance, material properties

**Modeled Components:**
- **String:** Length, tension, material, pluck/bow position
- **Tube/Pipe:** Length, diameter, bore shape, embouchure
- **Resonator:** Size, shape, material, damping
- **Excitation:** How instrument is "played"

**Advantages:**
- Realistic acoustic instrument sounds
- Expressive, responsive
- Can modify impossible parameters (titanium violin, 50-foot flute)
- Small memory footprint (equations not samples)

**Sound Character:**
- Acoustic, realistic
- Responsive to performance
- Natural dynamics
- Can be experimental (impossible instruments)

**Famous Physical Modeling Synths:**
- **Yamaha VL1 (1994):** First commercial physical modeling synth
- **Applied Acoustics Systems:** Chromaphone, String Studio (software)
- **Sculpture (Logic Pro):** Physical modeling synth
- **Pianoteq:** Physically modeled piano

**Applications:** Realistic acoustic instruments, experimental hybrid instruments, expressive performance, orchestral mockups.

**Modern Use:** Software implementations. Very CPU-intensive but improving. Pianoteq considered one of best piano plugins.

---

### Sample-Based Synthesis
**Using recorded samples (real instruments) as oscillators, modified with synthesis parameters.**

**Process:**
1. **Sample playback:** Recorded audio played back at different pitches
2. **Multisampling:** Different samples for different pitches/velocities
3. **Looping:** Sustaining notes beyond sample length
4. **Synthesis processing:** Filters, envelopes, effects applied

**Sampling Techniques:**
- **Single sample:** One recording pitched up/down
- **Multisampled:** Sample every note or every few notes
- **Velocity layers:** Different samples for different playing intensities
- **Round robin:** Alternate samples for repeated notes (realism)

**Advantages:**
- Realistic acoustic instruments
- Any sound can be sampled
- Immediate recognition (real instruments)
- Rich, complex timbres

**Disadvantages:**
- Large memory requirements
- Can sound "sampled" (artificial)
- Limited expressiveness (unless many layers)

**Famous Samplers:**
- **Mellotron (1963):** Tape-based sampling, strings/flutes
- **Fairlight CMI (1979):** First digital sampler ($25,000+)
- **E-mu Emulator:** Affordable sampling (1980s)
- **Akai S-series:** MPC standard (S950, S1000, S3000)
- **Modern:** Kontakt, EXS24, most soft synths include sampling

**Applications:** Realistic instruments (orchestral libraries), drums (multisampled kits), any real sound, hip-hop production.

**Modern Use:** Ubiquitous. Every DAW includes sampler. Kontakt industry standard for libraries.

---

### Vector Synthesis
**Morphing between four sound sources using joystick or envelope control.**

**Process:**
1. **Four sound sources:** Can be oscillators, samples, wavetables
2. **X/Y control:** Joystick or automation controls mix
3. **Real-time morphing:** Smooth transitions between sources
4. **Recording movement:** Can record joystick movements

**Control:**
- **X-axis:** Morphs between two sources (left-right)
- **Y-axis:** Morphs between two sources (up-down)
- **Position:** Determines mix of all four sources
- **Envelope:** Can automate X/Y position over time

**Advantages:**
- Expressive, dynamic sounds
- Smooth timbral morphing
- Performance-oriented
- Complex evolving textures

**Famous Vector Synths:**
- **Sequential Prophet VS (1986):** First vector synthesis
- **Korg Wavestation (1990):** Advanced vector + wavetables
- **Yamaha SY series:** Vector control

**Applications:** Evolving pads, morphing textures, expressive performance, soundscapes.

**Modern Use:** Some software synths include vector features. Less common than other synthesis types.

---

### Phase Distortion Synthesis
**Casio's proprietary synthesis method - altering phase of waveform reading.**

**Process:**
1. **Sine wave:** Stored in memory
2. **Phase alteration:** Reading rate varies during cycle
3. **Creates:** Harmonics without filters
4. **Similar to:** FM synthesis but different implementation

**Advantages:**
- Memory efficient
- Wide range of timbres
- Unique Casio CZ sound

**Famous Phase Distortion Synths:**
- **Casio CZ-101/1000/5000 series (1984-1987)**
- Distinctive 1980s sound
- Very affordable at the time

**Sound Character:** Bell-like, digital, bright, similar to FM but distinct character.

**Modern Use:** Mostly vintage instruments. Not widely used in modern synthesis.

---

## 7. Performance Controls

### Keyboard
**Piano-style keys controlling pitch and triggering notes.**

**Parameters:**
- **Velocity:** How hard key is struck (0-127)
- **Aftertouch:** Pressure after initial strike
- **Keybed quality:** Weighted, semi-weighted, synth action

**Velocity Sensitivity:**
- Controls: volume, filter brightness, modulation amount
- 0-127 range (MIDI standard)
- Soft touch: low velocity (quiet, dark)
- Hard touch: high velocity (loud, bright)

**Applications:** Primary performance interface. Expressive control essential for musical playing.

---

### Pitch Bend Wheel
**Wheel controlling continuous pitch change.**

**Range:** Typically ±2 semitones (configurable ±1 to ±12 or more)

**Behavior:**
- Spring-loaded (returns to center)
- Continuous control (14-bit MIDI resolution = 16,384 steps)
- Affects all playing notes simultaneously

**Applications:** Guitar-style bends, vibrato, portamento effects, expressive pitch control.

---

### Modulation Wheel (Mod Wheel)
**Wheel controlling modulation depth - typically vibrato or other assigned parameter.**

**Characteristics:**
- Not spring-loaded (stays where positioned)
- 0-127 range
- Usually controls: vibrato depth, LFO amount, filter modulation

**Typical Assignments:**
- Vibrato depth (most common)
- Filter cutoff modulation
- LFO to pitch/filter/PWM

**Applications:** Adding expression after note start, gradual introduction of vibrato, real-time modulation control.

---

### Aftertouch (Channel Pressure)
**Pressure applied to keys after initial strike.**

**Types:**
- **Channel Aftertouch:** Single pressure value for all keys (most common, less expensive)
- **Polyphonic Aftertouch:** Independent pressure per key (expensive, rare)

**Range:** 0-127 (MIDI)

**Typical Assignments:**
- Vibrato depth
- Filter cutoff
- Volume swell
- LFO amount

**Applications:** Expressive playing, swells, vibrato, adding movement after note struck.

---

### Velocity
**How hard key is struck - primary dynamic control.**

**Range:** 0-127 (MIDI standard)

**Affects:**
- **Volume:** Harder = louder (most common)
- **Filter cutoff:** Harder = brighter
- **Envelope times:** Harder = faster attack
- **Sample selection:** Different samples at different velocities

**Curve:**
- Linear: Direct relationship
- Exponential: More dynamic range
- Fixed: Ignores velocity (organ-style)

---

## 8. Classic Synthesizers

### Minimoog (1970)
**Legendary monophonic analog synthesizer - defined bass and lead sounds.**

**Specifications:**
- **Architecture:** 3 VCOs, 24dB Moog ladder filter, 2 ADSR envelopes
- **Monophonic:** 1 voice
- **Features:** Pitch/mod wheels, oscillator sync, noise generator
- **Sound:** Warm, fat, powerful bass and leads

**Famous for:** Bass (Michael Jackson "Thriller"), leads (Kraftwerk, Parliament), defining analog sound.

**Price:** $1,495 in 1970 ($10,000+ today inflation-adjusted). Vintage: $3,000-8,000 now.

---

### Prophet-5 (1978)
**First fully programmable polyphonic synthesizer - revolutionary.**

**Specifications:**
- **Architecture:** 2 VCOs per voice, Curtis filter, polyphonic
- **Voices:** 5 voices (later 10-voice Prophet-10)
- **Programmability:** 40 memory patches (revolutionary!)
- **Sound:** Punchy, bright, versatile

**Famous for:** Pads, strings, brass, leads. Defining 1970s-80s sound.

**Price:** $3,995 in 1978. Vintage: $8,000-20,000 now. Modern reissue (Prophet-5 Rev 4): $3,999.

---

### Yamaha DX7 (1983)
**Best-selling synthesizer ever - defined 1980s digital sound.**

**Specifications:**
- **Architecture:** 6-operator FM synthesis, 32 algorithms
- **Voices:** 16 voices (later 32-voice DX7 II)
- **Programmability:** 32 patches internal
- **Sound:** Bright, bell-like, electric pianos, digital

**Famous for:** Electric piano (nearly every 80s song), bells, brass, bass.

**Price:** $1,995 in 1983 (affordable!). Sold 200,000+ units.

---

### Roland TB-303 (1982)
**Bass synthesizer - created acid house genre.**

**Specifications:**
- **Architecture:** 1 VCO (sawtooth/square), 18dB resonant filter, monophonic
- **Sequencer:** 16-step pattern programming
- **Sound:** Screaming resonance, wet/squishy filter, iconic acid bass

**Famous for:** Acid house (Phuture "Acid Tracks"), techno, electronic bass.

**Price:** $395 in 1982 (failure initially). Vintage: $2,000-4,000+ now due to cult status.

---

### Roland Jupiter-8 (1981)
**Flagship polyphonic analog - lush pads and strings.**

**Specifications:**
- **Architecture:** 2 VCOs per voice, Roland IR3109 filter
- **Voices:** 8 voices
- **Features:** Arpeggiator, unison mode, cross-modulation
- **Sound:** Lush, warm, smooth, Jupiter "sound"

**Famous for:** Pads (Vangelis "Blade Runner"), strings, brass.

**Price:** $5,295 in 1981. Vintage: $15,000-25,000+ (very collectible).

---

*[Additional synths in PDF: Oberheim OB-X, ARP 2600, Korg MS-20, Sequential Circuits Pro-One]*

---

## Summary: Volume 3 Complete

**Part 1:** Basic Components (VCO, VCF, VCA, Envelopes, LFO) + 10 Waveforms
**Part 2:** Filters Complete + Modulation + Parameters
**Part 3:** 10 Types of Synthesis + Performance Controls + Classic Synths

**Total Coverage:** 78 comprehensive entries covering synthesis from basic components through advanced techniques and legendary instruments.

---

*Music Tech Dictionary - Volume 3 of 10*
*Complete Synthesis Reference*
*© 2024 - Educational Use*

