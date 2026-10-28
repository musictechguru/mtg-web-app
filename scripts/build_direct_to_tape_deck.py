"""
Builds public/interactive-slide-direct-to-tape.html (14 slides)
Based on authentic Google Slide curriculum: Direct to tape mono & 2-track recording (c.1950 - 1963).
Theme: Deep Warm Walnut/Navy with Amber & Gold accents (#f59e0b / #fbbf24).
"""
import re, os

SRC = 'public/interactive-slide-house.html'
OUT = 'public/interactive-slide-direct-to-tape.html'
house = open(SRC, encoding='utf-8').read()
css = re.search(r'<style>(.*?)</style>', house, re.S).group(1)
js = re.search(r'<script>(.*?)</script>', house, re.S).group(1)

# Color replacement: Deep Navy/Walnut with Warm Amber/Gold
for a, b in [
    ('#c084fc', '#f59e0b'), ('192, 132, 252', '245, 158, 11'), ('#d8b4fe', '#fbbf24'),
    ('#00C1F0', '#38bdf8'), ('0, 193, 240', '56, 189, 248'), ('#38bdf8', '#00C1F0'),
    ('#070814', '#080d1a'), ('#0e1124', '#0e1626'), ('#151936', '#142038'),
    ('21, 25, 54', '20, 32, 56'), ('8, 10, 24', '8, 13, 26'), ('width: 6.25%', 'width: 7.14%')
]:
    css = css.replace(a, b)

# Ensure slide-thumb displays full image with contain, centered on dark backdrop
css = re.sub(
    r'\.slide-thumb\s*\{[^}]*\}',
    '''.slide-thumb {
      width: 100%;
      height: 125px;
      object-fit: contain;
      object-position: center;
      background: rgba(0, 0, 0, 0.45);
      border-radius: 8px;
      margin-bottom: 10px;
      border: 1px solid var(--border-subtle);
      padding: 4px;
      display: block;
    }''',
    css
)

TOTAL = 14
IMG = '/images/slides/direct_to_tape/'

