const fs = require('fs');

function balanceFolk() {
  const file = 'public/folk-interactive-quiz.html';
  let content = fs.readFileSync(file, 'utf8');
  const match = content.match(/const questions\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/);
  const questions = eval(match[1]);

  // Q1
  questions[0].correct = "It captures a balanced blend of string articulation and body resonance while avoiding boomy low-frequency sound hole buildup";
  questions[0].wrong = [
    "The guitar sound hole radiates excessive high-frequency treble harmonics that create harsh acoustic sibilance in the stereo recording",
    "Air turbulence escaping directly from the guitar sound hole causes physical acoustic wind pressure that tears condenser membranes",
    "The 12th fret position aligns with electromagnetic pickup induction coils, maximizing electrical output to the microphone preamp"
  ];

  // Q2
  questions[1].correct = "Because sound waves arrive at both coincident capsules simultaneously, there is virtually zero phase cancellation when summed to mono";
  questions[1].wrong = [
    "It creates an exaggerated, ultra-wide artificial stereo spread that completely eliminates all natural acoustic room reverberation reflections",
    "It allows recording engineers to boost low-end fundamentals independently across the stereo bus without using dedicated analog equalizers",
    "It automatically eliminates background spill from accompanying instruments in the live room using continuous acoustic phase cancellation"
  ];

  // Q3
  questions[2].correct = "Their low-mass diaphragms provide ultra-fast transient response and transparent high-frequency capture of intricate string attack";
  questions[2].wrong = [
    "Their integrated vacuum tube preamplifiers generate heavy harmonic distortion and gritty clipping on delicate fingerstyle guitar passages",
    "Their large, heavy diaphragm membranes accentuate sub-bass frequencies below 40 Hz to make flat-top acoustic guitars resemble upright basses",
    "They require no external phantom power or preamplifiers, allowing them to plug directly into high-impedance instrument amplifier inputs"
  ];

  // Q4
  questions[3].correct = "Using portable disc-cutting phonographs and early field tape recorders transported by car to document musicians in their communities";
  questions[3].wrong = [
    "By transporting rural musicians into commercial multi-track facilities equipped with 24-track tape machines located in Los Angeles studios",
    "Using experimental high-frequency FM radio broadcast transmitters to beam live performances directly to regional radio network antenna towers",
    "By having acoustic folk performers transcribe their arrangements into digital MIDI sequencers operating on early portable laptop computers"
  ];

  // Q5
  questions[4].correct = "Its electro-optical cell provides smooth, program-dependent attack and release times that preserve natural musical dynamic expression";
  questions[4].wrong = [
    "It delivers an instantaneous 20-microsecond brickwall limiting attack designed specifically to eliminate aggressive transient peaks completely",
    "It produces heavy second-order harmonic clipping and digital wave-shaping that adds harsh saturation across delicate acoustic instruments",
    "It functions as an aggressive automated studio noise gate that silences all ambient room tone and string decay whenever the guitarist pauses"
  ];

  // Q6
  questions[5].correct = "Bob Dylan performed an electric set backed by the Paul Butterfield Blues Band, causing controversy among traditional acoustic purists";
  questions[5].wrong = [
    "Pete Seeger destroyed an acoustic flat-top guitar on stage using an axe to protest commercial pop influences entering traditional folk music",
    "The festival banned all unamplified acoustic guitars and mandated that every performing act use synthesized backing tracks and drum machines",
    "Joan Baez debuted the first commercial digital synthesizer workstation, replacing the traditional acoustic flat-top guitar entirely"
  ];

  // Q7 - short answers, all balanced at ~26 chars
  questions[6].correct = "Martin D-28 (Dreadnought)";
  questions[6].wrong = [
    "Fender Stratocaster (Solid)",
    "Gibson Les Paul (Standard)",
    "Rickenbacker 360 (Electric)"
  ];

  // Q8
  questions[7].correct = "Performers gathered in a shared acoustic space without headphones, using physical proximity and microphone null angles to balance levels";
  questions[7].wrong = [
    "Every acoustic performer was isolated in airtight soundproof vocal booths and monitored using multi-channel digital personal mixer stations",
    "Musicians performed separately in distinct live rooms while listening to a pre-recorded digital click track through sealed studio headphones",
    "Engineers recorded every instrument dry through direct injection (DI) boxes and synthesized artificial room reverberation during final mixdown"
  ];

  // Q9
  questions[8].correct = "Sound Techniques (Chelsea, London)";
  questions[8].wrong = [
    "Abbey Road Studios (Studio Two)",
    "Olympic Sound Studios (Barnes)",
    "Trident Recording Studios (Soho)"
  ];

  // Q10
  questions[9].correct = "Figure-8 (bidirectional)";
  questions[9].wrong = [
    "Cardioid (unidirectional)",
    "Omnidirectional (spherical)",
    "Hypercardioid (directional)"
  ];

  // Q11
  questions[10].correct = "A high-end large-diaphragm condenser (e.g. Neumann U67/U87) with a pop shield at close proximity, running into a high-grade preamp";
  questions[10].wrong = [
    "A rugged handheld dynamic stage microphone processed through aggressive pitch correction algorithms and synchronized gated digital reverb",
    "A vintage ceramic crystal microphone plugged directly into an overdriven valve guitar combo amplifier with built-in spring reverb dimed",
    "A pressure-zone boundary microphone taped directly to the hardwood studio floor positioned 15 meters away from the performing vocalist"
  ];

  // Q12
  questions[11].correct = "A gentle high-shelf boost around 10–12 kHz combined with a high-pass filter below 60–80 Hz to eliminate unwanted low-end rumble";
  questions[11].wrong = [
    "A narrow 15 dB resonant peaking boost centered at 250 Hz designed to accentuate the internal body cavity resonance of the guitar sound hole",
    "A steep brickwall low-pass filter cutting off all harmonic frequencies above 4 kHz to emulate the warm acoustic response of vintage cylinders",
    "Surgical parametric notch filtering carving out all midrange frequencies between 1 kHz and 5 kHz to soften the acoustic guitar presence"
  ];

  // Update file
  const newContent = content.replace(/const questions\s*=\s*\[[\s\S]*?\];\s*function shuffle/, 'const questions = ' + JSON.stringify(questions, null, 2) + ';\n\n    function shuffle');
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully balanced folk quiz!');
}

