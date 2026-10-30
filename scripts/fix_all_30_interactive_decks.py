#!/usr/bin/env python3
"""
Comprehensive audit & fix script for all 30 interactive slide decks (public/interactive-slide-*.html):
1. Strips all doubled-up `yt-direct-btn` ("YouTube ↗") buttons.
2. Replaces duplicate YouTube video IDs within disco, metal, music-formats, and studio-effects.
3. Adds curated YouTube listening buttons & 1080p HD video modal to `the-electric-guitar` and `the-bass-guitar`.
4. Adds 1080p HD Theater Mode (`⛶ Watch in HD`) + `YouTube ↗` action bars to `amplifiers`, `classic-keyboards`, `music-formats`, and `studio-effects`.
5. Fixes squashed CSS rules across all deck architectures (Type A `.deck-wrapper`, Type B `.grid-2-split`, `metal`, `the-synthesizer`).
6. Replaces leftover "Classroom Slide X" references in `house.html` and `rock-n-roll.html` with strict Edexcel A-Level Music Technology (9MT0) terminology.
"""

import glob
import os
import re
import shutil

YT_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="#ef4444" style="vertical-align: -1px; margin-right: 3px;"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'

def make_video_btn_row(vid, title, label):
    safe_title = title.replace("'", "\\'")
    return (
        f'<div class="video-btn-row" style="display:flex; gap:8px; align-items:center; margin-top:10px; flex-wrap:wrap;">'
        f'<button class="video-trigger-btn" onclick="openVideo(\'{vid}\', \'{safe_title}\')" '
        f'style="display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:800; color:#080d1a; background:linear-gradient(135deg, #f59e0b, #fbbf24); border:0; padding:6px 12px; border-radius:6px; cursor:pointer;">'
        f'▶ {label}</button>'
        f'<a href="https://www.youtube.com/watch?v={vid}" target="_blank" rel="noopener noreferrer" class="yt-direct-btn" '
        f'style="display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:700; color:#fff !important; background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.45); padding:5px 10px; border-radius:6px; text-decoration:none;" '
        f'title="Watch directly on YouTube">{YT_SVG}YouTube ↗</a></div>'
    )

VIDEO_MODAL_INJECTION = """
  <!-- HD Theater Video Modal -->
  <div class="video-modal-backdrop" id="videoModal" onclick="if(event.target===this)closeVideo()" style="display:none; position:fixed; inset:0; width:100vw; height:100vh; background:rgba(2,6,23,0.92); backdrop-filter:blur(12px); z-index:99999; align-items:center; justify-content:center; padding:20px;">
    <div class="video-modal-content" style="width:100%; max-width:1200px; background:#0f172a; border:1px solid rgba(56,189,248,0.35); border-radius:16px; overflow:hidden; box-shadow:0 25px 70px rgba(0,0,0,0.95);">
      <div class="video-modal-header" style="padding:12px 18px; background:#090d16; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;">
        <span class="video-modal-title" id="videoModalTitle" style="font-size:14px; font-weight:800; color:#f8fafc;">HD Video Player</span>
        <div style="display:flex; align-items:center; gap:10px;">
          <a id="videoModalDirectLink" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style="font-size:12px; font-weight:700; color:#f8fafc; background:rgba(239,68,68,0.25); border:1px solid rgba(239,68,68,0.5); padding:5px 12px; border-radius:6px; text-decoration:none;">Open on YouTube ↗</a>
          <button onclick="closeVideo()" style="background:#ef4444; color:#fff; border:none; border-radius:6px; padding:5px 12px; font-size:12px; font-weight:800; cursor:pointer;">✕ Close (Esc)</button>
        </div>
      </div>
      <div class="video-player-wrapper" style="position:relative; width:100%; padding-bottom:56.25%; height:0; background:#000;"></div>
    </div>
  </div>
"""


def fix_doubled_yt_buttons(content):
    # Pattern where <a ... class="yt-direct-btn"...>...</a></div> is immediately followed by another <a ... class="yt-direct-btn"...>...</a>
    pattern = re.compile(
        r'(<a\s+href="https://www\.youtube\.com/watch\?v=[^"]+"[^>]*class="yt-direct-btn"[^>]*>.*?</a>\s*</div>)\s*<a\s+href="https://www\.youtube\.com/watch\?v=[^"]+"[^>]*class="yt-direct-btn"[^>]*>.*?</a>',
        re.DOTALL
    )
    content, count = pattern.subn(r'\1', content)
    return content, count


