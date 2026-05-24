/* ============================================================
   MAIN.JS — Logika & Interaksi Website Kak Yani
   ============================================================
   File ini mengatur semua interaksi: navigasi, aksesibilitas,
   menampilkan artikel, chatbot, WhatsApp, dan animasi.
   
   Untuk menambah TULISAN baru, jangan edit file ini —
   edit file "articles.js" yang lebih mudah.
   ============================================================ */

// ============================================
// SECURITY: XSS Protection
// ============================================
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function sanitize(str, max = 10000) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, max);
}

// ============================================
// Konfigurasi WhatsApp
// ============================================
const WA = {
  number: '6287836344456',
  templates: {
    default: 'Halo Kak Yani, saya melihat website Anda dan tertarik untuk tahu lebih lanjut.',
    speaker: 'Halo Kak Yani, saya tertarik mengundang Kak Yani sebagai narasumber.\n\nNama: \nLembaga/Perusahaan: \nAcara: \nTanggal & Lokasi: \nTopik yang diinginkan: \n\nMohon informasi lebih lanjut. Terima kasih.',
    training: 'Halo Kak Yani, saya tertarik mendiskusikan program pelatihan.\n\nNama: \nLembaga/Perusahaan: \nJabatan: \nTarget peserta: \nTujuan program: \n\nMohon kita atur waktu untuk konsultasi. Terima kasih.',
    catering: 'Halo Kak Yani, saya ingin memesan coffee catering.\n\nNama: \nAcara: \nTanggal & Lokasi: \nJumlah peserta: \n\nMohon penawarannya. Terima kasih.',
    coffee: 'Halo Kak Yani, saya tertarik dengan Blind Coffee Specialty.\n\nNama: \nMohon info menu, harga, dan cara pemesanan.\n\nTerima kasih.'
  }
};
function openWA(template = 'default') {
  const msg = encodeURIComponent(WA.templates[template] || WA.templates.default);
  window.open(`https://wa.me/${WA.number}?text=${msg}`, '_blank', 'noopener,noreferrer');
}

// ============================================
// Toast
// ============================================
const toast = document.getElementById('toast');
function showToast(msg, type = '') {
  toast.textContent = msg;
  toast.className = 'toast show ' + type;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ============================================
// Navigation
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    // Tutup menu mobile saat link diklik
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Handler universal untuk SEMUA anchor link (menu, tombol, logo)
// Tujuan: tombol Back kembali ke section sebelumnya, bukan keluar website
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Catat ke riwayat browser supaya tombol Back berfungsi benar
        history.pushState(null, '', href);
      }
    }
  });
});