function balanceJazz() {
  const file = 'public/jazz-interactive-quiz.html';
  let content = fs.readFileSync(file, 'utf8');
  const match = content.match(/const questions\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/);
  const questions = eval(match[1]);

  // Q1 (4 chars each) - already balanced: 1917, 1927, 1937, 1947
  // Q2
  questions[1].correct = "Performers clustered around a large acoustic horn that drove a cutting stylus directly into a rotating wax master disc";
  questions[1].wrong = [
    "Instruments were tracked into multi-channel condenser microphones connected to a synchronized 8-track magnetic tape recorder",
    "Each musician was isolated in soundproof vocal booths and monitored through stereo headphone feeds provided by the engineer",
    "Sound was captured by digital boundary microphones on the studio floor and converted into binary optical code on magnetic tape"
  ];

  // Q3
  questions[2].correct = "Powerful low-frequency energy caused the cutting stylus to vibrate excessively, jumping out of the record groove";
  questions[2].wrong = [
    "Early record companies banned bass drums because radio broadcast transmitters could not transmit frequencies below 150 Hz",
    "The acoustic recording horn would physically shatter when exposed to the high acoustic sound pressure levels of drum kicks",
    "Acoustic wax discs had an electrical frequency filter that completely erased all percussive low-frequency audio signals"
  ];

  // Q4
  questions[3].correct = "Figure-8 (bidirectional), allowing two musicians to face each other with maximum rejection at 90-degree side nulls";
  questions[3].wrong = [
    "Cardioid (unidirectional), picking up sound strictly from the front while rejecting all sound arriving from behind the mic",
    "Omnidirectional (spherical), capturing audio equally from all 360-degree directions without proximity effect bass buildup",
    "Hypercardioid (shotgun), using a narrow acoustic interference tube to isolate soloists from extreme distances in the room"
  ];

  // Q5
  questions[4].correct = "Each side held only 3 to 4 minutes, restricting swing arrangements to concise solos and tightly structured forms";
  questions[4].wrong = [
    "Discs could only hold 30 seconds of audio, forcing musicians to record individual verses onto separate disc platters",
    "78 rpm records allowed up to 45 minutes per side, enabling big bands to record entire concert performances in one take",
    "Shellac material melted if played for more than 2 minutes, requiring radio stations to constantly rotate disc playback"
  ];

  // Q6
  questions[5].correct = "Artists could record extended improvisations and full album concepts lasting up to about 22 minutes per side";
  questions[5].wrong = [
    "Recording engineers could record up to 24 discrete tracks of audio simultaneously on a single vinyl microgroove disc",
    "Musicians could overdub additional instrumental solos after tracking using selective magnetic synchronization heads",
    "Record labels could broadcast digital audio over telephone networks without converting sound waves to analog voltage"
  ];

  // Q7
  questions[6].correct = "Flawless musical segments from multiple takes could be physically edited and spliced together using razor blades";
  questions[6].wrong = [
    "Producers could apply digital auto-tune pitch correction across brass solos without introducing audible artifacts",
    "Magnetic tape completely eliminated all ambient background noise, hiss, and spill from the live acoustic tracking room",
    "Tape permitted continuous uninterrupted recording runs lasting over 12 hours without needing to swap supply reels"
  ];

  // Q8
  questions[7].correct = "Strategic close-miking using German tube condenser microphones, capturing intimate, upfront warmth and dynamic punch";
  questions[7].wrong = [
    "Placing a single omnidirectional dynamic microphone in the center of a heavily carpeted room with zero acoustic reflections",
    "Tracking all instruments completely dry through direct injection (DI) transformers and adding synthetic digital reverb later",
    "Recording the entire band outdoors on athletic fields to eliminate room reverberation and preserve natural open-air dynamics"
  ];

  // Q9
  questions[8].correct = "Modal jazz: improvisation guided by musical scales (modes) rather than rapid, complex chord progressions";
  questions[8].wrong = [
    "Bebop jazz: virtuosic up-tempo solos played over intricate altered harmonies with abrupt rhythmic modulations",
    "Free jazz: total abandonment of all fixed tempos, melodic structures, and tonal key centers in favor of pure noise",
    "Dixieland swing: collective polyphonic brass counterpoint performed over a traditional march-style two-beat rhythm"
  ];

  // Q10
  questions[9].correct = "It is composed in an unconventional 5/4 time signature, featuring an extended drum solo by Joe Morello";
  questions[9].wrong = [
    "It was the first jazz recording captured entirely using digital multi-track audio workstations and synthesized bass",
    "It contains no improvised instrumental solos and follows a strictly scored classical twelve-tone serialism method",
    "It features dual electric guitars playing heavily distorted power chords through overdriven valve half-stack amplifiers"
  ];

  // Q11
  questions[10].correct = "Small combos played fast, harmonically complex lines for listening, contrasting with large swing dance orchestras";
  questions[10].wrong = [
    "Large 20-piece brass orchestras performed simplified, slow shuffle ballads intended strictly for ballroom dance audiences",
    "Bebop introduced electric guitars, synthesizers, and disco drum machines to appeal to younger pop music record buyers",
    "Bebop eliminated all improvised solos and required musicians to read through rigidly structured classical orchestral scores"
  ];

  // Q12
  questions[11].correct = "Electric keyboards, tape splicing, echo, and multitrack loops assembled into complex extended arrangements";
  questions[11].wrong = [
    "A single ribbon microphone capturing an unamplified acoustic swing quintet direct to lacquer disc in a single live take",
    "Synthesized FM brass presets sequenced on digital MIDI workstations without using any acoustic or electric instruments",
    "Live big band recordings captured on portable field phonograph disc cutters in rural Southern community dance halls"
  ];

  const newContent = content.replace(/const questions\s*=\s*\[[\s\S]*?\];\s*function shuffle/, 'const questions = ' + JSON.stringify(questions, null, 2) + ';\n\n    function shuffle');
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully balanced jazz quiz!');
}

