# Music Tech Dictionary - Volume 3: Synthesis
## ADVANCED LEVEL (Degree) - Complete Quiz by Subject
### 10 Questions Per Subject - 120 Questions Total

---

# SUBJECT 1: BASIC SYNTHESIS COMPONENTS (10 Questions)

### Question 1
A VCO has a temperature coefficient of 0.5% per degree Celsius. The studio temperature increases from 20°C to 25°C during a session. If the oscillator is tuned to A4 (440Hz) initially, what frequency will it drift to, and what's the pitch deviation in cents?
- A) 440Hz, no drift
- B) ~451Hz - requires retuning
- C) 435Hz
- D) Temperature doesn't affect VCOs

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 2
You're designing a bass patch with two oscillators at 100Hz and a sub-oscillator. The sub is set to -2 octaves. Calculate the fundamental frequencies of all three oscillators and explain why this specific combination creates powerful sub-bass.
- A) All oscillators at 100Hz
- B) Oscillator 1: 100Hz, Oscillator 2: 100Hz, Sub: 25Hz; covers fundamental + sub-fundamental for massive low-end presence
- C) Sub-oscillators don't affect bass
- D) -2 octaves means 50Hz

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 3
A Moog ladder filter has 4 transistor stages, each contributing 6dB/octave rolloff. Calculate the total slope and explain why this creates the characteristic Moog sound compared to a 2-pole (12dB/octave) design.
- A) 12dB/octave total
- B) 24dB/octave; steeper rolloff creates more dramatic filter sweeps and stronger resonance characteristics
- C) Slope doesn't affect sound
- D) All filters are 6dB/octave

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 4
You have three envelopes: Amp, Filter, and Pitch. Design a brass patch where the pitch drops slightly on attack (like real brass "doits"). What envelope times and routing achieve this?
- A) All envelopes identical
- B) Pitch envelope: Attack 50-100ms with negative modulation, instant decay to zero; Amp: 50-100ms attack; Filter: fast attack opening to sustain
- C) Pitch envelopes don't exist
- D) Only amp envelope matters

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 5
An LFO at 6Hz modulates pitch with 20 cents depth. Calculate the actual frequency deviation for a note at A4 (440Hz).
- A) No frequency change
- B) ±440Hz
- C) ±~6.4Hz - 440 ≈ ±6.4Hz)
- D) ±20Hz exactly

**Answer: C**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
Why does keyboard tracking at 50% on a filter create a "constant tone" effect where higher notes don't get proportionally brighter?
- A) It's random
- B) Filter cutoff rises at half the rate of note pitch; higher notes have relatively lower cutoff/fundamental ratio, becoming progressively darker
- C) 50% tracking has no effect
- D) All notes sound identical

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 7
A DCO uses a master clock at 4MHz. For generating A4 (440Hz), how many clock cycles per waveform period, and why does this approach ensure tuning stability?
- A) 440 cycles
- B) ~9,091 cycles; digital counting eliminates temperature drift - stable crystal oscillator determines all frequencies
- C) DCOs don't use clocks
- D) 1 cycle per period

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 8
You're creating a sound with two envelopes: Amp (A:10ms, D:200ms, S:70%, R:300ms) and Filter (A:50ms, D:500ms, S:40%, R:500ms). Describe the timbral evolution and why this combination is effective for plucked sounds.
- A) Both envelopes should be identical
- B) Volume speaks quickly while brightness swells slightly then decays slower; creates realistic pluck where tone mellows before volume fades
- C) Filter envelope is wrong
- D) Plucks don't need filter envelopes

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 9
Calculate the frequency range covered by an LFO with rate control from 0.1Hz to 20Hz, expressed in musical terms for tempo-synced applications at 120 BPM.
- A) LFOs don't relate to tempo
- B) 0.1Hz = 1 cycle per 10 seconds; 20Hz = audio rate; range from extremely slow modulation to AM synthesis
- C) All LFO rates sound the same
- D) 0.1-20Hz is too slow

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
A VCA has a control voltage range of 0-10V. With linear scaling, what control voltage produces 50% amplitude (-6dB), and why might exponential scaling be more musical?
- A) 5V produces 50% amplitude
- B) Linear: 5V = 50% amplitude; Exponential: ~7.07V = 50% because human hearing is logarithmic - exponential scaling feels more natural for dynamics
- C) VCAs don't use voltage control
- D) All scaling is identical

**Answer: B**

**Expert Explanation:** Synthesis starts with an oscillator and subtractive processing.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

---

# SUBJECT 2: BASIC WAVEFORMS (10 Questions)

### Question 1
A sawtooth wave at 440Hz is sampled at 48kHz. Calculate the number of harmonics present before reaching the Nyquist frequency, and explain the implications for aliasing.
- A) Infinite harmonics
- B) ~54 harmonics; above this, aliasing occurs creating inharmonic artifacts
- C) Only fundamental
- D) Nyquist doesn't affect harmonics

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 2
Compare the harmonic amplitude decay rates: sawtooth (1/n) vs. triangle (1/n²). For the 5th harmonic at fundamental 100Hz, calculate the relative amplitudes and explain the audible difference.
- A) Identical amplitudes
- B) Sawtooth 5th: 20%; Triangle 5th: 4%; sawtooth has 5× more 5th harmonic energy - much brighter
- C) Triangle is brighter
- D) 5th harmonic doesn't exist

**Answer: B**

**Expert Explanation:** Waveforms like Sine, Saw, Square determine the basic timbre.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
A square wave contains only odd harmonics. Why does this create the characteristic "hollow" sound compared to a sawtooth with all harmonics?
- A) Square waves are quieter
- B) Missing even harmonics removes octave-related partials; creates formant-like gaps in spectrum producing woody, hollow timbre
- C) All harmonics are present
- D) Only fundamental matters

**Answer: B**

**Expert Explanation:** Waveforms like Sine, Saw, Square determine the basic timbre.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 4
You're creating a pulse wave at 25% duty cycle at 220Hz (A3). Which harmonics are minimized or nulled by this specific pulse width?
- A) No harmonics are affected
- B) Harmonics at multiples of 4 are significantly reduced/nulled due to duty cycle phase relationships
- C) All harmonics boosted equally
- D) Only fundamental remains

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
Calculate the RMS (Root Mean Square) voltage relationship between a square wave and sine wave of equal peak amplitude. Why does this matter for perceived loudness?
- A) Square: 1.0 RMS; Sine: 0.707 RMS; square contains more average energy = louder perceived volume
- B) Identical RMS
- C) Sine wave is louder
- D) RMS doesn't affect loudness

