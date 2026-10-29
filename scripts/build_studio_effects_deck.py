#!/usr/bin/env python3
"""
build_studio_effects_deck.py
Generates public/interactive-slide-studio-effects.html
Split-screen presentation deck for the 5 Edexcel Component 3 Studio Effects:
1. Overview & Spatial/Modulation Routing Matrix
2. Delay & Echo (Tape, BBD, Slapback, Dotted 8th)
3. Reverb Effects (Chambers, Springs, Plates, Digital, Gated)
4. Chorus Effect (BBD, LFO Pitch Modulation, Stereo Width)
5. Phaser Effect (All-Pass Filters, Phase Notches, MXR Phase 90)
6. Flanger Effect (Short Delay, Comb Filtering, Tape Flange)
7. Master Specification Matrix & Top 5 Exam Traps
"""

import os

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>Studio Effects in Context: Delay, Reverb, Chorus, Phaser &amp; Flanger | Edexcel Component 3</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #080e1a;
      --panel-bg: #0f172a;
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-music: #818cf8;
      --accent-music-glow: rgba(129, 140, 248, 0.25);
      --accent-effect: #38bdf8;
      --accent-effect-glow: rgba(56, 189, 248, 0.25);
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
      background: rgba(129, 140, 248, 0.12);
      border: 1px solid rgba(129, 140, 248, 0.3);
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
      color: var(--accent-effect);
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
      border-top: 4px solid var(--accent-effect);
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
      background: rgba(129, 140, 248, 0.15);
      color: var(--accent-music);
      border: 1px solid rgba(129, 140, 248, 0.35);
    }

    .format-badge {
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent-effect);
      border: 1px solid rgba(56, 189, 248, 0.35);
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
      background: rgba(129, 140, 248, 0.05);
      border: 1px solid rgba(129, 140, 248, 0.2);
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
      color: var(--accent-effect);
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
      background: rgba(56, 189, 248, 0.05);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 10px;
      padding: 14px;
    }

    .mech-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--accent-effect);
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
      background: var(--accent-effect);
      color: #030712;
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
      background: rgba(56, 189, 248, 0.15);
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
      background: var(--accent-effect);
      border-color: var(--accent-effect);
      color: #030712;
    }

    .nav-btn.primary:hover:not(:disabled) {
      background: #0284c7;
      color: #fff;
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
      background: linear-gradient(90deg, var(--accent-music), var(--accent-effect));
      width: 14.28%;
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


    /* Universal Screen-Fitting & Fullscreen Controls */
    html, body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }

    body {
      display: flex !important;
      flex-direction: column !important;
      height: 100vh !important;
      max-height: 100vh !important;
      box-sizing: border-box !important;
    }

    /* Top utility bar with Exit Deck and Fullscreen */
    .deck-topbar-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 16px;
      background: rgba(8, 14, 26, 0.85);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 11.5px;
      z-index: 90;
      flex-shrink: 0;
      height: 36px;
      box-sizing: border-box;
    }

    .exit-deck-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #94a3b8;
      text-decoration: none;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .exit-deck-link:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }

    .floating-exit-fs {
      display: none;
      position: fixed;
      top: 10px;
      right: 14px;
      z-index: 100000;
      background: rgba(239, 68, 68, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #ffffff;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
      transition: all 0.2s ease;
    }
    .floating-exit-fs:hover {
      background: #dc2626;
      transform: scale(1.05);
    }
    :fullscreen .floating-exit-fs,
    :-webkit-full-screen .floating-exit-fs,
    .is-fullscreen .floating-exit-fs {
      display: inline-flex !important;
    }

    /* Screen-fitting adjustments for Split-Screen Decks */
    .deck-container {
      max-width: 1560px !important;
      margin: 0 auto !important;
      padding: 6px 16px 0 !important;
      width: 100% !important;
      flex: 1 !important;
      min-height: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }

    .slide {
      height: 100% !important;
      min-height: 0 !important;
      box-sizing: border-box !important;
    }
    .slide.active {
      display: flex !important;
      flex-direction: column !important;
    }

    .slide-header {
      margin-bottom: 6px !important;
      padding-bottom: 4px !important;
      flex-shrink: 0 !important;
    }
    .deck-tag {
      margin-bottom: 2px !important;
      padding: 2px 8px !important;
      font-size: 10px !important;
    }
    .slide-heading {
      font-size: clamp(17px, 1.8vw, 22px) !important;
      margin-bottom: 2px !important;
      line-height: 1.15 !important;
    }
    .slide-lead {
      font-size: 12px !important;
      line-height: 1.35 !important;
      margin-bottom: 0 !important;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .grid-2-split {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 12px !important;
      flex: 1 !important;
      min-height: 0 !important;
      margin-bottom: 54px !important;
      overflow: hidden !important;
    }

    .column-panel {
      padding: 10px 12px !important;
      display: flex !important;
      flex-direction: column !important;
      overflow-y: auto !important;
      min-height: 0 !important;
      max-height: 100% !important;
      box-sizing: border-box !important;
    }

    .column-panel::-webkit-scrollbar {
      width: 4px;
    }
    .column-panel::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
    }
    .column-panel::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }

    .panel-header {
      margin-bottom: 6px !important;
      padding-bottom: 4px !important;
      flex-shrink: 0 !important;
    }
    .video-container {
      margin-bottom: 6px !important;
      flex-shrink: 0 !important;
    }
    .track-meta {
      padding: 6px 10px !important;
      margin-bottom: 6px !important;
      font-size: 12px !important;
      flex-shrink: 0 !important;
    }
    .ear-training-box {
      padding: 8px 10px !important;
      margin-bottom: 6px !important;
      font-size: 11.5px !important;
      line-height: 1.4 !important;
    }
    .hardware-photo, .instrument-photo-card {
      height: clamp(110px, 14vh, 150px) !important;
      margin-bottom: 6px !important;
      flex-shrink: 0 !important;
    }
    .hardware-hero-card {
      padding: 6px 10px !important;
      margin-bottom: 6px !important;
      font-size: 12px !important;
      flex-shrink: 0 !important;
    }
    .history-card {
      padding: 6px 10px !important;
      margin-bottom: 6px !important;
      font-size: 11.5px !important;
      line-height: 1.35 !important;
    }
    .mech-chain {
      padding: 6px 10px !important;
      font-size: 11.5px !important;
    }
    .step-item {
      gap: 6px !important;
      margin-bottom: 3px !important;
      font-size: 11px !important;
    }
    .table-container {
      overflow-y: auto !important;
      flex: 1 !important;
      margin-top: 6px !important;
    }

    .deck-nav-bar, .bottom-bar {
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 48px !important;
      background: rgba(8, 14, 26, 0.96) !important;
      backdrop-filter: blur(12px) !important;
      border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
      padding: 6px 16px !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      z-index: 100 !important;
      box-sizing: border-box !important;
    }
    .progress-bar-container {
      position: fixed !important;
      bottom: 48px !important;
      left: 0 !important;
      right: 0 !important;
      height: 3px !important;
      z-index: 101 !important;
    }

