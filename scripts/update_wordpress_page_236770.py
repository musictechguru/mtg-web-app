#!/usr/bin/env python3
"""
update_wordpress_page_236770.py
Updates WordPress Page ID 236770 (slug: music-formats) at:
https://www.musictechguru.com/music-formats/

1. Replaces all broken Wikimedia / Horus image URLs with https://app.musictechguru.com/images/music_formats/...
2. Cleans up broken lazyload placeholders and data-srcset attributes.
3. Adds the 6-slide streamlined interactive deck at the top.
4. Adds anchor targets #vinyl, #cassette, #cd, #streaming.
"""

import urllib.request
import json
import base64
import os
import re

WP_URL = "https://www.musictechguru.com/wp-json/wp/v2"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

headers = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

# 1. Fetch live Page 236770
req = urllib.request.Request(f"{WP_URL}/pages/236770", headers=headers)
with urllib.request.urlopen(req) as resp:
    page_data = json.loads(resp.read().decode())
    raw_content = page_data["content"]["rendered"]

print(f"Fetched Page 236770 content ({len(raw_content)} bytes)")

# 2. Local image mapping
files = os.listdir("public/images/music_formats")

def normalize(name):
    name = re.sub(r'^\d+px-', '', name)
    name = re.sub(r'\.[a-zA-Z0-9]+$', '', name)
    return re.sub(r'[^a-z0-9]', '', urllib.request.unquote(name).lower())

file_map = {normalize(f): f for f in files}
explicit_map = {
    'ifa2005panasonicbluraydiscssingleandduallayerbdrecartridgebyhdtvtotaldotcom': 'panasonic_bluray_cartridge.jpg',
    'bitdepth': 'bit-depth.png'
}

# 3. Clean and fix all img tags (both standard src and data-src)
def fix_img_tag(match):
    tag = match.group(0)
    
    # check data-src or src
    src_match = re.search(r'(?:data-src|src)=[\"\']([^\"\']+)[\"\']', tag)
    if not src_match:
        return tag
    
    # Find any actual external URL
    urls = re.findall(r'https?://[^\"\s\']+', tag)
    target_file = None
    for u in urls:
        bname = os.path.basename(u.split('?')[0])
        norm = normalize(bname)
        if norm in explicit_map:
            target_file = explicit_map[norm]
            break
        elif norm in file_map:
            target_file = file_map[norm]
            break
        else:
            for k, v in file_map.items():
                if norm in k or k in norm:
                    target_file = v
                    break
            if target_file:
                break
                
    if target_file:
        new_url = f"https://app.musictechguru.com/images/music_formats/{target_file}"
        # Set src directly
        tag = re.sub(r'src=[\"\'][^\"\']+[\"\']', f'src="{new_url}"', tag)
        tag = re.sub(r'data-src=[\"\'][^\"\']+[\"\']', f'data-src="{new_url}"', tag)
        # Strip broken srcset attributes
        tag = re.sub(r'\s*data-srcset=[\"\'][^\"\']+[\"\']', '', tag)
        tag = re.sub(r'\s*srcset=[\"\'][^\"\']+[\"\']', '', tag)
        tag = re.sub(r'\s*data-sizes=[\"\'][^\"\']+[\"\']', '', tag)
        tag = re.sub(r'\s*sizes=[\"\'][^\"\']+[\"\']', '', tag)
        if 'loading=' not in tag:
            tag = tag[:-1] + ' loading="lazy">' if tag.endswith('>') else tag + ' loading="lazy"'
            
    return tag

cleaned_content = re.sub(r'<img[^>]+>', fix_img_tag, raw_content)

# 4. Remove any existing interactive deck embed if already present
cleaned_content = re.sub(r'<!-- A-LEVEL MUSIC TECHNOLOGY COMPONENT 3: MUSIC FORMATS INTERACTIVE DECK -->.*?<!-- END INTERACTIVE DECK EMBED -->', '', cleaned_content, flags=re.DOTALL)

# 5. Add anchor tags to the 4 pillars in the page
# Let's locate the 4 pillars cards and inject id="vinyl", id="cassette", id="cd", id="streaming"
cleaned_content = re.sub(
    r'(<div[^>]*border-left:\s*4px\s*solid\s*#34d399[^>]*>\s*<span[^>]*>01\s*&bull;\s*Vinyl Microgroove)',
    r'<div id="vinyl" style="scroll-margin-top: 80px;"></div>\1',
    cleaned_content
)
cleaned_content = re.sub(
    r'(<div[^>]*border-left:\s*4px\s*solid\s*#34d399[^>]*>\s*<span[^>]*>02\s*&bull;\s*Compact Cassette)',
    r'<div id="cassette" style="scroll-margin-top: 80px;"></div>\1',
    cleaned_content
)
cleaned_content = re.sub(
    r'(<div[^>]*border-left:\s*4px\s*solid\s*#34d399[^>]*>\s*<span[^>]*>03\s*&bull;\s*Compact Disc)',
    r'<div id="cd" style="scroll-margin-top: 80px;"></div>\1',
    cleaned_content
)
cleaned_content = re.sub(
    r'(<div[^>]*border-left:\s*4px\s*solid\s*#34d399[^>]*>\s*<span[^>]*>04\s*&bull;\s*MP3)',
    r'<div id="streaming" style="scroll-margin-top: 80px;"></div>\1',
    cleaned_content
)

