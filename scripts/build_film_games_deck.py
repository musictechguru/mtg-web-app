"""Builds public/interactive-slide-film-games.html (14 slides) with verified authentic images and cinematic cyan/amber palette."""
import re, os

SRC = 'public/interactive-slide-house.html'
OUT = 'public/interactive-slide-film-games.html'
house = open(SRC, encoding='utf-8').read()
css = re.search(r'<style>(.*?)</style>', house, re.S).group(1)
js = re.search(r'<script>(.*?)</script>', house, re.S).group(1)

# Palette: Cyber Cyan (#00f0ff / #38bdf8) and Electric Amber (#f59e0b / #fbbf24) on deep space navy/dark (#070a14)
for a, b in [
    ('#c084fc', '#38bdf8'), ('192, 132, 252', '56, 189, 248'), ('#d8b4fe', '#7dd3fc'),
    ('#00C1F0', '#f59e0b'), ('0, 193, 240', '245, 158, 11'), ('#38bdf8', '#fbbf24'),
    ('#070814', '#070a14'), ('#0e1124', '#0d1322'), ('#151936', '#131b2e'),
    ('21, 25, 54', '19, 27, 46'), ('8, 10, 24', '7, 10, 20'), ('width: 6.25%', 'width: 7.14%')
]:
    css = css.replace(a, b)

TOTAL = 14
IMG = 'public/images/slides/film_games/'

def thumb(name, alt, contain=False, light=False):
    assert os.path.exists(IMG + name), f"Missing image: {IMG + name}"
    bg = '#ffffff' if light else '#0a0e1a'
    style = f' style="object-fit: contain; background: {bg}; padding: 6px;"' if contain else ''
    return f'<img src="/images/slides/film_games/{name}" alt="{alt}" class="slide-thumb"{style}>'

def vid(i, title, label):
    return f'<button class="video-trigger-btn" onclick="openVideo(\'{i}\', \'{title}\')">▶ {label}</button>'

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
slides.append('''
      <section class="slide active" data-slide="1">
        <div class="slide-eyebrow"><span>🎬</span> Topic Deep Dive &bull; GCE Music Technology</div>
        <h1 class="slide-heading">Music for Film <span>&amp; Computer Games</span></h1>
        <p class="slide-lead">Explore the technical evolution of screen audio &mdash; from Hollywood scoring stages, SMPTE timecode, and Decca Tree microphone arrays to 8-bit chiptune sound chips, 16-bit FM synthesis, CD-ROM streaming, and modern adaptive interactive audio engines.</p>
        <div class="grid-3" style="margin-top: 10px;">
          <div class="info-card highlight"><span class="spec-pill ao4">AO4 Screen Traditions</span><h4>Cinema to Interactive</h4><p>Trace the art of scoring from <strong>John Williams</strong>, <strong>Bernard Herrmann</strong>, and <strong>Vangelis</strong> to game masters <strong>Koji Kondo</strong>, <strong>Nobuo Uematsu</strong>, and <strong>Austin Wintory</strong>.</p></div>
          <div class="info-card cyan-edge"><span class="spec-pill ao3">AO3 Synchronization &amp; Studio</span><h4>SMPTE, Click &amp; Decca Tree</h4><p>Master <strong>SMPTE timecode</strong> (hours:mins:secs:frames), conductor <strong>streamers/punches</strong>, the 3-mic <strong>Decca Tree</strong> orchestral array, Foley capture, and ADR.</p></div>
          <div class="info-card acid-edge"><span class="spec-pill ao3">AO3 Game Sound Architecture</span><h4>Chips, CD-ROM &amp; Adaptive Audio</h4><p>Understand 8-bit <strong>PSG sound chips</strong>, 16-bit <strong>FM vs sample playback</strong>, Redbook streaming, and non-linear <strong>Vertical Layering</strong> vs <strong>Horizontal Resequencing</strong>.</p></div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
          <button class="nav-btn" onclick="nextSlide()" style="background: var(--accent-purple); color: #070a14; border-color: var(--accent-purple); font-weight: 700;">Start Interactive Deck &rarr;</button>
          <span style="font-size: 12px; color: var(--text-muted);">Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> to navigate</span>
        </div>
      </section>''')

