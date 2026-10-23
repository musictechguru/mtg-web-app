"""Builds public/interactive-slide-blues.html by reusing the House deck's proven CSS/JS
with a Delta-blue + amber palette and fresh slide content sourced from the Blues worksheet."""
import re

SRC = 'public/interactive-slide-house.html'
OUT = 'public/interactive-slide-blues.html'
house = open(SRC, encoding='utf-8').read()

css = re.search(r'<style>(.*?)</style>', house, re.S).group(1)
js = re.search(r'<script>(.*?)</script>', house, re.S).group(1)

# palette swap (purple/cyan -> blue/amber)
swaps = [
    ('#c084fc', '#60a5fa'), ('192, 132, 252', '96, 165, 250'), ('#d8b4fe', '#93c5fd'),
    ('#00C1F0', '#f59e0b'), ('0, 193, 240', '245, 158, 11'), ('#38bdf8', '#fbbf24'),
    ('#070814', '#060a14'), ('#0e1124', '#0b1226'), ('#151936', '#111a32'),
    ('21, 25, 54', '17, 26, 50'), ('8, 10, 24', '6, 10, 22'),
    ('width: 6.25%', 'width: 7.14%'),
]
for a, b in swaps:
    css = css.replace(a, b)

TOTAL = 14


def thumb(name, alt, contain=False):
    style = ' style="object-fit: contain; background: #0a0f1e; padding: 4px;"' if contain else ''
    return f'<img src="/images/slides/blues/{name}" alt="{alt}" class="slide-thumb"{style}>'


def vid(vid_id, title, label):
    return f'<button class="video-trigger-btn" onclick="openVideo(\'{vid_id}\', \'{title}\')">▶ {label}</button>'


slides = []


def slide(eyebrow_icon, eyebrow, heading, lead, body):
    n = len(slides) + 1
    active = ' active' if n == 1 else ''
    slides.append(f'''
      <section class="slide{active}" data-slide="{n}">
        <div class="slide-eyebrow"><span>{eyebrow_icon}</span> {eyebrow}</div>
        <h2 class="slide-heading">{heading}</h2>
        <p class="slide-lead">{lead}</p>
        {body}
      </section>''')


def card(cls, inner):
    return f'<div class="info-card {cls}">{inner}</div>'


# 1 COVER
slides.append('''
      <section class="slide active" data-slide="1">
        <div class="slide-eyebrow"><span>🎸</span> Topic Deep Dive &bull; GCE Music Technology</div>
        <h1 class="slide-heading">The <span>Blues</span></h1>
        <p class="slide-lead">From solo Delta singers captured on portable disc recorders to the amplified, overdriven sound of 1950s Chicago and the British blues boom. The Blues is the root of rock and roll, R&amp;B, soul and most popular music since &mdash; and every step of its story is driven by technology: resonator guitars, amplification, valve overdrive, studio recording and sampling.</p>
        <div class="grid-3" style="margin-top: 10px;">
          <div class="info-card highlight"><span class="spec-pill ao4">AO4 Four Sub-genres</span><h4>Country, Chicago, British &amp; Blues Rock</h4><p>Trace the style from <strong>Robert Johnson</strong> (Country Blues) through <strong>Muddy Waters</strong> and <strong>B.B. King</strong> (Chicago) to the <strong>Yardbirds</strong>, <strong>Rolling Stones</strong> and blues rock.</p></div>
          <div class="info-card cyan-edge"><span class="spec-pill ao3">AO3 Technology</span><h4>From Acoustic to Amplified</h4><p>Resonator and slide guitar, the electric guitar, amplified harmonica, <strong>valve amp overdrive</strong> and the move from mono field discs to Chess Records studio quality.</p></div>
          <div class="info-card acid-edge"><span class="spec-pill ao4">AO4 Musical Features</span><h4>12 Bar, Blues Scale, Call &amp; Response</h4><p>The <strong>I-IV-V 12 bar</strong> pattern, blues scale, call and response between voice and lead instrument, and emotive melismatic singing about poverty and lost love.</p></div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 12px; align-items: center;">
          <button class="nav-btn" onclick="nextSlide()" style="background: var(--accent-purple); color: #060a14; border-color: var(--accent-purple);">Start Interactive Deck &rarr;</button>
          <span style="font-size: 12px; color: var(--text-muted);">Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">&rarr;</kbd> to navigate</span>
        </div>
      </section>''')

