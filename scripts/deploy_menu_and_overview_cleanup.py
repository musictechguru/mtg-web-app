#!/usr/bin/env python3
"""
scripts/deploy_menu_and_overview_cleanup.py

Addresses the user request:
"Try and get rid of any legacy stuff like overview and make sure that the menu system
isn't doubling up things unnecessarily especially in the top line"

Actions:
1. WordPress Primary Menu (Menu 110) Top Line Streamline:
   - Order 1: A LEVEL MUSIC TECH (with Component 1-4 dropdown)
   - Order 2: Revision App (NEW)
   - Order 3: Music Tech Tutor (1-on-1)
   - Order 4: Free Tutorials
     - Sub-item: BandLab Tutorials (nested cleanly under Free Tutorials so it doesn't crowd the top line)
   - Order 5: Teacher Training
   - Order 6: Shop
2. Global Header Widget (custom_html-2):
   - Removes the duplicate "⭐ Get Pro (£12.99/yr)" button that was crowding the top line right next to "Revision App (NEW)".
   - Keeps the sleek, single "App Login" button on the far right.
   - Fixes mobile hamburger menu display so both "App Login" and the 36x36 menu pill display cleanly side-by-side with no overlap or clipping.
   - Eliminates doubling-up in the breadcrumbs top line (removes duplicate Home link).
   - Replaces "Back to Overview Hub" with "Back to Component Hub".
3. Legacy Page 13343 (/a-level-music-tech-course-overview/):
   - Replaces outdated 2017 Google Slides and broken Word docs with an instant redirect bridge to the A-Level Music Technology Main Hub (Page 8494).
4. A-Level Main Hub (Page 8494):
   - Removes legacy "🧭 Course Overview" button from the top button row.
   - Replaces legacy "Course Overview" card with "16-Block Timetable & SOW" linking to the modern interactive scheme of work.
5. Component 3 Hub (Page 13311):
   - Updates "Formats Overview Hub →" to "Music Formats Hub →".
6. Interactive Slide Decks (31 Decks):
   - Replaces legacy "Overview" tags and pills with specific specification terms ("Syllabus", "Specification", "Roadmap", "Lineage").
"""

import urllib.request
import urllib.parse
import json
import base64
import re
import glob

WP_URL = "https://www.musictechguru.com/wp-json/wp/v2"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()
HEADERS = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

def get_wp(path):
    req = urllib.request.Request(f"{WP_URL}/{path}", headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())

def post_wp(path, data):
    req = urllib.request.Request(f"{WP_URL}/{path}", 
                                data=json.dumps(data).encode("utf-8"), 
                                headers=HEADERS,
                                method="POST")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())

def encode_vc_raw_html(html_str):
    url_encoded = urllib.parse.quote(html_str, safe='')
    return base64.b64encode(url_encoded.encode('utf-8')).decode('utf-8')


def step1_streamline_menu():
    print("--- Step 1: Streamline Menu 110 ---")
    menu_updates = {
        8603: {"menu_order": 1, "parent": 0},    # A LEVEL MUSIC TECH
        297649: {"menu_order": 2, "parent": 0},  # Revision App (NEW)
        296467: {"menu_order": 3, "parent": 0},  # Music Tech Tutor
        10238: {"menu_order": 4, "parent": 0},   # Free Tutorials
        296606: {"menu_order": 1, "parent": 10238, "title": "BandLab Tutorials"}, # Nest BandLab under Free Tutorials
        296899: {"menu_order": 5, "parent": 0},  # Teacher Training
        7554: {"menu_order": 6, "parent": 0},    # Shop
    }
    for item_id, payload in menu_updates.items():
        res = post_wp(f"menu-items/{item_id}", payload)
        print(f"  Updated Menu Item {item_id}: order {payload.get('menu_order')}, parent {payload.get('parent')}")


