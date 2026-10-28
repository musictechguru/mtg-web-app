"""Builds public/film-games-interactive-quiz.html (12 questions, shuffled answers) with cinematic cyan/amber styling."""
import re, json

SRC = 'public/blues-interactive-quiz.html'
OUT = 'public/film-games-interactive-quiz.html'
src = open(SRC, encoding='utf-8').read()

# Extract head and body structure
head = src[:src.find('<style>')] + '<style>\n'
css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)

# Palette transformation: Cyber Cyan (#38bdf8 / #00f0ff) and Electric Amber (#f59e0b) on deep space navy (#070a14)
for a, b in [
    ('#60a5fa', '#38bdf8'), ('96, 165, 250', '56, 189, 248'), ('#93c5fd', '#7dd3fc'),
    ('#060a14', '#070a14'), ('#0b1226', '#0d1322'), ('#111a32', '#131b2e'),
    ('17, 26, 50', '19, 27, 46'), ('6, 10, 22', '7, 10, 20')
]:
    css = css.replace(a, b)

body_start = src.find('</style>\n</head>') + len('</style>\n</head>')
body_end = src.find('<script>')
body = src[body_start:body_end]

# Update header title
body = re.sub(
    r'<div class="brand-title">.*?</div>',
    '<div class="brand-title">Music for Film &amp; Computer Games &bull; Specification Quiz</div>',
    body
)
body = re.sub(
    r'<div class="brand-sub">.*?</div>',
    '<div class="brand-sub">Edexcel Music Technology &bull; 12 Multiple Choice Questions &bull; Shuffled Answers</div>',
    body
)

