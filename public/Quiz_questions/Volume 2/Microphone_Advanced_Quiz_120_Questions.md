# Music Tech Dictionary - Volume 2: Microphones
## Advanced Level Quiz Bank (Degree Level)
### 10 Questions Per Topic - Multiple Choice Format

---

## TOPIC 1: GAIN & SIGNAL PATH

### Question 1
You're recording a dynamic microphone (output -55dBV) into a preamp with 60dB of gain, then into a converter with +4dBu nominal input. The converter clips at +20dBu. What's the maximum SPL the mic can handle before converter clipping if the mic has 2mV/Pa sensitivity?
- A) Approximately 120dB SPL
- B) Approximately 135dB SPL
- C) Approximately 150dB SPL
- D) This scenario would never clip the converter

**Answer: B**

**Expert Explanation:** Dynamic mics are rugged and handle high SPL.
**Image:** !["Diagram"](/images/svg/mic_dynamic_construction.svg)
**Expert Quote:** "Terms like dynamic mic are fundamental. - Dictionary"




---

### Question 2
You have -18dBFS peaks in your DAW at 24-bit recording. Why is this preferable to recording at -6dBFS or -3dBFS despite the "lower" level?
- A) It sounds warmer
- B) 24-bit provides ~144dB dynamic range; -18dBFS leaves headroom for mixing while maintaining >100dB SNR, well above noise floor
- C) -6dBFS is actually better
- D) There's no practical difference

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 3
You're using a tube preamp with transformer-coupled output into a solid-state converter. The preamp has 3% THD at +20dBu output, but the converter clips at +18dBu. How should you optimize this chain?
- A) Run preamp hot for "color" and pad the converter input
- B) Keep preamp below +18dBu output to prevent converter clipping, accepting less harmonic saturation
- C) Replace the converter
- D) The setup is incompatible

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 4
Your ribbon microphone outputs -10dBu with 60dB of clean preamp gain. Your converter needs -2dBu for nominal 0dBFS. What's the issue and solution?
- A) No issue, perfect match
- B) Signal is 8dB too hot; use pad or reduce gain, though this reduces SNR
- C) Signal is too quiet; need more gain
- D) Ribbon mics don't work with converters

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 5
When implementing a "gain staging" philosophy, which approach provides optimal signal-to-noise ratio throughout the entire chain?
- A) Set all stages to unity gain
- B) Apply maximum gain at the last stage
- C) Apply maximum clean gain at the earliest stage where noise is lowest relative to signal
- D) Distribute gain equally across all stages

**Answer: C**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 6
You're recording a source with 40dB dynamic range. Your preamp has 95dB SNR, your converter has 115dB dynamic range. What's the system's effective dynamic range?
- A) 115dB
- B) 95dB
- C) 40dB
- D) 155dB

**Answer: B**

**Expert Explanation:** Dynamic range is the ratio between the largest and smallest values that a changeable quantity can assume.
**Image:** !["Diagram"](/images/svg/dynamic_range_concept.svg)
**Expert Quote:** "Terms like dynamic range are fundamental. - Dictionary"




---

### Question 7
A microphone preamp has an Equivalent Input Noise (EIN) of -129dBu. With 60dB gain applied, what's the output noise floor?
- A) -129dBu
- B) -69dBu
- C) -189dBu
- D) 60dBu

**Answer: B**

**Expert Explanation:** The noise floor is the level of constant background noise in a system.
**Image:** !["Diagram"](/images/svg/snr_concept.svg)
**Expert Quote:** "Terms like noise floor are fundamental. - Dictionary"




---

### Question 8
You're experiencing clipping despite proper gain staging. The issue occurs intermittently during peaks. What's the most likely cause and solution?
- A) Microphone fault
- B) Insufficient headroom for transients; reduce gain by 3-6dB to accommodate peak-to-average ratio
- C) Cable interference
- D) Room acoustics

**Answer: B**

**Expert Explanation:** Headroom is the safety margin between the peak signal and the clipping point.
**Image:** !["Diagram"](/images/svg/headroom_diagram.svg)
**Expert Quote:** "Terms like headroom are fundamental. - Dictionary"




---

### Question 9
In a modern digital console, "trim" at the input stage is typically applied where in the signal chain?
- A) After the fader
- B) In the digital domain after conversion
- C) In the analog preamp stage before A/D conversion
- D) After all processing

**Answer: C**

**Expert Explanation:** Gain staging is critical.
**Image:** !["Diagram"](/images/svg/signal_chain_basic.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 10
Your signal path includes: Ribbon mic → Cloudlifter (25dB) → Preamp (40dB) → Converter. Why might this configuration be superior to just using 65dB of preamp gain?
- A) It's not superior
- B) Cloudlifter's ultra-low-noise JFET circuit adds clean gain before preamp's noise floor, improving overall SNR
- C) It's cheaper
- D) Ribbon mics require this exact configuration

**Answer: B**

**Expert Explanation:** The noise floor is the level of constant background noise in a system.
**Image:** !["Diagram"](/images/svg/snr_concept.svg)
**Expert Quote:** "Terms like noise floor are fundamental. - Dictionary"




---

---

## TOPIC 2: MICROPHONE TYPES & CHARACTERISTICS