def step2_update_custom_html_2():
    print("--- Step 2: Update custom_html-2 (Header, Auth, Mobile Nav, Breadcrumbs) ---")
    w = get_wp("widgets/custom_html-2")
    rendered = w.get("rendered", "")
    
    # Extract existing styles up to <script>
    script_idx = rendered.find("<script>")
    css_content = rendered[:script_idx]
    
    # Replace the JS inside custom_html-2:
    new_script = """<script>
// UNIFIED SINGLE SOURCE OF TRUTH (MTG APP LOGIN & REVISION APP)
(function() {
  function unifyHeaderAuth() {
    var loginContainers = document.querySelectorAll('.thim-link-login');
    loginContainers.forEach(function(container) {
      var loginLink = container.querySelector('a.login, a.js-show-popup, a[href*="wp-login"]');
      if (loginLink) {
        loginLink.classList.remove('js-show-popup');
        loginLink.setAttribute('href', 'https://app.musictechguru.com/');
        loginLink.setAttribute('target', '_blank');
        loginLink.setAttribute('rel', 'noopener');
        loginLink.textContent = 'App Login';
        loginLink.title = 'Sign in to your Music Tech Guru Revision App account';
        var cleanLink = loginLink.cloneNode(true);
        loginLink.parentNode.replaceChild(cleanLink, loginLink);
      }
      // Remove duplicate Get Pro button if present to prevent top line overcrowding
      var oldPro = container.querySelector('.mtg-pro-header-cta');
      if (oldPro) oldPro.remove();
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', unifyHeaderAuth);
  } else {
    unifyHeaderAuth();
  }
  window.addEventListener('load', unifyHeaderAuth);

  // GLOBAL BROWSER BACK-BUTTON FIX: Disarm WP Smush iframe[data-src] lazy-load so it never mutates .src
  function disarmLazyIframes(root) {
    var list = (root || document).querySelectorAll('iframe[data-src]');
    for (var i = 0; i < list.length; i++) {
      var f = list[i];
      var realSrc = f.getAttribute('data-src');
      if (!realSrc) continue;
      var curSrc = f.getAttribute('src') || '';
      if (curSrc === realSrc) {
        f.removeAttribute('data-src');
        f.removeAttribute('data-load-mode');
        f.classList.remove('lazyload', 'lazyloading', 'lazyloaded');
        continue;
      }
      var clone = f.cloneNode(false);
      clone.removeAttribute('data-src');
      clone.removeAttribute('data-load-mode');
      clone.classList.remove('lazyload', 'lazyloading', 'lazyloaded');
      clone.setAttribute('src', realSrc);
      if (f.parentNode) {
        f.parentNode.replaceChild(clone, f);
      }
    }
  }

  document.addEventListener('lazybeforeunveil', function(e) {
    if (e.target && e.target.tagName === 'IFRAME' && e.target.getAttribute('data-src')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      disarmLazyIframes(e.target.parentNode || document);
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { disarmLazyIframes(document); tagMobileIframeWrappers(); cleanBreadcrumbs(); });
  } else {
    disarmLazyIframes(document);
    tagMobileIframeWrappers();
    cleanBreadcrumbs();
  }
  window.addEventListener('load', function() { disarmLazyIframes(document); tagMobileIframeWrappers(); cleanBreadcrumbs(); });

  function tagMobileIframeWrappers() {
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      var f = iframes[i];
      var src = (f.getAttribute('src') || f.getAttribute('data-src') || '').toLowerCase();
      var p = f.parentElement;
      if (!p) continue;
      if (src.indexOf('interactive-slide-') !== -1 || src.indexOf('studio_effects_deck') !== -1) {
        p.classList.add('mtg-deck-iframe-wrap');
      } else if (src.indexOf('quiz') !== -1) {
        p.classList.add('mtg-quiz-iframe-wrap');
      }
    }
  }

  // DEDUPLICATE BREADCRUMBS TOP LINE (Remove redundant second "Home" link)
  function cleanBreadcrumbs() {
    var bc = document.querySelector('#breadcrumbs, .breadcrumbs, .thim-breadcrumbs');
    if (!bc) return;
    var items = bc.querySelectorAll('li');
    if (items.length >= 2) {
      var a0 = items[0].querySelector('a');
      var a1 = items[1].querySelector('a');
      if (a0 && a1 && (a1.href === a0.href || a1.href === window.location.origin + '/' || a1.href === window.location.origin)) {
        items[1].remove();
      }
    }
  }
})();
</script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    function cleanLoginModal() {
        var container = document.querySelector("#thim-popup-login .thim-login-container");
        if (container) {
            Array.from(container.childNodes).forEach(function(node) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.indexOf("miniorange") !== -1) {
                    node.textContent = "";
                }
            });
            var wrapper = document.querySelector("#thim-popup-login .popup-login-wrapper");
            if (wrapper) {
                wrapper.classList.remove("has-shortcode");
            }
        }
    }
    cleanLoginModal();
    document.addEventListener("click", function(e) {
        if (e.target && (e.target.matches(".thim-login-popup a, .login") || e.target.closest(".thim-login-popup a, .login"))) {
            setTimeout(cleanLoginModal, 30);
            setTimeout(cleanLoginModal, 150);
        }
    });
});

// SMART BACK BUTTON INJECTION FOR SUBPAGES (Replaces legacy "Overview" wording with specific Hub)
(function() {
    function initSmartBackButton() {
        if (document.querySelector('.mtg-back-nav-bar')) return;
        var bc = document.querySelector('#breadcrumbs, .breadcrumbs, .thim-breadcrumbs');
        if (!bc) return;
        var lis = bc.querySelectorAll('li');
        if (!lis || lis.length < 3) return;
        
        var parentLi = lis[lis.length - 2];
        var parentA = parentLi ? parentLi.querySelector('a') : null;
        if (!parentA || !parentA.href) return;
        
        var parentHref = parentA.href;
        var homeUrl = window.location.origin + '/';
        if (parentHref === homeUrl || parentHref === window.location.origin) return;
        
        var parentRawText = parentA.innerText.trim();
        var cleanTitle = parentRawText.replace(/^A LEVEL\s+/i, 'A-Level ');
        
        // 1. TOP BACK BUTTON
        var topBar = document.createElement('div');
        topBar.className = 'mtg-back-nav-bar';
        topBar.innerHTML = '<a href="' + parentHref + '" class="mtg-back-btn">' +
            '<span class="back-icon-circle">&larr;</span>' +
            '<span>Back to ' + cleanTitle + '</span>' +
            '</a>';
        
        var mainCol = document.querySelector('.site-main, #main, .site-content .col-sm-12, .site-content .col-sm-9');
        var entryContent = document.querySelector('.entry-content, #main');
        
        if (entryContent) {
            entryContent.insertBefore(topBar, entryContent.firstChild);
        } else if (mainCol) {
            mainCol.insertBefore(topBar, mainCol.firstChild);
        }
        
        // 2. BOTTOM RETURN CARD
        var bottomCard = document.createElement('div');
        bottomCard.className = 'mtg-bottom-return-card';
        bottomCard.innerHTML = '<div class="mtg-return-info">' +
            '<span class="return-sub">Finished with this topic?</span>' +
            '<h4>Return to ' + cleanTitle + '</h4>' +
            '</div>' +
            '<a href="' + parentHref + '" class="return-action-btn">&larr; Back to Component Hub</a>';
        
        if (entryContent) {
            entryContent.appendChild(bottomCard);
        }
        
        // 3. FLOATING QUICK RETURN PILL (Shows when scrolling)
        var floatingPill = document.createElement('a');
        floatingPill.href = parentHref;
        floatingPill.className = 'mtg-floating-back-pill';
        floatingPill.innerHTML = '<span style="font-size: 15px;">&larr;</span> <span>Back to ' + cleanTitle + '</span>';
        document.body.appendChild(floatingPill);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingPill.classList.add('is-visible');
            } else {
                floatingPill.classList.remove('is-visible');
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmartBackButton);
    } else {
        initSmartBackButton();
    }
})();
</script>"""

    # Also update mobile header CSS in css_content to ensure hamburger toggle sits beside App Login
    old_css_part = """  .site-header .width-navigation.table-cell,
  .site-header .width-navigation {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    width: auto !important;
    flex: 0 0 auto !important;
    padding: 0 !important;
  }"""
    new_css_part = """  .site-header .width-navigation.table-cell,
  .site-header .width-navigation {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    width: auto !important;
    flex: 1 1 auto !important;
    gap: 8px !important;
    padding: 0 !important;
  }"""
    if old_css_part in css_content:
        css_content = css_content.replace(old_css_part, new_css_part)
        
    full_html = css_content + new_script
    
    # Strip <aside> wrapper tags if sending raw content to widget
    m_body = re.search(r'<div class="textwidget custom-html-widget">(.*?)</div>\s*</aside>', full_html, re.S)
    raw_content = m_body.group(1) if m_body else full_html
    
    res = post_wp("widgets/custom_html-2", {"instance": {"raw": {"content": raw_content}}})
    print("  Updated custom_html-2 widget successfully.")


