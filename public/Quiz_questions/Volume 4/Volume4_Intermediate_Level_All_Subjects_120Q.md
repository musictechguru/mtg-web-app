# Music Tech Dictionary - Volume 4: Sampling & Sequencing
## INTERMEDIATE LEVEL (A-Level) - Complete Quiz by Subject
### 10 Questions Per Subject - 120 Questions Total

---

# SUBJECT 1: SAMPLE EDITING BASICS (10 Questions)

### Question 1
You're editing a drum sample and notice a click when you trim the start. What's the most likely cause and solution?
- A) Volume is too high; reduce gain
- B) You cut in the middle of the waveform instead of at a zero-crossing; re-cut at zero-crossing
- C) Sample rate is wrong; change sample rate
- D) File is corrupted; re-record

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 2
When creating a seamless loop, you find matching waveform shapes at the start and end points, but the loop still has a slight click. What additional factor should you check?
- A) File format
- B) Phase relationship - ensure both points are at the same phase
- C) Bit depth
- D) Sample rate

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 3
You need to remove the first 500ms of a vocal sample that contains breathing. What's the best workflow to preserve the natural attack?
- A) Cut exactly at 500ms
- B) Zoom in, find the start of the actual vocal sound, cut just before it at a zero-crossing, add a short fade-in
- C) Normalize then cut
- D) Apply heavy fade-in of 2 seconds

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 4
Why would you use an exponential fade curve instead of a linear fade for most musical applications?
- A) Exponential is faster to calculate
- B) Exponential curves sound more natural to human hearing, which perceives volume logarithmically
- C) Linear always sounds better
- D) There's no difference

**Answer: B**

**Expert Explanation:** Editing samples requires precision at zero-crossings.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 5
You're creating a crossfade loop for a pad sound. The loop is 2 seconds long. What crossfade duration would be most appropriate?
- A) 1ms
- B) 50-200ms
- C) 1 second
- D) 3 seconds

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 6
When would you intentionally NOT edit at a zero-crossing?
- A) Never - always use zero-crossings
- B) When you're using a crossfade to smooth the transition, or creating a specific creative effect
- C) When working with MIDI
- D) Zero-crossings should never be used

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 7
You reverse a cymbal crash to create a riser effect. To make it blend into the mix better at the peak, what should you add to the end of the reversed sample?
- A) Nothing needed
- B) A short fade-out at the reversed attack to prevent an abrupt stop
- C) Normalize it
- D) Reverse it again

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 8
What's the key difference in fade length between percussive samples (drums) and sustained samples (pads)?
- A) Percussive: 1-10ms; Sustained: 50-200ms+
- B) Both use the same fade length
- C) Percussive needs longer fades
- D) Sustained samples don't need fades

**Answer: A**

**Expert Explanation:** Editing samples requires precision at zero-crossings.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
You've created a perfect crossfade loop, but when it loops in your sampler, you still hear a slight timbral change. What's the most likely cause?
- A) Wrong sample rate
- B) The spectral content differs between loop start and end; find more similar sections or use a longer crossfade
- C) Bit depth mismatch
- D) File format issue

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 10
Why might you deliberately leave 3-10ms of silence before the first transient when trimming a drum sample?
- A) To waste space
- B) To prevent accidentally cutting the attack too close and creating clicks; provides safety margin
- C) To make the file larger
- D) Silence should always be removed completely

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

---

# SUBJECT 2: SAMPLE PROCESSING (10 Questions)

### Question 1
You have 10 drum samples with varying levels. You want them all to have consistent perceived loudness. Which normalization method is better?
- A) Peak normalization
- B) RMS normalization
- C) No normalization
- D) Random gain

**Answer: B**

**Expert Explanation:** Processing samples changes their character.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 2
You normalize a sample to -0.3dBFS instead of 0dBFS. Why leave this small headroom?
- A) To waste space
- B) To prevent potential intersample peaks and leave room for interpolation during sample rate conversion
- C) -0.3dBFS is quieter
- D) No reason

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 3
You notice your sample's waveform is shifted upward above the center line. After removing DC offset, what additional step should you take?
- A) Nothing else needed
- B) Re-normalize the sample, as DC offset removal may have changed the peak level
- C) Reverse the sample
- D) Change the bit depth

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 4
What's the correct order of operations when preparing a sample: trim, remove DC offset, and normalize?
- A) Normalize → Trim → Remove DC offset
- B) Trim → Remove DC offset → Normalize
- C) Remove DC offset → Normalize → Trim
- D) Order doesn't matter

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 5
You're working on a large sample library and need to preserve editing flexibility. Which editing approach should you use?
- A) Destructive editing
- B) Non-destructive editing
- C) Both are equally flexible
- D) Neither approach works

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
A sample was recorded with DC offset. If you create a loop from it without removing the offset first, what problem will occur?
- A) No problems
- B) A click at the loop point due to the DC offset discontinuity
- C) Higher volume
- D) Changed pitch

