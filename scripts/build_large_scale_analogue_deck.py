import re
import os

OUT = 'public/interactive-slide-large-scale-analogue.html'

with open('public/interactive-slide-early-multitrack.html', 'r', encoding='utf-8') as f:
    early_deck = f.read()

css = re.search(r'<style>(.*?)</style>', early_deck, re.S).group(1)

TOTAL = 15
IMG = '/images/slides/large_scale_analogue/'

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
slide_counter = 0

def slide(icon, eyebrow, title, lead, cards_html):
    global slide_counter
    slide_counter += 1
    slides.append(f'''
      <section class="slide" data-slide="{slide_counter}">
        <div class="slide-eyebrow"><span>{icon}</span> {eyebrow} &bull; Component 3 Music Technology in Context</div>
        <h2 class="slide-heading">{title}</h2>
        <p class="slide-lead">{lead}</p>
        {cards_html}
      </section>''')

G = lambda items, n=3: f'<div class="grid-{n}">' + ''.join(items) + '</div>'

# 1 COVER
slide_counter += 1
slides.append(f'''
      <section class="slide active" data-slide="1">
        <div class="slide-eyebrow"><span>🎛️</span> Evolutionary Era 03 &bull; Component 3 Music Technology in Context</div>
        <h1 class="slide-heading">Large-Scale Analogue Multitrack <span>(c.1968 – 1995)</span></h1>
        <p class="slide-lead">The pinnacle of analog recording. Explore the shift to 2-inch 16 and 24-track tape machines, large-format in-line mixing consoles (SSL &amp; Neve), computer fader automation, solid-state dynamics (1176 &amp; dbx 160), Dolby noise reduction, multi-mic drum tracking, and the emergence of polyphonic synthesis.</p>
        <div class="grid-3" style="margin-top: 10px;">
          <div class="info-card highlight"><span class="spec-pill ao4">AO4 Musical Styles</span><h4>Hard Rock to Disco &amp; Punk</h4><p>Hard rock / metal (<strong>Led Zeppelin</strong>, <strong>Black Sabbath</strong>), tight disco &amp; funk grooves (<strong>Chic</strong>, <strong>Earth Wind &amp; Fire</strong>), and raw punk rebellion (<strong>Sex Pistols</strong>, <strong>The Clash</strong>).</p></div>
          <div class="info-card cyan-edge"><span class="spec-pill ao3">AO3 Studio Technology</span><h4>24-Track Tape &amp; SSL Consoles</h4><p>Master 2-inch tape, <strong>Studer A800</strong>, high-frequency bias calibration, <strong>SSL 4000 E/G Series</strong>, in-line architecture, Total Recall, and VCA automation.</p></div>
          <div class="info-card acid-edge"><span class="spec-pill ao3">AO3 Outboard &amp; Processing</span><h4>Dynamics, Gating &amp; Early Digital</h4><p><strong>UREI 1176 FET limiting</strong>, dbx 160, <strong>Dolby A / SR noise reduction</strong>, close-mic multi-track drums with Drawmer noise gates, and <strong>Lexicon 224</strong> digital reverb.</p></div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
          <button class="nav-btn" onclick="nextSlide()" style="background: #f59e0b; color: #080d1a; border-color: #f59e0b; font-weight: 700;">Start Interactive Deck &rarr;</button>
          <span style="font-size: 12px; color: var(--text-muted);">Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> to navigate</span>
        </div>
      </section>''')

# 2 SYLLABUS ROADMAP
slide('📋', 'Specification Roadmap', 'Component 3 <span>Syllabus Matrix for 1968–1995</span>',
      'Edexcel requires deep technical mastery of 24-track 2-inch tape machines, SSL/Neve in-line consoles, VCA fader automation, outboard dynamics, noise reduction, and signature synthesizers.',
      G([
          card('highlight', f'''{thumb('ampex_mm1200_24track.jpg', 'Ampex 24-Track 2-Inch Multitrack Recorder')}
               <span class="spec-pill ao3">AO3 Recording Technology</span>
               <h4>24-Track 2-Inch Tape</h4>
               <p>2-inch magnetic tape at 15/30 ips; Studer A800 and Otari MTR-90; SMPTE timecode tape synchronisation (48 tracks); AC bias calibration; tape compression saturation.</p>'''),
          card('cyan-edge', f'''{thumb('neve_8078_console.jpg', 'Neve Large-Format Multitrack Mixing Console')}
               <span class="spec-pill ao3">AO3 Mixing Architecture</span>
               <h4>Large-Format In-Line Desks</h4>
               <p>Solid State Logic SL4000 E/G and Neve 8078; dual channel/monitor paths per strip; 4-band parametric EQ; integrated channel dynamics; VCA automation; Total Recall.</p>'''),
          card('acid-edge', f'''{thumb('rack_outboard_gear_70s.jpg', 'Analog Outboard Racks Dynamics & Processing')}
               <span class="spec-pill ao3">AO3 Outboard &amp; Synthesis</span>
               <h4>Dynamics, Synths &amp; Digital FX</h4>
               <p>UREI 1176 FET fast limiting, dbx 160 VCA compressor, Dolby A/SR noise reduction, Minimoog bass, Prophet-5 polyphonic synth, and Lexicon digital reverbs.</p>''')
      ]))

