import re
import os

OUT = 'public/interactive-slide-mixers-daw.html'

with open('public/interactive-slide-early-multitrack.html', 'r', encoding='utf-8') as f:
    early_deck = f.read()

css = re.search(r'<style>(.*?)</style>', early_deck, re.S).group(1)

TOTAL = 15
IMG = '/images/slides/mixers_daw/'

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
        <div class="slide-eyebrow"><span>💻</span> Evolutionary Era 04 &bull; Component 3 Music Technology in Context</div>
        <h1 class="slide-heading">Mixers &amp; Digital Audio Workstations <span>(c.1980s – Present)</span></h1>
        <p class="slide-lead">The digital revolution transformed modern production. Explore the transition from modular digital tape (ADAT) and large-format analogue consoles to digital desks (Yamaha 02R), hardware-accelerated DAWs (Pro Tools), VST software instruments, pitch correction algorithms (Auto-Tune), and modern In-The-Box mixing.</p>
        <div class="grid-3" style="margin-top: 10px;">
          <div class="info-card highlight"><span class="spec-pill ao3">AO3 Console Architecture</span><h4>Channel Strips &amp; Routing</h4><p>Mic/line preamps, gain staging, high-pass filtering, 4-band parametric EQ, hardware inserts, pre/post aux sends, and digital motorized fader recall.</p></div>
          <div class="info-card cyan-edge"><span class="spec-pill ao3">AO3 Digital Audio Physics</span><h4>Sampling &amp; Quantisation</h4><p>Nyquist-Shannon theorem, anti-aliasing brickwall filters, 16-bit vs 24-bit dynamic range, TPDF dither, audio buffer sizes, and latency management.</p></div>
          <div class="info-card acid-edge"><span class="spec-pill ao3">AO3 Modern DAW Workflows</span><h4>Non-Linear Editing &amp; ITB</h4><p>Non-destructive audio slicing, take comping, VST plugins, Antares Auto-Tune phase vocoding, automation lanes, and hybrid summing vs ITB mixing.</p></div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
          <button class="nav-btn" onclick="nextSlide()" style="background: #f59e0b; color: #080d1a; border-color: #f59e0b; font-weight: 700;">Start Interactive Deck &rarr;</button>
          <span style="font-size: 12px; color: var(--text-muted);">Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> to navigate</span>
        </div>
      </section>''')

# 2 SYLLABUS ROADMAP
slide('📋', 'Specification Roadmap', 'Component 3 <span>Syllabus Matrix: Digital Era</span>',
      'Edexcel requires comprehensive knowledge of console channel strip architecture, digital conversion, modular digital tape, DAW editing, and hybrid production.',
      G([
          card('highlight', f'''{thumb('adat_blackface_multitrack.jpg', 'Alesis ADAT Modular Digital Multitrack')}
               <span class="spec-pill ao3">AO3 Digital Multitrack</span>
               <h4>Modular Digital Tape (MDM)</h4>
               <p>The 1991 Alesis ADAT recorded 8 channels of uncompressed 16-bit 48 kHz digital audio onto consumer S-VHS tape, democratizing commercial multitrack recording for home and project studios.</p>'''),
          card('cyan-edge', f'''{thumb('soundcraft_digital_mixer.jpg', 'Digital Audio Mixing Console')}
               <span class="spec-pill ao3">AO3 Mixing Desks</span>
               <h4>Console Architecture &amp; DSP</h4>
               <p>Mastering signal flow: mic preamps, input trim, high-pass filtering, parametric EQ (Q factor), insert loops, auxiliary sends (pre vs post), and motorized fader scene recall.</p>'''),
          card('acid-edge', f'''{thumb('pro_tools_early_mix_window.jpg', 'Pro Tools Digital Audio Workstation')}
               <span class="spec-pill ao3">AO3 Computer Workstations</span>
               <h4>Non-Linear DAW Production</h4>
               <p>From Digidesign Sound Tools to Pro Tools and Logic: non-destructive region editing, take comping, VST plugins, sample-accurate automation, and Auto-Tune vocal processing.</p>''')
      ]))

# 3 FROM TAPE TO DIGITAL TAPE
slide('📼', 'Format Evolution', 'The Digital Transition: <span>DASH, PD &amp; DTRS</span>',
      'Before computer hard disks had sufficient speed and capacity, professional recording studios transitioned from analog tape to open-reel and cassette digital multitrack formats.',
      G([
          card('highlight', f'''{thumb('sony_dash_3348_tape.jpg', 'Sony PCM-3348 DASH Digital Tape Transport')}
               <span class="spec-pill ao3">AO3 Digital Stationary Head</span>
               <h4>Sony DASH 48-Track (1988)</h4>
               <p>The Sony PCM-3348 used 1/2-inch tape running across stationary ferrite heads to capture 48 discrete tracks of 16-bit linear PCM audio. It eliminated analog tape hiss and generational loss while preserving razor-blade splicing.</p>'''),
          card('cyan-edge', f'''{thumb('mitsubishi_x850_recorder.jpg', 'Mitsubishi X-850 ProDigi Tape Recorder')}
               <span class="spec-pill ao3">AO3 Open-Reel Digital</span>
               <h4>Mitsubishi ProDigi (PD Format)</h4>
               <p>The 32-track Mitsubishi X-850 competed directly with Sony DASH. It provided pristine 48 kHz digital audio with zero crosstalk and zero wow/flutter, becoming a staple for top-tier pop and orchestral soundtrack sessions.</p>'''),
          card('acid-edge', f'''{thumb('tascam_da88_recorder.jpg', 'Tascam DA-88 DTRS Digital Multitrack')}
               <span class="spec-pill ao3">AO3 Rotary Head Recording</span>
               <h4>Tascam DA-88 &amp; DTRS (1993)</h4>
               <p>Using helical scan rotary heads and 8mm Hi8 metal tape cassettes, the DA-88 provided 8 tracks of rugged digital audio. Widely adopted in post-production and film scoring due to rapid transport locking and rock-solid SMPTE sync.</p>''')
      ]))

# 4 THE ADAT REVOLUTION
slide('🎛️', 'Studio Democratization', 'The Alesis ADAT Revolution <span>(1991)</span>',
      'The Alesis ADAT shattered the multi-million dollar studio monopoly, allowing independent producers to build commercial-grade 24-track studios at a fraction of the cost.',
      G([
          card('highlight', f'''{thumb('svhs_tape_cassette.jpg', 'S-VHS Consumer Magnetic Tape Cassette')}
               <span class="spec-pill ao3">AO3 Consumer Tape Transport</span>
               <h4>S-VHS Helical Scan Transport</h4>
               <p>Alesis utilized low-cost consumer Super-VHS tape cartridges. Rotating helical scan heads recorded 8 tracks of 16-bit 48 kHz linear PCM digital audio without tape compression or analog saturation.</p>'''),
          card('cyan-edge', f'''{thumb('adat_optical_lightpipe.svg', 'ADAT Optical Lightpipe Multi-Channel Cable')}
               <span class="spec-pill ao3">AO3 Digital Connectivity</span>
               <h4>ADAT Optical Lightpipe Protocol</h4>
               <p>Alesis introduced the Toslink optical lightpipe connector, transmitting 8 discrete channels of 24-bit 48 kHz digital audio across a single fiber-optic cable, completely eliminating analog cable snake noise.</p>'''),
          card('acid-edge', f'''{thumb('homestudio_90s.jpg', '1990s Project Recording Studio Setup')}
               <span class="spec-pill ao3">AO3 Modular Architecture</span>
               <h4>Sample-Accurate Sync (MDM)</h4>
               <p>Up to 16 ADAT machines could be daisy-chained using 9-pin sync cables to form a sample-accurate 128-track digital system. Landmark albums like Alanis Morissette\'s <em>Jagged Little Pill</em> were tracked entirely on ADATs.</p>
               {vid('KmwGACcltdQ', 'The Home Studio Revolution', 'Watch: Modular Digital Tape Recording')}''')
      ]))

# 5 CONSOLE ARCHITECTURE: CHANNEL STRIP FLOW
slide('🎚️', 'Console Architecture', 'The Channel Strip: <span>Input Gain, Pad &amp; High-Pass Filtering</span>',
      'Every channel of an analog or digital mixing desk follows a strictly defined serial signal path, conditioning microphone and line signals before routing to buses.',
      G([
          card('highlight', f'''{thumb('mic_preamp_gain_trim.svg', 'Microphone Preamp Gain Stage Architecture')}
               <span class="spec-pill ao3">AO3 Input Gain Staging</span>
               <h4>Preamp Gain &amp; Pad (-20 dB)</h4>
               <p>The mic preamp amplifies low-level microphone signals (-60 to -40 dBu) up to standard line level (+4 dBu / 1.228V). The -20 dB Pad prevents analog clipping distortion when tracking high-SPL sources like snare drums.</p>'''),
          card('cyan-edge', f'''{thumb('eq_high_pass.svg', 'High-Pass Filter Frequency Cutoff Slope')}
               <span class="spec-pill ao3">AO3 Sub-Bass Filtering</span>
               <h4>High-Pass Filter (HPF / Low-Cut)</h4>
               <p>An 18 dB/octave high-pass filter engaged at 75–100 Hz eliminates mechanical microphone stand vibrations, air conditioning rumble, and excessive proximity effect without thinning out vocal formants.</p>'''),
          card('acid-edge', f'''{thumb('console_channel_strip_diagram.svg', 'Complete Channel Strip Signal Flow Diagram')}
               <span class="spec-pill ao3">AO3 Signal Flow Order</span>
               <h4>Serial Signal Path Order</h4>
               <p>Standard architectural order: Input Transformer &rarr; Mic Preamp &rarr; Phase Invert &rarr; HPF &rarr; Insert Point (Pre-EQ) &rarr; 4-Band Parametric EQ &rarr; Dynamics &rarr; Aux Sends &rarr; Pan &rarr; Channel Fader.</p>
               {vid('XljKOG2Y25g', 'Console Channel Strips Explained', 'Watch: In-Line Console Architecture')}''')
      ]))

# 6 CONSOLE EQUALISATION: PARAMETRIC VS SHELVING
slide('🎛️', 'Frequency Sculpting', 'Console Equalisation: <span>Parametric Bands &amp; Q Factor</span>',
      'Equalisation on mixing consoles ranges from simple fixed shelving circuits to fully sweepable 4-band parametric designs with variable bandwidth (Q).',
      G([
          card('highlight', f'''{thumb('eq_parametric_q_bell.svg', 'Parametric EQ Bell Curve & Q Factor')}
               <span class="spec-pill ao3">AO3 Parametric Filtering</span>
               <h4>Parametric EQ &amp; Q Factor</h4>
               <p>Invented by George Massenburg: provides continuous control of Frequency (Hz), Gain (+/-15 dB), and Bandwidth / Q factor ($Q = f_c / \Delta f$). High Q creates narrow surgical notches; low Q provides broad musical shaping.</p>'''),
          card('cyan-edge', f'''{thumb('eq_shelf_types.svg', 'High and Low Shelving Equalizer Curves')}
               <span class="spec-pill ao3">AO3 Shelving Equalizers</span>
               <h4>High &amp; Low Shelving Filters</h4>
               <p>Shelving filters boost or attenuate all frequencies above (high shelf, e.g. 10–12 kHz) or below (low shelf, e.g. 80–100 Hz) the corner frequency by a constant gain, ideal for adding overall air or low-end weight.</p>'''),
          card('acid-edge', f'''{thumb('eq_console_shelving_parametric.jpg', 'Console Equaliser Control Knobs')}
               <span class="spec-pill ao3">AO3 EQ Sweeping Technique</span>
               <h4>Frequency Sweeping Technique</h4>
               <p>Engineers boost gain by +10 dB, set a narrow Q, and slowly sweep the frequency knob across the spectrum to isolate harsh resonances, boxiness (300–500 Hz), or sibilance (4–8 kHz), then cut to clean up the mix.</p>''')
      ]))

# 7 CONSOLE DYNAMICS & ROUTING
slide('🔌', 'Dynamics & Routing', 'Inserts, Aux Sends <span>&amp; Pre/Post Fader Switching</span>',
      'Routing audio outside the channel strip requires understanding the fundamental difference between serial insert loops and parallel auxiliary sends.',
      G([
          card('highlight', f'''{thumb('console_insert_cable_flow.svg', 'Console TRS Insert Jack Signal Routing Flow')}
               <span class="spec-pill ao3">AO3 Serial Processing</span>
               <h4>Hardware Inserts (Serial)</h4>
               <p>A single 1/4-inch TRS jack acts as an output and input: Tip sends 100% of the channel audio to an external processor (compressor, gate, graphic EQ), while Ring returns the fully processed signal back into the strip.</p>'''),
          card('cyan-edge', f'''{thumb('console_aux_sends_matrix.svg', 'Auxiliary Send Pre and Post Fader Matrix')}
               <span class="spec-pill ao3">AO3 Parallel Routing</span>
               <h4>Pre-Fader vs Post-Fader Aux</h4>
               <p><strong>Pre-fader sends</strong> tap signal before the channel fader, so performer headphone cue mixes remain constant regardless of mix fader moves. <strong>Post-fader sends</strong> scale with the fader, keeping wet reverb/delay balance proportional.</p>'''),
          card('acid-edge', f'''{thumb('vca_console_automation.jpg', 'VCA Fader Console Automation Bank')}
               <span class="spec-pill ao3">AO3 Gain Automation</span>
               <h4>VCA Groups &amp; Automation</h4>
               <p>Voltage Controlled Amplifiers allow one VCA master fader to adjust DC control voltages across multiple audio channels simultaneously (e.g. all 12 drum mics) without summing them into an audio sub-group bus.</p>''')
      ]))

# 8 DIGITAL CONSOLES & TOTAL RECALL
slide('🎚️', 'Digital Consoles', 'Digital Mixing Consoles: <span>Yamaha 02R &amp; Word Clock</span>',
      'The late 1990s introduced digital mixing desks featuring internal A/D converters, digital signal processing (DSP), motorized faders, and instant scene recall.',
      G([
          card('highlight', f'''{thumb('motorized_faders_recall.jpg', 'Motorized Faders Moving on Digital Desk')}
               <span class="spec-pill ao3">AO3 Motorized Faders</span>
               <h4>Motorized Fader Scene Recall</h4>
               <p>Digital consoles digitize input signals at the preamps. Motorized flying faders physically glide into position when recalling mix scenes, allowing instant reset of hundreds of parameters between songs or broadcast cues.</p>'''),
          card('cyan-edge', f'''{thumb('analog_vs_digital_console.jpg', 'Digital Mixing Console Control Room')}
               <span class="spec-pill ao3">AO3 Onboard DSP Engines</span>
               <h4>The Yamaha 02R (1995)</h4>
               <p>The gold standard of early digital desks: 32-bit internal DSP processing, fully parametric 4-band EQ and dual dynamics processors on every channel strip, built-in digital effects, and snapshot scene memory.</p>'''),
          card('acid-edge', f'''{thumb('word_clock_bnc_cable.jpg', 'BNC Word Clock Synchronization Cable')}
               <span class="spec-pill ao3">AO3 Clock Jitter &amp; Sync</span>
               <h4>Word Clock &amp; BNC Sync</h4>
               <p>Connecting multiple digital devices (consoles, ADATs, audio interfaces) requires a single Master Word Clock transmitted over 75-ohm BNC coaxial cables. Unsynchronized digital clocks cause severe clicks, pops, and clock jitter distortion.</p>''')
      ]))

# 9 BIRTH OF THE DAW: SOUND TOOLS TO PRO TOOLS
slide('🖥️', 'Digital Workstations', 'Birth of the DAW: <span>Sound Tools, Pro Tools &amp; Logic</span>',
      'Moving audio editing from razor-blade tape splicing to computer hard disks revolutionized speed, precision, and non-destructive arrangement possibilities.',
      G([
          card('highlight', f'''{thumb('digidesign_sound_tools.jpg', 'Digidesign Sound Tools 1989 Computer Interface')}
               <span class="spec-pill ao3">AO3 Early Hard Disk Recording</span>
               <h4>Sound Tools (1989)</h4>
               <p>Peter Gotcher and Evan Brooks founded Digidesign. Sound Tools allowed 2-track 16-bit 44.1 kHz direct-to-hard-disk recording on Apple Macintosh II computers, replacing analog tape machines for commercial CD mastering.</p>'''),
          card('cyan-edge', f'''{thumb('dsp_accelerator_pci_card.jpg', 'Avid Digidesign DSP Accelerator PCI Card')}
               <span class="spec-pill ao3">AO3 Hardware Acceleration</span>
               <h4>Pro Tools TDM / HD Systems</h4>
               <p>Released in 1991 (4 tracks), Pro Tools evolved into the industry recording standard. Dedicated PCIe DSP accelerator cards handled real-time audio mixing, plugin processing, and near-zero latency tracking independently of host CPU limitations.</p>'''),
          card('acid-edge', f'''{thumb('apple_logic_pro_mixer.png', 'Apple Logic Pro Modern Digital Mixer Interface')}
               <span class="spec-pill ao3">AO3 Native Processing</span>
               <h4>The Native DAW Era</h4>
               <p>As multi-core CPUs advanced, native DAWs (Apple Logic, Steinberg Cubase, Ableton Live) eliminated the requirement for expensive proprietary DSP cards, processing hundreds of audio tracks and plugins directly on host RAM and CPU.</p>''')
      ]))

# 10 DIGITAL AUDIO PHYSICS: SAMPLING & QUANTISATION
slide('🔬', 'Digital Audio Physics', 'PCM Audio Fundamentals: <span>Nyquist, Bit Depth &amp; Dither</span>',
      'Pulse-code modulation (PCM) digital audio relies on two mathematical dimensions: sample rate (frequency resolution) and bit depth (amplitude dynamic range).',
      G([
          card('highlight', f'''{thumb('nyquist_shannon_sampling.svg', 'Nyquist Shannon Sampling Theorem Diagram')}
               <span class="spec-pill ao3">AO3 Sampling Theorem</span>
               <h4>Nyquist Frequency &amp; Aliasing</h4>
               <p>Harry Nyquist and Claude Shannon proved that capturing an audio wave requires $f_s \ge 2 f_{max}$. If a 25 kHz tone enters a 44.1 kHz system without an anti-aliasing low-pass filter, it folds over into audible spectrum as harsh distortion at 19.1 kHz.</p>'''),
          card('cyan-edge', f'''{thumb('bit_depth_quantization_grid.svg', 'Bit Depth Quantization Error Staircase')}
               <span class="spec-pill ao3">AO3 Amplitude Resolution</span>
               <h4>Bit Depth &amp; Dynamic Range</h4>
               <p>Each bit provides ~6.02 dB of dynamic range: 16-bit audio offers 96 dB (65,536 quantization levels), while 24-bit audio offers 144 dB (16,777,216 levels), dropping the digital noise floor far below thermal circuit noise.</p>'''),
          card('acid-edge', f'''{thumb('dither_noise_masking.svg', 'TPDF Dither Noise Linearization Spectrum')}
               <span class="spec-pill ao3">AO3 Truncation Elimination</span>
               <h4>Dither &amp; TPDF Noise</h4>
               <p>When reducing a 24-bit mix down to 16-bit for CD release, simple truncation causes correlated quantization distortion at low amplitudes. Adding Triangular Probability Density Function (TPDF) dither noise converts harmonic distortion into harmless random hiss.</p>''')
      ]))

# 11 DAW NON-LINEAR EDITING: SLICING & COMPING
slide('✂️', 'Audio Manipulation', 'Non-Linear Editing: <span>Comping, Crossfades &amp; Grid Modes</span>',
      'Unlike destructive tape recording where punches permanently erased previous takes, modern DAWs store raw audio files safely on disk while edit playlists reference regions non-destructively.',
      G([
          card('highlight', f'''{thumb('daw_waveform_audio_comping.svg', 'DAW Multi-Take Vocal Comping Lanes')}
               <span class="spec-pill ao3">AO3 Vocal Take Comping</span>
               <h4>Multi-Take Audio Comping</h4>
               <p>Vocalists record 5–10 complete passes into stacked take lanes. The engineer selects the best words or phrases from each lane to assemble a seamless "composite" master vocal take using automatic micro-crossfades.</p>'''),
          card('cyan-edge', f'''{thumb('daw_slip_grid_editing.png', 'DAW Audio Region Slicing and Slip Grid Editing')}
               <span class="spec-pill ao3">AO3 Editing Modes</span>
               <h4>Grid, Slip &amp; Crossfades</h4>
               <p><strong>Grid mode</strong> locks audio slices to musical bars, beats, and quantize sub-divisions. <strong>Slip mode</strong> allows sub-millisecond nudging. Equal-power crossfades (+3 dB center sum) eliminate pops and clicks at edit boundaries.</p>'''),
          card('acid-edge', f'''{thumb('daw_automation_fader_lanes.svg', 'DAW Volume and Pan Breakpoint Automation Envelopes')}
               <span class="spec-pill ao3">AO3 Automation Modes</span>
               <h4>Sample-Accurate Automation</h4>
               <p>DAWs provide breakpoint automation envelopes for volume, pan, and plugin parameters. <strong>Read</strong> replays moves, <strong>Touch</strong> returns to previous value on fader release, <strong>Latch</strong> holds new values, and <strong>Write</strong> overwrites data.</p>''')
      ]))

# 12 VIRTUAL STUDIO TECHNOLOGY (VST) & PLUGINS
slide('🔌', 'Software Innovation', 'Virtual Studio Technology: <span>Plugins, Synths &amp; Buffers</span>',
      'In 1996, Steinberg released VST, forever transforming recording by replacing bulky studio racks with software plugins running entirely inside computer RAM.',
      G([
          card('highlight', f'''{thumb('steinberg_cubase_vst_window.png', 'Steinberg Cubase VST 1996 Software Interface')}
               <span class="spec-pill ao3">AO3 Software Architecture</span>
               <h4>Steinberg VST &amp; ASIO (1996)</h4>
               <p>Steinberg Cubase VST introduced open-format real-time digital audio plugins and ASIO low-latency audio drivers, allowing third-party developers to design software EQ, compression, and reverb plugins.</p>'''),
          card('cyan-edge', f'''{thumb('vst_software_synthesizer.jpg', 'Software Virtual Synthesizer Plugin GUI')}
               <span class="spec-pill ao3">AO3 Virtual Instruments</span>
               <h4>Virtual Instruments (VSTi)</h4>
               <p>Starting with the 1999 Steinberg Neon synth, VSTi brought hardware synthesizers into code. Modeled analog oscillators, wavetable synths (Serum, Massive), and multi-gigabyte orchestral sample libraries live inside the DAW session.</p>'''),
          card('acid-edge', f'''{thumb('daw_buffer_latency_diagram.svg', 'Audio Buffer Size CPU Latency Trade-Off Diagram')}
               <span class="spec-pill ao3">AO3 Buffer Management</span>
               <h4>Buffer Size vs Latency Trade-Off</h4>
                <p><strong>Small buffers (64-128 samples)</strong> minimize monitoring delay for live tracking (1.5-3 ms) but tax CPU cycles. <strong>Large buffers (512-1024 samples)</strong> provide processing headroom for dense mixes with hundreds of heavy plugins.</p>''')
      ]))

# 13 VOCAL PRODUCTION: AUTO-TUNE & PITCH CORRECTION
slide('🎤', 'Vocal Processing', 'Pitch Correction: <span>Auto-Tune, Phase Vocoders &amp; Cher</span>',
      'First introduced in 1997 by Dr. Andy Hildebrand, Antares Auto-Tune used seismic analysis math to detect and correct vocal pitch deviations in real time.',
      G([
          card('highlight', f'''{thumb('auto_tune_pitch_graph.svg', 'Antares Auto-Tune Graphical Pitch Quantisation')}
               <span class="spec-pill ao3">AO3 Phase Vocoder Math</span>
               <h4>Auto-Correlation Pitch Tracking</h4>
               <p>Auto-Tune detects vocal fundamental pitch by auto-correlating waveform cycles, comparing measured frequency to a user-defined musical scale, and phase-vocoding the audio to the nearest target pitch.</p>'''),
          card('cyan-edge', f'''{thumb('cher_believe_vocal_track.jpg', 'Cher Believe 1998 Landmark Single Production')}
               <span class="spec-pill ao3">AO4 Pop Production Milestones</span>
               <h4>The "Cher Effect" (1998)</h4>
               <p>Producers Mark Taylor and Brian Rawling set Auto-Tune\'s <em>Retune Speed</em> to zero on Cher\'s "Believe". Snapping pitch instantaneously with zero human transition created the signature robotic pop vocal texture.</p>
               {vid('uP1Fl1333W8', 'Auto-Tune Vocal Transformation', 'Watch: Pitch Correction Physics & Production')}'''),
          card('acid-edge', f'''{thumb('melodyne_ara_blobs.jpg', 'Celemony Melodyne Note Blobs Graphic Editor')}
               <span class="spec-pill ao3">AO3 Graphical Note Editing</span>
               <h4>Celemony Melodyne &amp; ARA</h4>
               <p>Melodyne displays audio as visual "note blobs" across pitch and time axes. Audio Random Access (ARA) integration allows deep polyphonic pitch manipulation, formant shifting, and individual note editing inside chords.</p>''')
      ]))

# 14 IN-THE-BOX (ITB) VS HYBRID SUMMING
slide('🎛️', 'Mixing Paradigms', 'In-The-Box (ITB) <span>vs Analog Hybrid Summing</span>',
      'Modern mixing divides between pure "In-The-Box" digital workflows and hybrid setups combining digital DAW convenience with analog outboard color.',
      G([
          card('highlight', f'''{thumb('in_the_box_mixing_setup.svg', 'In-The-Box DAW Production Control Room Setup')}
               <span class="spec-pill ao3">AO3 Pure Digital Mixing</span>
               <h4>In-The-Box (ITB) Mixing</h4>
               <p>All processing, mixing, and summing occurs inside the computer using 32-bit or 64-bit floating-point math. Benefits: infinite headroom, zero noise floor, instantaneous total recall, and zero generation loss.</p>'''),
          card('cyan-edge', f'''{thumb('digital_audio_connectors.svg', 'Digital Audio Connectors: USB, Thunderbolt, Dante')}
               <span class="spec-pill ao3">AO3 Digital Audio Interfacing</span>
               <h4>Thunderbolt, ADAT &amp; Dante</h4>
               <p>High-speed connectivity transmits dozens of channels of 24-bit 96/192 kHz audio with sub-millisecond roundtrip latency via Thunderbolt 3/4, ADAT optical, and network-over-ethernet Dante AoIP protocols.</p>'''),
          card('acid-edge', f'''{thumb('hybrid_analog_summing_bus.svg', 'Hybrid Analog Summing Signal Flow and Master Chain')}
               <span class="spec-pill ao3">AO3 Analog Summing</span>
               <h4>Hybrid Analog Summing</h4>
               <p>Producers route 16–24 discrete digital DAW stem outputs through D/A converters into a dedicated analog summing mixer (resistor matrix + transformers) and stereo master bus chain before printing back to DAW at 24-bit/96kHz.</p>''')
      ]))

# 15 MODERN DELIVERY & LOUDNESS: LUFS TO STREAMING
slide('📊', 'Mastering & Delivery', 'Loudness Standards: <span>LUFS, True Peak &amp; Streaming</span>',
      'The transition from the CD "Loudness Wars" to streaming platforms (Spotify, Apple Music) established strict loudness normalization standards.',
      G([
          card('highlight', f'''{thumb('lufs_loudness_meter_ebu.svg', 'LUFS Loudness Metering EBU R128 ITU BS1770')}
               <span class="spec-pill ao3">AO3 Perceived Loudness</span>
               <h4>LUFS &amp; EBU R128 Normalisation</h4>
               <p>Loudness Units Full Scale (LUFS) measures perceived human loudness using K-weighting EQ filters. Platforms normalize audio automatically (e.g. Spotify at -14 LUFS, Apple Music at -16 LUFS), penalizing hyper-compressed master tracks.</p>'''),
          card('cyan-edge', f'''{thumb('mastering_red_book_cd_metadata_diagram.svg', 'Red Book CD Subcode PQ Metadata Diagram')}
               <span class="spec-pill ao3">AO3 Digital Master Formats</span>
               <h4>True Peak &amp; Intersample Peaks</h4>
               <p>Digital brickwall limiters prevent intersample peaks (analog clipping that occurs when consecutive sample values exceed 0 dBFS during D/A reconstruction). True Peak limiters cap maximum peaks safely at -1.0 dBTP.</p>'''),
          card('acid-edge', f'''{thumb('mastering_room_speakers.jpg', 'Acoustically Treated Digital Mastering Studio')}
               <span class="spec-pill ao3">AO3 Final Delivery Stems</span>
               <h4>Stems &amp; Multi-Format Export</h4>
               <p>Final mix sessions export discrete sub-mix stems (Drums, Bass, Guitars, Synths, Lead Vox, Backing Vox) alongside 24-bit 48/96 kHz uncompressed WAV and Dolby Atmos spatial audio files for modern multi-platform release.</p>''')
      ]))

slides_html = '\n'.join(slides)

full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mixers &amp; Digital Audio Workstations (DAW) | A-Level Music Technology Deck</title>
  <style>
{css}
  </style>
</head>
<body>
  <div class="deck-wrapper">
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music Technology in Context</div>
      <div class="deck-topic-title">Topic: <strong>Mixers &amp; Digital Audio Workstations (DAW)</strong></div>
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