def step3_redirect_legacy_page_13343():
    print("--- Step 3: Redirect Legacy Page 13343 (/a-level-music-tech-course-overview/) ---")
    redirect_html = """<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 36px 30px; background: #0f172a; border-radius: 16px; border: 1px solid rgba(0, 193, 240, 0.3); text-align: center; color: #ffffff;">
  <div style="font-size: 40px; margin-bottom: 12px;">🧭</div>
  <h2 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 10px;">A-Level Music Technology Course Hub</h2>
  <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 24px; max-width: 600px; margin-left: auto; margin-right: auto;">
    This legacy course overview page has been upgraded into our comprehensive <strong>A-Level Music Technology Curriculum Hub</strong> and <strong>Interactive Revision App</strong>.
  </p>
  <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
    <a href="https://www.musictechguru.com/homepage/a-level-music-technology/" style="display: inline-flex; align-items: center; gap: 8px; background: #00C1F0; color: #0b0f19; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
      <span>← Go to Main A-Level Hub</span>
    </a>
    <a href="https://app.musictechguru.com/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; color: #38bdf8; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
      <span>🚀 Open Revision App</span>
    </a>
  </div>
</div>
<script>
window.location.replace("https://www.musictechguru.com/homepage/a-level-music-technology/");
</script>
<meta http-equiv="refresh" content="0; url=https://www.musictechguru.com/homepage/a-level-music-technology/">
"""
    b64 = encode_vc_raw_html(redirect_html)
    content = f'<div class="wpb-content-wrapper">[vc_row][vc_column][vc_raw_html]{b64}[/vc_raw_html][/vc_column][/vc_row]</div>'
    res = post_wp("pages/13343", {"content": content, "title": "A-Level Music Technology Curriculum Hub (Upgraded)"})
    print("  Page 13343 upgraded with instant redirect and clean hub bridge.")


