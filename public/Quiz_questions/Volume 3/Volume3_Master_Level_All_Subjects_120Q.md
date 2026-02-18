# Music Tech Dictionary - Volume 3: Synthesis
## MASTER/EXPERT LEVEL (Professional/Guru) - Complete Quiz by Subject
### 10 Questions Per Subject - 120 Questions Total

---

# SUBJECT 1: BASIC SYNTHESIS COMPONENTS (10 Questions)

### Question 1
A VCO uses an exponential converter with temperature compensation circuit. The base temperature coefficient is -3500ppm/°C, but compensation reduces it to -50ppm/°C. Over a 15°C temperature excursion from calibration, an oscillator tuned to A4 (440Hz) drifts by what frequency and cents, and what's the compensation circuit's effectiveness percentage?
- A) ±3.3Hz, ±13 cents, 98.6% effective
- B) ±3.3Hz, ~±1.3 cents; compensation effectiveness =/3500 = 98.57%
- C) ±0.33Hz, ±0.13 cents, 50% effective
- D) No drift with compensation

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 2
Design a discrete transistor VCF using BJT transconductance. Given β=200, IC=1mA, VT=26mV at 25°C, calculate the transconductance (gm) and the resulting cutoff frequency with a 10nF integrating capacitor in a state-variable topology.
- A) gm=38.5mS, fc≈613kHz
- B) gm=38.5mS; fc = gm/ = 38.5×10⁻³/ ≈ 613kHz; requires frequency divider for audio range
- C) gm=1mS, fc=1kHz
- D) Cannot calculate without more data

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 3
A digital VCA uses 24-bit fixed-point arithmetic with 16.8 format (16 integer, 8 fractional bits). What's the minimum gain change in dB, and what noise floor does quantization create relative to full scale?
- A) 0.1dB steps, -96dB noise floor
- B) ~0.0352dB minimum; quantization noise floor ≈ -48dB
- C) 1dB steps, -24dB noise floor
- D) Infinite resolution

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 4
You're implementing a Curtis CEM3340 VCO with exponential converter. The converter requires 1V/octave scaling. With a 12-bit DAC (0-5V output) controlling pitch, calculate the frequency resolution at MIDI note 69 (A4, 440Hz) and the maximum frequency span achievable.
- A) ±1Hz resolution, 2 octaves span
- B) Resolution: 5V/4096 = 1.22mV per step; at 440Hz with 1V/oct scaling: 440 × 2^ ≈ 0.37Hz per step; span: 5 octaves
- C) 10Hz resolution, 1 octave span
- D) Infinite resolution

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
An analog envelope generator uses a capacitor charging circuit: C=1μF charging through R=100kΩ (attack) and discharging through R=1MΩ (decay). Calculate actual attack time to 99% of peak voltage and decay time constant. Why is the decay 10× longer despite 10× resistance?
- A) Equal attack and decay times
- B) Attack to 99%: t = -RC×ln ≈ 460ms; Decay τ = 1s; exponential time constant scales linearly with RC
- C) Attack = 100ms, Decay = 100ms
- D) Cannot determine without voltage info

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 6
A digital oscillator uses DDS (Direct Digital Synthesis) with 48-bit phase accumulator, 100MHz system clock, and 24-bit phase-to-amplitude converter. Calculate the frequency resolution and spurious-free dynamic range (SFDR) limitation.
- A) 1Hz resolution, 96dB SFDR
- B) Frequency resolution: 100MHz/2^48 ≈ 0.000355μHz; SFDR limited by 24-bit DAC ≈ 144dB theoretical, ~120dB practical with quantization effects
- C) 100Hz resolution, 48dB SFDR
- D) Infinite resolution, no spurs

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 7
You're cascading four 6dB/octave filter sections to create a 24dB/octave Moog-style ladder filter. Each section has Q=0.5. Calculate the combined filter's phase response at cutoff frequency and explain the resonance circuit's positive feedback requirement for Q enhancement.
- A) -90° phase, no feedback needed
- B) -360° phase shift at cutoff; resonance requires feeding back ~25% with inversion to create positive feedback → Q enhancement
- C) -180° phase, 50% feedback
- D) 0° phase shift

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 8
A voltage-controlled amplifier uses an OTA (Operational Transconductance Amplifier) with linear-in-dB control characteristic. Given 30mV/dB scaling and a desired 60dB gain range, calculate the required control voltage swing and the amplifier's THD at -10dB gain with 1% distortion spec at 0dB.
- A) 1V swing, 1% THD
- B) 1.8V swing; THD at -10dB ≈ 0.32% = 3.16× improvement)
- C) 5V swing, 0.1% THD
- D) 0.6V swing, 10% THD

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 9
An LFO uses a current-controlled integrator (capacitor charged by current source). With C=10μF and Icharge=10μA, calculate the slew rate (dV/dt) and the resulting maximum LFO frequency for a ±5V triangle wave.
- A) 100V/s slew rate, 100Hz max
- B) Slew rate: I/C = 10μA/10μF = 1V/s; for ±5V triangle, period = 10V/ = 10s; fmax = 0.1Hz for full swing
- C) 1V/s, 10Hz max
- D) 10V/s, 1Hz max

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
You're designing a polysynth with 8 voices, each requiring: 2 DCOs (50 MIPS each), 1 DCF (200 MIPS), 2 EGs (30 MIPS each), 1 DCA (20 MIPS). Calculate the total DSP requirement and determine whether a 3GHz single-core processor with 80% efficiency can handle it.
- A) 500 MIPS total, yes
- B) Per voice: 380 MIPS; 8 voices: 3040 MIPS; 3GHz × 0.8 = 2400 MIPS available; INSUFFICIENT by ~21%; requires optimization or multi-core
- C) 8000 MIPS total, no
- D) 100 MIPS total, easily

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

# SUBJECT 2: BASIC WAVEFORMS (10 Questions)

### Question 1
A bandlimited sawtooth is generated using additive synthesis summing 50 harmonics with amplitude 1/n. Calculate the Gibbs phenomenon overshoot percentage at the discontinuity and explain why increasing harmonics doesn't eliminate this artifact.
- A) No overshoot with bandlimiting
- B) ~9% overshoot; persists at discontinuities regardless of harmonic count; only smoothing the transition eliminates it; inherent to Fourier representation of discontinuities
- C) 50% overshoot
- D) 1% overshoot

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 2
Two sawtooth oscillators at 440Hz and 440.5Hz create beating. At what temporal resolution (sample rate) does the beat frequency (0.5Hz) require aliasing consideration if the upper harmonics extend to 20kHz?
- A) 44.1kHz sufficient
- B) 40kHz+ required; beating creates temporal envelope at 0.5Hz, but individual harmonics require 40kHz+ sampling; beat frequency itself doesn't alias, but harmonic aliasing creates artifacts
- C) 1kHz sufficient
- D) Infinite resolution needed

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 3
A pulse wave's Fourier series includes harmonics with amplitude |sin(nπD)/(nπD)| where D is duty cycle and n is harmonic number. For D=0.25, calculate the amplitude of the 4th and 8th harmonics and explain the nulling pattern.
- A) All harmonics equal
- B) 4th harmonic: |sin/π| = 0; 8th harmonic: |sin/2π| = 0; duty cycle D creates nulls at n = 1/D multiples
- C) 4th = 50%, 8th = 25%
- D) Random amplitudes

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
A triangle wave passes through a system with 2nd-order (quadratic) nonlinearity characterized by y = x + 0.1x². Calculate the THD (Total Harmonic Distortion) and identify which new harmonics are generated.
- A) No distortion
- B) 2nd-order nonlinearity generates even harmonics; triangle originally has only odd harmonics; THD ≈ 10%; creates even harmonics at ~10% of fundamental
- C) Only fundamental remains
- D) Infinite harmonics

**Answer: B**

