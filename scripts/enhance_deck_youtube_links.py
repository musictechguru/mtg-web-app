"""
Enhances all 16 interactive slide decks in public/ with direct YouTube links:
1. Adds direct 'YouTube ↗' pill links next to every in-deck listening trigger.
2. Enhances the video modal with a header 'Open in YouTube ↗' button and a footer 'Watch Directly on YouTube →' fallback.
3. Updates JavaScript openVideo() to set both external YouTube URLs dynamically.
"""
import glob, re, os

CSS_SNIPPET = """
    /* YouTube direct links & enhanced modal styling */
    .video-btn-row {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 10px;
      flex-wrap: wrap;
    }
    .yt-direct-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      color: #ffffff !important;
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.45);
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
      line-height: 1.2;
    }
    .yt-direct-btn:hover {
      background: rgba(239, 68, 68, 0.4);
      border-color: #ef4444;
      color: #ffffff !important;
      transform: translateY(-1px);
    }
    .external-yt-link {
      color: #ef4444 !important;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 12px;
      border-radius: 6px;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      transition: all 0.2s ease;
    }
    .external-yt-link:hover {
      background: rgba(239, 68, 68, 0.25);
      color: #ffffff !important;
    }
    .video-modal-footer {
      padding: 10px 16px;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
"""

FOOTER_HTML = '<div class="video-modal-footer"><span style="display: inline-flex; align-items: center; gap: 6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>YouTube Audio Clip</span><a id="videoFooterLink" href="#" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; font-weight: 700; text-decoration: none;">Watch Directly on YouTube &rarr;</a></div>'

def enhance_deck(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Add CSS if not present
    if '.yt-direct-btn' not in html:
        html = html.replace('</style>', CSS_SNIPPET + '\n</style>', 1)

    # 2. Add direct YouTube links next to buttons
    # Only replace if not already wrapped in .video-btn-row
    def btn_replacer(match):
        full_match = match.group(0)
        vid_id = match.group(1)
        if 'yt-direct-btn' in full_match:
            return full_match
        
        yt_btn = (
            f'<a href="https://www.youtube.com/watch?v={vid_id}" target="_blank" rel="noopener noreferrer" '
            f'class="yt-direct-btn" title="Watch directly on YouTube">'
            f'<svg width="13" height="13" viewBox="0 0 24 24" fill="#ef4444" style="vertical-align: -1px; margin-right: 3px;">'
            f'<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>'
            f'</svg>YouTube ↗</a>'
        )
        return f'<div class="video-btn-row">{full_match}{yt_btn}</div>'

    html = re.sub(
        r'<button[^>]+onclick=[\"\']openVideo\([\'\"]([a-zA-Z0-9_\-]+)[\'\"],\s*([\'\"].*?[\'\"])\)[^>]*>.*?</button>',
        btn_replacer,
        html,
        flags=re.S
    )

    # 3. Add videoExternalLink to modal header if missing
    if 'id="videoExternalLink"' not in html:
        # Check standard header
        if '<div class="video-modal-header">' in html:
            html = re.sub(
                r'(<div class="video-modal-header">.*?)(<button[^>]*class=[\"\'](?:video-modal-close|close-modal-btn|modal-close)[^>]*>.*?</button>)',
                r'\1<div style="display: flex; gap: 10px; align-items: center;"><a id="videoExternalLink" href="#" target="_blank" rel="noopener noreferrer" class="external-yt-link" title="Open directly on YouTube"><span>Open in YouTube</span> <span>↗</span></a>\2</div>',
                html,
                flags=re.S
            )
        elif '<div class="video-modal-box">' in html:
            # Box-style modals (funk, punk, rock, rock-n-roll, soul)
            html = re.sub(
                r'<div class="video-modal-box">\s*<button class="modal-close" onclick="closeVideo\(\)">✕</button>',
                '<div class="video-modal-box"><div class="video-modal-header" style="display:flex; justify-content:space-between; align-items:center; padding:12px 18px; border-bottom:1px solid rgba(255,255,255,0.1);"><span class="video-modal-title" id="videoModalTitle" style="color:#ffffff; font-weight:700; font-size:14px;">YouTube Video Clip</span><div style="display:flex; gap:10px; align-items:center;"><a id="videoExternalLink" href="#" target="_blank" rel="noopener noreferrer" class="external-yt-link" title="Open directly on YouTube"><span>Open in YouTube</span> <span>↗</span></a><button class="modal-close" style="position:static; margin:0;" onclick="closeVideo()">✕</button></div></div>',
                html
            )

    # 4. Add videoFooterLink to modal if missing
    if 'class="video-modal-footer"' not in html:
        # Place before closing of wrapper or content
        if '<div class="video-player-wrapper">' in html:
            html = re.sub(r'(<div class="video-player-wrapper">.*?</iframe>\s*</div>)', r'\1' + FOOTER_HTML, html, flags=re.S)
        elif '<div class="video-modal-iframe-wrap">' in html:
            html = re.sub(r'(<div class="video-modal-iframe-wrap">.*?</iframe>\s*</div>)', r'\1' + FOOTER_HTML, html, flags=re.S)
        elif '<div style="position: relative; padding-bottom: 56.25%;' in html:
            html = re.sub(r'(<div style="position: relative; padding-bottom: 56.25%;.*?</iframe>\s*</div>)', r'\1' + FOOTER_HTML, html, flags=re.S)

    # 5. Enhance openVideo JS logic
    if 'document.getElementById("videoExternalLink")' not in html and "document.getElementById('videoExternalLink')" not in html:
        js_enhancement = (
            "\n      const extLink = document.getElementById('videoExternalLink');\n"
            "      if (extLink) extLink.href = 'https://www.youtube.com/watch?v=' + videoId;\n"
            "      const footLink = document.getElementById('videoFooterLink');\n"
            "      if (footLink) footLink.href = 'https://www.youtube.com/watch?v=' + videoId;\n"
        )
        html = re.sub(r'(function openVideo\([^)]+\)\s*\{)', r'\1' + js_enhancement, html)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Enhanced {os.path.basename(filepath)}')

def main():
    decks = sorted(glob.glob('public/interactive-slide-*.html'))
    print(f'Enhancing {len(decks)} decks with direct YouTube links...')
    for d in decks:
        enhance_deck(d)
    print('\nAll 16 decks successfully enhanced!')

if __name__ == '__main__':
    main()
