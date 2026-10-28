import urllib.request, json, base64, re

WP_PAGE_ID = 13311
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

def main():
    print(f"Fetching Page {WP_PAGE_ID}...")
    req = urllib.request.Request(f"{WP_API_URL}?context=edit", headers={"Authorization": f"Basic {B64_AUTH}"})
    with urllib.request.urlopen(req) as resp:
        page_data = json.loads(resp.read().decode())
    
    raw = page_data.get("content", {}).get("raw", "")
    m = re.search(r"(\[vc_raw_html\])(.*?)(\[/vc_raw_html\])", raw, re.DOTALL)
    if not m:
        raise ValueError("Could not find [vc_raw_html] block in Page 13311")
    
    prefix = raw[:m.start(2)]
    suffix = raw[m.end(2):]
    decoded_html = base64.b64decode(m.group(2)).decode("utf-8")
    
    # Save a local backup
    with open("scripts/backup_page_13311_before_synth.html", "w", encoding="utf-8") as f:
        f.write(decoded_html)
    print("Backup saved to scripts/backup_page_13311_before_synth.html")

    target_block = '''                    <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-electric-guitar/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 9px 12px; color: #cbd5e1; text-decoration: none; font-size: 12.5px;">
                        &bull; Electric Guitar
                    </a>
                    <a href="https://www.musictechguru.com/2020/03/04/the-bass-guitar/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 9px 12px; color: #cbd5e1; text-decoration: none; font-size: 12.5px;">
                        &bull; Bass Guitar
                    </a>'''

    replacement_block = '''                    <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-electric-guitar/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 9px 12px; color: #cbd5e1; text-decoration: none; font-size: 12.5px;">
                        &bull; Electric Guitar
                    </a>
                    <a href="https://www.musictechguru.com/2020/03/04/the-bass-guitar/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 9px 12px; color: #cbd5e1; text-decoration: none; font-size: 12.5px;">
                        &bull; Bass Guitar
                    </a>
                    <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-synthesizer/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 9px 12px; color: #cbd5e1; text-decoration: none; font-size: 12.5px;">
                        &bull; Synthesizers
                    </a>'''

    # Also style amplifiers to span 2 columns nicely at the base if desired
    target_amp = '''                    <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/amplifiers/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 9px 12px; color: #cbd5e1; text-decoration: none; font-size: 12.5px;">
                        &bull; Amplifiers
                    </a>'''

    replacement_amp = '''                    <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/amplifiers/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 9px 12px; color: #cbd5e1; text-decoration: none; font-size: 12.5px; grid-column: span 2; text-align: center;">
                        &bull; Amplifiers
                    </a>'''

    if target_block not in decoded_html:
        # Check normalized whitespace
        print("Direct match failed, searching with regex...")
        pat = re.compile(re.escape(target_block.replace('\r\n', '\n')))
        decoded_html_norm = decoded_html.replace('\r\n', '\n')
        if pat.search(decoded_html_norm):
            updated_html = pat.sub(replacement_block.replace('\r\n', '\n'), decoded_html_norm)
            if target_amp.replace('\r\n', '\n') in updated_html:
                updated_html = updated_html.replace(target_amp.replace('\r\n', '\n'), replacement_amp.replace('\r\n', '\n'))
        else:
            raise ValueError("Target block not found in decoded HTML!")
    else:
        updated_html = decoded_html.replace(target_block, replacement_block)
        if target_amp in updated_html:
            updated_html = updated_html.replace(target_amp, replacement_amp)

    print("Successfully replaced target block with Synthesizers link!")

    new_b64 = base64.b64encode(updated_html.encode("utf-8")).decode("ascii")
    new_raw = f"{prefix}{new_b64}{suffix}"

    print(f"Updating WordPress Page {WP_PAGE_ID}...")
    update_req = urllib.request.Request(
        WP_API_URL,
        headers={"Authorization": f"Basic {B64_AUTH}", "Content-Type": "application/json"},
        data=json.dumps({"content": new_raw}).encode("utf-8")
    )
    with urllib.request.urlopen(update_req) as resp:
        result = json.loads(resp.read().decode())
        print(f"SUCCESS: Page {WP_PAGE_ID} updated!")
        print("Link:", result.get("link"))

if __name__ == "__main__":
    main()