**Expert Explanation:** Waveforms like Sine, Saw, Square determine the basic timbre.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 5
PolyBLEP (Polynomial Bandlimited Step) antialiasing uses 2nd-order polynomial correction around discontinuities. For a sawtooth at 880Hz sampled at 44.1kHz, calculate how many samples require correction per cycle and the CPU overhead vs. naive sawtooth generation.
- A) All samples require correction
- B) ~50 samples per cycle; typically 2-4 samples need PolyBLEP correction per discontinuity; overhead ≈ 4-8%
- C) No samples need correction
- D) 1000 samples per cycle

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 6
Three sawtooth oscillators are detuned logarithmically: 440Hz, 440×2^(7/1200)Hz, 440×2^(14/1200)Hz. Calculate the exact frequencies and the beat frequencies between adjacent pairs. Why does this create a "sweet spot" detuning?
- A) All at 440Hz
- B) 440Hz, 441.77Hz, 443.57Hz; beats: 1.77Hz and 1.80Hz; nearly equal beat frequencies create perceived "chorus" without obvious periodicity - professional detuning method
- C) 440Hz, 445Hz, 450Hz
- D) Random frequencies

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 7
A square wave with 1V amplitude passes through a 12dB/octave high-pass filter at 200Hz. The fundamental is 100Hz. Calculate the output amplitude and phase shift of the fundamental after filtering.
- A) 0V, no phase shift
- B) ~0.447V; phase shift ≈ -135°
- C) 1V, 0° phase
- D) Cannot calculate

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 8
Minblep (Minimum-phase Bandlimited Step) residuals are convolved with a naive waveform for antialiasing. For 8× oversampled generation downsampled to 44.1kHz, what's the effective frequency response limitation and the residual table size for acceptable antialiasing?
- A) No limitation
- B) 8× oversample allows antialiasing to ~20kHz with -80dB rejection; residual table ≈ 256-512 samples for sharp transitions; final downsampling filter determines stopband attenuation
- C) 1kHz limitation
- D) Infinite table size

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 9
A sawtooth wave is amplitude-modulated by itself (self-modulation). Describe the resulting harmonic spectrum and calculate the intermodulation products for the fundamental (f₀) and 2nd harmonic (2f₀).
- A) Unchanged spectrum
- B) Self-modulation creates sum/difference frequencies: f₀×f₀, f₀×2f₀, etc.; rich intermodulation creating clusters at all harmonic positions with sidebands; effectively squared spectrum
- C) Only fundamental remains
- D) White noise results

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
Calculate the crest factor of a waveform created by summing: sawtooth (1V peak) + triangle (0.5V peak) + square (0.3V peak), all at the same frequency and phase. What's the peak output voltage and RMS, assuming worst-case phase alignment?
- A) 1V peak, 0.707V RMS
- B) Peak ≈ 1.8V; RMS ≈ 0.89V ≈ 0.89V); crest factor ≈ 2.02
- C) 2V peak, 1V RMS
- D) Cannot sum different waveforms

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

# SUBJECT 3: SPECIAL WAVEFORMS & OSCILLATORS (10 Questions)

### Question 1
White noise is generated using a linear feedback shift register (LFSR) with maximum-length sequence. For a 24-bit LFSR, calculate the sequence period, the effective bandwidth limitation, and why this creates "pseudo-random" rather than true white noise.
- A) Infinite period, true white noise
- B) Period = 2²⁴-1 ≈ 16.78 million samples; at 48kHz ≈ 5.8 minutes before repeat; spectral notches appear at f/; not truly white but acceptably random for most uses
- C) 24 samples period
- D) 1 second period

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 2
Pink noise (-3dB/octave) is generated by filtering white noise through cascaded first-order filters. Design a 4-stage filter bank with breakpoints at 30Hz, 300Hz, 3kHz, and 15kHz. Calculate the combined frequency response error at 1kHz.
- A) Perfect -3dB/octave
- B) 1kHz falls between 300Hz and 3kHz stages; each stage contributes ~-3dB/decade; combined response ≈ -2.8dB/octave at 1kHz; error ≈ 0.2dB
- C) Flat response at 1kHz
- D) -6dB/octave at 1kHz

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 3
Hard sync with master at 220Hz and slave sweeping from 220Hz to 880Hz creates time-varying waveforms. At slave frequency of 550Hz (2.5:1 ratio), calculate the exact waveshape: how many slave cycles occur before reset, and what's the resulting fundamental frequency?
- A) 2.5 cycles, 550Hz fundamental
- B) 2.5 slave cycles per master period; fundamental = 220Hz; slave creates complex waveform with strong partials at 550Hz and 880Hz; non-integer ratio creates richest timbre
- C) 1 cycle, 220Hz
- D) Random frequency

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 4
A sub-oscillator is implemented digitally using frequency division. Main oscillator is MIDI note 48 (C2, 130.81Hz) as phase accumulator output. What's the bit-shift required for -2 octave sub-oscillator, and what phase resolution artifacts occur?
- A) No bit-shift needed
- B) -2 octaves = divide by 4 = right-shift by 2 bits; phase accumulator loses 2 LSBs of resolution; creates potential stepping artifacts if accumulator isn't sufficiently high resolution
- C) Left-shift by 2
- D) Division creates no artifacts

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 5
Brown noise (-6dB/octave) has power spectral density S(f) = k/f². Calculate the total power in the octave from 1-2kHz relative to the octave from 100-200Hz, and explain why this creates a "rumbling" character.
- A) Equal power in all octaves
- B) Power in octave ∝ ∫df from f1 to f2; ratio = [ln]/[ln] = ln/ln = 1:1... wait, recalculating: Brown is 1/f² so ∫1/f² = -1/f; power ratio =/ = 0.5mW/5mW = 1:10; more power in bass
- C) 10× more power in 1-2kHz
- D) Random distribution

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 6
Implementing hard sync in digital domain requires tracking slave phase reset. At 48kHz sample rate with master = 400Hz and slave = 1100Hz, how many samples occur between resets, and what aliasing considerations apply?
- A) Exactly 120 samples
- B) Master period = 120 samples; slave would complete 2.75 cycles; reset occurs every 120 samples; aliasing: high-frequency partials from sync discontinuity require oversampling or windowing
- C) No aliasing in digital sync
- D) 1 sample between resets

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 7
Pink noise generation using Voss-McCartney algorithm uses multiple binary random generators. For 4-bit output (16 levels), how many generator stages are required, and what's the resulting frequency response error?
- A) 1 stage, perfect response
- B) 4 stages; each stage updates at different rates; creates approximate -3dB/octave with ±1dB ripple; computationally efficient but not perfect
- C) 16 stages
- D) 100 stages

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 8
A sub-oscillator at -1 octave (220Hz) is mixed with a main oscillator (440Hz). Both are pulse waves at 25% duty cycle. Calculate the combined harmonic spectrum and identify which harmonics are emphasized by the constructive interference.
- A) Random harmonics emphasized
- B) Common harmonics: 220, 440, 660, 880, 1100, 1320, 1540, 1760...; 25% duty cycle nulls every 4th harmonic, so 880Hz, 1760Hz canceled; emphasizes 220, 440, 660, 1100, 1320, 1540...
- C) All harmonics equal
- D) Only fundamental

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 9
Digital hard sync creates discontinuities that require PolyBLEP correction. For master = 440Hz, slave = 1100Hz at 192kHz sample rate, how many PolyBLEP corrections occur per second, and what's the CPU overhead?
- A) 440 corrections/sec, 0.1% overhead
- B) 440 corrections/sec; at 192kHz = 436 samples per master cycle; ~2-4 samples need PolyBLEP per correction; overhead ≈ 0.5-1%
- C) 1100 corrections/sec
- D) No corrections needed

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 10
Generating noise using a SHA-256 hash function for true randomness vs. LFSR pseudo-randomness. Calculate the entropy difference and explain why hashing is computationally impractical for real-time synthesis at 48kHz.
- A) Same entropy, equal performance
- B) SHA-256: 256 bits true entropy per hash; LFSR: log₂ bits pseudo-entropy; SHA-256 requires ~500-1000 CPU cycles per hash; at 48kHz = 48M+ cycles/sec just for noise = impractical; LFSR: ~10 cycles per sample
- C) Hash is faster
- D) No entropy difference

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

# SUBJECT 4: FILTER TYPES (10 Questions)

