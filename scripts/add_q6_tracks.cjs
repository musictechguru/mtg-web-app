const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const courseDataPath = path.join(rootDir, 'src/data/course_data.json');

const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

// Find worksheet-ao3-ao4-q6
let worksheetQ6 = null;
courseData.sections.forEach(s => {
  s.items.forEach(i => {
    if (i.id === 'worksheet-ao3-ao4-q6') worksheetQ6 = i;
  });
});

if (!worksheetQ6) {
  console.error('worksheet-ao3-ao4-q6 not found!');
  process.exit(1);
}

const track2 = {
  title: 'Drum Production Evolution: Live Room Bleed to Sample Replacement & Beat Detective',
  artist: 'Glyn Johns 1960s to Modern Grid-Quantised Metal/Pop',
  era: 'Acoustic Capture to Digital Replacement',
  videoId: 'y0hDfqJ598E',
  questions: [
    {
      id: 'q1_drum_capture',
      label: 'Acoustic Capture: Ambient Spill vs Hyper-Isolated Close Mics',
      helperText: 'Contrast Glyn Johns 3-mic natural bleed techniques with modern 16-channel isolated drum tracking.',
      type: 'mcq',
      options: [
        {
          text: 'In the late 1960s, Glyn Johns utilized a 3-mic technique (kick, top overhead, and side overhead equidistant from snare center) capturing John Bonham\'s kit in Headley Grange to harness natural room reverberation, phase coherence, and dynamic bleed; in contrast, modern metal and pop studios deploy 16+ discrete close microphones with acoustic baffles, transient gates, and spot cymbals to eliminate bleed and isolate every hit for surgical independent processing.',
          score: 4,
          summary: 'Acoustic Capture: Glyn Johns 3-mic equidistant setup prioritized phase coherence and ambient room acoustics, compared to modern 16+ channel close miking designed to eliminate spill for isolated DAW processing (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Glyn Johns used only 3 microphones to record drums in a big hall with lots of natural echo, while modern studios use 16 microphones close up on every drum.',
          score: 2,
          summary: 'Acoustic Capture: 3 mics in a big room vs 16 close mics on every drum (AO3 descriptive only).'
        },
        {
          text: 'Old drummers played quieter so you only needed 3 mics, but modern drummers hit harder so you need 16 mics.',
          score: 1,
          summary: 'Acoustic Capture: Old drummers quieter vs modern louder (Level 1 basic).'
        },
        {
          text: 'Acoustic drum kits were banned in recording studios after 1975.',
          score: 0,
          summary: 'Acoustic Capture: Factually incorrect.'
        }
      ]
    },
    {
      id: 'q2_tape_saturation_transients',
      label: 'Transient Control: Analogue Tape Compression vs Digital Transient Designers',
      helperText: 'Examine how magnetic tape saturation naturally tamed snare peaks compared to modern DSP envelope shapers.',
      type: 'mcq',
      options: [
        {
          text: 'Recording drums hot onto 2-inch analogue tape at 15 or 30 IPS naturally shaved off explosive snare transients through magnetic tape saturation, adding third-harmonic distortion and fat low-end bloom without harsh digital clipping; in digital DAWs, uncompressed 24-bit floating point audio records instantaneous transients with unforgiving accuracy, requiring dedicated DSP transient shapers and fast peak limiters to control attack envelopes.',
          score: 4,
          summary: 'Transient Control: Analogue tape saturation at 15/30 IPS naturally compressed snare transients with 3rd-harmonic bloom, whereas digital DAWs record unyielding transient peaks requiring DSP envelope shapers (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Analogue tape compressed loud drum hits naturally and made them sound warm, whereas digital recording records the exact sharp volume spikes.',
          score: 2,
          summary: 'Transient Control: Tape compressed naturally vs digital records sharp volume spikes (AO3 descriptive only).'
        },
        {
          text: 'Tape machines made drums sound crackly and fuzzy, but digital sounds clean and loud.',
          score: 1,
          summary: 'Transient Control: Tape crackly vs digital clean (Level 1 basic).'
        },
        {
          text: 'Magnetic tape can never be saturated under any circumstances.',
          score: 0,
          summary: 'Transient Control: Inaccurate technical claim.'
        }
      ]
    },
    {
      id: 'q3_grid_quantisation',
      label: 'Timing & Groove: Human Groove Push/Pull vs Beat Detective Grid Quantisation',
      helperText: 'Evaluate the transition from organic human rhythm fluctuation to sample-accurate grid quantisation.',
      type: 'mcq',
      options: [
        {
          text: 'Classic rock rhythm sections derived their groove from human micro-timing variations (pushing choruses ahead by 2-3 BPM and pulling back in verses); the advent of Digidesign Beat Detective and DAW audio warping allowed producers to slice multi-track drums at transient peaks and snap every kick and snare to a rigid sixteenth-note grid with auto-crossfading, establishing the hyper-consistent, robotic timekeeping demanded by modern pop and commercial metal.',
          score: 4,
          summary: 'Timing & Groove: Classic human push/pull micro-timing vs Beat Detective multi-track transient slicing and grid quantisation with auto-crossfades for modern hyper-consistent timekeeping (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Old drummers sped up and slowed down naturally during songs, while modern producers use software like Beat Detective to put drum hits exactly on the grid.',
          score: 2,
          summary: 'Timing & Groove: Natural human speed changes vs software grid quantisation (AO3 descriptive only).'
        },
        {
          text: 'Old music was out of time because drummers did not have metronomes, but computers fixed timing.',
          score: 1,
          summary: 'Timing & Groove: Old music out of time vs computers fixed timing (Level 1 basic).'
        },
        {
          text: 'Grid quantisation was invented by J.S. Bach on pipe organs in 1720.',
          score: 0,
          summary: 'Timing & Groove: Completely anachronistic.'
        }
      ]
    },
    {
      id: 'q4_sample_replacement',
      label: 'Timbre & Consistency: Natural Drum Dynamics vs Trigger Sample Replacement',
      helperText: 'Analyze how software tools like Slate Digital Trigger and Drumagog altered the sound of modern drums.',
      type: 'mcq',
      options: [
        {
          text: 'While vintage recordings accepted acoustic variations between successive drum hits, modern high-production mixing routinely deploys sample-replacement plugins (e.g., Slate Digital Trigger) to augment or replace live drum hits with pre-processed, phase-aligned studio samples, guaranteeing that every single snare hit in a heavy rock chorus strikes with identical velocity, frequency balance, and acoustic impact regardless of drummer fatigue.',
          score: 4,
          summary: 'Sample Replacement: Transitioned from organic hit-to-hit velocity variations to phase-aligned sample augmentation (Trigger / Drumagog) ensuring 100% velocity consistency in dense commercial mixes (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Modern producers use drum replacement plugins to trigger high-quality pre-recorded drum samples underneath the live acoustic drum hits.',
          score: 2,
          summary: 'Sample Replacement: Triggering pre-recorded samples underneath live acoustic hits (AO3 descriptive only).'
        },
        {
          text: 'Modern drummers do not know how to play so the computer plays fake drums for them.',
          score: 1,
          summary: 'Sample Replacement: Dismissive colloquial claim (Level 1 basic).'
        },
        {
          text: 'Sample replacement is physically impossible on acoustic drums.',
          score: 0,
          summary: 'Sample Replacement: Factually false.'
        }
      ]
    },
    {
      id: 'q5_parallel_bus_compression',
      label: 'Bus Dynamics: Classic SSL/Fairchild Glue vs New York Parallel Crushing',
      helperText: 'Contrast gentle mix bus gluing with aggressive parallel drum compression routing.',
      type: 'mcq',
      options: [
        {
          text: 'Traditional drum bus processing utilized gentle VCA or optical leveling (SSL G-Bus compressor at 2:1 or 4:1 ratio, 30ms attack, auto-release) to dynamically "glue" the kit together while preserving transient air; modern workflows deploy aggressive parallel compression ("New York" style) where an auxiliary copy of the drum bus is obliterated with extreme ratio (20:1 / All-Buttons-In) and blended beneath the uncompressed transient track, injecting massive perceived sustain and room energy without squashing attack punch.',
          score: 4,
          summary: 'Bus Dynamics: Classic SSL 4:1 gentle bus gluing contrasted with modern parallel "New York" compression blending an uncompressed transient track with an obliterated 20:1 compressed auxiliary return (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Producers used to use gentle compressors on the drum mix, whereas modern producers use parallel compression to blend a smashed compressed drum track with a clean one.',
          score: 2,
          summary: 'Bus Dynamics: Gentle mix compression vs blending smashed and clean tracks in parallel (AO3 descriptive only).'
        },
        {
          text: 'Compressors make drums loud by squashing everything flat.',
          score: 1,
          summary: 'Bus Dynamics: Vague reduction (Level 1 basic).'
        },
        {
          text: 'Parallel compression creates severe out-of-phase destructive cancellation in all DAWs and must never be used.',
          score: 0,
          summary: 'Bus Dynamics: Inaccurate claim ignoring automatic delay compensation.'
        }
      ]
    }
  ],
  exemplar: `[EXAMINER MARK SCHEME MODEL ANSWER — 20/20 MARKS — DRUM PRODUCTION EVOLUTION]

INTRODUCTION:
Drum production has evolved from capturing the physical interaction between an acoustic instrument and room architecture to a hyper-controlled digital composite. This essay evaluates how developments in microphone technique, analogue tape saturation, digital grid quantisation, sample augmentation, and parallel bus compression have fundamentally altered drum sonics from organic documentary capture to hyper-consistent commercial power.

1. ACOUSTIC CAPTURE & MICROPHONE ISOLATION (AO3/AO4):
In the late 1960s, Glyn Johns pioneered a minimalist equidistant 3-microphone technique at Olympic Studios and Headley Grange for Led Zeppelin and The Who. Johns positioned two cardioid condenser mics exactly 40 to 60 inches from the snare center (one directly above, one by the floor tom pointing across the snare) alongside a dedicated kick drum mic. This prioritized phase coherence, natural room bleed, and John Bonham's acoustic dynamic touch. In modern production (especially modern metal, pop, and rock), engineers deploy 16 or more discrete channels: top and bottom snare mics (with bottom mic phase-inverted), inside and outside kick mics, sub-kick transducers, individual tom close mics, hi-hat and ride spot mics, and spaced stereo room arrays. Heavy acoustic baffling and tight dynamic gating are applied during tracking to eliminate bleed, allowing each drum to be equalized and compressed in surgical isolation within the DAW.

2. ANALOGUE TAPE SATURATION VS DIGITAL TRANSIENTS (AO3/AO4):
Tracking acoustic drums to 2-inch analogue tape at 15 or 30 inches per second (IPS) acted as an organic dynamic processor. When an explosive rimshot hit the record head above +3 VU, magnetic domain saturation occurred. This gently rounded off instantaneous high-frequency transient peaks, compressing the dynamic crest factor while generating musical odd and even harmonic overtones (third-harmonic saturation) and bass head-bump warmth (around 50-80 Hz). In digital audio workstations, 24-bit/96kHz recording captures transient spikes with sample-accurate linearity up to 0 dBFS. Without tape saturation, modern engineers rely on digital transient shapers (e.g., SPL Transient Designer) and analogue tape emulation plugins to artificially soften harsh transient clicks and restore analog low-end thickness.

3. TIMING & GROOVE: HUMAN ACCELERATION VS BEAT DETECTIVE (AO3/AO4):
Vintage drum tracking accepted natural human micro-timing variations. Legendary drummers like John Bonham, Keith Moon, and Ringo Starr naturally accelerated tempos by 2-4 BPM entering energetic choruses and settled back in reflective verses, creating organic musical tension and release. In contrast, late-1990s and 2000s productions introduced Digidesign's Beat Detective and DAW audio warping algorithms. Engineers slice multi-track acoustic drum recordings at transient zero-crossings, quantize every beat precisely to a rigid tempo grid, fill gaps with automated micro-crossfades, and eliminate human timing drift. While this ensures flawless rhythmic locking with electronic synths and sequenced arpeggios, critics argue it has sterilely homogenised modern rock and pop drumming.

4. SAMPLE REPLACEMENT & HYPER-CONSISTENT DYNAMICS (AO3/AO4):
Historically, a drummer's velocity varied naturally between hits, and tired drummers would strike softer during extended tracking takes. With the development of Drumagog and Slate Digital Trigger in the 2000s, sample augmentation became standard industry practice. Transient detection algorithms trigger multi-velocity pre-recorded studio drum samples underneath the live acoustic performance. These samples are phase-aligned to the live track to avoid destructive comb filtering. In modern heavy metal, the acoustic kick and snare are often 100% replaced with processed samples, guaranteeing that every double-kick hit strikes with identical low-end weight, sub-bass click, and high-frequency snap.

5. BUS PROCESSING: SSL GLUE VS NEW YORK PARALLEL COMPRESSION (AO3/AO4):
Analogue drum mixing traditionally relied on master bus compression (e.g., SSL G-Master bus compressor at 4:1 ratio, 30ms attack, auto release) to dynamically bind the kit into a cohesive soundstage while preserving transient attack. Contemporary workflows combine bus glue with 'New York' parallel compression: the uncompressed drum bus is blended alongside an auxiliary send driven into extreme non-linear compression (e.g., Empirical Labs Distressor or Universal Audio 1176 in 'All-Buttons-In' mode). This crushes micro-dynamics, boosts low-level room decay and cymbal sustain by 15-20 dB, and is blended 30% wet beneath the dry drums, delivering monstrous punch and sustain without sacrificing transient clarity.

CONCLUSION:
In conclusion, drum production has migrated from the acoustic documentation of an unrepeatable live room performance to an engineered hybrid science. Modern tools like Beat Detective, sample augmentation, and parallel dynamic processing provide unprecedented sonic power and radio-ready consistency, albeit at the expense of human micro-dynamics and unquantised rhythmic feel.`
};