def thumb(name, alt, contain=False):
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
        <div class="slide-eyebrow"><span>🎙️</span> Evolutionary Era 01 &bull; Component 4 Production &amp; Analysing</div>
        <h1 class="slide-heading">Direct to Tape Recording <span>(c.1950 – 1963)</span></h1>
        <p class="slide-lead">Before multitrack overdubbing existed, records were tracked live in one room directly to mono or 2-track reel-to-reel magnetic tape. Balance was achieved through musician positioning, polar pattern dead spots, and natural room acoustic spill.</p>
        <div class="grid-3" style="margin-top: 10px;">
          <div class="info-card highlight"><span class="spec-pill ao4">AO4 Musical Styles</span><h4>Blues to Rock 'n' Roll</h4><p>Delta &amp; Electric Blues (<strong>Skip James</strong>, <strong>B.B. King</strong>), 1950s Rock 'n' Roll explosion (<strong>Elvis Presley</strong>, <strong>Bill Haley</strong>, <strong>Buddy Holly</strong>), and Big Band jazz.</p></div>
          <div class="info-card cyan-edge"><span class="spec-pill ao3">AO3 Transducers &amp; Gear</span><h4>Ribbons, Tubes &amp; Ampex</h4><p>Master <strong>RCA 44BX / 77DX ribbon mics</strong>, <strong>Neumann U47</strong>, <strong>Altec 1567A</strong> tube mixers, <strong>Fender Bassman</strong>, and <strong>Ampex 200/300</strong> tape machines.</p></div>
          <div class="info-card acid-edge"><span class="spec-pill ao3">AO3 Studio Physics</span><h4>Spill, Slapback &amp; Humbuckers</h4><p>Explore <strong>acoustic spill control</strong> without headphone monitoring, <strong>Sun Studio tape slapback echo</strong>, and Seth Lover's revolutionary <strong>humbucking pickup</strong>.</p></div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
          <button class="nav-btn" onclick="nextSlide()" style="background: #f59e0b; color: #080d1a; border-color: #f59e0b; font-weight: 700;">Start Interactive Deck &rarr;</button>
          <span style="font-size: 12px; color: var(--text-muted);">Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> to navigate</span>
        </div>
      </section>''')

# 2 SYLLABUS ROADMAP
slide('📋', 'Specification Roadmap', 'Component 4 <span>Syllabus Matrix for 1950–1963</span>',
      'Edexcel requires in-depth technical analysis of recording equipment, miking, studio effects, and instruments from this foundational era.',
      G([
          card('highlight', f'''{thumb('tape_mechanics.png', 'Tape Mechanics')}
               <span class="spec-pill ao3">AO3 Recording Technology</span>
               <h4>Tape &amp; Signal Flow</h4>
               <p>Reel-to-reel magnetic tape coated with iron-oxide; Erase, Record, Playback heads; tube mixing desks and simultaneous live tracking.</p>'''),
          card('cyan-edge', f'''{thumb('room_spill_mic.jpg', 'Acoustic Spill')}
               <span class="spec-pill ao3">AO3 Transducer Positioning</span>
               <h4>Acoustic Spill Balancing</h4>
               <p>Controlling room bleed without headphones; balancing instruments physically in room; using figure-8 ribbon 90° null angles to reject drums.</p>'''),
          card('acid-edge', f'''{thumb('slapback_echo.png', 'Studio Effects')}
               <span class="spec-pill ao3">AO3 Vintage Effects</span>
               <h4>Slapback &amp; Chambers</h4>
               <p>Tape slapback delay using head gap distance (50–120ms); natural tube console saturation; physical basement echo chambers and Pultec EQ.</p>''')
      ]))

# 3 BLUES EVOLUTION
slide('🎸', 'Musical Evolution', 'From Delta Blues <span>to Electric Chicago</span>',
      'The 1950s saw the direct evolution of acoustic Southern country blues into amplified electric urban blues.',
      G([
          card('highlight', f'''{thumb('skip_james.jpg', 'Skip James')}
               <span class="spec-pill ao4">AO4 Acoustic Roots</span>
               <h4>Skip James (1931)</h4>
               <p>Early country blues recorded direct-to-disc with a single microphone. Intimate ambient capture, heavy shellac surface noise, and expressive minor tunings.</p>
               {vid('_mmZFox4Rkg', 'Skip James - Devil Got My Woman', 'Listen: Devil Got My Woman')}'''),
          card('cyan-edge', f'''{thumb('bb_king_electric.jpg', 'B.B. King')}
               <span class="spec-pill ao4">AO4 Electric Amplification</span>
               <h4>B.B. King: "You Upset Me Baby"</h4>
               <p>1954 electric blues recorded on early magnetic tape. Features hollow-body electric guitar, brass horns, walking bass, and tight tube preamp compression.</p>
               {vid('wtaWVKiYt5w', 'B.B. King - You Upset Me Baby (1954)', 'Listen: You Upset Me Baby')}'''),
          card('acid-edge', f'''{thumb('chess_blues_studio.jpg', 'Chess Records')}
               <span class="spec-pill ao3">AO3 Studio Sound</span>
               <h4>The Chicago Sound (Chess)</h4>
               <p>Leonard &amp; Phil Chess captured Muddy Waters, Howlin' Wolf, and Little Walter with small tube amps pushed into gritty harmonic overdrive.</p>''')
      ]))

