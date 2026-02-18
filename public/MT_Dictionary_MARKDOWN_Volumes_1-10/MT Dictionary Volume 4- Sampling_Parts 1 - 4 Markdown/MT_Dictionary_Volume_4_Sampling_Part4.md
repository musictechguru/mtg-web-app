# Music Tech Dictionary
## Volume 4: Sampling & Sequencing Complete - FULL COMPREHENSIVE EDITION
### Part 4 of 4: MIDI Complete - Fundamentals, Messages, Controllers & Technical

---

# PART 3: MIDI & SEQUENCING

## 6. MIDI Fundamentals

### MIDI Protocol (Musical Instrument Digital Interface)
**Universal standard for electronic musical instruments to communicate.**

**History:**
- Introduced: 1983
- Developers: Dave Smith (Sequential Circuits), Ikutaro Kakehashi (Roland)
- Purpose: Standardize synthesizer communication
- Revolutionary: Instruments from different manufacturers could communicate

**What MIDI Is:**
- **Performance data** (notes, velocity, controllers, etc.)
- **NOT audio** (no sound transmitted, only instructions)
- Digital protocol (binary data)
- Serial communication (one byte at a time)

**What MIDI Transmits:**
- Note on/off messages
- Note number (pitch)
- Velocity (how hard key struck)
- Controller data (mod wheel, sustain pedal, etc.)
- Program changes (patch selection)
- Pitch bend
- Aftertouch (pressure)
- System messages

**MIDI Advantages:**
- Tiny file sizes (just data, not audio)
- Editable (change notes, timing, velocity after recording)
- Non-destructive (original performance preserved)
- Universal standard (works with all MIDI devices)

**MIDI Speed:**
- 31,250 bits per second (31.25 kbaud)
- Fast enough for real-time performance
- Occasional latency with many simultaneous events

---

### MIDI Channels (1-16)
**16 independent data streams allowing multi-timbral operation.**

**Concept:**
- 16 channels numbered 1-16
- Each channel: independent instrument/sound
- Like TV channels (different programs on different channels)
- Single MIDI cable: carries all 16 channels simultaneously

**Channel Assignment:**
- **Channel 1:** Often default/main instrument
- **Channel 10:** Drums (General MIDI standard)
- **Channels 2-9, 11-16:** Melodic instruments

**Multi-Timbral Synthesizers:**
- Can play different sounds on different channels
- Example: Piano on channel 1, strings on channel 2, bass on channel 3
- Essentially 16 synthesizers in one

**Channel Voice Messages:**
- Note on/off
- Program change
- Control change
- Pitch bend
- Aftertouch
- All include channel number (1-16)

**Omni Mode:**
- Responds to all channels (ignores channel number)
- Rarely used (defeats purpose of channels)
- Poly mode: Responds to assigned channel only (normal operation)

**Professional Use:**
- DAW tracks: assigned to specific MIDI channels
- Multi-timbral instruments: receive on multiple channels
- Drums: always channel 10 (General MIDI convention)

---

### MIDI Hardware

**MIDI Controller:**
- Device that generates MIDI data (keyboard, pad controller, wind controller)
- Sends: note messages, controller data
- May or may not: produce sound itself
- Examples: MIDI keyboard, Akai MPK, Novation Launchkey

**Sound Module (Tone Generator):**
- Device that receives MIDI, produces sound
- No keyboard: controlled via MIDI only
- Rack-mounted typical
- Examples: Roland Integra-7, Yamaha MU series

**MIDI Interface:**
- Connects MIDI devices to computer
- USB-MIDI interfaces most common
- Converts: MIDI protocol ↔ USB
- Multiple ports: for complex setups
- Examples: MOTU MIDI Express, iConnectivity mioXL

---

### MIDI IN/OUT/THRU Ports

**MIDI IN:**
- Receives MIDI data from other devices
- Input port (receives messages)
- 5-pin DIN connector (traditional) or USB

**MIDI OUT:**
- Sends MIDI data to other devices
- Output port (transmits messages)
- One-way communication

**MIDI THRU:**
- Echoes exact copy of data received at MIDI IN
- Allows daisy-chaining devices
- No processing: just passes data through
- Example: Controller → Synth 1 (THRU) → Synth 2 (THRU) → Synth 3