# 2 SPEC MATRIX
slide('📋', 'Specification Roadmap', 'Component 3 <span>Syllabus Matrix for The Blues</span>',
      'Edexcel expects you to connect the technology used to the sound you hear, and to place the style in its cultural and musical context.',
      '<div class="grid-2">' +
      card('cyan-edge', '''<span class="spec-pill ao3">AO3: Technology &amp; Processes</span><h4>Instruments, Recording &amp; Processing</h4>
      <ul style="margin-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
      <li><strong>Early recording:</strong> mono discs, one microphone or horn, heavy surface noise, poor separation of instruments.</li>
      <li><strong>Electric instruments:</strong> introduced with Chicago Blues in the 1940s/50s &mdash; electric guitar, bass guitar and amplified harmonica.</li>
      <li><strong>Distortion:</strong> the main effect used &mdash; natural valve amp overdrive on guitar and harmonica.</li>
      <li><strong>Post-war quality:</strong> recording quality is vastly improved from 1945 onwards.</li>
      <li><strong>Later keys:</strong> Hammond organ in British Blues and Blues Rock.</li></ul>''') +
      card('highlight', '''<span class="spec-pill ao4">AO4: Musical &amp; Cultural Context</span><h4>Features, Influences &amp; Exchange</h4>
      <ul style="margin-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
      <li><strong>Structure:</strong> 12 bar blues (I I I I, IV IV I I, V IV I I) and other I, IV, V progressions.</li>
      <li><strong>Melody:</strong> the blues scale; call and response; harmonica, guitar and piano solos.</li>
      <li><strong>Lyrics &amp; voice:</strong> poverty and lost love; emotive, sometimes melismatic &ldquo;wailing&rdquo; delivery.</li>
      <li><strong>Influenced by:</strong> Country, Jazz and Spirituals.</li>
      <li><strong>Influence on:</strong> Rock and Roll, Heavy Metal, Jazz, R&amp;B, Soul &mdash; and sampling (Moby).</li></ul>'''))
# 3 COUNTRY / DELTA BLUES
slide('🌾', '1920s&ndash;1930s &bull; Country Blues', 'Country Blues: <span>One Voice, One Guitar</span>',
      'Early Country Blues was often just a singer with a guitar, born in the Mississippi Delta from a mixture of European, American and African traditions, and influenced by Country, Jazz and Spirituals.',
      '<div class="grid-3">' +
      card('highlight', thumb('delta_blues.jpg', 'Map of the Mississippi Delta', True) + '<h4>The Mississippi Delta</h4><p>The Delta is the cradle of Country Blues. Songs of <strong>poverty and lost love</strong> were performed solo with guitar, often in a <strong>melismatic, wailing</strong> vocal style and a call-and-response relationship between voice and guitar.</p>') +
      card('cyan-edge', thumb('robert_johnson.jpg', 'Robert Johnson') + '<h4>Robert Johnson (1911&ndash;1938)</h4><p>Recorded just 29 songs in two sessions (San Antonio 1936, Dallas 1937) &mdash; in temporary hotel and warehouse studios, direct to disc. <em>Cross Road Blues</em> (1936) became a cornerstone of the style.</p>' + vid('Kxi4XkIVWLQ', 'Robert Johnson - Cross Road Blues', 'Listen: Cross Road Blues')) +
      card('acid-edge', thumb('alan_lomax.jpg', 'Alan Lomax') + '<h4>Alan Lomax &amp; Field Recording</h4><p>Alan Lomax recorded blues musicians for the <strong>Library of Congress</strong> on portable disc recorders. In 1941 he recorded a young Muddy Waters on Stovall Plantation, Mississippi.</p>') +
      '</div>')
