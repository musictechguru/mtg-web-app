const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const courseDataPath = path.join(rootDir, 'src/data/course_data.json');
const fingerprintsPath = path.join(rootDir, 'src/data/fingerprints_data.json');

console.log('--- Starting Part 4 Implementation ---');

// ============================================================================
// 1. BUILD WORKSHEET ACTIVITIES FOR COURSE_DATA.JSON
// ============================================================================

const worksheetQ5 = {
  id: 'worksheet-ao3-ao4-q5',
  title: 'AO3 vs AO4 Essay Workshop: Component 3 Question 5 (15 Marks)',
  type: 'lp_activity',
  description: 'Master the difference between technical description (AO3) and contextual impact / sonic evaluation (AO4) to score top bands in Edexcel Component 3 Question 5 (15 Marks).',
  tracks: [
    {
      title: 'Pink Floyd (1979) vs Scissor Sisters (2004) — Comfortably Numb',
      artist: 'Pink Floyd vs Scissor Sisters',
      era: '1970s Analogue Rock vs 2000s Electro-Pop/Disco',
      videoId: '_FrOQC-zEog',
      questions: [
        {
          id: 'q1_drums',
          label: 'Acoustic Capture vs Electronic Programming (Drums)',
          helperText: 'Select the statement that best synthesizes technical identification (AO3) with sonic and genre evaluation (AO4).',
          type: 'mcq',
          options: [
            {
              text: 'Pink Floyd captures Nick Mason\'s Ludwig acoustic kit in Britannia Row studios using close dynamic/condenser mics and ambient room pairs to retain organic transient dynamics and natural room spill, whereas Scissor Sisters employ 16-step grid-quantised electronic samples with compressed transient punch and gated sub-frequencies designed to maintain maximum energy on 2000s club sound systems.',
              score: 3,
              summary: 'Drums: Pink Floyd captured acoustic drum kit with organic room bleed and natural dynamic response, whereas Scissor Sisters utilized 16-step grid-quantised electronic samples optimized with heavy dynamic compression for 2000s club dancefloors (AO3+AO4 Level 3).'
            },
            {
              text: 'Pink Floyd used an acoustic drum kit recorded with studio microphones onto multitrack tape, while Scissor Sisters used programmed electronic drum samples and a MIDI sequencer.',
              score: 2,
              summary: 'Drums: Pink Floyd recorded real drums on tape while Scissor Sisters used programmed electronic drum samples (AO3 descriptive only).'
            },
            {
              text: 'Pink Floyd\'s drums sound acoustic and slow with rock dynamics, while the Scissor Sisters version has fast four-on-the-floor disco dance beats.',
              score: 1,
              summary: 'Drums: Pink Floyd sounds like slow rock while Scissor Sisters sounds like disco dance (Level 1 basic).'
            },
            {
              text: 'Both recordings used MIDI electronic drum triggers recorded directly into digital audio workstations without any microphones.',
              score: 0,
              summary: 'Drums: Inaccurate technical claim regarding electronic triggers in 1979.'
            }
          ]
        },
        {
          id: 'q2_vocals',
          label: 'Vocal Processing & Sonic Space (Vocals)',
          helperText: 'Examine how microphone selection, pitch correction, dynamic control, and spatial effects shape the vocal aesthetic.',
          type: 'mcq',
          options: [
            {
              text: 'Gilmour and Waters\' 1979 lead vocals feature U87 condenser capture with subtle 1176 FET analogue limiting and EMT 140 plate reverb creating an intimate, hallucinatory space, whereas Jake Shears\' 2004 vocal uses a falsetto delivery treated with aggressive Antares Auto-Tune pitch correction, fast VCA compression, and high-shelf EQ boost (>10 kHz) to achieve upfront modern pop sheen and commercial cut-through.',
              score: 3,
              summary: 'Vocals: Gilmour/Waters utilized U87 condensers, 1176 analogue limiting, and EMT 140 plate reverb for dynamic intimacy, compared to Shears\' 2004 falsetto treated with pitch correction, VCA compression, and high-shelf air boost for modern pop brightness (AO3+AO4 Level 3).'
            },
            {
              text: 'Pink Floyd has natural male vocals with analogue plate reverb and compressor leveling, while Scissor Sisters has high falsetto vocals with digital auto-tune and bright EQ.',
              score: 2,
              summary: 'Vocals: Natural vocals with plate reverb vs falsetto with autotune and bright EQ (AO3 descriptive only).'
            },
            {
              text: 'The 1979 vocal sounds dark, emotional, and spaced out, whereas the 2004 vocal sounds energetic, camp, and very high pitched.',
              score: 1,
              summary: 'Vocals: Emotional and spaced out vs energetic and high pitched (Level 1 basic).'
            },
            {
              text: 'Pink Floyd used robotic vocoders on the verse vocals, while Scissor Sisters used an unamplified carbon mic.',
              score: 0,
              summary: 'Vocals: Inaccurate technical classification.'
            }
          ]
        },
        {
          id: 'q3_guitars_synths',
          label: 'Instrumentation: Guitar Lead vs Synth-Driven Texture',
          helperText: 'Contrast David Gilmour\'s iconic analogue guitar chain with Scissor Sisters\' electronic arpeggiators and synthesizers.',
          type: 'mcq',
          options: [
            {
              text: 'Gilmour\'s legendary 1979 guitar solo relies on a Stratocaster routed into an Electro-Harmonix Big Muff Pi fuzz, Electric Mistress flanger, and Hiwatt DR103 tube amps with stereo delay imaging, creating sustained expressive harmonics; conversely, Scissor Sisters replace guitar-driven dynamics with Roland analog-modeling synth arpeggios, sidechained filter sweeps, and pumping synth basslines.',
              score: 3,
              summary: 'Instrumentation: Gilmour\'s Stratocaster was processed through Big Muff fuzz, Electric Mistress flanging, and Hiwatt tube heads for expressive harmonic sustain, whereas Scissor Sisters replaced guitar solos with electronic synth arpeggios, filter sweeps, and sidechained basslines (AO3+AO4 Level 3).'
            },
            {
              text: 'Pink Floyd features an electric guitar solo played with distortion pedals and tube amplifiers, while Scissor Sisters replaces the guitar solo with electronic synthesizers and dance arpeggiators.',
              score: 2,
              summary: 'Instrumentation: Electric guitar with distortion pedals vs synthesizers and dance arpeggios (AO3 descriptive only).'
            },
            {
              text: 'Pink Floyd is centered around traditional rock instruments like guitar and bass, while the 2004 track sounds like electronic dance club music.',
              score: 1,
              summary: 'Instrumentation: Traditional rock instruments vs electronic dance club music (Level 1 basic).'
            },
            {
              text: 'Both tracks feature identical clean acoustic guitar arpeggios recorded using stereo Blumlein ribbon microphone pairs.',
              score: 0,
              summary: 'Instrumentation: Inaccurate claim of acoustic guitar Blumlein capture.'
            }
          ]
        },
        {
          id: 'q4_stereo',
          label: 'Stereo Field, Panning & Spatial Placement',
          helperText: 'Analyze how spatial dimension, width, and mono compatibility are balanced across both eras.',
          type: 'mcq',
          options: [
            {
              text: 'The 1979 mix demonstrates wide cinematic panning on stereo acoustic guitars, rotary Leslie speaker modulation, and Michael Kamen\'s orchestral strings spanning across the soundstage; the 2004 production employs ultra-wide stereo synth widening and ping-pong delay effects while strictly collapsing the kick, bassline, and lead vocal to mono center for phase stability on club sound systems.',
              score: 3,
              summary: 'Stereo: Pink Floyd created an expansive cinematic soundstage with wide-panned acoustic guitars and orchestral strings, whereas Scissor Sisters utilized stereo synth widening with strictly centered mono kick/bass for club system phase coherence (AO3+AO4 Level 3).'
            },
            {
              text: 'Pink Floyd pans instruments like guitars and orchestra to the left and right speakers, while Scissor Sisters has wide stereo synthesizers and delay effects.',
              score: 2,
              summary: 'Stereo: Panned guitars and orchestra vs wide stereo synths and delays (AO3 descriptive only).'
            },
            {
              text: 'Both songs are mixed in stereo and sound good through headphones.',
              score: 1,
              summary: 'Stereo: Both songs are in stereo (Level 1 basic).'
            },
            {
              text: 'Pink Floyd\'s track was recorded in mono because multitrack stereo had not yet been invented in 1979.',
              score: 0,
              summary: 'Stereo: Inaccurate historical claim that 1979 was mono.'
            }
          ]
        },
        {
          id: 'q5_dynamics_context',
          label: 'Dynamic Range, Loudness & Technological Context',
          helperText: 'Evaluate the crest factor, master limiting, and the socio-technological playback context of both releases.',
          type: 'mcq',
          options: [
            {
              text: 'The 1979 production preserves a generous dynamic range (over 14 dB crest factor) allowing dramatic emotional build-up into the chorus and solo, governed by 2-inch 24-track tape and analogue consoles; conversely, the 2004 master reflects the peak \'Loudness War\' era, heavily brickwall limited with low crest factor (<7 dB RMS / -8 LUFS) to ensure competitive volume on commercial radio, club PAs, and MP3 players.',
              score: 3,
              summary: 'Dynamics & Context: The 1979 recording retains an expansive 14+ dB crest factor on analogue tape for dramatic dynamic contrast, whereas the 2004 master exemplifies Loudness War digital brickwall peak limiting (<7 dB crest factor) optimized for club PAs and commercial radio (AO3+AO4 Level 3).'
            },
            {
              text: 'Pink Floyd\'s master is quieter with more dynamic variation between soft verses and loud choruses, whereas Scissor Sisters is consistently loud due to digital mastering limiters.',
              score: 2,
              summary: 'Dynamics & Context: Quiet verses/loud choruses on tape vs consistently loud digital limiter master (AO3 descriptive only).'
            },
            {
              text: 'The old version gets louder during the guitar solo, while the new version is just loud all the way through.',
              score: 1,
              summary: 'Dynamics & Context: Gets louder in the solo vs loud all the way through (Level 1 basic).'
            },
            {
              text: 'Pink Floyd clipped their analogue master tapes to create digital square waves, whereas Scissor Sisters avoided all compression.',
              score: 0,
              summary: 'Dynamics & Context: Inaccurate technical claim.'
            }
          ]
        }
      ],
      exemplar: `[EXAMINER MARK SCHEME MODEL ANSWER — 15/15 MARKS]

1. CAPTURE & DRUMS (AO3/AO4):
Pink Floyd's 1979 recording utilizes an acoustic Ludwig kit captured live in Britannia Row Studios. Close dynamic mics (Shure SM57 on snare, AKG D12 on kick) paired with Neumann U87 overheads and room ambient pairs preserve natural transient dynamics, room bleed, and realistic acoustic decay. In stark contrast, Scissor Sisters' 2004 electro-pop cover eliminates acoustic room bleed, constructing the groove with 16-step grid-quantized electronic 808/909 samples. The kick features heavy transient shaping and gated sub-bass frequencies specifically engineered to drive high-SPL club sound systems.

2. VOCAL PROCESSING (AO3/AO4):
David Gilmour and Roger Waters' vocals in 1979 were captured via large-diaphragm Neumann U87 condenser microphones through an EMI/Neve console, leveled gently with an 1176 FET compressor and bathed in an Abbey Road EMT 140 plate reverb. This creates an intimate, melancholic, and hallucinatory atmosphere fitting the conceptual narrative. Jake Shears' 2004 vocal adopts a high Bee Gees-inspired falsetto, heavily treated with Antares Auto-Tune pitch correction, aggressive VCA compression (fast attack, pumping release), and an extreme high-shelf boost (>10 kHz) to achieve modern commercial pop brightness and cutting presence above dense synthesizers.

3. INSTRUMENTATION & LEAD TEXTURE (AO3/AO4):
The focal point of Pink Floyd's production is Gilmour's legendary guitar solo, crafted using a 1969 Fender Stratocaster routed through an Electro-Harmonix Big Muff fuzz, Electric Mistress flanger, and Hiwatt DR103 valve heads, enhanced by stereo tape delay for sustained harmonic richness. Scissor Sisters boldly replace the organic guitar solo with an electronic dance breakdown driven by Roland synthesizer arpeggios, automated resonant high-pass filter sweeps, and sidechain-ducked chords, completely shifting the genre from progressive art-rock to euphoric 2000s disco-pop.

4. STEREO IMAGING & SPATIAL ENVIRONMENT (AO3/AO4):
Pink Floyd creates an expansive, cinematic three-dimensional stereo soundstage. Wide acoustic guitar doublings, Leslie rotary speaker cabinet modulation, and Michael Kamen's orchestral string arrangements span across the stereo field, providing deep depth of field. Scissor Sisters adopt modern dance stereo principles: extreme stereo widening and ping-pong delays on secondary synths, while strictly collapsing the kick, bassline, and lead vocal to mono center to prevent phase cancellation on commercial dancefloor sound systems.

5. DYNAMIC RANGE & TECHNOLOGICAL CONTEXT (AO3/AO4):
Pink Floyd recorded to 2-inch 24-track analogue tape across multiple synced Studer A800 machines, resulting in warm tape saturation, subtle high-frequency smoothing, and a wide dynamic crest factor (>14 dB) that allows the song to organically erupt into the guitar solo. Scissor Sisters recorded in a digital DAW environment during the height of the 2000s 'Loudness War'. Heavy digital lookahead brickwall peak limiting crushed the dynamic range (<7 dB crest factor / -8 LUFS), sacrificing micro-dynamics for sheer perceived volume on commercial radio, dance clubs, and early digital MP3 players.`
    },
    {
      title: 'Cameo (1986) vs Korn (2004) — Word Up!',
      artist: 'Cameo vs Korn',
      era: '1980s Electro-Funk vs 2000s Nu-Metal / Heavy Rock',
      videoId: 'MZjAantupsA',
      questions: [
        {
          id: 'q1_cameo_drums',
          label: 'Drum Production: LinnDrum vs Aggressive Acoustic Kit',
          helperText: 'Evaluate the transition from 1980s digital drum sampling to 2000s heavy rock acoustic capture.',
          type: 'mcq',
          options: [
            {
              text: 'Cameo utilizes a digital LinnDrum machine featuring 8-bit/28kHz Eprom samples layered with gated non-linear plate reverb, creating an iconic rigid 1980s electro-funk groove; Korn replaces this with David Silveria\'s live acoustic Tama drum kit, captured with close mics and crushed with distressor compression for aggressive sub-bass kick impact and metallic snare ring.',
              score: 3,
              summary: 'Drums: Cameo used LinnDrum 8-bit Eprom samples with gated reverb, whereas Korn recorded a live acoustic kit crushed with dynamic distressor compression for modern metal punch (AO3+AO4 Level 3).'
            },
            {
              text: 'Cameo used a drum machine with gated reverb, while Korn used a live drummer with an acoustic drum kit and rock compression.',
              score: 2,
              summary: 'Drums: Drum machine with gated reverb vs live acoustic rock drummer (AO3 descriptive only).'
            },
            {
              text: 'The 1986 beat is robotic funk dance, while the 2004 drums sound like heavy metal.',
              score: 1,
              summary: 'Drums: Robotic funk vs heavy metal (Level 1 basic).'
            },
            {
              text: 'Both tracks used an acoustic Ludwig kit played with jazz brushes in an open orchestral hall.',
              score: 0,
              summary: 'Drums: Inaccurate drum capture classification.'
            }
          ]
        },
        {
          id: 'q2_cameo_bass',
          label: 'Low-End Foundation: Synth Bass vs 7-String Detuned Bass',
          helperText: 'Analyze how the fundamental low-end energy is engineered in each production.',
          type: 'mcq',
          options: [
            {
              text: 'Cameo\'s low end is anchored by a Roland Jupiter-8 / Minimoog analogue synth bass patch with punchy filter envelope decay and snappy resonance; Korn\'s Fieldy delivers his signature percussive clack using an Ibanez 5/6-string bass tuned down to A, heavily scooped in the mid frequencies (400-800 Hz) with boosted sub-bass (50 Hz) and clicky treble (3-4 kHz).',
              score: 3,
              summary: 'Bass: Cameo featured Minimoog/Jupiter-8 synth bass with fast filter envelope snap, whereas Korn used Fieldy\'s down-tuned 5-string bass with severe mid-scoop and percussive treble click (AO3+AO4 Level 3).'
            },
            {
              text: 'Cameo has an electronic synthesizer bassline, while Korn has a real bass guitar that is heavily distorted and detuned.',
              score: 2,
              summary: 'Bass: Synthesizer bassline vs distorted detuned bass guitar (AO3 descriptive only).'
            },
            {
              text: 'Cameo\'s bass sounds like funk, while Korn\'s bass sounds noisy and heavy.',
              score: 1,
              summary: 'Bass: Funk bass vs noisy heavy bass (Level 1 basic).'
            },
            {
              text: 'Cameo used an upright acoustic double bass captured with a single ribbon mic.',
              score: 0,
              summary: 'Bass: Inaccurate upright double bass claim.'
            }
          ]
        },
        {
          id: 'q3_cameo_vocals',
          label: 'Vocal Styling & Processing',
          helperText: 'Contrast Larry Blackmon\'s nasal funk delivery with Jonathan Davis\' multi-layered vocal aggression.',
          type: 'mcq',
          options: [
            {
              text: 'Larry Blackmon\'s 1986 vocals feature nasal formant delivery with slapback delay, Eventide H910 micro-pitch shifting, and aggressive mid-range EQ peak at 2.5 kHz; Jonathan Davis\' 2004 performance combines intimate whispered multi-tracks with distorted screams, processed through high-gain preamp overdrive, dark convolution reverb, and modern multi-band compression.',
              score: 3,
              summary: 'Vocals: Blackmon\'s nasal funk vocal used slapback delay and Eventide micro-pitch shift, compared to Davis\' multi-tracked whispers and screaming distorted preamps with multiband control (AO3+AO4 Level 3).'
            },
            {
              text: 'Cameo has funky nasal vocals with delay and pitch modulation, whereas Korn has aggressive metal vocals with distortion and shouting.',
              score: 2,
              summary: 'Vocals: Funky vocal with delay vs aggressive metal vocal with distortion (AO3 descriptive only).'
            },
            {
              text: 'Cameo sounds upbeat and danceable, while Korn sounds angry and loud.',
              score: 1,
              summary: 'Vocals: Upbeat danceable vs angry and loud (Level 1 basic).'
            },
            {
              text: 'Both singers used clean autotuned pitch correction with zero compression or overdrive.',
              score: 0,
              summary: 'Vocals: Inaccurate vocal processing claim.'
            }
          ]
        },
        {
          id: 'q4_cameo_guitars',
          label: 'Guitar Textures: Rhythmic Single-Coil vs Quad-Tracked Wall of Sound',
          helperText: 'Analyze how electric guitars provide rhythmic funk accents vs wall-of-sound distortion.',
          type: 'mcq',
          options: [
            {
              text: 'Cameo treats guitar as a rhythmic spice, featuring clean Stratocaster single-coil chops processed through a Mu-Tron envelope filter and stereo chorus; Korn deploys 7-string Ibanez guitars tuned to A standard, quad-tracked and panned hard left and right through Mesa/Boogie Triple Rectifier valve heads, creating a dense wall of high-gain distortion.',
              score: 3,
              summary: 'Guitars: Cameo used clean funk single-coil chops with envelope filtering and chorus, contrasted with Korn\'s quad-tracked 7-string guitars through Mesa/Boogie Rectifiers panned hard L/R (AO3+AO4 Level 3).'
            },
            {
              text: 'Cameo has clean funk guitar scratching, while Korn has heavy distorted electric guitars panned to the sides.',
              score: 2,
              summary: 'Guitars: Clean funk scratching vs heavy distorted electric guitars (AO3 descriptive only).'
            },
            {
              text: 'Cameo has barely any guitar, whereas Korn is a guitar-heavy rock track.',
              score: 1,
              summary: 'Guitars: Barely any guitar vs guitar-heavy rock (Level 1 basic).'
            },
            {
              text: 'Neither track contains any electric guitars whatsoever.',
              score: 0,
              summary: 'Guitars: Factually incorrect assertion.'
            }
          ]
        },
        {
          id: 'q5_cameo_space',
          label: 'Stereo Field & Era Aesthetics',
          helperText: 'Contrast 1980s outboard hardware spatialization with 2000s digital wall-of-sound mastering.',
          type: 'mcq',
          options: [
            {
              text: 'The 1986 mix is sparse and rhythmic with discrete space between instruments, gated AMS RMX16 reverb tails, and FM synthesizer horns; Korn\'s 2004 production fills every frequency band of the audio spectrum from 30 Hz sub-bass to 15 kHz cymbal sizzle, maximized with digital lookahead limiters for sheer wall-of-sound sonic density.',
              score: 3,
              summary: 'Stereo & Aesthetics: Cameo created a sparse, rhythmic mix with gated digital reverb tails and discrete instrument spacing, while Korn filled the full spectrum with wall-of-sound density and modern brickwall peak limiting (AO3+AO4 Level 3).'
            },
            {
              text: 'Cameo\'s production has clear separation between parts with 80s reverb, whereas Korn\'s mix is very full and loud across all frequencies.',
              score: 2,
              summary: 'Stereo & Aesthetics: Clear separation with 80s reverb vs very full and loud across frequencies (AO3 descriptive only).'
            },
            {
              text: 'Cameo sounds like 80s pop radio, while Korn sounds like 2000s MTV metal.',
              score: 1,
              summary: 'Stereo & Aesthetics: 80s pop radio vs 2000s MTV metal (Level 1 basic).'
            },
            {
              text: 'The 1986 version was mastered for Dolby Atmos immersive spatial audio.',
              score: 0,
              summary: 'Stereo & Aesthetics: Inaccurate historical claim.'
            }
          ]
        }
      ],
      exemplar: `[EXAMINER MARK SCHEME MODEL ANSWER — 15/15 MARKS]

1. DRUMS & PERCUSSION (AO3/AO4):
Cameo's 1986 electro-funk milestone relies on an 8-bit/28kHz LinnDrum machine. Each sample is sharply equalized with prominent midrange punch, gated non-linear digital reverb (AMS RMX16), and mechanical sixteenth-note quantization, establishing a rigid, infectious dancefloor bounce. Korn's 2004 rendition substitutes electronic drums with David Silveria's Tama acoustic kit, close-miked with dynamic and condenser mics, and smashed through Empirical Labs Distressor hardware. The kick emphasizes sub-45 Hz weight and 4 kHz click, while the snare features a raw, un-gated metallic ring suited to aggressive nu-metal.

2. BASSLINE & LOW-END TIMBRE (AO3/AO4):
Cameo's groove is propelled by an analogue synthesizer bass patch (Minimoog / Roland Jupiter-8) featuring a fast attack, snappy resonant filter decay, and tight low-end mono centering. Korn's bassist Fieldy utilizes a radically different approach: a down-tuned 5-string Ibanez bass tuned to A-D-G-C-F, processed with an extreme 'smile' curve EQ (heavy cut at 400-800 Hz, boosted sub at 50 Hz, and boosted percussive click at 3.5 kHz). The bass functions as a percussive attack alongside the kick drum rather than a melodic harmonic cushion.

3. VOCAL CAPTURE & PROCESSING (AO3/AO4):
Larry Blackmon's lead vocal in 1986 is characterized by a dry, nasal delivery enhanced with an Eventide H910 Harmonizer micro-pitch shift (+/- 6 cents) and short slapback delay, seated directly in front of the mix. Jonathan Davis' 2004 performance contrasts whispered, breathy close-mic verses with raspy, guttural screams in the chorus. His vocal chain features tube preamp saturation, fast optical compression, and dark room convolution reverb, accentuating emotional distress and angst.

4. GUITAR PRODUCTION (AO3/AO4):
In Cameo's track, guitars are used purely as a percussive rhythm texture: clean Fender Stratocaster single-coil chops treated with an envelope follower/auto-wah and subtle stereo analog chorus, ducking in and out between drum hits. Korn transforms the song into a guitar-driven tour de force: Munky and Head quad-track 7-string guitars tuned down to A, tracking through Mesa/Boogie Triple Rectifier and Marshall JCM900 tube heads, panned 100% hard left and right to construct a relentless wall of distortion.

5. SPATIAL FIELD & PRODUCTION CONTEXT (AO3/AO4):
Cameo's 1986 production leaves vast amounts of 'black space' between instruments, showcasing the clean transparency of mid-80s SSL 4000E consoles and early digital delay units. Korn's 2004 production reflects 2000s in-the-box metal aesthetics, where every frequency register is saturated, and heavy digital peak limiting ensures maximal impact on modern heavy rock radio and CDs.`
    },
    {
      title: 'Michael Jackson (1987) vs Alien Ant Farm (2001) — Smooth Criminal',
      artist: 'Michael Jackson vs Alien Ant Farm',
      era: '1980s Pop/New Jack Swing vs 2000s Alternative Rock / Post-Grunge',
      videoId: 'h_D3VFkatNY',
      questions: [
        {
          id: 'q1_mj_drums',
          label: 'Rhythm Foundation: Synclavier & Linn vs Punchy Rock Drum Kit',
          helperText: 'Contrast Bruce Swedien\'s custom-layered drum programming with post-grunge live rock drum capture.',
          type: 'mcq',
          options: [
            {
              text: 'Michael Jackson\'s 1987 production pairs live percussion with custom Synclavier sampling and LinnDrum hits recorded onto a wooden drum riser to eliminate stage resonance, creating hyper-defined transient snap; Alien Ant Farm utilizes a live acoustic rock drum kit recorded in a live room, saturated through analog tape and compressed with high-ratio VCA compressors for loud, ringing cymbal sustain.',
              score: 3,
              summary: 'Drums: Jackson utilized Synclavier/LinnDrum sampling and custom wooden riser isolation for transient snap, compared to Alien Ant Farm\'s live acoustic kit with high-ratio compression and ringing cymbals (AO3+AO4 Level 3).'
            },
            {
              text: 'Michael Jackson used sampled drum sounds and synthesizers, while Alien Ant Farm used a live acoustic drummer playing rock beats with loud cymbals.',
              score: 2,
              summary: 'Drums: Sampled drum sounds vs live acoustic drummer with loud cymbals (AO3 descriptive only).'
            },
            {
              text: 'The 1987 beat is precise dance pop, while the 2001 drums sound like alt-rock.',
              score: 1,
              summary: 'Drums: Precise dance pop vs alt-rock (Level 1 basic).'
            },
            {
              text: 'Both tracks used an 808 trap drum loop downloaded from an online sample pack.',
              score: 0,
              summary: 'Drums: Anachronistic and incorrect assertion.'
            }
          ]
        },
        {
          id: 'q2_mj_riff',
          label: 'The Central Riff: Synthesizer Layering vs High-Gain Guitar Chugging',
          helperText: 'Analyze how the signature staccato sixteenth-note motif is voiced and engineered in both versions.',
          type: 'mcq',
          options: [
            {
              text: 'The iconic 1987 staccato riff is constructed by layering a slap-bass guitar with an FM Yamaha DX7 synthesizer, Minimoog bass, and Synclavier string stabs for surgical, precise transient definition; Alien Ant Farm reconstructs the riff using drop-D tuned Les Paul guitars played with heavy palm-muting through high-gain Marshall valve stacks with mid-boost bite.',
              score: 3,
              summary: 'Riff: Jackson layered slap bass with DX7 FM synthesis, Minimoog, and Synclavier stabs for precision, while Alien Ant Farm chugged drop-D Les Pauls with high-gain Marshall tube distortion (AO3+AO4 Level 3).'
            },
            {
              text: 'Michael Jackson created the riff with synthesizers, slap bass, and digital keyboards, while Alien Ant Farm played the riff on distorted electric guitars.',
              score: 2,
              summary: 'Riff: Synthesizers and slap bass vs distorted electric guitars (AO3 descriptive only).'
            },
            {
              text: 'The original riff sounds like funky pop, whereas the rock version sounds like heavy guitar riffing.',
              score: 1,
              summary: 'Riff: Funky pop vs heavy guitar riffing (Level 1 basic).'
            },
            {
              text: 'The riff was played on an acoustic accordion in both versions.',
              score: 0,
              summary: 'Riff: Inaccurate instrument selection.'
            }
          ]
        },
        {
          id: 'q3_mj_vocals',
          label: 'Lead & Backing Vocals: Micro-Dynamics vs Raw Rock Belting',
          helperText: 'Contrast Bruce Swedien\'s legendary vocal tracking techniques with Dryden Mitchell\'s alternative rock delivery.',
          type: 'mcq',
          options: [
            {
              text: 'Michael Jackson\'s vocals were recorded through a Shure SM7 dynamic microphone without windscreen onto pristine multitrack tape, doubled and tripled with pinpoint vocal ad-libs, breathing dynamics, and Lexicon 480L digital reverb; Dryden Mitchell sings with an edgy alternative rock timbre, backed by double-tracked octave vocals, room reverb, and pushed into aggressive analogue saturation.',
              score: 3,
              summary: 'Vocals: Jackson recorded through an SM7 dynamic with doubled takes and Lexicon 480L reverb, contrasted with Mitchell\'s rock delivery with octave doubling and analog saturation (AO3+AO4 Level 3).'
            },
            {
              text: 'Michael Jackson sang through a dynamic microphone with crisp vocal doubling and reverb, while Alien Ant Farm\'s singer used a rock singing style with octave harmonies.',
              score: 2,
              summary: 'Vocals: Dynamic mic with doubling and reverb vs rock style with octave harmonies (AO3 descriptive only).'
            },
            {
              text: 'Michael Jackson has smooth pop singing and hiccups, while the rock singer sounds rougher.',
              score: 1,
              summary: 'Vocals: Smooth pop singing vs rough rock singing (Level 1 basic).'
            },
            {
              text: 'Michael Jackson\'s lead vocal was generated entirely by a speech synthesizer chip.',
              score: 0,
              summary: 'Vocals: Inaccurate vocal claim.'
            }
          ]
        },
        {
          id: 'q4_mj_fx',
          label: 'Sound Design & Foley Effects',
          helperText: 'Evaluate how cinematic narrative sound effects are incorporated into each track.',
          type: 'mcq',
          options: [
            {
              text: 'The 1987 recording opens with real human heartbeats sampled and slowed down into the Synclavier, paired with breaking glass, siren sounds, and cinematic orchestral hits to build a theatrical narrative; Alien Ant Farm foregoes cinematic foley, initiating the track with a brief drumstick click and an immediate burst of high-gain guitar feedback to establish live energy.',
              score: 3,
              summary: 'Sound Design: Jackson integrated sampled heartbeats, breaking glass, and Synclavier foley for theatrical narrative, while Alien Ant Farm began with drumstick clicks and guitar feedback for raw live rock authenticity (AO3+AO4 Level 3).'
            },
            {
              text: 'Michael Jackson uses sound effects like heartbeats and glass shattering, while Alien Ant Farm just starts with guitar feedback and counting.',
              score: 2,
              summary: 'Sound Design: Sound effects like heartbeats and glass vs guitar feedback (AO3 descriptive only).'
            },
            {
              text: 'The 1987 version has movie-style sound effects, while the cover sounds like a live band.',
              score: 1,
              summary: 'Sound Design: Movie sound effects vs live band (Level 1 basic).'
            },
            {
              text: 'Both tracks feature ambient rainforest recordings and bird chirping in the intro.',
              score: 0,
              summary: 'Sound Design: Inaccurate claim.'
            }
          ]
        },
        {
          id: 'q5_mj_mixing',
          label: 'Acoustic Space, Stereo Panning & Era Mastering',
          helperText: 'Examine Bruce Swedien\'s Acusonic stereo pairs against early 2000s Pro Tools digital summing.',
          type: 'mcq',
          options: [
            {
              text: 'Bruce Swedien employed his \'Acusonic Recording Process\' using Blumlein stereo pairs on overdubs and Harrison 3232 console summing to retain pristine stereo width and dynamic punch without master compression; Alien Ant Farm\'s 2001 mix was summed in Pro Tools, compressed with SSL G-Master bus compression, and mastered hot to -9 LUFS for commercial rock radio competition.',
              score: 3,
              summary: 'Mixing & Mastering: Swedien used Acusonic stereo pairs and Harrison console summing without bus compression, whereas Alien Ant Farm utilized Pro Tools digital summing, SSL bus compression, and -9 LUFS hot rock mastering (AO3+AO4 Level 3).'
            },
            {
              text: 'Michael Jackson\'s song was mixed on a large analogue mixing desk with wide stereo pairs, while Alien Ant Farm was mixed digitally with rock bus compression.',
              score: 2,
              summary: 'Mixing & Mastering: Large analogue desk with wide stereo vs digital mix with rock bus compression (AO3 descriptive only).'
            },
            {
              text: 'The 1987 track has great stereo separation, while the 2001 track is louder and punchier.',
              score: 1,
              summary: 'Mixing & Mastering: Good stereo separation vs louder and punchier (Level 1 basic).'
            },
            {
              text: 'The 1987 mix was encoded exclusively in mono vinyl groove modulation.',
              score: 0,
              summary: 'Mixing & Mastering: Inaccurate mono vinyl claim.'
            }
          ]
        }
      ],
      exemplar: `[EXAMINER MARK SCHEME MODEL ANSWER — 15/15 MARKS]

1. RHYTHMIC FOUNDATION & CAPTURE (AO3/AO4):
Michael Jackson's 1987 production showcases Bruce Swedien's perfectionist engineering. Live drums were recorded on a custom wooden platform elevated above the studio floor to eliminate structural low-frequency muddy resonances, then layered with Synclavier digital audio samples and LinnDrum percussion. This created an ultra-tight transient impact with zero acoustic smear. Alien Ant Farm's 2001 cover approaches the rhythm section with energetic post-grunge aesthetics: Mike Cosgrove's live acoustic kit is tracked in an open tracking room with ambient overheads and heavy room-mic compression, prioritizing live kinetic excitement and cymbal wash over clinical isolation.

2. THE SIGNATURE BASS/SYNTH RIFF (AO3/AO4):
The driving staccato riff in the 1987 original is a masterclass in hybrid layering: an electric slap bass is tightly doubled with a Minimoog synthesizer, a Yamaha DX7 FM digital synth patch, and crisp Synclavier string transients. Each element occupies a distinct frequency pocket, ensuring surgical clarity. Alien Ant Farm reimagines this motif as a heavy rock guitar riff: Terry Corso tunes his Les Paul to drop-D and chugs with heavy palm-muting through a high-gain Marshall JCM2000 tube amplifier, transforming the electronic funk pulse into an aggressive metal groove.

3. VOCAL CAPTURE & STYLING (AO3/AO4):
Jackson tracked his lead vocals using a Shure SM7 dynamic mic (with the internal pop filter removed and a custom nylon pop shield) straight into a Neve 1073 preamp and custom Harrison desk. He tracked dozens of meticulously layered harmonies, breathless gasps, and rhythmic vocal clicks, positioned at varying distances to create natural acoustic depth without artificial digital reverb clutter. Dryden Mitchell's 2001 vocal delivery reflects early-2000s nu-metal: close-mic condenser tracking pushed into subtle tube overdrive, doubled at the octave, and processed with digital plate reverb for raw urgency.

4. NARRATIVE SOUND EFFECTS & FOLEY (AO3/AO4):
The 1987 track functions as a cinematic narrative. The intro features Michael Jackson's real heartbeat recorded via a medical stethoscope and pitched down in the Synclavier, followed by heavy breathing, breaking window glass, and sudden orchestral stabs that build dramatic tension. Alien Ant Farm completely discards the theatrical narrative, opening with a live studio countdown (drumstick clicks) and a wailing guitar feedback swell, immediately signaling a visceral live rock performance.

5. SPATIAL IMAGING & ERA DYNAMICS (AO3/AO4):
Swedien's 'Acusonic' recording process relied on true Blumlein stereo microphone pairs to capture natural phase relationships and acoustic space, refusing to use master bus compression to preserve full micro-transient dynamics. Alien Ant Farm's 2001 production reflects the CD-era alternative rock aesthetic: tracked into early Pro Tools, processed through an SSL G-Master bus compressor (4:1 ratio, 30ms attack, auto release) for glue, and mastered hot to -9 LUFS with digital peak limiters to compete with contemporary bands like Incubus and Linkin Park.`
    }
  ]
};