// Saat tombol Back/Forward browser ditekan, scroll ke section yang sesuai
window.addEventListener('popstate', () => {
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

// ============================================
// Accessibility Panel
// ============================================
const a11yToggle = document.getElementById('a11yToggle');
const a11yPanel = document.getElementById('a11yPanel');

a11yToggle.addEventListener('click', () => {
  const open = a11yPanel.classList.toggle('open');
  a11yToggle.setAttribute('aria-expanded', open);
});

document.addEventListener('click', e => {
  if (!a11yPanel.contains(e.target) && !a11yToggle.contains(e.target)) {
    a11yPanel.classList.remove('open');
    a11yToggle.setAttribute('aria-expanded', 'false');
  }
});

function getPrefs() {
  try { return JSON.parse(localStorage.getItem('a11y') || '{}'); }
  catch { return {}; }
}
function savePrefs(p) {
  try { localStorage.setItem('a11y', JSON.stringify(p)); } catch {}
}

function loadPrefs() {
  const p = getPrefs();
  if (p.dys) { document.body.classList.add('mode-dyslexia'); document.getElementById('dysToggle').checked = true; }
  if (p.contrast) { document.body.classList.add('mode-contrast'); document.getElementById('contrastToggle').checked = true; }
  if (p.reduced) { document.body.classList.add('mode-reduced'); document.getElementById('motionToggle').checked = true; }
  if (p.size) {
    document.documentElement.style.setProperty('--font-scale', p.size);
    document.querySelectorAll('[data-size]').forEach(b => b.classList.toggle('active', b.dataset.size === String(p.size)));
  }
  if (p.line) {
    document.documentElement.style.setProperty('--line-height', p.line);
    document.querySelectorAll('[data-line]').forEach(b => b.classList.toggle('active', b.dataset.line === String(p.line)));
  }
}

document.getElementById('dysToggle').addEventListener('change', e => {
  document.body.classList.toggle('mode-dyslexia', e.target.checked);
  const p = getPrefs(); p.dys = e.target.checked; savePrefs(p);
});
document.getElementById('contrastToggle').addEventListener('change', e => {
  document.body.classList.toggle('mode-contrast', e.target.checked);
  const p = getPrefs(); p.contrast = e.target.checked; savePrefs(p);
});
document.getElementById('motionToggle').addEventListener('change', e => {
  document.body.classList.toggle('mode-reduced', e.target.checked);
  const p = getPrefs(); p.reduced = e.target.checked; savePrefs(p);
});
document.querySelectorAll('[data-size]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-size]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const s = parseFloat(btn.dataset.size);
    document.documentElement.style.setProperty('--font-scale', s);
    const p = getPrefs(); p.size = s; savePrefs(p);
  });
});
document.querySelectorAll('[data-line]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-line]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const l = parseFloat(btn.dataset.line);
    document.documentElement.style.setProperty('--line-height', l);
    const p = getPrefs(); p.line = l; savePrefs(p);
  });
});
document.getElementById('a11yReset').addEventListener('click', () => {
  localStorage.removeItem('a11y');
  document.body.classList.remove('mode-dyslexia', 'mode-contrast', 'mode-reduced');
  document.documentElement.style.removeProperty('--font-scale');
  document.documentElement.style.removeProperty('--line-height');
  document.getElementById('dysToggle').checked = false;
  document.getElementById('contrastToggle').checked = false;
  document.getElementById('motionToggle').checked = false;
  document.querySelectorAll('[data-size]').forEach(b => b.classList.toggle('active', b.dataset.size === '1'));
  document.querySelectorAll('[data-line]').forEach(b => b.classList.toggle('active', b.dataset.line === '1.7'));
  showToast('Pengaturan direset', 'success');
});
loadPrefs();

// ============================================
// ARTICLE SYSTEM (data dari Jekyll Collections)
// ============================================
const ARTIKEL = { story: [], biz: [] };

