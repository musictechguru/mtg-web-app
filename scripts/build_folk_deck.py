"""Builds public/interactive-slide-folk.html (14 slides) with verified authentic images and emerald/amber folk palette."""
import re, os

SRC = 'public/interactive-slide-house.html'
OUT = 'public/interactive-slide-folk.html'
house = open(SRC, encoding='utf-8').read()
css = re.search(r'<style>(.*?)</style>', house, re.S).group(1)
js = re.search(r'<script>(.*?)</script>', house, re.S).group(1)

# Palette: Emerald Green (#10b981 / #34d399) and Warm Amber (#f59e0b / #fbbf24) on deep dark timber background
for a, b in [
    ('#c084fc', '#34d399'), ('192, 132, 252', '52, 211, 153'), ('#d8b4fe', '#6ee7b7'),
    ('#00C1F0', '#f59e0b'), ('0, 193, 240', '245, 158, 11'), ('#38bdf8', '#fbbf24'),
    ('#070814', '#080d0a'), ('#0e1124', '#0f1712'), ('#151936', '#142019'),
    ('21, 25, 54', '20, 32, 25'), ('8, 10, 24', '8, 13, 10'), ('width: 6.25%', 'width: 7.14%')
]:
    css = css.replace(a, b)

TOTAL = 14
IMG = 'public/images/slides/folk/'

def thumb(name, alt, contain=False, light=False):
    assert os.path.exists(IMG + name), f"Missing image: {IMG + name}"
    bg = '#ffffff' if light else '#0d140f'
    style = f' style="object-fit: contain; background: {bg}; padding: 6px;"' if contain else ''
    return f'<img src="/images/slides/folk/{name}" alt="{alt}" class="slide-thumb"{style}>'

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
slides.append('''
      <section class="slide active" data-slide="1">
        <div class="slide-eyebrow"><span>🪕</span> Topic Deep Dive &bull; GCE Music Technology</div>
        <h1 class="slide-heading">Acoustic &amp; Folk <span>Recording Technology</span></h1>
        <p class="slide-lead">From the field recordings of Alan Lomax and 1960s Greenwich Village coffeehouses to British folk rock and 1970s Laurel Canyon singer-songwriters, acoustic folk is defined by capturing organic acoustic instruments, vocal nuance, and natural acoustic space with utmost fidelity.</p>
        <div class="grid-3" style="margin-top: 10px;">
          <div class="info-card highlight"><span class="spec-pill ao4">AO4 Roots &amp; Movements</span><h4>Tradition to Revival</h4><p>Trace acoustic folk from <strong>Woody Guthrie</strong> and <strong>Lead Belly</strong>, through <strong>Bob Dylan</strong> and <strong>Joan Baez</strong>, to <strong>Fairport Convention</strong>, <strong>Joni Mitchell</strong>, and <strong>Nick Drake</strong>.</p></div>
          <div class="info-card cyan-edge"><span class="spec-pill ao3">AO3 Transducers &amp; Techniques</span><h4>Stereo Pairs &amp; Condensers</h4><p>Master <strong>12th fret placement</strong>, small diaphragm condensers (<strong>AKG C451</strong>, <strong>KM184</strong>), ribbon microphones, and stereo arrays (<strong>XY coincident</strong>, <strong>Spaced Pair</strong>, <strong>Blumlein</strong>).</p></div>
          <div class="info-card acid-edge"><span class="spec-pill ao3">AO3 Dynamic Control &amp; Space</span><h4>Optical Leveling &amp; Bleed</h4><p>Explore transparent dynamic control via the <strong>Teletronix LA-2A</strong>, <strong>EMT 140 plate reverb</strong>, acoustic spill management, and gentle high-shelf air equalization.</p></div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
          <button class="nav-btn" onclick="nextSlide()" style="background: var(--accent-purple); color: #080d0a; border-color: var(--accent-purple); font-weight: 700;">Start Interactive Deck &rarr;</button>
          <span style="font-size: 12px; color: var(--text-muted);">Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> to navigate</span>
        </div>
      </section>''')

