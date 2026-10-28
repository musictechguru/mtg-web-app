import urllib.request, json, base64

WP_PAGE_ID = 13338
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

CYAN = "#06b6d4"
BLUE = "#3b82f6"
EMERALD = "#10b981"
PURPLE = "#a855f7"
BG = "#080e1a"
CARD = "#0f172a"
BORDER = "rgba(255, 255, 255, 0.08)"


def pillar(color, label, title, text):
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 20px; border-left: 4px solid {color};">
                <span style="color: {color}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">{label}</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">{title}</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">{text}</p>
            </div>'''


def video_card(vid, title, description, badge):
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.35); display: flex; flex-direction: column;">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 14px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/{vid}" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                    <strong style="color: #ffffff; font-size: 15px; line-height: 1.3;">{title}</strong>
                    <span style="color: {CYAN}; font-size: 11px; font-weight: 700; background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.3); padding: 3px 8px; border-radius: 6px; white-space: nowrap;">{badge}</span>
                </div>
                <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.5; margin: 0 0 12px 0; flex: 1;">{description}</p>
                <a href="https://www.youtube.com/watch?v={vid}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: rgba(255,255,255,0.06); color: #cbd5e1; font-size: 12px; font-weight: 600; padding: 8px 12px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s;">
                    <span>Watch Directly on YouTube</span> <span style="color: {CYAN};">&nearr;</span>
                </a>
            </div>'''


