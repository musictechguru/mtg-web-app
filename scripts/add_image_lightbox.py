import glob, os

LIGHTBOX_CSS = '''
    /* Image Lightbox Modal */
    .image-modal-backdrop {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px);
      z-index: 10000;
      align-items: center;
      justify-content: center;
      padding: 20px;
      cursor: zoom-out;
    }
    .image-modal-backdrop.open {
      display: flex;
    }
    .image-modal-content {
      position: relative;
      max-width: 90vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: 14px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 0, 0, 0.8);
      cursor: default;
      animation: modalZoomIn 0.2s ease-out;
    }
    @keyframes modalZoomIn {
      from { transform: scale(0.92); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .image-modal-content img {
      max-width: 86vw;
      max-height: 74vh;
      object-fit: contain;
      border-radius: 8px;
      display: block;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }
    .image-modal-caption {
      margin-top: 10px;
      font-size: 13.5px;
      color: #f1f5f9;
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.3px;
      max-width: 80vw;
    }
    .image-modal-close {
      position: absolute;
      top: -12px;
      right: -12px;
      background: #ef4444;
      color: #fff;
      border: 2px solid #fff;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 18px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
      transition: transform 0.2s, background 0.2s;
      z-index: 10001;
    }
    .image-modal-close:hover {
      background: #dc2626;
      transform: scale(1.1);
    }
    .slide-thumb, .artist-photo, .cover-card img, .image-frame img, .info-card img {
      cursor: zoom-in !important;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .slide-thumb:hover, .artist-photo:hover, .cover-card img:hover, .image-frame img:hover, .info-card img:hover {
      transform: translateY(-2px) scale(1.02);
      border-color: rgba(245, 158, 11, 0.6) !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5) !important;
    }
'''

LIGHTBOX_HTML = '''
  <!-- Image Lightbox Modal -->
  <div class="image-modal-backdrop" id="imageModal" onclick="closeImageModal()">
    <div class="image-modal-content" onclick="event.stopPropagation()">
      <button class="image-modal-close" onclick="closeImageModal()" title="Close (Esc)">&times;</button>
      <img id="imageModalImg" src="" alt="Expanded Image">
      <div class="image-modal-caption" id="imageModalCaption"></div>
    </div>
  </div>
'''

LIGHTBOX_JS = '''
    // Image Lightbox Logic
    const imageModal = document.getElementById('imageModal');
    const imageModalImg = document.getElementById('imageModalImg');
    const imageModalCaption = document.getElementById('imageModalCaption');

    function openImageModal(src, alt) {
      if (!imageModal || !imageModalImg) return;
      imageModalImg.src = src;
      if (imageModalCaption) imageModalCaption.textContent = alt || '';
      imageModal.classList.add('open');
    }

    function closeImageModal() {
      if (!imageModal) return;
      imageModal.classList.remove('open');
      if (imageModalImg) imageModalImg.src = '';
    }

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'IMG') {
        if (target.closest('#videoModal') || target.closest('#imageModal')) return;
        if (
          target.classList.contains('slide-thumb') ||
          target.classList.contains('artist-photo') ||
          target.closest('.cover-card') ||
          target.closest('.image-frame') ||
          target.closest('.info-card')
        ) {
          e.preventDefault();
          openImageModal(target.src, target.alt);
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal && imageModal.classList.contains('open')) {
        closeImageModal();
      }
    });
'''

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False
    if 'image-modal-backdrop' not in content and '</style>' in content:
        content = content.replace('</style>', LIGHTBOX_CSS + '\n</style>', 1)
        modified = True

    if 'id="imageModal"' not in content and '</body>' in content:
        content = content.replace('</body>', LIGHTBOX_HTML + '\n</body>', 1)
        modified = True

    if 'openImageModal' not in content and '</script>' in content:
        last_idx = content.rfind('</script>')
        if last_idx != -1:
            content = content[:last_idx] + LIGHTBOX_JS + '\n  ' + content[last_idx:]
            modified = True

    if modified:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added lightbox to: {path}")
    else:
        print(f"Already configured: {path}")

if __name__ == '__main__':
    files = sorted(glob.glob('public/interactive-slide-*.html'))
    print(f"Found {len(files)} files")
    for f in files:
        process_file(f)