**Answer: B**

**Expert Explanation:** Processing samples changes their character.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 7
You've normalized 50 samples to 0dBFS peak. Now they're in your mix and some sound much louder than others despite having the same peak. Why?
- A) File corruption
- B) Peak normalization doesn't account for perceived loudness; samples with sustained content sound louder than transient-heavy samples at the same peak
- C) Sample rate mismatch
- D) Bit depth issues

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 8
When would destructive editing be preferable to non-destructive?
- A) Never
- B) When creating final sample library files, rendering effects to save CPU, or batch processing where changes are final
- C) Always
- D) Only for MIDI

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 9
You normalized a quiet sample to 0dBFS, but it still sounds quieter than other samples. What's a better solution than peak normalization alone?
- A) Normalize to +6dBFS
- B) Use compression or RMS normalization to increase average level, or manually adjust gain based on perceived loudness
- C) Leave it alone
- D) Delete the sample

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 10
Why is DC offset particularly problematic when creating loops or crossfades?
- A) It's not problematic
- B) The DC shift creates a discontinuity at loop/crossfade points, causing audible clicks
- C) It only affects volume
- D) DC offset helps loops

**Answer: B**

**Expert Explanation:** Processing samples changes their character.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

---

# SUBJECT 3: BIT DEPTH & DYNAMIC RANGE (10 Questions)

### Question 1
You're recording a quiet classical piece with extreme dynamic range. Which bit depth is most appropriate and why?
- A) 16-bit
- B) 24-bit
- C) 8-bit
- D) Bit depth doesn't matter

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 2
Calculate the approximate dynamic range improvement when going from 16-bit to 24-bit audio.
- A) 6dB
- B) 12dB
- C) 48dB
- D) 96dB

**Answer: C**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 3
You're recording at 24-bit but notice the peaks are only reaching -40dBFS. Why is this still better than recording at 16-bit with peaks at -6dBFS?
- A) It's not better
- B) 24-bit provides more resolution in the lower bits; even quiet signals have adequate bit depth for processing without noise
- C) 16-bit is always better
- D) They're identical

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 4
What happens to quantization noise as bit depth increases?
- A) Gets louder
- B) Gets quieter; noise floor drops by 6dB per additional bit
- C) Stays the same
- D) Disappears completely at 8-bit

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 5
You're mixing in 24-bit and need to export to 16-bit for CD. At what stage should you apply dithering?
- A) At the start of mixing
- B) Only once, at the final 24-bit to 16-bit conversion
- C) After every plugin
- D) Never apply dithering

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 6
Why does 32-bit float provide "virtually unlimited" dynamic range compared to 24-bit fixed-point?
- A) More storage space
- B) Floating-point representation allows values beyond 0dBFS without clipping; exponent handles extreme dynamic ranges
- C) They're the same
- D) 32-bit float is quieter

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 7
Your 16-bit recording has audible quantization noise in quiet passages. What's the best solution?
- A) Increase volume
- B) Record at 24-bit next time; for this recording, apply dithering if reducing bit depth, or use noise reduction carefully
- C) Delete quiet passages
- D) Convert to 8-bit

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 8
How does the noise floor of 24-bit (-144dBFS) compare to the threshold of human hearing in a quiet room?
- A) Louder than hearing threshold
- B) Well below the threshold of human hearing; essentially inaudible
- C) Same as hearing threshold
- D) 24-bit is noisy

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 9
You're processing audio with multiple plugins. Should you work at 16-bit or 24-bit internally?
- A) 16-bit to save CPU
- B) 24-bit to preserve headroom and prevent accumulation of quantization errors
- C) 8-bit is sufficient
- D) Bit depth doesn't affect processing

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 10
What's the relationship between bit depth and file size?
- A) No relationship
- B) File size increases proportionally: 24-bit files are 1.5× larger than 16-bit files
- C) 24-bit files are smaller
- D) Both are the same size

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

---

# SUBJECT 4: SAMPLE RATE & NYQUIST THEOREM (10 Questions)

### Question 1
You're recording audio that will undergo extreme pitch-shifting (up to 2 octaves up). What sample rate would be most appropriate and why?
- A) 22.05kHz
- B) 96kHz or higher; pitch-shifting up brings high-frequency content closer to Nyquist, potentially causing aliasing; higher sample rate provides headroom
- C) 44.1kHz is always sufficient
- D) Sample rate doesn't affect pitch-shifting

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 2
Calculate the Nyquist frequency for a sample rate of 96kHz.
- A) 96kHz
- B) 48kHz
- C) 192kHz
- D) 24kHz

**Answer: B**