# 4 EARLY RECORDING TECH
slide('💿', 'AO3 &bull; Early Recording Technology', 'Mono Discs, <span>Surface Noise &amp; One Microphone</span>',
      'The worksheet is clear: early blues recordings are scratchy and mono, with a lot of surface noise and poor separation of instruments.',
      '<div class="grid-2">' +
      card('highlight', thumb('wax_cylinder.jpg', 'Edison wax cylinder') + '<h4>Acoustic Recording &amp; Early Formats</h4><p>Before 1925 recordings were made <strong>acoustically</strong>: performers played into a large horn which cut the groove directly. Early formats such as the <strong>wax cylinder</strong> and the 78 rpm shellac disc had a narrow frequency range, loud <strong>surface noise</strong> and no way to adjust the balance afterwards.</p>') +
      card('cyan-edge', thumb('phonograph_record.jpg', 'Phonograph records of different sizes') + '<h4>One Source, Poor Separation</h4><p>Musicians were gathered around a <strong>single recorder or microphone</strong>, so every sound was captured together in <strong>mono</strong>. Balance was controlled by <em>where players stood</em>, not by a mixing desk. From <strong>1925</strong> electrical recording with microphones widened the frequency range, and quality improved greatly again after <strong>1945</strong>.</p>') +
      '</div>')
# 5 SLIDE & RESONATOR
slide('🔩', 'AO3 &bull; Guitar Technique &amp; Instruments', 'Slide Guitar &amp; <span>the Resonator</span>',
      'Slide (bottleneck) guitar is especially associated with Country Blues, and the resonator guitar solved the problem of volume before electric amplification existed.',
      '<div class="grid-2">' +
      card('highlight', thumb('slide_guitar.jpg', 'Slide guitar played on a resonator') + '<h4>Slide / Bottleneck Guitar</h4><p>A glass or metal slide worn on a finger is moved along the strings instead of fretting notes, giving a <strong>continuous, vocal-like glide</strong> between pitches. It imitates the human voice and suits the call-and-response between singer and guitar. Often played in open tunings.</p>') +
      card('cyan-edge', thumb('resonator_guitar.jpg', 'Resonator guitar') + '<h4>The Resonator Guitar</h4><p>Developed in the late 1920s, a metal <strong>resonator cone</strong> inside the body makes the guitar much louder than a normal acoustic &mdash; useful for street and juke-joint performers, and for cutting through on a <strong>single-microphone recording</strong>. Its bright, metallic, sustained tone is a hallmark of Country Blues.</p>') +
      '</div>')
# 6 CHICAGO ELECTRIFICATION
slide('⚡', 'AO3 &amp; AO4 &bull; 1940s&ndash;1950s', 'Chicago Blues: <span>The Sound Goes Electric</span>',
      'After the Great Migration, Delta musicians reached Chicago&rsquo;s noisy clubs. To be heard, they plugged in &mdash; electric guitar, bass guitar, drums and amplified harmonica form the Chicago Blues band.',
      '<div class="grid-3">' +
      card('highlight', thumb('muddy_waters.jpg', 'Muddy Waters') + '<h4>Muddy Waters</h4><p>Moved to Chicago in 1943 and went electric in the mid-1940s. His amplified slide guitar and full band recorded for <strong>Chess Records</strong> defined the genre.</p>' + vid('bSfqNEvykv0', 'Muddy Waters - Mannish Boy', 'Listen: Mannish Boy')) +
      card('cyan-edge', thumb('little_walter.jpg', 'Little Walter') + '<h4>Little Walter &amp; Amplified Harmonica</h4><p>Played the harmonica through a hand-held microphone into a small guitar amplifier, driving it into <strong>overdrive</strong> for a thick, saxophone-like sound. <em>Juke</em> (1952).</p>' + vid('kWLQSplVP3Y', 'Little Walter - Juke', 'Listen: Juke')) +
      card('acid-edge', thumb('howlin_wolf.jpg', 'Howlin Wolf') + '<h4>Howlin&rsquo; Wolf</h4><p>A huge voice and raw, distorted electric band sound. His first records were cut in <strong>Memphis</strong> before he moved to Chicago and Chess Records.</p>' + vid('VMUt8KdDtTY', 'Howlin Wolf - Smokestack Lightning', 'Listen: Smokestack Lightning')) +
      '</div>')