# 2 SPEC ROADMAP
slide('📋', 'Specification Roadmap', 'Component 3 <span>Syllabus Matrix for Folk</span>',
      'Edexcel expects students to understand both acoustic capture techniques and the social and historical contexts of folk and folk rock.',
      G([
          card('highlight', f'''{thumb('martin_workshop.jpg', 'Acoustic Guitar Craft')}
               <span class="spec-pill ao3">AO3 Transducers</span>
               <h4>Acoustic Guitar Miking</h4>
               <p>Small vs large diaphragm condensers; 12th fret positioning for balance; sound hole proximity effect avoidance; Blumlein &amp; XY stereo pairs.</p>'''),
          card('cyan-edge', f'''{thumb('csn.jpg', 'Folk Rock Pioneers')}
               <span class="spec-pill ao4">AO4 Acoustic to Electric</span>
               <h4>Revival &amp; Folk Rock</h4>
               <p>Traditional ballads meeting rock amplification; Dylan going electric at Newport '65; Sound Techniques studio (Joe Boyd, John Wood).</p>'''),
          card('acid-edge', f'''{thumb('vintage_mixing_desk.jpg', 'Studio Analog Console')}
               <span class="spec-pill ao3">AO3 Studio Processing</span>
               <h4>Transparent Mix Chains</h4>
               <p>Smooth optical leveling (LA-2A); embracing natural acoustic bleed; plate reverb (EMT 140) and stereo soundstage panning.</p>''')
      ]))

# 3 FOLK ROOTS & FIELD RECORDINGS
slide('📻', 'Folk Roots &amp; Preservation', 'Field Capture <span>&amp; Traditional Song Collectors</span>',
      'Before modern recording studios existed, acoustic folk music survived through oral tradition and pioneering field recordists.',
      G([
          card('highlight', f'''{thumb('alan_lomax.jpg', 'Alan Lomax')}
               <span class="spec-pill ao4">AO4 Historical Context</span>
               <h4>Alan Lomax Field Recordings</h4>
               <p>Lomax travelled the American South and British Isles with portable disc cutters and early tape machines, archiving work songs and ballads in natural settings.</p>'''),
          card('cyan-edge', f'''{thumb('woody_guthrie.jpg', 'Woody Guthrie')}
               <span class="spec-pill ao4">AO4 Political Ballads</span>
               <h4>Woody Guthrie &amp; Protest</h4>
               <p>Armed with a flat-top acoustic labelled "This Machine Kills Fascists", Guthrie established topical storytelling songs like <em>This Land Is Your Land</em>.</p>
               {vid('wxiMrvDbq3s', 'Woody Guthrie - This Land Is Your Land', 'Listen: This Land Is Your Land')}'''),
          card('acid-edge', f'''{thumb('lead_belly.jpg', 'Lead Belly')}
               <span class="spec-pill ao4">AO4 12-String Power</span>
               <h4>Lead Belly &amp; 12-String Drive</h4>
               <p>Huddie Ledbetter recorded iconic folk-blues on a Stella 12-string acoustic guitar, providing booming bass basslines and ringing acoustic chorus.</p>''')
      ]))

# 4 1960s GREENWICH VILLAGE REVIVAL
slide('☕', '1960s Folk Revival', 'Greenwich Village <span>Coffeehouses &amp; Protest Songs</span>',
      'In early 1960s New York, young singer-songwriters gathered in intimate coffeehouses like The Gaslight Cafe, igniting a cultural explosion.',
      G([
          card('highlight', f'''{thumb('bob_dylan.jpg', 'Bob Dylan 1963')}
               <span class="spec-pill ao4">AO4 Landmark Artist</span>
               <h4>Bob Dylan Acoustic Era</h4>
               <p>Solo acoustic guitar, harmonica rack, and poetic topical lyrics on <em>The Freewheelin' Bob Dylan</em> and <em>The Times They Are A-Changin'</em>.</p>
               {vid('90WD_ats6eE', 'Bob Dylan - The Times They Are A-Changin', 'Listen: The Times They Are A-Changin')}'''),
          card('cyan-edge', f'''{thumb('joan_baez.jpg', 'Joan Baez 1966')}
               <span class="spec-pill ao4">AO4 Pure Vocal Delivery</span>
               <h4>Joan Baez &amp; Balladry</h4>
               <p>Celebrated for her pure vibrato soprano and intricate fingerpicking on small-body Martin 0-45 acoustics, championing civil rights anthems.</p>'''),
          card('acid-edge', f'''{thumb('columbia_studio.jpg', 'Columbia 30th St Studio')}
               <span class="spec-pill ao3">AO3 Studio Capture</span>
               <h4>Coffeehouse Sound in Studio</h4>
               <p>Columbia 30th Street Studio captured Dylan and Baez live with minimal processing: one condenser on voice, one on guitar, zero overdubs.</p>''')
      ]))

