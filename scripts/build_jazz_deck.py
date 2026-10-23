"""Builds public/interactive-slide-jazz.html (14 slides) from the House deck CSS/JS with a brass-and-teal palette."""
import re, os

SRC = 'public/interactive-slide-house.html'
OUT = 'public/interactive-slide-jazz.html'
house = open(SRC, encoding='utf-8').read()
css = re.search(r'<style>(.*?)</style>', house, re.S).group(1)
js = re.search(r'<script>(.*?)</script>', house, re.S).group(1)

for a, b in [('#c084fc', '#eab308'), ('192, 132, 252', '234, 179, 8'), ('#d8b4fe', '#fde047'),
             ('#00C1F0', '#2dd4bf'), ('0, 193, 240', '45, 212, 191'), ('#38bdf8', '#5eead4'),
             ('#070814', '#09090f'), ('#0e1124', '#13111a'), ('#151936', '#1b1824'),
             ('21, 25, 54', '27, 24, 36'), ('8, 10, 24', '10, 9, 16'), ('width: 6.25%', 'width: 7.14%')]:
    css = css.replace(a, b)

TOTAL = 14
IMG = 'public/images/slides/jazz/'


def thumb(name, alt, contain=False, light=False):
    assert os.path.exists(IMG + name), name
    bg = '#ffffff' if light else '#0d0c14'
    style = f' style="object-fit: contain; background: {bg}; padding: 6px;"' if contain else ''
    return f'<img src="/images/slides/jazz/{name}" alt="{alt}" class="slide-thumb"{style}>'


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
        <div class="slide-eyebrow"><span>🎷</span> Topic Deep Dive &bull; GCE Music Technology</div>
        <h1 class="slide-heading">Jazz <span>&amp; Recording Technology</span></h1>
        <p class="slide-lead">From the first jazz record in 1917 to the electric fusion experiments of the 1970s, jazz and recording technology grew up together. Each era &mdash; acoustic horn, ribbon microphone, long-playing record, magnetic tape, Fender Rhodes and synthesizer &mdash; changed how jazz was captured and how it sounded.</p>
        <div class="grid-3" style="margin-top: 10px;">
          <div class="info-card highlight"><span class="spec-pill ao4">AO4 Eras &amp; Artists</span><h4>Swing to Fusion</h4><p>Follow the style from <strong>Louis Armstrong</strong> and <strong>Duke Ellington</strong>, through <strong>bebop</strong> and <strong>Miles Davis</strong>, to <strong>Herbie Hancock</strong> and <strong>Weather Report</strong>.</p></div>
          <div class="info-card cyan-edge"><span class="spec-pill ao3">AO3 Recording Technology</span><h4>Horn, Ribbon Mic &amp; Tape</h4><p>Acoustic horn recording, the <strong>RCA ribbon microphone</strong>, the <strong>33&#8531; rpm LP</strong>, tape splicing and the <strong>Rudy Van Gelder</strong> close-mic sound.</p></div>
          <div class="info-card acid-edge"><span class="spec-pill ao4">AO4 Musical Features</span><h4>Swing, Improvisation &amp; Harmony</h4><p>Swung rhythm, walking bass, improvised solos over chord changes, extended chords, the 32-bar AABA form and odd time signatures like <strong>5/4</strong>.</p></div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
          <button class="nav-btn" onclick="nextSlide()" style="background: var(--accent-purple); color: #09090f; border-color: var(--accent-purple);">Start Interactive Deck &rarr;</button>
          <span style="font-size: 12px; color: var(--text-muted);">Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> to navigate</span>
        </div>
      </section>''')

# 2 SPEC
slide('📋', 'Specification Roadmap', 'Component 3 <span>Syllabus Matrix for Jazz</span>',
      'Edexcel expects you to link recording technology to the sound you hear and to place each jazz style in its musical and historical context.',
      G([card('cyan-edge', '''<span class="spec-pill ao3">AO3: Technology &amp; Processes</span><h4>Recording, Microphones &amp; Studio</h4>
      <ul style="margin-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
      <li><strong>Acoustic era (1917&ndash;25):</strong> performers play into a horn that cuts a wax disc directly.</li>
      <li><strong>Electrical era:</strong> microphones, including RCA ribbon mics with a figure-8 pattern.</li>
      <li><strong>Formats:</strong> 78 rpm shellac (about 3&ndash;4 minutes) to the 33&#8531; rpm LP (up to about 22 minutes a side).</li>
      <li><strong>Tape:</strong> allows editing, splicing and later multitrack layering.</li>
      <li><strong>Fusion:</strong> electric piano, synthesizers, electric bass, effects and tape editing.</li></ul>'''),
         card('highlight', '''<span class="spec-pill ao4">AO4: Musical &amp; Historical Context</span><h4>Styles, Features &amp; Influence</h4>
      <ul style="margin-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
      <li><strong>Rhythm:</strong> swing feel, syncopation, walking bass, ride-cymbal pattern.</li>
      <li><strong>Harmony &amp; melody:</strong> extended 7th/9th chords, blue notes, ii&ndash;V&ndash;I, modes.</li>
      <li><strong>Improvisation:</strong> head &ndash; solos &ndash; head structure, often over a 12 bar or 32-bar AABA form.</li>
      <li><strong>Styles:</strong> early jazz, swing, bebop, cool/modal, hard bop, fusion.</li>
      <li><strong>Key labels:</strong> Blue Note, Columbia, Impulse!.</li></ul>''')], 2))

# 3 ORIGINS / ACOUSTIC ERA
slide('📯', '1917&ndash;1925 &bull; The Acoustic Era', 'First Jazz Records &amp; <span>Playing Into a Horn</span>',
      'The first jazz record was made in 1917 by the Original Dixieland Jass Band. Before microphones, the band played into a large horn that vibrated a cutting stylus.',
      G([card('highlight', thumb('odjb.jpg', 'Original Dixieland Jass Band') + '<h4>Original Dixieland Jass Band (1917)</h4><p>Recorded for Victor in New York in 1917, this white New Orleans-style band made what is usually called the first jazz record. Early New Orleans jazz used collective improvisation by trumpet/cornet, clarinet and trombone.</p>'),
         card('cyan-edge', thumb('acoustic_horn_session.jpg', 'Acoustic horn recording session, 1916') + '<h4>Recording Through a Horn</h4><p>In acoustic recording (shown here in a 1916 session) sound waves travelled down a horn onto a diaphragm and stylus. Performers had to be <strong>placed by loudness</strong>; quiet instruments went close, loud ones further away. Bass drums were avoided because they made the stylus jump, and a <strong>tuba</strong> often replaced the double bass.</p>'),
         card('acid-edge', thumb('louis_armstrong.jpg', 'Louis Armstrong') + '<h4>Louis Armstrong</h4><p>His Hot Five and Hot Seven recordings (1925&ndash;28) put the improvised <strong>solo</strong> at the centre of jazz. They were made just as electrical recording arrived, giving a fuller sound.</p>')]))

# 4 ELECTRICAL RECORDING
slide('🎙️', 'AO3 &bull; 1925 Onwards', 'Electrical Recording, <span>Ribbon Mics &amp; the 78</span>',
      'From 1925 microphones replaced the horn. Sound quality, frequency range and balance all improved, but each side of a 78 rpm disc was still only a few minutes long.',
      G([card('highlight', thumb('ribbon_mic.jpg', 'RCA 44 ribbon microphone', True) + '<h4>The RCA Ribbon Microphone</h4><p>A thin metal <strong>ribbon</strong> moves in a magnetic field. RCA&rsquo;s 44 (1931) and 77 were smooth, warm and gave a <strong>figure-8 (bidirectional) pick-up pattern</strong>, so two horn players could face each other at either side of one microphone.</p>'),
         card('cyan-edge', thumb('shellac_78.jpg', '78 rpm shellac records') + '<h4>The 78 rpm Disc</h4><p>Brittle shellac discs held roughly <strong>3&ndash;4 minutes per side</strong>. Swing bands arranged and edited their tunes to fit, which is why many classic swing records are around three minutes long.</p>'),
         card('acid-edge', '<h4>Natural Balance in a Big Room</h4><p>Big bands were often recorded live in large, acoustically rich rooms with <strong>very few microphones</strong>. Balance came from <em>where players sat</em> and arrangement, not from a mixing desk &mdash; there was no multitrack to fix things later.</p>')]))

# 5 BIG BANDS / SWING
slide('🎺', 'AO4 &bull; 1930s&ndash;1940s &bull; The Swing Era', 'Big Bands: <span>Ellington, Goodman &amp; Basie</span>',
      'Swing was dance music played by big bands of brass, saxophones and a rhythm section, built on sectional riffs and call and response.',
      G([card('highlight', thumb('duke_ellington.jpg', 'Duke Ellington') + '<h4>Duke Ellington</h4><p>Pianist, bandleader and composer. Radio broadcasts from the Cotton Club made his band famous, and he composed with the <strong>3-minute 78 rpm side</strong> in mind. Hits include <em>Mood Indigo</em> and <em>Take the &ldquo;A&rdquo; Train</em>.</p>' + vid('r2G1fKYFgVU', 'Duke Ellington - Take the A Train', 'Listen: Take the A Train')),
         card('cyan-edge', thumb('benny_goodman.jpg', 'Benny Goodman') + '<h4>Benny Goodman</h4><p>The &ldquo;King of Swing&rdquo; brought swing to a wide white audience; his 1938 Carnegie Hall concert is a landmark. Clarinet solos sit over a tight band that answers in <strong>call and response</strong>.</p>'),
         card('acid-edge', thumb('count_basie.jpg', 'Count Basie') + '<h4>Count Basie</h4><p>Led a hard-swinging Kansas City band with a light, <strong>walking bass</strong> and spare piano, plus simple <strong>riff-based</strong> arrangements. A model of the swing rhythm section.</p>')]))

# 6 BEBOP
slide('⚡', 'AO4 &bull; 1940s &bull; Bebop', 'Bebop: <span>Fast, Complex &amp; Small Group</span>',
      'In the 1940s younger players moved away from dance-band swing towards fast, virtuosic music for listening, played by small combos.',
      G([card('highlight', thumb('charlie_parker.jpg', 'Charlie Parker') + '<h4>Charlie Parker</h4><p>Alto saxophonist and a leading bebop innovator. Played very fast, melodic solos over <strong>complex chord changes</strong>, using extended notes of the chords.</p>'),
         card('cyan-edge', thumb('dizzy_gillespie.jpg', 'Dizzy Gillespie') + '<h4>Dizzy Gillespie</h4><p>Trumpeter and composer. With Parker he developed fast tempos, <strong>altered and extended chords</strong> and tightly arranged heads followed by long improvisations.</p>'),
         card('acid-edge', thumb('thelonious_monk.jpg', 'Thelonious Monk') + '<h4>Thelonious Monk</h4><p>Pianist and composer with angular melodies, dissonant harmony and unexpected silences &mdash; very distinctive and influential.</p><p style="margin-top:6px;"><strong>Tech link:</strong> a 1942&ndash;44 musicians&rsquo; recording ban meant much early bebop development went unrecorded.</p>')]))

# 7 LP & TAPE
slide('💽', 'AO3 &bull; 1948&ndash;1960s', 'The LP, Magnetic Tape <span>&amp; Kind of Blue</span>',
      'The long-playing record and magnetic tape changed jazz: longer performances could be released, and the best takes could be edited together.',
      G([card('highlight', thumb('lp_record.jpg', '33 and a third rpm LP', True, True) + '<h4>The 33&#8531; rpm LP (1948)</h4><p>Columbia&rsquo;s microgroove LP allowed <strong>up to about 22 minutes per side</strong> (compared with 3&ndash;4 minutes on a 78). Extended solos and album-length ideas became possible.</p>'),
         card('cyan-edge', thumb('tape_machine.jpg', 'Reel-to-reel tape recorder', True, True) + '<h4>Magnetic Tape</h4><p>Tape allowed <strong>editing and splicing</strong> between takes, longer continuous recording and, later, <strong>stereo</strong> and multitrack. Jazz studios could now balance and polish recordings.</p>'),
         card('acid-edge', thumb('miles_davis.jpg', 'Miles Davis') + '<h4>Miles Davis: <em>Kind of Blue</em> (1959)</h4><p>Recorded in Columbia&rsquo;s 30th Street Studio, New York. <em>So What</em> is <strong>modal</strong> &mdash; improvisation on scales (D Dorian) rather than fast chord changes &mdash; in a 32-bar AABA form.</p>' + vid('zqNTltOGh5c', 'Miles Davis - So What', 'Listen: So What'))]))

# 8 BLUE NOTE & RVG
slide('🏠', 'AO3 &bull; 1950s&ndash;1960s', 'Blue Note &amp; <span>Rudy Van Gelder&rsquo;s Sound</span>',
      'Engineer Rudy Van Gelder recorded hundreds of classic jazz albums, first in his parents&rsquo; living room in Hackensack and from 1959 in a purpose-built studio in Englewood Cliffs.',
      G([card('highlight', thumb('rudy_van_gelder.jpg', 'Rudy Van Gelder') + '<h4>Rudy Van Gelder</h4><p>Known for <strong>close-miking</strong> horns, a punchy piano and clear upright bass. The result is intimate, dry, present and very clear, with the band playing live together.</p>'),
         card('cyan-edge', thumb('blue_note.jpg', 'Blue Note Records logo', True, True) + '<h4>Blue Note Records</h4><p>Founded in 1939 by Alfred Lion and Francis Wolff. Its artists, such as John Coltrane (<em>Blue Train</em>) and Herbie Hancock (<em>Maiden Voyage</em>), recorded with Van Gelder, giving the label a recognisable sound.</p>'),
         card('acid-edge', thumb('neumann_u47.jpg', 'Neumann U47 microphone') + '<h4>Tube Condensers &amp; Tape</h4><p>Van Gelder is closely associated with the <strong>Neumann U47 tube condenser</strong> microphone, close to the instruments, and recorded to tape. <strong>Natural bleed</strong> between bass, piano and drums gave the glue of a live band.</p>')]))

# 9 COLTRANE & BRUBECK
slide('🎷', 'AO4 &bull; Late 1950s&ndash;1960s', 'Coltrane, Brubeck <span>&amp; Pushing the Rules</span>',
      'Jazz explored faster chord changes and unusual metres while remaining accessible to wider audiences.',
      G([card('highlight', thumb('john_coltrane.jpg', 'John Coltrane') + '<h4>John Coltrane: <em>Giant Steps</em> (1960)</h4><p>The title track moves through keys a major third apart at speed, creating very demanding chord changes for improvisers. Later he moved towards modal and spiritual music (<em>A Love Supreme</em>, 1965).</p>' + vid('KwIC6B_dvW4', 'John Coltrane - Giant Steps', 'Listen: Giant Steps')),
         card('cyan-edge', thumb('dave_brubeck.jpg', 'Dave Brubeck') + '<h4>Dave Brubeck: <em>Take Five</em> (1959)</h4><p>Written by saxophonist <strong>Paul Desmond</strong> and recorded by the Dave Brubeck Quartet, it is in <strong>5/4 time</strong> with a repeated two-chord vamp, and became a big hit single.</p>' + vid('-DHuW1h1wHw', 'Dave Brubeck - Take Five', 'Listen: Take Five')),
         card('acid-edge', thumb('bill_evans.jpg', 'Bill Evans') + '<h4>Bill Evans</h4><p>Pianist on <em>Kind of Blue</em>, known for a lyrical touch and rich, <strong>extended jazz chords</strong> &mdash; a model for modern jazz piano voicings.</p>')]))

# 10 TYPICAL RECORDING SETUP
slide('🎚️', 'AO3 &bull; Exam Analysis Points', 'Typical Jazz <span>Recording Setup</span>',
      'In listening questions, describe the instrument, the likely microphone approach and the resulting sound.',
      G([card('highlight', thumb('double_bass.jpg', 'Double bass') + '<h4>Upright Double Bass</h4><p>Often a large-diaphragm condenser or ribbon near the bridge, sometimes blended with a mic a few feet back for body. <strong>Light compression</strong> to preserve touch and dynamics.</p>'),
         card('cyan-edge', thumb('drum_kit.jpg', 'Acoustic drum kit') + '<h4>Drums</h4><p>A simple <strong>2&ndash;3 microphone</strong> setup, such as a stereo overhead pair plus a kick mic, captures the whole kit with natural cymbal sparkle and open dynamics.</p>'),
         card('acid-edge', thumb('saxophone.jpg', 'Saxophone') + '<h4>Saxophone</h4><p>Tube condenser or ribbon microphones placed slightly <strong>off-axis</strong> to smooth harsh high frequencies and avoid breath blasts.</p>'),
         card('highlight', thumb('trumpet.jpg', 'Trumpet') + '<h4>Trumpet</h4><p>Ribbon or condenser microphones set back a little because trumpets are loud and bright; ribbons help tame the top end.</p>')], 2))

# 11 FUSION - MILES / MACERO / RHODES
slide('🔌', 'AO3 &bull; 1969&ndash;1970s', 'Jazz Fusion: <span>Electric Miles</span>',
      'In the late 1960s Miles Davis combined jazz improvisation with rock rhythms and electric instruments, and treated the studio itself as an instrument.',
      G([card('highlight', thumb('miles_davis.jpg', 'Miles Davis') + '<h4>Miles Davis: <em>Bitches Brew</em> (1970)</h4><p>Recorded in 1969 with a large electric band. Long jam sessions were later <strong>edited and assembled</strong>, using loops, echo and tape splices.</p>' + vid('WtORTuLJw7o', 'Miles Davis - Pharaoh\\\'s Dance', 'Listen: Pharaoh&rsquo;s Dance')),
         card('cyan-edge', thumb('teo_macero.jpg', 'Teo Macero') + '<h4>Teo Macero, Producer</h4><p>Miles&rsquo;s long-time Columbia producer. He pioneered radical <strong>tape splicing, looping and editing</strong> on records such as <em>In a Silent Way</em> and <em>Bitches Brew</em>.</p>'),
         card('acid-edge', thumb('rhodes_piano.jpg', 'Fender Rhodes electric piano') + '<h4>The Fender Rhodes</h4><p>The electric piano replaced the acoustic grand in fusion. Its bell-like tone could be plugged straight in, giving a warm, sustained sound that sits well with electric bass and rock drums.</p>')]))

# 12 FUSION GROUPS & SYNTHS
slide('🎹', 'AO3 &amp; AO4 &bull; 1970s', 'Fusion Groups <span>&amp; Synthesizers</span>',
      'Fusion bands added synthesizers, electric bass and rock drum production to jazz harmony and improvisation.',
      G([card('highlight', thumb('weather_report.jpg', 'Weather Report') + '<h4>Weather Report</h4><p>Led by Joe Zawinul and Wayne Shorter. Mixed jazz improvisation with synthesizers, electric bass and world-music colours.</p>'),
         card('cyan-edge', thumb('mahavishnu.jpg', 'Mahavishnu Orchestra') + '<h4>Mahavishnu Orchestra</h4><p>Guitarist John McLaughlin&rsquo;s loud, high-energy band fused jazz with rock, using <strong>electric guitar distortion</strong> and complex rhythms. Return to Forever worked in a similar fusion style.</p>'),
         card('acid-edge', thumb('herbie_hancock.jpg', 'Herbie Hancock') + '<h4>Herbie Hancock</h4><p>Moved from acoustic jazz to funk-influenced fusion with keyboards. <em>Head Hunters</em> (1973) used synthesizers such as the ARP Odyssey and Minimoog.</p>'),
         card('highlight', thumb('minimoog.jpg', 'Minimoog synthesizer') + '<h4>Minimoog &amp; ARP Odyssey</h4><p>Compact <strong>monophonic synthesizers</strong> let keyboardists play expressive lead and bass lines. Pitch and mod wheels let them &ldquo;bend&rdquo; notes like a horn player.</p>')], 2))

# 13 SECTION B MATRIX
slide('⚖️', 'Component 3 Section B Preparation', 'Comparison: <span>Swing &bull; Blue Note &bull; Fusion</span>',
      'In longer comparison answers contrast the recording technology and the musical result.',
      '''<table class="comp-table"><thead><tr><th>Feature</th><th>Swing era (1930s&ndash;40s)</th><th>Blue Note hard bop (1950s&ndash;60s)</th><th>Fusion (1969&ndash;70s)</th></tr></thead><tbody>
      <tr><td><strong>Format</strong></td><td>78 rpm shellac, about 3 minutes a side.</td><td>33&#8531; rpm LP, mono then stereo.</td><td>Stereo LP, double albums.</td></tr>
      <tr><td><strong>Microphones &amp; room</strong></td><td>Few mics (ribbon/condenser) in a large, live room.</td><td>Close-miked tube condensers in a purpose-built studio.</td><td>Many mics, DI for electric instruments, studio effects.</td></tr>
      <tr><td><strong>Recording method</strong></td><td>Live to disc/early tape; no editing.</td><td>Band plays live to tape; limited editing.</td><td>Multitrack, tape splicing, loops, echo.</td></tr>
      <tr><td><strong>Instruments</strong></td><td>Big band brass, saxes, acoustic rhythm section.</td><td>Small combo: horns, piano, upright bass, drums.</td><td>Electric piano, synthesizers, electric bass and guitar.</td></tr>
      <tr><td><strong>Sound</strong></td><td>Natural balance, ensemble blend.</td><td>Intimate, punchy, clear, natural bleed.</td><td>Layered, processed, rock-influenced.</td></tr></tbody></table>''')

# 14 FEATURES + CHECKLIST
slide('🎯', 'Edexcel Component 3 Final Revision', 'Musical Features <span>&amp; Exam Quick Reference</span>',
      'Keep these musical features and technology terms ready for listening questions.',
      G([card('highlight', '<h4>Musical Features</h4><p><strong>Rhythm:</strong> swing feel, syncopation.<br><strong>Bass:</strong> walking bass line.<br><strong>Harmony:</strong> 7th/9th and extended chords, ii&ndash;V&ndash;I.<br><strong>Melody:</strong> blue notes, improvised solos.<br><strong>Structure:</strong> head &ndash; solos &ndash; head; 12 bar or 32-bar AABA.<br><strong>Texture:</strong> call and response.</p>'),
         card('cyan-edge', '<h4>Technology</h4><p><strong>1917&ndash;25:</strong> acoustic horn.<br><strong>1925+:</strong> mics, ribbon mic (figure-8).<br><strong>78 rpm:</strong> about 3&ndash;4 minutes.<br><strong>1948:</strong> 33&#8531; rpm LP.<br><strong>Tape:</strong> splicing, stereo, multitrack.<br><strong>Fusion:</strong> Rhodes, synths, effects.</p>'),
         card('acid-edge', '<h4>Key Names</h4><p><strong>Early/Swing:</strong> Armstrong, Ellington, Goodman, Basie.<br><strong>Bebop:</strong> Parker, Gillespie, Monk.<br><strong>Modern:</strong> Davis, Coltrane, Brubeck, Evans.<br><strong>Producer/engineer:</strong> Rudy Van Gelder, Teo Macero.<br><strong>Fusion:</strong> Hancock, Weather Report.</p>')])
      + '<div style="margin-top: 18px; text-align: center;"><a href="/jazz-interactive-quiz.html" style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-purple); color: #09090f; font-weight: 800; font-size: 13.5px; padding: 10px 24px; border-radius: 50px; text-decoration: none; box-shadow: 0 0 20px var(--accent-purple-glow);">Test Your Knowledge: Take the 12-Question Specification Quiz &rarr;</a></div>')

assert len(slides) == TOTAL - 0 or True
# slide 1 is the cover (appended directly); renumber remaining slides sequentially
body = ''.join(slides)
count = [0]


def renum(m):
    count[0] += 1
    return f'data-slide="{count[0]}"'


body = re.sub(r'data-slide="\d+"', renum, body)
assert count[0] == TOTAL, count[0]

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jazz &amp; Recording Technology • Interactive Study Deck | Music Tech Guru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>{css}</style>
</head>
<body>
  <div class="deck-wrapper">
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music in Context</div>
      <div class="deck-topic-title">Topic: <strong>Jazz &amp; Recording Technology (1917&ndash;1970s)</strong></div>
    </header>
    <main class="slides-viewport" id="slidesViewport">{body}
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
</html>
'''
open(OUT, 'w', encoding='utf-8').write(html)
print('wrote', OUT, len(html), 'bytes;', html.count('<img '), 'images;', TOTAL, 'slides')
