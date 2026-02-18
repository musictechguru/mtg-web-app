# Music Tech Dictionary - Volume 2: Microphones
## Master/Expert Level Quiz Bank (Professional/Guru Level)
### 10 Questions Per Topic - Multiple Choice Format

---

## TOPIC 1: GAIN & SIGNAL PATH

### Question 1
You're designing a signal chain for a Coles 4038 ribbon (sensitivity: 0.5mV/Pa, impedance: 300Ω). Your preamp has EIN of -130dBu and input impedance of 1.5kΩ. At what gain setting does the preamp's noise floor become audible above the mic's thermal noise (kT·R noise ≈ -131.5dBu for 300Ω at 20kHz bandwidth)?
- A) The preamp noise dominates at all gain settings
- B) Below ~55dB gain, thermal noise dominates; above 55dB, preamp noise becomes significant factor
- C) Thermal noise always dominates
- D) Preamp noise always dominates

**Answer: B**

**Expert Explanation:** The noise floor is the level of constant background noise in a system.
**Image:** !["Diagram"](/images/svg/snr_concept.svg)
**Expert Quote:** "Terms like noise floor are fundamental. - Dictionary"




---

### Question 2
You're recording a 94dB SPL source with a mic (20mV/Pa, 200Ω output) into a preamp (input impedance 3kΩ, EIN -128dBu, max output +28dBu) feeding a converter (max input +24dBu, 120dB dynamic range, -110dBu noise floor). To maximize system dynamic range while preventing clipping on 10dB peaks, what's the optimal preamp gain and why?
- A) 40dB: balances headroom with SNR
- B) 35dB: 94dB SPL + 20mV/Pa = -42dBu; +35dB = -7dBu; +10dB peak = +3dBu, noise floor adequate
- C) 50dB: maximum SNR
- D) 25dB: maximum headroom

**Answer: B**

**Expert Explanation:** Dynamic range is the ratio between the largest and smallest values that a changeable quantity can assume.
**Image:** !["Diagram"](/images/svg/dynamic_range_concept.svg)
**Expert Quote:** "Terms like dynamic range are fundamental. - Dictionary"




---

### Question 3
Your mastering chain has three gain stages: preamp (SNR 95dB, gain 45dB), equalizer (SNR 108dB, unity gain), and output stage (SNR 110dB, gain 6dB). Using the cascade formula for noise figure, what's the system's effective SNR?
- A) 95dB
- B) ~94.8dB
- C) 110dB
- D) 86dB

**Answer: B**

**Expert Explanation:** Signal-to-Noise Ratio (SNR) compares valid signal level to background noise level.
**Image:** !["Diagram"](/images/svg/snr_concept.svg)
**Expert Quote:** "Terms like snr are fundamental. - Dictionary"




---

### Question 4
You're tracking with an analog tape machine (saturation begins at +6dBu on VU meters = 0VU). Digital system shows -18dBFS = 0VU. A transient hits +3VU on tape. In the digital domain, this represents what level, and what's the implication?
- A) -15dBFS, safe headroom
- B) -9dBFS; tape saturation provides gentle limiting, digital would clip without this
- C) -18dBFS
- D) 0dBFS

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 5
A microphone with 94dB SPL = 1V sensitivity is used at 110dB SPL. Your preamp has a 20dB pad, and you're applying 35dB gain. The converter clips at +18dBu. Calculate the signal level at the converter input and determine if clipping occurs.
- A) No clipping: 110dB SPL = 5.01V; -20dB pad = -4dBu; +35dB = +31dBu; CLIPS by 13dB
- B) No clipping occurs
- C) Slight clipping at +20dBu
- D) Impossible to determine

**Answer: A**

**Expert Explanation:** Gain staging is critical.
**Image:** !["Diagram"](/images/svg/signal_chain_basic.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 6
You're matching a tube microphone (7kΩ output impedance, -40dBV at 94dB SPL) to a solid-state preamp (10kΩ input impedance). The impedance mismatch causes what low-frequency effect, and at what frequency does it begin if the coupling capacitor is 2.2μF?
- A) No effect
- B) HPF formed by source impedance and coupling cap: fc = 1/ ≈ 10.3Hz; below this, 6dB/octave rolloff
- C) Boost at low frequencies
- D) Only affects high frequencies

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
Your recording chain uses 88.2kHz sample rate with dither. A 40kHz ultrasonic signal from a ribbon mic's resonance peak aliases to what frequency, and how does this affect your recording?
- A) No aliasing at 88.2kHz
- B) 40kHz aliases to 48.2kHz, then mirrors back to 8kHz; creates audible artifact in critical mid-range
- C) Aliasing only occurs above sample rate
- D) Anti-aliasing filter prevents this completely

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 8
You're using a transformer-coupled preamp (1:10 turns ratio) with a ribbon mic (0.5mV/Pa, 300Ω). The transformer provides voltage gain but what's the impedance transformation, and how does this affect noise performance?
- A) No impedance change
- B) Impedance transforms by turns ratio squared: 300Ω becomes 30kΩ; voltage gain = 20dB; improved matching to high-Z input reduces Johnson noise impact
- C) Impedance decreases
- D) Only voltage affected

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 9
A class-A discrete preamp draws 50mA at 48V (2.4W dissipation). Its output stage can deliver 50mW into 600Ω. What's the efficiency, and why do recording engineers still prefer this despite low efficiency?
- A) 2% efficiency; preferred for superior linearity, low distortion, and sonic characteristics despite power waste
- B) 50% efficiency
- C) High efficiency design
- D) Efficiency doesn't matter

**Answer: A**

**Expert Explanation:** Gain staging is critical.
**Image:** !["Diagram"](/images/svg/signal_chain_basic.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 10
You're designing a gain structure for orchestral recording: main mics peak at -30dBFS, spot mics at -20dBFS. During mixing, you'll add 6dB to spots for balance. What's wrong with this approach, and what's the optimal recording strategy?
- A) Perfect approach
- B) Spots should be recorded at same relative level they'll sit in mix to minimize digital gain; preserve bit depth efficiency
- C) Record everything at maximum level
- D) Levels don't matter in digital

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

---

## TOPIC 2: MICROPHONE TYPES & CHARACTERISTICS

### Question 1
A Neumann U47 uses a VF14 tube (transconductance 1.6mA/V) with 100V B+ supply and 8kΩ plate resistor. The capsule outputs 50mV peak. Calculate the output voltage at the plate, accounting for tube amplification and phase inversion.
- A) 50mV
- B) ~640mV inverted
- C) 50V
- D) 100mV

**Answer: B**

**Expert Explanation:** Microphone type defines the source character.
**Image:** !["Diagram"](/images/diagram_mics_v2.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 2
A ribbon microphone's transverse sensitivity (response perpendicular to ribbon) is specified as -30dB relative to frontal sensitivity. During a loud stage performance, the drum kit is 90° off-axis at 115dB SPL. The ribbon is rated for 135dB SPL max frontal. Will the ribbon be damaged?
- A) Yes, immediately
- B) No: 115dB - 30dB rejection = 85dB effective at ribbon; transverse mode distributes force differently, further protecting ribbon
- C) Borderline damage
- D) Impossible to determine

**Answer: B**

**Expert Explanation:** Ribbon mics are smooth and warm but fragile.
**Image:** !["Diagram"](/images/svg/mic_ribbon_construction.svg)
**Expert Quote:** "Terms like ribbon are fundamental. - Dictionary"




---

### Question 3
Two microphones measure identically on frequency response graphs but one has 3μs group delay variation across 2-10kHz. How does this manifest sonically, and why don't standard FR measurements reveal it?
- A) No sonic difference
- B) Phase non-linearity causes "smearing" of transients; different frequency components arrive at different times; FR only measures magnitude
- C) Only affects sustained tones
- D) Group delay is inaudible

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
A condenser capsule has 30V polarization (externally biased) vs. a 60V RF-biased design. Beyond different power requirements, how does RF biasing (100kHz carrier) improve performance?
- A) No performance difference
- B) RF biasing linearizes capacitance curve, reduces distortion by operating at AC around carrier, decreases susceptibility to moisture and contamination
- C) Only reduces noise
- D) Purely for convenience

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 5
A large diaphragm condenser has resonant frequency at 16kHz with Q factor of 3. This creates an 8dB peak. You're recording a source with strong 16kHz content (cymbals). How do you optimize the recording chain to manage this without EQ?
- A) Accept the peak
- B) Increase distance and/or use slightly off-axis positioning where HF presence peak is reduced; exploit directional narrowing
- C) Use EQ
- D) Use different preamp

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 6
A ribbon mic with 0.8mg ribbon mass has resonant frequency at 16Hz (mechanical suspension). When recording double bass (fundamental 41.2Hz for E1), how does the ribbon's mechanical resonance affect low-frequency phase response?
- A) No effect
- B) Below resonance, second-order 12dB/octave rolloff with 180° phase shift approaching resonance; at 41Hz, minimal amplitude effect but ~45-60° phase shift affects transient response
- C) Perfect response at all frequencies
- D) Only affects amplitude