# 2 SPEC ROADMAP
slide('📋', 'Specification Roadmap', 'Component 3 <span>Syllabus Matrix for Screen Audio</span>',
      'Edexcel requires deep understanding of synchronization technology, hardware sound generator constraints, and compositional techniques.',
      G([
          card('highlight', f'''{thumb('clapperboard.jpg', 'Film Synchronization')}
               <span class="spec-pill ao3">AO3 Synchronization</span>
               <h4>Timecode &amp; Visual Sync</h4>
               <p>SMPTE timecode (HH:MM:SS:FF); frame rates (24, 25, 29.97, 30 fps); metronome click tracks; conductor visual streamers and punches for exact hit points.</p>'''),
          card('cyan-edge', f'''{thumb('arcade_cabinet.jpg', 'Arcade & Console Hardware')}
               <span class="spec-pill ao3">AO3 Game Hardware</span>
               <h4>Chiptune &amp; Console Synthesis</h4>
               <p>8-bit PSG hardware limits (square, triangle, noise, DPCM); 16-bit FM synthesis (Genesis) vs sample playback (SNES); CD-ROM Redbook audio.</p>'''),
          card('acid-edge', f'''{thumb('orchestral_score.jpg', 'Orchestral Score')}
               <span class="spec-pill ao4">AO4 Composition &amp; Scoring</span>
               <h4>Orchestral, Hybrid &amp; Interactive</h4>
               <p>Decca Tree orchestral capture; Vangelis CS-80 synths; Hans Zimmer hybrid mockups; Foley; Diegetic vs Non-diegetic; Dynamic Adaptive audio.</p>''')
      ]))

# 3 SYNCHRONISATION: SMPTE, CLICKS & STREAMERS
slide('⏱️', 'Screen Synchronization', 'SMPTE Timecode, <span>Click Tracks &amp; Streamers</span>',
      'Composing to moving image requires frame-accurate synchronization between DAWs, musical conductors, and video playback.',
      G([
          card('highlight', f'''{thumb('smpte_timecode.jpg', 'SMPTE Timecode Display')}
               <span class="spec-pill ao3">AO3 Universal Standard</span>
               <h4>SMPTE Timecode (HH:MM:SS:FF)</h4>
               <p>Developed by the Society of Motion Picture and Television Engineers. Displays Hours, Minutes, Seconds, and Frames to lock DAWs, video decks, and MIDI sample-accurately.</p>'''),
          card('cyan-edge', f'''{thumb('conductor_baton.jpg', 'Conductor Podium')}
               <span class="spec-pill ao3">AO3 Conductor Timing</span>
               <h4>Click Tracks &amp; Streamers</h4>
               <p>Conductors and orchestra players listen to metronome click tracks in headphones. Visual "streamer" lines wipe across video monitors toward flash punches at hit points.</p>'''),
          card('acid-edge', f'''{thumb('daw_tempo_mapping.png', 'DAW Tempo Mapping')}
               <span class="spec-pill ao3">AO3 DAW Workflow</span>
               <h4>DAW Tempo Mapping &amp; Hits</h4>
               <p>Composers program tempo maps and meter changes in DAWs to align musical downbeats exactly with dramatic scene cuts, explosions, and visual stingers.</p>''')
      ]))

# 4 SYMPHONIC SCORING & THE DECCA TREE
slide('🎻', 'Orchestral Acoustic Capture', 'Scoring Stages <span>&amp; The Iconic Decca Tree</span>',
      'Hollywood and London scoring stages (Abbey Road Studio 1, AIR Lyndhurst) rely on time-tested acoustic stereo arrays.',
      G([
          card('highlight', f'''{thumb('abbey_road_orchestra.jpg', 'Abbey Road Studio 1')}
               <span class="spec-pill ao3">AO3 World-Class Spaces</span>
               <h4>Abbey Road Studio 1 &amp; AIR</h4>
               <p>Cavernous, acoustically treated live rooms provide natural reverberation and majestic bloom, accommodating 90-piece symphony orchestras and choirs.</p>'''),
          card('cyan-edge', f'''{thumb('decca_tree.png', 'The Decca Tree Setup')}
               <span class="spec-pill ao3">AO3 Landmark Array</span>
               <h4>The Decca Tree (Left, Right, Center)</h4>
               <p>Three omnidirectional microphones (Neumann M50) suspended on a T-bar 8–10 feet above the conductor. Delivers incredible stereo spread, imaging, and natural time-arrival depth.</p>'''),
          card('acid-edge', f'''{thumb('film_scoring_orchestra.png', 'Spot Mics')}
               <span class="spec-pill ao3">AO3 Articulation Detail</span>
               <h4>Outriggers &amp; Spot Mics</h4>
               <p>Wide omni outriggers expand orchestral width, while directional spot microphones (woodwinds, solo brass, timpani, harp) provide pinpoint clarity and mix balance.</p>''')
      ]))