# 5 CORE INSTRUMENTS: FLAT-TOP ACOUSTICS
slide('🎸', 'Acoustic Guitar Anatomy', 'The Flat-Top Steel-String: <span>Martin &amp; Gibson</span>',
      'The flat-top acoustic steel-string guitar is the harmonic foundation of American and British folk music.',
      G([
          card('highlight', f'''{thumb('martin_d28.jpg', 'Martin D-28 Dreadnought')}
               <span class="spec-pill ao4">AO4 Flagship Guitar</span>
               <h4>Martin D-28 Dreadnought</h4>
               <p>Introduced in 1931, the D-28 features a large resonant body, solid spruce top, and rosewood back/sides, delivering powerful acoustic projection and deep bass.</p>'''),
          card('cyan-edge', f'''{thumb('gibson_j45.jpg', 'Gibson J-45')}
               <span class="spec-pill ao4">AO4 Slope-Shoulder Tone</span>
               <h4>Gibson J-45 "The Workhorse"</h4>
               <p>Featuring mahogany back and sides with a round-shoulder dreadnought shape, the J-45 offers a warm, woody midrange beloved by singer-songwriters.</p>'''),
          card('acid-edge', f'''{thumb('acoustic_12_string.jpg', '12-String Acoustic')}
               <span class="spec-pill ao3">AO3 Acoustic Chorusing</span>
               <h4>12-String Acoustic Guitars</h4>
               <p>Tuned in octaves on the lower four courses and unisons on the top two, the 12-string produces a natural shimmering chorus effect without studio modulation.</p>''')
      ]))

# 6 TRADITIONAL STRINGED ENSEMBLE
slide('🎻', 'Folk Instrumentation', 'Traditional Strings: <span>Banjo, Mandolin, Fiddle &amp; Bass</span>',
      'Beyond the six-string guitar, folk ensembles rely on a rich palette of acoustic stringed instruments.',
      G([
          card('highlight', f'''{thumb('banjo.png', '5-String Banjo', contain=True)}
               <span class="spec-pill ao4">AO4 Percussive Attack</span>
               <h4>5-String Banjo</h4>
               <p>Features a vibrating skin/plastic head and a high-pitched drone 5th string. Played with rapid clawhammer or three-finger Scruggs picking.</p>'''),
          card('cyan-edge', f'''{thumb('mandolin.jpg', 'Gibson Mandolin')}
               <span class="spec-pill ao4">AO4 Rhythmic Chop</span>
               <h4>Acoustic Mandolin</h4>
               <p>Eight strings tuned in pairs (G-D-A-E). Used for driving rhythmic "chop" chords that emulate an acoustic snare drum, plus fast melodic lead lines.</p>'''),
          card('acid-edge', f'''{thumb('fiddle_micing.png', 'Fiddle Miking')}
               <span class="spec-pill ao3">AO3 Bowed Strings &amp; Bass</span>
               <h4>Fiddle &amp; Upright Double Bass</h4>
               <p>Fiddle provides modal ornamentation and Celtic reels; upright acoustic bass delivers warm fundamental low-end, miked near bridge and fingerboard.</p>''')
      ]))

# 7 ACOUSTIC GUITAR MIC PLACEMENT
slide('🎙️', 'Studio Microphone Placement', 'Acoustic Guitar: <span>12th Fret vs Sound Hole</span>',
      'Positioning is critical: placing a microphone directly in front of the sound hole is one of the most common exam mistakes.',
      G([
          card('highlight', f'''{thumb('mic_12th_fret.png', '12th Fret Mic Technique')}
               <span class="spec-pill ao3">AO3 Exam Standard</span>
               <h4>The 12th Fret Sweet Spot</h4>
               <p>Aiming a directional condenser at the 12th–14th fret (6–12 inches away) yields the optimal balance of string attack, finger pick clarity, and natural body warmth.</p>'''),
          card('cyan-edge', f'''{thumb('bridge_mic_acoustic.jpg', 'Body & Bridge Miking')}
               <span class="spec-pill ao3">AO3 Lower Bout Miking</span>
               <h4>Bridge / Lower Bout Capture</h4>
               <p>A second microphone placed behind the bridge captures resonant woody warmth. Combining this with a 12th-fret mic creates a full stereo image.</p>'''),
          card('acid-edge', f'''{thumb('sound_hole_avoidance.png', 'Avoiding Proximity Effect')}
               <span class="spec-pill ao3">AO3 Common Pitfall</span>
               <h4>Avoid The Sound Hole!</h4>
               <p>Pointing directly into the sound hole causes severe proximity effect and resonant air cavity "booming" around 100–250 Hz that clouds the entire mix.</p>''')
      ]))