### Question 1
A large diaphragm condenser has a 1" diameter diaphragm with 3mg mass, while a small diaphragm has 0.75" diameter with 1mg mass. How does this affect their respective frequency responses above 10kHz?
- A) Identical response
- B) Large diaphragm exhibits earlier high-frequency resonance and rolloff; small diaphragm maintains flatter response due to lower mass-to-stiffness ratio
- C) Large diaphragm is always better at high frequencies
- D) Diameter doesn't affect frequency response

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 2
A ribbon microphone has 0.3mV/Pa sensitivity while a condenser has 20mV/Pa. Both record the same source at 94dB SPL. What's the approximate output difference?
- A) Same output
- B) ~36dB difference
- C) ~20dB difference
- D) ~60dB difference

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 3
Why do pencil condensers (small diaphragm) exhibit less proximity effect than large diaphragm models with identical cardioid patterns?
- A) They don't; proximity effect is pattern-dependent only
- B) Smaller diaphragm aperture creates less pressure differential at low frequencies for near sources
- C) They're always omnidirectional
- D) This is false; they have more proximity effect

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 4
A condenser microphone's self-noise is specified as 12dB-A. What's the theoretical maximum dynamic range if maximum SPL is 130dB?
- A) 142dB
- B) 118dB
- C) 130dB
- D) 12dB

**Answer: B**

**Expert Explanation:** Dynamic range is the ratio between the largest and smallest values that a changeable quantity can assume.
**Image:** !["Diagram"](/images/svg/dynamic_range_concept.svg)
**Expert Quote:** "Terms like dynamic range are fundamental. - Dictionary"




---

### Question 5
Modern active ribbon microphones use phantom power differently than condensers. What's the primary difference?
- A) No difference
- B) Ribbons use phantom power for active electronics/impedance matching only; the ribbon element itself remains passive unlike condenser capsules which require charge
- C) Ribbons charge the ribbon element
- D) Active ribbons don't use phantom power

**Answer: B**

**Expert Explanation:** Phantom power (+48V) is required to operate condenser microphones and active DI boxes.
**Image:** !["Diagram"](/images/svg/signal_chain_basic.svg)
**Expert Quote:** "Terms like phantom are fundamental. - Dictionary"




---

### Question 6
Two microphones have identical frequency response curves but different transient responses. What physical property primarily explains this difference?
- A) Price
- B) Diaphragm mass and damping characteristics affect transient response independently of steady-state frequency response
- C) Cable length
- D) This scenario is impossible

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
A measurement microphone is specified as "free-field corrected." What does this mean for its frequency response?
- A) Flat response in all conditions
- B) Designed to compensate for HF boost caused by diffraction around the mic body, achieving flat response for on-axis sounds in anechoic conditions
- C) Only works outdoors
- D) Has boosted bass

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
Why do ribbon microphones typically have figure-8 patterns while dynamic moving-coil mics are typically cardioid?
- A) Arbitrary design choice
- B) Ribbons are pressure-gradient transducers; moving-coil dynamics typically use acoustic labyrinth/porting to create cardioid
- C) Ribbons can't be cardioid
- D) Moving-coil can't be figure-8

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 9
A FET condenser microphone and a tube condenser both have identical capsules. What's the primary sonic difference?
- A) No difference
- B) Tube adds even-order harmonics and has higher output impedance affecting frequency response; FET is typically cleaner with lower THD
- C) Tube is always worse
- D) Only the capsule matters

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 10
At what frequency does a large diaphragm microphone (1" diameter) typically begin to exhibit directional narrowing due to wavelength?
- A) 100Hz
- B) 1kHz
- C) ~5-6kHz
- D) 20kHz

**Answer: C**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

## TOPIC 3: UNDERSTANDING POLAR PATTERNS

### Question 1
A first-order cardioid pattern can be mathematically expressed as 0.5 + 0.5cos(θ). What does this equation reveal about the polar response?
- A) Nothing useful
- B) Combination of omnidirectional and figure-8) components; rear rejection = -∞ at 180°, -6dB at 90°
- C) It's purely pressure-operated
- D) It's purely gradient-operated

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 2
A hypercardioid mic has maximum rejection at approximately 110°. If you're recording a source with unwanted sound at exactly this angle, what's the approximate rejection compared to on-axis?
- A) -3dB
- B) -6dB
- C) -15 to -20dB or greater
- D) 0dB

**Answer: C**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 3
Why does an omnidirectional microphone maintain constant response at all frequencies and angles in theory, but becomes directional above ~10kHz in practice?
- A) This doesn't happen
- B) At high frequencies, wavelength approaches microphone body dimensions, causing diffraction and shadowing effects
- C) Manufacturing defects
- D) Room acoustics only

**Answer: B**

**Expert Explanation:** Omnis pick up sound equally from all directions and have no proximity effect.
**Image:** !["Diagram"](/images/svg/polar_pattern_omni.svg)
**Expert Quote:** "Terms like omnidirectional are fundamental. - Dictionary"




---

### Question 4
Two figure-8 mics are positioned at 90° to create a Blumlein pair. What's the polar pattern in the plane of the mics?
- A) Omnidirectional
- B) Four-lobed cloverleaf pattern with nulls at 45°, 135°, 225°, 315°
- C) Standard stereo cardioid
- D) Single figure-8

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 5
A shotgun microphone achieves its directionality primarily through which mechanism?
- A) Very tight cardioid capsule
- B) Interference tube: phase cancellation of off-axis sounds arriving at different times along the tube slots
- C) Electronic processing
- D) Multiple capsules summed

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 6
For a first-order gradient microphone, proximity effect increases at what rate per octave as distance decreases?
- A) 3dB/octave
- B) 6dB/octave boost in bass
- C) 12dB/octave
- D) No increase

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 7
What's the theoretical front-to-back ratio of a perfect first-order cardioid at 1kHz?
- A) 6dB
- B) 15-20dB
- C) Infinite
- D) 3dB

