# Music Tech Dictionary - Volume 4: Sampling & Sequencing
## MASTER/EXPERT LEVEL (Professional/Guru) - Complete Quiz by Subject
### 10 Questions Per Subject - 120 Questions Total

---

# SUBJECT 1: SAMPLE EDITING BASICS (10 Questions)

### Question 1
You're editing a live concert recording where the drummer hit the snare slightly before the click. The snare is 8ms early. You need to time-align it without affecting the transient. What's the professional solution and what artifact should you watch for?
- A) Quantize it randomly
- B) Use slip editing to move the snare hit to the grid, apply a 1-2ms crossfade at the edit point to prevent clicks; watch for phase cancellation if close-mic'd and room mics overlap
- C) Delete and replace with a sample
- D) Leave it - timing issues don't matter

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 2
A client sends you orchestral samples for a library. Several have audible page turns and chair squeaks in the last 500ms of the decay. The samples are 24-bit/96kHz and average 6 seconds long. What's your editing workflow to preserve the natural decay while removing noise?
- A) Cut off last 500ms entirely
- B) Use spectral editing to isolate and remove page turns/squeaks without affecting the natural decay; if unavailable, use automation to duck those specific frequencies during noise events, apply long fade starting after the noise
- C) Normalize to hide the noise
- D) Leave it - it's "authentic"

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 3
You're looping a synth pad with slow filter movement. You find matching zero-crossings and waveform shapes, but when the loop repeats, there's an audible "bump" in the filter sweep. What's causing this and how do you fix it?
- A) Zero-crossings are wrong
- B) Filter envelope/LFO doesn't match at loop points - the modulation is at different phases; solution: loop at exact modulation cycle multiples, or record a static version for looping
- C) Use shorter crossfade
- D) Loops can't have filter movement

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 4
A vintage sampler transferred samples to your DAW, but they all have a pronounced click at the start despite being properly trimmed. You notice the samples were originally in 12-bit format. What's likely happening and how do you fix it?
- A) The sampler was broken
- B) 12-bit samples may have DC offset from bit conversion; remove DC offset first, then apply 2-5ms fade-in to mask any remaining quantization artifacts from the low bit depth conversion
- C) Clicks are normal for vintage samplers
- D) Re-record everything

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 5
You're creating reverse cymbal risers for a build section. The original crashes are 3-4 seconds but sound too cluttered reversed. What's the professional approach to create clean, musical risers?
- A) Just reverse them as-is
- B) High-pass filter the reversed crashes, use volume automation to create more dramatic fade-in curve, optionally time-stretch to match exact bar lengths, EQ to emphasize 4-8kHz for brightness
- C) Reverse and normalize only
- D) Reverse effects don't need processing

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
You receive 100 drum samples from a session, all recorded at different levels and with varying amounts of room ambience. You need consistent samples for a drum machine. What's your workflow?
- A) Normalize everything to 0dBFS
- B) Sort by type; RMS normalize within each type for consistent loudness; gate or trim room tails to consistent lengths; apply matching EQ/compression to samples of same type; save as 24-bit
- C) Random processing
- D) Use samples as-is

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 7
A client's vocals have prominent breath sounds before phrases. They want them "reduced but not removed entirely" for natural sound. What's the professional approach?
- A) Delete all breath sounds
- B) Reduce breath sounds by 6-12dB using clip gain or volume automation, not complete removal; optionally apply slight de-esser to harsh breath artifacts; maintain natural performance feel
- C) Normalize to hide breaths
- D) Breaths can't be edited

**Answer: B**

**Expert Explanation:** Editing samples requires precision at zero-crossings.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
You're editing dialogue for a podcast, and there are mouth clicks between words throughout. Simple fade-ins remove the clicks but also cut into the consonants. What's the solution?
- A) Heavy crossfading everywhere
- B) Use a de-clicker plugin designed for dialogue, or use spectral editing to remove clicks without affecting speech; if manual, make 1-3ms micro-fades at zero-crossings immediately at click locations only
- C) Leave all clicks
- D) Replace all dialogue

**Answer: B**

**Expert Explanation:** Editing samples requires precision at zero-crossings.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
You need to create seamless loops from a 30-second ambient recording with continuous evolving texture but no obvious repetitive elements. Traditional loop points create audible seams. What's your strategy?
- A) Force a standard loop
- B) Create long crossfade loop with matching spectral content in crossfade region; or layer multiple offset loops of different lengths creating evolving pseudo-randomness; or use Paulstretch to create infinite variation
- C) Loops are impossible for ambient
- D) Use 1ms crossfade

**Answer: B**

**Expert Explanation:** Editing samples requires precision at zero-crossings.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
A film composer sends orchestral stems where string sustains were edited with multiple takes stitched together. You hear subtle timing artifacts at the edit points during soft passages. How do you smooth these without re-recording?
- A) Normalize louder
- B) Apply 50-200ms crossfades at edit points; use time-stretching on individual sections to better match phrasing; add subtle reverb to mask transitions; use clip gain to level mismatched dynamics across edits
- C) Completely replace sections
- D) Timing artifacts can't be fixed

**Answer: B**

**Expert Explanation:** Reverb creates the illusion of space and depth.
**Image:** !["Diagram"](/images/svg/reverb_rt60_graph.svg)
**Expert Quote:** "Terms like reverb are fundamental. - Dictionary"




---

---

# SUBJECT 2: SAMPLE PROCESSING (10 Questions)

### Question 1
You're mastering a sample library where kick drums are normalized to 0dBFS but still sound quieter than snares also normalized to 0dBFS. The client complains about inconsistency. What's happening and what's the professional solution?
- A) Normalization is broken
- B) Peak normalization ignores perceived loudness; kicks have sharp peaks but lower RMS; solution: use LUFS loudness normalization or RMS matching for consistent perceived level
- C) Snares need to be quieter
- D) Perception doesn't matter

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 2
A client sends you samples recorded through an old mixer with a DC offset issue. Some samples are shifted positive, others negative. They want the library normalized, but you notice normalization yields inconsistent headroom. What's your workflow?
- A) Normalize first, then fix DC
- B) Batch process all samples: analyze and remove DC offset first, THEN normalize; this ensures symmetrical headroom; verify with waveform inspection showing centered audio; save non-destructive originals
- C) DC offset doesn't affect normalization
- D) Manual one-by-one processing only

**Answer: B**

**Expert Explanation:** Headroom is the safety margin between the peak signal and the clipping point.
**Image:** !["Diagram"](/images/svg/headroom_diagram.svg)
**Expert Quote:** "Terms like headroom are fundamental. - Dictionary"




---

### Question 3
You're preparing stems for a mix engineer. Your session is 32-bit float with some clipped peaks showing +3dBFS (which didn't audibly distort). The mix engineer requests 24-bit WAV files. What's the critical step?
- A) Just export and hope for the best
- B) Reduce gain on clipped tracks to bring all peaks below 0dBFS before export; export as 24-bit with dithering; verify no actual clipping in export
- C) 32-bit float clips can't be fixed
- D) Send 32-bit float files instead

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 4
You batch-processed 500 samples with normalization, but now realize 50 of them had DC offset that caused asymmetric normalization. What's the most efficient fix without re-processing all 500?
- A) Re-process all 500 from scratch
- B) Identify the 50 affected files, process only those: remove DC offset → re-normalize; replace in library; maintain version control/backup
- C) Leave them wrong
- D) Can't fix after normalization

**Answer: B**

