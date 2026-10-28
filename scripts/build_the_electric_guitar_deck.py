"""
Builds public/interactive-slide-the-electric-guitar.html
15-Slide Interactive Curriculum Deck on The Electric Guitar & Pickup Technology.
Edexcel Component 3: Music Technology in Context.
Features: 42 100% unique images & diagrams with containment, lightbox modal zoom, and responsive navigation.
"""
import os, re

OUT = 'public/interactive-slide-the-electric-guitar.html'
IMG = '/images/slides/the_electric_guitar'

slides_html = []

def thumb(name, alt):
    return (f'<div class="card-thumb">'
            f'<img src="{IMG}/{name}" alt="{alt}" loading="lazy" '
            f'style="width: 100%; height: 180px; object-fit: contain; background: rgba(0,0,0,0.45); padding: 4px; cursor: zoom-in;" '
            f'onclick="openLightbox(\'{IMG}/{name}\', \'{alt}\')">'
            f'</div>')

def card(cls, inner):
    return f'<div class="card {cls}">{inner}</div>'

def G(items, n=3):
    return f'<div class="grid-{n}">' + ''.join(items) + '</div>'

def vid(i, title, label):
    return (f'<div class="video-btn-row">'
            f'<button class="video-trigger-btn" onclick="openVideo(\'{i}\', \'{title}\')">▶ {label}</button>'
            f'</div>')

def slide(icon, eyebrow, title, lead, cards_html):
    n = len(slides_html) + 1
    slides_html.append(f'''
    <section class="slide" id="slide-{n}" data-slide="{n}">
      <div class="slide-header">
        <span class="slide-eyebrow">{icon} {eyebrow}</span>
        <h2>{title}</h2>
        <p class="lead">{lead}</p>
      </div>
      <div class="cards-wrap">
        {cards_html}
      </div>
    </section>''')

# 1 ROADMAP & SYLLABUS OVERVIEW
slide('📋', 'Specification Roadmap', 'The Electric Guitar: <span>Component 3 Syllabus Matrix</span>',
      'Edexcel requires deep understanding of electromagnetic induction, pickup construction (single-coil vs humbucker), solidbody evolution, and tonal circuitry.',
      G([
          card('highlight', f'''{thumb('fender_telecaster_1952.jpg', 'Vintage 1952 Fender Telecaster Solidbody')}
               <span class="spec-pill ao3">AO3 Solidbody Innovation</span>
               <h4>The Solidbody Revolution</h4>
               <p>Leo Fender (1950 Broadcaster / 1951 Telecaster) and Les Paul eliminated acoustic cavity resonance, stopping uncontrolled feedback squeal at high amplifier volumes.</p>'''),
          card('cyan-edge', f'''{thumb('gibson_les_paul_goldtop.jpg', '1953 Gibson Les Paul Standard Goldtop')}
               <span class="spec-pill ao3">AO3 Transducer Physics</span>
               <h4>Pickups &amp; Humbucking</h4>
               <p>Electromagnetic transducers convert steel string vibration into AC audio. Seth Lover\'s 1957 Gibson PAF humbucker used reverse-wound dual coils to cancel 50/60 Hz mains hum.</p>'''),
          card('acid-edge', f'''{thumb('fender_stratocaster_sunburst.jpg', '1954 Fender Stratocaster Sunburst')}
               <span class="spec-pill ao3">AO3 Tonal Versatility</span>
               <h4>Controls &amp; Ergonomics</h4>
               <p>Contoured bodies, synchronized floating tremolos, pickup selector switches, and passive low-pass tone filters (potentiometers &amp; capacitors) revolutionized musical expression.</p>''')
      ]))

# 2 GUITAR ANATOMY & COMPONENT ARCHITECTURE
slide('🎸', 'Instrument Anatomy', 'Anatomy of the <span>Electric Guitar &amp; Hardware</span>',
      'The electric guitar combines structural lutherie with electro-acoustic transducers and passive electrical circuits.',
      G([
          card('highlight', f'''{thumb('guitar_anatomy_diagram.svg', 'Technical Diagram of Electric Guitar Anatomy')}
               <span class="spec-pill ao3">AO3 Structural Components</span>
               <h4>Headstock, Nut &amp; Frets</h4>
               <p>Strings anchor at tuning pegs, pass over a bone/synthetic nut, and terminate at bridge saddles. Metal frets divide the fingerboard into semitone intervals along scale lengths of 24.75" (Gibson) or 25.5" (Fender).</p>'''),
          card('cyan-edge', f'''{thumb('guitar_neck_joint_types.svg', 'Neck Joint Types: Bolt-On vs Set-Neck vs Neck-Through')}
               <span class="spec-pill ao3">AO3 Mechanical Coupling</span>
               <h4>Neck Joint Construction</h4>
               <p><strong>Bolt-on (Fender)</strong> provides percussive snap and easy maintenance. <strong>Set-neck (Gibson)</strong> uses mortise-and-tenon wood glue for warm sustain. <strong>Neck-through</strong> maximizes vibration transfer and upper-fret access.</p>'''),
          card('acid-edge', f'''{thumb('guitar_potentiometer_wiring.svg', 'Guitar Control Circuit: Volume & Tone Potentiometers')}
               <span class="spec-pill ao3">AO3 Passive Circuits</span>
               <h4>Volume &amp; Tone Potentiometers</h4>
               <p>Logarithmic potentiometers (250k&#937; for single-coils, 500k&#937; for humbuckers) divide signal voltage. Tone controls bleed treble to ground via a 0.022–0.047&#956;F capacitor in an RC low-pass filter circuit.</p>''')
      ]))