const worksheetQ6 = {
  id: 'worksheet-ao3-ao4-q6',
  title: 'AO3 vs AO4 Essay Workshop: Component 3 Question 6 (20 Marks)',
  type: 'lp_activity',
  description: 'Construct Level 4 & Level 5 analytical essays evaluating technological evolution for Edexcel Component 3 Question 6 (20 Marks). Master the synthesis of historical audio milestones with critical evaluation of musical and sonic impact.',
  tracks: [
    {
      title: 'Vocal Production Evolution: Single-Take Ribbon Mics to Melodyne & Auto-Tune',
      artist: '1950s Tape Era to 2020s In-The-Box Workflow',
      era: 'Analogue vs Digital Vocal Evolution',
      videoId: 'C-u5WLJ9nkU',
      questions: [
        {
          id: 'q1_capture_evolution',
          label: 'Microphone Technology & Proximity Effect (1950s vs Modern)',
          helperText: 'Evaluate how microphone design, polar patterns, and frequency responses transformed vocal capture.',
          type: 'mcq',
          options: [
            {
              text: 'In the 1950s, figure-8 ribbon microphones (RCA 44BX) and early tube condensers (Neumann U47) required vocalists to maintain strict acoustic discipline to control proximity bass boost and room spill onto mono tape; in modern DAW production, large-diaphragm condenser mics paired with reflection filters, pop shields, and ultra-clean solid-state preamps allow singers to perform intimately inches from the capsule, relying on post-production EQ and dynamic control to sculpt the timbre.',
              score: 4,
              summary: 'Microphones: 1950s ribbon (RCA 44BX) and tube mics required physical acoustic distance control to manage proximity effect onto tape, whereas modern vocal chains utilize close condenser capture with reflection filters and precision post-processing (AO3+AO4 Level 4/5).'
            },
            {
              text: '1950s singers used ribbon microphones that sounded dark with bass proximity effect, whereas modern vocalists use bright condenser microphones with pop filters.',
              score: 2,
              summary: 'Microphones: Dark ribbon mics with proximity effect vs modern bright condensers with pop filters (AO3 descriptive only).'
            },
            {
              text: 'Old microphones were made of heavy metal and sounded muffled, while new microphones plug into computers via USB.',
              score: 1,
              summary: 'Microphones: Old metal mics vs modern USB mics (Level 1 basic).'
            },
            {
              text: 'Microphones have remained unchanged since 1877 and have zero effect on vocal frequency response.',
              score: 0,
              summary: 'Microphones: Factually incorrect.'
            }
          ]
        },
        {
          id: 'q2_pitch_correction',
          label: 'Pitch Correction: Tape Varispeed vs Melodyne Graphical Tuning',
          helperText: 'Contrast early tape manipulation with modern DSP pitch & formant manipulation.',
          type: 'mcq',
          options: [
            {
              text: 'Prior to digital processing, vocal pitch correction was impossible without physical varispeed tape manipulation (altering playback speed, which unavoidably changed tempo and formant characteristics) or demanding complete re-takes; the invention of Antares Auto-Tune (1997) and Celemony Melodyne (2001) revolutionized production by decoupling pitch from time via phase vocoding and FFT algorithms, enabling note-by-note intonation correction, formant adjustment, and the iconic robotic hard-tuning effect in modern trap and pop.',
              score: 4,
              summary: 'Pitch Correction: Tape varispeed altered both pitch and tempo simultaneously, whereas modern DSP (Auto-Tune / Melodyne) uses phase vocoding/FFT to decouple pitch from time, enabling surgical formant preservation or creative hard-tuning (AO3+AO4 Level 4/5).'
            },
            {
              text: 'In the analogue days singers had to sing in tune or speed up tape machines, but modern producers use software like Auto-Tune and Melodyne to fix out-of-tune notes.',
              score: 2,
              summary: 'Pitch Correction: Analogue varispeed tape vs Auto-Tune/Melodyne software pitch fixing (AO3 descriptive only).'
            },
            {
              text: 'Autotune was invented in the 1950s to make singers sound like robots.',
              score: 0,
              summary: 'Pitch Correction: Inaccurate historical timeline.'
            },
            {
              text: 'Singers today never make mistakes because computers sing for them automatically.',
              score: 1,
              summary: 'Pitch Correction: Vague colloquial assertion (Level 1 basic).'
            }
          ]
        },
        {
          id: 'q3_vocal_comping',
          label: 'Vocal Comping & Editing: Razor Blades vs DAW Swipe Comping',
          helperText: 'Evaluate how multi-track recording and digital playlists reshaped vocal performance workflows.',
          type: 'mcq',
          options: [
            {
              text: 'Analogue vocal comping on 24-track 2-inch tape was high-risk, requiring razor blade splicing or destructive punch-ins that risked overwriting irreplaceable takes; modern DAWs (Logic, Pro Tools, Ableton) offer non-destructive quick-swipe comping across infinite virtual playlists, enabling producers to assemble composite performances syllable by syllable with micro-crossfades to eliminate zero-crossing clicks, fundamentally shifting vocal aesthetics from singular emotional performances to hyper-perfect composite tracks.',
              score: 4,
              summary: 'Comping & Editing: Analogue 2-inch tape required destructive punch-ins and razor splicing, whereas modern DAWs facilitate non-destructive multi-take swipe comping with micro-crossfades, altering vocal aesthetics from single takes to hyper-perfect composites (AO3+AO4 Level 4/5).'
            },
            {
              text: 'Tape recording required physical razor blade cutting to edit vocal takes, while modern computer software lets you record many takes and choose the best words with swipe comping.',
              score: 2,
              summary: 'Comping & Editing: Physical razor blade splicing on tape vs software swipe comping of takes (AO3 descriptive only).'
            },
            {
              text: 'Old studios threw away bad vocal tapes in the bin, while computers save everything.',
              score: 1,
              summary: 'Comping & Editing: Threw away bad tapes vs computers save everything (Level 1 basic).'
            },
            {
              text: 'Vocal comping was invented by Thomas Edison on wax cylinders in the 1890s.',
              score: 0,
              summary: 'Comping & Editing: Inaccurate assertion.'
            }
          ]
        },
        {
          id: 'q4_dynamics_leveling',
          label: 'Dynamic Processing: Hardware Optical/FET vs Multi-Stage Digital Leveling',
          helperText: 'Contrast classic hardware compressors (LA-2A, 1176) with modern automated digital vocal chains.',
          type: 'mcq',
          options: [
            {
              text: 'Classic vocal chains paired an optical leveler (LA-2A with slow 60ms-5s two-stage release) with a fast FET peak limiter (1176 at 20-800 microseconds) to smooth macro-dynamics while clamping peaks with rich harmonic saturation; modern productions implement serial dynamic control combining digital clip-gain automation, surgical dynamic EQ to tame resonant harshness, optical emulation, and transparent lookahead digital limiters to anchor the vocal millimeter-precise atop dense mixes.',
              score: 4,
              summary: 'Dynamics: Classic analogue serial compression (LA-2A optical + 1176 FET) provided harmonic warmth and peak control, contrasted with modern multi-stage clip gain, dynamic EQ, and transparent lookahead digital limiting (AO3+AO4 Level 4/5).'
            },
            {
              text: 'Producers used to use hardware compressors like the LA-2A and 1176 to control vocal volume, while modern producers use software compressor plugins and volume automation.',
              score: 2,
              summary: 'Dynamics: Hardware LA-2A and 1176 compressors vs software plugins and volume automation (AO3 descriptive only).'
            },
            {
              text: 'Hardware compressors make vocals quieter, but modern digital compressors make vocals louder.',
              score: 1,
              summary: 'Dynamics: Hardware makes quieter vs digital makes louder (Level 1 basic).'
            },
            {
              text: 'Vocal compression is never used in professional music because it ruins the natural voice.',
              score: 0,
              summary: 'Dynamics: Factually incorrect.'
            }
          ]
        },
        {
          id: 'q5_reverb_space',
          label: 'Spatial Acoustics: Echo Chambers & Plates vs Convolution & Tempo Delays',
          helperText: 'Evaluate the acoustic and aesthetic shift from physical acoustic spaces to algorithmic and convolution reverbs.',
          type: 'mcq',
          options: [
            {
              text: 'Mid-20th century studios relied on physical architectural spaces (basement echo chambers at Abbey Road/Motown) and 600-pound EMT 140 steel plates to inject reverberation into dry mono vocals; modern digital workflows utilize mathematical convolution impulse responses (capturing the acoustic profile of real cathedrals and vintage hardware) and tempo-synced stereo delay throws with high/low cut filters to create three-dimensional depth without cluttering the vocal intelligibility.',
              score: 4,
              summary: 'Spatial Acoustics: Physical echo chambers and EMT 140 steel plates created warm physical reverberation, whereas modern convolution IRs and tempo-synced filtered delay throws achieve depth without obscuring vocal clarity (AO3+AO4 Level 4/5).'
            },
            {
              text: 'Old studios built physical echo chambers in basements and used metal plate reverbs, while modern producers use digital reverb and delay plugins inside their computer.',
              score: 2,
              summary: 'Spatial Acoustics: Physical basement echo chambers and metal plates vs digital reverb plugins (AO3 descriptive only).'
            },
            {
              text: 'Reverb used to be real echoes in a room, but now it is just an echo button on a keyboard.',
              score: 1,
              summary: 'Spatial Acoustics: Real echoes in a room vs echo button on keyboard (Level 1 basic).'
            },
            {
              text: 'Echo chambers were outlawed in 1968 due to international noise pollution treaties.',
              score: 0,
              summary: 'Spatial Acoustics: Fictitious claim.'
            }
          ]
        }
      ],
      exemplar: `[EXAMINER MARK SCHEME MODEL ANSWER — 20/20 MARKS — COMPONENT 3 QUESTION 6]

INTRODUCTION & SCOPE:
Vocal production has undergone a profound transformation across the last seven decades, shifting from physical acoustic performance discipline in treated rooms to surgical in-the-box digital manipulation. This essay evaluates how technological developments in microphone capture, pitch correction, multi-take editing, dynamic leveling, and artificial spatialization have redefined the sonic aesthetic and artistic definition of the human voice in popular music.

1. MICROPHONE DESIGN & PROXIMITY DISCIPLINE (AO3/AO4):
In the 1950s, engineers relied on figure-8 ribbon microphones (e.g., RCA 44BX) and early valve condensers (e.g., Neumann U47). Ribbon mics possessed heavy bi-directional proximity effect, rolling off high frequencies above 15 kHz and substantially boosting bass frequencies below 200 Hz if the singer moved within 12 inches of the motor. Singers like Frank Sinatra had to develop physical 'mic technique'—stepping back during fortissimo belts and leaning in during intimate phrases. In modern DAW production, large-diaphragm solid-state condensers (e.g., Neumann TLM 103, Sony C800G) feature transformerless preamps and extended high-end frequency response (up to 25 kHz). Singers perform inches from the capsule behind mesh pop shields and acoustic reflection filters, knowing that any proximity muddiness or plosive energy can be transparently eliminated in post-production via 80 Hz 24 dB/octave high-pass filtering and surgical dynamic EQ.

2. PITCH MANIPULATION & DIGITAL TUNING (AO3/AO4):
Prior to digital signal processing, altering vocal pitch without altering time was physically impossible. Analogue varispeed tape manipulation adjusted the capstan motor speed via an oscillator, but raising pitch inadvertently sped up tempo and shifted vocal formants upwards (the 'Munchkin' effect). Producers were forced to demand repetitive takes until intonation was acceptable. The release of Antares Auto-Tune (1997) and Celemony Melodyne (2001) revolutionized recording by employing phase vocoder and fast Fourier transform (FFT) algorithms. These tools separate pitch and time domain data, allowing producers to correct micro-pitch variations note-by-note while preserving natural vocal formants and vibrato depth. Furthermore, pushed to instantaneous 0ms retune speeds, Auto-Tune became an unmistakable creative timbre in modern Hip-Hop, Trap, and Pop (Cher, T-Pain, Travis Scott), demonstrating how an error-correction tool transformed into a defining artistic genre marker.

3. WORKFLOW: ANALOGUE TAPE PUNCH-INS VS DIGITAL SWIPE COMPING (AO3/AO4):
Tracking vocals to 2-inch multitrack tape was a high-stakes destructive process. Engineers like Geoff Emerick at Abbey Road had to physically punch-in on tape heads in real time, where a fraction-of-a-second timing error would erase the artist's previous performance. Constructing a composite vocal ('comping') required physically slicing tape with a razor blade at a 45-degree angle and taping segments together. In modern digital audio workstations, non-destructive virtual playlists allow hundreds of vocal passes. Modern 'quick-swipe' comping enables producers to audition and blend the best syllables, breaths, and consonants into a flawless master take. Micro-crossfades (5-10ms) placed at zero-crossings prevent audio pops and clicks. While this facilitates unprecedented technical perfection, critics argue it has compromised raw emotional spontaneity, replacing the singular human performance with an engineered composite mosaic.

4. DYNAMIC ENVELOPE CONTROL & SERIAL PROCESSING (AO3/AO4):
Analogue vocal leveling relied on legendary vintage hardware chains. Typically, an engineer ran a fast peak-taming FET compressor (Universal Audio 1176 with 20-microsecond attack) into a smooth optical leveling amplifier (Teletronix LA-2A with a two-stage photocell release: 50% release in 60ms, followed by several seconds of gradual decay). The 1176 caught transient consonants, while the LA-2A smoothed the musical phrase, introducing rich harmonic distortion (tube and transformer warmth). Modern digital vocal chains achieve an even more aggressive, locked-in aesthetic: producers manually draw clip-gain automation to balance syllables before compression, apply dynamic EQ (e.g., FabFilter Pro-Q3) to suppress harsh 2.5-4.5 kHz buildup during loud phrases, insert transparent lookahead brickwall limiters, and apply de-essers with sidechain bandpass filters (5-8.5 kHz). This anchors the vocal millimeter-tight at the front of modern commercial mixes.

5. SPATIAL ACOUSTICS: ECHO CHAMBERS TO CONVOLUTION (AO3/AO4):
Early recordings were captured in physical acoustic spaces; studios like Motown's Hitsville USA constructed dedicated reverberation chambers in their basements (concrete-lined rooms with a speaker at one end and a ribbon mic at the other). In the late 1950s, the EMT 140 steel plate offered artificial reverb through mechanical transducer vibration. In contemporary production, convolution reverb plugins load mathematical impulse responses (IRs) that capture the exact linear acoustic reflection profiles of famous cathedrals, tiled bathrooms, or vintage hardware units. Furthermore, modern mixes favor tempo-synced stereo delay throws (dotted eighth notes or quarter notes) over washed-out reverb tails; high-pass and low-pass filtering on the delay feedback loop creates depth and movement while leaving the main lead vocal dry, intimate, and hyper-intelligible in the stereo center.

CONCLUSION:
In conclusion, technological evolution has dismantled the traditional physical constraints of vocal production. While 1950s recordings stand as historical documents of acoustic performances governed by microphone proximity and room physics, modern vocal production treats the human voice as raw audio data to be tuned, sliced, compressed, and spatially sculpted. The result is an undeniable shift from documentary realism to hyper-real pop perfection.`
    }
  ]
};