**Expert Explanation:** Processing samples changes their character.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 5
A vintage hardware sampler only accepts 16-bit files, but your source material is 24-bit. The sampler's converters introduce noise, and you want to maximize SNR. What's your dithering strategy?
- A) No dithering needed for hardware
- B) Apply triangular dither when converting 24→16-bit, but consider noise-shaped dither if the sampler's own noise floor is very low; test both; the goal is dither noise below sampler's noise floor
- C) Truncate without dithering
- D) Hardware samplers don't need dithered files

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 6
You're archiving a studio session. Files are 24-bit/96kHz taking up 500GB. Client wants long-term storage but may need access in 10 years. What's the professional archival strategy?
- A) Compress to MP3 to save space
- B) Store as FLAC with 24-bit/96kHz preserved; maintain duplicate backups on different media; document all settings; consider keeping 24/96 WAV on one backup for maximum compatibility
- C) Delete after project ends
- D) 16-bit conversion for archival

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 7
You receive samples for sound design that were heavily normalized, showing waveforms completely filling the display. When you process them with saturation plugins, they sound harsh and over-processed. What's the issue and solution?
- A) Plugins are broken
- B) Samples normalized to 0dBFS lack headroom for processing; solution: reduce input by 6-12dB before saturation/distortion, process, then adjust output; prevents plugins hitting their internal ceilings too hard
- C) Saturation plugins don't need headroom
- D) Normalization doesn't affect processing

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 8
A mastering engineer returns your mix saying "intersample peaks are clipping the final codec." Your mix shows -0.1dBFS peaks in your DAW. What's happening and what should you do for future deliveries?
- A) The engineer is wrong, -0.1dBFS is safe
- B) Intersample peaks occur between samples during D/A conversion; use true-peak limiting targeting -1.0dBTP instead of -0.1dBFS; prevents codec clipping in MP3/AAC conversion
- C) This is the mastering engineer's problem
- D) Intersample peaks don't exist

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 9
You're creating a Kontakt library and need consistent sample start times for all velocity layers of each note to ensure phase alignment. Some samples have varying silence before the transient (0-50ms). What's your approach?
- A) Leave them as recorded
- B) Analyze all samples, detect transient start times, trim to consistent pre-transient silence, verify phase alignment by playing multiple velocity layers together and checking for phasing/comb filtering
- C) Normalize to fix timing
- D) Phase alignment doesn't matter for samples

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 10
You process a sample library through analog outboard gear for "warmth." Comparing the processed files to originals, they're clearly quieter. Should you normalize the processed samples to match original levels?
- A) Yes, always normalize to 0dBFS
- B) Depends on intent: if preserving gain staging for mixing context, maintain original levels by measuring RMS/LUFS and matching; if library is standalone, gentle normalization acceptable; avoid over-normalization that removes dynamic signature of analog processing
- C) Analog gear doesn't change levels
- D) Never normalize after analog processing

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

---

# SUBJECT 3: BIT DEPTH & DYNAMIC RANGE (10 Questions)

### Question 1
You're recording a classical piano concert. The pianist plays from ppp to fff with huge dynamic range. You're recording at 24-bit with peaks hitting -6dBFS at fff. The producer worries the quiet passages "aren't using enough bits." Should you increase gain?
- A) Yes, peaks must hit 0dBFS always
- B) No - 24-bit at -6dBFS still provides ~138dB dynamic range; quiet passages at -40dBFS still have ~18 effective bits, far exceeding the hall's noise floor; maintain headroom for safety
- C) Switch to 16-bit and increase gain
- D) Quiet passages need separate gain

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 2
A client sends reference tracks recorded at 16-bit and asks you to match the "quality." Your session is 24-bit. Should you record/mix at 16-bit to match their workflow?
- A) Yes, always match client bit depth
- B) No - always work at highest quality; deliver final masters at 16-bit with proper dithering if needed; working at 16-bit introduces cumulative quantization errors through processing
- C) 16-bit and 24-bit sound identical
- D) Bit depth doesn't affect quality

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 3
You're mixing and all faders have been pulled down significantly (-12 to -18dB) to prevent master bus clipping. A colleague suggests this "wastes bits" in digital mixing. Is this a valid concern in modern DAWs?
- A) Yes, pulling faders down loses bit depth
- B) No - modern DAWs use 32-bit float processing internally; fader positions don't reduce bit depth; only conversion to lower bit depth matters; maintain headroom freely
- C) All faders must be at 0dB
- D) Gain staging doesn't matter in digital

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 4
You're doing a live recording and the input signal peaks briefly at +6dBFS (clipping) for 200ms during a loud section. You're recording at 32-bit float. Is the recording usable?
- A) No, all clipping is permanent
- B) Yes - 32-bit float allows mathematical values above 0dBFS; reduce gain in post by 6dB+ to bring peaks below 0dBFS before conversion to 24/16-bit; verify no actual converter clipping occurred
- C) 32-bit float prevents all clipping always
- D) Recording is destroyed

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 5
A mastering client provides a mix at 16-bit/44.1kHz and wants vinyl cutting. The cutting engineer requests "higher resolution source." Should the client re-mix at 24-bit/96kHz?
- A) Yes, re-mix at higher resolution immediately
- B) If original recordings were 16/44.1, re-mixing won't add real information; for vinyl, current file is adequate; upsampling/bit-padding adds no benefit; better to work from highest-resolution originals if available, but don't upsample existing 16/44.1 masters
- C) Vinyl requires 24/192 always
- D) Resolution doesn't matter for vinyl

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 6
You're archiving a 1990s project recorded on ADAT (16-bit). Should you transfer to 24-bit or keep it at 16-bit for "authenticity"?
- A) Keep at 16-bit to preserve the original
- B) Transfer to 24-bit - provides headroom for future processing/mastering without generational loss; bit-padding from 16 to 24 is benign; document source was 16-bit; future processing benefits from 24-bit space
- C) Upsampling creates artifacts
- D) ADAT can't be transferred

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 7
A podcast client records interviews at 16-bit to "save space." They experience noise in quiet passages. They ask if switching to 24-bit will help. What's your recommendation?
- A) 24-bit won't help podcasts
- B) Yes, recommend 24-bit - quiet speech may be -40 to -60dBFS, where 16-bit quantization noise becomes audible; 24-bit provides clean noise floor; storage savings of 16-bit are negligible on modern systems; always record at highest practical quality
- C) Noise is microphone-related only
- D) 8-bit is sufficient for speech

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 8
You're delivering a sound effects library. Clients will use sounds at various levels in their mixes. Should you normalize everything to 0dBFS, or deliver with "headroom"?
- A) Always normalize to 0dBFS
- B) Deliver with 3-6dB headroom; gives users mixing flexibility; prevents accidental clipping when layering; normalize based on RMS for consistent loudness, not peaks; document delivery level in readme
- C) Headroom wastes bits
- D) Random levels are professional

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 9
A client wants to "future-proof" their recording and asks about 32-bit recording. They're recording singer-songwriter material in a treated bedroom studio. What's practical advice?
- A) Always use highest bit depth available
- B) 24-bit is sufficient - 144dB range exceeds any acoustic space's dynamic range; 32-bit float beneficial for unpredictable live recording or when gain staging uncertain; for controlled studio: 24-bit optimal balance of quality and file size
- C) 16-bit is sufficient for bedroom recordings
- D) Bit depth doesn't matter for singer-songwriter

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

### Question 10
You notice that after multiple plugin processes (10+ instances), your 24-bit audio has audible low-level artifacts in quiet sections. Your DAW processes at 32-bit float. What's likely happening and how do you fix it?
- A) 32-bit float prevents all artifacts
- B) Likely plugin-introduced dither or noise; some plugins add dither at output; solution: check plugin settings for dither options, disable; ensure plugins process at full resolution; only dither once at final export to delivery format
- C) This is normal and acceptable
- D) Switch to 16-bit processing

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

---

# SUBJECT 4: SAMPLE RATE & NYQUIST THEOREM (10 Questions)