# 3 PHYSICS OF ELECTROMAGNETIC INDUCTION
slide('🔬', 'Physical Principles', 'Electromagnetic Induction: <span>Faraday\'s Law</span>',
      'Electric guitar pickups are passive electromagnetic transducers converting mechanical kinetic energy directly into alternating electrical voltage.',
      G([
          card('highlight', f'''{thumb('faraday_pickup_induction.svg', 'Faraday Law of Electromagnetic Induction in Guitar Pickups')}
               <span class="spec-pill ao3">AO3 Induction Physics</span>
               <h4>Faraday\'s Law of Induction</h4>
               <p>A permanent magnet creates a magnetic flux field ($\Phi$). When a ferromagnetic steel or nickel string vibrates, it disturbs this field, inducing an electrical voltage ($\varepsilon = -N \frac{{\Delta\Phi}}{{\Delta t}}$) across the coil.</p>'''),
          card('cyan-edge', f'''{thumb('single_coil_pickup_anatomy.svg', 'Single-Coil Pickup Cross Section & Bobbin Anatomy')}
               <span class="spec-pill ao3">AO3 Coil Architecture</span>
               <h4>Single-Coil Construction</h4>
               <p>Consists of 6 cylindrical Alnico magnet pole pieces wrapped in approximately 7,000–8,500 turns of ultra-fine 42 AWG copper wire. Offers bright, articulate chime and snappy transient attack.</p>'''),
          card('acid-edge', f'''{thumb('pickup_impedance_frequency_response.svg', 'Pickup RLC Resonant Peak Frequency Response Curve')}
               <span class="spec-pill ao3">AO3 Electrical Impedance</span>
               <h4>RLC Resonant Peak Physics</h4>
               <p>Inductance (2.5–4 H), DC resistance (5.8–6.5 kΩ), and cable capacitance form a resonant RLC low-pass filter, giving single-coils their characteristic 4–5 kHz bell-like presence peak.</p>''')
      ]))

# 4 EARLY HISTORY & THE ACOUSTIC DILEMMA (1920s–1930s)
slide('🎺', 'Historical Origins', '1920s–1930s: <span>The Big Band Volume Dilemma</span>',
      'As jazz big bands and dance orchestras grew in size, acoustic rhythm guitars were drowned out by horns and brass sections.',
      G([
          card('highlight', f'''{thumb('rickenbacker_frying_pan_1931.jpg', '1931 Rickenbacker Electro A-22 Frying Pan Lap Steel')}
               <span class="spec-pill ao4">AO4 Historical Milestones</span>
               <h4>The Rickenbacker "Frying Pan" (1931)</h4>
               <p>George Beauchamp and Adolph Rickenbacker designed the first commercial electric guitar: a cast-aluminum lap steel featuring a horseshoe magnet pickup wrapping completely around the strings.</p>'''),
          card('cyan-edge', f'''{thumb('gibson_es150_charlie_christian.jpg', '1936 Gibson ES-150 Charlie Christian Archtop')}
               <span class="spec-pill ao4">AO4 Jazz Amplification</span>
               <h4>The Gibson ES-150 (1936)</h4>
               <p>Gibson\'s "Electric Spanish" archtop guitar featured a long cobalt steel blade pickup. Jazz pioneer Charlie Christian used it with the Benny Goodman Sextet to elevate the guitar into a major solo instrument.</p>'''),
          card('acid-edge', f'''{thumb('acoustic_feedback_hollowbody.svg', 'Acoustic Sound Pressure Cavity Feedback Diagram')}
               <span class="spec-pill ao3">AO3 Acoustic Feedback</span>
               <h4>The Acoustic Feedback Crisis</h4>
               <p>Because hollowbody archtops possessed thin, flexible spruce soundboards, high stage volume from tube amplifiers caused acoustic air cavity resonance, triggering deafening feedback howling.</p>''')
      ]))