// ============================================================================
// 2. INSERT SECTION INTO COURSE_DATA.JSON
// ============================================================================

const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

// Check if section already exists
const existingSecIdx = courseData.sections.findIndex(s => s.title.includes('AO3 vs AO4') || s.title.includes('Essay Workshop'));

const essaySection = {
  title: 'Stage 4b: AO3 vs AO4 Essay Workshop (Q5 & Q6 Builder)',
  items: [worksheetQ5, worksheetQ6]
};

if (existingSecIdx !== -1) {
  courseData.sections[existingSecIdx] = essaySection;
  console.log('Updated existing Stage 4b Essay Workshop section in course_data.json.');
} else {
  // Insert right after Stage 4: Comparison Quizzes (index 3)
  const s4Idx = courseData.sections.findIndex(s => s.title.includes('Stage 4: Comparison'));
  if (s4Idx !== -1) {
    courseData.sections.splice(s4Idx + 1, 0, essaySection);
    console.log(`Inserted Stage 4b Essay Workshop section right after Stage 4 (at index ${s4Idx + 1}).`);
  } else {
    courseData.sections.push(essaySection);
    console.log('Appended Stage 4b Essay Workshop section to course_data.json.');
  }
}

fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2), 'utf8');
console.log('✓ Successfully updated course_data.json with 2 full Worksheet activities!');