**Answer: C**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 8
A multi-pattern microphone creates a "wide cardioid" pattern between omni and cardioid. What's happening acoustically?
- A) Magic
- B) Mixing omnidirectional and cardioid responses by varying capsule voltage ratios
- C) Physical barrier movement
- D) This pattern doesn't exist

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 9
Why is a subcardioid pattern (between omni and cardioid) sometimes preferred in live sound despite less rear rejection?
- A) It isn't preferred
- B) Reduced proximity effect compared to cardioid while maintaining some directionality; useful for handheld vocals
- C) It's cheaper
- D) Better for feedback

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 10
At what angle does a supercardioid pattern have its -6dB point compared to a cardioid?
- A) Same angle
- B) Narrower due to tighter forward pickup
- C) Wider
- D) No -6dB point exists

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

---

## TOPIC 4: GENERAL MICING TECHNIQUES

### Question 1
You're using three mics on a source: close (2"), mid (12"), and room (6 feet). The 3:1 rule is violated between close and mid. What's the likely audible effect?
- A) No effect
- B) Comb filtering in the frequency range where path length difference creates phase cancellation
- C) Improved sound
- D) Only affects mono compatibility

**Answer: B**

**Expert Explanation:** The 3:1 Rule helps minimize phase cancellation by keeping adequate distance between microphones.
**Image:** !["Diagram"](/images/svg/3_to_1_rule_diagram.svg)
**Expert Quote:** "Terms like 3:1 are fundamental. - Dictionary"




---

### Question 2
Two mics are 40cm apart, both picking up the same source. At approximately what frequency will the first null occur due to phase cancellation when summed?
- A) 425Hz
- B) 850Hz
- C) 212Hz
- D) No null occurs

**Answer: A**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 3
You're using a room mic with close mics on drums. The room mic is 10ms delayed from the close mics. What's the Haas effect doing to your perception?
- A) Nothing
- B) Below ~40ms, delayed sound fuses with direct sound but adds depth/space without discrete echo
- C) Creates distinct echo
- D) Ruins the recording

**Answer: B**

**Expert Explanation:** Mic placement is the most powerful EQ.
**Image:** !["Diagram"](/images/svg/direct_vs_room.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 4
When applying phase alignment between a close mic and room mic, you time-align the room mic earlier by 20ms. What distance difference does this represent?
- A) 2 feet
- B) ~6.8 meters
- C) 20 feet
- D) Impossible to determine

**Answer: B**

**Expert Explanation:** Mic placement is the most powerful EQ.
**Image:** !["Diagram"](/images/svg/direct_vs_room.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 5
You're micing a source with both a cardioid (6" away) and an omni (3 feet away). Which exhibits stronger proximity effect and why?
- A) Omnidirectional
- B) Cardioid, because it's a pressure-gradient transducer; distance compounds the effect
- C) Equal proximity effect
- D) Neither exhibits proximity effect

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 6
Two identical cardioid mics are aimed at a source: one at 0° (on-axis), one at 120° (rear-side). What's the approximate level difference?
- A) Same level
- B) ~15-20dB less from 120° position
- C) 6dB difference
- D) 3dB difference

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 7
You're recording an acoustic guitar at 8" with a cardioid mic. Moving to 16" reduces proximity effect by approximately how much?
- A) No change
- B) ~6dB reduction in bass
- C) 3dB reduction
- D) 12dB reduction

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 8
When using multiple mics, what's the mathematical relationship for acceptable phase difference to avoid audible comb filtering?
- A) Any phase difference is acceptable
- B) Phase difference should be <90° across the frequency range of interest
- C) Phase must be perfectly aligned
- D) Only matters above 10kHz

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 9
You're micing a source with reflective floor 3 feet below the mic. The reflection creates a comb filter. Where's the first notch frequency?
- A) ~56Hz
- B) ~170Hz
- C) ~340Hz
- D) No notch occurs

**Answer: A**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 10
Why is close micing preferred in acoustically poor rooms despite sounding less natural?
- A) It's not preferred
- B) Direct-to-reverberant ratio strongly favors direct sound; reduces early reflections and room modes
- C) Louder output
- D) Easier to position

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

---

## TOPIC 5: DRUMS

### Question 1
You're using inside and outside kick mics with significant phase offset. The combined sound has reduced low-end. At what approximate distance offset would this occur for 80Hz cancellation?
- A) ~2.1m offset
- B) 1m offset
- C) 6" offset
- D) Phase doesn't affect low frequencies

**Answer: A**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
Your overhead mics are positioned 4 feet above cymbals but 5 feet from the snare. What's the time difference between snare hit arriving at overheads vs. snare close mic?
- A) No difference
- B) ~1ms delay to overheads
- C) 5ms delay
- D) Instant

**Answer: B**

**Expert Explanation:** Drums require careful multi-mic phase alignment.
**Image:** !["Diagram"](/images/explanations/mic_placement_snare.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 3
You're implementing the Glyn Johns overhead technique. The mics are equidistant from the snare but the left overhead is closer to the floor tom. What's the acoustic result?
- A) Perfect balance
- B) Floor tom will be louder and slightly earlier in left channel, affecting stereo image and phase
- C) No effect
- D) Ruins the recording

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
A snare bottom mic is 180° out of phase with the top mic. When summed, which frequencies are most affected?
- A) High frequencies only
- B) All frequencies equally, but most noticeable in midrange where both mics have similar content
- C) Low frequencies only
- D) No frequencies affected

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
You're using a boundary (PZM) mic on the kick drum resonant head. What's the acoustic advantage?
- A) None
- B) Hemispherical pickup; boundary eliminates floor reflection phase cancellation, extends low-frequency response
- C) Only cosmetic
- D) Doesn't work for kick

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
Your tom mics are creating comb filtering with overheads. The most problematic frequency is 400Hz. What distance discrepancy exists?
- A) No discrepancy
- B) ~43cm path length difference
- C) 4 feet
- D) Impossible to determine

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 7
When implementing recorderman technique (two overheads, snare-centric), what's the critical measurement?
- A) Height only
- B) Equal distance from both overheads to snare center for phase coherence
- C) Distance to kick
- D) Cymbals don't matter

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
A kick drum is tuned to 60Hz fundamental. Your inside mic is 3" from beater. What harmonic content dominates at this position?
- A) Fundamental only
- B) Attack transient and upper harmonics; fundamental is omnidirectional and equal throughout drum
- C) Only 60Hz
- D) No sound captured

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 9
You're using a figure-8 ribbon as a room mic positioned 10 feet in front of the kit. How should it be oriented for maximum kit capture and minimum room reflection?
- A) Figure-8 lobes toward kit and rear wall
- B) Figure-8 nulls toward side walls, lobes toward kit and front wall/rear ambient
- C) Orientation doesn't matter
- D) Figure-8 doesn't work for drums