# 5 THE SOLIDBODY REVOLUTION (1940s–1950)
slide('🪵', 'Design Breakthrough', 'The Solidbody Revolution: <span>Eliminating Feedback</span>',
      'The transition from hollow acoustic resonant boxes to dense solid timber slabs unlocked modern amplified music.',
      G([
          card('highlight', f'''{thumb('les_paul_the_log_1940.jpg', 'Les Paul The Log 4x4 Pine Solidbody Guitar')}
               <span class="spec-pill ao4">AO4 Solidbody Prototypes</span>
               <h4>Les Paul\'s "The Log" (1940)</h4>
               <p>Virtuoso guitarist Les Paul glued an Epiphone archtop neck and dummy body wings to a solid 4x4 pine block. The solid core prevented acoustic feedback and provided unprecedented sustain.</p>'''),
          card('cyan-edge', f'''{thumb('solidbody_feedback_elimination.svg', 'Solidbody Acoustic Inertia vs Hollow Cavity Resonance')}
               <span class="spec-pill ao3">AO3 Acoustic Inertia</span>
               <h4>Physical Feedback Elimination</h4>
               <p>Solid dense wood has massive mechanical inertia and no internal air cavity. Sound waves from stage monitors bounce off the solid body without exciting sympathetic soundboard resonance.</p>'''),
          card('acid-edge', f'''{thumb('fender_esquire_broadcaster_1950.jpg', '1950 Fender Esquire & Broadcaster Slab Body')}
               <span class="spec-pill ao4">AO4 Mass Production</span>
               <h4>Fender Broadcaster (1950)</h4>
               <p>Leo Fender combined solid ash wood with modular bolt-on necks, creating the world\'s first commercially mass-produced solidbody electric guitar (renamed the Telecaster in 1951).</p>''')
      ]))

# 6 THE FENDER TELECASTER (1951)
slide('🎸', 'Fender Classics', 'The Fender Telecaster: <span>Simplicity, Tone &amp; Twang</span>',
      'The Telecaster remains one of the most recorded electric guitars in popular music history from blues to country and punk.',
      G([
          card('highlight', f'''{thumb('telecaster_bridge_ashtray_plate.jpg', 'Fender Telecaster 3-Saddle Bridge and Steel Baseplate')}
               <span class="spec-pill ao3">AO3 Bridge Physics</span>
               <h4>Steel Baseplate &amp; Brass Saddles</h4>
               <p>The bridge pickup is mounted directly onto a copper-plated steel baseplate with 3 shared brass barrel saddles, focusing the magnetic field and producing legendary percussive treble "twang".</p>'''),
          card('cyan-edge', f'''{thumb('telecaster_pickup_wiring.svg', 'Telecaster 3-Way Switching Circuit Diagram')}
               <span class="spec-pill ao3">AO3 Electronic Switching</span>
               <h4>Telecaster 3-Way Circuitry</h4>
               <p>Position 1 delivers sharp bridge cut; Position 2 combines bridge and neck pickups in parallel; Position 3 offers the warm neck pickup with a preset high-cut capacitor (original "dark" circuit).</p>'''),
          card('acid-edge', f'''{thumb('keith_richards_telecaster.jpg', 'Keith Richards with Fender Telecaster')}
               <span class="spec-pill ao4">AO4 Musical Impact</span>
               <h4>Rock &amp; Blues Masterpiece</h4>
               <p>Heard on Muddy Waters blues tracks, Keith Richards\' open-G Rolling Stones riffs (*Honky Tonk Women*), Bruce Springsteen, and Joe Strummer (*The Clash* punk rhythm tracks).</p>''')
      ]))

# 7 THE GIBSON LES PAUL (1952)
slide('👑', 'Gibson Heritage', 'The Gibson Les Paul: <span>Sustain, Warmth &amp; Craft</span>',
      'Designed by Gibson president Ted McCarty and guitarist Les Paul in 1952 to rival Fender\'s solidbody dominance.',
      G([
          card('highlight', f'''{thumb('les_paul_carved_maple_mahogany.jpg', 'Carved Maple Top on Solid Mahogany Les Paul Body')}
               <span class="spec-pill ao3">AO3 Tonewood Chemistry</span>
               <h4>Carved Maple &amp; Mahogany</h4>
               <p>A bookmatched carved maple cap provides bright transient bite and attack, while a solid dense mahogany back and glued set-neck deliver deep fundamental resonance and singing sustain.</p>'''),
          card('cyan-edge', f'''{thumb('gibson_p90_soapbar_pickup.jpg', 'Vintage Gibson P-90 Single Coil Soapbar Pickup')}
               <span class="spec-pill ao3">AO3 P-90 Architecture</span>
               <h4>The P-90 Single-Coil</h4>
               <p>Gibson\'s original 1952 pickup: wider, shorter bobbin than Fender coils with twin Alnico bar magnets underneath steel pole screws, producing a gritty, fat, high-output single-coil roar.</p>'''),
          card('acid-edge', f'''{thumb('gibson_tune_o_matic_bridge.jpg', 'Ted McCarty 1954 Tune-o-matic Bridge & Stopbar Tailpiece')}
               <span class="spec-pill ao3">AO3 Intonation Precision</span>
               <h4>Tune-o-matic &amp; Stopbar (1954)</h4>
               <p>Replaced basic bar bridges with individual adjustable brass saddles for every string, allowing precise compensation for string gauge intonation across the entire fretboard.</p>''')
      ]))

