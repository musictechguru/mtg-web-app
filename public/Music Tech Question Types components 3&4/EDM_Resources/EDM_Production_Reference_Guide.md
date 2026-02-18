# COMPONENT 4 PRODUCTION KNOWLEDGE: EDM
## EDM PRODUCTION REFERENCE GUIDE
**Pearson Edexcel Level 3 GCE Music Technology**

---

## 1. ESSENTIAL EDM SOUND DESIGN RECIPES

| Sound Type | Oscillators (Source) | Filter Settings | Envelope (ADSR) | Essential Effects | Notes / Tips |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Supersaw Lead** | **7-9 Sawtooth Waves** per oscillator.<br>Detune: **15-30 cents**.<br>Unison: **On**. | **Low Pass (LPF)**<br>Cutoff: Open or High.<br>Resonance: Low-Med. | **Amp:** Fast Attack, Full Sustain.<br>**Filter:** Optional decay pluck. | **OTT / Multiband Comp** for brightness.<br>**Reverb:** Large Hall.<br>**Delay:** Ping-pong. | Use "Stereo Spread" to make it wide. Layer with a mono lead for focus. |
| **Sub-Bass** | **1 Sine Wave** (or Triangle).<br>Octave: **-1 or -2**.<br>Phase: Reset/Retrigger. | **Low Pass (LPF)**<br>Cutoff: ~100Hz-150Hz. | **Amp:** Instant Attack, Full Sustain, Short Release. | **Saturation:** Mild (Tube/Tape) to add harmonics.<br>**Sidechain:** Heavy. | **MUST BE MONO**. Do not use reverb or stereo delays on sub. |
| **Pluck Synth** | **2 Saw or Square Waves**.<br>Unison: Low (3-5 voices). | **Low Pass (LPF)**<br>Cutoff: Low (modulate up).<br>Envelope Amount: **High**. | **Amp:** Fast Attack, Short Decay.<br>**Filter:** Fast Attack, **Short Decay**, No Sustain. | **Delay:** Combined 1/8 and 1/4 note.<br>**Reverb:** Large/Long tail. | The "Pluck" character comes from the **Filter Decay**, not just the amp. |
| **White Noise Riser** | **Noise Generator** (White). | **Band Pass** or **Low Pass**.<br>Resonance: High (for "whistle"). | **Amp:** Long Attack (8 bars).<br>**Filter:** Automate Cutoff UP over 8 bars. | **Reverb:** Huge/Washey.<br>**Flanger/Phaser:** Slow rate. | Automate Pitch or Filter Cutoff steadily upwards to build tension. |
| **Donk / House Bass** | **FM Synthesis** (Square/Sine).<br>Ratio: 1:1 or 1:2. | **Low Pass**.<br>Env Mod: Medium. | **Amp:** Fast Attack, Short Decay, Low Sustain. | **Distortion:** Tube used heavily.<br>**Chorus:** Mild for width. | Classic "Hollow" bass sound used in Deep House / Future House. |

---

## 2. EDM MIXING TEMPLATE & FREQUENCY GUIDE

### **The "Golden Rules" of EDM Mixing:**
1.  **Kick & Sub are King:** They must be the loudest, cleanest elements.
2.  **Sidechain Everything:** The kick needs room. Duck the bass, duck the leads, duck the reverb.
3.  **Mono Compatibility:** Clubs play in mono. Check your mix in mono frequently.
4.  **Brightness:** EDM is brighter than Rock/Pop. Don't be afraid of highs (8kHz+).

### **Frequency Allocation Chart:**

