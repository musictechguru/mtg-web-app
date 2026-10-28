"""
Builds public/interactive-slide-early-multitrack.html (15 slides)
Based on authentic Google Slide curriculum: Early multitrack recording (c.1964 - 1969).
Theme: Deep Warm Walnut/Navy with Amber & Gold accents (#f59e0b / #fbbf24).
Matches exact clean layout of interactive-slide-direct-to-tape.html.
All 42 cards feature 100% UNIQUE, authentic historical images with ZERO duplicates.
"""
import re, os

SRC = 'public/interactive-slide-direct-to-tape.html'
OUT = 'public/interactive-slide-early-multitrack.html'

direct = open(SRC, encoding='utf-8').read()

# Extract css from direct-to-tape which has the exact verified layout
css = re.search(r'<style>(.*?)</style>', direct, re.S).group(1)

TOTAL = 15
IMG = '/images/slides/early_multitrack/'

def thumb(name, alt):
    return f'<img src="{IMG}{name}" alt="{alt}" class="slide-thumb">'

def vid(i, title, label):
    return (
        f'<div class="video-btn-row">'
        f'<button class="video-trigger-btn" onclick="openVideo(\'{i}\', \'{title}\')">▶ {label}</button>'
        f'<a href="https://www.youtube.com/watch?v={i}" target="_blank" rel="noopener noreferrer" class="yt-direct-btn" title="Watch directly on YouTube">'
        f'<svg width="13" height="13" viewBox="0 0 24 24" fill="#ef4444" style="vertical-align: -1px; margin-right: 3px;">'
        f'<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>'
        f'</svg>YouTube ↗</a></div>'
    )

def card(cls, inner):
    return f'<div class="info-card {cls}">{inner}</div>'

slides = []

def slide(icon, eyebrow, heading, lead, body):
    n = len(slides) + 1
    slides.append(f'''
      <section class="slide" data-slide="{n}">
        <div class="slide-eyebrow"><span>{icon}</span> {eyebrow}</div>
        <h2 class="slide-heading">{heading}</h2>
        <p class="slide-lead">{lead}</p>
        {body}
      </section>''')

G = lambda items, n=3: f'<div class="grid-{n}">' + ''.join(items) + '</div>'

# 1 COVER
slides.append(f'''
      <section class="slide active" data-slide="1">
        <div class="slide-eyebrow"><span>🎛️</span> Evolutionary Era 02 &bull; Component 3 Music Technology in Context</div>
        <h1 class="slide-heading">Early Multitrack Recording <span>(c.1964 – 1969)</span></h1>
        <p class="slide-lead">The golden era where the recording studio transitioned from a documentation room into a musical instrument. Explore 4-track tape machines, reduction bouncing, tube mixing consoles, optical &amp; variable-mu compression, plate reverbs, ADT, fuzz, and the birth of modern psychedelic rock and soul.</p>
        <div class="grid-3" style="margin-top: 10px;">
          <div class="info-card highlight"><span class="spec-pill ao4">AO4 Musical Styles</span><h4>Soul to Psychedelic Rock</h4><p>Motown &amp; Atlantic Soul (<strong>Sam Cooke</strong>, <strong>Aretha Franklin</strong>), British psychedelic innovation (<strong>The Beatles</strong>, <strong>Pink Floyd</strong>), and blues-rock power trios (<strong>Cream</strong>).</p></div>
          <div class="info-card cyan-edge"><span class="spec-pill ao3">AO3 Studio Mechanics</span><h4>4-Track Tape &amp; Bouncing</h4><p>Master 1-inch tape, <strong>Studer J37</strong>, <strong>Sel-Sync</strong> synchronous overdubbing, <strong>reduction mixing</strong> ("bouncing down"), and accumulating generational tape hiss.</p></div>
          <div class="info-card acid-edge"><span class="spec-pill ao3">AO3 Studio Innovations</span><h4>ADT, Flanging &amp; Fuzz</h4><p>Ken Townsend's <strong>Automatic Double Tracking</strong>, tape reel flanging, <strong>EMT 140 plate reverb</strong>, <strong>Fairchild 670</strong>, <strong>Teletronix LA-2A</strong>, and Arbiter Fuzz Face clipping.</p></div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
          <button class="nav-btn" onclick="nextSlide()" style="background: #f59e0b; color: #080d1a; border-color: #f59e0b; font-weight: 700;">Start Interactive Deck &rarr;</button>
          <span style="font-size: 12px; color: var(--text-muted);">Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> to navigate</span>
        </div>
      </section>''')