# 8 THE FENDER STRATOCASTER (1954)
slide('⚡', 'Fender Innovation', 'The Fender Stratocaster: <span>Contours, Quack &amp; Tremolo</span>',
      'Introduced in 1954, Leo Fender\'s Stratocaster revolutionized guitar ergonomics, hardware versatility, and sonic palettes.',
      G([
          card('highlight', f'''{thumb('stratocaster_tremolo_spring_cavity.jpg', 'Fender Synchronized Floating Tremolo Bridge & Springs')}
               <span class="spec-pill ao3">AO3 Synchronized Tremolo</span>
               <h4>Floating Tremolo Bridge</h4>
               <p>Combined bridge saddles and vibrato block into a single pivoting unit counterbalanced by 3–5 high-tension steel springs in the rear body cavity, allowing smooth pitch dips and vibrato.</p>'''),
          card('cyan-edge', f'''{thumb('stratocaster_pickup_selector_5way.svg', 'Stratocaster 5-Way Pickup Combinations & Quack Comb Filtering')}
               <span class="spec-pill ao3">AO3 Comb Filtering</span>
               <h4>The 5-Way "Quack" Tone</h4>
               <p>Positions 2 (Bridge + Mid) and 4 (Neck + Mid) run pickups in parallel. Spaced physical apertures create out-of-phase comb filtering, scooping ~1.5 kHz for hollow, funky rhythm textures.</p>'''),
          card('acid-edge', f'''{thumb('jimi_hendrix_monterey_strat.jpg', 'Jimi Hendrix Performing with Fender Stratocaster')}
               <span class="spec-pill ao4">AO4 Rock Milestones</span>
               <h4>Jimi Hendrix &amp; Expressive Freedom</h4>
               <p>Hendrix (*Voodoo Child*, *Little Wing*), David Gilmour (*Comfortably Numb*), and Stevie Ray Vaughan used the Stratocaster\'s double cutaways, vibrato arm, and pickup selector to define modern guitar.</p>''')
      ]))

# 9 SETH LOVER & THE HUMBUCKER (1957)
slide('🛡️', 'Hum Cancellation', 'Seth Lover\'s Humbucker: <span>Dual Coils &amp; Phase Math</span>',
      'In 1957, Gibson engineer Seth Lover solved the 50/60 Hz electromagnetic hum problem with the legendary PAF pickup.',
      G([
          card('highlight', f'''{thumb('seth_lover_paf_patent_diagram.svg', 'Seth Lover 1957 PAF Patent Diagram US 2896491')}
               <span class="spec-pill ao3">AO3 PAF Architecture</span>
               <h4>The Gibson PAF (1957)</h4>
               <p>Two side-by-side bobbins wired in series with opposite magnetic poles (North and South) and reverse wire winding (RWRP: Reverse Wound, Reverse Polarity) around a single Alnico bar magnet.</p>'''),
          card('cyan-edge', f'''{thumb('humbucker_phase_cancellation.svg', 'Humbucker Waveform Phase Cancellation Vector Diagram')}
               <span class="spec-pill ao3">AO3 Phase Cancellation Math</span>
               <h4>Phase Cancellation Mechanics</h4>
               <p>External 50/60 Hz EMI hits both coils with identical phase and is canceled: $\text{{Hum}}_1 - \text{{Hum}}_2 = 0$. Inverted string magnetic fields double audio voltage constructively: $\text{{Sig}}_1 + \text{{Sig}}_2 = 2\text{{Sig}}$.</p>'''),
          card('acid-edge', f'''{thumb('gibson_paf_humbucker_open.jpg', 'Original Gibson PAF Humbucker Pickup Open View')}
               <span class="spec-pill ao3">AO3 Humbucker Output</span>
               <h4>Higher Output &amp; Midrange Punch</h4>
               <p>Series wiring doubles coil inductance and increases DC resistance to 7.5–9.0 k&#937;. Shifts the resonant peak down to ~2.5–3 kHz, producing thick, creamy distortion in valve amplifiers.</p>''')
      ]))

