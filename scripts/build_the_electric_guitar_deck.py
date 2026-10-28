"""
Builds public/interactive-slide-the-electric-guitar.html
15-Slide Interactive Curriculum Deck on The Electric Guitar & Pickup Technology.
Edexcel Component 3: Music Technology in Context.
Features: 42 100% unique images & diagrams with containment, lightbox modal zoom, and bottom deck controls.
"""
import os, re

OUT = 'public/interactive-slide-the-electric-guitar.html'
IMG = '/images/slides/the_electric_guitar'

slides_html = []

def thumb(name, alt):
    return (f'<div class="card-thumb">'
            f'<img src="{IMG}/{name}" alt="{alt}" loading="lazy" '
            f'class="slide-thumb" '
            f'style="width: 100%; height: 175px; object-fit: contain; background: rgba(0,0,0,0.45); padding: 4px; cursor: zoom-in; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); display: block;" '
            f'onclick="openLightbox(\'{IMG}/{name}\', \'{alt}\')">'
            f'</div>')

def card(cls, inner):
    return f'<div class="info-card {cls}">{inner}</div>'

def G(items, n=3):
    return f'<div class="grid-{n}">' + ''.join(items) + '</div>'

def vid(i, title, label):
    return (f'<div class="video-btn-row">'
            f'<button class="video-trigger-btn" onclick="openVideo(\'{i}\', \'{title}\')">▶ {label}</button>'
            f'</div>')

def slide(icon, eyebrow, title, lead, cards_html):
    n = len(slides_html) + 1
    active_cls = ' active' if n == 1 else ''
    slides_html.append(f'''
    <section class="slide{active_cls}" id="slide-{n}" data-slide="{n}">
      <div class="slide-eyebrow">{icon} {eyebrow}</div>
      <h2 class="slide-heading">{title}</h2>
      <p class="slide-lead">{lead}</p>
      <div class="cards-wrap">
        {cards_html}
      </div>
    </section>''')

# 1 ROADMAP & SYLLABUS OVERVIEW
slide('📋', 'Specification Roadmap', 'The Electric Guitar: <span>Component 3 Syllabus Matrix</span>',
      'Edexcel requires deep understanding of electromagnetic induction, pickup construction (single-coil vs humbucker), solidbody evolution, and tonal circuitry.',
      G([
          card('highlight', f'''{thumb('fender_telecaster_1952.jpg', 'Vintage 1952 Fender Telecaster Solidbody')}
               <span class="spec-pill ao4">AO4 Historical Milestones</span>
               <h4>Solidbody Genesis</h4>
               <p>The transition from big band acoustic archtops prone to acoustic feedback to solid ash and alder bodies: the 1950 Broadcaster/Telecaster and 1954 Stratocaster.</p>'''),
          card('cyan-edge', f'''{thumb('gibson_les_paul_goldtop.jpg', '1952 Gibson Les Paul Goldtop Solidbody')}
               <span class="spec-pill ao3">AO3 Transducer Physics</span>
               <h4>Transducers &amp; Hum Cancellation</h4>
               <p>Electromagnetic transducers convert steel string vibration into AC audio. Seth Lover\'s 1957 Gibson PAF humbucker used reverse-wound dual coils to cancel 50/60 Hz mains hum.</p>'''),
          card('acid-edge', f'''{thumb('guitar_anatomy_diagram.svg', 'Electric Guitar Anatomy & Signal Flow Vector Diagram')}
               <span class="spec-pill ao3">AO3 Instrument Anatomy</span>
               <h4>Anatomy &amp; Signal Routing</h4>
               <p>String gauge and tension, nut and saddle anchor points, magnetic pole piece spacing, potentiometer loading (250k vs 500k), and tone capacitors form a complex RLC circuit.</p>''')
      ]))

# 2 ANATOMY & TRANSDUCER SCHEMATICS
slide('🎸', 'Instrument Anatomy', 'Electric Guitar Anatomy: <span>Signal Architecture</span>',
      'Every component of an electric guitar influences its mechanical resonance, magnetic sampling, and electrical output impedance.',
      G([
          card('highlight', f'''{thumb('guitar_neck_joint_types.svg', 'Guitar Neck Joint Comparison: Bolt-On, Set-Neck, Neck-Through')}
               <span class="spec-pill ao3">AO3 Mechanical Resonance</span>
               <h4>Neck Joints &amp; Sustain</h4>
               <p><strong>Bolt-on (Fender):</strong> Snappy attack, modular repair. <strong>Set-neck (Gibson):</strong> Warm acoustic transfer and singing sustain. <strong>Neck-through:</strong> Maximum rigidity and uninterrupted sustain across the instrument body.</p>'''),
          card('cyan-edge', f'''{thumb('gibson_tune_o_matic_bridge.jpg', 'Gibson Tune-o-matic Bridge and Stopbar Tailpiece')}
               <span class="spec-pill ao3">AO3 Bridge &amp; Tailpiece</span>
               <h4>Bridges &amp; Intonation</h4>
               <p>Individual bridge saddles allow precise intonation compensation (string length adjustment for string core stiffness), while zinc or brass stopbar tailpieces anchor string vibrations into the mahogany wood body.</p>'''),
          card('acid-edge', f'''{thumb('guitar_potentiometer_wiring.svg', 'Passive Guitar Volume and Tone Potentiometer RC Low Pass Schematic')}
               <span class="spec-pill ao3">AO3 Electrical Loading</span>
               <h4>Passive Tone Circuits (RC Filter)</h4>
               <p>Variable resistors (potentiometers) paired with capacitors (0.022–0.047 µF) bleed high frequencies to ground. A 250 kΩ pot damps treble for bright single-coils; a 500 kΩ pot prevents humbuckers from sounding muddy.</p>''')
      ]))

