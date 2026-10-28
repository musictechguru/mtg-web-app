"""
Builds public/interactive-slide-the-bass-guitar.html
15-Slide Interactive Curriculum Deck on The Bass Guitar & Low-End Recording Technology.
Edexcel Component 3: Music Technology in Context.
Features: 42 100% unique images & diagrams with containment, lightbox modal zoom, and bottom deck controls.
"""
import os

OUT = 'public/interactive-slide-the-bass-guitar.html'
IMG = '/images/slides/the_bass_guitar'

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
slide('📋', 'Specification Roadmap', 'The Bass Guitar: <span>Component 3 Syllabus Matrix</span>',
      'The bass guitar anchors modern music production, bridging harmonic chord progressions and rhythmic percussion.',
      G([
          card('highlight', f'''{thumb('fender_precision_bass_1951_original.jpg', '1951 Fender Precision Bass Patent Diagram and Slab Body')}
               <span class="spec-pill ao4">AO4 Historical Milestones</span>
               <h4>The Solidbody Revolution</h4>
               <p>Leo Fender\'s 1951 Precision Bass replaced bulky upright double basses with a portable, fretted 34-inch instrument that could compete with loud drum kits.</p>'''),
          card('cyan-edge', f'''{thumb('active_vs_passive_bass_preamp.svg', 'Active vs Passive Bass Preamplifier Circuit Comparison')}
               <span class="spec-pill ao3">AO3 Transducer Physics</span>
               <h4>Electronics &amp; Preamps</h4>
               <p>Passive high-impedance split-coils, dual single-coils, and active 9V onboard preamps (Baxandall EQ) offer low output impedance and massive tonal shaping.</p>'''),
          card('acid-edge', f'''{thumb('bass_revision_matrix_summary.svg', 'Bass Guitar Syllabus Revision Matrix and Core Vocabulary Summary')}
               <span class="spec-pill ao3">AO3 Studio Engineering</span>
               <h4>Studio DI &amp; Amplification</h4>
               <p>Direct Injection (DI boxes with Jensen/Triad transformers) allowed direct-to-console tracking, paired with 300W tube heads (Ampeg SVT) and multi-track phase alignment.</p>''')
      ]))

# 2 ANATOMY & SCALE LENGTH PHYSICS
slide('🎸', 'Instrument Anatomy', 'Bass Anatomy: <span>Scale Length &amp; Tension Physics</span>',
      'The vibrating string length (scale length) dictates string tension, physical elasticity, and low-frequency overtone clarity.',
      G([
          card('highlight', f'''{thumb('bass_anatomy_and_scale_length.svg', 'Scale Length Comparison: 34-Inch Long Scale vs 30-Inch Short Scale')}
               <span class="spec-pill ao3">AO3 Mechanical Physics</span>
               <h4>34" Long vs 30" Short Scale</h4>
               <p><strong>34" Long Scale (Fender):</strong> High string tension produces articulate attack, defined fundamentals, and piano-like sustain. <strong>30" Short Scale (H&#246;fner):</strong> Lower tension creates a tubby, darker fundamental thud.</p>'''),
          card('cyan-edge', f'''{thumb('bass_bridge_high_mass_badass.jpg', 'High-Mass Bass Bridge Saddle Assembly with Heavy Baseplate')}
               <span class="spec-pill ao3">AO3 Mechanical Coupling</span>
               <h4>High-Mass Bridges &amp; Sustain</h4>
               <p>Leo Quan "Badass" and modern high-mass brass bridges increase contact mass, coupling heavy low-frequency string vibrations into the body wood and preventing transient energy absorption.</p>'''),
          card('acid-edge', f'''{thumb('extended_scale_5_string_tension_chart.svg', '5-String Bass Tension Chart Comparing 34-Inch vs 35-Inch Scale')}
               <span class="spec-pill ao3">AO3 Extended Range</span>
               <h4>Extended Scale for Low B (35")</h4>
               <p>To produce a clear 30.9 Hz Low-B without floppiness or fret buzz, modern 5-string basses utilize 35-inch or multi-scale (34"–37" fanned fret) designs to increase physical string tension.</p>''')
      ]))

