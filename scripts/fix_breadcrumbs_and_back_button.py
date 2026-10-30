#!/usr/bin/env python3
"""
fix_breadcrumbs_and_back_button.py

Fixes messy breadcrumbs and back buttons across the site:
1. Strips the redundant duplicate home link in breadcrumbs:
   "Home > A-Level Music Technology Resources, Tutorials & Revision > ..."
2. Replaces 65-character database page titles in breadcrumbs with clean, readable titles:
   "Home > A-Level Music Tech > Component 4"
3. Replaces messy 65-character back button titles:
   "Back to A-Level Music Technology Resources & Tutorials (Edexcel 9MT0)"
   with concise, elegant labels:
   "← Back to Course Hub"
   "← Back to Component 4 Hub"
   "← Back to Component 3 Hub"
   etc.
4. Compacts the back pill styling to a sleek, modern pill instead of a massive block.
"""

import urllib.request
import json
import base64
import re

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

def main():
    print("Fetching widgets/custom_html-2...")
    w = get_wp("widgets/custom_html-2")
    rendered = w.get("rendered", "")
    
    # Extract existing styles up to <script>
    script_idx = rendered.find("<script>")
    if script_idx == -1:
        print("ERROR: <script> not found in custom_html-2")
        return
        
    css_content = rendered[:script_idx]
    
    # Clean CSS for breadcrumbs and back button
    extra_css = """
/* CLEAN BREADCRUMBS & COMPACT BACK BUTTON STYLING */
#breadcrumbs li:nth-child(2):has(a[href="https://www.musictechguru.com/"]),
#breadcrumbs li:nth-child(2):has(a[href="https://www.musictechguru.com"]),
.thim-breadcrumbs li:nth-child(2):has(a[href="https://www.musictechguru.com/"]),
.thim-breadcrumbs li:nth-child(2):has(a[href="https://www.musictechguru.com"]) {
  display: none !important;
}

.breadcrumbs-wrapper,
#breadcrumbs,
.thim-breadcrumbs {
  margin: 10px 0 !important;
  color: #64748b !important;
  font-size: 13px !important;
  line-height: 1.5 !important;
}

#breadcrumbs a,
.thim-breadcrumbs a {
  color: #94a3b8 !important;
  text-decoration: none !important;
  transition: color 0.15s ease !important;
}

#breadcrumbs a:hover,
.thim-breadcrumbs a:hover {
  color: #38bdf8 !important;
}

#breadcrumbs li,
.thim-breadcrumbs li {
  display: inline-flex !important;
  align-items: center !important;
  color: #64748b !important;
}

.mtg-back-nav-bar {
  display: flex !important;
  align-items: center !important;
  margin-top: 14px !important;
  margin-bottom: 20px !important;
  padding: 0 !important;
  clear: both !important;
}

.mtg-back-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: rgba(15, 23, 42, 0.85) !important;
  border: 1px solid rgba(56, 189, 248, 0.35) !important;
  border-radius: 9999px !important;
  padding: 6px 16px 6px 12px !important;
  color: #38bdf8 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4) !important;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
}

.mtg-back-btn:hover {
  background: #0284c7 !important;
  color: #ffffff !important;
  border-color: #38bdf8 !important;
  transform: translateX(-3px) !important;
  box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5) !important;
}

.mtg-back-btn .back-icon-circle {
  width: 20px !important;
  height: 20px !important;
  border-radius: 50% !important;
  background: rgba(56, 189, 248, 0.15) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 12px !important;
  color: #38bdf8 !important;
  transition: all 0.15s ease !important;
}

.mtg-back-btn:hover .back-icon-circle {
  background: rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
}
"""
    if "/* CLEAN BREADCRUMBS & COMPACT BACK BUTTON STYLING */" not in css_content:
        # Insert before </style> in css_content
        css_content = css_content.replace("</style>", f"{extra_css}\n</style>")

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

  // DEDUPLICATE & SHORTEN BREADCRUMBS
  function cleanBreadcrumbs() {
    var bc = document.querySelector('#breadcrumbs, .breadcrumbs, .thim-breadcrumbs');
    if (!bc) return;

    function getShortTitle(fullText) {
      if (!fullText) return '';
      var t = fullText.trim();
      if (/a-?level music tech/i.test(t) || /edexcel 9mt0/i.test(t)) return 'A-Level Music Tech';
      if (/component\s*1/i.test(t)) return 'Component 1';
      if (/component\s*2/i.test(t)) return 'Component 2';
      if (/component\s*3/i.test(t)) return 'Component 3';
      if (/component\s*4/i.test(t)) return 'Component 4';
      if (/dictionary/i.test(t)) return 'Dictionary';
      if (/synthesizer/i.test(t)) return 'Synthesizer';
      if (/reverb/i.test(t)) return 'Reverb';
      if (/delay/i.test(t)) return 'Delay';
      if (/chorus/i.test(t)) return 'Chorus';
      if (/flanger/i.test(t)) return 'Flanger';
      if (/phaser/i.test(t)) return 'Phaser';
      var clean = t.split('|')[0].split('–')[0].split('—')[0].replace(/\\(.*?\\)/g, '').trim();
      if (clean.length > 22) clean = clean.substring(0, 22).trim() + '…';
      return clean;
    }

    var items = Array.prototype.slice.call(bc.querySelectorAll('li'));
    if (!items.length) return;

    var homeOrigin = window.location.origin.replace(/\\/$/, '');
    var seenRoot = false;
    items.forEach(function(li, idx) {
      var a = li.querySelector('a');
      if (a && a.href) {
        var cleanHref = a.href.replace(/\\/$/, '');
        if (cleanHref === homeOrigin) {
          if (seenRoot) {
            li.remove();
            return;
          }
          seenRoot = true;
        }
      }
      if (idx > 0 && li.innerText && li.innerText.indexOf('Resources, Tutorials') !== -1) {
        li.remove();
        return;
      }
    });

    var remaining = bc.querySelectorAll('li');
    remaining.forEach(function(li) {
      var a = li.querySelector('a');
      if (a) {
        var short = getShortTitle(a.textContent);
        if (short) a.textContent = short;
      } else {
        var shortLeaf = getShortTitle(li.textContent);
        if (shortLeaf) li.textContent = shortLeaf;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { 
      disarmLazyIframes(document); 
      tagMobileIframeWrappers(); 
      cleanBreadcrumbs(); 
    });
  } else {
    disarmLazyIframes(document);
    tagMobileIframeWrappers();
    cleanBreadcrumbs();
  }
  window.addEventListener('load', function() { 
    disarmLazyIframes(document); 
    tagMobileIframeWrappers(); 
    cleanBreadcrumbs(); 
  });
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

// SMART BACK BUTTON INJECTION FOR SUBPAGES
(function() {
    function getSmartBackLabel(url, rawText) {
        var u = (url || '').toLowerCase().replace(/\\/$/, '');
        var t = (rawText || '').trim();
        
        if (u.indexOf('/homepage/a-level-music-technology') !== -1 || /a-?level/i.test(t) || /edexcel/i.test(t)) {
            return 'Course Hub';
        }
        if (u.indexOf('component-1') !== -1 || /component\\s*1/i.test(t)) {
            return 'Component 1 Hub';
        }
        if (u.indexOf('component-2') !== -1 || /component\\s*2/i.test(t)) {
            return 'Component 2 Hub';
        }
        if (u.indexOf('component-3') !== -1 || /component\\s*3/i.test(t)) {
            return 'Component 3 Hub';
        }
        if (u.indexOf('component-4') !== -1 || /component\\s*4/i.test(t)) {
            return 'Component 4 Hub';
        }
        
        var clean = t.split('|')[0].split('–')[0].split('-')[0].replace(/\\(.*?\\)/g, '').trim();
        if (clean.length > 20) clean = clean.substring(0, 20).trim();
        return clean ? clean + ' Hub' : 'Back';
    }

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
        var homeUrl = window.location.origin.replace(/\\/$/, '');
        if (parentHref.replace(/\\/$/, '') === homeUrl) return;
        
        var smartTitle = getSmartBackLabel(parentHref, parentA.innerText);
        
        // 1. TOP BACK BUTTON
        var topBar = document.createElement('div');
        topBar.className = 'mtg-back-nav-bar';
        topBar.innerHTML = '<a href="' + parentHref + '" class="mtg-back-btn">' +
            '<span class="back-icon-circle">&larr;</span>' +
            '<span>Back to ' + smartTitle + '</span>' +
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
            '<h4>Return to ' + smartTitle + '</h4>' +
            '</div>' +
            '<a href="' + parentHref + '" class="return-action-btn">&larr; Back to ' + smartTitle + '</a>';
        
        if (entryContent) {
            entryContent.appendChild(bottomCard);
        }
        
        // 3. FLOATING QUICK RETURN PILL (Shows when scrolling)
        var floatingPill = document.createElement('a');
        floatingPill.href = parentHref;
        floatingPill.className = 'mtg-floating-back-pill';
        floatingPill.innerHTML = '<span style="font-size: 14px;">&larr;</span> <span>Back to ' + smartTitle + '</span>';
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

    full_html = css_content + new_script
    
    # Strip <aside> wrapper tags if sending raw content to widget
    m_body = re.search(r'<div class="textwidget custom-html-widget">(.*?)</div>\s*</aside>', full_html, re.S)
    raw_content = m_body.group(1) if m_body else full_html
    
    print("Updating widget custom_html-2 on WordPress...")
    res = post_wp("widgets/custom_html-2", {"instance": {"raw": {"content": raw_content}}})
    print("SUCCESS: Updated custom_html-2 successfully!")

if __name__ == "__main__":
    main()
