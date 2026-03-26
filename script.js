var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8ZKP3i7Mej1c4OjUA-QMG2aEpEUNKcIltCP9IDj3XcyPF8Wsnmc-xdHDFFynB-r16sQ/exec';

var currentSection = 1;
var totalSections = 11;

/* =========================
   TARİH HELPERS
========================= */
function toISODate(d) {
    var yyyy = d.getFullYear();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return yyyy + '-' + mm + '-' + dd;
}

function setDefaultDates() {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Hem id ile hem name ile destek (hangisi varsa)
    var checkIn = document.getElementById('checkInDate') || document.querySelector('input[name="checkIn"]');
    var checkOut = document.getElementById('checkOutDate') || document.querySelector('input[name="checkOut"]');

    if (checkIn) checkIn.value = toISODate(today);
    if (checkOut) checkOut.value = toISODate(tomorrow);
}

/* =========================
   KVKK MODAL (GLOBAL)
========================= */
function showKvkk() {
    var modal = document.getElementById('kvkkModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeKvkk() {
    var modal = document.getElementById('kvkkModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// HTML onclick için garanti:
window.showKvkk = showKvkk;
window.closeKvkk = closeKvkk;

// Modal dışına tıklayınca kapat
document.addEventListener('click', function(e) {
    var modal = document.getElementById('kvkkModal');
    if (modal && e.target === modal) closeKvkk();
});

/* =========================
   STARS
========================= */
function initStars() {
    document.querySelectorAll('.stars').forEach(function(container) {
        if (container.children.length === 0) {
            for (var i = 1; i <= 5; i++) {
                var s = document.createElement('span');
                s.className = 'star';
                s.dataset.value = i;
                s.textContent = '★';
                container.appendChild(s);
            }
        }

        var hiddenInput = document.querySelector(
            'input[name="' + container.dataset.name + '"]'
        );

        var stars = container.querySelectorAll('.star');

        if (hiddenInput && hiddenInput.value) {
            highlightStars(stars, hiddenInput.value);
        }

        stars.forEach(function(star) {
            star.addEventListener('mouseenter', function() {
                highlightStars(stars, star.dataset.value);
            });

            star.addEventListener('mouseleave', function() {
                highlightStars(stars, hiddenInput ? hiddenInput.value : 0);
            });

            star.addEventListener('click', function() {
                if (hiddenInput) hiddenInput.value = star.dataset.value;
                highlightStars(stars, star.dataset.value);
            });
        });
    });
}

function highlightStars(stars, value) {
    stars.forEach(function(s) {
        s.classList.toggle(
            'selected',
            parseInt(s.dataset.value) <= parseInt(value || 0)
        );
    });
}

/* =========================
   GOOGLE SHEETS SEND (POST)
   - URL uzunluğu sorunu olmaz
========================= */
function sendToGoogle(data) {
    var payload = JSON.stringify(data);

    // 1) sendBeacon (çok stabil)
    try {
        if (navigator.sendBeacon) {
            var blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
            var ok = navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
            if (ok) return Promise.resolve(true);
        }
    } catch (e) {}

    // 2) fetch no-cors (preflight tetiklemesin)
    return fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload
    }).then(function(){ return true; })
      .catch(function(){ return false; });
}

/* =========================
   PAGE LOAD
========================= */
document.addEventListener('DOMContentLoaded', function() {
    initStars();
    setDefaultDates();

    var form = document.getElementById('mainForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Son gönderimde de KVKK kontrolü (garanti)
            var kvkk = document.getElementById('kvkkOnay');
            if (kvkk && !kvkk.checked) {
                alert("Lütfen KVKK metnini onaylayın!");
                return;
            }

            var formData = new FormData(this);
            var data = {};
            formData.forEach(function(value, key) {
                data[key] = value;
            });

            data.date = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });

            // LocalStorage yedek
            var surveys = JSON.parse(localStorage.getItem('hotelSurveys') || '[]');
            surveys.push(data);
            localStorage.setItem('hotelSurveys', JSON.stringify(surveys));

            // Google Sheets'e gönder
            sendToGoogle(data).then(function() {
                console.log('Gonderildi!');

                // teşekkür ekranı
                document.getElementById('surveyForm').style.display = 'none';
                document.getElementById('thankYou').style.display = 'block';
            });
        });
    }
});

/* =========================
   NEXT / PREV SECTION
========================= */
function nextSection(current) {
    var section = document.getElementById('section' + current);

    // KVKK kontrolü (sadece section 1)
    if (current === 1) {
        var kvkk = document.getElementById('kvkkOnay');
        if (kvkk && !kvkk.checked) {
            alert("Lütfen KVKK metnini onaylayın!");
            return;
        }
    }

    // required alanları kontrol et (text/date/email/select/textarea + checkbox + radio)
    var requiredFields = section.querySelectorAll('input[required], select[required], textarea[required]');

    // Radio grupları için önce isimleri topla
    var radioGroups = {};
    requiredFields.forEach(function(el) {
        if (el.type === 'radio') radioGroups[el.name] = true;
    });

    // Radio kontrol
    for (var name in radioGroups) {
        var checked = section.querySelector('input[name="' + name + '"]:checked');
        if (!checked) {
            alert("Lutfen bir secim yapin.");
            return;
        }
    }

    // Checkbox ve diğer required kontrol
    for (var i = 0; i < requiredFields.length; i++) {
        var el = requiredFields[i];

        if (el.type === 'radio') continue;

        if (el.type === 'checkbox') {
            if (!el.checked) {
                alert("Lütfen zorunlu alanları doldurun.");
                return;
            }
            continue;
        }

        if (String(el.value || '').trim() === '') {
            alert("Lutfen zorunlu alanlari doldurun.");
            el.focus();
            return;
        }
    }

    // İleri git
    document.getElementById('section' + current).classList.remove('active');
    document.getElementById('section' + (current + 1)).classList.add('active');

    var progressPct = ((current + 1) / totalSections * 100);
    document.getElementById('progressBar').style.width = progressPct + '%';
    document.getElementById('progressText').textContent = Math.round(progressPct) + '%';

    window.scrollTo({ top: 0, behavior: 'smooth' });
    initStars();
}

function prevSection(current) {
    document.getElementById('section' + current).classList.remove('active');
    document.getElementById('section' + (current - 1)).classList.add('active');

    var pct = ((current - 2) / totalSections * 100);
    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('progressText').textContent = Math.round(pct) + '%';
}

/* =========================
   RESET
========================= */
function resetForm() {
    document.getElementById('mainForm').reset();
    document.getElementById('surveyForm').style.display = 'none';
    document.getElementById('thankYou').style.display = 'none';
    document.getElementById('languageSelector').style.display = 'block';

    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressText').textContent = '0%';

    currentSection = 1;
    document.querySelectorAll('.section').forEach(function(s) {
        s.classList.remove('active');
    });
    document.getElementById('section1').classList.add('active');

    closeKvkk();
    setDefaultDates();
}

// HTML onclick'ler için:
window.nextSection = nextSection;
window.prevSection = prevSection;
window.resetForm = resetForm;
