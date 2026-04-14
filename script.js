'use strict';
console.log('✅ script.js yüklendi.');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec';
let currentStep = 0;

// 🔹 SAYFA YÜKLENDİĞİNDE
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    updateProgress();
    showStep(0);
    console.log('🚀 Sistem hazır.');
});

// 🔹 ADIM GÖSTERME
function showStep(index) {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;
    currentStep = Math.max(0, Math.min(index, sections.length - 1));
    sections.forEach((sec, i) => sec.classList.toggle('active', i === currentStep));
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 🔹 İLERİ / GERİ
function nextStep() {
    if (!validateStep(currentStep)) return;
    showStep(currentStep + 1);
}
function prevStep() {
    showStep(currentStep - 1);
}

// 🔹 VALIDASYON
function validateStep(step) {
    const section = document.querySelectorAll('.section')[step];
    if (!section) return true;
    const required = section.querySelectorAll('[required]');
    for (const el of required) {
        if (el.type === 'checkbox' && !el.checked) {
            alert('Lütfen zorunlu onayı verin.'); el.focus(); return false;
        }
        if (el.type === 'hidden' && !el.value) {
            alert('Lütfen tüm soruları yıldızlarla puanlayın.'); return false;
        }
        if (!el.value.trim()) {
            alert('Lütfen zorunlu alanları doldurun.'); el.focus(); return false;
        }
    }
    return true;
}

// 🔹 YILDIZ SİSTEMİ (SOLDAN SAĞA DOLDURUR)
function initStars() {
    document.querySelectorAll('.stars').forEach(container => {
        if (container.dataset.ready === '1') return;
        container.dataset.ready = '1';
        
        const stars = container.querySelectorAll('.star');
        const hidden = container.querySelector('input[type="hidden"]');
        if (!hidden) return;

        // Radio'ları gizle
        container.querySelectorAll('input[type="radio"]').forEach(r => r.style.display = 'none');

        stars.forEach((star, idx) => {
            star.style.cursor = 'pointer';
            star.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const val = idx + 1;
                hidden.value = val;
                stars.forEach((s, i) => s.classList.toggle('selected', i < val));
                console.log(`✅ Puan: ${val}/5`);
            });
        });
    });
}

// 🔹 İLERLEME ÇUBUĞU
function updateProgress() {
    const bar = document.getElementById('progressBar');
    const text = document.getElementById('progressText');
    const total = document.querySelectorAll('.section').length;
    if (bar && text) {
        const pct = Math.round(((currentStep + 1) / total) * 100);
        bar.style.width = pct + '%';
        text.textContent = pct + '%';
    }
}

// 🔹 FORM GÖNDERİMİ
async function submitSurvey() {
    if (!validateStep(currentStep)) return;
    const form = document.querySelector('form');
    if (!form) return;

    const data = Object.fromEntries(new FormData(form));
    document.querySelectorAll('.stars input[type="hidden"]').forEach(h => data[h.name] = h.value);

    const btn = document.querySelector('.btn-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Gönderiliyor...'; }

    try {
        await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(data) });
        document.getElementById('surveyForm').style.display = 'none';
        document.getElementById('thankYou').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('📤 Gönderildi.');
    } catch (err) {
        alert('Bağlantı hatası. Lütfen tekrar deneyin.');
        if (btn) { btn.disabled = false; btn.textContent = '✅ Gönder'; }
    }
}

// 🔹 GLOBAL FONKSİYONLAR
window.nextStep = nextStep;
window.prevStep = prevStep;
window.submitSurvey = submitSurvey;
window.showKvkk = () => document.getElementById('kvkkModal').style.display = 'flex';
window.closeKvkk = () => document.getElementById('kvkkModal').style.display = 'none';
window.resetForm = () => location.reload();