# 4 ROCK 'N' ROLL EXPLOSION
slide('⚡', '1950s Cultural Watershed', 'The Birth of <span>Rock \'n\' Roll (1954–1956)</span>',
      'Electrified rhythm & blues fused with country boogie, sparking the modern youth culture explosion.',
      G([
          card('highlight', f'''{thumb('bill_haley_comets.jpg', 'Bill Haley')}
               <span class="spec-pill ao4">AO4 Landmark Anthem</span>
               <h4>Bill Haley: Rock Around the Clock</h4>
               <p>Cut in April 1954 at Decca's Pythian Temple ballroom studio. Tracked live direct to mono tape with room reverb and slapping upright slap-bass.</p>
               {vid('IPmUQX44dqc', 'Bill Haley - Rock Around the Clock', 'Listen: Rock Around the Clock')}'''),
          card('cyan-edge', f'''{thumb('elvis_presley_sun.jpg', 'Elvis Presley Sun Studios')}
               <span class="spec-pill ao3">AO3 Sun Slapback</span>
               <h4>Elvis Presley at Sun (1954)</h4>
               <p>Sam Phillips paired Scotty Moore's Gibson ES-295, Bill Black's upright bass, and Elvis's acoustic rhythm with iconic 1/4" tape slapback delay.</p>'''),
          card('acid-edge', f'''{thumb('buddy_holly_clovis.jpg', 'Buddy Holly')}
               <span class="spec-pill ao3">AO3 Independent Studio</span>
               <h4>Buddy Holly &amp; Norman Petty</h4>
               <p>Recorded at Clovis, New Mexico. Established the definitive 4-piece rock lineup: two electric guitars (Stratocaster), electric bass, and drum kit.</p>''')
      ]))

# 5 JAZZ & BIG BAND
slide('🎷', 'Acoustic Precision', 'Jazz in the 1950s: <span>Cool Jazz to Big Band</span>',
      'Jazz recording required transparent, ultra-clean capture of wide dynamic ranges, virtuosic soloists, and complex horn ensembles.',
      G([
          card('highlight', f'''{thumb('miles_davis_1950s.jpg', 'Miles Davis')}
               <span class="spec-pill ao4">AO4 Modal Revolution</span>
               <h4>Miles Davis &amp; Rudy Van Gelder</h4>
               <p>Van Gelder engineered Blue Note sessions in Hackensack, NJ using strategically positioned German condenser microphones for up-front intimacy.</p>'''),
          card('cyan-edge', f'''{thumb('count_basie_band.jpg', 'Count Basie')}
               <span class="spec-pill ao3">AO3 Horn Section Balance</span>
               <h4>Count Basie Big Band</h4>
               <p>Massive 16-piece horn sections balanced dynamically in one room. Trumpets stepped back while trombones and reeds played forward to level SPL.</p>
               {vid('xJ-ohqwTz24', 'Count Basie ft Ella Fitzgerald - Party Blues', 'Listen: Party Blues (1956)')}'''),
          card('acid-edge', f'''{thumb('ella_fitzgerald.jpg', 'Ella Fitzgerald')}
               <span class="spec-pill ao3">AO3 Dynamic Range</span>
               <h4>Vocal Dynamics on Tape</h4>
               <p>Singers controlled vocal dynamics acoustically by moving 6 to 18 inches away from ribbon microphones on loud belt phrases to prevent tape saturation.</p>''')
      ]))