# 3 LANDMARK STYLES: HARD ROCK & HEAVY METAL
slide('🎸', 'Musical Styles: Rock', 'Hard Rock &amp; Heavy Metal <span>(Led Zeppelin, Sabbath, Deep Purple)</span>',
      'Massive drum sounds, high-gain valve amplification, overdriven bass, and virtuoso electric guitar solos recorded across dedicated multitrack channels.',
      G([
          card('highlight', f'''{thumb('led_zeppelin_1971.jpg', 'Led Zeppelin 1971')}
               <span class="spec-pill ao4">AO4 Rock Production</span>
               <h4>Led Zeppelin &amp; Room Acoustics</h4>
               <p>Jimmy Page and Andy Johns captured John Bonham\'s iconic drum sound in Headley Grange stone stairwells using a stereo pair of Beyer M160 ribbon mics compressed via Helios consoles.</p>
               {vid('f0pQ3373w9w', 'Led Zeppelin Drum Sound Analysis', 'Watch: Bonham Drum Room Acoustics')}'''),
          card('cyan-edge', f'''{thumb('black_sabbath_1970.jpg', 'Black Sabbath 1970')}
               <span class="spec-pill ao4">AO4 Heavy Metal Pioneers</span>
               <h4>Black Sabbath &amp; Down-Tuning</h4>
               <p>Tony Iommi down-tuned his Gibson SG with custom light-gauge strings into Dallas Rangemaster treble boosters and Laney Supergroup valve heads, tracked live to 8-track tape.</p>'''),
          card('acid-edge', f'''{thumb('deep_purple_machine_head.jpg', 'Deep Purple 1970')}
               <span class="spec-pill ao4">AO4 Valve Keyboard Drive</span>
               <h4>Deep Purple &amp; Distorted Organ</h4>
               <p>Jon Lord routed his Hammond C3 organ directly into overdriven Marshall valve stacks rather than clean Leslie cabinets, pioneering heavy rock organ crunch on <em>Machine Head</em>.</p>''')
      ]))

# 4 LANDMARK STYLES: DISCO & FUNK
slide('🕺', 'Musical Styles: Dance', 'Disco &amp; Funk <span>(Chic, Earth Wind &amp; Fire, Donna Summer)</span>',
      'Precision timekeeping, punchy 4-on-the-floor kick drums, direct-injected (DI) bass, syncopated rhythm guitars, and sweeping string/horn arrangements.',
      G([
          card('highlight', f'''{thumb('chic_nile_rodgers.jpg', 'Nile Rodgers and Chic')}
               <span class="spec-pill ao4">AO4 Funk Rhythm Guitar</span>
               <h4>Nile Rodgers &amp; "Chucking"</h4>
               <p>Clean Stratocaster single-coil rhythm guitar recorded direct injection (DI) into the Neve console with heavy optical/FET compression, creating razor-sharp percussive 16th-note grooves.</p>
               {vid('V94w8E7Xl04', 'Nile Rodgers Funk Production Breakdown', 'Watch: Chic Funk Guitar Tracking')}'''),
          card('cyan-edge', f'''{thumb('earth_wind_fire_1977.jpg', 'Earth Wind & Fire 1977')}
               <span class="spec-pill ao4">AO4 Brass &amp; Percussion</span>
               <h4>Earth, Wind &amp; Fire Horns</h4>
               <p>Phenix Horns tracked with Neumann U87 condenser mics, double-tracked across discrete tape channels, and layered with Kalimba thumb piano and syncopated slap bass.</p>'''),
          card('acid-edge', f'''{thumb('donna_summer_studio.jpg', 'Donna Summer & Giorgio Moroder')}
               <span class="spec-pill ao4">AO4 Electronic Disco</span>
               <h4>Moroder &amp; "I Feel Love" (1977)</h4>
               <p>Giorgio Moroder synthesized an entire backing track using a modular Moog 3P synthesizer driven by a click track, pioneering pure electronic disco on 24-track tape.</p>''')
      ]))

