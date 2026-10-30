#!/usr/bin/env python3
"""
update_wordpress_page_8494.py
Updates WordPress Page ID 8494:
https://www.musictechguru.com/homepage/a-level-music-technology/

Optimizes for top Google Search rankings on:
- "A-Level Music Technology"
- "A-Level Music Technology resources"
- "A-Level Music Technology tutorials"
- "Edexcel A-Level Music Technology 9MT0"

Includes:
- Keyword-optimized H1 and H2 headers
- Schema.org Course, EducationalOrganization, and FAQPage JSON-LD structured data
- Prominent feature card linking directly to the new 364-term Dictionary
- Responsive grid linking Components 1, 2, 3, and 4
- Visual Composer base64 structure preserved
"""

import urllib.request
import json
import base64
import re

WP_PAGE_ID = 8494
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

headers = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

SCHEMA_JSON_LD = json.dumps({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.musictechguru.com/homepage/a-level-music-technology/#webpage",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/",
            "name": "A-Level Music Technology Resources & Tutorials | Music Tech Guru",
            "description": "The UK's complete resource hub for Pearson Edexcel A-Level Music Technology (9MT0). Master Component 1, 2, 3 & 4 with interactive tutorials, coursework guides, past papers, and syllabus glossary.",
            "inLanguage": "en-GB",
            "isPartOf": {
                "@type": "WebSite",
                "@id": "https://www.musictechguru.com/#website",
                "name": "Music Tech Guru",
                "url": "https://www.musictechguru.com/"
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.musictechguru.com/"},
                    {"@type": "ListItem", "position": 2, "name": "A-Level Music Technology Resources & Tutorials", "item": "https://www.musictechguru.com/homepage/a-level-music-technology/"}
                ]
            }
        },
        {
            "@type": "Course",
            "@id": "https://www.musictechguru.com/homepage/a-level-music-technology/#course",
            "name": "Pearson Edexcel A-Level Music Technology (9MT0) Complete Revision Course",
            "description": "Comprehensive curriculum covering Component 1 (Recording), Component 2 (Technology Composition), Component 3 (Listening and Analysing), and Component 4 (Producing and Analysing).",
            "provider": {
                "@type": "EducationalOrganization",
                "name": "Music Tech Guru",
                "url": "https://www.musictechguru.com"
            },
            "educationalCredentialAwarded": "A-Level / Advanced GCE in Music Technology",
            "courseCode": "9MT0",
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "online",
                "courseWorkload": "PT120H"
            }
        },
        {
            "@type": "FAQPage",
            "@id": "https://www.musictechguru.com/homepage/a-level-music-technology/#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Where can I find the best A-Level Music Technology resources?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Music Tech Guru provides the UK's leading A-Level Music Technology resource hub, featuring over 360 examiner-verified dictionary terms, visual signal-flow diagrams, past paper stems, interactive mixing drills, and revision quizzes directly aligned to the Pearson Edexcel specification."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What tutorials are available for Edexcel A-Level Music Technology?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Tutorials cover all four components: Component 1 acoustic multitrack recording and mixing, Component 2 synthesis and DAW composition, Component 3 listening and history analysis (1950s to present), and Component 4 practical exam editing, corrective EQ, dynamic processing, and essay structure."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How is the Pearson Edexcel A-Level Music Technology (9MT0) exam structured?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The course is split into 4 components: Component 1 Recording coursework (20%, 60 marks), Component 2 Technology Composition coursework (20%, 60 marks), Component 3 Listening & Analysing written exam (25%, 1h 30m), and Component 4 Producing & Analysing practical exam (35%, 2h 15m)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where can I find an official Music Technology glossary or dictionary?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Official Music Technology Dictionary on Music Tech Guru includes over 360 examiner-verified definitions across recording, synthesis, sampling, dynamic processing, EQ, reverb, and delay with technical diagrams and studio gear photographs."
                    }
                }
            ]
        }
    ]
}, ensure_ascii=False)