def fix_duplicate_videos(filepath, content):
    fname = os.path.basename(filepath)
    if fname == "interactive-slide-disco.html":
        # Replace second occurrence of yEbaeLv-aOo (Giorgio Moroder slide) with ViN2bRGrBx8 (Giorgio Moroder - Chase)
        target = """onclick="openVideo('yEbaeLv-aOo', 'Donna Summer - I Feel Love')">
              ▶ Listen: I Feel Love (Moog Bassline)
            </button><a href="https://www.youtube.com/watch?v=yEbaeLv-aOo\""""
        replacement = """onclick="openVideo('ViN2bRGrBx8', 'Giorgio Moroder - Chase (1978)')">
              ▶ Listen: Giorgio Moroder "Chase" (1978)
            </button><a href="https://www.youtube.com/watch?v=ViN2bRGrBx8\""""
        if target in content:
            content = content.replace(target, replacement, 1)
    elif fname == "interactive-slide-metal.html":
        # Replace second occurrence of E0ozmU9cJDg (V-Scoop Tone) with CD-E-LDc384 (Metallica - Enter Sandman)
        target = """onclick="openVideo('E0ozmU9cJDg', 'Metallica - Master of Puppets (V-Scoop Tone)')">
              <svg class="yt-svg" viewBox="0 0 24 24"><path fill="#ef4444" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span>▶ Listen: Metallica - "Master of Puppets" (Scooped Tone)</span>
            </button><a href="https://www.youtube.com/watch?v=E0ozmU9cJDg\""""
        replacement = """onclick="openVideo('CD-E-LDc384', 'Metallica - Enter Sandman (Quad-Tracked Guitar Wall)')">
              <svg class="yt-svg" viewBox="0 0 24 24"><path fill="#ef4444" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span>▶ Listen: Metallica - "Enter Sandman" (Quad-Tracked Wall)</span>
            </button><a href="https://www.youtube.com/watch?v=CD-E-LDc384\""""
        if target in content:
            content = content.replace(target, replacement, 1)
        # Also make yt-play-btn inside video-btn-row flex:1 instead of width:100% so buttons don't wrap awkwardly
        content = content.replace('class="yt-play-btn" style="margin-top: 0; width: 100%; justify-content: center;"', 'class="yt-play-btn" style="margin-top: 0; flex: 1; justify-content: center;"')
    elif fname == "interactive-slide-music-formats.html":
        # Replace second occurrence of D3XB3owN6qo on Slide 6 with 91BUM3WhCfo (Dolby Atmos)
        parts = content.split("youtube-nocookie.com/embed/D3XB3owN6qo")
        if len(parts) == 3:
            content = parts[0] + "youtube-nocookie.com/embed/D3XB3owN6qo" + parts[1] + "youtube-nocookie.com/embed/91BUM3WhCfo" + parts[2]
    elif fname == "interactive-slide-studio-effects.html":
        # Replace second occurrence of z9tg5ELAW7o on Slide 7 with FGBhQbmPwH8 (Daft Punk - One More Time)
        parts = content.split("youtube-nocookie.com/embed/z9tg5ELAW7o")
        if len(parts) == 3:
            content = parts[0] + "youtube-nocookie.com/embed/z9tg5ELAW7o" + parts[1] + "youtube-nocookie.com/embed/FGBhQbmPwH8" + parts[2]
    elif fname == "interactive-slide-house.html":
        # Fix shifted 90s House video IDs so each button plays the exact track named
        content = content.replace(
            """onclick="openVideo('6DnfjMbu-Pg', 'Crystal Waters - Gypsy Woman')">▶ Watch Video</button><a href="https://www.youtube.com/watch?v=6DnfjMbu-Pg\"""",
            """onclick="openVideo('_KztNIg4cvE', 'Crystal Waters - Gypsy Woman')">▶ Watch Video</button><a href="https://www.youtube.com/watch?v=_KztNIg4cvE\""""
        )
        content = content.replace(
            """onclick="openVideo('Ps2Jc28tQrw', 'EBTG - Missing (Todd Terry Remix)')">▶ Watch Video</button><a href="https://www.youtube.com/watch?v=Ps2Jc28tQrw\"""",
            """onclick="openVideo('IAkY5m00rpY', 'EBTG - Missing (Todd Terry Remix)')">▶ Watch Video</button><a href="https://www.youtube.com/watch?v=IAkY5m00rpY\""""
        )
        content = content.replace(
            """onclick="openVideo('xk8mm1Qmt-Y', 'Robin S - Show Me Love')">▶ Watch Video</button><a href="https://www.youtube.com/watch?v=xk8mm1Qmt-Y\"""",
            """onclick="openVideo('Ps2Jc28tQrw', 'Robin S - Show Me Love')">▶ Watch Video</button><a href="https://www.youtube.com/watch?v=Ps2Jc28tQrw\""""
        )
        content = content.replace(
            """onclick="openVideo('F6qOzxTkLOE', 'CeCe Peniston - Finally')">▶ Watch Video</button><a href="https://www.youtube.com/watch?v=F6qOzxTkLOE\"""",
            """onclick="openVideo('xk8mm1Qmt-Y', 'CeCe Peniston - Finally')">▶ Watch Video</button><a href="https://www.youtube.com/watch?v=xk8mm1Qmt-Y\""""
        )
    elif fname == "interactive-slide-rock-n-roll.html":
        # Fix Brenda Lee vs Little Richard video IDs
        content = content.replace(
            """onclick="openVideo('F13JNjpNW6c', 'Brenda Lee - Sweet Nothin\\'s')">
                ▶ Listen
              </button><a href="https://www.youtube.com/watch?v=F13JNjpNW6c\"""",
            """onclick="openVideo('KWgyum5fjJc', 'Brenda Lee - Sweet Nothin\\'s')">
                ▶ Listen
              </button><a href="https://www.youtube.com/watch?v=KWgyum5fjJc\""""
        )
        content = content.replace(
            """onclick="openVideo('DCP_g7X31nI', 'Little Richard - Tutti Frutti')">
                ▶ Listen
              </button><a href="https://www.youtube.com/watch?v=DCP_g7X31nI\"""",
            """onclick="openVideo('F13JNjpNW6c', 'Little Richard - Tutti Frutti')">
                ▶ Listen
              </button><a href="https://www.youtube.com/watch?v=F13JNjpNW6c\""""
        )
    return content