# 5 LANDMARK STYLES: PUNK & NEW WAVE
slide('⚡', 'Musical Styles: Rebellion', 'Punk &amp; New Wave <span>(Sex Pistols, The Clash, Blondie)</span>',
      'Stripped-back aggression, raw garage energy, fast tempos, and anti-establishment lyricism rejecting 1970s prog-rock self-indulgence.',
      G([
          card('highlight', f'''{thumb('sex_pistols_1977.jpg', 'Sex Pistols 1977')}
               <span class="spec-pill ao4">AO4 Punk Production</span>
               <h4>Sex Pistols: The Wall of Sound</h4>
               <p>Producer Chris Thomas layered up to 15 tracks of Steve Jones\'s Gibson Les Paul through a Fender Twin Reverb on <em>Never Mind the Bollocks</em>, achieving massive distorted clarity.</p>'''),
          card('cyan-edge', f'''{thumb('the_clash_1980.jpg', 'The Clash 1980')}
               <span class="spec-pill ao4">AO4 Eclectic Punk</span>
               <h4>The Clash: Dub &amp; Reggae Fusion</h4>
               <p>Incorporated Jamaican dub echo, spring reverbs, slapback tape delays, and driving funk basslines on <em>London Calling</em>, expanding punk beyond three-chord simplicity.</p>'''),
          card('acid-edge', f'''{thumb('blondie_debbie_harry.jpg', 'Debbie Harry of Blondie')}
               <span class="spec-pill ao4">AO4 New Wave Crossover</span>
               <h4>Blondie &amp; Mike Chapman</h4>
               <p>Producer Mike Chapman enforced metronomic click-track discipline, tight gated snares, Roland synthesizers, and disco-rock crossover production on "Heart of Glass".</p>''')
      ]))

# 6 16 & 24-TRACK TAPE MACHINES
slide('📼', 'Analogue Tape Mastery', 'The 2-Inch Multitrack: <span>Studer A800 &amp; Otari MTR-90</span>',
      'The transition to 2-inch magnetic tape running at 15 and 30 ips allowed up to 24 isolated tracks per machine, ending the reliance on destructive track reduction bouncing.',
      G([
          card('highlight', f'''{thumb('studer_a800_full_deck.jpg', 'Studer A800 24-Track Tape Recorder')}
               <span class="spec-pill ao3">AO3 Studio Flagship</span>
               <h4>The Studer A800 (1978)</h4>
               <p>Microprocessor-controlled tape transport, 2-inch tape width, 24 independent channel audio cards, and silent punch-in/out transitions made the A800 the gold standard in top studios.</p>
               {vid('qZYdgUuhXXQ', 'Studer A800 24-Track Demonstration', 'Watch: Studer A800 in Action')}'''),
          card('cyan-edge', f'''{thumb('tape_head_24track_a800.jpg', '24-Track Magnetic Head Stack')}
               <span class="spec-pill ao3">AO3 Head Gap Physics</span>
               <h4>24-Track Head Stack</h4>
               <p>Contains 24 micro-engineered electromagnetic gaps stacked vertically across the 2-inch tape. Narrow track width (0.043 in) reduced crosstalk but increased tape hiss, necessitating noise reduction.</p>'''),
          card('acid-edge', f'''{thumb('otari_mtr90_24track.jpg', 'Otari MTR-90 2-Inch Multitrack')}
               <span class="spec-pill ao3">AO3 Tape Transport</span>
               <h4>Otari MTR-90 &amp; Ampex MM1200</h4>
               <p>Heavy-duty pinch-roller-less capstan transports delivered ultra-stable flutter-free tape travel at 30 ips, extending high-frequency response up to 24 kHz with lower low-frequency head bump.</p>''')
      ]))