# 8 TRANSDUCER SELECTION: SDC, LDC & RIBBON
slide('🎛️', 'Transducer Selection', 'Condensers vs Ribbons: <span>Capturing Acoustic Detail</span>',
      'Choosing the right transducer design determines how string transients, harmonic sparkle, and warmth are translated.',
      G([
          card('highlight', f'''{thumb('akg_c451.jpg', 'AKG C451 Pencil Condenser')}
               <span class="spec-pill ao3">AO3 Transient Speed</span>
               <h4>Small Diaphragm (SDC)</h4>
               <p>Pencil condensers (AKG C451, Neumann KM84/KM184) have ultralight diaphragms for blistering transient response and airy high-frequency extension.</p>'''),
          card('cyan-edge', f'''{thumb('neumann_u87.png', 'Neumann U87 LDC', contain=True)}
               <span class="spec-pill ao3">AO3 Full-Range Depth</span>
               <h4>Large Diaphragm (LDC)</h4>
               <p>Tube &amp; FET condensers (Neumann U67, U87, AKG C12) provide rich low-end fullness and smooth upper mids, ideal for lead vocals and body capture.</p>'''),
          card('acid-edge', f'''{thumb('coles_4038.jpg', 'Coles 4038 Ribbon')}
               <span class="spec-pill ao3">AO3 Smooth Top-End</span>
               <h4>Ribbon Microphones (Coles 4038)</h4>
               <p>Velocity ribbon transducers offer a natural high-frequency roll-off, taming harsh finger squeaks and brittle banjo upper harmonics with velvety smoothness.</p>''')
      ]))

# 9 STEREO ACOUSTIC TECHNIQUES
slide('📐', 'Stereo Imaging Techniques', 'Coincident, Spaced <span>&amp; Blumlein Configurations</span>',
      'Folk recordings frequently use stereo microphone pairs to capture the dimensional width of solo guitar or string ensembles.',
      G([
          card('highlight', f'''{thumb('xy_stereo.jpg', 'Coincident XY Stereo')}
               <span class="spec-pill ao3">AO3 Phase Coherent</span>
               <h4>Coincident XY (90&deg;)</h4>
               <p>Two directional capsules placed as close as possible at 90&deg;. Captures stereo width purely via level differences with zero phase cancellation when summed to mono.</p>'''),
          card('cyan-edge', f'''{thumb('spaced_pair.png', 'Spaced Pair AB')}
               <span class="spec-pill ao3">AO3 Wide Acoustic Space</span>
               <h4>Spaced Pair (AB)</h4>
               <p>Two mics spaced 2–3 feet apart (following the 3:1 rule). Delivers a wide, lush stereo image using time-of-arrival differences, though potential mono phase risk exists.</p>'''),
          card('acid-edge', f'''{thumb('blumlein_pair.jpg', 'Blumlein Ribbon Setup')}
               <span class="spec-pill ao3">AO3 Room Reflections</span>
               <h4>Blumlein &amp; Mid-Side (MS)</h4>
               <p>Blumlein uses two crossed figure-8 mics at 90&deg; for 360&deg; spatial depth. Mid-Side pairs a cardioid Mid with a figure-8 Side for post-mix width control.</p>''')
      ]))