**Answer: B**

**Expert Explanation:** Ribbon mics are smooth and warm but fragile.
**Image:** !["Diagram"](/images/svg/mic_ribbon_construction.svg)
**Expert Quote:** "Terms like ribbon are fundamental. - Dictionary"




---

### Question 7
You're comparing two SDC mics: one with 12mm diaphragm (mass 1.2mg), one with 6mm (mass 0.3mg). For recording pizzicato strings (attack ~2ms, 2-6kHz content), which performs better and why?
- A) Identical performance
- B) 6mm: lower mass/area ratio enables faster acceleration response to rapid transients; mechanical time constant τ = m/c is shorter; captures attack transient more accurately
- C) 12mm always better
- D) Size doesn't affect transients

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 8
A measurement mic is specified as "diffuse-field equalized" vs. "free-field equalized." You're measuring room acoustics with both. At 10kHz, the diffuse-field mic measures 3dB lower than free-field. Why, and which is correct for reverberant field measurements?
- A) Free-field mic is always correct
- B) Diffuse-field mic compensates for pressure doubling from random-incidence sound; free-field mic optimized for direct sound; diffuse-field is correct for reverberant measurements
- C) Measurement error
- D) No difference exists

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
A tube condenser's output transformer has 1:6 turns ratio. The tube outputs 4V RMS at 15kΩ impedance. Calculate the output voltage, impedance, and explain why this transformation is beneficial for long cable runs.
- A) 24V, 90kΩ; worse for cables
- B) 24V output, 417Ω impedance; low output Z drives cables with minimal HF loss; voltage step-up maximizes signal above cable/preamp noise
- C) 4V, same impedance
- D) Transformation provides no benefit

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
A cardioid capsule is created by combining omnidirectional and figure-8 capsules acoustically. The omni has flat response; the figure-8 has +3dB LF boost due to proximity. When combined in 0.5:0.5 ratio, what's the resulting low-frequency characteristic of the cardioid, and why?
- A) Perfectly flat
- B) ~1.5dB LF boost: weighted average of flat and boosted; this is why cardioids often have LF rise even at distance
- C) -3dB LF cut
- D) Combination eliminates all LF response

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

---

## TOPIC 3: UNDERSTANDING POLAR PATTERNS

### Question 1
A second-order gradient microphone (supercardioid approaching shotgun) has equation 0.25 + 0.75cos(θ) + 0.5cos²(θ). At 120° off-axis, calculate the exact attenuation. How does this differ from a first-order hypercardioid's maximum rejection angle?
- A) Random attenuation
- B) -16.9dB [0.25 + 0.75 + 0.5 = 0.125 = -18dB] vs. hypercardioid's deepest null at 110°; second-order has deeper, more frequency-dependent nulls
- C) No attenuation
- D) Same as hypercardioid

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 2
A shotgun mic uses 24 interference ports along a 20cm tube. For maximum on-axis response at 5kHz (λ ≈ 68mm), what's the optimal port spacing, and what happens at 2.5kHz (λ ≈ 136mm)?
- A) Even spacing, all frequencies identical
- B) ~8.3mm spacing for 5kHz; at 2.5kHz, ports operate at different phase relationship, creating irregular response and reduced directionality
- C) Spacing doesn't matter
- D) Can't achieve directionality

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 3
You're using a Blumlein pair (two figure-8s at 90°) at 2m distance from a source. A reflection arrives from 45° with 6ms delay (2m path difference). How does this reflection manifest in the stereo image, considering both mics' polar patterns?
- A) Single reflection image
- B) 45° falls at -6dB point on both mics; creates phantom image offset from center; 6ms Haas delay may create diffuse spatial impression or discrete echo depending on source
- C) Complete cancellation
- D) No reflection captured

**Answer: B**

**Expert Explanation:** Phantom power (+48V) is required to operate condenser microphones and active DI boxes.
**Image:** !["Diagram"](/images/svg/signal_chain_basic.svg)
**Expert Quote:** "Terms like phantom are fundamental. - Dictionary"




---

### Question 4
A cardioid mic's polar pattern is expressed as R(θ) = 0.5 + 0.5cos(θ). Calculate the directivity index (DI) in dB, which represents the front-to-random-incidence ratio.
- A) 3dB
- B) 4.8dB [DI = 10log₁₀ where Ω = ∫∫R²sinθ dθdφ; for cardioid ≈ 4.8dB]
- C) 6dB
- D) 0dB

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 5
A dual-capsule microphone creates "seamless" pattern switching by varying DC voltage. At "wide cardioid" (60% omni, 40% cardioid contribution), a source at 135° off-axis produces what response compared to pure cardioid?
- A) Identical to cardioid
- B) ~3dB more sensitivity: pure cardioid at 135° ≈ -12dB; adding 60% omni raises effective pickup to ~-9dB
- C) Complete null
- D) Unpredictable

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 6
A shotgun microphone exhibits "lobing" artifacts in its polar pattern at specific frequencies. At 3kHz with 25cm tube length, you observe unexpected sensitivity at 60° off-axis. Explain this phenomenon using wave interference principles.
- A) Manufacturing defect
- B) At 3kHz, 2.2 wavelengths fit along tube; specific port phases create constructive interference at 60° creating sensitivity lobe; frequency-dependent comb filtering of interference tube
- C) All angles should be equal
- D) Impossible phenomenon

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 7
You're designing a microphone array with three cardioids in a triangular configuration, each 60° apart. For a source at 0°, what's the combined polar pattern, and where are the nulls?
- A) Simple cardioid
- B) Complex multi-lobed pattern with enhanced forward pickup and nulls at ~120° and ~240° where individual nulls align; creates "tighter" effective pattern through array gain
- C) Omnidirectional
- D) Random pattern

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 8
A hypercardioid mic with maximum rejection at 110° is used in a room with strong first reflection at 105°. The reflection is -12dB relative to direct sound. Given hypercardioid's ~20dB rejection at null but only ~15dB at 105°, what's the effective reflection level?
- A) Completely rejected
- B) Direct: 0dB; Reflection: -12dB - 15dB = -27dB; 5° off null significantly degrades rejection from theoretical maximum
- C) -12dB unchanged
- D) Amplified

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 9
At 10kHz, a nominally omnidirectional SDC microphone becomes directional (cardioid-like) due to diaphragm size (12mm diameter). Calculate the wavelength-to-diameter ratio and explain the transition.
- A) Remains omnidirectional
- B) At 10kHz, λ≈34mm; diameter/λ ≈ 0.35; when d approaches λ/2, diffraction and acoustic shadowing create directivity; transition begins around λ/d ≈ 3
- C) Only affects sensitivity
- D) Size doesn't affect pattern

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
A mid-side (M/S) configuration uses cardioid (M) and figure-8 (S). A source at 45° right produces what signal distribution: M-mic output is 0.85x and S-mic is 0.71x relative to on-axis. After M/S decoding, what's the level in the right channel?
- A) 0.71x
- B) R = M-S = 0.85 - 0.71 = 0.14; much quieter than left; demonstrates M/S imaging geometry
- C) Equal to left
- D) 0.85x

**Answer: B**

**Expert Explanation:** Mid-Side (M/S) recording is a stereo technique that offers excellent mono compatibility and adjustable width.
**Image:** !["Diagram"](/images/diagram_mid_side_v2.png)
**Expert Quote:** "Terms like mid-side are fundamental. - Dictionary"




---

---

## TOPIC 4: GENERAL MICING TECHNIQUES