# 10 PICKUP PLACEMENT & HARMONIC PHYSICS
slide('🌊', 'Harmonic Physics', 'Pickup Placement: <span>Nodes, Antinodes &amp; Spectrum</span>',
      'The exact physical position of a pickup along the vibrating string dictates which harmonic overtones are amplified.',
      G([
          card('highlight', f'''{thumb('string_vibration_nodes_antinodes.svg', 'String Vibration Harmonic Nodes Antinodes Pickup Positioning')}
               <span class="spec-pill ao3">AO3 Harmonic Physics</span>
               <h4>Nodes &amp; String Excursion</h4>
               <p>Near the bridge anchor, string displacement is physically restricted to tiny amplitudes, emphasizing higher harmonic overtones. Near the neck, wide string excursions capture the fundamental.</p>'''),
          card('cyan-edge', f'''{thumb('pickup_selector_tonal_comparison.svg', 'Pickup Spectrum Comparison: Bridge vs Middle vs Neck')}
               <span class="spec-pill ao3">AO3 Frequency Spectrum</span>
               <h4>Bridge vs Neck Frequency Response</h4>
               <p><strong>Bridge pickup:</strong> Sharp, bright, high-frequency presence with low fundamental output. <strong>Neck pickup:</strong> Warm, rounded fundamental bass tone with softened harmonic overtones.</p>'''),
          card('acid-edge', f'''{thumb('active_vs_passive_pickups.svg', 'Active vs Passive Guitar Pickups Circuit Comparison')}
               <span class="spec-pill ao3">AO3 Active Electronics</span>
               <h4>Active Pickups (EMG &amp; 9V Preamps)</h4>
               <p>Active designs (EMG 81/85) use low-turn, weak-magnet coils to prevent string drag, boosted by an internal 9V op-amp preamp. Delivers ultra-low noise, high output, and flat impedance curves.</p>''')
      ]))

# 11 SEMI-ACOUSTIC & ICONIC ALTERNATES
slide('🏛️', 'Semi-Hollow & Alternates', 'Semi-Acoustics &amp; 12-Strings: <span>ES-335 &amp; Rickenbacker</span>',
      'Hybrid acoustic-electric engineering bridged the gap between warm jazz resonance and solidbody high-gain power.',
      G([
          card('highlight', f'''{thumb('gibson_es335_centerblock.jpg', '1958 Gibson ES-335 Dot Semi-Hollow with Maple Center Block')}
               <span class="spec-pill ao3">AO3 Center Block Hybrid</span>
               <h4>The Gibson ES-335 (1958)</h4>
               <p>A solid maple block running down the center eliminates feedback while hollow side wings retain acoustic warmth. The definitive semi-acoustic played by B.B. King, Chuck Berry, and Larry Carlton.</p>'''),
          card('cyan-edge', f'''{thumb('gibson_sg_1961.jpg', '1961 Gibson SG Standard Solidbody')}
               <span class="spec-pill ao3">AO3 Lightweight Solidbody</span>
               <h4>The Gibson SG (1961)</h4>
               <p>Thin all-mahogany slab body with aggressive dual cutaway horns for unrestricted 22nd fret access. High-output humbuckers made it the weapon of choice for Angus Young (*AC/DC*) and Tony Iommi.</p>'''),
          card('acid-edge', f'''{thumb('rickenbacker_360_12_string.jpg', '1964 Rickenbacker 360-12 Electric 12-String Guitar')}
               <span class="spec-pill ao3">AO3 Octave Chorus Resonance</span>
               <h4>Rickenbacker 360/12 (1964)</h4>
               <p>Paired 6 standard strings with 6 higher octave strings. Delivered the bright, shimmering, jangly 1960s pop sound defining The Beatles (*A Hard Day\'s Night*), The Byrds, and Tom Petty.</p>''')
      ]))

# 12 ELECTRIC BASS GUITAR EVOLUTION
slide('🎻', 'Low-End Revolution', 'The Electric Bass: <span>Leo Fender\'s Precision Revolution</span>',
      'The invention of the fretted solidbody electric bass revolutionized rhythm sections across 20th-century popular music.',
      G([
          card('highlight', f'''{thumb('fender_precision_bass_1951.jpg', '1951 Fender Precision Bass Slab Body')}
               <span class="spec-pill ao3">AO3 P-Bass Invention</span>
               <h4>Fender Precision Bass (1951)</h4>
               <p>Leo Fender replaced bulky upright double basses with a solidbody fretted instrument. Frets guaranteed precise intonation, while magnetic pickups allowed bass lines to compete with loud drum kits.</p>'''),
          card('cyan-edge', f'''{thumb('fender_split_coil_pbass_pickup.svg', '1957 Fender Split-Coil P-Bass Humbucking Pickup')}
               <span class="spec-pill ao3">AO3 Split-Coil Humbucker</span>
               <h4>Split-Coil Humbucker (1957)</h4>
               <p>Two offset bobbins (E/A and D/G) wired in reverse series to cancel mains hum without treble loss. Delivered the punchy, articulate midrange punch heard on thousands of Motown hits by James Jamerson.</p>'''),
          card('acid-edge', f'''{thumb('hofner_500_1_violin_bass.jpg', 'Paul McCartney Hofner 500-1 Violin Hollowbody Bass')}
               <span class="spec-pill ao3">AO3 Hollowbody Bass Tone</span>
               <h4>The Höfner 500/1 Violin Bass</h4>
               <p>Hollowbody spruce and maple construction with short 30" scale length. Made famous by Paul McCartney with The Beatles, delivering a distinctive warm, woody, upright-like thud with flatwound strings.</p>''')
      ]))