### Question 1
A Moog ladder filter achieves 24dB/octave using 4 cascaded low-pass stages. Each stage is a one-pole RC filter with identical cutoff frequencies. Calculate the actual -3dB point of the cascaded system compared to individual stage cutoff, and explain the frequency warping.
- A) Same as individual stage
- B) Combined -3dB point ≈ 0.435× individual stage cutoff; frequency warping due to cascaded Q factors; requires pre-warping in design to achieve target cutoff
- C) 4× individual cutoff
- D) No warping occurs

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 2
A state-variable filter with resonance uses positive feedback. The feedback gain is k. At resonance = 100%, calculate the required feedback coefficient for self-oscillation with a 4-pole filter having -24dB/octave natural rolloff.
- A) k = 0.5
- B) k ≈ 0.96-0.98
- C) k = 1.0 exactly
- D) k = 0.25

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 3
A digitally-controlled analog filter (DCAF) uses OTA-C topology with programmable transconductance. Given target cutoff range 20Hz-20kHz with 1Hz resolution at the low end, calculate the required DAC resolution for transconductance control assuming exponential scaling.
- A) 8-bit sufficient
- B) 12-14 bit minimum
- C) 16-bit required
- D) 6-bit sufficient

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 4
A comb filter with delay time T creates notches at f = (2n+1)/(2T) and peaks at f = n/T. For T = 10ms, calculate the notch and peak frequencies, and design a modulation scheme where LFO varies T from 5-15ms at 0.5Hz. What's the notch movement range?
- A) Static frequencies
- B) At T=10ms: notches at 50, 150, 250Hz...; peaks at 100, 200, 300Hz...; with 5-15ms modulation: notches sweep 33-100Hz, 100-300Hz; 0.5Hz LFO creates phaser-like sweep
- C) No modulation possible
- D) Random frequencies

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 5
A 24dB/octave Linkwitz-Riley crossover at 2kHz splits a signal into low-pass and high-pass outputs. Calculate the phase relationship between outputs at the crossover frequency and verify the "acoustic summation" property.
- A) 0° phase difference
- B) ±180° phase difference at crossover; LR24: outputs algebraically sum flat but phase-inverted; acoustic summation maintains flatness; -6dB at crossover per output
- C) ±90° phase difference
- D) Random phase

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
Design a formant filter bank for vowel synthesis: F1=700Hz (Q=5), F2=1200Hz (Q=10), F3=2500Hz (Q=8). Calculate the required gain compensation for each formant to achieve natural vowel loudness perception, considering equal-loudness curves.
- A) Equal gain for all formants
- B) F1: 0dB reference; F2: -3dB; F3: -6dB; approximates Fletcher-Munson curves; Q values affect bandwidth, not loudness
- C) F3 loudest
- D) No compensation needed

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 7
A multimode filter uses current-controlled integrators in a state-variable configuration. Calculate the THD when the filter is self-oscillating at 1kHz with 2V peak output, given the OTA has 1% THD at 1mA output current and 38.5mS transconductance.
- A) 0% THD
- B) ~1.5-2% THD; self-oscillation relies on OTA nonlinearity for amplitude limiting; THD increases with output level; additional distortion from OTA saturation mechanisms
- C) 10% THD
- D) 0.1% THD

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 8
A digital biquad filter in Direct Form I has cutoff at fc = 1kHz with Q = 10 at fs = 48kHz sample rate. Calculate the required coefficient precision (bit depth) to avoid coefficient quantization artifacts causing unstable high-Q behavior.
- A) 8-bit sufficient
- B) 16-bit minimum
- C) 32-bit required
- D) 4-bit sufficient

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 9
An analog filter using switched-capacitor technique has clock frequency fc = 100kHz and sampling capacitor Cs = 10pF. Calculate the equivalent resistor value and the achievable filter cutoff frequency range for practical capacitor ratios (1:1 to 100:1).
- A) Cannot determine equivalent R
- B) Req = 1/ = 1/ = 1MΩ; cutoff range with 1:1 to 100:1 ratios: ~159Hz to 15.9kHz with variable C ratios)
- C) Req = 1kΩ
- D) Infinite cutoff range

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
A phase-corrected Moog ladder filter uses feedforward paths to linearize phase response. Calculate the required feedforward gains from each of the 4 stages to the output to achieve approximately linear phase ±5° from 20Hz-5kHz with fc = 10kHz.
- A) No feedforward needed
- B) Approximate gains: stage 1: 0.1, stage 2: 0.3, stage 3: 0.5, stage 4: 1.0; creates all-pass-like phase compensation; complex iterative design requiring simulation; sacrifices some rolloff steepness
- C) Equal gains for all stages
- D) Linear phase impossible in analog filter

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

---

# SUBJECT 5: ADSR ENVELOPE (10 Questions)

### Question 1
An envelope generator uses a logarithmic DAC with 12-bit resolution controlling a current source that charges a capacitor. Calculate the voltage resolution at the peak (12V) vs. at 1% of peak (0.12V), and explain why this creates more accurate quiet dynamics.
- A) Same resolution throughout range
- B) Log DAC: equal percentage steps; at 12V: step ≈ 0.17%; at 0.12V: step still ≈ 0.17%; provides ~72dB dynamic range with perceptually equal steps; superior to linear DAC for envelopes
- C) Worse resolution at low levels
- D) Random resolution

**Answer: B**

**Expert Explanation:** Dynamic range is the ratio between the largest and smallest values that a changeable quantity can assume.
**Image:** !["Diagram"](/images/svg/dynamic_range_concept.svg)
**Expert Quote:** "Terms like dynamic range are fundamental. - Dictionary"




---

### Question 2
You're designing a digital envelope with sample rate 48kHz. Attack time is 100ms. For a linear ramp, calculate how many distinct output levels are available, and determine the minimum bit depth to avoid audible zipper noise during fast attacks (<10ms).
- A) 48 levels, 8-bit sufficient
- B) 100ms × 48kHz = 4800 samples = 4800 discrete levels for linear ramp; for <10ms attacks: 480 samples; requires 16-bit output resolution to avoid zipper noise; lower bit depths create audible steps
- C) 100 levels, 4-bit sufficient
- D) Infinite levels

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 3
An exponential decay envelope has time constant τ = 100ms. Calculate the time required to reach -60dB (1/1000 voltage) and -96dB (1/63096 voltage). Why is -96dB significant for 16-bit systems?
- A) -60dB at 100ms, -96dB at 200ms
- B) -60dB: t = τ × ln ≈ 691ms; -96dB: t = τ × ln ≈ 1109ms; -96dB is 16-bit LSB noise floor; envelope must decay to this level for true silence
- C) Both at 100ms
- D) Instant decay

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 4
A velocity-sensitive envelope has attack time modulation: vel 0 = 500ms, vel 127 = 5ms. The relationship is exponential: T_attack = T_max × 2^(-vel/k). Calculate k for this response, and determine the attack time at vel = 64.
- A) k = 12.7, T = 250ms
- B) k ≈ 19.3; k = -127/log₂ ≈ 19.3); at vel 64: T = 500 × 2^ ≈ 50ms; exponential scaling creates musical response
- C) Linear scaling only
- D) k = 127

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 5
An envelope controls both VCA and VCF with different scaling. VCA receives envelope × 1.0 (0-12V range), VCF receives envelope × 0.5 (0-6V range). With attack = 50ms linear ramp, calculate the delay between VCA and VCF reaching their 50% points.
- A) No delay
- B) No delay - both reach 50% simultaneously; scaling affects amplitude, not timing
- C) 25ms delay
- D) 50ms delay

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 6
A multi-stage envelope with 8 segments must store time and level for each. Using 16-bit time (max 65535ms), 12-bit level (4096 steps), calculate total memory per envelope and the memory requirement for 128 MIDI voices with 2 envelopes each.
- A) 16 bytes per voice total
- B) Per envelope: 8 segments × = 8 × 28bits = 224 bits = 28 bytes; 128 voices × 2 envelopes = 7168 bytes ≈ 7KB total for envelope data
- C) 1KB total
- D) 1MB total

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 7
An envelope uses a charging capacitor (C = 1μF) with programmable current source (I = 1-1000μA). Calculate the attack time range assuming 0-10V swing, and determine the current value needed for 50ms attack.
- A) 10ms-10s range, 200μA for 50ms
- B) t = CV/I; range:/1000μA = 10ms to/1μA = 10s; for 50ms: I = CV/t = 200μA
- C) 1ms-1s range, 100μA for 50ms
- D) Cannot calculate without more data

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 8
An ADSR envelope generates control voltages for pitch modulation. With pitch sensitivity of 1V/octave, the envelope provides 0-5V output (5 octave range). For a "drop" effect starting 2 octaves above the target note, calculate the required sustain voltage and the attack time for a perceptually linear drop over 200ms.
- A) S = 2.5V, linear attack sufficient
- B) S = 0V; initial peak = 2V; attack = 200ms; perceptually linear in pitch requires exponential voltage ramp, not linear voltage; requires exponential envelope shape
- C) S = 5V
- D) Sustain doesn't affect pitch

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 9
A digital envelope interpolates between time-quantized samples using cubic splines vs. linear interpolation. For a 48kHz envelope with 50ms attack, calculate the smoothing difference in frequency domain and THD improvement.
- A) No difference
- B) Linear: aliasing above ~12kHz with steps; Cubic: smoother, pushes aliases above 20kHz; THD improvement: ~10-20dB; cost: 4× CPU for spline calculation
- C) Cubic worse than linear
- D) Both perfect

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 10
You're implementing an envelope follower for dynamic envelope extraction. Using RMS detection with 10ms window at 48kHz sampling, calculate the number of samples in the RMS window and the latency introduced, considering causality requirements.
- A) 48 samples, 1ms latency
- B) 480 samples; minimum latency = 5ms; non-causal = 10ms latency; actual implementations use lookahead or accept 5-10ms delay
- C) 4800 samples, 100ms latency
- D) Zero latency possible

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