**Answer: A**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
A triangle wave at fundamental frequency f has its 3rd harmonic at amplitude 1/9. Why does this specific decay rate (1/n²) make triangle sound similar to sine despite having harmonics?
- A) Triangle is identical to sine
- B) Rapid harmonic decay means harmonics above 3rd are nearly inaudible; perceptually approaches sine purity
- C) Triangle has more harmonics than saw
- D) Decay rate doesn't affect timbre

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
You're layering three detuned sawtooth oscillators at 0 cents, +7 cents, +14 cents to create a "supersaw." Calculate the beat frequencies created and explain the resulting timbral effect.
- A) No beating occurs
- B) At 440Hz: beats at ~4.5Hz and ~9Hz; creates rich, shimmering chorus effect with subtle rhythmic pulsing - classic trance lead character
- C) All oscillators sound identical
- D) Detuning creates silence

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 8
Why does a sawtooth wave through a 24dB/octave low-pass filter set at 1kHz sound significantly different from a square wave through the same filter at the same cutoff?
- A) No difference
- B) Sawtooth has all harmonics being filtered; square has only odd harmonics with different amplitude distribution - creates distinct timbral character even with identical filtering
- C) Square wave is always brighter
- D) Filters don't work on square waves

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 9
At what pulse width percentage does a pulse wave contain maximum harmonic content (brightest, most complex sound)?
- A) 50%
- B) ~10-15%; approaches sawtooth-like harmonic content with all harmonics present
- C) 75%
- D) Pulse width doesn't affect harmonics

**Answer: B**

**Expert Explanation:** Waveforms like Sine, Saw, Square determine the basic timbre.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
A sine wave at 100Hz and a triangle wave at 100Hz are both low-pass filtered at 250Hz (allowing fundamental + 2nd harmonic). Describe the sonic result for each and explain why they differ.
- A) Identical results
- B) Sine: unchanged; Triangle: slight timbral change as 3rd harmonic is attenuated, but already weak
- C) Both become silent
- D) Filtering doesn't affect sine or triangle

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

---

# SUBJECT 3: SPECIAL WAVEFORMS & OSCILLATORS (10 Questions)

### Question 1
White noise has equal energy per Hz. Calculate the total energy in the octave from 1kHz-2kHz versus 2kHz-4kHz, and explain why this makes white noise sound bright.
- A) Equal energy in both octaves
- B) 2-4kHz octave has 2× the energy; high frequencies are over-represented = bright, harsh character
- C) 1-2kHz has more energy
- D) Octaves don't contain different energy

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
Pink noise rolls off at -3dB per octave. Calculate the relative energy in the 10kHz-20kHz octave compared to the 100Hz-200Hz octave, expressed in dB.
- A) Equal energy
- B) ~-20dB; demonstrates why pink sounds more natural with balanced low/high energy
- C) High frequencies are louder
- D) Pink noise is flat

**Answer: B**

**Expert Explanation:** Balanced connections cancel out noise interference using phase inversion on the cold wire.
**Image:** !["Diagram"](/images/svg/equipment_di_box_function.svg)
**Expert Quote:** "Terms like balanced are fundamental. - Dictionary"




---

### Question 3
You're creating a realistic snare drum. The pitched component is at 180Hz, noise is band-pass filtered 200Hz-5kHz. What's the optimal noise/tone ratio and envelope characteristics?
- A) 100% noise, no tone
- B) ~60-70% tone, 30-40% noise; both with attack <5ms, tone decay 100-200ms, noise decay 50-100ms; creates crack with body
- C) Equal amounts with identical envelopes
- D) Noise can't be used for snare

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 4
A sub-oscillator is set to -1 octave below a main oscillator at 440Hz. With both waveforms as square waves, what's the phase relationship, and why does this matter for bass response?
- A) Random phase
- B) Sub completes one cycle while main completes two; phase-locked relationship ensures no cancellation - maximum constructive interference at fundamental
- C) Sub and main cancel
- D) Phase doesn't matter

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 5
In hard sync, the master oscillator is at 100Hz, slave at 130Hz. Calculate how many partial cycles the slave completes before reset, and describe the resulting harmonic content.
- A) Slave completes full cycles
- B) Slave completes 1.3 cycles per reset; truncation creates bright, inharmonic overtones at 130Hz, 260Hz, 390Hz, etc. - classic sync buzz
- C) No harmonics are created
- D) Both oscillators must match frequency

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 6
Calculate the frequency spectrum difference between white and brown noise (which rolls off -6dB/octave). For the octave 4kHz-8kHz, what's the relative level difference?
- A) No difference
- B) Brown noise is ~6dB quieter in 4-8kHz octave relative to a reference octave; -6dB per octave creates darker, rumbling character
- C) Brown noise is brighter
- D) Same rolloff as pink

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
You're creating an 808-style kick with fundamental at 50Hz. Sub-oscillator is at -2 octaves (12.5Hz). Why is this sub-fundamental crucial, and what playback system considerations apply?
- A) 12.5Hz is inaudible and useless
- B) 12.5Hz creates subharmonic weight felt physically; requires adequate low-frequency reproduction; many systems can't reproduce it
- C) Sub-oscillators shouldn't go below 40Hz
- D) -2 octaves is incorrect

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 8
In hard sync with master at 200Hz and slave sweeping from 200Hz to 800Hz, what happens to the harmonic series as slave frequency increases?
- A) No change in harmonics
- B) Harmonic content shifts upward and becomes brighter; creates characteristic "sync sweep" as slave frequency rises through integer multiples of master
- C) Sound becomes darker
- D) Harmonics remain static

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
Compare noise through a band-pass filter (Q=5, center 2kHz) versus a high-pass filter (cutoff 2kHz). Both for hi-hat synthesis - what's the timbral difference?
- A) Identical results
- B) Band-pass: focused, pitched quality at 2kHz; High-pass: bright, airy, broader spectrum above 2kHz - less focused
- C) Both create same hi-hat
- D) Q doesn't affect band-pass

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 10
A sub-oscillator mixed at -12dB relative to main oscillator (which is at 0dB). What's the voltage ratio, and why is this level appropriate for bass sounds?
- A) Equal voltages
- B) Sub at 25% voltage of main); provides foundational weight without overpowering main tone's harmonics - balanced bass
- C) Sub at 50%
- D) -12dB means silence

**Answer: B**

**Expert Explanation:** Balanced connections cancel out noise interference using phase inversion on the cold wire.
**Image:** !["Diagram"](/images/svg/equipment_di_box_function.svg)
**Expert Quote:** "Terms like balanced are fundamental. - Dictionary"




---

---

# SUBJECT 4: FILTER TYPES (10 Questions)