# 5 SYNTHESIZER SCORING: VANGELIS & CARPENTER
slide('🎹', 'Electronic Cinematic Pioneers', 'Synthesizers in Film: <span>Vangelis, Wendy Carlos &amp; Carpenter</span>',
      'The 1970s and 1980s proved that electronic synthesizers could evoke as much cinematic drama and scale as a 90-piece orchestra.',
      G([
          card('highlight', f'''{thumb('vangelis.jpg', 'Vangelis')}
               <span class="spec-pill ao4">AO4 Synthesizer Maestro</span>
               <h4>Vangelis &amp; Blade Runner (1982)</h4>
               <p>Vangelis composed directly to picture using analog synthesizers, creating lush, dystopian noir soundscapes and melancholy horn leads.</p>
               {vid('RScZrvTebeA', 'Vangelis - Blade Runner Blues', 'Listen: Blade Runner Blues')}'''),
          card('cyan-edge', f'''{thumb('yamaha_cs80.png', 'Yamaha CS-80 Synth', contain=True)}
               <span class="spec-pill ao3">AO3 Iconic Hardware</span>
               <h4>Yamaha CS-80 Polyphonic Synth</h4>
               <p>Featuring polyphonic aftertouch and a continuous ribbon pitch controller, the CS-80 allowed expressive vibrato and acoustic-like emotional brass swells.</p>'''),
          card('acid-edge', f'''{thumb('modular_synth.jpg', 'Moog Modular Synth')}
               <span class="spec-pill ao4">AO4 Minimalist Suspense</span>
               <h4>Wendy Carlos &amp; John Carpenter</h4>
               <p>Wendy Carlos scored Kubrick's <em>The Shining</em> with eerie Moog modular synthesis; John Carpenter used driving analog synth basslines for <em>Halloween</em> (5/4 meter).</p>''')
      ]))

# 6 HYBRID SCORING & ORCHESTRAL MOCKUPS
slide('🎛️', 'Modern Production Techniques', 'Hybrid Scoring: <span>Hans Zimmer &amp; Virtual Mockups</span>',
      'Contemporary blockbuster scores blend live acoustic orchestral players with massive analog modular synthesizers and multi-sampled digital libraries.',
      G([
          card('highlight', f'''{thumb('hans_zimmer.jpg', 'Hans Zimmer')}
               <span class="spec-pill ao4">AO4 Blockbuster Titan</span>
               <h4>Hans Zimmer (Remote Control)</h4>
               <p>Pioneered modern hybrid scoring (<em>Inception</em>, <em>Gladiator</em>, <em>The Dark Knight</em>), merging massive analog synth sub-bass with live brass and strings.</p>
               {vid('c56t7upa8Bk', 'Hans Zimmer - Time (Inception)', 'Listen: Time (Inception)')}'''),
          card('cyan-edge', f'''{thumb('midi_sequencer.png', 'MIDI Continuous Controllers')}
               <span class="spec-pill ao3">AO3 Expression Control</span>
               <h4>MIDI CC1 Dynamics &amp; CC11 Expression</h4>
               <p>Composers ride MIDI faders live: CC1 (Mod Wheel) morphs between ppp and fff recorded sample layers; CC11 controls musical volume expression and phrasing.</p>'''),
          card('acid-edge', f'''{thumb('trent_reznor.jpg', 'Trent Reznor & Atticus Ross')}
               <span class="spec-pill ao4">AO4 Industrial Minimalism</span>
               <h4>Trent Reznor &amp; Atticus Ross</h4>
               <p>Oscar-winning scores for <em>The Social Network</em> and <em>Soul</em>, utilizing processed guitars, analog distortion, tape saturation, and ambient piano textures.</p>''')
      ]))

