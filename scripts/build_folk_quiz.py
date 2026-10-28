"""Builds public/folk-interactive-quiz.html (12 questions, shuffled answers) with emerald/amber folk styling."""
import re, json

SRC = 'public/blues-interactive-quiz.html'
OUT = 'public/folk-interactive-quiz.html'
src = open(SRC, encoding='utf-8').read()

# Extract head and body structure
head = src[:src.find('<style>')] + '<style>\n'
css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)

# Palette transformation: Blues blue/amber to Folk emerald (#34d399 / #10b981) and amber (#f59e0b)
for a, b in [
    ('#60a5fa', '#34d399'), ('96, 165, 250', '52, 211, 153'), ('#93c5fd', '#6ee7b7'),
    ('#060a14', '#080d0a'), ('#0b1226', '#0f1712'), ('#111a32', '#142019'),
    ('17, 26, 50', '20, 32, 25'), ('6, 10, 22', '8, 13, 10')
]:
    css = css.replace(a, b)

body_start = src.find('</style>\n</head>') + len('</style>\n</head>')
body_end = src.find('<script>')
body = src[body_start:body_end]

# Update header title
body = re.sub(
    r'<div class="brand-title">.*?</div>',
    '<div class="brand-title">Acoustic &amp; Folk &bull; Component 3 Specification Quiz</div>',
    body
)
body = re.sub(
    r'<div class="brand-sub">.*?</div>',
    '<div class="brand-sub">Edexcel Music Technology &bull; 12 Multiple Choice Questions &bull; Shuffled Answers</div>',
    body
)