# 13 THE SUPERSTRAT & SHRED ERA (1970s–1980s)
slide('🔥', 'Virtuoso Engineering', 'The Superstrat: <span>Frankenstrat, Floyd Rose &amp; Shred</span>',
      'In the late 1970s, virtuosic technical guitarists modified classic models to facilitate high-speed two-handed tapping and radical pitch bends.',
      G([
          card('highlight', f'''{thumb('eddie_van_halen_frankenstrat.jpg', 'Eddie Van Halen Frankenstrat Replica')}
               <span class="spec-pill ao3">AO3 Hybrid Innovation</span>
               <h4>The "Frankenstrat" (1979)</h4>
               <p>Eddie Van Halen married a Fender Stratocaster body with a slanted Gibson PAF humbucker. Blended Fender\'s ergonomic tremolo feel with the thick, high-gain overdrive of a Gibson humbucker.</p>'''),
          card('cyan-edge', f'''{thumb('floyd_rose_locking_tremolo.svg', 'Floyd Rose Double-Locking Tremolo System Diagram')}
               <span class="spec-pill ao3">AO3 Double-Locking System</span>
               <h4>Floyd Rose Tremolo (1977)</h4>
               <p>Clamped strings at both the headstock nut and the bridge saddles with hardened steel knife edges, completely eliminating string slippage and allowing extreme dive-bombs without going out of tune.</p>'''),
          card('acid-edge', f'''{thumb('ibanez_jem_steve_vai.jpg', 'Ibanez JEM 777 Steve Vai Signature Model')}
               <span class="spec-pill ao3">AO3 High-Speed Ergonomics</span>
               <h4>The Ibanez JEM (1987)</h4>
               <p>Engineered with Steve Vai: ultra-thin Wizard neck profile, 24 two-octave frets, deeply scalloped cutaways, high-output HSH DiMarzio pickups, and recessed tremolo routing for radical upward pitch pulls.</p>''')
      ]))

# 14 EXTENDED RANGE & DIGITAL MODELING (1990s–PRESENT)
slide('💻', 'Modern Frontier', 'Extended Range &amp; DSP: <span>7-Strings to Neural Profiling</span>',
      'Modern guitar production balances extended range hardware with cutting-edge digital signal processing and cabinet convolution.',
      G([
          card('highlight', f'''{thumb('extended_range_7_8_string.jpg', '7-String and 8-String Extended Range Modern Guitars')}
               <span class="spec-pill ao3">AO3 Extended Range</span>
               <h4>7 &amp; 8-String Extended Range</h4>
               <p>Pioneered by Steve Vai (Ibanez Universe 1990) and adopted by Korn, Deftones, and Meshuggah. Added low B and F# strings down to 46 Hz, reshaping modern metal rhythm production.</p>'''),
          card('cyan-edge', f'''{thumb('line6_pod_variax_modelling.jpg', 'Line 6 POD & Variax Digital Modeling Guitar')}
               <span class="spec-pill ao3">AO3 Digital Modeling Origins</span>
               <h4>Line 6 POD &amp; Variax (1998–2002)</h4>
               <p>Line 6 introduced the kidney-bean POD, using DSP algorithms to model vintage tube preamps, power amps, and cabinets. The Variax used hexaphonic piezo pickups to emulate vintage guitars digitally.</p>'''),
          card('acid-edge', f'''{thumb('dsp_amp_profiler_kemper_neural.svg', 'Digital Amp Profiler Impulse Response Signal Flow')}
               <span class="spec-pill ao3">AO3 Impulse Response &amp; AI</span>
               <h4>Kemper &amp; Neural DSP Profiling</h4>
               <p>Modern profiling sends test signals through real tube amplifiers and speakers, capturing exact non-linear harmonic distortion and Cabinet Impulse Responses (IRs) for pristine silent recording.</p>''')
      ]))