# 7 8-BIT CHIPTUNE: NES & COMMODORE 64
slide('👾', 'The 8-Bit Chiptune Era', 'Programmable Sound Generators: <span>NES Ricoh 2A03 &amp; C64 SID</span>',
      'In the 1980s, game composers worked under extreme hardware constraints, programming synthesis chips down to the byte.',
      G([
          card('highlight', f'''{thumb('nes_console.jpg', 'NES Console')}
               <span class="spec-pill ao3">AO3 Hardware Architecture</span>
               <h4>NES Ricoh 2A03 PSG Chip</h4>
               <p>Strict 5-channel sound generator: 2 pulse/square wave channels (melody/countermelody), 1 triangle wave (bass), 1 noise channel (drums), and 1 DPCM sample channel.</p>'''),
          card('cyan-edge', f'''{thumb('commodore_64.jpg', 'Commodore 64')}
               <span class="spec-pill ao3">AO3 Analog Character</span>
               <h4>Commodore 64 &amp; SID 6581</h4>
               <p>Features 3 oscillators with selectable waveforms (saw, tri, pulse, noise), ring modulation, and an analog resonant multi-mode filter, creating warm synthesizer punch.</p>'''),
          card('acid-edge', f'''{thumb('koji_kondo.jpg', 'Koji Kondo')}
               <span class="spec-pill ao4">AO4 Chiptune Genius</span>
               <h4>Koji Kondo (Super Mario &amp; Zelda)</h4>
               <p>Created the world's most recognizable game themes by using calypso syncopation, rapid arpeggios to imply chords, and strict voice economy.</p>
               {vid('NTa6Xbzfq1U', 'Koji Kondo - Super Mario Bros Theme', 'Listen: Super Mario Bros')}'''),
      ]))

# 8 16-BIT AUDIO: FM SYNTHESIS VS SAMPLE PLAYBACK
slide('🎮', 'The 16-Bit Console War', 'FM Synthesis vs Sample Playback: <span>Genesis vs SNES</span>',
      'The early 1990s brought a fierce technological contrast between frequency modulation synthesis and compressed sample wavetables.',
      G([
          card('highlight', f'''{thumb('sega_genesis.jpg', 'Sega Genesis')}
               <span class="spec-pill ao3">AO3 FM Synthesis</span>
               <h4>Sega Genesis: Yamaha YM2612</h4>
               <p>A 6-channel FM synthesis chip capable of sharp metallic percussion, slap bass, and gritty overdrive. Yuzo Koshiro used it for electronic dance tracks in <em>Streets of Rage</em>.</p>'''),
          card('cyan-edge', f'''{thumb('snes_console.jpg', 'Super Nintendo')}
               <span class="spec-pill ao3">AO3 Sample Playback</span>
               <h4>Super Nintendo: Sony SPC700</h4>
               <p>Features 8 channels of 16-bit compressed audio samples with built-in hardware Gaussian interpolation, pitch modulation, and stereo hardware echo/reverb.</p>'''),
          card('acid-edge', f'''{thumb('fm_synthesis.png', 'FM Operators')}
               <span class="spec-pill ao3">AO3 Technical Contrast</span>
               <h4>Algorithmic FM vs Sample Memory</h4>
               <p>Genesis relied on mathematical FM modulator/carrier operators (zero sample memory); SNES had 64KB RAM for compressed acoustic instruments (brass, strings, timpani).</p>''')
      ]))

# 9 CD-ROM REVOLUTION & REDBOOK AUDIO
slide('💿', 'The Optical Disc Era', 'CD-ROM &amp; Redbook Audio: <span>PlayStation 1 &amp; Beyond</span>',
      'The mid-1990s move from silicon cartridges to 650MB optical CD-ROM discs eliminated hardware synthesis constraints forever.',
      G([
          card('highlight', f'''{thumb('playstation_1.jpg', 'Sony PlayStation 1')}
               <span class="spec-pill ao3">AO3 Optical Breakthrough</span>
               <h4>Sony PlayStation (1994)</h4>
               <p>CD-ROM storage allowed developers to stream 44.1 kHz / 16-bit uncompressed Redbook audio directly from disc, enabling studio-quality music in games.</p>'''),
          card('cyan-edge', f'''{thumb('compact_disc.png', 'Compact Disc')}
               <span class="spec-pill ao3">AO3 Real Acoustic Recordings</span>
               <h4>Live Orchestras &amp; Vocals</h4>
               <p>For the first time, full live symphony orchestras, rock bands, and recorded opera singers could be heard in game cutscenes and level soundtracks.</p>'''),
          card('acid-edge', f'''{thumb('nobuo_uematsu.jpg', 'Nobuo Uematsu')}
               <span class="spec-pill ao4">AO4 Symphonic Storytelling</span>
               <h4>Nobuo Uematsu &amp; Final Fantasy VII</h4>
               <p>Uematsu combined internal sequenced MIDI synthesis for exploration with full streaming orchestral/choral audio on <em>One-Winged Angel</em>.</p>''')
      ]))

