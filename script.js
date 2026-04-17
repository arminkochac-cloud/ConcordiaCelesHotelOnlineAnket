const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec';

let currentLang = 'tr';
let currentSectionIndex = 0;

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('languageSelector').style.display = 'none';
    document.getElementById('surveyForm').style.display = 'block';
    
    if (typeof updateTranslations === 'function') {
        updateTranslations(lang);
    }
    
    document.getElementById('currentLangName').textContent = lang.toUpperCase();
    resetForm();
}

function updateProgressBar() {
    const progress = document.getElementById('progressBar');
    const text = document.getElementById('progressText');
    const totalSections = document.querySelectorAll('.section').length;
    if (!progress || !text) return;
    const percent = Math.round(((currentSectionIndex + 1) / totalSections) * 100);
    progress.style.width = percent + '%';
    text.textContent = percent + '%';
}

function showSection(n) {
    document.querySelectorAll('.section').forEach((sec, i) => {
        sec.style.display = (i === n) ? 'block' : 'none';
    });
    currentSectionIndex = n;
    updateProgressBar();
}

function nextSection() {
    const sections = document.querySelectorAll('.section');
    if (currentSectionIndex < sections.length - 1) {
        showSection(currentSectionIndex + 1);
    }
}

function prevSection() {
    if (currentSectionIndex > 0) {
        showSection(currentSectionIndex - 1);
    }
}

function initStars() {
    document.querySelectorAll('.stars').forEach(container => {
        const name = container.dataset.name;
        const hidden = container.parentElement.querySelector(`input[name="${name}"]`);
        container.innerHTML = [1,2,3,4,5].map(i => 
            `<span class="star" data-value="${i}">★</span>`
        ).join('');
        
        container.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', () => {
                const val = star.dataset.value;
                hidden.value = val;
                container.querySelectorAll('.star').forEach(s => {
                    s.style.color = parseInt(s.dataset.value) <= parseInt(val) ? '#ffd700' : '#ddd';
                });
            });
        });
    });
}

function resetForm() {
    document.getElementById('mainForm').reset();
    currentSectionIndex = 0;
    showSection(0);
    initStars();
}

// Submit
document.getElementById('mainForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    data.date = new Date().toLocaleString('tr-TR');
    
    try {
        await fetch(GOOGLE_SCRIPT_URL + '?data=' + encodeURIComponent(JSON.stringify(data)));
        document.getElementById('surveyForm').style.display = 'none';
        document.getElementById('thankYou').style.display = 'block';
    } catch (err) {
        alert('Gönderim hatası');
    }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    showSection(0);
    initStars();
});

window.setLanguage = setLanguage;
window.nextSection = nextSection;
window.prevSection = prevSection;