# 15 REVISION SUMMARY & CORE VOCABULARY
slide('🎓', 'Revision Summary', 'Component 3 <span>Core Vocabulary &amp; Exam Checklist</span>',
      'Master the essential terminology, physical principles, and historical milestones required for Edexcel Component 3.',
      G([
          card('highlight', f'''
               <span class="spec-pill ao3">Transducer Physics</span>
               <h4>1. Electromagnetic Principles</h4>
               <p><strong>Faraday\'s Law:</strong> $\varepsilon = -N \frac{{\Delta\Phi}}{{\Delta t}}$. Ferromagnetic steel strings vibrate inside permanent magnet fields, inducing audio AC voltage in copper coils. Nylon strings cannot work.</p>
               <p><strong>Impedance &amp; Pots:</strong> 250k&#937; pots warm single-coils; 500k&#937; pots preserve humbucker treble. Tone capacitor bleeds highs to ground.</p>'''),
          card('cyan-edge', f'''
               <span class="spec-pill ao3">Pickup Architecture</span>
               <h4>2. Single-Coil vs Humbucker</h4>
               <p><strong>Single-Coil (Fender):</strong> High resonant peak (~4.5 kHz), bright bell chime, subject to 50/60 Hz mains hum.</p>
               <p><strong>Humbucker (Seth Lover PAF):</strong> Two coils in series, reverse wound with reverse magnetic poles (RWRP). Cancels mains EMI hum while doubling string audio voltage (+6 dB).</p>'''),
          card('acid-edge', f'''
               <span class="spec-pill ao3">Acoustic &amp; Modern Evolution</span>
               <h4>3. Solidbody &amp; Modern DSP</h4>
               <p><strong>Solidbody:</strong> Eliminates acoustic air cavity feedback resonance, providing singing sustain.</p>
               <p><strong>Floyd Rose:</strong> Double-locking nut and bridge clamps prevent string slippage during dive-bombs.</p>
               <p><strong>DSP Modeling:</strong> Impulse responses (IRs) model speaker cabs directly into DAWs.</p>''')
      ]))

TOTAL = len(slides_html)

