#!/usr/bin/env python3
"""
make_all_deck_images_expandable.py
Ensures EVERY interactive presentation deck has a sleek, responsive, universal image lightbox.
Works across all 27 interactive slide decks in public/interactive-slide-*.html.
"""

import glob
import re
import os

EXPANDABLE_CSS = """
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
"""

EXPANDABLE_HTML = """
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
"""

EXPANDABLE_JS = """
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
"""

def clean_old_lightbox(content):
    # Strip old CSS
    content = re.sub(r'/\*\s*(?:Universal\s*)?Image Lightbox Modal\s*\*/[\s\S]*?\.hardware-photo:hover::after[^{]*\{[^}]*\}', '', content)
    content = re.sub(r'/\*\s*Image Lightbox Modal\s*\*/[\s\S]*?\.slide-thumb:hover[^{]*\{[^}]*\}', '', content)
    # Strip old HTML
    content = re.sub(r'<!--\s*(?:Universal\s*)?Image Lightbox Modal\s*-->[\s\S]*?</div>\s*</div>\s*(?=\n\s*</body>|\n\s*<script|$)', '', content)
    # Strip old JS
    content = re.sub(r'//\s*(?:Universal\s*)?Image Lightbox Logic[\s\S]*?closeImageModal\(\);\s*\}\s*\}\);\s*', '', content)
    return content

def update_deck_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean previous if present
    content = clean_old_lightbox(content)

    # 1. Insert CSS before </style>
    if '</style>' in content:
        content = content.replace('</style>', f"{EXPANDABLE_CSS}\n</style>", 1)
    else:
        print(f"Warning: No </style> found in {file_path}")

    # 2. Insert HTML before </body>
    if '</body>' in content:
        content = content.replace('</body>', f"{EXPANDABLE_HTML}\n</body>", 1)
    else:
        print(f"Warning: No </body> found in {file_path}")

    # 3. Insert JS before the last </script>
    last_script_idx = content.rfind('</script>')
    if last_script_idx != -1:
        content = content[:last_script_idx] + f"{EXPANDABLE_JS}\n  " + content[last_script_idx:]
    else:
        print(f"Warning: No </script> found in {file_path}")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_path}")

def main():
    decks = sorted(glob.glob('public/interactive-slide-*.html'))
    print(f"Processing {len(decks)} interactive slide decks...")
    for d in decks:
        update_deck_file(d)
    print("All slide decks updated successfully!")

if __name__ == '__main__':
    main()
