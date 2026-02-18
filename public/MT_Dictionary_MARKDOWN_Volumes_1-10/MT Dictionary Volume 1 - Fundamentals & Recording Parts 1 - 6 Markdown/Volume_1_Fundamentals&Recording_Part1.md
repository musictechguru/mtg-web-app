# Music Tech Dictionary
## Volume 1: Fundamentals & Recording - COMPLETE
### Part 1 of 6: General Music Tech Terms

---

# PART 1: GENERAL MUSIC TECH TERMS

## 1. Core Audio Concepts

### Audio
Sound that has been recorded, processed, or reproduced electronically. **Analog audio:** continuous electrical voltage representing sound wave amplitude over time. **Digital audio:** series of discrete numerical samples representing sound wave. **Frequency range:** 20Hz-20,000Hz (human hearing limits). **Stereo:** two channels (left and right) creating spatial image. **Mono:** single channel, no spatial information. **Surround:** multiple channels for 3D sound field (5.1, 7.1, Dolby Atmos). **Quality factors:** frequency response, dynamic range, signal-to-noise ratio, total harmonic distortion. **Modern recording:** almost entirely digital, with some analog equipment for character.

### Frequency
Number of complete vibrations or cycles per second, measured in Hertz (Hz). **Determines:** pitch of sound. **Low frequencies:** 20-250Hz (bass, sub-bass, rumble, body). **Mid frequencies:** 250Hz-5kHz (fundamental tones, presence, clarity). **High frequencies:** 5-20kHz (treble, air, sparkle, detail). **Octave:** doubling of frequency (A 220Hz, next octave A 440Hz, next A 880Hz). **Musical standard:** A4 = 440Hz (international concert pitch). **Equal temperament:** 12 semitones per octave, each semitone frequency ratio = 12th root of 2 (~1.059463). **Wavelength:** inversely proportional to frequency (20Hz = 17 meters, 20kHz = 1.7cm at 343m/s).

### Amplitude
Strength, magnitude, or level of audio signal. **Determines:** perceived loudness or volume. **Measured in:** decibels (dB), voltage (V), or arbitrary units. **Higher amplitude:** louder sound, stronger signal. **Lower amplitude:** quieter sound, weaker signal. **Peak amplitude:** maximum level reached by signal. **RMS (Root Mean Square):** average amplitude over time, better represents perceived loudness. **Peak vs RMS:** peak can be much higher than RMS (transients). **Headroom:** space between average level and maximum before clipping. **Dynamic range:** ratio between quietest and loudest parts of signal.

### Decibel (dB)
Logarithmic unit for measuring audio levels and ratios. **Why logarithmic:** matches human hearing perception better than linear. **Always relative:** compares to reference level. **Common types:** 
- **dBFS (Full Scale):** digital maximum reference, 0dBFS = maximum digital level, cannot exceed
- **dBu:** voltage measurement, professional standard (+4dBu = line level)
- **dBV:** voltage measurement, consumer standard (-10dBV = line level)  
- **dB SPL:** Sound Pressure Level, acoustic measurement (0dB SPL = threshold of hearing)

**Key values:** +6dB ≈ double perceived loudness, -6dB ≈ half perceived loudness, +3dB = double power, -3dB = half power, +10dB = 10x power, +20dB = 100x power. **Dynamic range:** 1dB = just noticeable, 3dB = clearly noticeable, 6dB = significant change, 10dB = twice/half as loud.

### Clipping
Distortion occurring when signal exceeds maximum level that system can handle. **Digital clipping:** occurs at 0dBFS, signal peaks "clipped off" flat at maximum, results in very harsh, unpleasant distortion, creates additional harmonic frequencies, cannot be fixed after recording, sounds "crunchy" or "digital." **Analog clipping:** occurs when circuit components overload, softer/rounder distortion than digital, can be musical (tape saturation, tube overdrive), gradual rather than sudden. **Visual indicator:** waveform tops and bottoms appear flat, clipping LED lights red. **Prevention:** proper gain staging throughout signal chain, adequate headroom (3-6dB), limiters on critical paths, monitor levels carefully. **Result:** lost transient detail, reduced dynamic range, harsh artifacts. **Professional practice:** avoid clipping at all costs unless intentional creative effect.