balanceFolk();
balanceJazz();

function balanceBlues() {
  const file = 'public/blues-interactive-quiz.html';
  let content = fs.readFileSync(file, 'utf8');
  const match = content.match(/const questions\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/);
  const questions = eval(match[1]);

  // Q1: chords (30 chars each) - already balanced
  // Q2
  questions[1].correct = "A vocal phrase answered by an instrumental lick, creating a musical dialogue";
  questions[1].wrong = [
    "A continuous two-part vocal harmony sung in strict parallel thirds and fifths",
    "A technique where the lead singer repeats every single lyrical phrase twice",
    "A choir singing back the chorus while the lead vocalist pauses for breath"
  ];

  // Q3
  questions[2].correct = "Mono, scratchy and noisy with heavy surface crackle, recorded live on a single mic to disc";
  questions[2].wrong = [
    "Clean, ultra-wide stereo recordings tracked across 16 discrete channels with no spill",
    "Multitrack recordings with overdubbed vocal harmonies and clean solid-state compression",
    "Synthetic algorithmic reverb over programmed electronic drum loops with zero noise"
  ];

  // Q4
  questions[3].correct = "Electrical recording with microphones replaced purely acoustic recording horns";
  questions[3].wrong = [
    "Digital audio workstation software replaced mechanical tape splicing razor blades",
    "Solid-state transistors replaced vacuum tubes in preamps, making sound colder",
    "Polyphonic analog synthesizers replaced traditional acoustic hollow-body guitars"
  ];

  // Q5
  questions[4].correct = "Its spun metal resonator cone projected acoustic volume loud enough to cut through noisy rooms";
  questions[4].wrong = [
    "It contained an active battery-powered preamp that eliminated all acoustic string feedback",
    "It had built-in magnetic pickups that plugged directly into high-wattage tube guitar amps",
    "It removed all natural metallic brightness to deliver an ultra-dark acoustic nylon warmth"
  ];

  // Q6
  questions[5].correct = "Continuous pitch glides and expressive microtonal vocal-like inflections";
  questions[5].wrong = [
    "Machine-precise chromatic scales played in rapid 16th-note arpeggiated runs",
    "Muted percussive chop chords that mimic acoustic bluegrass mandolin playing",
    "Strict equal-tempered keyboard pitches with zero vibrato or string bends"
  ];

  // Q7
  questions[6].correct = "To cut through noisy, crowded urban clubs and impart aggressive, singing sustain to notes";
  questions[6].wrong = [
    "To eliminate all distortion and produce a completely sterile, clinical acoustic tone",
    "To emulate the sound of a full brass section using built-in analog synthesizer filters",
    "To comply with local Chicago noise ordinances requiring low-volume electric tracking"
  ];

  // Q8
  questions[7].correct = "He cupped a high-impedance bullet mic and harmonica tightly against a small valve amp";
  questions[7].wrong = [
    "He plugged the harmonica directly into a mixing console through a passive DI box",
    "He played into an expensive German studio condenser microphone placed 2 meters away",
    "He used digital pitch shifters and algorithmic modulation pedals to double his sound"
  ];

  // Q9
  questions[8].correct = "Small valve amplifiers driven to maximum volume until the power tubes clip audio peaks";
  questions[8].wrong = [
    "Digital DSP distortion plugins inserted across clean solid-state console channels",
    "Aggressive dynamic noise gates cutting off the natural acoustic sustain of guitars",
    "Silicon fuzz-face stompbox pedals running on dying batteries to create square waves"
  ];

  // Q10 - short balanced: Chess Records (13), Sun Studios (11), Motown Records (14), Stax Studios (12)
  questions[9].correct = "Chess Records";
  questions[9].wrong = [
    "Sun Studios",
    "Motown Records",
    "Stax Studios"
  ];

  // Q11
  questions[10].correct = "British bands embraced raw American blues, re-exporting it back to international audiences";
  questions[10].wrong = [
    "British rock groups completely abandoned electric guitars in favor of acoustic folk banjos",
    "American blues musicians rejected electric instruments and returned strictly to rural work songs",
    "The blues movement was completely ignored by UK musicians until late 1980s hip-hop sampling"
  ];

  // Q12
  questions[11].correct = "It looped vintage 1930s blues and gospel field recordings over modern electronic breakbeats";
  questions[11].wrong = [
    "It hired original Delta blues artists to re-record their songs with heavy Autotune pitch correction",
    "It transcribed acoustic blues into General MIDI synthesizer files played on 8-bit sound cards",
    "It removed all vocal tracks from classic Chicago recordings and replaced them with heavy metal guitars"
  ];

  const newContent = content.replace(/const questions\s*=\s*\[[\s\S]*?\];\s*function shuffle/, 'const questions = ' + JSON.stringify(questions, null, 2) + ';\n\n    function shuffle');
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully balanced blues quiz!');
}