# 6. Build the Interactive Deck Embed Section
interactive_deck_embed = '''
<!-- A-LEVEL MUSIC TECHNOLOGY COMPONENT 3: MUSIC FORMATS INTERACTIVE DECK -->
<div style="background: linear-gradient(135deg, #080e1a 0%, #0f172a 100%); border: 1px solid rgba(52, 211, 153, 0.35); border-radius: 20px; padding: 24px; margin: 0 0 36px 0; box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4); font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 20px;">
        <div style="max-width: 820px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(52, 211, 153, 0.12); border: 1px solid rgba(52, 211, 153, 0.35); color: #34d399; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 10px;">
                <span style="display: inline-block; width: 7px; height: 7px; background: #34d399; border-radius: 50%; box-shadow: 0 0 8px #34d399;"></span>
                Edexcel Component 3 &bull; Consumable Music Formats
            </div>
            <h2 style="color: #ffffff; font-size: clamp(22px, 3vw, 32px); font-weight: 900; letter-spacing: -0.5px; margin: 0 0 8px 0; line-height: 1.25;">
                The 4 Core Consumable Formats: <span style="color: #34d399;">Interactive Presentation</span>
            </h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0;">
                A split-screen presentation deck strictly covering the 4 consumable formats required for A-Level Music Technology: <strong style="color: #fff;">Vinyl Microgroove (33⅓ &amp; 45 RPM)</strong>, <strong style="color: #fff;">Compact Cassette (Philips 1963)</strong>, <strong style="color: #fff;">Compact Disc (CD-DA Red Book 1982)</strong>, and <strong style="color: #fff;">MP3 &amp; Modern Streaming Audio</strong>, concluding with the Master Exam Matrix.
            </p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
            <a href="https://app.musictechguru.com/interactive-slide-music-formats" target="_blank" rel="noopener" style="background: #34d399; color: #042f2e; text-decoration: none; font-size: 13px; font-weight: 800; padding: 10px 18px; border-radius: 10px; box-shadow: 0 6px 20px rgba(52, 211, 153, 0.35); display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease;">
                <span>Full Screen</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        </div>
    </div>

    <!-- Direct Jump Tabs -->
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
        <button onclick="document.getElementById('formatFrame').src='https://app.musictechguru.com/interactive-slide-music-formats#overview'" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">1. Overview</button>
        <button onclick="document.getElementById('formatFrame').src='https://app.musictechguru.com/interactive-slide-music-formats#vinyl'" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">2. Vinyl Disc (RIAA)</button>
        <button onclick="document.getElementById('formatFrame').src='https://app.musictechguru.com/interactive-slide-music-formats#cassette'" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">3. Compact Cassette</button>
        <button onclick="document.getElementById('formatFrame').src='https://app.musictechguru.com/interactive-slide-music-formats#cd'" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">4. Compact Disc (CD)</button>
        <button onclick="document.getElementById('formatFrame').src='https://app.musictechguru.com/interactive-slide-music-formats#streaming'" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">5. MP3 &amp; Streaming</button>
        <button onclick="document.getElementById('formatFrame').src='https://app.musictechguru.com/interactive-slide-music-formats#matrix'" style="background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3); color: #34d399; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">6. Master Matrix</button>
    </div>

    <!-- Responsive Iframe -->
    <div style="position: relative; width: 100%; height: 960px; border-radius: 14px; overflow: hidden; background: #030712; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
        <iframe id="formatFrame" src="https://app.musictechguru.com/interactive-slide-music-formats" style="width: 100%; height: 100%; border: 0;" title="Consumable Music Formats Interactive Deck" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="eager" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 12px; color: #64748b;">
        <div><span>Navigation:</span> Click any tab above, or use on-screen arrows / dropdown / <kbd style="background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px; color: #cbd5e1;">&larr;</kbd> <kbd style="background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px; color: #cbd5e1;">&rarr;</kbd> arrow keys.</div>
        <div style="color: #34d399; font-weight: 700;">6 Streamlined Slides &bull; 4 Core Syllabus Formats &bull; Master Exam Matrix</div>
    </div>
</div>
<!-- END INTERACTIVE DECK EMBED -->
'''

# Check if wrapper exists
if '<div id="mtg-dark-theme-wrapper"' in cleaned_content:
    # Inject deck after the intro hero banner
    first_banner_end = cleaned_content.find('<!-- 4 Pillars -->')
    if first_banner_end != -1:
        final_content = cleaned_content[:first_banner_end] + interactive_deck_embed + "\n" + cleaned_content[first_banner_end:]
    else:
        # insert after first closing div of header
        final_content = interactive_deck_embed + cleaned_content
else:
    final_content = interactive_deck_embed + cleaned_content

# 7. Push update to WordPress Page 236770
payload = json.dumps({"content": final_content}).encode("utf-8")
update_req = urllib.request.Request(f"{WP_URL}/pages/236770", data=payload, headers=headers, method="POST")

try:
    with urllib.request.urlopen(update_req) as resp:
        res = json.loads(resp.read().decode())
        print(f"SUCCESS: Page ID {res['id']} updated! URL: {res['link']}")
except Exception as e:
    print(f"ERROR updating Page 236770: {e}")
    if hasattr(e, 'read'):
        print(e.read().decode())

# 8. Also update Post 236766 with the exact same streamlined deck and images
update_post_req = urllib.request.Request(f"{WP_URL}/posts/236766", data=payload, headers=headers, method="POST")
try:
    with urllib.request.urlopen(update_post_req) as resp:
        res = json.loads(resp.read().decode())
        print(f"SUCCESS: Post ID {res['id']} updated! URL: {res['link']}")
except Exception as e:
    print(f"ERROR updating Post 236766: {e}")
