"""Builds public/blues-interactive-quiz.html from the House quiz CSS with a blues palette,
12 questions, and shuffled answer order (correct answer is NOT always option A)."""
import re, json

SRC = 'public/house-interactive-quiz.html'
OUT = 'public/blues-interactive-quiz.html'
src = open(SRC, encoding='utf-8').read()
css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)
for a, b in [('#c084fc', '#60a5fa'), ('192, 132, 252', '96, 165, 250'), ('#d8b4fe', '#93c5fd'),
             ('#00C1F0', '#f59e0b'), ('0, 193, 240', '245, 158, 11'), ('#38bdf8', '#fbbf24'),
             ('#070814', '#060a14'), ('#0e1124', '#0b1226'), ('#151936', '#111a32'),
             ('21, 25, 54', '17, 26, 50'), ('8, 10, 24', '6, 10, 22')]:
    css = css.replace(a, b)

# (category, ao, question, correct, [wrong x3], explanation, tip)
Q = [
 ('Musical Structure', 'AO4: Musical Features',
  'Which chord pattern is the standard 12 bar blues?',
  'I I I I | IV IV I I | V IV I I',
  ['I IV V I | I IV V I | I IV V I', 'I I IV IV | V V I I | I IV V V', 'ii V I I | ii V I I | IV V I I'],
  'The 12 bar blues is built on chords I, IV and V: four bars of I, two of IV, two of I, then V, IV and two bars of I. Other simple I, IV, V progressions are also common.',
  '12 bar blues = I I I I | IV IV I I | V IV I I.'),
 ('Musical Texture', 'AO4: Musical Features',
  'What is "call and response" in the blues?',
  'A vocal phrase answered by the lead instrument, such as guitar or harmonica',
  ['Two singers performing the same melody a third apart', 'A drum fill that signals a change of section', 'A repeated bass riff under a sustained chord'],
  'Call and response is a conversation between the voice (the call) and a lead instrument such as guitar or harmonica (the response).',
  'Call and response: voice asks, instrument answers.'),
 ('Country Blues Recording', 'AO3: Recording Technology',
  'Which description best fits early Country Blues recordings such as those of Robert Johnson?',
  'Mono, scratchy and noisy, with poor separation because the musician was recorded with one source',
  ['Stereo recordings with a separate microphone on every instrument', 'Clean multitrack recordings overdubbed in a purpose-built studio', 'Digital recordings with heavy artificial reverb'],
  'Early blues was captured on mono discs with lots of surface noise. Musicians were gathered around a single recorder or microphone, so instruments are not separated.',
  'Early blues = mono, scratchy, surface noise, poor separation.'),
 ('Recording History', 'AO3: Recording Technology',
  'What changed in the mid 1920s that improved the sound of blues records?',
  'Electrical recording with microphones replaced purely acoustic horn recording',
  ['Multitrack tape recording replaced mono discs', 'Digital sampling was introduced', 'Stereo vinyl LPs became the standard format'],
  'Before 1925 performers played into an acoustic horn. Electrical recording using microphones captured a wider frequency range, and quality improved again after 1945.',
  'c.1925: acoustic horn → electrical microphone recording.'),
 ('Instruments', 'AO3: Instruments',
  'Why was the metal-bodied resonator guitar popular with early blues players?',
  'Its metal resonator cone made the acoustic guitar much louder before electric amplification',
  ['It could be plugged straight into a valve amplifier', 'It produced a clean, quiet tone ideal for studio vocals', 'It had two necks so it could play bass and lead'],
  'The resonator cone amplifies the string vibrations acoustically, so the guitar cuts through in noisy venues and on early single-microphone recordings.',
  'Resonator = louder acoustic guitar via a metal cone.'),
 ('Guitar Technique', 'AO3: Instruments',
  'What does slide (bottleneck) guitar technique produce?',
  'A continuous, voice-like glide between pitches',
  ['Rapid hammered-on notes with no sustain', 'Muted percussive chords only', 'Notes that are always exactly in tune with the frets'],
  'A glass or metal slide is moved along the strings, creating smooth glissandi that imitate the human voice. It is especially associated with Country Blues.',
  'Slide guitar = vocal-like glissando; typical of Country Blues.'),
 ('Chicago Blues', 'AO3: Technology & AO4: Context',
  'Why did Chicago Blues musicians such as Muddy Waters adopt electric guitar and amplification?',
  'To be heard in noisy urban clubs and to give the guitar and harmonica lead-instrument power',
  ['Because acoustic guitars were banned in Chicago', 'Because record labels required all blues to be played on piano', 'Because amplification removed the need for a drummer'],
  'Chicago Blues introduced electric guitar, bass guitar, drums and amplified harmonica. Amplification let the band be heard over crowds and gave the instruments a strong lead voice.',
  'Chicago Blues = electric guitar, bass, drums, amplified harmonica.'),
 ('Amplified Harmonica', 'AO3: Technology',
  'How did Little Walter create his famous overdriven harmonica sound?',
  'He played through a hand-held microphone into a small guitar amp pushed into overdrive',
  ['He recorded onto wax cylinders and sped them up', 'He used a Hammond organ and Leslie speaker', 'He added a digital delay pedal after recording'],
  'Cupping a microphone and driving a small valve amp into overdrive gave the harmonica a thick, distorted, saxophone-like tone.',
  'Amplified harp = mic + small valve amp driven into overdrive.'),
 ('Valve Amplifiers', 'AO3: Distortion',
  'What produces the natural overdrive on Chicago blues guitar recordings?',
  'Small valve amplifiers turned up until the valves clip and the speaker compresses the signal',
  ['A built-in digital distortion chip', 'Tape speed being changed during mixing', 'A plate reverb unit set to maximum'],
  'The worksheet notes little use of effects apart from distortion. That distortion came from pushing valve amps beyond their clean headroom, adding warm harmonics and compression.',
  'Distortion = pushed valve amp, not a pedal.'),
 ('Record Labels', 'AO4: Context',
  'Which Chicago label, run by Leonard and Phil Chess, recorded Muddy Waters and Howlin\' Wolf?',
  'Chess Records',
  ['Sun Records', 'Motown', 'Atlantic Records'],
  'Chess Records of Chicago released the key electric blues artists, with Willie Dixon as bassist, songwriter and talent scout.',
  'Chess Records = Muddy Waters, Howlin\' Wolf, Willie Dixon.'),
 ('British Blues & Exchange', 'AO4: Cultural Context',
  'What does the career of the Rolling Stones show about the history of the blues?',
  'The blues was passed back and forth across the Atlantic between black and white musicians',
  ['The blues was invented in Britain and exported to America', 'The blues stopped being played in America after 1960', 'The blues has never influenced rock music'],
  'The blues began as a mix of European, American and African styles and was exchanged across the Atlantic by artists including B.B. King, the Rolling Stones, Chuck Berry, Jimi Hendrix, Eric Clapton and Led Zeppelin.',
  'Cultural exchange: blues ↔ British blues ↔ rock.'),
 ('Modern Legacy & Sampling', 'AO3 & AO4: Influence',
  'How did Moby\'s album Play show the influence of blues field recordings?',
  'It sampled old blues and gospel field recordings from the Lomax archive and combined them with electronic beats',
  ['It was recorded live on wax cylinders', 'It used no samples and only live blues musicians', 'It was a straight cover of Chicago blues songs'],
  'Moby sampled historic recordings, turning the noise and character of early mono field recordings into part of a modern production. The worksheet highlights sampling (Moby) as a modern blues influence.',
  'Modern link: sampling old blues recordings (Moby).'),
]

