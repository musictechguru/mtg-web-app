# Music Tech Dictionary
## Volume 1: Fundamentals & Recording - COMPLETE
### Part 3 of 6: Recording Techniques

---

# PART 3: RECORDING TECHNIQUES

## 5. Recording Chain and Signal Path

### Recording Chain Complete
The full path from sound source to recorded file. **Complete chain:**

1. **Sound Source:** Instrument, voice, amplifier
2. **Acoustic Environment:** Room acoustics, reflections
3. **Microphone:** Converts sound to electrical signal (-60dBu to -40dBu)
4. **XLR Cable:** Carries balanced signal to preamp
5. **Microphone Preamp:** Amplifies to line level (+4dBu), adds 30-60dB gain
6. **A/D Converter:** Converts analog to digital (samples at 44.1-192kHz)
7. **Computer/Interface:** Receives digital signal via USB/Thunderbolt
8. **DAW:** Records to disk as audio file
9. **Processing:** (Optional during recording) EQ, compression, effects
10. **Monitoring Path:** D/A Converter → Headphones/Speakers

**Each stage contribution:** Adds noise (cumulative), Affects frequency response, Can introduce distortion, Contributes to total latency. **Weakest link:** Determines overall quality (chain only as good as worst component). **Professional understanding:** Know complete signal path for optimization and troubleshooting.

### Gain Staging in Recording
Setting optimal levels at each point in recording chain. **Goal:** Maximum signal-to-noise ratio, Prevent clipping anywhere in chain, Maintain headroom for peaks, Ensure plugins receive appropriate levels.

**Step-by-step process:**
1. **Microphone preamp:** Set gain while performer plays loudest part, Watch input meter, Target peaks around -12dB to -6dBFS
2. **Interface input:** Should be receiving healthy level from preamp, Most interfaces: unity gain after preamp (no additional gain needed)
3. **DAW track input:** Monitor level on track meter, Confirm peaks around -12dB to -6dBFS, Leave 6dB headroom for safety
4. **Recording level:** Red lights = bad (reduce preamp gain), Too quiet = noise (increase preamp gain), Dynamic sources need more headroom

**Target levels:** Peaks: -12dBFS to -6dBFS, Average: around -18dBFS, Leave 6dB headroom above peaks. **Common mistakes:** Recording too hot (clipping), Recording too quiet (noise), Adjusting wrong gain stage (interface vs preamp).

### Monitoring During Recording
Hearing yourself/performers during recording process. **Monitoring paths:**

**Direct Monitoring (Zero-latency):**
- Signal path: Input → Interface → Headphones (bypasses computer)
- Latency: 0ms (instant)
- Advantage: Comfortable, no delay
- Disadvantage: Cannot hear plugin processing

**Software Monitoring (Through DAW):**
- Signal path: Input → Computer → Processing → Output
- Latency: Depends on buffer size (3-25ms typical)
- Advantage: Hear effects/processing during recording
- Disadvantage: Latency can be distracting

**DSP Monitoring:**
- Signal path: Input → Interface DSP → Headphones
- Latency: Near-zero (<2ms)
- Advantage: Can apply interface effects with low latency
- Available on: Apollo, Antelope, RME interfaces

**Professional practice:** Use direct monitoring for tracking, Use software monitoring for overdubs with effects, Keep buffer size low (64-128) if software monitoring, Monitor mix crucial for performer comfort.

### Headphone Mixes
Custom monitor mixes for performers during recording. **Why needed:** Everyone needs different balance, Vocalist wants more vocal, Drummer wants more click/bass, Lead player wants to hear themselves clearly.

**Creating headphone mixes:**
- **Aux sends:** Each performer gets unique mix via sends, Pre-fader sends common (unaffected by main mix)
- **Separate interface outputs:** Each output goes to different headphone amp
- **Headphone mix control:** Some interfaces (PreSonus, Focusrite) offer app control
- **Monitor controllers:** Dedicated units (Presonus HP4, Behringer HA400)

**Critical for performance:** Comfortable mix = better performance, Too loud = hearing damage, Click track essential for timing. **Professional practice:** Ask performers what they need, Adjust throughout session, Protect hearing (limit volume).

---

## 6. Microphone Techniques

### Close Micing
Microphone placed close to sound source (1-12 inches). **Characteristics:** Maximum isolation from other sounds, Reduced room acoustics, More intimate/direct sound, Strong proximity effect (bass boost), Highly positional (tone changes with placement).

