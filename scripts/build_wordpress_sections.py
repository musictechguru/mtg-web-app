import json

with open('scripts/data/music_tech_guru_videos.json') as f:
    videos = json.load(f)

# Helper to build a responsive video grid card HTML block
def build_section_card(title, subtitle, video_ids):
    selected = [v for v in videos if v['id'] in video_ids]
    # sort in the order of video_ids
    selected.sort(key=lambda x: video_ids.index(x['id']) if x['id'] in video_ids else 999)
    
    cards_html = []
    for v in selected:
        cards_html.append(f'''
    <div style="background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.25); display: flex; flex-direction: column;">
      <div style="position: relative; padding-top: 56.25%; width: 100%; background: #000;">
        <iframe src="https://www.youtube.com/embed/{v['id']}?rel=0" title="{v['title']}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div style="padding: 14px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.72rem; font-weight: 700; color: #38bdf8; text-transform: uppercase;">{v.get('series') or v.get('category')}</span>
          <h4 style="margin: 6px 0 0 0; font-size: 0.95rem; color: #ffffff; font-weight: 700; line-height: 1.35;">{v['title']}</h4>
        </div>
        <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8;">
          <span>Music Tech Guru</span>
          <a href="https://www.youtube.com/watch?v={v['id']}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: none; font-weight: bold;">Open on YouTube ↗</a>
        </div>
      </div>
    </div>''')

    return f'''
<!-- START SECTION: {title} -->
<div class="mtg-curated-section" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0f172a; border-radius: 16px; padding: 28px 24px; margin: 35px 0; border: 1px solid rgba(56, 189, 248, 0.3); box-shadow: 0 8px 30px rgba(0,0,0,0.3);">
  <div style="margin-bottom: 22px;">
    <h3 style="margin: 0 0 6px 0; font-size: 1.6rem; color: #38bdf8; font-weight: 800; display: flex; align-items: center; gap: 8px;">
      <span>🎬</span> {title}
    </h3>
    <p style="margin: 0; color: #94a3b8; font-size: 0.95rem; line-height: 1.5;">{subtitle}</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    {''.join(cards_html)}
  </div>
</div>
<!-- END SECTION: {title} -->
'''

output = []
output.append('<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Music Tech Guru — Curated WordPress Blog & Page Embed Sections</title>\n</head>\n<body style="background:#090d16; color:#f8fafc; font-family: sans-serif; padding: 30px; max-width: 1200px; margin: 0 auto;">\n')
output.append('<h1>Curated Video Embed Blocks for Specific Posts & Pages on musictechguru.com</h1>\n')
output.append('<p style="color: #94a3b8;">Copy and paste the relevant section into the WordPress Block Editor (Custom HTML block) for each target post or page.</p>\n<hr style="border-color: rgba(255,255,255,0.1); margin: 30px 0;">\n')

# 1. Component 1: Whinging Tom 14 Tasks & Recording Guide
whinging_tom_ids = [
    'uZUCqGIQzu8', # Task 1
    'aL_pahrnO7A', # Task 2
    'DTU74fdft6c', # Task 3
    'VrnqkEQmT6I', # Task 4
    'jrtahTEucNg', # Task 5
    'eanlg4B4N_A', # Task 6
    'Rdj8M_grKKU', # Task 7
    'XdVcXvjn2Xs', # Task 8
    'fBD0jc_5XDA', # Task 9
    '6gkqXLjcL10', # Task 10
    'GMVq1S2bov4', # Task 11
    'AVxL9MGl0Z0', # Task 12
    'wdlVrBC_xLE', # Task 13
    '2PVxcYjNGvI', # Task 14
    'X7N1VXD6cHs', # Best Mics for Acoustic Guitar
    '2x3NJgdKGDY', # Mixing Drums & Bass
    'ZbOIpHBDTI8', # How to Mix a Band
    '4ZipvGWO2bQ', # Rock Kick Drum
]
output.append('<h2>1. Target: Component 1 Guide (Blog Post 297773 & Page 8604)</h2>\n')
output.append('<p><code>https://musictechguru.com/edexcel-music-technology-component-1-recording-guide/</code></p>\n')
output.append(build_section_card(
    'Component 1: Complete Whinging Tom 14-Task Multitrack Walkthrough & Mixing Masterclasses',
    'Follow every single task step-by-step from raw audio import and drum editing to vocal balance and master bus processing.',
    whinging_tom_ids
))