**Expert Explanation:** The Nyquist frequency is half of the sampling rate. Frequencies above this limit cause aliasing.
**Image:** !["Diagram"](/images/diagram_nyquist_v2.png)
**Expert Quote:** "Terms like nyquist are fundamental. - Dictionary"




---

### Question 3
You're producing a track for CD release (44.1kHz final format). Should you record at 44.1kHz or 96kHz?
- A) Always record at 44.1kHz
- B) Can record at 96kHz for processing headroom, then downsample to 44.1kHz with proper resampling for final delivery
- C) Must record at 96kHz
- D) Sample rate doesn't matter

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 4
A frequency of 25kHz is recorded at 44.1kHz sample rate. What happens, and what frequency appears in the recording?
- A) Records perfectly at 25kHz
- B) Aliasing occurs; creates a false frequency at 19.1kHz
- C) Nothing is recorded
- D) Volume increases

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 5
You're working with extensive non-linear processing (distortion, saturation). Why might recording at 96kHz be beneficial even though the final product is 44.1kHz?
- A) No benefit
- B) Higher sample rate reduces aliasing artifacts created by non-linear processing; cleaner final result after downsampling
- C) Makes files larger only
- D) 96kHz prevents distortion

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 6
What's the main disadvantage of using 192kHz sample rate for an entire project?
- A) Lower quality
- B) Dramatically increased file sizes and CPU usage with minimal audible benefit
- C) Worse sound quality
- D) No disadvantages

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 7
When converting from 96kHz to 44.1kHz, what critical step must occur to prevent aliasing?
- A) Just change the sample rate
- B) Apply a high-quality resampling algorithm with low-pass filtering below 22.05kHz before downsampling
- C) Increase volume
- D) No special steps needed

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 8
Why does higher sample rate provide better time resolution for editing?
- A) It doesn't
- B) More samples per second means finer granularity; e.g., 96kHz has samples every 10.4μs vs. 22.7μs at 44.1kHz
- C) Lower sample rate has better time resolution
- D) Time resolution is unaffected by sample rate

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 9
You notice that doubling sample rate from 48kHz to 96kHz doesn't sound "twice as good." Why?
- A) Equipment is broken
- B) Human hearing only extends to ~20kHz; 48kHz already captures this; improvements are technical, not perceptually dramatic
- C) 96kHz sounds worse
- D) They sound identical in all situations

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 10
Compare file sizes: How much larger is a 1-minute stereo file at 96kHz/24-bit versus 44.1kHz/16-bit?
- A) Same size
- B) Approximately 3.26× larger
- C) Slightly larger
- D) Smaller

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

---

# SUBJECT 5: QUANTIZATION, DITHERING & FILE FORMATS (10 Questions)

### Question 1
You're mastering a track at 24-bit and exporting to 16-bit for CD. You apply dither. What does dithering actually do to the quantization error?
- A) Removes it completely
- B) Randomizes it, converting correlated distortion into benign random noise that's less perceptually annoying
- C) Increases it
- D) Dithering doesn't affect quantization

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 2
You apply dithering twice: once when bouncing stems, again when creating the final master. What's the problem?
- A) No problem
- B) Dither noise accumulates; only dither once at the final bit depth reduction to avoid unnecessary noise buildup
- C) Dithering can be applied unlimited times
- D) Makes it louder

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 3
When should you use noise-shaped dithering versus TPDF (flat) dithering?
- A) Always use TPDF
- B) Noise-shaped for final masters; TPDF for general use or when further processing expected
- C) Never use noise shaping
- D) They're identical

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 4
You're comparing WAV and FLAC files of the same recording. How do they differ in quality and file size?
- A) FLAC has lower quality
- B) Identical quality; FLAC is 40-60% smaller due to compression
- C) WAV has lower quality
- D) FLAC is larger

**Answer: B**

**Expert Explanation:** Quantization maps analog to digital steps.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 5
An MP3 file at 128kbps versus 320kbps: what's the practical difference?
- A) Identical quality
- B) 320kbps is nearly transparent to original; 128kbps has noticeable artifacts
- C) 128kbps sounds better
- D) Bitrate doesn't affect quality

**Answer: B**

**Expert Explanation:** Quantization maps analog to digital steps.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 6
You recorded a vocal at 24-bit with peaks hitting -6dBFS. Digital clipping did NOT occur, but you want to maximize the level. What should you do?
- A) Nothing - it's already clipped
- B) Normalize to bring peaks to -0.3dBFS
- C) Delete the recording
- D) Record at lower level

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 7
What's the fundamental difference between quantization error in 16-bit versus 24-bit?
- A) No difference
- B) 24-bit has much smaller quantization steps; error is 48dB quieter than 16-bit
- C) 16-bit has smaller error
- D) Both have zero error

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 8
You export a mix as MP3 320kbps for client review, then later as WAV for mastering. Is this workflow acceptable?
- A) No - lossy export should only happen once at the end; use WAV for all intermediate exports
- B) Yes, both are the same quality
- C) MP3 is always better
- D) WAV can't be used for mastering