**Signal Flow:**
- Controller MIDI OUT → Synthesizer MIDI IN
- Synthesizer MIDI THRU → Next device MIDI IN
- Chain up to 3-4 devices (signal degrades after that)

**Modern: USB-MIDI:**
- USB connection carries MIDI
- Bi-directional (no separate IN/OUT needed)
- More stable (less latency, no signal degradation)
- Most modern devices: USB-MIDI

---

### MIDI Cable
**5-pin DIN cable carrying MIDI data.**

**Specifications:**
- 5-pin DIN connectors (but only 3 pins used)
- Maximum length: 50 feet (15 meters) recommended
- Shielded cable (reduces interference)
- One-directional (OUT to IN only)

**Pin Configuration:**
- Pin 1: Not used
- Pin 2: Ground
- Pin 3: Not used
- Pin 4: Current source (+5V)
- Pin 5: Current sink (return)

**Modern Alternative:**
- USB cables (USB-MIDI)
- Ethernet cables (MIDI over Ethernet)
- Wireless MIDI (Bluetooth LE)

---

### General MIDI (GM)
**Standardized sound set for MIDI devices ensuring compatibility.**

**Purpose:**
- Any GM MIDI file plays correctly on any GM device
- Standardizes: program numbers, drum mapping, controllers
- Ensures: consistent playback across devices

**GM Standards:**
- 128 melodic instruments (program numbers 1-128)
- Drum kits on channel 10
- Minimum 24-voice polyphony
- 16 simultaneous channels

**GM Instrument Categories:**
- 1-8: Piano
- 9-16: Chromatic Percussion
- 17-24: Organ
- 25-32: Guitar
- 33-40: Bass
- 41-48: Strings
- 49-56: Ensemble
- 57-64: Brass
- 65-72: Reed
- 73-80: Pipe
- 81-88: Synth Lead
- 89-96: Synth Pad
- 97-104: Synth Effects
- 105-112: Ethnic
- 113-120: Percussive
- 121-128: Sound Effects

**GM Drum Map (Channel 10):**
- Note 35: Acoustic Bass Drum
- Note 36: Bass Drum 1
- Note 38: Acoustic Snare
- Note 42: Closed Hi-Hat
- Note 46: Open Hi-Hat
- Note 49: Crash Cymbal 1
- Note 51: Ride Cymbal 1

**GS and XG:**
- Roland GS: Extended General MIDI
- Yamaha XG: Further extended GM
- Backward compatible with GM

---

## 7. MIDI Messages

### Status Byte
**First byte of MIDI message indicating message type and channel.**

**Format:** 1sss cccc (binary)
- First bit (1): Always 1 (identifies as status byte)
- Next 3 bits (sss): Message type
- Last 4 bits (cccc): Channel number (0-15 = channels 1-16)

**Message Types:**
- 1000: Note Off
- 1001: Note On
- 1010: Polyphonic Key Pressure (Aftertouch)
- 1011: Control Change
- 1100: Program Change
- 1101: Channel Pressure (Aftertouch)
- 1110: Pitch Bend
- 1111: System messages

**Example:** 10010000 (binary) = Note On, Channel 1

---

### Data Byte
**Second and third bytes containing message value information.**

**Format:** 0ddd dddd (binary)
- First bit (0): Always 0 (identifies as data byte)
- Remaining 7 bits: Value (0-127)

**Range:** 0-127 (7-bit resolution)

**Number of Data Bytes:**
- Note On/Off: 2 data bytes (note number, velocity)
- Control Change: 2 data bytes (controller number, value)
- Program Change: 1 data byte (program number)
- Pitch Bend: 2 data bytes (LSB, MSB for 14-bit resolution)

---

### Note On/Off Messages
**Messages indicating when note starts and stops.**

**Note On:**
- Status: 1001 cccc (channel)
- Data 1: Note number (0-127)
- Data 2: Velocity (1-127)
- Example: Play middle C (60) on channel 1 at velocity 64

**Note Off:**
- Status: 1000 cccc (channel)
- Data 1: Note number (0-127)
- Data 2: Release velocity (0-127, often 64 or ignored)