def enrich_guitar_and_bass_decks(filepath, content):
    fname = os.path.basename(filepath)
    if fname == "interactive-slide-the-electric-guitar.html":
        if "openVideo('bSfqNEvykv0'" not in content:
            injections = [
                ("<h4>Les Paul's \"The Log\" (1940)</h4>\n               <p>Guitarist Les Paul mounted a Gibson neck and handmade pickup onto a solid 4x4-inch pine timber block, gluing archtop wings to the sides for aesthetics. It proved solid wood eliminated acoustic feedback.</p>",
                 make_video_btn_row("glcTS_21uaY", "Les Paul & Mary Ford - How High the Moon", "Listen: Les Paul")),
                ("<h4>The Rock &amp; Roll Sound</h4>\n               <p>Heard on Muddy Waters blues tracks, Keith Richards' open-G Rolling Stones riffs (*Honky Tonk Women*), Bruce Springsteen, and Joe Strummer (*The Clash* punk rhythm tracks).</p>",
                 make_video_btn_row("bSfqNEvykv0", "Muddy Waters - Mannish Boy (Fender Telecaster)", "Listen: Telecaster Blues")),
                ("<h4>The Gibson SG Redesign (1961)</h4>\n               <p>To reduce manufacturing weight and compete with the Stratocaster, Gibson released the double-cutaway \"Solid Guitar\" (SG) with thin mahogany body and unobstructed 22nd-fret neck access.</p>",
                 make_video_btn_row("m9N8Qi6zLSU", "Eric Clapton & John Mayall - All Your Love (Les Paul PAF)", "Listen: Les Paul PAF")),
                ("<h4>Hendrix, Clapton &amp; Gilmour</h4>\n               <p>Hendrix (*Voodoo Child*, *Little Wing*), David Gilmour (*Comfortably Numb*), and Stevie Ray Vaughan used the Stratocaster's double cutaways, vibrato arm, and pickup selector to define modern guitar.</p>",
                 make_video_btn_row("qFfnlYbFEiE", "Jimi Hendrix - Voodoo Child (Slight Return)", "Listen: Hendrix Strat")),
                ("<h4>Rickenbacker 360/12 (1964)</h4>\n               <p>Paired 6 standard strings with 6 higher octave strings. Delivered the bright, shimmering, jangly 1960s pop sound defining The Beatles (*A Hard Day's Night*), The Byrds, and Tom Petty.</p>",
                 make_video_btn_row("W4ga_M5Zdn4", "The Byrds - Turn! Turn! Turn! (Rickenbacker 360/12)", "Listen: 12-String Jangle")),
                ("<h4>The \"Frankenstrat\" (1977)</h4>\n               <p>Eddie Van Halen married a Fender Stratocaster body with a slanted Gibson PAF humbucker. Blended Fender's ergonomic tremolo feel with the thick, high-gain overdrive of a Gibson humbucker.</p>",
                 make_video_btn_row("M4Czx8EWXb0", "Eddie Van Halen - Eruption (Frankenstrat)", "Listen: EVH Eruption")),
            ]
            for target, btn_html in injections:
                if target in content:
                    content = content.replace(target, target + "\n               " + btn_html, 1)
        if 'id="videoModal"' not in content:
            content = content.replace("</body>", VIDEO_MODAL_INJECTION + "\n</body>")

    elif fname == "interactive-slide-the-bass-guitar.html":
        if "openVideo('H-kA3UtBj4M'" not in content:
            injections = [
                ("<h4>James Jamerson &amp; \"The Funk Machine\"</h4>\n               <p>Using his 1962 P-Bass with heavy La Bella flatwound strings and one finger (\"The Hook\"), Jamerson recorded virtually every legendary Motown hit (The Temptations, Marvin Gaye, Stevie Wonder).</p>",
                 make_video_btn_row("H-kA3UtBj4M", "Marvin Gaye - What's Going On (James Jamerson P-Bass)", "Listen: Jamerson P-Bass")),
                ("<h4>Jaco Pastorius &amp; Bridge Pickup Growl</h4>\n               <p>Soloing on his fretless 1962 Jazz Bass, Jaco favoured the bridge pickup with tone rolled back slightly, producing an unmistakable vocal midrange bark with Weather Report (*Birdland*).</p>",
                 make_video_btn_row("8buRBt_138w", "Herbie Hancock - Chameleon (Funk/Fusion Bass)", "Listen: Jazz/Fusion Bass")),
                ("<h4>Paul McCartney &amp; Abbey Road</h4>\n               <p>McCartney bought a symmetrical left-handed H&#246;fner in Hamburg in 1961. Paired with flatwound strings, it gave early Beatles hits (*She Loves You*, *All My Loving*) a woody, melodic bounce.</p>",
                 make_video_btn_row("jenWdylTtzs", "The Beatles - I Want To Hold Your Hand (Hofner 500/1)", "Listen: McCartney Höfner")),
                ("<h4>John Entwistle &amp; Rotosound Strings</h4>\n               <p>The Who's John Entwistle worked with Rotosound to invent steel roundwound strings (Swing Bass 66), transforming bass from quiet rhythm support into a clattering, overdriven lead instrument.</p>",
                 make_video_btn_row("UDfAdHBtK_Q", "The Who - Won't Get Fooled Again (Entwistle Bass)", "Listen: Entwistle Bass")),
                ("<h4>Bernard Edwards &amp; Flea</h4>\n               <p>The StingRay's crisp attack defined disco grooves (Bernard Edwards with Chic, *Good Times*) and explosive 1990s alternative funk-rock (Flea with Red Hot Chili Peppers, *Give It Away*).</p>",
                 make_video_btn_row("Mr_uHJPUlO8", "Red Hot Chili Peppers - Give It Away (Flea StingRay)", "Listen: StingRay Bass")),
                ("<h4>Larry Graham (Sly &amp; Family Stone)</h4>\n               <p>Invented the technique when Sly and the Family Stone lacked a drummer. The percussive slap &amp; pop approach revolutionized funk, disco, R&amp;B, and fusion basslines.</p>",
                 make_video_btn_row("-T9vmaTI2LE", "Sly & The Family Stone - Thank You (Larry Graham Slap Bass)", "Listen: Larry Graham Slap")),
            ]
            for target, btn_html in injections:
                if target in content:
                    content = content.replace(target, target + "\n               " + btn_html, 1)
        if 'id="videoModal"' not in content:
            content = content.replace("</body>", VIDEO_MODAL_INJECTION + "\n</body>")

    return content