### Headroom
Available level space between current signal level and maximum level before clipping. **Digital headroom:** distance from peak level to 0dBFS. **Analog headroom:** space before circuit overload/distortion. **Typical targets:** 
- Recording: -12dB to -6dBFS peaks, -6dB headroom minimum
- Mixing: -6dB to -3dBFS peaks, -3dB headroom
- Mastering: -1dB to -0.3dBFS peaks (after limiting)

**Why needed:** sudden unexpected peaks, cumulative level from processing, mastering needs room to work, safety margin prevents accidents. **Too little headroom:** clipping risk, no room for processing, stress and anxiety. **Too much headroom:** signal too quiet, noise floor becomes audible, weak signal-to-noise ratio, quantization noise (digital). **Professional practice:** maintain adequate headroom at every stage of signal chain.

### Dynamic Range
Difference between loudest and quietest parts of audio signal or system. **Measured in:** decibels (dB). **Wide dynamic range:** large difference between loud and quiet (classical music: 20-30dB+, jazz: 15-25dB, natural recordings). **Narrow dynamic range:** small difference (modern pop: 6-12dB, EDM/hip-hop: 4-8dB, radio: 4-6dB). **System dynamic range:** difference between noise floor and maximum level before distortion. **Bit depth determines maximum:** 16-bit = 96dB theoretical maximum, 24-bit = 144dB theoretical maximum, 32-bit float = virtually unlimited. **Compression:** reduces dynamic range (makes loud quieter, quiet louder). **Limiting:** prevents peaks from exceeding threshold. **Expansion:** increases dynamic range. **Genre dependent:** classical music preserves wide range, modern pop/EDM uses narrow range for loudness. **Mastering conflict:** loudness vs dynamics (can't maximize both).

### Signal-to-Noise Ratio (S/N or SNR)
Ratio between desired signal level and background noise level. **Measured in:** decibels (dB). **Higher value:** cleaner, better quality, less audible noise. **Lower value:** noisier, degraded quality. **Digital audio:** 16-bit = 96dB SNR, 24-bit = 144dB SNR, 32-bit float = >150dB SNR. **Analog equipment:** Budget preamps: 60-70dB, Professional preamps: 80-90dB, High-end preamps: >100dB. **Vinyl records:** ~60-70dB SNR. **Cassette tape:** 50-60dB (70dB with Dolby). **CD:** 96dB SNR. **Importance:** determines how quiet you can record before noise becomes audible. **Affected by:** gain staging, equipment quality, cable length, electromagnetic interference. **Improvement:** proper gain staging (strong signal), quality equipment (low noise floor), balanced cables (reject interference), recording at appropriate levels.

### Noise Floor
Lowest level of background noise present in audio system or recording. **Composed of:** thermal noise (electrons), electromagnetic interference, component noise (circuits), environmental noise. **Every component adds noise:** microphones, preamps, cables, converters, mixers. **Lower noise floor:** more transparent, professional quality. **Higher noise floor:** noisy, amateur quality. **Measured in:** dBu (analog), dBFS (digital), dB SPL-A (microphones). **Professional equipment:** <-100dBu noise floor. **Budget equipment:** -80dBu to -90dBu. **Audible when:** recording at low levels, applying excessive gain, poor gain staging, quiet passages in music. **Reduction techniques:** use quality low-noise equipment, proper gain staging, balanced cables for long runs, avoid ground loops, use noise gates on individual tracks (carefully).

### Phase
Timing relationship between waveforms. **In phase:** waveforms aligned, peaks coincide, results in summation (louder). **Out of phase:** waveforms offset, peaks oppose, results in cancellation (quieter or silent). **180° out of phase:** complete opposition, maximum cancellation. **Phase shift:** delay between waveforms, measured in degrees (0-360°) or time (milliseconds). **Causes:** physical distance between microphones, cable wiring errors, equipment polarity, reflections, filters/EQ. **Comb filtering:** phase interference creating frequency response peaks and dips at regular intervals. **Phase coherence:** waveforms maintain consistent phase relationship. **Mono compatibility:** checking if stereo mix maintains quality when summed to mono. **Polarity inversion:** flipping waveform upside down (often called "phase inversion"). **Fix:** phase invert button, adjust mic positioning, check cables, time alignment.

### Transient
Short-duration, high-amplitude peak at beginning of sound. **Characteristics:** very brief (1-50ms), high peak level, contains most energy, defines attack of sound. **Importance:** determines punch, impact, clarity, articulation of sound. **Examples:** drum hits, percussion, plucked strings, consonants in speech, pizzicato strings. **Frequency content:** rich in high frequencies. **Compression effect:** can reduce transients (slower attack preserves, faster attack reduces). **Limiting effect:** can clip transients if too aggressive. **Transient enhancement:** increases or decreases transient levels separately from sustain. **Recording:** requires adequate headroom (transients often 6-20dB above RMS). **Mixing:** transients help sounds cut through mix. **Mastering:** preserve transients while achieving loudness. **Peak vs RMS:** transients cause high peak with lower RMS.

---

## 2. Digital Audio Fundamentals

### Sample Rate
Number of times per second that audio signal is measured and converted to digital value. **Measured in:** Hertz (Hz) or kilohertz (kHz). **Common sample rates:**
- **44,100Hz (44.1kHz):** CD standard, 44,100 samples per second
- **48,000Hz (48kHz):** Professional audio and video standard
- **88,200Hz (88.2kHz):** High resolution, 2x CD rate
- **96,000Hz (96kHz):** High resolution, 2x professional rate
- **176,400Hz (176.4kHz):** Ultra high resolution, 4x CD rate
- **192,000Hz (192kHz):** Ultra high resolution, 4x professional rate

**Nyquist theorem:** must sample at twice the highest frequency to accurately capture it. **44.1kHz:** captures frequencies up to 22.05kHz (exceeds human hearing limit of 20kHz). **Higher sample rates:** larger file sizes, more CPU processing required, minimal audible benefit (above Nyquist already exceeds hearing), easier anti-aliasing filtering, more headroom for digital processing, reduced aliasing in plugins. **Professional practice:** 48kHz most common (video standard), 96kHz for critical recording, maintain consistent rate throughout project. **File size impact:** doubling sample rate doubles file size.

### Bit Depth
Number of bits used to represent amplitude of each sample. **Determines:** resolution, dynamic range, signal-to-noise ratio. **Common bit depths:**
- **8-bit:** 256 levels, 48dB dynamic range (obsolete, lo-fi)
- **16-bit:** 65,536 levels, 96dB dynamic range (CD quality)
- **24-bit:** 16,777,216 levels, 144dB dynamic range (professional standard)
- **32-bit float:** virtually unlimited levels, ~1,680dB dynamic range (modern standard)

**Formula:** Dynamic range (dB) = bit depth × 6. **Each bit:** adds approximately 6dB of dynamic range. **Higher bit depth advantages:** lower noise floor, more detail in quiet passages, better headroom for processing, reduced quantization error. **16-bit limitations:** quantization noise audible in quiet passages, requires dithering, limited headroom. **24-bit professional:** industry standard for recording, ample dynamic range, low noise floor. **32-bit float special:** cannot clip (mathematically), values can exceed 0dBFS internally, automatically prevents clipping, ideal for recording safety. **Recording recommendation:** always use 24-bit minimum, 32-bit float if available. **Final delivery:** 16-bit for CD (with proper dithering), 24-bit for high resolution.

### Sampling (A/D Conversion)
Process of converting continuous analog signal into discrete digital values. **Process steps:**
1. **Anti-aliasing filter:** removes frequencies above Nyquist frequency (half sample rate)
2. **Sample and hold:** captures instantaneous voltage at sample intervals
3. **Quantization:** rounds voltage to nearest available digital value (determined by bit depth)
4. **Binary encoding:** converts quantized value to binary number
5. **Storage:** saves binary data to memory/disk

**Sample rate determines:** how often voltage measured. **Bit depth determines:** resolution of each measurement. **Quality factors:** clock accuracy (jitter), anti-aliasing filter quality, circuit noise floor, linearity. **Famous converters:** Apogee (Symphony, Ensemble), Prism Sound (ADA-8XR), Lynx (Aurora), RME (ADI-2), Universal Audio (Apollo). **Modern converters:** essentially transparent when high quality, differences subtle. **Professional practice:** quality converters important, but diminishing returns above mid-price range.

### D/A Conversion (Playback)
Converting digital values back to continuous analog signal for monitoring. **Process steps:**
1. **Binary decoding:** reads binary numbers from storage
2. **Digital-to-analog conversion:** converts numbers to voltage steps (staircase waveform)
3. **Reconstruction filter:** smooths staircase into continuous waveform
4. **Output buffer:** drives speakers/headphones

**Nyquist theorem:** guarantees perfect reconstruction of frequencies below Nyquist frequency. **Reconstruction filter:** crucial for smooth analog signal, removes sampling artifacts. **Quality factors:** clock accuracy, filter quality, circuit design, output impedance. **Latency:** D/A conversion adds small delay (1-3ms typical). **Monitor path:** often separate from recording path for lower latency. **Professional practice:** quality D/A conversion important for accurate monitoring.

### Quantization
Process of rounding continuous amplitude values to nearest available discrete level. **Bit depth determines levels:** 16-bit = 65,536 levels, 24-bit = 16,777,216 levels. **Quantization error:** difference between actual value and rounded value, unavoidable in digital audio, becomes noise at noise floor. **Magnitude:** maximum error = ½ LSB (Least Significant Bit), 16-bit: ±0.000015 of full scale, 24-bit: ±0.0000000596 of full scale. **Audibility:** 16-bit: quantization noise audible in very quiet passages, 24-bit: quantization noise below audible threshold, 32-bit float: essentially zero quantization noise. **Dithering:** masks quantization error with low-level noise. **Professional practice:** record at 24-bit minimum to make quantization error inaudible.

### Dithering
Adding very low-level noise when reducing bit depth to mask quantization distortion. **Purpose:** randomizes quantization error preventing harmonic distortion patterns, pushes distortion into noise floor, makes 16-bit sound better. **When to use:** reducing 24-bit to 16-bit for CD, reducing any bit depth, final mastering stage only. **When NOT to use:** on 24-bit files staying at 24-bit, multiple times (accumulates noise), before further processing. **Types:**
- **TPDF (Triangular Probability Density Function):** basic, flat spectrum noise, simple and effective
- **POW-R (Psychoacoustically Optimized Wordlength Reduction):** shaped noise, pushes noise to less sensitive frequencies (above 10kHz), sounds cleaner
- **Apogee UV22:** proprietary shaped dither
- **iZotope MBIT+:** advanced shaped dither

**Amount:** only 1 LSB needed. **Professional practice:** apply once only at final conversion to 16-bit.

### Aliasing
False frequencies created when sampling signal containing frequencies above Nyquist frequency (half sample rate). **Cause:** violating Nyquist theorem (frequencies present above half sample rate). **Result:** mirror image frequencies fold back below Nyquist, creating inharmonic artifacts. **Example:** 44.1kHz sample rate, Nyquist = 22.05kHz. If 25kHz frequency present, creates false 19.1kHz component. **Prevention:** anti-aliasing filter before A/D converter, steep low-pass filter above Nyquist frequency, modern converters have excellent anti-aliasing filters. **Digital processing:** can create aliasing (plugins should handle internally with oversampling). **Oversampling:** processing at higher sample rate internally, reduces aliasing during processing. **Audible as:** harsh, inharmonic, metallic artifacts. **Higher sample rates:** make anti-aliasing filtering easier (gentler filter slope needed).

### Jitter
Timing errors in sample clock, causing samples to be taken at slightly wrong times. **Measured in:** picoseconds (trillionths of second). **Sources:** poor clock design, power supply noise, cable interference, electromagnetic interference. **Effects:** smearing of stereo image, reduced depth/clarity, subtle harshness, increased noise floor, reduced dynamic range. **Audible threshold:** ~100 picoseconds (varies by listener and system). **Professional converters:** typically <10ps jitter. **Budget converters:** 50-200ps jitter. **External clocks:** can improve stability (Antelope, Mutec, Brainstorm). **Digital cables:** quality matters for jitter rejection (AES/EBU, S/PDIF). **Modern equipment:** jitter much less issue than 1990s/2000s. **Professional practice:** use quality converters with stable clocks, consider external clock for critical applications.

### Clock/Word Clock
Timing reference that synchronizes digital audio devices. **Sample clock:** determines exactly when each sample is taken. **Why needed:** all digital devices must sample at exactly same rate and time. **Internal clock:** built into every digital device, free-running. **External clock:** from dedicated clock generator or master device. **Master/Slave:** one device provides clock (master), others sync to it (slaves). **Only one master:** multiple masters cause conflicts. **Word clock connection:** dedicated BNC cable for clock signal only, separate from audio. **Embedded clock:** carried with audio signal (ADAT, S/PDIF, AES/EBU). **Clock distribution:** multiple devices sync to one master. **Dedicated clock generators:** Antelope Trinity/10M, Mutec MC-3+, Brainstorm. **Professional practice:** choose best clock source as master (usually dedicated generator or high-end converter).

### Latency  
Delay between audio input and when you hear it back through monitoring system. **Measured in:** milliseconds (ms). **Sources:**
- **Buffer processing:** samples collected in buffer before processing (main source)
- **A/D conversion:** analog to digital conversion time (~1ms)
- **D/A conversion:** digital to analog conversion time (~1ms)  
- **Plugin processing:** DSP calculation time
- **Operating system:** audio driver overhead

**Buffer size calculation:** Latency (ms) = (Buffer size in samples / Sample rate in Hz) × 1000 × 2 (for round trip). **Examples at 48kHz:** 64 samples = 2.7ms round trip, 128 samples = 5.3ms round trip, 256 samples = 10.7ms round trip, 512 samples = 21.3ms round trip.

**Acceptable latency:** <5ms feels instant, 5-10ms acceptable for most, 10-15ms noticeable but workable, >15ms difficult to perform naturally. **Trade-off:** Lower buffer = lower latency but higher CPU load, potential dropouts. Higher buffer = higher latency but more stable, can run more plugins. **Professional practice:** low buffer (64-128) for recording, high buffer (512-1024) for mixing.

### Direct Monitoring
Routing input signal directly to headphone/monitor output without computer processing. **Zero latency:** signal path bypasses computer entirely (analog or DSP path). **Types:**
- **Hardware direct monitoring:** pure analog path in interface
- **DSP monitoring:** processed by interface DSP (still near-zero latency)
- **Software monitoring:** DAW with low-latency mode (not truly zero)

**Advantages:** no delay for comfortable recording, works with any buffer size, reduces CPU load. **Disadvantages:** cannot hear plugin processing during recording, may require separate monitor mix. **Most interfaces include:** hardware direct monitoring features. **Professional practice:** use hardware direct monitoring when recording, monitor through DAW when overdubbing with existing processing needed.

### Buffer Size
Number of samples collected before processing and output. **Measured in:** samples (32, 64, 128, 256, 512, 1024, 2048). **Purpose:** allows efficient batch processing, provides time for CPU to calculate. **Trade-off relationship:**
- **Small buffer (64-128):** Low latency (good for recording), High CPU usage, Risk of dropouts/clicks, Fewer plugins possible
- **Large buffer (512-1024):** Higher latency (bad for recording), Lower CPU usage, Very stable, Many plugins possible

**Common settings:** Recording = 64-128 samples, Mixing = 512-1024 samples, Mastering = 1024-2048 samples. **Professional practice:** adjust buffer size based on task (low for recording, high for mixing).

---

*[Content continues in Part 2]*