### Question 1
You're recording a source with three mics: A (close, 4"), B (mid, 18"), C (room, 10 feet). Phase-aligning B and C to A requires delays of 1.2ms and 8.5ms respectively. When you sum all three, a comb filter notch appears at 780Hz. Calculate the problematic distance relationship and explain why phase-alignment didn't solve this.
- A) Perfect alignment, no issue
- B) B-C spacing ≈ 0.22m creates 780Hz interference; phase-aligning to A doesn't fix B-C relative spacing; need to address B-C distance relationship separately
- C) Impossible to have notch after alignment
- D) All three mics interfere equally

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 2
A kick drum close mic (2" from beater) and outside mic (3 feet from head) are summed. The time difference is ~8ms. At what frequency does this time difference equal 180° phase (first cancellation), and what musical note does this affect?
- A) No cancellation possible
- B) f = 1/ = 62.5Hz; this is between B1 and C2; fundamentals of low bass notes significantly affected
- C) Only affects high frequencies
- D) 8ms is insignificant

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 3
You're using proximity effect for bass enhancement. The mic is cardioid (first-order gradient). At 4" distance, 100Hz is boosted +6dB. To achieve the same +6dB boost at 50Hz while maintaining the same proximity effect at 100Hz, what's the required distance change?
- A) Move to 2"
- B) Proximity effect is frequency-dependent; can't maintain 100Hz boost while increasing 50Hz boost with simple distance change; need EQ or different pattern
- C) Move to 8"
- D) No change needed

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 4
An acoustic guitar is miced with coincident pair (X/Y) at 12" and a room mic at 8 feet. The room has RT60 of 0.4s. When mixing, at what delay time should you time-align the room mic to avoid early reflection comb filtering, but preserve natural reverb decay?
- A) Zero delay
- B) Calculate true acoustic delay but don't align; natural delay maintains spatial depth; only align if comb filtering affects critical frequency range
- C) Maximum delay
- D) RT60 determines delay

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 5
You're using spaced pair overheads (6 feet apart) on drums. Snare is centered and equidistant. Tom-1 is 2 feet closer to left mic. What's the first comb filter notch frequency for Tom-1, and how does this affect the stereo image?
- A) No combing with spaced pairs
- B) 2-foot difference ≈ 280Hz first notch; creates frequency-dependent image shift; Tom-1 may "pull" right at frequencies where left mic is attenuated
- C) Image unaffected
- D) Only amplitude affected

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
A source produces 90dB SPL at 1m. Using inverse square law, you calculate 102dB at 0.25m. You place a cardioid mic at 0.25m. Measured level is 108dB due to proximity effect. At what frequency range is this 6dB excess primarily occurring?
- A) All frequencies equally
- B) Below ~500Hz for typical cardioid; proximity effect adds to inverse-square gain; creates ~6dB boost at 100-200Hz
- C) Above 5kHz
- D) Proximity effect doesn't add to inverse square

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 7
Three mics on a source: Mic A (cardioid, on-axis), Mic B (omni, same position), Mic C (cardioid, 90° off-axis). All 6" from source. When summing, which pair causes most phase issues, and why?
- A) All pairs identical
- B) A+C most problematic: same distance but different frequency response due to patterns + proximity effect varies with pattern; creates frequency-dependent phase shifts
- C) B+C
- D) A+B

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 8
You're recording in a room with parallel walls 4m apart. Standing waves occur at 42.5Hz, 85Hz, 127.5Hz (n×c/2d). Your close mic is 15cm from source. At what frequencies does the mic-to-source distance create comb filtering that interacts with room modes?
- A) No interaction
- B) Microphone creates reflections from source itself at ~1.13kHz and harmonics; different domain than room modes; both phenomena coexist
- C) Same frequencies as room modes
- D) Impossible scenario

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 9
A figure-8 room mic is positioned 8 feet from kit with nulls facing side walls (6 feet away). First reflection from side wall hits null at -30dB. Wall reflection coefficient is 0.8 (absorption coefficient 0.2). What's the effective rejection of this reflection?
- A) -30dB total
- B) Polar null: -30dB; wall reflection: -2dB); total rejection: -32dB; mic placement + acoustics compound rejection
- C) Pattern rejection doesn't combine with absorption
- D) 0dB

**Answer: B**

**Expert Explanation:** Figure-8 picks up front and back, rejecting sides. Great for ribbons.
**Image:** !["Diagram"](/images/svg/polar_pattern_figure8.svg)
**Expert Quote:** "Terms like figure-8 are fundamental. - Dictionary"




---

### Question 10
You're phase-aligning three mics on an amp: close (1"), medium (12"), far (6 feet). You align medium and far to close mic. A resonant peak at 800Hz suddenly becomes narrow (high Q). Explain what's happening acoustically.
- A) Phase alignment caused this
- B) Resonance was naturally wide due to phase smearing across three mics with different arrival times; alignment increased Q by removing temporal smearing, revealing true cabinet resonance
- C) Microphone malfunction
- D) Impossible scenario

**Answer: B**

**Expert Explanation:** Mic placement is the most powerful EQ.
**Image:** !["Diagram"](/images/svg/direct_vs_room.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

---

## TOPIC 5: DRUMS

### Question 1
A 22" kick drum tuned to 55Hz (A1) creates second harmonic at 110Hz. Inside mic is 3" from beater (attack-heavy); outside mic is 4 feet away (resonance-heavy). When summed, 110Hz is reduced by 8dB. Calculate the time difference and explain why 110Hz is specifically affected.
- A) Random effect
- B) Time difference ≈ 11.5ms; at 110Hz, 11.5ms ≈ 1.26 cycles ≈ 90° phase shift; not complete cancellation but significant reduction; fundamental less affected
- C) All frequencies affected equally
- D) Time doesn't affect harmonics

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 2
Overhead mics using Recorderman technique are positioned 32" from snare center. Snare fundamental is 180Hz with strong 3kHz snap. Floor tom (12 feet away) fundamental is 85Hz. What frequency-dependent imaging issues arise?
- A) Perfect imaging
- B) At 85Hz, 12-foot spacing creates ambiguous imaging; at 3kHz, 32" overhead placement provides sharp localization; bass frequencies wander, highs are precise
- C) All frequencies image identically
- D) Distance doesn't affect imaging

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 3
You're using four mics on snare: top, bottom, two overheads (X/Y, 4 feet high, 3 feet from snare). All are time-aligned to top mic. Snare's 200Hz fundamental exhibits 4dB boost when all mics are summed vs. top mic soloed. Explain this using constructive interference.
- A) Impossible boost from alignment
- B) Despite time alignment, 200Hz has λ≈1.7m; 3-4 foot paths ≈ 2λ, creating in-phase summation; voltage sums coherently: four signals = +12dB theoretical, -8dB from incomplete coherence = +4dB net
- C) Microphone gain increase
- D) Random variation

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 4
A kick drum has port (bass reflex) tuned to 60Hz. Inside mic captures beater fundamental at 48Hz. Outside mic at port captures 60Hz peak. When phase-aligned, 54Hz exhibits null. What's the acoustic explanation?
- A) Alignment error
- B) 48Hz and 60Hz fundamentals create beat frequency at 12Hz; combined response has irregular notch near geometric mean due to destructive phase relationship between different source locations
- C) Single frequency source
- D) Port doesn't produce output

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
Spaced pair overheads are 6 feet apart, 4 feet high. Ride cymbal is 2 feet right of center, 3 feet from left OH, 4 feet from right OH. At 8kHz (λ≈4.25cm), what's the time difference in samples at 44.1kHz, and does this cause comb filtering or beneficial stereo width?
- A) No time difference
- B) Distance difference ≈ 1 foot ≈ 1ms ≈ 44 samples; at 8kHz this represents ~90° phase shift, creates beneficial stereo width rather than comb filtering due to critical band masking at high frequencies
- C) Complete cancellation
- D) Only mono summing matters

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
You're using Glyn Johns method: left OH (4 feet high, 4 feet from snare), right OH (4 feet high, 4 feet from snare but 6 feet from kick). When soloing kick in stereo, it pulls left. Calculate the Haas effect delay and explain the imaging.
- A) Centered kick
- B) Kick-to-left-OH: 4 feet ≈ 4ms; kick-to-right-OH: 6 feet ≈ 6ms; 2ms Haas delay creates precedence effect pulling kick left despite similar amplitude
- C) No precedence effect at 2ms
- D) Kick is only in left mic

**Answer: B**

**Expert Explanation:** Drums require careful multi-mic phase alignment.
**Image:** !["Diagram"](/images/explanations/mic_placement_snare.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 7
Floor tom resonant frequency is 95Hz (Q=5). Tom mic is 2" above head. When you add overheads (5 feet away), resonant peak Q increases to 8. Explain this phenomenon using coherent vs. incoherent summation.
- A) Coincidence
- B) Close mic captures direct sound in-phase; overheads capture with phase delay; partial destructive interference at frequencies around resonance narrows response, increasing Q
- C) Microphone resonance
- D) Q cannot increase from adding mics

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 8
Hi-hat is 30° off-axis to snare top mic (cardioid). Snare is on-axis. Both sources are 2" from mic. Hi-hat produces 95dB SPL, snare produces 105dB SPL at mic. Calculate the effective separation considering proximity effect and polar pattern.
- A) 10dB separation
- B) Snare: 105dB + 6dB proximity = 111dB; Hi-hat: 95dB + 6dB proximity - 2dB = 99dB; effective separation ≈ 12dB
- C) No proximity effect at 2"
- D) Polar pattern doesn't matter at close distance

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 9
You're using Recorderman with 40" from snare to each OH mic. Crash cymbal is 52" from left OH, 30" from right OH. At 10kHz, this creates what stereo effect, and is it beneficial or problematic?
- A) Mono image
- B) 22" difference ≈ 1.6ms at 10kHz ≈ 16 cycles; large phase shift but at 10kHz, creates wide stereo image due to temporal localization; generally beneficial for cymbals
- C) Complete cancellation
- D) Distance doesn't affect high frequencies

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
Kick drum with inside and outside mics exhibits 3:1 ratio of attack to sustain on inside mic, 1:3 ratio on outside mic. You want 1:1 balance. What's the optimal mixing ratio considering both level and phase?
- A) 50/50 mix
- B) Phase-align first; then approximately 25% inside + 75% outside to balance transient energy vs. sustained tone, or use parallel compression on inside to bring up sustain
- C) 100% inside only
- D) Impossible to balance