# 3 PHYSICS OF LOW FREQUENCIES
slide('🔬', 'Acoustic Physics', 'Low Frequencies: <span>Mass, Wavelengths &amp; Energy</span>',
      'Low audio frequencies exhibit vast acoustic wavelengths and require massive electrical amplification power.',
      G([
          card('highlight', f'''{thumb('bass_low_frequency_physics.svg', 'Low-Frequency Acoustic Wavelengths and String Mass Diagram')}
               <span class="spec-pill ao3">AO3 Acoustic Physics</span>
               <h4>Wavelength Scale: 41.2 Hz Low-E</h4>
               <p>The fundamental frequency of a bass Low-E is 41.2 Hz, which possesses an acoustic wavelength of 8.32 metres in air! A 5-string Low-B (30.9 Hz) spans over 11.1 metres, creating standing waves in studios.</p>'''),
          card('cyan-edge', f'''{thumb('flatwound_vs_roundwound_strings_photo.jpg', 'Close-Up Photograph of Flatwound Ribbon Wire vs Roundwound Ridges')}
               <span class="spec-pill ao3">AO3 String Construction</span>
               <h4>String Gauge &amp; Core Mass</h4>
               <p>Heavy bass strings (.045" to .105" or .130") feature a steel core wrapped in outer nickel or stainless steel windings, providing the heavy inertial mass required to oscillate at sub-bass frequencies.</p>'''),
          card('acid-edge', f'''{thumb('flatwound_vs_roundwound_frequency_response.svg', 'Frequency Response Curves Comparing Flatwound vs Roundwound Bass Strings')}
               <span class="spec-pill ao3">AO3 Frequency Spectrum</span>
               <h4>Flatwound vs Roundwound Timbre</h4>
               <p><strong>Flatwounds:</strong> Muted upper harmonics, heavy fundamental thud, zero finger squeak (Motown/reggae). <strong>Roundwounds:</strong> Bright presence peak, metallic bite, extended slap sustain.</p>''')
      ]))

# 4 HISTORICAL ORIGINS: THE UPRIGHT CRISIS (1930s–1940s)
slide('🎻', 'Historical Origins', '1930s–1940s: <span>The Upright Double Bass Crisis</span>',
      'In swing big bands and dance orchestras, acoustic upright double basses struggled against brass and drum volumes.',
      G([
          card('highlight', f'''{thumb('upright_double_bass_acoustic.jpg', 'Acoustic Upright Double Bass Carved Spruce Body')}
               <span class="spec-pill ao4">AO4 Acoustic Limitations</span>
               <h4>The Acoustic Volume Ceiling</h4>
               <p>Acoustic upright basses produced low acoustic output that was easily drowned out by horn sections. Bassists had to pluck gut strings violently ("slap style") to produce audible percussive clicks.</p>'''),
          card('cyan-edge', f'''{thumb('acoustic_double_bass_vs_electric_comparison.svg', 'Comparison Diagram: Upright Bass Bleed and Feedback vs Solidbody Solution')}
               <span class="spec-pill ao3">AO3 Acoustic Feedback</span>
               <h4>Stage Feedback &amp; Drum Bleed</h4>
               <p>When microphones or early contact pickups were attached to hollow double basses, sound pressure from PA systems caused violent cavity resonance feedback, while loud drum kits bled into the bass mic.</p>'''),
          card('acid-edge', f'''{thumb('fender_bassman_tweed_amp.jpg', '1950s Tweed Fender Bassman 4x10 Tube Combo Amplifier')}
               <span class="spec-pill ao4">AO4 Early Bass Amplification</span>
               <h4>The Fender Bassman (1952)</h4>
               <p>Leo Fender introduced the 5B6 / 5F6-A Bassman combo amplifier with 4&#215;10-inch Jensen speakers, giving bassists dedicated electronic amplification with open-back cabinet projection.</p>''')
      ]))