### Question 1
You're producing a podcast and your co-host records at 48kHz while you record at 44.1kHz. What issues arise when editing together, and what's the professional solution?
- A) Mix sample rates freely in same project
- B) Issue: mixing sample rates causes pitch/speed differences or requires real-time SRC; solution: choose one rate for project, convert files offline with high-quality SRC before editing
- C) Sample rates don't need to match
- D) 44.1 and 48 are identical

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 2
A client insists on recording at 192kHz for a vocal-acoustic guitar album "for quality." You're concerned about workflow. What's your professional recommendation?
- A) Always use highest rate client requests
- B) Recommend 48kHz or 96kHz maximum; 192kHz creates 4× file sizes, slower editing, no audible benefit for final delivery; if client insists, record at 192kHz but mix at 96kHz after high-quality downsampling; educate on diminishing returns
- C) 192kHz mandatory for professional work
- D) Sample rate doesn't matter

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 3
You're importing vintage sampler sounds (originally sampled at 22.05kHz) into a modern 48kHz session. They sound dull. What's happening and what are your options?
- A) Samplers are broken
- B) Original 22.05kHz captured up to ~11kHz only; missing upper harmonics creates dull sound; options: accept character as vintage quality, use harmonic exciter to generate missing highs, or re-sample source material if available
- C) Just normalize louder
- D) Sample rate conversion fixes this automatically

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 4
You're mastering for multiple formats: CD (44.1kHz), streaming (48kHz), and hi-res download (96kHz). You mixed at 96kHz. What's the optimal conversion workflow?
- A) Convert everything to 44.1 first
- B) Keep 96kHz master as archive; create 48kHz version with high-quality SRC; create 44.1kHz from 96kHz for best quality; use professional SRC; maintain settings documentation
- C) Let streaming services convert
- D) All sample rates sound identical

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 5
A film scorer delivers 48kHz stems, but the picture editor's system is set to 44.1kHz. Video has sync issues. What's causing this and how do you prevent it in future deliveries?
- A) Video doesn't have sample rates
- B) Sample rate mismatch causes speed/pitch differences; audio plays wrong speed in 44.1 system; solution: confirm delivery specs before starting; deliver at correct rate, or provide properly converted files with timing verification
- C) Sync issues are unrelated to sample rate
- D) 44.1 and 48 sync automatically

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 6
You're using heavy saturation/distortion plugins. You notice high-frequency artifacts that sound "digital" and harsh. What's likely happening and what's the solution?
- A) Plugins are broken
- B) Aliasing from nonlinear processing generating harmonics above Nyquist; solution: enable oversampling in plugins, reduce input level to prevent excessive harmonic generation, or work at higher session sample rate
- C) Saturation doesn't alias
- D) Lower the sample rate

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 7
You record an album at 96kHz for "quality," but most consumers will stream at 44.1kHz or 48kHz. A colleague says you "wasted storage space." What's the legitimate argument for recording at 96kHz?
- A) 96kHz has no benefits for 44.1 delivery
- B) Benefits: better plugin aliasing performance, more headroom for extreme pitch-shifting, easier anti-aliasing filter design, archive value for future formats; trade-off: storage/CPU vs. potential benefits; valid for heavy processing
- C) Always record at highest rate available
- D) Sample rate doesn't affect processing

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 8
A re-mastering client sends you a CD rip (44.1kHz/16-bit) and wants you to "upgrade" it to 192kHz/24-bit for hi-res release. What's your professional response?
- A) Upsample to 192/24 immediately
- B) Explain upsampling doesn't add real information; original 44.1/16 captures all data; upsampling is interpolation only; if original masters available, remaster from those at high-res; if not, deliver honest 44.1/16 or tastefully upsample with transparency to client
- C) All releases must be 192/24
- D) Upsampling always improves quality

**Answer: B**

**Expert Explanation:** 16-bit audio offers 96dB of dynamic range, the standard for CD quality.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 16-bit are fundamental. - Dictionary"




---

### Question 9
You're working on a video project at 48kHz. The video editor pulls in music tracks you've made at 44.1kHz without converting them. What problem will occur and how do you diagnose it?
- A) No problems will occur
- B) Audio will play at wrong speed/pitch; diagnose by verifying sample rates in timeline vs. file properties; fix by proper sample rate conversion before import or DAW settings to handle conversion
- C) Only volume changes
- D) Video doesn't need audio sync

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

### Question 10
A live recording setup uses multiple interfaces: main multitrack at 48kHz, backup stereo recorder at 44.1kHz. In editing, you notice the recordings drift out of sync over time. What's causing this and how do you prevent it?
- A) Drift is random hardware issue
- B) Sample rate mismatch causes cumulative drift; solution: sync all recorders to same sample rate, use word clock sync if interfaces support it, or correct drift in post with time-stretching/sync markers
- C) Sample rates don't need to match for sync
- D) Drift is unavoidable

**Answer: B**

**Expert Explanation:** Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording.
**Image:** !["Diagram"](/images/svg/sample_rate_dots.svg)
**Expert Quote:** "Terms like sample rate are fundamental. - Dictionary"




---

---

# SUBJECT 5: QUANTIZATION, DITHERING & FILE FORMATS (10 Questions)

### Question 1
You're mastering an album and notice the mastering engineer applied dither when bouncing your 24-bit mixes to 24-bit masters (no bit reduction). Is this correct practice?
- A) Yes, always dither every bounce
- B) No - dithering when staying at same bit depth adds unnecessary noise; only dither when reducing bit depth; confirm with engineer this was intentional or error; may indicate quality control issue
- C) Dither is always beneficial
- D) Bit depth doesn't relate to dithering

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 2
A client wants their album on CD and asks you to apply "the best possible dither." You have options: TPDF, POW-R1, POW-R2, POW-R3. What factors determine which you choose?
- A) Random selection
- B) Consider: genre, monitoring environment, personal preference via A/B comparison; POW-R2 good general choice
- C) All dither sounds identical
- D) Never use noise shaping

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 3
You export stems for a remix at 24-bit, and the remixer sends back their mix claiming "the stems had noise in them." You check and realize you accidentally applied dither at the 24-bit export. What happened and how do you fix it?
- A) Dither doesn't create noise
- B) Unnecessary dithering added ~-90dBFS noise floor to silent sections; re-export stems at 24-bit WITHOUT dither; explain to remixer this noise is benign but was added unnecessarily
- C) Dither at 24-bit is correct
- D) Can't fix dithered files

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 4
You're archiving a major project for 20+ years. The mix is 24-bit/96kHz. Should you use WAV or FLAC for long-term storage?
- A) WAV only - FLAC will corrupt
- B) Both options valid: FLAC saves ~50% storage while maintaining bit-perfect quality, good for backups; WAV has universal compatibility advantage; ideal: FLAC for main archive, WAV for one compatibility backup; test FLAC integrity regularly
- C) MP3 is sufficient for archives
- D) Format doesn't matter for archival

**Answer: B**

**Expert Explanation:** 24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like 24-bit are fundamental. - Dictionary"




---

### Question 5
A streaming service rejected your master saying "lossy encoding is clipping." Your master peaks at -1.0dBFS and sounds clean. What's the issue and how do you fix future masters?
- A) Streaming service is wrong
- B) MP3/AAC encoding can create intersample peaks during lossy compression; solution: use true-peak limiting targeting -1.0 to -2.0dBTP, not just sample peaks; prevents codec-induced clipping
- C) -1dBFS should never clip
- D) Streaming uses WAV files

**Answer: B**

**Expert Explanation:** dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS).
**Image:** !["Diagram"](/images/svg/dbfs_meter.svg)
**Expert Quote:** "Terms like dbfs are fundamental. - Dictionary"




---