**Answer: B**

**Expert Explanation:** The 3:1 Rule helps minimize phase cancellation by keeping adequate distance between microphones.
**Image:** !["Diagram"](/images/svg/3_to_1_rule_diagram.svg)
**Expert Quote:** "Terms like 3:1 are fundamental. - Dictionary"




---

---

## TOPIC 6: STRINGS

### Question 1
An acoustic guitar's lowest string (E2, 82.4Hz) produces wavelength of 4.13m. You're micing at 12th fret (15cm from string) with cardioid SDC. At the fundamental frequency, what's the ratio of wavelength to mic distance, and what does this imply about near-field vs. far-field behavior?
- A) Near-field only
- B) λ/d ≈ 27.5; at <0.16λ distance, operating in near-field; particle velocity dominates pressure; cardioid's gradient operation interacts with near-field reactive component
- C) Far-field only
- D) Equal field strength

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 2
A guitar amp has open-back design. Speaker forward output is 0° reference. Rear output has -6dB level and 180° phase shift. You mic front at 1 foot and rear at 1 foot, then sum. At what frequency does the path-difference phase shift combine with the inherent phase reversal to create constructive interference?
- A) All frequencies cancel
- B) 2-foot difference = 180° at 280Hz; combined with inherent 180° from open-back = 360°; constructive interference at 280Hz and odd harmonics; complex comb filtering
- C) No interference possible
- D) Only one source radiates

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 3
A violin's body resonates with modes at 280Hz (A-mode), 480Hz (C-bout), and higher. Micing at 2 feet captures balanced response. At 6 inches, 280Hz measures +8dB. Calculate the proximity effect contribution vs. actual body radiation increase.
- A) All proximity effect
- B) Inverse square: 2ft→6" ≈ +12dB; measured +8dB total; body radiation may actually be -4dB at very close distance due to nodal patterns; proximity adds ~12dB, body loses ~4dB = +8dB net
- C) Only body radiation
- D) No change possible

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 4
A 12-string guitar's paired strings (e.g., E strings at 329.6Hz and 330.2Hz) create beating. At 8" mic distance, you hear 0.6Hz beating clearly. Moving to 24", the beating becomes less pronounced. Explain using spatial averaging.
- A) Microphone malfunction
- B) At 8", mic resolves individual strings' interference; at 24", mic spatially averages the sound field; beating amplitude reduced due to averaging
- C) Distance doesn't affect beating
- D) Beating frequency changes

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 5
An electric bass amp (ported, tuned to 50Hz) is miced at speaker cone (position A) and at port (position B), both 6" away. At 50Hz, port output is +12dB relative to cone. At 200Hz, cone is +6dB relative to port. Design an optimal 2-mic blend strategy.
- A) 50/50 blend always
- B) High-pass A at ~80Hz, low-pass B at ~80Hz, sum; exploits each position's strength: port for 50Hz extension, cone for 100-200Hz punch; minimizes phase issues through filtering
- C) Use only one mic
- D) Port captures all frequencies equally

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
A cello's C-string (65.4Hz, λ≈5.2m) is bowed. Microphone is 1.5m from instrument. Reflection from floor (2m below mic) arrives delayed. Calculate the reflection delay and the first comb filter notch.
- A) No comb filtering
- B) Reflection path difference ≈ 0.8m ≈ 2.4ms; first notch at ~210Hz; 65.4Hz fundamental largely unaffected; affects upper harmonics and tone character
- C) All frequencies affected equally
- D) 2m doesn't cause reflections

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 7
A guitar amp speaker (12" diameter, 30cm) exhibits beaming above 1.3kHz (where λ ≈ cone diameter). You place two mics: on-axis and 45° off-axis, both 12" away. At 5kHz, what's the approximate level difference?
- A) No difference
- B) ~6-10dB; beaming increases with frequency; at 5kHz, directivity index high; significant off-axis rolloff creates natural HF reduction
- C) Off-axis is louder
- D) Only affects phase

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
An upright bass has wolf tone at 285Hz (close to D4) due to body resonance matching string frequency. Micing at f-hole vs. bridge produces 15dB difference in wolf tone amplitude (bridge quieter). Explain using body vibration node/antinode locations.
- A) Random difference
- B) Wolf tone creates strong body vibration; f-hole near antinode radiates strongly; bridge near node radiates weakly; position affects coupling to body modes
- C) Bridge doesn't radiate any sound
- D) Wolf tone is not real

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 9
You're recording acoustic guitar with two mics: 12th fret (A) and behind sound hole inside body (B). Mic B is delayed 15ms relative to A due to path through sound hole. At what frequency does this delay equal 180° (cancellation)?
- A) No cancellation possible
- B) f = 1/ = 33.3Hz; below guitar's fundamental range; however, harmonics at 66.6Hz, 100Hz affected; also, group delay causes phase smearing across low-mid frequencies
- C) Only high frequencies affected
- D) 15ms is insignificant

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
A mandolin's paired strings (each pair ~0.6Hz apart) and 14mm spacing between pairs are miced at 20cm. At 660Hz (E5), what's λ relative to string spacing, and how does this affect the mic's spatial resolution?
- A) Mic resolves individual strings
- B) At 660Hz, λ≈51.5cm; 14mm spacing << λ; mic cannot resolve individual string pairs; averages the interference pattern; captures blended chorus effect rather than discrete sources
- C) Distance matters more than wavelength
- D) Frequency doesn't affect resolution

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

---

## TOPIC 7: VOCALS

### Question 1
A vocalist's fundamental frequency is 150Hz (male) with formants at 700Hz (F1), 1200Hz (F2), and 2500Hz (F3). Using a cardioid LDC at 6" with +5dB presence peak at 8kHz and +6dB proximity effect at 100Hz, model the complete frequency response captured at the mic.
- A) Flat response
- B) ~+6dB at 100Hz, flat at formants, +5dB at 8kHz; shifts tonal balance toward bass and "air" while formants remain natural; creates "hi-fi" vocal sound
- C) Only one effect applies
- D) All effects cancel

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 2
Two vocalists stand 3 feet apart, each with cardioid mic at 8". Vocalist A's mic picks up Vocalist B at -18dB (due to distance and cardioid rejection). When both sing identical notes (A4, 440Hz) with 3ms timing difference, what's the effect in Vocalist A's mic?
- A) Perfect isolation
- B) 3ms at 440Hz ≈ 1.3 cycles ≈ 470° phase shift; -18dB bleed with significant phase offset creates comb filtering in A's mic around 166Hz and harmonics; affects tone quality
- C) Complete cancellation
- D) Timing doesn't affect different mics

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 3
A vocalist has sibilance centered at 7.5kHz with 3kHz bandwidth (6-9kHz). The LDC capsule has resonant peak at 15kHz (Q=3). Through mechanical coupling, this creates a secondary peak at 7.5kHz of +3dB. Additionally, proximity effect adds +4dB at 200Hz. Design an optimal recording strategy without EQ.
- A) Accept the response
- B) Use figure-8 pattern OR increase distance to 12", position slightly off-axis; reduces sibilance peak to +1-2dB while maintaining formant balance
- C) Only EQ can fix this
- D) Change microphone entirely

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 4
A pop filter 6" from mic attenuates 2Hz (plosive DC component) by -20dB but should be transparent at 100Hz. Calculate the required mesh porosity/resistance to achieve this characteristic using acoustic impedance principles.
- A) Any mesh works
- B) Requires high acoustic compliance at AC frequencies but significant resistance to DC airflow; typically 20-30% open area with multiple mesh layers creating frequency-dependent impedance
- C) Solid barrier
- D) Impossible to design

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 5
Two vocalists sing in unison with 5ms timing difference (natural human variation). Miced separately then panned hard L/R. At 400Hz, what's the phase difference between channels, and how does this affect mono compatibility?
- A) Perfect mono compatibility
- B) 5ms = 720° at 400Hz; creates effective in-phase summation; but at 500Hz = 900° causes cancellation; frequency-dependent mono issues
- C) No phase issues
- D) Timing doesn't affect mono

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
A vocalist maintains 8" distance but moves 2" side-to-side (±1" from center). For a cardioid mic, this creates what level variation at 0° (center), ±15° (1" off-center at 8")?
- A) No change
- B) At ±15°: ~0.3dB reduction; BUT proximity effect varies: center 8" has +5dB at 100Hz, off-center √≈8.06" has +4.9dB; creates subtle low-frequency modulation with movement
- C) Large level changes
- D) Only high frequencies affected

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 7
A shock mount with 18Hz resonance supports a 500g microphone. Calculate the spring constant (k=mω²), and determine the isolation at 60Hz vocal plosive energy.
- A) No isolation at 60Hz
- B) ω=2πf=113 rad/s; k=0.5kg×²≈6400 N/m; at 60Hz, isolation ≈20dB
- C) Complete isolation
- D) Impossible to calculate