# 5 THE 1951 FENDER PRECISION BASS
slide('⚡', 'Fender Precision Bass', '1951 Fender Precision: <span>The Revolution</span>',
      'Leo Fender combined solid ash wood, guitar frets, and an electromagnetic pickup to transform popular rhythm sections.',
      G([
          card('highlight', f'''{thumb('james_jamerson_precision_bass.jpg', 'Legendary Motown Bassist James Jamerson with 1962 Fender Precision Bass')}
               <span class="spec-pill ao4">AO4 Motown Pioneer</span>
               <h4>James Jamerson &amp; "The Funk Machine"</h4>
               <p>Using his 1962 P-Bass with heavy La Bella flatwound strings and one finger ("The Hook"), Jamerson recorded virtually every legendary Motown hit (The Temptations, Marvin Gaye, Stevie Wonder).</p>'''),
          card('cyan-edge', f'''{thumb('palm_muting_foam_mute_damping.svg', 'Foam Bridge Muting and Palm Damping Waveform Envelope Comparison')}
               <span class="spec-pill ao3">AO3 Mechanical Damping</span>
               <h4>The Motown "Thud" (Foam Muting)</h4>
               <p>Foam rubber dampening under bridge covers cut string sustain to &lt;0.5 seconds. This fast decay prevented low-end mud, leaving total acoustic space for kick drum transients in mono mixes.</p>'''),
          card('acid-edge', f'''{thumb('motown_wolfbox_di.jpg', 'Historic Motown Wolfbox Passive DI Box with Triad Transformer')}
               <span class="spec-pill ao4">AO4 Legendary Hardware</span>
               <h4>The Motown "Wolfbox" DI (1960s)</h4>
               <p>Engineered by Motown technician Ed Wolfrum using a precision Triad A-11J audio transformer. It converted Jamerson\'s P-Bass into a clean, hum-free, high-fidelity studio signal with zero room bleed.</p>''')
      ]))

# 6 THE 1957 SPLIT-COIL INNOVATION
slide('🛡️', 'Hum Cancellation', '1957 Split-Coil Pickup: <span>RWRP Hum Cancellation</span>',
      'In 1957, Leo Fender redesigned the Precision Bass with an offset split-coil pickup that eradicated electrical hum.',
      G([
          card('highlight', f'''{thumb('fender_precision_bass_1957_sunburst.jpg', '1958 Fender Precision Bass Sunburst with Split-Coil Pickup')}
               <span class="spec-pill ao4">AO4 Ergonomic Redesign</span>
               <h4>The 1957 Contoured P-Bass</h4>
               <p>Upgraded with Stratocaster-style forearm and belly comfort contours, a gold anodized aluminum pickguard, and the definitive staggered two-piece split-coil humbucking pickup.</p>'''),
          card('cyan-edge', f'''{thumb('p_bass_split_coil_rwrp_physics.svg', 'Split-Coil Series Wiring Schematic with North and South Pole Orientations')}
               <span class="spec-pill ao3">AO3 RWRP Phase Math</span>
               <h4>Split-Coil RWRP Operation</h4>
               <p>One coil senses E &amp; A strings; the other senses D &amp; G strings. Wired in series with reverse winding and opposing magnetic poles, external 50/60 Hz hum self-cancels while string signals sum cleanly.</p>'''),
          card('acid-edge', f'''{thumb('bass_pickup_placement_timbre.svg', 'Bass Pickup Harmonic Spectrum: Neck vs P-Bass Sweet Spot vs Bridge Growl')}
               <span class="spec-pill ao3">AO3 Harmonic Placement</span>
               <h4>The P-Bass "Sweet Spot"</h4>
               <p>Positioned exactly at ~1/3 of the scale length, the P-Bass pickup balances fundamental low-end warmth with aggressive 700 Hz–1.2 kHz midrange bark, slicing through dense rock drum kits.</p>''')
      ]))

# 7 THE 1960 FENDER JAZZ BASS
slide('🎷', 'Fender Jazz Bass', '1960 Fender Jazz Bass: <span>Tonal Versatility</span>',
      'Designed as a deluxe model for upright jazz bassists seeking narrower necks and dual-pickup frequency versatility.',
      G([
          card('highlight', f'''{thumb('fender_jazz_bass_1960.jpg', '1960s Fender Jazz Bass with Offset Waist Body and Dual Pickups')}
               <span class="spec-pill ao4">AO4 Deluxe Evolution</span>
               <h4>Offset Waist &amp; Narrow Neck</h4>
               <p>Featured an ergonomic asymmetrical offset waist body and a slim 1.5-inch nut width (compared to the P-Bass 1.75"), facilitating rapid fingering and walking jazz basslines.</p>'''),
          card('cyan-edge', f'''{thumb('jazz_bass_dual_single_coil_wiring.svg', 'Jazz Bass Dual Volume and Master Tone Circuit Schematic')}
               <span class="spec-pill ao3">AO3 Dual Pickup Blend</span>
               <h4>Two Narrow Single-Coil Pickups</h4>
               <p>Equipped with two distinct pickups: a warm neck pickup and a biting, harmonically rich bridge pickup. Two individual volume knobs allowed continuous blend combinations.</p>'''),
          card('acid-edge', f'''{thumb('jaco_pastorius_fretless_bass_of_doom.jpg', 'Jaco Pastorius Performing with his Fretless Bass of Doom')}
               <span class="spec-pill ao4">AO4 Virtuoso Expression</span>
               <h4>Jaco Pastorius &amp; Bridge Pickup Growl</h4>
               <p>Soloing on his fretless 1962 Jazz Bass, Jaco favoured the bridge pickup with tone rolled back slightly, producing an unmistakable vocal midrange bark with Weather Report (*Birdland*).</p>''')
      ]))

