import urllib.request, json, base64

WP_PAGE_ID = 13348
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
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
    <div style="background: linear-gradient(135deg, #241604 0%, {BG} 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5);">
        <div style="display: inline-block; background: rgba(245, 158, 11, 0.12); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Instrumental Evolution &bull; Edexcel Component 3: Music Technology in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            The Electric Guitar <span style="color: {AMBER}; font-size: 0.85em;">(Anatomy, Physics &amp; Evolution)</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 860px;">
            From the big band acoustic volume crisis to modern DSP amp modelling: discover how Faraday's Law of Electromagnetic Induction transformed the guitar into the dominant solo voice of 20th-century music. Explore the evolution of pickup design (single-coils, Seth Lover's RWRP humbucker, active 9V preamps), solidbody construction eliminating acoustic cavity feedback (Fender Broadcaster/Telecaster, Gibson Les Paul, Stratocaster), pitch-control hardware (Floyd Rose double-locking tremolos), valve amplification (Marshall Plexi, Vox AC30), and digital Impulse Response (IR) speaker emulation.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Curriculum Pillars</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {pillar(AMBER, "01 &bull; Transducer Physics", "Faraday Induction &amp; Single-Coils", "Vibrating nickel-steel strings disrupt permanent magnetic flux fields, inducing an alternating audio voltage across copper windings. Narrow sampling windows deliver bright, articulate chime and sharp transient bite with a 4–5 kHz resonant peak.")}
            {pillar(CYAN, "02 &bull; Noise Cancellation", "Seth Lover&#39;s PAF Humbucker", "Dual coils wound in Reverse Wind, Reverse Polarity (RWRP) cancel ambient 50/60 Hz EMI mains hum through 180&deg; phase inversion, while vibrating string audio sums in-phase (+6 dB) to produce a warm, high-output rock tone.")}
            {pillar(EMERALD, "03 &bull; Solidbody Architecture", "Eliminating Acoustic Feedback", "Acoustic archtops howled when amplified due to soundboard vibration and air cavity resonance. Solid ash, alder, and mahogany bodies decoupled the instrument from sound pressure, enabling clean sustain at extreme stage volumes.")}
            {pillar(PURPLE, "04 &bull; Amps, Effects &amp; DSP", "Tubes, Pedals &amp; Amp Modelling", "From overdriven 100W Marshall Super Lead plexi heads and Vox inductor wah sweeps to modern DSP convolution IRs capturing speaker cab physics and room microphone placement direct to digital workstations.")}
        </div>
    </div>

    <!-- 3. INTERACTIVE 15-SLIDE PRESENTATION DECK -->
    {embed("rgba(245,158,11,0.35)", AMBER, "Interactive Curriculum Slide Deck &bull; The Electric Guitar", "15 Comprehensive Slides &bull; 42 Technical Photographs &amp; Diagrams &bull; Lightbox Image Inspection", "https://app.musictechguru.com/interactive-slide-the-electric-guitar?v=20261028", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(6,182,212,0.35)", CYAN, "Component 3 Exam Specification Quiz &bull; The Electric Guitar", "12 Exam-Style Multiple Choice Questions &bull; Instant Marking &bull; Detailed Technical Explanations", "https://app.musictechguru.com/the-electric-guitar-interactive-quiz?v=1", 680)}

    <!-- 5. HISTORICAL STUDIO & TECHNICAL DEMONSTRATIONS (VIDEOS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Video Masterclasses &bull; Authentic Guitar Engineering</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 20px;">
            {video_card("StEGCV_C42Q", "The History of the Electric Guitar (1931–1969)", "Comprehensive documentary covering the acoustic volume problem, Rickenbacker Frying Pan, Charlie Christian ES-150, Fender vs Gibson rivalry, and the solidbody revolution.", "Documentary")}
            {video_card("dCcWEWSOeXk", "Every Electric Guitar Pickup Explained", "Detailed breakdown of single-coils, humbuckers, P-90s, active pickups, ceramic vs Alnico magnets, bobbin geometry, and tonal frequency characteristics.", "Engineering")}
            {video_card("8sD8E9OYY_8", "Guitar Pickups Explained (Electronics 101)", "Deep dive into Faraday's Law of induction, magnetic flux lines, coil impedance, resonant RLC peaks, and RWRP humbucker phase cancellation physics.", "Physics")}
            {video_card("PIu6yXAYT5A", "The Electric Guitar: Award-Winning Documentary", "Musical Instrument Museum documentary tracing the instrument's impact on American culture, audio recording technology, and modern rock music.", "MIM Feature")}
        </div>
    </div>

    <!-- 6. GUIDED EXAM HOMEWORK & REVISION PACK (EXISTING PRESERVED + 3 EXPANDED ASSIGNMENTS) -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Guided Exam Homework &amp; Comprehensive Study Pack</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0;">Download complete classroom-ready PDF homework tasks, technical study guides, and model essay exemplars specifically aligned with the Edexcel Component 3 specification.</p>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 18px;">
            {resource_card("Core Study Guide", GOLD, "The Electric Guitar Guide (PDF)", "Original detailed specification diagrams, pickup anatomy, body construction, and electrical schematic breakdowns.", "https://www.musictechguru.com/wp-content/uploads/2020/03/The-GEETAR.pdf", "Download Study Guide (PDF)")}
            {resource_card("Model Essay Pack", GOLD, "Guitar Model Essay Question &amp; Exemplar", "Complete 12-mark and 20-mark practice questions, examiner mark schemes, and high-scoring student model answers.", "https://www.musictechguru.com/wp-content/uploads/2020/03/Guitar-model-essay-question.zip", "Download Essay Pack (ZIP)")}
            {resource_card("Guided Homework 1", AMBER, "HW 1: Fender Solidbody, Single-Coils &amp; Hendrix", "Faraday's induction law, Stratocaster single-coils, 250k pot damping, position 2/4 comb filtering, and Jimi Hendrix 'Voodoo Child'.", "https://app.musictechguru.com/homework/c3_electric_guitar_hw1_solidbody_singlecoil_fender.pdf", "Download Homework 1 (PDF)")}
            {resource_card("Guided Homework 2", CYAN, "HW 2: Gibson Les Paul &amp; PAF Humbuckers", "Seth Lover's RWRP phase cancellation, 500k pot loading, bridge vs neck harmonic sampling, backwards echo, and Led Zeppelin 'Whole Lotta Love'.", "https://app.musictechguru.com/homework/c3_electric_guitar_hw2_humbucker_gibson_lespaul.pdf", "Download Homework 2 (PDF)")}
            {resource_card("Guided Homework 3", PURPLE, "HW 3: Superstrats, Floyd Rose &amp; DSP Modelling", "Frankenstrat hybrid wiring, Floyd Rose double-locking tremolos, active 9V preamps, DSP amp emulation vs cab IRs, and Van Halen 'Eruption'.", "https://app.musictechguru.com/homework/c3_electric_guitar_hw3_superstrat_shred_modelling.pdf", "Download Homework 3 (PDF)")}
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
                    <li>Full audio timeline analysis: Rickenbacker Frying Pan, Broadcaster, Stratocaster &amp; Les Paul</li>
                    <li>Component 3 exam practice question booklets with complete examiner mark schemes</li>
                    <li>Technical guides covering Faraday's induction, humbucker RWRP physics, and tube amplification</li>
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
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">Master each technological development across Component 3 from the electric guitar through synthesizers, samplers, and multi-microphone tracking.</p>
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
        print("WordPress The Electric Guitar Page Updated! ID:", res.get('id'), "Status:", res.get('status'))