### Question 1
A 24dB/octave low-pass filter has cutoff at 1kHz. Calculate the attenuation at 4kHz, and explain why this steep slope is desirable for electronic music.
- A) -6dB at 4kHz
- B) -48dB at 4kHz; steep rolloff allows precise tone shaping and dramatic filter sweeps
- C) No attenuation
- D) -24dB at 4kHz

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 2
A filter has resonance set to create a 12dB peak at cutoff (1kHz). When sweeping from 200Hz to 5kHz, what's the perceived effect, and how does this relate to Q factor?
- A) Only volume changes
- B) Resonant peak moves through spectrum emphasizing different harmonics; high Q creates more dramatic "wah" effect
- C) No timbral change
- D) Filter doesn't sweep

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 3
You're designing a state-variable filter offering LP, HP, BP, and notch simultaneously. Explain the mathematical relationship: how are notch and band-pass related?
- A) No relationship
- B) Notch = LP + HP; mathematically summing low and high removes middle
- C) Notch requires separate circuitry
- D) Only one output possible at a time

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 4
A Moog ladder filter at maximum resonance self-oscillates at 500Hz. This sine wave is used as a bass tone. What's the advantage and limitation of this technique?
- A) No advantage
- B) Advantage: pure, focused bass tone; Limitation: fixed waveform, can't modulate harmonics, relies on single-frequency oscillation
- C) Self-oscillation doesn't produce sound
- D) Moog filters can't self-oscillate

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 5
Calculate the bandwidth of a band-pass filter with center frequency 1kHz and Q factor of 10. What does this narrow bandwidth imply for sound character?
- A) Infinite bandwidth
- B) Bandwidth = 1000Hz / 10 = 100Hz; very narrow, focused, vocal formant-like quality
- C) Bandwidth = 10kHz
- D) Q doesn't affect bandwidth

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
Why does a 12dB/octave filter sound more "musical" than 24dB/octave for some applications, particularly vintage analog emulation?
- A) 12dB is always better
- B) Gentler slope retains more harmonics; sounds less "electronic/digital," more gradual timbral transitions - preferred for natural-sounding filter sweeps
- C) No sonic difference
- D) 24dB is always more musical

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 7
A high-pass filter at 200Hz with 18dB/octave slope: calculate the attenuation at 50Hz. Why is this useful for cleaning up bass sounds?
- A) No attenuation at 50Hz
- B) -36dB at 50Hz; removes sub-bass rumble while preserving fundamental around 80-120Hz
- C) -18dB at 50Hz
- D) High-pass doesn't attenuate low frequencies

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 8
You're creating a vocal formant with three band-pass filters: 700Hz (Q=5), 1200Hz (Q=10), 2500Hz (Q=8). What vowel sound does this approximate, and why are different Q values used?
- A) Random vowel
- B) Approximates "AH" vowel; different Qs match natural formant bandwidth variations - lower formants have broader bandwidth
- C) All Q values should be identical
- D) Three filters create silence

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 9
A notch filter with -40dB depth at 1kHz and Q=20. When sweeping this notch, what's the audible effect compared to a band-pass sweep?
- A) Identical to band-pass
- B) Creates "inverse wah" - removes frequencies rather than emphasizing; phaser-like, scooped character as opposed to band-pass's focused boost
- C) No audible effect
- D) Notch filters can't be swept

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 10
Why does keyboard tracking at 100% maintain consistent brightness across the keyboard, and what's the mathematical relationship?
- A) Random relationship
- B) Filter cutoff rises 1:1 with note frequency; maintains constant harmonic content relative to fundamental
- C) Brightness always changes
- D) Keyboard tracking doesn't work

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

---

# SUBJECT 5: ADSR ENVELOPE (10 Questions)

### Question 1
An envelope has A:5ms, D:200ms, S:60%, R:300ms. For a note held for 1 second, create a timeline showing exact amplitude at: note-on, 5ms, 205ms, 1 second, and 1.3 seconds (after release).
- A) Amplitude stays constant
- B) Note-on: 0%; 5ms: 100%; 205ms: 60%; 1 second: 60%; 1.3s: ~20%
- C) All times at 100%
- D) Envelopes don't work this way

**Answer: B**

**Expert Explanation:** Release is the time it takes for the processor to return to a neutral state.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like release are fundamental. - Dictionary"




---

### Question 2
You want a sound that feels "plucky" but also has a subtle sustained element. Design optimal ADSR values and explain the sustain level choice.
- A) S: 100%
- B) A: 0-3ms, D: 300-600ms, S: 10-25%, R: 100-200ms
- C) S: 0%
- D) Attack determines pluck character only

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 3
Calculate the total envelope time for a note held 2 seconds then released, with A:100ms, D:300ms, S:70%, R:500ms. Break down each stage's contribution.
- A) Total: 2 seconds
- B) Total: 2.9s; stage durations sum appropriately
- C) Total: 900ms
- D) Sustain is a time value

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 4
Why does a piano sound require careful balance between decay time and sustain level, and what typical values achieve authenticity?
- A) Piano doesn't use ADSR
- B) Piano has natural decay after hammer strike; D: 500ms-1s with S: 30-50% mimics string resonance decay while key held, then R: 500ms-1s for release
- C) Sustain should be 100%
- D) Only attack matters for piano

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 5
An amp envelope (A:10ms, D:200ms, S:80%) and filter envelope (A:50ms, D:800ms, S:30%) control the same sound. Describe the timbral evolution and explain the musical effect.
- A) Envelopes must be identical
- B) Volume speaks quickly but brightness swells then decays dramatically; creates evolving pad where timbre changes more than volume - movement without dynamic fluctuation
- C) Both control the same parameter
- D) Two envelopes cancel each other

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
For brass sounds, attack time is often 50-100ms. Calculate the frequency of the attack "swell" if attack is 80ms, and explain how this relates to perceived articulation.
- A) Attack has no frequency
- B) Attack "swell" is ~12.5Hz; below typical vibrato rates but creates noticeable articulation characteristic mimicking breath attack
- C) 80Hz frequency
- D) Attack time doesn't affect perception

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 7
You're using velocity to modulate both amp envelope and filter envelope amounts. Design a velocity response where soft notes are dark and gentle, hard notes are bright and punchy.
- A) Velocity affects neither
- B) Low velocity: reduced filter envelope amount, slower attack; High velocity: full filter amount, fast attack
- C) Velocity only affects volume
- D) All velocities sound identical

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 8
An envelope controlling pitch drops from +100 cents to 0 cents over 80ms (attack stage). What's the pitch deviation rate in cents/second?
- A) 100 cents/second
- B) 1,250 cents/second; rapid pitch drop creates characteristic brass "doit" articulation
- C) 80 cents/second
- D) Pitch envelopes can't be calculated

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 9
Why is exponential decay more natural than linear decay for envelopes, and what's the mathematical difference?
- A) Linear is always more natural
- B) Exponential: constant percentage decay; Linear: constant absolute decay; real instruments decay exponentially
- C) No mathematical difference
- D) Envelopes don't use curves

