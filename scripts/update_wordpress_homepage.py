#!/usr/bin/env python3
"""
update_wordpress_homepage.py
Updates WordPress Page ID 8377 (Homepage):
https://www.musictechguru.com/

Optimizes for top Google Search rankings on:
- "A-level music technology"
- "A-level music technology resources"
- "A-level music technology tutorials"
- "Music technology revision"

Includes:
- Keyword-optimized H1 ("A-Level Music Technology Resources, Tutorials & Revision")
- Direct canonical link to the new 364-term Dictionary
- Schema.org WebSite, EducationalOrganization, Course, and FAQPage JSON-LD
"""

import urllib.request
import json
import base64
import re

WP_PAGE_ID = 8377
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

headers = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

SCHEMA_HOMEPAGE_JSON_LD = json.dumps({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://www.musictechguru.com/#website",
            "url": "https://www.musictechguru.com/",
            "name": "Music Tech Guru",
            "description": "The UK's leading A-Level Music Technology resources, tutorials, and exam revision platform.",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.musictechguru.com/?s={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@type": "EducationalOrganization",
            "@id": "https://www.musictechguru.com/#organization",
            "name": "Music Tech Guru",
            "url": "https://www.musictechguru.com/",
            "logo": "https://www.musictechguru.com/wp-content/uploads/2020/02/MTG-logo-desktop-scaled.png",
            "description": "Specialist educational platform and tuition for Pearson Edexcel A-Level Music Technology (9MT0).",
            "sameAs": [
                "https://www.youtube.com/user/musictechguru777",
                "https://www.facebook.com/musictechguru/"
            ]
        },
        {
            "@type": "Course",
            "@id": "https://www.musictechguru.com/#course",
            "name": "A-Level Music Technology Revision Curriculum (Pearson Edexcel 9MT0)",
            "description": "Complete syllabus resources and tutorials for Component 1 (Recording), Component 2 (Composition), Component 3 (Listening and Analysing), and Component 4 (Producing and Analysing).",
            "provider": { "@id": "https://www.musictechguru.com/#organization" },
            "educationalCredentialAwarded": "A-Level / Advanced GCE in Music Technology",
            "courseCode": "9MT0"
        }
    ]
}, ensure_ascii=False)

def update_homepage():
    print(f"Fetching current page content for Page ID {WP_PAGE_ID}...")
    req = urllib.request.Request(WP_API_URL, headers={"Authorization": f"Basic {B64_AUTH}"})
    with urllib.request.urlopen(req) as resp:
        page_data = json.loads(resp.read().decode())
    
    # Get raw content from backup or rendered
    with open("homepage_current.html", "r", encoding="utf-8") as f:
        raw_content = f.read()

    vc_blocks = re.findall(r'\[vc_raw_html[^\]]*\](.*?)\[/vc_raw_html\]', raw_content, flags=re.S)
    if len(vc_blocks) < 3:
        print("ERROR: Could not find all 3 vc_raw_html blocks in homepage_current.html")
        return

    block1_raw = vc_blocks[0].strip()
    block2_raw = vc_blocks[1].strip()
    block3_raw = vc_blocks[2].strip()

    # Decode Block 2
    b2_html = base64.b64decode(block2_raw).decode("utf-8")

    # 1. Update H1
    b2_html = re.sub(
        r'<h1 style="color: #ffffff; font-size: 34px; font-weight: 900; margin: 0 0 12px; line-height: 1.25;">[\s\S]*?</h1>',
        r'''<h1 style="color: #ffffff; font-size: 34px; font-weight: 900; margin: 0 0 12px; line-height: 1.25;">
            A-Level Music Technology <span style="color: #00C1F0; text-shadow: 0 0 25px rgba(0, 193, 240, 0.4);">Resources, Tutorials &amp; Revision</span>
        </h1>''',
        b2_html
    )

    # 2. Update intro paragraph
    b2_html = re.sub(
        r'<p style="color: #cbd5e1; font-size: 16px; max-width: 780px; margin: 0 auto 24px; line-height: 1.6;">[\s\S]*?</p>',
        r'''<p style="color: #cbd5e1; font-size: 16px; max-width: 780px; margin: 0 auto 24px; line-height: 1.6;">
            The UK's specialist learning platform for <strong>Pearson Edexcel A-Level Music Technology (9MT0)</strong>. Access examiner-verified tutorials, coursework production guides, signal-flow diagrams, past papers, and the MTG Revision App across all four syllabus components.
        </p>''',
        b2_html
    )

    # 3. Update dictionary link to direct canonical URL
    b2_html = b2_html.replace(
        "https://www.musictechguru.com/homepage/music-technology-dictionary/",
        "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/"
    )

    # 4. Inject Schema JSON-LD at top of Block 2
    b2_html_with_schema = f"""
<!-- Schema.org Educational WebSite & Course Structured Data -->
<script type="application/ld+json">
{SCHEMA_HOMEPAGE_JSON_LD}
</script>
{b2_html}
"""

    b64_new_b2 = base64.b64encode(b2_html_with_schema.encode("utf-8")).decode("utf-8")

    # Reconstruct full payload
    full_payload = (
        f"[vc_row][vc_column][vc_raw_html]{block1_raw}[/vc_raw_html][/vc_column][/vc_row]\n"
        f"[vc_row][vc_column][vc_raw_html]{b64_new_b2}[/vc_raw_html][/vc_column][/vc_row]\n"
        f"[vc_row][vc_column][vc_raw_html]{block3_raw}[/vc_raw_html][/vc_column][/vc_row]"
    )

    print(f"Deploying optimized homepage payload to {WP_API_URL}...")
    req_update = urllib.request.Request(
        WP_API_URL,
        headers=headers,
        data=json.dumps({
            "title": "A-Level Music Technology Resources, Tutorials & Revision",
            "content": full_payload
        }).encode("utf-8"),
        method="POST"
    )

    with urllib.request.urlopen(req_update) as resp:
        res = json.loads(resp.read().decode())
        print(f"SUCCESS: Homepage Page ID {WP_PAGE_ID} updated successfully!")
        print("Live Title:", res.get("title", {}).get("rendered"))
        print("Live Link:", res.get("link"))

if __name__ == "__main__":
    update_homepage()
