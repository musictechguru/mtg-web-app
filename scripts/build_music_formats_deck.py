#!/usr/bin/env python3
"""
build_music_formats_deck.py
Generates the split-screen interactive revision presentation:
public/interactive-slide-music-formats.html
Dedicated to the Edexcel A-Level Music Technology Component 3 Formats specification.
"""

import os

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>Audio Recording &amp; Storage Formats | Edexcel Component 3 Music Technology</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #080e1a;
      --panel-bg: #0f172a;
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-music: #38bdf8;
      --accent-music-glow: rgba(56, 189, 248, 0.25);
      --accent-format: #a855f7;
      --accent-format-glow: rgba(168, 85, 247, 0.25);
      --accent-highlight: #ec4899;
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
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
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
      color: var(--accent-format);
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

    .format-col {
      border-top: 4px solid var(--accent-format);
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
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent-music);
      border: 1px solid rgba(56, 189, 248, 0.35);
    }

    .format-badge {
      background: rgba(168, 85, 247, 0.15);
      color: var(--accent-format);
      border: 1px solid rgba(168, 85, 247, 0.35);
    }

    .panel-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Video Frame */
    .video-container {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
      border-radius: 10px;
      overflow: hidden;
      background: #000;
      border: 1px solid var(--card-border);
      margin-bottom: 14px;
    }

    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    /* Track metadata */
    .track-meta {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 14px;
    }

    .track-title {
      font-size: 15px;
      font-weight: 800;
      color: #fff;
    }

    .track-artist {
      font-size: 13px;
      font-weight: 600;
      color: var(--accent-music);
    }

    .track-album {
      font-size: 11px;
      color: var(--text-dim);
      margin-top: 2px;
    }

    /* Listening guide */
    .ear-training-box {
      background: rgba(56, 189, 248, 0.05);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 10px;
      padding: 14px;
      margin-bottom: 14px;
    }

    .ear-training-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 800;
      color: var(--accent-music);
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
    }

    .ear-points {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .ear-points li {
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.45;
      position: relative;
      padding-left: 18px;
    }

    .ear-points li::before {
      content: "▸";
      position: absolute;
      left: 2px;
      color: var(--accent-music);
      font-weight: bold;
    }

    .ear-points li strong {
      color: #fff;
    }

    /* Tags */
    .tags-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tech-tag {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
    }

    /* Format Hardware Right Column */
    .hardware-photo {
      width: 100%;
      height: 220px;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid var(--card-border);
      margin-bottom: 14px;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hardware-photo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #030712;
      transition: transform 0.4s ease;
    }

    .hardware-photo:hover img {
      transform: scale(1.03);
    }

    .hardware-hero-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 14px;
    }

    .inst-name {
      font-size: 16px;
      font-weight: 800;
      color: #fff;
    }

    .inst-specs {
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--accent-format);
      margin-top: 3px;
    }

    .history-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 14px;
      margin-bottom: 14px;
    }

    .history-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #fff;
      margin-bottom: 6px;
    }

    .history-card p {
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 8px;
    }

    .history-card p:last-child {
      margin-bottom: 0;
    }

    /* How It Works Steps */
    .mech-chain {
      background: rgba(168, 85, 247, 0.05);
      border: 1px solid rgba(168, 85, 247, 0.2);
      border-radius: 10px;
      padding: 14px;
    }

    .mech-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--accent-format);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .step-item {
      display: flex;
      gap: 10px;
      margin-bottom: 8px;
      font-size: 12px;
      line-height: 1.4;
    }

    .step-item:last-child {
      margin-bottom: 0;
    }

    .step-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--accent-format);
      color: #fff;
      font-weight: 800;
      font-size: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .step-text strong {
      color: #fff;
    }

    .step-text span {
      color: var(--text-muted);
    }

    /* Master Table Slide */
    .table-container {
      overflow-x: auto;
      margin-top: 12px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 10px;
    }

    .master-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }

    .master-matrix-table th {
      background: rgba(168, 85, 247, 0.15);
      color: var(--text-white);
      padding: 10px 12px;
      font-weight: 800;
      border-bottom: 1px solid var(--card-border);
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }

    .master-matrix-table td {
      padding: 10px 12px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-muted);
      vertical-align: top;
    }

    .master-matrix-table tr:hover td {
      background: rgba(255, 255, 255, 0.03);
    }

    .master-matrix-table td strong {
      color: #fff;
      display: block;
      margin-bottom: 2px;
    }

    .exam-warning-box {
      background: rgba(236, 72, 153, 0.08);
      border: 1px solid rgba(236, 72, 153, 0.3);
      border-radius: 10px;
      padding: 14px;
      margin-top: 14px;
    }

    .exam-warning-header {
      font-size: 12px;
      font-weight: 800;
      color: var(--accent-highlight);
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* BOTTOM NAV CONTROLS */
    .deck-nav-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(8, 14, 26, 0.95);
      backdrop-filter: blur(12px);
      border-top: 1px solid var(--border-subtle);
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
    }

    .nav-left, .nav-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-btn {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--text-white);
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .nav-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .nav-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .nav-btn.primary {
      background: var(--accent-format);
      border-color: var(--accent-format);
      color: #fff;
    }

    .nav-btn.primary:hover:not(:disabled) {
      background: #9333ea;
    }

    .slide-select {
      background: var(--panel-bg);
      border: 1px solid var(--card-border);
      color: var(--text-white);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
      max-width: 320px;
    }

    .slide-counter {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      color: var(--text-muted);
    }

    .progress-bar-container {
      position: fixed;
      bottom: 58px;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.05);
      z-index: 101;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-music), var(--accent-format));
      width: 8.33%;
      transition: width 0.3s ease;
    }
  </style>