# 2 SYLLABUS ROADMAP
slide('📋', 'Specification Roadmap', 'Component 3 <span>Syllabus Matrix for 1964–1969</span>',
      'Edexcel requires deep technical analysis of 4-track tape machines, reduction bouncing, valve mixing desks, vintage outboard, and signature instruments from this revolutionary era.',
      G([
          card('highlight', f'''{thumb('studer_a800_multitrack.jpg', 'Studer Multitrack Tape Transport')}
               <span class="spec-pill ao3">AO3 Recording Technology</span>
               <h4>4-Track Tape &amp; Bouncing</h4>
               <p>1-inch magnetic tape at 15 ips; Studer J37; Sel-Sync overdubbing; reduction mixes (4-to-1 bouncing); generational loss trade-offs.</p>'''),
          card('cyan-edge', f'''{thumb('emt_140_plate.jpg', 'EMT 140 Steel Plate Reverb')}
               <span class="spec-pill ao3">AO3 Studio Outboard</span>
               <h4>Plates, Valves &amp; Optics</h4>
               <p>EMT 140 cold-rolled steel plate reverb; Fairchild 670 variable-mu valve limiting; Teletronix LA-2A electro-optical compression.</p>'''),
          card('acid-edge', f'''{thumb('fuzz_face_original.jpg', 'Dallas-Arbiter Fuzz Face Pedal')}
               <span class="spec-pill ao3">AO3 Effects &amp; Instruments</span>
               <h4>ADT, Flanging &amp; Fuzz</h4>
               <p>Abbey Road ADT; manual tape flanging; Arbiter Fuzz Face transistor saturation; Vox wah-wah; Hammond B3 &amp; Leslie 122 rotary speaker.</p>''')
      ]))

# 3 SOUL & R&B
slide('🎷', 'Musical Evolution: Soul & R&B', 'The Golden Era <span>of 1960s Soul</span>',
      'During the mid-1960s, American Soul music established iconic production techniques across Detroit (Motown), Memphis (Stax), and New York (Atlantic).',
      G([
          card('highlight', f'''{thumb('sam_cooke_portrait.jpg', 'Sam Cooke')}
               <span class="spec-pill ao4">AO4 Orchestral Soul</span>
               <h4>Sam Cooke (1964)</h4>
               <p><em>"A Change Is Gonna Come"</em>: Tracked at RCA Studios Hollywood. Lush symphonic French horn, orchestral strings, and deep acoustic plate reverberation.</p>
               {vid('wEBlaMOmKV4', 'Sam Cooke - A Change Is Gonna Come (1964)', 'Listen: A Change Is Gonna Come')}'''),
          card('cyan-edge', f'''{thumb('aretha_franklin_1968.jpg', 'Aretha Franklin at the Piano')}
               <span class="spec-pill ao4">AO4 Atlantic Rhythm</span>
               <h4>Aretha Franklin: "Respect" (1967)</h4>
               <p>Engineered by Tom Dowd on 8-track tape at Atlantic Studios NYC. Features punchy brass section, tight drum pocket, Hammond organ, and dynamic call-and-response backing vocals.</p>
               {vid('6FOUqQt3Kg0', 'Aretha Franklin - Respect (1967)', 'Listen: Respect')}'''),
          card('acid-edge', f'''{thumb('hitsville_usa_motown.jpg', 'Motown Hitsville U.S.A. Studio A')}
               <span class="spec-pill ao3">AO3 Studio Technique</span>
               <h4>The Funk Brothers &amp; Stax</h4>
               <p>James Jamerson tracked direct-injected (DI) Fender Precision Bass with flatwound strings. Tight drum miking with heavy damping created punchy rhythmic drive.</p>''')
      ]))

# 4 PSYCHEDELIC ROCK
slide('🎸', 'Musical Evolution: Psychedelic Rock', 'The Studio <span>as a Musical Instrument</span>',
      'By 1967, British and American rock artists abandoned traditional live performance limitations, utilizing multitrack tape, sound effects, and studio manipulation to craft expansive sonic landscapes.',
      G([
          card('highlight', f'''{thumb('sgt_pepper_drum_skin.jpg', 'The Beatles Sgt. Pepper Bass Drum')}
               <span class="spec-pill ao4">AO4 Landmark Album</span>
               <h4>The Beatles: Sgt. Pepper (1967)</h4>
               <p>George Martin and Geoff Emerick pushed Abbey Road 4-track tape machines to their limits using reduction bounces, Indian sitar/tabla, brass, and audience applause effects.</p>
               {vid('guiNy0jSKkI', 'Deconstructing Sgt Pepper 4-Track Sessions', 'Watch: Sgt. Pepper 4-Track Deconstructed')}'''),
          card('cyan-edge', f'''{thumb('pink_floyd_1967_syd.jpg', 'Pink Floyd 1967 with Syd Barrett')}
               <span class="spec-pill ao4">AO4 Psychedelic Exploration</span>
               <h4>Pink Floyd: Syd Barrett Era</h4>
               <p><em>"Point Me at the Sky"</em> &amp; <em>Piper at the Gates of Dawn</em>: Slide guitars through tape delays, panning echoes, Hammond organ drones, and avant-garde tape loops.</p>'''),
          card('acid-edge', f'''{thumb('cream_clapton_bruce.jpg', 'Cream: Clapton, Bruce & Baker')}
               <span class="spec-pill ao4">AO4 Blues-Rock Heavyweight</span>
               <h4>Cream: "White Room" (1968)</h4>
               <p>Jack Bruce's overdriven Gibson EB-3 bass, Ginger Baker's jazz-influenced drums, and Eric Clapton's signature Vox wah-wah pedal soloing through Marshall stacks.</p>''')
      ]))