questions = [dict(category=c, ao=ao, text=t, correct=cor, wrong=w, explanation=e, tip=tip)
             for c, ao, t, cor, w, e, tip in Q]
assert len(questions) == 12

js = '''
    const questions = %s;

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

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

    function loadQuestion(index) {
      answered = false;
      const q = questions[index];
      qCategory.textContent = q.category;
      qAoTag.textContent = q.ao;
      qText.textContent = q.text;
      qCounter.textContent = `Question ${index + 1} of ${questions.length}`;
      currentScore.textContent = score;
      progressFill.style.width = `${((index + 1) / questions.length) * 100}%%`;
      insightCard.classList.remove('open');
      nextBtn.disabled = true;

      currentOptions = shuffle([{ text: q.correct, ok: true }, ...q.wrong.map(w => ({ text: w, ok: false }))]);
      optionsGrid.innerHTML = '';
      currentOptions.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.onclick = () => selectOption(i);
        btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt.text}</span>`;
        optionsGrid.appendChild(btn);
      });
    }

    function selectOption(i) {
      if (answered) return;
      answered = true;
      const q = questions[currentQ];
      const buttons = optionsGrid.querySelectorAll('.option-btn');
      buttons.forEach(b => b.disabled = true);
      const correctIdx = currentOptions.findIndex(o => o.ok);
      if (currentOptions[i].ok) {
        buttons[i].classList.add('correct');
        score++;
        currentScore.textContent = score;
      } else {
        buttons[i].classList.add('wrong');
        buttons[correctIdx].classList.add('correct');
      }
      insightBody.textContent = q.explanation;
      insightTip.innerHTML = `<strong>Revision Note:</strong> ${q.tip}`;
      insightCard.classList.add('open');
      nextBtn.disabled = false;
    }

    function nextQuestion() {
      if (currentQ < questions.length - 1) {
        currentQ++;
        loadQuestion(currentQ);
      } else {
        showResults();
      }
    }

    function showResults() {
      quizStage.style.display = 'none';
      resultsScreen.classList.add('open');
      finalScoreVal.textContent = score;
      const pct = (score / questions.length) * 100;
      if (pct >= 85) {
        gradeBadge.textContent = 'Grade 9 • Distinction Star';
        resultTitle.textContent = 'Outstanding Blues Specification Mastery!';
        resultMessage.textContent = 'You can explain the 12 bar form, early mono recording, resonator and slide guitar, Chicago electrification, valve overdrive and the blues legacy in sampling and rock.';
      } else if (pct >= 65) {
        gradeBadge.textContent = 'Grade 7-8 • Merit / Distinction';
        resultTitle.textContent = 'Solid Syllabus Understanding';
        resultMessage.textContent = 'Good work. Revisit how amplification and valve overdrive shaped Chicago Blues, and the technology differences between early field recordings and Chess studio recordings.';
      } else {
        gradeBadge.textContent = 'Revision Recommended';
        resultTitle.textContent = 'Targeted Revision Needed';
        resultMessage.textContent = 'Return to the Blues study deck to review the 12 bar pattern, call and response, early recording limits and the move to electric instruments.';
      }
    }

    function restartQuiz() {
      currentQ = 0;
      score = 0;
      resultsScreen.classList.remove('open');
      quizStage.style.display = 'flex';
      loadQuestion(0);
    }

    loadQuestion(0);
  ''' % json.dumps(questions, indent=2, ensure_ascii=False)

# body from house quiz (between </style></head> and the script) with text swaps
body = re.search(r'</head>(.*?)<script>', src, re.S).group(1)
body = body.replace('🏠', '🎸').replace('/interactive-slide-house.html', '/interactive-slide-blues.html')
head = re.search(r'(<!DOCTYPE.*?<style>)', src, re.S).group(1)
head = head.replace('The History of House Music', 'The Blues')
html = head + css + '</style>\n</head>' + body + '<script>' + js + '</script>\n</body>\n</html>\n'
open(OUT, 'w', encoding='utf-8').write(html)
print('wrote', OUT, len(html))