# 12 specification questions (category, ao, question, correct, [wrong x3], explanation, tip)
Q = [
 ('Microphone Placement', 'AO3: Acoustic Guitar Capture',
  'Why is pointing a small-diaphragm condenser microphone at the 12th fret of an acoustic guitar preferred over placing it directly in front of the sound hole?',
  'It captures a balanced blend of string articulation and body tone while avoiding the boomy low-frequency resonance of the sound hole',
  ['The sound hole produces excessive high-frequency treble that causes harsh sibilance in the acoustic recording',
   'Placing a microphone near the sound hole causes physical airflow turbulence that tears the condenser capsule membrane',
   'The 12th fret is where all magnetic pickup signals are naturally centered, ensuring maximum electrical induction'],
  'The sound hole acts as a Helmholtz resonator, generating massive low-frequency buildup (100–250 Hz) and proximity effect. Aiming at the 12th fret balances string brightness, transient pick attack, and natural body warmth.',
  'Exam rule: 12th fret = balance & transient clarity; sound hole = boomy buildup.'),

 ('Stereo Miking', 'AO3: Stereo Techniques',
  'What is the primary technical advantage of using a coincident XY stereo microphone pair (two directional mics angled at 90° with capsules aligned) on an acoustic guitar or ensemble?',
  'Because sound waves arrive at both capsules at virtually the same instant, there is virtually zero phase cancellation when summed to mono',
  ['It produces an exaggerated, ultra-wide stereo spread that completely eliminates all room reverberation',
   'It allows the engineer to independently boost bass frequencies without using an equalizer circuit',
   'It automatically cancels out background spill from all other instruments through active acoustic phase inversion'],
  'Coincident XY stereo relies entirely on intensity (level) differences rather than time-of-arrival delays. As a result, summing the stereo track to mono maintains near-perfect phase coherence.',
  'Stereo capture: XY coincident = intensity differences & excellent mono compatibility.'),

 ('Transducers', 'AO3: Microphones',
  'Why are small-diaphragm condenser (SDC) microphones (such as the AKG C451 or Neumann KM184) favored for recording intricate acoustic fingerpicking?',
  'Their low diaphragm mass provides extremely fast transient response and detailed high-frequency capture of string pluck attack',
  ['They have internal tube preamplifiers that add aggressive distortion and harmonic overdrive to quiet string instruments',
   'Their large, heavy diaphragms boost fundamental sub-bass frequencies below 40 Hz to make the guitar sound like a bass',
   'They do not require phantom power or preamplification, allowing them to plug straight into high-impedance guitar amplifiers'],
  'Small-diaphragm condensers have very light membranes that react instantly to fast transients, capturing the crisp attack of fingerstyle playing and harmonic air without sluggish inertia.',
  'Microphone selection: Small Diaphragm Condenser (SDC) = fast transient response & acoustic sparkle.'),

 ('Folk Roots & Archiving', 'AO4: Historical Context',
  'In the 1930s and 1940s, how did ethnomusicologists John and Alan Lomax capture landmark traditional folk, blues, and ballad performances across rural America?',
  'Using portable disc-cutting phonographs and early field tape recorders transported in the trunk of a car to document musicians in their communities',
  ['By bringing rural musicians to multi-track recording facilities equipped with 24-track tape machines in Los Angeles',
   'Using high-frequency FM radio transmitters to beam live performances directly to national broadcast towers',
   'By having musicians transcribe their songs into digital MIDI sequencers on portable laptop computers'],
  'Alan Lomax travelled rural roads with hundreds of pounds of primitive portable recording gear (including instantaneous disc cutters and later Magnecord tape machines) to archive authentic folk traditions in churches, fields, and porches.',
  'Folk origins: Lomax field recordings = portable disc/tape archiving of rural oral tradition.'),

 ('Dynamic Processing', 'AO3: Compression',
  'When mixing acoustic folk instruments and intimate vocals, why is an optical compressor like the Teletronix LA-2A often chosen over a fast VCA or FET limiter?',
  'Its electro-optical cell provides smooth, program-dependent attack and release times that preserve natural, musical dynamics without audible pumping',
  ['It provides an instantaneous 20-microsecond brickwall limiting attack designed specifically to squash aggressive transient spikes',
   'It generates severe even-order distortion and digital clipping that adds aggressive grit to acoustic instruments',
   'It completely silences the audio signal between notes by functioning as an automated studio noise gate'],
  'The LA-2A uses a light source and photo-resistor (T4 cell). It reacts gently to dynamic changes with a natural two-stage release (fast initial release followed by slow decay), smoothing acoustic performances without audible compression artifacts.',
  'Dynamics: Teletronix LA-2A = optical compressor with program-dependent, transparent leveling.'),

 ('Cultural Watershed', 'AO4: Folk to Folk-Rock',
  'What historic event at the 1965 Newport Folk Festival marked the controversial bridge between traditional acoustic folk purism and folk rock?',
  'Bob Dylan performed an electric set backed by the Paul Butterfield Blues Band, playing a Fender Stratocaster at high amplified volume',
  ['Bob Dylan refused to play acoustic guitar and instead performed entirely with analog Moog modular synthesizers',
   'The Newport organizers banned all acoustic instruments, requiring every folk performer to play through fuzz pedals',
   'Bob Dylan used automated tape loops and digital pitch-correction software during his headlining acoustic set'],
  'Dylan going electric on July 25, 1965, shocked traditional acoustic folk purists. The collision of Dylan\'s literary songwriting with loud electric rock amplification ignited the folk-rock genre.',
  'Watershed moment: Newport 1965 = Dylan goes electric with Fender Stratocaster & amplified band.'),

 ('Acoustic Instrumentation', 'AO4: Acoustic Guitars',
  'Which model of flat-top acoustic guitar, introduced by Martin in the 1930s, became the gold-standard instrument for folk and bluegrass due to its loud projection and rich low-end?',
  'The Martin D-28 Dreadnought',
  ['The Fender Telecaster Custom',
   'The Gibson Les Paul Standard',
   'The Rickenbacker 4001 Bass'],
  'The Martin D-28 dreadnought, with its solid Sitka spruce soundboard and rosewood back and sides, provided the projection and deep bass required to anchor acoustic ensembles without electrical amplification.',
  'Guitar icon: Martin D-28 = dreadnought body shape, rosewood back/sides, high projection.'),

 ('Studio Spill & Tracking', 'AO3: Bleed Management',
  'During traditional acoustic folk ensemble sessions (such as Fairport Convention or early Bob Dylan), how was instrument spill (bleed) between microphones typically handled?',
  'Spill was embraced as a natural, cohesive acoustic element by carefully arranging musicians in the room and balancing relative distances',
  ['Aggressive noise gates were placed on every channel to completely mute instruments whenever they were not soloing',
   'All instruments were recorded directly through DI boxes into digital amp modelers with zero microphones present',
   'Each performer had to record in complete isolation inside an anechoic chamber at separate times across several months'],
  'Rather than isolating instruments with heavy baffling or gating out bleed, engineers positioned acoustic ensembles in pleasant-sounding rooms. The subtle acoustic bleed tied the instruments together into an organic, cohesive stereo soundstage.',
  'Studio capture: Folk ensemble bleed = organic acoustic glue, managed via player positioning.'),

 ('Landmark Studios', 'AO4: British Folk Rock',
  'Which London recording studio, engineered by John Wood and produced by Joe Boyd, was famous for capturing the pristine acoustic sounds of Nick Drake and Fairport Convention?',
  'Sound Techniques (Chelsea, London)',
  ['Sun Studio (Memphis)',
   'Fame Studios (Muscle Shoals)',
   'Motown Hitsville U.S.A. (Detroit)'],
  'Sound Techniques in Chelsea was the home of British folk rock. Equipped with a custom console designed by Geoff Frost and John Wood, it captured Nick Drake\'s Five Leaves Left and Pink Moon, and Fairport Convention\'s Liege & Lief.',
  'Studio history: Sound Techniques = John Wood, Joe Boyd, Nick Drake, Fairport Convention.'),

 ('Stereo Transducers', 'AO3: Blumlein Pair',
  'What polar pattern must be used on both microphones in a classic Blumlein stereo microphone setup?',
  'Figure-8 (bidirectional)',
  ['Cardioid (unidirectional)',
   'Omnidirectional (spherical)',
   'Hypercardioid (shotgun)'],
  'Invented by Alan Blumlein in the 1930s, the Blumlein pair consists of two matched figure-8 microphones placed at 90° to each other with coincident capsules, capturing front stereo spread and rear room reverberation.',
  'Stereo geometry: Blumlein = two figure-8 microphones at 90°, captures direct sound & room ambience.'),

 ('Vocal Production', 'AO3: Vocal Capture',
  'To capture the intimate, breathy vocal nuances characteristic of 1970s singer-songwriters like Joni Mitchell and Nick Drake, what vocal chain was standard?',
  'A high-end large-diaphragm condenser (e.g. Neumann U67/U87) with a pop shield at close proximity, running into a high-grade tube/transistor preamp',
  ['A handheld dynamic vocal mic with heavy digital pitch correction and aggressive gated reverb',
   'A ceramic crystal microphone plugged into a distorted guitar combo amplifier with a spring reverb cranked to maximum',
   'A boundary pressure-zone microphone taped to the studio floor 15 meters away from the singer'],
  'Large diaphragm condensers (LDCs) capture the full frequency range, subtle vocal breath, and dynamic intimacy of singer-songwriters. Pop shields prevent plosive blasts from popping the sensitive condenser capsule.',
  'Vocal intimacy: LDC (Neumann U67/U87) + pop shield + close miking = full-bodied breath & detail.'),

 ('Equalisation & Spatial Mix', 'AO3: EQ & Space',
  'In acoustic folk production, what subtle equalization technique is commonly applied to fingerpicked acoustic guitars to impart "air" and string shimmer without introducing harshness?',
  'A gentle high-shelf boost around 10 kHz to 12 kHz, combined with a high-pass filter below 60–80 Hz to eliminate low-end rumble',
  ['A massive 15 dB resonant boost at 300 Hz to accentuate the body resonance of the guitar sound hole',
   'A brickwall low-pass filter cutting off everything above 4 kHz to emulate an old wax cylinder recording',
   'Notching out all frequencies between 1 kHz and 5 kHz to make the acoustic guitar completely inaudible in the mix'],
  'Boosting a gentle high shelf at 10–12 kHz adds harmonic air and fingerpick sparkle. High-pass filtering (low-cut) below 60–80 Hz removes unwanted stage thumps, mic stand rumble, and HVAC noise.',
  'EQ tip: High-shelf at 10–12 kHz = acoustic air/sparkle; High-pass at 60–80 Hz = eliminates low rumble.')
]