# Generate complete HTML document
html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Electric Guitar &amp; Pickup Technology &bull; Component 3 Presentation</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);"></script>
<style>
  :root {{
    --bg-dark: #080e1a;
    --card-bg: #0f172a;
    --border: rgba(255, 255, 255, 0.08);
    --cyan: #38bdf8;
    --gold: #fbbf24;
    --amber: #f59e0b;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
  }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    background: var(--bg-dark);
    color: var(--text-main);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.5;
    overflow-x: hidden;
  }}
  .deck-container {{
    max-width: 1040px;
    margin: 0 auto;
    padding: 20px 16px 80px 16px;
  }}
  .deck-top-bar {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid var(--border);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    margin-bottom: 24px;
  }}
  .counter {{
    font-size: 13px;
    font-weight: 700;
    color: var(--cyan);
    letter-spacing: 0.5px;
  }}
  .nav-btn {{
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border);
    color: #fff;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    transition: all 0.2s;
  }}
  .nav-btn:hover:not(:disabled) {{
    background: var(--cyan);
    color: var(--bg-dark);
    border-color: var(--cyan);
  }}
  .nav-btn:disabled {{
    opacity: 0.3;
    cursor: not-allowed;
  }}
  .progress-bar-wrap {{
    height: 4px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 2px;
    margin-top: 10px;
    overflow: hidden;
  }}
  .progress-bar-fill {{
    height: 100%;
    background: linear-gradient(90deg, #38bdf8, #f59e0b);
    width: 6.66%;
    transition: width 0.3s ease;
  }}
  .slide {{
    display: none;
    animation: fadeIn 0.3s ease;
  }}
  .slide.active {{
    display: block;
  }}
  @keyframes fadeIn {{
    from {{ opacity: 0; transform: translateY(6px); }}
    to {{ opacity: 1; transform: translateY(0); }}
  }}
  .slide-header {{
    margin-bottom: 24px;
  }}
  .slide-eyebrow {{
    display: inline-block;
    color: var(--cyan);
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }}
  .slide h2 {{
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 900;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
    line-height: 1.25;
  }}
  .slide h2 span {{
    color: var(--cyan);
  }}
  .lead {{
    color: var(--text-muted);
    font-size: 14.5px;
    max-width: 820px;
    line-height: 1.55;
  }}
  .grid-3 {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }}
  .card {{
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }}
  .card.highlight {{ border-top: 3px solid var(--cyan); }}
  .card.cyan-edge {{ border-top: 3px solid #06b6d4; }}
  .card.acid-edge {{ border-top: 3px solid var(--amber); }}
  .card-thumb {{
    margin-bottom: 12px;
    border-radius: 8px;
    overflow: hidden;
    background: #000;
  }}
  .card h4 {{
    font-size: 15px;
    font-weight: 800;
    margin: 6px 0 8px 0;
    color: #fff;
  }}
  .card p {{
    color: var(--text-muted);
    font-size: 12.5px;
    line-height: 1.55;
    flex: 1;
  }}
  .spec-pill {{
    display: inline-block;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }}
  .spec-pill.ao3 {{ background: rgba(56, 189, 248, 0.15); color: #38bdf8; }}
  .spec-pill.ao4 {{ background: rgba(245, 158, 11, 0.15); color: #fbbf24; }}
  .video-btn-row {{
    margin-top: 12px;
  }}
  .video-trigger-btn {{
    width: 100%;
    background: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }}
  .video-trigger-btn:hover {{
    background: var(--cyan);
    color: var(--bg-dark);
  }}

  /* Lightbox Modal */
  .lightbox-modal {{
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    align-items: center;
    justify-content: center;
    padding: 24px;
    backdrop-filter: blur(6px);
  }}
  .lightbox-modal.active {{ display: flex; }}
  .lightbox-img {{
    max-width: 90vw;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    background: rgba(15, 23, 42, 0.6);
  }}
  .lightbox-caption {{
    position: absolute;
    bottom: 24px;
    color: #cbd5e1;
    font-size: 13px;
    background: rgba(15, 23, 42, 0.85);
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid var(--border);
  }}
  .lightbox-close {{
    position: absolute;
    top: 24px;
    right: 28px;
    color: #fff;
    font-size: 28px;
    font-weight: 800;
    cursor: pointer;
    background: none;
    border: none;
  }}

  /* Video Modal */
  .video-modal-backdrop {{
    display: none;
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 10000;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }}
  .video-modal-backdrop.active {{ display: flex; }}
  .video-modal-content {{
    width: 100%;
    max-width: 800px;
    background: var(--card-bg);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
  }}
  .video-modal-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    border-bottom: 1px solid var(--border);
  }}
  .video-modal-title {{ font-size: 14px; font-weight: 700; color: #fff; }}
  .video-modal-close {{ background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }}
  .video-modal-body {{
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    background: #000;
  }}
  .video-modal-body iframe {{
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    border: 0;
  }}
</style>
</head>
<body>

<div class="deck-container">
  <div class="deck-top-bar">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="display: inline-block; width: 8px; height: 8px; background: var(--cyan); border-radius: 50%; box-shadow: 0 0 8px var(--cyan);"></span>
      <span class="counter" id="slideCounter">Slide 1 of {TOTAL}</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="nav-btn" id="prevBtn" onclick="changeSlide(-1)">&larr; Prev</button>
      <button class="nav-btn" id="nextBtn" onclick="changeSlide(1)">Next &rarr;</button>
    </div>
  </div>
  <div class="progress-bar-wrap">
    <div class="progress-bar-fill" id="progressBar"></div>
  </div>

  <div id="slidesContainer" style="margin-top: 24px;">
    {''.join(slides_html)}
  </div>
</div>

<!-- Lightbox Modal -->
<div class="lightbox-modal" id="lightboxModal" onclick="closeLightbox()">
  <button class="lightbox-close">&times;</button>
  <img class="lightbox-img" id="lightboxImg" src="" alt="">
  <div class="lightbox-caption" id="lightboxCaption"></div>
</div>

<!-- Video Modal -->
<div class="video-modal-backdrop" id="videoModal">
  <div class="video-modal-content">
    <div class="video-modal-header">
      <span class="video-modal-title" id="videoModalTitle">Video Masterclass</span>
      <button class="video-modal-close" onclick="closeVideo()">&times;</button>
    </div>
    <div class="video-modal-body">
      <iframe id="videoIframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>

<script>
  let currentSlide = 1;
  const totalSlides = {TOTAL};

  function updateSlide() {{
    document.querySelectorAll('.slide').forEach((s, idx) => {{
      s.classList.toggle('active', (idx + 1) === currentSlide);
    }});
    document.getElementById('slideCounter').textContent = `Slide ${{currentSlide}} of ${{totalSlides}}`;
    document.getElementById('prevBtn').disabled = (currentSlide === 1);
    document.getElementById('nextBtn').disabled = (currentSlide === totalSlides);
    document.getElementById('progressBar').style.width = `${{(currentSlide / totalSlides) * 100}}%`;
  }}

  function changeSlide(direction) {{
    const next = currentSlide + direction;
    if (next >= 1 && next <= totalSlides) {{
      currentSlide = next;
      updateSlide();
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}
  }}

  document.addEventListener('keydown', (e) => {{
    if (document.getElementById('lightboxModal').classList.contains('active')) {{
      if (e.key === 'Escape') closeLightbox();
      return;
    }}
    if (document.getElementById('videoModal').classList.contains('active')) {{
      if (e.key === 'Escape') closeVideo();
      return;
    }}
    if (e.key === 'ArrowRight' || e.key === 'PageDown') changeSlide(1);
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') changeSlide(-1);
  }});

  function openLightbox(src, caption) {{
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxCaption').textContent = caption;
    document.getElementById('lightboxModal').classList.add('active');
  }}

  function closeLightbox() {{
    document.getElementById('lightboxModal').classList.remove('active');
  }}

  function openVideo(videoId, title) {{
    document.getElementById('videoModalTitle').textContent = title;
    document.getElementById('videoIframe').src = `https://www.youtube.com/embed/${{videoId}}?autoplay=1`;
    document.getElementById('videoModal').classList.add('active');
  }}

  function closeVideo() {{
    document.getElementById('videoIframe').src = '';
    document.getElementById('videoModal').classList.remove('active');
  }}

  updateSlide();
</script>
</body>
</html>'''

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Generated {OUT} ({len(html)} bytes, {TOTAL} slides)")