# 5 HAMMOND ORGAN & LESLIE SPEAKER
slide('🎹', 'Iconic Instruments', 'The Hammond Organ <span>&amp; Leslie 122 Rotary Speaker</span>',
      'The defining keyboard texture of 1960s rock, soul, and gospel: an electro-mechanical tone-wheel organ paired with an acoustic rotating speaker cabinet.',
      G([
          card('highlight', f'''{thumb('hammond_c3_organ.jpg', 'Hammond Organ Keyboards and Drawbars')}
               <span class="spec-pill ao3">AO3 Electro-Mechanical Sound</span>
               <h4>Hammond B3 Tone-Wheels</h4>
               <p>Steel tone-wheels with grooved edges spin past electromagnetic pickups at precise speeds, generating pure sine-wave harmonics. Drawbars mix harmonic octaves (16\' to 1\').</p>'''),
          card('cyan-edge', f'''{thumb('leslie_diagram.svg', 'Leslie Speaker Acoustic Dispersion Diagram')}
               <span class="spec-pill ao3">AO3 Acoustic Modulation</span>
               <h4>The Doppler Effect</h4>
               <p>A rotating treble horn and downward-firing bass rotor spin via dual-speed motors (Chorale slow ~40 RPM vs Tremolo fast ~400 RPM), creating continuous Doppler pitch shift, amplitude tremolo, and phase phasing.</p>'''),
          card('acid-edge', f'''{thumb('leslie_speaker_original.jpg', 'Leslie Rotary Speaker Cabinet')}
               <span class="spec-pill ao3">AO3 Microphone Technique</span>
               <h4>Stereo Miking Rotary Cabs</h4>
               <p>Standard practice: a stereo pair of dynamic mics (Shure SM57 or Sennheiser MD421) on the upper horn (panned hard left/right) and a single dynamic mic on the lower bass drum.</p>
               {vid('6jKme27M6xU', 'Inside the Hammond Organ & Leslie 122', 'Watch: Hammond & Leslie Demo')}''')
      ]))

# 6 MELLOTRON & ELECTRIC PIANOS
slide('🎼', 'Analog Sampling Revolution', 'The Mellotron M400 <span>&amp; Wurlitzer Electric Piano</span>',
      'Before digital samplers or ROMpler synthesizers existed, 1960s studios used physical tape playback mechanisms and electro-mechanical tines to create orchestral and keyboard sounds.',
      G([
          card('highlight', f'''{thumb('mellotron_m400_classic.jpg', 'Mellotron M400 Tape Replay Keyboard')}
               <span class="spec-pill ao3">AO3 Pre-Digital Sampling</span>
               <h4>Mellotron: Analog Tape Replay</h4>
               <p>Pressing a key lowers a pinch roller, pulling an authentic 3/8" magnetic tape strip across an audio playback head. Each key holds a discrete 8-second recording of real violins, flutes, or choirs.</p>'''),
          card('cyan-edge', f'''{thumb('wurlitzer_200a_electronic.jpg', 'Wurlitzer 200A Electric Piano')}
               <span class="spec-pill ao3">AO3 Electro-Mechanical Keys</span>
               <h4>Wurlitzer 200A Electric Piano</h4>
               <p>Felt hammers strike tuned steel reeds (tines). Electrostatic pickups convert vibrations into electrical voltage, routed through a built-in optical tremolo circuit for a warm, biting tone.</p>'''),
          card('acid-edge', f'''{thumb('vox_continental_combo.jpg', 'Vox Continental Combo Organ')}
               <span class="spec-pill ao4">AO4 Studio Landmark</span>
               <h4>Vox Continental &amp; Combo Keys</h4>
               <p>Transistor-based combo organs delivered punchy, thin, cutting treble sounds favored by British Invasion and psychedelic bands (The Doors, The Animals), contrasting the warm tubey Hammond organ.</p>''')
      ]))

