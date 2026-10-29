import os

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>Guitar &amp; Bass Amplifiers: Sound, Tubes, Stacks &amp; Modellers | Edexcel Component 3</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #080e1a;
      --panel-bg: #0f172a;
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-music: #f59e0b;
      --accent-music-glow: rgba(245, 158, 11, 0.25);
      --accent-amp: #ef4444;
      --accent-amp-glow: rgba(239, 68, 68, 0.25);
      --accent-tube: #f97316;
      --text-white: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --border-subtle: rgba(255, 255, 255, 0.06);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg-dark);
      color: var(--text-white);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.5;
      overflow-x: hidden;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .deck-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 16px 20px 80px;
      width: 100%;
      flex: 1;
    }

    .slide {
      display: none;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .slide.active {
      display: block;
      opacity: 1;
    }

    .slide-header {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .deck-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: var(--accent-music);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 8px;
    }

    .slide-heading {
      font-size: clamp(22px, 3.2vw, 34px);
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #ffffff;
      margin-bottom: 6px;
    }

    .slide-heading span {
      color: var(--accent-amp);
    }

    .slide-lead {
      color: var(--text-muted);
      font-size: clamp(13px, 1.4vw, 15px);
      max-width: 950px;
      line-height: 1.5;
    }

    /* 2-COLUMN SPLIT GRID */
    .grid-2-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      align-items: start;
    }

    @media (max-width: 960px) {
      .grid-2-split {
        grid-template-columns: 1fr;
      }
    }

    .column-panel {
      background: var(--panel-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
    }

    .music-col {
      border-top: 4px solid var(--accent-music);
    }

    .instrument-col {
      border-top: 4px solid var(--accent-amp);
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .panel-badge {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 6px;
    }

    .music-badge {
      background: rgba(245, 158, 11, 0.15);
      color: var(--accent-music);
      border: 1px solid rgba(245, 158, 11, 0.35);
    }

    .inst-badge {
      background: rgba(239, 68, 68, 0.15);
      color: var(--accent-amp);
      border: 1px solid rgba(239, 68, 68, 0.35);
    }

    .panel-subtitle {
      font-size: 12px;
      color: var(--text-dim);
      font-weight: 600;
    }

    /* SONG BANNER */
    .song-banner {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 14px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .song-artist-name {
      color: #fbbf24;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .song-track-name {
      color: #ffffff;
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.2px;
    }

    /* VIDEO EMBED */
    .card-video-embed {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      border-radius: 12px;
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 14px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }

    .card-video-embed iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    /* FOCUS CARD */
    .music-focus-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 14px;
    }

    .focus-title {
      color: var(--accent-music);
      font-size: 11.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .focus-text {
      color: var(--text-muted);
      font-size: 13px;
      line-height: 1.55;
    }

    .focus-text strong {
      color: #ffffff;
    }

    .audio-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .atag {
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.2);
      color: #fde68a;
      font-size: 10.5px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
    }

    /* INSTRUMENT PHOTO CARD */
    .instrument-photo-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      background: #020617;
      border: 1px solid rgba(239, 68, 68, 0.3);
      margin-bottom: 14px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    }

    .instrument-photo {
      width: 100%;
      height: 230px;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    .instrument-photo:hover {
      transform: scale(1.02);
    }

    .instrument-photo-caption {
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(8px);
      padding: 8px 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .caption-name {
      font-size: 12px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .caption-spec {
      font-size: 10.5px;
      color: #fca5a5;
      font-family: 'JetBrains Mono', monospace;
    }

    /* HISTORY CARD */
    .history-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 14px;
    }

    .history-title {
      color: var(--accent-amp);
      font-size: 11.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 6px;
    }

    .history-text {
      color: var(--text-muted);
      font-size: 13px;
      line-height: 1.55;
    }

    .history-text strong {
      color: #ffffff;
    }

    /* MECHANICS STEPS */
    .mechanics-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px 16px;
    }

    .mechanics-title {
      color: #fca5a5;
      font-size: 11.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 10px;
    }

    .mech-steps {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mech-step {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.04);
      padding: 8px 12px;
      border-radius: 8px;
    }

    .step-num {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
      font-weight: 800;
      font-size: 11px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
      border: 1px solid rgba(239, 68, 68, 0.4);
    }

    .step-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .step-name {
      font-size: 12px;
      font-weight: 700;
      color: #ffffff;
    }

    .step-desc {
      font-size: 11.5px;
      color: #94a3b8;
      line-height: 1.45;
    }

    /* COMPARISON TABLE ON SLIDE 14 */
    .comp-table-wrap {
      overflow-x: auto;
      margin-top: 10px;
      border-radius: 10px;
      border: 1px solid var(--card-border);
      background: rgba(0, 0, 0, 0.3);
    }

    .comp-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
      text-align: left;
    }

    .comp-table th {
      background: rgba(239, 68, 68, 0.18);
      color: #ffffff;
      padding: 9px 12px;
      font-weight: 800;
      border-bottom: 1px solid var(--card-border);
      white-space: nowrap;
      font-size: 11px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .comp-table td {
      padding: 8px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      color: var(--text-muted);
      line-height: 1.4;
    }

    .comp-table tr:hover td {
      background: rgba(255, 255, 255, 0.03);
      color: #ffffff;
    }

    /* BOTTOM CONTROLS */
    .deck-nav-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(8, 14, 26, 0.94);
      backdrop-filter: blur(12px);
      border-top: 1px solid var(--card-border);
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
    }

    .nav-btn {
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .nav-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
    }

    .nav-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .nav-btn.primary {
      background: linear-gradient(135deg, #ef4444 0%, #f59e0b 100%);
      color: #080e1a;
      border: none;
      font-weight: 800;
    }

    .nav-btn.primary:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .slide-counter {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-dim);
      font-family: 'JetBrains Mono', monospace;
    }

    .slide-counter strong {
      color: #ffffff;
    }

    .nav-shortcuts {
      font-size: 11px;
      color: var(--text-dim);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .kbd {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      padding: 2px 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: #ffffff;
    }
  </style>
</head>
<body>

  <div class="deck-container">
{SLIDES_HTML}
  </div>

  <!-- NAVIGATION BAR -->
  <div class="deck-nav-bar">
    <div style="display: flex; align-items: center; gap: 10px;">
      <button class="nav-btn" id="prevBtn" onclick="prevSlide()" disabled>&larr; Previous</button>
      <button class="nav-btn primary" id="nextBtn" onclick="nextSlide()">Next &rarr;</button>
      <span class="slide-counter">Slide <strong id="currentSlideNum">1</strong> of <strong id="totalSlideNum">14</strong></span>
    </div>

    <div class="nav-shortcuts">
      <span>Navigate: <span class="kbd">&larr;</span> <span class="kbd">&rarr;</span> or <span class="kbd">Space</span></span>
      <button class="nav-btn" onclick="toggleFullscreen()" style="padding: 6px 12px; font-size: 11px;">Fullscreen &nearr;</button>
    </div>
  </div>

  <script>
    let currentSlide = 1;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    document.getElementById('totalSlideNum').textContent = totalSlides;

    function showSlide(n) {
      if (n < 1) n = 1;
      if (n > totalSlides) n = totalSlides;
      currentSlide = n;

      slides.forEach((s, idx) => {
        if (idx === currentSlide - 1) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });

      document.getElementById('currentSlideNum').textContent = currentSlide;
      document.getElementById('prevBtn').disabled = (currentSlide === 1);
      document.getElementById('nextBtn').disabled = (currentSlide === totalSlides);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function nextSlide() {
      if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
      }
    }

    function prevSlide() {
      if (currentSlide > 1) {
        showSlide(currentSlide - 1);
      }
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    });

    // Check URL hash for slide number e.g. #slide-5
    function checkHash() {
      const hash = window.location.hash;
      const match = hash.match(/#slide-(\\d+)/);
      if (match) {
        const s = parseInt(match[1], 10);
        if (s >= 1 && s <= totalSlides) {
          showSlide(s);
          return;
        }
      }
      showSlide(1);
    }

    window.addEventListener('hashchange', checkHash);
    checkHash();
  </script>
</body>
</html>
"""

def make_slide(num, total, tag, heading, lead,
               p_sub_music, artist, track, video_id,
               focus_title, focus_p1, focus_p2, tags,
               p_sub_inst,
               photo, photo_alt, cap_name, cap_spec,
               h_title, h_p1, h_p2,
               m_title, steps):
    tags_html = "".join([f'<span class="atag">{t}</span>' for t in tags])
    steps_html = ""
    for s_num, s_name, s_desc in steps:
        steps_html += f'''
            <div class="mech-step">
              <span class="step-num">{s_num}</span>
              <div class="step-body">
                <span class="step-name">{s_name}</span>
                <span class="step-desc">{s_desc}</span>
              </div>
            </div>'''

    return f'''
    <!-- SLIDE {num:02d} -->
    <div class="slide" data-slide="{num}">
      <div class="slide-header">
        <div class="deck-tag"><span>⚡</span> {tag} &bull; Slide {num} of {total}</div>
        <h1 class="slide-heading">{heading}</h1>
        <p class="slide-lead">{lead}</p>
      </div>

      <div class="grid-2-split">
        <!-- LEFT: MUSIC -->
        <div class="column-panel music-col">
          <div class="panel-header">
            <span class="panel-badge music-badge">🎵 Landmark Recording</span>
            <span class="panel-subtitle">{p_sub_music}</span>
          </div>
          <div class="song-banner">
            <span class="song-artist-name">{artist}</span>
            <span class="song-track-name">{track}</span>
          </div>
          <div class="card-video-embed">
            <iframe referrerpolicy="strict-origin-when-cross-origin" src="https://www.youtube-nocookie.com/embed/{video_id}" title="{artist} - {track}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="music-focus-card">
            <div class="focus-title">{focus_title}</div>
            <p class="focus-text">{focus_p1}</p>
            <p class="focus-text" style="margin-top: 8px;">{focus_p2}</p>
          </div>
          <div class="audio-tags">
            {tags_html}
          </div>
        </div>

        <!-- RIGHT: INSTRUMENT SPECS -->
        <div class="column-panel instrument-col">
          <div class="panel-header">
            <span class="panel-badge inst-badge">⚙️ Amplifier Architecture</span>
            <span class="panel-subtitle">{p_sub_inst}</span>
          </div>

          <div class="instrument-photo-card">
            <img src="{photo}" alt="{photo_alt}" class="instrument-photo">
            <div class="instrument-photo-caption">
              <span class="caption-name">{cap_name}</span>
              <span class="caption-spec">{cap_spec}</span>
            </div>
          </div>

          <div class="history-card">
            <div class="history-title">📜 {h_title}</div>
            <p class="history-text">{h_p1}</p>
            <p class="history-text" style="margin-top: 8px;">{h_p2}</p>
          </div>

          <div class="mechanics-card">
            <div class="mechanics-title">🔬 {m_title}</div>
            <div class="mech-steps">
              {steps_html}
            </div>
          </div>
        </div>
      </div>
    </div>
'''

def make_table_slide(num, total, tag, heading, lead,
                     p_sub_music, artist, track, video_id,
                     focus_title, focus_p1, focus_p2, tags,
                     p_sub_inst,
                     photo, photo_alt, cap_name, cap_spec,
                     h_title, h_p1, h_p2,
                     table_rows):
    tags_html = "".join([f'<span class="atag">{t}</span>' for t in tags])
    rows_html = ""
    for col1, col2, col3, col4 in table_rows:
        rows_html += f'''
            <tr>
              <td style="font-weight: 700; color: #ffffff;">{col1}</td>
              <td><span style="color: #fde68a; font-family: 'JetBrains Mono', monospace;">{col2}</span></td>
              <td>{col3}</td>
              <td>{col4}</td>
            </tr>'''

    return f'''
    <!-- SLIDE {num:02d} -->
    <div class="slide" data-slide="{num}">
      <div class="slide-header">
        <div class="deck-tag"><span>⚡</span> {tag} &bull; Slide {num} of {total}</div>
        <h1 class="slide-heading">{heading}</h1>
        <p class="slide-lead">{lead}</p>
      </div>

      <div class="grid-2-split">
        <!-- LEFT: MUSIC -->
        <div class="column-panel music-col">
          <div class="panel-header">
            <span class="panel-badge music-badge">🎵 Landmark Recording</span>
            <span class="panel-subtitle">{p_sub_music}</span>
          </div>
          <div class="song-banner">
            <span class="song-artist-name">{artist}</span>
            <span class="song-track-name">{track}</span>
          </div>
          <div class="card-video-embed">
            <iframe referrerpolicy="strict-origin-when-cross-origin" src="https://www.youtube-nocookie.com/embed/{video_id}" title="{artist} - {track}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="music-focus-card">
            <div class="focus-title">{focus_title}</div>
            <p class="focus-text">{focus_p1}</p>
            <p class="focus-text" style="margin-top: 8px;">{focus_p2}</p>
          </div>
          <div class="audio-tags">
            {tags_html}
          </div>
        </div>

        <!-- RIGHT: INSTRUMENT MATRIX -->
        <div class="column-panel instrument-col">
          <div class="panel-header">
            <span class="panel-badge inst-badge">⚙️ Exam Specification Matrix</span>
            <span class="panel-subtitle">{p_sub_inst}</span>
          </div>

          <div class="instrument-photo-card">
            <img src="{photo}" alt="{photo_alt}" class="instrument-photo">
            <div class="instrument-photo-caption">
              <span class="caption-name">{cap_name}</span>
              <span class="caption-spec">{cap_spec}</span>
            </div>
          </div>

          <div class="history-card">
            <div class="history-title">📜 {h_title}</div>
            <p class="history-text">{h_p1}</p>
            <p class="history-text" style="margin-top: 8px;">{h_p2}</p>
          </div>

          <div class="comp-table-wrap">
            <table class="comp-table">
              <thead>
                <tr>
                  <th>Amp Family</th>
                  <th>Valves &bull; Power</th>
                  <th>Speakers &bull; Cabinet</th>
                  <th>Sonic Character &bull; Exam Focus</th>
                </tr>
              </thead>
              <tbody>
                {rows_html}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
'''

slides_list = []

# SLIDE 1
slides_list.append(make_slide(
    1, 14, "Amplifier Evolution", "Guitar &amp; Bass Amplifiers: <span>The Sonic Lineage</span>",
    "From low-wattage jazz combos fighting big band brass to wall-of-sound Marshall stacks, thunderous Ampeg bass rigs, and modern neural DSP modellers.",
    "Early Electric Guitar Explosion", "Chuck Berry", '"Johnny B. Goode" (1958 &bull; Chess Records)', "OoJkLl-RboU",
    "Ear-Training Diagnostic: The Birth of Guitar Rock",
    "Listen to how the pushed valve amplifier adds <strong>even-order harmonic grit</strong> and dynamic compression to Chuck Berry's opening double-stop licks. Recorded at Chess Studios in Chicago, this tone defined rock 'n' roll guitar.",
    "Notice the natural tape slapback echo combined with the forward midrange push of an open-back valve combo. The amplifier is not merely magnifying the guitar; it is acting as a primary sound-shaping instrument.",
    ["Chess Records", "Valve Breakup", "Slapback Echo", "Double-Stops", "50s Rock 'n' Roll"],
    "The Evolution of Electric Volume",
    "/images/slides/amplifiers/guitar_amp_stage.png", "Guitar Amplifier Stage Setup",
    "🔊 The Evolution of Guitar Amplification", "Combo vs. Stack &bull; Analogue Valves to Neural DSP",
    "From Acoustic Struggle to Stadium Domination",
    "In the 1930s and 40s, archtop acoustic guitars were physically incapable of competing with the blaring horn sections of big bands. Pioneers like George Beauchamp ('The Frying Pan') and Charlie Christian attached electromagnetic pickups, demanding an electrical solution.",
    "Over the next 70 years, amplifiers evolved from modest 10-watt radio-circuit combos into high-voltage 100-watt tube stacks, solid-state transistor clean machines, and modern mathematical DSP modellers running on stage and in the studio.",
    "The Core Architecture of Guitar & Bass Amplification",
    [
        ("1", "Preamp Gain Stage", "High-impedance instrument signal is elevated from millivolts to volts using 12AX7 valves or solid-state op-amps, introducing initial harmonic saturation."),
        ("2", "Passive Tone Stack", "Frequency-shaping networks (Treble, Middle, Bass) sculpt the tonal curve, creating characteristic mid-scoops (Fender) or mid-humps (Marshall/Vox)."),
        ("3", "Power Section & Output Transformer", "High-current valves (EL34, 6L6, EL84, 6550) generate acoustic wattage, coupled through an iron output transformer to match speaker coil impedance."),
        ("4", "Loudspeaker Transduction & Cabinet Physics", "Dynamic speaker drivers in open-back combos disperse room ambiance, while heavy closed-back birch cabinets project directional, punchy low-end punch.")
    ]
))

# SLIDE 2
slides_list.append(make_slide(
    2, 14, "Early Electrification", "Les Paul: <span>The Pioneer of Electrified Clean Sound</span>",
    "How Les Paul's relentless drive for clean volume and multitrack precision drove the development of low-distortion valve amplifiers and solidbody guitars.",
    "First Multitrack Hit & Pristine Tube Clean", "Les Paul & Mary Ford", '"How High the Moon" (1951 &bull; Capitol Records)', "glcTS_21uaY",
    "Ear-Training Diagnostic: Sound-on-Sound Multitracking",
    "Listen to the crystal-clear articulation in Les Paul's rapid staccato picking. To execute up to 24 layers of sound-on-sound recording on his modified Ampex tape recorder, his guitar tone required <strong>maximum clarity and zero flabby distortion</strong>.",
    "Every transient note pops through the dense vocal overdubs of Mary Ford. Notice how early low-wattage valve combos maintained linear fidelity at moderate recording volumes before the concept of intentional guitar overdrive existed.",
    ["Sound-on-Sound", "Ampex Tape", "Pristine Clean", "6V6 Valve Tone", "Les Paul 'The Log'"],
    "Early Valve Combo Engineering",
    "/images/slides/amplifiers/les_paul_mary_ford_1951.jpg", "Les Paul & Mary Ford 1951",
    "🎸 Les Paul & Mary Ford (1951)", "Pioneers of Solidbody Electric Guitars & Studio Overdubbing",
    "The Quest for Pure Sustain and Feedback Elimination",
    "In 1941, jazz virtuoso Les Paul built 'The Log'—a 4x4 pine block with guitar neck and pickups attached inside an Epiphone hollowbody shell. Hollowbody guitars fed back uncontrollably when amplified loudly; a solid core eliminated resonant howling.",
    "Les Paul worked closely with Gibson and custom audio builders to create amplifiers that reproduced the wide frequency spectrum of his custom wound pickups without early harmonic distortion, laying the technical foundation for the 1952 Gibson Les Paul guitar.",
    "Low-Wattage Octal & 6V6 Valve Topology",
    [
        ("1", "Field-Coil & Early Permanent Alnico Speakers", "Early 1940s/50s amps employed 10-inch or 12-inch Alnico magnet speakers with lightweight paper cones for rapid transient response."),
        ("2", "Cathode-Biased 6V6 Beam Tetrode Output", "Low plate voltages (~300V) produced 10 to 14 watts of smooth, warm power with natural second-order harmonic sweetness."),
        ("3", "Octal Preamp Valves (6SJ7 / 6SN7)", "Before miniature dual-triodes (12AX7) became universal, large glass octal tubes delivered robust, low-noise voltage gain."),
        ("4", "Direct-to-Tape Clean Tracking", "Close-micing small combo amps with ribbon microphones (RCA 44BX/77DX) delivered warm proximity low-end without room reverberation.")
    ]
))

# SLIDE 3
slides_list.append(make_slide(
    3, 14, "The American Tweed Era", "Fender Bassman 5F6-A: <span>The Blueprint for Rock</span>",
    "Leo Fender's 1959 4x10 tweed circuit was designed for bassists but became the most influential guitar amplifier in history—the direct forefather of Marshall.",
    "Raw Power Chord Distortion & Sub-Octave Tremolo", "Link Wray & His Ray Men", '"Rumble" (1958 &bull; Cadence Records)', "CHoBnuLkFnQ",
    "Ear-Training Diagnostic: The First Heavy Guitar Sound",
    "Link Wray's 'Rumble' was banned on several US radio stations for its menacing, aggressive tone—despite having no lyrics! Listen to the <strong>visceral power chord sustain and speaker cone compression</strong> as the valve amplifier is pushed into natural saturation.",
    "Notice how the lower register chords push the output valves into compression while the pulsating opto-tremolo chops the signal, creating a dark, hypnotic rockabilly instrumental masterpiece.",
    ["Power Chord Rumble", "Valve Compression", "Pushed 6L6s", "Opto-Tremolo", "Proto-Punk"],
    "The Iconic 5F6-A Circuit Architecture",
    "/images/slides/amplifiers/fender_bassman_5f6a.jpg", "Fender 1959 Bassman 5F6-A",
    "⚡ Fender 1959 4x10 Bassman (5F6-A)", "4x10 Jensen Alnico Speakers &bull; Dual 6L6GC Output &bull; Cathode Follower",
    "Leo Fender's Masterpiece and the Marshall Connection",
    "In 1952, Leo Fender introduced the Precision Bass, needing an amplifier that could handle low frequencies. By 1959, he perfected the 5F6-A circuit: a 45-watt powerhouse housed in a lacquered tweed cabinet loaded with four 10-inch Jensen Alnico speakers.",
    "Guitarists quickly discovered that when cranked, the Bassman produced a thick, musical, touch-sensitive crunch that single 12-inch amps could not match. In 1962, Jim Marshall literally copied this exact schematic to create the Marshall JTM45.",
    "Circuit Innovations of the 5F6-A",
    [
        ("1", "Cathode-Follower Driven Tone Stack", "A dedicated 12AX7 triode buffer stage drove the tone controls with low impedance, preventing EQ adjustments from sapping signal gain."),
        ("2", "Long-Tail Pair Phase Inverter", "Balanced drive to the output tubes ensured symmetrical power delivery and dynamic responsiveness to pick attack."),
        ("3", "Four 10-Inch Jensen P10R Speakers", "Multiple smaller speakers offered rapid transient response and huge combined surface area, moving air with immense acoustic authority."),
        ("4", "Fixed-Bias Push-Pull 6L6 Power Section", "Delivered 45W of clean headroom before yielding into smooth, warm, creamy power valve saturation when pushed above 6 on the dial.")
    ]
))

# SLIDE 4
slides_list.append(make_slide(
    4, 14, "The British Invasion", "Vox AC30 Top Boost: <span>The Sound of the 60s Chime</span>",
    "Engineered by Dick Denney in Kent to cut through the screams of Beatlemania, the AC30 gave British rock its crystalline jangle and aggressive midrange bite.",
    "The 12-String Rickenbacker Chime", "The Beatles", '"A Hard Day\'s Night" (1964 &bull; Parlophone / Abbey Road)', "Yjyj8qnqkYI",
    "Ear-Training Diagnostic: Harmonic Jangle & Upper-Mid Chime",
    "The song begins with the most famous opening chord in rock history (a combination of George Harrison's Rickenbacker 360/12 through a <strong>Vox AC30</strong>, John Lennon's Gibson J-160E, and Paul McCartney's Hofner bass, doubled by George Martin on piano).",
    "Throughout the rhythm track, listen to the biting, bell-like upper midrange (2 kHz – 4 kHz). The Vox AC30's EL84 valves and Celestion Alnico Blue speakers deliver zero muddy bass, ensuring every jangly string cuts through the Abbey Road mono mix.",
    ["Beatlemania", "Rickenbacker 12-String", "Alnico Blue Chime", "Class A Cathode Bias", "Abbey Road Studios"],
    "Vox AC30 Circuit & Celestion Blue Speakers",
    "/images/slides/amplifiers/vox_ac30_top_boost.jpg", "Vox AC30 Top Boost",
    "🇬🇧 Vox AC30 Top Boost (1964)", "30W Cathode Bias &bull; Quad EL84 Output &bull; Twin 12-Inch Celestion Blue",
    "Dick Denney, Tom Jennings & Beatlemania",
    "In 1959, guitarists in London were desperate for more volume to be heard in dance halls. Dick Denney and Tom Jennings of Jennings Musical Instruments (JMI) in Dartford, Kent doubled the power of their popular AC15 to create the AC30.",
    "When Beatlemania exploded, Vox signed an exclusive equipment deal with Brian Epstein, supplying John, Paul, and George with AC30s and T-60 bass rigs. The AC30 became the sonic signature of the British Invasion—used by The Beatles, The Rolling Stones, The Kinks, and Queen's Brian May.",
    "How the AC30 Achieves Its Signature Sound",
    [
        ("1", "Class A Cathode-Biased Power Section", "Four EL84 pentode valves operate hot with no negative feedback loop, producing instantaneous touch responsiveness and rapid dynamic compression."),
        ("2", "Top Boost Tone Circuit", "Added an extra 12AX7 valve stage with interactive Treble and Bass controls that naturally scooping low mids while providing brilliant high-frequency lift."),
        ("3", "Celestion Alnico Blue Loudspeakers", "Two 12-inch 15-watt Alnico magnet drivers with lightweight voice coils compressed musically at high volume, accentuating bell-like upper frequencies."),
        ("4", "Cut Control Circuit", "A master high-frequency roll-off located across the phase inverter allowed guitarists to tame harsh top-end without altering the core preamp tone.")
    ]
))

# SLIDE 5
slides_list.append(make_slide(
    5, 14, "The Mechanical Distortion Hack", "The Kinks: <span>The Slashed Cone &amp; The Birth of Heavy Distortion</span>",
    "Before fuzz pedals existed, 17-year-old Dave Davies sliced his amplifier speaker cone with a razor blade, inventing the aggressive, distorted power chord riff.",
    "The Slashed Speaker Power Chord Revolution", "The Kinks (Dave Davies)", '"You Really Got Me" (1964 &bull; Pye Studios / Shel Talmy)', "_dHK6hLNTAI",
    "Ear-Training Diagnostic: Asymmetric Acoustic Tearing",
    "Listen to the ferocious, buzzing distortion on the opening G to A power chord riff. Recorded at Pye Studios in London with producer Shel Talmy, this was not the polite overdrive of a cranked valve amp—it was a <strong>violent, jagged square-wave distortion</strong>.",
    "Hear how the low end is clipped and snarling. The mechanical tear in the paper cone prevents linear movement, causing the speaker itself to act as an acoustic wave-shaper. This single recording is recognized as the birth of garage rock, punk, and hard rock.",
    ["Pye Studios", "Shel Talmy", "Slashed Cone", "Proto-Punk", "Square-Wave Fuzz"],
    "The Elpico AC55 &amp; Slashed Speaker Hack",
    "/images/slides/amplifiers/dave_davies_kinks.jpg", "Dave Davies of The Kinks",
    "⚡ Dave Davies &amp; The 'Little Green Amp'", "Slashed Elpico AC55 Cone &bull; Plugged Into Vox AC30 &bull; 1964 Pye Sessions",
    "Frustration, a Razor Blade, and Rock History",
    "In 1964, 17-year-old guitarist Dave Davies was frustrated with the clean, polite sound of commercially available amplifiers. He took a single-edged razor blade and slashed the paper speaker cone of his tiny 6-watt Elpico amplifier ('The Little Green Amp') in radial cuts, poking knitting needles through the surround.",
    "When he plugged in, the torn paper buzzed and flapped violently against the voice coil basket. Davies then plugged the speaker output of the distorted Elpico into the input of a 30-watt Vox AC30, creating the world's first cascading high-gain pre-amp rig.",
    "Acoustic & Mechanical Clipping Physics",
    [
        ("1", "Mechanical Compliance Failure", "Slashing the cone destroyed the speaker's restoring suspension spring constant, preventing linear piston movement of the cone."),
        ("2", "Physical Acoustic Wave-Shaping", "Instead of faithfully reproducing sine waves, the flapping paper clipped the audio waveform abruptly into an asymmetric, buzzy square wave."),
        ("3", "Preamp-to-Amp Cascading Overdrive", "Feeding the distorted line output of the Elpico directly into the input of a Vox AC30 drove the Vox's preamp valves into saturated compression."),
        ("4", "Catalyst for the Fuzz Pedal", "Engineers at Arbiter, Sola Sound, and Maestro rushed to replicate Davies' slashed cone sound electronically, resulting in the Tone Bender, Fuzz Face, and Maestro FZ-1.")
    ]
))

# SLIDE 6
slides_list.append(make_slide(
    6, 14, "The American Clean Benchmark", "Fender Twin Reverb: <span>85 Watts of High-Headroom Brilliance</span>",
    "Leo Fender's blackface flagship delivered enormous clean volume, pristine sparkle, and real spring reverb, defining surf rock, country, funk, and Dire Straits.",
    "Fingerstyle Stratocaster Sparkle & Tube Spring Reverb", "Dire Straits (Mark Knopfler)", '"Sultans of Swing" (1978 &bull; Pathway Studios)', "0fAQhSRLQnM",
    "Ear-Training Diagnostic: Uncompressed Transients & Reverb Splash",
    "Listen to Mark Knopfler's bare-finger picking on his 1961 Stratocaster (pickup selector in the out-of-phase bridge+middle position). The <strong>Fender Twin Reverb</strong> provides tremendous clean headroom, preserving every percussive thumb snap without clipping.",
    "Notice the three-dimensional depth: a real mechanical dual-spring reverb tank driven by high-voltage valves washes behind the dry guitar signal, creating acoustic space without muddying the fast arpeggiated fills.",
    ["Stratocaster In-Between", "Fingerstyle Snap", "High Headroom", "Tube Spring Reverb", "Clean Transients"],
    "Fender Blackface Twin Reverb Architecture",
    "/images/slides/amplifiers/fender_twin_reverb.jpg", "Fender Twin Reverb",
    "🇺🇸 Fender Twin Reverb (1965 Blackface)", "85W RMS &bull; Quad 6L6GC Valves &bull; Optical Tremolo &bull; Dual 12-Inch Oxford/JBL",
    "Leo Fender's Quest for Undistorted Power",
    "While British guitarists craved distortion and crunch, Leo Fender abhorred amplifier breakup. His design philosophy was absolute clarity, maximum volume, and pristine frequency reproduction for pedal steel and country players.",
    "In 1963, Fender introduced the 'Blackface' circuit series, spearheaded by the Twin Reverb. Delivering 85 watts from four 6L6GC power tubes through twin 12-inch speakers, the Twin became the worldwide studio standard for clean guitar tracking.",
    "Engineering Features of the Twin Reverb",
    [
        ("1", "Quad 6L6GC Push-Pull Power Section", "High plate voltages (~450V DC) in fixed bias produced enormous clean headroom that remained articulate at stadium volume levels."),
        ("2", "All-Tube Driven Spring Reverb Tank", "A dedicated 12AT7 driver tube and transformer sent guitar voltage to magnetic transducers on physical steel springs, capturing natural decay reflections."),
        ("3", "Optocoupler (Photocell) Tremolo", "A neon bulb flashing against a light-dependent resistor (LDR) gently modulated signal volume for smooth, swampy amplitude vibrato."),
        ("4", "Ultra-Linear Open-Back Enclosure", "Solid pine open-back cabinet allowed 360-degree acoustic dispersion, filling recording rooms with natural ambient sparkle.")
    ]
))

# SLIDE 7
slides_list.append(make_slide(
    7, 14, "The British Overdrive Revolution", "Marshall JTM45 &amp; Bluesbreaker: <span>The 'Beano' Tone</span>",
    "Jim Marshall and Ken Bran adapted the Fender Bassman with British components, giving Eric Clapton the creamy, singing Les Paul sustain that changed rock guitar.",
    "The Singing Sustain of the 'Beano' Album", "John Mayall & The Bluesbreakers (feat. Eric Clapton)", '"Hideaway" (1966 &bull; Decca Studios / Mike Vernon)', "m9N8Qi6zLSU",
    "Ear-Training Diagnostic: The Humbucker-into-Marshall Standard",
    "This track from the famous 'Beano' album launched the British blues boom. Listen to Eric Clapton's 1960 Gibson Les Paul Standard plugged straight into a cranked <strong>Marshall Model 1962 'Bluesbreaker' combo</strong>.",
    "Hear the creamy, singing sustain and rich second-order harmonic overtones. When Clapton digs in with heavy vibrato, the amplifier compresses smoothly, blooming into harmonic feedback without harsh high-frequency fizz.",
    ["'Beano' Album", "Les Paul & Marshall", "Creamy Sustain", "Even-Order Harmonics", "Decca Studios"],
    "Marshall JTM45 / 1962 Bluesbreaker Combo",
    "/images/slides/amplifiers/marshall_jtm45_bluesbreaker.jpg", "Marshall JTM45 Bluesbreaker",
    "🇬🇧 Marshall Model 1962 'Bluesbreaker' (1965)", "35W RMS &bull; Dual KT66/EL34 Valves &bull; GZ34 Tube Rectifier &bull; 2x12 Celestion",
    "Jim Marshall, Ken Bran & The Hanwell Shop",
    "In 1962, London drummer Jim Marshall ran a music shop in Hanwell. Young guitarists including Pete Townshend and Ritchie Blackmore complained that American Fender amps were too expensive and didn't distort warmly enough.",
    "Marshall hired technician Ken Bran and Dudley Craven to modify the Fender 5F6-A circuit using readily available British parts: Radiospares transformers, KT66 beam power valves, and Celestion 12-inch speakers. The result was the JTM45—darker, punchier, and far more prone to rich musical overdrive.",
    "Why British Parts Created the Marshall Sound",
    [
        ("1", "GZ34 Valve Rectifier Sag", "Under heavy playing, the vacuum tube rectifier's internal resistance causes voltage to dip ('sag'), creating natural dynamic compression and spongy touch-feel."),
        ("2", "KT66 & Early EL34 Power Valves", "British output valves saturated with a pronounced lower-midrange throatiness compared to the glassy, scooped highs of American 6L6s."),
        ("3", "Closed-Back Combo Enclosure", "Unlike Fender's open-back cabinets, Marshall enclosed the rear of the speakers with birch plywood, directing low-end punch forward."),
        ("4", "Celestion 20W 'Greenback' Speakers", "Alnico and ceramic Celestion drivers broke up earlier than heavy American speakers, contributing organic speaker-cone distortion.")
    ]
))

# SLIDE 8
slides_list.append(make_slide(
    8, 14, "The Stadium Stack Era", "The Marshall 4x12 Stack: <span>Volume as an Art Form</span>",
    "Pete Townshend demanded cabinets that towered over the stage. Jim Marshall's 100-watt Plexi and 4x12 stack gave Jimi Hendrix the canvas for supersonic feedback.",
    "Controlled Feedback, Pushed EL34s & Wah-Wah", "The Jimi Hendrix Experience", '"Voodoo Child (Slight Return)" (Live In Maui 1970)', "qFfnlYbFEiE",
    "Ear-Training Diagnostic: Acoustic Coupling & Power Tube Saturation",
    "Listen to how Hendrix manipulates the immense acoustic pressure of his <strong>100-watt Marshall Super Lead Plexi stacks</strong>. Standing in front of eight 12-inch Celestion speakers creates a closed acoustic feedback loop between the strings and the magnetic pickup coils.",
    "Notice the explosive low-end punch on muted string thumps. The 100-watt EL34 power section compresses pick transients with ferocious authority, allowing the Vox wah-wah pedal sweep to scream with singing overtone harmonics.",
    ["Plexi 100W", "Acoustic Feedback", "Vox Wah Pedal", "Quad EL34 Power", "Stadium Rock"],
    "Marshall Super Lead 100W 'Plexi' & 4x12 Stack",
    "/images/slides/amplifiers/marshall_plexi_stack.jpg", "Marshall Plexi 4x12 Stack",
    "⚡ Marshall Super Lead 100W &bull; 1960A 4x12 Stack", "Plexiglas Panel &bull; Quad EL34 (100W RMS) &bull; Dagnall Transformers &bull; 4x12 Slanted Cab",
    "Pete Townshend, Jimi Hendrix & The 8x12 Split",
    "In 1965, Pete Townshend of The Who told Jim Marshall: 'I want an amp that's like a weapon.' He demanded an 8x12 cabinet. When roadies complained that the 8x12 was physically impossible to lift into tour vans, Jim Marshall cut the cabinet in half, creating the iconic angled-front 1960A top cabinet and straight 1960B bottom cabinet.",
    "When Jimi Hendrix arrived in London in 1966, the first thing he demanded was to meet Jim Marshall. Hendrix chained multiple 100-watt Super Lead 'Plexi' heads together, establishing the visual and acoustic totem of stadium rock.",
    "Engineering of the 100-Watt Plexi Beast",
    [
        ("1", "Quad EL34 Output Stage (~490V Plate Voltage)", "Four EL34 pentodes running massive B+ rail voltage generated over 100W RMS clean and up to 170W during hard clipping."),
        ("2", "Solid-State Silicon Diode Rectification", "Replacing tube rectifiers with silicon bridge rectifiers stiffened the power supply, producing lightning-fast bass response with no mushy sag."),
        ("3", "Slanted 4x12 Birch Enclosure Physics", "The top two angled speakers projected high frequencies directly at the guitarist's ears, while the bottom two coupled to the stage floor for sub punch."),
        ("4", "No Master Volume (Attenuator Era)", "Preamp and power amp were locked together; true distortion required cranking the amplifier to ear-shattering decibel levels (120+ dB SPL).")
    ]
))

# SLIDE 9
slides_list.append(make_slide(
    9, 14, "The Bass Monolith", "Ampeg SVT: <span>Super Valve Technology &amp; The 8x10 Fridge</span>",
    "When arena rock made bass inaudible, Ampeg engineered a 300-watt all-tube behemoth with eight 10-inch speakers that defined rock bass for half a century.",
    "Thunderous Tube Bass Punch & Definition", "The Who (John Entwistle)", '"Won\'t Get Fooled Again" (1971 &bull; Olympic Studios)', "SHhrZgojY1Q",
    "Ear-Training Diagnostic: Sub-Bass Weight with Metallic Clack",
    "Listen to John Entwistle's ('The Ox') revolutionary bass tone. In an era where most bassists were relegated to polite low-end thud, Entwistle's <strong>Ampeg SVT</strong> delivers a ferocious full-frequency roar from deep 40 Hz sub-bass up to 4 kHz trebly pick clack.",
    "Even beneath Keith Moon's chaotic cymbal crashes and Pete Townshend's sweeping synthesizer sequences, the Ampeg SVT's 300 watts of tube power maintain unrelenting transient punch with zero low-end flub or muddy frequency masking.",
    ["John Entwistle", "Ampeg SVT", "300W Tube Power", "8x10 Sealed Cab", "Olympic Studios"],
    "Ampeg SVT & 8x10 Sealed Cabinet ('The Fridge')",
    "/images/slides/amplifiers/ampeg_svt_stack.jpg", "Ampeg SVT Bass Stack",
    "🔊 Ampeg SVT (Super Valve Technology &bull; 1969)", "300W RMS All-Tube &bull; Six 6146B/6550 Valves &bull; 8x10 Acoustic Suspension Cab",
    "The 1969 Rolling Stones US Tour Emergency",
    "During rehearsals for the Rolling Stones' landmark 1969 American tour, their UK equipment failed to clear customs. Tour manager Chip Monck contacted Ampeg, who had just built prototype 300-watt bass amplifiers designed by Bill Hughes and Roger Cox.",
    "Ampeg sent the prototypes on tour with Keith Richards and Bill Wyman. The earth-shaking reliability and immense headroom of the SVT ('Super Valve Technology') immediately made it the undisputed gold standard for rock, funk, and metal bass rigs worldwide.",
    "How 300 Watts of All-Tube Power Operates",
    [
        ("1", "Six 6146B / 6550 Beam Power Tubes", "A monstrous push-pull hex-valve output section delivered 300W continuous RMS power, backed by massive dual power transformers weighing over 85 lbs."),
        ("2", "8x10 Sealed Acoustic Suspension Cabinet", "Instead of a bass reflex port, the sealed 'Fridge' cabinet housed four independent dual-chamber enclosures, preventing uncontrolled cone excursion."),
        ("3", "Midrange Frequency Selector (220 Hz / 800 Hz / 3 kHz)", "A specialized inductor-based midrange EQ allowed bassists to cut or boost critical vocal-frequency cut zones to punch through loud drum kits."),
        ("4", "High-Current Damping Factor", "Massive transformer iron provided high speaker damping, giving the 10-inch drivers tight, punchy recovery on fast sixteenth-note bass lines.")
    ]
))

# SLIDE 10
slides_list.append(make_slide(
    10, 14, "The 1980s High-Gain Era", "Marshall JCM800: <span>Master Volume &amp; Upper-Mid Crunch</span>",
    "Cascading preamp gain stages allowed searing valve saturation at controlled stage volumes, defining the New Wave of British Heavy Metal, AC/DC, and 80s hard rock.",
    "Tight Rhythmic Crunch & Harmonic Bite", "AC/DC (Angus & Malcolm Young)", '"Back in Black" (1980 &bull; Compass Point Studios / Mutt Lange)', "pAgnJDJN4VA",
    "Ear-Training Diagnostic: Saturated Preamp Crunch with Articulation",
    "Listen to the opening rhythm guitar chords of Malcolm Young (Gretsch) and Angus Young (Gibson SG) through <strong>Marshall JCM800 / Super Lead heads</strong>. Notice how dry, punchy, and articulate the distortion is.",
    "Even with heavy valve saturation, you can clearly hear each individual string vibrating inside open A and D chords. Producer Mutt Lange's production showcases the aggressive upper-mid bite (1.5 kHz – 3 kHz) that makes the JCM800 cut through modern rock mixes.",
    ["Compass Point", "Mutt Lange", "JCM800 Crunch", "Master Volume", "Tight Transients"],
    "Marshall JCM800 Model 2203 Architecture",
    "/images/slides/amplifiers/marshall_jcm800.jpg", "Marshall JCM800 2203",
    "🔥 Marshall JCM800 2203 (1981)", "100W Master Volume &bull; Cascaded Preamp Stages &bull; Quad EL34 &bull; Vertically Mounted Inputs",
    "The Master Volume Revolution & 80s Metal",
    "In the 1960s, guitarists had to play at deafening stadium levels to push non-master volume amps into distortion. By the late 1970s, clubs and studio engineers demanded lower stage volumes, leading Marshall to introduce the Model 2203 Master Volume circuit.",
    "In 1981, Jim Marshall repackaged this circuit with bold modern cosmetics and his own initials/licence plate ('JCM800'). It became the defining voice of the 1980s: powering AC/DC, Iron Maiden, Judas Priest, Guns N' Roses, Slayer, and Metallica.",
    "Circuit Engineering of the Cascaded Preamp",
    [
        ("1", "Series Cascaded 12AX7 Preamp Triodes", "Signal passed through V1A and directly into V1B, multiplying voltage gain to achieve thick preamp saturation before reaching the power amp."),
        ("2", "Master Volume Potentiometer", "Inserted between the tone stack and phase inverter, allowing guitarists to dial in maximum preamp distortion while controlling actual speaker loudness."),
        ("3", "Bright Cap Treble Peaking Network", "A small ceramic capacitor across the preamp volume pot bled high frequencies through at lower settings, producing the aggressive, bitey 80s crunch."),
        ("4", "EL34 Midrange Bark in Push-Pull", "High plate voltages (~460V DC) and negative feedback tuning created the signature upper-mid 'bark' that slices cleanly through heavy bass and drums.")
    ]
))

# SLIDE 11
slides_list.append(make_slide(
    11, 14, "The Solid-State Revolution", "Roland JC-120: <span>Pristine Clean &amp; True Stereo Chorus</span>",
    "Roland proved transistors could create a legend. With dual 60-watt power amps and an analog bucket-brigade chorus, the JC-120 defined post-punk and new wave.",
    "Crystalline Arpeggios & Dimensional Chorus", "The Police (Andy Summers)", '"Every Breath You Take" (1983 &bull; AIR Studios Montserrat)', "OMOGaugKpzs",
    "Ear-Training Diagnostic: Acoustic Stereo Spatial Modulation",
    "Listen to Andy Summers' iconic palm-muted ninth-chord arpeggios. Recorded with a 1961 Telecaster through a <strong>Roland JC-120</strong>, the sound has zero valve saturation or grit—it is mathematically clean, linear, and three-dimensional.",
    "Hear the subtle acoustic swirling motion in the stereo spectrum. Because the JC-120 splits the dry signal to one speaker and pitch-vibrato to the other, the chorus effect is created organically in the air between the speakers rather than electronically summed.",
    ["AIR Montserrat", "Andy Summers", "JC-120 Chorus", "BBD Spatial Modulation", "Solid-State Clean"],
    "Roland JC-120 Solid-State & Stereo BBD Engine",
    "/images/slides/amplifiers/roland_jc120_jazz_chorus.jpg", "Roland JC-120 Jazz Chorus",
    "🇯🇵 Roland Jazz Chorus JC-120 (1975)", "2x 60W Bipolar Solid-State &bull; Twin 12-Inch Drivers &bull; Analog BBD Spatial Chorus",
    "The 1975 Japanese Engineering Triumph",
    "In 1975, newly founded Roland Corporation in Japan set out to build an ultra-reliable, road-worthy amplifier that completely bypassed the fragility, heat, and maintenance of vacuum tubes. The result was the Jazz Chorus JC-120.",
    "Equipped with the world's first built-in Bucket Brigade Device (BBD) chorus effect, the JC-120 became the weapon of choice for post-punk, new wave, and pop guitarists (The Cure, The Police, Talking Heads) and the clean intro tone for thrash metal legends like Metallica.",
    "How True Stereo Spatial Chorus Works",
    [
        ("1", "Discrete Solid-State Bipolar Power Amplifiers", "Two completely separate 60W RMS power amps ensure ultra-low distortion, wide dynamic bandwidth, and virtually infinite clean headroom."),
        ("2", "Analog Bucket Brigade Device (BBD) Delay Line", "MN3002/MN3007 chips pass analogue charge packets across capacitor buckets, creating micro-delays modulated by a low-frequency oscillator (LFO)."),
        ("3", "Dimensional Space Modulation (True Acoustic Mixing)", "The dry signal is routed to the left speaker while the vibrato-modulated signal is routed to the right speaker; acoustic phase cancellation occurs in the physical room air."),
        ("4", "Ultra-Flat Frequency Reproduction", "Heavy-duty 12-inch silver-capped speakers behave like studio monitor drivers, providing an ideal transparent platform for external multi-effects pedals.")
    ]
))

# SLIDE 12
slides_list.append(make_slide(
    12, 14, "The Modern High-Gain Era", "Mesa/Boogie Dual Rectifier: <span>American Multi-Channel High Gain</span>",
    "Randall Smith's hot-rodded California circuits evolved into the Dual Rectifier—a multi-stage high-gain monster with scooped mids and crushing low-end chug.",
    "The Heavy Wall of Sound & Scooped Mid Chug", "Metallica (James Hetfield)", '"Enter Sandman" (1991 &bull; One on One Studios / Bob Rock)', "CD-E-LDc384",
    "Ear-Training Diagnostic: Heavy Rectified Low-End & Multi-Track Density",
    "Producer Bob Rock layered multiple passes of James Hetfield's rhythm guitar using a combination of <strong>Mesa/Boogie heads and Marshall power sections</strong>. Listen to the brutal low-end impact on the palm-muted E-string chugs.",
    "Notice how the tone possesses immense sub-low authority (80 Hz – 120 Hz) combined with scooped lower-mids (500 Hz cut) and sizzling high-gain harmonic distortion. The notes punch like a sledgehammer without losing definition.",
    ["Bob Rock", "Black Album", "Mesa Boogie", "Scooped Midrange", "Wall of Sound"],
    "Mesa/Boogie Dual Rectifier 100W Head",
    "/images/slides/amplifiers/mesa_boogie_dual_rectifier.jpg", "Mesa Boogie Dual Rectifier",
    "🇺🇸 Mesa/Boogie Dual Rectifier (1992)", "100W RMS Multi-Channel &bull; 5x 12AX7 Preamp &bull; Switchable Tube / Silicon Rectification",
    "Randall Smith & The Hot-Rodded Boogie Revolution",
    "In the late 1960s, Randall Smith began modifying small Fender Princeton combos in his California repair shop, squeezing 100-watt circuits and extra gain stages into tiny cabinets (famously eliciting Carlos Santana to exclaim, 'Man, that little thing really boogies!').",
    "In 1992, Mesa/Boogie released the Dual Rectifier. Designed specifically to compete with modern high-output pickups and 7-string guitars, its crushing low-end response defined the sound of 90s alternative rock, nu-metal, and modern metalcore.",
    "Dual Rectification Circuit Engineering",
    [
        ("1", "Five Cascaded 12AX7 High-Gain Preamp Stages", "Massive cascading gain produces thick, saturated compression, turning pick attacks into singing fluid sustain and harmonic overtones."),
        ("2", "Selectable Tube vs. Silicon Diode Rectification", "Front-panel switch allows players to choose between sagging 5U4G vacuum tubes (spongy, vintage feel) or silicon diodes (ultra-fast, tight modern low-end response)."),
        ("3", "Post-Gain Scooped Mid Tone Stack", "Tone controls placed after extreme gain stages allow dramatic carving of midrange frequencies without suffocating the initial preamp saturation."),
        ("4", "6L6GC / EL34 Bias Switchability", "Rear-panel bias selector allows swapping between deep, punchy American 6L6 power tubes or mid-aggressive British EL34s without a soldering iron.")
    ]
))

# SLIDE 13
slides_list.append(make_slide(
    13, 14, "The Digital Revolution", "Amp Modellers &amp; Profilers: <span>Algorithms to Impulse Responses</span>",
    "From the red Line 6 POD to Kemper profiling and Neural DSP Quad Cortex: how digital signal processing and impulse responses revolutionized studio and live guitar.",
    "Hyper-Precise 8-String Polyrhythms & Zero Stage Bleed", "Animals As Leaders (Tosin Abasi)", '"Physical Education" (Live at Patronaat)', "wkqr5GY9opk",
    "Ear-Training Diagnostic: Pristine Extended-Range Articulation",
    "Listen to Tosin Abasi and Javier Reyes performing lightning-fast thumping, slaps, and arpeggios on extended-range 8-string guitars. Traditional tube amplifier stacks often collapse into muddy sub-bass mush when handling low B (61 Hz) or low F# (46 Hz).",
    "Using digital modellers running direct to the PA, every complex polyrhythmic transient remains surgically sharp. The absence of vibrating speaker cabinets on stage completely eliminates acoustic bleed into drum and vocal microphones.",
    ["Extended Range 8-String", "Neural DSP / Fractal", "Zero Stage Volume", "Impulse Responses", "Surgical Precision"],
    "Digital DSP Modellers, Profilers & Impulse Responses",
    "/images/slides/amplifiers/kemper_profiler.jpg", "Kemper Profiler",
    "💻 The Digital Modeller Era (1998 – Present)", "Line 6 POD &bull; Kemper Profiler &bull; Fractal Axe-Fx &bull; Neural DSP Quad Cortex",
    "From Algorithmic Modeling to Convolution Profiling",
    "In 1998, Line 6 launched the POD—the iconic red 'kidney bean' desktop unit that used numerical DSP algorithms to simulate classic Fender, Marshall, and Vox circuits. For the first time, guitarists could record album-quality guitar tones directly into home studio DAWs late at night.",
    "In 2011, Christoph Kemper introduced the Kemper Profiling Amplifier, which sent test tones through a physical tube amp and analyzed the distortion/frequency transfer function. Today, Neural DSP and Fractal Audio use advanced machine learning and convolution IRs, making digital modeling indistinguishable from real valves in blind ABX listening tests.",
    "How Digital Amp Modeling Operates",
    [
        ("1", "Non-Linear Component DSP Algorithms", "Mathematical models calculate the exact dynamic non-linear behavior of vacuum tube grids, cathode bypass caps, and output transformers millions of times per second."),
        ("2", "Machine Learning & Dynamic Profiling", "Test signals (white noise, frequency sweeps) measure phase, saturation thresholds, and harmonic generation of a real amplifier rig to capture an exact digital clone."),
        ("3", "Cabinet Convolution & Impulse Responses (IRs)", "A mathematical capture (IR) of a specific microphone (e.g., Shure SM57) placed at an exact angle in front of a real speaker cone accurately models acoustic cabinet resonances."),
        ("4", "FOH Direct-to-PA Integration", "Guitarists run XLR cables direct to the front-of-house mixing console and in-ear monitors (IEMs), providing 100% consistent studio-grade tone in any venue without stage bleed.")
    ]
))

# SLIDE 14
table_rows = [
    ("Fender Bassman / Twin", "6L6 / 6V6 (Fixed/Cathode Bias)", "4x10 Jensen / 2x12 Oxford in Open-Back Pine Cabinet", "High headroom, scooped lower-mids, sparkling highs, tube spring reverb & optical tremolo."),
    ("Vox AC30 Top Boost", "4x EL84 (Class A Cathode Bias)", "2x12 Celestion Alnico Blue in Open-Back Birch Cabinet", "Class A warmth, chimey 2-4 kHz upper midrange bite, rapid dynamic compression, no negative feedback."),
    ("Marshall Plexi / JCM800", "EL34 / KT66 (Push-Pull AB)", "4x12 Celestion Greenback/G12T-75 in Closed-Back Birch Ply Stack", "Aggressive upper-mid crunch, tight low end, stadium acoustic projection, cascading high-gain preamp."),
    ("Ampeg SVT Bass Rig", "Six 6146B / 6550 Tubes (300W)", "8x10 Sealed Acoustic Suspension Cabinet ('The Fridge')", "300W RMS all-tube headroom, massive low-end punch without flub, inductor-based midrange sweep EQ."),
    ("Roland JC-120", "Bipolar Solid-State (2x 60W)", "2x12 Heavy-Duty Drivers in Open-Back Road Enclosure", "Zero valve distortion, infinite clean headroom, built-in analog BBD spatial stereo chorus in physical air."),
    ("Mesa/Boogie Dual Rectifier", "Quad 6L6/EL34 + 5U4G/Diodes", "4x12 Celestion Vintage 30 Closed-Back Enclosure", "Modern multi-channel high gain, switchable tube sag vs diode punch, scooped mids, tight percussive chug."),
    ("Digital DSP Modellers", "SHARC DSP / Machine Learning", "Impulse Response (IR) Convolution / Direct XLR to FOH", "Exact mathematical circuit profiling, zero stage volume or bleed, micro-level speaker IR emulation.")
]

slides_list.append(make_table_slide(
    14, 14, "Master Exam Specification", "Guitar &amp; Bass Amplifiers: <span>The Master Matrix</span>",
    "The complete Component 3 comparative review: valve topologies, acoustic speaker physics, close-micing techniques, and landmark listening identification.",
    "The Pinnacle of Tube Dynamics & Touch Sensitivity", "Stevie Ray Vaughan & Double Trouble", '"Pride and Joy" (Live at Montreux 1982)', "kfjXp4KTTY8",
    "Ear-Training Diagnostic: Dynamic Touch-Sensitivity in Real Time",
    "Stevie Ray Vaughan demonstrates why tube amplifiers remain revered: playing with a light thumb produces a sparkling, chimey clean tone, while digging in with a heavy pick attack instantly forces the power tubes into singing, compressed overdrive without touching a volume knob.",
    "Notice how the close-mic placement captures the high-frequency snap of the pick transient while the closed-back speaker cabinet delivers punchy low-end impact. This is the master reference for evaluating amplifier dynamics in the Component 3 exam.",
    ["Montreux 1982", "Touch Sensitivity", "Dynamic Range", "Close-Micing", "Component 3 Exam"],
    "The Master Specification Matrix",
    "/images/marshall_half_stack_authentic.jpg", "The Amplifier Hall of Fame",
    "🏆 The Guitar &amp; Bass Amplifier Hall of Fame", "Master Specification &bull; Transduction &bull; Valve Topology &bull; Close-Micing",
    "Component 3 Specification Essentials: Exam Reference",
    "In the Edexcel Component 3 examination, questions frequently target: (1) Valve amplifier signal path (Preamp vs Power Amp vs Output Transformer), (2) Valve types and harmonic character (Even-order warmth vs Solid-State Odd-order harshness), and (3) Microphone placement geography on the speaker cone.",
    "Moving a dynamic microphone (like a Shure SM57) from the center of the speaker cone towards the edge progressively rolls off high frequencies, taming harsh treble. Pointing on-axis maximizes high-frequency transient bite; angling 45 degrees off-axis smooths out upper-mid harshness.",
    table_rows
))

# Compile full HTML
all_slides_html = "\n".join(slides_list)
final_output = HTML_TEMPLATE.replace("{SLIDES_HTML}", all_slides_html)

output_path = "public/interactive-slide-amplifiers.html"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(final_output)

print(f"Generated {output_path} ({len(final_output)} bytes) with 14 split-screen slides!")