# SUBJECT 6: MODULATION TYPES (10 Questions)

### Question 1
Vibrato implemented using a lookup table sine wave LFO at 6Hz with 20 cent depth. At MIDI note 69 (A4 = 440Hz), calculate the exact frequency deviation, the lookup table size required for <0.01% THD, and the index increment per sample at 48kHz.
- A) ±10Hz, 64-point table, increment = 0.1
- B) ±6.4Hz - 440); table size: ~8192 points for 0.01% THD; index increment = / 48kHz =/48000 ≈ 1.024 per sample
- C) ±20Hz, 256-point table
- D) No deviation

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
PWM with triangle LFO at 0.4Hz modulates pulse width from 10% to 90%. Calculate the rate of width change at maximum LFO slope (steepest part) and the resulting harmonic modulation rate.
- A) Constant rate
- B) Maximum slope: 80% width change × 2π × 0.4Hz ≈ 201%/second; harmonics shift continuously; fastest at LFO zero-crossing; creates smooth chorus effect with complex harmonic motion
- C) 0.4%/second
- D) No harmonic modulation

**Answer: B**

**Expert Explanation:** Low Frequency Oscillators modulate parameters to create movement.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Terms like lfo are fundamental. - Dictionary"




---

### Question 3
Ring modulation (multiplying two signals) of sine waves at 440Hz (carrier) and 660Hz (modulator) creates sidebands at fc±fm. Calculate ALL significant frequency components including harmonics if both signals contain first 3 harmonics.
- A) 220Hz and 1100Hz only
- B) Fundamentals: 220, 1100Hz; Plus all harmonic products: 440×660, 440×1320, 880×660, 880×1320, 1320×660, etc.; creates dense inharmonic spectrum with components at: 220, 580, 820, 1100, 1540, 1980, 2200, 2860Hz...
- C) Only 440 and 660Hz
- D) White noise

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
A filter is modulated by an LFO (sine, 1Hz) sweeping cutoff from 200Hz to 2kHz with Q = 10. Calculate the maximum group delay variation during one LFO cycle and explain the phase modulation side effect.
- A) No group delay variation
- B) Group delay = Q/; at 200Hz: 15.9ms, at 2kHz: 1.59ms; Δ = 14.3ms variation; phase modulation creates audible "swoosh" artifacts as group delay shifts; high-Q filters create more extreme effects
- C) Constant group delay
- D) 1ms maximum

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 5
Amplitude modulation at audio rate (carrier 440Hz, modulator 100Hz) creates ring modulation effect. Calculate the sideband frequencies, and determine the beating pattern frequency between the two sidebands.
- A) No sidebands
- B) Sidebands: 340Hz and 540Hz; beating between sidebands: 540-340 = 200Hz; this 200Hz beat creates characteristic metallic ring mod timbre
- C) Random frequencies
- D) Only 440Hz remains

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
You're implementing vibrato with Doppler shift simulation for physical modeling. A 440Hz source moves toward listener at 5m/s (sound speed = 340m/s). Calculate the apparent frequency and compare to standard vibrato with ±20 cent depth.
- A) No frequency change
- B) Doppler: f' = f ×) = 440 × ≈ 446.5Hz; exceeds typical ±20 cent vibrato; physical vibrato depth depends on velocity amplitude
- C) Same as ±20 cent vibrato
- D) 5Hz shift only

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 7
Tremolo using a square wave LFO at 4Hz with 100% depth creates what type of amplitude modulation spectrum? Calculate the sideband structure for a 440Hz tone.
- A) Simple 2-sideband AM
- B) Square wave LFO = odd harmonics; creates multiple sideband pairs: 440±4Hz, 440±12Hz, 440±20Hz with decreasing amplitudes; complex spectrum vs. sine LFO
- C) No sidebands
- D) Only fundamental and one sideband

**Answer: B**

**Expert Explanation:** Low Frequency Oscillators modulate parameters to create movement.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Terms like lfo are fundamental. - Dictionary"




---

### Question 8
Cross-modulation in analog circuits (VCO 1 modulates VCO 2's amplitude) at audio rates creates intermodulation. VCO1 = 440Hz (saw), VCO2 = 660Hz (square). Calculate the primary intermodulation products and THD.
- A) No intermodulation
- B) Primary products: 220Hz, 1100Hz, plus higher-order: 880±660, 1320±440, etc.; THD ≈ 30-50% depending on modulation depth; complex, dense spectrum
- C) Only 440 and 660Hz
- D) White noise result

**Answer: B**

**Expert Explanation:** Modulation adds life and movement to static sounds.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
FM synthesis with carrier = 440Hz, modulator = 440Hz (1:1 ratio), modulation index β sweeping from 0 to 10 over 2 seconds. Calculate the rate of harmonic generation (new sidebands appearing per second) and the spectral spreading rate.
- A) No rate change
- B) Significant sidebands ≈ β + 1; at β=10, ~11 sideband pairs; rate ≈ 5.5 pairs/second; spectral spread rate ≈ ±440Hz/second
- C) Instant spectral change
- D) One sideband only

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
A digital LFO uses 32-bit phase accumulator at 48kHz. For LFO frequency of 0.01Hz, calculate the phase increment per sample, the period jitter due to quantization, and whether this is audible.
- A) Perfect 0.01Hz, no jitter
- B) Phase increment =/48kHz ≈ 894.8; truncation creates jitter; period variation ≈ ±20μs; at 0.01Hz, jitter is ±0.00002% - completely inaudible
- C) Massive jitter, audible
- D) Cannot achieve 0.01Hz

**Answer: B**

**Expert Explanation:** Jitter is the timing deviation of the sample clock, which can introduce noise and distortion.
**Image:** !["Diagram"](/images/diagram_jitter_clock_v2.png)
**Expert Quote:** "Terms like jitter are fundamental. - Dictionary"




---

---

# SUBJECT 7: SUBTRACTIVE SYNTHESIS (10 Questions)

### Question 1
Design a complete analog bass patch with specific component values: VCOs using saw cores with tempco -3500ppm/°C, VCF using LM13700 OTA (gm = 19.2×Iabc mS, where Iabc is bias current), target fc = 300Hz. Calculate the required bias current and the temperature drift of the filter cutoff.
- A) Random values
- B) For fc = 300Hz with 10nF cap: gm = 2πfcC = 2π × 300 × 10nF ≈ 18.8mS; Iabc = gm/19.2 ≈ 0.98mA; tempco of LM13700 ≈ 0.3%/°C; 10°C change ≈ 3% drift ≈ 9Hz at 300Hz
- C) 1A bias current
- D) No drift

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 2
Three detuned sawtooth oscillators (440Hz ±5 cents, ±10 cents) create thickness through beating. Calculate the instantaneous combined amplitude variation over a 2-second window, identifying beat frequency components and their phase relationships.
- A) Constant amplitude
- B) Beat frequencies: 1.27Hz, 2.54Hz; amplitude envelope = complex sum creating ~1.5Hz average fluctuation with 0.5-2.5Hz varying beat pattern; phase between beats creates evolving thickness - not simple periodic
- C) Simple 1Hz beating
- D) No beating

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 3
A Moog ladder filter with four transistor pairs at IC = 1mA each has resonance feedback at 95%. Calculate the total current consumption, the distortion (THD) at resonance, and the maximum output swing before clipping.
- A) 4mA, 0.1% THD, ±12V swing
- B) 4mA total; THD at 95% resonance ≈ 3-5%; max swing ≈ ±0.8V; filter operates at low voltages
- C) 100mA, 0% THD
- D) 1mA total

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 4
Velocity modulation of filter cutoff uses exponential scaling. At vel = 1, fc = 200Hz; at vel = 127, fc = 2kHz. Calculate the equation relating velocity to cutoff, and determine cutoff at vel = 64.
- A) Linear relationship
- B) Exponential: fc = f_min × 2^/127); at vel = 64: fc = 200 × 2^/127) ≈ 200 × 2^ ≈ 633Hz; preserves perceptual equal steps
- C) fc = 1kHz at vel 64
- D) Random values

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 5
A subtractive bass uses two oscillators (saw + square) through a 24dB/octave filter at fc = 400Hz. The saw has 20 harmonics within passband (up to 8kHz), square has 10 odd harmonics. Calculate the combined output power spectrum and identify the dominant frequency components.
- A) Equal power at all frequencies
- B) Within passband: saw contributes harmonics 1-2; square contributes 1st harmonic; above 400Hz: steep rolloff; dominant: 80Hz, 160Hz
- C) All frequencies at 0dB
- D) Only fundamental

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 6
Implementing a digital Moog ladder filter using TPT (Topology-Preserving Transform) method. Calculate the coefficient warping for fc = 1kHz at fs = 48kHz, and determine the number of non-linear iterations required for accurate resonance modeling.
- A) No warping needed
- B) Warping: fc_digital = × tan ≈ 1003Hz; resonance modeling: 2-4 Newton-Raphson iterations for <0.1% error at high Q; CPU cost ~3-5× linear filter
- C) fc unchanged, 1 iteration
- D) Infinite iterations

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 7
A Curtis CEM3320 filter IC has maximum cutoff frequency of 20kHz with 1μA control current. Calculate the transconductance at this control current and the current required for fc = 100Hz. What's the control current dynamic range in dB?
- A) 1μA for all frequencies
- B) At 1μA: gm ≈ 38.5μS; for 100Hz: need gm = 2π × 100 × 10nF ≈ 6.28μS; Ic ≈ 163nA; dynamic range: 20log ≈ 15.7dB
- C) 20μA for 100Hz
- D) Linear relationship