# 10 INTERACTIVE AUDIO: VERTICAL LAYERING
slide('📊', 'Dynamic Game Scoring', 'Vertical Layering: <span>Dynamic Multi-Stemming</span>',
      'Unlike linear film scores, video games are non-linear: music must dynamically react to player decisions in real time.',
      G([
          card('highlight', f'''{thumb('vertical_layering_diagram.png', 'Dynamic Stems')}
               <span class="spec-pill ao3">AO3 Synchronized Stems</span>
               <h4>Simultaneous Multi-Track Stems</h4>
               <p>The composer writes multiple stems (percussion, bassline, ambient pads, aggressive brass) that all play in exact tempo and harmonic lock simultaneously.</p>'''),
          card('cyan-edge', f'''{thumb('game_controller.jpg', 'Combat Layering')}
               <span class="spec-pill ao3">AO3 Gameplay Modulation</span>
               <h4>Combat vs Exploration Intensity</h4>
               <p>During stealth or exploration, only ambient pads and low bass play. When combat erupts, the game engine un-mutes the aggressive drums and brass stems seamlessly.</p>'''),
          card('acid-edge', f'''{thumb('game_boy.jpg', 'Dynamic Game State')}
               <span class="spec-pill ao3">AO3 Real-Time Transitions</span>
               <h4>Smooth DSP Crossfades</h4>
               <p>Transitions occur via rapid volume crossfades or dynamic low-pass filter sweeps, avoiding jarring musical stops or restarts.</p>''')
      ]))

# 11 HORIZONTAL RESEQUENCING & MIDDLEWARE
slide('🔄', 'Adaptive Audio Systems', 'Horizontal Resequencing <span>&amp; Middleware (Wwise/FMOD)</span>',
      'To change mood or location without cutting off musical flow, game engines utilize sophisticated horizontal branching and middleware.',
      G([
          card('highlight', f'''{thumb('horizontal_resequencing_diagram.png', 'Musical Quantization')}
               <span class="spec-pill ao3">AO3 Bar/Beat Transitions</span>
               <h4>Horizontal Resequencing</h4>
               <p>Music is broken into modular cue segments. When game states change, the engine waits for the next bar downbeat or beat boundary before branching to a new cue.</p>'''),
          card('cyan-edge', f'''{thumb('audio_mixer_faders.jpg', 'Stingers & Hits')}
               <span class="spec-pill ao3">AO3 Musical Stingers</span>
               <h4>Stingers &amp; Transition Chords</h4>
               <p>Short musical flourishes (stingers) mask the transition between cues, creating a natural cadence that feels custom-composed for that exact second.</p>'''),
          card('acid-edge', f'''{thumb('middleware_audio_graph.png', 'Audio Middleware')}
               <span class="spec-pill ao3">AO3 Engine Integration</span>
               <h4>Audio Middleware: Wwise &amp; FMOD</h4>
               <p>Specialized middleware programs handle priority queuing, spatial 3D audio positioning, real-time DSP effects, and RTPC (Real-Time Parameter Controls).</p>''')
      ]))

# 12 SOUND DESIGN, FOLEY & ADR
slide('🎙️', 'Film & Game Sound Design', 'Foley, ADR <span>&amp; Environmental Soundscapes</span>',
      'A film or game soundtrack consists of three distinct sonic pillars: Dialogue (ADR), Sound Effects/Foley, and Music.',
      G([
          card('highlight', f'''{thumb('foley_stage.jpg', 'Foley Stage')}
               <span class="spec-pill ao3">AO3 Physical Performance</span>
               <h4>The Foley Stage</h4>
               <p>Foley artists perform footsteps across dirt/gravel/wood pits and manipulate physical props (leather, metal, glass) in real time while watching the film screen.</p>'''),
          card('cyan-edge', f'''{thumb('foley_recording.png', 'Foley Mic Technique')}
               <span class="spec-pill ao3">AO3 Transducer Precision</span>
               <h4>Foley Recording Techniques</h4>
               <p>Shotgun and small-diaphragm condenser microphones placed close to sound props in dead, reflection-free acoustic studios capture hyper-realistic impact transients.</p>'''),
          card('acid-edge', f'''{thumb('voiceover_booth.jpg', 'ADR Vocal Booth')}
               <span class="spec-pill ao3">AO3 Dialogue Replacement</span>
               <h4>ADR (Automated Dialogue Replacement)</h4>
               <p>Actors re-record muffled or noisy on-set dialogue inside a soundproof vocal booth, matching lip sync to the projected scene with pristine studio condenser mics.</p>''')
      ]))