**Answer: B**

**Expert Explanation:** Envelopes control how the sound evolves over time.
**Image:** !["Diagram"](/images/svg/synth_adsr.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
Design a multi-stage envelope (6 stages) for a complex evolving pad that swells, brightens, darkens, then fades. Specify stage times and levels.
- A) ADSR is sufficient for all sounds
- B) Stage 1: 0→100%, Stage 2: hold 100%, Stage 3: 100%→70%, Stage 4: 70%→40%, Stage 5: hold 40%, Stage 6: 40%→0%
- C) Multi-stage envelopes don't exist
- D) Random values work equally well

**Answer: B**

**Expert Explanation:** The ADSR envelope shapes a sound's amplitude over time (Attack, Decay, Sustain, Release).
**Image:** !["Diagram"](/images/svg/synth_adsr.svg)
**Expert Quote:** "Terms like adsr are fundamental. - Dictionary"




---

---

# SUBJECT 6: MODULATION TYPES (10 Questions)

### Question 1
An LFO at 6Hz modulates filter cutoff with a depth of 2000Hz around a center frequency of 1500Hz. Calculate the cutoff range and the time per cycle.
- A) Fixed at 1500Hz
- B) Cutoff sweeps 500Hz-2500Hz; cycle time = 167ms; creates moderate auto-wah effect
- C) Sweeps 0-3000Hz
- D) LFO frequency doesn't affect time

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 2
PWM uses a triangle LFO at 0.4Hz modulating pulse width from 20% to 80%. How many complete PWM cycles occur during a 10-second sustained note, and what's the sonic result?
- A) 40 cycles
- B) 4 cycles; slow, evolving chorus-like thickness - classic analog string character
- C) 0.4 cycles
- D) PWM doesn't cycle

**Answer: B**

**Expert Explanation:** Low Frequency Oscillators modulate parameters to create movement.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Terms like lfo are fundamental. - Dictionary"




---

### Question 3
You're creating a dubstep wobble bass. The LFO is tempo-synced to 1/8 note at 140 BPM. Calculate the LFO frequency in Hz and explain why tempo-sync is essential.
- A) LFO can't be tempo-synced
- B) 140 BPM = 2.33 beats/s; 1/8 note = 4.67Hz; tempo-sync locks wobble to beat structure - maintains groove regardless of tempo changes
- C) Random frequency is better
- D) Wobble doesn't use LFO

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
Compare vibrato depth of 10 cents vs. 50 cents at 440Hz. Calculate the actual frequency deviation for each, and describe the musical appropriateness.
- A) Same deviation
- B) 10 cents: ±6.4Hz; 50 cents: ±32Hz; 10-25 cents typical for realistic vibrato
- C) Cents don't translate to Hz
- D) All vibrato depths sound natural

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
An LFO modulates amplitude (tremolo) with a square wave at 8Hz. Compare this to sine wave tremolo at the same rate in terms of harmonic content and perceived effect.
- A) Identical sound
- B) Square: abrupt on/off creates rhythmic gating, adds harmonic artifacts; Sine: smooth pulsing, no added harmonics - more musical
- C) Square wave is smoother
- D) Waveform doesn't affect tremolo

**Answer: B**

**Expert Explanation:** Low Frequency Oscillators modulate parameters to create movement.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Terms like lfo are fundamental. - Dictionary"




---

### Question 6
Calculate the beat frequency when PWM sweeps a pulse wave from 30% to 70% at 0.5Hz LFO rate. Describe the phase relationship and resulting sonic movement.
- A) No beating occurs
- B) LFO sweeps at 0.5Hz; width modulation shifts harmonics creating chorus-like phasing without actual beating - thickness from harmonic movement
- C) 0.5Hz beat frequency
- D) PWM doesn't create movement

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
For realistic string vibrato with delayed onset, design precise parameter values: LFO rate, depth, delay time, and fade-in time.
- A) No delay needed
- B) Rate: 5-6Hz; Depth: 12-20 cents; Delay: 300-500ms; Fade-in: 200-400ms
- C) Instant vibrato is always realistic
- D) Strings don't use delayed vibrato

**Answer: B**

**Expert Explanation:** Low Frequency Oscillators modulate parameters to create movement.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Terms like lfo are fundamental. - Dictionary"




---

### Question 8
An LFO at 10Hz modulates pitch. At what frequency does this become amplitude modulation (ring modulation effect)?
- A) 10Hz is already AM
- B) Generally above ~20Hz; 10Hz is still heard as very fast vibrato/trill, but approaching AM territory - transitional effect
- C) Never becomes AM
- D) 10Hz is below audible range

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
You're using two LFOs: LFO1 (2Hz) modulates filter cutoff; LFO2 (0.3Hz) modulates LFO1's depth. What's this technique called and what's the sonic result?
- A) Simple modulation
- B) Meta-modulation/secondary modulation; creates complex, evolving filter movement - depth changes slowly creating organic, unpredictable character
- C) LFOs can't modulate each other
- D) No audible effect

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 10
Calculate the phase relationship needed between two LFOs (both at 4Hz) to create stereo width via opposing modulation. What's the optimal phase offset?
- A) 0°
- B) 180°; when left modulation is at peak, right is at trough - creates maximum stereo movement and width
- C) 90° offset
- D) Phase doesn't affect stereo

**Answer: B**

**Expert Explanation:** Low Frequency Oscillators modulate parameters to create movement.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Terms like lfo are fundamental. - Dictionary"




---

---

# SUBJECT 7: SUBTRACTIVE SYNTHESIS (10 Questions)

