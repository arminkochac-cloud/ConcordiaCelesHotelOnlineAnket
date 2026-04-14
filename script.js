'use strict';
console.log('✅ script.js yüklendi ve çalışıyor.');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec';
let currentStep = 1;
const totalSteps = 3;

// 🔹 SAYFA YÜKLENDİĞİNDE
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    updateProgress();
    showStep(1);
    console.log('🚀 Sistem hazır. Butonlar ve yıldızlar aktif.');
});

// 🔹 ADIM GÖSTERME
function showStep(n) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    const target = document.querySelector(`.step[data-step="${n}"]`);
    if (target) {
        target.classList.add('active');
        currentStep = n;
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    const section = document.querySelector(`.step[data-step="${step}"]`);
    if (!section) return true;

    const required = section.querySelectorAll('[required]');
    for (const el of required) {
        if (el.type === 'checkbox' && !el.checked) {
            alert('Lütfen KVKK onayını verin.');
            el.focus(); return false;
        }
        if (el.type === 'hidden' && !el.value) {
            alert('Lütfen tüm soruları yıldızlarla puanlayın.');
            return false;
        }
        if (!el.value.trim()) {
            alert('Lütfen zorunlu alanları doldurun.');
            el.focus(); return false;
        }
    }
    return true;
}

// 🔹 YILDIZ SİSTEMİ (KESİN LTR & TEMİZ)
function initStars() {
    console.log('⭐ Yıldız sistemi başlatılıyor...');
    document.querySelectorAll('.stars').forEach(container => {
        if (container.dataset.ready === '1') return;
        container.dataset.ready = '1';

        // Yönü kesin olarak sola sabitle
        container.style.direction = 'ltr';
        container.style.unicodeBidi = 'isolate';

        // Varsa radio'ları gizle
        container.querySelectorAll('input[type="radio"]').forEach(r => r.style.display = 'none');

        // Yıldız span'lerini oluştur (boşsa)
        if (!container.querySelector('.star')) {
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('span');
                star.className = 'star';
                star.textContent = '★';
                star.dataset.value = i;
                container.appendChild(star);
            }
        }

        const stars = Array.from(container.querySelectorAll('.star'));
        const hiddenInput = container.parentElement.querySelector('input[type="hidden"]');
        if (!hiddenInput) return;

        stars.forEach((star, index) => {
            star.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const val = index + 1; // 1,2,3,4,5
                hiddenInput.value = val;

                // Soldan sağa doldur
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i < val);
                });
                console.log(`✅ Puan: ${val}/5 | Alan: ${hiddenInput.name}`);
            });
        });
    });
    console.log('✅ Yıldız sistemi aktif. Yön: Soldan → Sağa');
}

// 🔹 İLERLEME ÇUBUĞU
function updateProgress() {
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill && text) {
        const pct = Math.round((currentStep / totalSteps) * 100);
        fill.style.width = pct + '%';
        text.textContent = pct + '%';
    }
}

// 🔹 FORM GÖNDERİMİ
async function submitForm() {
    if (!validateStep(currentStep)) return;

    const form = document.getElementById('surveyForm');
    if (!form) return;

    const data = Object.fromEntries(new FormData(form));
    // Yıldız puanlarını garantiye al
    document.querySelectorAll('.stars input[type="hidden"]').forEach(h => {
        if (h.value) data[h.name] = h.value;
    });

    const btn = document.querySelector('.btn.submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Gönderiliyor...'; }

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        document.getElementById('surveyForm').style.display = 'none';
        document.getElementById('thankScreen').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('📤 Anket başarıyla gönderildi.');
    } catch (err) {
        console.error('❌ Gönderim hatası:', err);
        alert('Bağlantı hatası. Lütfen tekrar deneyin.');
        if (btn) { btn.disabled = false; btn.textContent = '✅ Gönder'; }
    }
}

// 🔹 KVKK MODAL
window.openKvkk = () => document.getElementById('kvkkModal').style.display = 'flex';
window.closeKvkk = () => document.getElementById('kvkkModal').style.display = 'none';

// 🔹 GLOBAL EXPORT (HTML onclick için zorunlu)
window.nextStep = nextStep;
window.prevStep = prevStep;
window.submitForm = submitForm;