**Answer: B**

**Expert Explanation:** Figure-8 picks up front and back, rejecting sides. Great for ribbons.
**Image:** !["Diagram"](/images/svg/polar_pattern_figure8.svg)
**Expert Quote:** "Terms like figure-8 are fundamental. - Dictionary"




---

### Question 10
Your overhead pair is creating a "hole in the middle" of the stereo image. What's the likely cause?
- A) Too much spacing or wrong technique creating phase cancellation in center when summed
- B) Not enough gain
- C) Broken microphones
- D) Normal behavior

**Answer: A**

**Expert Explanation:** Drums require careful multi-mic phase alignment.
**Image:** !["Diagram"](/images/explanations/mic_placement_snare.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

---

## TOPIC 6: STRINGS

### Question 1
An acoustic guitar's fundamental resonance (Helmholtz resonance) is around 100Hz. You're micing at the sound hole and getting excessive boom. What's the acoustic explanation?
- A) Too much gain
- B) Sound hole acts as port for air cavity resonance; maximum SPL output at resonant frequency
- C) Phase issue
- D) This doesn't happen

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
You're micing a guitar amp with two mics: one on-axis (center cone), one off-axis (edge). The combined sound is thin. What's likely happening?
- A) Perfect combination
- B) Phase interference due to path length differences and driver geometry creating comb filtering
- C) Not enough gain
- D) Broken amp

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 3
A violin's resonant body modes create formants around 300Hz and 800Hz. Where should you position a mic to capture these most effectively?
- A) At the bow
- B) Aimed at f-holes from 1-2 feet where body radiation is strongest
- C) Touching the instrument
- D) 10 feet away

**Answer: B**

**Expert Explanation:** Strings need breathing room to sound natural.
**Image:** !["Diagram"](/images/explanations/mic_placement_acoustic.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 4
You're micing a guitar amp in a small room. Room modes at 85Hz and 170Hz are creating peaks. The amp's speaker has -3dB point at 90Hz. What's the combined acoustic effect?
- A) Flat bass response
- B) Exaggerated 85Hz mode, less prominent 170Hz; speaker couples with room modes creating complex bass response
- C) No bass captured
- D) Only room modes matter

**Answer: B**

**Expert Explanation:** Strings need breathing room to sound natural.
**Image:** !["Diagram"](/images/explanations/mic_placement_acoustic.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 5
An upright bass's wolf tone occurs at approximately 280Hz due to body resonance. How would mic position affect capturing or minimizing this?
- A) No effect possible
- B) Closer to f-hole emphasizes body resonance including wolf tone; bridge position captures more string fundamental, less body
- C) All positions sound identical
- D) Only EQ can address it

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
A 12-string guitar's paired strings are detuned slightly for chorus effect. When micing, this creates what acoustic phenomenon?
- A) Pure tone
- B) Beating/amplitude modulation at difference frequency between string pairs
- C) Phase cancellation
- D) No effect

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
You're micing a cello's C string (65.4Hz fundamental). At what distance does the wavelength equal your mic distance, potentially affecting phase relationship with harmonics?
- A) 1 foot
- B) ~5.2 feet
- C) 10 feet
- D) Distance doesn't matter

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
A guitar amp's speaker has "beaming" above 2kHz due to cone geometry. How does this affect on-axis vs. off-axis micing?
- A) No difference
- B) On-axis captures much more high-frequency content; off-axis is naturally darker due to directional narrowing
- C) Off-axis is brighter
- D) Only affects volume

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
You're using two mics on an acoustic guitar: one at 12th fret, one at bridge, 6" apart. At approximately what frequency does the first comb filter notch occur?
- A) ~285Hz
- B) ~1.1kHz
- C) ~570Hz
- D) No notch occurs

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 10
An electric bass amp is ported (bass reflex design) with port tuning at 50Hz. Micing near the port vs. the speaker produces what difference?
- A) Identical sound
- B) Port emphasizes fundamental around tuning frequency; speaker emphasizes harmonics and attack
- C) Port has no output
- D) Speaker has no bass

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

---

## TOPIC 7: VOCALS

### Question 1
A vocalist's sibilance peaks around 8kHz. Using a large diaphragm condenser with presence peak at 8kHz vs. a flat ribbon, what's the acoustic interaction?
- A) Identical capture
- B) LDC emphasizes sibilance ~10-12dB; ribbon captures more naturally with no HF boost
- C) Ribbon is always worse
- D) Only EQ matters

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 2
At 6" distance, a cardioid vocal mic exhibits approximately +5dB proximity boost at 100Hz. Moving to 12" reduces this by how much?
- A) No change
- B) ~6dB reduction
- C) 3dB reduction
- D) Complete elimination

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 3
A vocalist's fundamental frequency is 150Hz (male voice). Harmonic series extends to 12kHz. Which microphone characteristic most affects capturing the "air" (10-15kHz)?
- A) Proximity effect
- B) Extended HF response beyond fundamental series; diaphragm transient response for overtones/breathiness
- C) Pattern only
- D) This can't be captured

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 4
You're using an omni large diaphragm in a treated room vs. cardioid. The omni recording has +4dB low-frequency extension. Why?
- A) Louder microphone
- B) No proximity effect loss in omni; cardioid loses bass at distance due to gradient operation
- C) Cardioid is broken
- D) This doesn't happen

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 5
A pop filter is 6" from the mic. A plosive creates 20 Pa peak pressure. The pop filter attenuates slow-moving air but not the acoustic wave. What's the mechanism?
- A) Magic
- B) Mesh dissipates kinetic energy of DC air blast while remaining acoustically transparent to AC audio frequencies
- C) Blocks all frequencies equally
- D) Pop filters don't work

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
Two vocalists are singing in unison, miced separately 3 feet apart. Small timing differences (~3ms) create what effect?
- A) Perfect blend
- B) Haas effect: 3ms creates stereo width and spaciousness without distinct echo
- C) Complete phase cancellation
- D) No effect

