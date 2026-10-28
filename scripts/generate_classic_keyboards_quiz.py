import os

def generate_quiz():
    html = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Classic Electro-Mechanical Keyboards • Edexcel Component 3 Specification Quiz | Music Tech Guru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #080e1a;
      --bg-card: #0f172a;
      --bg-surface: #1e293b;
      --accent-purple: #c084fc;
      --accent-purple-glow: rgba(192, 132, 252, 0.35);
      --accent-cyan: #38bdf8;
      --accent-cyan-glow: rgba(56, 189, 248, 0.35);
      --accent-acid: #34d399;
      --accent-amber: #fbbf24;
      --accent-red: #ef4444;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-purple: rgba(192, 132, 252, 0.35);
      --border-cyan: rgba(56, 189, 248, 0.35);
      --font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
    }

    .quiz-container {
      width: 100%;
      max-width: 880px;
      background: radial-gradient(circle at 50% 0%, rgba(192, 132, 252, 0.15) 0%, rgba(14, 17, 36, 0) 70%), var(--bg-card);
      border: 1px solid var(--border-purple);
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(192, 132, 252, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .quiz-header {
      padding: 24px 32px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(10px);
    }

    .topic-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(192, 132, 252, 0.12);
      border: 1px solid var(--border-purple);
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      color: var(--accent-purple);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .progress-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .progress-text {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text-muted);
    }

    .progress-track {
      width: 110px;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
      border-radius: 9999px;
      transition: width 0.3s ease;
    }

    .question-screen {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .question-category {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--accent-cyan);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .question-title {
      font-size: 19px;
      font-weight: 800;
      line-height: 1.45;
      color: var(--text-main);
    }

    .answers-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .answer-btn {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 16px 20px;
      color: var(--text-main);
      font-family: var(--font);
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      transition: all 0.2s ease;
      line-height: 1.5;
    }

    .answer-btn:hover:not(:disabled) {
      border-color: var(--accent-purple);
      background: rgba(192, 132, 252, 0.08);
      transform: translateY(-1px);
    }

    .answer-btn:disabled {
      cursor: default;
    }

    .answer-letter {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11.5px;
      font-weight: 800;
      color: var(--text-muted);
      flex-shrink: 0;
      margin-top: 2px;
      transition: all 0.2s ease;
    }

    .answer-btn.correct {
      background: rgba(52, 211, 153, 0.15) !important;
      border-color: var(--accent-acid) !important;
      color: #ffffff !important;
    }

    .answer-btn.correct .answer-letter {
      background: var(--accent-acid);
      color: #060a14;
    }

    .answer-btn.wrong {
      background: rgba(239, 68, 68, 0.15) !important;
      border-color: var(--accent-red) !important;
      color: #ffffff !important;
    }

    .answer-btn.wrong .answer-letter {
      background: var(--accent-red);
      color: #ffffff;
    }

    .feedback-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 18px 20px;
      display: none;
      flex-direction: column;
      gap: 8px;
    }

    .feedback-title {
      font-size: 13.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .feedback-title.correct { color: var(--accent-acid); }
    .feedback-title.wrong { color: var(--accent-red); }
    .feedback-text {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .next-btn {
      background: linear-gradient(135deg, var(--accent-purple), #9333ea);
      color: #ffffff;
      border: 0;
      padding: 13px 26px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      align-self: flex-end;
      display: none;
      margin-top: 10px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 15px var(--accent-purple-glow);
    }
    .next-btn:hover {
      transform: translateY(-2px);
    }

    .results-screen {
      padding: 48px 32px;
      text-align: center;
      display: none;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .score-circle {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(192, 132, 252, 0.2) 0%, rgba(15, 23, 42, 0.8) 70%);
      border: 3px solid var(--accent-purple);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 35px var(--accent-purple-glow);
    }
    .score-number {
      font-size: 40px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1;
    }
    .score-total {
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 700;
      margin-top: 4px;
    }
    .results-title {
      font-size: 26px;
      font-weight: 900;
      color: #ffffff;
    }
    .results-desc {
      font-size: 14.5px;
      color: var(--text-muted);
      max-width: 600px;
      line-height: 1.6;
    }
    .restart-btn {
      background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
      color: #080e1a;
      border: 0;
      padding: 14px 28px;
      border-radius: 12px;
      font-size: 14.5px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 6px 20px var(--accent-purple-glow);
      transition: transform 0.2s ease;
    }
    .restart-btn:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>

  <div class="quiz-container">
    <div class="quiz-header">
      <span class="topic-badge">Classic Keyboards &bull; Specification Quiz</span>
      <div class="progress-wrap">
        <span class="progress-text" id="progressText">Question 1 of 10</span>
        <div class="progress-track">
          <div class="progress-bar" id="progressBar" style="width: 10%;"></div>
        </div>
      </div>
    </div>

    <div class="question-screen" id="questionScreen">
      <div>
        <div class="question-category" id="questionCategory">AO3: Mechanical Action</div>
        <h2 class="question-title" id="questionTitle">Loading question...</h2>
      </div>

      <div class="answers-grid" id="answersGrid"></div>

      <div class="feedback-box" id="feedbackBox">
        <div class="feedback-title" id="feedbackTitle"></div>
        <div class="feedback-text" id="feedbackText"></div>
      </div>

      <button class="next-btn" id="nextBtn" onclick="nextQuestion()">Next Question &rarr;</button>
    </div>

    <div class="results-screen" id="resultsScreen">
      <div class="score-circle">
        <div class="score-number" id="finalScore">0</div>
        <div class="score-total">OUT OF 10</div>
      </div>
      <h2 class="results-title" id="resultsTitle">Quiz Completed!</h2>
      <p class="results-desc" id="resultsDesc">Your understanding of electro-mechanical keyboards is being evaluated against Edexcel standards.</p>
      <button class="restart-btn" onclick="restartQuiz()">Restart Specification Quiz &crarr;</button>
    </div>
  </div>

  <script>
    const questions = [
      {
        "category": "AO3: Mellotron Mechanical Generation",
        "text": "What is the primary sound-generation mechanism inside a Mellotron M400?",
        "correct": "Individual lengths of 3/8-inch magnetic tape beneath each key pulled across magnetic playback heads by a spinning capstan shaft",
        "wrong": [
          "Continuous circular tape loops that cycle endlessly across an erase head and a record head",
          "A rotating magnetic drum with recorded audio tracks read by inductive non-contact sensors",
          "Small steel reeds struck by felt hammers with an electrostatic pickup plate polarized to +170V DC"
        ],
        "explanation": "Beneath each of the Mellotron's 35 keys sits a distinct length of 3/8-inch magnetic tape. Depressing a key engages a pinch roller against a spinning capstan shaft, pulling the tape across a playback head to produce authentic recorded audio."
      },
      {
        "category": "AO3: Mellotron Duration Limitations",
        "text": "Why are notes on a vintage Mellotron unable to sustain indefinitely when a key is held down?",
        "correct": "Each tape strip is approximately 6 feet long and runs out after approximately 8 seconds, requiring a mechanical spring to snap it back into its storage bin",
        "wrong": [
          "The internal preamplifier runs on a thermal duty cycle that shuts off to prevent transformer overheating after 8 seconds",
          "The capstan motor automatically reverses direction every 8 seconds to prevent magnetic tape stretching",
          "The high-voltage electrostatic comb loses its polarization charge after 8 seconds of continuous current draw"
        ],
        "explanation": "Because the Mellotron uses individual tape strips rather than infinite loops, notes can only sustain for approximately 8 seconds before the tape physically reaches its end. Releasing the key allows a return spring to pull the tape back into its storage bin."
      },
      {
        "category": "AO4: Landmark Mellotron Recording",
        "text": "Which landmark 1967 recording introduced the Mellotron's pre-recorded 'Mk II Flute' sound to mainstream pop culture?",
        "correct": "The Beatles — 'Strawberry Fields Forever' (intro arranged and played by Paul McCartney)",
        "wrong": [
          "Led Zeppelin — 'Stairway to Heaven' (intro played on real acoustic recorders)",
          "Queen — 'Bohemian Rhapsody' (vocal choir recorded via 24-track tape multi-bouncing)",
          "The Beach Boys — 'Good Vibrations' (played on an Electro-Theremin / Tannerin)"
        ],
        "explanation": "Recorded at Abbey Road Studios in late 1966, 'Strawberry Fields Forever' famously opens with Paul McCartney playing the Mellotron Mk II's recorded 3-piece flute tape bank, setting the standard for psychedelic rock keyboard arrangements."
      },
      {
        "category": "AO3: Fender Rhodes Generation & Pickups",
        "text": "How does a Fender Rhodes electric piano generate and transduce its audio signal?",
        "correct": "Neoprene-tipped hammers strike tapered steel tines joined to heavy tonebars, with individual electromagnetic induction coils sensing the vibration",
        "wrong": [
          "Felt hammers strike flat steel reeds enclosed within a polarized electrostatic pickup comb",
          "Rubber tangents strike real guitar strings against metal anvils, sensed by dual single-coil pickups",
          "Toothed steel discs spin past magnetic coils to generate pure sine-wave electrical currents"
        ],
        "explanation": "Pressing a Rhodes key flips a neoprene-tipped hammer against a tapered steel tine connected to a cast tonebar (an asymmetrical tuning fork). The tine's vibration disturbs the magnetic field of an electromagnetic pickup coil, generating an alternating audio voltage."
      },
      {
        "category": "AO3: Wurlitzer 200A Generation & Transduction",
        "text": "How does the sound generation and pickup design of the Wurlitzer 200A differ fundamentally from the Fender Rhodes?",
        "correct": "The Wurlitzer strikes flat steel reeds with felt hammers, transduced by an electrostatic pickup plate polarized with ~170V DC",
        "wrong": [
          "The Wurlitzer uses pre-recorded magnetic tape loops rather than physical acoustic metal vibrators",
          "The Wurlitzer utilizes piezoceramic contact microphones glued directly under the wooden soundboard",
          "The Wurlitzer employs optical photocell sensors tracking light passing through perforated spinning discs"
        ],
        "explanation": "The Wurlitzer 200A uses traditional felt piano hammers striking tuned, flat steel reeds. Transduction is electrostatic (capacitive): the vibrating reed acts as one plate of a capacitor inside a polarized electrostatic comb plate charged to ~170V DC."
      },
      {
        "category": "AO3: Electric Piano Timbral Comparison",
        "text": "How do the timbral profiles of the Fender Rhodes and Wurlitzer 200A compare under hard dynamic playing?",
        "correct": "The Rhodes produces a warm, round fundamental with crystalline bell sustain; the Wurlitzer produces a biting, punchy midrange bark that breaks into natural overdrive",
        "wrong": [
          "The Rhodes produces harsh, scooped high-frequency clipping; the Wurlitzer produces a pure sine-wave with no upper harmonics",
          "The Rhodes sounds identical to an acoustic harpsichord; the Wurlitzer sounds identical to an orchestral church pipe organ",
          "The Rhodes has zero natural sustain (<0.5 seconds); the Wurlitzer can sustain notes indefinitely via acoustic feedback"
        ],
        "explanation": "Rhodes tines produce a smooth, chimey bell-like attack with rich sustain (favored in Jazz, Soul, and Fusion). Wurlitzer reeds generate pronounced 1–3 kHz midrange overtones that 'bark' and distort when struck hard (favored in Rock, Pop, and R&B)."
      },
      {
        "category": "AO3: Hohner Clavinet Action",
        "text": "What physical mechanical action generates sound inside a Hohner Clavinet D6?",
        "correct": "Depressing a key forces a rubber-tipped tangent to pinch an actual steel guitar string against a metal anvil",
        "wrong": [
          "Keys pull weighted plectrums made of crow quills that pluck metal harpsichord wires",
          "Keys rotate spinning copper tonewheels across dual bridge and neck electromagnetic sensors",
          "Keys blow pressurized air through mechanical brass reed chambers with adjustable swell shutters"
        ],
        "explanation": "The Clavinet is an electric clavichord: beneath each key, a small rubber-tipped tangent strikes down on an actual steel guitar string against a metal anvil. When released, woven yarn dampens the string immediately, creating a percussive, snappy decay."
      },
      {
        "category": "AO4: Clavinet in 1970s Funk Production",
        "text": "Which processing technique and landmark recording defined the Hohner Clavinet's status in 1970s Funk music?",
        "correct": "Layering percussive 16th-note syncopated tracks through a Wah-Wah pedal / envelope filter, as on Stevie Wonder's 'Superstition'",
        "wrong": [
          "Running the instrument through a high-speed rotating Leslie speaker, as on Deep Purple's 'Highway Star'",
          "Saturating the audio through a multi-head tape delay at 7.5 ips, as on The Beatles' 'Tomorrow Never Knows'",
          "Modulating the signal with a ring modulator and analog tape flanging, as on Kraftwerk's 'Autobahn'"
        ],
        "explanation": "Stevie Wonder created the definitive funk Clavinet benchmark on 'Superstition' (1972) by overdubbing multiple interlocking syncopated Clavinet passes through a Mu-Tron III / Wah pedal, exploiting the instrument's percussive attack and guitar-like single-coil pickups."
      },
      {
        "category": "AO3: Hammond B3 Tonewheel Generator",
        "text": "How does the Hammond B3 organ generate its audio frequencies without ever drifting out of tune?",
        "correct": "A synchronous motor spins 91 toothed steel discs (tonewheels) at a constant 1200 RPM past magnetic pickups, producing pure sine waves locked to AC mains frequency",
        "wrong": [
          "Quartz crystal oscillators divide high-frequency master clock pulses into 12 semitone square waves",
          "Bellows pump pressurized air across 91 tuned brass free-reeds sealed in a vacuum chamber",
          "An array of 91 vacuum tubes oscillate at radio frequencies that are heterodyne-mixed down to audible pitches"
        ],
        "explanation": "The Hammond B3 uses a mechanical tonewheel generator. A synchronous motor drives 91 toothed steel wheels at a fixed speed locked to the electrical mains line frequency. The tooth count governs pitch; because gears cannot slip, it is impossible for the organ to go out of tune."
      },
      {
        "category": "AO3: Leslie 122 Rotary Speaker Mechanics",
        "text": "How does a Leslie 122 rotary speaker cabinet create its signature swirling chorale/tremolo acoustic sound?",
        "correct": "An 800 Hz crossover routes highs to a rotating treble horn and lows to a rotating wooden drum rotor, producing acoustic Doppler pitch and amplitude modulation",
        "wrong": [
          "An electronic bucket-brigade delay (BBD) chip continuously modulates clock speed to sweep comb-filter notches",
          "A motorized tape head physically sweeps back and forth across a stationary magnetic tape loop inside the cabinet",
          "A balanced ring modulator multiplies the organ's line output against a variable 400 Hz local oscillator carrier"
        ],
        "explanation": "The Leslie 122 uses an 800 Hz passive crossover: highs (>800 Hz) feed a spinning treble horn; lows (<800 Hz) feed a rotating wooden drum rotor. As the speakers physically spin toward and away from the listener, the Acoustic Doppler effect produces authentic vibrato (pitch warble) and tremolo (amplitude shifts)."
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function loadQuestion() {
      answered = false;
      const q = questions[currentQuestion];
      document.getElementById('questionCategory').textContent = q.category;
      document.getElementById('questionTitle').textContent = q.text;
      document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
      document.getElementById('progressBar').style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

      const feedbackBox = document.getElementById('feedbackBox');
      feedbackBox.style.display = 'none';
      document.getElementById('nextBtn').style.display = 'none';

      // Mix answers
      const answers = [
        { text: q.correct, correct: true },
        ...q.wrong.map(w => ({ text: w, correct: false }))
      ];
      // Deterministic shuffle based on question index
      answers.sort((a, b) => (a.text.length % 3) - (b.text.length % 3));

      const letters = ['A', 'B', 'C', 'D'];
      const grid = document.getElementById('answersGrid');
      grid.innerHTML = '';

      answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-letter">${letters[idx]}</span><span>${ans.text}</span>`;
        btn.onclick = () => checkAnswer(btn, ans.correct, q.explanation);
        grid.appendChild(btn);
      });
    }

    function checkAnswer(selectedBtn, isCorrect, explanation) {
      if (answered) return;
      answered = true;

      const buttons = document.querySelectorAll('.answer-btn');
      buttons.forEach(btn => {
        btn.disabled = true;
      });

      const feedbackBox = document.getElementById('feedbackBox');
      const feedbackTitle = document.getElementById('feedbackTitle');
      const feedbackText = document.getElementById('feedbackText');

      if (isCorrect) {
        score++;
        selectedBtn.classList.add('correct');
        feedbackTitle.className = 'feedback-title correct';
        feedbackTitle.innerHTML = '&#10004; Correct! Excellent Examiner Analysis';
      } else {
        selectedBtn.classList.add('wrong');
        feedbackTitle.className = 'feedback-title wrong';
        feedbackTitle.innerHTML = '&#10008; Incorrect. Edexcel Specification Review:';
        // Highlight correct button
        buttons.forEach(btn => {
          if (btn.textContent.includes(questions[currentQuestion].correct.substring(0, 30))) {
            btn.classList.add('correct');
          }
        });
      }

      feedbackText.textContent = explanation;
      feedbackBox.style.display = 'flex';
      document.getElementById('nextBtn').style.display = 'block';
    }

    function nextQuestion() {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }

    function showResults() {
      document.getElementById('questionScreen').style.display = 'none';
      const resultsScreen = document.getElementById('resultsScreen');
      resultsScreen.style.display = 'flex';

      document.getElementById('finalScore').textContent = score;
      const title = document.getElementById('resultsTitle');
      const desc = document.getElementById('resultsDesc');

      if (score >= 9) {
        title.textContent = 'Outstanding! Level 5 / Grade A* Mastery';
        desc.textContent = 'You demonstrated complete, exam-ready command of classic electro-mechanical keyboards: Mellotron tape replay, Rhodes tines vs Wurlitzer reeds, Clavinet funk tangents, and Hammond B3 tonewheel Doppler mechanics.';
      } else if (score >= 7) {
        title.textContent = 'Strong Performance! Grade A / B Standard';
        desc.textContent = 'Solid technical understanding across the keyboard families. Review the comparative matrix to perfect the nuances of electrostatic vs electromagnetic pickups and drawbar harmonic footage.';
      } else {
        title.textContent = 'Good Effort &bull; Revision Required';
        desc.textContent = 'Revisit the 15-slide interactive curriculum deck above to consolidate the physical sound generation differences between tines, reeds, tape strips, and tonewheels before exam day.';
      }
    }

    function restartQuiz() {
      currentQuestion = 0;
      score = 0;
      document.getElementById('resultsScreen').style.display = 'none';
      document.getElementById('questionScreen').style.display = 'flex';
      loadQuestion();
    }

    loadQuestion();
  </script>
</body>
</html>'''

    with open('public/classic-keyboards-interactive-quiz.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated public/classic-keyboards-interactive-quiz.html ({len(html)} bytes)")

if __name__ == '__main__':
    generate_quiz()