**Answer: B**

**Expert Explanation:** Dynamic range is the ratio between the largest and smallest values that a changeable quantity can assume.
**Image:** !["Diagram"](/images/svg/dynamic_range_concept.svg)
**Expert Quote:** "Terms like dynamic range are fundamental. - Dictionary"




---

### Question 8
A subtractive synth voice uses 2 VCOs + 1 sub-osc + 1 VCF + 2 EGs + 1 VCA + 1 noise source. Estimate the analog circuit's power consumption with: VCOs = 50mW each, sub = 30mW, VCF = 100mW, EGs = 20mW each, VCA = 40mW, noise = 10mW. Calculate for 8-voice polyphony.
- A) 100mW total
- B) Per voice: 320mW; 8 voices: 2.56W; plus control circuitry ~500mW; total ≈ 3W for complete polysynth
- C) 10W per voice
- D) 100W total

**Answer: B**

**Expert Explanation:** Subtractive synthesis is sculpting sound by removing frequencies.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
A sawtooth oscillator at 110Hz through a 24dB/octave filter at 500Hz with Q = 8 produces resonance peak. Calculate the exact frequencies and amplitudes of the first 5 harmonics after filtering, considering resonance boost at fc.
- A) All harmonics equal
- B) H1: -13dB; H2: -8dB; H3: -5dB; H4: -2.5dB; H5: +12dB boost minus rolloff); demonstrates resonance peak emphasis
- C) Only fundamental
- D) Random amplitudes

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 10
Designing a polyphonic subtractive synth: each voice requires 2 VCOs (50 MIPS), 1 VCF (150 MIPS), 2 EGs (30 MIPS each), 1 LFO (20 MIPS). For 16-voice polyphony with voice stealing, calculate required DSP power and determine the algorithm for optimal voice stealing based on envelope state.
- A) 1000 MIPS total, random stealing
- B) Per voice: 310 MIPS; 16 voices: 4960 MIPS; voice stealing: prioritize release stage > sustain > attack/decay; requires envelope state tracking per voice
- C) 100 MIPS total
- D) No voice stealing needed

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

---

# SUBJECT 8: ADDITIVE & FM SYNTHESIS (10 Questions)

### Question 1
An additive synth sums 128 sine waves to reconstruct a sawtooth at 440Hz. Each harmonic has amplitude 1/n. Calculate the total RMS output voltage if the fundamental is 1V RMS, the required CPU cycles per sample at 48kHz, and the numerical precision needed to avoid accumulation errors.
- A) 1V RMS, 128 cycles, 16-bit precision
- B) RMS = √²) ≈ 1.28V; CPU: 128 osc × ~50 cycles = 6400 cycles/sample minimum; precision: 24-32 bit float to avoid accumulation error over 128 sums
- C) 2V RMS, 10 cycles
- D) Infinite RMS

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 2
FM synthesis with C:M = 1:π (irrational ratio). Carrier = 440Hz, modulator = 440π Hz. Calculate the resulting spectrum characteristics and explain why this creates bell-like inharmonicity.
- A) Harmonic spectrum
- B) Sidebands at 440 ± n×440π Hz; irrational ratio creates non-repeating, inharmonic frequencies; no common divisor = bell/metallic character; mathematically complex spectrum
- C) Only 440Hz
- D) White noise

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 3
A DX7 algorithm uses 6 operators in a 3+3 split configuration: Op1→Op2→Op3 and Op4→Op5→Op6, both feeding output. Each operator has independent envelope. Calculate the maximum number of unique envelope state combinations at any instant, and the resulting spectral complexity.
- A) 6 combinations
- B) 6 operators × 4 ADSR states = 4⁶ = 4096 possible state combinations; each state produces different harmonic content; creates extremely complex, evolving timbres; DX7's power comes from envelope interaction complexity
- C) 24 combinations
- D) Infinite combinations

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 4
Implementing additive synthesis with fixed-point arithmetic: 64 harmonics, each 16-bit signed (-32768 to +32767). What's the maximum output before overflow if all harmonics sum constructively, and what headroom is required?
- A) 32767, no headroom needed
- B) Worst case: 64 × 32767 = 2,097,088; requires 21-bit output or -18dB headroom; or scale each harmonic by 1/64 = -36dB to maintain 16-bit output
- C) 32767 max
- D) Random maximum

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 5
FM with C = 440Hz, M = 440Hz, β = 10. Using Bessel functions, calculate the amplitudes of the first 5 sideband pairs (carrier ± nM). At what β value does the carrier amplitude drop to zero (carrier null)?
- A) Carrier never zeros
- B) J₀ values: β=10: J₀≈-0.246; sidebands J₁...J₅ have varying amplitudes; carrier nulls at β ≈ 2.4, 5.5, 8.7...; at β=10, carrier reappears but inverted
- C) β=10 creates carrier null
- D) All sidebands equal

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
Design an additive organ tone: drawbar settings 888000000 (Hammond notation). Convert to harmonic amplitudes (where 8 = maximum), calculate the relative levels in dB, and determine the resulting timbre character.
- A) All harmonics equal
- B) Harmonics 1,2,3 at 0dB; 4-9 at -∞dB; bright, hollow tone; missing 4th harmonic creates slight nasal quality; classic drawbar organ timbre
- C) Random amplitudes
- D) Only fundamental

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
FM operator with feedback modulating itself creates noise-like character. For carrier = 440Hz, feedback amount = k, calculate the effective modulation index and the resulting harmonic density. At what k value does the spectrum approach white noise?
- A) k=0 creates white noise
- B) Self-feedback creates multiple delayed modulations; effective β ≈ k×gain; harmonic density increases exponentially with k; k>5: quasi-white noise character with ~40-50 partials; k>10: dense inharmonic spectrum approaching noise
- C) Feedback creates silence
- D) k doesn't affect spectrum

**Answer: B**

**Expert Explanation:** FM synthesis uses frequency modulation for complex metallic tones.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
Additive synthesis using wavetable lookup: 32 harmonics, each stored in 8192-point sine table. Calculate the memory requirement, the phase increment for harmonic N at fundamental f₀ = 220Hz at fs = 96kHz, and the interpolation error.
- A) 256KB memory, no error
- B) Memory: 32 × 8192 × 2 bytes = 524KB; phase increment for Nth harmonic:/96kHz; linear interpolation error: ~-60dB SNR; cubic: ~-80dB
- C) 1MB memory, -120dB error
- D) No memory needed

**Answer: B**

**Expert Explanation:** Signal-to-Noise Ratio (SNR) compares valid signal level to background noise level.
**Image:** !["Diagram"](/images/svg/snr_concept.svg)
**Expert Quote:** "Terms like snr are fundamental. - Dictionary"




---

