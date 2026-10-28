import json

with open('scripts/data/music_tech_guru_videos.json') as f:
    videos = json.load(f)

# Group by category and series
grouped = {}
for v in videos:
    c = v['category']
    s = v['series'] or 'General'
    grouped.setdefault(c, {}).setdefault(s, []).append(v)

out_md = []
out_md.append('# Music Tech Guru — Complete YouTube Channel Content Directory for WordPress\n\n')
out_md.append('> **Channel:** [@musictechguru](https://www.youtube.com/@musictechguru)  \n')
out_md.append(f'> **Total Channel Videos:** {len(videos)} Masterclasses & Tutorials  \n')
out_md.append('> **Target Site:** [musictechguru.com](https://musictechguru.com)\n\n')

out_md.append('This directory maps **all 141 videos** from the Music Tech Guru YouTube channel to specific blog posts, pages, and resource hubs across **musictechguru.com**.\n\n')

out_md.append('## Table of Contents\n')
out_md.append('1. [Master All-in-One Video Hub for WordPress (All 141 Videos)](#1-master-all-in-one-video-hub-for-wordpress-all-141-videos)\n')
out_md.append('2. [Component 1: Multitrack Recording & Mixing (28 Videos)](#2-component-1-multitrack-recording--mixing-28-videos)\n')
out_md.append('3. [Component 2: Composition & Arrangement (16 Videos)](#3-component-2-composition--arrangement-16-videos)\n')
out_md.append('4. [Component 3 & 4: Exam Techniques & Past Papers (8 Videos)](#4-component-3--4-exam-techniques--past-papers-8-videos)\n')
out_md.append('5. [Logic Pro Masterclasses & Studio Techniques (22 Videos)](#5-logic-pro-masterclasses--studio-techniques-22-videos)\n')
out_md.append('6. [Synthesis & Sound Design (7 Videos)](#6-synthesis--sound-design-7-videos)\n')
out_md.append('7. [Song Breakdowns & Track Re-makes (38 Videos)](#7-song-breakdowns--track-re-makes-38-videos)\n')
out_md.append('8. [Studio Archive & Heritage Productions (16 Videos)](#8-studio-archive--heritage-productions-16-videos)\n')
out_md.append('9. [Live Streams & Interactive Q&A (5 Videos)](#9-live-streams--interactive-qa-5-videos)\n')
out_md.append('10. [Automated WordPress REST API Sync Script](#10-automated-wordpress-rest-api-sync)\n\n')

out_md.append('---\n\n')
out_md.append('## 1. Master All-in-One Video Hub for WordPress (All 141 Videos)\n\n')
out_md.append('You can embed **all 141 videos** in a single interactive player with real-time search and category filtering on **musictechguru.com**.\n\n')
out_md.append('- **File created in your project:** `wordpress-all-videos-embed.html`\n')
out_md.append('- **Recommended WordPress Page:** Create a new page titled `Video Masterclasses` (slug: `/video-tutorials/` or `/free-music-production-tutorials/`)\n')
out_md.append('- **How to add in WordPress:**\n')
out_md.append('  1. In WordPress Admin, open Pages > Add New (or edit an existing page).\n')
out_md.append('  2. Add a **Custom HTML** block.\n')
out_md.append('  3. Paste the contents of `wordpress-all-videos-embed.html` and hit **Update / Publish**.\n\n')

out_md.append('---\n\n')

section_idx = 2
for cat, series_dict in grouped.items():
    cat_total = sum(len(vids) for vids in series_dict.values())
    out_md.append(f'## {section_idx}. {cat} ({cat_total} Videos)\n\n')
    section_idx += 1
    
    # Target page recommendation
    if 'Component 1' in cat:
        out_md.append('**Recommended WordPress Placement on musictechguru.com:**\n')
        out_md.append('- **Blog Post (ID 297773):** `/edexcel-music-technology-component-1-recording-guide/`\n')
        out_md.append('- **Page (ID 8604):** `/component-1-recording-mixing/`\n\n')
    elif 'Component 2' in cat:
        out_md.append('**Recommended WordPress Placement on musictechguru.com:**\n')
        out_md.append('- **Page (ID 297524):** `/music-technology-component-2-composition-guide/`\n')
        out_md.append('- **Page (ID 8632):** `/component-2-sequencing-sampling-synthesis-composition/`\n')
        out_md.append('- **Page (ID 297308):** `/sequencing-101-arrange-shape-of-you-on-logic-pro-x/`\n')
        out_md.append('- **Page (ID 296624):** `/remake-shape-of-you-logic-pro/`\n\n')
    elif 'Component 3 & 4' in cat:
        out_md.append('**Recommended WordPress Placement on musictechguru.com:**\n')
        out_md.append('- **Page (ID 297654):** `/edexcel-component-4-production-exam-revision/`\n')
        out_md.append('- **Page (ID 13245):** `/component-4-production-analysing/`\n')
        out_md.append('- **Page (ID 297651):** `/edexcel-component-3-music-technology-revision/`\n')
        out_md.append('- **Blog Post (ID 297768):** `/edexcel-music-technology-component-3-q5-predictions-2026-2028/`\n\n')
    elif 'Logic Pro' in cat:
        out_md.append('**Recommended WordPress Placement on musictechguru.com:**\n')
        out_md.append('- **Page (ID 10071):** `/free-music-production-tutorials/`\n')
        out_md.append('- **Blog Category:** `/blog/`\n\n')
    elif 'Synthesis' in cat:
        out_md.append('**Recommended WordPress Placement on musictechguru.com:**\n')
        out_md.append('- **Page (ID 8632):** `/component-2-sequencing-sampling-synthesis-composition/`\n')
        out_md.append('- **Page (ID 13389):** `/music-technology-dictionary/`\n\n')
    elif 'Song Breakdowns' in cat:
        out_md.append('**Recommended WordPress Placement on musictechguru.com:**\n')
        out_md.append('- **Blog Post (ID 12989):** `/stranger-things/`\n')
        out_md.append('- **Page (ID 10071):** `/free-music-production-tutorials/`\n\n')

    for series_name, vlist in series_dict.items():
        out_md.append(f'### Series: {series_name} ({len(vlist)} videos)\n\n')
        out_md.append('| Video Title | YouTube ID | Direct Link | Embed Shortcode |\n')
        out_md.append('| :--- | :--- | :--- | :--- |\n')
        for v in vlist:
            shortcode = f'`[embed]https://www.youtube.com/watch?v={v["id"]}[/embed]`'
            out_md.append(f'| **{v["title"]}** | `{v["id"]}` | [YouTube Link](https://www.youtube.com/watch?v={v["id"]}) | {shortcode} |\n')
        out_md.append('\n')

# Section 10: Sync script guide
out_md.append('## 10. Automated WordPress REST API Sync\n\n')
out_md.append('If you prefer to automate embedding videos directly into your live WordPress posts and pages without copying and pasting manually:\n\n')
out_md.append('1. Generate an Application Password in WordPress: **Users > Profile > Application Passwords**.\n')
out_md.append('2. Run the sync script from terminal:\n')
out_md.append('```bash\npython3 scripts/sync_to_wordpress.py --user YOUR_WP_USERNAME --password "YOUR_APPLICATION_PASSWORD"\n```\n')
out_md.append('This script will automatically append the curated video playlists and responsive players into each corresponding WordPress post and page!\n')

with open('WORDPRESS_ALL_VIDEOS_DIRECTORY.md', 'w') as f:
    f.write(''.join(out_md))

print('Successfully generated WORDPRESS_ALL_VIDEOS_DIRECTORY.md')