# 12 specification questions (category, ao, question, correct, [wrong x3], explanation, tip)
Q = [
 ('Timecode & Sync', 'AO3: Film Synchronization',
  'What standardized timing format, measured in hours:minutes:seconds:frames, is universally used to lock DAWs, video playback, and MIDI sequencers together in film post-production?',
  'SMPTE Timecode (Society of Motion Picture and Television Engineers)',
  ['MIDI Polyphonic Expression (MPE)',
   'Open Sound Control (OSC)',
   'Direct Stream Digital (DSD)'],
  'SMPTE timecode provides frame-accurate synchronization across video playback decks, digital audio workstations, and analog tape machines. Standard frame rates include 24 fps (film), 25 fps (PAL broadcast), and 29.97/30 fps (NTSC).',
  'Synchronization: SMPTE timecode = hours:minutes:seconds:frames (HH:MM:SS:FF).'),

 ('Conducting to Picture', 'AO3: Studio Performance',
  'During a live film scoring session on an orchestral sound stage, what tools do conductors and session musicians rely on to ensure tempo and cue changes hit exact dramatic on-screen moments?',
  'Headphone click tracks and visual "streamer" lines that wipe across video monitors towards hit-point flashes',
  ['Wireless footpedals that automatically speed up the conductor\'s physical arm movements',
   'Automated robotic batons connected directly to the film director\'s smartphone',
   'Analog tape loops containing vocal shouts of elapsed seconds broadcast into studio loudspeakers'],
  'Conductors watch video monitors showing "streamers" (colored lines moving across the picture towards a punch flash) while wearing headphones fed with a click track, ensuring musical cues hit dramatic scene transitions to the exact frame.',
  'Conducting to picture: Click track = tempo guide; Streamers & punches = visual hit warnings.'),

 ('Orchestral Capture', 'AO3: Microphone Arrays',
  'What classic stereo orchestral recording configuration consists of three omnidirectional microphones arranged in a "T" shape suspended above the conductor\'s podium?',
  'The Decca Tree (Left, Right, and Center omnidirectional microphones)',
  ['The Blumlein Pair (two bidirectional figure-8 microphones angled at 90°)',
   'The ORTF Array (two cardioid microphones spaced 17 cm apart at 110°)',
   'The Mid-Side Matrix (one cardioid mic and one figure-8 mic decoded via sum and difference)'],
  'Developed by Decca engineers in the 1950s, the Decca Tree uses three omnidirectional microphones (traditionally Neumann M50s) spaced roughly 2 meters wide and 1.5 meters forward on a T-bar, delivering spacious stereo width and precise center imaging.',
  'Orchestral miking: Decca Tree = 3 omnidirectional microphones in a T-shape over the conductor.'),

 ('8-Bit Game Audio', 'AO3: Chiptune Hardware',
  'The Ricoh 2A03 sound chip inside the 8-bit Nintendo Entertainment System (NES) generated audio using which specific set of voice channels?',
  'Two square wave channels (melody/harmony), one triangle wave channel (bass), one pseudo-random noise channel (percussion), and one 1-bit DPCM sample channel',
  ['Eight uncompressed 24-bit PCM wavetable channels streaming from a hard drive',
   'Four analog sawtooth oscillators running through resonant Moog ladder filters',
   'Six FM synthesis operators with 32 selectable algorithms'],
  'The NES 2A03 Programmable Sound Generator (PSG) offered strictly 5 channels: two pulse/square channels for leads/chords, one non-filtered triangle wave for bass, one noise channel for drums/explosions, and one low-bit DPCM sample channel.',
  'NES 8-bit sound chip: 2 square waves + 1 triangle wave + 1 noise channel + 1 DPCM channel.'),

 ('16-Bit Consoles', 'AO3: FM vs Sample Playback',
  'How did the audio technology of the Sega Genesis (Mega Drive) fundamentally differ from that of the Super Nintendo (SNES)?',
  'The Sega Genesis used a Yamaha YM2612 FM synthesis chip, whereas the SNES used a Sony SPC700 chip that played back 8 channels of compressed 16-bit audio samples with hardware echo',
  ['The Sega Genesis streamed full uncompressed CD-ROM Redbook audio, while the SNES only produced 1-bit monophonic square waves',
   'The SNES relied entirely on analog vacuum tubes, whereas the Sega Genesis used digital optical disc laser pickups',
   'The Sega Genesis used an 8-operator additive synthesizer, while the SNES used physical guitar strings plucked by magnetic solenoids'],
  'The Sega Genesis generated audio mathematically via 6-channel FM synthesis (Yamaha YM2612), excelling at metallic leads and electronic punch. The SNES used the Sony SPC700 to play back 8 channels of compressed acoustic samples with hardware interpolation and reverb.',
  '16-bit console war: Sega Genesis = Yamaha FM synthesis; SNES = Sony sample playback with hardware echo.'),

 ('Interactive Audio', 'AO3: Vertical Layering',
  'In video game audio engines, what is "Vertical Layering" (also known as dynamic stemming)?',
  'Simultaneously running multiple synchronized audio tracks (e.g. ambient pads, drums, aggressive brass) that fade in or out depending on gameplay intensity',
  ['Stacking identical audio waveforms slightly out of phase to create an extreme comb-filtering effect',
   'Pitching a melody up by an octave whenever the player jumps vertically in the game',
   'Cutting the game soundtrack abruptly whenever the player enters a new physical room'],
  'Vertical layering consists of synchronized musical stems (rhythm, harmony, lead, percussion) playing in parallel. As combat begins or player health drops, the game engine un-mutes heavier layers without interrupting tempo or musical continuity.',
  'Game audio: Vertical Layering = simultaneous stems faded in/out based on gameplay intensity.'),

 ('Adaptive Architecture', 'AO3: Horizontal Resequencing',
  'In adaptive game scoring, what is "Horizontal Resequencing"?',
  'Seamlessly branching between different musical sections or cue segments at specific bar/beat boundaries based on the player\'s choices or game state changes',
  ['Panning all audio hard left during cutscenes and hard right during combat gameplay',
   'Rewinding the entire audio file from end to beginning whenever the player character dies',
   'Converting a stereo recording into a mono signal by summing left and right channels horizontally'],
  'Horizontal resequencing breaks music into discrete modular segments. When the player triggers an event (entering a dungeon, discovering a town), the engine waits for the next musical quantize point (downbeat) to branch smoothly into a new cue.',
  'Adaptive scoring: Horizontal Resequencing = branching between modular cues at musical bar/beat points.'),

 ('Film Synthesizers', 'AO4: Synthesizer Scoring',
  'Which iconic polyphonic analog synthesizer, known for its polyphonic aftertouch and ribbon controller, was famously played by Vangelis to score Ridley Scott\'s 1982 film Blade Runner?',
  'Yamaha CS-80',
  ['Roland TB-303',
   'Yamaha DX7',
   'Korg M1'],
  'Vangelis composed Blade Runner live to picture using the heavyweight Yamaha CS-80. Its expressive polyphonic aftertouch and weighted ribbon controller allowed him to perform nuanced brass swells, vibrato, and pitch bends directly to screen.',
  'Film synth icon: Vangelis + Blade Runner = Yamaha CS-80 (polyphonic aftertouch & ribbon controller).'),

 ('Sound Post-Production', 'AO3: Foley Sound Design',
  'What is the primary role of a "Foley Artist" in film post-production?',
  'To perform and record everyday sound effects (such as footsteps, cloth rustle, and handling props) in sync with the projected picture on a specialized sound stage',
  ['To conduct the symphony orchestra during the main title theme recording',
   'To remove all background noise from the dialogue tracks using digital high-pass filters',
   'To design the 3D visual CGI animations for creature effects in action movies'],
  'Named after pioneer Jack Foley, Foley artists watch projected film scenes in soundproof studios with pits of dirt, gravel, concrete, and water, performing human-sync physical sounds (footsteps, movement, prop handling) with specialized microphones.',
  'Sound design: Foley Artist = performs physical props and footsteps in sync with picture.'),

 ('Film Vocabulary', 'AO4: Musical Functions',
  'In film sound terminology, what is "Diegetic" (or source) music?',
  'Music that exists within the world of the film and can be heard by the characters on screen (e.g. a band playing in a bar or a radio playing in a car)',
  ['The dramatic symphonic background score composed specifically to heighten the emotional tension for the audience',
   'Music generated entirely by artificial intelligence software without human supervision',
   'A short musical motif that only plays during the end credits of a feature film'],
  'Diegetic music is part of the on-screen narrative world (characters can hear it, such as a jukebox or car stereo). Non-diegetic music is the cinematic score added purely for the audience\'s psychological benefit (characters cannot hear it).',
  'Screen vocabulary: Diegetic = inside the scene (characters hear it); Non-Diegetic = outside the scene (score).'),

 ('Virtual Mockups', 'AO3: Orchestral Sample Libraries',
  'When composing orchestral mockups using virtual instruments (such as Spitfire Audio or Vienna Symphonic Library), which MIDI Continuous Controller is universally mapped to the Modulation Wheel (Mod Wheel) to control dynamic crossfades between ppp and fff sample layers?',
  'MIDI CC1 (Modulation)',
  ['MIDI CC7 (Channel Volume)',
   'MIDI CC10 (Pan)',
   'MIDI CC64 (Sustain Pedal)'],
  'In modern orchestral sample libraries, MIDI CC1 (Modulation Wheel) crossfades between dynamic velocity layers (pianissimo to fortissimo), allowing composers to perform realistic orchestral crescendos and timbral swells on held notes.',
  'DAW mockups: MIDI CC1 (Mod Wheel) = dynamic layer crossfading; CC11 = expression volume.'),

 ('Optical Storage & Games', 'AO3 & AO4: Redbook Audio',
  'How did the transition to CD-ROM media in mid-1990s consoles like the Sony PlayStation fundamentally revolutionize video game soundtracks?',
  'It allowed games to stream full 44.1 kHz / 16-bit uncompressed Redbook audio, enabling pre-recorded live orchestral performances, real choirs, and studio vocals',
  ['It eliminated the need for game composers by having the console generate music purely from random CPU clock ticks',
   'It restricted game audio to 8-bit mono square waves because CD-ROMs had slower data transfer rates than silicon cartridges',
   'It required all game audio to be broadcast over analog AM radio frequencies into the television speaker'],
  'Prior to CD-ROMs, consoles relied on hardware synthesis chips. The 650MB capacity of CDs permitted direct streaming of uncompressed 44.1 kHz / 16-bit Redbook digital audio, ushering in live symphonic scores (like Nobuo Uematsu\'s One-Winged Angel) and licensed songs.',
  'Optical gaming: CD-ROM (PlayStation 1) = 44.1 kHz / 16-bit Redbook streaming of real recorded orchestras.')
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

      // SHUFFLE OPTIONS so correct answer is NOT always in position A
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
        gradeBadge.innerText = 'Grade A* / A - Master of Screen & Game Audio';
        gradeBadge.style.color = '#38bdf8';
        gradeBadge.style.borderColor = '#38bdf8';
        resultTitle.innerText = 'Cinematic & Interactive Mastery!';
        resultMessage.innerText = 'You demonstrated complete command of film synchronization, Decca Tree orchestral capture, vintage game sound chips, and modern adaptive audio.';
      }} else if (pct >= 60) {{
        gradeBadge.innerText = 'Grade B / C - Solid Knowledge Base';
        gradeBadge.style.color = '#f59e0b';
        gradeBadge.style.borderColor = '#f59e0b';
        resultTitle.innerText = 'Strong Foundation!';
        resultMessage.innerText = 'Good grasp of screen music concepts. Review Vertical Layering vs Horizontal Resequencing and 16-bit sound chips to secure full marks.';
      }} else {{
        gradeBadge.innerText = 'Revision Required';
        gradeBadge.style.color = '#f87171';
        gradeBadge.style.borderColor = '#f87171';
        resultTitle.innerText = 'Keep Revising!';
        resultMessage.innerText = 'Use the 14-slide interactive presentation deck to reinforce your understanding of SMPTE, sound chips, Foley, and landmark composers.';
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