**Answer: B**

**Expert Explanation:** Vocals are the focal point; control plosives and sibilance.
**Image:** !["Diagram"](/images/explanations/mic_placement_vocal.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 8
An opera singer produces 120dB SPL peaks at 1 meter. Mic is at 50cm with 20mV/Pa sensitivity. Calculate SPL at mic, sound pressure, and mic output voltage.
- A) 120dB SPL, 20Pa, 400mV
- B) ~126dB SPL; P=20Pa×10^≈40Pa; V=20mV/Pa×40Pa=800mV; approaches preamp/converter limits
- C) Same as 1m: 120dB
- D) Impossible values

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 9
A choir of 12 singers arranged in arc, each 3m from stereo pair (ORTF). One singer is off-pitch by +15 cents at 440Hz (A4). In the stereo recording, what frequency does this singer actually produce, and what's the beat frequency with the ensemble?
- A) No beating audible
- B) +15 cents = 440Hz × 2^ ≈ 443.8Hz; beat frequency = 443.8-440 = 3.8Hz; clearly audible beating in the choir recording
- C) Pitch difference inaudible
- D) Cents don't translate to Hz

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
A vocal booth has RT60 of 0.15s with flutter echo at 285Hz (room mode). Using omni vs. cardioid mic at 25cm from vocalist, how does pattern choice affect the captured room signature?
- A) No difference between patterns
- B) Omni captures room reflections equally; cardioid rejects rear reflections; reduces 285Hz mode pickup by ~15dB if positioned with null toward wall; pattern choice dramatically affects room interaction
- C) Only distance matters
- D) Flutter echo unaffected by pattern

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

---

## TOPIC 8: WIND INSTRUMENTS

### Question 1
A saxophone's bell radiates primarily above 2kHz (radiation angle ~60°). Tone holes radiate 200Hz-2kHz with nearly omnidirectional pattern below 1kHz. Design a 2-mic strategy for jazz (solo emphasis) vs. classical (blend) contexts.
- A) Same approach for both
- B) Jazz: SDC at bell captures 2-12kHz presence + distant mic for body; Classical: Single mic at 2-3 feet captures integrated radiation pattern from bell+holes with room blend
- C) Only one mic needed
- D) Pattern doesn't vary with frequency

**Answer: B**

**Expert Explanation:** Omnis pick up sound equally from all directions and have no proximity effect.
**Image:** !["Diagram"](/images/svg/polar_pattern_omni.svg)
**Expert Quote:** "Terms like omnidirectional are fundamental. - Dictionary"




---

### Question 2
A trumpet at fff produces 125dB SPL at bell. Micing at 30cm (on-axis) delivers 131dB SPL to mic (inverse square). Above 3kHz, bell beaming adds +8dB directivity gain. Total SPL at mic capsule for 5kHz content is what, and what implications for mic choice?
- A) 131dB SPL
- B) ~139dB SPL at 5kHz; exceeds many condensers' max SPL; requires pad, dynamic mic, or increased distance; high-order harmonics even more problematic
- C) 125dB
- D) Beaming doesn't add SPL

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 3
A flute's embouchure hole produces jet noise up to 15kHz. Fundamental is 523Hz (C5). You're comparing two mics: LDC (HF -3dB at 12kHz) vs. SDC (HF -3dB at 18kHz). At 6" distance, model the captured spectrum difference.
- A) Identical capture
- B) LDC captures fundamental and harmonics to 12kHz adequately but rolls off breathiness/air; SDC maintains response through 15kHz preserving full breath articulation; SDC captures more "detailed" flute sound
- C) Only fundamental matters
- D) Distance determines HF response only

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
A brass section (2 trumpets, 2 trombones, tuba) in big band arrangement produces combined 118dB SPL at 8 feet. You're using single ribbon (1.5mV/Pa sensitivity, 135dB max SPL) in figure-8 pattern positioned 3m away with nulls toward drum kit. Calculate effective SPL at mic and assess margin.
- A) 118dB, no margin
- B) 8 feet to 3m is closer; inverse square: ~+1dB = 119dB SPL; figure-8 positioned optimally captures section while rejecting drums; 119dB vs. 135dB max = 16dB margin adequate for peaks
- C) Ribbon will be damaged
- D) Distance doesn't affect SPL at mic

**Answer: B**

**Expert Explanation:** Figure-8 picks up front and back, rejecting sides. Great for ribbons.
**Image:** !["Diagram"](/images/svg/polar_pattern_figure8.svg)
**Expert Quote:** "Terms like figure-8 are fundamental. - Dictionary"




---

### Question 5
A clarinet is a closed-pipe resonator emphasizing odd harmonics (f, 3f, 5f...). Fundamental is 147Hz (D3). Micing at bell vs. mid-body (at tone holes) produces what harmonic balance difference?
- A) Identical balance
- B) Bell emphasizes higher odd harmonics; mid-body captures more fundamental and 3rd harmonic from tone hole radiation; bell sound is "brighter"
- C) Only one position works
- D) Clarinet has even harmonics

**Answer: B**

**Expert Explanation:** Wind instruments are high SPL sources.
**Image:** !["Diagram"](/images/sax_micing_1770033437547.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 6
A French horn's bell is 30cm diameter. At what frequency does the bell circumference equal one wavelength, and what's the significance for radiation pattern?
- A) Pattern doesn't change with frequency
- B) Circumference ≈ 94cm; f = c/λ ≈ 360Hz; below this, radiation is omnidirectional; above this, beaming begins; explains why horn sounds diffuse in low register, directional in high register
- C) Diameter determines frequency
- D) Only bell diameter matters

**Answer: B**

**Expert Explanation:** Omnis pick up sound equally from all directions and have no proximity effect.
**Image:** !["Diagram"](/images/svg/polar_pattern_omni.svg)
**Expert Quote:** "Terms like omnidirectional are fundamental. - Dictionary"




---

### Question 7
A bassoon has double reed producing complex harmonic series to 4kHz. The bore is conical (unlike cylindrical oboe/clarinet). Boot joint has tone holes radiating 100-500Hz. Bell radiates 500Hz-4kHz. You want balanced capture. Design 1-mic and 2-mic strategies.
- A) Any position works
- B) 1-mic: 2-3 feet aimed at mid-body integrates all sources; 2-mic: SDC at boot + SDC at bell, blend 60/40; mimics radiation pattern distribution
- C) Only bell radiates
- D) All frequencies radiate equally from all points

**Answer: B**

**Expert Explanation:** Balanced connections cancel out noise interference using phase inversion on the cold wire.
**Image:** !["Diagram"](/images/svg/equipment_di_box_function.svg)
**Expert Quote:** "Terms like balanced are fundamental. - Dictionary"




---

### Question 8
A trombone slide is fully extended (F2, 87.3Hz, slide position 6). Bell-to-mic distance is 2 feet. Slide shortens to position 1 (B♭2, 116.5Hz), effective bore length decreases. Does this change the optimal mic position, and why?
- A) Position must track slide
- B) Mic position relative to bell stays constant; bore length changes affect internal resonance, not external radiation point; bell remains primary radiator; maintain bell-focused position
- C) Must mic the slide
- D) Frequency change requires re-positioning

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
An alto saxophone (E♭) plays altissimo register (above 1.5kHz fundamental). At these frequencies (λ <23cm), micing 6" vs. 24" from bell creates what capture difference?
- A) Only level changes
- B) 6": near-field, captures reactive field and beamed HF content; 24": far-field, integrated radiation, less beaming effect; 6" has more "edge," 24" more balanced with tone holes' contribution
- C) Identical spectrum
- D) Distance doesn't affect spectrum