// ============================================================================
// 3. EXPAND FINGERPRINTS_DATA.JSON
// ============================================================================

const fingerprintsData = JSON.parse(fs.readFileSync(fingerprintsPath, 'utf8'));

// 3.1 Update Billie Jean (song_1980s_mj) to full 6 criteria
const mjIdx = fingerprintsData.songs.findIndex(s => s.id === 'song_1980s_mj');
if (mjIdx !== -1) {
  fingerprintsData.songs[mjIdx] = {
    id: 'song_1980s_mj',
    decade: '1980s',
    year: '1982',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    youtubeId: 'Zi_XLOBDo_Y',
    description: 'Iconic 1980s dance-pop milestone engineered by Bruce Swedien at Westlake Studios. Features custom drum isolation, Acusonic stereo mic pairs, Harrison 3232 console summing, and minimalist analogue compression.',
    criteria: [
      {
        id: 'capture',
        name: 'Capture',
        question: 'True or False: Identify the valid capture techniques used in Billie Jean.',
        applicableToSong: true,
        answers: [
          {
            text: 'Leon Ndugu Chancler\'s drum kit was recorded on a custom wooden platform raised off the studio floor to eliminate floor resonance and low-end bleed.',
            reason: 'Correct: Bruce Swedien built an 8x8 foot wooden drum riser for this exact purpose.',
            isTrue: true
          },
          {
            text: 'Michael Jackson\'s lead vocals were tracked using a Shure SM7 dynamic microphone with the windscreen removed and a custom pop filter.',
            reason: 'Correct: Swedien famously tracked MJ\'s vocals with a Shure SM7 dynamic microphone.',
            isTrue: true
          },
          {
            text: 'The kick drum was baffled with a heavy blanket and a custom wooden sound pipe to isolate the direct mic from the snare and cymbals.',
            reason: 'Correct: Swedien used a custom-built kick drum cover to isolate the kick transient.',
            isTrue: true
          },
          {
            text: 'The lead vocals were recorded with an omnidirectional boundary mic placed on the studio glass window.',
            reason: 'Incorrect: A Shure SM7 dynamic cardioid mic was used.',
            isTrue: false
          },
          {
            text: 'All instruments were captured live with zero multitrack overdubs onto a 2-track reel-to-reel tape recorder.',
            reason: 'Incorrect: Billie Jean utilized synchronized twin 24-track tape machines (48 tracks total).',
            isTrue: false
          }
        ]
      },
      {
        id: 'eq',
        name: 'EQ',
        question: 'True or False: Identify the valid EQ applications used in this track.',
        applicableToSong: true,
        answers: [
          {
            text: 'The kick drum EQ boosts the sub-bass fundamental around 50-60 Hz and adds a sharp presence boost around 3.5 kHz for beater click.',
            reason: 'Correct: Swedien shaped the kick drum to have sub weight and transient punch.',
            isTrue: true
          },
          {
            text: 'Low-mid frequencies (300-500 Hz) were carefully cleaned and notched out on secondary parts to prevent mix muddiness.',
            reason: 'Correct: Swedien prioritized clarity and separation by decluttering low-mid frequencies.',
            isTrue: true
          },
          {
            text: 'A high-shelf boost was applied to the hi-hat and shaker tracks to enhance sparkling 10 kHz+ top-end shimmer.',
            reason: 'Correct: High frequencies were accentuated to cut through dense rhythm arrangements.',
            isTrue: true
          },
          {
            text: 'A 50 Hz steep high-pass filter was applied to remove all sub-bass from the kick drum and bassline.',
            reason: 'Incorrect: The sub-bass in Billie Jean was preserved to drive club sound systems.',
            isTrue: false
          },
          {
            text: 'An extreme mid-range telephone filter was placed across the entire stereo master mix.',
            reason: 'Incorrect: The master mix exhibits full-frequency commercial fidelity.',
            isTrue: false
          }
        ]
      },
      {
        id: 'dynamics',
        name: 'Dynamics',
        question: 'True or False: Identify the dynamic processing techniques used in Billie Jean.',
        applicableToSong: true,
        answers: [
          {
            text: 'Bruce Swedien deliberately avoided using master mix bus compression to preserve wide dynamic punch and transient clarity.',
            reason: 'Correct: Swedien was famous for not compressing the master mix bus to preserve natural transients.',
            isTrue: true
          },
          {
            text: 'Individual percussion and bass elements used subtle outboard dynamic control, including a dbx 160 compressor on the bass guitar.',
            reason: 'Correct: Outboard VCA compression was used selectively on individual tracking channels.',
            isTrue: true
          },
          {
            text: 'An optical leveler (LA-2A) was used on Michael\'s vocal overdubs to gently smooth dynamic fluctuations.',
            reason: 'Correct: Smooth optical leveling was standard in Swedien\'s Westlake vocal chain.',
            isTrue: true
          },
          {
            text: 'The entire mix was heavily brickwall limited to -6 LUFS using digital lookahead limiters.',
            reason: 'Incorrect: Digital brickwall limiters did not exist in 1982.',
            isTrue: false
          },
          {
            text: 'A noise gate with ultra-fast attack was placed on every channel, creating unnatural gating artifacts.',
            reason: 'Incorrect: No aggressive gating chatter is present in the organic mix.',
            isTrue: false
          }
        ]
      },
      {
        id: 'effects',
        name: 'Effects',
        question: 'True or False: Identify the valid time-based and spatial effects used in Billie Jean.',
        applicableToSong: true,
        answers: [
          {
            text: 'The snare drum features an EMT 250 digital plate reverb with pre-delay to keep the dry snare transient upfront before the reverb tail blooms.',
            reason: 'Correct: The EMT 250 digital reverb was used extensively on the snare drum at Westlake.',
            isTrue: true
          },
          {
            text: 'Michael\'s vocal ad-libs utilize short stereo slapback tape delay and Lexicon digital reverb for depth.',
            reason: 'Correct: Short tape slapback and Lexicon digital reverberation gave MJ\'s vocal spatial dimension.',
            isTrue: true
          },
          {
            text: 'Subtle stereo chorus modulation was applied to the Yamaha CS-80 and Roland Jupiter-8 synthesizer pads to enhance stereo width.',
            reason: 'Correct: Analogue synth strings were modulated with stereo chorus.',
            isTrue: true
          },
          {
            text: 'Extreme reverse reverb was applied to every drum hit throughout the entire verse.',
            reason: 'Incorrect: Reverse reverb was not used on every drum hit.',
            isTrue: false
          },
          {
            text: 'An aggressive guitar flanger was placed across the lead vocal throughout the choruses.',
            reason: 'Incorrect: The lead vocal has no flanging effect.',
            isTrue: false
          }
        ]
      },
      {
        id: 'stereo',
        name: 'Stereo',
        question: 'True or False: Identify the stereo imaging techniques used in this mix.',
        applicableToSong: true,
        answers: [
          {
            text: 'Bruce Swedien used his signature "Acusonic Recording Process", utilizing Blumlein stereo microphone pairs on strings, brass, and backing vocals.',
            reason: 'Correct: Swedien\'s Acusonic process relied heavily on Blumlein coincident stereo pairs.',
            isTrue: true
          },
          {
            text: 'The kick drum, snare drum, bass synth, and lead vocal are panned dead center to anchor the groove and preserve mono punch.',
            reason: 'Correct: Standard commercial practice kept core low-end and vocal energy in the center.',
            isTrue: true
          },
          {
            text: 'Backing vocal harmonies and percussion shakers were panned wide left and right to envelop the listener.',
            reason: 'Correct: Multi-tracked harmonies were spread across the stereo soundstage.',
            isTrue: true
          },
          {
            text: 'The entire mix was recorded and mixed in true mono for 7-inch vinyl release only.',
            reason: 'Incorrect: Thriller was engineered and mixed in expansive stereo.',
            isTrue: false
          },
          {
            text: 'The kick drum is panned 100% hard left and the bass guitar is panned 100% hard right.',
            reason: 'Incorrect: Kick and bass are strictly centered.',
            isTrue: false
          }
        ]
      },
      {
        id: 'context',
        name: 'Context',
        question: 'True or False: Identify the historical and technological context of Billie Jean.',
        applicableToSong: true,
        answers: [
          {
            text: 'The track was recorded at Westlake Audio in Los Angeles, produced by Quincy Jones and engineered by Bruce Swedien.',
            reason: 'Correct: This was the core creative team behind the record-breaking Thriller album.',
            isTrue: true
          },
          {
            text: 'The track pushed analogue multitrack recording to its zenith using two synchronized 24-track tape machines locked via SMPTE timecode.',
            reason: 'Correct: Twin Studer/3M machines were locked to provide 48 audio tracks.',
            isTrue: true
          },
          {
            text: 'Swedien mixed the track 91 times on an automated Harrison 3232 console, eventually choosing Mix 2 for the final album master.',
            reason: 'Correct: Quincy Jones and Swedien famously went through 91 mixes before reverting to Mix 2.',
            isTrue: true
          },
          {
            text: 'Billie Jean was the first pop song recorded entirely inside an Apple MacBook running Logic Pro.',
            reason: 'Incorrect: The song was recorded in 1982, decades before MacBooks or Logic Pro.',
            isTrue: false
          },
          {
            text: 'The record was banned from radio because it was recorded onto digital compact cassette (DCC).',
            reason: 'Incorrect: Fictitious historical claim.',
            isTrue: false
          }
        ]
      }
    ]
  };
  console.log('✓ Expanded song_1980s_mj (Billie Jean) to all 6 criteria!');
}