### Question 6
You receive a project recorded in 2005 as 16-bit files. You need to apply EQ, compression, and limiting. Should you convert to 24-bit first, or work at 16-bit?
- A) Work at 16-bit to preserve originality
- B) Convert to 24-bit first - provides headroom for processing without accumulating quantization errors; processing at 16-bit risks generational quality loss; pad to 24-bit, process, final output with dither if needed
- C) Upconverting creates artifacts
- D) Bit depth doesn't affect processing

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 7
A client bounced their mix multiple times through the same plugin chain, applying dither each time, creating a "final" master with 3× dithering. What sonic issues might this cause?
- A) Multiple dithering improves quality
- B) Cumulative dither noise increases; noise floor rises from ~-93dBFS to ~-90dBFS or worse; creates unnecessarily noisy master; solution: re-bounce from pre-dithered mix with single final dither
- C) Dither accumulation is impossible
- D) No issues arise

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 8
You're delivering a sound design library. Some clients will use it in video games (needs FLAC for middleware), others in film (prefer WAV). What's the professional delivery strategy?
- A) Choose one format only
- B) Deliver in both formats: WAV for maximum compatibility, FLAC for space-efficient backup; document that FLAC is bit-identical to WAV; consider client preferences; major libraries often include both
- C) MP3 only
- D) Format doesn't matter for sound design

**Answer: B**

**Expert Explanation:** Quantization maps analog to digital steps.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
You notice your DAW offers "rectangular," "triangular," and "Gaussian" dither. Which is appropriate for music mastering?
- A) Rectangular is best
- B) Triangular is standard for music - proven optimal trade-off between noise and distortion; rectangular has worse correlation; Gaussian less common; unless specific reason, use TPDF or noise-shaped variants
- C) All dither types are identical
- D) Random selection

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

### Question 10
An artist recorded on vintage gear outputting 12-bit, then transferred to 24-bit in your DAW. They want to "embrace the lo-fi character" but minimize audible artifacts. What's your approach?
- A) Leave everything as-is
- B) Maintain 24-bit workspace for processing headroom; use bit-crushing plugin set to 12-bit for the "character" but with dither option enabled; allows controlled lo-fi aesthetic while minimizing harshness; compare with/without dither
- C) Normalize to hide artifacts
- D) 12-bit artifacts can't be controlled

**Answer: B**

**Expert Explanation:** Dither is low-level noise added to prevent quantization errors when reducing bit depth.
**Image:** !["Diagram"](/images/svg/dither_concept.svg)
**Expert Quote:** "Terms like dither are fundamental. - Dictionary"




---

---

# SUBJECT 6: SAMPLE PLAYBACK & LOOPING (10 Questions)

### Question 1
You're building a piano library and notice when playing fast repeated notes, some notes randomly stick or cut off abruptly. What's the likely cause and solution?
- A) Samples are corrupted
- B) Voice stealing algorithm issue - voices being stolen during note release; solution: increase voice count, implement smarter stealing, ensure Note Off messages processed correctly
- C) MIDI is broken
- D) Pianos can't play fast

**Answer: B**

**Expert Explanation:** Release is the time it takes for the processor to return to a neutral state.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like release are fundamental. - Dictionary"




---

### Question 2
A string sustain loop works perfectly when played at the original pitch (A3) but creates noticeable "pumping" when played a fifth above (E4). What's causing this and how do you fix it?
- A) Sample is corrupted
- B) Loop length isn't harmonic multiple of new pitch; solution: create pitch-specific loops, use crossfade region long enough to mask periodicity at various pitches, or multi-sample more densely to reduce transposition range
- C) E4 can't be played from A3 sample
- D) This is normal behavior

**Answer: B**

**Expert Explanation:** Looping allows continuous playback of short samples.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
You receive a Kontakt library where release samples trigger with audible delay after key release. The library creator says "it's not latency." What's likely happening and how would you diagnose it?
- A) Kontakt has bugs
- B) Sample streaming from disk - release samples not preloaded; solution: check DFD settings, increase preload buffer size, or set release samples to always preload; verify by testing with all samples RAM-loaded
- C) Release samples don't cause delay
- D) This can't be fixed

**Answer: B**

**Expert Explanation:** Release is the time it takes for the processor to return to a neutral state.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like release are fundamental. - Dictionary"




---

### Question 4
You're creating legato patches for woodwinds. When playing legato phrases, you hear small clicks between notes even with volume envelopes. What's the phase-related issue and solution?
- A) Clicks are unavoidable in legato
- B) Phase discontinuity when triggering new sample; solution: implement true legato samples, use sample-start offset to skip re-attack, enable phase-synced playback if sampler supports, crossfade between notes
- C) Volume envelopes should fix all clicks
- D) Phase doesn't affect legato

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

### Question 5
A client's orchestral library uses 6 round-robin samples but performers complain it still sounds "sampled" with repeated notes. What additional techniques beyond round-robin help realism?
- A) Round-robin is the only solution
- B) Add random sample-start offset, random pitch variation, random timing variation, dynamic variation per hit, random filter modulation; combine techniques for natural variation
- C) Use more round-robins only
- D) Realism is impossible with samples

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 6
You loop a synth pad at exact wavelength multiples with perfect zero-crossings, but when adding reverb, the loop point becomes audible. Why does reverb expose the loop?
- A) Reverb is broken
- B) Reverb tail continues past loop point, creating discontinuity when loop jumps back; solution: extend loop region to include reverb decay, or apply reverb after ensuring seamless loop, or use convolution with matching loop length
- C) Loops shouldn't be used with reverb
- D) Zero-crossings prevent this

**Answer: B**

**Expert Explanation:** Reverb creates the illusion of space and depth.
**Image:** !["Diagram"](/images/svg/reverb_rt60_graph.svg)
**Expert Quote:** "Terms like reverb are fundamental. - Dictionary"




---

### Question 7
You're mapping drum samples across a keyboard. Kick at C2, snare at D2, etc. Users report when playing fast patterns, some hits seem to "vanish." What's the likely voice allocation issue?
- A) Samples are missing
- B) Monophonic voice group settings - each drum should be in separate groups allowing polyphony; kick shouldn't steal snare voice; check sampler voice assignment, ensure polyphonic mode, adequate total voice count
- C) Drums can't be played fast
- D) MIDI is dropping notes

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 8
A sample library has velocity layers with hard-coded crossfades at specific velocities. Users complain the dynamics feel "unnatural" with certain MIDI keyboards. What's the issue?
- A) All MIDI keyboards are identical
- B) Keyboard velocity curves vary; fixed crossfades feel unnatural on keyboards with different response; solution: provide velocity curve options in UI, allow crossfade range adjustment, or use MIDI Learn for custom mapping
- C) Velocity layers don't need adjustment
- D) Users are playing wrong

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 9
You're creating a guitar library with downstroke and upstroke samples. Simply alternating doesn't sound realistic. What's a better implementation?
- A) Random selection only
- B) Combine round-robin with pattern detection: downstrokes on beats, upstrokes on off-beats for strumming patterns; add velocity sensitivity; provide keyswitches for manual override; study real guitar patterns
- C) Always use downstrokes
- D) Alternation is perfect realism

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 10
A client complains that when playing chords in their piano library, they occasionally hear "phasey" or "hollow" artifacts. What's the likely multi-sampling issue?
- A) Phase doesn't matter for pianos
- B) Phase cancellation between closely-spaced samples with overlapping key zones or stereo samples recorded at different times; solution: check phase alignment, mono sum test, ensure samples recorded in same session, adjust mic positioning if re-recording
- C) This is normal piano character
- D) Chords can't be played

**Answer: B**

**Expert Explanation:** Looping allows continuous playback of short samples.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

---

# SUBJECT 7: MULTI-SAMPLING TECHNIQUES (10 Questions)

### Question 1
You're recording velocity layers for a piano. You record layers at dynamics of pp, mp, mf, f, ff. Later in testing, you notice an unnatural "jump" in timbre between mf and f layers. What went wrong in the recording session?
- A) Recording technique was perfect
- B) Insufficient dynamic overlap or inconsistent playing between layers; solution: re-record with consistent technique, record more intermediate layers, or use longer crossfade zones; original session may have had performer fatigue
- C) Velocity jumps are normal
- D) Two layers is sufficient

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 2
You're building a sample library and someone suggests "just use fewer samples and pitch-shift more to save space." What quality trade-offs occur with ±6 semitone transposition vs. ±2 semitone?
- A) No quality difference
- B) ±6 semitones: noticeable formant shifting, timbral changes, potential aliasing, unnatural character; ±2 semitones: minimal artifacts, maintains natural character; trade space vs. realism
- C) More pitch-shifting is always better
- D) Pitch-shifting has no artifacts