function balanceFilmGames() {
  const file = 'public/film-games-interactive-quiz.html';
  let content = fs.readFileSync(file, 'utf8');
  const match = content.match(/const questions\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/);
  const questions = eval(match[1]);

  // Q1
  questions[0].correct = "SMPTE Timecode (hours:minutes:seconds:frames), locking audio tape to film reels";
  questions[0].wrong = [
    "MIDI Beat Clock (bars:beats:ticks), syncing analog synthesizers to drum sequencers",
    "Word Clock (kHz), synchronizing digital audio converters across studio network buses",
    "Linear Bar Markers, synchronizing sheet music notation with physical studio stopwatches"
  ];

  // Q2
  questions[1].correct = "An orchestral click track and video visual cues (streamers, punches, and fluttering flashes)";
  questions[1].wrong = [
    "Handheld acoustic metronomes placed beside each string section leader across the live room",
    "Automated MIDI tempo map commands sent to motorized sheet music stands on the soundstage",
    "Continuous verbal instructions and countdowns delivered over a live studio talkback speaker"
  ];

  // Q3
  questions[2].correct = "A center microphone flanked by left and right mics spaced 2 meters apart, 3 meters up";
  questions[2].wrong = [
    "Two coincident figure-8 ribbon microphones angled at 90 degrees placed in the room rear",
    "A single boundary pressure-zone microphone taped directly to the podium floor beside conductor",
    "Four hypercardioid dynamic microphones placed inside the resonating bodies of cello instruments"
  ];

  // Q4
  questions[3].correct = "Two square wave channels (melody/harmony), one triangle wave (bass), one noise (percussion), and one DPCM sample channel";
  questions[3].wrong = [
    "Sixteen polyphonic FM synthesizer operators generating 128-voice stereo orchestral simulations with dynamic chorus effects",
    "Four dedicated wavetable synthesis channels capable of streaming 44.1 kHz / 16-bit uncompressed audio from cartridge ROM",
    "Two analog subtractive saw-tooth oscillators running through voltage-controlled low-pass filters with optical spring reverb"
  ];

  // Q5
  questions[4].correct = "The Genesis used a Yamaha YM2612 FM synthesis chip producing bright, punchy metallic tones, whereas the SNES used sampled audio";
  questions[4].wrong = [
    "The Genesis streamed uncompressed CD-DA digital audio tracks directly from solid-state cartridges, whereas the SNES used 1-bit chiptune beeps",
    "The Genesis relied exclusively on acoustic sound recordings tracked on cassette tape, whereas the SNES generated pure analog square waves",
    "The Genesis was restricted to a single monophonic sine wave channel, whereas the SNES featured 64 discrete physical voice synthesizer voices"
  ];

  // Q6
  questions[5].correct = "Simultaneously running multiple synchronized audio stems whose fader levels dynamically crossfade based on gameplay intensity";
  questions[5].wrong = [
    "Sequentially swapping entire completed stereo audio tracks using rapid crossfades whenever the player character enters a new zone",
    "Triggering one-shot sound effects that pitch-shift upwards in direct proportion to the player character's remaining movement speed",
    "Splitting an audio signal into high, mid, and low frequency bands using multi-band compressors to duck volume during spoken dialogue"
  ];

  // Q7
  questions[6].correct = "Seamlessly branching between different musical sections (intro, loop, transitions, outro) based on player actions and events";
  questions[6].wrong = [
    "Adjusting the master reverb send decay time in real-time as the player moves from open outdoor environments into tight corridors",
    "Playing the entire musical score backward with inverted phase whenever the player character's health drops below a critical point",
    "Summing the stereo audio output into monophonic playback whenever multiple non-player characters are speaking at the exact same time"
  ];

  // Q8 - short balanced at ~15 chars: Yamaha CS-80, Minimoog Model D, Roland TB-303, Korg M1 Synth
  questions[7].correct = "Yamaha CS-80 Polyphonic";
  questions[7].wrong = [
    "Minimoog Model D Analog",
    "Roland TB-303 Bassline",
    "Korg M1 Music Synth"
  ];

  // Q9
  questions[8].correct = "To perform and record everyday sound effects (such as footsteps, cloth rustle, and impacts) in sync with picture on a Foley stage";
  questions[8].wrong = [
    "To compose the main orchestral harmonic themes and conduct instrumental ensembles during high-budget symphonic soundtrack recording",
    "To calibrate acoustic monitor speaker delay times and frequency response curves across commercial surround-sound theatrical auditoriums",
    "To remove background hiss, mechanical HVAC room rumble, and unwanted electrical mains hum from location dialogue audio recordings"
  ];

  // Q10
  questions[9].correct = "Music that exists within the world of the film and can be heard by the characters on screen (e.g. car radio or live bar band)";
  questions[9].wrong = [
    "The background dramatic musical score that accompanies the scene but cannot be heard by the characters inhabiting the story world",
    "Sound effects generated entirely through analog modular synthesizers rather than real-world acoustic physical props on a soundstage",
    "Orchestral overture music that plays exclusively over opening title credits and closing crawl text while no characters are visible"
  ];

  // Q11 - short balanced: MIDI CC11 Expression (21), Pitch Bend Wheel (16), Mod Wheel CC1 (13), Channel Aftertouch (18)
  questions[10].correct = "MIDI CC11 (Expression)";
  questions[10].wrong = [
    "Pitch Bend Wheel Lever",
    "Modulation Wheel (CC1)",
    "Channel Monophonic Touch"
  ];

  // Q12
  questions[11].correct = "It allowed games to stream full 44.1 kHz / 16-bit uncompressed audio (Red Book CD audio), enabling live recorded orchestral scores";
  questions[11].wrong = [
    "It eliminated the need for game audio programmers because CD-ROM discs synthesized live orchestral arrangements automatically using AI",
    "It restricted game developers strictly to 8-bit monophonic square waves because optical laser read speeds were too sluggish for music",
    "It replaced all spoken video game voice acting with scrolling text dialogue because audio files took up too much optical disc storage"
  ];

  const newContent = content.replace(/const questions\s*=\s*\[[\s\S]*?\];\s*function shuffle/, 'const questions = ' + JSON.stringify(questions, null, 2) + ';\n\n    function shuffle');
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully balanced film-games quiz!');
}

balanceBlues();
balanceFilmGames();
