"""Builds public/jazz-interactive-quiz.html (12 questions, shuffled answers) by adapting the Blues quiz builder."""
import re

blues = open('scripts/build_blues_quiz.py', encoding='utf-8').read()

Q_NEW = '''Q = [
 ('Jazz History', 'AO4: Historical Context',
  'In which year did the Original Dixieland Jass Band make what is usually called the first jazz record?',
  '1917',
  ['1899', '1925', '1948'],
  'The Original Dixieland Jass Band recorded for Victor in New York in 1917, which is normally cited as the first jazz record.',
  'First jazz record = 1917, Original Dixieland Jass Band.'),
 ('Acoustic Recording', 'AO3: Recording Technology',
  'How were jazz records made during the acoustic era (before 1925)?',
  'Performers played into a large horn that made a stylus cut the disc directly',
  ['Performers were recorded by ribbon microphones onto magnetic tape', 'Each instrument was recorded on its own multitrack channel', 'Sound was sampled digitally and stored as data'],
  'Acoustic recording had no microphone or amplification. Sound waves travelled down a horn, moved a diaphragm and stylus and cut the groove straight into a disc.',
  'Acoustic era = horn + stylus, no microphone, no editing.'),
 ('Acoustic Limits', 'AO3: Recording Technology',
  'Why were bass drums usually avoided in acoustic-era jazz recordings?',
  'Strong low-frequency vibrations could make the cutting stylus jump out of the groove',
  ['They were too quiet to be picked up by the horn', 'They were banned by record labels for religious reasons', 'They could not be tuned to the key of the song'],
  'Heavy low-frequency energy caused the stylus to jump. Bass drums were avoided or softened, and a tuba often replaced the double bass.',
  'Acoustic era: no bass drum (stylus jumps), tuba instead of double bass.'),
 ('Microphones', 'AO3: Microphones',
  'What is the polar pattern of a classic RCA ribbon microphone, and why was it useful in jazz?',
  'Figure-8 (bidirectional), so two players could face each other at either side of one microphone',
  ['Omnidirectional, so it picked up the whole room equally', 'Cardioid, so it only picked up sound from one direction', 'Hypercardioid, so it rejected all sound from the side and rear'],
  'A ribbon microphone has a figure-8 pattern, picking up sound from the front and back and rejecting the sides. This allowed two horn players to share one mic.',
  'Ribbon mic = figure-8 pattern, warm and smooth.'),
 ('Record Formats', 'AO3: Formats',
  'How did the length of a 78 rpm disc influence swing-era recordings?',
  'Each side held only about 3 to 4 minutes, so tunes were arranged and edited to fit',
  ['A side could hold over 20 minutes, allowing long solos', 'Records were always recorded in stereo', 'Each record had to be recorded in a single take with no rehearsal'],
  '78 rpm shellac discs held roughly 3 to 4 minutes per side. Swing arrangers tailored their pieces to that length.',
  '78 rpm = 3-4 minutes a side; long solos were not possible.'),
 ('The LP', 'AO3: Formats',
  'What did the 33\\u2153 rpm microgroove LP, introduced in 1948, allow jazz to do?',
  'Release extended performances, up to about 22 minutes per side',
  ['Record in stereo for the first time ever', 'Record digitally with no surface noise', 'Replace the need for any microphones'],
  'The LP held far more music than a 78, making extended improvised solos and album-length works practical, as on Kind of Blue.',
  'LP (1948) = up to ~22 minutes a side; albums and long solos.'),
 ('Magnetic Tape', 'AO3: Studio Technology',
  'What was a key advantage of magnetic tape for jazz producers?',
  'The best takes could be edited and spliced together, and tape later allowed stereo and multitrack',
  ['It removed the need for performers to play live', 'It made every recording louder by default', 'It could only record one instrument at a time'],
  'Tape could be cut and joined, letting producers choose the best takes. It also led to stereo and multitrack recording.',
  'Tape = editing, splicing, then multitrack and stereo.'),
 ('Engineering', 'AO3: Studio Technique',
  'Which describes the recording approach associated with engineer Rudy Van Gelder at Blue Note?',
  'Close-miked instruments, often with tube condenser microphones, giving a punchy, clear, intimate sound with natural bleed',
  ['Distant ambient miking in a huge concert hall', 'Heavy multitrack overdubbing with artificial reverb', 'Using only a single omnidirectional microphone for the whole band'],
  'Van Gelder placed microphones close to the instruments and recorded the band live to tape. The result is clear, present and dry, with natural bleed holding the band together.',
  'Van Gelder = close-miked, tube condensers (Neumann U47), live band, punchy and clear.'),
 ('Modal Jazz', 'AO4: Musical Features',
  'Which best describes the style of Miles Davis\\' So What from Kind of Blue (1959)?',
  'Modal: improvisation based on scales (modes) rather than fast-changing chords',
  ['Free jazz with no fixed structure or key', 'Dance-band swing arranged for a big band', 'Electric fusion with synthesizers'],
  'So What is built on a few modes (D Dorian, then E-flat Dorian) in a 32-bar AABA form, giving improvisers space rather than constant chord changes.',
  'Modal jazz = scales/modes instead of fast chord changes (Kind of Blue).'),
 ('Time Signature', 'AO4: Musical Features',
  'What is unusual about Dave Brubeck Quartet\\'s Take Five (1959)?',
  'It is in 5/4 time, composed by saxophonist Paul Desmond',
  ['It is in 4/4 but played at 300 bpm', 'It uses no improvisation at all', 'It was the first jazz record to use synthesizers'],
  'Take Five is famous for its 5/4 time signature and repeated two-chord vamp, with solos including a well-known drum solo.',
  'Take Five = 5/4 time, written by Paul Desmond.'),
 ('Bebop', 'AO4: Musical Features',
  'How did 1940s bebop differ from swing?',
  'Small combos played faster, harmonically complex, virtuosic improvisation, mainly for listening rather than dancing',
  ['Large dance bands played simple riffs for dancing', 'It used only electronic instruments', 'It avoided improvisation in favour of written scores'],
  'Bebop musicians such as Charlie Parker and Dizzy Gillespie played fast tempos with extended and altered chords, in small groups.',
  'Bebop = small combo, fast, complex harmony, virtuosic improvisation.'),
 ('Jazz Fusion', 'AO3: Studio Technology',
  'Which technology features are associated with Miles Davis\\' Bitches Brew (1970) and later jazz fusion?',
  'Electric piano and other electric instruments, plus tape editing, loops and echo by producer Teo Macero',
  ['Only acoustic instruments recorded live with one microphone', 'Wax cylinder recording and acoustic horns', 'Fully digital sampling workstations'],
  'Fusion mixed jazz with rock and used the studio as an instrument. Teo Macero edited and assembled long sessions with tape splicing, loops and echo, while players used electric piano and later synthesizers.',
  'Fusion = electric instruments (Rhodes, synths) + tape editing, loops, echo (Teo Macero).'),
]
'''