# 10 DYLAN GOES ELECTRIC & FOLK ROCK
slide('⚡', 'The Folk-Rock Revolution', 'Newport 1965: <span>Dylan Goes Electric</span>',
      'The collision of acoustic folk storytelling with electric rock and roll amplification reshaped popular music forever.',
      G([
          card('highlight', f'''{thumb('newport_stage.jpg', 'Dylan at Newport 1965')}
               <span class="spec-pill ao4">AO4 Cultural Watershed</span>
               <h4>Newport Folk Festival 1965</h4>
               <p>On July 25, 1965, Bob Dylan walked onstage with an electric band and a Fender Stratocaster. Folk purists booed, but folk rock was born overnight.</p>
               {vid('IwOfCgkyEj0', 'Bob Dylan - Like a Rolling Stone', 'Listen: Like a Rolling Stone')}'''),
          card('cyan-edge', f'''{thumb('fender_stratocaster.jpg', 'Fender Stratocaster')}
               <span class="spec-pill ao3">AO3 Rock Amplification</span>
               <h4>Amplified Electric Energy</h4>
               <p>Tube guitar amplifiers, solid-body electric guitars, and aggressive drum kits merged with poetic, socially conscious lyricism.</p>'''),
          card('acid-edge', f'''{thumb('rickenbacker_12_string.jpg', 'Rickenbacker 12-String')}
               <span class="spec-pill ao4">AO4 The Byrds &amp; Jangle</span>
               <h4>The Byrds &amp; 12-String Jangle</h4>
               <p>Roger McGuinn's compressed Rickenbacker 360/12 electric guitar on Dylan's <em>Mr. Tambourine Man</em> defined the shimmering "jangle pop" sound.</p>''')
      ]))

# 11 UK ELECTRIC FOLK & SOUND TECHNIQUES
slide('🏰', 'British Folk Rock', 'Fairport Convention <span>&amp; The Sound Techniques Studio</span>',
      'In the UK, traditional British and Celtic folk ballads were married to rock rhythms in iconic independent London studios.',
      G([
          card('highlight', f'''{thumb('fairport_convention.png', 'Fairport Convention')}
               <span class="spec-pill ao4">AO4 British Masterpiece</span>
               <h4>Fairport Convention &amp; Sandy Denny</h4>
               <p>1969's <em>Liege &amp; Lief</em> combined centuries-old traditional murder ballads with electric guitar, fiddle (Dave Swarbrick), and Sandy Denny's soaring voice.</p>
               {vid('1it7BP5PckI', 'Fairport Convention - Matty Groves', 'Listen: Matty Groves (1969)')}'''),
          card('cyan-edge', f'''{thumb('sandy_denny.jpg', 'Sandy Denny')}
               <span class="spec-pill ao4">AO4 Iconic Voices</span>
               <h4>Sandy Denny &amp; Martin Carthy</h4>
               <p>Sandy Denny's haunting tone and Martin Carthy's inventive acoustic guitar tunings (CGCDGA) anchored the English folk revival movement.</p>'''),
          card('acid-edge', f'''{thumb('joe_boyd_carthy.jpg', 'Joe Boyd & Martin Carthy')}
               <span class="spec-pill ao3">AO3 Studio Pioneer</span>
               <h4>Sound Techniques (London)</h4>
               <p>Engineer John Wood and producer Joe Boyd tracked ensembles live with custom transistor desks, capturing natural room bleed as musical glue.</p>''')
      ]))

# 12 SINGER-SONGWRITER ERA: JONI, NICK & CSN
slide('🌸', 'The 1970s Golden Age', 'Singer-Songwriters: <span>Joni Mitchell &amp; Nick Drake</span>',
      'The 1970s saw acoustic intimacy elevated to fine art through experimental tunings, confessional lyrics, and exquisite production.',
      G([
          card('highlight', f'''{thumb('joni_mitchell.jpg', 'Joni Mitchell')}
               <span class="spec-pill ao4">AO4 Alternative Tunings</span>
               <h4>Joni Mitchell (Laurel Canyon)</h4>
               <p>Invented over 50 open and modal guitar tunings. <em>Ladies of the Canyon</em> and <em>Blue</em> showcase shimmering acoustic sparkle and dulcimer.</p>
               {vid('94bdMSCdw20', 'Joni Mitchell - Big Yellow Taxi', 'Listen: Big Yellow Taxi')}'''),
          card('cyan-edge', f'''{thumb('nick_drake.jpg', 'Nick Drake')}
               <span class="spec-pill ao4">AO4 Intimate Perfection</span>
               <h4>Nick Drake &amp; Pink Moon (1972)</h4>
               <p>Recorded in two midnight sessions by John Wood at Sound Techniques with only Drake's acoustic guitar and voice captured on small diaphragm condensers.</p>
               {vid('aXnfhnCoOyo', 'Nick Drake - Pink Moon', 'Listen: Pink Moon')}'''),
          card('acid-edge', f'''{thumb('simon_and_garfunkel.jpg', 'Simon & Garfunkel')}
               <span class="spec-pill ao3">AO3 Harmonic Purity</span>
               <h4>Simon &amp; Garfunkel &amp; CSN</h4>
               <p>Producer Roy Halee engineered Paul Simon and Art Garfunkel with lush acoustic tracking and pristine multi-part vocal blends on <em>The Sound of Silence</em>.</p>
               {vid('NAEppFUWLfc', 'Simon & Garfunkel - The Sound of Silence', 'Listen: The Sound of Silence')}''')
      ]))