# 7 CHESS RECORDS
slide('🏢', 'AO4 &bull; The Record Label', 'Chess Records: <span>Dixon, Hooker &amp; the Studio</span>',
      'Chess Records, run by brothers Leonard and Phil Chess in Chicago, recorded the great electric blues artists in small rooms with strong natural ambience and carefully captured band balance.',
      '<div class="grid-3">' +
      card('highlight', thumb('willie_dixon.jpg', 'Willie Dixon') + '<h4>Willie Dixon</h4><p>Bassist, songwriter and in-house talent scout at Chess. He wrote classics such as <em>Hoochie Coochie Man</em> and <em>Spoonful</em> for Muddy Waters and Howlin&rsquo; Wolf.</p>') +
      card('cyan-edge', thumb('john_lee_hooker.jpg', 'John Lee Hooker') + '<h4>John Lee Hooker</h4><p>Based in Detroit, he played hypnotic one-chord <strong>boogie</strong> on amplified guitar, tapping his foot &mdash; showing the style was not confined to Chicago.</p>') +
      card('acid-edge', thumb('howlin_wolf.jpg', 'Howlin Wolf at Chess') + '<h4>The Chess Sound</h4><p>Intimate rooms, <strong>few microphones</strong>, the whole band playing together, natural room reflections and little processing apart from <strong>overdrive on the instruments</strong> themselves.</p>') +
      '</div>')
# 8 AMPS & GUITARS
slide('🔊', 'AO3 &bull; Amplification &amp; Distortion', 'Valve Amps &amp; <span>Natural Overdrive</span>',
      'The worksheet notes little use of effects apart from distortion on electric guitars from Chicago Blues onwards. That distortion came from the valve amplifier itself.',
      '<div class="grid-2">' +
      card('highlight', thumb('fender_champ.jpg', 'Small Fender valve combo amplifier') + '<h4>Small Valve Combos Pushed Hard</h4><p>Small <strong>valve (tube) combo amplifiers</strong> have limited power. Turned up loud, the valves run out of headroom and begin to <strong>clip softly</strong>, adding warm harmonic distortion and <strong>compression</strong>. The small speaker cone also compresses and rounds off the sound &mdash; this is natural overdrive, not an effects pedal.</p>') +
      card('cyan-edge', thumb('gibson_es335.jpg', 'Gibson ES-335 semi-hollow guitar') + '<h4>The Electric Guitar</h4><p>Solid and <strong>semi-hollow</strong> electric guitars, such as the Gibson ES-335 (1958), gave blues players sustain and volume with controllable feedback. Amplified guitar let the instrument take over the lead role from the voice in call-and-response.</p>') +
      '</div>')
# 9 HARMONICA & KEYS
slide('🎹', 'AO3 &bull; Featured Instruments', 'Harmonica, <span>Piano &amp; Hammond Organ</span>',
      'Beyond guitar, the worksheet lists harmonica and piano as featured solo instruments, with Hammond organ arriving in British Blues and Blues Rock.',
      '<div class="grid-2">' +
      card('highlight', thumb('harmonica.jpg', 'Blues harmonica') + '<h4>The Blues Harmonica</h4><p>Played in <strong>second position (&ldquo;cross harp&rdquo;)</strong> to get bent, bluesy notes from the instrument. It trades phrases with the singer in call and response. Amplified through a microphone and amp it became a lead electric instrument.</p>') +
      card('cyan-edge', thumb('hammond_organ.jpg', 'Hammond organ') + '<h4>Hammond Organ</h4><p>The <strong>Hammond organ</strong>, often played through a rotating Leslie speaker, added sustained chords and solos in British Blues and Blues Rock. Its drawbar tones and natural valve overdrive suited the style.</p>') +
      '</div>')