**Answer: A**

**Expert Explanation:** Quantization maps analog to digital steps.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
A client requests "the highest quality possible" for archival. What format and settings do you use?
- A) MP3 128kbps
- B) WAV or FLAC at 24-bit/96kHz
- C) MP3 320kbps
- D) 8-bit/22kHz WAV

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 10
You've recorded at 32-bit float and a transient briefly exceeded 0dBFS during recording, showing +3dBFS on the meter. What happened?
- A) Severe clipping and distortion
- B) No clipping; 32-bit float allows values beyond 0dBFS internally; simply reduce gain in post to bring back to proper range
- C) Recording is ruined
- D) Impossible scenario

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

---

# SUBJECT 6: SAMPLE PLAYBACK & LOOPING (10 Questions)

### Question 1
A piano sample has root note set to C4 (60). You play E4 (64) on your keyboard. How many semitones is the sample transposed, and in which direction?
- A) 4 semitones down
- B) 4 semitones up
- C) No transposition
- D) 8 semitones up

**Answer: B**

**Expert Explanation:** Looping allows continuous playback of short samples.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 2
You've created a loop for a string sustain that's 880ms long. The sample is at A3 (220Hz). Why might this loop have a subtle timbral wobble?
- A) Loop length is perfect
- B) Loop length should be an exact multiple of the waveform period; 220Hz = 4.545ms period; 880ms ÷ 4.545ms = 193.6 cycles; use 879.5ms for 193 exact cycles
- C) Loops always wobble
- D) File format issue

**Answer: B**

**Expert Explanation:** Looping allows continuous playback of short samples.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
You set a sample's loop from 10,000 samples to 50,000 samples at 48kHz sample rate. How long is the loop in milliseconds?
- A) 40ms
- B) ~833ms
- C) 4 seconds
- D) 40 seconds

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 4
A drum sample has root note C3 (48). Playing it at C5 (72) causes unnatural artifacts. What's happening and what's the solution?
- A) Nothing wrong
- B) +24 semitones creates extreme pitch-shifting artifacts; use multi-sampling with separate samples recorded at higher pitches
- C) Increase volume
- D) Change bit depth

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 5
What's the purpose of setting a release sample separate from the sustain loop?
- A) No purpose
- B) Captures natural release sounds that play when key is released, adding realism
- C) Makes files larger only
- D) Release samples are never used

**Answer: B**

**Expert Explanation:** Release is the time it takes for the processor to return to a neutral state.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like release are fundamental. - Dictionary"




---

### Question 6
You're creating a pad sound with a 2-second loop. Both loop points are at zero-crossings, but there's still a click. What additional techniques can help?
- A) Increase volume
- B) Use crossfade looping or find sections with more similar spectral content
- C) Change sample rate
- D) Reverse the sample

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 7
A sampler plays the sustain loop but you want legato playing to skip the attack portion. What parameter do you adjust?
- A) Volume
- B) Sample start offset
- C) Root note
- D) Release time

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 8
You're mapping drum samples across a keyboard. Kick is at C2 (36), snare at D2 (38), hi-hat at F#2 (42). What are these samples' root notes, and what happens if you play different keys?
- A) All root notes are C4
- B) Root notes match assigned keys; playing other keys pitch-shifts them
- C) Root notes don't matter for drums
- D) All drums must be at C3

**Answer: B**

**Expert Explanation:** Looping allows continuous playback of short samples.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
Why is ping-pong (forward-backward) looping useful for certain sounds?
- A) It's not useful
- B) Can create smoother loops by automatically reversing at loop point, avoiding abrupt returns to loop start; good for evolving pads
- C) Only for drums
- D) Makes samples louder

**Answer: B**

**Expert Explanation:** Looping allows continuous playback of short samples.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
A loop works perfectly at the original pitch but creates a wobble when transposed. Why?
- A) Bad luck
- B) Loop length remains constant in samples, but transposing changes the effective wavelength; loop may no longer be exact multiple of cycles at new pitch
- C) Loops can't be transposed
- D) Volume issue

**Answer: B**

**Expert Explanation:** Looping allows continuous playback of short samples.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

---

# SUBJECT 7: MULTI-SAMPLING TECHNIQUES (10 Questions)

### Question 1
You're creating a piano library with 4 velocity layers. How should you set the velocity ranges to ensure smooth transitions?
- A) 1-32, 33-64, 65-96, 97-127
- B) 1-40, 30-70, 60-100, 90-127
- C) All layers respond to all velocities
- D) Random ranges

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 2
A multi-sampled piano uses samples every octave (12 semitones apart). What's the maximum pitch-shift any sample experiences?
- A) 12 semitones
- B) ±6 semitones
- C) ±1 octave
- D) No pitch-shifting

