# Music Tech Dictionary
## Volume 1: Fundamentals & Recording - COMPLETE
### Parts 4, 5, 6 of 6: Studio Hardware, Mixer Controls, Gain Staging

---

# PART 4: STUDIO HARDWARE

## 8. Audio Interfaces

### Audio Interface
Device connecting microphones and instruments to computer for recording. **Functions:** Converts analog signals to digital (A/D), Converts digital signals to analog (D/A), Provides microphone preamps, Supplies phantom power, Provides monitoring outputs, Headphone outputs.

**Key specifications:**
- **Preamp count:** 2-8 typical (determines simultaneous recording)
- **Preamp quality:** SNR, frequency response, THD, headroom
- **Sample rates:** 44.1, 48, 88.2, 96, 176.4, 192kHz
- **Bit depth:** 24-bit standard, some 32-bit
- **Connection:** USB 2.0/3.0, Thunderbolt, PCIe
- **Latency:** Round-trip latency at various buffer sizes
- **Max input level:** How loud before clipping (+10dBu to +24dBu)
- **Impedance:** Input impedance for proper mic matching

**Connection types:**
- **USB 2.0:** Most common, sufficient for 2-8 channels, universal compatibility
- **USB 3.0/3.1:** Higher bandwidth, lower latency, more channels possible
- **Thunderbolt:** Lowest latency, highest channel count, Mac/PC (newer)
- **PCIe:** Internal card, lowest latency, professional systems

**Popular interfaces:**
- **Budget:** Focusrite Scarlett (2i2, 4i4, 8i6), Behringer U-Phoria, M-Audio Air ($100-300)
- **Mid-range:** Universal Audio Volt, SSL 2/2+, Audient iD4/iD14, Presonus Studio ($200-500)
- **Professional:** Universal Audio Apollo, RME Babyface/Fireface, Antelope Audio ($500-3000+)

**Professional practice:** Choose based on I/O needs, Preamp quality matters, Thunderbolt for lowest latency, Expandable systems for growth.

### Studio Monitors (Active/Powered)
Speakers designed for accurate sound reproduction in recording/mixing. **Purpose:** Reveal truth about recording (not flatter sound), Expose problems (not hide them), Provide consistent reference, Translate to other systems.

**Active vs Passive:**
- **Active (powered):** Built-in amplifiers, Optimized amp-to-driver match, More common in modern studios, Simpler setup
- **Passive:** External amplifier required, More flexible, Can upgrade amp separately, Less common now

**Key specifications:**
- **Driver configuration:** 2-way (woofer + tweeter) or 3-way (woofer + mid + tweeter)
- **Woofer size:** 5", 6.5", 8", 10" common
- **Frequency response:** ±3dB from 45Hz-20kHz typical (nearfield)
- **Power handling:** 50-200W typical for nearfield
- **Max SPL:** 100-115dB at 1 meter
- **Room position:** Nearfield (3-5ft), midfield (6-10ft), farfield (10-15ft+)

**Famous monitors:**
- **Nearfield:** Yamaha HS5/HS8, KRK Rokit, Adam A7X, Focal Alpha, JBL 305/308 ($150-800/pair)
- **Professional:** Genelec 8030/8040, Focal Solo6/Twin6, Adam S2V, ATC SCM25 ($1,000-5,000/pair)
- **Reference:** Yamaha NS-10 (discontinued, legendary), Auratone 5C (mix cube)

**Placement critical:** Equilateral triangle with listener, Tweeters at ear height, Away from walls (2-3ft minimum), Symmetrical positioning.

### Headphones for Monitoring
Closed-back headphones for tracking, open-back for mixing/critical listening. **Types:**

**Closed-Back (Tracking):**
- Isolate from outside sound
- Prevent bleed into microphones
- Examples: Sony MDR-7506 ($99), Audio-Technica ATH-M50x ($149), Beyerdynamic DT-770 ($159)

**Open-Back (Mixing):**
- More natural sound
- Better stereo image
- Cannot use while recording (leaks sound)
- Examples: Sennheiser HD 650 ($499), Beyerdynamic DT-990 ($149), AKG K702 ($199)

**Professional practice:** Closed-back for recording, Open-back for detailed editing, Cross-reference with monitors, Never mix solely on headphones.

### Cables and Connections

**XLR (Balanced):**
- 3-pin connector (ground, hot, cold)
- Balanced signal (rejects interference)
- Locks in place
- Professional standard for microphones and line level
- Can be very long (100ft+) without issue

**TRS 1/4" (Balanced):**
- Tip-Ring-Sleeve
- Balanced when used as balanced connection
- Common for line-level patch cables
- Headphones (stereo) also use TRS

**TS 1/4" (Unbalanced):**
- Tip-Sleeve
- Unbalanced signal
- Instrument cables (guitar/bass)
- Susceptible to interference
- Keep short (<20ft ideal)