### Question 9
FM synthesis creates sidebands at fc ± n×fm. For C:M ratio of 7:5 with β = 3, calculate the first 10 sideband frequencies for fc = 440Hz, and identify which fall within human hearing range (20Hz-20kHz).
- A) All above 20kHz
- B) fm = 440×5/7 ≈ 314Hz; sidebands: 440±314, 440±628, 440±942... = 126, 440, 754, 1068, 1382, 1696, 2010, 2324, 2638, 2952 Hz; all within hearing range; creates harmonic-like spectrum despite non-integer ratio
- C) Only carrier audible
- D) Random frequencies

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
A polyphonic additive synth uses 64 partials per voice, 8 voices, 48kHz sample rate. Each partial requires: sine calculation (100 cycles), envelope calculation (50 cycles), amplitude scaling (10 cycles). Calculate if a 1GHz CPU can handle real-time synthesis.
- A) Easily handled
- B) Per voice: 64 × 160 cycles = 10,240 cycles/sample; 8 voices: 81,920 cycles/sample; at 48kHz: 3.93 billion cycles/sec; 1GHz CPU insufficient; requires 4-core CPU or optimization
- C) 100MHz sufficient
- D) Impossible task

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

---

# SUBJECT 9: WAVETABLE & GRANULAR SYNTHESIS (10 Questions)

### Question 1
A wavetable contains 256 waveforms, each 2048 samples. Using bandlimited waveforms requiring oversampling, calculate the memory requirement for 4× oversampled tables in 16-bit format, and determine the upsampling filter requirements.
- A) 1MB, no filter needed
- B) 256 frames × 2048 samples × 4× oversample × 2 bytes = 4.2MB; upsampling filter: 8-16 tap FIR minimum for adequate antialiasing; CPU: ~30-50 cycles per output sample for interpolation + filtering
- C) 512KB, 2-tap filter
- D) 100KB total

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 2
Wavetable interpolation using 4-point Hermite spline between frames at position p = 0.37 (between frame 94 and 95). Calculate the weights for frames 93, 94, 95, 96 and the resulting interpolated sample value if they contain 0.2, 0.5, 0.8, 0.6 respectively.
- A) Simple average: 0.55
- B) Hermite weights at p=0.37: w₉₃≈-0.018, w₉₄≈0.565, w₉₅≈0.477, w₉₆≈-0.024; result:+++ ≈ 0.642; smooth interpolation vs. linear
- C) 0.8
- D) 0.5

**Answer: B**

**Expert Explanation:** Wavetables allow evolving timbres.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
Granular synthesis with grain size = 50ms, density = 30 grains/second, random spray ±200ms on 2-second source. Calculate the probability of grain overlap, the expected number of simultaneous grains, and the CPU load per grain (assuming 100 cycles/sample overhead).
- A) No overlap
- B) Overlap probability ≈ 75%; expected simultaneous grains ≈ 1.5; CPU per grain: 50ms × 48kHz × 100 = 240k cycles/grain; 30 grains/sec × 240k = 7.2M cycles/sec baseline + spray overhead
- C) 100% overlap always
- D) 1 grain at a time

**Answer: B**

**Expert Explanation:** Wavetables allow evolving timbres.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 4
Wavetable position modulated by LFO at 5Hz sweeping full table (0-255). Calculate the scan rate in frames/second, and determine if this creates audible "steps" between frames or smooth transition at typical fundamental frequencies (100-1000Hz).
- A) Obvious stepping
- B) Scan rate: 255 frames / 0.2sec = 1275 frames/second; at 440Hz fundamental, ~2.9 frames per waveform cycle; smooth due to rapid scanning + waveform similarity between adjacent frames; perceptually continuous
- C) 5 frames/second
- D) Infinite smoothness

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
Implementing granular pitch-shifting: 50ms grains pitched up by 700 cents (perfect fifth). Calculate the actual grain playback duration, the time-stretching factor needed to maintain sync, and the resulting latency.
- A) 50ms duration unchanged
- B) 700 cents = 2^ ≈ 1.498×; playback duration: 50ms/1.498 ≈ 33.4ms; to maintain sync, time-stretch by 1.498×; latency ≈ 50ms + processing ~60-70ms total
- C) No pitch shift possible
- D) 100ms duration

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 6
A wavetable uses 32-bit floating-point samples. Scanning at 440Hz with 2048-sample waveforms at 192kHz sample rate. Calculate the phase accumulator increment, bit depth required for phase accumulator to avoid pitch quantization, and memory bandwidth required.
- A) 8-bit phase sufficient
- B) Samples per cycle: 192k/440 ≈ 436; phase increment: 2048/436 ≈ 4.7 per sample; phase accumulator: 32-bit minimum; bandwidth: 440Hz × 2048 × 4bytes = 3.6MB/sec
- C) 16-bit phase, 1KB/sec bandwidth
- D) Infinite precision needed

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 7
Granular synthesis creating "frozen" texture: 500ms grains at random positions with 1ms fade-in/fade-out envelopes, density = 20 grains/sec. Calculate the grain overlap factor, the probability of simultaneous grain transients, and the resulting spectral characteristics.
- A) No overlap
- B) Overlap factor: 500ms × 20/sec = 10 grains simultaneously; transient probability: 1ms × 2 × 20/sec ≈ 4% of time; spectral: quasi-static, harmonic content from source preserved but temporally scattered
- C) 1 grain at a time
- D) 100 grains simultaneous

**Answer: B**

**Expert Explanation:** Wavetables allow evolving timbres.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
Wavetable with 128 frames transition from sine → triangle → saw → square. Using linear morphing, calculate the exact harmonic content at position 64 (midpoint between triangle and saw). Triangle has harmonics 1, 3(11%), 5(4%); saw has 1, 2(50%), 3(33%), 4(25%), 5(20%).
- A) Only fundamental
- B) 50/50 blend: H1=100%, H2=25%, H3=22%, H4=12.5%, H5=12%; bright but not as bright as pure saw; demonstrates spectral interpolation creating intermediate timbres
- C) Random harmonics
- D) All harmonics equal

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
Granular time-stretching algorithm: 2-second source stretched to 6 seconds using 20ms grains with 50% overlap. Calculate the number of grains required, the grain spacing, and the cross-fade duration to avoid clicks.
- A) 100 grains, no crossfade
- B) 6 seconds / 10ms spacing = 600 grains; spacing: 10ms; crossfade: 5-10ms prevents clicks; creates smooth 3× time-stretch with preserved pitch
- C) 60 grains, 100ms spacing
- D) Impossible to calculate

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
A professional wavetable synthesizer uses 1024 wavetables, each with 256 frames of 4096 samples (64-bit float). Calculate the total memory requirement, the cache efficiency implications, and the expected memory bandwidth at 8-voice polyphony scanning at average 2kHz rate.
- A) 1MB total, no bandwidth issues
- B) Memory: 1024 × 256 × 4096 × 8bytes = 8.6GB; cache efficiency: poor; bandwidth: 8 voices × 2kHz scan × 256frames/scan × 4KB × 8bytes = 41MB/sec
- C) 100MB total
- D) 10GB total

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

# SUBJECT 10: PHYSICAL MODELING & SAMPLING (10 Questions)