**Answer: B**

**Expert Explanation:** Vocals are the focal point; control plosives and sibilance.
**Image:** !["Diagram"](/images/explanations/mic_placement_vocal.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 7
A vocalist's formants (resonant frequencies of vocal tract) are around 700Hz, 1200Hz, 2400Hz. Proximity effect boosts 100-300Hz. What's the acoustic result?
- A) Formants shift lower
- B) Fundamental/body emphasized relative to formants, creating warmer, more intimate character
- C) No change to formants
- D) Formants are eliminated

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 8
You're using a figure-8 vocal mic with singer at front lobe. Room reflections arrive at side nulls (90°). What's the theoretical rejection at nulls?
- A) -6dB
- B) -20 to -40dB or complete null theoretically
- C) No rejection
- D) +6dB

**Answer: B**

**Expert Explanation:** Figure-8 picks up front and back, rejecting sides. Great for ribbons.
**Image:** !["Diagram"](/images/svg/polar_pattern_figure8.svg)
**Expert Quote:** "Terms like figure-8 are fundamental. - Dictionary"




---

### Question 9
A shock mount suspends the mic with resonant frequency at 15Hz. Footfall vibration is 40Hz. What's the attenuation?
- A) No attenuation
- B) ~18dB attenuation
- C) Amplification
- D) Complete elimination

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 10
Two choir mics are positioned 10 feet from choir, 6 feet apart (spaced pair). At what frequency does the spacing equal one wavelength?
- A) ~56Hz
- B) ~190Hz
- C) ~340Hz
- D) Spacing doesn't affect frequency

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

## TOPIC 8: WIND INSTRUMENTS

### Question 1
A saxophone's bell radiates primarily above 1kHz while tone holes radiate lower frequencies. Micing at the bell vs. mid-body creates what difference?
- A) Identical sound
- B) Bell position emphasizes brightness/presence; mid-body captures more fundamental and body resonance
- C) No frequency difference
- D) Only volume changes

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
A trumpet's directivity increases with frequency. At 2kHz, on-axis is +10dB relative to 90° off-axis. What causes this?
- A) Wavelength approaches bell diameter creating beaming
- B) Player technique only
- C) Doesn't happen
- D) Room acoustics

**Answer: A**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 3
A flute's fundamental frequency is 262Hz (C4). Air stream noise extends to 15kHz. What mic characteristic is critical for capturing both?
- A) Pattern only
- B) Extended frequency response and fast transient response for breath articulation
- C) Proximity effect
- D) High SPL handling

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 4
You're micing a brass section with single ribbon mic at 3 feet. Trumpet (1kHz) has wavelength of 34cm. What's the acoustic implication?
- A) None
- B) Wavelength is smaller than mic distance; spatial resolution adequate; lower frequencies diffuse more
- C) Can't capture brass
- D) Distance doesn't matter

**Answer: B**

**Expert Explanation:** Ribbon mics are smooth and warm but fragile.
**Image:** !["Diagram"](/images/svg/mic_ribbon_construction.svg)
**Expert Quote:** "Terms like ribbon are fundamental. - Dictionary"




---

### Question 5
A clarinet is a closed-pipe resonator (odd harmonics dominate). Micing position affects harmonic balance how?
- A) No effect
- B) Positions along body capture different harmonic node/antinode relationships
- C) Only one position works
- D) Clarinets have even harmonics only

**Answer: B**

**Expert Explanation:** Wind instruments are high SPL sources.
**Image:** !["Diagram"](/images/sax_micing_1770033437547.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 6
A trombone's slide length changes from 2.7m to 4m across range. For lowest positions, the bell-to-mic distance becomes what percentage of wavelength at fundamental (58Hz)?
- A) Insignificant
- B) ~1m mic distance ≈ 17% of 5.9m wavelength; near-field effects minimal
- C) Complete wavelength
- D) Can't determine

**Answer: B**

**Expert Explanation:** Wind instruments are high SPL sources.
**Image:** !["Diagram"](/images/sax_micing_1770033437547.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 7
You're micing woodwinds with small diaphragm condensers. Pad tone at 1kHz measures 90dB SPL at 1 foot. Without pad, why might this clip a sensitive condenser?
- A) Too loud for any mic
- B) Sensitive condensers with low max SPL can clip; 90dB at 1 foot is ~108-110dB at capsule
- C) This level never clips
- D) Only dynamics work

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 8
A French horn's bell faces backward (away from audience). Micing from the front vs. behind produces what difference?
- A) Identical sound
- B) Behind bell captures more direct sound and higher frequencies; front captures diffused/reflected sound
- C) Front is always better
- D) Horn doesn't radiate forward

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
Brass instruments create standing waves in the bore. Micing 1 foot from bell vs. 3 feet affects what?
- A) Nothing
- B) Near-field captures more reactive field and harmonic complexity; far-field captures more radiated sound
- C) Only volume
- D) Phase only