def add_hd_theater_to_split_decks(filepath, content):
    fname = os.path.basename(filepath)
    if fname not in ("interactive-slide-amplifiers.html", "interactive-slide-classic-keyboards.html", "interactive-slide-music-formats.html", "interactive-slide-studio-effects.html"):
        return content

    # Ensure vq=hd1080 on all youtube-nocookie embeds
    content = re.sub(
        r'(youtube-nocookie\.com/embed/[a-zA-Z0-9_-]{11}\?rel=0&modestbranding=1)(?!&vq=hd1080)',
        r'\1&vq=hd1080',
        content
    )

    # Add video-actions-bar right after each .card-video-embed or .video-container if not already present
    if "video-actions-bar" not in content:
        def repl_embed(match):
            block = match.group(0)
            vid_m = re.search(r'youtube-nocookie\.com/embed/([a-zA-Z0-9_-]{11})', block)
            title_m = re.search(r'title="([^"]+)"', block)
            if not vid_m:
                return block
            vid = vid_m.group(1)
            title = (title_m.group(1) if title_m else "HD Video Example").replace("'", "\\'").replace("&bull;", "•")
            bar = (
                f'\n          <div class="video-actions-bar" style="display:flex; gap:8px; align-items:center; justify-content:space-between; margin-top:4px; margin-bottom:8px; flex-shrink:0;">'
                f'<button onclick="openVideo(\'{vid}\', \'{title}\')" style="flex:1; display:inline-flex; align-items:center; justify-content:center; gap:6px; font-size:11.5px; font-weight:800; color:#f8fafc; background:linear-gradient(135deg, rgba(56,189,248,0.22), rgba(99,102,241,0.22)); border:1px solid rgba(56,189,248,0.45); padding:5px 10px; border-radius:6px; cursor:pointer;">⛶ Watch in HD (Theater Mode)</button>'
                f'<a href="https://www.youtube.com/watch?v={vid}" target="_blank" rel="noopener noreferrer" class="yt-direct-btn" style="display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:700; color:#fff !important; background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.45); padding:5px 10px; border-radius:6px; text-decoration:none;">{YT_SVG}YouTube ↗</a>'
                f'</div>'
            )
            return block + bar

        content = re.sub(
            r'<div class="(?:card-video-embed|video-container)">\s*<iframe[^>]+></iframe>\s*</div>',
            repl_embed,
            content,
            flags=re.DOTALL
        )

    if 'id="videoModal"' not in content:
        content = content.replace("</body>", VIDEO_MODAL_INJECTION + "\n</body>")

    return content