**Answer: B**

**Expert Explanation:** Multi-sampling captures an instrument across its range.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
You have 6 round-robin samples for a hi-hat. Using sequential round-robin cycling, on which hit will the pattern repeat?
- A) After 3 hits
- B) After 6 hits
- C) After 12 hits
- D) Never repeats

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
Why does a sample library with velocity layers sound more realistic than simply adjusting volume with velocity?
- A) It doesn't sound more realistic
- B) Real instruments have different timbres at different dynamics; volume alone can't replicate this
- C) Volume adjustment is always better
- D) They sound identical

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 5
You're designing a velocity crossfade between layers. Layer 1 plays at velocities 1-70, Layer 2 at 60-127. What happens in the 60-70 range?
- A) Only Layer 1 plays
- B) Both layers play simultaneously with crossfading; creates smooth transition between dynamics
- C) Neither plays
- D) Random layer selection

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 6
A professional piano library has 88 keys × 8 velocity layers × 3 round-robins. How many total samples?
- A) 88
- B) 2,112 samples
- C) 264
- D) 704

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 7
What's the trade-off when using more round-robin samples (e.g., 12 instead of 3)?
- A) No trade-off
- B) More realistic, varied performance but 4× larger library size and memory usage
- C) Lower quality
- D) Faster loading

**Answer: B**

**Expert Explanation:** Multi-sampling captures an instrument across its range.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
You're multi-sampling a guitar with samples every 4 semitones (minor 3rd). Compared to every octave, what improvement do you get?
- A) No improvement
- B) Maximum pitch-shift reduced from ±6 to ±2 semitones; less unnatural timbre changes, more realistic across range
- C) Worse quality
- D) Identical results

**Answer: B**

**Expert Explanation:** Multi-sampling captures an instrument across its range.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
For a strummed acoustic guitar, why is round-robin particularly important compared to a piano?
- A) It's not important
- B) Strumming creates rapid repeated notes where machine-gun effect is very noticeable; each strum sounds slightly different on real guitar
- C) Piano needs more round-robin
- D) Round-robin only works for drums

**Answer: B**

**Expert Explanation:** Multi-sampling captures an instrument across its range.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
You're creating key zones with 3 samples covering 5 octaves. If you want equal distribution, what range does each sample cover?
- A) 1 octave each
- B) ~20 semitones each
- C) 5 octaves each
- D) 3 semitones each

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

---

# SUBJECT 8: TIME-STRETCHING & PITCH SHIFTING (10 Questions)

### Question 1
You need to slow a 120 BPM drum loop to 100 BPM. What's the required time-stretch percentage and will quality be acceptable?
- A) 50% stretch, poor quality
- B) 120% stretch; moderate quality expected with good algorithm
- C) 80% stretch
- D) No stretching needed

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 2
You're pitch-shifting a vocal up 5 semitones for a harmony. Formant preservation is enabled. What does this do?
- A) Nothing
- B) Maintains the vocal tract resonances so the voice sounds natural instead of "chipmunk-like"
- C) Makes it louder
- D) Prevents pitch-shifting

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
A time-stretched vocal (stretched to 150% duration) exhibits warbling and metallic artifacts. What might improve the quality?
- A) Stretch more
- B) Use a higher-quality algorithm, enable formant preservation, or stretch in two 50% steps rather than one 150% step
- C) Increase volume
- D) Change bit depth

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 4
Why does WSOLA (Waveform Similarity Overlap-Add) work better for rhythmic material than Phase Vocoder?
- A) WSOLA doesn't work well for rhythmic material
- B) WSOLA better preserves transients; Phase Vocoder tends to smear percussive attacks
- C) Phase Vocoder is always better
- D) They're identical

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 5
You're creating an ambient drone using Paulstretch. A 3-second sound stretched to 300 seconds is what stretch factor?
- A) 10×
- B) 100×
- C) 1000×
- D) 3×

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 6
Compare pitch-shifting +12 semitones (1 octave up) versus -12 semitones (1 octave down) in terms of artifacts. Which typically has worse quality?
- A) Both identical
- B) +12 semitones often worse; brings high-frequency content closer to Nyquist, potentially causing aliasing; formants shift unnaturally high
- C) -12 semitones always worse
- D) Neither has artifacts

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 7
You need to match a vocal to a track that's 3% faster. What's the most transparent approach?
- A) Extreme time-stretching
- B) Use high-quality algorithm at 97% speed, enable formant preservation; minimal artifacts expected
- C) Don't time-stretch at all
- D) Change pitch instead

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
A time-stretched drum loop (80% speed) sounds phasey. What characteristic of time-stretching causes this?
- A) Volume changes
- B) Grain overlap and FFT processing create phase interactions and slight chorusing effects
- C) Bit depth reduction
- D) Phasing is imaginary

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 9
You're pitch-shifting a bass guitar up an octave for a special effect. You notice it sounds thin and loses low-end weight. Why?
- A) File corruption
- B) Pitching up shifts all frequency content upward; fundamentals move from bass to mid range; lost sub-bass information
- C) Volume decreased
- D) Sample rate changed

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 10
When time-stretching to extreme lengths (>200%), which algorithm is specifically designed for this and creates smooth, drone-like textures?
- A) WSOLA
- B) Paulstretch
- C) Phase Vocoder
- D) Élastique

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