**Note On with Velocity 0:**
- Alternative to Note Off message
- More common (saves bandwidth)
- Note On velocity 0 = Note Off

**Stuck Notes:**
- When Note Off not received (MIDI cable disconnected, software crash)
- Note continues forever
- Solution: "All Notes Off" message (CC 123)

---

### Note Number (0-127, C-2 to G8)
**MIDI note number representing pitch.**

**Range:** 0-127 (128 possible notes, covering 10+ octaves)

**Middle C (C4):**
- Note number: 60
- Reference pitch for MIDI
- Different octave numbering systems (C3, C4, C5 all refer to same note depending on manufacturer)

**Octave Numbering:**
- C-2 (note 0) to G8 (note 127)
- Each octave: 12 notes
- A4 = note 69 = 440Hz (concert pitch)

**Examples:**
- C-2 = 0 (lowest)
- C4 (Middle C) = 60
- A4 (440Hz) = 69
- C8 = 120
- G8 = 127 (highest)

**Drum Mapping:**
- Each note: different drum sound
- Note 36: Kick drum (typical)
- Note 38: Snare
- Note 42: Closed hi-hat

---

### Velocity (0-127)
**How hard key is struck (or released).**

**Note On Velocity:**
- Range: 1-127 (0 = Note Off)
- 1: Softest possible
- 64: Medium
- 127: Hardest possible

**Uses:**
- Volume control (most common)
- Filter brightness (harder = brighter)
- Sample selection (velocity layers)
- Attack time (harder = faster)
- Multiple destinations simultaneously

**Velocity Curve:**
- Linear: Direct 1:1 mapping
- Exponential: More dynamic range
- Logarithmic: Compressed dynamic range
- Fixed: Ignores velocity (organ-style)

**Note Off Velocity (Release Velocity):**
- Range: 0-127
- How fast key released
- Rarely implemented (most synths ignore)
- Can control: release time, release sample selection

---

### Polyphonic Key Pressure (Aftertouch)
**Pressure applied to individual keys after initial strike.**

**Polyphonic Aftertouch:**
- Independent pressure per key
- Each key sends own aftertouch value
- Very rare (expensive to implement)
- Examples: Yamaha CS80, Osmose

**Message:**
- Status: 1010 cccc
- Data 1: Note number (0-127)
- Data 2: Pressure value (0-127)

**Applications:**
- Vibrato per note
- Filter modulation per note
- Volume swell per note
- Expressive lead playing

---

### Channel Pressure (Aftertouch)
**Single pressure value for entire keyboard (most common type).**

**Channel Aftertouch:**
- One pressure value for all keys
- Less expensive to implement
- Most MIDI keyboards with aftertouch use this

**Message:**
- Status: 1101 cccc
- Data 1: Pressure value (0-127)

**Typical Uses:**
- Vibrato depth (pressure adds vibrato)
- Filter modulation (pressure opens filter)
- Volume swell
- LFO amount

---

### Program Change (0-127 Patches)
**Selects preset sound/patch on receiving device.**

**Message:**
- Status: 1100 cccc
- Data 1: Program number (0-127)

**Range:** 0-127 (128 possible programs)

**Numbering:**
- MIDI: 0-127
- User display: Often 1-128 (adds 1 for user friendliness)

**Applications:**
- Change synthesizer patch mid-song
- Automate sound changes in DAW
- Live performance (switch sounds)

**Bank Select:**
- For >128 sounds
- CC 0 (MSB) and CC 32 (LSB)
- Allows: 16,384 banks × 128 programs = 2,097,152 total sounds
- Sent before Program Change

---

### Pitch Bend (14-bit, ±2 Semitones Typical)
**Continuous pitch control via pitch bend wheel.**

**Resolution:** 14-bit (16,384 steps) - very smooth
- Data 1: LSB (Least Significant Byte, fine control)
- Data 2: MSB (Most Significant Byte, coarse control)

**Range:**
- Center: 8192 (no bend)
- Down: 0-8191 (bend down)
- Up: 8193-16383 (bend up)

**Bend Range:**
- Typical: ±2 semitones (configurable)
- Can be set: ±1, ±2, ±7, ±12 semitones or more
- Set via: synthesizer parameters or RPN (Registered Parameter Number)