def clean_non_alevel_phrasing(filepath, content):
    fname = os.path.basename(filepath)
    if fname == "interactive-slide-house.html":
        replacements = [
            ("Classroom Slide 2 &bull; The Landmark Blueprint", "Edexcel Component 3 &bull; AO4 Historical Context"),
            ("Classroom Slide Note:", "Edexcel Specification Note:"),
            ("Classroom Slides 3 &amp; 4 &bull; 1977–1979", "Edexcel Component 3 &bull; Disco to House Transition (1977–1979)"),
            ("Classroom Slide 5 &bull; The Godfather of House", "Edexcel Component 3 &bull; Chicago Pioneers"),
            ("Classroom Slide 6 &bull; The House Music Anthem", "Edexcel Component 3 &bull; Piano House &amp; Deep House"),
            ("Classroom Slide 7 &bull; The TB-303 Revolution", "Edexcel Component 3 &bull; AO3 Subtractive Synthesis &amp; Acid House"),
            ("Classroom Slide 8 &bull; Chicago Trailblazers", "Edexcel Component 3 &bull; Early Chicago Releases"),
            ("The essential Chicago pioneers highlighted in the classroom slide deck who built the infrastructure of house music.", "The essential Chicago pioneers whose early drum-machine and tape-splice productions built the foundation of house music."),
            ("Classroom Slide 10 &bull; 1991–1993 Chart Domination", "Edexcel Component 3 &bull; 1990s Mainstream Crossover"),
            ("Classroom Slide 11 &bull; 1995–1999 Remix Culture &amp; Subgenres", "Edexcel Component 3 &bull; 1995–1999 Subgenre Evolution"),
            ("As highlighted in Slide 11 of the presentation, the late 1990s saw house fragment into distinctive, powerful subgenres.", "By the late 1990s, house production fragmented into distinctive subgenres driven by digital sampling, time-stretching, and club sound systems."),
            ("Classroom Slide 12 &bull; French Filter Touch", "Edexcel Component 3 &bull; AO3 French House &amp; Filter Compression"),
            ("As highlighted in Slide 12 of the classroom deck, Daft Punk delved deep into 1970s and 1980s disco records, turning micro-samples into massive 21st-century anthems.", "Daft Punk sampled 1970s and 1980s disco records into hardware samplers, using resonant filter sweeps and sidechain compression to forge French Touch."),
            ("Classroom Slides 13 &amp; 16 &bull; Hardware Archive", "Edexcel Component 3 &bull; AO3 Drum Machines &amp; Digital Samplers"),
            ("The core hardware units specified in Slides 13 and 16 of the presentation that provided the rhythmic backbone of House.", "The core drum machines and digital hardware samplers required for Edexcel Component 3 production analysis."),
            ('<span class="spec-pill ao3">Slide 13: Drum Machines</span>', '<span class="spec-pill ao3">AO3 Drum Machines</span>'),
            ('<span class="spec-pill ao3">Slide 16: Samplers</span>', '<span class="spec-pill ao3">AO3 Digital Samplers</span>'),
            ("Classroom Slides 14 &amp; 15 &bull; Synthesis Archive", "Edexcel Component 3 &bull; AO3 Analog &amp; Digital Synthesis"),
            ("The synthesizers detailed in Slides 14 and 15 that defined basslines, chords, and leads across the history of House.", "The essential analog subtractive, FM, and PCM workstation synthesizers that defined House basslines, chords, and leads."),
            ('<span class="spec-pill ao3">Slide 14: Analog Synths</span>', '<span class="spec-pill ao3">AO3 Analog Subtractive</span>'),
            ('<span class="spec-pill ao3">Slide 15: Digital Workstations</span>', '<span class="spec-pill ao3">AO3 Digital FM &amp; PCM</span>'),
            ("Classroom Slides 17 &amp; 18 &bull; Recording &amp; Processing", "Edexcel Component 3 &bull; AO3 MIDI Sequencing &amp; Outboard FX"),
            ('<span class="spec-pill ao3">Slide 17: Sequencers &amp; Tape</span>', '<span class="spec-pill ao3">AO3 MIDI &amp; Tape Sync</span>'),
            ('<span class="spec-pill ao3">Slide 18: Outboard Effects Units</span>', '<span class="spec-pill ao3">AO3 Digital Reverbs &amp; FX</span>'),
            ("Classroom Slide 19 &bull; Definitive Specification Checklist", "Edexcel Component 3 &bull; AO3/AO4 Stylistic &amp; Technical Checklist"),
            ("The Characteristics of <span>House Music (Slide 19)</span>", "The 18 Characteristics of <span>House Music Production</span>"),
            ("The Characteristics of House Music (Slide 19)", "The 18 Characteristics of House Music Production"),
            ("The complete, definitive 18-point stylistic checklist straight from Slide 19 of the presentation.", "The complete 18-point sonic, rhythmic, and technological checklist for Edexcel Component 3 listening analysis."),
            ("Classroom Slide 21 &bull; Practical Production Task", "Edexcel Component 2 &amp; 3 &bull; Applied Production Synthesis"),
            ("As instructed in Slide 21 of the classroom presentation, apply your knowledge to construct an authentic 16-bar house track meeting every stylistic criterion.", "Apply Component 3 production techniques (TR-909 programming, 16th-note swing quantisation, M1 piano/organ layers, and resonant filter sweeps) in your DAW."),
            ("Now test your mastery of this classroom deck with the 12-question Edexcel specification quiz.", "Now test your mastery of House production and Edexcel Component 3 with the 12-question specification quiz.")
        ]
        for old, new in replacements:
            content = content.replace(old, new)

    elif fname == "interactive-slide-rock-n-roll.html":
        content = content.replace("Rock 'n' Roll Classroom Slide Deck", "1950s Rock 'n' Roll • Edexcel Component 3 Master Deck")
        content = content.replace('<option value="3">4. Post-War Culture & The Teenager</option>', '<option value="3">4. 45 RPM Singles, Transistor Radios & Youth Market</option>')
        content = content.replace('<div class="slide-eyebrow">Cultural Phenomenon • Post-War 1950s</div>', '<div class="slide-eyebrow">AO4 Consumer Formats &amp; Cultural Context • 1950s</div>')
        content = content.replace('<h2 class="slide-heading">The Invention of the <span>"Teenager"</span></h2>', '<h2 class="slide-heading">Consumer Audio Formats &amp; <span>The 1950s Youth Market</span></h2>')

    return content