# 7 TAPE CALIBRATION & PHYSICS
slide('🎛️', 'Analogue Physics', 'High-Frequency Bias, <span>Tape Saturation &amp; MRL Calibration</span>',
      'Operating professional multitrack tape required rigorous calibration of electromagnetic bias current, tape head azimuth, and record fluxivity levels.',
      G([
          card('highlight', f'''{thumb('tape_bias_high_frequency.svg', 'High-Frequency AC Bias Waveform Diagram')}
               <span class="spec-pill ao3">AO3 Tape Physics</span>
               <h4>High-Frequency AC Bias</h4>
               <p>Magnetic tape particles (ferric oxide / cobalt) are non-linear at low magnetic fields. Mixing an inaudible 100–150 kHz AC bias sine wave with audio linearizes magnetic response, eliminating distortion.</p>'''),
          card('cyan-edge', f'''{thumb('open_reel_tape_flux.jpg', 'Reel-to-Reel Tape Magnetic Fluxivity')}
               <span class="spec-pill ao3">AO3 Harmonic Saturation</span>
               <h4>Analogue Tape Saturation</h4>
               <p>Pushing hot signal levels past +3 VU saturates magnetic oxide particles, causing gentle soft-knee peak rounding, 3rd-harmonic distortion, and natural dynamic compression prized on drums.</p>'''),
          card('acid-edge', f'''{thumb('mrl_alignment_tape.jpg', 'MRL Master Alignment Calibration Tape')}
               <span class="spec-pill ao3">AO3 Studio Calibration</span>
               <h4>MRL Tape Alignment</h4>
               <p>Engineers played precision Magnetic Reference Laboratory (MRL) tapes containing 1 kHz and 10 kHz test tones to calibrate head azimuth (vertical angle), reproduce levels, and high-frequency EQ.</p>
               {vid('RmX7eXtSH5Y', 'Analogue Tape Calibration Masterclass', 'Watch: Calibrating 24-Track Tape')}''')
      ]))

# 8 NOISE REDUCTION SYSTEMS
slide('🔇', 'Dynamic Noise Control', 'Dolby A, Dolby SR <span>&amp; dbx Compander Technology</span>',
      'Running 24 narrow tracks on a single 2-inch tape tape hiss accumulated significantly. Analogue noise reduction used dual-ended compression/expansion (companding).',
      G([
          card('highlight', f'''{thumb('dolby_noise_reduction_unit.jpg', 'Dolby A-Type Model 361 Unit')}
               <span class="spec-pill ao3">AO3 4-Band Companding</span>
               <h4>Dolby A-Type (1966)</h4>
               <p>Splits audio into 4 independent frequency bands (sub-80 Hz, 80 Hz–3 kHz, 3 kHz+, 9 kHz+). Low-level signals are boosted +10 dB during recording; during playback, the exact inverse expansion cuts tape hiss by 10 dB.</p>'''),
          card('cyan-edge', f'''{thumb('dolby_spectral_recording.jpg', 'Dolby SR Spectral Recording Unit')}
               <span class="spec-pill ao3">AO3 Modern Analogue NR</span>
               <h4>Dolby SR (Spectral Recording)</h4>
               <p>Introduced in 1986, Dolby SR utilized sliding-band and fixed-band filters to achieve up to 25 dB of noise reduction, matching the dynamic range of early 16-bit digital recording.</p>'''),
          card('acid-edge', f'''{thumb('dbx_noise_reduction_unit.jpg', 'dbx Type I Professional Unit')}
               <span class="spec-pill ao3">AO3 Wideband Companding</span>
               <h4>dbx Type I</h4>
               <p>A 2:1 wideband compander: compresses full audio dynamic range by 50% on recording with high-frequency pre-emphasis, and expands 1:2 on playback, yielding 30 dB of noise reduction.</p>''')
      ]))