**Answer: B**

**Expert Explanation:** Wind instruments are high SPL sources.
**Image:** !["Diagram"](/images/sax_micing_1770033437547.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 10
A bassoon's fundamental is 62Hz with strong harmonics to 4kHz. What mic placement captures balanced timbre?
- A) At reed only
- B) Mid-to-lower body aimed at tone holes to capture both fundamental and harmonic radiation
- C) Bell only
- D) Any position identical

**Answer: B**

**Expert Explanation:** Balanced connections cancel out noise interference using phase inversion on the cold wire.
**Image:** !["Diagram"](/images/svg/equipment_di_box_function.svg)
**Expert Quote:** "Terms like balanced are fundamental. - Dictionary"




---

---

## TOPIC 9: PIANO

### Question 1
A grand piano's soundboard has resonant modes at 100Hz, 250Hz, and 800Hz. Micing 6" above strings vs. 12" affects modal pickup how?
- A) No difference
- B) Closer position couples more with string radiation; further position integrates more soundboard modes
- C) Strings produce no sound
- D) Only soundboard radiates

**Answer: B**

**Expert Explanation:** Pianos cover the full frequency spectrum.
**Image:** !["Diagram"](/images/explanations/mic_placement_piano.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 2
Piano strings for middle C (262Hz) produce harmonics to >16kHz. Using spaced pair overheads 3 feet apart, at what frequency does spacing = one wavelength?
- A) ~37Hz
- B) ~113Hz
- C) ~340Hz
- D) Spacing doesn't affect frequency response

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 3
You're using ORTF (17cm, 110°) positioned 12" above strings. The 17cm spacing creates first phase interference notch at what frequency?
- A) ~500Hz
- B) ~1kHz
- C) ~2kHz
- D) No interference with ORTF

**Answer: B**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

### Question 4
A piano's lid on short stick vs. fully open changes radiation pattern. What's the acoustic effect at 4kHz?
- A) No difference
- B) Short stick creates semi-enclosed space with partial reflections and narrower radiation; full open allows unrestricted radiation
- C) Only affects volume
- D) Only affects bass

**Answer: B**

**Expert Explanation:** Pianos cover the full frequency spectrum.
**Image:** !["Diagram"](/images/explanations/mic_placement_piano.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 5
You're micing an upright piano from behind (back removed) at 12" vs. 3 feet. Proximity effect impacts what?
- A) Nothing
- B) If using cardioid, 12" has ~6dB more bass than 3 feet due to gradient operation
- C) Uprights don't work with cardioid mics
- D) Distance only affects volume

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 6
Piano hammers strike strings at 1/7 to 1/9 of string length to minimize 7th and 9th harmonics. Micing directly above strike point vs. above soundboard affects harmonic content how?
- A) Identical
- B) Strike point emphasizes attack/transient; soundboard position integrates resonance and balanced harmonic series
- C) Strike point has no harmonics
- D) Only soundboard radiates

**Answer: B**

**Expert Explanation:** Balanced connections cancel out noise interference using phase inversion on the cold wire.
**Image:** !["Diagram"](/images/svg/equipment_di_box_function.svg)
**Expert Quote:** "Terms like balanced are fundamental. - Dictionary"




---

### Question 7
A Decca Tree configuration uses three omnis: center and L/R 2m apart. For piano, this creates what stereo characteristic?
- A) Narrow stereo
- B) Very wide stereo field; center provides anchor, L/R provide spatial width and ambient integration
- C) Mono only
- D) Doesn't work for piano

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 8
You're using boundary mic (PZM) on closed lid vs. inside above strings. What's the acoustic difference?
- A) Same sound
- B) Boundary on lid captures reflected/filtered sound through lid; inside captures direct string radiation
- C) Boundary doesn't work on piano
- D) Only volume differs

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 9
Piano's lowest note (A0 = 27.5Hz) has wavelength of ~12.4m. Micing at 12" distance represents what percentage of wavelength?
- A) Insignificant
- B) ~2.5% of wavelength; far-field for this frequency despite close position
- C) Complete wavelength
- D) Near-field only

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
When using X/Y 12" above strings, angled at 90°, what's the theoretical stereo image width compared to spaced pair 4 feet apart?
- A) Identical width
- B) X/Y creates moderate stereo from intensity differences; spaced pair creates wider image from time/phase differences
- C) X/Y is always wider
- D) No stereo from either

**Answer: B**

**Expert Explanation:** Pianos cover the full frequency spectrum.
**Image:** !["Diagram"](/images/explanations/mic_placement_piano.png)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

---

## TOPIC 10: ADVANCED STEREO TECHNIQUES

### Question 1
In M/S decoding, the M signal is at -20dBFS and S is at -12dBFS. After decoding (M+S=L, M-S=R), what's the approximate stereo width?
- A) Narrow
- B) Wide
- C) Mono
- D) Unusable

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 2
ORTF technique (17cm, 110°) was designed to mimic human hearing. At what frequency does the 17cm spacing create 90° phase shift?
- A) ~500Hz
- B) ~1kHz
- C) ~2kHz
- D) No phase shift in ORTF

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 3
A Blumlein pair uses two figure-8s at 90°. When summed to mono, what happens acoustically?
- A) Complete cancellation
- B) The orthogonal figure-8s sum coherently; similar to coincident cardioid in mono compatibility
- C) Stereo maintained
- D) Unusable in mono

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 4
Spaced omni pair at 10 feet apart records orchestra. At what frequency does the spacing equal one wavelength, creating potential phase ambiguity?
- A) ~17Hz
- B) ~34Hz
- C) ~100Hz
- D) No ambiguity occurs

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 5
In M/S, the side mic is figure-8 oriented perpendicular. Why does this create stereo width?
- A) It doesn't
- B) Left side of figure-8 goes to L channel, right side to R channel, creating L-R difference signal
- C) Magic
- D) Only works with cardioid

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 6
X/Y with 135° angle vs. 90° affects stereo width how?
- A) No difference
- B) 135° creates wider stereo image due to less overlap between mic patterns
- C) 90° is always wider
- D) Angle doesn't affect width