// 3.2 Add 1970s Reggae/Dub: King Tubby Meets Rockers Uptown
const reggaeDubSong = {
  id: 'song_1970s_reggae_dub',
  decade: '1970s',
  year: '1974',
  title: 'King Tubby Meets Rockers Uptown',
  artist: 'Augustus Pablo & King Tubby',
  youtubeId: '9gW-gK0vC5M',
  description: 'Pioneering Jamaican dub masterpiece created at King Tubby\'s Hometown Hi-Fi studio in Kingston. Showcases real-time console manipulation, Roland Space Echo feedback loops, Fisher spring reverb crashes, and deep sub-bass mixing.',
  criteria: [
    {
      id: 'capture',
      name: 'Capture',
      question: 'True or False: Identify the valid capture techniques used in this dub recording.',
      applicableToSong: true,
      answers: [
        {
          text: 'The rhythm track (Jacob Miller\'s "Baby I Love You So") was originally captured onto 4-track tape at Randy\'s Studio 17 in Kingston.',
          reason: 'Correct: The instrumental backing track was tracked at Randy\'s on 4-track tape before being brought to Tubby.',
          isTrue: true
        },
        {
          text: 'Augustus Pablo\'s signature melodica lead was recorded using a close dynamic microphone with intimate acoustic breath detail.',
          reason: 'Correct: The Hohner melodica was captured up close with a dynamic mic.',
          isTrue: true
        },
        {
          text: 'The bass guitar was tracked using a direct injection (DI) box into the console preamp to capture clean, deep sub frequencies.',
          reason: 'Correct: Reggae engineers heavily favored DI bass for low-end clarity and punch.',
          isTrue: true
        },
        {
          text: 'All drums were recorded with a modern 12-microphone close-mic setup in a soundproof isolation booth.',
          reason: 'Incorrect: 1970s Jamaican studios used minimalist 2 or 3 microphone setups on drums due to 4-track limitations.',
          isTrue: false
        },
        {
          text: 'The melodica was generated using a digital FM synthesizer plug-in.',
          reason: 'Incorrect: Augustus Pablo played a real acoustic acoustic plastic Hohner melodica.',
          isTrue: false
        }
      ]
    },
    {
      id: 'eq',
      name: 'EQ',
      question: 'True or False: Identify the valid EQ and filtering techniques used by King Tubby.',
      applicableToSong: true,
      answers: [
        {
          text: 'King Tubby used a custom-built stepped high-pass filter (the "Big Knob") to radically sweep frequency bands during live console remixing.',
          reason: 'Correct: Tubby famously wired a stepped high-pass filter from broadcast equipment into his MCI console.',
          isTrue: true
        },
        {
          text: 'The bass guitar EQ emphasizes deep sub frequencies (60-90 Hz) while cutting harsh mid-frequencies to create a smooth, rumbling low end.',
          reason: 'Correct: Jamaican sound system culture required massive sub-bass to drive custom speaker boxes.',
          isTrue: true
        },
        {
          text: 'The snare drum and guitar skank frequencies were boosted in the upper-mid range (2.5-4 kHz) to cut through heavy delay and spring reverb.',
          reason: 'Correct: Upper-mids were boosted to make delay throws and rimshots slice through.',
          isTrue: true
        },
        {
          text: 'A steep low-pass filter at 1 kHz was placed over the entire mix, eliminating all treble.',
          reason: 'Incorrect: The mix retains crisp hi-hat sizzle and melodica top-end.',
          isTrue: false
        },
        {
          text: 'Linear-phase digital EQ plugins were used on every channel.',
          reason: 'Incorrect: Linear-phase digital EQ did not exist in 1974.',
          isTrue: false
        }
      ]
    },
    {
      id: 'dynamics',
      name: 'Dynamics',
      question: 'True or False: Identify the dynamic processing techniques used in this track.',
      applicableToSong: true,
      answers: [
        {
          text: 'Dynamic contrast was created manually in real time by Tubby manipulating faders and mute switches on his MCI 4-track console.',
          reason: 'Correct: Dub mixing was performed live as an instrument, riding faders and throwing mute keys.',
          isTrue: true
        },
        {
          text: 'Heavy analog tape saturation smoothed the transients of drum rimshots and bass plucks on the master tape.',
          reason: 'Correct: Pushing magnetic tape into saturation provided natural compression and harmonic warmth.',
          isTrue: true
        },
        {
          text: 'A hardware limiter was used on the bass channel to prevent over-modulation of the vinyl cutting lathe.',
          reason: 'Correct: Extreme low end had to be dynamically controlled to prevent vinyl stylus skipping.',
          isTrue: true
        },
        {
          text: 'The track features automated sidechain ducking keyed from the kick drum into the melodica.',
          reason: 'Incorrect: Sidechain ducking compressors were not used in 1974 Jamaican dub studios.',
          isTrue: false
        },
        {
          text: 'The song was crushed to 0 dBFS using a digital loudness maximizer.',
          reason: 'Incorrect: Digital maximizers did not exist in 1974.',
          isTrue: false
        }
      ]
    },
    {
      id: 'effects',
      name: 'Effects',
      question: 'True or False: Identify the iconic time-based and spatial effects used in this track.',
      applicableToSong: true,
      answers: [
        {
          text: 'A Roland Space Echo (RE-201) tape delay was used to create repeating echoes pushed into self-oscillation feedback loops.',
          reason: 'Correct: Tape delay feedback loops are the hallmark of King Tubby\'s dub production style.',
          isTrue: true
        },
        {
          text: 'A Fisher spring reverb unit was intentionally hit and agitated to produce explosive, metallic spring "thunderclaps" on snare hits.',
          reason: 'Correct: Tubby physically struck his spring reverb unit to generate the iconic dub crash sound effect.',
          isTrue: true
        },
        {
          text: 'High-pass filtered delay "throws" were sent momentarily to the snare and melodica before snapping back to dry.',
          reason: 'Correct: Selective auxiliary send throws are a defining dub mixing technique.',
          isTrue: true
        },
        {
          text: 'A digital shimmer pitch-shifted reverb plugin was used across the whole track.',
          reason: 'Incorrect: Shimmer reverb is a modern digital DSP algorithm from the 1980s/90s.',
          isTrue: false
        },
        {
          text: 'No artificial reverb or delay was used on this recording.',
          reason: 'Incorrect: Dub music is fundamentally defined by extreme reverb and tape delay manipulation.',
          isTrue: false
        }
      ]
    },
    {
      id: 'stereo',
      name: 'Stereo',
      question: 'True or False: Identify the stereo and spatial characteristics of this recording.',
      applicableToSong: true,
      answers: [
        {
          text: 'The original Jamaican sound system culture was predominantly mono, but export mixes used wide panning of tape delay repeats and spring reverb.',
          reason: 'Correct: Jamaican dubplates were mono for sound systems, while LP mixes spread echo effects in stereo.',
          isTrue: true
        },
        {
          text: 'The kick, snare, and bass guitar are locked into the center channel for maximum power transfer on sound systems.',
          reason: 'Correct: Centering low end was essential for mono and stereo vinyl pressing integrity.',
          isTrue: true
        },
        {
          text: 'Spring reverb tails and delay echoes pan or diffuse into the stereo field, contrasting with the dry, centered rhythm section.',
          reason: 'Correct: Spatial contrast between dry centered drums and diffuse ambient tails creates the dub aesthetic.',
          isTrue: true
        },
        {
          text: 'The recording uses Dolby Atmos binaural 3D spatial audio object metadata.',
          reason: 'Incorrect: Dolby Atmos was introduced decades later.',
          isTrue: false
        },
        {
          text: 'The bass guitar is panned 100% hard right throughout the track.',
          reason: 'Incorrect: Bass is strictly centered in dub mixing.',
          isTrue: false
        }
      ]
    },
    {
      id: 'context',
      name: 'Context',
      question: 'True or False: Identify the socio-technological and historical context of this track.',
      applicableToSong: true,
      answers: [
        {
          text: 'King Tubby (Osbourne Ruddock) was a trained electronics repair technician who customized his own studio consoles and sound system amplifiers.',
          reason: 'Correct: Tubby\'s background as an electrical engineer allowed him to build custom filters, preamps, and delay routings.',
          isTrue: true
        },
        {
          text: 'Dub originated as instrumental B-sides ("versions") for Jamaican sound systems, allowing MCs/deejays to toast live over the rhythm.',
          reason: 'Correct: B-side versions were created specifically for sound system dances in Kingston.',
          isTrue: true
        },
        {
          text: 'The track demonstrated that the mixing console itself could be played as a live musical instrument.',
          reason: 'Correct: Music theorists and producers recognize King Tubby as the pioneer of the mixing desk as an instrument.',
          isTrue: true
        },
        {
          text: 'The recording was created in London by the BBC Radiophonic Workshop using early synthesis computers.',
          reason: 'Incorrect: It was created at King Tubby\'s studio at 18 Dromilly Avenue, Waterhouse, Kingston, Jamaica.',
          isTrue: false
        },
        {
          text: 'King Tubby used MIDI sequencer synchronization between all instruments.',
          reason: 'Incorrect: MIDI was not invented until 1983.',
          isTrue: false
        }
      ]
    }
  ]
};