**Answer: B**

**Expert Explanation:** Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled.
**Image:** !["Diagram"](/images/diagram_aliasing_v2.png)
**Expert Quote:** "Terms like aliasing are fundamental. - Dictionary"




---

### Question 3
A string library uses 3 dynamic layers, but testers say loud playing sounds "weak." You verify fff samples were recorded properly. What mapping issue might cause this perception?
- A) Recording levels were wrong
- B) Velocity curve mapping issue - fff layer may only trigger at 120-127, making it hard to reach; solution: adjust velocity mapping so fff triggers from ~100-127 for easier access, or provide velocity curve options
- C) Three layers is insufficient always
- D) Strings can't be loud

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 4
You implement 12 round-robin samples for hi-hats, but the library uses massive RAM. A developer suggests "stream round-robins from disk." What technical issue makes this problematic for hi-hats specifically?
- A) All samples should stream
- B) Hi-hats are short, fast, repetitive - disk streaming latency causes delays/dropouts; solution: keep hi-hats preloaded in RAM, stream only long samples, or use hybrid approach with first RR samples preloaded
- C) Streaming works perfectly for all instruments
- D) Round-robin doesn't use memory

**Answer: B**

**Expert Explanation:** Multi-sampling captures an instrument across its range.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 5
You're creating key zones for a 88-key piano where each sample covers ±3 semitones (minor third). Users report the sound is "uneven" across the keyboard despite careful recording. What's the perceptual issue?
- A) Recording was bad
- B) Low notes have more harmonic content affected by transposition, making pitch-shift artifacts more obvious; solution: sample bass register more densely, mid/treble less dense; non-uniform sampling strategy
- C) ±3 semitones is too narrow
- D) Pianos should have even sampling

**Answer: B**

**Expert Explanation:** Multi-sampling captures an instrument across its range.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 6
A brass library has separate samples for staccato, marcato, and sustain articulations. Users complain switching articulations mid-phrase sounds unnatural. What implementation would improve realism?
- A) Separate patches for each articulation
- B) Implement crossfading between articulations with legato transitions, use sample-start offset on sustains when following staccato, record true interval transitions, add dynamic adjustment during switches
- C) Instant switching is realistic
- D) Articulation switching is impossible

**Answer: B**

**Expert Explanation:** Multi-sampling captures an instrument across its range.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 7
You record 16 velocity layers for realistic dynamics but the library loads slowly and uses 32GB RAM. What optimization strategy maintains quality while improving performance?
- A) Delete half the samples randomly
- B) Implement tiered loading: load 4 primary layers always, stream intermediate layers on-demand; use disk streaming for longest samples; compress lossless; provide "lite" version with 8 layers for low-RAM systems
- C) 32GB is fine for all users
- D) Can't optimize without quality loss

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 8
A guitar library has separate samples for each fret on each string. Users want realistic position-based playing. What's the challenge with automatic fret/string selection?
- A) This is trivial to implement
- B) Challenge: same pitch available on multiple strings/frets with different timbres; algorithm needs to consider: playability, timbre consistency, string/fret preference, musical context; complex logic required
- C) Random selection works fine
- D) Guitars can't be multi-sampled this way

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 9
You're creating a choir library with 4 mic positions (close, mid, far, room) per sample. Some users report phasing issues when mixing mic positions. What's the technical cause and solution?
- A) Phase doesn't matter for multimic
- B) Mic timing/phase differences from physical distance; solution: time-align samples to transient, provide phase-aligned versions, include mix-ready pre-blended positions, warn users about mono compatibility when mixing mics
- C) Always use all mics at equal volume
- D) Phasing is impossible with same performance

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 10
You implement velocity-to-filter-cutoff mapping where soft = closed filter, hard = open filter. Beta testers say it sounds "too consistent" and lacks realism. What human performance element is missing?
- A) Velocity-to-filter is perfect realism
- B) Real performance has random variation; add slight random modulation to filter cutoff, random variation to velocity response curve, slight timing variations; creates organic imperfection mimicking human inconsistency
- C) Consistency equals realism
- D) Filter shouldn't vary

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

---

# SUBJECT 8: TIME-STRETCHING & PITCH SHIFTING (10 Questions)

### Question 1
You're time-stretching a full drum mix for a remix. At 85% speed (slowing), the kick drum sounds "flappy" and unnatural, but other elements sound okay. What's the solution?
- A) All elements must stretch together
- B) Separate percussion to separate track, stretch with transient-preserving algorithm or don't stretch drums at all; stretch melodic/harmonic elements separately; recombine; preserve drum punch by avoiding stretch or using minimal stretch with manual transient reinforcement
- C) Use more extreme stretching
- D) Drums can't be time-stretched

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 2
A vocalist recorded a take that's emotionally perfect but rhythmically 3-5% too slow. You time-stretch to match tempo, but the vocal sounds slightly "processed." What's the trade-off decision?
- A) Always prioritize perfect timing
- B) Decide based on genre/context: if modern pop/electronic, subtle artifacts acceptable; if acoustic/jazz, consider keeping slower tempo and adjusting track tempo to match vocal; or comp with alternate takes for timing-critical sections only
- C) All time-stretching is unacceptable
- D) Artifacts are never audible

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
You're pitch-shifting a full mix down a whole step (2 semitones) for a different vocalist. The low end becomes "muddy" and indistinct. What's happening and what's the solution?
- A) Pitch-shifting doesn't affect low end
- B) Shifting down moves all frequency content lower; bass/kick now occupy sub-bass; solution: EQ boost original frequencies before shifting, or use harmonic exciter after to restore upper harmonics, or multi-band shift
- C) Muddy bass is unavoidable
- D) Don't pitch-shift mixes

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
You're using Élastique for vocals but notice occasional "warbling" on sustained notes during vibrato. What setting or technique reduces this artifact?
- A) Use lower quality algorithm
- B) Try "Soloist" mode designed for monophonic material, reduce stretch amount if excessive, enable formant preservation, increase FFT window size in settings, or use manual comping to avoid stretching sustained vibrato notes
- C) Warbling is unavoidable with quality algorithms
- D) Vibrato can't be time-stretched

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 5
A film composer needs a 2-minute cue time-stretched to exactly 2:15 for picture changes. They insist on "perfect quality." What's the realistic conversation about quality expectations?
- A) Perfect quality is always achievable
- B) Explain ~12.5% stretch is moderate, expect good quality with pro algorithms, but some compromise inevitable; offer alternatives: re-compose/record at new tempo, selective stretching, A/B stretched vs. original for approval
- C) Time-stretching always sounds bad
- D) All stretches sound identical

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 6
You're creating a chopped vocal effect by reversing short sections (50-200ms) then pitch-shifting them. What artifact becomes prominent that wouldn't occur with longer sections?
- A) No artifacts from short sections
- B) Formant shifting more apparent on short transients/consonants; sounds unnatural/robotic; solution: enable formant preservation even for effects, or embrace the artifacts as creative choice, or use specialized vocal effects processing
- C) Longer sections have more artifacts
- D) Pitch-shifting time doesn't matter

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 7
A DJ sends you a track to remix, specifying "use Beatport tempo which is 126 BPM." You analyze it and detect 123.7 BPM. Should you stretch to 126 (what client said) or 123.7 (what you detected)?
- A) Always trust tempo detection
- B) Verify with client - Beatport listing may be rounded/wrong; detect manually by listening over 8-16 bars; if artist says 126, original may be 126 with timing variations; discuss whether to stretch to grid or preserve organic timing
- C) Always use Beatport listings
- D) Tempo doesn't matter

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
You're pitch-shifting dialogue down one octave for a monster voice effect. It sounds unnatural because the formants shifted. Should you enable formant preservation?
- A) Never use formant preservation for effects
- B) Depends on desired effect: formant preservation maintains human voice character; without it, creates monster/creature effect; try both, A/B with director; formant shift may be exactly what's needed for effect
- C) Always enable formant preservation
- D) Dialogue can't be pitch-shifted

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
You're Paulstretching a 4-second sound to 60 seconds for ambient background. The result sounds "grainy" instead of smooth. What parameter adjustment creates smoother drones?
- A) Paulstretch doesn't have parameters
- B) Increase window size; larger windows create more averaging/smearing, reducing grain; trade-off: may lose some original character; test 1s, 2s, 4s windows for desired smoothness
- C) Decrease window size
- D) Graininess is unavoidable