### Question 1
Design a complete subtractive bass patch: specify oscillator waveform(s), filter type/cutoff/resonance, and envelope parameters. Calculate the approximate frequency response.
- A) Single sine wave, no filter
- B) OSC: Sawtooth at fundamental; Filter: LP 24dB at 400Hz, resonance 40%; Amp envelope: A:3ms, D:200ms, S:70%, R:100ms; Filter envelope: A:10ms, depth 50%; Result: fundamental + first 4-5 harmonics, punchy attack
- C) Any values work equally
- D) Bass doesn't need filters

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 2
Why does the Minimoog's 3-oscillator architecture with individual waveform selection create thicker sounds than a single-oscillator synth?
- A) Three oscillators are just louder
- B) Slight detuning creates beating/chorus; different waveforms combine for complex harmonic content; phase differences add movement - analog richness
- C) No sonic advantage
- D) Minimoog uses only one oscillator

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 3
Calculate the harmonic content remaining after a sawtooth at 100Hz passes through a 24dB/octave LP filter at 500Hz. What harmonics are audible, and at what relative levels?
- A) Only fundamental
- B) Harmonics 1-5 relatively unaffected; 6th at ~-4dB; 7th+ increasingly attenuated; creates warm bass tone
- C) All harmonics at full level
- D) Complete silence

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 4
The TB-303 filter is 18dB/octave. How does this slope differ sonically from standard 24dB/octave designs, and why is it significant for acid bass?
- A) No difference
- B) Slightly gentler than 24dB; retains more harmonics above cutoff creating less aggressive rolloff but still steep enough for dramatic resonance sweeps - unique "squelchy" character
- C) 18dB is steeper than 24dB
- D) Slope doesn't affect acid bass

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 5
You're creating a subtractive string sound. Why is PWM (pulse width modulation) essential, and what sonic element does it replace?
- A) PWM isn't used for strings
- B) PWM creates chorus-like movement and thickness; replaces need for multiple detuned oscillators - achieves lush analog string character efficiently
- C) Only adds volume
- D) Sawtooth waves are better for strings

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 6
Compare two subtractive approaches for brass: (A) Two sawtooths, filter cutoff 2kHz, high resonance; (B) One saw + one square, filter 1.5kHz, moderate resonance. Analyze the timbral differences.
- A) Identical sounds
- B) A: brighter, more harmonics, aggressive resonance peak; B: hollow woody character from square, warmer overall, smoother resonance - approach B more natural for brass
- C) B is always wrong
- D) Waveform choice doesn't matter

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 7
Why does resonance cause volume peaks at the cutoff frequency, and what's the maximum practical resonance level before self-oscillation?
- A) Resonance doesn't affect volume
- B) Positive feedback in filter circuit boosts frequencies at cutoff; typically ~90-95% on most analog filters before self-oscillation begins at 100%
- C) Resonance always causes self-oscillation
- D) Self-oscillation occurs at 50%

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 8
Calculate the filter cutoff sweep range needed to move from bass (fundamental at 80Hz) to lead brightness (maintaining clarity to 4kHz). Design envelope times for smooth transition.
- A) Fixed cutoff works for all
- B) Sweep range: 200Hz-5kHz; Envelope: A:20-50ms, D:200-400ms modulating filter from fully open to partial close; creates dynamic brightness evolution
- C) Filters don't need to sweep
- D) 80Hz cutoff for everything

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 9
Why is the Curtis filter (Prophet-5) described as "clean and precise" versus Moog's "warm and fat"? Analyze the circuit design implications.
- A) No sonic difference
- B) Curtis: less harmonic distortion, sharper resonance, more linear response; Moog: transformer coupling, tube-like saturation in ladder, resonance affects neighboring frequencies - creates warmth
- C) Prophet-5 doesn't have a filter
- D) Only marketing differences

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
Design a subtractive lead that cuts through a dense mix. Specify oscillator count/waveforms, filter parameters, and explain the frequency range emphasis.
- A) Dark bass-focused patch
- B) OSC: 2-3 detuned saws; Filter: LP at 2-4kHz, moderate resonance; emphasizes 1-4kHz presence range - cuts through without excessive brightness
- C) Single sine wave
- D) High-pass filter only

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

---

# SUBJECT 8: ADDITIVE & FM SYNTHESIS (10 Questions)

### Question 1
In additive synthesis, you're building a complex tone with 16 partials. Calculate the CPU load increase compared to 8 partials, and explain why additive is CPU-intensive.
- A) No CPU increase
- B) Approximately 2× CPU load; each partial requires independent oscillator, envelope, frequency/amplitude calculation - multiplicative resource usage
- C) Same CPU for any number of partials
- D) 16 partials uses less CPU

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 2
Design an additive bell sound: specify the first 8 partial frequencies (as ratios to fundamental) and their relative amplitudes. Why are these ratios non-integer?
- A) All ratios should be integers
- B) Typical bell ratios: 1, 2.4, 3.8, 5.2, 7.1, 9.3, etc.; non-integer creates inharmonic, bell-like metallic character; amplitudes decreasing
- C) Bells use integer harmonics only
- D) Ratios don't affect timbre

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 3
In FM synthesis, carrier is 440Hz, modulator is 660Hz (ratio 3:2). Calculate the first four sidebands and explain whether the result is harmonic or inharmonic.
- A) No sidebands created
- B) Sidebands at 440±660Hz intervals: 440Hz, 1100Hz, -220Hz, 1760Hz; non-integer ratio creates inharmonic, complex timbre
- C) All frequencies are harmonic
- D) Only carrier frequency matters

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 4
A DX7 algorithm has 6 operators in series (Op1→Op2→Op3→Op4→Op5→Op6). How does this differ sonically from 6 operators in parallel, and why?
- A) Identical sound
- B) Series: cascading modulation creates complex, evolving harmonics; Parallel: additive mixing of simple FM pairs - cleaner, more predictable
- C) Series is quieter
- D) Algorithm doesn't affect sound

**Answer: B**

**Expert Explanation:** FM synthesis uses frequency modulation for complex metallic tones.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 5
Calculate the modulation index needed to create approximately 6 significant sidebands in FM synthesis. What does this number represent physically?
- A) Index of 1 creates 6 sidebands
- B) Index ≈ 6; represents modulation depth as ratio to modulator frequency
- C) Sidebands are unrelated to index
- D) Index must be 0

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 6
Why does FM synthesis with integer ratios (1:1, 2:1, 3:1) create harmonic tones, while non-integer ratios (3.5:1, 2.7:1) create inharmonic/bell-like tones?
- A) Ratios don't affect harmonic structure
- B) Integer ratios: sidebands align with harmonic series creating musical tones; Non-integer: sidebands create complex, non-harmonic frequencies - bell/metallic character
- C) All FM is inharmonic
- D) Only carrier matters

**Answer: B**

**Expert Explanation:** The 3:1 Rule helps minimize phase cancellation by keeping adequate distance between microphones.
**Image:** !["Diagram"](/images/svg/3_to_1_rule_diagram.svg)
**Expert Quote:** "Terms like 3:1 are fundamental. - Dictionary"




---

### Question 7
In additive synthesis, you want to recreate the vowel sound "EE". Design the formant structure: specify 3 prominent frequency regions and their relative amplitudes.
- A) Flat spectrum
- B) F1: ~300Hz, F2: ~2200Hz, F3: ~3000Hz; F2 prominence creates "EE" character
- C) Single frequency only
- D) Vowels can't be synthesized additively

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
A DX7 electric piano patch uses a 2:1 carrier/modulator ratio. Explain why this specific ratio creates piano-like attack, and what modulation envelope shape is critical.
- A) 2:1 ratio doesn't matter
- B) 2:1 creates octave-related sidebands; fast attack, quick decay on modulator envelope creates bright harmonic attack that quickly softens - mimics hammer strike
- C) Any ratio works equally
- D) Electric pianos don't use FM

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 9
Calculate the theoretical number of oscillators needed to accurately recreate a sawtooth wave using additive synthesis to 10kHz (from 100Hz fundamental).
- A) 10 oscillators
- B) 100 oscillators; demonstrates why additive is impractical for complex waveforms compared to subtractive
- C) 5 oscillators sufficient
- D) Impossible to calculate

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 10
In FM synthesis, feedback of an operator modulating itself creates what sonic effect, and why is it significant for DX7 bass sounds?
- A) No effect
- B) Creates noise-like, raspy harmonic complexity; essential for aggressive FM bass tones and metallic timbres - adds brightness and dirt
- C) Feedback isn't possible
- D) Only affects volume