def homework_card(num, title, focus, pdf_filename):
    url = f"https://app.musictechguru.com/homework/{pdf_filename}"
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: {CYAN}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Guided Homework {num}</span>
                        <span style="background: rgba(6,182,212,0.12); color: {CYAN}; border: 1px solid rgba(6,182,212,0.3); font-size: 10.5px; font-weight: 700; padding: 2px 7px; border-radius: 5px;">Printable PDF</span>
                    </div>
                    <strong style="color: #ffffff; font-size: 15px; display: block; margin-bottom: 8px; line-height: 1.35;">{title}</strong>
                    <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.5; margin: 0 0 16px 0;">{focus}</p>
                </div>
                <a href="{url}" target="_blank" download rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.1)); color: #38bdf8; border: 1px solid rgba(6,182,212,0.4); padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span>Download Homework PDF</span> &darr;
                </a>
            </div>'''


def embed(border, dot, title, sub, src, height):
    return f'''<div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: {dot}; border-radius: 50%; box-shadow: 0 0 8px {dot};"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">{title}</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">{sub}</span>
        </div>
        <div style="position: relative; width: 100%; height: {height}px; background: {CARD}; border: 1px solid {border}; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="{src}" class="no-lazyload skip-lazy not-lazy" data-no-lazy="1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <script>
        (function() {{
            var iframes = document.querySelectorAll('iframe.no-lazyload');
            iframes.forEach(function(f) {{
                if (f.getAttribute('data-src') && (!f.src || f.src.indexOf('data:image') === 0)) {{
                    f.src = f.getAttribute('data-src');
                }}
            }});
        }})();
        </script>
    </div>'''


html_content = f'''<div id="mtg-dark-theme-wrapper" style="background: {BG}; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #092032 0%, {BG} 100%); border: 1px solid rgba(6, 182, 212, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5);">
        <div style="display: inline-block; background: rgba(6, 182, 212, 0.12); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Evolutionary Era 04 &bull; Edexcel Component 3: Music Technology in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Mixers &amp; Digital Audio Workstations (DAW) <span style="color: {CYAN}; font-size: 0.85em;">(1980s–Present)</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 860px;">
            The digital recording revolution: Modular Digital Multitrack tape (Alesis ADAT &amp; Tascam DA-88), mixing desk channel strip architecture (preamps, HPF, parametric EQ Q-factor, inserts, and pre/post aux sends), digital consoles with motorized fader recall (Yamaha 02R &amp; Word Clock), PCM fundamentals (Nyquist-Shannon sampling theorem, 24-bit dynamic range, and TPDF dither), non-linear DAW production (Pro Tools, Logic, non-destructive editing, take comping, and automation envelopes), VST plugin architecture, pitch correction algorithms (Antares Auto-Tune &amp; Melodyne), In-The-Box summing vs hybrid analog summing, and modern LUFS loudness delivery standards.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {CYAN}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Production Breakdown</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {pillar(CYAN, "01 &bull; Modular Digital Multitrack", "Alesis ADAT &amp; Digital Tape", "The 1991 Alesis ADAT recorded 8 uncompressed 16-bit 48 kHz tracks onto consumer S-VHS tape. Optical lightpipe linked up to 16 machines sample-accurately for 128 tracks, destroying the financial barrier to professional recording.")}
            {pillar(BLUE, "02 &bull; Channel Strip &amp; Routing", "Preamps, EQ, Inserts &amp; Aux", "Mastering console signal flow: input gain/trim staging, HPF rumble attenuation (&lt;80 Hz), 4-band parametric EQ with surgical Q control, serial TRS channel inserts for dynamics, and pre/post aux sends for headphone cues and reverb.")}
            {pillar(EMERALD, "03 &bull; Digital Physics &amp; Consoles", "Nyquist, 24-Bit &amp; Yamaha 02R", "Nyquist-Shannon sampling theorem (fs &ge; 2 &times; fmax), 24-bit resolution yielding 144 dB dynamic range, and TPDF dither preventing truncation distortion. The Yamaha 02R brought onboard 32-bit DSP, motorized faders, snapshot recall, and 75-ohm BNC Word Clock sync.")}
            {pillar(PURPLE, "04 &bull; Non-Linear DAWs &amp; Plugins", "Comping, VST &amp; Auto-Tune", "Non-destructive playlist editing, multi-take vocal comping lanes, and sample-accurate automation curves. Steinberg VST plugins, ASIO low-latency buffer management, Antares Auto-Tune phase vocoding (the 'Cher Effect'), and LUFS loudness delivery.")}
        </div>
    </div>

    <!-- 3. INTERACTIVE 15-SLIDE PRESENTATION DECK -->
    {embed("rgba(6,182,212,0.35)", CYAN, "Interactive Curriculum Slide Deck &bull; Mixers &amp; Digital Audio Workstations", "15 Comprehensive Slides &bull; 42 Technical Photographs &amp; Diagrams &bull; Audio Examples", "https://app.musictechguru.com/interactive-slide-mixers-daw?v=1", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(59,130,246,0.35)", BLUE, "Component 3 Exam Specification Quiz &bull; Mixers &amp; DAWs", "12 Exam-Style Multiple Choice Questions &bull; Instant Marking &bull; Detailed Explanations", "https://app.musictechguru.com/mixers-daw-interactive-quiz?v=1", 680)}

    <!-- 5. HISTORICAL STUDIO DEMONSTRATIONS (VIDEOS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {CYAN}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Video Masterclasses &bull; Authentic Digital &amp; Console Workflows</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 18px;">
            {video_card("XljKOG2Y25g", "Console Signal Flow &amp; Channel Strips", "A comprehensive step-by-step masterclass explaining input gain staging, high-pass filtering, parametric EQ bands, insert loops, and auxiliary sends.", "Console Architecture")}
            {video_card("KmwGACcltdQ", "The Alesis ADAT Home Studio Revolution", "How 8 channels of uncompressed digital audio on consumer S-VHS tape democratized multitrack music production for project studios in the early 1990s.", "Digital Tape (ADAT)")}
            {video_card("f0pQ3373w9w", "Auto-Tune Pitch Correction &amp; Cher Effect", "The mathematical and acoustic physics of pitch tracking, phase vocoding, and how setting retune speed to zero created the iconic 1998 robotic Cher vocal texture.", "Vocal Processing")}
            {video_card("1V_xRb0x9aw", "Modern In-The-Box DAW Production Workflow", "Explore non-linear audio editing, region slicing, sample-accurate breakpoint automation, and hybrid analog summing vs in-the-box digital mixing.", "DAW Production")}
        </div>
    </div>

    <!-- 6. EXAM PRACTICE GUIDED HOMEWORK -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {CYAN}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Exam Practice &bull; Guided Homework Assignments</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 16px;">
            {homework_card("1", "Guided Homework 1 &bull; Alanis Morissette 'You Oughta Know' (1995)", "Glen Ballard home studio tracking: Alesis ADAT 8-track digital tape, input pad &amp; HPF rumble filtering, serial inserts vs aux sends, and 24-bit dynamic range.", "c3_mixers_daw_hw1_digital_tape_adat.pdf")}
            {homework_card("2", "Guided Homework 2 &bull; Cher 'Believe' (1998)", "Metro Productions: Antares Auto-Tune phase vocoding &amp; retune speed 0, Yamaha 02R digital console motorized scene recall, BNC Word Clock sync, and parametric EQ Q-factor.", "c3_mixers_daw_hw2_digital_console_yamaha02r.pdf")}
            {homework_card("3", "Guided Homework 3 &bull; Gorillaz 'Clint Eastwood' (2001)", "Dan the Automator &amp; Damon Albarn: non-destructive DAW region editing, vocal take comping &amp; crossfades, buffer size &amp; latency trade-offs, and In-The-Box vs hybrid analog summing.", "c3_mixers_daw_hw3_in_the_box_protools.pdf")}
        </div>
    </div>

    <!-- 7. FEATURED SHOP PRODUCT CARD -->
    <div style="margin-bottom: 40px; background: linear-gradient(135deg, #091a28 0%, #0d121f 100%); border: 1px solid rgba(6,182,212,0.4); border-radius: 18px; padding: 28px; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; align-items: center;">
            <div style="text-align: center;">
                <div style="position: relative; display: inline-block; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1);">
                    <img src="https://www.musictechguru.com/wp-content/uploads/2025/03/Music-tech-1950s-resource-pack.png" alt="Music Technology Complete Teaching Pack" style="display: block; width: 100%; max-width: 320px; height: auto;">
                    <div style="position: absolute; top: 12px; right: 12px; background: #e11d48; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(225,29,72,0.5);">
                        Save 60%
                    </div>
                </div>
            </div>
            <div>
                <div style="display: inline-block; background: rgba(6,182,212,0.15); color: {CYAN}; border: 1px solid rgba(6,182,212,0.35); padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 10px;">
                    Component 3 Teacher &amp; Student Pack
                </div>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 10px 0; line-height: 1.3;">
                    Music Technology Complete Historical Teaching Pack
                </h3>
                <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px;">
                    <span style="color: #38bdf8; font-size: 26px; font-weight: 900;">&pound;9.95</span>
                    <span style="color: #64748b; font-size: 16px; text-decoration: line-through;">&pound;25.00</span>
                    <span style="color: #34d399; font-size: 12px; font-weight: 700; background: rgba(52,211,153,0.1); padding: 3px 8px; border-radius: 6px;">Instant Digital Download</span>
                </div>
                <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.7; padding-left: 20px; margin: 0 0 20px 0;">
                    <li>Comprehensive classroom presentation deck &amp; editable teacher slide notes</li>
                    <li>Full audio timeline analysis: ADAT digital tape, console signal flow, DAWs &amp; VSTs</li>
                    <li>Component 3 exam practice question booklets with complete examiner mark schemes</li>
                    <li>Technical guides covering Nyquist sampling, 24-bit dynamic range, dither, and Auto-Tune</li>
                </ul>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="https://www.musictechguru.com/cart/?add-to-cart=297533" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #06b6d4, #0284c7); color: #ffffff; font-size: 13.5px; font-weight: 800; padding: 12px 24px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(6,182,212,0.35);">
                        <span>Add to Cart (&pound;9.95)</span> &rarr;
                    </a>
                    <a href="https://www.musictechguru.com/product/music-technology-1930-1961/" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.06); color: #ffffff; font-size: 13px; font-weight: 600; padding: 12px 20px; border-radius: 10px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">
                        <span>View Pack Details</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- 8. BOTTOM NAVIGATION -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #092032 0%, {BG} 100%); border: 1px solid rgba(6,182,212,0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Continue Your Historical Revision</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">Master each technological era in sequence from direct-to-tape mono through multitrack tape, analog consoles, and digital workstations.</p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: {CYAN}; color: #080e1a; font-weight: 800; font-size: 13.5px; padding: 11px 24px; border-radius: 50px; text-decoration: none;">&larr; Back to Component 3</a>
            <a href="https://app.musictechguru.com/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 11px 22px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">Go to Revision App &rarr;</a>
        </div>
    </div>

</div>'''

if __name__ == "__main__":
    req = urllib.request.Request(
        WP_API_URL, data=json.dumps({'content': html_content}).encode('utf-8'),
        headers={'Authorization': f'Basic {B64_AUTH}', 'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as resp:
        res = json.load(resp)
        print("WordPress Mixers & DAW Page Updated! ID:", res.get('id'), "Status:", res.get('status'))