**Answer: B**

**Expert Explanation:** Time-stretching alters tempo without pitch change.
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 10
A mastering client sends a mix where they time-stretched live drums "just slightly" to fix timing. You notice phasing issues when compared to direct recording. What's the likely multi-track issue?
- A) Time-stretching doesn't cause phasing
- B) Time-stretched individual drum tracks not aligned; solution: group all drums and stretch together to maintain phase relationships, or better: use manual editing/quantization instead of time-stretching for live drums; preserve original transients
- C) Phasing is in the original recording
- D) This can't be fixed

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

---

# SUBJECT 9: MIDI FUNDAMENTALS (10 Questions)

### Question 1
You're recording MIDI from a keyboard into your DAW, but notes arrive late and feel unresponsive. USB interface is set to 512 sample buffer. What's the likely cause and solution?
- A) MIDI is always slow
- B) Large audio buffer adds latency; reduce buffer to 64-128 samples for tracking, increase for mixing; also check USB MIDI driver settings; disable any MIDI echo/feedback loops
- C) 512 samples has zero latency
- D) MIDI latency can't be reduced

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 2
You have 3 hardware synths daisy-chained via MIDI THRU. The third synth plays noticeably later than the first. What's causing this and what's the better connection method?
- A) MIDI THRU creates instant transmission
- B) Each THRU connection adds ~1-2ms latency; cumulative ~2-4ms delay on 3rd synth; solution: use MIDI interface with multiple OUT ports, send to each synth directly from separate outputs; eliminates cumulative delay
- C) Timing difference is imaginary
- D) Daisy-chaining has no limitations

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 3
Your computer has both USB-MIDI and a dedicated PCIe MIDI interface. Which typically has lower latency for performance, and why?
- A) Both are identical
- B) PCIe interface often lower latency - direct to system bus vs. USB polling; USB adds ~1-3ms for buffering/polling; however, quality USB interfaces with good drivers can be comparable; test both; modern class-compliant USB often adequate
- C) USB is always faster
- D) Latency doesn't matter for MIDI

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 4
You're sending MIDI from your DAW to hardware synths. Should MIDI tracks be sent pre-fader or post-fader in your signal flow?
- A) Post-fader always
- B) Pre-fader - MIDI is performance data, not audio; faders shouldn't affect MIDI transmission; post-fader only if intentionally using volume to control MIDI; verify in DAW settings; keeps MIDI separate from audio mixing
- C) Faders affect MIDI
- D) MIDI doesn't have routing options

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 5
You connect a modern MIDI controller to vintage 1980s hardware via 5-pin DIN. The vintage gear occasionally misses notes or behaves erratically. What compatibility issue might exist?
- A) Old and new MIDI are incompatible
- B) Running status - modern controllers use it, some vintage gear doesn't recognize it properly; solution: check controller settings for "running status off" option, verify cable quality, check for timing issues
- C) 1980s MIDI was different protocol
- D) Vintage gear is always broken

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 6
You're building a MIDI setup with 8 hardware synths. You want to sequence them all from your DAW while keeping CPU minimal. What's the most efficient MIDI interface topology?
- A) Daisy-chain all via THRU
- B) Use multi-port MIDI interface with dedicated OUT for each synth; separate data streams prevent bandwidth congestion, eliminate daisy-chain latency, allow precise timing per instrument
- C) One IN/OUT is sufficient
- D) MIDI interfaces don't matter

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 7
Your MIDI controller sends on all 16 channels by default, and you're triggering sounds you don't want. How do you isolate to specific channels?
- A) Can't filter MIDI channels
- B) In DAW: set track MIDI input filter to specific channel only; in controller: set output channel; in receiving device: set receive channel; verify no MIDI echo/thru creating loops; use MIDI monitor to diagnose data flow
- C) Disconnect unused instruments
- D) MIDI channels can't be controlled

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 8
You're using Bluetooth MIDI for wireless keyboard. Performance feels "laggy" at ~30ms latency. Is this acceptable for different scenarios?
- A) 30ms is always acceptable
- B) Depends: unacceptable for live playing; acceptable for pre-roll recording; acceptable for controller pads/knobs; use wired for performance, wireless for convenience/mixing
- C) Bluetooth has zero latency
- D) All MIDI latency is identical

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 9
You program a sequence with dense controller data (CC updates every 10ms). When played, your MIDI interface drops some messages. What's the bandwidth issue?
- A) MIDI has unlimited bandwidth
- B) Exceeding MIDI bandwidth; dense CC data clogs stream; solution: reduce update rate, use NRPN/RPN for high-res instead of multiple CCs, distribute dense data across multiple MIDI ports
- C) Interface is defective
- D) CC messages don't use bandwidth

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 10
You're synchronizing a DAW with hardware drum machine via MIDI clock. The drum machine drifts slightly over 4 minutes. What timing issue exists and what's the solution?
- A) MIDI clock is perfectly stable
- B) MIDI clock jitter or drift in sending/receiving device; solution: increase clock resolution if available, verify stable MIDI interface, check for USB audio interference, use dedicated MIDI ports, consider MTC or dedicated sync boxes for critical timing
- C) 4 minutes is too short for drift
- D) Drift is unavoidable

**Answer: B**

**Expert Explanation:** Jitter is the timing deviation of the sample clock, which can introduce noise and distortion.
**Image:** !["Diagram"](/images/diagram_jitter_clock_v2.png)
**Expert Quote:** "Terms like jitter are fundamental. - Dictionary"




---

---

# SUBJECT 10: MIDI MESSAGES & NOTE DATA (10 Questions)

### Question 1
You're recording a piano performance into your DAW. Some notes sound "stuck" even though the performer released the keys. What MIDI message issue is most likely?
- A) Note On messages are wrong
- B) Missing Note Off messages - possibly hardware issue, MIDI buffer overflow, or cable problem; solution: send All Notes Off, verify MIDI cable, reduce dense data transmission, check controller keyboard for stuck keys
- C) Stuck notes are normal in MIDI
- D) DAW is broken

**Answer: B**

**Expert Explanation:** Release is the time it takes for the processor to return to a neutral state.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like release are fundamental. - Dictionary"




---

### Question 2
You quantize MIDI notes to grid, but some notes sound "chopped" with shortened release. What happened to the Note Off messages during quantization?
- A) Quantization doesn't affect Note Off
- B) Quantization moved Note Off times along with Note On, reducing note duration; solution: use "quantize Note On only" setting, or quantize then manually extend note lengths, or use groove quantize preserving duration
- C) All notes must be same length
- D) Note Off isn't affected by editing

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 3
A soft-synth responds to velocity, but when you play pianissimo (very soft), it barely makes sound below velocity 30. What solution maintains playability?
- A) Play harder always
- B) Adjust velocity curve: use exponential or compressed curve to expand lower velocities; provides better control in soft range; or adjust in synth if it has input velocity scaling; allows delicate playing
- C) Synths can't be adjusted
- D) Velocity curves don't help

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 4
You're programming a string arrangement where some notes should overlap (legato) and others separate (non-legato). MIDI shows all notes as separate events. How do you indicate legato to modern sample libraries?
- A) MIDI can't do legato
- B) Overlap Note On of next note before previous Note Off, use CC#68 if supported, use velocity switching, or use keyswitches to trigger legato articulation
- C) All notes must be separate
- D) Legato is audio-only

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 5
You copy MIDI data between two projects. In the new project, instruments play extremely loud or soft despite identical velocity data. What project setting likely differs?
- A) MIDI data corrupted
- B) Velocity curve settings in receiving track/instrument; solution: check track input velocity curve, instrument's velocity sensitivity settings, ensure MIDI effect plugins match between projects
- C) Velocity values changed during copy
- D) This is impossible

