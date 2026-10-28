import glob
import re
import os

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # 1. Clear initial iframe from video-player-wrapper if present
    wrapper_pattern = re.compile(r'(<div class=[\'"]video-player-wrapper[\'"][^>]*>)\s*<iframe id=[\'"]videoIframe[\'"][^>]*></iframe>\s*(</div>)', re.IGNORECASE)
    if wrapper_pattern.search(content):
        content = wrapper_pattern.sub(r'\1\2', content)
        changed = True

    # 2. In openVideo: replace videoIframe.src = ...
    pattern_open = re.compile(r'videoIframe\.src\s*=\s*[`\'"].*?videoId.*?[\'";`]', re.IGNORECASE)
    if pattern_open.search(content):
        replacement_open = (
            "const vWrap = document.querySelector('.video-player-wrapper');\n"
            "      if (vWrap) {\n"
            '        vWrap.innerHTML = `<iframe id="videoIframe" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%; border: 0; display: block;"></iframe>`;\n'
            "      }"
        )
        content = pattern_open.sub(replacement_open, content)
        changed = True

    # 3. In closeVideo: replace videoIframe.src = '';
    pattern_close = re.compile(r'videoIframe\.src\s*=\s*[\'"`]\s*[\'"`];?', re.IGNORECASE)
    if pattern_close.search(content):
        replacement_close = (
            "const vWrap = document.querySelector('.video-player-wrapper');\n"
            "      if (vWrap) vWrap.innerHTML = '';"
        )
        content = pattern_close.sub(replacement_close, content)
        changed = True

    # 4. In updateDeck(): add replaceState if not present
    if 'history.replaceState' not in content and 'function updateDeck()' in content:
        match = re.search(r'(function updateDeck\(\)\s*\{[\s\S]*?)(\n\s*\})', content)
        if match:
            head = match.group(1)
            tail = match.group(2)
            inject = "\n      if (window.history && window.history.replaceState) {\n        window.history.replaceState({ slide: currentSlide }, '', '#slide-' + (currentSlide + 1));\n      }"
            content = content[:match.start()] + head + inject + tail + content[match.end():]
            changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    files = sorted(glob.glob('public/interactive-slide-*.html'))
    updated = []
    for f in files:
        if patch_file(f):
            updated.append(f)

    print(f"Patched {len(updated)} slide deck files:")
    for u in updated:
        print(f" - {u}")

if __name__ == '__main__':
    main()