function formatTanggal(tanggalStr) {
  try {
    const d = new Date(tanggalStr + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return tanggalStr;
  }
}

function tanggalKeAngka(tanggalStr) {
  return new Date(tanggalStr + 'T00:00:00').getTime() || 0;
}

// Menghapus tag HTML untuk preview dan pencarian
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// Memuat artikel dari data yang sudah di-generate Jekyll
function muatSemuaArtikel(type) {
  if (typeof ARTIKEL_DATA === 'undefined') return;
  const data = type === 'story' ? ARTIKEL_DATA.story : ARTIKEL_DATA.biz;
  ARTIKEL[type] = (data || []).map(a => ({
    judul: a.judul || 'Tanpa Judul',
    tag: a.tag || '',
    tanggal: a.tanggal || '',
    isi: a.isi || ''
  }));
  renderArticles(type);
}

function getArticles(type) {
  return ARTIKEL[type] ? ARTIKEL[type].slice() : [];
}

function renderArticles(type, query = '') {
  const container = document.getElementById(type === 'story' ? 'storyEntries' : 'bizEntries');
  if (!container) return;
  let articles = getArticles(type);
  articles = articles.map((a, i) => ({ ...a, _idx: i }));

  if (query) {
    const q = query.toLowerCase();
    articles = articles.filter(a =>
      a.judul.toLowerCase().includes(q) ||
      stripHtml(a.isi).toLowerCase().includes(q) ||
      (a.tag && a.tag.toLowerCase().includes(q))
    );
  }

  articles.sort((a, b) => tanggalKeAngka(b.tanggal) - tanggalKeAngka(a.tanggal));

  if (articles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">📝</div>
        <p>${query ? 'Tidak ada tulisan yang cocok dengan pencarian.' : 'Belum ada tulisan di sini.'}</p>
      </div>`;
    return;
  }

  container.innerHTML = articles.map(a => `
    <button class="entry-card" data-idx="${a._idx}" data-type="${type}" role="listitem">
      <div class="entry-card-meta">
        <span>${escapeHtml(formatTanggal(a.tanggal))}</span>
        ${a.tag ? `<span class="entry-card-tag">${escapeHtml(a.tag)}</span>` : ''}
      </div>
      <h3>${escapeHtml(a.judul)}</h3>
      <p class="entry-card-preview">${escapeHtml(stripHtml(a.isi))}</p>
      <div class="entry-card-read-more">Baca selengkapnya →</div>
    </button>`).join('');

  container.querySelectorAll('.entry-card').forEach(c => {
    c.addEventListener('click', () => openReader(parseInt(c.dataset.idx), c.dataset.type));
  });
}

// ============================================
// READER (baca artikel penuh)
// ============================================
const readModal = document.getElementById('readModal');

function openReader(idx, type) {
  const a = getArticles(type)[idx];
  if (!a) return;
  document.getElementById('readMeta').textContent = `${formatTanggal(a.tanggal)}${a.tag ? ' · ' + a.tag : ''}`;
  document.getElementById('readTitle').textContent = a.judul;
  // Konten sudah HTML dari Jekyll, langsung render
  const contentEl = document.getElementById('readContent');
  contentEl.innerHTML = a.isi;
  document.getElementById('readSummaryBox').innerHTML = '';
  readModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeReader() {
  readModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('readClose').addEventListener('click', closeReader);
readModal.addEventListener('click', e => { if (e.target === readModal) closeReader(); });

document.getElementById('readSummary').addEventListener('click', () => {
  const content = document.getElementById('readContent').textContent;
  if (!content) return;
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
  let summary;
  if (sentences.length <= 3) summary = sentences.join('. ') + '.';
  else summary = `${sentences[0]}. ${sentences[Math.floor(sentences.length / 2)]}. ${sentences[sentences.length - 1]}.`;

  document.getElementById('readSummaryBox').innerHTML = `
    <div class="summary-box">
      <strong>✦ Ringkasan AI</strong>
      ${escapeHtml(summary)}
    </div>`;
});

// ============================================
// Search
// ============================================
let searchT;
const storySearchEl = document.getElementById('storySearch');
const bizSearchEl = document.getElementById('bizSearch');
if (storySearchEl) {
  storySearchEl.addEventListener('input', e => {
    clearTimeout(searchT);
    searchT = setTimeout(() => renderArticles('story', e.target.value), 200);
  });
}
if (bizSearchEl) {
  bizSearchEl.addEventListener('input', e => {
    clearTimeout(searchT);
    searchT = setTimeout(() => renderArticles('biz', e.target.value), 200);
  });
}

// ============================================
// WhatsApp Buttons
// ============================================
document.getElementById('waFloat').addEventListener('click', () => openWA());
document.querySelectorAll('[data-wa]').forEach(btn => {
  btn.addEventListener('click', () => openWA(btn.dataset.wa));
});

// ============================================
// Escape closes modals
// ============================================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (readModal.classList.contains('open')) closeReader();
    else if (a11yPanel.classList.contains('open')) { a11yPanel.classList.remove('open'); a11yToggle.setAttribute('aria-expanded', 'false'); }
  }
});

// ============================================
// INIT — Muat artikel DULU sebelum reveal
// ============================================
muatSemuaArtikel('story');
muatSemuaArtikel('biz');

// ============================================
// Scroll Reveal (setelah konten ter-render)
// ============================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('section').forEach(s => {
  s.classList.add('reveal');
  observer.observe(s);
});

// Fallback: pastikan semua section menjadi visible setelah 2 detik
// Ini menangani kasus di mana IntersectionObserver tidak terpicu
setTimeout(() => {
  document.querySelectorAll('section.reveal:not(.visible)').forEach(s => {
    s.classList.add('visible');
  });
}, 2000);

console.log('%c☕ Kak Yani — Jekyll Build', 'color: #C25E3C; font-size: 16px; font-weight: bold;');
console.log('Artikel: diproses oleh Jekyll dari koleksi _my-story/ dan _bisnis/');