**Answer: B**

**Expert Explanation:** FM synthesis uses frequency modulation for complex metallic tones.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

---

# SUBJECT 9: WAVETABLE & GRANULAR SYNTHESIS (10 Questions)

### Question 1
A wavetable contains 256 single-cycle waveforms. At a scan position of 50%, with linear interpolation between frames, calculate the effective waveform if position 128 is sawtooth and position 129 is square.
- A) Only sawtooth
- B) 50/50 blend of sawtooth and square; interpolation creates hybrid waveform with characteristics of both
- C) Only square
- D) Interpolation creates silence

**Answer: B**

**Expert Explanation:** Wavetables allow evolving timbres.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 2
In Serum, you're scanning through a wavetable at 0.2Hz LFO rate. The wavetable has 256 frames. Calculate how long one complete scan takes, and how many waveforms are traversed per second.
- A) Instant traversal
- B) 5 seconds per complete scan; ~51 frames per second; slow, evolving timbral morphing
- C) 0.2 seconds total
- D) Scan rate doesn't affect time

**Answer: B**

**Expert Explanation:** Low Frequency Oscillators modulate parameters to create movement.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Terms like lfo are fundamental. - Dictionary"




---

### Question 3
Granular synthesis uses 50ms grains at 50% density (50 grains/second). Calculate the temporal overlap and explain why this prevents gaps in the audio.
- A) No overlap
- B) Overlap = 25ms; grains overlap creating continuous smooth texture without gaps
- C) Complete overlap
- D) Density doesn't affect overlap

**Answer: B**

**Expert Explanation:** Wavetables allow evolving timbres.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 4
You're time-stretching audio by 300% using granular synthesis with fixed grain pitch. If the original is 2 seconds, calculate the resulting duration and explain the mechanism.
- A) Still 2 seconds
- B) 6 seconds; grains extracted at original pitch but spacing/density adjusted to extend time - pitch unchanged, duration tripled
- C) 0.67 seconds
- D) Time-stretching impossible

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 5
A wavetable oscillator plays back at 440Hz. The wavetable is scanned at audio rate (10Hz to 10kHz). At what scan rate does the effect transition from timbral modulation to perceivable rhythmic pulsing?
- A) All rates sound the same
- B) Below ~15-20Hz: heard as timbre change; 20-40Hz: rhythmic/tremolo-like; above 40Hz: complex AM/ring mod effects
- C) Only 440Hz matters
- D) Scan rate doesn't affect sound

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 6
Calculate the Nyquist requirement for a wavetable containing waveforms with harmonic content to 12kHz. What sample rate is needed for the wavetable itself?
- A) 12kHz sample rate
- B) Minimum 24kHz; wavetable must be sampled at least at Nyquist to avoid aliasing when playing back high harmonics
- C) Sample rate doesn't matter
- D) 48kHz always used

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 7
In granular synthesis, you want a smooth, non-grainy texture. Design optimal parameters: grain size, density, and randomization.
- A) Small grains, low density, high randomization
- B) Large grain size, high density, low randomization - creates smooth, pad-like texture
- C) Grain parameters don't affect texture
- D) Granular always sounds grainy

**Answer: B**

**Expert Explanation:** Wavetables allow evolving timbres.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
A wavetable position is modulated by envelope: starts at position 0%, sweeps to 100% over 2 seconds. If wavetable has 128 frames, calculate the frame traversal rate.
- A) Random rate
- B) 64 frames/second; smooth, sweeping timbral evolution from first to last waveform
- C) 128 frames/second
- D) Position doesn't affect frames

**Answer: B**

**Expert Explanation:** Wavetables allow evolving timbres.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
You're creating glitchy textures with granular synthesis. Design parameters for maximum chaos: grain size, density, spray (randomization), and pitch variance.
- A) Large grains, no randomization
- B) Tiny grains, variable density, high spray, pitch variance - creates scattered, glitchy character
- C) Smooth parameters only
- D) Chaos can't be controlled

**Answer: B**

**Expert Explanation:** Wavetables allow evolving timbres.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
Why is wavetable synthesis more CPU-efficient than additive synthesis for creating complex timbres, despite both being "sample-based"?
- A) Additive is more efficient
- B) Wavetable uses single oscillator reading pre-calculated waveforms; additive requires dozens of real-time oscillators - wavetable is O complexity vs. O for additive
- C) Same CPU usage
- D) Wavetable uses more CPU

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

---

# SUBJECT 10: PHYSICAL MODELING & SAMPLING (10 Questions)

### Question 1
A physical modeling string algorithm simulates a 50cm string at 440Hz. Calculate the wave propagation time along the string and back, and explain how this relates to the fundamental frequency.
- A) Instant propagation
- B) T = 1/440Hz ≈ 2.27ms; wave travels string length and reflects, taking one period - this defines pitch in physical modeling
- C) Propagation doesn't affect pitch
- D) 50cm doesn't relate to frequency

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
In Kontakt, a piano sample library uses 12 velocity layers across 88 keys. Calculate the total number of samples required if both sustain and release samples are captured for each note/velocity combination.
- A) 88 samples
- B) 2,112 samples; demonstrates why professional sample libraries are large
- C) 100 samples
- D) Velocity layers don't multiply sample count

**Answer: B**

**Expert Explanation:** Release is the time it takes for the processor to return to a neutral state.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like release are fundamental. - Dictionary"




---

### Question 3
Physical modeling of a clarinet uses a closed-pipe model. Why does this naturally produce only odd harmonics, matching the actual instrument?
- A) Clarinet has all harmonics
- B) Closed pipe has node at closed end, antinode at open end; boundary conditions only support odd harmonics - matches real clarinet physics
- C) Physical modeling doesn't simulate harmonics
- D) Only even harmonics are produced

**Answer: B**

**Expert Explanation:** Physical modeling simulates real instrument acoustics.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 4
A sample-based piano library records release samples (string resonance after key release). Why is this essential for realism, and how much storage does it add?
- A) Release samples are unnecessary
- B) Captures natural string decay/damper resonance; roughly doubles storage; critical for realistic piano behavior
- C) Adds no storage
- D) Only attacks matter for pianos

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 5
In physical modeling, bow pressure on a violin is modeled as excitation force. Calculate the relationship between pressure parameter (0-100%) and harmonic content brightness.
- A) No relationship
- B) Higher pressure: more stick-slip cycles, increased higher harmonics; Low pressure: smoother excitation, fewer harmonics - non-linear relationship
- C) Pressure only affects volume
- D) All pressures sound identical