def generate_part1_html():
    with open("scripts/decoded_wp_page_8494.html", "r", encoding="utf-8") as f:
        content = f.read()

    # Split on BLOCK_SEP
    parts = content.split("<!-- BLOCK_SEP -->")
    part1 = parts[0]
    part2 = parts[1] if len(parts) > 1 else ""

    # 1. Update H1 in Hero card
    part1 = re.sub(
        r'<h1 style="color: #ffffff; font-size: 32px; font-weight: 900; margin: 0 0 12px; line-height: 1.25;">.*?</h1>',
        r'''<h1 style="color: #ffffff; font-size: 32px; font-weight: 900; margin: 0 0 12px; line-height: 1.25;">
                    A-Level Music Technology <span style="color: #00C1F0; text-shadow: 0 0 25px rgba(0, 193, 240, 0.35);">Resources &amp; Tutorials Hub</span>
                </h1>''',
        part1,
        flags=re.S
    )

    # 2. Update intro paragraph in Hero card
    part1 = re.sub(
        r'<p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 18px;">.*?</p>',
        r'''<p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 18px;">
                    Welcome to the UK's definitive learning and revision hub for <strong>Pearson Edexcel A-Level Music Technology (9MT0)</strong>. Access examiner-verified tutorials, coursework production guides, signal-flow diagrams, past papers, and the interactive Revision App across all four syllabus components.
                </p>''',
        part1,
        flags=re.S
    )

    # 3. Add Dictionary to Section 4 (Resources Grid)
    dict_card = '''
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/" style="background: #0f172a; border: 1px solid rgba(0, 193, 240, 0.4); border-radius: 14px; padding: 22px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.25);">
                <div>
                    <span style="font-size: 26px; display: block; margin-bottom: 10px;">📖</span>
                    <strong style="color: #ffffff; font-size: 16px; display: block; margin-bottom: 6px;">Music Technology Dictionary</strong>
                    <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0 0 14px;">
                        Over 364+ examiner-verified definitions, visual signal-flow diagrams, and hardware photos for Components 1, 2, 3 &amp; 4.
                    </p>
                </div>
                <span style="color: #00C1F0; font-size: 13px; font-weight: 700;">Open Visual Glossary &rarr;</span>
            </a>
'''
    if "music-technology-dictionary" not in part1:
        # Insert before the closing div of the resources grid
        part1 = re.sub(
            r'(<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(280px, 1fr\)\); gap: 20px; margin-bottom: 40px;">[\s\S]*?)(</div>\s*</div>\s*<!-- 5\. FEATURED)',
            rf'\1{dict_card}        \2',
            part1
        )

    # 4. Add Schema.org JSON-LD at top of part1
    part1_with_schema = f"""
<!-- Schema.org Course & FAQPage Structured Data -->
<script type="application/ld+json">
{SCHEMA_JSON_LD}
</script>
{part1}
"""
    return part1_with_schema, part2

def main():
    print(f"Updating Page ID {WP_PAGE_ID} for top Google Search rankings...")
    part1_html, part2_html = generate_part1_html()

    b64_part1 = base64.b64encode(part1_html.encode("utf-8")).decode("utf-8")
    b64_part2 = base64.b64encode(part2_html.encode("utf-8")).decode("utf-8")

    full_payload = (
        f"[vc_row][vc_column][vc_raw_html]{b64_part1}[/vc_raw_html][/vc_column][/vc_row]\n"
        f'[vc_row][vc_column][recent_products per_page="4" columns="4" orderby="date" order="DESC"][/vc_column][/vc_row]\n'
        f"[vc_row][vc_column][vc_raw_html]{b64_part2}[/vc_raw_html][/vc_column][/vc_row]"
    )

    req = urllib.request.Request(
        WP_API_URL,
        headers=headers,
        data=json.dumps({
            "title": "A-Level Music Technology Resources & Tutorials (Edexcel 9MT0)",
            "content": full_payload
        }).encode("utf-8"),
        method="POST"
    )

    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print(f"SUCCESS: Page ID {WP_PAGE_ID} updated successfully!")
        print("Live Title:", res.get("title", {}).get("rendered"))
        print("Live URL:", res.get("link"))

if __name__ == "__main__":
    main()
