#!/usr/bin/env python3
"""
build_music_formats_deck.py
Generates the streamlined split-screen interactive revision presentation:
public/interactive-slide-music-formats.html
Strictly focused on the 4 core formats required for Edexcel A-Level Music Technology Component 3:
1. Overview & 4 Eras
2. Vinyl Microgroove (33⅓ & 45 RPM, RIAA Curve)
3. Compact Audio Cassette (Philips 1963, Dolby B/C)
4. Compact Disc (CD-DA Red Book 1982, 16-bit / 44.1 kHz)
5. MP3 & Modern Streaming (Psychoacoustic Masking & LUFS Normalisation)
6. Master Specification Matrix & Top 5 Exam Traps
"""

import os

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>Consumable Music Formats: Vinyl, Cassette, CD &amp; Streaming | Edexcel Component 3</title>
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
      --accent-format: #34d399;
      --accent-format-glow: rgba(52, 211, 153, 0.25);
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
      background: rgba(52, 211, 153, 0.12);
      border: 1px solid rgba(52, 211, 153, 0.3);
      color: var(--accent-format);
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
      background: rgba(52, 211, 153, 0.15);
      color: var(--accent-format);
      border: 1px solid rgba(52, 211, 153, 0.35);
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
      background: rgba(52, 211, 153, 0.05);
      border: 1px solid rgba(52, 211, 153, 0.2);
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
      color: #042f2e;
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
      background: rgba(52, 211, 153, 0.15);
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
      color: #042f2e;
    }

    .nav-btn.primary:hover:not(:disabled) {
      background: #10b981;
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
      width: 16.66%;
      transition: width 0.3s ease;
    }
  
    

  
    /* Universal Image Lightbox Modal */
    .image-modal-backdrop {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(3, 7, 18, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 100000;
      align-items: center;
      justify-content: center;
      padding: 20px;
      cursor: zoom-out;
      box-sizing: border-box;
    }
    .image-modal-backdrop.open {
      display: flex;
    }
    .image-modal-content {
      position: relative;
      max-width: 94vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 14px;
      padding: 14px 18px 12px 18px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(56, 189, 248, 0.2);
      cursor: default;
      animation: modalZoomIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
    }
    @keyframes modalZoomIn {
      from { transform: scale(0.92); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .image-modal-img-wrap {
      max-width: 90vw;
      max-height: 78vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 8px;
      background: #030712;
    }
    .image-modal-content img {
      max-width: 90vw;
      max-height: 78vh;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      border-radius: 6px;
    }
    .image-modal-caption {
      margin-top: 10px;
      font-size: 13.5px;
      color: #f1f5f9;
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.3px;
      max-width: 82vw;
    }
    .image-modal-hint {
      margin-top: 4px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }
    .image-modal-hint kbd {
      background: rgba(255, 255, 255, 0.1);
      padding: 1px 5px;
      border-radius: 3px;
      color: #cbd5e1;
    }
    .image-modal-close {
      position: absolute;
      top: -12px;
      right: -12px;
      background: #ef4444;
      color: #ffffff;
      border: 2px solid #ffffff;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 18px;
      font-weight: 800;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
      transition: transform 0.2s, background 0.2s;
      z-index: 100001;
    }
    .image-modal-close:hover {
      background: #dc2626;
      transform: scale(1.1);
    }

    /* Expandable image affordance for all content images */
    .hardware-photo, .instrument-photo-card, .artist-visual-col, .image-frame, .cover-card, .slide-thumb-wrapper, .info-card {
      position: relative;
      cursor: zoom-in;
    }
    .hardware-photo img, .instrument-photo, .artist-photo, .slide-thumb, .image-frame img, .cover-card img, .info-card img {
      cursor: zoom-in !important;
      transition: transform 0.25s ease, filter 0.25s ease;
    }
    .hardware-photo:hover img, .instrument-photo-card:hover img, .artist-visual-col:hover img {
      transform: scale(1.025);
    }
    .hardware-photo::after, .instrument-photo-card::after {
      content: '🔍 Expand';
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      color: #38bdf8;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 4;
    }
    .hardware-photo:hover::after, .instrument-photo-card:hover::after {
      opacity: 1;
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
      <span class="slide-counter" id="slideCounter">01 / 06</span>
    </div>

    <div class="nav-center">
      <select class="slide-select" id="slideSelect" onchange="jumpToSlide(parseInt(this.value))">
        <option value="1">1. Consumable Formats Overview</option>
        <option value="2">2. Vinyl Disc (33⅓ &amp; 45 RPM &bull; RIAA Curve)</option>
        <option value="3">3. Compact Cassette (Philips 1963 &bull; Dolby NR)</option>
        <option value="4">4. Compact Disc (CD-DA Red Book 1982)</option>
        <option value="5">5. MP3 &amp; Modern Streaming (Psychoacoustics &bull; LUFS)</option>
        <option value="6">6. Master Specification Matrix &amp; Exam Traps</option>
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
    const totalSlides = 6;

    // Direct hash/param routing
    const slugMap = {
      'overview': 1,
      'vinyl': 2,
      'cassette': 3,
      'cd': 4,
      'compact-disc': 4,
      'mp3': 5,
      'streaming': 5,
      'matrix': 6
    };

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
      document.getElementById('slideCounter').textContent = (currentSlide < 10 ? '0' : '') + currentSlide + ' / 0' + totalSlides;
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

    // Check URL parameters and hash on load
    function initRoute() {
      const urlParams = new URLSearchParams(window.location.search);
      const slideParam = urlParams.get('slide');
      const hash = window.location.hash.replace('#', '').toLowerCase();

      if (slideParam && parseInt(slideParam) >= 1 && parseInt(slideParam) <= totalSlides) {
        showSlide(parseInt(slideParam));
      } else if (hash && slugMap[hash]) {
        showSlide(slugMap[hash]);
      } else {
        showSlide(1);
      }
    }

    window.addEventListener('hashchange', initRoute);
    initRoute();
  
    
    // Universal Image Lightbox Logic
    function getImageModalEls() {
      return {
        modal: document.getElementById('imageModal'),
        img: document.getElementById('imageModalImg'),
        caption: document.getElementById('imageModalCaption')
      };
    }

    function openImageModal(src, alt) {
      const { modal, img, caption } = getImageModalEls();
      if (!modal || !img) return;
      img.src = src;
      if (caption) caption.textContent = alt || '';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
      const { modal, img } = getImageModalEls();
      if (!modal) return;
      modal.classList.remove('open');
      if (img) img.src = '';
      document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      const photoCard = e.target.closest('.hardware-photo, .instrument-photo-card');
      const targetImg = img || (photoCard ? photoCard.querySelector('img') : null);

      if (targetImg) {
        if (targetImg.closest('#videoModal') || targetImg.closest('#imageModal') || targetImg.classList.contains('no-expand')) return;
        e.preventDefault();
        const bestCaption = targetImg.alt || targetImg.getAttribute('title') ||
                            targetImg.closest('.hardware-photo')?.nextElementSibling?.querySelector('.inst-name')?.textContent ||
                            targetImg.closest('.instrument-photo-card')?.querySelector('.caption-name')?.textContent || '';
        openImageModal(targetImg.src, (bestCaption || '').trim());
      }
    });

    document.addEventListener('keydown', (e) => {
      const { modal } = getImageModalEls();
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeImageModal();
      }
    });

  </script>

  

  <!-- Universal Image Lightbox Modal -->
  <div class="image-modal-backdrop" id="imageModal" onclick="closeImageModal()" role="dialog" aria-modal="true" aria-label="Expanded Image View">
    <div class="image-modal-content" onclick="event.stopPropagation()">
      <button class="image-modal-close" onclick="closeImageModal()" title="Close (Esc)" aria-label="Close">&times;</button>
      <div class="image-modal-img-wrap">
        <img id="imageModalImg" src="" alt="Expanded Image">
      </div>
      <div class="image-modal-caption" id="imageModalCaption"></div>
      <div class="image-modal-hint">Click outside or press <kbd>ESC</kbd> to close</div>
    </div>
  </div>

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
          <div class="step-num" style="background: var(--accent-highlight); color: #fff;">{trap_num}</div>
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
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
                  <th>Transduction Method</th>
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

# Build the 6 streamlined slides
slides_list = []

# SLIDE 1: OVERVIEW (The 4 Consumable Pillars)
slides_list.append(make_slide(
    1, 6, "Component 3 Overview", "The 4 Core Consumable Formats: <span>Vinyl, Tape, CD &amp; Stream</span>",
    "Edexcel Component 3 focuses on the commercial formats that brought music into homes and headphones: Vinyl Microgroove (1948), Compact Cassette (1963), Compact Disc (1982), and MP3 / Streaming (1993–Present).",
    "The 4 Consumer Audio Eras", "Format History Archive", "Evolution of Music Formats: Mechanical to Streaming", "D3XB3owN6qo",
    "Ear-Training Diagnostic: Transduction Signatures Across the 4 Formats",
    "Compare the four sonic signatures: (1) Vinyl delivers warm lower-mid harmonics accompanied by delicate surface ticks and RIAA bass weighting; (2) Cassette exhibits slight tape hiss, dynamic compression, and high-frequency saturation at 1⅞ ips; (3) Compact Disc delivers dead silence with punchy, instantaneous transient attacks; and (4) MP3 displays subtle psychoacoustic swishing and loss of spatial air at low bitrates.",
    "In the exam, identify formats by listening for mechanical needle crackle, magnetic tape hiss, laser digital transparency, or psychoacoustic pre-echo distortion.",
    ["Vinyl Microgroove", "Compact Cassette", "Compact Disc", "MP3 & Streaming", "Transduction Modes"],
    "The 4 Consumable Pillars",
    "/images/music_formats/comparison_cd_cassette_streaming.svg", "Comparison of CD, Cassette and Streaming",
    "💽 The 4 Core Syllabus Formats", "Mechanical (Vinyl) &bull; Magnetic (Cassette) &bull; Optical (CD) &bull; Perceptual Digital (Streaming)",
    "Four Decades of Consumer Fidelity Evolution",
    "Commercial formats transformed the recording industry by balancing three critical engineering trade-offs: Frequency Response (20 Hz - 20 kHz), Dynamic Range (signal-to-noise ratio in decibels), and Consumer Portability (from heavy 12-inch discs to infinite cloud streams).",
    "Each format represents a unique physical transduction principle: mechanical diamond stylus tracing PVC grooves, magnetic induction across tape heads, laser beam phase cancellation over optical pits, and algorithmic mathematical data compression.",
    "The 4 Primary Transduction Modes",
    [
        ("1", "Mechanical Transduction (Vinyl Disc)", "Diamond stylus vibrates in a microgroove; electromagnetic cartridge induces micro-voltage; phono preamp applies inverse RIAA equalisation."),
        ("2", "Magnetic Induction (Compact Cassette)", "Microscopic ferromagnetic particles on a 0.15\" ribbon moving at 1⅞ ips induce electrical current across playback head coils; Dolby NR suppresses hiss."),
        ("3", "Optical Digital Transduction (Compact Disc)", "Semiconductor 780 nm infrared laser reads reflective aluminium pits; photodiode detects binary destructive phase cancellation; DAC converts to audio."),
        ("4", "Psychoacoustic Perceptual Compression (MP3 & Streaming)", "Frequency-domain sub-band algorithms discard sounds masked by human ear biology, reducing 1,411 kbps CD audio to 128-320 kbps for web distribution.")
    ]
))

# SLIDE 2: VINYL MICROGROOVE (33⅓ & 45 RPM)
slides_list.append(make_slide(
    2, 6, "Format 01 &bull; Mechanical Analogue", "Vinyl Microgroove Discs: <span>RIAA Equalisation &amp; 33⅓ RPM</span>",
    "Introduced by Columbia Records in 1948, vinyl microgroove records pressed on smooth polyvinyl chloride (PVC) unlocked up to 22 minutes per side with wide frequency response, made possible by the RIAA pre-emphasis/de-emphasis curve.",
    "Stereo Space & Microgroove Fidelity", "Miles Davis", '"So What" (Kind of Blue &bull; 1959 Columbia 33⅓ RPM LP)', "zqNTltOGh5c",
    "Ear-Training Diagnostic: RIAA Balance & Stereo 45/45 Geometry",
    "Listen to Paul Chambers' walking double-bass and Jimmy Cobb's ride cymbal: vinyl delivers full 20 Hz – 20,000 Hz extension. Notice the wide stereophonic separation: trumpet left, saxophones right, piano and bass anchored in the middle.",
    "Listen for vinyl's signature sonic traits: faint surface crackle, microscopic dust ticks, warm lower-mid harmonic bloom, and a dynamic range of approximately 55–65 dB without digital quantization artifacts.",
    ["Vinyl LP", "33⅓ & 45 RPM", "RIAA Curve", "Microgroove PVC", "45/45 Stereo Matrix"],
    "Vinyl Microgroove Architecture",
    "/images/music_formats/vinyl_lp.jpg", "Vinyl 12-inch LP Record",
    "💽 Vinyl LP &amp; 45 RPM Microgroove (1948–Present)", "Polyvinyl Chloride (PVC) &bull; RIAA Equalisation &bull; Moving Magnet / Coil",
    "The Breakthrough of Microgroove & PVC",
    "Standard shellac grooves were thick and noisy. Vinyl used synthetic polyvinyl chloride (PVC), which was flexible and smooth. By reducing groove width to 1 mil (microgroove), playback speed dropped to 33⅓ RPM, extending playing time to 22 minutes per side.",
    "Stereo vinyl (1958) used Alan Blumlein's 45/45 degree groove system: the inner wall modulates at 45° for the Left channel, and the outer wall modulates at 45° for the Right channel. A mono stylus sums both walls laterally.",
    "How RIAA Equalisation Works (Exam Essential)",
    [
        ("1", "The Cutting Lathe Problem", "Low bass frequencies create large groove excursions that would cause the cutting stylus to slice into adjacent tracks or throw the playback needle out of the groove."),
        ("2", "RIAA Pre-Emphasis on Record Cutting", "The master cutting lathe applies an aggressive RIAA filter: bass below 500 Hz is heavily attenuated (-17 dB at 50 Hz), while treble above 2 kHz is boosted (+17 dB at 10 kHz)."),
        ("3", "RIAA De-Emphasis in Phono Preamp", "The turntable's phono preamplifier applies the exact mirror inverse curve: boosting bass and sharply rolling off high frequencies by 17 dB."),
        ("4", "Surface Noise Attenuation", "Rolling off the high frequencies on playback simultaneously suppresses vinyl surface hiss and crackles, achieving a clean signal-to-noise ratio of ~60 dB.")
    ]
))

# SLIDE 3: COMPACT AUDIO CASSETTE (PHILIPS 1963)
slides_list.append(make_slide(
    3, 6, "Format 02 &bull; Magnetic Analogue", "Compact Audio Cassette: <span>Philips 1963 &amp; Dolby NR</span>",
    "Invented by Lou Ottens at Philips in 1963, the cassette democratised music. Running at 1⅞ ips on a 0.15\" ribbon with Type II Chrome tape and Dolby B noise reduction, it created mixtape culture and the 1979 Sony Walkman portable boom.",
    "Dynamic Operatic Rock on Cassette", "Queen", '"Bohemian Rhapsody" (A Night at the Opera &bull; 1975 Cassette Era)', "fJ9rUzIMcZQ",
    "Ear-Training Diagnostic: Tape Speed Limitations & Dolby Hiss",
    "Listen to Freddie Mercury's delicate piano and a cappella vocal intro. Running at just 1⅞ inches per second on a narrow 0.15-inch ribbon, cassettes have a narrower dynamic range (~50 dB unassisted) and higher inherent tape hiss.",
    "Listen to how Dolby B and C noise reduction suppress high-frequency hiss during quiet passages. If a cassette deck's playback head azimuth is misaligned, notice how the treble becomes dull, muffled, or suffers from high-frequency 'breathing'.",
    ["Philips 1963", "1⅞ ips Speed", "Type I / II / IV", "Dolby B / C NR", "Sony Walkman"],
    "Audio Cassette Tape Formulations",
    "/images/music_formats/cassettetypes1.jpg", "Compact Cassette Tape Types",
    "📼 Philips Compact Cassette (1963–Present)", "1⅞ ips (4.76 cm/s) &bull; 0.15\" Tape &bull; 4-Track Stereo (2 Tracks Per Side)",
    "From Voice Dictation to Personal Stereo Revolution",
    "Philips made the brilliant strategic decision to license the cassette patent royalty-free in 1965, defeating proprietary formats. In 1979, Sony's Walkman TPS-L2 turned music into a personal, mobile soundtrack for the first time in history.",
    "Cassette engineering conquered severe physics constraints: tape running at only 1⅞ ips (one-eighth the speed of studio 15 ips tape) through tiny record heads required advanced magnetic chemistry and active compander noise reduction.",
    "Cassette Formulations & Dolby Processing",
    [
        ("1", "Type I (Normal Bias / Ferric Oxide Fe2O3)", "Standard consumer tape, 120 µs equalization; warm sound but prone to higher background hiss and limited treble headroom."),
        ("2", "Type II (High Bias / Chromium Dioxide CrO2)", "Requires 70 µs EQ; finer magnetic particle distribution provides extended high-frequency response and 4-5 dB lower noise floor."),
        ("3", "Type IV (Metal Particle / Pure Iron)", "Microscopic pure metal particles deliver extraordinary magnetic coercivity and maximum dynamic headroom (+6 dB over Type I)."),
        ("4", "Dolby B / C Compander Noise Reduction", "Boosts low-level high frequencies during recording, and attenuates them identically during playback, cutting audible tape hiss by 10 dB (Dolby B) or 20 dB (Dolby C).")
    ]
))

# SLIDE 4: COMPACT DISC (CD-DA RED BOOK 1982)
slides_list.append(make_slide(
    4, 6, "Format 03 &bull; Optical Digital", "Compact Disc (CD-DA): <span>Red Book &amp; 16-Bit / 44.1 kHz</span>",
    "Co-developed by Sony and Philips in 1980 and released commercially in 1982, the CD replaced mechanical styluses with a semiconductor laser reading binary pits beneath clear polycarbonate, delivering 96 dB of silent dynamic range.",
    "The First All-Digital CD Master Bestseller", "Dire Straits", '"Money for Nothing" (Brothers in Arms &bull; 1985 DDD CD Master)', "wTP2RUD_cL0",
    "Ear-Training Diagnostic: Inky Digital Silence & Razor Transients",
    "Listen to Sting's intro falsetto ('I want my MTV') over atmospheric synthesisers: there is absolute, pitch-black silence—zero vinyl crackle, zero tape hiss, zero wow and flutter, and a flat 20 Hz – 20,000 Hz frequency response.",
    "Listen to Neil Dorfsman's recording of Omar Hakim's snare drum attack: the 16-bit linear PCM format preserves razor-sharp transient peaks without tape compression, providing over 90 dB of pristine signal-to-noise ratio.",
    ["Red Book 1982", "44.1 kHz / 16-bit", "Pits & Lands", "780nm Laser", "96 dB Dynamic Range"],
    "Optical CD Track & Pit Geometry",
    "/images/music_formats/red_book_cd_diagram.svg", "Red Book CD Pit Architecture",
    "💿 Compact Disc Digital Audio (CD-DA &bull; 1982)", "120 mm Disc &bull; 44.1 kHz / 16-Bit Linear PCM &bull; 780 nm Infrared Laser Pickup",
    "The Sony-Philips Red Book Standard",
    "In 1980, Sony (Norio Ohga) and Philips (Kees Schouhamer Immink) established the 'Red Book' standard. They decided on 16-bit linear PCM resolution and a 44.1 kHz sampling rate, enabling a 120 mm disc to hold up to 74 minutes of music.",
    "Brothers in Arms by Dire Straits (1985) was recorded on a 24-track Sony PCM-3324 digital tape recorder (DDD: Digital recording, Digital mixing, Digital mastering) and became the first CD to sell over 1 million copies.",
    "How Optical Laser Transduction Works",
    [
        ("1", "Polycarbonate Disc with Pits & Lands", "Audio data is pressed as a spiral track of microscopic depressions ('pits') and flat reflective surfaces ('lands') coated with vaporised aluminium and protective lacquer."),
        ("2", "Semiconductor Laser Pickup (780 nm)", "An infrared semiconductor laser diode projects a focused 780 nm beam through the clear polycarbonate underside onto the aluminium layer."),
        ("3", "Destructive Phase Cancellation", "Pits are exactly 1/4 the laser's wavelength deep (~0.11 µm). Light reflecting from a pit cancels out light from the land, dropping reflected intensity detected by a photodiode."),
        ("4", "CIRC Error Correction & DAC", "Cross-Interleaved Reed-Solomon Code (CIRC) reconstructs up to 4,000 consecutive missing bits (scratches); the digital bitstream feeds a DAC to output analogue audio.")
    ]
))

# SLIDE 5: MP3 & MODERN STREAMING
slides_list.append(make_slide(
    5, 6, "Format 04 &bull; Perceptual Digital", "MP3 &amp; Streaming: <span>Psychoacoustics &amp; LUFS Targets</span>",
    "MP3 (1993) shrunk CD files by 90% using psychoacoustic masking to discard sounds human ears cannot perceive. Today, platforms like Spotify and Apple Music stream AAC and Ogg Vorbis while enforcing LUFS loudness normalisation.",
    "The MP3 Reference Benchmark", "Suzanne Vega", '"Tom\'s Diner" (1987 A Cappella &bull; The Mother of the MP3)', "FLP6QluMlrg",
    "Ear-Training Diagnostic: Low-Bitrate Lossy Compression Artifacts",
    "Listen to Suzanne Vega's isolated vocal: during algorithm development at Fraunhofer IIS, subtle breathing, vocal fry, and dental sibilance ('t', 's', 'k') exposed flaws in early MP3 encoders, causing harsh fluttering distortions.",
    "Ear-training tests for lossy compression: (1) Metallic, watery 'swishing' on cymbals and high-hats, (2) Pre-echo: a faint 'ghost' transient audible milliseconds before sharp drum hits, (3) Steep low-pass filter cutting off frequencies above 16 kHz (128 kbps), and (4) Loss of stereo depth.",
    ["MPEG-1 Layer III", "Psychoacoustic Masking", "Temporal Masking", "-14 LUFS Spotify", "-1 dBFS True Peak"],
    "WAV vs MP3 Data Architecture",
    "/images/music_formats/wav_vs_mp3_diagram.svg", "WAV vs MP3 Compression Diagram",
    "📱 MP3 &amp; Streaming Audio (1993–Present)", "Sub-Band MDCT &bull; Psychoacoustic Masking &bull; -14 LUFS Integrated Normalisation",
    "From Fraunhofer Lab to Global Cloud Streaming",
    "Uncompressed CD audio requires ~10 MB of data per minute (1,411 kbps). The Fraunhofer Society engineered MP3 using human hearing biology: if the brain can't hear a sound, don't store it! Today, Spotify (Ogg Vorbis 320k) and Apple Music (AAC 256k / ALAC Lossless) dominate global listening.",
    "Streaming platforms also ended the 'Loudness Wars' by applying ITU-R BS.1770 / EBU R128 loudness normalisation (Spotify -14 LUFS, Apple -16 LUFS), penalising over-compressed squashed masters by turning them down automatically.",
    "How Psychoacoustic Masking & Streaming Work",
    [
        ("1", "Simultaneous Frequency Masking", "A loud sound at 1 kHz physically excites the basilar membrane in the inner ear, rendering quieter adjacent frequencies (e.g., at 1.1 kHz) completely imperceptible."),
        ("2", "Temporal Masking (Pre- & Post-Masking)", "A loud snare transient temporarily deafens human hearing for ~5 ms before the hit (pre-masking) and up to 100 ms after (post-masking); quiet sounds within this window are discarded."),
        ("3", "Sub-Band MDCT Filtering", "Audio is split into 32 frequency sub-bands using Modified Discrete Cosine Transform (MDCT); quantization bits are allocated strictly to audible frequency bands."),
        ("4", "Streaming Normalisation & True Peak (-1.0 dBFS)", "Spotify normalizes to -14 LUFS; mastering engineers leave -1.0 dBFS True Peak headroom to prevent inter-sample clipping during lossy codec reconstruction.")
    ]
))

# SLIDE 6: MASTER SPECIFICATION MATRIX & EXAM TRAPS
table_rows = [
    ("Vinyl Disc (33⅓ & 45)", "Mechanical diamond stylus / PVC / RIAA phono pre-emphasis & de-emphasis", "20 Hz – 20,000 Hz", "~55–65 dB", "RIAA EQ curve needed, inner-groove distortion, wow & flutter, dust clicks, physical stylus wear."),
    ("Compact Cassette", "Magnetic induction / 0.15\" tape at 1⅞ ips / Type I/II/IV / Dolby B/C NR", "30 Hz – 16,000 Hz (Type II)", "~50–65 dB (w/ Dolby)", "High tape hiss without Dolby B/C, head azimuth misalignment muffles treble, wow & flutter."),
    ("Compact Disc (CD)", "Optical 780 nm infrared laser / reflective pits & lands / 16-bit 44.1 kHz PCM", "20 Hz – 20,000 Hz (flat)", "~96 dB (16-bit)", "Red Book standard; zero surface noise or wow/flutter, CIRC error correction for scratches."),
    ("MP3 & Streaming", "Perceptual psychoacoustic coding / MDCT / LUFS loudness normalisation", "20 Hz – 16 kHz (128k) / 20k (320k)", "Up to 96 dB (perceived)", "Auditory masking, metallic cymbal swishing, pre-echo transients, squashed masters turned down by LUFS.")
]

exam_traps = [
    ("1", "Sample Rate vs Bit Depth Confusion", "Sample Rate controls frequency bandwidth (Nyquist limit fs >= 2fmax). Bit Depth controls dynamic range and quantization noise floor (6.02 x N dB). Do not mix these up!"),
    ("2", "RIAA Equalisation Direction", "Remember RIAA applies BOTH on cutting (bass cut, treble boost) AND on playback in the phono preamp (bass boost, treble cut to restore flat frequency balance and cut hiss)."),
    ("3", "Dolby B vs Dolby C Companding", "Dolby B provides ~10 dB of high-frequency noise reduction; Dolby C provides ~20 dB. Both boost highs on record and cut highs equally on playback."),
    ("4", "Lossy vs Lossless Distinction", "MP3 and AAC are LOSSY (perceptual data is permanently discarded). WAV, AIFF, and FLAC are LOSSLESS (every single sample bit is preserved perfectly)."),
    ("5", "Loudness Normalisation Penalty", "Streaming platforms measure Integrated LUFS. Mastering a track louder than -14 LUFS does NOT make it louder on Spotify—it gets turned down, losing punch.")
]

slides_list.append(make_table_slide(
    6, 6, "Component 3 Specification Matrix", "The 4 Core Consumable Formats: <span>Master Matrix</span>",
    "The complete Edexcel Component 3 comparative reference for the 4 syllabus formats: physical mediums, frequency bandwidths, dynamic ranges, and signature exam pitfalls.",
    "Evolution of Sound Distribution", "Recording Industry Retrospective", "From Vinyl Grooves to Cloud Streams &bull; A-Level Exam Master Review", "D3XB3owN6qo",
    "Ear-Training Diagnostic: Identifying Artifacts in Context 3 Exams",
    "In Section A and B of Component 3, you may be presented with recordings and asked to identify the medium or audio flaw. Train your ears for: (1) Surface ticks & RIAA warmth = Vinyl, (2) Tape hiss & soft saturation = Cassette, (3) Inky black silence & sharp transients = Compact Disc, (4) Watery swishing & pre-echo = Low-bitrate MP3.",
    "Use the Master Matrix table on the right to memorize exact bandwidths, dynamic ranges, and engineering terminology required by examiners.",
    ["Component 3 Matrix", "Exam Pitfalls", "LUFS Target", "RIAA Curve", "Nyquist Theorem"],
    "The Format Specification Matrix",
    "/images/music_formats/comparison_cd_cassette_streaming.svg", "Formats Comparison Diagram",
    "🏆 The Master Specification Matrix", "4 Consumable Formats &bull; Transduction Physics &bull; Dynamic Range &bull; Exam Traps",
    "Edexcel Component 3 Examination Essentials",
    "When answering questions on storage formats, always use technical terminology: 'Polyvinyl chloride', 'RIAA pre-emphasis/de-emphasis', 'Semiconductor laser photodiode phase cancellation', 'Type II Chromium dioxide', 'Psychoacoustic frequency and temporal masking', and 'ITU-R BS.1770 LUFS normalisation'.",
    "Examiners frequently test your ability to explain WHY a technology was developed: e.g., why vinyl replaced shellac (longer playing time, quieter surface, lighter tracking), why RIAA was necessary (preventing physical groove overlap), or why MP3 compression was created (internet bandwidth limitations).",
    table_rows, exam_traps
))

# Compile full HTML
all_slides_html = "\n".join(slides_list)
final_output = HTML_TEMPLATE.replace("{SLIDES_HTML}", all_slides_html)

output_path = "public/interactive-slide-music-formats.html"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(final_output)

print(f"Generated {output_path} ({len(final_output)} bytes) with 6 streamlined split-screen slides!")