# 9 LARGE-FORMAT CONSOLES
slide('🎚️', 'Mixing Desks', 'Solid State Logic (SSL) <span>&amp; Neve 80-Series Consoles</span>',
      'Large-format mixing desks transformed the control room into an automated production center, providing integrated dynamics, 4-band parametric EQ, and in-line routing.',
      G([
          card('highlight', f'''{thumb('ssl_4000_console_desk.jpg', 'Solid State Logic SL 4000 E Series')}
               <span class="spec-pill ao3">AO3 Console Revolution</span>
               <h4>The SSL 4000 E &amp; G Series</h4>
               <p>Introduced in 1979, the SSL 4000 featured a dedicated compressor, expander/gate, and 4-band parametric EQ on every single channel strip, plus the legendary G-Master Bus compressor.</p>
               {vid('T9iK0r718rI', 'SSL 4000 Console Breakdown', 'Watch: Inside the SSL 4000 Console')}'''),
          card('cyan-edge', f'''{thumb('neve_console_faders.jpg', 'Classic Neve 8078 Console')}
               <span class="spec-pill ao3">AO3 Discrete Class-A Warmth</span>
               <h4>Neve 80-Series (1073 &amp; 1081)</h4>
               <p>Discrete Class-A transistor preamplifiers with Marinair input transformers and stepped inductor EQ delivered rich harmonic coloration and musical low-end weight.</p>'''),
          card('acid-edge', f'''{thumb('ssl_channel_strip_eq.jpg', 'SSL 4000 Channel Strip & Parametric EQ')}
               <span class="spec-pill ao3">AO3 Parametric EQ</span>
               <h4>4-Band Parametric EQ</h4>
               <p>Allowed independent sweepable Frequency (Hz), Gain (&plusmn;15 dB), and Q factor (bandwidth), giving mixing engineers surgical control to unmask bass, kick drum, and vocals.</p>''')
      ]))

# 10 CONSOLE AUTOMATION & SIGNAL FLOW
slide('💻', 'Studio Automation', 'VCA Faders, Total Recall <span>&amp; In-Line Architecture</span>',
      'As track counts grew to 24 and 48 tracks, mixing required automated fader control and instant console recall driven by internal microcomputers.',
      G([
          card('highlight', f'''{thumb('vca_faders_motorized.jpg', 'VCA Automated Console Faders')}
               <span class="spec-pill ao3">AO3 Voltage-Controlled Amp</span>
               <h4>VCA Fader Automation</h4>
               <p>Instead of passing audio through carbon tracks, audio passed through a Voltage Controlled Amplifier (VCA). Fader positions generated DC control voltages saved to floppy disk for dynamic mix automation.</p>'''),
          card('cyan-edge', f'''{thumb('ssl_computer_screen_keyboard.jpg', 'SSL On-Board Computer & Monitor')}
               <span class="spec-pill ao3">AO3 Studio Memory</span>
               <h4>SSL Total Recall</h4>
               <p>The console computer scanned every rotary knob, pot, and switch position on all 48 channels, displaying graphical overlays on screen so engineers could reset a complex mix in minutes.</p>'''),
          card('acid-edge', f'''{thumb('patchbay_cables_studio.jpg', 'Studio TT Audio Patchbay')}
               <span class="spec-pill ao3">AO3 Signal Routing</span>
               <h4>In-Line Architecture &amp; Patchbay</h4>
               <p>Every channel strip contained two signal paths: the <em>Channel Path</em> (mic preamp to multitrack send) and the <em>Monitor Path</em> (multitrack return to stereo mix). TT patchbays routed outboard units.</p>''')
      ]))

# 11 SOLID-STATE DYNAMICS
slide('⚡', 'Dynamics Processing', 'FET &amp; VCA Compression: <span>The 1176 &amp; dbx 160</span>',
      'The move from vintage tubes to high-speed solid-state transistors introduced ultra-fast transient-catching limiters and punchy VCA gain control.',
      G([
          card('highlight', f'''{thumb('urei_1176_limiter.jpg', 'UREI 1176 LN Peak Limiting Amplifier')}
               <span class="spec-pill ao3">AO3 Ultra-Fast FET</span>
               <h4>UREI 1176 LN Limiter</h4>
               <p>Field Effect Transistor (FET) gain reduction with blistering 20-microsecond attack. Depressing all ratio buttons simultaneously ("All-Buttons-In" mode) produced aggressive pumping distortion on drums.</p>
               {vid('8z5v4u3F8gE', '1176 Compressor All Buttons In Demo', 'Watch: 1176 All-Buttons-In Mode')}'''),
          card('cyan-edge', f'''{thumb('dbx_160_compressor.jpg', 'dbx 160 Compressor / Limiter')}
               <span class="spec-pill ao3">AO3 Hard-Knee Punch</span>
               <h4>dbx 160 VCA Compressor</h4>
               <p>Famous for its feed-forward VCA design and hard-knee compression. Delivered tight, punchy dynamic clamp with distinct low-end thud, making it the favorite for bass guitars and kick drums.</p>'''),
          card('acid-edge', f'''{thumb('ssl_g_master_bus_comp.jpg', 'SSL G-Series Master Bus Compressor')}
               <span class="spec-pill ao3">AO3 "The Mix Glue"</span>
               <h4>SSL G-Master Bus Compressor</h4>
               <p>A quad-VCA stereo compressor strapped across the master stereo output. Gentle ratios (2:1 or 4:1) with auto-release "glued" diverse multitrack elements into a cohesive, punchy record.</p>''')
      ]))