# 2. Component 2: Composition & Arranging
c2_ids = [
    'khY16VLIJMo', # Arrangement Basics
    'bmvqbb4cItg', # Arranging Lesson 1
    'rOmV20vRn3g', # Arranging Lesson 2
    'GhktkLKEyj8', # Arranging Lesson 3
    'Y-6iU3b6zJg', # Arranging Lesson 4
    '3XXiyfdljfE', # Remix Lesson 1
    '2lNLkOcGcLA', # Remix Lesson 2
    'UweQD2-0uQE', # Remix Lesson 3
    'LLDRmdQFuSM', # Remix Lesson 4
    'rRoW9DHo4VM', # Remix Lesson 5
    'McutLOQxzno', # Remix Lesson 6
    'KWppHE7ecew', # Comp 2019 Guide 1
    'AzGg_EGWmUA', # Comp 2019 Guide 2
    '3FOdzYCKJ0M', # Comp 2019 Guide 3
    'Sxw_TG6Xczw'  # Comp 2019 Guide 4
]
output.append('<h2>2. Target: Component 2 Composition Guide & Tick List (Page 297524 & Page 8632)</h2>\n')
output.append('<p><code>https://musictechguru.com/music-technology-component-2-composition-guide/</code></p>\n')
output.append(build_section_card(
    'Component 2: Composition, Arranging & Remixing Masterclasses',
    'Learn arrangement principles, MIDI sequencing, and complete commercial remix workflows using stock plugins.',
    c2_ids
))

# 3. Component 4: Production Exam
c4_ids = [
    'eI4k12bQGyY', # Full Marks in C4
    'vejjQ0Lurrk', # 2022 Exam
    'HscjlESnmsE', # 2020 Paper
    'MZb-bW6z5wI', # 2019 Guidance Q1
    '6Tb2auJ52xI', # Creative Audio Manipulation
    'NKQ3o8GuPuE', # Audio Manipulation Task 1
]
output.append('<h2>3. Target: Component 4 Exam Revision (Page 297654 & Page 13245)</h2>\n')
output.append('<p><code>https://musictechguru.com/edexcel-component-4-production-exam-revision/</code></p>\n')
output.append(build_section_card(
    'Component 4: Production & Analyzing Exam Masterclasses & Walkthroughs',
    'High-scoring techniques for the DAW practical exam, past paper step-by-steps, and audio manipulation secrets.',
    c4_ids
))

# 4. Logic Pro Masterclasses
logic_ids = [
    'uRa_OcpDSGE', # Parallel Compression
    'KZJJrtc0mRk', # Flex Editing
    '9Bj8mxZM2WQ', # Track Stacks
    'BD-M-40CMW8', # Q-Sampler
    'zA7ABulSO0c', # Extract and Slice a Loop
    'aLWklivuMmE', # Noise Gate
    'jvBmG0NwMpI', # Channel EQ
    'dY1Jmm8a3vU', # Flex Edit Like a Pro
    'pr0P-kIWqlE', # Logic Pro Drummer
    'ngK2vVBRsSU', # Insert Plugins
    'T3aMMpoz95Y', # Aux & Bus
    'PfPCYzpZnXo', # Reverb
]
output.append('<h2>4. Target: Free Music Production Tutorials (Page 10071 & Blog)</h2>\n')
output.append('<p><code>https://musictechguru.com/free-music-production-tutorials/</code></p>\n')
output.append(build_section_card(
    'Logic Pro Pro-Workflow Masterclasses & Essential Studio Techniques',
    'Deep dives into essential production tools: parallel compression, flex time, track stacks, quick sampler, and routing.',
    logic_ids
))

# 5. Synthesis & Sound Design
synth_ids = [
    'LUjKWcpvU6c', # Subtractive Synthesis Lesson 1
    'olkaItQbSZ4', # Synthesis Lesson 2
    'PTxVKjsXPOs', # Synthesis Lesson 3
    'n9DSjUVsEeg', # Drum Sampling Lesson 4
    'tBrkY4mQ_D4', # Retro Synth
    'bUI-YOzp9eU', # EXS24 Tricks
]
output.append('<h2>5. Target: Synthesis & Sampling (Page 8632 & Dictionary)</h2>\n')
output.append('<p><code>https://musictechguru.com/component-2-sequencing-sampling-synthesis-composition/</code></p>\n')
output.append(build_section_card(
    'Synthesis & Sampler Sound Design Masterclasses',
    'Step-by-step subtractive synthesis, envelope shaping, ADSR filtering, and software instruments.',
    synth_ids
))

output.append('\n</body>\n</html>')

with open('WORDPRESS_BLOG_EMBED_SECTIONS.html', 'w') as f:
    f.write(''.join(output))

print('Wrote WORDPRESS_BLOG_EMBED_SECTIONS.html')