**Answer: B**

**Expert Explanation:** Balanced connections cancel out noise interference using phase inversion on the cold wire.
**Image:** !["Diagram"](/images/svg/equipment_di_box_function.svg)
**Expert Quote:** "Terms like balanced are fundamental. - Dictionary"




---

### Question 10
A brass quintet (2 trumpets, horn, trombone, tuba) arranged in arc. Main stereo pair (ORTF) at 12 feet, center. Tuba (87Hz fundamental) and trombone (116Hz) produce bass. At these wavelengths (λ ≈ 3.9m and 2.9m), what's the implication for ORTF's 17cm spacing?
- A) Perfect stereo imaging
- B) 17cm << λ for bass frequencies; time-of-arrival differences insignificant; bass imaging relies on amplitude differences from 110° angle; below ~500Hz, stereo image becomes amplitude-based rather than time-based
- C) Bass has no stereo image
- D) Spacing creates bass imaging

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

## TOPIC 9: PIANO

### Question 1
A concert grand piano has string lengths: A0 (27.5Hz) = 2.00m, A4 (440Hz) = 0.35m. Soundboard area ≈ 1.5m². At 27.5Hz (λ≈12.4m), the soundboard is <λ/8 in dimension. What's the acoustic radiation efficiency implication, and how does micing distance affect bass capture?
- A) Perfect radiation at all frequencies
- B) Below 200Hz, soundboard radiates inefficiently; creates weak acoustic output; close micing couples more to near-field pressure; distant micing loses bass due to radiation inefficiency; explains "thin" distant piano sound
- C) All frequencies radiate equally
- D) Distance doesn't affect frequency balance

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
A piano's strings for middle C (262Hz): 3 strings tuned 262.0Hz, 262.5Hz, 262.2Hz (intentional detuning for chorus). At 12" mic distance with SDC, calculate the beat frequencies and explain the temporal pattern.
- A) Single tone, no beating
- B) Primary beats: 0.5Hz and 0.3Hz; creates complex amplitude modulation; 12" distance captures averaged interference pattern creating rich, shimmering tone
- C) Beating is inaudible
- D) Microphone can't capture beats

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 3
ORTF pair positioned 24" above strings, 18" from hammers. Piano lid on short stick creates partial enclosure. At 2kHz (λ≈17cm), the 17cm mic spacing creates what phase relationship, and how does the partial enclosure affect the stereo image?
- A) No phase issues with ORTF
- B) At 2kHz, 17cm ≈ λ; creates 360° phase wrap-around; with 110° angle, creates complex interference; partial enclosure creates early reflections that enhance spatial depth but complicate phase structure
- C) Perfect stereo at 2kHz
- D) Enclosure doesn't affect phase

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 4
A piano's soundboard exhibits modal resonances: 110Hz, 280Hz, 650Hz. When micing at 6" above soundboard center vs. 6" near edge, 280Hz measures -8dB at edge. Explain using modal node/antinode distribution.
- A) Microphone malfunction
- B) 280Hz mode has node near edge, antinode near center; edge position couples weakly to this mode; demonstrates importance of position relative to modal patterns
- C) All modes equal at all positions
- D) Edge always quieter

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
Spaced pair overheads: 4 feet apart, 3 feet high. Bass note A0 (27.5Hz, λ≈12.4m) vs. treble C8 (4186Hz, λ≈8.1cm). Analyze stereo imaging mechanism for each extreme.
- A) Same imaging mechanism for all frequencies
- B) A0: λ >> 4-foot spacing; pure amplitude-based imaging from level differences; C8: λ << spacing; ~12ms time difference at 4 feet creates distinct time-based imaging; piano exhibits frequency-dependent stereo mechanisms
- C) No stereo imaging possible
- D) Only spacing matters

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
An upright piano's soundboard is vertical. You're micing from behind (back removed) at 18" distance. Reflection from rear wall (6 feet behind piano) arrives delayed. Calculate delay and first comb notch frequency.
- A) No reflection issues
- B) Path difference: 18" to soundboard, 18"+12 feet to wall = ~12 feet difference; ~12ms delay; first notch ≈42Hz; affects fundamental frequencies of lowest notes; positioning closer to soundboard or absorbing rear wall critical
- C) Walls don't create reflections
- D) Only high frequencies affected

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
Decca Tree for piano: center omni 3 feet above center strings, L/R omnis 5 feet above and 3 feet to each side. For treble section (right half of piano), calculate the time difference between center and right mics, and explain imaging implications.
- A) Perfect time alignment
- B) Treble strings closer to right mic; ~2-foot difference ≈ 2ms; right mic arrives earlier creating right-weighted image; center provides stable anchor; creates "natural" wide piano image with spatial depth
- C) Center mic should always be louder
- D) Time differences don't affect imaging

**Answer: B**

**Expert Explanation:** Pianos cover the full frequency spectrum.
**Image:** !["Diagram"](/images/explanations/mic_placement_piano.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 8
Piano hammer velocity: 3m/s strikes string. String compliance and bridge impedance create attack spectrum with 5ms rise time. Using SDC (10μm diaphragm, 1mg mass) vs. LDC (25μm diaphragm, 3mg mass), which captures attack transient more accurately?
- A) Identical capture
- B) SDC: lighter mass enables faster acceleration response; captures sharp attack more accurately; LDC: mass inertia slightly smears fastest transient components; difference most notable in top octave
- C) LDC captures transients better
- D) Diaphragm size doesn't affect transients

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 9
A piano recorded with X/Y at 90° angle, 18" from strings. Lid fully open. The stereo width is adequate but lacks "space." You add a room mic (omni, 12 feet away) at 20% level. What frequency range exhibits the most phase complication, and why?
- A) No phase issues with such low room mic level
- B) 200-800Hz most problematic: wavelengths comparable to distance differences; 20% level is -14dB but still creates notches in this range; below 200Hz, phase differences <90°; above 800Hz, critical band masking reduces audibility
- C) All frequencies equally affected
- D) Room mic level too low to matter

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
Grand piano with lid on short stick vs. fully open exhibits -4dB at 6kHz when measured 2 feet above strings. This is attributed to partial reflection from lid creating destructive interference. At what angle does the lid reflect 6kHz energy to create this interference pattern?
- A) No angle dependence
- B) Short stick ≈ 30° angle; 6kHz λ≈5.7cm; path difference from direct vs. reflected must be ~2.85cm for cancellation; geometric calculation gives reflection angle ~30° creating ~3cm path difference; confirms lid angle as source
- C) Random interference
- D) Lid doesn't reflect high frequencies

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

---

## TOPIC 10: ADVANCED STEREO TECHNIQUES

### Question 1
M/S recording: Mid (cardioid, sensitivity 20mV/Pa) outputs -30dBu. Side (figure-8, sensitivity 15mV/Pa) outputs -36dBu. After M/S decoding (L=M+S, R=M-S), calculate L and R channel levels in dBu and assess stereo width.
- A) Equal L/R channels
- B) L = -30dBu + ≈ -29.5dBu; R = -30dBu - ≈ -30dBu + 6dB phase flip ≈ -30.5dBu; 1dB L/R difference indicates narrow stereo; need to boost S relative to M for width
- C) Cannot calculate without more info
- D) M/S always produces equal L/R

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 2
Blumlein pair (two figure-8s at 90°) positioned 2m from string quartet. Violin 1 at 45° right produces what distribution across the two figure-8 mics, and what's the resulting stereo image after summation?
- A) Only right mic captures violin
- B) 45° lies at -6dB point of each figure-8's front lobe; both mics capture at equal level; after decoding, creates phantom center image; demonstrates Blumlein's natural imaging
- C) Complete null at 45°
- D) Left mic only

**Answer: B**

**Expert Explanation:** Phantom power (+48V) is required to operate condenser microphones and active DI boxes.
**Image:** !["Diagram"](/images/svg/signal_chain_basic.svg)
**Expert Quote:** "Terms like phantom are fundamental. - Dictionary"




---