# 6 ELECTRIC GUITAR ANATOMY & INDUCTION
slide('🔌', 'Transducer Science', 'The Electric Guitar: <span>Electromagnetic Induction</span>',
      'How steel strings vibrating above a magnetic core convert mechanical kinetic energy into an electrical audio signal.',
      G([
          card('highlight', f'''{thumb('electromagnetic_induction.png', 'Electromagnetic Induction')}
               <span class="spec-pill ao3">AO3 Induction Physics</span>
               <h4>Faraday\'s Law in Action</h4>
               <p>A permanent Alnico magnet magnetizes the steel guitar string. As the string vibrates, its moving magnetic field cuts through a copper coil, inducing an AC microvoltage.</p>'''),
          card('cyan-edge', f'''{thumb('single_coil_pickup.jpg', 'Single Coil Pickup')}
               <span class="spec-pill ao3">AO3 Single-Coil Pickups</span>
               <h4>Single-Coil Architecture</h4>
               <p>6 individual magnetic pole pieces wrapped in thousands of turns of fine copper wire. Delivers bright, percussive attack, sparkling highs, but picks up 50/60Hz electromagnetic hum.</p>'''),
          card('acid-edge', f'''{thumb('gibson_es150.jpg', 'Gibson ES-150')}
               <span class="spec-pill ao4">AO4 Charlie Christian 1936</span>
               <h4>Gibson ES-150 ("Electric Spanish")</h4>
               <p>First commercially successful electric guitar. Fitted with a heavy cobalt-steel bar pickup, enabling guitarists to cut through loud horn big bands.</p>
               {vid('Ce9Jtl9D6FQ', 'Charlie Christian - Swing to Bop', 'Listen: Charlie Christian Solo')}'''),
      ]))

# 7 SOLID BODY GUITARS & BASS
slide('🎸', 'Industrial Design', 'The Solid-Body Revolution: <span>Leo Fender &amp; Les Paul</span>',
      'Eliminating hollow acoustic body resonance allowed guitarists to play at high volumes without feedback squeals.',
      G([
          card('highlight', f'''{thumb('fender_telecaster.jpg', 'Fender Telecaster')}
               <span class="spec-pill ao4">AO4 Landmark Solid Body</span>
               <h4>Fender Telecaster (1951)</h4>
               <p>Originally the Broadcaster. Ash body, maple bolt-on neck, and dual single-coil pickups. Bright, biting bridge pickup "twang" defined early country and rockabilly.</p>'''),
          card('cyan-edge', f'''{thumb('fender_stratocaster.jpg', 'Fender Stratocaster')}
               <span class="spec-pill ao3">AO3 Tonal Versatility</span>
               <h4>Fender Stratocaster (1954)</h4>
               <p>Contoured ash body, three single-coil pickups, and a synchronized tremolo arm. Buddy Holly made it the quintessential visual and sonic symbol of rock 'n' roll.</p>
               {vid('9irsg1vBmq0', 'Buddy Holly - That Will Be The Day', 'Listen: Stratocaster Twang')}'''),
          card('acid-edge', f'''{thumb('fender_precision_bass.jpg', 'Fender Precision Bass')}
               <span class="spec-pill ao3">AO3 Low-End Revolution</span>
               <h4>Fender Precision Bass (1951)</h4>
               <p>Replaced the unwieldy acoustic upright bass. Fretted neck guaranteed precise intonation; electric pickup provided deep, consistent low-end punch through bass amps.</p>''')
      ]))

# 8 THE HUMBUCKING PICKUP
slide('🛡️', 'Noise Cancellation', 'The Humbucker: <span>Seth Lover &amp; Gibson (1957)</span>',
      'The revolutionary dual-coil design that eliminated studio hum and doubled guitar output voltage.',
      G([
          card('highlight', f'''{thumb('humbucker_pickup.png', 'Humbucker Pickup')}
               <span class="spec-pill ao3">AO3 RWRP Principle</span>
               <h4>Reverse-Wound, Reverse-Polarity</h4>
               <p>Two single coils placed side by side. One coil has North magnetic polarity with clockwise winding; the second has South polarity with counter-clockwise winding.</p>'''),
          card('cyan-edge', f'''{thumb('humbucker_diagram.png', 'Humbucker Hum Cancellation')}
               <span class="spec-pill ao3">AO3 Common-Mode Rejection</span>
               <h4>Bucking the 50/60 Hz Hum</h4>
               <p>External electromagnetic interference (mains hum) hits both coils with identical phase and is canceled out. String signals, having dual reversals, add together (+6 dB).</p>'''),
          card('acid-edge', f'''{thumb('gibson_les_paul.jpg', 'Gibson Les Paul')}
               <span class="spec-pill ao4">AO4 Warm, Thick Tone</span>
               <h4>Gibson Les Paul PAF (1957)</h4>
               <p>Fitted with Seth Lover\'s "Patent Applied For" humbuckers. Delivered a warm, sustain-rich, midrange-heavy tone with zero 60-cycle hum, ideal for blues-rock.</p>''')
      ]))