</style>
</head>
<body>

  <header class="deck-topbar-controls">
    <div style="display: flex; align-items: center; gap: 8px;">
      <a href="javascript:void(0)" onclick="exitDeck()" class="exit-deck-link" title="Exit presentation and return to website">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5m7 7l-7-7 7-7"/></svg>
        <span>Exit Deck</span>
      </a>
      <span style="color: rgba(255,255,255,0.2);">|</span>
      <span style="color: #94a3b8; font-size: 11.5px; font-weight: 600;">Component 3 &bull; Studio_Effects</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <button class="nav-btn" id="topFsBtn" onclick="toggleFullscreen()" title="Toggle Fullscreen (F)" style="padding: 3px 8px; font-size: 11px; display: inline-flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; border-radius: 6px; cursor: pointer;">
        <svg class="fs-icon-enter" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        <svg class="fs-icon-exit" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:none;"><path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M10 4v6m0 0H4m6 0L3 3m10 7h6m-6 0V4m0 6l7-7"/></svg>
        <span class="fs-label">Fullscreen</span>
      </button>
    </div>
  </header>


  <button id="floatingExitFsBtn" class="floating-exit-fs" onclick="toggleFullscreen()" title="Exit Fullscreen (Esc)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    <span>Exit Fullscreen</span>
  </button>


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
      <span class="slide-counter" id="slideCounter">01 / 07</span>
    </div>

    <div class="nav-center">
      <select class="slide-select" id="slideSelect" onchange="jumpToSlide(parseInt(this.value))">
        <option value="1">1. Effects Overview &amp; Routing (Inserts vs Aux)</option>
        <option value="2">2. Delay &amp; Echo (Tape, BBD &amp; Dotted 8th)</option>
        <option value="3">3. Reverb Effects (Chambers, Plates, Gated &amp; Lexicon)</option>
        <option value="4">4. Chorus Effect (BBD LFO Modulation &amp; Stereo Width)</option>
        <option value="5">5. Phaser Effect (All-Pass Filters &amp; Sweeping Notches)</option>
        <option value="6">6. Flanger Effect (Short Delay, Comb Filtering &amp; Jet Sweeps)</option>
        <option value="7">7. Master Specification Matrix &amp; Exam Traps</option>
      </select>
    </div>

    <div class="nav-right">
      
      <button class="nav-btn" id="bottomFsBtn" onclick="toggleFullscreen()" title="Toggle Fullscreen (F)" style="margin-right: 8px; display: inline-flex; align-items: center; gap: 6px;">
        <svg class="fs-icon-enter" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        <svg class="fs-icon-exit" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:none;"><path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M10 4v6m0 0H4m6 0L3 3m10 7h6m-6 0V4m0 6l7-7"/></svg>
        <span class="fs-label-bottom">Fullscreen</span>
      </button>