### Question 3
Spaced omnis 10 feet apart recording orchestra. At 100Hz (λ=3.4m), sources from 30° right create what time and phase difference at the two mics? How does this translate to stereo image?
- A) Clear right localization
- B) 10-foot spacing at 30° creates ~1.5m path difference; ~4.4ms delay; at 100Hz, phase ≈ 160°; creates ambiguous, phase-dependent imaging that varies with mono summing; demonstrates spaced pair weakness at low frequencies
- C) Perfect center image
- D) No phase issues at 100Hz

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
ORTF (17cm spacing, 110° angle) positioned 6 feet from source. At 5kHz, calculate the ITD (interaural time difference equivalent) and ILD (interaural level difference) created by this technique, and explain why these values match psychoacoustic research.
- A) No relationship to human hearing
- B) Max ITD ≈ 0.5ms; ILD ≈ 12dB at 5kHz; approximates human head ITD and ILD; technique mimics binaural localization cues
- C) ORTF creates no level differences
- D) Time and level are unrelated

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
NOS (30cm, 90°) vs. ORTF (17cm, 110°): For a source at 0° (center), both techniques place it centrally. For a source at 45° right, calculate the relative time and intensity differences for each technique and determine which creates wider stereo image.
- A) Identical imaging
- B) NOS: 30cm at 45° ≈ 0.62ms delay, ~3dB level difference at 45°; ORTF: 17cm ≈ 0.35ms, ~6dB level difference at 55° off-axis; NOS wider due to larger time differences despite smaller level differences
- C) ORTF always wider
- D) Angle is only factor

**Answer: B**

**Expert Explanation:** Stereo techniques enhance width.
**Image:** !["Diagram"](/images/svg/stereo_xy_diagram.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 6
A Decca Tree (center + L/R 2m apart) records full orchestra. The center mic is 1.5m forward of L/R. String section (center-front) is equidistant from all three mics. Brass section (center-rear) is 3m from center mic, 4m from L/R. Model the imaging for brass.
- A) Brass in perfect center
- B) Brass closer to center mic than L/R; ~3.3ms earlier in center; combined with amplitude, creates center-weighted but slightly forward image; demonstrates Decca Tree's spatial distribution
- C) Brass in extreme left/right
- D) All sections image identically

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
M/S recording with M (cardioid) and S (figure-8). During decoding, the S signal is delayed by 2ms relative to M before the M+S and M-S matrix. For a 1kHz source at 90° right, what's the effect on stereo image?
- A) No effect from delay
- B) Delay creates frequency-dependent phase rotation; at 1kHz, 2ms = 720° = 0° net; but creates comb filtering notches at 250Hz, 750Hz, etc.; stereo width becomes frequency-dependent with irregular response
- C) Perfect stereo maintained
- D) Delay only affects mono

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 8
XY with 135° angle vs. 90° angle: Both positioned 1m from source. At 4kHz, calculate the effective stereo width difference using interchannel correlation coefficient.
- A) No difference
- B) 135° creates less pattern overlap; reduced interchannel correlation vs. 90°; 135° produces wider stereo image with less center fill; affects perceived soundstage width
- C) Angle doesn't affect stereo width
- D) Only distance matters

**Answer: B**

**Expert Explanation:** Stereo techniques enhance width.
**Image:** !["Diagram"](/images/svg/stereo_xy_diagram.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 9
Spaced pair with 8 feet spacing, 10 feet from orchestra. Calculate the maximum time difference for sources from extreme left to extreme right, and determine if this exceeds the Haas fusion window (40ms) for spatial confusion.
- A) Always within Haas window
- B) Extreme angles create ~7-8ms maximum ITD; well within 40ms Haas window; creates spatial width without echo; however, at frequencies where 7ms ≈ half-cycle, phase ambiguity creates spatial wandering
- C) Exceeds Haas window
- D) Time differences don't affect stereo

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
A room has RT60 of 1.8s. You're using ORTF (coincident pair) vs. spaced pair (3m spacing) for chamber orchestra. When the stereo image is collapsed to mono, which technique exhibits more timbral coloration from phase cancellation, and at what frequency range?
- A) Equal coloration
- B) Spaced pair exhibits comb filtering below 500Hz where 3m spacing creates significant phase shifts; ORTF maintains mono compatibility with minimal coloration; demonstrates coincident advantage for broadcast/streaming mono compatibility
- C) ORTF has more coloration
- D) RT60 prevents phase issues

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

---

## TOPIC 11: HOW MICROPHONES WORK

### Question 1
A condenser capsule has 60V polarization, 50pF capacitance at rest. Diaphragm moves 2μm, changing spacing from 20μm to 18μm. Calculate the capacitance change and resulting voltage change, considering the parallel-plate capacitor formula C = εA/d.
- A) No voltage change
- B) C ∝ 1/d; C changes from 50pF to ~55.6pF; ΔC = 5.6pF; ΔV = -V = -60V × 5.6/50 ≈ -6.7V; demonstrates high sensitivity of condenser
- C) Voltage increases
- D) Capacitance doesn't change

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 2
A ribbon microphone has aluminum ribbon: 2mm wide, 25mm long, 2μm thick, in 0.8 Tesla magnetic field. For 1Pa sound pressure (94dB SPL) creating 0.1m/s ribbon velocity, calculate the induced voltage using V = BLv (Faraday's law).
- A) Cannot calculate
- B) V = 0.8T × 0.025m × 0.1m/s = 2mV; demonstrates why ribbons have low output sensitivity
- C) 20mV
- D) 200mV

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 3
A dynamic mic's voice coil has 50 turns, each 2cm diameter (6.28cm circumference). Magnetic flux density is 1.2T. For diaphragm velocity of 0.05m/s at 1kHz, calculate total induced voltage and explain frequency dependence.
- A) Frequency-independent output
- B) Total conductor length = 50 × 0.0628m = 3.14m; V = BLv = 1.2 × 3.14 × 0.05 = 188mV; output is velocity-proportional, thus constant with frequency for constant velocity input
- C) 1.88mV
- D) Infinite at 1kHz

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 4
A first-order gradient mic's proximity effect follows 6dB/octave rolloff as distance increases. At 10cm distance, 100Hz is reference 0dB. Calculate the response at 50Hz and 200Hz at the same distance, and at 20cm distance for all frequencies.
- A) All frequencies equal at all distances
- B) At 10cm: 50Hz = +6dB, 200Hz = -6dB; At 20cm: all frequencies -6dB relative to 10cm; demonstrates frequency and distance dependence
- C) Only distance matters
- D) No proximity effect

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 5
A dual-diaphragm condenser creates cardioid pattern by combining front capsule (F) at 1.0x gain and rear capsule (R) at 0.5x gain with opposite polarity. For a sound at 120° (rear-side), F receives signal at cos(120°)=-0.5, R receives cos(60°)=+0.5. Calculate net output.
- A) Complete cancellation
- B) Net = F×1.0 + R× = + 0.5× = -0.75; demonstrates cardioid's -3.5dB at 120°≈-2.5dB, accounting for voltage to power conversion)
- C) Maximum output
- D) Random output

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 6
An electret condenser uses 100V permanently charged dielectric. Over time, charge decays to 95V (5% loss). How does this affect sensitivity, assuming linear capsule mechanics?
- A) Sensitivity increases
- B) Sensitivity decreases by ~5%; output voltage ∝ polarizing voltage; demonstrates aging characteristic of electret capsules
- C) No change in sensitivity
- D) Complete failure

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 7
A ribbon microphone's ribbon has compliance of 5×10⁻⁴ m/N and mass of 0.8mg. Calculate the resonant frequency using f₀ = (1/2π)√(k/m), where k = 1/compliance = 2000 N/m.
- A) No resonance
- B) f₀ =√ =√ ≈ 252Hz; low-frequency resonance affects bass response and LF extension
- C) 16Hz
- D) 2.5kHz

**Answer: B**

**Expert Explanation:** Ribbon mics are smooth and warm but fragile.
**Image:** !["Diagram"](/images/svg/mic_ribbon_construction.svg)
**Expert Quote:** "Terms like ribbon are fundamental. - Dictionary"




---

### Question 8
A condenser mic's FET amplifier has 15pF input capacitance. The capsule is 50pF. At what frequency does this capacitance with a 10MΩ input resistor create a -3dB rolloff using f = 1/(2πRC)?
- A) 245Hz
- B) ~245Hz; f = 1/ ≈ 245Hz; demonstrates importance of high-input-impedance amplifier for LF extension
- C) 2.45kHz
- D) No rolloff possible

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 9
Two identical cardioid capsules create a figure-8 pattern when both capsules receive signal but one is phase-inverted. For a source at 90° (side), front capsule outputs +0.5 (cardioid response at 90°), rear capsule outputs +0.5 but inverted to -0.5. Calculate net output.
- A) Maximum output
- B) Net = 0.5 + = 0; demonstrates how dual cardioid can create figure-8 null at sides; validates synthetic pattern creation
- C) No cancellation
- D) Random output

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 10
A measurement microphone has diffuse-field calibration with +4dB HF boost above 4kHz to compensate for pressure buildup. When measuring diffuse reverberant field at 8kHz, the mic reads 80dB. What's the true SPL of the diffuse field?
- A) 80dB
- B) True SPL ≈ 76dB; mic is pre-equalized to show flat response in diffuse field by compensating for pressure doubling
- C) 84dB
- D) Calibration doesn't affect readings

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