# 10 BRITISH BLUES
slide('🇬🇧', 'AO4 &bull; Cultural Exchange', 'British Blues: <span>Passed Back Across the Atlantic</span>',
      'The Blues began as a mix of European, American and African styles and was passed backwards and forwards across the Atlantic. In the 1960s young British players fell in love with Chicago blues records.',
      '<div class="grid-3">' +
      card('highlight', thumb('rolling_stones.jpg', 'The Rolling Stones') + '<h4>The Rolling Stones</h4><p>Took their name from a Muddy Waters song and covered Chicago blues on their early records, introducing the style to a young white audience.</p>') +
      card('cyan-edge', thumb('john_mayall.jpg', 'John Mayall') + '<h4>John Mayall&rsquo;s Bluesbreakers</h4><p>A training ground for British blues guitarists. <em>Blues Breakers with Eric Clapton</em> (1966) featured a loud, overdriven guitar sound that influenced rock.</p>') +
      card('acid-edge', thumb('eric_clapton.jpg', 'Eric Clapton') + '<h4>Eric Clapton &amp; the Yardbirds</h4><p>Clapton played with the <strong>Yardbirds</strong> and Mayall, helping turn blues guitar into a virtuoso, amplified lead instrument.</p>') +
      '</div>')
# 11 BLUES ROCK / LEGACY
slide('🤘', 'AO4 &bull; Influence on Rock', 'Blues Rock &amp; <span>the Birth of Rock and Roll</span>',
      'The Blues influenced Rock and Roll and most subsequent rock music, including Heavy Metal. Artists bent the style into new forms.',
      '<div class="grid-3">' +
      card('highlight', thumb('chuck_berry.jpg', 'Chuck Berry') + '<h4>Chuck Berry</h4><p>Signed to Chess, he sped up the 12 bar and added country influences to create early <strong>rock and roll</strong> guitar riffs.</p>') +
      card('cyan-edge', thumb('jimi_hendrix.jpg', 'Jimi Hendrix') + '<h4>Jimi Hendrix</h4><p>Took amplified blues guitar into psychedelic territory using <strong>loud valve amps, feedback and effects</strong>, while keeping blues scales and 12 bar forms.</p>') +
      card('acid-edge', thumb('led_zeppelin.jpg', 'Led Zeppelin') + '<h4>Led Zeppelin</h4><p>Built heavy rock on the blues: blues scales, riffs and call-and-response, recorded with big room ambience &mdash; a bridge to Heavy Metal.</p>') +
      '</div>')
# 12 MODERN LEGACY
slide('🎧', 'AO3 &amp; AO4 &bull; The Blues Today', 'Sampling &amp; <span>Modern Echoes of the Blues</span>',
      'Blues filters into all kinds of popular music. The worksheet points to sampling (Moby) and singers like Amy Winehouse.',
      '<div class="grid-3">' +
      card('highlight', thumb('moby.jpg', 'Moby') + '<h4>Moby: <em>Play</em> (1999)</h4><p>Built a hit album by <strong>sampling</strong> old blues and gospel field recordings from Alan Lomax&rsquo;s Library of Congress archive, set against electronic beats &mdash; turning noisy mono discs into a stylistic feature.</p>') +
      card('cyan-edge', thumb('amy_winehouse.jpg', 'Amy Winehouse') + '<h4>Amy Winehouse</h4><p>A modern singer whose jazz and blues phrasing, melismatic delivery and soulful sound show the continuing influence of the style.</p>') +
      card('acid-edge', thumb('alan_lomax.jpg', 'Alan Lomax archive') + '<h4>The Archive as an Instrument</h4><p>The same field recordings captured in the 1930s&ndash;40s became raw material for sampling decades later &mdash; a perfect link between early recording technology and modern production.</p>') +
      '</div>')