**Answer: B**

**Expert Explanation:** MIDI Velocity represents the force with which a note is played.
**Image:** !["Diagram"](/images/svg/midi_velocity.svg)
**Expert Quote:** "Terms like velocity are fundamental. - Dictionary"




---

### Question 6
You enable polyphonic aftertouch on a controller keyboard, but the receiving synth only responds to channel aftertouch. What happens to your polyphonic expression?
- A) Works perfectly
- B) Synth ignores polyphonic aftertouch messages; solution: use channel aftertouch instead, use MIDI processor to convert poly to channel aftertouch, or choose different synth supporting poly AT
- C) Automatically converts
- D) Aftertouch modes are identical

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 7
You're programming drums using MIDI note numbers. The library manual shows "Kick = C1" but in your DAW, the kick triggers at C2. What's the octave numbering issue?
- A) Someone is wrong about note numbers
- B) MIDI note numbering vs. musical octave naming varies by manufacturer; C1 can be note 24 or note 36; verify library's note number, or use MIDI note number
- C) All octaves are numbered the same
- D) Drums don't use octave numbers

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 8
A client complains their orchestral mock-up "sounds like MIDI." You check: all velocity values are between 80-90, timing is perfectly quantized. What human performance elements are missing?
- A) Perfect quantization equals realism
- B) Missing micro-timing variation, dynamic variation, phrase shaping, articulation changes, vibrato variation; add subtle randomization and manual editing
- C) MIDI can never sound realistic
- D) Quantization improves realism

**Answer: B**

**Expert Explanation:** Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding).
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like quantiz are fundamental. - Dictionary"




---

### Question 9
You record a MIDI controller with aftertouch, but playback sounds different from recording. You verify aftertouch data is recorded. What's the likely automation issue?
- A) MIDI doesn't record aftertouch
- B) DAW may not read automation data on playback, aftertouch messages might be filtered, track may be set to ignore aftertouch, or data exists but isn't assigned to any parameter; check MIDI track settings and automation lanes
- C) Aftertouch can't be played back
- D) Controller is broken

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 10
You program a brass crescendo by increasing velocity values over time. It sounds "stepped" rather than smooth. What's the limitation and what's better?
- A) Velocity should create smooth crescendos
- B) Velocity is discrete steps, not continuous; better: use CC#11 or CC#7 for smooth crescendos, keep velocity for articulation differences; separate note attack from dynamic shaping
- C) Crescendos are impossible in MIDI
- D) 128 steps is perfectly smooth

**Answer: B**

**Expert Explanation:** Attack is the time it takes for the processor to react to the input signal.
**Image:** !["Diagram"](/images/svg/compression_attack_release.svg)
**Expert Quote:** "Terms like attack are fundamental. - Dictionary"




---

---

# SUBJECT 11: MIDI CONTROLLERS (CC) (10 Questions)

### Question 1
You automate filter cutoff (CC#74) to sweep from closed to open over 4 bars. During playback, the sweep sounds "stepped" rather than smooth. What's causing this and what's the solution?
- A) CC#74 is broken
- B) Insufficient automation density - MIDI CC only sends when changed; solution: increase automation point density in DAW, ensure CC messages sent frequently during movement, use high-resolution automation
- C) 7-bit resolution is perfectly smooth
- D) Filters can't sweep smoothly

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 2
A hardware synth has CC#1 (Mod Wheel) assigned to vibrato. You want it to control filter instead. How do you reassign MIDI CC destinations?
- A) Can't change CC assignments
- B) In synth: access modulation matrix/MIDI assign menu, select CC#1 as source, assign to filter cutoff destination; in DAW: use MIDI processor/transformer to remap CC#1 to CC#74
- C) CC assignments are fixed
- D) Filters don't respond to CC

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 3
You move mod wheel (CC#1) from 0 to 127 gradually. The synth responds, but you hear stepping artifacts on the effect. What resolution limitation exists and what's the solution?
- A) No stepping should occur
- B) 7-bit resolution can be audible on slow sweeps; solution: use 14-bit high-resolution CC if synth supports, increase sweep speed, or add smoothing/interpolation in synth settings
- C) Mod wheel is broken
- D) 128 steps is always smooth

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 4
You set sustain pedal (CC#64) value to 100 thinking "100% sustain." Notes don't sustain. What's the threshold behavior?
- A) 100 should work
- B) Sustain threshold is 64; values 0-63 = OFF, 64-127 = ON; value 100 should work; check MIDI monitor to verify message is sent, verify synth is receiving on correct channel, check CC#64 assignment in synth
- C) Sustain pedal uses different CC
- D) 100 is too high

**Answer: B**

**Expert Explanation:** Threshold is the level setting at which distinct dynamic processing (compression, gating) begins.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like threshold are fundamental. - Dictionary"




---

### Question 5
You're mixing and want to automate reverb send amount. You try CC#91 (Reverb Send), but the DAW's reverb doesn't respond. What's the disconnect?
- A) CC#91 always controls all reverbs
- B) CC#91 is for hardware/instruments with built-in FX; DAW plugins controlled by automation lanes, not MIDI CC; solution: use DAW's effect send automation, or use MIDI-controllable reverb plugin
- C) DAW reverb is broken
- D) Automation doesn't work

**Answer: B**

**Expert Explanation:** Reverb creates the illusion of space and depth.
**Image:** !["Diagram"](/images/svg/reverb_rt60_graph.svg)
**Expert Quote:** "Terms like reverb are fundamental. - Dictionary"




---

### Question 6
You record CC#7 (Volume) automation from a hardware controller while performing. On playback, existing volume automation conflicts, creating erratic levels. What's the priority issue?
- A) Both automations should work together
- B) Automation modes conflict - recorded MIDI CC vs. track automation; solution: choose read/write mode, consolidate to one automation type, or use automation priority settings
- C) CC#7 and track volume are different things
- D) Conflicts are impossible

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 7
You assign multiple CCs to the same parameter (CC#1 and CC#74 both control filter). When moving mod wheel, filter doesn't respond smoothly. What's the data collision?
- A) Multiple assignments improve control
- B) Competing CC messages conflict; last-received takes priority but creates stepping; solution: assign only one CC per parameter, or use CC#1 as primary with CC#74 disabled, clear multiple assignments
- C) All CCs work simultaneously
- D) CCs can't conflict

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 8
A client wants "MIDI panning" to automate synth position in stereo field during performance. What's the correct CC and does this control DAW pan or synth pan?
- A) MIDI doesn't do panning
- B) CC#10 controls synth's internal pan; separate from DAW track pan; for DAW pan control, use track automation; determine if client wants synth parameter or mix position
- C) CC#10 controls DAW mixer
- D) Panning can't be automated

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 9
You send CC#123 (All Notes Off) to stop stuck notes, but some notes continue. What's the limitation of CC#123 vs. CC#120?
- A) CC#123 always works perfectly
- B) CC#123 sends Note Offs; if issue is in sustain pedal being stuck ON, notes sustain after Note Off; CC#120 forces immediate silence; try CC#120, or CC#64 value 0
- C) Both CCs are identical
- D) Stuck notes can't be stopped

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 10
You want smooth filter sweeps, but standard CC#74 (7-bit) sounds stepped. The synth supports 14-bit CC. How do you implement high-resolution control?
- A) Can't use 14-bit CC
- B) Send CC#74 for coarse control + CC#106 for fine control; 16,384 steps total; controller/DAW must support sending LSB; check if hardware sends both automatically or requires configuration
- C) 14-bit just means two CCs at once randomly
- D) MSB/LSB don't work together

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