# 9 VALVE GUITAR AMPLIFIERS
slide('📻', 'Analog Amplification', 'Tube Electronics: <span>Fender Tweed &amp; Valve Overdrive</span>',
      'How vacuum tube circuitry amplified low-level pickup signals and introduced musical harmonic saturation.',
      G([
          card('highlight', f'''{thumb('valve_tube_glow.jpg', 'Vacuum Tube Glow')}
               <span class="spec-pill ao3">AO3 Thermionic Valves</span>
               <h4>Preamp &amp; Power Valves</h4>
               <p>12AX7 dual-triode preamp tubes boost microvoltage guitar signals; 6L6 or 6V6 power beam tetrodes drive high currents into the output transformer.</p>'''),
          card('cyan-edge', f'''{thumb('fender_bassman.png', 'Fender Bassman Tweed')}
               <span class="spec-pill ao3">AO3 The Benchmark Amp</span>
               <h4>Fender Bassman 4x10 (1952–1959)</h4>
               <p>Originally designed for the Precision Bass, its 45-watt tube circuit and open-back 4x10" Jensen speakers became the ultimate blues and rock guitar amplifier.</p>'''),
          card('acid-edge', f'''{thumb('amp_speaker_cab.jpg', 'Amp Architecture')}
               <span class="spec-pill ao3">AO3 Harmonic Soft Clipping</span>
               <h4>Musical Valve Saturation</h4>
               <p>Unlike transistor clipping which squares off peaks harshly, tube grids compress signal peaks with smooth, rounded saturation rich in pleasant 2nd-order harmonics.</p>''')
      ]))

# 10 1950s STUDIO ARCHITECTURE
slide('🎛️', 'Studio Signal Flow', '1950s Studio Anatomy: <span>Control Room to Live Room</span>',
      'Before multitrack consoles existed, studios relied on simple rotary tube mixers and live acoustic tracking.',
      G([
          card('highlight', f'''{thumb('control_room_1950s.jpg', 'Control Room 1950s')}
               <span class="spec-pill ao3">AO3 Control Room Setup</span>
               <h4>Monitoring &amp; Tape Deck</h4>
               <p>Engineers sat behind tube mixing desks (Altec 1567A, EMI REDD) monitoring in mono on a single large coaxial studio monitor speaker (Altec 604).</p>'''),
          card('cyan-edge', f'''{thumb('altec_1567a_mixer.jpg', 'Altec Tube Mixer')}
               <span class="spec-pill ao3">AO3 Signal Flow</span>
               <h4>1950s Analog Signal Path</h4>
               <p>Microphone &rarr; Tube Microphone Preamp &rarr; Rotary Gain Attenuator &rarr; Program Bus &rarr; Outboard EQ / Compressor &rarr; Tape Record Head.</p>'''),
          card('acid-edge', f'''{thumb('live_room_tracking.jpg', 'Live Room Band Setup')}
               <span class="spec-pill ao3">AO3 Live Tracking Workflow</span>
               <h4>All In One Room (No Overdubs)</h4>
               <p>Entire band tracked simultaneously. Heavy movable acoustic baffles ("gobos") provided slight separation, but acoustic spill was embraced as cohesive glue.</p>''')
      ]))

