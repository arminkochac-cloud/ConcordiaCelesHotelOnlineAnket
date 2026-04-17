const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec';

let currentLang = 'tr';
let currentSectionIndex = 0;

// Dil Seçimi
function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('languageSelector').style.display = 'none';
    document.getElementById('surveyForm').style.display = 'block';
    document.getElementById('currentLangName').textContent = {
        tr: 'Türkçe', en: 'English', de: 'Deutsch', 
        ru: 'Русский', pl: 'Polski', ro: 'Română'
    }[lang] || 'Türkçe';
    
    resetForm();
}

function changeLanguage() {
    document.getElementById('surveyForm').style.display = 'none';
    document.getElementById('languageSelector').style.display = 'block';
}

// Bölüm Yönetimi
function getSections() {
    return Array.from(document.querySelectorAll('.section'));
}

function updateProgressBar() {
    const bar = document.getElementById('progressBar');
    const text = document.getElementById('progressText');
    const sections = getSections();
    if (!bar || !text) return;
    
    const percent = Math.round(((currentSectionIndex + 1) / sections.length) * 100);
    bar.style.width = percent + '%';
    text.textContent = percent + '%';
}

function showSection(index) {
    const sections = getSections();
    sections.forEach((s, i) => s.classList.toggle('active', i === index));
    currentSectionIndex = index;
    updateProgressBar();
    window.scrollTo(0, 0);
}

function nextSection() {
    if (validateCurrentSection()) showSection(currentSectionIndex + 1);
}

function prevSection() {
    showSection(currentSectionIndex - 1);
}

function validateCurrentSection() {
    const active = document.querySelector('.section.active');
    if (!active) return true;

    const required = active.querySelectorAll('[required]');
    for (let field of required) {
        if ((field.type === 'radio' && !active.querySelector(`[name="${field.name}"]:checked`)) ||
            (!field.value && field.type !== 'radio')) {
            alert('Lütfen zorunlu alanları doldurun.');
            return false;
        }
    }
    return true;
}

// Yıldız Sistemi
function initStars() {
    document.querySelectorAll('.stars').forEach(container => {
        const name = container.getAttribute('data-name');
        const hiddenInput = container.parentElement.querySelector(`input[name="${name}"]`);
        
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<span class="star" data-value="${i}">★</span>`;
        }
        container.innerHTML = html;

        container.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', () => {
                const val = star.getAttribute('data-value');
                hiddenInput.value = val;
                container.querySelectorAll('.star').forEach(s => {
                    s.style.color = (parseInt(s.getAttribute('data-value')) <= parseInt(val)) ? '#facc15' : '#e2e8f0';
                });
            });
        });
    });
}

// Diğer Fonksiyonlar
function showKvkk() { document.getElementById('kvkkModal').style.display = 'flex'; }
function closeKvkk() { document.getElementById('kvkkModal').style.display = 'none'; }

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
    const data = Object.fromEntries(formData.entries());
    data.date = new Date().toLocaleString('tr-TR');

    try {
        const res = await fetch(GOOGLE_SCRIPT_URL + '?data=' + encodeURIComponent(JSON.stringify(data)));
        const result = await res.json();
        if (result.status === 'success') showThankYou();
        else alert('Gönderim hatası.');
    } catch (err) {
        alert('Bağlantı hatası. Tekrar deneyin.');
    }
}

// Başlat
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    showSection(0);
    document.getElementById('mainForm').addEventListener('submit', submitSurvey);
});

// Global fonksiyonlar
window.setLanguage = setLanguage;
window.changeLanguage = changeLanguage;
window.nextSection = nextSection;
window.prevSection = prevSection;
window.showKvkk = showKvkk;
window.closeKvkk = closeKvkk;
window.resetForm = resetForm;