**Advantages:** Isolation from other instruments, Less room sound, More gain before feedback (live sound), Direct/present sound. **Disadvantages:** Proximity effect can cause boomy bass, Less natural sound, Small movements change tone significantly, Captures less room ambience.

**Applications:** Live sound (prevent feedback), Drums (isolate each drum), Electric guitar amps (focused tone), Vocals (intimate sound), Any situation needing isolation. **Technique:** Angle mic to desired tone, Avoid pointing directly at loudest point (unless desired), Use high-pass filter to control proximity effect. **Common distances:** 1-3 inches: very intimate, proximity effect strong, 4-8 inches: balanced, some proximity effect, 9-12 inches: natural, minimal proximity effect.

### Distance Micing (Ambient Micing)
Microphone placed farther from source (1-15+ feet). **Characteristics:** Natural sound, Room acoustics included, Less proximity effect, More forgiving positioning, Captures environment.

**Advantages:** Natural, realistic sound, Room ambience captured, Position less critical, Balanced tone, Full sound with space. **Disadvantages:** Less isolation, More room sound (can be bad in poor rooms), Potential for phase issues, Lower gain before feedback.

**Applications:** Acoustic instruments (natural sound), Orchestral recording (capture ensemble), Room microphones (ambient sound), Good-sounding rooms (capitalize on acoustics), Creating depth in mix. **Technique:** Listen in room first, Place mic where it sounds best, Consider room modes and reflections. **Common distances:** 1-3 feet: some room, still direct, 3-6 feet: natural balance, 6-15 feet: room sound prominent, >15 feet: room mic, ambience.

### Stereo Recording Basics
Using two microphones to capture stereo image. **Purpose:** Create width/spaciousness, Capture spatial information, Provide realistic stereo field, Add dimension to recording.

**Basic principles:** Two mics needed, Spacing and angle create stereo, Time and level differences encode spatial info, Phase coherence critical. **Mono compatibility:** Must check how stereo folds to mono, Phase cancellation can occur, Some techniques better than others.

**Applications:** Overhead drums, Acoustic guitar, Piano, Room ambience, Orchestral/ensemble, Any source benefiting from width. **Professional practice:** Check mono compatibility, Mind phase relationships, Choose technique appropriate for source.

### 3:1 Rule
Guideline for preventing phase cancellation between multiple microphones. **Rule:** Distance between microphones should be at least 3 times the distance from mic to source.

**Example:** Mic 4 inches from snare top, Next closest mic (hi-hat) should be minimum 12 inches away (4 inches × 3 = 12 inches).

**Why it works:** Time delay small enough to avoid comb filtering, Differences become level-based instead of phase-based, Minimizes phase interaction. **When to apply:** Multiple mics on drum kit, Multiple mics in same room, Any multi-mic recording. **Not a hard rule:** Guideline, not absolute, Use ears as final judge, Some situations require exception. **Professional practice:** Follow when possible, Use phase invert button to check, Listen for phasiness and adjust.

### Phase Alignment
Ensuring microphones are in proper time/phase relationship. **Checking phase:** Solo individual mics, Add second mic, If sound gets thinner: phase issue, Flip polarity (phase button), Choose position that sounds fuller.

**Manual time alignment:** Zoom in on waveforms, Align peaks of same transient, Slide region to match, Use sample-accurate editing. **Automatic alignment:** Plugins (Sound Radix Auto-Align, Waves InPhase), Measure delay, Apply correction.

**Common problems:** Multiple mics on same source (top/bottom snare), Overhead and close mics (drum kit), Stereo micing techniques, Room mics with close mics. **Solutions:** Phase invert button (180° flip), Time alignment (slide later mic earlier), Microphone placement changes, Accept and move on (not always fixable). **Professional practice:** Check phase relationships, Fix during recording if possible, Use tools if needed, Sometimes character comes from phase interaction.

### Microphone Placement Philosophy
Overall approach to microphone positioning. **Golden rule:** Listen first, place mic where it sounds best to your ears. **Process:**
1. **Listen in room:** Walk around source while it plays, Find where it sounds best naturally, This is starting point for mic placement
2. **Place microphone:** Position mic where it sounded best, Start farther, move closer as needed
3. **Fine-tune:** Small movements make big changes, On-axis vs off-axis, Angle changes tone
4. **Check in context:** Solo sound isn't final judge, How it sits in mix matters most