# 7 GUITARS & VALVE AMPLIFICATION
slide('⚡', 'Electrified Tone', 'British Invasion <span>&amp; High-Gain Valve Stacks</span>',
      'The mid-1960s saw the emergence of massive rock concert venues, driving amp designers to create ultra-loud, saturated valve circuits.',
      G([
          card('highlight', f'''{thumb('fender_twin_reverb_silver.jpg', 'Fender Twin Reverb Valve Amplifier')}
               <span class="spec-pill ao3">AO3 American Clean Headroom</span>
               <h4>Fender Twin Reverb (1965)</h4>
               <p>85W valve circuit powered by four 6L6 power tubes and two 12" speakers. Prized for pristine clean headroom, lush dual-spring reverb, and optoisolator tremolo.</p>'''),
          card('cyan-edge', f'''{thumb('marshall_stack_classic.jpg', 'Marshall Valve Full Stack Amplifier')}
               <span class="spec-pill ao3">AO3 British Overdrive</span>
               <h4>Marshall 100W Super Lead (Plexi)</h4>
               <p>Jim Marshall developed 100W EL34 power-valve heads paired with 4x12 closed-back cabinets loaded with Celestion Greenbacks, delivering muscular crunch and singing sustain (Pete Townshend, Jimi Hendrix).</p>'''),
          card('acid-edge', f'''{thumb('rickenbacker_360_12.jpg', 'Rickenbacker 360/12 Electric Guitar')}
               <span class="spec-pill ao3">AO3 Transducer Physics</span>
               <h4>The 1960s Jangle (Rickenbacker)</h4>
               <p>George Harrison and Roger McGuinn popularized the 12-string electric guitar, producing bright chorus jangle through "toaster-top" single-coil pickups and heavy studio optical compression.</p>''')
      ]))

# 8 SIGNAL FLOW EVOLUTION
slide('🔄', 'Studio Architecture', 'From 1950s Live Room <span>to 1960s Multitrack Control Room</span>',
      'The transition from tracking all performers live around 1–2 shared microphones to routing dedicated microphones through mixing desks onto discrete multitrack tape channels.',
      G([
          card('highlight', f'''{thumb('abbey_road_live_room_historic.jpg', 'Abbey Road Historic Live Room Tracking')}
               <span class="spec-pill ao3">AO3 1950s Signal Chain</span>
               <h4>1950s: Direct-to-Mono</h4>
               <p>Musicians &rarr; Mics &rarr; Passive Console &rarr; Mono Tape Machine. Balance achieved strictly via musician physical distance and room acoustics; zero overdubbing capability.</p>'''),
          card('cyan-edge', f'''{thumb('abbey_road_control_room_vintage.jpg', 'Vintage 1960s Multitrack Control Room')}
               <span class="spec-pill ao3">AO3 1960s Multitrack Chain</span>
               <h4>Mid-1960s: Multitrack Tracking</h4>
               <p>Isolated Mics &rarr; REDD Console Preamps &rarr; 4-Track Tape Recorder &rarr; Individual Channel Faders &amp; Outboard Sends &rarr; Stereo/Mono Master Recorder.</p>'''),
          card('acid-edge', f'''{thumb('studio_acoustic_gobo_screens.jpg', 'Studio Acoustic Gobos & Separation Baffles')}
               <span class="spec-pill ao3">AO3 Overdub Isolation</span>
               <h4>Gobos, Booths &amp; Cues</h4>
               <p>Musicians wore headphones to monitor prerecorded rhythm tracks. Acoustic baffles (gobos) and vocal isolation booths minimized bleed between electric and acoustic instruments.</p>''')
      ]))

# 9 4-TRACK TAPE MECHANICS
slide('📼', 'Magnetic Precision', 'The Studer J37 <span>&amp; Sel-Sync Overdubbing</span>',
      'The Studer J37, installed at Abbey Road in 1965, was a massive 300-pound Swiss-engineered masterpiece containing 52 vacuum tubes running 1-inch magnetic tape.',
      G([
          card('highlight', f'''{thumb('studer_tape_head_reels.jpg', 'Reel-to-Reel Tape Transport & Guides')}
               <span class="spec-pill ao3">AO3 Tape Mechanics</span>
               <h4>1-Inch 4-Track Format</h4>
               <p>Dividing 1-inch tape into 4 discrete audio tracks provided high track width, preserving wide dynamic range and low tape hiss at 15 inches per second (ips).</p>'''),
          card('cyan-edge', f'''{thumb('tape_head_gap_magnetic.jpg', 'Tape Record Head Electromagnetic Gap')}
               <span class="spec-pill ao3">AO3 Head Physics</span>
               <h4>Erase &bull; Record &bull; Playback</h4>
               <p>The tape passes the Erase head (high-frequency AC demagnetizes tape), the Record head (electromagnet aligns iron oxide), and the Playback head (reads magnetic flux).</p>'''),
          card('acid-edge', f'''{thumb('studer_bouncing_diagram.svg', 'Sel-Sync Synchronous Head Monitoring')}
               <span class="spec-pill ao3">AO3 Synchronous Monitoring</span>
               <h4>Sel-Sync Monitoring</h4>
               <p>Without Sel-Sync, monitoring via the playback head caused a noticeable audio delay (~100ms lag). Sel-Sync temporarily converts the Record head into a playback head, enabling perfect synchronization during overdubs.</p>''')
      ]))