out = re.sub(r"Q = \[.*?\n\]\n\nquestions", lambda m: Q_NEW + "\nquestions", blues, flags=re.S)
assert out != blues
# Rebuild the colour map cleanly rather than chaining string edits
cmap = [('#c084fc', '#eab308'), ('192, 132, 252', '234, 179, 8'), ('#d8b4fe', '#fde047'),
        ('#00C1F0', '#2dd4bf'), ('0, 193, 240', '45, 212, 191'), ('#38bdf8', '#5eead4'),
        ('#070814', '#09090f'), ('#0e1124', '#13111a'), ('#151936', '#1b1824'),
        ('21, 25, 54', '27, 24, 36'), ('8, 10, 24', '10, 9, 16')]
out = re.sub(r"for a, b in \[\('#c084fc'.*?\]:\n    css = css\.replace\(a, b\)",
             "for a, b in " + repr(cmap) + ":\n    css = css.replace(a, b)", out, flags=re.S)
out = out.replace('public/blues-interactive-quiz.html', 'public/jazz-interactive-quiz.html')
out = out.replace("interactive-slide-blues.html", "interactive-slide-jazz.html")
out = out.replace("The Blues", "Jazz &amp; Recording Technology").replace('🎸', '🎷')
# result messages
out = re.sub(r"resultTitle\.textContent = 'Outstanding Blues Specification Mastery!';", "resultTitle.textContent = 'Outstanding Jazz Specification Mastery!';", out)
out = out.replace("You can explain the 12 bar form, early mono recording, resonator and slide guitar, Chicago electrification, valve overdrive and the blues legacy in sampling and rock.",
                  "You can explain acoustic and electrical recording, ribbon microphones, formats from 78 to LP, tape editing, the Van Gelder sound, modal jazz, bebop and electric fusion.")
out = out.replace("Good work. Revisit how amplification and valve overdrive shaped Chicago Blues, and the technology differences between early field recordings and Chess studio recordings.",
                  "Good work. Revisit how formats and microphones changed between the acoustic, swing and Blue Note eras, and what made fusion different.")
out = out.replace("Return to the Blues study deck to review the 12 bar pattern, call and response, early recording limits and the move to electric instruments.",
                  "Return to the Jazz study deck to review acoustic recording limits, the ribbon microphone, 78 versus LP, tape editing and the main jazz styles.")
out = out.replace("blues-interactive-quiz", "jazz-interactive-quiz").replace("builds the Blues", "builds Jazz")
exec(compile(out, 'build_jazz_quiz_gen', 'exec'))