# 11 MICROPHONES & SPILL CONTROL
slide('🎙️', 'Transducers in Context', 'Ribbon &amp; Tube Microphones: <span>Managing Acoustic Spill</span>',
      'Microphone polar patterns were the primary mixing tool: engineers used directional dead spots to reject loud instruments.',
      G([
          card('highlight', f'''{thumb('rca_44bx_ribbon.jpg', 'RCA 44BX Ribbon')}
               <span class="spec-pill ao3">AO3 Figure-8 Transducer</span>
               <h4>RCA 44BX &amp; 77DX Ribbons</h4>
               <p>Ultra-thin corrugated aluminum ribbon suspended between powerful magnetic poles. Delivers smooth, warm top-end roll-off and rich proximity effect on vocals.</p>'''),
          card('cyan-edge', f'''{thumb('figure_8_null_spill.png', 'Figure 8 Null Spill Diagram')}
               <span class="spec-pill ao3">AO3 Rejection Nulls</span>
               <h4>Figure-8 Null Spot Positioning</h4>
               <p>A figure-8 ribbon microphone is completely deaf at 90° and 270°. Engineers aimed the sides of vocal mics directly at drums or guitar amps, rejecting bleed by -40 dB!</p>'''),
          card('acid-edge', f'''{thumb('neumann_u47_tube.jpg', 'Neumann U47 Tube')}
               <span class="spec-pill ao3">AO3 Flagship Condenser</span>
               <h4>Neumann U47 (M7 Capsule)</h4>
               <p>Introduced in 1949 with a Telefunken VF14M vacuum tube. Switchable cardioid/omni polar patterns; clear, present 2–5 kHz presence lift defined Capitol Records vocals.</p>''')
      ]))

# 12 TAPE MACHINE PHYSICS
slide('📼', 'Magnetic Recording', 'Tape Physics: <span>Iron-Oxide, Bias &amp; The 3-Head Block</span>',
      'The mechanical and magnetic technology developed by Ampex that replaced direct-to-disc lacquer cutting.',
      G([
          card('highlight', f'''{thumb('tape_heads_diagram.png', 'Tape Heads Diagram')}
               <span class="spec-pill ao3">AO3 The Three Tape Heads</span>
               <h4>Erase, Record &amp; Playback</h4>
               <p>Tape travels past 3 magnetic heads: Erase head clears residual magnetism; Record head imprints audio flux; Playback head reads back the magnetic pattern.</p>'''),
          card('cyan-edge', f'''{thumb('ampex_300_tape.png', 'Ampex 300 Tape Machine', contain=True)}
               <span class="spec-pill ao3">AO3 Machine Benchmark</span>
               <h4>Ampex 200A &amp; 300 (1/4" Tape)</h4>
               <p>Introduced in 1948–1949 running at 15 or 30 inches per second (ips). Higher tape speed produced wider frequency response, reduced wow &amp; flutter, and lowered tape hiss.</p>'''),
          card('acid-edge', f'''{thumb('tape_saturation_curve.png', 'Tape Saturation Curve')}
               <span class="spec-pill ao3">AO3 Magnetic Saturation</span>
               <h4>Tape Compression &amp; Harmonics</h4>
               <p>When high input levels exceed the magnetic storage capacity of iron-oxide particles, the tape softly compresses peaks, generating warm third-harmonic saturation.</p>''')
      ]))

