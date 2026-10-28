/**
 * Music Tech Guru — Universal Interactive Quiz & Homework Paywall Gate
 * Integrates directly with Supabase Auth (qjzoncdhfbeyvtiabsdk.supabase.co)
 * Provides free preview for Questions 1-2, then gates subsequent questions behind MTG Pro membership.
 */

(function() {
  'use strict';

  const SUPABASE_URL = 'https://qjzoncdhfbeyvtiabsdk.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqem9uY2RoZmJleXZ0aWFic2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MDc1MDMsImV4cCI6MjA4Njk4MzUwM30.vyegI182lQXo9yqtGW6Mwvqz-BNbSenD-Era4AxZBJE';

  let supabaseClient = null;
  let cachedPremiumStatus = null;

  // Initialize Supabase Client
  function initSupabase() {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
      } catch (e) {
        console.warn('MTG Paywall: Could not init Supabase client', e);
      }
    }
  }

  // Check if current user is premium
  async function checkIsPremium() {
    // 1. Dev Mode bypass
    if (localStorage.getItem('dev_mode') === 'true' || localStorage.getItem('mtg_dev_mode') === 'true') {
      return true;
    }

    // 2. Check cached status
    if (cachedPremiumStatus !== null) {
      return cachedPremiumStatus;
    }

    // 3. Check SessionStorage cache
    const sessionCache = sessionStorage.getItem('mtg_is_premium');
    if (sessionCache === 'true') {
      cachedPremiumStatus = true;
      return true;
    }

    // 4. Check Supabase session in localStorage
    try {
      const storageKey = 'sb-qjzoncdhfbeyvtiabsdk-auth-token';
      const rawSession = localStorage.getItem(storageKey);
      if (rawSession) {
        const parsed = JSON.parse(rawSession);
        const user = parsed?.user;
        if (user) {
          // If we have supabaseClient, query profile
          if (supabaseClient) {
            const { data, error } = await supabaseClient
              .from('profiles')
              .select('is_premium, role')
              .eq('id', user.id)
              .single();
            if (!error && data) {
              const isPrem = Boolean(data.is_premium || data.role === 'teacher');
              cachedPremiumStatus = isPrem;
              sessionStorage.setItem('mtg_is_premium', isPrem ? 'true' : 'false');
              return isPrem;
            }
          }
          // Fallback user metadata
          if (user.user_metadata?.is_premium || user.app_metadata?.is_premium) {
            cachedPremiumStatus = true;
            return true;
          }
        }
      }
    } catch (e) {
      console.warn('MTG Paywall: Session check error', e);
    }

    cachedPremiumStatus = false;
    return false;
  }

  // Create Paywall Overlay HTML
  function getPaywallModalHTML(questionNumber) {
    return `
      <div id="mtgPaywallOverlay" style="
        position: fixed;
        inset: 0;
        background: rgba(8, 14, 26, 0.94);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #f8fafc;
        animation: mtgFadeIn 0.3s ease-out;
      ">
        <style>
          @keyframes mtgFadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
          .mtg-pw-card {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            border: 1px solid rgba(192, 132, 252, 0.4);
            border-radius: 24px;
            max-width: 540px;
            width: 100%;
            padding: 36px 32px;
            text-align: center;
            box-shadow: 0 25px 60px -15px rgba(0,0,0,0.9), 0 0 50px rgba(192,132,252,0.25);
            position: relative;
          }
          .mtg-pw-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(192, 132, 252, 0.15);
            color: #c084fc;
            border: 1px solid rgba(192, 132, 252, 0.35);
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 6px 14px;
            border-radius: 50px;
            margin-bottom: 18px;
          }
          .mtg-pw-title {
            font-size: 26px;
            font-weight: 900;
            color: #ffffff;
            margin: 0 0 12px 0;
            line-height: 1.25;
          }
          .mtg-pw-desc {
            font-size: 14.5px;
            color: #94a3b8;
            line-height: 1.6;
            margin: 0 0 24px 0;
          }
          .mtg-pw-features {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 16px 20px;
            margin-bottom: 24px;
            text-align: left;
            font-size: 13px;
            color: #cbd5e1;
          }
          .mtg-pw-features li {
            margin: 8px 0;
            list-style: none;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .mtg-pw-btn-primary {
            display: block;
            width: 100%;
            background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
            color: #ffffff;
            border: none;
            border-radius: 12px;
            padding: 14px 20px;
            font-size: 15px;
            font-weight: 800;
            cursor: pointer;
            text-decoration: none;
            box-shadow: 0 8px 25px rgba(192, 132, 252, 0.4);
            transition: all 0.2s ease;
            margin-bottom: 12px;
          }
          .mtg-pw-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(192, 132, 252, 0.55);
          }
          .mtg-pw-btn-secondary {
            display: block;
            width: 100%;
            background: rgba(255, 255, 255, 0.06);
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .mtg-pw-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.3);
          }
          .mtg-pw-login-form {
            display: none;
            margin-top: 18px;
            text-align: left;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 12px;
            padding: 18px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .mtg-pw-input {
            width: 100%;
            box-sizing: border-box;
            background: #0b0f19;
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #fff;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 14px;
            margin-bottom: 10px;
          }
          .mtg-pw-input:focus {
            outline: none;
            border-color: #c084fc;
          }
        </style>

        <div class="mtg-pw-card">
          <div class="mtg-pw-badge">
            <span>🔒</span> Music Tech Guru Pro
          </div>

          <h2 class="mtg-pw-title">Free Preview Completed</h2>
          <p class="mtg-pw-desc">
            You've completed questions 1–2! Questions 3 through 10, complete audio examiner analysis, and full specification grading are reserved for MTG Pro subscribers and licensed schools.
          </p>

          <ul class="mtg-pw-features">
            <li><span style="color: #38bdf8;">✓</span> <strong>All 10 Specification Questions</strong> across AO3 &amp; AO4</li>
            <li><span style="color: #34d399;">✓</span> <strong>In-Depth Examiner Insights</strong> &amp; model answers</li>
            <li><span style="color: #fbbf24;">✓</span> <strong>Curriculum Scheme of Work</strong> progress tracking</li>
            <li><span style="color: #c084fc;">✓</span> <strong>Downloadable PDF Exam &amp; Homework Packs</strong></li>
          </ul>

          <a href="https://app.musictechguru.com/" target="_blank" rel="noopener noreferrer" class="mtg-pw-btn-primary">
            Unlock Full Access • Get Revision Pass &rarr;
          </a>

          <button id="mtgShowLoginBtn" class="mtg-pw-btn-secondary" onclick="window.MTG_Paywall.toggleLogin()">
            Already Subscribed? Sign In with MTG
          </button>

          <div id="mtgLoginForm" class="mtg-pw-login-form">
            <div style="font-size: 13px; font-weight: 700; color: #cbd5e1; margin-bottom: 8px;">MTG Student or Teacher Login:</div>
            <input type="email" id="mtgLoginEmail" class="mtg-pw-input" placeholder="Your Email Address" autocomplete="email">
            <input type="password" id="mtgLoginPassword" class="mtg-pw-input" placeholder="Password" autocomplete="current-password">
            <div id="mtgLoginError" style="color: #ef4444; font-size: 12px; margin-bottom: 8px; display: none;"></div>
            <button type="button" class="mtg-pw-btn-primary" style="padding: 10px; margin-bottom: 0;" onclick="window.MTG_Paywall.handleLogin()">
              Sign In &amp; Resume Quiz
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Main Paywall Controller
  window.MTG_Paywall = {
    freePreviewLimit: 2, // First 2 questions (index 0 and 1) are free

    async check(index, onResume) {
      if (index < this.freePreviewLimit) {
        return true; // Free preview allowed
      }

      const isPremium = await checkIsPremium();
      if (isPremium) {
        return true;
      }

      // Show Paywall
      this.showModal(index, onResume);
      return false;
    },

    showModal(questionIndex, onResume) {
      this.onResume = onResume;
      if (document.getElementById('mtgPaywallOverlay')) return;

      const div = document.createElement('div');
      div.id = 'mtgPaywallWrapper';
      div.innerHTML = getPaywallModalHTML(questionIndex + 1);
      document.body.appendChild(div);
    },

    hideModal() {
      const el = document.getElementById('mtgPaywallWrapper');
      if (el) el.remove();
    },

    toggleLogin() {
      const form = document.getElementById('mtgLoginForm');
      const btn = document.getElementById('mtgShowLoginBtn');
      if (form) {
        const isHidden = form.style.display === 'none' || !form.style.display;
        form.style.display = isHidden ? 'block' : 'none';
        if (btn) btn.innerText = isHidden ? 'Hide Login' : 'Already Subscribed? Sign In with MTG';
      }
    },

    async handleLogin() {
      const email = document.getElementById('mtgLoginEmail')?.value.trim();
      const password = document.getElementById('mtgLoginPassword')?.value;
      const errEl = document.getElementById('mtgLoginError');

      if (!email || !password) {
        if (errEl) { errEl.textContent = 'Please enter your email and password.'; errEl.style.display = 'block'; }
        return;
      }

      if (!supabaseClient) {
        initSupabase();
      }

      if (!supabaseClient) {
        if (errEl) { errEl.textContent = 'Authentication service initializing. Please try again.'; errEl.style.display = 'block'; }
        return;
      }

      try {
        if (errEl) errEl.style.display = 'none';
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Check profile
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('is_premium, role')
          .eq('id', data.user.id)
          .single();

        const isPrem = Boolean(profile?.is_premium || profile?.role === 'teacher' || data.user.user_metadata?.is_premium);
        if (isPrem) {
          cachedPremiumStatus = true;
          sessionStorage.setItem('mtg_is_premium', 'true');
          this.hideModal();
          const banner = document.getElementById('homeworkPaywallBanner');
          const lockedArea = document.getElementById('homeworkLockedArea');
          if (banner) banner.style.display = 'none';
          if (lockedArea) {
            lockedArea.style.filter = 'none';
            lockedArea.style.pointerEvents = 'auto';
            lockedArea.style.userSelect = 'auto';
            lockedArea.style.opacity = '1';
          }
          if (typeof this.onResume === 'function') {
            this.onResume();
          }
        } else {
          if (errEl) {
            errEl.textContent = 'Signed in, but your account does not have an active MTG Pro subscription.';
            errEl.style.display = 'block';
          }
        }
      } catch (err) {
        if (errEl) {
          errEl.textContent = err.message || 'Login failed. Please check credentials.';
          errEl.style.display = 'block';
        }
      }
    },

    install() {
      initSupabase();

      // Hook into loadQuestion
      if (typeof window.loadQuestion === 'function') {
        const originalLoad = window.loadQuestion;
        window.loadQuestion = async (idx) => {
          const allowed = await window.MTG_Paywall.check(idx, () => originalLoad(idx));
          if (allowed) {
            originalLoad(idx);
          }
        };
      }

      // Hook into renderQuestion (used in synthesizer & rock-n-roll)
      if (typeof window.renderQuestion === 'function') {
        const originalRender = window.renderQuestion;
        window.renderQuestion = async () => {
          const currentIdx = typeof window.currentQ !== 'undefined' ? window.currentQ : 0;
          const allowed = await window.MTG_Paywall.check(currentIdx, () => originalRender());
          if (allowed) {
            originalRender();
          }
        };
      }
      // Check for Homework Page
      if (document.body.classList.contains('mtg-homework-page')) {
        checkIsPremium().then(isPrem => {
          const banner = document.getElementById('homeworkPaywallBanner');
          const lockedArea = document.getElementById('homeworkLockedArea');
          if (!isPrem) {
            if (banner) banner.style.display = 'block';
            if (lockedArea) {
              lockedArea.style.filter = 'blur(6px)';
              lockedArea.style.pointerEvents = 'none';
              lockedArea.style.userSelect = 'none';
              lockedArea.style.opacity = '0.6';
            }
          } else {
            if (banner) banner.style.display = 'none';
            if (lockedArea) {
              lockedArea.style.filter = 'none';
              lockedArea.style.pointerEvents = 'auto';
              lockedArea.style.userSelect = 'auto';
              lockedArea.style.opacity = '1';
            }
          }
        });
      }
    }
  };

  // Auto-run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.MTG_Paywall.install());
  } else {
    window.MTG_Paywall.install();
  }
})();