**Characteristics:**
- Spring-loaded wheel (returns to center)
- Affects: all sounding notes on channel
- Smooth: 14-bit resolution provides smooth bends

---

### System Exclusive (SysEx)
**Manufacturer-specific messages for device configuration.**

**Purpose:**
- Parameter editing beyond standard MIDI
- Patch dumps (backup/restore)
- Firmware updates
- Device-specific features

**Format:**
- Start: F0 (hex) - SysEx start byte
- Manufacturer ID: One or three bytes
- Data: Variable length (device-specific)
- End: F7 (hex) - SysEx end byte

**Uses:**
- Save/load synthesizer patches
- Edit parameters not available via CC
- Bulk dumps (all presets)
- Configuration backup

**Example:** Sending synth patch to computer for backup.

---

## 8. MIDI Controllers (CC)

### CC#1: Modulation Wheel
**Primary modulation control, typically controlling vibrato depth.**

**MIDI:** CC 1
**Range:** 0-127
**Typical Use:** Vibrato depth (LFO to pitch)
**Physical Control:** Modulation wheel (left of keyboard)
**Stays positioned:** Not spring-loaded

---

### CC#7: Volume
**Channel volume (overall level).**

**MIDI:** CC 7
**Range:** 0-127 (0 = silence, 127 = maximum)
**Use:** Mix balance between instruments
**Different from:** Note velocity (affects individual notes)

---

### CC#10: Pan
**Stereo position control.**

**MIDI:** CC 10
**Range:** 0-127
- 0: Hard left
- 64: Center
- 127: Hard right

---

### CC#11: Expression
**Real-time volume changes (like volume pedal).**

**MIDI:** CC 11
**Range:** 0-127
**Use:** Swells, fade-ins, dynamics
**Different from CC#7:** Expression = performance, Volume = mix

---

### CC#64: Sustain Pedal (Damper)
**Most commonly used controller - piano-style sustain.**

**MIDI:** CC 64
**Values:**
- 0-63: Off (sustain released)
- 64-127: On (sustain engaged)
**Binary:** Effectively on/off (some synths support half-pedal)

---

### CC#65: Portamento On/Off
**Enables/disables portamento (glide between notes).**

**MIDI:** CC 65
**Values:** 0-63 = Off, 64-127 = On

---

### CC#5: Portamento Time
**Duration of glide between notes.**

**MIDI:** CC 5
**Range:** 0-127 (0 = instant, 127 = longest glide)

---

### CC#71: Resonance (Filter Resonance)
**Filter resonance/Q amount.**

**MIDI:** CC 71
**Range:** 0-127
**Use:** Control filter emphasis at cutoff frequency

---

### CC#74: Brightness/Filter Cutoff
**Filter cutoff frequency control.**

**MIDI:** CC 74
**Range:** 0-127
**Use:** Real-time filter sweeps, brightness control

---

### CC#91: Reverb Send Level
**Amount sent to reverb effect.**

**MIDI:** CC 91
**Range:** 0-127

---

### CC#93: Chorus Send Level
**Amount sent to chorus effect.**

**MIDI:** CC 93
**Range:** 0-127

---

### CC#120: All Sound Off
**Immediately silences all notes.**

**MIDI:** CC 120
**Use:** Emergency stop (stuck notes)

---

### CC#121: Reset All Controllers
**Resets all controllers to default values.**

**MIDI:** CC 121
**Resets:** Mod wheel, pitch bend, sustain, etc.

---

### CC#123: All Notes Off
**Sends Note Off for all notes.**

**MIDI:** CC 123
**Use:** Stop all sounding notes (respects release)

---

## Summary: Volume 4 Complete

**Part 1:** Sample Editing (10 techniques) + Digital Audio Theory Start
**Part 2:** Digital Audio Theory Complete + Sample Playback Parameters
**Part 3:** Multi-Sampling Complete + Time-Stretching Techniques
**Part 4:** MIDI Complete - Fundamentals, Messages, Controllers, Technical

**Total Coverage:** 95 comprehensive entries covering sampling, digital audio, multi-sampling, MIDI protocol, and sequencing.

---

*Music Tech Dictionary - Volume 4 of 10*
*Complete Sampling & Sequencing Reference*
*© 2024 - Educational Use*