# 8 SHORT-SCALE & HOLLOWBODY BASSES (1956–1960s)
slide('🎻', 'Hollowbody & Short-Scale', 'H&#246;fner &amp; Short-Scale: <span>The British Invasion</span>',
      'European manufacturers created light, compact violin-style and semi-hollow basses that defined early British rock and roll.',
      G([
          card('highlight', f'''{thumb('hofner_500_1_beatles_bass.jpg', '1960s Hofner 500-1 Violin Bass with Hollow Spruce Chamber')}
               <span class="spec-pill ao4">AO4 European Design</span>
               <h4>The H&#246;fner 500/1 Violin Bass (1956)</h4>
               <p>Walter H&#246;fner built a fully hollow, carved spruce and maple chambered body with violin aesthetics, weighing only ~2.1 kg (under 5 lbs) with two narrow German single-coil pickups.</p>'''),
          card('cyan-edge', f'''{thumb('paul_mccartney_hofner_live.jpg', 'Paul McCartney with Left-Handed Hofner 500-1 Bass on Stage')}
               <span class="spec-pill ao4">AO4 McCartney &amp; The Beatles</span>
               <h4>Paul McCartney &amp; Abbey Road</h4>
               <p>McCartney bought a symmetrical left-handed H&#246;fner in Hamburg in 1961. Paired with flatwound strings, it gave early Beatles hits (*She Loves You*, *All My Loving*) a woody, melodic bounce.</p>'''),
          card('acid-edge', f'''{thumb('gibson_eb3_bass.jpg', 'Gibson EB-3 SG-Style Solidbody Bass with Mudbucker and Mini-Humbucker')}
               <span class="spec-pill ao4">AO4 Gibson Mudbucker</span>
               <h4>The Gibson EB-0 &amp; EB-3 Basses</h4>
               <p>Gibson mounted a massive 30 k&#937; humbucker ("Mudbucker") right against the fingerboard on an SG mahogany body, creating an ultra-dark, thunderous bass roar (Jack Bruce in Cream).</p>''')
      ]))

# 9 RICKENBACKER & PROG ROCK DRIVE (1960s–1970s)
slide('⚡', 'Progressive Rock', 'Rickenbacker 4001: <span>Treble Bite &amp; Stereo Output</span>',
      'The transition to heavy progressive rock required aggressive upper-midrange punch that could cut through organ and guitar walls.',
      G([
          card('highlight', f'''{thumb('rickenbacker_4001_bass.jpg', '1970s Rickenbacker 4001 Bass with Maple Neck-Through Construction')}
               <span class="spec-pill ao4">AO4 Neck-Through Rigidity</span>
               <h4>Neck-Through Maple Construction</h4>
               <p>Solid maple neck-through-body design with walnut stringers provided tremendous sustain and bright acoustic resonance, paired with a horseshoe or high-gain single-coil bridge pickup.</p>'''),
          card('cyan-edge', f'''{thumb('pete_townshend_john_entwistle_bass.jpg', 'The Who Bassist John Entwistle Performing Live')}
               <span class="spec-pill ao4">AO4 Entwistle\'s Lead Bass</span>
               <h4>John Entwistle &amp; Rotosound Strings</h4>
               <p>The Who\'s John Entwistle worked with Rotosound to invent steel roundwound strings (Swing Bass 66), transforming bass from quiet rhythm support into a clattering, overdriven lead instrument.</p>'''),
          card('acid-edge', f'''{thumb('alembic_custom_bass.jpg', 'Alembic Custom Active Bass with Exotic Tonewoods and Onboard Preamp')}
               <span class="spec-pill ao4">AO4 Hi-Fi Custom Basses</span>
               <h4>Alembic &amp; Active Filtering (1969)</h4>
               <p>Pioneered active electronics for the Grateful Dead: low-impedance pickups, onboard parametric state-variable active filters, and multi-laminate exotic tonewoods for wide hi-fi fidelity.</p>''')
      ]))