questions = [
    dict(category=c, ao=ao, text=t, correct=cor, wrong=w, explanation=e, tip=tip)
    for c, ao, t, cor, w, e, tip in Q
]
assert len(questions) == 12

js = f'''
    const questions = {json.dumps(questions, indent=2)};

    function shuffle(arr) {{
      for (let i = arr.length - 1; i > 0; i--) {{
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }}
      return arr;
    }}

    let currentQ = 0;
    let score = 0;
    let answered = false;
    let currentOptions = [];

    const qText = document.getElementById('qText');
    const qCategory = document.getElementById('qCategory');
    const qAoTag = document.getElementById('qAoTag');
    const optionsGrid = document.getElementById('optionsGrid');
    const insightCard = document.getElementById('insightCard');
    const insightBody = document.getElementById('insightBody');
    const insightTip = document.getElementById('insightTip');
    const qCounter = document.getElementById('qCounter');
    const currentScore = document.getElementById('currentScore');
    const progressFill = document.getElementById('progressFill');
    const nextBtn = document.getElementById('nextBtn');
    const quizStage = document.getElementById('quizStage');
    const resultsScreen = document.getElementById('resultsScreen');
    const finalScoreVal = document.getElementById('finalScoreVal');
    const gradeBadge = document.getElementById('gradeBadge');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const letters = ['A', 'B', 'C', 'D'];

    function loadQuestion(index) {{
      answered = false;
      const q = questions[index];
      qText.innerHTML = q.text;
      qCategory.innerText = q.category;
      qAoTag.innerText = q.ao;
      qCounter.innerText = `Question ${{index + 1}} of ${{questions.length}}`;
      currentScore.innerText = `Score: ${{score}}/${{questions.length}}`;
      progressFill.style.width = `${{((index) / questions.length) * 100}}%`;

      insightCard.classList.remove('show');
      nextBtn.disabled = true;

      // SHUFFLE OPTIONS so correct answer is NOT always in the same position
      currentOptions = shuffle([
        {{ text: q.correct, ok: true }},
        ...q.wrong.map(w => ({{ text: w, ok: false }}))
      ]);

      optionsGrid.innerHTML = '';
      currentOptions.forEach((opt, idx) => {{
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${{letters[idx]}}</span><span>${{opt.text}}</span>`;
        btn.onclick = () => selectOption(idx, btn);
        optionsGrid.appendChild(btn);
      }});
    }}

    function selectOption(idx, btn) {{
      if (answered) return;
      answered = true;

      const q = questions[currentQ];
      const isCorrect = currentOptions[idx].ok;
      const btns = optionsGrid.querySelectorAll('.option-btn');

      btns.forEach((b, i) => {{
        b.disabled = true;
        if (currentOptions[i].ok) {{
          b.classList.add('correct');
        }}
      }});

      if (isCorrect) {{
        btn.classList.add('correct');
        score++;
      }} else {{
        btn.classList.add('wrong');
      }}

      currentScore.innerText = `Score: ${{score}}/${{questions.length}}`;
      insightBody.innerHTML = q.explanation;
      insightTip.innerHTML = `<strong>Specification Tip:</strong> ${{q.tip}}`;
      insightCard.classList.add('show');

      nextBtn.disabled = false;
      if (currentQ === questions.length - 1) {{
        nextBtn.innerText = 'View Results & Analysis';
      }}
    }}

    function handleNext() {{
      if (currentQ < questions.length - 1) {{
        currentQ++;
        loadQuestion(currentQ);
      }} else {{
        showResults();
      }}
    }}

    function showResults() {{
      quizStage.style.display = 'none';
      resultsScreen.style.display = 'block';
      progressFill.style.width = '100%';

      finalScoreVal.innerText = `${{score}} / ${{questions.length}}`;
      const pct = (score / questions.length) * 100;

      if (pct >= 80) {{
        gradeBadge.innerText = 'Grade A* / A - Master of Folk Technology';
        gradeBadge.style.color = '#34d399';
        gradeBadge.style.borderColor = '#34d399';
        resultTitle.innerText = 'Outstanding Performance!';
        resultMessage.innerText = 'You demonstrated comprehensive mastery of acoustic folk recording, stereo transducer arrays, microphone positioning, and historical context.';
      }} else if (pct >= 60) {{
        gradeBadge.innerText = 'Grade B / C - Solid Knowledge Base';
        gradeBadge.style.color = '#f59e0b';
        gradeBadge.style.borderColor = '#f59e0b';
        resultTitle.innerText = 'Strong Foundation!';
        resultMessage.innerText = 'Good grasp of core concepts. Review the 12th fret acoustic placement and stereo microphone configurations to secure the highest marks.';
      }} else {{
        gradeBadge.innerText = 'Revision Required';
        gradeBadge.style.color = '#f87171';
        gradeBadge.style.borderColor = '#f87171';
        resultTitle.innerText = 'Keep Revising!';
        resultMessage.innerText = 'Use the 14-slide presentation deck to reinforce your understanding of acoustic capture, vintage equipment, and key artists.';
      }}
    }}

    function restartQuiz() {{
      currentQ = 0;
      score = 0;
      nextBtn.innerText = 'Next Question &rarr;';
      quizStage.style.display = 'block';
      resultsScreen.style.display = 'none';
      loadQuestion(0);
    }}

    window.onload = () => loadQuestion(0);
'''

html = head + css + '</style>\n</head>' + body + '<script>' + js + '</script>\n</body>\n</html>\n'
open(OUT, 'w', encoding='utf-8').write(html)
print(f"Generated {OUT} ({len(html)} bytes, 12 questions)")
