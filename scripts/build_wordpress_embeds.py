import json
import os

with open('scripts/data/music_tech_guru_videos.json') as f:
    videos = json.load(f)

print(f'Generating WordPress embeds for {len(videos)} videos...')

videos_json = json.dumps(videos)

# 1. Standalone Master Embed Block (all 141 videos)
html_master = f'''<!--
  MUSIC TECH GURU - MASTER WORDPRESS VIDEO EMBED BLOCK (ALL 141 VIDEOS)
  Site: https://musictechguru.com
  Usage:
  1. Open WordPress Admin > Pages or Posts
  2. Add a 'Custom HTML' block (Gutenberg) or HTML code widget (Elementor)
  3. Paste this entire code block into the post or page and click Update/Publish
-->
<div id="mtg-wp-video-hub">
  <style>
    #mtg-wp-video-hub {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #f8fafc;
      background: #0f172a;
      border-radius: 16px;
      padding: 30px 24px;
      margin: 30px auto;
      max-width: 1200px;
      box-sizing: border-box;
      box-shadow: 0 10px 35px rgba(0,0,0,0.35);
      line-height: 1.5;
    }}
    #mtg-wp-video-hub * {{
      box-sizing: border-box;
    }}
    .mtg-wp-header {{
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 14px;
      padding: 26px;
      margin-bottom: 24px;
    }}
    .mtg-wp-title {{
      font-size: 2rem;
      font-weight: 800;
      margin: 0 0 8px 0;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .mtg-wp-desc {{
      color: #94a3b8;
      font-size: 0.98rem;
      margin: 0 0 16px 0;
      max-width: 800px;
    }}
    .mtg-wp-stats-row {{
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }}
    .mtg-wp-stat-tag {{
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      color: #cbd5e1;
    }}
    .mtg-wp-stat-tag strong {{
      color: #38bdf8;
    }}
    .mtg-wp-player-wrapper {{
      background: #000;
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 26px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.5);
      display: none;
    }}
    .mtg-wp-player-wrapper.active {{
      display: block;
    }}
    .mtg-wp-iframe-box {{
      position: relative;
      padding-top: 56.25%;
      width: 100%;
    }}
    .mtg-wp-iframe-box iframe {{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }}
    .mtg-wp-player-meta {{
      padding: 16px 20px;
      background: #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }}
    .mtg-wp-player-meta h3 {{
      margin: 0;
      font-size: 1.2rem;
      color: #fff;
    }}
    .mtg-wp-close-btn {{
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #fff;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
    }}
    .mtg-wp-close-btn:hover {{
      background: rgba(239, 68, 68, 0.3);
      border-color: #ef4444;
    }}
    .mtg-wp-search-row {{
      margin-bottom: 20px;
    }}
    .mtg-wp-search-input {{
      width: 100%;
      padding: 12px 18px;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      color: #fff;
      font-size: 0.95rem;
      outline: none;
    }}
    .mtg-wp-search-input:focus {{
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }}
    .mtg-wp-tabs {{
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 12px;
      margin-bottom: 20px;
      scrollbar-width: thin;
    }}
    .mtg-wp-tab-btn {{
      white-space: nowrap;
      padding: 8px 16px;
      border-radius: 10px;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .mtg-wp-tab-btn:hover {{
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }}
    .mtg-wp-tab-btn.active {{
      background: #0284c7;
      border-color: #38bdf8;
      color: #fff;
    }}
    .mtg-wp-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 18px;
    }}
    .mtg-wp-card {{
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
    }}
    .mtg-wp-card:hover {{
      transform: translateY(-3px);
      border-color: #38bdf8;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }}
    .mtg-wp-thumb {{
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      background: #000;
    }}
    .mtg-wp-thumb img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }}
    .mtg-wp-play-icon {{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ff0000;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }}
    .mtg-wp-play-icon::after {{
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 11px solid #fff;
      margin-left: 2px;
    }}
    .mtg-wp-card-content {{
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justifyContent: space-between;
    }}
    .mtg-wp-card-cat {{
      font-size: 0.68rem;
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      margin-bottom: 4px;
    }}
    .mtg-wp-card-title {{
      font-size: 0.88rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 10px 0;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }}
    .mtg-wp-card-footer {{
      font-size: 0.75rem;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(255,255,255,0.06);
      padding-top: 8px;
    }}
  </style>

  <div class="mtg-wp-header">
    <h2 class="mtg-wp-title">
      <span>🎬</span> Music Tech Guru Video Masterclasses
    </h2>
    <p class="mtg-wp-desc">
      Complete video library from the official YouTube channel (@musictechguru). Master A-Level Music Technology (Components 1, 2, 3, &amp; 4), Logic Pro production workflows, synthesis, and classic track recreations.
    </p>
    <div class="mtg-wp-stats-row">
      <span class="mtg-wp-stat-tag">📺 <strong>141</strong> Total Videos</span>
      <span class="mtg-wp-stat-tag">🎚️ <strong>28</strong> Component 1</span>
      <span class="mtg-wp-stat-tag">🎹 <strong>16</strong> Component 2</span>
      <span class="mtg-wp-stat-tag">📝 <strong>8</strong> Component 4 &amp; Exams</span>
      <span class="mtg-wp-stat-tag">💻 <strong>22</strong> Logic Pro</span>
      <span class="mtg-wp-stat-tag">🔥 <strong>38</strong> Re-makes</span>
    </div>
  </div>

  <div id="mtg-player" class="mtg-wp-player-wrapper">
    <div class="mtg-wp-iframe-box">
      <iframe id="mtg-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="mtg-wp-player-meta">
      <h3 id="mtg-player-title">Now Playing</h3>
      <button class="mtg-wp-close-btn" onclick="mtgClosePlayer()">✕ Close Player</button>
    </div>
  </div>

  <div class="mtg-wp-search-row">
    <input type="text" id="mtg-search" class="mtg-wp-search-input" placeholder="🔍 Search 141 videos by keyword, title, technique, or component..." oninput="mtgFilterVideos()" />
  </div>

  <div class="mtg-wp-tabs" id="mtg-tabs-container">
    <button class="mtg-wp-tab-btn active" onclick="mtgSetCategory('all', this)">All Videos (141)</button>
    <button class="mtg-wp-tab-btn" onclick="mtgSetCategory('Component 1: Multitrack Recording & Mixing', this)">🎚️ Component 1 (28)</button>
    <button class="mtg-wp-tab-btn" onclick="mtgSetCategory('Component 2: Composition & Arrangement', this)">🎹 Component 2 (16)</button>
    <button class="mtg-wp-tab-btn" onclick="mtgSetCategory('Component 3 & 4: Exam Techniques & Past Papers', this)">📝 Component 4 &amp; Exams (8)</button>
    <button class="mtg-wp-tab-btn" onclick="mtgSetCategory('Logic Pro Masterclasses & Studio Techniques', this)">💻 Logic Pro (22)</button>
    <button class="mtg-wp-tab-btn" onclick="mtgSetCategory('Synthesis & Sound Design', this)">🎛️ Synthesis (7)</button>
    <button class="mtg-wp-tab-btn" onclick="mtgSetCategory('Song Breakdowns & Track Re-makes', this)">🔥 Track Re-makes (38)</button>
    <button class="mtg-wp-tab-btn" onclick="mtgSetCategory('Studio Archive & Heritage Productions', this)">📼 Studio Archive (16)</button>
  </div>

  <div class="mtg-wp-grid" id="mtg-videos-grid"></div>

  <script>
    (function() {{
      const allVideos = {videos_json};
      let currentCat = 'all';
      let currentQuery = '';

      window.mtgSetCategory = function(cat, btn) {{
        currentCat = cat;
        document.querySelectorAll('#mtg-wp-video-hub .mtg-wp-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mtgRender();
      }};

      window.mtgFilterVideos = function() {{
        currentQuery = (document.getElementById('mtg-search').value || '').toLowerCase().trim();
        mtgRender();
      }};

      window.mtgPlayVideo = function(id, title) {{
        const player = document.getElementById('mtg-player');
        const iframe = document.getElementById('mtg-iframe');
        const titleEl = document.getElementById('mtg-player-title');
        iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
        titleEl.textContent = title;
        player.classList.add('active');
        player.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
      }};

      window.mtgClosePlayer = function() {{
        const player = document.getElementById('mtg-player');
        const iframe = document.getElementById('mtg-iframe');
        iframe.src = '';
        player.classList.remove('active');
      }};

      function mtgRender() {{
        const grid = document.getElementById('mtg-videos-grid');
        const filtered = allVideos.filter(v => {{
          if (currentCat !== 'all' && v.category !== currentCat) return false;
          if (currentQuery) {{
            const matchesTitle = (v.title || '').toLowerCase().includes(currentQuery);
            const matchesRaw = (v.rawTitle || '').toLowerCase().includes(currentQuery);
            const matchesSeries = (v.series || '').toLowerCase().includes(currentQuery);
            const matchesTags = (v.tags || []).some(t => t.toLowerCase().includes(currentQuery));
            if (!matchesTitle && !matchesRaw && !matchesSeries && !matchesTags) return false;
          }}
          return true;
        }});

        if (filtered.length === 0) {{
          grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">No videos found matching your search.</div>';
          return;
        }}

        grid.innerHTML = filtered.map(v => `
          <div class="mtg-wp-card" onclick="mtgPlayVideo('${{v.id}}', '${{v.title.replace(/'/g, "\\\\'")}}')">
            <div class="mtg-wp-thumb">
              <img src="${{v.thumbnailUrl}}" alt="${{v.title}}" loading="lazy" />
              <div class="mtg-wp-play-icon"></div>
            </div>
            <div class="mtg-wp-card-content">
              <div>
                <div class="mtg-wp-card-cat">${{v.component || 'Tutorial'}}</div>
                <h4 class="mtg-wp-card-title">${{v.title}}</h4>
              </div>
              <div class="mtg-wp-card-footer">
                <span>${{v.series || v.category}}</span>
                <span style="color: #38bdf8; font-weight: bold;">▶ Watch</span>
              </div>
            </div>
          </div>
        `).join('');
      }}

      // Initial Render
      mtgRender();
    }})();
  </script>
</div>
'''

with open('wordpress-all-videos-embed.html', 'w') as f:
    f.write(html_master)

with open('public/wordpress-all-videos-embed.html', 'w') as f:
    f.write(html_master)

print('Wrote wordpress-all-videos-embed.html and public/wordpress-all-videos-embed.html')