**Answer: B**

**Expert Explanation:** Physical modeling simulates real instrument acoustics.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 6
A multisampled instrument has round-robin samples (4 variations per note). Calculate the number of repeated notes before the pattern repeats, and explain the anti-machine-gun advantage.
- A) Repeats immediately
- B) 4 notes before repeat; prevents mechanical repetition artifact - each repeat sounds slightly different, mimicking natural performance variation
- C) Pattern never repeats
- D) Round-robin doesn't affect repetition

**Answer: B**

**Expert Explanation:** Physical modeling simulates real instrument acoustics.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 7
Physical modeling synthesizes a trumpet with bore length 137cm and sound speed 343m/s. Calculate the fundamental frequency and compare to real trumpet range (165-988Hz).
- A) Bore length doesn't determine pitch
- B) λ = 4 × 0.137m = 0.548m; f = 343/0.548 ≈ 626Hz; matches trumpet's mid-range - player varies effective length with valves
- C) Random frequency
- D) Physical modeling can't calculate pitch

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
Why do professional orchestral sample libraries often exceed 100GB in size? Calculate storage for a violin library with 60 articulations, 4 dynamics, 4 round-robins, across 72 notes.
- A) Sample libraries should be under 1GB
- B) 60 × 4 × 4 × 72 = 69,120 samples; at ~1-2MB per sample with lossless compression ≈ 70-140GB; multiple instruments create massive libraries
- C) Size is random
- D) Compression eliminates all storage needs

**Answer: B**

**Expert Explanation:** Physical modeling simulates real instrument acoustics.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
In granular sampling, you're extracting grains from a 10-second source at random positions with 20ms grains. Calculate the theoretical number of unique grain start positions at 48kHz sample rate.
- A) 10 positions
- B) 480,000 positions; nearly infinite grain variation creates rich, complex textures from single source
- C) 48 positions
- D) Position doesn't affect sound

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 10
Physical modeling simulates acoustic guitar body resonance with multiple resonant modes at 100Hz, 250Hz, 400Hz. Design a bank of filters to approximate this in subtractive synthesis.
- A) One filter sufficient
- B) Three band-pass or parametric EQ bands at 100Hz, 250Hz, 400Hz with appropriate gain - simulates body formants
- C) Physical modeling can't be approximated
- D) Low-pass filter only needed

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

---

# SUBJECT 11: VECTOR & PHASE DISTORTION SYNTHESIS (10 Questions)

### Question 1
In vector synthesis, four sources (A, B, C, D) are positioned at corners. Joystick is at position (75%, 25%) in X/Y space. Calculate the mix percentages of each source.
- A) A: 100%, others: 0%
- B) A: 18.75%, B: 56.25%, C: 6.25%, D: 18.75%, B=X, C=Y, D=XY)
- C) All equal at 25%
- D) Only two sources play

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
You're recording joystick automation in vector synthesis over an 8-second evolving pad. The recording is at 48kHz control rate. Calculate the number of discrete X/Y positions stored.
- A) 8 positions
- B) 384,000 positions; high-resolution capture of continuous gestural performance
- C) 48 positions
- D) Vector doesn't record automation

**Answer: B**

**Expert Explanation:** Advanced synthesis creates unique textures.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
In phase distortion synthesis, a sine wave stored in wavetable is read with variable phase increment. How does doubling the phase increment rate affect the output frequency and harmonic content?
- A) No change
- B) Frequency doubles; non-linear phase reading creates harmonics not present in original sine wave - basis of phase distortion
- C) Only volume changes
- D) Phase doesn't affect frequency

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
A Prophet VS uses vector synthesis with four DCOs. Each DCO has sawtooth, square, and pulse waveforms. Calculate the total number of unique timbre combinations available through vector mixing alone.
- A) 4 combinations
- B) Infinite combinations
- C) 12 combinations
- D) Vector doesn't create unique timbres

**Answer: B**

**Expert Explanation:** Advanced synthesis creates unique textures.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 5
Phase distortion's "resonance" parameter alters the phase reading curve. Compare a linear phase reading (standard) to an exponential reading in terms of harmonic generation.
- A) Identical harmonics
- B) Linear: gentle harmonic addition; Exponential: more dramatic high-frequency content similar to filter resonance - creates brighter, more aggressive tones
- C) Exponential removes harmonics
- D) Phase curves don't affect timbre

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 6
In vector synthesis, you're creating a gradual transition from source A (sine) to source D (noise) over 4 seconds. Design the X/Y automation path and calculate the transition rate.
- A) Instant switch
- B) Path: → over 4s; transition rate = 25% per second per axis; creates smooth morph from pure tone to noise
- C) Sources can't transition smoothly
- D) Only one source can play

**Answer: B**

**Expert Explanation:** Advanced synthesis creates unique textures.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 7
Calculate the phase distortion needed to create a sawtooth-like harmonic series from a stored sine wave, and explain why this is more memory-efficient than storing the sawtooth directly.
- A) Phase distortion can't create sawtooth spectrum
- B) Linear→steep phase ramp; stores only sine wave but generates multiple harmonics through phase manipulation - saves wavetable memory
- C) Storing sawtooth is more efficient
- D) Harmonics can't be created from phase

**Answer: B**

**Expert Explanation:** Advanced synthesis creates unique textures.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
In a Korg Wavestation, vector synthesis combines with wave sequencing. You have 4 sources, each with 32-frame wavetables. Calculate the total unique waveform combinations available.
- A) 4 combinations
- B) 128 direct waveforms plus infinite vector interpolations between them = massive timbral palette
- C) 32 combinations
- D) Wavestation doesn't use wavetables

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
Phase distortion's window parameter controls the duration of phase acceleration. For creating bell-like attacks, should the window be narrow or wide, and why?
- A) Window doesn't affect sound
- B) Narrow window: brief harmonic burst - mimics bell strike with quick harmonic fade
- C) Wide window is always better
- D) Phase distortion can't create bells

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
Design a vector synthesis patch that creates a 16-second evolving soundscape: specify four contrasting sources and describe the optimal X/Y automation path.
- A) Static position only
- B) Sources: A=sine bass, B=sawtooth lead, C=noise pad, D=PWM strings; Path: start for blend, circular motion 0.25Hz creates rotating timbres, evolving textures
- C) Vector can't create soundscapes
- D) One source sufficient

**Answer: B**

**Expert Explanation:** Advanced synthesis creates unique textures.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