# 13 SECTION B MATRIX
slide('⚖️', 'Component 3 Section B Preparation', 'Comparison: <span>1930s Delta Field vs 1950s Chicago Studio</span>',
      'In longer comparison answers, contrast the technology and the musical result.',
      '''<table class="comp-table"><thead><tr><th>Feature</th><th>1930s Country / Delta Blues</th><th>1950s Chicago Blues (Chess)</th></tr></thead><tbody>
      <tr><td><strong>Instruments</strong></td><td>Solo voice with acoustic or resonator guitar; sometimes harmonica or piano.</td><td>Electric guitar, bass guitar, drums, piano and amplified harmonica &mdash; a full band.</td></tr>
      <tr><td><strong>Recording</strong></td><td>Mono disc recorders, one source, hotel-room or field setups; scratchy with surface noise and poor separation.</td><td>Purpose-built studio, several mics, better quality and clearer band balance (vastly improved post-war).</td></tr>
      <tr><td><strong>Sound &amp; effects</strong></td><td>Natural acoustic tone; essentially no effects.</td><td>Distortion from overdriven valve amps on guitar and harmonica; the only real &ldquo;effect&rdquo;.</td></tr>
      <tr><td><strong>Audience &amp; purpose</strong></td><td>Local juke joints and regional record releases.</td><td>Noisy urban clubs, jukeboxes and wider R&amp;B audiences &mdash; amplification needed.</td></tr></tbody></table>''')
# 14 FEATURES + CHECKLIST
slide('🎯', 'Edexcel Component 3 Final Revision', 'Musical Features <span>&amp; Exam Quick Reference</span>',
      'Keep these key musical features and technology terms at your fingertips for listening questions.',
      '<div class="grid-3">' +
      card('highlight', '<h4>Musical Features</h4><p><strong>12 bar:</strong> I I I I | IV IV I I | V IV I I.<br><strong>Scale:</strong> the blues scale.<br><strong>Texture:</strong> call and response.<br><strong>Solos:</strong> guitar, harmonica, piano.<br><strong>Lyrics:</strong> poverty, lost love.<br><strong>Voice:</strong> emotive, melismatic.</p>') +
      card('cyan-edge', '<h4>Technology Features</h4><p><strong>Early:</strong> mono, scratchy, one source.<br><strong>1940s/50s:</strong> electric instruments (Chicago).<br><strong>Post-1945:</strong> vastly better quality.<br><strong>Effects:</strong> mainly guitar distortion.<br><strong>Later:</strong> Hammond organ (British/Blues Rock).</p>') +
      card('acid-edge', '<h4>Key Artists</h4><p><strong>Country:</strong> Robert Johnson.<br><strong>Chicago:</strong> Muddy Waters, B.B. King.<br><strong>British:</strong> Yardbirds, Rolling Stones.<br><strong>Influence:</strong> Rock and Roll, Metal, Jazz, R&amp;B, Soul, Moby, Amy Winehouse.</p>') +
      '</div><div style="margin-top: 18px; text-align: center;"><a href="/blues-interactive-quiz.html" style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-purple); color: #060a14; font-weight: 800; font-size: 13.5px; padding: 10px 24px; border-radius: 50px; text-decoration: none; box-shadow: 0 0 20px var(--accent-purple-glow);">Test Your Knowledge: Take the 12-Question Specification Quiz &rarr;</a></div>')

assert len(slides) == TOTAL, len(slides)

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Blues • Interactive Study Deck | Music Tech Guru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>{css}</style>
</head>
<body>
  <div class="deck-wrapper">
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music in Context</div>
      <div class="deck-topic-title">Topic: <strong>The Blues (1920s to present)</strong></div>
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
</html>
'''
open(OUT, 'w', encoding='utf-8').write(html)
print('wrote', OUT, len(html), 'bytes;', html.count('<img '), 'images;', 'slides', TOTAL)