# 12 EARLY DIGITAL REVERBS & DELAYS
slide('🌌', 'Digital Revolution', 'Algorithmic Reverb: <span>Lexicon 224, 480L &amp; Eventide</span>',
      'In the late 1970s and 1980s, DSP algorithms replaced vibrating metal plates and acoustic echo chambers, introducing programmable algorithmic ambience.',
      G([
          card('highlight', f'''{thumb('lexicon_224_reverb.jpg', 'Lexicon 224 Digital Reverb')}
               <span class="spec-pill ao3">AO3 Digital Space</span>
               <h4>Lexicon 224 (1978)</h4>
               <p>Designed by Dr. David Griesinger, this early digital reverb used 12-bit floating-point converters and the iconic slider-based LARC remote to create lush Concert Hall and Plate spaces.</p>'''),
          card('cyan-edge', f'''{thumb('lexicon_480l_larc.jpg', 'Lexicon 480L Digital Effects System')}
               <span class="spec-pill ao3">AO3 Industry Benchmark</span>
               <h4>Lexicon 480L (1986)</h4>
               <p>Dual-DSP architecture providing pristine 20-bit dynamic range, stereo time-variant reverbs, chorus delays, and high diffusion density that defined 1980s pop production.</p>'''),
          card('acid-edge', f'''{thumb('eventide_harmonizer_h910.jpg', 'Eventide H910 Harmonizer')}
               <span class="spec-pill ao3">AO3 Digital Pitch Shifting</span>
               <h4>Eventide H910 Harmonizer</h4>
               <p>The world\'s first digital pitch-shifting unit (1974). Allowed engineers to detune vocals by &plusmn;1 octave, create micro-pitch stereo width, and generate sci-fi delay feedback sweeps.</p>''')
      ]))

# 13 SYNTHESIS & KEYBOARD TECHNOLOGY
slide('🎹', 'Keyboard Synthesis', 'Subtractive &amp; Polyphonic Synths: <span>Minimoog &amp; Prophet-5</span>',
      'Voltage-controlled oscillators, ladder filters, and microprocessors brought synthesizers from massive laboratory modulars into mainstream hit records.',
      G([
          card('highlight', f'''{thumb('hohner_clavinet_d6.jpg', 'Hohner Clavinet D6 Keyboard')}
               <span class="spec-pill ao3">AO3 Funk Clavinet</span>
               <h4>Hohner Clavinet D6</h4>
               <p>Electro-mechanical keyboard using rubber-tipped keys to strike steel strings against magnetic pickups. Paired with a wah-wah pedal or Mu-Tron III filter for quintessential funk rhythmic grit.</p>'''),
          card('cyan-edge', f'''{thumb('minimoog_model_d.jpg', 'Minimoog Model D Synthesizer')}
               <span class="spec-pill ao3">AO3 Subtractive Bass</span>
               <h4>Minimoog Model D (1970)</h4>
               <p>Monophonic subtractive synthesizer with 3 VCOs, noise generator, and the legendary 24 dB/octave 4-pole transistor ladder low-pass filter. Defined punchy synth bass across disco, funk, and rock.</p>
               {vid('Vscv_eC3sUo', 'Minimoog Model D Demonstration', 'Watch: Minimoog Bass & Lead Synthesis')}'''),
          card('acid-edge', f'''{thumb('prophet_5_synth.jpg', 'Sequential Circuits Prophet-5')}
               <span class="spec-pill ao3">AO3 Polyphonic Presets</span>
               <h4>Sequential Prophet-5 (1978)</h4>
               <p>The first fully programmable 5-voice polyphonic analog synthesizer with patch memory storage. Allowed musicians to save and instantly recall rich analog string pads, brass stabs, and chords.</p>''')
      ]))