**RCA:**
- Unbalanced
- Consumer equipment
- Pair for stereo (red = right, white/black = left)

**S/PDIF / ADAT Optical:**
- Digital connections
- Optical cable (immune to interference)
- ADAT: 8 channels at 44.1/48kHz
- S/PDIF: 2 channels, higher quality

**Professional practice:** XLR for all microphones, Balanced TRS for line level, Keep unbalanced cables short, Quality cables matter (shielding, connectors).

---

# PART 5: MIXER CONTROLS

## 9. Channel Strip Components

### Channel Strip
Complete set of controls for individual track/channel. **Typical order (top to bottom):**
1. **Input section:** Gain/trim control, Pad switch, Phantom power switch
2. **High-pass filter:** Usually 80-100Hz, removes rumble
3. **EQ section:** High, High-mid, Low-mid, Low
4. **Dynamics section:** Compressor, Gate (sometimes)
5. **Aux sends:** 1-8 sends typical
6. **Pan control:** Left-right positioning
7. **Fader:** Volume control
8. **Mute/Solo:** Channel control

**Understanding flow:** Signal flows top to bottom, Each section processes signal, Order matters for sound, Bypassing available per section.

### Input Gain/Trim
First control in signal chain after preamp. **Purpose:** Set optimal level from preamp, Maximize signal-to-noise ratio, Prevent clipping, Feed proper level to rest of channel.

**Setting process:**
1. Have performer play loudest section
2. Watch input meter while adjusting
3. Target peaks around -12dB to -6dBFS
4. Leave headroom for unexpected peaks

**Digital vs Analog:** Digital: absolute ceiling at 0dBFS. Analog: softer clipping, more forgiving. **Common mistake:** Setting too hot (causes clipping). **Professional practice:** Conservative levels, leave headroom, can always add more gain later.

### Pad Switch
Reduces input signal level by fixed amount (typically -10dB or -20dB). **When to use:** Very loud sources, Preventing preamp overload, Condenser mic on loud source (kick drum, guitar amp).

**Location:** Sometimes on microphone itself, Sometimes on preamp/interface. **Function:** Attenuates signal before it reaches preamp gain stage, Prevents overload/distortion. **Alternative:** Move microphone farther from source. **Professional practice:** Use when needed, Not a substitute for proper placement.

### Phantom Power (+48V)
DC voltage supplied through microphone cable. **Standard:** 48 volts DC. **Method:** Sent through pins 2 and 3 of XLR, Returned via pin 1 (ground). **Powers:** Condenser microphones, Active DI boxes, Some ribbon mics (modern active types).

**Safe for:** Dynamic microphones (they ignore it). **Dangerous for:** Vintage ribbon microphones (can damage). **Toggle:** Usually global on/off per group of inputs. **Professional practice:** Turn on for condensers, Check before connecting ribbons, Turn off when not needed.

### High-Pass Filter (Low-Cut)
Removes low frequencies below cutoff point. **Typical settings:** 40Hz, 60Hz, 80Hz, 100Hz. **Slope:** Usually 12dB/octave or 18dB/octave. **Purpose:** Remove rumble and low-frequency noise, Reduce proximity effect, Clean up low end, Reduce mud in mix.

**Use on:** Almost everything except bass and kick drum, Vocals (reduce proximity effect, rumble), Guitars (remove mud), Overheads (tighten cymbals). **Professional rule:** "High-pass everything" (except kick and bass). **Setting:** 80-100Hz common starting point.

### Fader
Sliding volume control for channel. **Range:** -∞ (silence) to +6 or +10dB (boost). **Unity gain:** 0dB position (no boost or cut). **Scale:** Logarithmic (matches hearing). **Physical faders:** Analog consoles, control surfaces. **Virtual faders:** DAW mixer. **Resolution:** Higher near unity for fine control. **Automation:** Fader movements can be recorded. **Professional practice:** Start mix with faders at unity, adjust from there, avoid excessive boosting.

### Pan Control
Positions signal in stereo field. **Range:** 100% Left (hard left) through Center (C or 0) to 100% Right (hard right). **Controls:** Balance between left and right speakers. **Center:** Equal in both speakers. **Hard left/right:** Only in one speaker.