# 10 REDUCTION MIXING & BOUNCING
slide('🎚️', 'Studio Commitment', 'Reduction Mixing: <span>"Bouncing Down" at Abbey Road</span>',
      'With only 4 discrete tracks available on a single machine, ambitious arrangements required bouncing submixes across multiple tape recorders.',
      G([
          card('highlight', f'''{thumb('abbey_road_studer_j37_pair.jpg', 'Studer Tape Machines for Track Bouncing')}
               <span class="spec-pill ao3">AO3 Reduction Technique</span>
               <h4>The 4-to-1 Bounce</h4>
               <p>Drums, bass, rhythm guitar, and keyboards were recorded across tracks 1–4 of Machine 1. These 4 tracks were mixed in real time onto Track 1 of Machine 2, freeing 3 fresh tracks for lead vocals, solos, and orchestra.</p>'''),
          card('cyan-edge', f'''{thumb('tape_hiss_noise_reduction.jpg', 'Dolby A-Type Noise Reduction Unit')}
               <span class="spec-pill ao3">AO3 Audio Trade-offs</span>
               <h4>Generational Loss &amp; Hiss</h4>
               <p>Every reduction bounce transferred audio through another stage of magnetic tape and valve circuits. Tape hiss increased by +3 dB per generation, slight high-frequency clarity was lost, and wow &amp; flutter accumulated.</p>'''),
          card('acid-edge', f'''{thumb('magnetic_tape_master_reel.jpg', '10.5-inch Metal Reel of Master Magnetic Tape')}
               <span class="spec-pill ao3">AO3 Engineering Discipline</span>
               <h4>Pre-Mix Commitment</h4>
               <p>Unlike modern DAW multitracks, once drums and bass were bounced together onto a single track, their relative balance, EQ, and reverb could never be adjusted again during the final mix!</p>''')
      ]))

# 11 VALVE MIXING CONSOLES
slide('🎛️', 'Preamps & Equalization', 'The EMI REDD Consoles: <span>REDD.37 &amp; REDD.51</span>',
      'Designed by the Record Engineering Development Department (REDD) for Abbey Road Studios, these tube mixing desks defined the British recording sound.',
      G([
          card('highlight', f'''{thumb('vintage_mixing_console_tubes.jpg', 'Vintage Valve Mixing Desk')}
               <span class="spec-pill ao3">AO3 Console Architecture</span>
               <h4>REDD.37 &amp; REDD.51 Desks</h4>
               <p>Featured 8 input channels, 4 main mix group outputs, and Siemens valve amplification. Built with heavy steel chassis, stepped rotary faders, and illuminated quadrant PPM meters.</p>'''),
          card('cyan-edge', f'''{thumb('vacuum_tube_valve_glow.jpg', 'Glowing Vacuum Tubes & Preamps')}
               <span class="spec-pill ao3">AO3 Valve Preamplification</span>
               <h4>Siemens V72 Amplifiers</h4>
               <p>German telecommunications tube modules delivering +34 dB of ultra-clean, warm analog gain with vanishingly low harmonic distortion and rich transformer saturation.</p>'''),
          card('acid-edge', f'''{thumb('audio_equalizer_controls.jpg', 'Analog Shelving and Peaking Equalizer Controls')}
               <span class="spec-pill ao3">AO3 Filter Curves</span>
               <h4>"Classic" vs "Pop" EQ</h4>
               <p>Plug-in EQ cassettes: "Classic" EQ provided gentle shelving (100 Hz bass / 10 kHz treble) for classical orchestras; "Pop" EQ provided an aggressive +10 dB presence peak at 5 kHz to make vocals and guitars cut through.</p>''')
      ]))