# 3 PHYSICS OF ELECTROMAGNETIC INDUCTION
slide('🔬', 'Physical Principles', 'Electromagnetic Induction: <span>Faraday\'s Law</span>',
      'Electric guitar pickups are passive electromagnetic transducers converting mechanical kinetic energy directly into alternating electrical voltage.',
      G([
          card('highlight', f'''{thumb('faraday_pickup_induction.svg', 'Faraday Law of Electromagnetic Induction in Guitar Pickups')}
               <span class="spec-pill ao3">AO3 Induction Physics</span>
               <h4>Faraday\'s Law of Induction</h4>
               <p>A permanent magnet creates a magnetic flux field ($\\Phi$). When a ferromagnetic steel or nickel string vibrates, it disturbs this field, inducing an electrical voltage ($\\varepsilon = -N \\frac{{\\Delta\\Phi}}{{\\Delta t}}$) across the coil.</p>'''),
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

# 5 THE SOLIDBODY SOLUTION: LES PAUL & LEO FENDER (1940s–1950)
slide('🪵', 'Solidbody Innovation', '1940–1950: <span>The Birth of the Solidbody</span>',
      'Eliminating the hollow soundboard decoupled the instrument from acoustic sound pressure, stopping feedback squeals forever.',
      G([
          card('highlight', f'''{thumb('les_paul_the_log_1940.jpg', 'Les Paul The Log Prototype 1940 with Epiphone Wings')}
               <span class="spec-pill ao4">AO4 Prototypes</span>
               <h4>Les Paul\'s "The Log" (1940)</h4>
               <p>Guitarist Les Paul mounted a Gibson neck and handmade pickup onto a solid 4x4-inch pine timber block, gluing archtop wings to the sides for aesthetics. It proved solid wood eliminated acoustic feedback.</p>'''),
          card('cyan-edge', f'''{thumb('solidbody_feedback_elimination.svg', 'Acoustic Cavity vs Solidbody Mechanical Vibration Dampening Diagram')}
               <span class="spec-pill ao3">AO3 Physics of Feedback</span>
               <h4>Feedback Decoupling Physics</h4>
               <p>By substituting high-density solid wood (ash, alder, mahogany) for a resonant hollow cavity, the body no longer acts as an acoustic soundboard, preventing loudspeaker vibrations from driving the top.</p>'''),
          card('acid-edge', f'''{thumb('fender_esquire_broadcaster_1950.jpg', '1950 Fender Broadcaster Solidbody Guitar')}
               <span class="spec-pill ao4">AO4 Mass Production</span>
               <h4>Fender Broadcaster (1950)</h4>
               <p>Leo Fender combined solid ash wood with modular bolt-on necks, creating the world\'s first commercially mass-produced solidbody electric guitar (renamed the Telecaster in 1951).</p>''')
      ]))

# 6 THE FENDER TELECASTER (1951)
slide('🎸', 'Fender Telecaster', '1951 Fender Telecaster: <span>The Workhorse</span>',
      'Simple, indestructible, and mass-producible, the Telecaster defined the sound of country, blues, and early rock and roll.',
      G([
          card('highlight', f'''{thumb('telecaster_bridge_ashtray_plate.jpg', 'Fender Telecaster Ashtray Steel Bridge Plate with Slanted Pickup')}
               <span class="spec-pill ao3">AO3 Bridge Architecture</span>
               <h4>Steel Baseplate &amp; "Twang"</h4>
               <p>The bridge pickup is mounted directly into a stamped steel bridge plate with copper-coated steel baseplate, focusing magnetic flux into a concentrated field for biting, cutting treble twang.</p>'''),
          card('cyan-edge', f'''{thumb('telecaster_pickup_wiring.svg', 'Telecaster 3-Way Switching and Electrical Circuit Schematic')}
               <span class="spec-pill ao3">AO3 Circuit Wiring</span>
               <h4>Pickup Pairings &amp; Blend</h4>
               <p>Paired a warm, chrome-covered neck pickup (narrow bobbin) with the aggressive bridge pickup. The 3-way selector permitted distinct rhythm and biting lead timbres from a single instrument.</p>'''),
          card('acid-edge', f'''{thumb('keith_richards_telecaster.jpg', 'Keith Richards Micawber Telecaster on Stage')}
               <span class="spec-pill ao4">AO4 Cultural Impact</span>
               <h4>The Rock &amp; Roll Sound</h4>
               <p>Heard on Muddy Waters blues tracks, Keith Richards\' open-G Rolling Stones riffs (*Honky Tonk Women*), Bruce Springsteen, and Joe Strummer (*The Clash* punk rhythm tracks).</p>''')
      ]))

# 7 THE GIBSON LES PAUL (1952)
slide('🌟', 'Gibson Les Paul', '1952 Gibson Les Paul: <span>Artisan Craftsmanship</span>',
      'Designed by Gibson president Ted McCarty and guitarist Les Paul in 1952 to rival Fender\'s solidbody dominance.',
      G([
          card('highlight', f'''{thumb('les_paul_carved_maple_mahogany.jpg', 'Carved Maple Top on Solid Mahogany Body Cross Section')}
               <span class="spec-pill ao3">AO3 Tonewood Chemistry</span>
               <h4>Mahogany Body &amp; Carved Maple Top</h4>
               <p>Combined a dense, warm solid mahogany back with a hand-carved, dense bookmatched maple cap. Maple provided fast transient snap and high-end clarity, while mahogany delivered thick low-end sustain.</p>'''),
          card('cyan-edge', f'''{thumb('gibson_p90_soapbar_pickup.jpg', 'Gibson P-90 Single Coil Soapbar Pickup')}
               <span class="spec-pill ao3">AO3 P-90 Single-Coil</span>
               <h4>The P-90 "Soapbar" Pickup</h4>
               <p>Gibson\'s original 1952 pickup: wider, shorter bobbin than Fender coils with twin Alnico bar magnets underneath steel pole screws, producing a gritty, fat, high-output single-coil roar.</p>'''),
          card('acid-edge', f'''{thumb('gibson_sg_1961.jpg', '1961 Gibson SG Standard Solidbody with Dual Humbuckers')}
               <span class="spec-pill ao4">AO4 The Solid Guitar</span>
               <h4>The Gibson SG Redesign (1961)</h4>
               <p>To reduce manufacturing weight and compete with the Stratocaster, Gibson released the double-cutaway "Solid Guitar" (SG) with thin mahogany body and unobstructed 22nd-fret neck access.</p>''')
      ]))

# 8 THE FENDER STRATOCASTER (1954)
slide('⚡', 'Fender Stratocaster', '1954 Fender Stratocaster: <span>Modern Ergonomics</span>',
      'Introduced in 1954, Leo Fender\'s Stratocaster revolutionized guitar ergonomics, hardware versatility, and sonic palettes.',
      G([
          card('highlight', f'''{thumb('fender_stratocaster_sunburst.jpg', '1954 Fender Stratocaster 2-Color Sunburst Ash Body')}
               <span class="spec-pill ao3">AO3 Ergonomic Contours</span>
               <h4>Contoured Comfort Body</h4>
               <p>Featured deep forearm and belly comfort bevels, asymmetrical double cutaways for access to upper frets, and 3 single-coil pickups arranged across neck, middle, and bridge positions.</p>'''),
          card('cyan-edge', f'''{thumb('stratocaster_tremolo_spring_cavity.jpg', 'Stratocaster Synchronized Tremolo Block and Counterbalance Springs')}
               <span class="spec-pill ao3">AO3 Mechanical Vibrato</span>
               <h4>Synchronized Vibrato Bridge</h4>
               <p>Integrated a moving bridge plate with individual string saddles, a heavy steel inertia block, and rear counterbalance springs. Allowed smooth pitch drops and shimmer while maintaining pitch return.</p>'''),
          card('acid-edge', f'''{thumb('jimi_hendrix_monterey_strat.jpg', 'Jimi Hendrix with Fender Stratocaster at Monterey Pop 1967')}
               <span class="spec-pill ao4">AO4 Iconic Artistry</span>
               <h4>Hendrix, Clapton &amp; Gilmour</h4>
               <p>Hendrix (*Voodoo Child*, *Little Wing*), David Gilmour (*Comfortably Numb*), and Stevie Ray Vaughan used the Stratocaster\'s double cutaways, vibrato arm, and pickup selector to define modern guitar.</p>''')
      ]))

# 9 HUMBUCKER PHYSICS: SETH LOVER & PAF (1957)
slide('🛡️', 'Hum Cancellation', 'Seth Lover\'s Humbucker: <span>Dual Coils &amp; Phase Math</span>',
      'In 1957, Gibson engineer Seth Lover patented the humbucking pickup, eliminating electrical noise from neon lights and transformers.',
      G([
          card('highlight', f'''{thumb('seth_lover_paf_patent_diagram.svg', 'Seth Lover 1957 US Patent Diagram for Humbucking Pickup')}
               <span class="spec-pill ao3">AO3 PAF Architecture</span>
               <h4>The Gibson PAF (1957)</h4>
               <p>Two side-by-side bobbins wired in series with opposite magnetic poles (North and South) and reverse wire winding (RWRP: Reverse Wound, Reverse Polarity) around a single Alnico bar magnet.</p>'''),
          card('cyan-edge', f'''{thumb('humbucker_phase_cancellation.svg', 'Humbucker Waveform Phase Cancellation Vector Diagram')}
               <span class="spec-pill ao3">AO3 Phase Cancellation Math</span>
               <h4>Phase Cancellation Mechanics</h4>
               <p>External 50/60 Hz EMI hits both coils with identical phase and is canceled: $\\text{{Hum}}_1 - \\text{{Hum}}_2 = 0$. Inverted string magnetic fields double audio voltage constructively: $\\text{{Sig}}_1 + \\text{{Sig}}_2 = 2\\text{{Sig}}$.</p>'''),
          card('acid-edge', f'''{thumb('gibson_paf_humbucker_open.jpg', 'Original Gibson PAF Humbucker Pickup Open View')}
               <span class="spec-pill ao3">AO3 Humbucker Output</span>
               <h4>Higher Output &amp; Midrange Punch</h4>
               <p>Series wiring doubles coil inductance and increases DC resistance to 7.5–9.0 k&#937;. Shifts the resonant peak down to ~2.5–3 kHz, producing thick, creamy distortion in valve amplifiers.</p>''')
      ]))

# 10 PICKUP PLACEMENT & HARMONIC PHYSICS
slide('🌊', 'Harmonic Physics', 'Pickup Placement: <span>Nodes, Antinodes &amp; Spectrum</span>',
      'The exact physical position of a pickup along the vibrating string dictates which harmonic overtones are amplified.',
      G([
          card('highlight', f'''{thumb('string_vibration_nodes_antinodes.svg', 'Standing Wave Harmonic Nodes and Antinodes on Vibrating String Diagram')}
               <span class="spec-pill ao3">AO3 Harmonic Physics</span>
               <h4>Vibration Nodes &amp; Antinodes</h4>
               <p>Vibrating strings exhibit stationary nodes (zero excursion) and antinodes (maximum excursion). A pickup placed near an antinode detects that specific harmonic with maximum electrical amplitude.</p>'''),
          card('cyan-edge', f'''{thumb('pickup_selector_tonal_comparison.svg', 'Tonal Frequency Response Comparison: Bridge vs Middle vs Neck')}
               <span class="spec-pill ao3">AO3 Neck vs Bridge</span>
               <h4>Bridge vs Neck Timbre</h4>
               <p><strong>Bridge Pickup:</strong> Senses near fixed anchor: low fundamental excursion, dense high harmonics (bright, biting, sharp). <strong>Neck Pickup:</strong> Senses near string center: massive fundamental excursion (warm, round, full).</p>'''),
          card('acid-edge', f'''{thumb('stratocaster_pickup_selector_5way.svg', 'Fender Stratocaster 5-Way Selector Switch Parallel Comb Filtering Diagram')}
               <span class="spec-pill ao3">AO3 Comb Filtering ("Quack")</span>
               <h4>Strat Positions 2 &amp; 4 Comb Filtering</h4>
               <p>Wiring adjacent pickups in parallel samples strings at two distinct points. Slight phase differences create comb-filter cancellation notches in the 1.5–2 kHz midrange, producing the hollow "quack" tone.</p>''')
      ]))

# 11 SEMI-HOLLOW & 12-STRING EVOLUTION (1958–1964)
slide('🎸', 'Evolutionary Variants', 'Semi-Hollow &amp; 12-String: <span>Studio Flexibility</span>',
      'In 1958, Gibson introduced the semi-hollow ES-335, bridging the gap between hollowbody warmth and solidbody sustain.',
      G([
          card('highlight', f'''{thumb('gibson_es335_centerblock.jpg', '1958 Gibson ES-335 Semi-Hollow with Solid Maple Center Block')}
               <span class="spec-pill ao4">AO4 Hybrid Construction</span>
               <h4>Gibson ES-335 Center-Block (1958)</h4>
               <p>A solid maple block runs down the center of a hollow double-cutaway body. Pickups and bridge mount into solid maple (suppressing feedback), while hollow wings add acoustic warmth and air.</p>'''),
          card('cyan-edge', f'''{thumb('rickenbacker_360_12_string.jpg', 'Rickenbacker 360-12 12-String Electric Guitar')}
               <span class="spec-pill ao4">AO4 The "Jangle" Era</span>
               <h4>Rickenbacker 360/12 (1964)</h4>
               <p>Paired 6 standard strings with 6 higher octave strings. Delivered the bright, shimmering, jangly 1960s pop sound defining The Beatles (*A Hard Day\'s Night*), The Byrds, and Tom Petty.</p>'''),
          card('acid-edge', f'''{thumb('extended_range_7_8_string.jpg', 'Extended Range 7-String and 8-String Modern Electric Guitars')}
               <span class="spec-pill ao4">AO4 Modern Extended Range</span>
               <h4>7-String &amp; Multi-Scale Guitars</h4>
               <p>From Steve Vai\'s 1990 Ibanez Universe to modern fanned-fret 8-strings: extended low-B and low-F# strings required longer scale lengths (27–28 inches) to maintain string tension and intonation clarity.</p>''')
      ]))

# 12 THE BASS REVOLUTION: FENDER PRECISION BASS (1951)
slide('🎻', 'Low-End Revolution', 'The Electric Bass: <span>Leo Fender\'s Precision Revolution</span>',
      'In 1951, Leo Fender solved the low-frequency dilemma for rhythm sections by inventing the solidbody electric bass guitar.',
      G([
          card('highlight', f'''{thumb('fender_precision_bass_1951.jpg', '1951 Fender Precision Bass Solidbody with Ash Body and Maple Neck')}
               <span class="spec-pill ao4">AO4 The Precision Revolution</span>
               <h4>The Fender Precision Bass (1951)</h4>
               <p>Replaced bulky upright acoustic double basses. The 34-inch scale neck featured guitar-style frets for precise intonation ("Precision"), allowing bassists to match drum volume on stage without feedback.</p>'''),
          card('cyan-edge', f'''{thumb('fender_split_coil_pbass_pickup.svg', 'Fender Split-Coil P-Bass Hum-Cancelling Pickup Wiring Schematic')}
               <span class="spec-pill ao3">AO3 Split-Coil Architecture</span>
               <h4>The 1957 Split-Coil Pickup</h4>
               <p>Two offset coils wired in reverse-wound, reverse-polarity (RWRP) series: one coil senses E and A strings, the other senses D and G strings. Delivers punchy low-end fundamentals while canceling mains hum.</p>'''),
          card('acid-edge', f'''{thumb('hofner_500_1_violin_bass.jpg', '1962 Hofner 500-1 Violin Bass as Played by Paul McCartney')}
               <span class="spec-pill ao4">AO4 Hollowbody Bass</span>
               <h4>Hofner 500/1 Violin Bass (1956)</h4>
               <p>A hollow spruce and maple chambered body with short 30-inch scale and flatwound strings. Made famous by Paul McCartney with The Beatles, delivering deep, warm, thumpy, upright-style low frequencies.</p>''')
      ]))

# 13 SUPERSTRATS, SHRED & FLOYD ROSE (1970s–1980s)
slide('⚡', 'High-Performance Mods', '1970s–1980s: <span>Superstrats &amp; Locking Tremolos</span>',
      'Heavy rock and virtuosic metal demanded higher gain, faster necks, and pitch-bending vibrato that would not detune.',
      G([
          card('highlight', f'''{thumb('eddie_van_halen_frankenstrat.jpg', 'Eddie Van Halen Original Frankenstrat Hybrid Guitar')}
               <span class="spec-pill ao4">AO4 DIY Innovation</span>
               <h4>The "Frankenstrat" (1977)</h4>
               <p>Eddie Van Halen married a Fender Stratocaster body with a slanted Gibson PAF humbucker. Blended Fender\'s ergonomic tremolo feel with the thick, high-gain overdrive of a Gibson humbucker.</p>'''),
          card('cyan-edge', f'''{thumb('floyd_rose_locking_tremolo.svg', 'Floyd Rose Double-Locking Tremolo System Mechanical Engineering Diagram')}
               <span class="spec-pill ao3">AO3 Locking Tremolo Physics</span>
               <h4>Floyd Rose Double-Locking System</h4>
               <p>Clamped strings rigidly at both the nut and bridge saddles. Stopped strings from slipping through friction points during aggressive dive-bombs and pull-ups, preserving pitch intonation.</p>'''),
          card('acid-edge', f'''{thumb('ibanez_jem_steve_vai.jpg', 'Ibanez JEM 777 Steve Vai Signature Superstrat Guitar')}
               <span class="spec-pill ao4">AO4 The Shred Era</span>
               <h4>The Ibanez JEM (1987)</h4>
               <p>Developed with Steve Vai: thin Wizard neck profile, 24 jumbo frets, H-S-H pickup configuration, Lion\'s Claw tremolo cavity recess, and Monkey Grip handle defining late-1980s virtuoso shred guitars.</p>''')
      ]))

# 14 ACTIVE PICKUPS & DIGITAL DSP MODELLING (1990s–PRESENT)
slide('💻', 'Modern Innovations', '1990s–Present: <span>Active Electronics &amp; DSP Modelling</span>',
      'The modern era freed guitarists from magnetic cable drag, mains hum, and microphone bleed through active preamps and digital simulation.',
      G([
          card('highlight', f'''{thumb('active_vs_passive_pickups.svg', 'Active Pickups with 9V Battery vs Passive Pickups Circuit Comparison')}
               <span class="spec-pill ao3">AO3 Active Electronics</span>
               <h4>Active Pickups (e.g. EMG 81)</h4>
               <p>Fewer copper coil windings lower inductance and suppress noise. An onboard 9V-powered discrete transistor preamp boosts signal level and buffers output to low impedance (~10 k&#937;), preventing high-end cable loss.</p>'''),
          card('cyan-edge', f'''{thumb('line6_pod_variax_modelling.jpg', 'Line 6 POD Red Kidney Bean Desktop Amp Modeller 1998')}
               <span class="spec-pill ao4">AO4 Digital Amp Simulation</span>
               <h4>Line 6 POD &amp; Digital Modelling (1998)</h4>
               <p>Used digital signal processing (DSP) to mathematically calculate non-linear valve saturation, power sag, and tone-stack EQ, allowing guitarists to record authentic tube amp tones silently direct to tape/DAW.</p>'''),
          card('acid-edge', f'''{thumb('dsp_amp_profiler_kemper_neural.svg', 'DSP Digital Amp Profiler Convolution and Speaker Cabinet Impulse Response IR Diagram')}
               <span class="spec-pill ao3">AO3 Convolution &amp; IRs</span>
               <h4>Impulse Response (IR) Convolution</h4>
               <p>Modern modellers (Kemper, Fractal, Quad Cortex) use convolution algorithms with measured Impulse Responses (IRs) to recreate the linear frequency and phase footprint of real speaker cabs and studio microphones.</p>''')
      ]))

# 15 SUMMARY ROADMAP & REVISION CHECKLIST
slide('🎓', 'Revision Summary', 'Component 3 <span>Core Vocabulary &amp; Exam Checklist</span>',
      'Master the essential terminology, physical principles, and historical milestones required for Edexcel Component 3.',
      G([
          card('highlight', f'''
               <span class="spec-pill ao3">Transducer Physics</span>
               <h4>1. Electromagnetic Principles</h4>
               <p><strong>Faraday\'s Law:</strong> $\\varepsilon = -N \\frac{{\\Delta\\Phi}}{{\\Delta t}}$. Ferromagnetic steel strings vibrate inside permanent magnet fields, inducing audio AC voltage in copper coils. Nylon strings cannot work.</p>
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

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Electric Guitar: Anatomy, Physics &amp; Evolution | A-Level Music Technology Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);"></script>
  <style>
    :root {{
      --bg-dark: #080d1a;
      --bg-card: #0e1626;
      --bg-surface: #142038;
      --accent-purple: #f59e0b;
      --accent-purple-glow: rgba(245, 158, 11, 0.35);
      --accent-cyan: #00C1F0;
      --accent-cyan-glow: rgba(56, 189, 248, 0.35);
      --accent-acid: #22c55e;
      --accent-amber: #f59e0b;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-purple: rgba(245, 158, 11, 0.35);
      --border-cyan: rgba(56, 189, 248, 0.35);
      --font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font);
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px;
      -webkit-font-smoothing: antialiased;
    }}

    .deck-wrapper {{
      width: 100%;
      max-width: 1120px;
      height: calc(100vh - 16px);
      min-height: 590px;
      max-height: 670px;
      background: radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.15) 0%, rgba(14, 17, 36, 0) 70%), var(--bg-card);
      border: 1px solid var(--border-purple);
      border-radius: 16px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }}

    /* Top Utility Bar */
    .deck-topbar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background: rgba(8, 13, 26, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-subtle);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      z-index: 10;
    }}

    .badge-hub {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid var(--border-purple);
      color: #fbbf24;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      text-transform: uppercase;
    }}

    .badge-pulse {{
      width: 7px;
      height: 7px;
      background: var(--accent-purple);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-purple);
      animation: pulse 2s infinite;
    }}

    @keyframes pulse {{
      0%, 100% {{ opacity: 1; transform: scale(1); }}
      50% {{ opacity: 0.4; transform: scale(0.85); }}
    }}

    .deck-topic-title {{
      color: var(--text-muted);
      font-size: 12px;
    }}

    .deck-topic-title strong {{
      color: #fff;
    }}

    /* Slides Viewport */
    .slides-viewport {{
      flex: 1;
      position: relative;
      overflow: hidden;
    }}

    .slide {{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 24px 36px 16px 36px;
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      transform: translateX(30px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      overflow-y: auto;
    }}

    .slide.active {{
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
    }}

    /* Slide Typography */
    .slide-eyebrow {{
      font-size: 11.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--accent-purple);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .slide-heading {{
      font-size: clamp(20px, 3vw, 26px);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.5px;
      color: #ffffff;
      margin-bottom: 8px;
    }}

    .slide-heading span {{
      background: linear-gradient(135deg, #f59e0b 0%, #00C1F0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}

    .slide-lead {{
      color: #cbd5e1;
      font-size: 13.5px;
      line-height: 1.5;
      max-width: 860px;
      margin-bottom: 14px;
    }}

    /* Grids & Cards */
    .grid-3 {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }}

    @media (max-width: 768px) {{
      .grid-3 {{
        grid-template-columns: 1fr;
        gap: 12px;
      }}
    }}

    .info-card {{
      background: rgba(20, 32, 56, 0.65);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px 16px;
      transition: all 0.2s;
    }}

    .info-card:hover {{
      border-color: rgba(245, 158, 11, 0.4);
      background: rgba(20, 32, 56, 0.9);
      transform: translateY(-2px);
    }}

    .info-card.highlight {{
      border-left: 4px solid var(--accent-purple);
    }}

    .info-card.cyan-edge {{
      border-left: 4px solid var(--accent-cyan);
    }}

    .info-card.acid-edge {{
      border-left: 4px solid var(--accent-acid);
    }}

    .spec-pill {{
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 7px;
      border-radius: 4px;
      margin-bottom: 6px;
    }}

    .spec-pill.ao3 {{
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }}

    .spec-pill.ao4 {{
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }}

    .info-card h4 {{
      font-size: 14.5px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
      line-height: 1.25;
    }}

    .info-card p {{
      font-size: 12.5px;
      color: #94a3b8;
      line-height: 1.5;
    }}

    .info-card p strong {{
      color: #f1f5f9;
    }}

    .card-thumb {{
      margin-bottom: 10px;
      overflow: hidden;
      border-radius: 8px;
    }}

    .slide-thumb {{
      cursor: zoom-in !important;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }}

    .slide-thumb:hover {{
      transform: translateY(-2px) scale(1.02);
      border-color: rgba(245, 158, 11, 0.6) !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5) !important;
    }}

    /* Bottom Deck Controls */
    .deck-controls {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: rgba(8, 13, 26, 0.95);
      border-top: 1px solid var(--border-subtle);
      z-index: 10;
    }}

    .nav-btn {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }}

    .nav-btn:hover:not(:disabled) {{
      background: var(--accent-purple);
      color: #080d1a;
      border-color: var(--accent-purple);
      box-shadow: 0 0 15px var(--accent-purple-glow);
    }}

    .nav-btn:disabled {{
      opacity: 0.3;
      cursor: not-allowed;
    }}

    .progress-container {{
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      max-width: 320px;
      margin: 0 20px;
    }}

    .progress-track {{
      flex: 1;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      overflow: hidden;
    }}

    .progress-fill {{
      height: 100%;
      background: linear-gradient(90deg, var(--accent-purple) 0%, var(--accent-cyan) 100%);
      width: 6.66%;
      border-radius: 10px;
      transition: width 0.3s ease;
    }}

    .slide-counter {{
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 700;
      white-space: nowrap;
    }}

    /* Lightbox Modal */
    .image-modal-backdrop {{
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px);
      z-index: 10000;
      align-items: center;
      justify-content: center;
      padding: 20px;
      cursor: zoom-out;
    }}

    .image-modal-backdrop.open {{
      display: flex;
    }}

    .image-modal-content {{
      position: relative;
      max-width: 90vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: 14px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95);
      cursor: default;
      animation: modalZoomIn 0.2s ease-out;
    }}

    @keyframes modalZoomIn {{
      from {{ transform: scale(0.92); opacity: 0; }}
      to {{ transform: scale(1); opacity: 1; }}
    }}

    .image-modal-content img {{
      max-width: 86vw;
      max-height: 74vh;
      object-fit: contain;
      border-radius: 8px;
      display: block;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }}

    .image-modal-caption {{
      margin-top: 10px;
      font-size: 13.5px;
      color: #f1f5f9;
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.3px;
      max-width: 80vw;
    }}

    .image-modal-close {{
      position: absolute;
      top: -12px;
      right: -12px;
      background: #ef4444;
      color: #fff;
      border: 2px solid #fff;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 18px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
      transition: transform 0.2s, background 0.2s;
      z-index: 10001;
    }}

    .image-modal-close:hover {{
      background: #dc2626;
      transform: scale(1.1);
    }}

    /* Video Modal */
    .video-modal-backdrop {{
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }}

    .video-modal-backdrop.open {{
      display: flex;
    }}

    .video-modal-content {{
      background: var(--bg-card);
      border: 1px solid var(--border-purple);
      border-radius: 16px;
      max-width: 800px;
      width: 100%;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px var(--accent-purple-glow);
    }}

    .video-modal-header {{
      padding: 12px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(0, 0, 0, 0.4);
      border-bottom: 1px solid var(--border-subtle);
    }}

    .video-modal-title {{
      font-size: 13.5px;
      font-weight: 800;
      color: #fff;
    }}

    .close-modal-btn {{
      background: transparent;
      border: none;
      color: #cbd5e1;
      font-size: 22px;
      cursor: pointer;
      line-height: 1;
    }}

    .close-modal-btn:hover {{
      color: #fff;
    }}

    .video-player-wrapper {{
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      background: #000;
    }}

    .video-player-wrapper iframe {{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }}
  </style>
</head>
<body>

  <div class="deck-wrapper">
    <!-- Top Utility Bar -->
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music Technology in Context</div>
      <div class="deck-topic-title">Topic: <strong>The Electric Guitar (Anatomy, Physics &amp; Evolution)</strong></div>
    </header>

    <!-- Slides Viewport -->
    <main class="slides-viewport">
      {''.join(slides_html)}
    </main>

    <!-- Bottom Deck Controls -->
    <footer class="deck-controls">
      <button class="nav-btn" id="prevBtn" onclick="prevSlide()" disabled>&larr; Previous</button>
      <div class="progress-container">
        <span class="slide-counter" id="slideCounter">Slide 1 of {TOTAL}</span>
        <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
      </div>
      <button class="nav-btn" id="nextBtn" onclick="nextSlide()">Next &rarr;</button>
    </footer>
  </div>

  <!-- Image Lightbox Modal -->
  <div class="image-modal-backdrop" id="imageModal" onclick="closeLightbox()">
    <div class="image-modal-content" onclick="event.stopPropagation()">
      <button class="image-modal-close" onclick="closeLightbox()" title="Close (Esc)">&times;</button>
      <img id="imageModalImg" src="" alt="Expanded View">
      <div class="image-modal-caption" id="imageModalCaption"></div>
    </div>
  </div>

  <!-- Video Modal -->
  <div class="video-modal-backdrop" id="videoModal">
    <div class="video-modal-content">
      <div class="video-modal-header">
        <span class="video-modal-title" id="videoModalTitle">Video Clip</span>
        <button class="close-modal-btn" onclick="closeVideo()">&times;</button>
      </div>
      <div class="video-player-wrapper">
        <iframe id="videoIframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

    // Lightbox modal logic
    const imageModal = document.getElementById('imageModal');
    const imageModalImg = document.getElementById('imageModalImg');
    const imageModalCaption = document.getElementById('imageModalCaption');

    function openLightbox(src, caption) {{
      if (!imageModal || !imageModalImg) return;
      imageModalImg.src = src;
      if (imageModalCaption) imageModalCaption.textContent = caption || '';
      imageModal.classList.add('open');
      imageModal.style.display = 'flex';
    }}

    function closeLightbox() {{
      if (!imageModal) return;
      imageModal.classList.remove('open');
      imageModal.style.display = 'none';
      if (imageModalImg) imageModalImg.src = '';
    }}

    function openVideo(videoId, title) {{
      const vm = document.getElementById('videoModal');
      const vTitle = document.getElementById('videoModalTitle');
      const vIframe = document.getElementById('videoIframe');
      if (vTitle) vTitle.textContent = title;
      if (vIframe) vIframe.src = `https://www.youtube.com/embed/${{videoId}}?autoplay=1`;
      if (vm) {{
        vm.classList.add('open');
        vm.style.display = 'flex';
      }}
    }}

    function closeVideo() {{
      const vm = document.getElementById('videoModal');
      const vIframe = document.getElementById('videoIframe');
      if (vIframe) vIframe.src = '';
      if (vm) {{
        vm.classList.remove('open');
        vm.style.display = 'none';
      }}
    }}

    function updateDeck() {{
      slides.forEach((slide, idx) => {{
        slide.classList.toggle('active', idx === currentSlide);
      }});
      if (prevBtn) prevBtn.disabled = (currentSlide === 0);
      if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides - 1);
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
          closeLightbox();
          return;
        }}
      }}
      const vm = document.getElementById('videoModal');
      if (vm && vm.classList.contains('open')) {{
        if (e.key === 'Escape') {{
          closeVideo();
          return;
        }}
      }}
      if (e.key === 'ArrowRight' || e.key === 'PageDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
    }});

    updateDeck();
  </script>
</body>
</html>'''

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Generated {OUT} ({len(html)} bytes, {TOTAL} slides)")