# 10 ACTIVE REVOLUTION: MUSIC MAN STINGRAY (1976)
slide('🔋', 'Active Electronics', '1976 Music Man StingRay: <span>Active 9V Punch</span>',
      'Leo Fender\'s 1976 masterpiece introduced active onboard electronics and parallel humbucking coils to commercial bass production.',
      G([
          card('highlight', f'''{thumb('music_man_stingray_bass.jpg', '1976 Music Man StingRay Bass with Large Humbucker and 3-Bolt Neck')}
               <span class="spec-pill ao4">AO4 Landmark Active Bass</span>
               <h4>The Music Man StingRay (1976)</h4>
               <p>Equipped with a massive 8-pole Alnico humbucker in the sweet spot and an onboard 9V-battery powered preamp with active 2-band (and later 3-band) boost/cut Baxandall equalization.</p>'''),
          card('cyan-edge', f'''{thumb('music_man_stingray_preamp_schematic.svg', 'Active 9V Preamp Circuit Schematic Showing Boost and Cut Tone Controls')}
               <span class="spec-pill ao3">AO3 Circuit Physics</span>
               <h4>Parallel Coils &amp; Active Buffering</h4>
               <p>Humbucker coils were wired in parallel (not series), giving a scooped, bright frequency response. The active preamp buffered the output to low-Z, preventing high-frequency cable capacitance loss.</p>'''),
          card('acid-edge', f'''{thumb('flea_stingray_live.jpg', 'Flea Performing Live with Music Man StingRay Bass')}
               <span class="spec-pill ao4">AO4 Modern Funk &amp; Rock</span>
               <h4>Bernard Edwards &amp; Flea</h4>
               <p>The StingRay\'s crisp attack defined disco grooves (Bernard Edwards with Chic, *Good Times*) and explosive 1990s alternative funk-rock (Flea with Red Hot Chili Peppers, *Give It Away*).</p>''')
      ]))

# 11 PLAYING TECHNIQUES: FINGERS, PICK & SLAP
slide('🖐️', 'Performance Techniques', 'Bass Techniques: <span>Fingerstyle, Plectrum &amp; Slap</span>',
      'The mechanical method of exciting the bass string directly shapes the harmonic transient attack and spectral envelope.',
      G([
          card('highlight', f'''{thumb('slap_and_pop_technique_mechanics.svg', 'Slap and Pop Biomechanics: Thumb Thump and Index Pop Physics')}
               <span class="spec-pill ao3">AO3 Percussive Mechanics</span>
               <h4>Larry Graham\'s Slap &amp; Pop (1968)</h4>
               <p><strong>Thumb Slap:</strong> Knuckle drives Low E/A against metal frets, emulating acoustic kick drum thump. <strong>Finger Pop:</strong> Index finger snaps D/G upward against frets, emulating snare crack.</p>'''),
          card('cyan-edge', f'''{thumb('larry_graham_slap_bass.jpg', 'Larry Graham Performing with Graham Central Station')}
               <span class="spec-pill ao4">AO4 Slap Pioneer</span>
               <h4>Larry Graham (Sly &amp; Family Stone)</h4>
               <p>Invented the technique when Sly and the Family Stone lacked a drummer. The percussive slap &amp; pop approach revolutionized funk, disco, R&amp;B, and fusion basslines.</p>'''),
          card('acid-edge', f'''{thumb('fretless_bass_mwah_physics.svg', 'Fretless Bass String Grazing Against Fingerboard Producing Mwah Bloom')}
               <span class="spec-pill ao3">AO3 Expressive Bloom</span>
               <h4>Fingerstyle vs Plectrum Attack</h4>
               <p><strong>Fingerstyle:</strong> Soft finger pad dampens high overtones, producing deep round fundamentals. <strong>Plectrum:</strong> Hard plastic pick generates sharp, cutting 2 kHz transient clicks for rock and punk.</p>''')
      ]))