def apply_un_squashed_css_overrides(filepath, content):
    fname = os.path.basename(filepath)
    # Remove any previous/* Anti-Squash Layout Overrides */ block if re-running
    content = re.sub(r'/\* === ANTI-SQUASH LAYOUT OVERRIDES === \*/.*?/\* === END ANTI-SQUASH === \*/\s*', '', content, flags=re.DOTALL)

    # Determine architecture
    is_c1_c2 = fname in ("interactive-slide-component-1.html", "interactive-slide-component-2.html")
    is_grid2_split = 'class="grid-2-split"' in content
    is_metal = (fname == "interactive-slide-metal.html")
    is_synth = (fname == "interactive-slide-the-synthesizer.html")

    common_topbar_and_btn_css = """
    .deck-topbar-controls {
      width: 100% !important;
      box-sizing: border-box !important;
    }
    #bottomFsBtn {
      background: rgba(255, 255, 255, 0.06) !important;
      border: 1px solid rgba(255, 255, 255, 0.14) !important;
      color: #f8fafc !important;
      padding: 7px 14px !important;
      border-radius: 8px !important;
      font-size: 12.5px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      transition: all 0.2s ease !important;
    }
    #bottomFsBtn:hover {
      background: rgba(255, 255, 255, 0.12) !important;
      border-color: rgba(255, 255, 255, 0.28) !important;
    }
"""
    if fname in ("interactive-slide-amplifiers.html", "interactive-slide-metal.html"):
        common_topbar_and_btn_css += """
    #bottomFsBtn {
      display: none !important;
    }
"""

    if is_c1_c2:
        override_css = ""
    elif is_grid2_split:
        override_css = """
    /* === ANTI-SQUASH LAYOUT OVERRIDES === */""" + common_topbar_and_btn_css + """
    .deck-container {
      max-width: 1520px !important;
      padding: 10px 20px 0 !important;
    }
    .slide-header {
      margin-bottom: 10px !important;
      padding-bottom: 8px !important;
    }
    .slide-heading {
      font-size: clamp(20px, 2.2vw, 26px) !important;
      margin-bottom: 4px !important;
      line-height: 1.2 !important;
    }
    .slide-lead {
      font-size: 13px !important;
      line-height: 1.45 !important;
      margin-bottom: 2px !important;
      display: block !important;
      -webkit-line-clamp: unset !important;
      overflow: visible !important;
    }
    .grid-2-split {
      gap: 16px !important;
      margin-bottom: 54px !important;
    }
    .column-panel {
      padding: 14px 16px !important;
    }
    /* Fix squashed hardware and instrument photos */
    .hardware-photo {
      height: clamp(165px, 21vh, 220px) !important;
      margin-bottom: 10px !important;
      flex-shrink: 0 !important;
      background: #020617 !important;
    }
    .hardware-photo img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      padding: 6px !important;
    }
    /* In amplifiers & classic-keyboards, prevent .instrument-photo-card from clipping captions */
    .instrument-photo-card {
      height: auto !important;
      min-height: 180px !important;
      max-height: none !important;
      margin-bottom: 10px !important;
      flex-shrink: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      background: #020617 !important;
    }
    .instrument-photo-card img.instrument-photo {
      width: 100% !important;
      height: clamp(165px, 21vh, 215px) !important;
      object-fit: contain !important;
      background: #020617 !important;
      padding: 6px !important;
      display: block !important;
    }
    .instrument-photo-caption {
      position: relative !important;
      background: rgba(9, 13, 22, 0.95) !important;
      padding: 8px 12px !important;
      border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
    }
    .card-video-embed, .video-container {
      padding-bottom: 56.25% !important;
      height: 0 !important;
      margin-bottom: 4px !important;
      flex-shrink: 0 !important;
    }
    /* === END ANTI-SQUASH === */
"""
    elif is_metal:
        override_css = """
    /* === ANTI-SQUASH LAYOUT OVERRIDES === */""" + common_topbar_and_btn_css + """
    #deckContainer.deck-container {
      width: calc(100% - 24px) !important;
      max-width: 1320px !important;
      flex: 1 !important;
      min-height: 0 !important;
      max-height: none !important;
      height: auto !important;
      margin: 8px auto 10px auto !important;
      padding: 0 !important;
    }
    .slide-stage {
      flex: 1 !important;
      min-height: 0 !important;
      position: relative !important;
      overflow: hidden !important;
    }
    .slide {
      padding: 22px 34px !important;
      justify-content: flex-start !important;
      gap: 14px !important;
      overflow-y: auto !important;
    }
    .slide-title {
      font-size: clamp(22px, 2.6vw, 30px) !important;
      margin-bottom: 10px !important;
      line-height: 1.2 !important;
    }
    .text-body {
      font-size: 14px !important;
      line-height: 1.55 !important;
      margin-bottom: 14px !important;
    }
    .image-frame {
      height: 245px !important;
      max-height: 265px !important;
    }
    .bottom-bar {
      position: relative !important;
      bottom: auto !important;
      left: auto !important;
      right: auto !important;
      height: auto !important;
      padding: 10px 24px !important;
      flex-shrink: 0 !important;
    }
    /* === END ANTI-SQUASH === */
"""
    elif is_synth:
        override_css = """
    /* === ANTI-SQUASH LAYOUT OVERRIDES === */""" + common_topbar_and_btn_css + """
    .deck-container {
      max-width: 1360px !important;
      margin: 0 auto !important;
      padding: 14px 24px 0 !important;
      width: 100% !important;
      flex: 1 !important;
      min-height: 0 !important;
      overflow: hidden !important;
    }
    .slide.active {
      display: flex !important;
      flex-direction: column !important;
      height: 100% !important;
      overflow-y: auto !important;
      padding-bottom: 68px !important;
    }
    .slide-heading {
      font-size: clamp(21px, 2.5vw, 28px) !important;
      margin-bottom: 6px !important;
      line-height: 1.2 !important;
    }
    .slide-lead {
      font-size: 13.5px !important;
      line-height: 1.5 !important;
      margin-bottom: 16px !important;
      display: block !important;
      -webkit-line-clamp: unset !important;
      overflow: visible !important;
      flex-shrink: 0 !important;
    }
    .grid-3 {
      gap: 16px !important;
    }
    /* === END ANTI-SQUASH === */
"""
    else:
        # All 21 .deck-wrapper card decks (Cat 1 & Cat 2)
        override_css = """
    /* === ANTI-SQUASH LAYOUT OVERRIDES === */""" + common_topbar_and_btn_css + """
    .deck-wrapper {
      width: calc(100% - 24px) !important;
      max-width: 1340px !important;
      flex: 1 !important;
      min-height: 0 !important;
      max-height: none !important;
      height: auto !important;
      margin: 8px auto 10px auto !important;
    }
    .slides-viewport {
      flex: 1 !important;
      min-height: 0 !important;
      position: relative !important;
      overflow: hidden !important;
    }
    .slide-stage {
      flex: 1 !important;
      min-height: 0 !important;
      position: relative !important;
      overflow-y: auto !important;
      padding: 22px 34px 24px 34px !important;
      display: block !important;
      justify-content: flex-start !important;
    }
    .slides-viewport > .slide {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      padding: 20px 32px 24px 32px !important;
      overflow-y: auto !important;
      justify-content: flex-start !important;
    }
    .slide-stage > .slide,
    .slide-stage > .slide.active {
      height: auto !important;
      overflow: visible !important;
    }
    .slide-stage > .slide.active {
      display: block !important;
    }
    .slide-eyebrow {
      margin-bottom: 6px !important;
      flex-shrink: 0 !important;
    }
    .slide-heading {
      font-size: clamp(21px, 2.5vw, 28px) !important;
      margin-bottom: 8px !important;
      line-height: 1.2 !important;
      flex-shrink: 0 !important;
    }
    .slide-lead {
      font-size: 13.5px !important;
      line-height: 1.55 !important;
      margin-bottom: 16px !important;
      display: block !important;
      -webkit-line-clamp: unset !important;
      overflow: visible !important;
      flex-shrink: 0 !important;
    }
    .deck-controls, .deck-bottombar, .deck-footer {
      flex-shrink: 0 !important;
    }
    /* === END ANTI-SQUASH === */
"""

    content = re.sub(r'<script>window\.__initialHash = window\.location\.hash;[^<]*</script>\s*', '', content)
    content = content.replace("</style>", override_css + "\n</style>\n<script>window.__initialHash = window.location.hash; window.__initialSearch = window.location.search;</script>", 1)

    # Eliminate static <iframe id="videoIframe" src=""> or <iframe id="videoModalIframe" src=""> from initial HTML so src="" never pollutes browser history
    content = re.sub(
        r'<iframe[^>]*id=["\'](?:videoIframe|videoModalIframe)["\'][^>]*>\s*</iframe>',
        '<div class="video-player-wrapper" style="position:absolute; inset:0; width:100%; height:100%; background:#000;"></div>',
        content,
        flags=re.IGNORECASE
    )

    # Fix stopAllVideos() in component-1 and component-2 so it uses YouTube postMessage instead of iframe.setAttribute('src', src)
    content = content.replace(
        "if (src) iframe.setAttribute('src', src);",
        "try { iframe.contentWindow.postMessage('{\"event\":\"command\",\"func\":\"pauseVideo\",\"args\":\"\"}', '*'); } catch (err) {}"
    )

    # Guard existing window.history.replaceState calls so embedded decks inside WordPress iframes never touch window.history
    content = content.replace(
        "if (window.history && window.history.replaceState)",
        "if (window.self === window.top && window.history && window.history.replaceState)"
    )

    # Also ensure #slide-N hash deep-linking + Universal zero-history openVideo/closeVideo + restored deck nav work across all decks
    content = re.sub(r'<!-- === HASH DEEP LINK === -->.*?<!-- === END HASH DEEP LINK === -->\s*', '', content, flags=re.DOTALL)
    hash_script = r"""<!-- === HASH DEEP LINK === -->
<script>
  // Restore deck navigation if missing in recording era decks
  if (typeof nextSlide !== 'function' && typeof changeSlide !== 'function' && typeof showSlide !== 'function') {
    window.updateDeck = function() {
      var sList = document.querySelectorAll('.slide');
      var total = sList.length;
      if (!total) return;
      if (typeof currentSlide === 'undefined') window.currentSlide = 0;
      sList.forEach(function(sl, idx) {
        sl.classList.toggle('active', idx === currentSlide);
      });
      if (window.self === window.top && window.history && window.history.replaceState) {
        window.history.replaceState({ slide: currentSlide }, '', '#slide-' + (currentSlide + 1));
      }
      var pBtn = document.getElementById('prevBtn');
      var nBtn = document.getElementById('nextBtn');
      var sCnt = document.getElementById('slideCounter');
      var pFill = document.getElementById('progressFill');
      if (pBtn) pBtn.disabled = (currentSlide === 0);
      if (nBtn) nBtn.disabled = (currentSlide === total - 1);
      if (sCnt) sCnt.textContent = 'Slide ' + (currentSlide + 1) + ' of ' + total;
      if (pFill) pFill.style.width = (((currentSlide + 1) / total) * 100) + '%';
    };
    window.nextSlide = function() {
      var total = document.querySelectorAll('.slide').length;
      if (currentSlide < total - 1) {
        currentSlide++;
        window.updateDeck();
      }
    };
    window.prevSlide = function() {
      if (currentSlide > 0) {
        currentSlide--;
        window.updateDeck();
      }
    };
    document.addEventListener('keydown', function(e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) return;
      var vm = document.getElementById('videoModal') || document.getElementById('videoModalBackdrop');
      if (vm && vm.classList.contains('open')) {
        if (e.key === 'Escape') window.closeVideo();
        return;
      }
      var im = document.getElementById('imageModal');
      if (im && im.classList.contains('open')) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        window.nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        window.prevSlide();
      }
    });
    window.updateDeck();
  }

  // Universal zero-history openVideo / closeVideo across all 30 decks (never mutates .src on an attached iframe)
  window.openVideo = function(videoId, title) {
    if (!videoId) return;
    var cleanId = String(videoId).trim();
    var modal = document.getElementById('videoModal') || document.getElementById('videoModalBackdrop');
    if (!modal) {
      window.open('https://www.youtube.com/watch?v=' + cleanId, '_blank', 'noopener,noreferrer');
      return;
    }

    // Pause any inline slide videos if stopAllVideos exists
    if (typeof stopAllVideos === 'function') {
      try { stopAllVideos(); } catch (err) {}
    }

    var watchUrl = 'https://www.youtube.com/watch?v=' + cleanId;
    var embedUrl = 'https://www.youtube-nocookie.com/embed/' + cleanId + '?autoplay=1&rel=0&modestbranding=1&vq=hd1080&playsinline=1&enablejsapi=1';

    // Update modal title
    var titleTextEl = document.getElementById('videoModalTitleText');
    var titleEl = document.getElementById('videoModalTitle');
    if (titleTextEl) {
      titleTextEl.textContent = title || 'HD Video Example';
    } else if (titleEl) {
      titleEl.textContent = title || 'HD Video Example';
    }

    // Update all external YouTube links inside the modal
    ['videoExternalLink', 'videoModalExternalLink', 'videoModalDirectLink', 'videoFooterLink', 'videoModalFooterLink', 'videoModalFallbackLink'].forEach(function(linkId) {
      var a = document.getElementById(linkId);
      if (a) a.href = watchUrl;
    });

    // Always create a fresh <iframe> inside wrapper (never mutating .src on an attached iframe, so window.history is untouched)
    var wrapper = modal.querySelector('.video-player-wrapper') || document.getElementById('videoPlayerWrapper');
    if (wrapper) {
      wrapper.innerHTML = '<iframe id="videoIframe" referrerpolicy="strict-origin-when-cross-origin" src="' + embedUrl + '" title="' + (title || 'YouTube Video').replace(/"/g, '&quot;') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute; inset:0; width:100%; height:100%; border:0; display:block;"></iframe>';
    }

    modal.classList.add('open');
    modal.style.display = 'flex';
  };

  window.closeVideo = function() {
    var modal = document.getElementById('videoModal') || document.getElementById('videoModalBackdrop');
    if (!modal) return;
    modal.classList.remove('open');
    modal.style.display = 'none';
    var wrappers = modal.querySelectorAll('.video-player-wrapper, #videoPlayerWrapper');
    for (var i = 0; i < wrappers.length; i++) {
      wrappers[i].innerHTML = '';
    }
    var iframes = modal.querySelectorAll('iframe');
    for (var j = 0; j < iframes.length; j++) {
      iframes[j].remove();
    }
  };
  window.closeVideoModal = window.closeVideo;

  // Smart exitDeck handler that respects fullscreen, embedded iframes, and browser back history
  window.exitDeck = function() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(function() {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      return;
    }
    var fallbackUrl = 'https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/';
    if (window.location.pathname.indexOf('component-1') !== -1) {
      fallbackUrl = 'https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/';
    } else if (window.location.pathname.indexOf('component-2') !== -1) {
      fallbackUrl = 'https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/';
    } else if (window.location.pathname.indexOf('component-4') !== -1) {
      fallbackUrl = 'https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/';
    }
    if (window.self !== window.top) {
      try {
        if (window.top.history.length > 1) {
          window.top.history.back();
        } else {
          window.top.location.href = fallbackUrl;
        }
      } catch (e) {
        window.top.location.href = fallbackUrl;
      }
      return;
    }
    if (window.opener) {
      window.close();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = fallbackUrl;
    }
  };

  window.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('videoModal') || document.getElementById('videoModalBackdrop');
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) window.closeVideo();
      });
    }
    var h = window.__initialHash || window.location.hash || '';
    var m = h.match(/^#slide-(\d+)$/i);
    if (m) {
      var targetIdx = parseInt(m[1], 10) - 1;
      if (targetIdx > 0) {
        setTimeout(function() {
          if (typeof goToSlide === 'function') {
            goToSlide(targetIdx);
          } else if (typeof jumpToSlide === 'function') {
            jumpToSlide(targetIdx);
          } else if (typeof showSlide === 'function') {
            showSlide(targetIdx);
          } else if (typeof nextSlide === 'function') {
            for (var i = 0; i < targetIdx; i++) nextSlide();
          } else {
            var nb = document.getElementById('nextBtn');
            if (nb) { for (var j = 0; j < targetIdx; j++) nb.click(); }
          }
        }, 50);
      }
    }
    if ((window.__initialSearch || window.location.search || '').indexOf('test_video=1') !== -1) {
      setTimeout(function() {
        var firstBtn = document.querySelector('[onclick*="openVideo("]');
        if (firstBtn) firstBtn.click();
      }, 120);
    }
  });
</script>
<!-- === END HASH DEEP LINK === -->
"""
    content = content.replace("</body>", hash_script + "</body>", 1)
    return content