| Range | Frequency | Primary Element | Action / Treatment |
| :--- | :--- | :--- | :--- |
| **Sub-Bass** | **20 Hz - 60 Hz** | Sub-Oscillator, Kick Lows | **MONO ONLY**. High Pass everything else at 100Hz+. |
| **Bass Body** | **60 Hz - 150 Hz** | Kick Punch, Bass Synth (Mid layer) | Ideally Mono. The "chest hit" of the kick lives here. |
| **Mud / Warmth** | **200 Hz - 500 Hz** | Pads, Rhythm Synths, Vocals | **Danger Zone**. Cut here on Synths/Pads to clear room for Kick/Snare weight. |
| **Mids / Presence** | **1 kHz - 4 kHz** | Lead Synth, Vocals, Snare Snap | Where the "musical" information lives. Ensure Lead is dominant. |
| **Highs / Air** | **5 kHz - 10 kHz** | Hi-Hats, Vocal Breath, Synth Sizzle | Boost for clarity. De-ess vocals carefully. |
| **Top End** | **10 kHz - 20 kHz** | Cymbals, "Air" | Rolling sounds. Adds "expensive" sheen. |

---

## 3. SIDECHAIN COMPRESSION GUIDE

**Concept:** Automatically lowering the volume of one track (Destination) when another track (Source) plays.
**Goal:** To stop the Bass and Kick fighting for frequency space, and to create the rhythmic "pumping" groove.

### **Setup Steps:**
1.  Insert **Compressor** on the Target Channel (e.g., Bass Synth).
2.  Activate **Sidechain / Key Input** on the Compressor.
3.  Select **Kick Drum** as the Input Source.

### **Recommended Settings:**
*   **Threshold:** Lower until you see **-6dB to -15dB** of gain reduction every time the kick hits.
*   **Ratio:** High (**4:1** to **Infinite:1**). Harder knee = more pump.
*   **Attack:** **Fast (0.1ms - 10ms)**. You want the volume to drop *instantly* when the kick hits.
*   **Release:** **Tempo Sync** is key.
    *   *Too fast:* Jittery, clicking distortion.
    *   *Too slow:* Bass never returns to full volume.
    *   *Sweet Spot:* 1/8th note or 1/4 note (approx **50ms - 300ms** depending on BPM). The bass should "swell" back up just before the next beat.

---

## 4. BUILD & DROP ARRANGEMENT (Standard 128 BPM Structure)

### **The Build-Up (8 or 16 Bars)**
*   **Goal:** Create maximum tension.
*   **Techniques:**
    *   **Pitch Risers:** Synths gliding up +1 Octave or +2 Octaves.
    *   **Filter Sweeps:** High Pass Filters on Music bus automating from 20Hz -> 500Hz (removing bass).
    *   **Snare Roll:** 1/4 notes -> 1/8 notes -> 1/16 notes -> 1/32 notes -> 1/64 notes.
    *   **Reverb Washaout:** Automate Reverb Wet/Mix knob from 20% -> 100% (washes sound out).
    *   **The Silence:** Leave 1 beat of silence (gap) right before the drop hits.

### **The Drop (16 or 32 Bars)**
*   **Goal:** Maximum energy release.
*   **Techniques:**
    *   **Full Frequencies:** Bass and Sub return immediately.
    *   **Dry Signal:** Reverb washout is removed (Dry vocals/leads).
    *   **Sidechain:** Heavy pumping active.
    *   **Minimalism:** Focus on Kick, Sub, Main Lead, and Drums. Remove clutter.

---

## 5. ESSENTIAL PLUGINS & TOOLS

**Synthesizers:**
*   Xfer Serum / Vital (Wavetable - Industrial standard)
*   Sylenth1 (Subtractive - Classic Supersaws)
*   NI Massive (Wavetable - Bass music)

**Mixing / Mastering:**
*   **EQ:** FabFilter Pro-Q3 (Surgical cuts)
*   **Compression:** FabFilter Pro-C2, OTT (Multiband Upward/Downward Comp)
*   **Sidechain:** Nicky Romero Kickstart / LFO Tool (Volume Shapers), Standard Logic/Live Compressor.
*   **Limiter:** FabFilter Pro-L2, Ozone Maximizer (Targeting -6 LUFS).