# 12 STAGE AMPLIFICATION: AMPEG SVT & 8x10 (1969)
slide('📢', 'Stage Amplification', 'Ampeg SVT: <span>300 Watts &amp; The 8x10 "Fridge"</span>',
      'To fill stadium arenas alongside overdriven Marshall guitar stacks, bass amplification required unprecedented valve power.',
      G([
          card('highlight', f'''{thumb('ampeg_svt_classic_head.jpg', 'Ampeg SVT All-Tube 300 Watt Bass Amplifier Head')}
               <span class="spec-pill ao4">AO4 300-Watt Monster</span>
               <h4>Ampeg SVT (1969)</h4>
               <p>Equipped with 6&#215; 6550 power tubes delivering 300W RMS clean power. Giant transformers provided the massive current reservoir required to amplify sub-bass frequencies without power sag distortion.</p>'''),
          card('cyan-edge', f'''{thumb('ampeg_8x10_fridge_cabinet.jpg', 'Ampeg 8x10 Sealed Bass Cabinet The Fridge')}
               <span class="spec-pill ao3">AO3 Cabinet Physics</span>
               <h4>The 8&#215;10 Infinite Baffle Cabinet</h4>
               <p>Four isolated sealed chambers (no acoustic ports) housed 8&#215; 10-inch speakers. The infinite baffle design damped cone excursions, yielding tight, punchy transient response with zero low-end flab.</p>'''),
          card('acid-edge', f'''{thumb('ampeg_svt_tube_amplifier_schematic.svg', 'Ampeg SVT Vacuum Tube Power Stage and 8x10 Speaker Wiring Schematic')}
               <span class="spec-pill ao3">AO3 Driver Surface Area</span>
               <h4>Multi-Driver Acoustic Coupling</h4>
               <p>8&#215; 10-inch speakers provide ~628 sq. inches of driver area (more than two 15" cones!), moving massive air volume while 10" cones retain lightning-fast transient response to finger plucks.</p>''')
      ]))

# 13 STUDIO DIRECT INJECTION (DI) RECORDING
slide('🎛️', 'Studio Engineering', 'Studio DI Recording: <span>Direct Injection &amp; Phase</span>',
      'In professional recording studios, bass is almost universally tracked using a Direct Injection (DI) box direct to tape/DAW.',
      G([
          card('highlight', f'''{thumb('direct_injection_di_transformer_schematic.svg', 'Direct Injection Transformer Isolation and Balancing Schematic')}
               <span class="spec-pill ao3">AO3 Studio DI Principles</span>
               <h4>The Role of the Direct Box</h4>
               <p>Transforms high-impedance unbalanced instrument output into low-impedance balanced microphone level, breaking ground loops and preventing cable high-frequency capacitance loss.</p>'''),
          card('cyan-edge', f'''{thumb('countryman_type85_active_di.jpg', 'Radial JDI and Countryman Active FET Studio Direct Boxes')}
               <span class="spec-pill ao3">AO3 DI Circuitry</span>
               <h4>Passive vs Active DI Boxes</h4>
               <p><strong>Passive DI (Jensen Transformer):</strong> Requires no power; transformer saturation adds warm analog colour. <strong>Active DI (FET / Phantom):</strong> Ultra-high input impedance, ideal for passive vintage pickups.</p>'''),
          card('acid-edge', f'''{thumb('bass_mic_plus_di_phase_alignment.svg', 'Bass Tracking DI plus Mic Signal Waveform Alignment in Digital Audio Workstation')}
               <span class="spec-pill ao3">AO3 Comb Filtering</span>
               <h4>Combining DI + Mic (Phase Alignment)</h4>
               <p>Sound travels through speaker air to the mic at ~343 m/s (~1 ms delay), while DI travels instantaneously. Summing without time-aligning in the DAW causes comb filtering that destroys low-end punch.</p>''')
      ]))