// 3.3 Add 1980s Synth-Pop: Blue Monday (New Order, 1983)
const synthPopSong = {
  id: 'song_1980s_synthpop',
  decade: '1980s',
  year: '1983',
  title: 'Blue Monday',
  artist: 'New Order',
  youtubeId: 'FYH8DsU2WCk',
  description: 'The best-selling 12-inch single of all time. Engineered at Britannia Row studios, it revolutionized electronic dance music with its Oberheim DMX drum machine, Powertran sequencer, Moog Source bass, and Kraftwerk-inspired choir samples.',
  criteria: [
    {
      id: 'capture',
      name: 'Capture',
      question: 'True or False: Identify the valid capture and sampling techniques used in Blue Monday.',
      applicableToSong: true,
      answers: [
        {
          text: 'The iconic stuttering kick drum was generated by an Oberheim DMX digital drum machine with 8-bit PCM samples stored on EPROM chips.',
          reason: 'Correct: The Oberheim DMX provided the driving kick and snare pattern.',
          isTrue: true
        },
        {
          text: 'The opening choir and vocal pads were sampled from Kraftwerk\'s "Radio-Activity" using an E-mu Emulator I 8-bit sampler.',
          reason: 'Correct: New Order sampled Kraftwerk\'s choir sounds into their newly purchased Emulator I.',
          isTrue: true
        },
        {
          text: 'Bernard Sumner built his own home-made Powertran Transcendent 2000 sequencer to control synthesizers via CV/Gate.',
          reason: 'Correct: Bernard Sumner assembled the Powertran sequencer kit to synchronize their gear before MIDI.',
          isTrue: true
        },
        {
          text: 'The entire drum track was performed by a live drummer with zero electronic drum machines or sequencers.',
          reason: 'Incorrect: Blue Monday is famous for its mechanical, machine-driven sequencing.',
          isTrue: false
        },
        {
          text: 'All synth lines were recorded via Bluetooth audio into an iPad DAW.',
          reason: 'Incorrect: Completely anachronistic assertion.',
          isTrue: false
        }
      ]
    },
    {
      id: 'eq',
      name: 'EQ',
      question: 'True or False: Identify the valid EQ and tone-shaping applications in Blue Monday.',
      applicableToSong: true,
      answers: [
        {
          text: 'The DMX kick drum EQ was boosted around 60 Hz for punch and 3 kHz for click, cutting low-mids to sit beneath Peter Hook\'s high bass guitar.',
          reason: 'Correct: EQ carving separated the kick drum from Hooky\'s bass lines.',
          isTrue: true
        },
        {
          text: 'Peter Hook\'s bass guitar was equalized with a significant high-mid boost (2-4 kHz) to accentuate pick attack and upper harmonics.',
          reason: 'Correct: Hook\'s signature high melodic bass sound relied on bright pick attack and upper-mid presence.',
          isTrue: true
        },
        {
          text: 'A low-pass filter on the ARP Quadra synthesizer was automated or modulated to create evolving, sweeping pad textures.',
          reason: 'Correct: Filter cutoff modulation shaped the analogue synth pads.',
          isTrue: true
        },
        {
          text: 'The entire mix has a 100 Hz high-pass filter that completely removes the kick drum sub-bass.',
          reason: 'Incorrect: The 12-inch single was famous for shaking dancefloor subwoofers.',
          isTrue: false
        },
        {
          text: 'A dynamic multi-band digital suppressor plugin was used on the lead vocal.',
          reason: 'Incorrect: Modern dynamic digital suppressors did not exist in 1983.',
          isTrue: false
        }
      ]
    },
    {
      id: 'dynamics',
      name: 'Dynamics',
      question: 'True or False: Identify the dynamic processing techniques used in this track.',
      applicableToSong: true,
      answers: [
        {
          text: 'The Oberheim DMX drum outputs were routed through individual hardware gate and compressor channels on an SSL console.',
          reason: 'Correct: Britannia Row\'s SSL console channels processed each drum output individually.',
          isTrue: true
        },
        {
          text: 'Peter Hook\'s bass guitar utilized heavy compression to even out picked dynamics across high melodic registers.',
          reason: 'Correct: Bass compression kept the energetic high-register pick playing level and punchy.',
          isTrue: true
        },
        {
          text: 'The 12-inch vinyl master cut preserved substantial dynamic crest factor, allowing the bass and drums to push deep vinyl groove excursions.',
          reason: 'Correct: The 12-inch 45 RPM format was specifically cut with wide grooves for maximum bass excursion and punch.',
          isTrue: true
        },
        {
          text: 'The track was crushed with modern digital streaming normalization algorithms in 1983.',
          reason: 'Incorrect: Streaming normalization did not exist in the 1980s.',
          isTrue: false
        },
        {
          text: 'The master tape used no dynamic control whatsoever and clipped into digital distortion.',
          reason: 'Incorrect: Analogue tape was used with controlled headroom.',
          isTrue: false
        }
      ]
    },
    {
      id: 'effects',
      name: 'Effects',
      question: 'True or False: Identify the time-based and spatial effects used in Blue Monday.',
      applicableToSong: true,
      answers: [
        {
          text: 'Peter Hook\'s signature bass tone was heavily processed through an Electro-Harmonix Clone Theory analog chorus pedal.',
          reason: 'Correct: The EHX Clone Theory chorus is the definitive ingredient of Peter Hook\'s legendary bass sound.',
          isTrue: true
        },
        {
          text: 'The snare drum and percussion feature non-linear gated digital reverb from an AMS RMX16 or EMT 250 unit.',
          reason: 'Correct: Gated digital reverb gave 1980s British synth-pop drums their massive, abrupt spatial punch.',
          isTrue: true
        },
        {
          text: 'Tape slapback delay was applied to Bernard Sumner\'s vocals to create a detached, haunting post-punk spatial feel.',
          reason: 'Correct: Short slapback delay and plate reverb kept the vocal detached and atmospheric.',
          isTrue: true
        },
        {
          text: 'Extreme autotune vocal pitch shifting was used on the chorus vocals.',
          reason: 'Incorrect: Autotune was invented in 1997, 14 years after Blue Monday.',
          isTrue: false
        },
        {
          text: 'All synthesizers were recorded completely dry with zero spatial effects or chorus.',
          reason: 'Incorrect: Dense chorus, delay, and reverb were central to the sound of Blue Monday.',
          isTrue: false
        }
      ]
    },
    {
      id: 'stereo',
      name: 'Stereo',
      question: 'True or False: Identify the stereo imaging characteristics of this mix.',
      applicableToSong: true,
      answers: [
        {
          text: 'The mechanical kick drum, snare, and sequenced synth bass are centered in mono for maximum dancefloor impact and vinyl cutting stability.',
          reason: 'Correct: Club 12-inch vinyl records required strong mono center bass to avoid needle skipping.',
          isTrue: true
        },
        {
          text: 'Emulator choir samples and synth pads are spread wide across the stereo field using stereo chorus and dual-panned delays.',
          reason: 'Correct: Ambient synths and samplers created an expansive stereo panorama.',
          isTrue: true
        },
        {
          text: 'Hi-hats and secondary percussion alternate across the stereo panorama to create rhythmic movement.',
          reason: 'Correct: Sequenced percussion was panned across the stereo soundstage.',
          isTrue: true
        },
        {
          text: 'The entire track is mixed in mono and contains zero stereo panning information.',
          reason: 'Incorrect: The 12-inch mix is famous for its sophisticated stereo spatialization.',
          isTrue: false
        },
        {
          text: 'The kick drum is panned 100% hard left.',
          reason: 'Incorrect: The kick is strictly locked to center.',
          isTrue: false
        }
      ]
    },
    {
      id: 'context',
      name: 'Context',
      question: 'True or False: Identify the historical and cultural context of Blue Monday.',
      applicableToSong: true,
      answers: [
        {
          text: 'Released in 1983 on Factory Records, it bridged the gap between post-punk (Joy Division) and the emerging underground New York club/electro scene.',
          reason: 'Correct: New Order were inspired by visits to New York clubs like the Funhouse and Paradise Garage.',
          isTrue: true
        },
        {
          text: 'The famous Peter Saville die-cut floppy disk sleeve design cost so much to print that Factory Records reportedly lost money on early copies.',
          reason: 'Correct: The die-cut 5.25-inch floppy disk sleeve was a legendary Factory Records production story.',
          isTrue: true
        },
        {
          text: 'It became the best-selling 12-inch vinyl single in UK chart history.',
          reason: 'Correct: Blue Monday holds the record as the top-selling 12-inch single of all time.',
          isTrue: true
        },
        {
          text: 'It was recorded on an iPhone voice memo in a garage in 2012.',
          reason: 'Incorrect: Recorded at Britannia Row Studios in London in 1982/1983.',
          isTrue: false
        },
        {
          text: 'New Order refused to use any electronic sequencers or drum machines on the record.',
          reason: 'Incorrect: The song was pioneering specifically because of its use of sequencers and drum machines.',
          isTrue: false
        }
      ]
    }
  ]
};

