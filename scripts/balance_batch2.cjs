const fs = require('fs');

function updateQuizFile(slug, balancedQuestions) {
  const file = 'public/' + slug + '-interactive-quiz.html';
  let content = fs.readFileSync(file, 'utf8');
  
  // Find where const questions = [ ... ]; is
  const regex = /const questions\s*=\s*\[[\s\S]*?\];\s*(?:function|let currentQ)/;
  const match = content.match(regex);
  if (!match) {
    throw new Error('Could not find questions array in ' + file);
  }
  
  const suffix = match[0].endsWith('function') ? 'function' : 'let currentQ';
  const replacement = 'const questions = ' + JSON.stringify(balancedQuestions, null, 2) + ';\n\n    ' + suffix;
  const newContent = content.replace(regex, replacement);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('✓ ' + slug + ' updated successfully!');
}

// 1. ROCK QUIZ
function balanceRock() {
  const qs = JSON.parse(fs.readFileSync('scripts/rock_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Tenor saxophones and boogie pianos were replaced by screaming lead guitars, 100W valve stacks, and complex multi-tracked rhythm guitars",
    "Electric guitars were completely replaced by orchestral cellos, synthesizers, and electronic drum machines tracked live to stereo disc",
    "Acoustic upright basses and acoustic flat-top guitars became the primary rhythm instruments, running into clean transistor studio preamps",
    "Brass horn sections and upright grand pianos dominated the arrangements, recorded live around a single central ribbon microphone"
  ];

  // Q2
  qs[1].options = [
    "Vox AC30 Top Boost, driving EL84 power tubes into compression at low volume",
    "Marshall 100W Super Lead (Plexi), pushing EL34 power valves into overdrive",
    "Fender Twin Reverb, delivering 85W of ultra-clean headroom without breakup",
    "Roland Jazz Chorus JC-120, using solid-state transistors and analog chorus"
  ];

  // Q3
  qs[2].options = [
    "Placing a single omnidirectional dynamic microphone suspended three meters above the kit",
    "Dedicated close-miking of every drum shell, matched stereo overheads, and room ambient mics",
    "Recording the drum kit direct through passive DI boxes with digital impulse response reverbs",
    "Replacing acoustic drum shells entirely with 8-bit digital drum sample pads and sequencer triggers"
  ];

  // Q4
  qs[3].options = [
    "Placing an acoustic blanket over the bass drum and close-miking the snare shell with dynamic mics",
    "Setting up the kit at the bottom of a reflective three-story stone stairwell using a Beyer M160 stereo pair",
    "Tracking the drums inside an anechoic soundproof chamber with heavy foam baffling to eliminate reflections",
    "Routing individual drum microphone tracks through high-speed tape slapback delays and spring reverbs"
  ];

  // Q5
  qs[4].options = [
    "Running a single vocal take through an analog stereo chorus pedal and bucket-brigade analog delay line",
    "Overdubbing their three voices across up to 180 vocal tracks on 24-track tape, bouncing stems repeatedly",
    "Employing digital pitch-shifting harmony processors and MIDI vocal harmonizers configured in third intervals",
    "Hiring a 100-member operatic choir to sing live in an acoustically resonant cathedral around one microphone"
  ];

  // Q6
  qs[5].options = [
    "Fender Stratocaster single-coil pickups running into a solid-state chorus amplifier with silicon diode clipping",
    "Handmade 'Red Special' guitar with series/phase pickup switching, treble booster pedal, and cranked Vox AC30s",
    "Gibson Les Paul humbuckers running through a germanium fuzz face stompbox into a 100W Marshall Plexi stack",
    "Rickenbacker 12-string electric guitar plugged into an optical compressor and tracked directly into the desk"
  ];

  // Q7
  qs[6].options = [
    "Variable-mu vacuum tube circuit providing slow, gentle, program-dependent leveling across complex orchestral mixes",
    "Ultra-fast Field Effect Transistor (FET) attack (20–800 µs) and aggressive Class-A amplifier transformer saturation",
    "Electro-optical light cell providing smooth, non-linear dynamic attenuation without altering fast transient peaks",
    "Digital lookahead peak limiter utilizing brickwall DSP algorithms to eliminate all signal overshoots instantly"
  ];

  // Q8
  qs[7].options = [
    "A resonant hollow spring tank unit that produced metallic, fluttering acoustic decays on electric guitar amps",
    "A large suspended cold-rolled steel plate excited by a transducer, producing dense, bright, smooth acoustic reverb",
    "A tiled basement echo vault with a loudspeaker and microphone that captured physical room reflections naturally",
    "An algorithmic DSP microprocessor running early digital reverberation programs with adjustable pre-delay controls"
  ];

  // Q9
  qs[8].options = [
    "Placing microphones two meters back from resonant double-headed drum shells in highly reflective stone tracking rooms",
    "Damping drumheads with gaffer tape, wallets, and tea towels, often removing bottom resonant heads for dry separation",
    "Routing all drum microphone feeds through aggressive digital noise gates with microsecond attack times in the console",
    "Tracking drums outdoors in open air fields to eliminate all boundary reflections and achieve an uncolored acoustic sound"
  ];

  // Q10
  qs[9].options = [
    "Pairing acoustic grand pianos with complex, brass-heavy jazz arrangements and extended modal improvisations",
    "Combining driving 4/4 boogie guitar riffs with lush string arrangements, doo-wop backing vocals, and slapback echo",
    "Using polyphonic analog synthesizers and programmed digital drum machines running into stereo chorus processors",
    "Recording unamplified acoustic guitars and vocalists direct to lacquer disc in single live unedited ensemble takes"
  ];

  // Q11
  qs[10].options = [
    "They urged rock audiences to abandon urban centers and embrace rural communal folk lifestyles and acoustic guitars",
    "They offered theatrical escapism from economic strikes and social unrest through flamboyant, camp visual rebellion",
    "They strictly adhered to traditional corporate business attire, performing solely for conservative concert patrons",
    "They banned all electric instruments from their recordings to promote unamplified acoustic musical performance"
  ];

  // Q12
  qs[11].options = [
    "Major 7th and minor 9th extended jazz chord voicings played in complex syncopated Latin bossa nova rhythms",
    "Power chords (root and 5th) and heavy palm-muted chugging, creating a tight, aggressive driving rhythm",
    "Open D acoustic fingerpicking tunings featuring delicate hammer-ons and pull-offs performed without plectrums",
    "Dodecaphonic twelve-tone serial rows arranged for classical string quartets and unamplified pipe organs"
  ];

  updateQuizFile('rock', qs);
}

// 2. ROCK N ROLL QUIZ
function balanceRockNRoll() {
  const qs = JSON.parse(fs.readFileSync('scripts/rock-n-roll_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "The 1930s (emerging from acoustic Delta folk)",
    "The 1950s (emerging from R&B and country boogie)",
    "The 1970s (emerging from hard rock and glam)",
    "The 1920s (emerging from early Dixieland jazz)"
  ];

  // Q2
  qs[1].options = [
    "Lead Guitar, Rhythm Guitar, Bass (Upright or Electric), and Drum Kit",
    "Accordion, Acoustic Mandolin, Upright Double Bass, and Brass Trombone",
    "Dual Electric Keyboards, Drum Synthesizer, Electric Bass, and Horns",
    "Solo Acoustic Guitar, Lead Vocalist, Upright Bass, and Harmonica"
  ];

  // Q3
  qs[2].options = [
    "A driving swung/shuffle boogie-woogie feel with heavily accented backbeats on beats 2 and 4",
    "A slow, unmetered rubato ballad tempo featuring free-time instrumental solos and ad-lib vocals",
    "A rigid, mechanical four-on-the-floor kick pattern with continuous 16th-note synthesizer bass",
    "A syncopated 6/8 Afro-Cuban polyrhythmic groove featuring complex hand percussion and congas"
  ];

  // Q4
  qs[3].options = [
    "The 12-Bar Blues chord progression using dominant 7th chords (I - IV - V)",
    "The 32-Bar AABA Tin Pan Alley standard progression using major 7th chords",
    "The Andalusian cadence (i - VII - VI - V) resolving to minor key centers",
    "The classical 16-bar passacaglia progression using strict diatonic chords"
  ];

  // Q5
  qs[4].options = [
    "Arpeggiated walking basslines (root, 3rd, 5th, 6th) and percussive upright slap-bass techniques",
    "Sustained whole-note sub-bass drones played through analog synthesizer foot pedal controllers",
    "Complex syncopated slap-and-pop funk basslines with extensive sixteenth-note ghost notes",
    "Muted single-note acoustic fingerpicking bass patterns played strictly on the root note"
  ];

  // Q6
  qs[5].options = [
    "Energetic delivery featuring screams, glottal stops, and youth-oriented themes of cars, high school, and romance",
    "Operatic bel canto vibrato singing intricate lyrics concerning political philosophy and abstract spiritual concepts",
    "Soft, whispered, breathy spoken-word monologues delivered over unamplified acoustic folk fingerpicking guitars",
    "Monophonic Gregorian chant melodies sung in Latin by male choral ensembles with zero rhythmic accompaniment"
  ];

  // Q7
  qs[6].options = [
    "Direct-to-tape tracking (mono or 2-track) with entire bands performing live in a single room using shared mics",
    "Digital multi-track sequencing with extensive virtual instrument layers and computerized automation editing",
    "Individual musicians recording isolated tracks in separate soundproof isolation booths listening to click tracks",
    "Tracking instruments direct-to-disc on 78 rpm wax cylinders using purely acoustic non-electrical horns"
  ];

  // Q8
  qs[7].options = [
    "Routing audio to a secondary tape recorder, using the physical distance between record and playback heads",
    "Inserting a digital multi-tap delay plugin locked to an eighth-note tempo grid inside a software workstation",
    "Placing a bucket-brigade analog delay stompbox pedal between the vocalist's microphone and mixing desk",
    "Tracking vocals inside an airtight tiled echo chamber equipped with dual boundary pressure-zone microphones"
  ];

  // Q9
  qs[8].options = [
    "Typically captured with just a single overhead microphone or shared room mic, occasionally adding a bass drum mic",
    "Captured with twelve separate close microphones on every individual drum shell and matched stereo condenser pairs",
    "Replaced entirely by mechanical analog rhythm boxes and electronic sequencer sound modules triggered via MIDI",
    "Recorded completely dry using boundary pressure microphones taped directly to the surface of every drum head"
  ];

  // Q10
  qs[9].options = [
    "Driving low-wattage valve (tube) amplifiers (such as Fender Tweed combos) until the output stage naturally clipped",
    "Inserting aggressive digital distortion and waveshaping plugins across pristine solid-state console input strips",
    "Using battery-powered silicon fuzz and treble booster stompbox pedals placed on stage pedalboards before the amp",
    "Tracking electric guitars completely clean through direct injection boxes straight into mixing desk summing buses"
  ];

  // Q11
  qs[10].options = [
    "Its energetic beat crossed racial boundaries, empowering post-war teenagers with rebellious cultural identity",
    "Its lyrics promoted conservative political agendas and traditional 19th-century agrarian community values",
    "Its slow, melancholic acoustic tempos were blamed for putting ballroom dance hall patrons to sleep on weekends",
    "Its exclusive use of synthetic electronic instruments was rejected by acoustic instrument manufacturing unions"
  ];

  // Q12
  qs[11].options = [
    "It established the 4-piece lineup, driving backbeat, and electric guitar as the universal foundation of modern rock",
    "It led to the complete abandonment of electric guitars in favor of traditional orchestral string quartets",
    "It convinced record labels to stop releasing 7-inch vinyl singles and return strictly to 78 rpm shellac discs",
    "It eliminated drums and bass instruments from popular commercial music for the subsequent three decades"
  ];

  updateQuizFile('rock-n-roll', qs);
}

// 3. SOUL QUIZ
function balanceSoul() {
  const qs = JSON.parse(fs.readFileSync('scripts/soul_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Plugging the Fender Precision Bass into a custom five-channel direct box with line-level transformers straight to the desk",
    "Miking a 100W Marshall valve half-stack amplifier placed inside a cavernous stone echo chamber using dynamic mics",
    "Placing an unamplified acoustic double bass three meters away from an omnidirectional condenser microphone in the center",
    "Recording an analog synthesizer sub-bass keyboard preset through an optical compressor straight into 8-track tape"
  ];

  // Q2
  qs[1].options = [
    "Console Aux Send → Loudspeaker in attic → Microphone capturing reflections → Console Aux Return",
    "Tape machine output → Binson Echorec magnetic drum unit → Spring tank transducer → Master fader",
    "Instrument input → Leslie rotating speaker cabinet → Plate pickup transducers → Stereo mix bus",
    "Microphone in attic → High-pass filter equalization → Analog tape delay machine → Studio monitors"
  ];

  // Q4
  qs[3].options = [
    "To eliminate all mid-range frequencies so vocals would sound heavily scooped and distant across stereos",
    "To ensure punchy bass fundamentals and vocal/snare presence would cut through cheap, band-limited AM car radios",
    "To add aggressive digital distortion and tape saturation to make Motown records sound like hard rock records",
    "To prevent low-frequency needle tracking skips on high-fidelity 33 1/3 rpm vinyl classical record players"
  ];

  // Q5
  qs[4].options = [
    "A continuous operatic soprano vocal countermelody performed in parallel fourths over acoustic guitars",
    "Call and response between an impassioned lead vocalist and tightly synchronized backing vocal harmonies",
    "A monophonic spoken-word monotone recitation delivered with zero vibrato or emotional dynamic range",
    "An autotuned robotic pitch-corrected vocal effect produced using extreme phase modulation plugins"
  ];

  // Q6
  qs[5].options = [
    "Its airtight soundproof isolation booths allowed total separation between instruments with zero bleed",
    "The sloping cinema auditorium floor trapped low-end standing waves and created a dark, intimate, dry room acoustic",
    "Its polished marble walls generated four seconds of bright, cavernous reverberation on all recorded tracks",
    "Its open-air outdoor stage roof allowed sound reflections to escape into the atmosphere with zero decay"
  ];

  // Q7
  qs[6].options = [
    "Fender Rhodes Mark I electric piano with active stereo panning tremolo circuit",
    "Wurlitzer 200A electric piano with built-in tremolo running into a valve amp",
    "Hohner Clavinet D6 processed through an envelope filter wah-wah pedal unit",
    "Yamaha DX7 digital synthesizer using FM synthesis electric piano algorithm"
  ];

  // Q8
  qs[7].options = [
    "Recording his vocal through a megaphone placed inside a resonant metal trash can on the live studio floor",
    "Multi-tracking layered vocal passes, monitoring previous takes in headphones to harmonize intimately with himself",
    "Pitch-shifting a single vocal take into four parallel harmonies using an early digital harmonizer processor",
    "Tracking all vocals simultaneously with an eight-member gospel choir gathered around a single ribbon microphone"
  ];

  // Q9
  qs[8].options = [
    "Fender Rhodes electric piano plugged into an overdriven valve guitar combo amplifier with spring reverb",
    "Hohner Clavinet D6 processed through a Mu-Tron III envelope filter pedal, creating percussive funk squelch",
    "Wurlitzer 200A electric piano with aggressive optical compression and heavy analog chorus modulation",
    "Acoustic upright grand piano with thumb tacks inserted into the felt hammers for a bright percussive click"
  ];

  // Q10
  qs[9].options = [
    "Recorded individually in separate isolation booths and synchronized using SMPTE timecode automation computers",
    "Trumpets and tenor/baritone saxophones playing tight unison riffs gathered around one or two shared ribbon mics",
    "Generated entirely by polyphonic analog synthesizers using subtractive filtering and square-wave oscillators",
    "Tracked by an entire 40-piece classical symphony brass section reading rigid scores in a concert hall"
  ];

  // Q11
  qs[10].options = [
    "Placing microphones three meters back from drums in cavernous tiled hallways with four-second reverberation",
    "Close miking heavily damped drums with tape and wallets, often in compact rooms with minimal acoustic decay",
    "Using digital gated reverb algorithms with high-threshold expanders inserted across snare auxiliary sends",
    "Tracking drum kits outdoors in open fields to avoid any walls or physical boundaries reflecting sound"
  ];

  // Q12
  qs[11].options = [
    "Thin roundwound strings, an active bridge humbucker, and aggressive slap-and-pop thumb techniques",
    "Heavy flatwound strings, a piece of foam rubber mute under the bridge cover, and playing with his right index finger",
    "Steel core roundwound strings played exclusively with a hard plastic plectrum through a high-gain fuzz pedal",
    "Nylon acoustic guitar strings played with fingerstyle acoustic classical technique through an optical compressor"
  ];

  updateQuizFile('soul', qs);
}

// 4. FUNK QUIZ
function balanceFunk() {
  const qs = JSON.parse(fs.readFileSync('scripts/funk_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Arp Odyssey dual-oscillator lead synth patched into an analog bucket-brigade flanger pedal",
    "Minimoog Model D analog synthesizer playing a multi-tracked, resonant, low-pass filtered bassline",
    "Fender Jazz Bass running through an overdriven tube amplifier and an optical leveling amplifier",
    "Roland TB-303 Bassline synthesizer with the resonant accent control cranked to maximum distortion"
  ];

  // Q2
  qs[1].options = [
    "Placing heavy rhythmic emphasis on the upbeat of beat 4, creating an anticipation of the next bar",
    "Placing heavy rhythmic emphasis on 'The One' (beat 1), anchoring the groove so other parts could syncopate",
    "Eliminating beat 1 entirely and relying strictly on an unaccented metronomic shuffle rhythm on beat 3",
    "Shifting the primary accent continuously between odd and even subdivisions using polyrhythmic 5/4 meter"
  ];

  // Q3
  qs[2].options = [
    "Playing rapid palm-muted sixteenth-note patterns using a heavy plastic plectrum near the bridge saddles",
    "Slap-and-pop technique: thumping strings with the thumb and popping higher strings with index/middle fingers",
    "Two-handed fretboard tapping across all four strings to perform intricate polyphonic keyboard counterpoint",
    "Strumming full four-note baritone chords with an acoustic felt pick through an analog bucket-brigade chorus"
  ];

  // Q4
  qs[3].options = [
    "It adds pitch vibrato to incoming audio using an internal low-frequency oscillator modulated by input tempo",
    "It dynamically sweeps a band-pass/low-pass filter cutoff frequency in direct response to the player's picking attack",
    "It splits audio into four distinct frequency bands and applies dynamic brickwall peak limiting to lower frequencies",
    "It converts analog instrument signals into digital 8-bit pulse codes that trigger external synthesizer modules"
  ];

  // Q5
  qs[4].options = [
    "Playing aggressive, heavily distorted single-string power chords through 100W Marshall valve stack amplifiers",
    "Rhythmic scratching (chucking): striking sixteenth-note patterns with the right hand while muting strings with the left",
    "Arpeggiating open chords using steel fingerpicks through an analog delay pedal set to dotted-eighth repeats",
    "Fingerpicking classical polyphonic lines on nylon-string guitars running into studio tube condenser microphones"
  ];

  // Q7
  qs[6].options = [
    "Placing a heavy leather wallet or folded tea towel directly on the batter snare drum head",
    "Tuning the resonant head loose and leaving the batter head un-damped for maximum ring",
    "Positioning an ambient room microphone 40 feet away inside a reflective concrete stairwell",
    "Gating the snare drum signal with an aggressive digital noise gate keyed to white noise"
  ];

  // Q8
  qs[7].options = [
    "Kick Drum & Bass, Snare & Claps, Rhythm Guitars & Keyboards, Horn Section & Vocal Ad-libs",
    "Lead Vocals, Rhythm Guitars & Bass, Horn Section Stabs, Auxiliary Percussion & Drum Shakers",
    "Synthesizer Pads, Electric Bass Drones, Distorted Guitars, Snare Drum & Hi-Hat Cymbals",
    "Acoustic Grand Piano, Upright Bass Slap, Clean Lead Guitars, Multi-tracked Choral Vocals"
  ];

  // Q9
  qs[8].options = [
    "A heavily saturated, distorted valve bass tone pushed into aggressive fuzz clipping via an analog pedal",
    "A bright, punchy, articulate electric bass tone tracked direct via a high-end transformer DI with optical compression",
    "An acoustic upright double bass recorded with a single ribbon microphone placed three meters away in the room",
    "A synthesized square-wave bassline programmed into an electronic step sequencer running at double-time tempo"
  ];

  // Q10
  qs[9].options = [
    "Recorded individually in separate vocal isolation booths and lined up using computer timecode DAW software",
    "Gathered closely around shared ribbon or condenser mics, performing punchy unison lines with extreme dynamic precision",
    "Synthesized entirely using analog voltage-controlled oscillators filtered through resonant ladder low-pass filters",
    "Tracked by a 50-piece symphony brass orchestra reading classical scores inside an acoustically reverberant church"
  ];

  // Q11
  qs[10].options = [
    "Analog Phaser pedal (e.g. MXR Phase 90 or Electro-Harmonix Small Stone)",
    "Ring Modulator producing metallic, non-harmonic sum-difference sidebands",
    "Octave Fuzz pedal generating synthetic aggressive square-wave distortion",
    "Gated Digital Plate Reverb configured with a long 500ms pre-delay time"
  ];

  // Q12
  qs[11].options = [
    "The vinyl master had extreme sub-bass below 30 Hz boosted by +12 dB with zero compression on the stereo mix",
    "The vinyl master had controlled dynamic range, focused center bass, and gentle roll-offs to avoid stylus tracking errors",
    "The vinyl master was recorded with aggressive digital brickwall limiting pushed to -3 dB LUFS integrated loudness",
    "The vinyl master completely eliminated all audio frequencies above 8 kHz to emulate the response of wax cylinders"
  ];

  updateQuizFile('funk', qs);
}

// 5. DISCO QUIZ
function balanceDisco() {
  const qs = JSON.parse(fs.readFileSync('scripts/disco_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Four-on-the-floor: steady bass drum on every quarter note, snare/claps on beats 2 and 4, open hi-hat on the off-beats",
    "A half-time shuffle rhythm with the bass drum playing strictly on beat 1 and syncopated snare cross-stick clicks on beat 3",
    "A breakbeat pattern with syncopated, syncopated kick drum hits and rolling ghost notes played across the snare drum",
    "A fast punk rock tempo with rapid sixteenth-note double-kick patterns and trashy, continuously open crash cymbals"
  ];

  // Q2
  qs[1].options = [
    "It allowed engineers to cut wider, deeper vinyl grooves with higher dynamic levels, deeper bass punch, and extended mix times",
    "It required specialized 78 rpm turntable motors that spun twice as fast, creating a brighter and clearer high-frequency sheen",
    "It was manufactured from indestructible metallic foil that prevented needle wear and completely eliminated background surface hiss",
    "It allowed DJs to store up to six hours of continuous digital audio on a single side without needing to change physical records"
  ];

  // Q3
  qs[2].options = [
    "A 40-piece live symphonic orchestra performing classical violin lines recorded live around a single stereo ribbon pair",
    "A fully electronic backing track driven by a Moog modular synthesizer running an iconic, relentless sixteenth-note bassline",
    "An authentic Delta blues rhythm section playing acoustic guitars, upright slap-bass, and unamplified harmonica solos",
    "A hard rock rhythm section featuring overdriven Marshall valve amplifiers, acoustic drum kits, and aggressive power chords"
  ];

  // Q4
  qs[3].options = [
    "Playing complex two-handed fretboard tapping counterpoint through active solid-state distortion units",
    "Octave basslines: rapidly alternating between lower and higher octaves in continuous driving eighth-note grooves",
    "Strumming acoustic four-note minor chords using felt plectrums through an analog bucket-brigade chorus pedal",
    "Playing sustained whole-note low-frequency sub-bass drones through an analog synthesizer foot pedal controller"
  ];

  // Q5
  qs[4].options = [
    "Strumming complex acoustic chord inversions miked with a matched pair of vintage studio ribbon microphones",
    "Using a Fender Stratocaster in position 4, playing clean, muted, percussive sixteenth-note chord scratches",
    "Driving a Gibson Les Paul through an overdriven 100W valve stack with the mid-frequencies scooped right out",
    "Fingerpicking intricate open-tuning acoustic guitar patterns through an analog bucket-brigade stereo chorus"
  ];

  // Q6
  qs[5].options = [
    "Recording entire bands live in a single reverberant room with zero acoustic separation between drums and brass",
    "Tracking instruments in tight, deadened acoustic spaces with direct injection (DI) bass, close miking, and 24-track tape",
    "Sequencing all instruments entirely in software digital audio workstations using early MIDI computer controllers",
    "Placing microphones five meters away from performers in tiled stone echo chambers to capture cavernous natural decays"
  ];

  // Q7
  qs[6].options = [
    "A single aggressive vocal take captured with an overdriven stage dynamic mic plugged directly into a guitar amplifier",
    "Intimate, close-miked lead vocals layered with multi-tracked unison takes and lush three-part falsetto harmony arrangements",
    "Vocals processed through early digital auto-tune pitch correction algorithms set to instantaneous zero retune speed",
    "Spoken-word rhythmic monologues delivered without vibrato and recorded through telephone band-pass equalizers"
  ];

  // Q8
  qs[7].options = [
    "Recording an 8-bit digital drum machine through a stereo chorus pedal and compressing the stereo output with brickwall limiters",
    "Creating a physical tape loop of a two-bar live drum performance, splicing the loop across tape guides, and recording it to tape",
    "Hiring an orchestral percussionist to play continuous eighth notes on an unamplified acoustic snare drum for seven minutes",
    "Programming an electronic step sequencer to trigger synthetic analog drum oscillators with randomized velocity modulations"
  ];

  // Q9
  qs[8].options = [
    "Synthesized string presets programmed on polyphonic digital FM workstations running through chorus units",
    "Sweeping, opulent multi-tracked real string and horn sections playing syncopated, uplifting contrapuntal melodies",
    "Single violin soloists miked with boundary pressure-zone microphones placed directly on the studio floor",
    "Acoustic brass ensembles playing dissonant, experimental free-jazz solos over driving four-on-the-floor kicks"
  ];

  // Q10
  qs[9].options = [
    "Sudden, jarring tempo accelerations and abrupt key modulations inserted every sixteen bars to surprise club dancers",
    "Extended instrumental breakdowns featuring isolated percussion, bass grooves, and tension-building dynamic build-ups",
    "Completely muting all drum and bass tracks for two full minutes while spoken-word poetry played over synthesizer pads",
    "Reversing the entire master tape playback during the song's bridge section to generate psychedelic backward audio effects"
  ];

  // Q11
  qs[10].options = [
    "An algorithmic digital multi-effects rack processor utilizing 24-bit DSP audio conversion chips",
    "An analog tape delay unit or electro-mechanical plate reverb (such as the EMT 140) providing smooth vocal decays",
    "A computer-based software convolutional reverb plugin utilizing sampled acoustic impulse responses",
    "A compact battery-powered bucket-brigade guitar pedal providing short 20-millisecond slapback echoes"
  ];

  // Q12
  qs[11].options = [
    "Orchestral disco used live musicians and lush strings, whereas Euro-disco pioneered fully electronic synthesizers and drum machines",
    "Orchestral disco relied exclusively on electronic synthesizers, whereas Euro-disco featured live 40-piece classical orchestras",
    "Orchestral disco was performed at 80 BPM with shuffle grooves, whereas Euro-disco was played at 180 BPM with punk rock guitars",
    "Orchestral disco was tracked entirely direct-to-disc on 78 rpm records, whereas Euro-disco was recorded onto 2-inch 24-track tape"
  ];

  updateQuizFile('disco', qs);
}

// 6. REGGAE QUIZ
function balanceReggae() {
  const qs = JSON.parse(fs.readFileSync('scripts/reggae_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Fast 140 BPM tempo, heavy bass drum on beat 1, and continuous sixteenth-note hi-hat patterns",
    "Relaxed 60–80 BPM tempo in 4/4 meter with the primary kick and snare accent falling together on beat 3",
    "Fast 3/4 waltz time signature featuring walking basslines and syncopated snare rolls on beat 2",
    "Fast 120 BPM tempo with a driving four-on-the-floor kick drum pattern on every single quarter note"
  ];

  // Q2
  qs[1].options = [
    "Continuous open-string fingerpicking patterns played with metal fingerpicks on flat-top acoustic guitars",
    "Short, staccato, clean chord chops played on the off-beats (beats 2 and 4), often doubling the organ chop",
    "Distorted, sustain-heavy power chords played with aggressive downstrokes through cranked valve amplifiers",
    "Muted sixteenth-note arpeggiated basslines played on the lower strings through an analog envelope filter"
  ];

  // Q3
  qs[2].options = [
    "Continuous walking basslines outlining the chord changes on every quarter note in high dynamic registers",
    "Repetitive, syncopated, melodic low-end ostinatos with spacious rests that leave room for drum rim-shots",
    "Aggressive slap-and-pop basslines featuring rapid sixteenth-note thumb thumps and high-register string pops",
    "Sustained whole-note sub-bass synthesizer drones running through resonant low-pass filters without pauses"
  ];

  // Q4
  qs[3].options = [
    "Applying high-pass filters cutting everything below 200 Hz to ensure the bass would sound thin and bright",
    "Rolling off high frequencies, boosting deep low-end around 60–100 Hz, and tracking directly via transformer DI boxes",
    "Driving the bass signal into extreme transistor fuzz clipping to create square-wave distortion on every note",
    "Recording the bass guitar through a vocal microphone placed three meters away in an untreated stone corridor"
  ];

  // Q5
  qs[4].options = [
    "Digital DSP microprocessors running 24-bit floating-point delays with synchronized MIDI tempo clock locking",
    "A multi-head tape transport with variable tape speed and feedback controls, allowing self-oscillating delay repeats",
    "Bucket-brigade analog delay chips producing dark, lo-fi delays limited to a maximum delay time of 300 ms",
    "A physical spring tank containing three metal springs that generated fluttering, metallic reverberation decays"
  ];

  // Q6
  qs[5].options = [
    "A digital multi-band compressor with automated threshold expansion across individual vocal stems",
    "A massive, stepped rotary high-pass filter taken from an old broadcast console, used for dramatic EQ sweeps",
    "An analog pitch-shifter that could transpose entire recorded tracks up or down by two complete octaves",
    "An automated fader automation computer that synchronized mix moves to incoming SMPTE timecode signals"
  ];

  // Q7
  qs[7].options = [
    "Synthesizing an explosive white-noise burst using an analog modular synthesizer patched to a noise gate",
    "Driving percussive snare rim-shots or rim clicks into an analog spring reverb unit and physically slapping the tank",
    "Recording actual thunder sound effects during tropical storms onto portable field tape recorders in Kingston",
    "Triggering high-velocity digital clap samples stored in the memory buffers of an early 8-bit digital drum machine"
  ];

  // Q8
  qs[6].options = [
    "Digital audio workstation software capable of streaming 64 discrete tracks of uncompressed audio files",
    "An inexpensive 4-track reel-to-reel tape machine, repeatedly bouncing tracks with creative lo-fi saturation",
    "A 48-track digital tape machine operating with computerized total-recall consoles and motorized faders",
    "A direct-to-disc lacquer cutter requiring complete band performances to be captured live with zero edits"
  ];

  // Q9
  qs[8].options = [
    "To sell mass-market commercial albums to international consumers through major record retail chains in London",
    "To provide exclusive, unreleased instrumental remixes ('dubs') for sound systems to compete in dancehall sound clashes",
    "To archive cultural folk songs for government historical preservation libraries in acoustic listening archives",
    "To audition new session musicians by having them play along with pre-recorded instrumental backing tracks"
  ];

  // Q10
  qs[9].options = [
    "Tempos accelerated from 100 BPM up to 180 BPM, brass sections were removed, and electric guitars took over the bassline",
    "Tempos slowed down from fast upbeat Ska to relaxed Rocksteady and Roots Reggae, with bass and drums becoming prominent",
    "Acoustic instruments were completely replaced by early digital FM synthesizers and programmed electronic drum machines",
    "All vocals were eliminated in favor of complex classical orchestral arrangements played by 40-piece symphony orchestras"
  ];

  // Q11
  qs[10].options = [
    "Blending Jamaican reggae grooves with acoustic American country bluegrass instrumentation and banjo fingerpicking",
    "Combining traditional Jamaican ska and reggae off-beats with British punk energy, fast tempos, and socio-political lyrics",
    "Merging roots reggae dub mixing techniques with electronic disco four-on-the-floor kicks and lush string sections",
    "Fusing reggae basslines with heavy metal distorted guitar riffs and aggressive double-kick drum patterns"
  ];

  // Q12
  qs[11].options = [
    "Roots reggae featured minimal processing and loud upfront vocals, whereas dub used heavy tape delay and reverb",
    "Roots reggae relied entirely on electronic synthesizers, whereas dub was performed live by acoustic brass bands",
    "Roots reggae was recorded at 160 BPM with distorted guitars, whereas dub was recorded at 40 BPM with harps",
    "Roots reggae was tracked direct to lacquer disc in mono, whereas dub was mixed entirely in 7.1 surround in DAWs"
  ];

  updateQuizFile('reggae', qs);
}

balanceRock();
balanceRockNRoll();
balanceSoul();
balanceFunk();
balanceDisco();
balanceReggae();