---

## TOPIC 12: MICROPHONE ACCESSORIES

### Question 1
A pop filter mesh has 40 threads per inch (0.635cm spacing). Sound wavelength at 100Hz is 340cm. Calculate the mesh spacing as a percentage of wavelength and explain why the filter is transparent at 100Hz but blocks DC airflow.
- A) Mesh blocks all frequencies equally
- B) Mesh spacing is 0.19% of wavelength at 100Hz; acoustically "invisible" to audio; DC airflow particles have effectively infinite "wavelength" and are blocked by physical mesh barrier
- C) 100Hz is blocked
- D) Wavelength doesn't matter

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 2
A shock mount system has two resonances: primary at 15Hz (vertical) and secondary at 25Hz (rotational). Calculate the isolation at 80Hz for both modes, assuming 12dB/octave rolloff above each resonance.
- A) Same isolation for both modes
- B) Vertical: 80/15 = 5.33× = 29dB isolation; Rotational: 80/25 = 3.2× = 20dB isolation; demonstrates multi-mode isolation behavior
- C) No isolation at 80Hz
- D) Complete isolation

**Answer: B**

**Expert Explanation:** Accessories ensure clean recording.
**Image:** !["Diagram"](/images/svg/mic_shock_mount_diagram.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 3
An XLR cable has 100pF/m capacitance. A 30m cable connects ribbon mic (50kΩ source impedance at high frequencies due to transformer) to preamp. Calculate the -3dB rolloff frequency and assess impact on frequency response.
- A) No rolloff with balanced cable
- B) Total C = 3000pF; f = 1/ ≈ 1kHz; severe HF rolloff; demonstrates why ribbon transformers are critical for impedance matching
- C) Rolloff at 100kHz only
- D) Balanced cancels capacitance

**Answer: B**

**Expert Explanation:** XLR is a balanced 3-pin connector standard for microphones and professional audio gear.
**Image:** !["Diagram"](/images/svg/cable_xlr_pinout.svg)
**Expert Quote:** "Terms like xlr are fundamental. - Dictionary"




---

### Question 4
A foam windscreen has acoustic impedance of 500 rayl (Pa·s/m) for DC airflow but <50 rayl for 200Hz audio. Wind blast peak pressure is 50Pa at 2Hz. Calculate the insertion loss for wind vs. audio.
- A) Equal attenuation for all frequencies
- B) Wind: High impedance creates ~20dB attenuation; Audio: Low impedance creates <1dB loss; frequency-dependent impedance enables selective attenuation
- C) Wind passes through freely
- D) Audio is blocked

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
A blimp (zeppelin) windscreen creates 15cm air gap between outer screen and microphone. At what frequency does this gap equal λ/4, creating potential resonance, and what's the acoustic implication?
- A) No resonance possible
- B) λ/4 at 15cm: f = c/4d = 340/ ≈ 567Hz; potential resonance at mid-frequency; requires internal acoustic damping to prevent coloration
- C) Only wind frequencies resonate
- D) Gap size doesn't affect audio

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 6
Two XLR cables: Cable A (copper, 0.5mm²) has 100Ω/km DC resistance; Cable B (silver-plated, 0.5mm²) has 95Ω/km. For 10m length into 2kΩ preamp input, calculate the voltage loss percentage and assess audibility.
- A) Significant audible difference
- B) Cable A: 1Ω total; Cable B: 0.95Ω; voltage loss into 2kΩ: <0.05%; completely inaudible; demonstrates that conductor material is irrelevant for short professional runs with proper impedance matching
- C) 5% loss
- D) Cannot calculate

**Answer: B**

**Expert Explanation:** XLR is a balanced 3-pin connector standard for microphones and professional audio gear.
**Image:** !["Diagram"](/images/svg/cable_xlr_pinout.svg)
**Expert Quote:** "Terms like xlr are fundamental. - Dictionary"




---

### Question 7
A shock mount uses elastic cord with 500 N/m spring constant supporting 600g microphone. Calculate resonant frequency and predict isolation performance at 60Hz (typical footfall).
- A) Perfect isolation at 60Hz
- B) f₀ =√ =√ ≈ 4.6Hz; 60Hz is 13× resonance; isolation ≈ 44dB; excellent footfall rejection
- C) No isolation possible
- D) Amplifies 60Hz

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
A balanced XLR cable picks up 100mV common-mode interference. The preamp has CMRR (Common-Mode Rejection Ratio) of 80dB at 1kHz. Calculate the residual interference voltage at the preamp output.
- A) 100mV
- B) 80dB rejection = 10,000:1 ratio; residual = 100mV / 10,000 = 10μV; demonstrates balanced system's interference rejection capability
- C) 1mV
- D) Complete rejection

**Answer: B**

**Expert Explanation:** XLR is a balanced 3-pin connector standard for microphones and professional audio gear.
**Image:** !["Diagram"](/images/svg/cable_xlr_pinout.svg)
**Expert Quote:** "Terms like xlr are fundamental. - Dictionary"




---

### Question 9
A pop filter is positioned 3" from a vocalist producing 5Pa peak plosive pressure (DC component) and 0.5Pa at 100Hz (AC component). The filter has 30:1 DC-to-AC impedance ratio. Calculate the transmitted pressure for each component.
- A) Equal transmission
- B) DC: 5Pa / 30 = 0.167Pa transmitted; AC: 0.5Pa / 1 = 0.5Pa transmitted; demonstrates selective frequency filtering; DC reduced to <20% while audio unaffected
- C) Both blocked equally
- D) Both pass freely

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
A microphone cable shield has 20dB RF rejection at 100MHz. A 100W FM transmitter at 100MHz, 1m away, creates 100mV/m field strength. Calculate the induced voltage on shield and the residual RF voltage after rejection reaching the mic preamp.
- A) No RF pickup possible
- B) Induced shield voltage ≈ 100mV/m × 1m effective length ≈ 100mV; 20dB rejection = 10:1; residual = 10mV reaches preamp ground; demonstrates importance of high-quality shielding in RF environments
- C) Complete rejection
- D) 100mV reaches preamp

**Answer: B**

**Expert Explanation:** Signal-to-Noise Ratio (SNR) compares valid signal level to background noise level.
**Image:** !["Diagram"](/images/svg/snr_concept.svg)
**Expert Quote:** "Terms like snr are fundamental. - Dictionary"




---

---

## ANSWER KEY SUMMARY

**Total Questions: 120 (10 per topic × 12 topics)**

All answers are provided after each question with detailed explanations.

---

## SCORING GUIDE

- **95-100%** (114-120 correct): World-class mastery - Professional consultant/educator level
- **90-94%** (108-113 correct): Expert level - Senior engineer proficiency  
- **85-89%** (102-107 correct): Advanced professional - Strong engineering skills
- **80-84%** (96-101 correct): Professional competence - Working engineer level
- **70-79%** (84-95 correct): Developing expertise - Continue advanced study
- **Below 70%** (below 84 correct): Requires significant advanced study and practical experience

---

## MASTER LEVEL CHARACTERISTICS

These questions demand:

- **Multi-variable synthesis** - Combining 3+ concepts simultaneously
- **Quantitative precision** - Exact calculations with units and context
- **Professional decision-making** - Trade-off analysis and optimization
- **Advanced mathematics** - Calculus, complex calculations, wave mechanics
- **Physical modeling** - Real-world acoustic phenomena prediction
- **System-level thinking** - Understanding cascade effects through signal chains
- **Psychoacoustic integration** - Connecting measurements to perception
- **Professional context** - Industry-standard practices and constraints

---

## EXPERTISE DOMAINS ASSESSED

- **Acoustic Physics** - Wave propagation, interference, radiation, impedance
- **Electromagnetic Theory** - Faraday's law, induction, transducer principles
- **Signal Chain Analysis** - Gain staging, SNR, cascade calculations
- **Spatial Audio** - Stereo techniques, localization, phase relationships
- **Mechanical Systems** - Resonance, isolation, transient response
- **Professional Practice** - Real-world optimization and problem-solving

---

## PROFESSIONAL APPLICATION

These questions reflect scenarios encountered by:
- Lead recording engineers in world-class studios
- Live sound engineers for major productions
- Acoustic consultants and designers
- Audio equipment R&D engineers
- University-level educators and researchers
- Senior broadcast engineers
- Film/post-production specialists

---

*Music Tech Dictionary - Volume 2 Master/Expert Quiz*
*© 2024 - Educational Use*
*Professional Mastery Assessment*