# 13 STUDIO PROCESSING: LA-2A, EMT 140 & AIR EQ
slide('🎚️', 'Mix Processing &amp; Acoustics', 'Dynamic Control, <span>Plate Reverbs &amp; Air EQ</span>',
      'Acoustic folk requires gentle, transparent studio processing that protects the emotional dynamics of the performance.',
      G([
          card('highlight', f'''{thumb('la2a_compressor.jpg', 'Teletronix LA-2A')}
               <span class="spec-pill ao3">AO3 Transparent Compression</span>
               <h4>Teletronix LA-2A Optical Leveling</h4>
               <p>Electro-optical T4 cell delivers smooth, program-dependent multi-stage release. Tames acoustic peaks transparently without audible pumping or distortion.</p>'''),
          card('cyan-edge', f'''{thumb('emt_140.png', 'EMT 140 Plate Reverb')}
               <span class="spec-pill ao3">AO3 Spatial Depth</span>
               <h4>EMT 140 Plate Reverb</h4>
               <p>A suspended steel plate driven by a transducer adds lush, smooth spatial decay to dry acoustic guitars and vocals, mimicking wooden concert halls.</p>'''),
          card('acid-edge', f'''{thumb('eq_air_boost.png', 'Acoustic EQ Curve')}
               <span class="spec-pill ao3">AO3 EQ &amp; Soundstage Panning</span>
               <h4>High-Shelf Air &amp; Stereo Stage</h4>
               <p>Gentle 1–2 dB high-shelf boost at 10–12 kHz adds string shimmer; high-pass filtering at 60 Hz cleans mud. Discrete instrument panning creates an authentic stage.</p>''')
      ]))

# 14 CONTEMPORARY ACOUSTIC & INDIE FOLK
slide('🌿', 'Modern Acoustic Resurgence', '21st Century Folk: <span>Laura Marling &amp; Indie Folk</span>',
      'Modern acoustic artists continue the tradition, pairing vintage analog mic chains with high-resolution digital DAW precision.',
      G([
          card('highlight', f'''{thumb('laura_marling.jpg', 'Laura Marling')}
               <span class="spec-pill ao4">AO4 Modern Storyteller</span>
               <h4>Laura Marling &amp; British Folk</h4>
               <p>Acclaimed albums like <em>Once I Was an Eagle</em> feature direct live tracking of intricate open-tuned acoustic fingerpicking and poetic British balladry.</p>'''),
          card('cyan-edge', f'''{thumb('mumford_and_sons.jpg', 'Mumford & Sons')}
               <span class="spec-pill ao4">AO4 Arena Folk Revival</span>
               <h4>Mumford &amp; Sons &amp; Americana</h4>
               <p>Brought acoustic banjos, kick drums, and upright bass to global stadium popularity, utilizing high-end ribbon and tube mics mixed for aggressive punch.</p>
               {vid('fNy8llTLvuA', 'Mumford & Sons - The Cave', 'Listen: The Cave')}'''),
          card('acid-edge', f'''{thumb('fleet_foxes.jpg', 'Fleet Foxes')}
               <span class="spec-pill ao3">AO3 Chamber Folk Harmonies</span>
               <h4>Fleet Foxes &amp; Spatial Acoustics</h4>
               <p>Known for rich multi-part vocal harmonies recorded in resonant acoustic spaces (barns, chapels) with vintage ribbon microphones and long natural reverbs.</p>
               {vid('DrQRS40OKNE', 'Fleet Foxes - White Winter Hymnal', 'Listen: White Winter Hymnal')}''')
      ]))

# Assemble final HTML
html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acoustic &amp; Folk &bull; Interactive Study Deck | Music Tech Guru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>{css}</style>
</head>
<body>
  <div class="deck-wrapper">
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music in Context</div>
      <div class="deck-topic-title">Topic: <strong>Acoustic &amp; Folk Recording Technology</strong></div>
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