---

# SUBJECT 12: GENERAL MIDI & ADVANCED MIDI (10 Questions)

### Question 1
You open a General MIDI file from 1995. Drums sound correct, but piano/strings/bass sound different from the original. What's the GM limitation causing this?
- A) GM files corrupt over time
- B) GM standardizes patch numbers/mapping, not actual sounds; different GM devices use different sound engines; 1995 file likely targets specific GM synth's character; solution: accept variation or try multiple GM sound sets for better match
- C) GM guarantees identical sound across all devices
- D) File is broken

**Answer: B**

**Expert Explanation:** Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling.
**Image:** !["Diagram"](/images/svg/limiter_brickwall.svg)
**Expert Quote:** "Terms like limit are fundamental. - Dictionary"




---

### Question 2
You need to access patch 150 on a synth that supports bank select. GM only allows 128 programs. How do you access programs 129-256?
- A) Programs above 128 are impossible
- B) Use Bank Select: CC#0 to select bank 1, then Program Change for patch within that bank; patch 150 = Bank 1, Program 22; verify synth's bank organization in manual
- C) Just send Program Change 150
- D) GM doesn't support bank select

**Answer: B**

**Expert Explanation:** General MIDI ensures compatibility.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 3
You send pitch bend with ±2 semitone range set, but the synth bends ±12 semitones. What setting mismatch exists?
- A) Pitch bend is broken
- B) Pitch bend range in synth set to ±12 semitones; solution: use RPN to set bend range via MIDI: CC#101=0, CC#100=0, CC#6=2; or adjust manually in synth
- C) Pitch bend range can't be changed
- D) All synths use same bend range

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 4
A game audio developer requests GM-compatible MIDI files. You use advanced CCs (CC#74, CC#71) for filter control. Will these work in GM context?
- A) GM supports all CCs equally
- B) GM Level 1 doesn't require CC#71/74 support; many GM devices ignore them; stick to basic CCs for maximum compatibility; test on multiple GM devices; document CC usage for developer
- C) All MIDI devices support all CCs
- D) GM doesn't use CCs

**Answer: B**

**Expert Explanation:** Filters remove specific frequencies from the spectrum.
**Image:** !["Diagram"](/images/svg/eq_high_pass.svg)
**Expert Quote:** "Terms like filter are fundamental. - Dictionary"




---

### Question 5
You receive a MIDI file with massive SysEx data dumps at the start (200KB). Your GM module doesn't respond. What's the issue and can this be fixed?
- A) SysEx works with all devices
- B) SysEx is manufacturer/device specific; GM module doesn't understand this synth's SysEx; solution: strip SysEx data, may lose custom patches, or get same synth brand as original, or manually recreate sounds
- C) GM requires SysEx
- D) All SysEx is universal

**Answer: B**

**Expert Explanation:** Equalization adjusts the balance of frequency components.
**Image:** !["Diagram"](/images/svg/eq_bell_q_factor.svg)
**Expert Quote:** "Terms like eq are fundamental. - Dictionary"




---

### Question 6
You're scoring for an old GM keyboard (1995). It has only 24-voice polyphony. Your orchestral arrangement plays 40+ simultaneous notes. What happens?
- A) All notes play perfectly
- B) Voice stealing occurs - oldest or quietest notes cut off; solution: reduce orchestration density, voice doublings, ensure critical parts have priority, simplify pad textures, test on actual device
- C) Device expands polyphony automatically
- D) Polyphony limits don't affect playback

**Answer: B**

**Expert Explanation:** ratio determines the intensity of the gain reduction once the signal passes the threshold.
**Image:** !["Diagram"](/images/svg/compression_graph.svg)
**Expert Quote:** "Terms like ratio are fundamental. - Dictionary"




---

### Question 7
You automate pitch bend to create portamento between notes, but it resets too quickly, creating a "bump." What's the issue with pitch bend message timing?
- A) Pitch bend doesn't create portamento
- B) Pitch bend returns to center too fast after note, or not enough messages sent during bend; solution: increase automation point density, ensure bend returns to center after destination note, use dedicated portamento instead
- C) Portamento can't be automated
- D) Pitch bend timing is perfect

**Answer: B**

**Expert Explanation:** General MIDI ensures compatibility.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 8
A colleague suggests using NRPN for high-resolution control. What's the difference between RPN and NRPN, and when would you use each?
- A) RPN and NRPN are identical
- B) RPN = Registered; NRPN = Non-Registered; use RPN for standard functions, NRPN for device-specific features; check device manual for NRPN map
- C) Both are obsolete
- D) NRPN is newer version of RPN

**Answer: B**

**Expert Explanation:** General MIDI ensures compatibility.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Mastering this concept takes practice. - Education Team"




---

### Question 9
You're creating educational GM MIDI files for distribution. Should you include lyrics using MIDI meta-events, or is this incompatible?
- A) Lyrics break GM compatibility
- B) Lyric meta-events are part of Standard MIDI File spec, compatible with GM; include them - karaoke/education software supports them; ensure proper encoding, test in target applications
- C) GM doesn't support text
- D) Only notes are allowed in GM files

**Answer: B**

**Expert Explanation:** MIDI is a protocol for communicating musical information.
**Image:** !["Diagram"](/images/svg/midi_piano_roll.svg)
**Expert Quote:** "Terms like midi are fundamental. - Dictionary"




---

### Question 10
A vintage GM module from 1992 receives your modern MIDI file but sounds "chaotic." You used CC data density common now (updates every 10ms). What bandwidth issue exists?
- A) Modern MIDI files are incompatible
- B) Vintage devices may have slower MIDI processing; dense CC data causes buffer overflow/dropped messages; solution: reduce CC update rate, use Running Status for efficiency, simplify controller data for vintage hardware
- C) All MIDI devices have same processing speed
- D) CC update rate doesn't matter

**Answer: B**

**Expert Explanation:** Bit depth determines the dynamic range and noise floor of the digital signal.
**Image:** !["Diagram"](/images/svg/quantization_steps.svg)
**Expert Quote:** "Terms like bit depth are fundamental. - Dictionary"




---

---

## SCORING GUIDE - MASTER/EXPERT LEVEL

- **108-120 correct (90-100%):** World-Class Expertise - Industry Professional/Consultant
- **96-107 correct (80-89%):** Expert Professional - Senior Engineer/Producer
- **84-95 correct (70-79%):** Advanced Professional - Experienced Practitioner
- **72-83 correct (60-69%):** Professional Competency - Working Professional
- **Below 72 correct (<60%):** Significant Advanced Study Required

---

## MASTER LEVEL CHARACTERISTICS

These questions require:
- **Professional Problem-Solving** - Real-world troubleshooting scenarios
- **Workflow Optimization** - Balancing quality, efficiency, and client needs
- **Format Compatibility** - Cross-platform and legacy system integration
- **Client Communication** - Managing expectations and making recommendations
- **Creative vs. Technical Trade-offs** - When to bend rules for artistic results
- **Deep Understanding** - Why things work, not just that they work

---

## EXPERTISE DOMAINS ASSESSED

- **Professional Troubleshooting** - Diagnosing and fixing real issues
- **Workflow Design** - Optimal strategies for various scenarios
- **Quality Assurance** - Identifying and preventing problems
- **Format Management** - Bit depth, sample rate, file format decisions
- **MIDI Implementation** - Beyond basics to professional usage
- **Sample Library Creation** - Multi-sampling, optimization, realism
- **Client Services** - Meeting deliverable specs, managing expectations
- **Legacy System Integration** - Working with vintage/modern hybrid setups

---

*Music Tech Dictionary - Volume 4: Sampling & Sequencing*
*Master/Expert Level Complete - All 12 Subjects*
*© 2024 - Educational Use*
*Real-World Professional Scenarios*