---

# SUBJECT 9: MIDI FUNDAMENTALS (10 Questions)

### Question 1
You have a MIDI controller keyboard connected to a synthesizer via MIDI OUT to MIDI IN. No sound is produced. What's the most likely issue?
- A) Cables are reversed
- B) MIDI channel mismatch - controller sending on channel 1, synth receiving on channel 2, for example
- C) MIDI cables can't transmit sound
- D) Volume is low

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 2
You're chaining three devices: Controller → Synth 1 → Synth 2. How should they be connected?
- A) All via MIDI OUT
- B) Controller MIDI OUT → Synth 1 MIDI IN; Synth 1 MIDI THRU → Synth 2 MIDI IN
- C) All via MIDI IN
- D) Use only USB

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 3
A MIDI file is 5KB. The equivalent uncompressed audio (WAV, 16-bit/44.1kHz stereo, 3 minutes) would be approximately what size?
- A) 5KB
- B) ~31MB; MIDI is dramatically smaller
- C) 10KB
- D) 100KB

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 4
You have a 16-channel multi-timbral synthesizer. Can you play 16 different sounds simultaneously?
- A) No, only one sound possible
- B) Yes, each channel can have a different sound assigned; allows 16 independent parts
- C) Only 8 sounds
- D) Unlimited sounds

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 5
You connect a MIDI controller to a DAW via USB-MIDI. What's the advantage over traditional 5-pin DIN MIDI cables?
- A) No advantage
- B) Bi-directional communication, no signal degradation over distance, higher reliability, single cable for multiple ports
- C) DIN cables are always better
- D) USB-MIDI doesn't work

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 6
Your setup has 4 synthesizers daisy-chained via MIDI THRU. The last synth in the chain has timing issues. What's the likely cause?
- A) Bad cable
- B) Signal degradation after multiple THRU connections; use MIDI interface with multiple outs instead
- C) Synthesizer broken
- D) MIDI channels wrong

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 7
What's the MIDI speed (baud rate), and what's a practical limitation of this?
- A) 1 million baud, no limitations
- B) 31,250 baud; can cause latency when transmitting many simultaneous events
- C) 100,000 baud, unlimited events
- D) Speed varies randomly

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 8
You're using channel 10 for drums (General MIDI standard) but accidentally send melodic notes. What happens?
- A) Nothing plays
- B) Different drum sounds trigger for each note
- C) Melodic notes play normally
- D) Device crashes

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 9
A sound module has no keyboard. How do you play it?
- A) Can't be played
- B) Connect MIDI controller keyboard MIDI OUT to module MIDI IN; controller sends note data, module produces sound
- C) Use audio cables
- D) Plug in headphones

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 10
Why can MIDI files sound different on different devices even though the MIDI data is identical?
- A) MIDI files are corrupted
- B) MIDI is performance data only; actual sounds come from receiving device's sound engine
- C) MIDI files always sound identical
- D) Bit depth varies

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

---

# SUBJECT 10: MIDI MESSAGES & NOTE DATA (10 Questions)

### Question 1
You play a chord of 4 notes (C-E-G-C) at velocity 100 on a MIDI keyboard. How many MIDI Note On messages are sent?
- A) 1
- B) 4
- C) 8
- D) 0

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 2
A stuck note continues playing even after you release the key. What MIDI message should be sent to stop it?
- A) Note On
- B) Note Off for that specific note, or CC 123 to stop all notes
- C) Volume to 0
- D) Restart MIDI

**Answer: B**

**Expert Explanation:** Release is the time it takes for the processor to return to a neutral state.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like release are fundamental. - Dictionary"




---

### Question 3
You play middle C (60) at velocity 127, then again at velocity 30. Assuming velocity controls volume and filter brightness, describe the sonic difference.
- A) Identical sound
- B) Velocity 127: loud and bright; velocity 30: quiet and darker
- C) Velocity 127 is quieter
- D) Only pitch changes

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 4
What's the difference between Note On velocity and Note Off (release) velocity?
- A) No difference
- B) Note On: how hard key struck; Note Off: how fast key released
- C) Note Off velocity is more important
- D) Both control the same thing