**Professional wisdom:** "The best mic position is where it sounds good," Rules are guidelines not laws, Experience teaches what works, Every source/room different, Trust your ears.

---

## 7. Recording Workflow

### Pre-Production Planning
Preparation before recording session. **Song arrangement:** Know structure completely, Decide instrumentation, Plan overdubs vs live tracking. **Technical preparation:** Choose tempos and keys, Create click tracks, Write chord charts/lyrics, Prepare reference tracks.

**Studio preparation:** Check all equipment functioning, Test signal chain, Prepare headphone mixes, Set up microphones, Do sound check before session. **Professional benefit:** Smooth session, Less wasted time, Better performances, More creative energy, Higher quality results.

### Tracking Session Workflow
Typical recording session process:

**1. Setup (30-60 minutes):**
- Set up microphones
- Check all connections
- Test signal path
- Set levels and headphone mixes
- Do sound check

**2. Getting sounds (30-60 minutes):**
- Fine-tune mic positions
- Adjust tones (amps, drum tuning)
- Dial in headphone mixes
- Get comfortable monitor levels
- Do test recordings

**3. Recording (2-4 hours typical):**
- Record multiple takes
- Mark best takes
- Do punch-ins if needed
- Record alternate ideas
- Keep energy up

**4. Listening back (ongoing):**
- Check takes between recording
- Note issues or concerns
- Plan fixes or re-records
- Document decisions

**Professional practice:** Stay organized, Take breaks regularly (ears fatigue), Save incremental versions, Back up during session, Keep positive energy.

### Click Track/Metronome
Timing reference during recording. **Purpose:** Maintain steady tempo, Enable quantization later, Allow cut/paste editing, Sync with MIDI/programming. 

**Settings:** Tempo (BPM), Time signature (4/4, 3/4, etc.), Accent (downbeat emphasis), Sound (beep, woodblock, click). **Headphone mix:** Loud enough to hear clearly, Not so loud it bleeds into mic, Adjust per performer preference.

**Pre-count:** Bars before recording starts (1-2 bars typical). **Tempo mapping:** Following existing performance tempo. **When NOT to use:** Rubato passages, Deliberately free timing, Live ensemble recording (tempo naturally changes). **Professional practice:** Always offer click track, Some performers prefer not to use, Respect performer preference.

### Takes and Comp Recording
Recording multiple performances for selection/combination. **Process:**
1. **Record multiple full takes:** Usually 3-6 complete passes, Each saved to separate playlist/lane
2. **Quick listen back:** Identify standout performances, Note problems or issues
3. **Record pick-up takes:** Re-record specific problem sections, Additional options for critical parts
4. **Comp editing:** Select best sections from all takes, Create composite "perfect" performance
5. **Final editing:** Crossfades between sections, Timing alignment if needed, Pitch correction if appropriate

**Professional standard:** Always record multiple takes (even if first one great), Capture different emotional deliveries, Create performance impossible in single take, Essential for vocals and solos.

### Punch In/Punch Out
Re-recording specific section within existing take. **Process:**
1. Set punch-in point (where recording starts)
2. Set punch-out point (where recording stops)
3. Playback rolls from before punch-in
4. Recording enables at punch-in point
5. Recording stops at punch-out point
6. Keeps before/after untouched

**Modes:**
- **Manual punch:** Engineer hits record during playback
- **Automatic punch:** Pre-determined in/out points
- **Destructive punch:** Replaces original (older method)
- **Playlist punch:** Records to new playlist (non-destructive)

**Uses:** Fix small mistakes, Try alternate performances, Correct pitch/timing issues, Save great take with one problem. **Professional practice:** Use non-destructive method, Crossfades at boundaries, Give performer pre-roll (bar before).

### Reference Tracks
Songs used as guide during recording/mixing. **Uses:** Tempo reference (click track derived), Arrangement guide (structure), Energy/vibe reference, Sonic target (mixing). **How to use:** Import to DAW on separate track, Mute during recording, Reference during mixing, Compare frequency balance and levels. **Professional practice:** Choose appropriate references, Multiple references better than one, Don't copy directly (be inspired), Use for calibration.

---

*[Content continues in Part 4]*