def step4_clean_hub_page_8494():
    print("--- Step 4: Clean Page 8494 (Remove legacy Course Overview link & card) ---")
    with open("scripts/decoded_wp_page_8494.html", "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Remove "🧭 Course Overview" button from top strip:
    old_btn = """                    <a href="https://www.musictechguru.com/homepage/a-level-music-technology/a-level-music-tech-course-overview/" style="background: #1e293b; color: #ffffff; font-weight: 700; font-size: 13.5px; padding: 11px 20px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.12);">
                        🧭 Course Overview
                    </a>"""
    if old_btn in html:
        html = html.replace(old_btn, "")
        print("  Removed legacy Course Overview button from Page 8494 top strip.")

    # 2. Replace legacy Course Overview card in the card grid:
    old_card = """            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/a-level-music-tech-course-overview/" style="background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 22px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 26px; display: block; margin-bottom: 10px;">🧭</span>
                    <strong style="color: #ffffff; font-size: 16px; display: block; margin-bottom: 6px;">Course Overview</strong>
                    <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0 0 14px;">
                        Complete roadmap for Year 12 and Year 13 study. Understanding grade boundaries, coursework deadlines, and workflow pacing.
                    </p>
                </div>
                <span style="color: #00C1F0; font-size: 13px; font-weight: 700;">Start Course Overview &rarr;</span>
            </a>"""
    new_card = """            <a href="https://app.musictechguru.com/?quiz=timetable_builder" target="_blank" rel="noopener" style="background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 22px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 26px; display: block; margin-bottom: 10px;">🗺️</span>
                    <strong style="color: #ffffff; font-size: 16px; display: block; margin-bottom: 6px;">16-Block Timetable &amp; SOW</strong>
                    <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0 0 14px;">
                        Interactive curriculum pacing for Year 12 &amp; 13. Map coursework deadlines, mock exam windows, and revision blocks.
                    </p>
                </div>
                <span style="color: #00C1F0; font-size: 13px; font-weight: 700;">Launch Timetable Builder &rarr;</span>
            </a>"""
    if old_card in html:
        html = html.replace(old_card, new_card)
        print("  Replaced legacy Course Overview card with 16-Block Timetable & SOW card.")

    # Save local decoded copy
    with open("scripts/decoded_wp_page_8494.html", "w", encoding="utf-8") as f:
        f.write(html)

    # Encode and push to WordPress Page 8494
    b64 = encode_vc_raw_html(html)
    
    # Check existing footer callout
    p8494 = get_wp("pages/8494")
    raw_content = p8494.get("content", {}).get("raw", p8494.get("content", {}).get("rendered", ""))
    
    # We build the updated content wrapper preserving WooCommerce product grid
    m_prod = re.search(r'(\[vc_row\]\[vc_column\]<div class="woocommerce columns-4 ">.*?\[/vc_column\]\[/vc_row\])', raw_content, re.S)
    prod_block = m_prod.group(1) if m_prod else ""
    
    m_foot = re.search(r'(\[vc_row\]\[vc_column\]\[vc_raw_html\]CjxkaXYgaWQ9Im10Zy1odWItZm9vdGVyLWNhbGxvdXQi.*?\[/vc_raw_html\]\[/vc_column\]\[/vc_row\])', raw_content, re.S)
    foot_block = m_foot.group(1) if m_foot else ""
    
    new_content = f'<div class="wpb-content-wrapper"><p>[vc_row][vc_column][vc_raw_html]{b64}[/vc_raw_html][/vc_column][/vc_row]</p>\n<p>{prod_block}</p>\n<p>{foot_block}</p></div>'
    res = post_wp("pages/8494", {"content": new_content})
    print("  Updated Page 8494 on live WordPress successfully.")


def step5_clean_interactive_slide_decks():
    print("--- Step 5: Clean Interactive Slide Decks of Legacy 'Overview' Pills & Doubling ---")
    deck_files = sorted(glob.glob("public/interactive-slide-*.html") + ["public/studio_effects_deck.html"])
    replacements = {
        "COMPONENT 3 OVERVIEW": "COMPONENT 3 SYLLABUS",
        "NEA COURSEWORK • 9MT0/01 OVERVIEW": "NEA COURSEWORK • 9MT0/01 SPECIFICATION",
        "NEA COURSEWORK • 9MT0/02 OVERVIEW": "NEA COURSEWORK • 9MT0/02 SPECIFICATION",
        "Architecture Overview": "Instrument Lineage",
        "1. Consumable Formats Overview": "1. Consumable Formats Roadmap",
        "1. Effects Overview &amp; Routing (Inserts vs Aux)": "1. Effects Architecture &amp; Routing (Inserts vs Aux)",
        "1. Effects Overview & Routing": "1. Effects Architecture & Routing",
    }
    updated = 0
    for p in deck_files:
        content = open(p, "r", encoding="utf-8").read()
        orig = content
        for k, v in replacements.items():
            content = content.replace(k, v)
        if content != orig:
            with open(p, "w", encoding="utf-8") as f:
                f.write(content)
            updated += 1
    print(f"  Updated {updated} slide decks with clean specification terms.")


if __name__ == "__main__":
    step1_streamline_menu()
    step2_update_custom_html_2()
    step3_redirect_legacy_page_13343()
    step4_clean_hub_page_8494()
    step5_clean_interactive_slide_decks()
    print("\n✅ All Menu & Overview Cleanups successfully deployed!")
