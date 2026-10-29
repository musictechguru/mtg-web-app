#!/usr/bin/env python3
"""
apply_screen_fit_and_fullscreen_exit.py
Applies universal screen-fitting layout and full-screen enter/exit controls across ALL interactive slide decks.
Ensures:
1. Fullscreen toggle button in bottom nav bar and top bar
2. Floating "✕ Exit Fullscreen" button (visible in fullscreen mode)
3. "← Exit Deck" button in top bar linking back to Component 3 Hub / lesson
4. Screen-fitting CSS so all content fits on the screen without viewport scrolling
5. Full keyboard support: 'F' toggles fullscreen, 'Esc' exits fullscreen
"""

import glob
import re
import os

SCREEN_FIT_CSS = """
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
"""

FLOATING_EXIT_HTML = """
  <button id="floatingExitFsBtn" class="floating-exit-fs" onclick="toggleFullscreen()" title="Exit Fullscreen (Esc)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    <span>Exit Fullscreen</span>
  </button>
"""

FULLSCREEN_JS = """
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
"""

def make_topbar(topic_title):
    return f"""
  <header class="deck-topbar-controls">
    <div style="display: flex; align-items: center; gap: 8px;">
      <a href="javascript:void(0)" onclick="exitDeck()" class="exit-deck-link" title="Exit presentation and return to website">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5m7 7l-7-7 7-7"/></svg>
        <span>Exit Deck</span>
      </a>
      <span style="color: rgba(255,255,255,0.2);">|</span>
      <span style="color: #94a3b8; font-size: 11.5px; font-weight: 600;">Component 3 &bull; {topic_title}</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <button class="nav-btn" id="topFsBtn" onclick="toggleFullscreen()" title="Toggle Fullscreen (F)" style="padding: 3px 8px; font-size: 11px; display: inline-flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; border-radius: 6px; cursor: pointer;">
        <svg class="fs-icon-enter" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        <svg class="fs-icon-exit" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:none;"><path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M10 4v6m0 0H4m6 0L3 3m10 7h6m-6 0V4m0 6l7-7"/></svg>
        <span class="fs-label">Fullscreen</span>
      </button>
    </div>
  </header>
"""

FS_NAV_BUTTON = """
      <button class="nav-btn" id="bottomFsBtn" onclick="toggleFullscreen()" title="Toggle Fullscreen (F)" style="margin-right: 8px; display: inline-flex; align-items: center; gap: 6px;">
        <svg class="fs-icon-enter" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        <svg class="fs-icon-exit" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:none;"><path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M10 4v6m0 0H4m6 0L3 3m10 7h6m-6 0V4m0 6l7-7"/></svg>
        <span class="fs-label-bottom">Fullscreen</span>
      </button>
"""

def get_deck_title(file_path):
    name = os.path.basename(file_path).replace('interactive-slide-', '').replace('.html', '').replace('-', ' ').title()
    return name

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    topic = get_deck_title(file_path)

    # Clean old injections if present
    content = re.sub(r'/\*\s*Universal Screen-Fitting[\s\S]*?\*/[\s\S]*?(?=\.progress-bar-container|\.image-modal|</style>)', '', content)
    content = re.sub(r'<header class="deck-topbar-controls">[\s\S]*?</header>', '', content)
    content = re.sub(r'<button id="floatingExitFsBtn"[\s\S]*?</button>', '', content)
    content = re.sub(r'//\s*Universal Fullscreen & Exit Management[\s\S]*?toggleFullscreen\(\);\s*\}\s*\}\);\s*', '', content)
    content = re.sub(r'<button class="nav-btn"[^>]*id="bottomFsBtn"[\s\S]*?</button>', '', content)

    # 1. Add CSS before </style>
    if '</style>' in content:
        content = content.replace('</style>', SCREEN_FIT_CSS + '\n</style>', 1)

    # 2. Add Topbar & Floating Exit Button after <body>
    topbar_html = make_topbar(topic) + '\n' + FLOATING_EXIT_HTML
    if '<body>' in content:
        content = content.replace('<body>', '<body>\n' + topbar_html, 1)

    # 3. Add Fullscreen Button in nav bar
    if 'id="nextBtn"' in content:
        content = content.replace('id="nextBtn"', 'id="nextBtn"', 1)
        # Inject before nextBtn
        content = re.sub(r'(<button[^>]+id="nextBtn")', FS_NAV_BUTTON + r'\1', content, count=1)
    elif 'class="nav-btn primary"' in content:
        content = re.sub(r'(<button[^>]+class="nav-btn primary")', FS_NAV_BUTTON + r'\1', content, count=1)

    # 4. Add JS before last </script>
    last_script = content.rfind('</script>')
    if last_script != -1:
        content = content[:last_script] + FULLSCREEN_JS + '\n  ' + content[last_script:]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_path}")

def main():
    decks = sorted(glob.glob('public/interactive-slide-*.html'))
    print(f"Applying Screen Fit & Fullscreen Controls to {len(decks)} decks...")
    for d in decks:
        process_file(d)
    print("All decks successfully updated!")

if __name__ == '__main__':
    main()