**Answer: B**

**Expert Explanation:** Stereo techniques enhance width.
**Image:** !["Diagram"](/images/svg/stereo_xy_diagram.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 7
A Decca Tree has L/R mics 2m apart. The center mic is positioned 1.5m forward. What's the time difference between center and L/R for sources directly ahead?
- A) Zero
- B) ~4.4ms
- C) Instant
- D) Impossible to calculate

**Answer: B**

**Expert Explanation:** Stereo techniques enhance width.
**Image:** !["Diagram"](/images/svg/stereo_xy_diagram.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 8
NOS technique uses 30cm spacing, 90° angle. Compared to ORTF (17cm, 110°), what's the acoustic difference?
- A) Identical
- B) NOS has wider spacing but narrower angle
- C) ORTF is always better
- D) They're opposites

**Answer: B**

**Expert Explanation:** Stereo techniques enhance width.
**Image:** !["Diagram"](/images/svg/stereo_xy_diagram.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 9
In M/S recording, increasing the M (mid) gain while keeping S constant does what to the stereo field?
- A) Widens it
- B) Narrows it
- C) No effect
- D) Creates distortion

**Answer: B**

**Expert Explanation:** Stereo techniques enhance width.
**Image:** !["Diagram"](/images/svg/stereo_xy_diagram.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"



---

### Question 10
Spaced pair with 6 feet spacing has issues in mono below what frequency due to phase?
- A) All frequencies
- B) Below ~200Hz where wavelength exceeds spacing significantly
- C) Above 10kHz only
- D) No mono issues

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

## TOPIC 11: HOW MICROPHONES WORK

### Question 1
A condenser capsule has 50pF capacitance at rest. When diaphragm moves 1μm closer, capacitance increases to 50.5pF. With 60V polarization, what's the voltage change?
- A) 0V
- B) ~-0.6V
- C) +60V
- D) Impossible to calculate

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 2
A ribbon microphone has 0.3mV/Pa sensitivity. At 94dB SPL (1Pa), what's the output voltage?
- A) 0.3mV
- B) 0.3V
- C) 3mV
- D) 30mV

**Answer: A**

**Expert Explanation:** Ribbon mics are smooth and warm but fragile.
**Image:** !["Diagram"](/images/svg/mic_ribbon_construction.svg)
**Expert Quote:** "Terms like ribbon are fundamental. - Dictionary"




---

### Question 3
A moving-coil dynamic mic has 300-turn coil in 1 Tesla field. The coil moves at 0.1m/s. Using Faraday's law (V = BLv), what's the approximate induced voltage?
- A) Depends on coil length and number of turns
- B) ~0.3V
- C) 1V
- D) Zero

**Answer: A**

**Expert Explanation:** Dynamic mics are rugged and handle high SPL.
**Image:** !["Diagram"](/images/svg/mic_dynamic_construction.svg)
**Expert Quote:** "Terms like dynamic mic are fundamental. - Dictionary"




---

### Question 4
Why does a first-order pressure-gradient microphone have inherent 6dB/octave bass rolloff at distance?
- A) Manufacturing defect
- B) Gradient operation responds to velocity; inverse distance relationship creates 6dB/octave proximity effect loss
- C) This doesn't happen
- D) Only affects cardioid

**Answer: B**

**Expert Explanation:** The proximity effect boosts bass frequencies when the source is close to a directional mic.
**Image:** !["Diagram"](/images/svg/proximity_graph.svg)
**Expert Quote:** "Terms like proximity are fundamental. - Dictionary"




---

### Question 5
A condenser capsule has 10μm diaphragm-to-backplate spacing. Diaphragm excursion of 2μm changes capacitance by what percentage?
- A) No change
- B) ~20%
- C) 2%
- D) 50%

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 6
In a ribbon microphone, the ribbon mass is 0.5mg and ribbon area is 30mm². For a given sound pressure, why does the ribbon move more than a condenser diaphragm?
- A) It doesn't
- B) Lower tension and lower mass/unit area; compliance is higher despite higher total mass
- C) Ribbons don't move
- D) Only pressure differs

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 7
A dual-diaphragm condenser creates omni pattern by polarizing both capsules equally in phase. What's the acoustic result?
- A) Figure-8
- B) Both diaphragms respond to pressure equally; gradient components cancel, leaving pressure response = omni
- C) Cardioid
- D) No output

**Answer: B**

**Expert Explanation:** Cardioid pattern rejects sound from the rear, making it ideal for live use.
**Image:** !["Diagram"](/images/svg/polar_pattern_cardioid.svg)
**Expert Quote:** "Terms like cardioid are fundamental. - Dictionary"




---

### Question 8
Why does a condenser microphone's high-pass filter (if present) not affect the physics of the capsule's response?
- A) It does affect capsule
- B) Filter is electronic, after the capsule; capsule still responds to all frequencies but filter attenuates output
- C) No HPF exists
- D) Only affects pattern

**Answer: B**

**Expert Explanation:** Condensers capture high-frequency detail and transients accurately.
**Image:** !["Diagram"](/images/svg/mic_condenser_construction.svg)
**Expert Quote:** "Terms like condenser are fundamental. - Dictionary"




---

### Question 9
A ribbon experiences 1Pa sound pressure (94dB SPL). Ribbon area is 30mm² (3×10⁻⁵ m²). What's the force on the ribbon?
- A) 1 Newton
- B) 3×10⁻⁵ Newtons
- C) 30 Newtons
- D) Zero force