const track3 = {
  title: 'The DAW Revolution: Analogue Consoles to In-The-Box Plugins & Loudness',
  artist: 'SSL 4000 & 2-Inch Tape vs Pro Tools & Limiting',
  era: 'Studio Evolution (1980–Present)',
  videoId: 'Z6gQ1q4yZ0c',
  questions: [
    {
      id: 'q1_console_summing',
      label: 'Summing Architecture: Analogue Desk Non-Linearity vs 64-Bit Floating Point',
      helperText: 'Contrast analogue console summing crosstalk with ultra-clean digital DAW math.',
      type: 'mcq',
      options: [
        {
          text: 'Classic large-format analogue consoles (SSL 4000, Neve 8078) summed audio signals across physical copper bus bars, transformers, and channel transistors, introducing subtle harmonic coloration, inter-channel crosstalk, and pleasing non-linear saturation; digital DAWs sum tracks mathematically using 32-bit or 64-bit floating point algorithms with zero crosstalk, infinite headroom, and near-zero harmonic distortion, providing clinical precision.',
          score: 4,
          summary: 'Summing Architecture: Analogue consoles (SSL/Neve) introduced non-linear transformer/transistor saturation and bus crosstalk, compared to 32/64-bit floating point digital summing offering zero distortion and infinite mathematical headroom (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Analogue mixing desks had transformers and electronics that colored the sound and added warmth, while digital computers sum numbers mathematically with no distortion.',
          score: 2,
          summary: 'Summing Architecture: Analogue electronics added warmth vs computers sum numbers cleanly (AO3 descriptive only).'
        },
        {
          text: 'Big analogue desks sounded better because they were made in England, whereas computers are just plastic.',
          score: 1,
          summary: 'Summing Architecture: Colloquial assertion (Level 1 basic).'
        },
        {
          text: 'Computers can only sum a maximum of 4 audio tracks before digital memory overflows.',
          score: 0,
          summary: 'Summing Architecture: Factually incorrect.'
        }
      ]
    },
    {
      id: 'q2_recall_automation',
      label: 'Session Recall & Automation: Manual Grease Pencils vs Instant Total Recall',
      helperText: 'Evaluate how automated DAWs changed client workflow and mix revisions.',
      type: 'mcq',
      options: [
        {
          text: 'In analogue studios, recalling a mix required assistant engineers to manually photograph or document hundreds of knob and fader positions on paper recall sheets, taking 2-3 hours and making instant client revisions impossible; modern DAWs feature total instant recall, non-destructive undo histories, and sample-accurate vector automation lanes for every single plug-in parameter, fundamentally transforming mixing into an iterative, collaborative process.',
          score: 4,
          summary: 'Recall & Automation: Analogue mixing required hours of manual paper recall sheets and physical fader documentation, whereas DAWs provide instant total project recall and sample-accurate automation lanes (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Old studios had to write down all knob settings on paper sheets to recreate a mix, while computers open the exact project with all settings in seconds.',
          score: 2,
          summary: 'Recall & Automation: Paper recall sheets vs instant computer project loading (AO3 descriptive only).'
        },
        {
          text: 'Engineers drew markings on the mixing desk with felt pens, while computers use a mouse.',
          score: 1,
          summary: 'Recall & Automation: Felt pens vs computer mouse (Level 1 basic).'
        },
        {
          text: 'Analogue mixing consoles stored entire mix projects onto floppy disks in 1965.',
          score: 0,
          summary: 'Recall & Automation: Anachronistic error.'
        }
      ]
    },
    {
      id: 'q3_outboard_vs_plugins',
      label: 'Processing Resources: Physical Outboard Racks vs Infinite Virtual Plugins',
      helperText: 'Analyze the shift from limited physical outboard gear to unlimited DSP instances.',
      type: 'mcq',
      options: [
        {
          text: 'Analogue facilities were constrained by physical outboard hardware; a studio might own only two LA-2A compressors and one Lexicon 480L reverb, requiring sub-mixing and compromise; in contemporary DAWs, multi-core computer processors allow engineers to instantiate hundreds of modelled vintage hardware plugins across infinite audio tracks, democratizing access to multi-million-dollar mastering-grade tools.',
          score: 4,
          summary: 'Outboard vs Plugins: Physical hardware limitations (owning 1-2 expensive units per studio) contrasted with multi-core CPU democratization allowing unlimited instances of modeled vintage processors (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Studios only had a few real hardware compressors and reverbs in their racks, but now you can open as many plugin copies as your computer processor can handle.',
          score: 2,
          summary: 'Outboard vs Plugins: Limited hardware units vs unlimited plugin copies (AO3 descriptive only).'
        },
        {
          text: 'Hardware racks were heavy and took up space, but software plugins live inside the screen.',
          score: 1,
          summary: 'Outboard vs Plugins: Heavy physical racks vs software inside screen (Level 1 basic).'
        },
        {
          text: 'Software plugins are illegal copies that cannot process audio.',
          score: 0,
          summary: 'Outboard vs Plugins: Factually incorrect.'
        }
      ]
    },
    {
      id: 'q4_loudness_war',
      label: 'Dynamic Standards: 0 VU Headroom vs Loudness War Maximizers & LUFS Normalization',
      helperText: 'Evaluate how digital lookahead brickwall limiters provoked the Loudness War and subsequent streaming targets.',
      type: 'mcq',
      options: [
        {
          text: 'Analogue tape mixing targeted 0 VU (+4 dBu), maintaining 14-18 dB of dynamic crest factor above the noise floor; the 1990s introduction of digital lookahead peak limiters (e.g. Waves L1) ignited the "Loudness War", where masters were hyper-compressed to -6 LUFS to sound louder on CD; today, streaming algorithms (Spotify, Apple Music) apply loudness normalization (-14 LUFS), disincentivizing extreme clipping and restoring dynamic range.',
          score: 4,
          summary: 'Dynamic Standards: Analogue 0 VU headroom standards contrasted with 1990s digital lookahead maximizers (-6 LUFS Loudness War) and modern -14 LUFS streaming loudness normalization restoring dynamic balance (AO3+AO4 Level 4/5).'
        },
        {
          text: 'Analogue masters were quieter with dynamic range, but digital peak limiters made CDs louder and louder until streaming services introduced loudness normalization.',
          score: 2,
          summary: 'Dynamic Standards: Quieter analogue masters vs CD loudness war and streaming normalization (AO3 descriptive only).'
        },
        {
          text: 'Music used to be quiet on vinyl, but now music is always blasted at maximum volume on Spotify.',
          score: 1,
          summary: 'Dynamic Standards: Quiet vinyl vs loud Spotify (Level 1 basic).'
        },
        {
          text: 'Digital audio is physically incapable of exceeding -30 dB under any circumstance.',
          score: 0,
          summary: 'Dynamic Standards: Factually incorrect.'
        }
      ]
    },
    {
      id: 'q5_democratization',
      label: 'Economic & Acoustic Democratization: Commercial Facilities vs Bedroom Studios',
      helperText: 'Evaluate the cultural and creative shift from high-budget studio environments to home computer production.',
      type: 'mcq',
      options: [
        {
          text: 'Producing commercial-grade records historically required six-figure budgets to book acoustically treated studio rooms designed by acoustic architects; the DAW revolution, combined with affordable USB interfaces, room correction DSP (e.g., Sonarworks), and high-resolution modeling headphones, has democratized music technology, allowing Grammy-winning records (e.g., Billie Eilish / Finneas) to be conceived, tracked, and mixed inside untreated residential bedrooms.',
          score: 4,
          summary: 'Democratization: Commercial acoustic facilities requiring massive corporate budgets contrasted with bedroom laptop democratization empowered by room DSP calibration and affordable modeled software (AO3+AO4 Level 4/5).'
        },
        {
          text: 'You used to have to spend lots of money to record in professional commercial studios, but now anyone can produce hit records at home with a laptop and audio interface.',
          score: 2,
          summary: 'Democratization: Expensive commercial studios vs producing at home with laptop and interface (AO3 descriptive only).'
        },
        {
          text: 'Big studios went out of business because everyone bought laptops.',
          score: 1,
          summary: 'Democratization: Oversimplified claim (Level 1 basic).'
        },
        {
          text: 'Home recording was invented in 2024 by artificial intelligence companies.',
          score: 0,
          summary: 'Democratization: Factually incorrect.'
        }
      ]
    }
  ],
  exemplar: `[EXAMINER MARK SCHEME MODEL ANSWER — 20/20 MARKS — THE DAW REVOLUTION]

INTRODUCTION:
The transition from large-format analogue consoles and multitrack magnetic tape to modern Digital Audio Workstations (DAWs) represents the most disruptive technological paradigm shift in recording history. This essay critically evaluates how digital summing architectures, total instant recall, virtual DSP plugin ecosystems, the 'Loudness War', and the democratization of recording technology have fundamentally reshaped production workflows and musical aesthetics.

1. SUMMING ARCHITECTURE: ANALOGUE CROSSTALK VS FLOATING-POINT CLARITY (AO3/AO4):
Classic analogue mixing relied on consoles like the Solid State Logic (SSL) 4000E or Neve 8078. As audio channels were summed across copper bus bars, natural electrical phenomena occurred: inter-channel crosstalk, transformer harmonic saturation (generating warm second and third harmonics), and subtle phase variance. These non-linear artifacts imparted a cohesive, perceived 'three-dimensional' acoustic glue. In contemporary DAWs (e.g., Pro Tools, Logic Pro X, Ableton Live), summing is performed mathematically via 32-bit or 64-bit floating point algorithms. With over 1,500 dB of internal mathematical dynamic range, digital summing introduces zero phase drift, zero inter-channel bleed, and near-zero harmonic distortion. While audiophiles initially lamented the loss of analogue console coloration, modern mixing engineers embrace this clinical precision, choosing to selectively inject analog warmth via modelled non-linear saturation plugins (e.g., Soundtoys Decapitator, Slate VCC) only where musically appropriate.

2. WORKFLOW & TOTAL RECALL (AO3/AO4):
In the analogue era, recalling a mix was an arduous, error-prone procedure. Assistant engineers spent hours documenting every fader position, EQ potentiometer, and auxiliary send across 48 console channels on paper recall sheets, alongside outboard gear settings. If an artist or label requested a minor lead vocal boost (+0.5 dB) days later, recreating the identical acoustic balance was nearly impossible. DAWs revolutionized this process through Total Recall. A complete multitrack session, including hundreds of plug-in settings, sample-accurate vector automation lanes, and routing configurations, loads instantaneously. This has fundamentally transformed mixing into a non-linear, collaborative, and iterative art form, allowing producers to experiment fearlessly with automated volume rides, filter sweeps, and pitch modulations without fear of destructive consequences.

3. RESOURCE ACCESS: PHYSICAL OUTBOARD RACKS VS VIRTUAL DSP (AO3/AO4):
Historically, production choices were strictly dictated by physical studio inventory. High-end commercial studios might boast two Universal Audio 1176s, an LA-2A, and a single Lexicon 480L digital reverb unit costing thousands of pounds. Engineers had to print effects or submix multiple backing vocalists through a single compressor. Today, modern multi-core computers empower producers to instantiate dozens of precision-modelled Pultec EQs, Fairchild limiters, and convolution reverbs across every single audio channel. Processing limitations have dissolved from financial budget constraints to pure creative vision.

4. DYNAMIC PHILOSOPHY & THE LOUDNESS WAR (AO3/AO4):
Analogue tape machines operated around standard 0 VU reference levels (+4 dBu), leaving 14 to 18 dB of dynamic crest factor before tape saturation occurred. With the advent of digital recording (16-bit/44.1 kHz CDs) and the 1994 release of the Waves L1 lookahead peak limiter, engineers discovered that lookahead algorithms could brickwall clip transient peaks with minimal apparent distortion. This sparked the infamous 'Loudness War' of the late 1990s and 2000s (exemplified by albums like Metallica's *Death Magnetic*), where masters were hyper-compressed to -6 to -8 LUFS to stand out on commercial FM radio and multi-disc CD changers. However, this dynamic obliteration caused severe listener fatigue and flat soundstages. In the late 2010s, streaming platforms (Spotify, Apple Music, YouTube) introduced automated Loudness Normalization, matching playback to approximately -14 LUFS. By penalizing over-limited tracks with automatic attenuation, streaming technology has effectively ended the Loudness War, encouraging contemporary engineers to restore micro-dynamics, transient punch, and spacious crest factors to modern mixes.

5. DEMOCRATIZATION OF MUSIC PRODUCTION (AO3/AO4):
Perhaps the most profound impact of the DAW revolution is economic. Until the 1990s, recording a commercially competitive record required hundreds of thousands of dollars to fund access to treated acoustic rooms, calibrated tape machines, and union engineers. Today, an affordable laptop running a £150 DAW, paired with a £100 audio interface and acoustic calibration software (e.g., Sonarworks SoundID Reference), provides professional-grade recording capabilities. Landmark Grammy-winning records like Billie Eilish's *When We All Fall Asleep, Where Do We Go?* (produced by Finneas in an untreated residential bedroom) prove that technical mastery, ear training, and digital signal flow understanding have superseded the necessity of multi-million-dollar commercial recording facilities.

CONCLUSION:
In conclusion, the DAW revolution has radically democratized music creation. By replacing physical console limitations with infinite floating-point digital workspaces, instant recall, and pristine dynamic control, the computer has evolved from a simple recording medium into the central creative instrument of 21st-century music technology.`
};

worksheetQ6.tracks = [worksheetQ6.tracks[0], track2, track3];

fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2), 'utf8');
console.log('✓ Successfully added Track 2 and Track 3 to worksheet-ao3-ao4-q6! Total tracks now: ' + worksheetQ6.tracks.length);