# 13 MONO TO 2-TRACK & SEL-SYNC
slide('🎛️', 'Multitrack Evolution', 'From Mono to 2-Track: <span>Les Paul &amp; "Sel-Sync"</span>',
      'The technological milestone that transformed multi-channel simultaneous tracking into true multitrack overdubbing.',
      G([
          card('highlight', f'''{thumb('half_track_stereo.jpg', 'Half Track Reel to Reel')}
               <span class="spec-pill ao3">AO3 Multi-Channel Tracking</span>
               <h4>1/4" Half-Track (2-Track Mono)</h4>
               <p>In early 2-track studios (e.g., Abbey Road for early Beatles), rhythm section was placed on Track 1 and vocals on Track 2, mixed live for mono balance.</p>'''),
          card('cyan-edge', f'''{thumb('sel_sync_system.png', 'Sel-Sync System Diagram')}
               <span class="spec-pill ao3">AO3 Overdubbing Sync</span>
               <h4>Les Paul\'s "Sel-Sync" Patent</h4>
               <p>Allowed the record head to act as a playback monitor head for already-recorded tracks. Eliminated the head-gap delay, enabling performers to overdub in perfect sync!</p>'''),
          card('acid-edge', f'''{thumb('les_paul_the_log.jpg', 'Les Paul Multi-Track')}
               <span class="spec-pill ao4">AO4 First 8-Track Recorder</span>
               <h4>Ampex "Octopus" (1957)</h4>
               <p>Ampex built the world\'s first 8-track 1-inch recorder custom for Les Paul. It took over a decade for mainstream commercial studios to adopt 8-track technology.</p>''')
      ]))

# 14 1950s STUDIO EFFECTS
slide('🎚️', 'Vintage Processing', '1950s Studio Effects: <span>Slapback Echo &amp; Chambers</span>',
      'Before algorithmic and digital reverbs existed, studios generated spatial effects using physical rooms and tape head latency.',
      G([
          card('highlight', f'''{thumb('sun_slapback_delay.png', 'Sun Studio Slapback Echo')}
               <span class="spec-pill ao3">AO3 Tape Head Gap Delay</span>
               <h4>Tape Slapback Echo (50–120 ms)</h4>
               <p>Created by sending a signal to a second tape machine\'s record head and feeding its playback head output back into the mixer. Produced a crisp single slap repeat.</p>
               {vid('FuStmPbG528', 'Sun Studios Slapback Echo Demonstration', 'Watch: Slapback Echo Breakdown')}'''),
          card('cyan-edge', f'''{thumb('acoustic_echo_chamber.jpg', 'Acoustic Echo Chamber')}
               <span class="spec-pill ao3">AO3 Physical Reverb Space</span>
               <h4>Acoustic Echo Chambers</h4>
               <p>A basement tiled room with a loudspeaker at one end and a microphone at the other. Sound radiated into the reflective space, adding natural decay (Abbey Road, Capitol).</p>'''),
          card('acid-edge', f'''{thumb('pultec_eqp1a.png', 'Pultec EQP-1A Tube Equalizer')}
               <span class="spec-pill ao3">AO3 Tube Equalisation</span>
               <h4>Pultec EQP-1A "Low-End Trick"</h4>
               <p>Passive inductive EQ with tube makeup gain. Boosting and attenuating the same frequency (e.g. 60Hz) simultaneously creates a low boost with a clarifying scooped low-mid.</p>''')
      ]))

slides_html = '\n'.join(slides)

# Assemble final interactive deck HTML
full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Direct to Tape Recording (1950–1963) • Interactive Study Deck</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎙️</text></svg>">
  <style>
{css}
    /* YouTube direct links & enhanced modal styling */
    .video-btn-row {{
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 10px;
      flex-wrap: wrap;
    }}
    .yt-direct-btn {{
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      color: #ffffff !important;
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.45);
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
      line-height: 1.2;
    }}
    .yt-direct-btn:hover {{
      background: rgba(239, 68, 68, 0.4);
      border-color: #ef4444;
      color: #ffffff !important;
      transform: translateY(-1px);
    }}
    .external-yt-link {{
      color: #ef4444 !important;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 12px;
      border-radius: 6px;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      transition: all 0.2s ease;
    }}
    .external-yt-link:hover {{
      background: rgba(239, 68, 68, 0.25);
      color: #ffffff !important;
    }}
    .video-modal-footer {{
      padding: 10px 16px;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }}
  </style>
</head>
<body>
  <div class="deck-wrapper">
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 4 &bull; Production &amp; Analysing</div>
      <div class="deck-topic-title">Topic: <strong>Direct to Tape Recording (1950–1963)</strong></div>
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