**Answer: B**

**Expert Explanation:** Ribbon mics are smooth and warm but fragile.
**Image:** !["Diagram"](/images/svg/mic_ribbon_construction.svg)
**Expert Quote:** "Terms like ribbon are fundamental. - Dictionary"




---

### Question 10
In a cardioid capsule, combining pressure (omni) and gradient (figure-8) components in 0.5:0.5 ratio creates what at 180° (rear)?
- A) +1
- B) 0: 0.5 - 0.5cos = 0.5 - 0.5 = 0
- C) 0.5
- D) -1

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

---

## TOPIC 12: MICROPHONE ACCESSORIES

### Question 1
A pop filter mesh has 1mm openings. Sound wavelength at 10kHz is ~34mm. Why is the filter acoustically transparent at this frequency?
- A) It's not
- B) Wavelength >> mesh size; filter appears continuous acoustically, only blocks DC airflow
- C) 10kHz is blocked
- D) Mesh size doesn't matter

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 2
A shock mount has resonant frequency at 12Hz. Footfall vibration at 60Hz produces what isolation?
- A) No isolation
- B) ~28dB attenuation
- C) Amplification
- D) 6dB attenuation

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 3
An XLR cable has 30pF/foot capacitance. A 50-foot cable feeding 2kΩ impedance creates what rolloff frequency?
- A) No rolloff
- B) ~1MHz
- C) 100Hz
- D) 10kHz

**Answer: B**

**Expert Explanation:** XLR is a balanced 3-pin connector standard for microphones and professional audio gear.
**Image:** !["Diagram"](/images/svg/cable_xlr_pinout.svg)
**Expert Quote:** "Terms like xlr are fundamental. - Dictionary"




---

### Question 4
A foam windscreen reduces wind noise by ~20dB. Wind noise spectrum peaks at ~100Hz. What's the mechanism?
- A) Blocks all sound
- B) Porous foam dissipates turbulent kinetic energy; particle velocity reduced before reaching capsule
- C) Only cosmetic
- D) Amplifies wind

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 5
Why does a balanced XLR cable reject interference better than unbalanced?
- A) Thicker cable
- B) Common-mode rejection: interference affects both conductors equally; differential amplifier cancels common-mode signal
- C) Magic
- D) Doesn't reject better

**Answer: B**

**Expert Explanation:** XLR is a balanced 3-pin connector standard for microphones and professional audio gear.
**Image:** !["Diagram"](/images/svg/cable_xlr_pinout.svg)
**Expert Quote:** "Terms like xlr are fundamental. - Dictionary"




---

### Question 6
A blimp windscreen creates ~30dB wind noise rejection at 50Hz. How does it work differently than foam?
- A) Identically to foam
- B) Large air cavity isolates mic from turbulent boundary layer; foam adds additional dissipation
- C) Only blocks high frequencies
- D) Doesn't work

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
A 100-foot XLR cable has 50Ω impedance at audio frequencies. With 150Ω source (mic) and 2kΩ load (preamp), what's the cable's effect?
- A) Significant signal loss
- B) Minimal effect; cable impedance << load impedance, resistive losses negligible
- C) Complete signal loss
- D) Changes pattern

**Answer: B**

**Expert Explanation:** XLR is a balanced 3-pin connector standard for microphones and professional audio gear.
**Image:** !["Diagram"](/images/svg/cable_xlr_pinout.svg)
**Expert Quote:** "Terms like xlr are fundamental. - Dictionary"




---

### Question 8
A pop filter is positioned 2 inches from mic instead of 6 inches. What's the acoustic effect?
- A) Better performance
- B) Reduced effectiveness; less space for plosive energy to dissipate; may affect HF slightly if too close
- C) No difference
- D) Destroys microphone

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 9
Why do shock mounts use elastic suspension rather than rigid mounting?
- A) Cheaper
- B) Creates mechanical low-pass filter; resonance below audio band isolates above resonant frequency
- C) Aesthetics only
- D) Rigid is better

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 10
A cable has 100pF total capacitance. With 50kΩ source impedance (ribbon preamp), what's the -3dB rolloff frequency?
- A) ~32kHz
- B) ~320Hz
- C) ~3.2MHz
- D) No rolloff

**Answer: A**

**Expert Explanation:** Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound.
**Image:** !["Diagram"](/images/svg/phase_cancellation.svg)
**Expert Quote:** "Terms like interference are fundamental. - Dictionary"




---

---

## ANSWER KEY SUMMARY

**Total Questions: 120 (10 per topic × 12 topics)**

All answers are provided after each question for easy reference.

---

## SCORING GUIDE

- **90-100%** (108-120 correct): Outstanding - Professional level understanding
- **80-89%** (96-107 correct): Excellent - Strong degree-level knowledge
- **70-79%** (84-95 correct): Good - Competent degree-level understanding
- **60-69%** (72-83 correct): Satisfactory - Basic degree-level, needs reinforcement
- **Below 60%** (below 72 correct): Needs significant study - Review fundamentals

---

## ADVANCED LEVEL CHARACTERISTICS

These questions require:
- **Quantitative analysis** using physics and mathematics
- **Multi-variable problem solving** with real-world constraints
- **Deep technical understanding** of acoustic principles
- **Professional-level troubleshooting** and optimization
- **Synthesis** of multiple concepts simultaneously
- **Calculation** of acoustic parameters and relationships

---

## TOPICS COVERED

All questions draw from professional recording scenarios requiring degree-level understanding of:
- Acoustic physics and wave behavior
- Phase relationships and interference
- Signal flow mathematics
- Transducer operation principles
- Spatial audio theory
- Professional recording techniques

---

*Music Tech Dictionary - Volume 2 Advanced Quiz*
*© 2024 - Educational Use*