**Answer: B**

**Expert Explanation:** Release is the time it takes for the processor to return to a neutral state.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like release are fundamental. - Dictionary"




---

### Question 5
You hold a key while applying aftertouch pressure. The synthesizer responds with vibrato. What's the MIDI connection?
- A) Random response
- B) Aftertouch CC data modulates LFO depth or pitch, creating pressure-controlled vibrato
- C) Aftertouch doesn't work
- D) Only volume changes

**Answer: B**

**Expert Explanation:** Low Frequency Oscillators modulate parameters to create movement.
**Image:** !["Diagram"](/images/svg/lfo_shapes.svg)
**Expert Quote:** "Terms like lfo are fundamental. - Dictionary"




---

### Question 6
Why is polyphonic aftertouch expensive to implement compared to channel aftertouch?
- A) It's not more expensive
- B) Requires pressure sensor per key vs. single sensor for entire keyboard
- C) Channel aftertouch is more expensive
- D) Both use same hardware

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
You send continuous controller data (CC) at 1000 Hz rate. What might happen?
- A) Perfect response
- B) MIDI bandwidth congestion; at 31,250 baud, continuous CC data can clog the MIDI stream causing latency or dropped messages
- C) Faster response
- D) No issues

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 8
A MIDI note number of 69 corresponds to what pitch and frequency?
- A) Middle C, 261.6Hz
- B) A4, 440Hz
- C) C5, 523.3Hz
- D) G4, 392Hz

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
Your keyboard sends Note On at velocity 64 for all notes regardless of how hard you play. What's the issue and impact?
- A) Working perfectly
- B) Velocity sensitivity is disabled or broken; results in no dynamic expression
- C) Velocity 64 is maximum
- D) MIDI channel wrong

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 10
You want to create a crescendo on a sustained note. Which is more appropriate: adjusting CC #7 (Volume) or CC #11 (Expression)?
- A) CC #7
- B) CC #11 - designed for performance dynamics; CC #7 is for mix balance
- C) Neither works for crescendos
- D) Both are identical

**Answer: B**

**Expert Explanation:** MIDI data carries note and control info.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

---

# SUBJECT 11: MIDI CONTROLLERS (CC) (10 Questions)

### Question 1
You're performing and want to add vibrato gradually during a sustained note. Which controller and technique do you use?
- A) Pitch bend
- B) CC #1 with increasing values to add vibrato depth progressively
- C) CC #64
- D) Volume

**Answer: B**

**Expert Explanation:** CC messages control parameters dynamically.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 2
What's the key difference between CC #7 (Volume) and CC #11 (Expression) in practical use?
- A) They're identical
- B) Volume sets overall mix level; Expression for real-time dynamics/performance
- C) Expression is louder
- D) Volume can't be automated

**Answer: B**

**Expert Explanation:** CC messages control parameters dynamically.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
You set CC #10 (Pan) to value 0. Where is the sound positioned?
- A) Center
- B) Hard left
- C) Hard right
- D) Pan doesn't work

**Answer: B**

**Expert Explanation:** CC messages control parameters dynamically.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 4
The sustain pedal (CC #64) has a threshold at value 64. What's the behavior on either side of this threshold?
- A) Linear response
- B) 0-63: sustain OFF; 64-127: sustain ON
- C) Always on
- D) Random behavior

**Answer: B**

**Expert Explanation:** Threshold is the level setting at which distinct dynamic processing (compression, gating) begins.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like threshold are fundamental. - Dictionary"




---

### Question 5
You want to create a filter sweep from closed to open over 4 measures. Which CC would you automate?
- A) CC #1
- B) CC #74
- C) CC #7
- D) CC #64

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
A synthesizer responds to CC #71 (Resonance). You set it to 127. What happens to the filter?
- A) Filter closes completely
- B) Maximum resonance/Q at cutoff frequency; may self-oscillate creating a ringing tone
- C) No effect
- D) Volume increases

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 7
You want to send a vocal to more reverb in real-time during performance. Which CC would you automate?
- A) CC #7
- B) CC #91
- C) CC #1
- D) CC #64

**Answer: B**

**Expert Explanation:** Reverb creates the illusion of space and depth.
**Image:** !["Diagram"](/images/svg/reverb_rt60_graph.svg)
**Expert Quote:** "Terms like reverb are fundamental. - Dictionary"




---

### Question 8
Your MIDI controller's mod wheel is at center position (value 64). You assigned it to vibrato depth. What does this mean?
- A) Maximum vibrato
- B) Moderate vibrato; increasing to 127 adds more, decreasing to 0 removes it
- C) No vibrato
- D) Broken controller

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 9
You send CC #123 (All Notes Off). What happens versus CC #120 (All Sound Off)?
- A) Identical function
- B) CC #123: sends Note Off for all notes; CC #120: immediately silences all sound
- C) CC #120 is slower
- D) Neither works

