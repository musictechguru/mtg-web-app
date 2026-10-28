const fs = require('fs');

function updateQuizFile(slug, balancedQuestions) {
  const file = 'public/' + slug + '-interactive-quiz.html';
  let content = fs.readFileSync(file, 'utf8');
  
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

// 1. COMMERCIAL POP QUIZ
function balanceCommercialPop() {
  const qs = JSON.parse(fs.readFileSync('scripts/commercial-pop_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Frequency Modulation (FM) synthesis: 6 digital sine wave operators configured in 32 algorithms, where modulating operators alter the frequency of carriers without filters",
    "Analog subtractive synthesis: dual voltage-controlled sawtooth oscillators routed through a 24 dB/octave resonant transistor ladder low-pass filter and analog envelope stages",
    "Linear PCM wavetable synthesis: streaming uncompressed 16-bit acoustic multi-samples from internal ROM memory through dedicated analog voltage-controlled amplifier circuits",
    "Additive harmonic synthesis: combining 64 discrete sine wave oscillators in fixed mathematical harmonic ratios controlled by multi-stage digital amplifier envelopes"
  ];

  // Q2
  qs[1].options = [
    "Routing a snare drum through a large digital or plate reverb, followed immediately by an aggressive noise gate with a fast threshold, short hold, and instant cut-off",
    "Recording an acoustic snare drum inside a heavily carpeted vocal booth, compressing the signal with an optical leveling amplifier, and cutting all frequencies above 5 kHz",
    "Triggering an 8-bit synthetic snare sample from an E-mu SP-1200 drum machine and applying high-resonance band-pass filtering with synchronized stereo chorus modulation",
    "Routing the dry snare drum track into a vintage tape delay unit operating at 7.5 ips and blending the delayed slapback output back with the direct signal path"
  ];

  // Q3
  qs[2].options = [
    "They stored actual digital audio recordings (PCM samples) of real acoustic drums on internal EPROM chips, rather than using synthetic analog noise circuits",
    "They utilized analog transistor oscillator circuits that generated warm, synthetic sine wave bass drums and filtered white-noise snare crack sounds",
    "They were the first drum machines to feature mechanical motorized wooden drumsticks that physically struck internal acoustic brass percussion bells",
    "They connected directly to mainframe computers via fiber-optic cables to download digitized acoustic drum samples over early telephone network modems"
  ];

  // Q4
  qs[3].options = [
    "Tracking the kit with a single handheld dynamic microphone suspended four meters in the air inside an untreated reflective concrete warehouse space",
    "Decoupling the kit from the floor on a custom wooden drum riser, miking each drum closely, and utilizing specialized acoustic baffles called 'Swedien Spacers'",
    "Replacing all acoustic drum hits with synthetic 808 kick and clap samples triggered via MIDI velocity pads directly into an analog multi-track tape desk",
    "Recording the drum kit outdoors on open grass fields using Blumlein stereo ribbon microphone arrays to eliminate all physical room boundary reflections"
  ];

  // Q5
  qs[4].options = [
    "The Page R music composition sequencer, which allowed producers to visually arrange polyphonic sample patterns and loops along a graphical timeline grid",
    "An integrated analog four-track cassette tape transport mechanism that enabled musicians to bounce vocal overdubs without introducing audible tape hiss",
    "A direct-to-vinyl disc mastering lathe built into the keyboard chassis that allowed immediate pressing of 7-inch 45 RPM demo singles in the control room",
    "A dedicated hardware FM synthesis sound chip capable of generating 128 simultaneous voices of polyphonic acoustic piano simulations without latency"
  ];

  // Q6
  qs[5].options = [
    "It provided dedicated in-line dynamics (VCA compressor and expander/gate) and flexible parametric EQ on every single channel strip, plus Total Recall automation",
    "It replaced all analog vacuum tube console preamplifiers with digital signal processing chips that automatically corrected vocal pitch in real time during tracking",
    "It was completely wireless, transmitting 48 channels of uncompressed digital audio to studio monitor speakers via experimental microwave radio frequency antennas",
    "It was built entirely from discrete Class-A valve circuits with massive transformer stages, completely eliminating all transistors and solid-state electronics"
  ];

  // Q7
  qs[6].options = [
    "It provides dynamic 'glue', using a VCA circuit with program-dependent release to transparently knit separate instrumental tracks into a cohesive, punchy stereo mix",
    "It functions as a multi-band brickwall peak limiter, boosting the overall loudness of commercial tracks to -4 dB LUFS while completely flattening dynamic range",
    "It acts as an analog stereo spatializer, using phase inversion across side frequencies to widen the perceived stereo spread of acoustic guitars and backing vocals",
    "It eliminates all fundamental frequencies below 100 Hz on the stereo bus to ensure high-volume vinyl record pressings do not cause phonograph needles to skip"
  ];

  // Q8
  qs[7].options = [
    "SMPTE Timecode (Society of Motion Picture and Television Engineers), locking analog multi-track tape transports to 35mm film projectors",
    "MIDI (Musical Instrument Digital Interface), allowing synthesizers, drum machines, and computers from different manufacturers to communicate",
    "AES/EBU (Audio Engineering Society), standardizing two-channel professional digital audio transmission over balanced XLR cables",
    "ADAT Optical Interface, enabling transmission of eight discrete channels of 24-bit digital audio over lightpipe fiber-optic cabling"
  ];

  // Q9
  qs[8].options = [
    "Setting the 'Retune Speed' parameter on Antares Auto-Tune to '0' (fastest), forcing instantaneous pitch quantization without natural glides",
    "Processing the lead vocal through a vintage analog vocoder pedal modulated by a polyphonic synthesizer chord progression tracked in real time",
    "Routing the vocal through an overdriven guitar amplifier half-stack with extreme spring reverb and high-frequency notch filtering applied in mixdown",
    "Manually cutting and micro-splicing 1/4-inch analog master tape recordings using razor blades to create sudden microtonal pitch variations"
  ];

  // Q10
  qs[9].options = [
    "Grabbing listener attention with an unforgettable hook within the first 5–15 seconds, followed by a new melodic hook or textural shift every 7–10 seconds",
    "Starting with an extended, unhurried four-minute instrumental ambient synthesizer drone before introducing any rhythmic percussion elements or vocal lines",
    "Ensuring the entire musical composition follows a continuous 32-bar AABA classical structure without repeating any lyrical phrases or melodic choruses",
    "Restricting the entire song arrangement strictly to acoustic rhythm guitar and lead vocal, avoiding all synthesized textures or commercial production tricks"
  ];

  // Q11
  qs[10].options = [
    "Tracking a single vocal take with a dynamic stage mic and running it through an overdriven guitar distortion pedal with heavy spring reverberation",
    "Micro-pitch shifting the vocal slightly sharp on the left (+9 cents) and flat on the right (-9 cents) with short delays (10–25 ms) on an Eventide H3000",
    "Placing the vocalist ten meters away from a single omnidirectional boundary microphone positioned on the floor of a cavernous tiled echo chamber",
    "Using an analog telephone band-pass filter to remove all frequencies below 300 Hz and above 3 kHz, centered in the middle of the monophonic mix"
  ];

  // Q12
  qs[11].options = [
    "1980s pop used analog tape, SSL consoles, hardware samplers, and digital reverbs; 2010s pop is produced 'in-the-box' with pitch plugins, software synths, and heavy limiting",
    "1980s pop was recorded strictly live with one stereo microphone to vinyl disc; 2010s pop was tracked onto 2-inch 24-track tape machines using discrete analog consoles",
    "1980s pop eliminated all synthesizers and drum machines in favor of classical orchestras; 2010s pop banned all computers and returned strictly to vintage acoustic tracking",
    "1980s pop was produced exclusively in home bedrooms on cassette four-track portastudios; 2010s pop is recorded exclusively in massive commercial studio facilities"
  ];

  updateQuizFile('commercial-pop', qs);
}

// 2. METAL QUIZ
function balanceMetal() {
  const qs = JSON.parse(fs.readFileSync('scripts/metal_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "The Tritone (augmented 4th / diminished 5th, 'Diabolus in Musica') in slow minor-key riffs",
    "The Major 7th chord inversion played in syncopated Latin bossa nova dance rhythms",
    "The Andalusian minor cadence resolving upwards into bright major pentatonic melodies",
    "The classical Circle of Fifths progression played on clean flat-top acoustic guitars"
  ];

  // Q2
  qs[1].options = [
    "Relaxed, laid-back tempos, shuffle swing grooves, and clean unamplified jazz hollow-body guitars",
    "Faster tempos, aggressive double-guitar harmonies in parallel thirds, and tight sixteenth-note palm-muting",
    "Slow acoustic ballads played with fingerpicked 12-string guitars and lush symphonic string arrangements",
    "Four-on-the-floor kick rhythms accompanied by synthesized analog disco basslines and vocoder vocals"
  ];

  // Q3
  qs[2].options = [
    "It incorporated an integrated digital delay effect with synchronized tap-tempo modulation pedals",
    "It allowed pre-amp tube distortion (gain) at lower listening levels, independent of power-amp output stage",
    "It removed all vacuum tubes entirely, replacing them with clean solid-state silicon transistor circuits",
    "It featured a built-in spring reverb tank and active optical tremolo designed for surf rock recordings"
  ];

  // Q4
  qs[3].options = [
    "To eliminate all distortion and make heavy metal guitars sound identical to clean acoustic guitars",
    "To cut flubby sub-bass before distortion, tighten low-end response, and push upper-midrange frequencies",
    "To add three seconds of ambient hall reverberation directly into the amplifier's input preamplifier stage",
    "To convert the guitar's magnetic audio signal into 8-bit digital MIDI data for software synthesizer pads"
  ];

  // Q5
  qs[4].options = [
    "Boosting 1 kHz by +15 dB while aggressively cutting all low and high frequencies using active shelf filters",
    "Boosting deep bass (80 Hz) and crisp treble (5–8 kHz) while aggressively carving out the midrange (500 Hz)",
    "Applying an ultra-steep brickwall low-pass filter cutting off all harmonic frequencies above 3 kHz completely",
    "Boosting 300 Hz to create a warm, resonant boxy acoustic tone reminiscent of vintage archtop jazz guitars"
  ];

  // Q6
  qs[5].options = [
    "Duplicating a single mono guitar recording in the DAW and panning the two duplicate digital tracks hard left and right",
    "Tracking two separate, tightly synchronized performances of the same rhythm riff, panning one hard left and one hard right",
    "Recording one electric guitar track and applying an analog bucket-brigade stereo chorus pedal set to maximum depth",
    "Placing a single microphone three meters away from the amplifier cabinet in the exact center of a reverberant stone room"
  ];

  // Q7
  qs[6].options = [
    "Placing small battery-powered guitar combo amplifiers inside soundproof acoustic isolation boxes in control rooms",
    "Close-miking multiple 4x12 speaker cabinets loaded with Celestion Vintage 30 drivers, often pairing an SM57 with an R-121",
    "Recording guitars completely dry through active DI boxes and applying digital tape slapback echoes in post-production",
    "Using single omnidirectional boundary microphones taped directly to the carpeted floor beneath the amplifier chassis"
  ];

  // Q8
  qs[7].options = [
    "Using soft felt bass drum beaters on loose drumheads with zero muffling inside reflective cavernous tracking rooms",
    "Tuning heads tighter, using hard plastic beaters, damping shells, and boosting click frequencies around 4–6 kHz",
    "Routing the bass drum microphone into an analog tape echo unit with 500 milliseconds of modulated feedback repeats",
    "Applying slow optical compression with 100-millisecond attack times that smooth out all initial transient punch"
  ];

  // Q9
  qs[8].options = [
    "To completely silence the acoustic drum kit so that heavy metal drummers could perform in complete silence on stage",
    "To trigger consistent, hyper-punchy drum samples from units like the Wendel Jr., replacing inconsistent acoustic hits",
    "To transmit real-time MIDI notation directly to sheet music printers in the control room during live studio takes",
    "To convert acoustic kick drum vibrations into electrical power to charge studio headphone battery monitoring packs"
  ];

  // Q10
  qs[9].options = [
    "Compressing individual stems with gentle optical leveling amplifiers set to slow 2:1 ratios with zero gating",
    "Hard noise gating with fast attack/release, aggressive high-pass filtering (80 Hz), and surgical EQ notches on guitars",
    "Applying generous hall reverberation across every channel strip to simulate the acoustics of an ancient stone cathedral",
    "Summing all instrument tracks to monophonic master tape to eliminate phase cancellation across stereo speaker systems"
  ];

  // Q11
  qs[10].options = [
    "The band recorded all songs completely live in a single room using just two vintage ribbon microphones and no overdubs",
    "Extensive track bouncing on 48-track digital tape, Rockman headphone amp DI guitars, and Fairlight CMI sampled drums",
    "Abandoning all electric guitars in favor of acoustic nylon-string classical guitars and unamplified vocal harmonies",
    "Recording guitar tracks through overdriven vintage tweed amplifiers placed inside tiled basement echo chamber rooms"
  ];

  // Q12
  qs[11].options = [
    "Guitar strings snapped instantly whenever guitarists attempted to play standard open-position cowboy chord voicings",
    "Strings slipping across nut slots and tuning pegs during aggressive tremolo dive-bombs, causing guitars to go out of tune",
    "Excessive electromagnetic 60 Hz mains hum that entered the amplifier whenever the tremolo arm touched the bridge plate",
    "Guitars generating unwanted low-frequency acoustic body resonance that caused power amplifiers to overheat and blow fuses"
  ];

  updateQuizFile('metal', qs);
}

// 3. PUNK QUIZ
function balancePunk() {
  const qs = JSON.parse(fs.readFileSync('scripts/punk_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Alternating thumb-and-finger acoustic fingerpicking patterns played without plectrums on nylon strings",
    "Aggressive, relentless, fast downstroke eighth-note picking using a rigid plectrum for uniform attack",
    "Two-handed fretboard tapping across the upper register to perform intricate classical arpeggio patterns",
    "Gentle upward brush strokes using soft felt plectrums to create subtle, quiet acoustic chord textures"
  ];

  // Q2
  qs[1].options = [
    "Relying on lavish 40-piece orchestral arrangements and experimental polyphonic synthesizer textures",
    "Fast live-in-the-studio tracking with minimal takes, raw unprocessed energy, and rejection of over-polishing",
    "Spending months in residential studios perfecting multi-tracked vocal harmonies and gated drum reverbs",
    "Banning all electric instruments and recording strictly on acoustic flat-top guitars and upright basses"
  ];

  // Q3
  qs[2].options = [
    "Extensive use of major 7th and minor 9th extended jazz chord voicings with complex harmonic modulations",
    "Simple three-chord progressions using root-fifth power chords, barring open strings for raw, grinding power",
    "Dodecaphonic twelve-tone serial rows arranged for string quartets and unamplified cathedral pipe organs",
    "Complex modal scales and Indian raga improvisations played over continuous synthesizer bass drone pedals"
  ];

  // Q4
  qs[3].options = [
    "Lush, cavernous stereo plate reverb applied generously to every instrument to create huge stadium depth",
    "Dry, upfront, in-your-face mixes with minimal reverb, raw vocal presence, and aggressive midrange bite",
    "Heavy multi-band dynamic compression squashing audio into heavily distorted, saturated background noise",
    "Wide, ambient acoustic miking capturing predominantly the natural decay of cavernous stone recording halls"
  ];

  // Q5
  qs[4].options = [
    "A single budget dynamic microphone suspended from the center ceiling capturing the entire band in mono",
    "Top-tier professional studios (Wessex, Olympic), experienced engineers (Bill Price), and high-end gear",
    "A battery-powered four-track cassette portastudio set up in a residential bedroom with basic home microphones",
    "A direct-to-disc cutting lathe installed in an underground garage with zero electrical preamplification"
  ];

  // Q6
  qs[5].options = [
    "Hollow-body upright acoustic double bass played with fingerstyle acoustic jazz technique on gut strings",
    "Fender Precision Bass strung with roundwound strings, played aggressively with a plectrum into an SVT amp",
    "Active 6-string fretless bass played with delicate slap-and-pop techniques through an analog chorus pedal",
    "Synthesizer bass pedalboard generating low-frequency square-wave drones running through low-pass filters"
  ];

  // Q7
  qs[6].options = [
    "Placing a boundary pressure-zone microphone on the studio floor ten meters away from the amplifier cabinet",
    "Close-miking the speaker grille with a Shure SM57 aimed at the speaker cone edge for bright, cutting punch",
    "Placing an expensive tube condenser microphone behind a soundproof acoustic baffle in an adjoining hallway",
    "Running the electric guitar directly into the mixing desk via a passive direct box with zero amplifier miking"
  ];

  // Q8
  qs[7].options = [
    "Routing the snare through a five-second digital hall reverb processor with synchronized multi-tap pre-delays",
    "Close-miking top and bottom snare heads with dynamic mics, damping the head, and gating the transient decay",
    "Placing the snare drum in the center of an empty three-story stone stairwell using matched stereo ribbon pairs",
    "Replacing acoustic snare hits with programmed 8-bit synthetic digital drum samples triggered via MIDI pads"
  ];

  // Q9
  qs[8].options = [
    "Heavy metal double-kick drum patterns and virtuosic tapping guitar solos played through 100W valve stacks",
    "Jamaican reggae and dub influences: prominent offbeat guitar chops, deep syncopated basslines, and tape echo",
    "American country bluegrass banjo fingerpicking and acoustic fiddle ornamentation over waltz time signatures",
    "Orchestral disco four-on-the-floor kick patterns accompanied by lush sweeping violins and brass fanfares"
  ];

  // Q10
  qs[9].options = [
    "A digital reverse-reverb processor with algorithmic diffusion controls",
    "Electro-Harmonix Small Clone (analog bucket-brigade chorus pedal)",
    "An optical pitch-tracking auto-tune vocoder stompbox unit with MIDI",
    "A high-gain silicon fuzz face distortion pedal with dying batteries"
  ];

  // Q11
  qs[10].options = [
    "A slow, unmetered acoustic folk ballad tempo featuring fingerpicked acoustic flat-top guitars and harmonicas",
    "A driving four-on-the-floor disco drum beat paired with sixteenth-note synthesizer arpeggios and punchy bass",
    "A half-time hip-hop breakbeat rhythm featuring sampled vinyl scratch loops and syncopated 808 sub-bass drops",
    "A traditional Jamaican rocksteady shuffle rhythm featuring syncopated upright bass and staccato brass stabs"
  ];

  // Q12
  qs[11].options = [
    "Operatic bel canto vocal technique featuring pristine Italian diction and wide classical dynamic projection",
    "Unfiltered regional British accents, aggressive conversational delivery, and confrontational socio-political lyrics",
    "Whispered, breathy vocal delivery recorded through vintage ribbon microphones with heavy high-frequency roll-off",
    "Synthesized robotic vocoder vocals processed through extreme autotune pitch-correction software algorithms"
  ];

  updateQuizFile('punk', qs);
}

// 4. HIP HOP QUIZ
function balanceHipHop() {
  const qs = JSON.parse(fs.readFileSync('scripts/hiphop_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Chic's disco anthem 'Good Times' (specifically Bernard Edwards' iconic bassline and Nile Rodgers' guitar)",
    "Led Zeppelin's hard rock drum groove from 'When the Levee Breaks' played backward through a tape flanger",
    "A synthesized 16th-note modular sequencer bassline taken directly from Donna Summer's track 'I Feel Love'",
    "An acoustic Delta blues flat-top guitar chord progression sampled from vintage Robert Johnson 78 rpm shellac"
  ];

  // Q2
  qs[1].options = [
    "Using two copies of the same vinyl record on two turntables to isolate and extend the drum break indefinitely",
    "Placing a bucket-brigade analog delay stompbox between the phono cartridge preamp and commercial PA speakers",
    "Manually cutting and micro-splicing 1/4-inch analog master tape loops using razor blades and splicing blocks",
    "Triggering digital 16-bit stereo drum samples from an external MIDI sequencer connected to personal computers"
  ];

  // Q3
  qs[2].options = [
    "The Isley Brothers' funk anthem 'Footsteps in the Dark' (rhythm guitar, drum break, and gentle electric piano)",
    "Parliament's P-Funk anthem 'Flash Light' (Minimoog multi-tracked bassline and overdriven vocal scat phrases)",
    "James Brown's funk groove 'Funky Drummer' (Clyde Stubblefield's solo drum break played at accelerated tempo)",
    "Stevie Wonder's clavinet riff from 'Superstition' running into an envelope filter pedal with spring reverb"
  ];

  // Q4
  qs[3].options = [
    "Its 12-bit / 26.04 kHz sampling rate, analog SSM2044 low-pass filter chips, and pitching samples down for grit",
    "Its 24-bit / 96 kHz high-definition digital audio converters that produced completely clean, transparent audio",
    "Its integrated vacuum tube preamplifier stage that added warm second-order harmonic distortion to all inputs",
    "Its massive 500 MB internal hard drive that allowed producers to store complete multi-track audio arrangements"
  ];

  // Q5
  qs[4].options = [
    "Sixteen velocity-sensitive rubber pads, intuitive 16-step sequencing, and a signature non-quantized swing feel",
    "A built-in 88-key weighted piano hammer action keyboard capable of streaming orchestral multi-sample libraries",
    "A direct-to-vinyl disc cutting mechanism that pressed immediate 12-inch test acetates inside the control room",
    "Integrated speech-recognition software that converted spoken freestyle rhymes into MIDI notation automatically"
  ];

  // Q6
  qs[5].options = [
    "Fast, aggressive, heavily distorted guitar power chords running through high-gain Marshall valve amplifier stacks",
    "A high-pitched, gliding sine/sawtooth lead melody played on an analog synthesizer (e.g., Minimoog or ARP Pro-Soloist)",
    "Acoustic upright grand pianos playing complex syncopated Latin montuno chord patterns with brass accompaniments",
    "Dissonant, atonal orchestral string arrangements performing screeching avant-garde glissandos behind the verses"
  ];

  // Q7
  qs[6].options = [
    "It triggers an uncompressed 16-bit acoustic recording of a Ludwig 26-inch marching bass drum stored on ROM chips",
    "A bridged-T network oscillator produces a pure sine-wave pulse with a pitch envelope that decays into deep sub-bass",
    "It passes white noise through an analog bucket-brigade flanger pedal with high resonance to create ringing tones",
    "It uses frequency modulation (FM) synthesis with four digital operators generating complex harmonic overtones"
  ];

  // Q8
  qs[7].options = [
    "Live acoustic drum kits recorded with vintage ribbon microphones in stone hallways with minimal post-production EQ",
    "Rapid 32nd-note pitched hi-hat rolls, heavily distorted 808 sub-bass glides, sparse claps, and minor-key melody loops",
    "Four-on-the-floor kick patterns paired with continuous 16th-note synthesizer basslines and acoustic horn section stabs",
    "Unquantized live percussion ensembles featuring congas, bongos, and timbales tracked live to 2-inch 24-track tape"
  ];

  // Q9
  qs[8].options = [
    "Steep low-pass filtering on samples to isolate the bassline, layered with a separate high-pass filtered drum break",
    "Boosting 10 kHz with a high-shelf equalizer while carving out all fundamental frequencies below 500 Hz completely",
    "Applying an aggressive brickwall notch filter centered strictly at 1 kHz to create a heavily scooped midrange tone",
    "Running the entire mix through an analog telephone filter to simulate the acoustic frequency response of phonographs"
  ];

  // Q10
  qs[9].options = [
    "To add three seconds of ambient hall reverberation to the kick drum every time the bass synthesizer plays a note",
    "To temporarily duck (attenuate) the 808 sub-bass level whenever the kick strikes, preventing low-end masking and mud",
    "To pitch-shift the 808 sub-bass upwards by an octave whenever the vocalist speaks to create harmonic vocal doubling",
    "To eliminate all low frequencies below 200 Hz to ensure the track will sound loud on miniature mobile phone speakers"
  ];

  // Q11
  qs[10].options = [
    "An autotuned robotic vocoder vocal preset processed through extreme stereo chorus and analog bucket-brigade delays",
    "A vintage, gritty vinyl sample of Labi Siffre's 1975 acoustic soul-folk recording 'I Got The...' pitched up slightly",
    "A synthesized FM brass preset programmed on a Yamaha DX7 keyboard running through a solid-state distortion stompbox",
    "An unamplified acoustic string quartet recorded live inside an echo chamber using coincident stereo ribbon microphones"
  ];

  // Q12
  qs[11].options = [
    "Golden Age relied on SP-1200/MPC sampling of vinyl; Trap uses DAW software, MIDI sequencing, pitched 808s, and fast hi-hat rolls",
    "Golden Age relied exclusively on analog synthesizers and live brass; Trap is recorded live by 40-piece symphony orchestras",
    "Golden Age was produced at 160 BPM with distorted guitars; Trap is recorded at 50 BPM with unamplified acoustic folk banjos",
    "Golden Age used digital workstations with unlimited audio tracks; Trap is recorded strictly onto 4-track cassette portastudios"
  ];

  updateQuizFile('hiphop', qs);
}

// 5. DANCE QUIZ
function balanceDance() {
  const qs = JSON.parse(fs.readFileSync('scripts/dance_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "A continuous sixteenth-note synthesized bassline driving a four-on-the-floor kick, sequenced using a Moog modular synth",
    "An acoustic double bass walking jazz patterns over a syncopated half-time shuffle beat tracked with a single ribbon mic",
    "An overdriven electric guitar riff playing palm-muted power chords through a 100W Marshall valve stack amplifier",
    "A classical harpsichord arpeggio accompaniment recorded in an echo chamber with a pair of German tube condenser mics"
  ];

  // Q2
  qs[1].options = [
    "A live jazz rhythm section featuring upright bass, acoustic grand piano, and brushes on a snare drum tracked to lacquer",
    "A Roland TR-808 drum machine providing electronic kick and snare patterns, alongside a Roland TB-303 synthesizer bass",
    "A 40-piece classical symphony orchestra recorded live on 2-inch 24-track analog tape inside an acoustic concert hall",
    "A heavy metal band lineup featuring distorted electric guitars, double-kick acoustic drums, and aggressive scream vocals"
  ];

  // Q3
  qs[2].options = [
    "Setting the 18 dB/oct resonant low-pass filter to a fixed frequency and disabling all modulation parameters completely",
    "Manually tweaking the 18 dB/oct resonant low-pass filter cutoff and resonance knobs in real time while a pattern looped",
    "Routing the bassline into an analog bucket-brigade guitar flanger pedal and stepping continuously on the bypass switch",
    "Connecting the synthesizer output to a motorized telephone equalizer that shifted frequency bands every eight measures"
  ];

  // Q4
  qs[3].options = [
    "It used purely acoustic recorded samples stored on 1/4-inch magnetic tape loops driven by miniature electric motors",
    "It featured a hybrid architecture using analog synthesis for kick/toms and 6-bit digital PCM samples for cymbals/hi-hats",
    "It was entirely digital, utilizing 24-bit / 96 kHz uncompressed floating-point audio samples stored on internal hard drives",
    "It generated all percussion sounds by passing white noise through mechanical spring reverberation tanks inside the chassis"
  ];

  // Q5
  qs[4].options = [
    "Merging European electronic minimalism (Kraftwerk) with American funk grooves (George Clinton) and industrial futurism",
    "Blending traditional Jamaican acoustic ska offbeats with American country bluegrass fingerpicking and acoustic banjos",
    "Fusing British punk rock distorted guitar power chords with classical operatic vocal arrangements and pipe organs",
    "Combining Delta blues acoustic slide guitar with 1970s orchestral disco string arrangements and Latin hand percussion"
  ];

  // Q6
  qs[5].options = [
    "A completely clean, transparent audio recording with wide stereo imaging and four seconds of digital hall reverberation",
    "A metallic, fluttering granular texture caused by early timestretching algorithms pitching breaks up without changing length",
    "Extreme analog tape saturation that completely clipped audio peaks into square waves with heavy background 60 Hz hum",
    "A vintage telephone filter effect that carved out all fundamental frequencies below 500 Hz and above 2 kHz completely"
  ];

  // Q7
  qs[6].options = [
    "The 'Supersaw' waveform, which digitally stacked and detuned seven sawtooth waves simultaneously to create huge lead sounds",
    "An analog transistor ladder filter that produced extreme self-oscillation and sub-bass resonance on monophonic basslines",
    "An optical pitch-tracking vocoder circuit that converted vocal speech into polyphonic brass chord progressions via MIDI",
    "A wavetable oscillator bank streaming uncompressed 16-bit acoustic grand piano samples directly from internal ROM memory"
  ];

  // Q8
  qs[7].options = [
    "It removed the steady kick drum on beats 2 and 4, replacing them with syncopated, syncopated kicks and swinging hi-hats",
    "It accelerated the tempo from 130 BPM up to 200 BPM, adding rapid sixteenth-note double-kick heavy metal patterns",
    "It eliminated all basslines and percussion entirely, leaving only spoken-word monologues over ambient synthesizer pads",
    "It introduced rigid 3/4 waltz time signatures featuring acoustic upright double bass walking lines and brush snares"
  ];

  // Q9
  qs[8].options = [
    "To automatically attenuate (duck) the synth volume whenever the kick drum hits, creating pumping groove and low-end clarity",
    "To pitch-shift the synthesizer chords upwards by an octave every time the snare drum strikes to create harmonic doubling",
    "To add three seconds of lush digital hall reverberation across the stereo master bus whenever the lead vocal stops singing",
    "To eliminate all audio frequencies below 150 Hz to prevent low-end needle skips when mastering 7-inch 45 RPM vinyl discs"
  ];

  // Q10
  qs[9].options = [
    "High-pass filter sweeps removing bass, accelerating snare rolls, pitch risers, noise sweeps, and silence before the drop",
    "Gradually slowing down the tempo by 50% while adding heavy tape slapback echo and acoustic classical guitar arpeggios",
    "Muting all electronic instruments and bringing in a live 20-piece brass big band to play unamplified acoustic swing solos",
    "Reversing the entire master tape playback during the build section to generate psychedelic backward backward audio loops"
  ];

  // Q11
  qs[10].options = [
    "Disabling DAW grid snap to sequence swung syncopated percussion, layered with vinyl crackle and pitch-shifted vocal chops",
    "Recording all tracks live in an acoustically treated cathedral using a single pair of Blumlein figure-8 ribbon microphones",
    "Using FM synthesis operators to produce mathematically perfect, rigid 16th-note arpeggios locked to a master MIDI clock",
    "Tracking electric guitars through high-gain valve amplifiers placed inside soundproof acoustic isolation booths in London"
  ];

  // Q12
  qs[11].options = [
    "'Organ 2' (a bright, percussive digital organ preset that became the defining bass/hook sound of 1990s house)",
    "'Slap Bass 1' (an analog synthesis bass patch featuring heavy optical compression and acoustic body resonance)",
    "'Grand Piano' (a dark, uncompressed classical acoustic piano sample recorded inside a reverberant stone room)",
    "'Choir Oohs' (a synthesized vocal pad preset running through an analog bucket-brigade stereo chorus stompbox)"
  ];

  updateQuizFile('dance', qs);
}

// 6. HOUSE QUIZ
function balanceHouse() {
  const qs = JSON.parse(fs.readFileSync('scripts/house_raw.json', 'utf8'));

  // Q1
  qs[0].options = [
    "Post-disco club culture (The Warehouse, Frankie Knuckles), cheap drum machines, and budget Japanese analog synthesizers",
    "High-budget commercial recording facilities in London experimenting with 48-track digital tape and symphonic brass arrangements",
    "Acoustic folk coffeehouse venues in New York promoting unamplified fingerstyle acoustic guitars and socio-political lyricism",
    "Heavy metal stadium rock bands looking for high-gain valve amplifier distortion and aggressive double-kick drum patterns"
  ];

  // Q2
  qs[1].options = [
    "Roland TR-808 drum machine, Roland TB-303 bass synthesizer, and a Korg Poly-61 keyboard tracked to multi-track tape",
    "Acoustic upright grand piano, double bass, and an acoustic drum kit miked with a single overhead ribbon microphone",
    "A 40-piece classical symphony orchestra recorded live on lacquer master discs inside an acoustically resonant concert hall",
    "Two distorted electric guitars running through 100W Marshall valve stack amplifiers with aggressive silicon fuzz pedals"
  ];

  // Q3
  qs[2].options = [
    "Strummed acoustic flat-top guitar chords recorded through an optical leveling amplifier with vintage plate reverb",
    "A rhythmic, persistent, syncopated acoustic piano chord progression driving the energetic four-on-the-floor groove",
    "A monophonic synthesizer lead sound featuring heavy distortion and pitch-shifting modulation pedal effects",
    "An unamplified brass section playing tightly synchronized unison stabs recorded around a central ribbon mic"
  ];

  // Q4
  qs[3].options = [
    "By programming an 8-bit digital drum machine to trigger orchestral brass samples from internal EPROM chips",
    "By manipulating the resonance and cutoff frequency knobs of a Roland TB-303 bass synthesizer live while it looped",
    "By running an electric bass guitar through an overdriven valve amplifier and an analog envelope filter stompbox",
    "By splicing physical 1/4-inch magnetic tape recordings together with razor blades to create sudden pitch jumps"
  ];

  // Q5
  qs[4].options = [
    "Kick drum on beats 1 and 3, snare drum rim-clicks on beat 2, and open hi-hat cymbals on the downbeat of beat 4",
    "Kick on every quarter note (1, 2, 3, 4), claps/snare on beats 2 and 4, and an open hi-hat on the offbeat eighth notes",
    "Kick drum strictly on beat 1, syncopated snare rolls on beat 3, and closed hi-hats playing triplet swing rhythms",
    "Continuous sixteenth-note kick drum rolls accompanied by trashy open crash cymbals on every single quarter note"
  ];

  // Q6 - short answers, all balanced at ~25 chars
  qs[5].options = [
    "'Love Can't Turn Around'",
    "'Jack Your Body' (JM Silk)",
    "'Move Your Body' (Jefferson)",
    "'Acid Tracks' (Phuture)"
  ];

  // Q7
  qs[6].options = [
    "Loleatta Holloway's vocal from 'Love Sensation' (1980), sampled from vinyl using an Akai S900 digital sampler",
    "A live studio vocal performance recorded with a Neumann U47 tube microphone inside an acoustic vocal booth",
    "An artificial vocal synthesized using early speech synthesis software operating on a Commodore 64 computer",
    "A vocal track sampled from a vintage 1930s Delta blues field recording archived at the Library of Congress"
  ];

  // Q8
  qs[7].options = [
    "Whispered, breathy spoken-word monologues recorded through telephone band-pass filters with minimal processing",
    "Powerful, soaring, gospel-influenced lead vocal performances tracked with high-end condenser mics and plate reverb",
    "Heavily autotuned robotic vocoder vocals processed through extreme pitch correction algorithms and digital distortion",
    "Classical operatic soprano vibrato singing complex Italian arias accompanied by unamplified acoustic guitars"
  ];

  // Q9
  qs[8].options = [
    "An acoustic upright double bass recorded with a single dynamic microphone in an acoustically deadened studio room",
    "A bright, punchy, percussive digital organ bassline generated by the Korg M1 synthesizer (specifically preset Organ 2)",
    "A heavily distorted valve bass tone pushed into aggressive fuzz clipping via an analog guitar effects pedal",
    "An analog synthesizer sub-bass drone running through a resonant low-pass filter with zero high-frequency presence"
  ];

  // Q10
  qs[9].options = [
    "Applying three seconds of cavernous digital hall reverberation across every individual channel strip in the mix",
    "Sampling two-bar disco vinyl loops, filtering the bass, and applying extreme sidechain compression from the kick drum",
    "Recording live 30-piece classical string orchestras in acoustic soundstages using coincident stereo microphone pairs",
    "Replacing all electronic synthesizers and drum machines with acoustic flat-top guitars and upright double basses"
  ];

  // Q11
  qs[10].options = [
    "He replaced the acoustic rhythm with a four-on-the-floor kick, rolling syncopated house drums, and a pumping bass groove",
    "He removed all vocals and converted the track into an experimental atonal ambient drone piece using modular synthesizers",
    "He hired a heavy metal guitarist to record distorted power chords through a 100W Marshall valve stack amplifier",
    "He slowed the tempo down to 60 BPM and arranged the song for an acoustic bluegrass ensemble featuring banjos and fiddles"
  ];

  // Q12
  qs[11].options = [
    "1980s Chicago house used raw Roland gear (TR-707/909, TB-303) and tape; 1990s house added digital samplers, Korg M1, and polished vocal mixes",
    "1980s Chicago house relied exclusively on live classical orchestras; 1990s house was performed entirely by acoustic folk singer-songwriters",
    "1980s Chicago house was recorded at 180 BPM with heavy metal guitars; 1990s house was played at 50 BPM with unamplified upright double basses",
    "1980s Chicago house used digital audio workstations with 128 tracks; 1990s house was tracked direct to lacquer disc in single live takes"
  ];

  updateQuizFile('house', qs);
}

balanceCommercialPop();
balanceMetal();
balancePunk();
balanceHipHop();
balanceDance();
balanceHouse();