# 13 CINEMATIC CONCEPTS: DIEGETIC & LEITMOTIF
slide('🎭', 'Cinematic Musical Grammar', 'Diegetic, Non-Diegetic <span>&amp; The Wagnerian Leitmotif</span>',
      'The emotional power of screen music relies on foundational cinematic vocabulary and psychological musical storytelling.',
      G([
          card('highlight', f'''{thumb('john_williams.jpg', 'John Williams')}
               <span class="spec-pill ao4">AO4 Thematic Architecture</span>
               <h4>The Leitmotif (John Williams)</h4>
               <p>A recurring musical theme associated with a specific character, place, or concept (e.g. <em>The Imperial March</em> for Darth Vader, or the 2-note <em>Jaws</em> motif).</p>
               {vid('54hoKbTWon4', 'John Williams - Star Wars Main Title', 'Listen: Star Wars Main Title')}'''),
          card('cyan-edge', f'''{thumb('bernard_herrmann.jpg', 'Bernard Herrmann')}
               <span class="spec-pill ao4">AO4 Dissonance &amp; Strings</span>
               <h4>Bernard Herrmann (Psycho, Vertigo)</h4>
               <p>Rejected traditional lush romanticism for sharp, dissonant string-only arrangements (<em>Psycho</em> shower scene screech) and ostinato suspense.</p>'''),
          card('acid-edge', f'''{thumb('ennio_morricone.jpg', 'Ennio Morricone')}
               <span class="spec-pill ao4">AO4 Diegetic Invention</span>
               <h4>Diegetic vs Non-Diegetic Music</h4>
               <p>Diegetic music exists within the film world (characters hear it). Morricone blended diegetic whistles, jaw harps, and gunshots into orchestral scores.</p>''')
      ]))

# 14 21st CENTURY COMPOSERS & GAME MILESTONES
slide('🏆', 'Modern Masters & Milestones', '21st Century Game Audio: <span>Wintory, O\'Donnell &amp; Gordon</span>',
      'Today, video game music rivals feature films in scale, winning Grammy awards and breaking artistic boundaries.',
      G([
          card('highlight', f'''{thumb('austin_wintory.jpg', 'Austin Wintory')}
               <span class="spec-pill ao4">AO4 Grammy Milestone</span>
               <h4>Austin Wintory (Journey, 2012)</h4>
               <p>First video game score nominated for a Grammy for Best Score Soundtrack. Built around a dynamic solo cello that responds to the player's emotional journey.</p>
               {vid('ypNgvc6c6Cc', 'Austin Wintory - Apotheosis (Journey)', 'Listen: Apotheosis')}'''),
          card('cyan-edge', f'''{thumb('martin_odonnell.png', 'Martin ODonnell')}
               <span class="spec-pill ao4">AO4 Choral &amp; Rock Power</span>
               <h4>Martin O'Donnell (Halo, 2001)</h4>
               <p>Iconic monophonic Gregorian monk chants fused with driving orchestral strings and heavy rock percussion, adapting dynamically to player battle states.</p>
               {vid('0jXTBAGv9ZQ', 'Martin ODonnell - Halo Theme Original', 'Listen: Halo Theme')}'''),
          card('acid-edge', f'''{thumb('mick_gordon.jpg', 'Mick Gordon')}
               <span class="spec-pill ao4">AO4 Avant-Garde Legacy</span>
               <h4>Jerry Goldsmith to Mick Gordon</h4>
               <p>From Goldsmith's echoplex trumpet delays on <em>Patton</em> to Mick Gordon's analog feedback loops on <em>Doom</em> (2016), technology continues to redefine scoring.</p>''')
      ]))

# Assemble final HTML
html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Music for Film &amp; Computer Games &bull; Interactive Study Deck | Music Tech Guru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>{css}</style>
</head>
<body>
  <div class="deck-wrapper">
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music in Context</div>
      <div class="deck-topic-title">Topic: <strong>Music for Film &amp; Computer Games</strong></div>
    </header>
    <main class="slides-viewport" id="slidesViewport">{''.join(slides)}
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

  <div class="video-modal-backdrop" id="videoModal">
    <div class="video-modal-content">
      <div class="video-modal-header"><span class="video-modal-title" id="videoModalTitle">Video Clip</span><button class="close-modal-btn" onclick="closeVideo()">&times;</button></div>
      <div class="video-player-wrapper"><iframe id="videoIframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
    </div>
  </div>

  <script>{js}</script>
</body>
</html>'''

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Generated {OUT} ({len(html)} bytes, {TOTAL} slides)")