### Question 1
Karplus-Strong algorithm with delay line length N samples and loop filter H(z) = (1+z⁻¹)/2 (simple average). Calculate the fundamental frequency, the decay time to -60dB for loop gain g = 0.995, and the spectral effect of the loop filter.
- A) f = N Hz, instant decay
- B) f = fs/N Hz; decay time: τ ≈ N/) samples; for -60dB: t ≈ 6.9τ; loop filter: -6dB at fs/4, brightens initial tone, darkens decay
- C) Random frequency
- D) No decay

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 2
Multisampling a piano: one sample every 3 semitones (4 per octave), 5 velocity layers, 88 keys requires how many samples? With crossfading consuming 25% extra CPU, calculate the DSP load for 8-voice polyphony if each sample playback is 50 MIPS and crossfade is 30 MIPS per transition.
- A) 88 samples, 100 MIPS total
- B) Samples: 30 pitch zones × 5 velocities = 150 samples total; per voice: 50 MIPS playback + 7.5 MIPS average crossfade = 57.5 MIPS; 8 voices: 460 MIPS; with interpolation overhead: ~500-600 MIPS
- C) 440 samples, 10 MIPS
- D) 1000 samples

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 3
Physical modeling of a flute using waveguide with delay τ and non-linear excitation function f(p) = p - p³ (cubic nonlinearity). For fundamental = 523Hz (C5), calculate the delay line length at 96kHz, and explain the spectral effect of the cubic term.
- A) 523 samples, no harmonics
- B) τ = 96000/523 ≈ 183.6 samples; cubic term generates odd harmonics mimicking flute overblowing; nonlinearity essential for realistic attack transients
- C) 1000 samples, random harmonics
- D) Delay doesn't determine pitch

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 4
A sample library uses lossless compression (FLAC). Uncompressed: 100GB of 24-bit/48kHz stereo samples. Estimate the compressed size given typical compression ratio for audio samples, and calculate the real-time decompression CPU requirement for 16 simultaneous voices.
- A) 10GB compressed, 10 MIPS
- B) Compression: 40-60% typical for audio; decompression: ~20-30 MIPS per voice; 16 voices: 320-480 MIPS; plus sample playback ~1000 MIPS total
- C) 1GB compressed, 1 MIP
- D) No compression possible

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 5
Physical model of string: tension T = 100N, linear density μ = 0.001 kg/m, length L = 0.65m. Calculate the fundamental frequency, the propagation velocity, and the required sample rate for accurate simulation.
- A) f = 100Hz, no special sample rate
- B) Velocity: v = √ = √ ≈ 316 m/s; f = v/ ≈ 243Hz; sample rate: minimum 4× highest harmonic = 80kHz+; practical: 96-192kHz for accurate transients
- C) v = 100 m/s, f = 1kHz
- D) Cannot calculate from T and μ

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 6
Looped sample playback with crossfade. Loop points at samples 10,000 and 50,000 with 500-sample crossfade. At 44.1kHz playing middle C (261.63Hz), calculate the number of loop iterations per second and whether the 500-sample crossfade is audible.
- A) 1 loop/sec, audible
- B) Loop length: 40,000 samples ≈ 907ms; ~1.1 loops/sec at C4; crossfade: 500 samples ≈ 11ms; occurs every 907ms = imperceptible; proper loop creates seamless sustain
- C) 10 loops/sec, obvious
- D) No looping needed

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 7
Implementing round-robin sampling with 4 variations. In a MIDI sequencer at 120 BPM 16th notes, a repeated note triggers. Calculate how long before the pattern repeats, and design a randomization algorithm to extend apparent variation.
- A) Repeats every note
- B) 4 variations = repeats every 4 notes; at 16ths @ 120BPM: 500ms per note, 2 seconds per repeat; randomization: weighted random extends to ~8-12 note perceived variation; use history buffer of last 2-3 samples
- C) Never repeats
- D) Repeats every 16 notes

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
Physical model using waveguide synthesis requires fractional delay interpolation. For delay = 183.74 samples, calculate the integer delay and fractional part, choose interpolation method (linear vs. allpass), and estimate the frequency-dependent error.
- A) Integer delay sufficient
- B) Integer: 183, fraction: 0.74; linear interpolation: simple but -40dB error above 10kHz; allpass fractional delay: -80dB error, phase-accurate, CPU: 3-4× linear; professional models use allpass for accuracy
- C) No fractional delay possible
- D) Fraction ignored

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
Multisampling velocity switching with 4 layers at velocities 32, 64, 96, 127 using crossfades. At velocity 80, calculate the blend ratio between layers and the resulting timbre compared to single-sample pitch-shifting.
- A) Only layer 3 plays
- B) vel 80 falls between layers 3 and 4; blend: 50% layer 3 + 50% layer 4; crossfade creates natural dynamics; vs. pitch-shift: multisampling preserves formants, natural timbre, no "chipmunk" effect
- C) All layers equal
- D) Random blend

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
A piano sample library records each note with: 5 velocity layers, 3 mic positions (close/mid/far), sustain pedal up/down, soft pedal up/down. Calculate total samples for 88 keys and storage requirement at 24-bit/48kHz, 5-second average sample length.
- A) 440 samples, 1GB
- B) 88 keys × 5 velocities × 3 mics × 2 sustain × 2 soft = 5,280 samples; size: 5280 × 5sec × 48kHz × 3bytes = 3.8GB uncompressed; with lossless compression: ~2GB
- C) 88 samples, 100MB
- D) 10,000 samples

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

---

# SUBJECT 11: VECTOR & PHASE DISTORTION SYNTHESIS (10 Questions)

### Question 1
Vector synthesis with 4 sources at positions (0,0), (1,0), (0,1), (1,1) uses bilinear interpolation. Joystick at (0.3, 0.7). Calculate exact mix proportions using: corner weight = (1-x or x) × (1-y or y), and verify they sum to 1.0.
- A) All equal at 25%
- B) : 0.7×0.3=0.21;: 0.3×0.3=0.09;: 0.7×0.7=0.49;: 0.3×0.7=0.21; sum: 1.0 ✓; demonstrates proper bilinear interpolation weights
- C) Random weights
- D) Only two corners active

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
Vector automation recording at 48kHz control rate stores X/Y positions. For a 4-second gesture with 3 minutes of total automation data, calculate storage requirement (16-bit X, 16-bit Y) and implement data reduction using linear interpolation with 0.01% error threshold.
- A) 1KB storage, no reduction
- B) 4sec × 48kHz = 192K samples × 4 bytes = 768KB per gesture; 3 min = 45 gestures = 34MB raw; with linear interpolation reduction: ~1-2% of points kept = 340-680KB total; massive reduction
- C) 1MB per gesture
- D) No storage needed

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 3
Phase distortion: sine wave in 4096-point table read with variable rate function R(φ) = 1 + 0.5×sin(2φ). Calculate the instantaneous frequency deviation over one cycle and the resulting harmonic content.
- A) No frequency deviation
- B) At φ=0: R=1; φ=π/2: R=1.5; φ=π: R=1; φ=3π/2: R=0.5; creates 2nd harmonic emphasis + odd harmonics; complex spectrum
- C) Only fundamental
- D) Random harmonics

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
Vector synthesis morphing between wavetable sources. Source A: sine (fundamental only), Source B: saw (infinite harmonics), Source C: square (odd harmonics), Source D: pulse 25% (nulled 4th harmonic). At position (0.5, 0.5), calculate the exact harmonic content.
- A) Only fundamental
- B) Equal blend of all four: H1=100%, H2=12.5%, H3=20.75%, H4≈3%, H5=12.75%; complex mixed spectrum with some cancellations
- C) Random spectrum
- D) All harmonics equal

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
Phase distortion implementation: 1024-point sine table with DCW (Digitally Controlled Waveform) parameter controlling phase acceleration. DCW = 50% creates what waveshape distortion, and calculate the first 3 harmonic amplitudes.
- A) Perfect sine maintained
- B) DCW=50% creates mild phase distortion; adds primarily 2nd and 3rd harmonics; waveshape: slightly "pinched" negative half, expanded positive half; Casio CZ characteristic timbre
- C) Square wave result
- D) No harmonics added

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 6
Vector synthesis controlling 4 granular sources with different grain sizes (10ms, 50ms, 100ms, 200ms). Morphing between these creates what perceptual effect, and calculate the texture density at position (0.5, 0.5).
- A) No perceptual difference
- B) 10ms: grainy/rough; 50ms: textured; 100ms: smooth; 200ms: pad-like; at: blend creates ~75ms average grain, medium texture; morphing creates continuous grain-size variation = evolving texture density
- C) All sound identical
- D) Only one grain size plays

**Answer: B**

**Expert Explanation:** Advanced synthesis creates unique textures.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 7
Phase distortion vs. FM synthesis: compare CPU efficiency for similar timbral complexity. PD uses 1024-point table with variable read rate; FM uses real-time sine calculation with modulation. Calculate cycles per sample.
- A) FM is more efficient
- B) PD: table lookup + rate calculation ≈ 15 cycles/sample; FM: carrier sine + modulator sine + modulation math ≈ 120 cycles; PD ~8× more efficient for similar results
- C) Equal efficiency
- D) Both require 1000 cycles

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
Vector synthesis with envelope controlling Y-axis: envelope goes from 0→1 over 2 seconds (attack), holds 1 for sustain, releases 1→0 in 1 second. Four sources have different spectral brightness (dark bottom, bright top). Calculate the timbral evolution timeline.
- A) Static timbre
- B) 0-2s: morphs from dark bottom sources to bright top sources; sustain: holds bright top sources; release 1s: sweeps back to dark bottom sources; creates automatic timbral arc
- C) Random evolution
- D) Only volume changes

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 9
Phase distortion creating triangle wave from sine table: read first quarter normally, read second quarter reversed, repeat for third/fourth quarters. Calculate the resulting harmonic series and compare to true triangle wave.
- A) Perfect triangle
- B) Creates triangle-like shape with odd harmonics primarily; slight differences from true triangle due to sine-based slopes; harmonics: 1, 3, 5, 7; close approximation but not identical
- C) Creates square wave
- D) No harmonics