<button class="nav-btn primary" id="nextBtn" onclick="nextSlide()">
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  </div>

  <script>
    let currentSlide = 1;
    const totalSlides = 7;

    const slugMap = {
      'overview': 1,
      'routing': 1,
      'delay': 2,
      'echo': 2,
      'reverb': 3,
      'chorus': 4,
      'phaser': 5,
      'phase': 5,
      'flanger': 6,
      'flange': 6,
      'matrix': 7,
      'traps': 7
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

    // Hash & URL query routing
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

  
    // Universal Fullscreen & Exit Management
    function toggleFullscreen() {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const el = document.documentElement;
        if (el.requestFullscreen) {
          el.requestFullscreen().catch(() => {});
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }

    function exitDeck() {
      if (window.opener) {
        window.close();
      } else if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/';
      }
    }

    function updateFullscreenUI() {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      document.documentElement.classList.toggle('is-fullscreen', isFs);
      document.querySelectorAll('.fs-icon-enter').forEach(el => el.style.display = isFs ? 'none' : 'inline-block');
      document.querySelectorAll('.fs-icon-exit').forEach(el => el.style.display = isFs ? 'inline-block' : 'none');
      document.querySelectorAll('.fs-label, .fs-label-bottom').forEach(el => el.textContent = isFs ? 'Exit Fullscreen' : 'Fullscreen');
      const floatBtn = document.getElementById('floatingExitFsBtn');
      if (floatBtn) floatBtn.style.display = isFs ? 'inline-flex' : 'none';
    }

    document.addEventListener('fullscreenchange', updateFullscreenUI);
    document.addEventListener('webkitfullscreenchange', updateFullscreenUI);

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
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

        <!-- RIGHT: EFFECT ARCHITECTURE & TRANSDUCTION -->
        <div class="column-panel format-col">
          <div class="panel-header">
            <span class="panel-badge format-badge">Architecture &amp; Physics</span>
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
    for col_format, col_delay, col_trans, col_notches, col_flaws in table_rows:
        rows_html += f"""
        <tr>
          <td><strong>{col_format}</strong></td>
          <td><code>{col_delay}</code></td>
          <td>{col_trans}</td>
          <td>{col_notches}</td>
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
            <span class="panel-badge music-badge">Comparative Listening</span>
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
            <div class="track-album">A-Level Component 3 Audio Recognition Guide</div>
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
                  <th>Effect</th>
                  <th>Delay Time</th>
                  <th>Circuit Method</th>
                  <th>Notch Spacing</th>
                  <th>Common Routing &amp; Exam Key</th>
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

# SLIDE 1: OVERVIEW & ROUTING
slides_list.append(make_slide(
    1, 7, "Component 3 Overview", "Studio Effects: <span>Time-Based vs. Modulation Processing</span>",
    "Studio effects shape space, depth, timbre, and motion. In Component 3, effects are divided into Time-Based (Delay, Reverb) routed via Aux Sends, and Modulation (Chorus, Phaser, Flanger) routed as Serial Inserts.",
    "Modulation & Time Effects Compared", "Audio Engineering Demonstration", "Phaser vs. Flanger vs. Chorus vs. Vibrato Explained", "z9tg5ELAW7o",
    "Ear-Training Diagnostic: The Micro-Time Continuum",
    "Understand the delay time spectrum: <strong style='color:#fff;'>Phase shifting</strong> uses no audible delay (0ms) but phase-shifts all-pass filters; <strong style='color:#fff;'>Flanging</strong> uses ultra-short 1-15ms delays creating harmonically related comb notches; <strong style='color:#fff;'>Chorus</strong> uses 15-35ms delays with LFO pitch detuning; and <strong style='color:#fff;'>Echo/Delay</strong> uses 50ms to 1000ms+ for distinct rhythmic repeats.",
    "Notice how reverb is simply thousands of micro-delays reflecting so densely that individual echoes blur into a continuous acoustic decay tail.",
    ["Aux Send / Return", "Serial Insert", "Wet/Dry Balance", "Comb Filtering", "Time Spectrum"],
    "Studio Signal Routing Architecture",
    "/images/svg/delay_types_timeline.svg", "Delay & Modulation Timeline Diagram",
    "🎛️ The 5 Core Studio Effects", "Inserts (Phaser / Flanger) vs. Parallel Aux Sends (Delay / Reverb)",
    "Insert Processing vs. Auxiliary Send/Return Routing",
    "In the exam, examiners test your understanding of signal routing: (1) <strong style='color:#fff;'>Insert Routing:</strong> 100% of the channel audio passes directly through the processor (ideal for Phasers, Flangers, EQs, and Compressors to alter the entire timbre).",
    "(2) <strong style='color:#fff;'>Aux Send / Return (Parallel):</strong> A portion of the dry signal is tapped off via an auxiliary send knob and sent to a shared effects bus (ideal for Reverb and Delay, keeping the original dry track punchy and uncolored).",
    "The 4 Primary Time & Modulation Domains",
    [
        ("1", "Phase Inversion & All-Pass (<1 ms)", "Phase cancellations created by active RC filter stages without time delay; generates sweeping non-harmonic notches."),
        ("2", "Flanger Comb Filtering (1–15 ms)", "Ultra-short delay line summed with dry signal creates deep harmonically spaced comb notches; LFO sweep produces jet whoosh."),
        ("3", "Chorus Pitch Detuning (15–35 ms)", "Moderate delay line modulated by an LFO causes micro pitch-shifting (Doppler effect), simulating multiple performers."),
        ("4", "Discrete Delay & Reverb (50 ms – 3000 ms+)", "Distinct discrete audible repetitions (Echo/Slapback) or infinite diffuse reflections simulating physical room acoustic decay.")
    ]
))

# SLIDE 2: DELAY & ECHO
slides_list.append(make_slide(
    2, 7, "Time-Based Processing", "Delay &amp; Echo: <span>Tape Loops, BBD &amp; Dotted 8ths</span>",
    "Delay captures an audio signal and reproduces it after a set duration. From Sam Phillips' 1950s tape slapback to The Edge's tempo-synced dotted eighth notes, delay defines rhythmic drive and spatial depth.",
    "The Masterclass in Dotted Eighth Delay", "U2 (The Edge)", '"Where The Streets Have No Name" (1987 &bull; Korg SDD-3000)', "GzZWSrr5wFI",
    "Ear-Training Diagnostic: Rhythmic Subdivision & Stereo Bouncing",
    "Listen to The Edge's iconic chiming Stratocaster riff: he plays straight eighth notes, but the delay unit generates a dotted-eighth repeat (3/16 note, approx 360ms at 125 BPM) mixed equally with the dry signal, creating a cascading sixteenth-note continuous rhythmic gallop.",
    "Notice the tone of the repeats: analog BBD and tape delay units roll off high frequencies with each successive repeat (damping), preventing the echoes from cluttering the lead vocal or rhythm section.",
    ["Tape Slapback", "Dotted 8th Note", "Feedback Loop", "Analog BBD", "Ping-Pong Delay"],
    "Delay Signal Architecture",
    "/images/svg/dotted_eighth_note_delay.svg", "Dotted Eighth Note Delay Rhythm Diagram",
    "🔁 Delay &amp; Echo Technologies (1950s–Present)", "Tape Loop (Space Echo) &bull; Analog BBD &bull; Digital Tempo-Sync Multi-Tap",
    "From Reel-to-Reel Tape to Digital Rhythmic Subdivision",
    "Early delay was purely electro-mechanical: tape echo units (Watkins Copicat, Roland RE-201 Space Echo, Maestro Echoplex) ran a continuous loop of magnetic tape past multiple playback heads. Motor speed governed delay time, while wow & flutter introduced warm organic modulation.",
    "In the 1970s, Bucket Brigade Device (BBD) analog chips eliminated moving mechanical tape, passing electrical charges across capacitor buckets. In the 1980s, digital delays (Korg SDD-3000, TC Electronic 2290) allowed millisecond-accurate tempo synchronization.",
    "Key Delay Parameters & Formulas (Exam Essential)",
    [
        ("1", "Delay Time & Tempo Sync Formula", "Duration between dry sound and repeat. Dotted-eighth formula: (60,000 / BPM) x 0.75 ms. At 120 BPM, quarter = 500ms; dotted eighth = 375ms."),
        ("2", "Feedback (Regeneration)", "Routes a percentage of the output back into the delay line. 0% = single slapback repeat; 50% = 4-5 repeats; 100%+ = runaway analog self-oscillation."),
        ("3", "High-Frequency Damping", "A low-pass filter inside the feedback loop attenuates treble on each successive repeat, mimicking natural acoustic reflection dissipation in air."),
        ("4", "Ping-Pong & Multi-Tap Panning", "Alternates echoes hard left and hard right across the stereo field, providing massive spatial width without masking the center mono vocal.")
    ]
))

# SLIDE 3: REVERB EFFECTS
slides_list.append(make_slide(
    3, 7, "Acoustic & Digital Space", "Reverb Effects: <span>Chambers, Plates &amp; Gated Snare</span>",
    "Reverberation simulates acoustic boundary reflections. Spanning natural basement chambers, 600lb EMT 140 steel plates, Fender tube springs, Lexicon digital algorithms, and Phil Collins' explosive 1980s gated snare.",
    "The Defining Gated Reverb Drum Sound", "Phil Collins", '"In The Air Tonight" (1981 &bull; Townhouse Stone Room &amp; SSL)', "YkADj0TPrJA",
    "Ear-Training Diagnostic: Gated Decay vs. Natural RT60 Decay",
    "Listen to Phil Collins' legendary drum fill at 3:41: the snare and toms explode into a massive, cavernous stone room ambient tail that is violently and unnaturally chopped off into dead silence by an SSL noise gate.",
    "In contrast, listen to natural acoustic chamber or plate reverb: early reflections arrive within 5-30ms, followed by a dense, smooth exponential decay that fades linearly over several seconds according to its RT60 time.",
    ["RT60 Decay Time", "EMT 140 Plate", "Gated Reverb", "Pre-Delay Gap", "Convolution IR"],
    "Reverb Physical Mechanics",
    "/images/svg/reverb_plate_spring_diagram.svg", "Reverb Plate and Spring Transducer Diagram",
    "🏛️ The 5 Reverb Generations", "Acoustic Chamber &bull; EMT 140 Plate &bull; Spring &bull; Lexicon Algorithmic &bull; Convolution IR",
    "The Evolution of Artificial Reverberation",
    "Before digital processors, studios used dedicated physical spaces: acoustic echo chambers (tiled basement rooms with a speaker and mic). In 1957, EMT introduced the EMT 140 Plate Reverb—a 1x2 meter cold-rolled steel sheet suspended on springs, vibrating via an electromagnetic driver.",
    "Fender pioneered built-in spring reverb tanks in guitar amps (Twin Reverb). In 1978, Lexicon 224 and EMT 250 introduced microprocessor-based algorithmic digital reverb. Today, convolution reverb captures real physical acoustics using Impulse Responses (IRs).",
    "Key Reverb Parameters & Engineering (Exam Essential)",
    [
        ("1", "RT60 (Reverberation Time 60 dB)", "The time in seconds required for sound pressure reflections to decay by 60 dB below the direct sound. Small room = 0.5s; Concert Hall = 2.0s–3.0s."),
        ("2", "Pre-Delay (The Distance Offset)", "The gap in milliseconds (10–60ms) between the dry sound and the onset of early reflections. Preserves upfront vocal presence and clarity before wash begins."),
        ("3", "Diffusion & High-Frequency Damping", "Diffusion controls reflection density; damping filters out high frequencies faster, simulating soft furnishing and human air absorption."),
        ("4", "Gated Reverb Signal Chain", "Snare Drum &rarr; Massive Non-Linear Chamber/Plate &rarr; Aggressive VCA Compressor &rarr; Noise Gate with Fast Release (Hold ~200ms, Release 10ms).")
    ]
))

# SLIDE 4: CHORUS EFFECT
slides_list.append(make_slide(
    4, 7, "Modulation Processing", "Chorus Effect: <span>BBD Micro-Delay &amp; Stereo Width</span>",
    "By splitting the signal, delaying one path by 15–35ms, and constantly modulating its pitch with an LFO, chorus simulates the natural pitch and timing discrepancies of multiple instruments playing in unison.",
    "The Lush Watery Grunge Guitar Tone", "Nirvana (Kurt Cobain)", '"Come As You Are" (Nevermind &bull; 1991 &bull; Butch Vig)', "vabnZ9-ex7o",
    "Ear-Training Diagnostic: Pitch Detuning & Dimensional Movement",
    "Listen to Kurt Cobain's opening D-string guitar riff: recorded with an Electro-Harmonix Small Clone analog chorus pedal, the guitar sounds submerged, watery, and lush. The pitch continually wobbles subtly sharp and flat.",
    "Listen to the stereo width: in dual-voice and stereo chorus units (like the Roland Dimension D or JC-120), the dry signal is sent to one channel and the pitch-vibrato signal to the opposite channel, expanding the stereo field far beyond the physical speakers.",
    ["Analog BBD", "15–35ms Delay", "LFO Modulation", "Roland Dimension D", "Pitch Detuning"],
    "Chorus Architecture & Circuitry",
    "/images/svg/modulation_chorus.svg", "Chorus Modulation Signal Flow",
    "🌊 Analog BBD Chorus Circuits (1975–Present)", "Bucket Brigade Device &bull; Low-Frequency Oscillator (LFO) &bull; Pitch Detuning",
    "From Unison Vocal Doubling to Synth Staple",
    "Vocalists singing in unison never sing at the exact same pitch or millisecond; their slight micro-variations create acoustic beating and richness. Chorus pedals were invented to replicate this electronically using analog BBD delay chips (MN3007).",
    "Roland integrated this into the JC-120 amplifier (1975), the CE-1 pedal (1976), and the legendary Juno-6/60/106 synthesizers, turning thin single-oscillator analog voices into massive, cinematic polyphonic stereo pads.",
    "How Chorus Transduction Works (Exam Essential)",
    [
        ("1", "The 15–35 ms Delay Window", "Delay times below 15ms cause comb filtering (flanging); delay times above 35ms produce distinct slapback echoes. 15–35ms is the optimal Haas perceptual doubling zone."),
        ("2", "LFO Frequency Modulation (Doppler Pitch Shift)", "A Low Frequency Oscillator (0.1 Hz – 5 Hz) modulates delay clock speed. As delay shortens, pitch rises sharp; as delay lengthens, pitch drops flat."),
        ("3", "Summing & Acoustic Phase Beating", "Combining the unmodulated dry signal with the pitch-modulated wet signal creates continuous phase interference and rich acoustic chorusing."),
        ("4", "Key Parameters: Rate & Depth", "Rate (Speed) controls LFO cycle frequency in Hertz; Depth (Width) controls the amount of pitch detuning in cents.")
    ]
))

# SLIDE 5: PHASER EFFECT
slides_list.append(make_slide(
    5, 7, "Modulation Processing", "Phaser Effect: <span>All-Pass Filters &amp; Sweeping Notches</span>",
    "Unlike delay-based effects, phasers use non-linear all-pass filter stages to shift the phase of specific frequencies. When blended with the dry signal, they create sweeping non-harmonically spaced notches.",
    "The Brown Sound Swirl & Harmonic Bite", "Van Halen (Eddie Van Halen)", '"Ain\'t Talkin\' \'Bout Love" (1978 &bull; Sunset Sound)', "qtwBFz6lfrY",
    "Ear-Training Diagnostic: Non-Harmonic Sweeping Notches",
    "Listen to Eddie Van Halen's arpeggiated intro riff: before hitting his Marshall Super Lead, his guitar passed through an MXR Phase 90 pedal set to a slow sweep rate. Notice the smooth, warm, liquid 'chewiness' across the frequency spectrum.",
    "Compare this to flanging: a phaser does NOT sound like a metallic jet plane. Because the notches are created by electronic all-pass filters rather than a time delay, the notches are spaced non-harmonically, giving a smoother, vocal-like sweep.",
    ["MXR Phase 90", "All-Pass Filters", "Non-Harmonic Notches", "Phase Cancellation", "LFO Sweep"],
    "Phaser Filter Topology",
    "/images/svg/modulation_phaser.svg", "Phaser All-Pass Filter Diagram",
    "🌀 Active All-Pass Phase Circuits (1970s–Present)", "4-Stage (Phase 90) &bull; 8-Stage (Phase 100) &bull; Sweeping Cancellation Notches",
    "The Engineering of Phase Cancellation Without Delay",
    "The phaser was created in the early 1970s (MXR Phase 90, Electro-Harmonix Small Stone, Maestro PS-1) as an analog solid-state alternative to cumbersome tape flanging. Instead of using expensive, noisy delay chips, engineers used cascaded operational amplifiers configured as all-pass filters.",
    "Each pair of all-pass filter stages introduces a 180° phase inversion at a specific frequency. When the phase-shifted signal is mixed with the original dry signal, complete destructive phase cancellation occurs at that frequency, cutting a deep notch in the frequency spectrum.",
    "How Phaser Filtering Works (Exam Essential)",
    [
        ("1", "All-Pass Filter Stages & Notches", "Each 2 stages create 1 notch: a 4-stage phaser (MXR Phase 90) produces 2 sweeping notches; an 8-stage phaser produces 4 notches; a 12-stage phaser produces 6 notches."),
        ("2", "Non-Harmonic Notch Spacing", "Because phase shift depends on resistance and capacitance values, the notches are spaced logarithmically/non-harmonically, creating a subtle, vocal-like sweep."),
        ("3", "LFO Sweep Modulation", "An LFO modulates variable resistors (JFET transistors or photocells) to sweep the notch center frequencies up and down across the audio spectrum."),
        ("4", "Feedback (Resonance / Color)", "Feeding a portion of the phased signal back to the input deepens the notches and sharpens the resonance peaks, creating an intense, cutting swirl.")
    ]
))

# SLIDE 6: FLANGER EFFECT
slides_list.append(make_slide(
    6, 7, "Modulation Processing", "Flanger Effect: <span>Comb Filtering &amp; Jet Plane Sweeps</span>",
    "Flanging combines an audio signal with an ultra-short delayed duplicate (1–15ms). The interaction produces a dense series of harmonically related comb-filter notches that sweep across the spectrum, creating an iconic jet-plane whoosh.",
    "The Galloping Jet-Plane Comb Filter", "Heart (Nancy Wilson)", '"Barracuda" (Little Queen &bull; 1977 &bull; Mike Flicker)', "PeMvMNpvB5M",
    "Ear-Training Diagnostic: Metallic Comb Notches & Hollow Jet Whoosh",
    "Listen to Nancy Wilson's galloping open-E string chug: notice the pronounced metallic, hollow resonance that whooshes dramatically up and down in synchronisation with the music, mimicking the sound of an aircraft taking off.",
    "Notice the harmonic comb peaks: unlike a phaser's mellow phase shifting, flanging generates dozens of mathematically precise, harmonically related notches that extend from the low-mids all the way to 20 kHz.",
    ["1–15ms Delay", "Harmonic Comb Filter", "Jet-Plane Whoosh", "Tape Flanging", "Negative Feedback"],
    "Flanger Comb Filter Mechanics",
    "/images/svg/modulation_flanger.svg", "Flanger Comb Filter Frequency Curve",
    "✈️ Tape Flanging &amp; Comb Filter DSP (1960s–Present)", "1–15ms BBD Delay &bull; Harmonically Related Peaks/Troughs &bull; Tape Reel Friction",
    "The Physical Origin of 'Flanging' on Tape Decks",
    "Flanging originated in 1960s studios (John Lennon and Ken Townsend at Abbey Road for ADT, and George Chkiantz at Olympic Studios on The Small Faces' 'Itchycoo Park'). An engineer played two identical tape recordings simultaneously on synchronized tape decks.",
    "By gently pressing a thumb against the metal flange (rim) of one tape reel, the friction momentarily slowed down that tape by a few milliseconds. Releasing the thumb allowed it to catch up. The resulting micro-time differential created the legendary sweeping 'jet plane' sound.",
    "How Flanging Comb Filtering Works (Exam Essential)",
    [
        ("1", "The 1–15 ms Micro-Delay Window", "At 1–15ms, the ear cannot perceive the delay as a separate echo. Instead, the delayed wave interferes with the direct wave, causing reinforcement (peaks) and cancellation (troughs)."),
        ("2", "Harmonically Related Comb Notches", "Cancellation occurs at frequencies where delay time equals an odd half-wavelength ($f = \\frac{1}{2\\tau}, \\frac{3}{2\\tau}, \\frac{5}{2\\tau}...$), producing a comb-like linear harmonic series of deep notches."),
        ("3", "LFO Sweep Across Spectrum", "Modulating the delay time from 1ms up to 10ms moves the comb filter notches up and down the frequency spectrum continuously."),
        ("4", "Positive vs. Negative Feedback", "High feedback creates the intense jet resonance. Positive feedback boosts odd harmonics (hollow woody tube); negative feedback inverts the wet signal, creating an eerie, metallic bite.")
    ]
))

# SLIDE 7: MASTER MATRIX & EXAM TRAPS
table_rows = [
    ("Delay & Echo", "50ms to 2000ms+", "Tape loop, analog BBD, digital DSP memory", "Discrete distinct echoes", "Aux Send / Return bus; sync to project BPM (dotted 8th formula)."),
    ("Reverb Effects", "0.5s to 5.0s+ RT60", "Acoustic chamber, steel plate, spring, convolution", "Thousands of diffuse reflections", "Aux Send / Return bus; pre-delay preserves vocal intelligibility."),
    ("Chorus Effect", "15ms to 35ms", "Analog BBD delay line + LFO pitch detuning", "Smooth pitch detuned spread", "Channel Insert or Aux; simulates multiple performers playing in unison."),
    ("Phaser Effect", "0ms (No delay line)", "Cascaded active RC all-pass filter stages", "2, 4, or 6 non-harmonic notches", "Channel Insert; non-harmonic spacing creates warm, vocal-like swirl."),
    ("Flanger Effect", "1ms to 15ms", "Ultra-short BBD delay line + high feedback", "Dense harmonically related comb notches", "Channel Insert; high feedback creates iconic metallic 'jet-plane' whoosh.")
]

exam_traps = [
    ("1", "Phaser vs. Flanger Notch Distinction", "A Flanger uses a micro time-delay (1-15ms) creating HARMONICALLY related comb filter notches. A Phaser uses all-pass filters (NO delay) creating NON-HARMONICALLY spaced notches. Do not confuse them!"),
    ("2", "Pre-Delay Function in Reverb", "Pre-delay does NOT make the reverb decay longer. It delays the ONSET of the reverb tail, allowing the dry vocal/transient to cut through cleanly before the reflections wash over it."),
    ("3", "Insert vs. Aux Routing Principles", "Reverb and Delay belong on parallel Aux Send buses with 100% wet mix so multiple tracks share one room without muddying direct dry signals. Phasers and Flangers belong as channel INSERTS."),
    ("4", "Chorus Time Window (15–35ms)", "Delays shorter than 15ms sound like flanging/filtering. Delays longer than 35ms sound like distinct slapback echo. 15–35ms is the precise sweet spot where the ear perceives doubling."),
    ("5", "Tape Flanging Origin Story", "Flanging was named because engineers physically pressed a finger/thumb onto the FLANGE (outer rim) of a tape supply reel to temporarily delay it by milliseconds relative to a synchronized twin tape deck.")
]

slides_list.append(make_table_slide(
    7, 7, "Master Specification Matrix", "Studio Effects: <span>The Master Exam Matrix</span>",
    "The complete Edexcel Component 3 comparative reference for all 5 studio effects: time ranges, circuit topologies, notch characteristics, and signature exam traps.",
    "Comprehensive Effects Demonstration", "Component 3 Master Review", "Recognizing Studio Effects in Context &bull; Exam Checklist", "z9tg5ELAW7o",
    "Ear-Training Diagnostic: Identifying Effects in Context 3 Exams",
    "In Component 3 listening examinations, you must immediately recognize effects by ear: (1) Discrete rhythmic repeats = Delay, (2) Ambient acoustic decay = Reverb, (3) Shimmering detuned stereo widening = Chorus, (4) Smooth vocal-like non-metallic swirl = Phaser, (5) Aggressive metallic jet-plane hollow comb filter = Flanger.",
    "Use the Master Matrix table on the right to memorize exact delay millisecond boundaries, parameter functions, and technical circuit terminology.",
    ["Component 3 Matrix", "Exam Traps", "All-Pass vs Comb", "Pre-Delay", "Dotted 8th Math"],
    "Studio Effects Comparison Diagram",
    "/images/svg/delay_types_timeline.svg", "Effects Timeline and Hierarchy Diagram",
    "🏆 The Master Specification Matrix", "5 Studio Effects &bull; Time Delays &bull; Circuit Physics &bull; Signal Routing &bull; Exam Traps",
    "Edexcel Component 3 Examination Essentials",
    "When answering questions on studio effects, always use precise technical terminology: 'All-pass filter stages', 'Destructive phase cancellation', 'Harmonically related comb filter series', 'Bucket Brigade Device (BBD)', 'Low Frequency Oscillator (LFO)', 'Pre-delay gap', 'RT60 decay time', and 'Auxiliary send/return parallel routing'.",
    "Common exam questions require calculating delay times from BPM (e.g. 60,000 / BPM = quarter note delay in ms), explaining how pre-delay improves vocal clarity, or describing the physical tape technique that gave flanging its name.",
    table_rows, exam_traps
))

# Compile full HTML
all_slides_html = "\n".join(slides_list)
final_output = HTML_TEMPLATE.replace("{SLIDES_HTML}", all_slides_html)

output_path = "public/interactive-slide-studio-effects.html"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(final_output)

print(f"Generated {output_path} ({len(final_output)} bytes) with 7 split-screen slides!")