# 14 MODERN ERA: FRETLESS, 5-STRING & DSP MODELLING
slide('💻', 'Modern Innovations', 'Modern Bass: <span>Extended Range, Fretless &amp; DSP</span>',
      'From Jaco\'s singing fretless expression to low-B 5-strings and digital amplifier profiling, modern bass technology is limitless.',
      G([
          card('highlight', f'''{thumb('warwick_thumb_bass.jpg', 'Warwick Thumb Bass with Exotic Tonewoods and Active Pickups')}
               <span class="spec-pill ao4">AO4 Boutique Innovations</span>
               <h4>Boutique Active Basses (1980s–90s)</h4>
               <p>Manufacturers like Warwick, Spector, and Ken Smith introduced ergonomic curved bodies, brass frets, high-voltage active preamps, and dense African tonewoods (wenge, ovangkol, bubinga).</p>'''),
          card('cyan-edge', f'''{thumb('5_string_bass_extended_range.jpg', 'Modern 5-String Bass Guitar Showing Heavy Low-B String')}
               <span class="spec-pill ao3">AO3 Modern Frequency Demand</span>
               <h4>The 5-String Standard (Low B0)</h4>
               <p>Popularized in 1980s gospel, R&amp;B, and modern metal. Tuning B0–E1–A1–D2–G2 matches sub-bass synthesizer frequencies (30.9 Hz) while allowing players to shift positions up the neck.</p>'''),
          card('acid-edge', f'''{thumb('bass_dsp_profiling_and_cab_ir.svg', 'DSP Digital Bass Profiler and Speaker Cabinet Convolution Impulse Response Diagram')}
               <span class="spec-pill ao3">AO3 Digital Simulation</span>
               <h4>DSP Profilers &amp; Cabinet IRs</h4>
               <p>Modern processors (Darkglass, Quad Cortex, Kemper) profile non-linear SVT tube saturation, using convolution Impulse Responses (IRs) to model 8&#215;10 cabinet cones for silent direct-to-DAW tracking.</p>''')
      ]))

# 15 SUMMARY ROADMAP & REVISION CHECKLIST
slide('🎓', 'Revision Summary', 'Component 3 <span>Core Vocabulary &amp; Exam Checklist</span>',
      'Master the essential terminology, physical principles, and historical milestones required for Edexcel Component 3.',
      G([
          card('highlight', f'''
               <span class="spec-pill ao4">Timeline Checklist</span>
               <h4>1. Historical Evolution</h4>
               <p><strong>1951:</strong> Fender Precision (34" fretted solid ash).</p>
               <p><strong>1956:</strong> H&#246;fner 500/1 (30" hollow violin bass).</p>
               <p><strong>1957:</strong> Split-coil P-Bass (RWRP hum cancellation).</p>
               <p><strong>1960:</strong> Fender Jazz Bass (offset waist, dual single-coils).</p>
               <p><strong>1969:</strong> Ampeg SVT (300W tube, 8&#215;10 infinite baffle).</p>
               <p><strong>1976:</strong> Music Man StingRay (active 9V 2-band EQ).</p>'''),
          card('cyan-edge', f'''
               <span class="spec-pill ao3">Electronics &amp; Physics</span>
               <h4>2. Transducers &amp; Signal Flow</h4>
               <p><strong>RWRP Physics:</strong> Split coils cancel 50/60 Hz hum; string signals sum cleanly.</p>
               <p><strong>Mersenne Law:</strong> Long 34" scale requires higher tension, clarifying low fundamentals.</p>
               <p><strong>Strings:</strong> Flatwound (thump, fast decay) vs Roundwound (bright presence).</p>
               <p><strong>Passive vs Active:</strong> Cut-only 250k&#937; vs 9V boost/cut Baxandall EQ.</p>'''),
          card('acid-edge', f'''
               <span class="spec-pill ao3">Studio Production</span>
               <h4>3. Tracking &amp; Techniques</h4>
               <p><strong>DI Box:</strong> High-Z to low-Z, transformer balance &amp; ground lift.</p>
               <p><strong>DI + Mic Delay:</strong> Waveforms must be phase-aligned in DAW to avoid low-end cancellation.</p>
               <p><strong>Slap &amp; Pop:</strong> Larry Graham thumb strike (kick) + finger snap (snare).</p>
               <p><strong>Foam Muting:</strong> Damps sustain, clearing mono mix space for kick drums.</p>''')
      ]))

TOTAL = len(slides_html)

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Bass Guitar: History, Physics &amp; Recording Technology | A-Level Music Technology Deck</title>
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
  </style>
</head>
<body>

  <div class="deck-wrapper">
    <!-- Top Utility Bar -->
    <header class="deck-topbar">
      <div class="badge-hub"><span class="badge-pulse"></span>Edexcel Component 3 &bull; Music Technology in Context</div>
      <div class="deck-topic-title">Topic: <strong>The Bass Guitar (History, Physics &amp; Recording)</strong></div>
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