# 14 MULTI-MIC DRUM TRACKING & GATING
slide('🥁', 'Acoustic Engineering', 'Close-Miking Drums, <span>Damping &amp; Drawmer Noise Gates</span>',
      'The 24-track era revolutionized drum recording, assigning individual microphones to every drum shell while controlling bleed through physical damping and hardware noise gates.',
      G([
          card('highlight', f'''{thumb('drum_kit_close_mics.jpg', 'Multi-Mic Drum Kit Studio Setup')}
               <span class="spec-pill ao3">AO3 Multi-Track Capture</span>
               <h4>Individual Shell Miking</h4>
               <p>Instead of 2–3 overall mics, 10+ tracks were allocated: kick drum (inside &amp; outside), snare top &amp; bottom, hi-hat, 3 rack toms, floor tom, and stereo overheads spaced or XY.</p>'''),
          card('cyan-edge', f'''{thumb('snare_drum_shure_sm57.png', 'Snare Drum Shure SM57 Placement')}
               <span class="spec-pill ao3">AO3 Transducer Physics</span>
               <h4>Snare Dual-Miking &amp; Phase</h4>
               <p>Top mic (Shure SM57) captures stick attack; bottom mic captures high-frequency snare wire sizzle. Inverting the electrical phase on the bottom mic prevents destructive phase cancellation.</p>'''),
          card('acid-edge', f'''{thumb('drawmer_ds201_gate.svg', 'Drawmer DS201 Dual Noise Gate')}
               <span class="spec-pill ao3">AO3 Bleed Elimination</span>
               <h4>Hardware Noise Gating</h4>
               <p>Units like the Drawmer DS201 muted tom and snare channels when the drum was not being struck. Threshold, attack, hold, and release parameters silenced hi-hat spill between drum hits.</p>''')
      ]))

# 15 CONSUMER FORMATS: CASSETTE TO CD
slide('💿', 'Consumer Formats', 'The Compact Cassette, <span>Walkman &amp; the Dawn of Digital CD</span>',
      'Music consumption transitioned from 12-inch vinyl microgroove records to portable magnetic Compact Cassettes, culminating in the 1982 release of the 16-bit 44.1 kHz Compact Disc.',
      G([
          card('highlight', f'''{thumb('compact_cassette_tape_open.jpg', 'Philips Compact Cassette Tape')}
               <span class="spec-pill ao3">AO3 Portable Magnetic Tape</span>
               <h4>The Compact Cassette (1963–1980s)</h4>
               <p>Operating at 1.875 ips on 1/8-inch tape, cassettes evolved from voice recording to high-fidelity music with Type II (Chrome) and Type IV (Metal) formulations and Dolby B/C consumer noise reduction.</p>'''),
          card('cyan-edge', f'''{thumb('cassette_player_heads.jpg', 'Stereo Cassette Transport Head Mechanism')}
               <span class="spec-pill ao3">AO3 Consumer Transport</span>
               <h4>Head Gap &amp; The Walkman</h4>
               <p>Precision micro-gap heads and capstan flywheels enabled high-fidelity stereo reproduction. The 1979 Sony Walkman made music personal and mobile, reshaping pop music production and headphone mixes.</p>'''),
          card('acid-edge', f'''{thumb('compact_disc_laser_optical.jpg', 'Compact Disc Optical Pit Surface')}
               <span class="spec-pill ao3">AO3 Digital Audio Dawn</span>
               <h4>The Compact Disc (1982)</h4>
               <p>Philips and Sony co-developed the Red Book CD: 16-bit resolution, 44.1 kHz sampling rate, 96 dB dynamic range, and zero tape hiss or surface crackle, permanently changing mixing and mastering dynamics.</p>''')
      ]))

slides_html = '\n'.join(slides)

full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Large-Scale Analogue Multitrack (1968–1995) | A-Level Music Technology Deck</title>
  <style>
{css}
  </style>
</head>
<body>
  <div class="deck-wrapper">
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music Technology in Context</div>
      <div class="deck-topic-title">Topic: <strong>Large-Scale Analogue Multitrack (1968–1995)</strong></div>
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
      imageModal.style.display = 'flex';
    }}

    function closeImageModal() {{
      if (!imageModal) return;
      imageModal.classList.remove('open');
      imageModal.style.display = 'none';
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
      if (prevBtn) prevBtn.disabled = currentSlide === 0;
      if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
      if (slideCounter) slideCounter.textContent = `Slide ${{currentSlide + 1}} of ${{totalSlides}}`;
      if (progressFill) progressFill.style.width = `${{((currentSlide + 1) / totalSlides) * 100}}%`;
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
