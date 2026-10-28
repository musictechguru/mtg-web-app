import urllib.request, json, base64

WP_POST_ID = 236746
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/posts/{WP_POST_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

AMBER = "#f59e0b"
GOLD = "#fbbf24"
CYAN = "#06b6d4"
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
                    <span style="color: {AMBER}; font-size: 11px; font-weight: 700; background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3); padding: 3px 8px; border-radius: 6px; white-space: nowrap;">{badge}</span>
                </div>
                <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.5; margin: 0 0 12px 0; flex: 1;">{description}</p>
                <a href="https://www.youtube.com/watch?v={vid}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: rgba(255,255,255,0.06); color: #cbd5e1; font-size: 12px; font-weight: 600; padding: 8px 12px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s;">
                    <span>Watch Directly on YouTube</span> <span style="color: {AMBER};">&nearr;</span>
                </a>
            </div>'''


def resource_card(tag, badge_color, title, focus, download_url, btn_text):
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: {badge_color}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">{tag}</span>
                        <span style="background: rgba(245,158,11,0.12); color: {AMBER}; border: 1px solid rgba(245,158,11,0.3); font-size: 10.5px; font-weight: 700; padding: 2px 7px; border-radius: 5px;">Downloadable</span>
                    </div>
                    <strong style="color: #ffffff; font-size: 15px; display: block; margin-bottom: 8px; line-height: 1.35;">{title}</strong>
                    <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.5; margin: 0 0 16px 0;">{focus}</p>
                </div>
                <a href="{download_url}" target="_blank" download rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.1)); color: #fde047; border: 1px solid rgba(245,158,11,0.4); padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span>{btn_text}</span> &darr;
                </a>
            </div>'''


def embed(border, dot, title, subtitle, url, height):
    iframe_id = "iframe-" + url.split('/')[-1].split('?')[0].replace('.', '-').replace('_', '-')
    return f'''<div style="background: {CARD}; border: 1px solid {border}; border-radius: 18px; padding: 24px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.45);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: {dot}; box-shadow: 0 0 10px {dot};"></div>
                <div>
                    <h3 style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 700;">{title}</h3>
                    <span style="color: #94a3b8; font-size: 12px;">{subtitle}</span>
                </div>
            </div>
            <a href="{url}" target="_blank" rel="noopener noreferrer" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; text-decoration: none;">
                Open Fullscreen &nearr;
            </a>
        </div>
        <div style="position: relative; width: 100%; height: {height}px; border-radius: 12px; overflow: hidden; background: #000; border: 1px solid rgba(255,255,255,0.06);">
            <iframe id="{iframe_id}" src="{url}" data-src="{url}" style="width: 100%; height: 100%; border: 0; display: block;" loading="eager" data-no-lazy="1" data-skip-lazy="1" allowfullscreen></iframe>
        </div>
        <script>
        (function(){{
            var el = document.getElementById('{iframe_id}');
            if (el && (!el.getAttribute('src') || el.getAttribute('src') === 'about:blank')) {{
                el.setAttribute('src', '{url}');
            }}
        }})();
        </script>
    </div>'''


html_content = f'''<div id="mtg-dark-theme-wrapper" style="background: {BG}; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #1c1507 0%, {BG} 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5);">
        <div style="display: inline-block; background: rgba(245, 158, 11, 0.12); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Instrumental Evolution &bull; Edexcel Component 3: Music Technology in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            The Bass Guitar <span style="color: {AMBER}; font-size: 0.85em;">(History, Transducers &amp; Low-End Engineering)</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 860px;">
            Explore the technological evolution of the electric bass from Leo Fender's 1951 solidbody Precision Bass to modern active DSP profiling. Master the physics of low frequencies (Mersenne's Law, 34" vs 30" scale length tension, string gauge mass), split-coil Reverse-Wound Reverse-Polarity (RWRP) hum cancellation, dual-pickup Jazz Bass midrange phase interaction, flatwound vs roundwound string damping, active 9V onboard preamps (Baxandall EQ on the 1976 Music Man StingRay), Larry Graham's slap and pop dynamic mechanics, Ampeg SVT 300W tube amplification with 8&times;10 sealed infinite baffles, Motown direct injection (Wolfbox DI), and DAW phase alignment of combined DI + microphone tracks.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Curriculum Pillars</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {pillar(AMBER, "01 &bull; Transducer Physics", "Fender Precision &amp; RWRP Split-Coil", "Leo Fender's 1951 solid ash fretted design gave touring musicians pitch precision and eliminated acoustic cavity feedback. In 1957, the split-coil pickup introduced Reverse-Wound, Reverse-Polarity (RWRP) geometry, cancelling 50/60 Hz EMI hum while summing vibrating string signals in-phase.")}
            {pillar(CYAN, "02 &bull; Scale Length &amp; Strings", "34-Inch Scale Physics &amp; Mersenne&#39;s Law", "According to Mersenne&#39;s Law, Fender&#39;s 34-inch long scale requires high string tension, producing articulate transient attack, defined fundamentals, and piano-like sustain. Flatwound ribbon strings damp high harmonics for a deep fundamental thud, while ribbed roundwounds deliver bright slap presence.")}
            {pillar(EMERALD, "03 &bull; Active Transducers", "Music Man StingRay &amp; Baxandall EQ", "The 1976 Music Man StingRay revolutionized bass electronics with an onboard 9V battery-powered preamplifier. Converting high-impedance to low-impedance prevented high-frequency cable capacitance loss and enabled active boost and cut across bass and treble frequencies.")}
            {pillar(PURPLE, "04 &bull; Studio Production", "Direct Injection (DI) &amp; Phase Alignment", "From Motown's custom Wolfbox DI with Triad transformers to modern active FET boxes, direct recording preserves pristine transient punch. When combined with miked tube speaker cabinets, DAW engineers must correct acoustic latency delays to prevent destructive comb filtering.")}
        </div>
    </div>

    <!-- 3. INTERACTIVE 15-SLIDE PRESENTATION DECK -->
    {embed("rgba(245,158,11,0.35)", AMBER, "Interactive Curriculum Slide Deck &bull; The Bass Guitar", "15 Comprehensive Slides &bull; 42 Technical Photographs &amp; Diagrams &bull; Lightbox Image Inspection", "https://app.musictechguru.com/interactive-slide-the-bass-guitar?v=20261028-2", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(6,182,212,0.35)", CYAN, "Component 3 Exam Specification Quiz &bull; The Bass Guitar", "12 Exam-Style Multiple Choice Questions &bull; Instant Marking &bull; Detailed Technical Explanations", "https://app.musictechguru.com/the-bass-guitar-interactive-quiz?v=20261028", 680)}

    <!-- 5. HISTORICAL STUDIO & TECHNICAL DEMONSTRATIONS (VIDEOS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Video Masterclasses &bull; Authentic Bass Performances &amp; Engineering</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 20px;">
            {video_card("Cusns4PcUcM", "Larry Graham &amp; The Invention of Slap Bass", "BBC The Story of Funk documentary featuring Larry Graham demonstrating how his thumb 'thump' simulated the bass drum and finger 'pluck' replaced the snare.", "Technique Landmark")}
            {video_card("M4ZiFt6hSRQ", "Monk Montgomery: Early Electric Bass Pioneer", "Historic 1971 performance highlighting Monk Montgomery, one of the earliest jazz champions of Leo Fender's 1951 Precision Bass.", "P-Bass History")}
            {video_card("R3XIGon2RjY", "Krist Novoselic &amp; Alternative Rock Bass Tone", "Nirvana live at Reading 1992 demonstrating the aggressive, driven pick attack and high-wattage tube amplification that defines heavy alternative bass.", "Stage Tone")}
            {video_card("uQJPatcYPWw", "Modern Bass Materials &amp; Engineering", "Modern materials demonstration featuring the Stash stainless steel bass, showcasing extended sustain, low-end clarity, and boutique engineering.", "Modern Innovation")}
        </div>
    </div>

    <!-- 6. GUIDED EXAM HOMEWORK & REVISION PACK (3 GUIDED ASSIGNMENTS) -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Guided Exam Homework &amp; Comprehensive Study Pack</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0;">Download complete classroom-ready PDF homework tasks, technical study guides, and listening exercises specifically aligned with the Edexcel Component 3 specification.</p>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 18px;">
            {resource_card("Guided Homework 1", AMBER, "HW 1: Fender Precision Bass &amp; Motown &#39;My Girl&#39;", "Leo Fender&#39;s 1951 solidbody fretted innovation, 1957 split-coil RWRP hum cancellation, James Jamerson flatwound damping, and Motown Wolfbox DI transformer impedance matching.", "https://app.musictechguru.com/homework/c3_the_bass_guitar_hw1_precision_bass_motown.pdf", "Download Homework 1 (PDF)")}
            {resource_card("Guided Homework 2", CYAN, "HW 2: Fender Jazz Bass, Slap &amp; Sly Stone &#39;Thank You&#39;", "Larry Graham&#39;s slap and pop biomechanics, dual single-coil parallel mid scoop, fast analog limiting for slap transient control, and Jaco Pastorius fretless &#39;mwah&#39; harmonics.", "https://app.musictechguru.com/homework/c3_the_bass_guitar_hw2_jazz_bass_slap_funk.pdf", "Download Homework 2 (PDF)")}
            {resource_card("Guided Homework 3", PURPLE, "HW 3: Music Man StingRay, Active EQ &amp; RHCP &#39;Give It Away&#39;", "Flea&#39;s aggressive slap bite, active 9V onboard preamp with Baxandall boost/cut EQ, Ampeg SVT 8x10 sealed cabinet transient punch, and DAW DI + mic phase alignment.", "https://app.musictechguru.com/homework/c3_the_bass_guitar_hw3_active_electronics_stingray.pdf", "Download Homework 3 (PDF)")}
        </div>
    </div>

    <!-- 7. FEATURED SHOP PRODUCT CARD -->
    <div style="margin-bottom: 45px; background: linear-gradient(135deg, #1e1b18 0%, #101726 100%); border: 1px solid rgba(245,158,11,0.3); border-radius: 18px; padding: 28px; box-shadow: 0 12px 35px rgba(0,0,0,0.4);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: center;">
            <div>
                <div style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 24px rgba(0,0,0,0.5);">
                    <img src="https://www.musictechguru.com/wp-content/uploads/2025/03/Music-tech-1950s-resource-pack.png" alt="Music Technology 1930-1961 Complete Teaching Pack" style="width: 100%; height: auto; display: block; border-radius: 12px;">
                    <div style="position: absolute; top: 12px; right: 12px; background: #e11d48; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(225,29,72,0.5);">
                        Save 60%
                    </div>
                </div>
            </div>
            <div>
                <div style="display: inline-block; background: rgba(245,158,11,0.15); color: {AMBER}; border: 1px solid rgba(245,158,11,0.35); padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 10px;">
                    Component 3 Teacher &amp; Student Pack
                </div>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 10px 0; line-height: 1.3;">
                    Music Technology Complete Historical Teaching Pack
                </h3>
                <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px;">
                    <span style="color: #fbbf24; font-size: 26px; font-weight: 900;">&pound;9.95</span>
                    <span style="color: #64748b; font-size: 16px; text-decoration: line-through;">&pound;25.00</span>
                    <span style="color: #34d399; font-size: 12px; font-weight: 700; background: rgba(52,211,153,0.1); padding: 3px 8px; border-radius: 6px;">Instant Digital Download</span>
                </div>
                <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.7; padding-left: 20px; margin: 0 0 20px 0;">
                    <li>Comprehensive classroom presentation deck &amp; editable teacher slide notes</li>
                    <li>Full audio timeline analysis: 1951 Precision Bass, 1960 Jazz Bass, Ampeg SVT &amp; Music Man StingRay</li>
                    <li>Component 3 exam practice question booklets with complete examiner mark schemes</li>
                    <li>Technical guides covering RWRP humbucker physics, active Baxandall EQs, and DI transformer circuits</li>
                </ul>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="https://www.musictechguru.com/cart/?add-to-cart=297533" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #080e1a; font-size: 13.5px; font-weight: 800; padding: 12px 24px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(245,158,11,0.35);">
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
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #1f180f 0%, {BG} 100%); border: 1px solid rgba(245,158,11,0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Continue Your Instrumental &amp; Historical Revision</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">Master each technological development across Component 3 from the bass and electric guitars through synthesizers, samplers, and multi-microphone tracking.</p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: {AMBER}; color: #080e1a; font-weight: 800; font-size: 13.5px; padding: 11px 24px; border-radius: 50px; text-decoration: none;">&larr; Back to Component 3</a>
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
        print("WordPress The Bass Guitar Post Updated! ID:", res.get('id'), "Status:", res.get('status'), "Link:", res.get('link'))