// 3.4 Add 2010s Modern Pop/EDM: Closer (The Chainsmokers ft. Halsey, 2016)
const edmPopSong = {
  id: 'song_2010s_edm_pop',
  decade: '2010s',
  year: '2016',
  title: 'Closer',
  artist: 'The Chainsmokers ft. Halsey',
  youtubeId: 'PT2_F-1esPk',
  description: 'The definitive 2010s modern in-the-box (ITB) electropop smash. Engineered in Ableton Live, featuring heavy sidechain ducking, Serum wavetable supersaws, vocal chops, and multiband upward OTT compression.',
  criteria: [
    {
      id: 'capture',
      name: 'Capture',
      question: 'True or False: Identify the valid capture and sound design techniques used in Closer.',
      applicableToSong: true,
      answers: [
        {
          text: 'Lead and featured vocals (Drew Taggart and Halsey) were recorded using high-end condenser microphones into clean digital audio interfaces inside DAW software.',
          reason: 'Correct: Modern pop vocals are tracked with clean condensers directly into modern digital preamps/converters.',
          isTrue: true
        },
        {
          text: 'Vocal phrases were sliced, pitch-shifted, and mapped onto sampler pads to create the signature melodic vocal chop hook in the drop.',
          reason: 'Correct: Vocal chops engineered in DAW samplers became the signature 2010s EDM/pop hook.',
          isTrue: true
        },
        {
          text: 'Drums consist of meticulously layered acoustic samples, synthesized 808 sub drops, and processed snaps/claps sourced from digital sample libraries.',
          reason: 'Correct: Modern pop drums are built from hybrid sample layers rather than live studio kits.',
          isTrue: true
        },
        {
          text: 'The track was recorded live to 2-inch tape in an abbey cathedral with zero computer editing.',
          reason: 'Incorrect: The production was created entirely in-the-box in Ableton Live.',
          isTrue: false
        },
        {
          text: 'All synthesizers were acoustic violins recorded with 1930s carbon microphones.',
          reason: 'Incorrect: Synthesizers are software wavetable plugins (e.g. Xfer Serum).',
          isTrue: false
        }
      ]
    },
    {
      id: 'eq',
      name: 'EQ',
      question: 'True or False: Identify the valid EQ applications in modern 2010s electropop production.',
      applicableToSong: true,
      answers: [
        {
          text: 'Surgical digital linear-phase EQ (e.g. FabFilter Pro-Q) was used to notch out harsh vocal and synth resonant frequencies without introducing phase smearing.',
          reason: 'Correct: Modern ITB production relies heavily on surgical high-Q digital notch filtering.',
          isTrue: true
        },
        {
          text: 'A steep high-pass filter (20-30 Hz) was applied across all non-sub channels to eliminate inaudible mud and preserve maximum headroom for the sub-bass.',
          reason: 'Correct: High-pass filtering all non-bass elements is standard practice to preserve low-end headroom.',
          isTrue: true
        },
        {
          text: 'A wide high-shelf boost above 10-12 kHz was applied to lead vocals and synths to introduce contemporary pop "air" and commercial sheen.',
          reason: 'Correct: Modern pop vocals feature aggressive high-shelf air boosts for immediate presence.',
          isTrue: true
        },
        {
          text: 'The kick drum frequency was low-pass filtered at 100 Hz, removing all punch and click.',
          reason: 'Incorrect: Modern pop kicks require prominent 2-4 kHz transient click to cut through smartphone speakers.',
          isTrue: false
        },
        {
          text: 'All mid frequencies between 500 Hz and 5 kHz were eliminated from the master mix.',
          reason: 'Incorrect: Mid frequencies carry the core vocal and synth energy.',
          isTrue: false
        }
      ]
    },
    {
      id: 'dynamics',
      name: 'Dynamics',
      question: 'True or False: Identify the dynamic processing techniques used in Closer.',
      applicableToSong: true,
      answers: [
        {
          text: 'Aggressive sidechain compression (or volume envelope plugins like Nicky Romero Kickstart / LFO Tool) ducks synths, pads, and bass whenever the kick hits.',
          reason: 'Correct: Heavy sidechain pumping is the quintessential dynamic hallmark of 2010s EDM and pop.',
          isTrue: true
        },
        {
          text: 'Upward and downward multiband dynamics (such as the ubiquitous Xfer OTT plugin) were applied to synths to create hyper-compressed, upfront textures.',
          reason: 'Correct: OTT multiband compression became the standard plugin for EDM supersaws in the 2010s.',
          isTrue: true
        },
        {
          text: 'Lead vocals were leveled using transparent digital lookahead peak limiters and clip gain automation to maintain a constant, upfront dynamic level.',
          reason: 'Correct: Modern pop vocals have very tight dynamic range so every syllable remains clearly intelligible.',
          isTrue: true
        },
        {
          text: 'The master mix retains a 20 dB dynamic range with completely uncompressed acoustic crescendos.',
          reason: 'Incorrect: Modern pop is heavily compressed and limited to competitive loudness (-7 to -9 LUFS).',
          isTrue: false
        },
        {
          text: 'No dynamic compression or limiting was applied at any stage of production or mastering.',
          reason: 'Incorrect: Compression and limiting are fundamental to modern EDM-pop.',
          isTrue: false
        }
      ]
    },
    {
      id: 'effects',
      name: 'Effects',
      question: 'True or False: Identify the digital effects and vocal processing used in Closer.',
      applicableToSong: true,
      answers: [
        {
          text: 'Antares Auto-Tune and Celemony Melodyne were used for pitch correction and formant control across both male and female lead vocals.',
          reason: 'Correct: Pitch correction and formant editing are ubiquitous across 2010s commercial pop.',
          isTrue: true
        },
        {
          text: 'Stereo dimension expanders and multi-voice chorus units were applied to Serum supersaw chords to create an immense wall of sound in the drop.',
          reason: 'Correct: Dimension expansion and unison detune widen supersaw synths.',
          isTrue: true
        },
        {
          text: 'Tempo-synced dotted-eighth delays and sidechain-ducked digital reverbs give vocals spatial depth without cluttering the dry center.',
          reason: 'Correct: Ducked delays and reverbs keep vocals intimate while adding spatial release.',
          isTrue: true
        },
        {
          text: 'Tape flanging was created by physically pressing a thumb onto the reel of an Ampex tape machine.',
          reason: 'Incorrect: Produced in-the-box in a DAW using digital VST plugins.',
          isTrue: false
        },
        {
          text: 'No digital reverb, delay, or modulation was permitted on the recording.',
          reason: 'Incorrect: The production is rich with sophisticated digital spatial processing.',
          isTrue: false
        }
      ]
    },
    {
      id: 'stereo',
      name: 'Stereo',
      question: 'True or False: Identify the stereo imaging characteristics of modern in-the-box pop.',
      applicableToSong: true,
      answers: [
        {
          text: 'The sub-bass (below 100-120 Hz) and kick drum fundamental are summed strictly to mono to ensure phase coherence and massive low-end power on club PAs.',
          reason: 'Correct: Modern mastering standard strictly mono-sums frequencies below 100 Hz.',
          isTrue: true
        },
        {
          text: 'Supersaw synth stacks and stereo reverb returns are panned hard left and right using Haas effect and micro-pitch widening.',
          reason: 'Correct: Extreme stereo width is applied to chord stacks to wrap around the listener.',
          isTrue: true
        },
        {
          text: 'Lead vocals, kick, and snare are anchored dead center, maintaining focus and punch.',
          reason: 'Correct: Anchoring the core groove in the center is essential for commercial streaming and club play.',
          isTrue: true
        },
        {
          text: 'The sub-bass is panned hard right and out of phase with the left speaker.',
          reason: 'Incorrect: Out-of-phase sub-bass cancels out on mono club sound systems and ruins low-end punch.',
          isTrue: false
        },
        {
          text: 'The mix was recorded in 1950s mono with zero stereo width.',
          reason: 'Incorrect: It is a modern ultra-wide stereo pop production.',
          isTrue: false
        }
      ]
    },
    {
      id: 'context',
      name: 'Context',
      question: 'True or False: Identify the socio-technological context of 2010s EDM-Pop.',
      applicableToSong: true,
      answers: [
        {
          text: 'Produced entirely "in the box" (ITB) on laptop DAWs using commercial sample packs, VST plugins, and software synthesizers.',
          reason: 'Correct: The Chainsmokers famously produced major hits on laptops in hotel rooms and tour buses.',
          isTrue: true
        },
        {
          text: 'The mix was optimized for streaming platforms (Spotify, Apple Music) with loudness targets around -14 LUFS and true-peak ceilings to avoid inter-sample clipping.',
          reason: 'Correct: 2010s mastering shifted toward streaming loudness normalization guidelines.',
          isTrue: true
        },
        {
          text: 'It represents the convergence of electronic dance festival aesthetics (supersaws, sidechain drops) with mainstream radio pop songwriting.',
          reason: 'Correct: Closer is a prime example of the 2010s EDM-pop crossover phenomenon.',
          isTrue: true
        },
        {
          text: 'It was mastered exclusively for 78 RPM shellac gramophone disc players.',
          reason: 'Incorrect: Completely anachronistic assertion.',
          isTrue: false
        },
        {
          text: 'It required a 40-piece live symphony orchestra recorded at Abbey Road Studios.',
          reason: 'Incorrect: The production is predominantly electronic and sample-based.',
          isTrue: false
        }
      ]
    }
  ]
};

// Check if these songs already exist before pushing
const existingIds = new Set(fingerprintsData.songs.map(s => s.id));

if (!existingIds.has(reggaeDubSong.id)) {
  fingerprintsData.songs.push(reggaeDubSong);
  console.log(`✓ Added ${reggaeDubSong.title} (${reggaeDubSong.decade}) with 6 full criteria.`);
}
if (!existingIds.has(synthPopSong.id)) {
  fingerprintsData.songs.push(synthPopSong);
  console.log(`✓ Added ${synthPopSong.title} (${synthPopSong.decade}) with 6 full criteria.`);
}
if (!existingIds.has(edmPopSong.id)) {
  fingerprintsData.songs.push(edmPopSong);
  console.log(`✓ Added ${edmPopSong.title} (${edmPopSong.decade}) with 6 full criteria.`);
}

fs.writeFileSync(fingerprintsPath, JSON.stringify(fingerprintsData, null, 2), 'utf8');
console.log(`✓ Successfully updated fingerprints_data.json! Total songs now: ${fingerprintsData.songs.length}`);

console.log('--- Part 4 Implementation Finished Successfully ---');
