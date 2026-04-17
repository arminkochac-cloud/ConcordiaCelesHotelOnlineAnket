// =====================================================
// CONCORDIA CELES HOTEL - GÜNCELLENMİŞ SCRIPT.JS
// =====================================================

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec';

let currentSectionIndex = 0;
let currentLang = 'tr';

// ------------------------------------------------------------------
// DİL SEÇİMİ
// ------------------------------------------------------------------
function setLanguage(lang) {
    currentLang = lang;
    
    const languageSelector = document.getElementById('languageSelector');
    const surveyForm = document.getElementById('surveyForm');
    const currentLangName = document.getElementById('currentLangName');

    if (languageSelector) languageSelector.style.display = 'none';
    if (surveyForm) surveyForm.style.display = 'block';
    
    if (currentLangName) {
        const langNames = {
            tr: 'Türkçe',
            en: 'English',
            de: 'Deutsch',
            ru: 'Русский',
            pl: 'Polski',
            ro: 'Română'
        };
        currentLangName.textContent = langNames[lang] || 'Türkçe';
    }

    // Dil değiştiğinde formu sıfırla
    resetForm();
}

function changeLanguage() {
    const languageSelector = document.getElementById('languageSelector');
    const surveyForm = document.getElementById('surveyForm');
    
    if (surveyForm) surveyForm.style.display = 'none';
    if (languageSelector) languageSelector.style.display = 'block';
}

// ------------------------------------------------------------------
// SECTIONS & PROGRESS
// ------------------------------------------------------------------
function getSections() {
    return Array.from(document.querySelectorAll('.section'));
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const sections = getSections();
    if (!progressBar || !progressText || sections.length === 0) return;

    const percent = Math.round(((currentSectionIndex + 1) / sections.length) * 100);
    progressBar.style.width = percent + '%';
    progressText.textContent = percent + '%';
}

function showSection(index) {
    const sections = getSections();
    if (!sections.length) return;

    index = Math.max(0, Math.min(index, sections.length - 1));

    sections.forEach((sec, i) => {
        sec.classList.toggle('active', i === index);
    });

    currentSectionIndex = index;
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

// ------------------------------------------------------------------
// VALIDATION
// ------------------------------------------------------------------
function validateCurrentSection() {
    const activeSection = document.querySelector('.section.active');
    if (!activeSection) return true;

    const required = activeSection.querySelectorAll('[required]');
    for (let el of required) {
        if (el.type === 'radio') {
            const checked = activeSection.querySelector(`input[name="${el.name}"]:checked`);
            if (!checked) {
                alert('Lütfen bu alanı doldurun.');
                return false;
            }
        } else if (!el.value.trim()) {
            alert('Lütfen zorunlu alanları doldurun.');
            el.focus();
            return false;
        }
    }
    return true;
}

// ------------------------------------------------------------------
// YILDIZ SİSTEMİ
// ------------------------------------------------------------------
function initStars() {
    document.querySelectorAll('.stars').forEach(container => {
        const name = container.dataset.name;
        const hidden = container.parentElement.querySelector(`input[name="${name}"]`);

        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<span class="star" data-value="${i}">★</span>`;
        }
        container.innerHTML = html;

        container.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', () => {
                const value = star.dataset.value;
                hidden.value = value;
                container.querySelectorAll('.star').forEach(s => {
                    s.style.color = parseInt(s.dataset.value) <= parseInt(value) ? '#facc15' : '#e2e8f0';
                });
            });
        });
    });
}

// ------------------------------------------------------------------
// DİĞER FONKSİYONLAR
// ------------------------------------------------------------------
function showKvkk() {
    document.getElementById('kvkkModal').style.display = 'flex';
}

function closeKvkk() {
    document.getElementById('kvkkModal').style.display = 'none';
}

function showThankYou() {
    document.getElementById('surveyForm').style.display = 'none';
    document.getElementById('thankYou').style.display = 'block';
}

function resetForm() {
    document.getElementById('mainForm').reset();
    currentSectionIndex = 0;
    showSection(0);
    initStars();
}

async function submitSurvey(e) {
    e.preventDefault();
    if (!validateCurrentSection()) return;

    const formData = new FormData(document.getElementById('mainForm'));
    const data = Object.fromEntries(formData);
    data.date = new Date().toLocaleString('tr-TR');
    data.kvkkOnay = document.getElementById('kvkkOnay').checked;

    try {
        const res = await fetch(GOOGLE_SCRIPT_URL + '?data=' + encodeURIComponent(JSON.stringify(data)), {
            method: 'GET'
        });
        const result = await res.json();
        
        if (result.status === 'success') {
            showThankYou();
        } else {
            alert('Gönderim sırasında bir hata oluştu.');
        }
    } catch (err) {
        console.error(err);
        alert('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
}

// ------------------------------------------------------------------
// BAŞLATMA
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    showSection(0);

    const form = document.getElementById('mainForm');
    if (form) form.addEventListener('submit', submitSurvey);

    // Dil seçici ilk açılış
    document.getElementById('surveyForm').style.display = 'none';
    document.getElementById('languageSelector').style.display = 'block';
});

// Global fonksiyonları pencereye ekle
window.setLanguage = setLanguage;
window.changeLanguage = changeLanguage;
window.nextSection = nextSection;
window.prevSection = prevSection;
window.showKvkk = showKvkk;
window.closeKvkk = closeKvkk;
window.resetForm = resetForm;