**Pan law:** How level changes at center, -3dB (most common): 3dB quieter at center, -4.5dB: more quieter at center, 0dB (equal power): no level change. **Common practice:** Kick, snare, bass, lead vocal: center. Guitars, keys, effects: spread left/right. Drums: natural panning (drummer's perspective or audience). **Professional practice:** Create space, avoid crowding center, use full stereo field.

### Solo and Mute

**Solo:**
- Hear only selected track(s)
- Mutes everything else temporarily
- Types: Solo-in-place (SIP), Solo (true solo)
- Essential for detailed editing/EQ

**Mute:**
- Silences selected track
- Doesn't affect other tracks
- Can be automated
- Temporary or permanent

**Professional practice:** Use solo for focused work, Use mute for arrangement decisions, Be careful (easy to forget solo'd tracks), Check full mix regularly.

### Aux Sends (Effects Sends)
Sends copy of signal to auxiliary bus or effect. **Pre-fader send:** Level unaffected by channel fader, Used for monitor mixes. **Post-fader send:** Level follows channel fader, Used for effects (reverb, delay).

**Amount control:** How much signal sent (0-100%). **Uses:** Reverb (shared across tracks), Delay effects, Parallel compression, Monitor mixes. **Professional practice:** Use post-fader for effects, Use pre-fader for monitors, Label clearly.

---

# PART 6: GAIN STAGING

## 10. Microphone Gain

### Microphone Level
Electrical signal output from microphone. **Typical range:** -60dBu to -40dBu (very weak). **Why so weak:** Sound pressure creates very small voltage, Diaphragm movement creates millivolts, Requires significant amplification.

**Varies by mic type:**
- Dynamic: -54 to -60dBV/Pa (less sensitive, needs more gain)
- Condenser: -34 to -42dBV/Pa (more sensitive, needs less gain)
- Ribbon: -54 to -60dBV/Pa (least sensitive, needs most gain)

**Professional understanding:** Weakest signal in entire chain, Most susceptible to noise, Requires quality preamp, Proper gain staging starts here.

### Setting Mic Gain
Process of setting optimal preamp amplification. **Step-by-step:**

1. **Start at minimum:** Gain knob fully counterclockwise
2. **Have source play:** Performer plays loudest part they'll play
3. **Gradually increase gain:** Watch input meter on interface/DAW
4. **Target level:** Peaks around -12dB to -6dBFS
5. **Leave headroom:** 6dB safety margin above peaks
6. **Test throughout range:** Quiet and loud sections

**Visual indicators:**
- Green: Good level (typical operation)
- Yellow/Orange: Approaching maximum (caution)
- Red: Clipping (reduce gain immediately)

**Too low:** Increases noise floor, Loses detail in quiet sections, Difficult to hear. **Too high:** Clipping/distortion, Lost transient detail, Cannot be fixed after recording. **Professional practice:** Conservative approach, Leave headroom, Can always add more later.

### Preventing Clipping
Avoiding distortion from excessive level. **At microphone:** Use pad if very loud source, Proper microphone distance, Condenser pads typically -10 or -20dB.

**At preamp:** Set gain conservatively, Watch peak meters carefully, Test full dynamic range. **At converter:** Ensure preamp output doesn't overload input, Most interfaces have adequate headroom.

**In DAW:** Record at appropriate levels (-12 to -6dBFS peaks), Leave headroom for processing, Monitor constantly. **Professional rule:** If seeing red (clip indicator), reduce gain. **Digital clipping:** Cannot be fixed, Sounds terrible, Must be prevented.

### Headroom Management
Maintaining adequate space between level and maximum. **Recording phase:** -12 to -6dBFS peaks = -6dB headroom, -18dBFS average = more headroom. **Mixing phase:** Individual tracks: -12 to -6dBFS, Master bus: -6 to -3dBFS (before limiting). **Mastering phase:** After limiting: -1 to -0.3dBFS maximum.

**Why needed:** Unexpected peaks can occur, Processing adds level, Cumulative effect of multiple tracks, Safety margin prevents disaster. **Professional wisdom:** "You can always add more level, but you can't un-clip."

---

## Summary: Volume 1 Complete

This comprehensive guide covered:

**Part 1 - Core Concepts:**
- Audio, frequency, amplitude fundamentals
- Decibels, clipping, headroom, dynamic range
- Digital audio (sample rate, bit depth, conversion, dithering)

**Part 2 - Signal Flow & DAW:**
- Signal chain and gain staging
- DAW functions and automation
- Tracks, regions, markers, tempo

**Part 3 - Recording Techniques:**
- Recording chain complete
- Microphone techniques (close, distance, stereo)
- Recording workflow and best practices

**Part 4 - Studio Hardware:**
- Audio interfaces (specifications, types)
- Studio monitors (active/passive, placement)
- Cables and connections (XLR, TRS, TS)

**Part 5 - Mixer Controls:**
- Channel strip components
- Input gain, pad, phantom power
- Fader, pan, solo, mute, sends

**Part 6 - Gain Staging:**
- Microphone level management
- Setting proper gain
- Preventing clipping
- Headroom throughout chain

**Total Coverage:** 100+ comprehensive technical terms and concepts with practical applications, professional standards, and best practices.

---

*Music Tech Dictionary - Volume 1 of 10*
*Complete Fundamentals & Recording Reference*
*© 2024 - Educational Use*