</head>
<body>

  <div class="progress-bar-container">
    <div class="progress-bar-fill" id="progressBar"></div>
  </div>

  <div class="deck-container">
    {SLIDES_HTML}
  </div>

  <!-- NAVIGATION BAR -->
  <div class="deck-nav-bar">
    <div class="nav-left">
      <button class="nav-btn" id="prevBtn" onclick="prevSlide()" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        Previous
      </button>
      <span class="slide-counter" id="slideCounter">01 / 12</span>
    </div>

    <div class="nav-center">
      <select class="slide-select" id="slideSelect" onchange="jumpToSlide(parseInt(this.value))">
        <option value="1">1. Evolution of Audio Formats Overview</option>
        <option value="2">2. Shellac 78 RPM Discs (Acoustic Era)</option>
        <option value="3">3. Vinyl Microgroove LPs &amp; 45s (RIAA)</option>
        <option value="4">4. Studio Open-Reel Tape (15 &amp; 30 ips)</option>
        <option value="5">5. Compact Audio Cassette (Philips 1963)</option>
        <option value="6">6. 8-Track Cartridge (Endless Loop)</option>
        <option value="7">7. Compact Disc (CD-DA Red Book 1982)</option>
        <option value="8">8. Digital Audio Tape (DAT) &amp; MiniDisc</option>
        <option value="9">9. Lossy MP3 &amp; AAC (Psychoacoustics)</option>
        <option value="10">10. Lossless &amp; Hi-Res Audio (WAV &amp; FLAC)</option>
        <option value="11">11. Modern Streaming &amp; Normalisation (LUFS)</option>
        <option value="12">12. Master Specification Matrix &amp; Exam Traps</option>
      </select>
    </div>

    <div class="nav-right">
      <button class="nav-btn primary" id="nextBtn" onclick="nextSlide()">
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  </div>

  <script>
    let currentSlide = 1;
    const totalSlides = 12;

    function showSlide(n) {
      if (n < 1) n = 1;
      if (n > totalSlides) n = totalSlides;
      currentSlide = n;

      for (let i = 1; i <= totalSlides; i++) {
        const slide = document.getElementById('slide-' + i);
        if (slide) {
          slide.classList.remove('active');
        }
      }

      const activeSlide = document.getElementById('slide-' + currentSlide);
      if (activeSlide) {
        activeSlide.classList.add('active');
      }

      // Update counters & select
      document.getElementById('slideCounter').textContent = (currentSlide < 10 ? '0' : '') + currentSlide + ' / ' + (totalSlides < 10 ? '0' : '') + totalSlides;
      document.getElementById('slideSelect').value = currentSlide;

      // Update buttons
      document.getElementById('prevBtn').disabled = (currentSlide === 1);
      document.getElementById('nextBtn').disabled = (currentSlide === totalSlides);

      // Update progress bar
      const pct = (currentSlide / totalSlides) * 100;
      document.getElementById('progressBar').style.width = pct + '%';

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

    function jumpToSlide(n) {
      showSlide(n);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      }
    });

    // Initialise
    showSlide(1);
  </script>