# 12 DISTORTION, FUZZ & WAH-WAH
slide('💥', 'Guitar Stompboxes', 'Analog Distortion: <span>Fuzz Face &amp; The Wah-Wah Pedal</span>',
      'In the mid-to-late 1960s, guitarists began deliberately pushing transistors and filter circuits to create aggressive, harmonic-rich overdrive and vocal-like modulation.',
      G([
          card('highlight', f'''{thumb('fuzz_face_pedal_vintage.jpg', 'Vintage Dallas-Arbiter Fuzz Face Pedal')}
               <span class="spec-pill ao3">AO3 Hard Clipping</span>
               <h4>Arbiter Fuzz Face (1966)</h4>
               <p>Simple 2-transistor circuit (early NKT275 Germanium, later Silicon). Slices off audio waveform peaks (hard clipping), creating rich square waves, metallic upper harmonics, and near-infinite sustain (Jimi Hendrix).</p>'''),
          card('cyan-edge', f'''{thumb('vox_wah_pedal_crybaby.jpg', 'Vintage Vox Cry Baby Wah-Wah Pedal')}
               <span class="spec-pill ao3">AO3 Resonant Band-Pass Filter</span>
               <h4>Vox V846 Wah-Wah (1967)</h4>
               <p>A foot treadle sweeps a high-Q resonant band-pass filter peak (via an internal Fasel inductor) between 400 Hz and 2.5 kHz. Sweeping across human vowel formant frequencies produces the iconic "wah-wah" cry.</p>'''),
          card('acid-edge', f'''{thumb('distortion_overdrive_waveform.jpg', 'Harmonic Distortion Waveform Clipping')}
               <span class="spec-pill ao3">AO3 Harmonic Physics</span>
               <h4>Soft vs Hard Clipping</h4>
               <p>Overdriven valve preamps round off waveform peaks gently (soft clipping), generating warm even-order 2nd harmonics. Transistor fuzz pedals slice peaks abruptly (hard clipping), generating aggressive odd-order harmonics.</p>''')
      ]))

# 13 VINTAGE COMPRESSION
slide('🗜️', 'Dynamic Control', 'Vintage Compressors: <span>Fairchild 670 &amp; Teletronix LA-2A</span>',
      'The 1960s introduced the two most celebrated dynamic processor topologies in recording history: variable-mu tube limiting and electro-optical leveling.',
      G([
          card('highlight', f'''{thumb('fairchild_670.svg', 'Fairchild 670 Stereo Limiter Panel')}
               <span class="spec-pill ao3">AO3 Variable-Mu Limiting</span>
               <h4>Fairchild 670 (Stereo)</h4>
               <p>Rein Narma design weighing 65 lbs with 20 vacuum tubes and 14 transformers. Uses vacuum tubes (6386) to vary gain directly. Ultra-fast attack times (down to 50 microseconds) tame aggressive drum transients and glue mixes.</p>'''),
          card('cyan-edge', f'''{thumb('teletronix_la2a_front.jpg', 'Teletronix LA-2A Optical Leveling Amplifier')}
               <span class="spec-pill ao3">AO3 Electro-Optical Leveling</span>
               <h4>Teletronix LA-2A (Mid-60s)</h4>
               <p>Uses a T4 electro-optical attenuator: an electroluminescent light panel shining on a cadmium-sulfide photocell. The physical lag of the photocell produces smooth, musical, program-dependent multi-stage release curves.</p>'''),
          card('acid-edge', f'''{thumb('studio_outboard_rack_gear.jpg', '19-inch Studio Outboard Equipment Rack')}
               <span class="spec-pill ao3">AO3 Practical Tracking</span>
               <h4>Where Were They Used?</h4>
               <p>Fairchild 670 was standard on Abbey Road drum overheads, bass, and cutting vinyl master discs. The LA-2A became the gold standard for lead vocals, smoothing dynamic peaks without audible pumping.</p>''')
      ]))