def main():
    files = sorted(glob.glob("public/interactive-slide-*.html"))
    total_doubled_removed = 0
    for f in files:
        orig = open(f, encoding="utf-8").read()
        updated = orig

        # 1. Strip doubled-up YouTube buttons
        updated, count = fix_doubled_yt_buttons(updated)
        total_doubled_removed += count

        # 2. Fix duplicate video IDs in disco, metal, music-formats, studio-effects
        updated = fix_duplicate_videos(f, updated)

        # 3. Enrich electric guitar and bass guitar decks with curated YouTube videos
        updated = enrich_guitar_and_bass_decks(f, updated)

        # 4. Add HD theater mode & YouTube action bars to split-screen decks
        updated = add_hd_theater_to_split_decks(f, updated)

        # 5. Clean leftover Classroom Slide phrasing in house & rock-n-roll
        updated = clean_non_alevel_phrasing(f, updated)

        # 6. Apply anti-squash layout CSS overrides
        updated = apply_un_squashed_css_overrides(f, updated)

        if updated != orig:
            with open(f, "w", encoding="utf-8") as out:
                out.write(updated)
            print(f"Updated {f} (removed {count} doubled YouTube buttons)")
        else:
            print(f"No changes needed for {f}")

    # Sync public/studio_effects_deck.html with public/interactive-slide-studio-effects.html
    if os.path.exists("public/interactive-slide-studio-effects.html"):
        shutil.copyfile("public/interactive-slide-studio-effects.html", "public/studio_effects_deck.html")
        print("Synced public/studio_effects_deck.html with public/interactive-slide-studio-effects.html")

    print(f"\nDone! Total doubled YouTube buttons removed across all decks: {total_doubled_removed}")


if __name__ == "__main__":
    main()
