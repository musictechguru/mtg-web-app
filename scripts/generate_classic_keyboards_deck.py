import os

def generate_deck():
    html = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Curriculum Deck &bull; Classic Electro-Mechanical Keyboards</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #080e1a;
      color: #cbd5e1;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-x: hidden;
    }
    .deck-container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      padding: 16px 20px 80px 20px;
      flex: 1;
    }
    .slide {
      display: none;
      animation: fadeIn 0.3s ease forwards;
    }
    .slide.active {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      flex-wrap: wrap;
      gap: 10px;
    }
    .deck-tag {
      background: rgba(192, 132, 252, 0.15);
      color: #c084fc;
      border: 1px solid rgba(192, 132, 252, 0.3);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .slide-counter {
      color: #94a3b8;
      font-size: 13px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.04);
      padding: 4px 12px;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .slide-title-wrap {
      margin-bottom: 18px;
    }
    .slide-heading {
      color: #ffffff;
      font-size: clamp(22px, 3.2vw, 32px);
      font-weight: 900;
      line-height: 1.2;
      margin-bottom: 6px;
      letter-spacing: -0.5px;
    }
    .slide-heading span {
      color: #c084fc;
    }
    .slide-lead {
      color: #94a3b8;
      font-size: 14.5px;
      line-height: 1.55;
      max-width: 950px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      margin-bottom: 18px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-bottom: 18px;
    }
    .info-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .info-card.highlight {
      border-left: 4px solid #c084fc;
      background: linear-gradient(180deg, rgba(192, 132, 252, 0.05) 0%, #0f172a 100%);
    }
    .info-card.cyan-edge {
      border-left: 4px solid #38bdf8;
      background: linear-gradient(180deg, rgba(56, 189, 248, 0.05) 0%, #0f172a 100%);
    }
    .info-card.emerald-edge {
      border-left: 4px solid #34d399;
      background: linear-gradient(180deg, rgba(52, 211, 153, 0.05) 0%, #0f172a 100%);
    }
    .info-card.amber-edge {
      border-left: 4px solid #fbbf24;
      background: linear-gradient(180deg, rgba(251, 191, 36, 0.05) 0%, #0f172a 100%);
    }
    .spec-pill {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 3px 8px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 8px;
      align-self: flex-start;
    }
    .spec-pill.ao3 {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }
    .spec-pill.ao4 {
      background: rgba(192, 132, 252, 0.15);
      color: #c084fc;
      border: 1px solid rgba(192, 132, 252, 0.3);
    }
    .spec-pill.tech {
      background: rgba(52, 211, 153, 0.15);
      color: #34d399;
      border: 1px solid rgba(52, 211, 153, 0.3);
    }
    .spec-pill.exam {
      background: rgba(251, 191, 36, 0.15);
      color: #fbbf24;
      border: 1px solid rgba(251, 191, 36, 0.3);
    }
    .card-title {
      color: #ffffff;
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .card-text {
      color: #94a3b8;
      font-size: 13px;
      line-height: 1.5;
    }
    .card-text strong {
      color: #e2e8f0;
    }
    .card-thumb {
      width: 100%;
      height: 175px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
      cursor: zoom-in;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: #000;
      display: block;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .card-thumb:hover {
      opacity: 0.92;
      transform: scale(1.01);
    }
    .card-thumb.contain-img {
      object-fit: contain;
      background: rgba(0, 0, 0, 0.45);
      padding: 6px;
    }
    .takeaway-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 12px 16px;
      margin-top: 14px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .takeaway-tag {
      background: rgba(192, 132, 252, 0.2);
      color: #c084fc;
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 7px;
      border-radius: 4px;
      white-space: nowrap;
      margin-top: 2px;
    }
    .takeaway-text {
      color: #cbd5e1;
      font-size: 12.5px;
      line-height: 1.5;
    }
    .video-btn-row {
      display: flex;
      gap: 8px;
      margin-top: 10px;
      align-items: center;
      flex-wrap: wrap;
    }
    .video-trigger-btn {
      background: rgba(192, 132, 252, 0.15);
      color: #c084fc;
      border: 1px solid rgba(192, 132, 252, 0.35);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .video-trigger-btn:hover {
      background: rgba(192, 132, 252, 0.25);
      border-color: #c084fc;
      transform: translateY(-1px);
    }
    .yt-direct-btn {
      background: rgba(255, 255, 255, 0.05);
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
    }
    .yt-direct-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    /* Fixed Navigation Footer */
    .deck-nav-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(8, 14, 26, 0.94);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 12px 20px;
      z-index: 100;
    }
    .nav-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }
    .nav-btn {
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }
    .nav-btn:hover:not(:disabled) {
      background: rgba(192, 132, 252, 0.2);
      border-color: #c084fc;
      color: #ffffff;
    }
    .nav-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .progress-bar {
      flex: 1;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #c084fc 0%, #38bdf8 100%);
      width: 6.66%;
      transition: width 0.25s ease;
    }

    /* Lightbox Modal */
    .image-modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }
    .image-modal-backdrop.open {
      display: flex;
    }
    .image-modal-content {
      max-width: 90vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .image-modal-content img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .image-modal-caption {
      margin-top: 12px;
      color: #cbd5e1;
      font-size: 13px;
      text-align: center;
    }
    .close-modal-btn {
      position: absolute;
      top: 20px;
      right: 24px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      font-size: 20px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease;
    }
    .close-modal-btn:hover {
      background: rgba(239, 68, 68, 0.8);
    }

    /* Video Modal - Zero History Footprint */
    .video-modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 1001;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .video-modal-backdrop.open {
      display: flex;
    }
    .video-modal-content {
      width: 100%;
      max-width: 860px;
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
    }
    .video-modal-header {
      padding: 12px 18px;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .video-modal-title {
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
    }
    .video-player-wrapper {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      background: #000;
    }
    .video-player-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .video-modal-footer {
      padding: 10px 18px;
      background: rgba(255, 255, 255, 0.02);
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <div class="deck-container">

    <!-- SLIDE 1: INTRODUCTION TO ELECTRO-MECHANICAL KEYBOARDS -->
    <section class="slide active" id="slide-1">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 1 of 15</span>
        <span class="slide-counter">Overview &amp; Core Physics</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Classic Keyboards: <span>Acoustic Vibrations &amp; Transduction</span></h1>
        <p class="slide-lead">Before digital PCM sampling and microprocessors, classic 1960s &amp; 70s keyboard instruments generated musical sound from physical vibrating matter: real tape strips, struck steel tines, metal reeds, guitar strings, and spinning tonewheels.</p>
      </div>

      <div class="grid-2">
        <div class="info-card highlight">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/vintage_keyboards_comparative_matrix.svg', 'Classic Keyboards Architecture &amp; Transduction Matrix')">
            <img src="/images/slides/classic_keyboards/vintage_keyboards_comparative_matrix.svg" alt="Classic Keyboards Architecture Matrix" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill ao3">Component 3 Foundation</span>
          <h3 class="card-title">Acoustic Generation vs. Pure Synthesis</h3>
          <p class="card-text">Unlike subtractive synthesizers that create raw sound with electronic oscillator circuits (VCOs), <strong>electro-mechanical keyboards produce tangible mechanical vibrations</strong>. These physical movements are converted into alternating audio voltages by transducers (magnetic heads, electromagnetic coils, electrostatic plates, or guitar pickups).</p>
        </div>

        <div class="info-card cyan-edge">
          <span class="spec-pill tech">The 5 Core Families</span>
          <h3 class="card-title">Syllabus Instrument Families</h3>
          <p class="card-text">Edexcel Component 3 requires students to recognize and explain the mechanical actions and timbres of five definitive keyboard families:</p>
          <ul style="margin: 8px 0 0 18px; color: #cbd5e1; font-size: 13px; line-height: 1.6;">
            <li><strong>The Mellotron:</strong> 3/8&quot; tape strips, playback heads, 8-sec limit.</li>
            <li><strong>Fender Rhodes:</strong> Neoprene hammers, steel tines, tonebars, bell chime.</li>
            <li><strong>Wurlitzer 200A:</strong> Felt hammers, steel reeds, electrostatic pickup bark.</li>
            <li><strong>Hohner Clavinet D6:</strong> Rubber tangents, real guitar strings, funk twang.</li>
            <li><strong>Hammond B3 Organ:</strong> 91 spinning tonewheels, drawbars, Leslie Doppler.</li>
          </ul>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Exam Takeaway</span>
        <span class="takeaway-text">Never confuse an electro-mechanical keyboard with an analog synthesizer! Synthesizers generate tones with pure electronic oscillator circuits (sawtooth, pulse, triangle); classic keyboards use real physical matter vibrating across magnetic or electrostatic sensors.</span>
      </div>
    </section>

    <!-- SLIDE 2: COMPARATIVE ARCHITECTURE MATRIX -->
    <section class="slide" id="slide-2">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 2 of 15</span>
        <span class="slide-counter">Comparative Matrix</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">The Big Five: <span>Comparative Architecture Matrix</span></h1>
        <p class="slide-lead">A side-by-side technical breakdown of sound generators, pickup mechanisms, harmonic characters, and definitive recordings for Edexcel Section A and Section B Question 5.</p>
      </div>

      <div class="info-card highlight" style="margin-bottom: 16px;">
        <div class="card-thumb contain-img" style="height: 320px;" onclick="openLightbox('/images/slides/classic_keyboards/vintage_keyboards_comparative_matrix.svg', 'Complete 5-Family Keyboard Comparison Matrix')">
          <img src="/images/slides/classic_keyboards/vintage_keyboards_comparative_matrix.svg" alt="Comparison Matrix" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <p class="card-text" style="text-align: center; color: #94a3b8; font-size: 12px;">Click diagram to expand to fullscreen high-resolution inspection</p>
      </div>

      <div class="grid-3">
        <div class="info-card cyan-edge">
          <span class="spec-pill ao3">Tine vs. Reed</span>
          <h3 class="card-title">Electric Piano Division</h3>
          <p class="card-text"><strong>Rhodes:</strong> Struck tapered tines + tonebars = mellow bell fundamental. <strong>Wurlitzer:</strong> Struck flat reeds + electrostatic pickup = punchy, biting midrange bark.</p>
        </div>
        <div class="info-card amber-edge">
          <span class="spec-pill ao3">Strings vs. Tapes</span>
          <h3 class="card-title">Clavinet vs. Mellotron</h3>
          <p class="card-text"><strong>Clavinet:</strong> Rubber tangents hit real guitar strings = percussive attack, zero sustain. <strong>Mellotron:</strong> Capstan pulls pre-recorded audio tape strips = natural acoustic recordings with 8-second limit.</p>
        </div>
        <div class="info-card emerald-edge">
          <span class="spec-pill ao3">Additive Tonewheels</span>
          <h3 class="card-title">Hammond &amp; Leslie</h3>
          <p class="card-text"><strong>Hammond B3:</strong> 91 spinning toothed steel wheels induce pure sine waves, mixed via 9 harmonic drawbars and spun through a twin-rotor Doppler Leslie cabinet.</p>
        </div>
      </div>
    </section>

    <!-- SLIDE 3: MELLOTRON MECHANICS -->
    <section class="slide" id="slide-3">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 3 of 15</span>
        <span class="slide-counter">The Mellotron</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">The Mellotron: <span>Mechanical Tape Replay Action</span></h1>
        <p class="slide-lead">Invented in Birmingham by Streetly Electronics (adapted from Harry Chamberlin's US design), the Mellotron was the world's first polyphonic sample-playback instrument.</p>
      </div>

      <div class="grid-2">
        <div class="info-card highlight">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/mellotron_tape_mechanism_schematic.svg', 'Mellotron M400 Tape Replay Action Schematic')">
            <img src="/images/slides/classic_keyboards/mellotron_tape_mechanism_schematic.svg" alt="Mellotron Tape Action Schematic" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill tech">Mechanical Signal Path</span>
          <h3 class="card-title">How Each Note Operates</h3>
          <p class="card-text">Under each of the 35 keyboard keys lies a distinct length of <strong>3/8-inch magnetic tape</strong>. When a player presses a key:</p>
          <ul style="margin: 6px 0 0 16px; color: #cbd5e1; font-size: 12.5px; line-height: 1.5;">
            <li>A <strong>pinch roller</strong> pushes down against a constantly spinning <strong>capstan drive shaft</strong>.</li>
            <li>The rotating capstan pulls the tape across an individual <strong>magnetic playback head</strong>.</li>
            <li>The tape signal passes into an internal preamplifier and master volume circuit.</li>
          </ul>
        </div>

        <div class="info-card cyan-edge">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/mellotron_tape_frame.jpg', 'Inside the Mellotron M400: 35-Note Removable Tape Frame')">
            <img src="/images/slides/classic_keyboards/mellotron_tape_frame.jpg" alt="M400 Tape Frame" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill ao4">Historic Engineering</span>
          <h3 class="card-title">The Removable Tape Frame</h3>
          <p class="card-text">Early Mellotrons (Mk II) were colossal 350-lb furniture pieces. The later <strong>Mellotron M400 (1970)</strong> introduced a lightweight, removable tape frame allowing road crews to slide out the entire 35-tape assembly in 2 minutes to switch sound libraries between sets.</p>
          <div class="video-btn-row">
            <button class="video-trigger-btn" onclick="openVideo('kAFKuv5ZLns', 'Mellotron M400 Analog Tape Action Demonstration')">&#9654; Watch Tape Action</button>
            <a href="https://www.youtube.com/watch?v=kAFKuv5ZLns" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">&#9654; YouTube</a>
          </div>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Core Concept</span>
        <span class="takeaway-text">The Mellotron is purely analog tape playback: each key triggers a literal magnetic recording of an orchestral player playing that single note at that exact pitch.</span>
      </div>
    </section>

    <!-- SLIDE 4: MELLOTRON 8-SECOND LIMIT & RECORDINGS -->
    <section class="slide" id="slide-4">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 4 of 15</span>
        <span class="slide-counter">The Mellotron</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">The 8-Second Limit &amp; <span>Historic Recordings</span></h1>
        <p class="slide-lead">Why notes cannot sustain forever, the mechanical spring return, and the iconic tape sound banks that shaped 1960s psychedelic and 1970s progressive rock.</p>
      </div>

      <div class="grid-2">
        <div class="info-card amber-edge">
          <span class="spec-pill exam">Frequent Exam Question</span>
          <h3 class="card-title">The 8-Second Duration Limit</h3>
          <p class="card-text">Because each tape strip is approximately 6 feet long and travels at <strong>7.5 inches per second</strong>, a sustained key can only sound for a maximum of <strong>approximately 8 seconds</strong> before the tape physically ends!</p>
          <p class="card-text" style="margin-top: 8px;">When the tape reaches its end, audio abruptly cuts off. Releasing the key allows a mechanical <strong>return spring</strong> to snap the tape back into its storage bin. Players had to use 'spider' finger-pedaling techniques to play long sustained chord progressions.</p>
        </div>

        <div class="info-card highlight">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/mellotron_m400.jpg', 'Classic Mellotron M400 White Touring Console')">
            <img src="/images/slides/classic_keyboards/mellotron_m400.jpg" alt="Mellotron M400" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill ao4">Signature Sound Banks</span>
          <h3 class="card-title">Flutes, Strings &amp; Choir</h3>
          <p class="card-text">Each tape had 3 parallel tracks selectable via a mechanical track selector:</p>
          <ul style="margin: 6px 0 0 16px; color: #cbd5e1; font-size: 12.5px; line-height: 1.5;">
            <li><strong>Mk II Flute:</strong> The Beatles &mdash; <em>&quot;Strawberry Fields Forever&quot;</em> intro (1967).</li>
            <li><strong>3 Violins:</strong> King Crimson &mdash; <em>&quot;In the Court of the Crimson King&quot;</em> (1969).</li>
            <li><strong>8-Voice Choir:</strong> Genesis, Pink Floyd, The Moody Blues (<em>&quot;Nights in White Satin&quot;</em>).</li>
          </ul>
          <div class="video-btn-row">
            <button class="video-trigger-btn" onclick="openVideo('ByD8gH7kYxs', 'The Beatles - Strawberry Fields Forever (Mellotron Flute Intro)')">&#9654; Watch Beatles Intro</button>
            <a href="https://www.youtube.com/watch?v=ByD8gH7kYxs" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">&#9654; YouTube</a>
          </div>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Audio Cue</span>
        <span class="takeaway-text">Listen for subtle tape wow, pitch wobble, tape hiss, and the slight breath or bow scrape of the original session musician at note attack.</span>
      </div>
    </section>

    <!-- SLIDE 5: FENDER RHODES -->
    <section class="slide" id="slide-5">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 5 of 15</span>
        <span class="slide-counter">Fender Rhodes</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Fender Rhodes: <span>Tines, Tonebars &amp; Bell Chime</span></h1>
        <p class="slide-lead">Designed by Harold Rhodes during WWII for injured soldiers, the Fender Rhodes became the definitive electric piano of 1970s Jazz-Funk, Fusion, Soul, and Disco.</p>
      </div>

      <div class="grid-2">
        <div class="info-card highlight">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/fender_rhodes_tine_tonebar_schematic.svg', 'Fender Rhodes Tine &amp; Tonebar Acoustic Action Schematic')">
            <img src="/images/slides/classic_keyboards/fender_rhodes_tine_tonebar_schematic.svg" alt="Rhodes Tine Action Schematic" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill tech">Mechanical Generation</span>
          <h3 class="card-title">Asymmetrical Tuning Fork</h3>
          <p class="card-text">Pressing a key propels a <strong>neoprene-tipped hammer</strong> against a thin, tapered steel rod called a <strong>tine</strong>. The tine is rigidly joined to a heavy cast metal <strong>tonebar</strong>, forming an asymmetrical tuning fork that resonates with extraordinary sustain.</p>
        </div>

        <div class="info-card cyan-edge">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/fender_rhodes.jpg', 'Vintage Fender Rhodes Mark I Stage 73')">
            <img src="/images/slides/classic_keyboards/fender_rhodes.jpg" alt="Fender Rhodes" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill ao3">Electromagnetic Pickup</span>
          <h3 class="card-title">1 Pickup Per Note (Induction)</h3>
          <p class="card-text">Directly opposite the tip of each tine sits an <strong>individual electromagnetic pickup</strong> (an Alnico magnet wrapped in copper wire, identical in principle to an electric guitar pickup). The steel tine's vibration disturbs the magnetic field, generating an AC voltage.</p>
          <div class="video-btn-row">
            <button class="video-trigger-btn" onclick="openVideo('UbkqE4fpvdI', 'Herbie Hancock - Chameleon (Fender Rhodes Jazz-Funk Landmark)')">&#9654; Watch Herbie Hancock</button>
            <a href="https://www.youtube.com/watch?v=UbkqE4fpvdI" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">&#9654; YouTube</a>
          </div>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Timbral Profile</span>
        <span class="takeaway-text">Warm, chimey, bell-like timbre on soft notes. When played hard, the tine vibrates closer to the magnet pole piece, inducing slight harmonic bark and grit.</span>
      </div>
    </section>

    <!-- SLIDE 6: WURLITZER 200A -->
    <section class="slide" id="slide-6">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 6 of 15</span>
        <span class="slide-counter">Wurlitzer 200A</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Wurlitzer 200A: <span>Reeds &amp; Midrange Bark</span></h1>
        <p class="slide-lead">Manufactured by Rudolph Wurlitzer Company, the Wurlitzer 200A electric piano delivered a cutting, aggressive, biting tone favored by classic rock, R&amp;B, and pop bands.</p>
      </div>

      <div class="grid-2">
        <div class="info-card emerald-edge">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/wurlitzer_reed_electrostatic_pickup.svg', 'Wurlitzer 200A Reed and Electrostatic Pickup Schematic')">
            <img src="/images/slides/classic_keyboards/wurlitzer_reed_electrostatic_pickup.svg" alt="Wurlitzer Action Schematic" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill tech">Mechanical Generation</span>
          <h3 class="card-title">Felt Hammers &amp; Steel Reeds</h3>
          <p class="card-text">Unlike the Rhodes neoprene hammer and tine, the Wurlitzer utilizes a conventional piano-style <strong>felt hammer striking a small, flat, tuned steel reed</strong> screwed firmly into a massive grounded metal reed bar.</p>
        </div>

        <div class="info-card amber-edge">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/wurlitzer_200a.jpg', 'Classic Black Wurlitzer 200A Electric Piano')">
            <img src="/images/slides/classic_keyboards/wurlitzer_200a.jpg" alt="Wurlitzer 200A" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill ao3">Electrostatic Transduction</span>
          <h3 class="card-title">Polarized Comb Plate (+170V DC)</h3>
          <p class="card-text">Wurlitzers do NOT use electromagnetic coils! Instead, the vibrating steel reed acts as one plate of a variable capacitor inside an <strong>electrostatic pickup comb plate polarized with approximately +170V DC</strong>. The capacitance fluctuation converts directly into audio voltage.</p>
          <div class="video-btn-row">
            <button class="video-trigger-btn" onclick="openVideo('EPfmNxKLDG4', 'Beck - Where Its At (Iconic Wurlitzer 200A Intro Riff)')">&#9654; Watch Wurlitzer Riff</button>
            <a href="https://www.youtube.com/watch?v=EPfmNxKLDG4" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">&#9654; YouTube</a>
          </div>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Timbral Profile</span>
        <span class="takeaway-text">Raw, punchy, biting midrange bark with natural clipping distortion when hit forcefully. Built-in optocoupler tremolo circuit. Famous: Ray Charles (&quot;What'd I Say&quot;), Supertramp (&quot;The Logical Song&quot;), Queen (&quot;You're My Best Friend&quot;).</span>
      </div>
    </section>

    <!-- SLIDE 7: RHODES VS WURLITZER SHOOTOUT -->
    <section class="slide" id="slide-7">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 7 of 15</span>
        <span class="slide-counter">Technical Shootout</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Rhodes vs. Wurlitzer: <span>The Technical Shootout</span></h1>
        <p class="slide-lead">A direct examiner comparison: key questions in Edexcel Component 3 frequently require candidates to contrast the tone generation, pickups, and timbres of both electric pianos.</p>
      </div>

      <div class="grid-2">
        <div class="info-card cyan-edge">
          <span class="spec-pill ao3">Fender Rhodes Mark I</span>
          <h3 class="card-title">Rhodes Specifications</h3>
          <ul style="margin: 8px 0 0 18px; color: #cbd5e1; font-size: 13px; line-height: 1.65;">
            <li><strong>Sound Source:</strong> Tapered steel <strong>tines</strong> with heavy tonebars.</li>
            <li><strong>Hammer Material:</strong> Neoprene rubber tips.</li>
            <li><strong>Pickup Type:</strong> <strong>Electromagnetic</strong> coils (1 per note).</li>
            <li><strong>Timbral Envelope:</strong> Mellow, round fundamental with crystalline bell sustain.</li>
            <li><strong>Built-in Modulation:</strong> Stereo auto-pan tremolo (Suitcase model).</li>
            <li><strong>Genre Associations:</strong> Jazz fusion, Soul, R&amp;B, Disco, Yacht Rock.</li>
          </ul>
        </div>

        <div class="info-card emerald-edge">
          <span class="spec-pill ao3">Wurlitzer 200A</span>
          <h3 class="card-title">Wurlitzer Specifications</h3>
          <ul style="margin: 8px 0 0 18px; color: #cbd5e1; font-size: 13px; line-height: 1.65;">
            <li><strong>Sound Source:</strong> Tuned flat steel <strong>reeds</strong>.</li>
            <li><strong>Hammer Material:</strong> Conventional felt piano hammers.</li>
            <li><strong>Pickup Type:</strong> <strong>Electrostatic</strong> polarized plate (+170V DC).</li>
            <li><strong>Timbral Envelope:</strong> Biting, mid-frequency bark with aggressive breakup.</li>
            <li><strong>Built-in Modulation:</strong> Monophonic optical tremolo (vibrato circuit).</li>
            <li><strong>Genre Associations:</strong> Classic rock, Blues, 70s Pop, British Invasion.</li>
          </ul>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Examiner Tip</span>
        <span class="takeaway-text">Memory hook: &quot;Tines chime, reeds scream&quot; &mdash; Rhodes has tines and sounds like a warm bell; Wurlitzer has reeds and barks through a dense rock band mix.</span>
      </div>
    </section>

    <!-- SLIDE 8: HOHNER CLAVINET D6 -->
    <section class="slide" id="slide-8">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 8 of 15</span>
        <span class="slide-counter">Hohner Clavinet</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Hohner Clavinet D6: <span>Tangents &amp; Real Guitar Strings</span></h1>
        <p class="slide-lead">Designed by Ernst Zacharias in Germany to bring the Baroque clavichord into the electric age, the Clavinet became the definitive rhythmic engine of 1970s Funk music.</p>
      </div>

      <div class="grid-2">
        <div class="info-card amber-edge">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/hohner_clavinet_tangent_string_schematic.svg', 'Hohner Clavinet D6 Tangent and String Action Schematic')">
            <img src="/images/slides/classic_keyboards/hohner_clavinet_tangent_string_schematic.svg" alt="Clavinet Action Schematic" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill tech">Mechanical Action</span>
          <h3 class="card-title">Rubber Tangent Strikes String</h3>
          <p class="card-text">Beneath each key sits a small, firm <strong>rubber-tipped plunger called a tangent</strong>. When the key is depressed, the rubber tip pinches an <strong>actual steel guitar string against a metal anvil</strong>. Wool yarn woven around the non-speaking end mutes the string instantly upon key release.</p>
        </div>

        <div class="info-card highlight">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/hohner_clavinet_d6.jpg', 'Vintage Hohner Clavinet D6 with Woodgrain Case &amp; Castle Switches')">
            <img src="/images/slides/classic_keyboards/hohner_clavinet_d6.jpg" alt="Hohner Clavinet D6" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill ao3">Magnetic Pickups &amp; EQ</span>
          <h3 class="card-title">Dual Single-Coils &amp; Castle Filters</h3>
          <p class="card-text">Two electromagnetic single-coil pickups (neck and bridge) span the 60 strings. Rocker switches (Brilliant, Treble, Medium, Soft) insert high-pass and low-pass capacitor networks to dramatically contour the frequency response from twangy spank to deep thump.</p>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Zero Sustain</span>
        <span class="takeaway-text">Because the rubber tangent dampens the string when released and there is no soundboard, the Clavinet has very short, snappy decay &mdash; perfect for percussive 16th-note syncopated rhythm comping.</span>
      </div>
    </section>

    <!-- SLIDE 9: CLAVINET IN FUNK & WAH-WAH -->
    <section class="slide" id="slide-9">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 9 of 15</span>
        <span class="slide-counter">Funk Production</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">The Funk Staple: <span>Clavinet &amp; Wah-Wah Processing</span></h1>
        <p class="slide-lead">How Stevie Wonder and 1970s funk producers elevated the Clavinet into an explosive lead and rhythm voice by running its high-impedance signal into guitar effects pedals.</p>
      </div>

      <div class="grid-2">
        <div class="info-card highlight">
          <span class="spec-pill ao4">Landmark Track</span>
          <h3 class="card-title">Stevie Wonder &mdash; &quot;Superstition&quot; (1972)</h3>
          <p class="card-text">Recorded at Electric Lady Studios NYC, Stevie Wonder tracked the iconic rhythm groove by <strong>layering multiple separate passes of the Hohner Clavinet D6</strong> onto multitrack tape, each configured with different pickup combinations and EQ settings to create an interlocking, driving polyrhythm.</p>
          <div class="video-btn-row">
            <button class="video-trigger-btn" onclick="openVideo('ftdZ363R9kQ', 'Stevie Wonder - Superstition (Live Clavinet Landmark)')">&#9654; Watch Stevie Wonder</button>
            <a href="https://www.youtube.com/watch?v=ftdZ363R9kQ" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">&#9654; YouTube</a>
          </div>
        </div>

        <div class="info-card amber-edge">
          <span class="spec-pill tech">Studio Signal Routing</span>
          <h3 class="card-title">Wah-Wah &amp; Envelope Filtering</h3>
          <p class="card-text">Because the Clavinet's output is passive high-impedance magnetic (identical to a Fender Stratocaster), keyboardists plugged directly into guitar stompboxes:</p>
          <ul style="margin: 8px 0 0 16px; color: #cbd5e1; font-size: 12.5px; line-height: 1.5;">
            <li><strong>Crybaby / Vox Wah-Wah:</strong> Manual foot rocking sweeps a resonant bandpass filter, adding expressive vocal 'talking' articulation.</li>
            <li><strong>Mu-Tron III Envelope Filter:</strong> Dynamic auto-wah sweeping cutoff based on key velocity.</li>
            <li><strong>Fender Twin Reverb Amp:</strong> Providing spring reverb and valve power saturation.</li>
          </ul>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Exam Recognition</span>
        <span class="takeaway-text">If you hear a fast, funky, twangy keyboard with percussive attack, muted release clacks, and wah-wah filter sweeps in a 1970s Soul or Funk track, it is unmistakably a Hohner Clavinet D6!</span>
      </div>
    </section>

    <!-- SLIDE 10: HAMMOND B3 TONEWHEEL GENERATOR -->
    <section class="slide" id="slide-10">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 10 of 15</span>
        <span class="slide-counter">Hammond B3 Organ</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Hammond B3: <span>Synchronous Tonewheel Generator</span></h1>
        <p class="slide-lead">Patented by Laurens Hammond in 1934, the tonewheel organ replaced pipe organ bellows with an ultra-reliable mechanical synchronous motor and electromagnetic induction generator.</p>
      </div>

      <div class="grid-2">
        <div class="info-card highlight">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/hammond_b3_tonewheel_generator.svg', 'Hammond B3 Synchronous Tonewheel Generator Schematic')">
            <img src="/images/slides/classic_keyboards/hammond_b3_tonewheel_generator.svg" alt="Hammond Tonewheel Generator" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill tech">Electromagnetic Induction</span>
          <h3 class="card-title">91 Spinning Toothed Steel Discs</h3>
          <p class="card-text">A constant-speed synchronous motor turns a central drive shaft at exactly 1200 RPM. Arrayed along the shaft are <strong>91 toothed steel discs called tonewheels</strong>. As the metal teeth spin past a permanent magnet and coil pole piece, variations in magnetic reluctance induce a smooth electrical sine wave.</p>
        </div>

        <div class="info-card cyan-edge">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/hammond_b3_with_leslie.jpg', 'Vintage Hammond B3 Organ with Dual 61-Note Manuals &amp; Leslie 122')">
            <img src="/images/slides/classic_keyboards/hammond_b3_with_leslie.jpg" alt="Hammond B3 with Leslie" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill ao4">Why It Cannot Drift</span>
          <h3 class="card-title">Absolute Tuning Stability</h3>
          <p class="card-text">Because the synchronous motor locks directly to the AC mains electrical line frequency (60 Hz in the US, 50 Hz in the UK) and the tonewheel teeth ratios are physically machined into the steel discs, <strong>the Hammond tonewheel organ can NEVER drift out of tune</strong>, giving it unmatched reliability in gospel, jazz, and rock.</p>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Core Concept</span>
        <span class="takeaway-text">The tonewheel assembly generates 91 pure sine waves continuously running in the background. Pressing a key simply completes electrical contact to route these sine waves to the drawbars.</span>
      </div>
    </section>

    <!-- SLIDE 11: HAMMOND DRAWBARS & ADDITIVE MIXING -->
    <section class="slide" id="slide-11">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 11 of 15</span>
        <span class="slide-counter">Harmonic Drawbars</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Harmonic Drawbars: <span>Additive Synthesis Before Computers</span></h1>
        <p class="slide-lead">Nine mechanical sliding drawbars allow the organist to blend pure sine-wave harmonics in real time, mimicking traditional church pipe organ footage lengths.</p>
      </div>

      <div class="grid-2">
        <div class="info-card highlight">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/hammond_drawbar_harmonics_diagram.svg', 'Hammond 9 Harmonic Drawbars Diagram')">
            <img src="/images/slides/classic_keyboards/hammond_drawbar_harmonics_diagram.svg" alt="Hammond Drawbar Diagram" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill tech">Additive Synthesis</span>
          <h3 class="card-title">Traditional Pipe Footage Equivalents</h3>
          <p class="card-text">Each drawbar has 9 stepped volume settings (0 = silent, 8 = full volume). By pulling drawbars, organists combine harmonic sine waves:</p>
          <ul style="margin: 6px 0 0 16px; color: #cbd5e1; font-size: 12px; line-height: 1.5;">
            <li><strong>Brown Drawbars (Sub-harmonics):</strong> 16' (sub-octave), 5 1/3' (sub-fifth).</li>
            <li><strong>White Drawbars (Octaves):</strong> 8' (fundamental), 4', 2', 1'.</li>
            <li><strong>Black Drawbars (Mutation Stops):</strong> 2 2/3' (3rd harm), 1 3/5' (5th harm), 1 1/3' (6th harm).</li>
          </ul>
        </div>

        <div class="info-card amber-edge">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/hammond_drawbars.jpg', 'Hammond B3 Drawbar Bank Close-Up')">
            <img src="/images/slides/classic_keyboards/hammond_drawbars.jpg" alt="Hammond Drawbar Bank" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill exam">Classic Drawbar Registrations</span>
          <h3 class="card-title">Iconic Presets &amp; Recordings</h3>
          <ul style="margin: 6px 0 0 16px; color: #cbd5e1; font-size: 12.5px; line-height: 1.5;">
            <li><strong>888 000 000 (&quot;Jimmy Smith&quot;):</strong> Warm, punchy jazz tone utilizing the first 3 drawbars with 3rd harmonic percussion.</li>
            <li><strong>888 888 888 (&quot;All Out / Full Screamer&quot;):</strong> Jon Lord (Deep Purple) and rock power chords cutting through Marshall amps.</li>
            <li><strong>800 008 888 (&quot;Gospel Whistle&quot;):</strong> Deep sub-bass combined with screaming high whistling harmonics.</li>
          </ul>
          <div class="video-btn-row">
            <button class="video-trigger-btn" onclick="openVideo('_v2exWrsGOc', 'Booker T. &amp; The M.G.s - Green Onions (Hammond B3 &amp; Leslie)')">&#9654; Watch Green Onions</button>
            <a href="https://www.youtube.com/watch?v=_v2exWrsGOc" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">&#9654; YouTube</a>
          </div>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Acoustic Logic</span>
        <span class="takeaway-text">8-foot is concert unison pitch (middle C produces 261.6 Hz). 16-foot sounds one octave lower. 4-foot sounds one octave higher. 2-foot sounds two octaves higher.</span>
      </div>
    </section>

    <!-- SLIDE 12: HAMMOND MECHANICAL ARTIFACTS -->
    <section class="slide" id="slide-12">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 12 of 15</span>
        <span class="slide-counter">Mechanical Artifacts</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Hammond B3 Artifacts: <span>Key Click &amp; Harmonic Percussion</span></h1>
        <p class="slide-lead">Engineering imperfections and design choices that Laurens Hammond initially tried to eliminate became the most celebrated sonic hallmarks of the instrument.</p>
      </div>

      <div class="grid-3">
        <div class="info-card highlight">
          <span class="spec-pill exam">Signature Flaw</span>
          <h3 class="card-title">Transient &quot;Key Click&quot;</h3>
          <p class="card-text">Beneath each key sit 9 individual metal contact fingers making physical contact with 9 energized busbars. Because there is no low-pass filtering, the mechanical electrical connection generates a sharp high-frequency transient <strong>&quot;key click&quot;</strong> that gives staccato playing punch and bite.</p>
        </div>

        <div class="info-card cyan-edge">
          <span class="spec-pill tech">Decaying Accent</span>
          <h3 class="card-title">Harmonic Percussion</h3>
          <p class="card-text">Adds a sharp, non-sustaining ping to the note attack. Organists can select <strong>2nd Harmonic (4' octave)</strong> or <strong>3rd Harmonic (2 2/3' fifth)</strong> with Fast or Slow decay. It is monophonic / single-trigger: keys must be fully released before the percussion will re-trigger.</p>
        </div>

        <div class="info-card emerald-edge">
          <span class="spec-pill ao4">Mechanical Delay Line</span>
          <h3 class="card-title">Scanner Vibrato</h3>
          <p class="card-text">Rather than electronic LFO modulation, the B3 uses a physical <strong>rotary capacitor scanner delay line</strong> driven by the main motor. It continuously shifts phase across 16 LC stages, producing rich analog vibrato (pitch) or chorus (vibrato + dry mix).</p>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Audio Cue</span>
        <span class="takeaway-text">Listen for the distinctive percussive 'spit' or click at the beginning of fast jazz and gospel organ runs &mdash; that is authentic Hammond busbar key click!</span>
      </div>
    </section>

    <!-- SLIDE 13: LESLIE 122 ROTATING SPEAKER -->
    <section class="slide" id="slide-13">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 13 of 15</span>
        <span class="slide-counter">Leslie Speaker</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">The Leslie 122: <span>Acoustic Doppler Effect in Motion</span></h1>
        <p class="slide-lead">Invented by Donald Leslie (and initially despised by Laurens Hammond!), the rotating speaker cabinet turns static electrical organ tones into an immersive, swirling spatial soundscape.</p>
      </div>

      <div class="grid-2">
        <div class="info-card highlight">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/leslie_rotating_speaker_doppler.svg', 'Leslie 122 Rotary Speaker Acoustic Doppler Schematic')">
            <img src="/images/slides/classic_keyboards/leslie_rotating_speaker_doppler.svg" alt="Leslie Rotary Speaker Schematic" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill tech">Acoustic Crossover &amp; Rotors</span>
          <h3 class="card-title">Two Separate Rotating Elements</h3>
          <p class="card-text">A passive <strong>800 Hz crossover network</strong> splits the audio signal:</p>
          <ul style="margin: 6px 0 0 16px; color: #cbd5e1; font-size: 12.5px; line-height: 1.5;">
            <li><strong>High Frequencies (&gt;800 Hz):</strong> Routed to a compression driver firing into a <strong>rotating treble horn</strong> spinning counter-clockwise.</li>
            <li><strong>Low Frequencies (&lt;800 Hz):</strong> Routed to a stationary 15&quot; woofer firing into a <strong>curved wooden drum rotor</strong> spinning clockwise.</li>
          </ul>
        </div>

        <div class="info-card cyan-edge">
          <div class="card-thumb contain-img" onclick="openLightbox('/images/slides/classic_keyboards/leslie_speaker.jpg', 'Vintage Leslie 122 Rotary Speaker Wooden Cabinet')">
            <img src="/images/slides/classic_keyboards/leslie_speaker.jpg" alt="Leslie Speaker Cabinet" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <span class="spec-pill exam">Doppler Physics &amp; Speeds</span>
          <h3 class="card-title">Chorale vs. Tremolo &amp; Inertia</h3>
          <p class="card-text">As the speakers rotate toward and away from the listener, the <strong>Acoustic Doppler effect</strong> dynamically modulates frequency (vibrato) and amplitude (tremolo). A half-moon switch on the organ selects speeds:</p>
          <ul style="margin: 6px 0 0 16px; color: #cbd5e1; font-size: 12px; line-height: 1.5;">
            <li><strong>Chorale (Slow, ~40 RPM):</strong> Subtle, spacious chorusing shimmer.</li>
            <li><strong>Tremolo (Fast, ~400 RPM):</strong> Intense, dramatic rotary warble.</li>
            <li><strong>Motor Inertia:</strong> The heavy bass rotor accelerates slower than the lightweight treble horn, creating glorious transitional tension!</li>
          </ul>
          <div class="video-btn-row">
            <button class="video-trigger-btn" onclick="openVideo('Mb3iPP-tHdA', 'Procol Harum - A Whiter Shade of Pale (Classic Hammond &amp; Leslie)')">&#9654; Watch Leslie Warble</button>
            <a href="https://www.youtube.com/watch?v=Mb3iPP-tHdA" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">&#9654; YouTube</a>
          </div>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Landmark Tracks</span>
        <span class="takeaway-text">Procol Harum (&quot;A Whiter Shade of Pale&quot;), The Beatles (&quot;Let It Be&quot; organ solo, and John Lennon's vocal on &quot;Tomorrow Never Knows&quot; fed through a Leslie cabinet!).</span>
      </div>
    </section>

    <!-- SLIDE 14: STUDIO AMPLIFICATION & FX PROCESSING -->
    <section class="slide" id="slide-14">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 14 of 15</span>
        <span class="slide-counter">Studio Production</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Studio Tracking: <span>Amps, DI Boxes &amp; Pedal Processing</span></h1>
        <p class="slide-lead">How legendary studio engineers captured classic keyboards in the control room: impedance matching, tube amplification, and iconic outboard stompboxes.</p>
      </div>

      <div class="grid-3">
        <div class="info-card highlight">
          <span class="spec-pill tech">Direct Injection</span>
          <h3 class="card-title">DI Box Recording</h3>
          <p class="card-text">Rhodes and Clavinets have high-impedance instrument outputs. Engineers used <strong>active or passive DI boxes</strong> (Jensen transformers) to convert the unbalanced signal to balanced low-impedance mic level for console mic preamps (Neve 1073 / API 512c), capturing pristine transient snap.</p>
        </div>

        <div class="info-card amber-edge">
          <span class="spec-pill ao3">Guitar Amplifiers</span>
          <h3 class="card-title">Fender Twin Reverb</h3>
          <p class="card-text">Running Rhodes or Clavinet through an all-valve <strong>Fender Twin Reverb (2x12)</strong> or Marshall stack added natural 6L6 tube saturation, warm mid-range glue, and luscious spring reverb. Jon Lord famously hot-rodded his Hammond directly into Marshall 100W heads.</p>
        </div>

        <div class="info-card cyan-edge">
          <span class="spec-pill ao4">Classic Modulation</span>
          <h3 class="card-title">Phasers &amp; Chorus</h3>
          <p class="card-text">In 70s disco and fusion, the Rhodes was almost always paired with an analog phaser: the <strong>Electro-Harmonix Small Stone (OTA-based 4-stage phaser)</strong> or MXR Phase 90, creating rich, liquid stereo movement across the stereo spectrum.</p>
        </div>
      </div>

      <div class="takeaway-box">
        <span class="takeaway-tag">Component 2 NEA Audio Tip</span>
        <span class="takeaway-text">When recreating vintage keys in your DAW, always insert amp emulation (Fender Twin or Tweed), analog saturation, and tape delay / phaser plugins to prevent synthetic sterility.</span>
      </div>
    </section>

    <!-- SLIDE 15: EXAM REVISION SUMMARY -->
    <section class="slide" id="slide-15">
      <div class="header-bar">
        <span class="deck-tag">Electro-Mechanical Keyboards &bull; Slide 15 of 15</span>
        <span class="slide-counter">Exam Revision</span>
      </div>
      <div class="slide-title-wrap">
        <h1 class="slide-heading">Edexcel Exam Revision: <span>Question 5 Audio Cheat Sheet</span></h1>
        <p class="slide-lead">The definitive revision cheat sheet for identifying classic keyboards in Component 3 listening exams, complete with acoustic flaws and production trademarks.</p>
      </div>

      <div class="info-card highlight" style="margin-bottom: 16px;">
        <span class="spec-pill exam">Identification Matrix</span>
        <h3 class="card-title">Examiner Sound Identification Cues</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12.5px; color: #cbd5e1;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(255, 255, 255, 0.15); text-align: left; color: #c084fc;">
              <th style="padding: 8px 6px;">Instrument</th>
              <th style="padding: 8px 6px;">Mechanical Sound Source</th>
              <th style="padding: 8px 6px;">Pickup Mechanism</th>
              <th style="padding: 8px 6px;">Key Sonic Clues / Flaws</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 8px 6px; font-weight: 700; color: #ffffff;">Mellotron M400</td>
              <td style="padding: 8px 6px;">3/8&quot; Magnetic tape strips</td>
              <td style="padding: 8px 6px;">Magnetic playback heads</td>
              <td style="padding: 8px 6px; color: #fbbf24;">8-second max duration, tape hiss, pitch flutter, vintage flute/string timbre</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 8px 6px; font-weight: 700; color: #ffffff;">Fender Rhodes</td>
              <td style="padding: 8px 6px;">Steel tines + tonebars</td>
              <td style="padding: 8px 6px;">Electromagnetic coils (1/note)</td>
              <td style="padding: 8px 6px; color: #38bdf8;">Warm bell chime, long sustain, auto-pan stereo tremolo</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 8px 6px; font-weight: 700; color: #ffffff;">Wurlitzer 200A</td>
              <td style="padding: 8px 6px;">Steel reeds + felt hammers</td>
              <td style="padding: 8px 6px;">Electrostatic plate (+170V DC)</td>
              <td style="padding: 8px 6px; color: #34d399;">Biting midrange bark, rapid attack, natural valve clipping distortion</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 8px 6px; font-weight: 700; color: #ffffff;">Hohner Clavinet D6</td>
              <td style="padding: 8px 6px;">Real guitar strings + tangents</td>
              <td style="padding: 8px 6px;">Dual single-coil pickups</td>
              <td style="padding: 8px 6px; color: #fbbf24;">Hyper-percussive twang, zero sustain, wah-wah filtering, funky 16th comping</td>
            </tr>
            <tr>
              <td style="padding: 8px 6px; font-weight: 700; color: #ffffff;">Hammond B3 Organ</td>
              <td style="padding: 8px 6px;">91 rotating toothed tonewheels</td>
              <td style="padding: 8px 6px;">Inductive magnetic pickups</td>
              <td style="padding: 8px 6px; color: #f472b6;">Transient key click, harmonic percussion, additive drawbars, Leslie Doppler warble</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="/classic-keyboards-interactive-quiz.html" style="display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #c084fc 0%, #38bdf8 100%); color: #080e1a; font-weight: 800; font-size: 14px; padding: 12px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 20px rgba(192, 132, 252, 0.4);">
          Take the 10-Question Specification Quiz &rarr;
        </a>
      </div>
    </section>

  </div>

  <!-- FIXED NAVIGATION FOOTER -->
  <footer class="deck-nav-footer">
    <div class="nav-inner">
      <button class="nav-btn" id="prevBtn" onclick="prevSlide()" disabled>&larr; Previous</button>
      <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
      </div>
      <span id="slideCounter" style="color: #94a3b8; font-size: 12px; font-weight: 700; min-width: 90px; text-align: center;">Slide 1 of 15</span>
      <button class="nav-btn" id="nextBtn" onclick="nextSlide()">Next &rarr;</button>
    </div>
  </footer>

  <!-- LIGHTBOX IMAGE INSPECTION MODAL -->
  <div class="image-modal-backdrop" id="imageModal" onclick="closeLightbox()">
    <button class="close-modal-btn" onclick="closeLightbox()">&times;</button>
    <div class="image-modal-content" onclick="event.stopPropagation()">
      <img id="imageModalImg" src="" alt="Enlarged schematic">
      <div class="image-modal-caption" id="imageModalCaption"></div>
    </div>
  </div>

  <!-- VIDEO MODAL PLAYER (ZERO HISTORY FOOTPRINT) -->
  <div class="video-modal-backdrop" id="videoModal">
    <div class="video-modal-content">
      <div class="video-modal-header">
        <span class="video-modal-title" id="videoModalTitle">Video Masterclass</span>
        <div style="display: flex; gap: 10px; align-items: center;">
          <a id="videoExternalLink" href="#" target="_blank" rel="noopener noreferrer" class="yt-direct-btn" title="Open directly on YouTube">
            <span>Watch on YouTube</span> <span>&nearr;</span>
          </a>
          <button class="close-modal-btn" onclick="closeVideo()" style="position: static; width: 30px; height: 30px; font-size: 18px;">&times;</button>
        </div>
      </div>
      <div class="video-player-wrapper" id="videoWrapper"></div>
      <div class="video-modal-footer">
        <span style="display: inline-flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Authentic Curriculum Performance &bull; YouTube Integration
        </span>
        <a id="videoFooterLink" href="#" target="_blank" rel="noopener noreferrer" style="color: #c084fc; font-weight: 700; text-decoration: none;">Watch Directly on YouTube &rarr;</a>
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

    function openLightbox(src, caption) {
      if (!imageModal || !imageModalImg) return;
      imageModalImg.src = src;
      if (imageModalCaption) imageModalCaption.textContent = caption || '';
      imageModal.classList.add('open');
      imageModal.style.display = 'flex';
    }

    function closeLightbox() {
      if (!imageModal) return;
      imageModal.classList.remove('open');
      imageModal.style.display = 'none';
      if (imageModalImg) imageModalImg.src = '';
    }

    // Video modal logic (Zero History Pollution - avoids iframe history hijacking)
    const videoModal = document.getElementById('videoModal');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoWrapper = document.getElementById('videoWrapper') || document.querySelector('.video-player-wrapper');

    function openVideo(videoId, title) {
      const extLink = document.getElementById('videoExternalLink');
      if (extLink) extLink.href = `https://www.youtube.com/watch?v=${videoId}`;
      const footLink = document.getElementById('videoFooterLink');
      if (footLink) footLink.href = `https://www.youtube.com/watch?v=${videoId}`;
      if (videoModalTitle) videoModalTitle.textContent = title;

      if (videoWrapper) {
        videoWrapper.innerHTML = `<iframe id="videoIframe" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%; border: 0; display: block;"></iframe>`;
      }
      if (videoModal) {
        videoModal.classList.add('open');
        videoModal.style.display = 'flex';
      }
    }

    function closeVideo() {
      if (videoWrapper) videoWrapper.innerHTML = '';
      if (videoModal) {
        videoModal.classList.remove('open');
        videoModal.style.display = 'none';
      }
    }

    if (videoModal) {
      videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideo();
      });
    }

    function updateDeck() {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
      });
      if (prevBtn) prevBtn.disabled = (currentSlide === 0);
      if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides - 1);
      if (slideCounter) slideCounter.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
      if (progressFill) progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
      // Use replaceState so slide switching NEVER adds entries to browser back-button history
      if (window.history && window.history.replaceState) {
        window.history.replaceState({ slide: currentSlide }, '', '#slide-' + (currentSlide + 1));
      }
    }

    function nextSlide() {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateDeck();
      }
    }

    function prevSlide() {
      if (currentSlide > 0) {
        currentSlide--;
        updateDeck();
      }
    }

    document.addEventListener('keydown', (e) => {
      if (videoModal && videoModal.classList.contains('open')) {
        if (e.key === 'Escape') {
          closeVideo();
          return;
        }
      }
      if (imageModal && imageModal.classList.contains('open')) {
        if (e.key === 'Escape') {
          closeLightbox();
          return;
        }
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    });

    // Check for hash on load
    const hashMatch = window.location.hash.match(/slide-(\d+)/);
    if (hashMatch) {
      const target = parseInt(hashMatch[1], 10) - 1;
      if (target >= 0 && target < totalSlides) {
        currentSlide = target;
      }
    }
    updateDeck();
  </script>
</body>
</html>'''

    with open('public/interactive-slide-classic-keyboards.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated public/interactive-slide-classic-keyboards.html ({len(html)} bytes)")

if __name__ == '__main__':
    generate_deck()