# 14 STUDIO INNOVATION & TAPE EFFECTS
slide('🌀', 'Abbey Road Inventions', 'Studio Magic: <span>EMT 140 Plate, ADT &amp; Tape Flanging</span>',
      'Abbey Road technical engineers invented legendary analog effects to fulfill the creative demands of The Beatles, Pink Floyd, and George Martin.',
      G([
          card('highlight', f'''{thumb('reverb_plate_mechanics_diagram.svg', 'Acoustic Steel Plate Reverb Transducer Diagram')}
               <span class="spec-pill ao3">AO3 Plate Reverb Mechanics</span>
               <h4>EMT 140 Steel Plate Reverb</h4>
               <p>A massive 1×2 meter cold-rolled steel plate suspended in springs. Audio drives a transducer into the plate; contact pickups capture dense, shimmering reflections. A movable mechanical damping pad adjusts decay from 0.5s to 5.0s.</p>'''),
          card('cyan-edge', f'''{thumb('tape_delay_echo_machine.jpg', 'Tape Delay Unit with Variable Speed Control')}
               <span class="spec-pill ao3">AO3 Tape Delay Innovation</span>
               <h4>Ken Townsend\'s ADT</h4>
               <p>Invented in 1966 for John Lennon. The sync playback head audio was sent to a second tape recorder driven by a Variable Speed Oscillator (VSO). The micro-delayed copy (10–45ms) with natural pitch drift perfectly simulated a doubled vocal take.</p>'''),
          card('acid-edge', f'''{thumb('flanger_comb_filter_sweep_diagram.svg', 'Reel Flange Manual Tape Flanging Comb Filter Diagram')}
               <span class="spec-pill ao3">AO3 Modulation Physics</span>
               <h4>Manual Tape Flanging</h4>
               <p>Two tape machines play identical audio simultaneously. The engineer presses a thumb onto the metal rim (flange) of one supply reel, momentarily slowing it down. Combining the two signals creates moving phase cancellations (comb filtering).</p>''')
      ]))

# 15 CONSUMER FORMATS & VINYL STEREO
slide('💿', 'The Vinyl Revolution', 'Consumer Formats: <span>Mono 45s vs 33⅓ RPM Stereo LPs</span>',
      'In the 1960s, teenagers consumed pop music on mono 7-inch 45 RPM singles, while full-length albums transitioned to 12-inch 33⅓ RPM stereo vinyl microgroove discs.',
      G([
          card('highlight', f'''{thumb('vinilos_distintos_tamanos.jpg', 'Various Vinyl Microgroove Records (12-inch and 7-inch)')}
               <span class="spec-pill ao3">AO3 Cutting Physics</span>
               <h4>The 45°/45° Microgroove</h4>
               <p>The vinyl cutter stylus cuts a V-shaped groove: lateral (side-to-side) motion represents mono (L+R); vertical (up-and-down) motion represents stereo difference (L-R). Extreme stereo panning required careful mastering.</p>'''),
          card('cyan-edge', f'''{thumb('stereo_soundstage_panning_hq.svg', 'Stereo Spatial Panning Soundstage Diagram')}
               <span class="spec-pill ao3">AO3 Mixing Conventions</span>
               <h4>The "Hard-Panning" Phenomenon</h4>
               <p>Because early 4-track mixing desks had 3-position switches (Left, Center, Right) rather than continuous pan pots, early stereo mixes placed entire rhythm sections in the left speaker and vocals entirely in the right!</p>'''),
          card('acid-edge', f'''{thumb('riaa_eq_curve_graph.png', 'RIAA Equalization Recording & Playback Curve')}
               <span class="spec-pill ao3">AO3 Mastering Curves</span>
               <h4>The RIAA Equalization Curve</h4>
               <p>During cutting, deep bass frequencies were cut by -20 dB (to prevent wide groove excursions throwing the stylus), while highs were boosted +20 dB. Phono preamps applied the exact inverse curve during playback to restore flat response.</p>
               {vid('beMV5wcf0js', 'The History of Vinyl Disc Manufacture', 'Watch: Vinyl Manufacture & Mastering')}''')
      ]))

slides_html = '\n'.join(slides)

full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Early Multitrack Recording (1964–1969) | A-Level Music Technology Deck</title>
  <style>
{css}
  </style>