</body>
</html>
"""

def make_slide(slide_num, total_slides, tag, heading, lead, 
               music_lead_title, artist_name, track_album, yt_id,
               ear_title, ear_p1, ear_p2, tags_list,
               inst_box_title, inst_img_src, inst_img_alt,
               inst_name, inst_specs, hist_title, hist_p1, hist_p2,
               mech_title, mech_steps):
    
    tags_html = "".join([f'<span class="tech-tag">{t}</span>' for t in tags_list])
    
    steps_html = ""
    for s_num, s_title, s_desc in mech_steps:
        steps_html += f"""
        <div class="step-item">
          <div class="step-num">{s_num}</div>
          <div class="step-text"><strong>{s_title}:</strong> <span>{s_desc}</span></div>
        </div>
        """

    active_class = " active" if slide_num == 1 else ""

    return f"""
    <!-- SLIDE {slide_num} -->
    <div class="slide{active_class}" id="slide-{slide_num}">
      <div class="slide-header">
        <div class="deck-tag">{tag}</div>
        <h1 class="slide-heading">{heading}</h1>
        <p class="slide-lead">{lead}</p>
      </div>

      <div class="grid-2-split">
        <!-- LEFT: MUSIC & LISTENING FOCUS -->
        <div class="column-panel music-col">
          <div class="panel-header">
            <span class="panel-badge music-badge">Landmark Audio Recording</span>
            <span class="panel-title">{music_lead_title}</span>
          </div>

          <div class="video-container">
            <iframe src="https://www.youtube-nocookie.com/embed/{yt_id}?rel=0&modestbranding=1" 
                    title="{track_album}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
          </div>

          <div class="track-meta">
            <div class="track-title">{track_album}</div>
            <div class="track-artist">{artist_name}</div>
            <div class="track-album">A-Level Component 3 Critical Ear-Training Benchmark</div>
          </div>

          <div class="ear-training-box">
            <div class="ear-training-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
              {ear_title}
            </div>
            <ul class="ear-points">
              <li>{ear_p1}</li>
              <li>{ear_p2}</li>
            </ul>
          </div>

          <div class="tags-cloud">
            {tags_html}
          </div>
        </div>

        <!-- RIGHT: FORMAT ARCHITECTURE & TRANSDUCTION -->
        <div class="column-panel format-col">
          <div class="panel-header">
            <span class="panel-badge format-badge">Format Architecture</span>
            <span class="panel-title">{inst_box_title}</span>
          </div>

          <div class="hardware-photo">
            <img src="{inst_img_src}" alt="{inst_img_alt}" loading="lazy">
          </div>

          <div class="hardware-hero-card">
            <div class="inst-name">{inst_name}</div>
            <div class="inst-specs">{inst_specs}</div>
          </div>

          <div class="history-card">
            <div class="history-title">{hist_title}</div>
            <p>{hist_p1}</p>
            <p>{hist_p2}</p>
          </div>

          <div class="mech-chain">
            <div class="mech-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>
              {mech_title}
            </div>
            {steps_html}
          </div>
        </div>
      </div>
    </div>
    """

def make_table_slide(slide_num, total_slides, tag, heading, lead,
                     music_lead_title, artist_name, track_album, yt_id,
                     ear_title, ear_p1, ear_p2, tags_list,
                     inst_box_title, inst_img_src, inst_img_alt,
                     inst_name, inst_specs, hist_title, hist_p1, hist_p2,
                     table_rows, exam_traps):
    
    tags_html = "".join([f'<span class="tech-tag">{t}</span>' for t in tags_list])

    rows_html = ""
    for col_format, col_trans, col_freq, col_dyn, col_flaws in table_rows:
        rows_html += f"""
        <tr>
          <td><strong>{col_format}</strong></td>
          <td>{col_trans}</td>
          <td><code>{col_freq}</code></td>
          <td><code>{col_dyn}</code></td>
          <td>{col_flaws}</td>
        </tr>
        """

    traps_html = ""
    for trap_num, trap_title, trap_desc in exam_traps:
        traps_html += f"""
        <div class="step-item" style="margin-bottom: 8px;">
          <div class="step-num" style="background: var(--accent-highlight);">{trap_num}</div>
          <div class="step-text"><strong>{trap_title}:</strong> <span>{trap_desc}</span></div>
        </div>
        """

    return f"""
    <!-- SLIDE {slide_num} -->
    <div class="slide" id="slide-{slide_num}">
      <div class="slide-header">
        <div class="deck-tag">{tag}</div>
        <h1 class="slide-heading">{heading}</h1>
        <p class="slide-lead">{lead}</p>
      </div>

      <div class="grid-2-split">
        <!-- LEFT: MUSIC & EXAM OVERVIEW -->
        <div class="column-panel music-col">
          <div class="panel-header">
            <span class="panel-badge music-badge">Landmark Audio Retrospective</span>
            <span class="panel-title">{music_lead_title}</span>
          </div>

          <div class="video-container">
            <iframe src="https://www.youtube-nocookie.com/embed/{yt_id}?rel=0&modestbranding=1" 
                    title="{track_album}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
          </div>

          <div class="track-meta">
            <div class="track-title">{track_album}</div>
            <div class="track-artist">{artist_name}</div>
            <div class="track-album">Evolution of Commercial Sound Distribution</div>
          </div>

          <div class="ear-training-box">
            <div class="ear-training-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
              {ear_title}
            </div>
            <ul class="ear-points">
              <li>{ear_p1}</li>
              <li>{ear_p2}</li>
            </ul>
          </div>

          <div class="exam-warning-box">
            <div class="exam-warning-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Top 5 Edexcel Component 3 Exam Traps
            </div>
            {traps_html}
          </div>

          <div class="tags-cloud" style="margin-top: 14px;">
            {tags_html}
          </div>
        </div>

        <!-- RIGHT: MASTER COMPARISON MATRIX -->
        <div class="column-panel format-col">
          <div class="panel-header">
            <span class="panel-badge format-badge">Specification Review</span>
            <span class="panel-title">{inst_box_title}</span>
          </div>

          <div class="hardware-photo">
            <img src="{inst_img_src}" alt="{inst_img_alt}" loading="lazy">
          </div>

          <div class="hardware-hero-card">
            <div class="inst-name">{inst_name}</div>
            <div class="inst-specs">{inst_specs}</div>
          </div>

          <div class="history-card">
            <div class="history-title">{hist_title}</div>
            <p>{hist_p1}</p>
            <p>{hist_p2}</p>
          </div>

          <div class="table-container">
            <table class="master-matrix-table">
              <thead>
                <tr>
                  <th>Format</th>
                  <th>Medium &amp; Method</th>
                  <th>Bandwidth</th>
                  <th>Dynamic Range</th>
                  <th>Key Flaws &amp; Exam Clues</th>
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
    """

# Build slides
slides_list = []

# SLIDE 1: OVERVIEW
slides_list.append(make_slide(
    1, 12, "Component 3 Overview", "The Evolution of <span>Sound Recording &amp; Storage</span>",
    "From Thomas Edison's acoustic horn to uncompressed 24-bit streaming, the history of music technology is driven by the quest for higher fidelity, greater dynamic range, and seamless portability.",
    "The 140-Year Format Journey", "Sound Preservation Archive", "A Brief History of Music Formats (1877–Present)", "D3XB3owN6qo",
    "Ear-Training Diagnostic: Transduction Signatures Across Eras",
    "Compare the sound across eras: early acoustic shellac is pinched and band-limited (midrange horn resonances), analogue tape brings lush saturation and low-end warmth accompanied by tape hiss, Red Book CD delivers laser-etched black silence and razor transients, while low-bitrate MP3 introduces 'watery' swishing artifacts.",
    "In the Component 3 exam, questions often ask you to identify the recording era or medium by listening for signature artifacts: steel needle surface crackle, magnetic tape hiss, wow and flutter, or digital psychoacoustic smearing.",
    ["Transduction Physics", "Dynamic Range", "Frequency Bandwidth", "Mechanical vs Magnetic", "Optical vs Digital"],
    "Timeline of Recording Formats",
    "/images/music_formats/edison_and_phonograph_edit1.jpg", "Thomas Edison with early phonograph",
    "🎙️ The 4 Eras of Sound Storage", "Mechanical (1877) &bull; Magnetic (1930s) &bull; Optical (1982) &bull; Lossless Streaming (2000s)",
    "Four Waves of Transduction Physics",
    "A-Level Music Technology Component 3 categorises audio reproduction into four distinct eras: (1) Acoustic/Mechanical where acoustic pressure physically cut grooves, (2) Electrical/Magnetic where electromagnetic induction allowed microphones and magnetic tape, (3) Optical Digital where lasers decoded binary pits, and (4) Perceptual/Streamed Audio.",
    "Every format represents engineering trade-offs between three core parameters: Frequency Bandwidth (reproduced frequency spectrum), Dynamic Range (signal-to-noise ratio in dB), and Storage Portability (playing time vs physical footprint).",
    "The 4 Primary Transduction Modes",
    [
        ("1", "Mechanical Transduction (Acoustic / Disc)", "Air pressure waves physically vibrate a diaphragm to etch grooves in tinfoil, wax, or shellac; playback reverses the process via a needle and horn."),
        ("2", "Magnetic Induction (Tape / Cassette)", "Microphones convert sound into AC electricity, which magnetises ferromagnetic particles on a plastic ribbon via record head electromagnetic coils."),
        ("3", "Optical Digital (CD-DA / Laser)", "PCM binary audio (1s and 0s) is etched as microscopic pits on a reflective disc; an infrared laser diode reads light reflection variations onto a photodiode."),
        ("4", "Perceptual Psychoacoustic Streaming", "Mathematical algorithms discard imperceptible frequencies masked by human ear biology, enabling small file sizes for instant internet streaming.")
    ]
))

# SLIDE 2: 78 RPM SHELLAC
slides_list.append(make_slide(
    2, 12, "The Acoustic Era", "Shellac 78 RPM Discs: <span>Heavy Needles &amp; Horns</span>",
    "Before vinyl and microphones, music was captured purely acoustically: performers projected into large metal horns, etching lateral modulations into brittle shellac discs rotating at 78 RPM.",
    "The World's First Million-Selling Record", "Enrico Caruso", '"Vesti la giubba" (1904 &bull; Victor 78 RPM Recording)', "Hlp0ctNv7pI",
    "Ear-Training Diagnostic: Acoustic Horn Bandwidth & Surface Noise",
    "Notice the intense midrange honk and narrow bandwidth: frequencies below 200 Hz and above 3,000 Hz are completely missing. There is no sub-bass or airy treble because acoustic diaphragms were physically incapable of responding to extreme frequencies.",
    "Listen to the continuous rhythmic rushing surface noise and clicks caused by the steel needle dragging through abrasive slate and limestone fillers embedded in the shellac compound to grind down the needle point.",
    ["78 RPM Shellac", "Acoustic Horn", "Steel Stylus", "Abrasive Filler", "3-Minute Limit"],
    "Shellac Lateral Cut Disc",
    "/images/music_formats/pathe_disc.png", "Antique 78 RPM Disc",
    "📀 Shellac 78 RPM Disc (1898–1950s)", "78.26 RPM &bull; Brittle Shellac &amp; Slate &bull; 100-200g Tracking Force",
    "The Mechanics of Acoustic Disc Recording",
    "Shellac records were manufactured using resin secreted by the female Kerria lacca beetle mixed with ground slate, clay, and cotton flock. The slate was deliberately added to wear down the cheap steel playback needles to fit the groove shape!",
    "Because no electronic amplification existed prior to 1925, musicians had to gather tightly around recording horns. Soft instruments (violins) required attached metal diaphragms (Stroh violins) to be audible against loud brass horns.",
    "How Acoustic 78 RPM Playback Works",
    [
        ("1", "Lateral Groove Tracking", "The heavy steel needle sits in a wide groove (3 mil radius) that moves laterally (side-to-side) corresponding to the sound pressure waveform."),
        ("2", "Mechanical Diaphragm Coupling", "Needle vibrations are directly transferred up a rigid metal lever to a thin mica or aluminium diaphragm inside the soundbox."),
        ("3", "Acoustic Horn Amplification", "The vibrating diaphragm modulates air pressure within an exponentially expanding horn, coupling acoustic impedance to amplify the sound physically."),
        ("4", "Heavy Stylus Wear & Speed Limitation", "Massive tracking force (100–200g) wore needles down rapidly; at 78 RPM, a 10-inch record offered only 3 to 3.5 minutes of playing time per side.")
    ]
))

# SLIDE 3: VINYL MICROGROOVE & RIAA
slides_list.append(make_slide(
    3, 12, "The Analogue High-Fidelity Era", "Vinyl Microgroove LPs: <span>RIAA EQ &amp; 33⅓ RPM</span>",
    "Columbia Records revolutionised audio in 1948 with the Long Play (LP). Pressed on quiet polyvinyl chloride (PVC) with microscopic grooves and RIAA equalisation, vinyl unlocked 22 minutes of stereo fidelity per side.",
    "Stereo Space & Microgroove Fidelity", "Miles Davis", '"So What" (Kind of Blue &bull; 1959 Columbia 33⅓ RPM LP)', "zqNTltOGh5c",
    "Ear-Training Diagnostic: RIAA Balance & Stereo 45/45 Geometry",
    "Listen to Paul Chambers' walking double-bass and Jimmy Cobb's ride cymbal: unlike 78s, vinyl delivers full 20 Hz – 20,000 Hz extension. Notice the wide stereophonic separation: trumpet left, saxophones right, piano and bass anchored in the middle.",
    "Listen for vinyl's subtle characteristics: faint surface crackle, microscopic dust ticks, warm lower-mid harmonic bloom, and a dynamic range of approximately 55–65 dB without digital quantization artifacts.",
    ["Vinyl LP", "33⅓ RPM", "RIAA Curve", "Microgroove", "45/45 Stereo Matrix"],
    "Vinyl Microgroove Architecture",
    "/images/music_formats/vinyl_lp.jpg", "Vinyl 12-inch LP Record",
    "💽 Vinyl LP &amp; 45 RPM Microgroove (1948–Present)", "Polyvinyl Chloride (PVC) &bull; RIAA Equalisation &bull; Moving Magnet / Coil",
    "The Breakthrough of Microgroove & PVC",
    "Standard shellac grooves were thick and noisy. Vinyl used synthetic polyvinyl chloride (PVC), which was flexible and smooth. By reducing groove width to 1 mil (microgroove), playback speed dropped to 33⅓ RPM, extending playing time to 22 minutes per side.",
    "Stereo vinyl (1958) used Alan Blumlein's 45/45 degree groove system: the inner wall modulates at 45° for the Left channel, and the outer wall modulates at 45° for the Right channel. A mono stylus sums both walls laterally.",
    "How RIAA Equalisation Works (Exam Essential)",
    [
        ("1", "The Cutting Problem", "Low bass frequencies create large groove excursions that would cause the cutting stylus to slice through into adjacent tracks or throw the playback needle out."),
        ("2", "RIAA Pre-Emphasis on Record Cutting", "The master cutting lathe applies an aggressive RIAA filter: bass below 500 Hz is heavily attenuated (-17 dB at 50 Hz), while treble above 2 kHz is boosted (+17 dB at 10 kHz)."),
        ("3", "RIAA De-Emphasis in Phono Preamp", "The turntable's phono preamplifier applies the exact mirror inverse curve: boosting bass and sharply rolling off high frequencies by 17 dB."),
        ("4", "Surface Noise Attenuation", "Rolling off the high frequencies on playback simultaneously suppresses vinyl surface hiss and crackles, achieving a clean signal-to-noise ratio of ~60 dB.")
    ]
))

# SLIDE 4: OPEN-REEL MAGNETIC TAPE
slides_list.append(make_slide(
    4, 12, "The Professional Studio Standard", "Open-Reel Tape: <span>Magnetic Induction &amp; AC Bias</span>",
    "Capturing magnetic powder on ribbons of polyester transformed recording. Running at 15 or 30 inches per second, multi-track tape allowed overdubbing, tape saturation, and pristine studio master copies.",
    "The Warmth of 4-Track Tape Saturation", "The Beatles", '"A Day in the Life" (Sgt. Pepper &bull; Studer J37 4-Track Tape at 15 ips)', "usNsCeOV4GM",
    "Ear-Training Diagnostic: Tape Saturation & Head Bump",
    "Listen to Ringo Starr's tom-tom fills and John Lennon's vocal: tape saturation acts as a gentle, musical soft-limiter that rounds off aggressive transient spikes and adds rich even/odd harmonic warmth.",
    "Notice the low-end punch: playback heads exhibit a low-frequency resonance known as the 'head bump' (typically between 50 Hz and 100 Hz at 15 ips), giving drums and bass an authoritative warmth. In quiet orchestral pauses, listen for gentle magnetic tape hiss.",
    ["Studer J37", "15 ips / 30 ips", "AC Bias", "Tape Saturation", "Print-Through"],
    "Studio Open-Reel Tape Deck",
    "/images/music_formats/open_reel_audio_tape.jpg", "Open Reel Magnetic Tape",
    "🎚️ Studio Reel-to-Reel Tape (1940s–1990s)", "Ferric Oxide Coating &bull; 15/30 ips &bull; Erase/Record/Playback Heads",
    "The German Magnetophon & Studio Multi-Tracking",
    "During WWII, German engineers developed magnetic tape with high-frequency AC bias, astonishing the world with broadcast fidelity. Jack Mullin brought two Magnetophons to America in 1945, demonstrating them to Bing Crosby, who funded Ampex.",
    "Les Paul pioneered sound-on-sound and 8-track tape, leading to Studer, MCI, and Otari consoles that recorded the entire classic rock era. Tape enabled non-destructive editing: physically splicing tape with a razor blade and editing block!",
    "How Magnetic Tape Transduction Works",
    [
        ("1", "Ferromagnetic Particle Alignment", "Tape consists of a plastic backing coated with microscopic gamma-ferric oxide (Fe2O3) needles suspended in a resin binder."),
        ("2", "The 3-Head Signal Path", "Tape moves past: (1) Erase Head (cleans previous audio with high AC field), (2) Record Head (induces magnetic domains), and (3) Playback Head (reads domains)."),
        ("3", "Ultrasonic AC Bias (~100 kHz)", "Magnetic particles resist changing polarity at zero-crossing (hysteresis distortion). Mixing an ultrasonic 100 kHz bias tone into the audio linearises magnetic response."),
        ("4", "Tape Speed vs Fidelity", "30 ips provides greater physical space per millisecond, extending high frequencies past 25 kHz and lowering wow/flutter; 15 ips enhances low-end bass head bump.")
    ]
))

# SLIDE 5: COMPACT AUDIO CASSETTE
slides_list.append(make_slide(
    5, 12, "Consumer Tape & The Walkman", "Compact Audio Cassette: <span>Portability &amp; Dolby NR</span>",
    "Invented by Lou Ottens at Philips in 1963 for voice dictation, the cassette became a global music juggernaut. With Type II Chrome tape and Dolby B noise reduction, it spawned the mixtape culture and the 1979 Sony Walkman.",
    "Dynamic Operatic Rock on Cassette", "Queen", '"Bohemian Rhapsody" (A Night at the Opera &bull; 1975 Cassette Era)', "fJ9rUzIMcZQ",
    "Ear-Training Diagnostic: Tape Speed Limitations & Dolby Hiss",
    "Listen to Freddie Mercury's delicate piano and a cappella vocal intro. Running at just 1⅞ inches per second on a narrow 0.15-inch ribbon, cassettes have a narrower dynamic range (~50 dB unassisted) and higher inherent tape hiss.",
    "Listen to how Dolby B and C noise reduction suppress high-frequency hiss during quiet passages. If a cassette deck's playback head azimuth is misaligned, notice how the treble becomes dull, muffled, or suffers from high-frequency 'breathing'.",
    ["Philips 1963", "1⅞ ips Speed", "Type I / II / IV", "Dolby B / C NR", "Sony Walkman"],
    "Audio Cassette Tape Formulations",
    "/images/music_formats/cassettetypes1.jpg", "Compact Cassette Tape Types",
    "📼 Philips Compact Cassette (1963–Present)", "1⅞ ips (4.76 cm/s) &bull; 0.15\" Tape &bull; 4-Track Stereo (2 Tracks Per Side)",
    "From Office Dictation to Global Cultural Icon",
    "Philips made the brilliant strategic decision to license the cassette patent royalty-free in 1965, instantly defeating competing proprietary formats like Grundig's DC-International. In 1979, Sony's Walkman TPS-L2 turned music into a personal, mobile soundtrack.",
    "Cassette engineering conquered severe physics constraints: tape running at only 1⅞ ips (one-eighth the speed of studio 15 ips tape) through tiny record heads required advanced magnetic chemistry and active compander noise reduction.",
    "Cassette Formulations & Dolby Processing",
    [
        ("1", "Type I (Normal Bias / Ferric Oxide Fe2O3)", "Standard consumer tape, 120 µs equalization; warm sound but prone to higher background hiss and limited treble headroom."),
        ("2", "Type II (High Bias / Chromium Dioxide CrO2)", "Requires 70 µs EQ; finer magnetic particle distribution provides extended high-frequency response and 4-5 dB lower noise floor."),
        ("3", "Type IV (Metal Particle / Pure Iron)", "Microscopic pure metal particles deliver extraordinary magnetic coercivity and maximum dynamic headroom (+6 dB over Type I)."),
        ("4", "Dolby B / C Compander Noise Reduction", "Boosts low-level high frequencies during recording, and attenuates them identically during playback, cutting audible tape hiss by 10 dB (Dolby B) or 20 dB (Dolby C).")
    ]
))

# SLIDE 6: 8-TRACK CARTRIDGE
slides_list.append(make_slide(
    6, 12, "In-Car Automotive Audio", "8-Track Cartridge: <span>Endless-Loop Stereo 8</span>",
    "Championed by aviation pioneer Bill Lear in 1964, the 8-Track cartridge brought stereo albums into American automobiles. Its endless continuous loop of tape eliminated rewinding but introduced mechanical clunks and azimuth bleed.",
    "Cruising California in 8-Track Stereo", "Eagles", '"Hotel California" (1976 &bull; Asylum Records 8-Track)', "09839DpTctU",
    "Ear-Training Diagnostic: Solenoid Head Clunk & Track Bleed",
    "Listen to Don Felder and Joe Walsh's duelling guitars: 8-track tape ran at 3.75 ips (twice the speed of cassette), offering surprisingly solid mid-range fidelity. However, albums were divided into four equal program lengths.",
    "Hear the famous 8-track flaw: mid-song fades or sudden pauses accompanied by a mechanical 'ker-ch在该unk' as a solenoid physically shifted the playback head to the next program! Over time, head misalignment caused adjacent programs to bleed into the background.",
    ["Bill Lear 1964", "Endless Loop Tape", "3.75 ips", "Program Stepper", "Head Azimuth Bleed"],
    "8-Track Internal Mechanism",
    "/images/music_formats/8track_inside.jpg", "8-Track Cartridge Internal Mechanism",
    "📻 Lear Jet Stereo 8 Cartridge (1964–1980s)", "Endless 1/4\" Loop &bull; 3.75 ips &bull; 4 Stereo Programs &bull; Automotive Audio",
    "Automotive Stereo Meets Aviation Engineering",
    "Prior to the 8-Track, cars only had AM radios (and occasional skipping 45 RPM dashboard turntables!). Bill Lear (designer of the Learjet) adapted Earl Muntz's 4-track cartridge into an 8-track format, partnered with Ford Motor Company, and made it an in-dash option.",
    "The 8-Track had no take-up reel: a continuous loop of 1/4\" lubricated tape was pulled from the center of a single hub and wound back onto the outer perimeter. Because tape rubbed against itself continuously, graphite lubricant was essential.",
    "How 8-Track Mechanics Worked",
    [
        ("1", "Endless Loop Pull-From-Center", "Tape pulled from the center hub and wound around the outer edge created continuous forward motion; rewinding was mechanically impossible!"),
        ("2", "Conductive Foil Sensor Splice", "A strip of conductive aluminium foil spliced into the tape completed an electrical circuit as it passed a sensor post at the end of each program."),
        ("3", "Solenoid Head Stepper", "The sensor triggered an electromagnetic solenoid that stepped the playback head vertically down by a fraction of a millimeter to align with the next stereo track pair."),
        ("4", "Mechanical Wear & Bleed Flaws", "Friction degraded the tape quickly; continuous head shifting threw azimuth out of alignment, causing listeners to hear faint reverse or adjacent track audio.")
    ]
))

# SLIDE 7: COMPACT DISC (CD-DA RED BOOK)
slides_list.append(make_slide(
    7, 12, "The Digital Revolution", "Compact Disc: <span>Red Book Audio &amp; 16-Bit / 44.1 kHz</span>",
    "Co-developed by Sony and Philips in 1980 and launched in 1982, the Compact Disc replaced mechanical styluses with a semiconductor laser reading binary pits beneath clear polycarbonate, delivering 96 dB of silent dynamic range.",
    "The First All-Digital CD Master Bestseller", "Dire Straits", '"Money for Nothing" (Brothers in Arms &bull; 1985 DDD CD Master)', "wTP2RUD_cL0",
    "Ear-Training Diagnostic: Inky Digital Silence & Razor Transients",
    "Listen to Sting's intro falsetto ('I want my MTV') over atmospheric synthesisers: there is absolute, pitch-black silence—zero vinyl crackle, zero tape hiss, zero wow and flutter, and a flat 20 Hz – 20,000 Hz frequency response.",
    "Listen to Neil Dorfsman's recording of Omar Hakim's snare drum attack: the 16-bit linear PCM format preserves razor-sharp transient peaks without tape compression, providing over 90 dB of pristine signal-to-noise ratio.",
    ["Red Book 1982", "44.1 kHz / 16-bit", "Pits & Lands", "780nm Laser", "96 dB Dynamic Range"],
    "Optical CD Track & Pit Geometry",
    "/images/music_formats/red_book_cd_diagram.svg", "Red Book CD Pit Architecture",
    "💿 Compact Disc Digital Audio (CD-DA &bull; 1982)", "120 mm Disc &bull; 44.1 kHz / 16-Bit Linear PCM &bull; 780 nm Infrared Laser Pickup",
    "The Sony-Philips Red Book Standard",
    "In 1980, Sony (Norio Ohga) and Philips (Kees Schouhamer Immink) established the 'Red Book' standard. They decided on 16-bit linear PCM resolution and a 44.1 kHz sampling rate, enabling a 120 mm disc to hold up to 74 minutes of music (long enough for Beethoven's 9th Symphony!).",
    "Brothers in Arms by Dire Straits (1985) was recorded on a 24-track Sony PCM-3324 digital tape recorder (DDD: Digital recording, Digital mixing, Digital mastering) and became the first CD to sell over 1 million copies.",
    "How Optical Laser Transduction Works",
    [
        ("1", "Polycarbonate Disc with Pits & Lands", "Audio data is pressed as a spiral track of microscopic depressions ('pits') and flat reflective surfaces ('lands') coated with vaporised aluminium and lacquer."),
        ("2", "Semiconductor Laser Pickup (780 nm)", "An infrared semiconductor laser diode projects a focused 780 nm beam through the clear polycarbonate underside onto the aluminium layer."),
        ("3", "Destructive Phase Cancellation", "Pits are exactly 1/4 the laser's wavelength deep (~0.11 µm). Light reflecting from a pit cancels out light from the land, dropping reflected intensity detected by a photodiode."),
        ("4", "CIRC Error Correction & DAC", "Cross-Interleaved Reed-Solomon Code (CIRC) reconstructs up to 4,000 consecutive missing bits (scratches); the digital bitstream feeds a DAC to output analogue audio.")
    ]
))

# SLIDE 8: DAT & MINIDISC
slides_list.append(make_slide(
    8, 12, "Professional Digital Tape & Magneto-Optical", "DAT &amp; MiniDisc: <span>Helical Scan vs ATRAC</span>",
    "Sony pioneered two legendary digital formats: Digital Audio Tape (DAT, 1987) with rotating helical heads for uncompressed studio mastering, and MiniDisc (1992) using magneto-optical discs and ATRAC lossy compression.",
    "Pristine Digital Studio Master to DAT", "Radiohead", '"Paranoid Android" (OK Computer &bull; 1997 Mastered to DAT)', "fHiGbolFFGw",
    "Ear-Training Diagnostic: Uncompressed Digital Precision vs Lossy ATRAC",
    "Listen to Jonny Greenwood's acoustic guitar picking and Thom Yorke's dry vocal: recorded and mixed direct to a 16-bit 44.1 kHz DAT recorder, the audio exhibits pristine stereo imaging, ultra-low distortion, and zero magnetic speed fluctuation.",
    "In contrast, listen to MiniDisc recordings: while imperceptible on street headphones, Sony's early ATRAC algorithms slightly narrowed the ultra-high frequency air (>18 kHz) and subtly softened complex percussion transients.",
    ["Sony DAT 1987", "Helical Scan Head", "MiniDisc 1992", "ATRAC Compression", "Anti-Shock RAM"],
    "DAT Tape & MiniDisc Media",
    "/images/music_formats/dat-cartridge.jpg", "Digital Audio Tape & MiniDisc",
    "💽 DAT (1987) vs MiniDisc (1992)", "Helical Scan Uncompressed PCM vs Magneto-Optical ATRAC Compression",
    "Studio Masters vs Consumer Portability",
    "DAT utilised miniature rotating helical drums (spinning at 2,000 RPM, derived from VCR technology) across 4mm tape, storing uncompressed 16-bit PCM at 44.1 or 48 kHz. It became the universal studio mixing and radio broadcast standard throughout the 1990s.",
    "MiniDisc aimed to replace the compact cassette: a 64mm magneto-optical disc housed in a tough plastic caddy. To combat skipping during exercise, Sony added a 4-megabit RAM chip that buffered 10 seconds of unplayed audio.",
    "Comparing DAT and MiniDisc Transduction",
    [
        ("1", "DAT Rotating Helical Head Drum", "Slanted rotating heads sweep diagonally across slowly moving 4mm tape, writing dense digital track patterns without needing ultra-fast tape transport speeds."),
        ("2", "Uncompressed Studio Fidelity (DAT)", "Pure linear PCM at up to 48 kHz / 16-bit with >90 dB dynamic range; DAT allowed bit-perfect digital-to-digital cloning via AES/EBU or SPDIF connections."),
        ("3", "Magneto-Optical Overwrite (MiniDisc)", "A laser heats the disc to the Curie point (~180°C) where magnetic coercivity drops; an electromagnetic head on the opposite side flips magnetic domains to record data."),
        ("4", "ATRAC Perceptual Audio Coding (MiniDisc)", "Adaptive Transform Acoustic Coding divided audio into 52 sub-bands, discarding frequencies masked by louder sounds to compress file size by approx 5:1.")
    ]
))

# SLIDE 9: LOSSY COMPRESSION (MP3 & AAC)
slides_list.append(make_slide(
    9, 12, "Psychoacoustic Compression", "MP3 &amp; AAC: <span>Psychoacoustic Masking &amp; Bitrates</span>",
    "Developed by Fraunhofer IIS and Karlheinz Brandenburg, MP3 (1993) transformed music distribution by throwing away sound data human ears can't perceive, shrinking CD files by 90% (10:1 ratio) to fit through dial-up internet.",
    "The MP3 Reference Benchmark", "Suzanne Vega", '"Tom\'s Diner" (1987 A Cappella &bull; The Mother of the MP3)', "FLP6QluMlrg",
    "Ear-Training Diagnostic: Low-Bitrate Lossy Compression Artifacts",
    "Listen to Suzanne Vega's isolated vocal: during algorithm development, subtle breathing, vocal fry, and dental sibilance ('t', 's', 'k') exposed flaws in early MP3 encoders, causing harsh fluttering distortions.",
    "Ear-training tests for lossy compression: (1) Metallic, watery 'swishing' on cymbals and high-hats, (2) Pre-echo: a faint 'ghost' transient audible milliseconds before sharp drum hits, (3) Steep low-pass filter cutting off frequencies above 16 kHz (128 kbps), and (4) Loss of stereo depth.",
    ["MPEG-1 Layer III", "Psychoacoustic Masking", "Temporal Masking", "Pre-Echo", "128 vs 320 kbps"],
    "WAV vs MP3 Data Architecture",
    "/images/music_formats/wav_vs_mp3_diagram.svg", "WAV vs MP3 Compression Diagram",
    "📱 MP3 &amp; AAC Perceptual Codecs (1993–Present)", "Sub-Band MDCT &bull; Psychoacoustic Masking &bull; 128 / 256 / 320 kbps",
    "How Psychoacoustics Conquered the Internet",
    "Uncompressed CD audio requires ~10 MB of data per minute (1,411 kbps). In 1993, transmitting a 40 MB album across dial-up modems took hours! The Fraunhofer Society engineered MP3 using human hearing biology: if the brain can't hear a sound, don't store it!",
    "Later perceptual codecs like AAC (Advanced Audio Coding, used by Apple) achieved even higher fidelity than MP3 at identical bitrates through improved filter banks, temporal noise shaping (TNS), and stereo coding.",
    "How Psychoacoustic Masking Discards Data",
    [
        ("1", "Simultaneous Frequency Masking", "A loud sound at 1 kHz physically excites the basilar membrane in the inner ear, rendering quieter adjacent frequencies (e.g., at 1.1 kHz) completely imperceptible."),
        ("2", "Temporal Masking (Pre- & Post-Masking)", "A loud snare transient temporarily deafens human hearing for ~5 ms before the transient (pre-masking) and up to 100 ms after (post-masking); quiet sounds within this window are discarded."),
        ("3", "Sub-Band MDCT Filtering", "Audio is split into 32 frequency sub-bands using Modified Discrete Cosine Transform (MDCT); quantization bits are allocated strictly to audible frequency bands."),
        ("4", "Bitrate Fidelity Scaling", "At 128 kbps (~10:1 ratio), aggressive filtering causes audible metallic smearing; at 320 kbps MP3 or 256 kbps AAC, the audio is virtually indistinguishable from CD quality.")
    ]
))

# SLIDE 10: LOSSLESS & HI-RES (WAV, AIFF, FLAC)
slides_list.append(make_slide(
    10, 12, "Uncompressed PCM & Lossless", "Lossless &amp; Hi-Res: <span>Bit Depth, Nyquist &amp; FLAC</span>",
    "Lossless formats preserve every single bit of original studio audio. Uncompressed WAV/AIFF store raw linear PCM, while FLAC and ALAC compress file sizes by 40-50% like zip files without discarding a single musical frequency.",
    "Audiophile Reference 24-Bit / 96 kHz", "Daft Punk", '"Get Lucky" (Random Access Memories &bull; 2013 Studio Master)', "5NV6Rdv1a3I",
    "Ear-Training Diagnostic: 24-Bit Dynamic Range & Nyquist Extension",
    "Listen to Nile Rodgers' guitar strumming, Nathan East's bass line, and Omar Hakim's hi-hats: recorded in pristine 24-bit / 96 kHz, the sound boasts an immense 144 dB theoretical dynamic range with microscopic detail in reverb decay tails.",
    "Notice the absence of codec artifacts: cymbals have natural brass sizzle extending past 20 kHz without metallic swishing or brickwall filtering; transients have instantaneous punch without pre-echo smearing.",
    ["Linear PCM", "WAV & AIFF", "FLAC Lossless", "Nyquist Theorem", "24-Bit / 96 kHz"],
    "Bit Depth & Quantization Steps",
    "/images/music_formats/bit-depth.png", "Bit Depth Quantization Grid",
    "🎼 Linear PCM, WAV &amp; FLAC Lossless", "Dynamic Range = 6.02 x N dB &bull; Nyquist fs >= 2fmax &bull; Bit-Perfect Audio",
    "PCM Math & Lossless Compression",
    "Digital audio is defined by two mathematical axes: (1) Sample Rate (measurements per second, determining frequency bandwidth via the Nyquist-Shannon theorem), and (2) Bit Depth (binary word length, determining dynamic range and quantization noise floor).",
    "While MP3 permanently throws away data, FLAC (Free Lossless Audio Codec) uses linear prediction algorithms to identify repeating mathematical patterns. When decoded, it outputs the identical bitstream as the original WAV file.",
    "Crucial Exam Formulas & Principles",
    [
        ("1", "Dynamic Range Formula: 6.02 x N dB", "Every 1 bit of resolution provides approx 6 dB of dynamic range. 16-bit Red Book CD = ~96 dB; 24-bit Studio Master = ~144 dB (exceeding human ear pain threshold)."),
        ("2", "Nyquist-Shannon Theorem (fs >= 2fmax)", "To accurately reconstruct an audio frequency, the sampling rate must be at least double the highest frequency. Human hearing (20 kHz) requires at least 40 kHz (hence 44.1 kHz)."),
        ("3", "Anti-Aliasing Filter Guard Band", "Frequencies above Nyquist reflect back as discordant 'alias' distortion. The gap between 20 kHz and 44.1 kHz allows steep low-pass reconstruction filters."),
        ("4", "FLAC / ALAC Lossless Packing", "Compresses file size by ~50% without psychoacoustic loss; identical to unzipping a document—zero bits of sound are lost or approximated.")
    ]
))

# SLIDE 11: MODERN STREAMING & NORMALISATION
slides_list.append(make_slide(
    11, 12, "The Streaming Era", "Streaming &amp; Normalisation: <span>LUFS Targets &amp; True Peak</span>",
    "Streaming platforms (Spotify, Apple Music, YouTube) ended the 'Loudness Wars'. By measuring Integrated Loudness in LUFS and turning over-compressed tracks down, streaming demands dynamic, punchy mastering with -1 dBFS True Peak headroom.",
    "Modern Master Engineered for Streaming", "The Weeknd", '"Blinding Lights" (2020 &bull; Mastered by Dave Kutch)', "4NRXx6U8ABQ",
    "Ear-Training Diagnostic: Integrated Loudness & True Peak Limiting",
    "Listen to the synth-pop bassline and drum transient impact: despite its energetic wall of sound, notice that the kick drum and snare retain punchy crest factor without squashed limiter distortion or pumping artifacts.",
    "If a track is mastered aggressively to -7 LUFS, streaming algorithms automatically turn the whole song down by -7 dB to hit -14 LUFS. The result? The squashed track sounds thin and flat next to a dynamic -14 LUFS master that breathes naturally!",
    ["LUFS Loudness", "-14 LUFS Spotify", "-16 LUFS Apple", "True Peak Limiter", "End of Loudness War"],
    "Streaming Loudness Normalisation",
    "/images/music_formats/streaming_normalization_diagram.svg", "Streaming Normalisation Curve",
    "📶 Streaming Audio Targets (ITU-R BS.1770 / EBU R128)", "Spotify -14 LUFS &bull; Apple Music -16 LUFS &bull; -1.0 dBFS True Peak Ceiling",
    "How Streaming Solved The Loudness War",
    "For decades during the CD era, record labels competed to make CDs as loud as possible by crushing dynamic range with aggressive brickwall limiters. When listeners shuffled playlists, volume jumped wildly from track to track.",
    "Modern streaming services introduced Loudness Normalisation using K-weighted filters (LUFS: Loudness Units relative to Full Scale). Now, loudness is standardised across all tracks, making extreme dynamic compression pointless.",
    "Mastering for Streaming Requirements",
    [
        ("1", "Integrated Loudness Measurement (LUFS)", "Measures the perceived average loudness of the entire song using ITU-R BS.1770 algorithms, mimicking human ear sensitivity to upper-mid frequencies."),
        ("2", "Platform Targets: -14 & -16 LUFS", "Spotify, YouTube, and Amazon Music normalize playback to -14 LUFS Integrated; Apple Music normalizes to -16 LUFS Integrated."),
        ("3", "Penalty for Over-Compression", "A track mastered to -8 LUFS is attenuated by -6 dB on Spotify. It plays at the exact same perceived loudness as a dynamic track, but lacks transient punch!"),
        ("4", "True Peak Headroom (-1.0 dBFS TP)", "Lossy codec compression (AAC/Ogg) and DAC filters create inter-sample peaks that exceed the digital ceiling. Leaving -1.0 dB True Peak prevents clipping distortion.")
    ]
))

# SLIDE 12: MASTER MATRIX & EXAM TRAPS
table_rows = [
    ("78 RPM Shellac", "Acoustic horn / needle / lateral cut in shellac", "200 Hz – 3,000 Hz", "~30–35 dB", "Extreme surface hiss, abrasive slate wear, 3-minute limit per side, acoustic horn resonance."),
    ("Vinyl Microgroove (33⅓)", "PVC disc / diamond stylus / RIAA phono EQ", "20 Hz – 20,000 Hz", "~55–65 dB", "RIAA EQ curve needed, inner-groove distortion, wow & flutter, dust clicks, physical wear."),
    ("Open-Reel Tape (15/30 ips)", "Polyester ribbon / ferric oxide / 3-head path", "20 Hz – 25,000 Hz", "~65–75 dB (w/ NR)", "Tape hiss, print-through, tape saturation soft-limiting, requires ultrasonic AC bias (~100 kHz)."),
    ("Compact Cassette (1⅞ ips)", "0.15\" tape / 4-track / Type I/II/IV / Dolby", "30 Hz – 16,000 Hz (Type II)", "~50–65 dB (w/ Dolby)", "High tape hiss without Dolby B/C, head azimuth misalignment muffles treble, wow & flutter."),
    ("8-Track Cartridge", "1/4\" endless loop / 3.75 ips / 4 stereo programs", "40 Hz – 14,000 Hz", "~50 dB", "Solenoid head clunk during track shift, cannot rewind, head azimuth drift causes track bleed."),
    ("Compact Disc (CD-DA)", "120 mm polycarbonate / 780 nm laser / pits", "20 Hz – 20,000 Hz (flat)", "~96 dB (16-bit)", "44.1 kHz / 16-bit linear PCM Red Book standard; zero surface noise, CIRC error correction."),
    ("Digital Audio Tape (DAT)", "4mm tape / rotating helical scan drum", "20 Hz – 22,000 Hz", "~92 dB (16-bit)", "Uncompressed 16-bit PCM at 44.1/48 kHz; studio master standard; tape dropouts over time."),
    ("MiniDisc (ATRAC)", "64mm magneto-optical / 780 nm laser + head", "20 Hz – 18,000 Hz", "~90 dB", "ATRAC lossy compression (~5:1 ratio), subtle high-frequency loss, 10s anti-shock RAM buffer."),
    ("MP3 / AAC Codecs", "Psychoacoustic perceptual coding / MDCT", "20 Hz – 16 kHz (128k) / 20k (320k)", "Dynamic range up to 96 dB", "Simultaneous & temporal masking, metallic cymbal swishing, pre-echo transients, brickwall cutoff."),
    ("WAV / FLAC Lossless", "Linear PCM / lossless predictive compression", "20 Hz – 48 kHz (96k)", "Up to 144 dB (24-bit)", "Dynamic range = 6.02 x N dB; bit-for-bit identical to master audio; no perceptual loss."),
    ("Streaming Normalisation", "Ogg Vorbis / AAC / LUFS loudness normalisation", "20 Hz – 20,000 Hz", "Target -14 LUFS", "Tracks turned down if too squashed; requires -1 dBFS True Peak headroom to stop clipping.")
]

exam_traps = [
    ("1", "Sample Rate vs Bit Depth Confusion", "Sample Rate controls frequency bandwidth (Nyquist limit fs >= 2fmax). Bit Depth controls dynamic range and quantization noise floor (6.02 x N dB). Do not mix these up!"),
    ("2", "RIAA Equalisation Direction", "Remember RIAA applies BOTH on cutting (bass cut, treble boost) AND on playback in the phono preamp (bass boost, treble cut to restore flat frequency balance and cut hiss)."),
    ("3", "AC Bias Function", "Tape AC bias is an ultrasonic frequency (~100 kHz) mixed into the audio signal during recording to eliminate magnetic hysteresis distortion at zero crossing; it is NOT audible sound."),
    ("4", "Lossy vs Lossless Distinction", "MP3 and AAC are LOSSY (perceptual data is permanently discarded). FLAC and ALAC are LOSSLESS (compressed mathematically like a zip file; 100% bit-perfect upon decompression)."),
    ("5", "Loudness Normalisation Penalty", "Streaming platforms measure Integrated LUFS. Mastering a track louder than -14 LUFS does NOT make it louder on Spotify—it gets turned down, losing transient punch.")
]

slides_list.append(make_table_slide(
    12, 12, "Component 3 Specification Matrix", "Audio Formats: <span>The Master Exam Matrix</span>",
    "The complete Edexcel Component 3 comparative reference: physical mediums, frequency bandwidths, dynamic ranges, and signature exam pitfalls.",
    "Evolution of Sound Distribution", "Recording Industry Retrospective", "From Cylinders to Streams &bull; A-Level Exam Master Review", "D3XB3owN6qo",
    "Ear-Training Diagnostic: Identifying Artifacts in Context 3 Exams",
    "In Section A and B of Component 3, you may be presented with historic recordings and asked to identify the era, medium, or recording flaw. Train your ears for: (1) Horn resonance & slate hiss = 78 Shellac, (2) Surface ticks & RIAA warmth = Vinyl, (3) Tape saturation & hiss = Analogue Tape, (4) Inky black silence = CD / Digital PCM, (5) Watery swishing & pre-echo = Low-bitrate MP3.",
    "Use the Master Matrix table on the right to memorize exact bandwidths, dynamic ranges, and engineering terminology required by examiners.",
    ["Component 3 Matrix", "Exam Pitfalls", "LUFS Target", "RIAA Curve", "Nyquist Theorem"],
    "The Format Specification Matrix",
    "/images/music_formats/comparison_cd_cassette_streaming.svg", "Formats Comparison Diagram",
    "🏆 The Master Specification Matrix", "11 Formats &bull; Transduction Physics &bull; Dynamic Range &bull; Exam Traps",
    "Edexcel Component 3 Examination Essentials",
    "When answering questions on storage formats, always use technical terminology: 'Polyvinyl chloride', 'RIAA pre-emphasis/de-emphasis', 'Semiconductor laser photodiode phase cancellation', 'Ultrasonic AC bias', 'Psychoacoustic frequency and temporal masking', and 'ITU-R BS.1770 LUFS normalisation'.",
    "Examiners frequently test your ability to explain WHY a technology was developed: e.g., why vinyl replaced shellac (longer playing time, quieter surface, lighter tracking), why RIAA was necessary (preventing physical groove overlap), or why MP3 compression was created (internet bandwidth limitations).",
    table_rows, exam_traps
))

# Compile full HTML
all_slides_html = "\n".join(slides_list)
final_output = HTML_TEMPLATE.replace("{SLIDES_HTML}", all_slides_html)

output_path = "public/interactive-slide-music-formats.html"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(final_output)

print(f"Generated {output_path} ({len(final_output)} bytes) with 12 split-screen slides!")
