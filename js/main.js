/* ============================================================
   MAIN.JS — Logic & Interactions for Kak Yani Website
   ============================================================
   This file manages all interactions: navigation, accessibility,
   article display, chatbot, WhatsApp, and animations.
   
   To add new ARTICLES, don't edit this file —
   edit the Jekyll collections instead.
   ============================================================ */

(function() {
  'use strict';

  // ============================================
  // SECURITY: XSS Protection
  // ============================================
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  function sanitize(str, max) {
    if (max === undefined) max = 10000;
    if (typeof str !== 'string') return '';
    return str.trim().slice(0, max);
  }

  function sanitizeHtml(html) {
    if (typeof html !== 'string') return '';
    var div = document.createElement('div');
    div.innerHTML = html;
    // Remove script tags, event handlers, and dangerous elements
    div.querySelectorAll('script, iframe, object, embed, form, input, textarea, select, button').forEach(function(el) { el.remove(); });
    div.querySelectorAll('*').forEach(function(el) {
      [].slice.call(el.attributes).forEach(function(attr) {
        if (attr.name.startsWith('on') || attr.value.startsWith('javascript:')) {
          el.removeAttribute(attr.name);
        }
      });
      if (el.tagName === 'A') el.setAttribute('rel', 'noopener noreferrer');
    });
    return div.innerHTML;
  }

  // ============================================
  // WhatsApp Configuration
  // ============================================
  var waNumber = (typeof WA_NUMBER !== 'undefined') ? WA_NUMBER : '6287836344456';
  var WA = {
    number: waNumber,
    templates: {
      default: 'Halo Kak Yani, saya melihat website Anda dan tertarik untuk tahu lebih lanjut.',
      speaker: 'Halo Kak Yani, saya tertarik mengundang Kak Yani sebagai narasumber.\n\nNama: \nLembaga/Perusahaan: \nAcara: \nTanggal & Lokasi: \nTopik yang diinginkan: \n\nMohon informasi lebih lanjut. Terima kasih.',
      training: 'Halo Kak Yani, saya tertarik mendiskusikan program pelatihan.\n\nNama: \nLembaga/Perusahaan: \nJabatan: \nTarget peserta: \nTujuan program: \n\nMohon kita atur waktu untuk konsultasi. Terima kasih.',
      catering: 'Halo Kak Yani, saya ingin memesan coffee catering.\n\nNama: \nAcara: \nTanggal & Lokasi: \nJumlah peserta: \n\nMohon penawarannya. Terima kasih.',
      coffee: 'Halo Kak Yani, saya tertarik dengan Blind Coffee Specialty.\n\nNama: \nMohon info menu, harga, dan cara pemesanan.\n\nTerima kasih.'
    }
  };
  function openWA(template) {
    if (template === undefined) template = 'default';
    var msg = encodeURIComponent(WA.templates[template] || WA.templates.default);
    window.open('https://wa.me/' + WA.number + '?text=' + msg, '_blank', 'noopener,noreferrer');
  }

  // ============================================
  // Toast
  // ============================================
  var toast = document.getElementById('toast');
  function showToast(msg, type) {
    if (type === undefined) type = '';
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    setTimeout(function() { toast.classList.remove('show'); }, 3500);
  }

  // ============================================
  // Navigation
  // ============================================
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-menu a');

  // Combined scroll handler with RAF throttle
  var scrollTicking = false;
  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      requestAnimationFrame(function() {
        // Nav styling
        nav.classList.toggle('scrolled', window.scrollY > 20);

        // Active section tracking
        var current = '';
        sections.forEach(function(s) {
          if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(function(l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  navToggle.addEventListener('click', function() {
    var open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
      // Close mobile menu when link is clicked
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Universal handler for ALL anchor links (menu, buttons, logo)
  // Purpose: Back button returns to previous section, not out of website
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Record to browser history so Back button works correctly
          history.pushState(null, '', href);
        }
      }
    });
  });

  // When Back/Forward browser button is pressed, scroll to matching section
  window.addEventListener('popstate', function() {
    var hash = window.location.hash;
    if (hash && hash.length > 1) {
      var target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // ============================================
  // Accessibility Panel
  // ============================================
  var a11yToggle = document.getElementById('a11yToggle');
  var a11yPanel = document.getElementById('a11yPanel');

  a11yToggle.addEventListener('click', function() {
    var open = a11yPanel.classList.toggle('open');
    a11yToggle.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', function(e) {
    if (!a11yPanel.contains(e.target) && !a11yToggle.contains(e.target)) {
      a11yPanel.classList.remove('open');
      a11yToggle.setAttribute('aria-expanded', 'false');
    }
  });

  function getPrefs() {
    try { return JSON.parse(localStorage.getItem('a11y') || '{}'); }
    catch(e) { return {}; }
  }
  function savePrefs(p) {
    try { localStorage.setItem('a11y', JSON.stringify(p)); } catch(e) {}
  }

  function loadPrefs() {
    var p = getPrefs();
    if (p.dys) { document.body.classList.add('mode-dyslexia'); document.getElementById('dysToggle').checked = true; }
    if (p.contrast) { document.body.classList.add('mode-contrast'); document.getElementById('contrastToggle').checked = true; }
    if (p.reduced) { document.body.classList.add('mode-reduced'); document.getElementById('motionToggle').checked = true; }
    if (p.size) {
      document.documentElement.style.setProperty('--font-scale', p.size);
      document.querySelectorAll('[data-size]').forEach(function(b) { b.classList.toggle('active', b.dataset.size === String(p.size)); });
    }
    if (p.line) {
      document.documentElement.style.setProperty('--line-height', p.line);
      document.querySelectorAll('[data-line]').forEach(function(b) { b.classList.toggle('active', b.dataset.line === String(p.line)); });
    }
  }

  document.getElementById('dysToggle').addEventListener('change', function(e) {
    document.body.classList.toggle('mode-dyslexia', e.target.checked);
    var p = getPrefs(); p.dys = e.target.checked; savePrefs(p);
  });
  document.getElementById('contrastToggle').addEventListener('change', function(e) {
    document.body.classList.toggle('mode-contrast', e.target.checked);
    var p = getPrefs(); p.contrast = e.target.checked; savePrefs(p);
  });
  document.getElementById('motionToggle').addEventListener('change', function(e) {
    document.body.classList.toggle('mode-reduced', e.target.checked);
    var p = getPrefs(); p.reduced = e.target.checked; savePrefs(p);
  });
  document.querySelectorAll('[data-size]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-size]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var s = parseFloat(btn.dataset.size);
      document.documentElement.style.setProperty('--font-scale', s);
      var p = getPrefs(); p.size = s; savePrefs(p);
    });
  });
  document.querySelectorAll('[data-line]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-line]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var l = parseFloat(btn.dataset.line);
      document.documentElement.style.setProperty('--line-height', l);
      var p = getPrefs(); p.line = l; savePrefs(p);
    });
  });
  document.getElementById('a11yReset').addEventListener('click', function() {
    localStorage.removeItem('a11y');
    document.body.classList.remove('mode-dyslexia', 'mode-contrast', 'mode-reduced');
    document.documentElement.style.removeProperty('--font-scale');
    document.documentElement.style.removeProperty('--line-height');
    document.getElementById('dysToggle').checked = false;
    document.getElementById('contrastToggle').checked = false;
    document.getElementById('motionToggle').checked = false;
    document.querySelectorAll('[data-size]').forEach(function(b) { b.classList.toggle('active', b.dataset.size === '1'); });
    document.querySelectorAll('[data-line]').forEach(function(b) { b.classList.toggle('active', b.dataset.line === '1.7'); });
    showToast('Pengaturan direset', 'success');
  });
  loadPrefs();

  // ============================================
  // ARTICLE SYSTEM (data from Jekyll Collections)
  // ============================================
  var ARTICLES = { story: [], biz: [] };

  function formatDate(tanggalStr) {
    try {
      var d = new Date(tanggalStr + 'T00:00:00');
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch(e) {
      return tanggalStr;
    }
  }

  function dateToTimestamp(tanggalStr) {
    return new Date(tanggalStr + 'T00:00:00').getTime() || 0;
  }

  // Strip HTML tags for preview and search — with caching
  var stripHtmlCache = new Map();
  function stripHtml(html) {
    if (stripHtmlCache.has(html)) return stripHtmlCache.get(html);
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    var text = tmp.textContent || tmp.innerText || '';
    stripHtmlCache.set(html, text);
    return text;
  }

  // Load articles from Jekyll-generated data
  function loadAllArticles(type) {
    if (typeof ARTIKEL_DATA === 'undefined') return;
    var data = type === 'story' ? ARTIKEL_DATA.story : ARTIKEL_DATA.biz;
    ARTICLES[type] = (data || []).map(function(a) {
      return {
        judul: a.judul || 'Tanpa Judul',
        tag: a.tag || '',
        tanggal: a.tanggal || '',
        isi: a.isi || ''
      };
    });
    renderArticles(type);
  }

  function getArticles(type) {
    return ARTICLES[type] ? ARTICLES[type].slice() : [];
  }

  function renderArticles(type, query) {
    if (query === undefined) query = '';
    var container = document.getElementById(type === 'story' ? 'storyEntries' : 'bizEntries');
    if (!container) return;
    var articles = getArticles(type);
    articles = articles.map(function(a, i) {
      var copy = {};
      for (var key in a) { copy[key] = a[key]; }
      copy._idx = i;
      return copy;
    });

    if (query) {
      var q = query.toLowerCase();
      articles = articles.filter(function(a) {
        return a.judul.toLowerCase().indexOf(q) !== -1 ||
          stripHtml(a.isi).toLowerCase().indexOf(q) !== -1 ||
          (a.tag && a.tag.toLowerCase().indexOf(q) !== -1);
      });
    }

    articles.sort(function(a, b) { return dateToTimestamp(b.tanggal) - dateToTimestamp(a.tanggal); });

    if (articles.length === 0) {
      container.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-state-icon" aria-hidden="true">📝</div>' +
          '<p>' + (query ? 'Tidak ada tulisan yang cocok dengan pencarian.' : 'Belum ada tulisan di sini.') + '</p>' +
        '</div>';
      return;
    }

    container.innerHTML = articles.map(function(a) {
      return '<button class="entry-card" data-idx="' + a._idx + '" data-type="' + type + '" role="listitem">' +
        '<div class="entry-card-meta">' +
          '<span>' + escapeHtml(formatDate(a.tanggal)) + '</span>' +
          (a.tag ? '<span class="entry-card-tag">' + escapeHtml(a.tag) + '</span>' : '') +
        '</div>' +
        '<h3>' + escapeHtml(a.judul) + '</h3>' +
        '<p class="entry-card-preview">' + escapeHtml(stripHtml(a.isi)) + '</p>' +
        '<div class="entry-card-read-more">Baca selengkapnya →</div>' +
      '</button>';
    }).join('');

    container.querySelectorAll('.entry-card').forEach(function(c) {
      c.addEventListener('click', function() { openReader(parseInt(c.dataset.idx, 10), c.dataset.type); });
    });
  }

  // ============================================
  // FOCUS TRAP for modal accessibility
  // ============================================
  function trapFocus(modal) {
    var focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    modal._trapHandler = function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    modal.addEventListener('keydown', modal._trapHandler);
    first.focus();
  }

  function releaseFocus(modal) {
    if (modal._trapHandler) {
      modal.removeEventListener('keydown', modal._trapHandler);
      delete modal._trapHandler;
    }
  }

  // ============================================
  // READER (read full article)
  // ============================================
  var readModal = document.getElementById('readModal');

  function openReader(idx, type) {
    var a = getArticles(type)[idx];
    if (!a) return;
    document.getElementById('readMeta').textContent = formatDate(a.tanggal) + (a.tag ? ' · ' + a.tag : '');
    document.getElementById('readTitle').textContent = a.judul;
    // Content is HTML from Jekyll, sanitize before rendering
    var contentEl = document.getElementById('readContent');
    contentEl.innerHTML = sanitizeHtml(a.isi);
    document.getElementById('readSummaryBox').innerHTML = '';
    readModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    trapFocus(readModal.querySelector('.modal'));
  }
  function closeReader() {
    releaseFocus(readModal.querySelector('.modal'));
    readModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('readClose').addEventListener('click', closeReader);
  readModal.addEventListener('click', function(e) { if (e.target === readModal) closeReader(); });

  document.getElementById('readSummary').addEventListener('click', function() {
    var content = document.getElementById('readContent').textContent;
    if (!content) return;
    var sentences = content.split(/[.!?]+/).filter(function(s) { return s.trim().length > 10; });
    var summary;
    if (sentences.length <= 3) summary = sentences.join('. ') + '.';
    else summary = sentences[0] + '. ' + sentences[Math.floor(sentences.length / 2)] + '. ' + sentences[sentences.length - 1] + '.';

    document.getElementById('readSummaryBox').innerHTML =
      '<div class="summary-box">' +
        '<strong>✦ Ringkasan AI</strong>' +
        escapeHtml(summary) +
      '</div>';
  });

  // ============================================
  // Search (separate debounce timers)
  // ============================================
  var storySearchTimer;
  var bizSearchTimer;
  var storySearchEl = document.getElementById('storySearch');
  var bizSearchEl = document.getElementById('bizSearch');
  if (storySearchEl) {
    storySearchEl.addEventListener('input', function(e) {
      clearTimeout(storySearchTimer);
      storySearchTimer = setTimeout(function() { renderArticles('story', e.target.value); }, 200);
    });
  }
  if (bizSearchEl) {
    bizSearchEl.addEventListener('input', function(e) {
      clearTimeout(bizSearchTimer);
      bizSearchTimer = setTimeout(function() { renderArticles('biz', e.target.value); }, 200);
    });
  }

  // ============================================
  // WhatsApp Buttons
  // ============================================
  document.getElementById('waFloat').addEventListener('click', function() { openWA(); });
  document.querySelectorAll('[data-wa]').forEach(function(btn) {
    btn.addEventListener('click', function() { openWA(btn.dataset.wa); });
  });

  // ============================================
  // Escape closes modals
  // ============================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (readModal.classList.contains('open')) closeReader();
      else if (a11yPanel.classList.contains('open')) { a11yPanel.classList.remove('open'); a11yToggle.setAttribute('aria-expanded', 'false'); }
    }
  });

  // ============================================
  // INIT — Load articles FIRST before reveal
  // ============================================
  loadAllArticles('story');
  loadAllArticles('biz');

  // ============================================
  // Scroll Reveal (after content is rendered)
  // ============================================
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('section').forEach(function(s, i) {
    s.classList.add('reveal');
    s.style.setProperty('--reveal-delay', (i * 0.05) + 's');
    observer.observe(s);
  });

  // Fallback: ensure all sections become visible after 2 seconds
  // This handles cases where IntersectionObserver doesn't trigger
  setTimeout(function() {
    document.querySelectorAll('section.reveal:not(.visible)').forEach(function(s) {
      s.classList.add('visible');
    });
  }, 2000);

})();