</head>
<body>
  <div class="deck-wrapper">
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music Technology in Context</div>
      <div class="deck-topic-title">Topic: <strong>Early Multitrack Recording (1964–1969)</strong></div>
    </header>

    <main class="slides-viewport" id="slidesViewport">
{slides_html}
    </main>

    <footer class="deck-controls">
      <button class="nav-btn" id="prevBtn" onclick="prevSlide()" disabled>&larr; Previous</button>
      <div class="progress-container">
        <span class="slide-counter" id="slideCounter">Slide 1 of {TOTAL}</span>
        <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
      </div>
      <button class="nav-btn" id="nextBtn" onclick="nextSlide()">Next &rarr;</button>
    </footer>
  </div>

  <!-- Video Modal -->
  <div class="video-modal-backdrop" id="videoModal">
    <div class="video-modal-content">
      <div class="video-modal-header">
        <span class="video-modal-title" id="videoModalTitle">Video Clip</span>
        <div style="display: flex; gap: 10px; align-items: center;">
          <a id="videoExternalLink" href="#" target="_blank" rel="noopener noreferrer" class="external-yt-link" title="Open directly on YouTube">
            <span>Open in YouTube</span>
            <span>↗</span>
          </a>
          <button class="close-modal-btn" onclick="closeVideo()">&times;</button>
        </div>
      </div>
      <div class="video-player-wrapper">
        <iframe id="videoIframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="video-modal-footer">
        <span style="display: inline-flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          YouTube Audio Example
        </span>
        <a id="videoFooterLink" href="#" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; font-weight: 700; text-decoration: none;">Watch Directly on YouTube &rarr;</a>
      </div>
    </div>
  </div>

  <!-- Image Lightbox Modal -->
  <div class="image-modal-backdrop" id="imageModal" onclick="closeImageModal()">
    <div class="image-modal-content" onclick="event.stopPropagation()">
      <button class="image-modal-close" onclick="closeImageModal()" title="Close (Esc)">&times;</button>
      <img id="imageModalImg" src="" alt="Expanded Image">
      <div class="image-modal-caption" id="imageModalCaption"></div>
    </div>
  </div>

  <script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressFill = document.getElementById('progressFill');
    const videoModal = document.getElementById('videoModal');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoIframe = document.getElementById('videoIframe');

    // Image Lightbox Logic
    const imageModal = document.getElementById('imageModal');
    const imageModalImg = document.getElementById('imageModalImg');
    const imageModalCaption = document.getElementById('imageModalCaption');

    function openImageModal(src, alt) {{
      if (!imageModal || !imageModalImg) return;
      imageModalImg.src = src;
      if (imageModalCaption) imageModalCaption.textContent = alt || '';
      imageModal.classList.add('open');
    }}

    function closeImageModal() {{
      if (!imageModal) return;
      imageModal.classList.remove('open');
      if (imageModalImg) imageModalImg.src = '';
    }}

    document.addEventListener('click', (e) => {{
      const target = e.target;
      if (target && target.tagName === 'IMG') {{
        if (target.closest('#videoModal') || target.closest('#imageModal')) return;
        if (
          target.classList.contains('slide-thumb') ||
          target.classList.contains('artist-photo') ||
          target.closest('.cover-card') ||
          target.closest('.image-frame') ||
          target.closest('.info-card')
        ) {{
          e.preventDefault();
          openImageModal(target.src, target.alt);
        }}
      }}
    }});

    function updateDeck() {{
      slides.forEach((slide, idx) => {{
        slide.classList.toggle('active', idx === currentSlide);
      }});

      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === totalSlides - 1;
      
      slideCounter.textContent = `Slide ${{currentSlide + 1}} of ${{totalSlides}}`;
      const percentage = ((currentSlide + 1) / totalSlides) * 100;
      progressFill.style.width = `${{percentage}}%`;
    }}

    function nextSlide() {{
      if (currentSlide < totalSlides - 1) {{
        currentSlide++;
        updateDeck();
      }}
    }}

    function prevSlide() {{
      if (currentSlide > 0) {{
        currentSlide--;
        updateDeck();
      }}
    }}

    document.addEventListener('keydown', (e) => {{
      if (imageModal && imageModal.classList.contains('open')) {{
        if (e.key === 'Escape') {{
          closeImageModal();
          return;
        }}
      }}
      if (videoModal && videoModal.classList.contains('open')) {{
        if (e.key === 'Escape') closeVideo();
        return;
      }}
      if (e.key === 'ArrowRight' || e.key === ' ') {{
        e.preventDefault();
        nextSlide();
      }} else if (e.key === 'ArrowLeft') {{
        e.preventDefault();
        prevSlide();
      }}
    }});

    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = document.getElementById('slidesViewport');

    viewport.addEventListener('touchstart', (e) => {{
      touchStartX = e.changedTouches[0].screenX;
    }}, {{ passive: true }});

    viewport.addEventListener('touchend', (e) => {{
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
    }}, {{ passive: true }});

    function openVideo(videoId, title) {{
      const extLink = document.getElementById('videoExternalLink');
      if (extLink) extLink.href = `https://www.youtube.com/watch?v=${{videoId}}`;
      const footLink = document.getElementById('videoFooterLink');
      if (footLink) footLink.href = `https://www.youtube.com/watch?v=${{videoId}}`;

      videoIframe.src = `https://www.youtube.com/embed/${{videoId}}?autoplay=1&rel=0`;
      videoModalTitle.textContent = title;
      videoModal.classList.add('open');
      videoModal.style.display = 'flex';
    }}

    function closeVideo() {{
      videoModal.classList.remove('open');
      videoModal.style.display = 'none';
      videoIframe.src = '';
    }}

    videoModal.addEventListener('click', (e) => {{
      if (e.target === videoModal) closeVideo();
    }});

    updateDeck();
  </script>
</body>
</html>
'''

with open(OUT, 'w', encoding='utf-8') as out_f:
    out_f.write(full_html)

print(f'Generated {OUT} ({len(full_html)} bytes, {TOTAL} slides)')