---

# SUBJECT 12: PERFORMANCE CONTROLS & CLASSIC SYNTHS (10 Questions)

### Question 1
Calculate the MIDI resolution of velocity (7-bit = 128 steps) versus pitch bend (14-bit = 16,384 steps). Why is this difference significant for expression?
- A) Same resolution
- B) Velocity: 128 steps; Pitch bend: 16,384 steps; pitch requires fine control for musicality, velocity less critical
- C) Velocity has higher resolution
- D) Resolution doesn't affect expression

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 2
Polyphonic aftertouch allows independent pressure per key. In a 5-note chord, calculate the number of independent pressure control streams compared to channel aftertouch.
- A) Both provide 1 stream
- B) Polyphonic: 5 independent streams; Channel: 1 stream; 5× expressive capability
- C) Aftertouch doesn't work in chords
- D) No difference

**Answer: B**

**Expert Explanation:** Performance controls make synths expressive.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
The Minimoog has 3 VCOs per voice (monophonic). Why doesn't this mean 3-note polyphony, and what's the sonic advantage of this architecture?
- A) It does provide polyphony
- B) All 3 VCOs produce the same note; creates massive, thick monophonic sound through oscillator stacking - defines Moog bass character
- C) Only one VCO works
- D) Architecture doesn't affect sound

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 4
The DX7's 16-voice polyphony at 6 operators each requires how many oscillator calculations simultaneously? Compare to a 5-voice Prophet-5 with 2 oscillators per voice.
- A) Same calculations
- B) DX7: 96 operators; Prophet-5: 10 oscillators; DX7 requires nearly 10× the oscillator calculations - demonstrates FM efficiency despite higher computational load
- C) Prophet-5 requires more
- D) Operators and oscillators aren't comparable

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 5
Calculate the pitch bend range needed to achieve a perfect fifth bend (7 semitones) upward from C4 to G4, and design a performance technique using this.
- A) ±2 semitones sufficient
- B) Range: ±7 semitones; Technique: strike C4 with wheel down, quickly bend up to G4 - guitar-style lead articulation
- C) Pitch bend can't reach perfect fifth
- D) Range doesn't affect bends

**Answer: B**

**Expert Explanation:** Performance controls make synths expressive.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 6
The TB-303 sequencer has 16 steps with accent and slide parameters. Calculate the maximum unique pattern variations considering: note (12 chromatic notes), accent (on/off), slide (on/off) per step.
- A) 16 variations
- B) 48 options per step; 48^16 = astronomical variations - explains TB-303's endless creative potential
- C) 12 variations
- D) Pattern variations are limited

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 7
Compare the Jupiter-8's 8-voice architecture to the Prophet-5's 5-voice. For playing thick pads with 5-note chords, what's the advantage of the Jupiter-8?
- A) No advantage
- B) Jupiter-8: 3 extra voices for layering/doubling notes creating lusher pads; Prophet-5: exactly matched to chord size
- C) Prophet-5 has more voices
- D) Voice count doesn't affect pads

**Answer: B**

**Expert Explanation:** Performance controls make synths expressive.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
The Prophet-5's 40 patch memory was revolutionary in 1978. Calculate the storage requirement per patch (approximate) if each parameter (100 parameters) is stored as 8-bit values.
- A) 1MB per patch
- B) ~100 bytes per patch; 40 patches = 4KB total; minimal by today's standards but groundbreaking for 1978
- C) 1KB per patch
- D) Patch memory doesn't use storage

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
Velocity affects both amp and filter on a typical synth. Design a velocity response curve where pianissimo (velocity 20) produces a dark, quiet sound, while fortissimo (velocity 120) is bright and loud. Calculate the dynamic range.
- A) Velocity doesn't create dynamic range
- B) Velocity 20: ~-20dB amp, filter at 30% cutoff; Velocity 120: 0dB amp, filter at 100%; Dynamic range: ~20dB; brightness range: 70% cutoff sweep
- C) All velocities sound identical
- D) 10dB range maximum

**Answer: B**

**Expert Explanation:** Dynamic range is the ratio between the largest and smallest values that a changeable quantity can assume.
**Image:** !["Diagram"](/images/svg/dynamic_range_concept.svg)
**Expert Quote:** "Terms like dynamic range are fundamental. - Dictionary"




---

### Question 10
Why was the DX7's price ($1,995 in 1983) revolutionary compared to the Prophet-5 ($3,995 in 1978)? Calculate the inflation-adjusted comparison.
- A) DX7 was more expensive
- B) Prophet-5 1978: ~$16,000 in 1983 dollars; DX7: $1,995; digital manufacturing and LSI chips made DX7 ~8× cheaper despite more features - democratized synthesis
- C) Same price adjusted
- D) Price doesn't affect market impact

**Answer: B**

**Expert Explanation:** The ADSR envelope shapes a sound's amplitude over time (Attack, Decay, Sustain, Release).
**Image:** !["Diagram"](/images/svg/synth_adsr.svg)
**Expert Quote:** "Terms like adsr are fundamental. - Dictionary"




---

---

## SCORING GUIDE - ADVANCED LEVEL

- **108-120 correct (90-100%):** Outstanding - Professional level understanding
- **96-107 correct (80-89%):** Excellent - Strong degree-level knowledge
- **84-95 correct (70-79%):** Good - Competent degree-level understanding
- **72-83 correct (60-69%):** Satisfactory - Basic degree-level, needs reinforcement
- **Below 72 correct (<60%):** Needs significant study - Review fundamentals

---

## ADVANCED LEVEL CHARACTERISTICS

These questions require:
- **Quantitative analysis** using mathematics and calculations
- **Multi-variable problem solving** with real-world constraints
- **Deep technical understanding** of synthesis principles
- **Professional-level optimization** and decision-making
- **Synthesis** of multiple concepts simultaneously
- **Calculation** of acoustic parameters and relationships

---

## SUBJECT BREAKDOWN

1. **Basic Synthesis Components** - Questions 1-10
2. **Basic Waveforms** - Questions 11-20
3. **Special Waveforms & Oscillators** - Questions 21-30
4. **Filter Types** - Questions 31-40
5. **ADSR Envelope** - Questions 41-50
6. **Modulation Types** - Questions 51-60
7. **Subtractive Synthesis** - Questions 61-70
8. **Additive & FM Synthesis** - Questions 71-80
9. **Wavetable & Granular Synthesis** - Questions 81-90
10. **Physical Modeling & Sampling** - Questions 91-100
11. **Vector & Phase Distortion** - Questions 101-110
12. **Performance & Classic Synths** - Questions 111-120

---

*Music Tech Dictionary - Volume 3: Synthesis*
*Advanced Level (Degree) Complete - All 12 Subjects*
*© 2024 - Educational Use*