**Answer: B**

**Expert Explanation:** CC messages control parameters dynamically.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
You're automating filter cutoff (CC #74) from 0 to 127 over 8 beats. At what value is the filter halfway open?
- A) 127
- B) ~64
- C) 32
- D) 100

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

---

# SUBJECT 12: GENERAL MIDI & ADVANCED MIDI (10 Questions)

### Question 1
You load a General MIDI file, and drums play on channel 10. You switch channel 10 to a piano patch. What happens?
- A) Drums continue correctly
- B) Each drum note triggers a different piano note; channel 10 should remain on drum kit
- C) Nothing changes
- D) File won't play

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 2
A MIDI file uses Program Change 1. According to General MIDI, what sound should play?
- A) Drums
- B) Acoustic Grand Piano
- C) Strings
- D) Random sound

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 3
You send Program Change 65 to a GM device. What instrument category plays?
- A) Piano
- B) Reed instruments
- C) Drums
- D) Bass

**Answer: B**

**Expert Explanation:** General MIDI ensures compatibility.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 4
Your non-GM synthesizer has 500 sounds, but Program Change only accesses 0-127. How do you access the other sounds?
- A) Can't access them via MIDI
- B) Use Bank Select before Program Change to select different banks of 128 programs
- C) Change MIDI channels
- D) Buy new synth

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 5
You move the pitch bend wheel to maximum up position. With ±2 semitone range, what's the pitch change?
- A) +1 semitone
- B) +2 semitones
- C) +12 semitones
- D) No change

**Answer: B**

**Expert Explanation:** General MIDI ensures compatibility.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 6
Why does pitch bend have 14-bit resolution (16,384 steps) instead of 7-bit like most CC messages?
- A) No reason
- B) Requires fine resolution for smooth, continuous pitch changes without stepping artifacts
- C) 7-bit would be smoother
- D) Pitch bend is also 7-bit

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
You send a SysEx message to back up all patches from a synthesizer. The file is 500KB. Why so large compared to standard MIDI files?
- A) File corruption
- B) SysEx contains complete patch data vs. performance data only in standard MIDI files
- C) SysEx files are always small
- D) Wrong file format

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 8
A GM file specifies Note 36 on channel 10. What drum sound should play?
- A) Snare
- B) Bass Drum 1
- C) Hi-Hat
- D) Cymbal

**Answer: B**

**Expert Explanation:** General MIDI ensures compatibility.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
You want to glide between notes (portamento). What's the correct controller sequence?
- A) Just play notes
- B) Enable portamento, set portamento time, then play notes
- C) Only pitch bend works
- D) Portamento isn't MIDI-controllable

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
The pitch bend wheel is spring-loaded and returns to center. At center (value 8192 in 14-bit), what pitch change occurs?
- A) +2 semitones
- B) No pitch change
- C) -2 semitones
- D) +1 octave

**Answer: B**

**Expert Explanation:** The Nyquist frequency is half of the sampling rate. Frequencies above this limit cause aliasing.
**Image:** !["Diagram"](/images/diagram_nyquist_v2.png)
**Expert Quote:** "Terms like nyquist are fundamental. - Dictionary"




---

---

## SCORING GUIDE - INTERMEDIATE LEVEL

- **108-120 correct (90-100%):** Excellent - Ready for advanced level
- **96-107 correct (80-89%):** Strong understanding - Good A-Level standard
- **84-95 correct (70-79%):** Satisfactory - Pass A-Level
- **72-83 correct (60-69%):** Basic understanding - Review recommended
- **Below 72 correct (<60%):** Significant gaps - Return to study materials

---

## SUBJECT BREAKDOWN

1. **Sample Editing Basics** - Questions 1-10
2. **Sample Processing** - Questions 11-20
3. **Bit Depth & Dynamic Range** - Questions 21-30
4. **Sample Rate & Nyquist Theorem** - Questions 31-40
5. **Quantization, Dithering & File Formats** - Questions 41-50
6. **Sample Playback & Looping** - Questions 51-60
7. **Multi-Sampling Techniques** - Questions 61-70
8. **Time-Stretching & Pitch Shifting** - Questions 71-80
9. **MIDI Fundamentals** - Questions 81-90
10. **MIDI Messages & Note Data** - Questions 91-100
11. **MIDI Controllers (CC)** - Questions 101-110
12. **General MIDI & Advanced MIDI** - Questions 111-120

---

*Music Tech Dictionary - Volume 4: Sampling & Sequencing*
*Intermediate Level (A-Level) Complete - All 12 Subjects*
*© 2024 - Educational Use*
