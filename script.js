'use strict';

// ============================================================================
// CONCORDIA CELES HOTEL - FRONTEND SCRIPT (FINAL CLEAN VERSION)
// Pure Vanilla JS | No Dependencies | Production Ready
// ============================================================================

const CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec',
  PROGRESS_BAR_ID: 'progressBar',
  PROGRESS_TEXT_ID: 'progressText',
  FORM_ID: 'mainForm',
  SURVEY_SCREEN_ID: 'surveyForm',
  THANK_SCREEN_ID: 'thankYou',
  KVKK_MODAL_ID: 'kvkkModal'
};

let currentSectionIndex = 0;

// ---------------------------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ script.js yüklendi.');
  initStars();
  updateProgressBar();
  showSection(0);
  console.log('🚀 Sistem hazır.');
});

// ---------------------------------------------------------------------------
// SECTION NAVIGATION
// ---------------------------------------------------------------------------
function getSections() {
  return Array.from(document.querySelectorAll('.section'));
}

function showSection(index) {
  const sections = getSections();
  if (!sections.length) return;
  currentSectionIndex = Math.max(0, Math.min(index, sections.length - 1));
  sections.forEach((sec, i) => sec.classList.toggle('active', i === currentSectionIndex));
  updateProgressBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextSection() {
  if (!validateCurrentSection()) return;
  showSection(currentSectionIndex + 1);
}

function prevSection() {
  showSection(currentSectionIndex - 1);
}

// ---------------------------------------------------------------------------
// VALIDATION
// ---------------------------------------------------------------------------
function validateCurrentSection() {
  const sections = getSections();
  const active = sections[currentSectionIndex];
  if (!active) return true;

  const required = active.querySelectorAll('[required]');
  for (const el of required) {
    if (el.offsetParent === null && el.type !== 'hidden') continue;

    if (el.type === 'radio' || el.type === 'checkbox') {
      const group = active.querySelectorAll(`input[name="${el.name}"]`);
      if (!Array.from(group).some(r => r.checked)) {
        alert('Lütfen zorunlu alanları doldurun.');
        return false;
      }
    } else if (el.type === 'hidden' && !el.value) {
      alert('Lütfen tüm soruları yıldızlarla puanlayın.');
      return false;
    } else if (!el.value.trim()) {
      alert('Lütfen zorunlu alanları doldurun.');
      if (el.offsetParent !== null) el.focus();
      return false;
    }
  }
  return true;
}

// ---------------------------------------------------------------------------
// STAR RATING SYSTEM
// ---------------------------------------------------------------------------
function initStars() {
  console.log('⭐ Yıldız sistemi başlatılıyor...');
  document.querySelectorAll('.stars').forEach(container => {
    if (container.dataset.ready === '1') return;
    container.dataset.ready = '1';

    const stars = container.querySelectorAll('.star');
    const hidden = container.querySelector('input[type="hidden"]');
    if (!hidden) return;

    // Radio butonları varsa tamamen gizle
    container.querySelectorAll('input[type="radio"]').forEach(r => r.style.display = 'none');

    stars.forEach((star, idx) => {
      star.style.cursor = 'pointer';
      star.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const val = idx + 1; // 1, 2, 3, 4, 5
        hidden.value = val;

        // Soldan sağa doldur
        stars.forEach((s, i) => {
          s.classList.toggle('selected', i < val);
        });
        console.log(`✅ Puan: ${val}/5 | Input: ${hidden.name}`);
      });
    });
  });
  console.log('✅ Yıldız sistemi hazır.');
}

// ---------------------------------------------------------------------------
// PROGRESS BAR
// ---------------------------------------------------------------------------
function updateProgressBar() {
  const bar = document.getElementById(CONFIG.PROGRESS_BAR_ID);
  const text = document.getElementById(CONFIG.PROGRESS_TEXT_ID);
  const sections = getSections();
  if (!bar || !text || sections.length < 2) return;

  const percent = Math.round((currentSectionIndex / (sections.length - 1)) * 100);
  bar.style.width = `${percent}%`;
  text.textContent = `${percent}%`;
}

// ---------------------------------------------------------------------------
// FORM SUBMISSION
// ---------------------------------------------------------------------------
async function submitSurvey() {
  if (!validateCurrentSection()) return;

  const form = document.getElementById(CONFIG.FORM_ID);
  if (!form) return;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Yıldız puanlarını manuel ekle
  document.querySelectorAll('.stars input[type="hidden"]').forEach(h => {
    if (h.value) data[h.name] = h.value;
  });

  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Gönderiliyor...';
  }

  try {
    const res = await fetch(CONFIG.SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    document.getElementById(CONFIG.SURVEY_SCREEN_ID).style.display = 'none';
    document.getElementById(CONFIG.THANK_SCREEN_ID).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('📤 Anket başarıyla gönderildi.');
  } catch (err) {
    console.error('❌ Gönderim hatası:', err);
    alert('Bağlantı hatası. Lütfen tekrar deneyin.');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '✅ Anketi Gönder';
    }
  }
}

function resetForm() {
  const form = document.getElementById(CONFIG.FORM_ID);
  if (form) form.reset();
  
  document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
  document.querySelectorAll('input[type="hidden"]').forEach(h => h.value = '');
  
  document.getElementById(CONFIG.THANK_SCREEN_ID).style.display = 'none';
  document.getElementById(CONFIG.SURVEY_SCREEN_ID).style.display = 'block';
  
  currentSectionIndex = 0;
  showSection(0);
  initStars();
}

// ---------------------------------------------------------------------------
// KVKK MODAL
// ---------------------------------------------------------------------------
function showKvkk() {
  const modal = document.getElementById(CONFIG.KVKK_MODAL_ID);
  if (modal) modal.style.display = 'flex';
}

function closeKvkk() {
  const modal = document.getElementById(CONFIG.KVKK_MODAL_ID);
  if (modal) modal.style.display = 'none';
}

// ---------------------------------------------------------------------------
// GLOBAL EXPORTS (HTML onclick için zorunlu)
// ---------------------------------------------------------------------------
window.nextSection = nextSection;
window.prevSection = prevSection;
window.submitSurvey = submitSurvey;
window.resetForm = resetForm;
window.showKvkk = showKvkk;
window.closeKvkk = closeKvkk;
window.initStars = initStars;