**Answer: B**

**Expert Explanation:** Advanced synthesis creates unique textures.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
A professional vector synthesizer uses 4 independent wavetable oscillators as sources. Each wavetable has 256 frames of 2048 samples. Calculate the memory bandwidth required for 8-voice polyphony with each voice scanning all 4 wavetables at an average 440Hz.
- A) 1MB/sec
- B) Per voice: 4 oscillators × 440Hz × 2048 samples × 2 bytes = 7.2MB/sec; 8 voices: 57.6MB/sec; requires careful memory architecture to sustain bandwidth without stalls
- C) 100KB/sec
- D) 1GB/sec

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

---

# SUBJECT 12: PERFORMANCE CONTROLS & CLASSIC SYNTHS (10 Questions)

### Question 1
MIDI 2.0 introduces 16-bit velocity (0-65535) vs. original 7-bit (0-127). Calculate the dynamic range improvement in dB and the minimum velocity step in dB. Why does this matter for realistic playing dynamics?
- A) Same dynamic range
- B) 7-bit: 42dB dynamic range); 16-bit: 96dB dynamic range); improvement: 54dB; min step: 7-bit ≈ 0.33dB, 16-bit ≈ 0.0013dB; allows subtle dynamic nuance matching acoustic instruments
- C) 6dB improvement
- D) No practical difference

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 2
The Minimoog uses 3 VCOs with individual tuning. VCO1 = 440Hz, VCO2 = 439Hz, VCO3 = 441Hz. Calculate all beat frequencies between oscillator pairs, and explain how the beat pattern creates the characteristic "fat" Minimoog sound.
- A) No beating
- B) VCO1-VCO2: 1Hz beat; VCO1-VCO3: 1Hz beat; VCO2-VCO3: 2Hz beat; three beating patterns at different rates create complex amplitude envelope = movement, thickness, "alive" character without obvious periodicity
- C) Simple 1Hz beat
- D) 5Hz beat

**Answer: B**

**Expert Explanation:** An oscillator generates the raw repetitive waveform in a synthesizer.
**Image:** !["Diagram"](/images/svg/synth_signal_flow.svg)
**Expert Quote:** "Terms like oscillator are fundamental. - Dictionary"




---

### Question 3
Prophet-5 voice architecture: 2 DCOs, 1 filter, 2 envelopes, 1 VCA per voice. Calculate the component temperature coefficients: DCOs (±50ppm/°C), filter (±0.3%/°C). Over 10°C change, what's the maximum voice detuning and filter shift?
- A) No drift
- B) DCO drift: 440Hz × 50×10⁻⁶ × 10°C ≈ ±0.22Hz - barely noticeable; filter: 1000Hz × 0.003 × 10 = 30Hz shift - noticeable on resonant sounds; demonstrates DCO stability advantage
- C) ±100Hz drift
- D) ±1Hz drift

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 4
DX7 algorithm 32 uses cascade modulation: Op1→Op2→Op3→Op4→Op5→Op6→output. With each operator at unity gain and β=1 per stage, calculate the cumulative harmonic generation and CPU load per operator (assume 150 cycles for FM calculation).
- A) Single operator complexity
- B) Each stage adds sidebands: 6 cascaded stages create extremely complex spectrum with hundreds of partials; CPU: 6 ops × 150 cycles = 900 cycles per sample per voice; 16 voices: 14,400 cycles/sample; at 49.096kHz DX7 rate: ~707 MIPS - explains DX7's custom LSI chips
- C) No CPU load
- D) 10 cycles total

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 5
Aftertouch controlling filter cutoff with exponential response. At pressure = 0, fc = 500Hz; at pressure = 127, fc = 5kHz. Calculate the pressure value that produces fc = 1kHz, and explain why exponential feels more natural than linear.
- A) Pressure = 63.5
- B) Exponential: fc = 500 × 2^/127); for 1kHz: P ≈ 40; exponential matches perception; 1kHz is ~2/3 up pressure range but only 1 octave = natural feel
- C) Pressure = 127
- D) Cannot achieve 1kHz

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
TB-303 filter self-oscillates at cutoff frequency with accent creating momentary resonance boost. Accent adds +6dB to resonance peak. Calculate the effective Q change if normal Q = 8, and explain the "scream" effect.
- A) No Q change
- B) +6dB ≈ 2× voltage increase; Q_accent ≈ 16; creates dramatic resonance spike; combined with envelope: momentary scream on accented notes; TB-303 signature = high Q + accent articulation
- C) Q halves
- D) Q = 1

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 7
Jupiter-8 uses 2 VCOs per voice with cross-modulation. VCO1 at 440Hz modulates VCO2's frequency at 20% depth. Calculate the effective FM modulation index β and the resulting sideband structure.
- A) No sidebands
- B) 20% depth = 88Hz modulation; β ≈ 0.2; creates subtle sidebands at 440±440Hz; mild FM effect adding harmonic richness without obvious FM character
- C) β = 20
- D) Random sidebands

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
MPE (MIDI Polyphonic Expression) allows per-note pitch bend, pressure, timbre. For a 5-note chord with each note bent differently (±200 cents), calculate the MIDI channel requirements and data rate at 1kHz update rate with 14-bit pitch bend.
- A) 1 channel, 1KB/sec
- B) 5 notes = 5 MIDI channels; per channel: pitch bend + pressure = 5 bytes × 1kHz = 5KB/sec per note; 5 notes: 25KB/sec; allows unprecedented expressive control
- C) 10 channels, 100KB/sec
- D) MPE uses standard MIDI

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
A polysynth uses voice stealing algorithm: priority = (envelope_stage × 10) + (note_age × 1). Calculate which voice gets stolen with: Voice1 (release, 5sec old), Voice2 (sustain, 2sec old), Voice3 (attack, 0.1sec), Voice4 (decay, 1sec).
- A) Random selection
- B) Priority scores: V1, V2, V3, V4; highest = V1 stolen first; algorithm preserves attacks, steals releases - musically sensible
- C) Always steal oldest
- D) Steal newest always

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 10
Prophet-5 uses Curtis CEM3340 VCO with 1V/octave exponential converter having 0.05% tempco. Calculate the tuning drift in cents over a 5-hour performance where temperature rises 15°C, and compare to vintage Minimoog VCO drift.
- A) No drift
- B) CEM3340: 0.05% × 15°C ≈ 0.75% drift = ~13 cents; Minimoog VCO: ~0.3%/°C × 15°C ≈ 4.5% = ~78 cents; demonstrates Prophet-5's stability improvement over fully-analog VCOs
- C) Prophet drifts more than Minimoog
- D) Both drift equally

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

---

## SCORING GUIDE - MASTER/EXPERT LEVEL

- **108-120 correct (90-100%):** World-Class Mastery - Consultant/Researcher Level
- **96-107 correct (80-89%):** Expert Professional - Senior Engineer
- **84-95 correct (70-79%):** Advanced Professional - Experienced Engineer
- **72-83 correct (60-69%):** Professional Competency - Working Professional
- **Below 72 correct (<60%):** Significant Advanced Study Required

---

## MASTER LEVEL CHARACTERISTICS

These questions demand:
- **Multi-physics integration** - Electrical, acoustic, mathematical, perceptual
- **Exact calculations** - Precise numerical results with units
- **System-level design** - Resource management, optimization, trade-offs
- **Professional engineering** - Real-world constraints and solutions
- **Advanced mathematics** - Calculus, Fourier analysis, signal processing
- **Algorithm design** - Computational efficiency, implementation details

---

## EXPERTISE DOMAINS ASSESSED

- **Circuit Design** - Analog components, specifications, temperature effects
- **DSP Engineering** - Sample rates, quantization, computational complexity
- **Acoustic Physics** - Wave equations, harmonics, psychoacoustics
- **Algorithm Development** - Efficiency, accuracy, trade-offs
- **System Architecture** - Memory, bandwidth, polyphony, real-time constraints
- **Historical Context** - Classic synthesizer designs and their innovations

---

## PROFESSIONAL APPLICATION

This level reflects expertise needed for:
- Synthesizer design and development (hardware/software)
- Advanced sound design and programming
- Audio DSP algorithm development
- Product specification and optimization
- Technical education and consultation
- Research and development in synthesis technology

---

*Music Tech Dictionary - Volume 3: Synthesis*
*Master/Expert Level Complete - All 12 Subjects*
*© 2024 - Educational Use*
*Professional Mastery Assessment*
