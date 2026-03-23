// GOOGLE SHEETS URL (ayni URL)
var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';

// GOOGLE SHEETS'TEN VERİ CEKME
function loadFromGoogleSheets() {
    if (GOOGLE_SCRIPT_URL === 'BURAYA_KENDI_GOOGLE_SCRIPT_URLINIZI_YAPISITIRIN') return;
    
    fetch(GOOGLE_SCRIPT_URL)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data && data.length > 0) {
                localStorage.setItem('hotelSurveys', JSON.stringify(data));
                renderDashboard();
            }
        })
        .catch(function(err) {
            console.log('Google Sheets baglanti hatasi, yerel veri kullaniliyor:', err);
        });
}
// SAYFA YUKLENDI
document.addEventListener('DOMContentLoaded', function() {
    try {
        loadFromGoogleSheets();
        renderDashboard();
    } catch (e) {
        console.error('Hata:', e);
    }
});
    try {
        renderDashboard();
    } catch (e) {
        console.error('Hata:', e);
    }
});

// TUM SORU ISIMLERI (index.html ile birebir eslesme)
var ALL_FIELDS = [
    'girisKarsilama', 'checkInIslem', 'tesisBilgi', 'onBuroNezaket', 'bellboy',
    'grKararlama', 'sorunCozum', 'misafirTakip',
    'katIlkTemizlik', 'katGorunum', 'katGunlukTemizlik', 'minibar', 'genelAlan', 'sahilHavuz', 'katNezaket',
    'kahvaltiCesit', 'kahvaltiSunum', 'ogleCesit', 'ogleSunum', 'aksamCesit', 'aksamSunum', 'alacartYemek', 'mutfakHijyen', 'yiyecekNezaket',
    'pollBar', 'lobbyBar', 'snackBar', 'ickiKalite', 'barHijyen', 'barNezaket',
    'restDuzen', 'restYer', 'restHijyen', 'snackRest', 'alacartRest', 'restNezaket',
    'teknikSistem', 'ariza', 'cevreAydinlatma', 'havuzSu', 'teknikNezaket',
    'animasyonGunduz', 'sporAlan', 'showlar', 'miniclub', 'eglenceNezaket',
    'peyzaj', 'spa', 'esnaf', 'fiyatKalite'
];

// DEPARTMAN GRUPLARI
var DEPT_MAP = {
    'On Buro': ['girisKarsilama', 'checkInIslem', 'tesisBilgi', 'onBuroNezaket', 'bellboy'],
    'Guest Relation': ['grKararlama', 'sorunCozum', 'misafirTakip'],
    'Kat Hizmetleri': ['katIlkTemizlik', 'katGorunum', 'katGunlukTemizlik', 'minibar', 'genelAlan', 'sahilHavuz', 'katNezaket'],
    'Yiyecek': ['kahvaltiCesit', 'kahvaltiSunum', 'ogleCesit', 'ogleSunum', 'aksamCesit', 'aksamSunum', 'alacartYemek', 'mutfakHijyen', 'yiyecekNezaket'],
    'Barlar': ['pollBar', 'lobbyBar', 'snackBar', 'ickiKalite', 'barHijyen', 'barNezaket'],
    'Restaurant': ['restDuzen', 'restYer', 'restHijyen', 'snackRest', 'alacartRest', 'restNezaket'],
    'Teknik': ['teknikSistem', 'ariza', 'cevreAydinlatma', 'havuzSu', 'teknikNezaket'],
    'Eglence': ['animasyonGunduz', 'sporAlan', 'showlar', 'miniclub', 'eglenceNezaket'],
    'Diger': ['peyzaj', 'spa', 'esnaf', 'fiyatKalite']
};

// DEPARTMAN DETAY SORULARI (Turkce etiketler)
var DEPT_DETAIL = {
    'frontOffice': [
        ['Giris Karsilama', 'girisKarsilama'],
        ['C/In Islemleri', 'checkInIslem'],
        ['Tesis Hakkinda Bilgilendirme', 'tesisBilgi'],
        ['Personelin Ilgi ve Nezaketi', 'onBuroNezaket'],
        ['Bellboy Hizmetleri', 'bellboy']
    ],
    'guestRelation': [
        ['Karsilama Kalitesi', 'grKararlama'],
        ['Sorunlari Cozume', 'sorunCozum'],
        ['Misafir Takibi', 'misafirTakip']
    ],
    'housekeeping': [
        ['Ilk Varisinizda Oda Temizligi', 'katIlkTemizlik'],
        ['Oda Fiziki Gorunumu ve Konforu', 'katGorunum'],
        ['Konaklama Suresince Oda Temizligi', 'katGunlukTemizlik'],
        ['Minibar Hizmeti', 'minibar'],
        ['Genel Alan Temizligi', 'genelAlan'],
        ['Sahil ve Havuz Cevre Temizligi', 'sahilHavuz'],
        ['Personelin Ilgi ve Nezaketi', 'katNezaket']
    ],
    'foodServices': [
        ['Kahvalti Bufesi Cesitliligi', 'kahvaltiCesit'],
        ['Kahvalti Bufesi Sunumu ve Kalitesi', 'kahvaltiSunum'],
        ['Ogle Yemegi Bufesi Cesitliligi', 'ogleCesit'],
        ['Ogle Yemegi Sunumu ve Kalitesi', 'ogleSunum'],
        ['Aksam Yemegi Bufesi Cesitliligi', 'aksamCesit'],
        ['Aksam Yemegi Sunumu ve Kalitesi', 'aksamSunum'],
        ['Alacart Restaurant Yemegi', 'alacartYemek'],
        ['Mutfak Hijyen ve Temizligi', 'mutfakHijyen'],
        ['Personelin Ilgi ve Nezaketi', 'yiyecekNezaket']
    ],
    'barsServices': [
        ['Poll Bar Servis Kalitesi', 'pollBar'],
        ['Lobby Bar Servis Kalitesi', 'lobbyBar'],
        ['Snack Bar Servis Kalitesi', 'snackBar'],
        ['Icki Kalitesi ve Sunumu', 'ickiKalite'],
        ['Barlarin Hijyen ve Temizligi', 'barHijyen'],
        ['Personelin Ilgi ve Nezaketi', 'barNezaket']
    ],
    'restaurantServices': [
        ['Restaurant Duzeni ve Kalitesi', 'restDuzen'],
        ['Restaurant Yer Yeterliligi', 'restYer'],
        ['Restaurant Hijyen ve Temizligi', 'restHijyen'],
        ['Snackbar Restaurant Hizmeti', 'snackRest'],
        ['Alacart Restaurant Hizmeti', 'alacartRest'],
        ['Personelin Ilgi ve Nezaketi', 'restNezaket']
    ],
    'technicalService': [
        ['Oda Teknik Sistemleri', 'teknikSistem'],
        ['Ariza Bildirimi ve Giderme', 'ariza'],
        ['Cevre Aydinlatma ve Duzeni', 'cevreAydinlatma'],
        ['Havuz Suyu Temizligi', 'havuzSu'],
        ['Personelin Ilgi ve Nezaketi', 'teknikNezaket']
    ],
    'entertainmentServices': [
        ['Animasyon Ekibi ile Gunduz Aktiviteleri', 'animasyonGunduz'],
        ['Aktivite ve Spor Alanlari', 'sporAlan'],
        ['Aksam Aktiviteleri ve Showlar', 'showlar'],
        ['Miniclub Aktiviteleri', 'miniclub'],
        ['Personelin Ilgi ve Nezaketi', 'eglenceNezaket']
    ],
    'otherServices': [
        ['Genel Duzenleme / Peyzaj', 'peyzaj'],
        ['Sauna-Hamam Hizmetleri', 'spa'],
        ['Hotel Genel Esnaf Davranislari', 'esnaf'],
        ['Fiyat Kalitesi ve Iliskisi', 'fiyatKalite']
    ]
};

// ANA RENDER
function renderDashboard() {
    var rawDataStr = localStorage.getItem('hotelSurveys');
    var rawData = rawDataStr ? JSON.parse(rawDataStr) : [];
    
    if (rawData.length === 0) {
        document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h2>Veri Yok</h2><p>Anketi doldurup gonderdikten sonra burasi dolacak.</p><br><a href="index.html" style="color:blue;">Ankete Git</a></div>';
        return;
    }

    var filterType = document.getElementById('timeFilter').value;
    var filteredData = filterByTime(rawData, filterType);
    
    calcAvg(filteredData);
    calcTopPerformers(filteredData);
    drawDeptScores(filteredData);
    renderDeptDetail();
    drawCountryChart(filteredData);
    drawStaffChart(filteredData);
    drawTable(filteredData);
    drawComments(filteredData);
}

// ZAMAN FILTRESI
function filterByTime(data, type) {
    var now = new Date();
    return data.filter(function(item) {
        if (!item.date) return false;
        var dateStr = item.date;
        if (dateStr.indexOf('.') > -1) {
            var parts = dateStr.split(' ')[0].split('.');
            if (parts.length === 3) dateStr = parts[2] + '-' + parts[1] + '-' + parts[0];
        }
        var itemDate = new Date(dateStr);
        if (isNaN(itemDate)) return false;
        var diffDays = Math.ceil(Math.abs(now - itemDate) / (1000 * 60 * 60 * 24));
        if (type === 'all') return true;
        if (type === 'daily') return diffDays <= 1;
        if (type === 'weekly') return diffDays <= 7;
        if (type === 'monthly') return diffDays <= 30;
        if (type === 'yearly') return diffDays <= 365;
        return true;
    });
}

// GENEL ORTALAMA
function calcAvg(data) {
    var totalScore = 0;
    var count = 0;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < ALL_FIELDS.length; j++) {
            var val = data[i][ALL_FIELDS[j]];
            if (val && val !== '' && !isNaN(val)) {
                totalScore += parseInt(val);
                count++;
            }
        }
    }
    var el = document.getElementById('generalAvg');
    if (count === 0) { el.innerText = 'N/A'; return; }
    var avg = totalScore / count;
    var scaled = Math.round((avg / 5) * 100);
    el.innerText = scaled;
    el.style.color = scaled >= 80 ? '#28a745' : scaled >= 60 ? '#ffc107' : '#dc3545';
}

// EN IYI 3 DEPARTMAN VE PERSONEL
function calcTopPerformers(data) {
    var deptScores = [];
    var deptNames = Object.keys(DEPT_MAP);
    for (var d = 0; d < deptNames.length; d++) {
        var name = deptNames[d];
        var fields = DEPT_MAP[name];
        var sum = 0;
        var n = 0;
        for (var i = 0; i < data.length; i++) {
            for (var f = 0; f < fields.length; f++) {
                var val = data[i][fields[f]];
                if (val && val !== '' && !isNaN(val)) { sum += parseInt(val); n++; }
            }
        }
        if (n > 0) deptScores.push({ name: name, score: sum / n });
    }
    deptScores.sort(function(a, b) { return b.score - a.score; });
    
    var topDepts = deptScores.slice(0, 3).map(function(d) {
        return { name: d.name, val: Math.round((d.score / 5) * 100) + '%' };
    });
    drawMedals('topDepts', topDepts);

    // PERSONEL
    var staffCounts = {};
    for (var i = 0; i < data.length; i++) {
        var ps = data[i].praisedStaff;
        if (ps && ps.trim() !== '') {
            var names = ps.split(',');
            for (var k = 0; k < names.length; k++) {
                var nm = names[k].trim();
                if (nm) staffCounts[nm] = (staffCounts[nm] || 0) + 1;
            }
        }
    }
    var staffArr = [];
    for (var key in staffCounts) {
        staffArr.push({ name: key, val: staffCounts[key] + ' ovgu' });
    }
    staffArr.sort(function(a, b) { return parseInt(b.val) - parseInt(a.val); });
    drawMedals('topStaff', staffArr.slice(0, 3));
}

function drawMedals(containerId, items) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    if (items.length === 0) { el.innerHTML = '<p style="color:#999;">Veri yok</p>'; return; }
    var medals = ['1.', '2.', '3.'];
    for (var i = 0; i < items.length; i++) {
        el.innerHTML += '<div class="rank-item"><div class="medal">' + medals[i] + '</div><div class="rank-info"><strong>' + items[i].name + '</strong><span>' + items[i].val + '</span></div></div>';
    }
}

// DEPARTMAN PUANLARI GRAFIGI
function drawDeptScores(data) {
    var el = document.getElementById('deptChart');
    if (!el) return;
    var html = '';
    var deptNames = Object.keys(DEPT_MAP);
    for (var d = 0; d < deptNames.length; d++) {
        var name = deptNames[d];
        var fields = DEPT_MAP[name];
        var sum = 0;
        var n = 0;
        for (var i = 0; i < data.length; i++) {
            for (var f = 0; f < fields.length; f++) {
                var val = data[i][fields[f]];
                if (val && !isNaN(val)) { sum += parseInt(val); n++; }
            }
        }
        var avg = n > 0 ? Math.round((sum / n / 5) * 100) : 0;
        if (n > 0) html += makeBar(name, avg);
    }
    el.innerHTML = html || '<p style="color:#999;">Henuz puan girilmemis.</p>';
}

// DEPARTMAN DETAY ANALIZI
function renderDeptDetail() {
    var deptSelectEl = document.getElementById('deptSelect');
    if (!deptSelectEl) return;

    var dept = deptSelectEl.value;
    var el = document.getElementById('deptDetailChart');

    if (!dept || dept === '') {
        el.innerHTML = '<p style="color:#999;">Lutfen bir departman secin.</p>';
        return;
    }

    // VERIYI OKU
    var rawDataStr = localStorage.getItem('hotelSurveys');
    var data = rawDataStr ? JSON.parse(rawDataStr) : [];
    var filterType = document.getElementById('timeFilter').value;
    data = filterByTime(data, filterType);

    // SORULARI BUL
    var questions = DEPT_DETAIL[dept];

    if (!questions) {
        el.innerHTML = '<p style="color:red;">Departman bulunamadi: ' + dept + '</p>';
        return;
    }

    var html = '';
    var count = 0;

    for (var q = 0; q < questions.length; q++) {
        var label = questions[q][0];
        var field = questions[q][1];
        var sum = 0;
        var n = 0;
        for (var i = 0; i < data.length; i++) {
            var val = data[i][field];
            if (val && val !== '' && !isNaN(val)) {
                sum += parseInt(val);
                n++;
            }
        }
        if (n > 0) {
            var score = Math.round((sum / n / 5) * 100);
            html += makeBar(label, score);
            count++;
        }
    }

    if (count === 0) {
        html = '<p style="color:#999;">Bu departman icin henuz puan girilmedi.</p>';
    }

    el.innerHTML = html;
}

// ULKE GRAFIGI
function drawCountryChart(data) {
    var counts = {};
    for (var i = 0; i < data.length; i++) {
        var nat = data[i].nationality;
        if (nat) counts[nat] = (counts[nat] || 0) + 1;
    }
    var total = data.length;
    var el = document.getElementById('countryChart');
    if (!el) return;
    var html = '';
    for (var key in counts) {
        var pct = Math.round((counts[key] / total) * 100);
        html += makeBar(key, pct);
    }
    el.innerHTML = html || '<p style="color:#999;">Veri yok</p>';
}

// PERSONEL GRAFIGI
function drawStaffChart(data) {
    var counts = {};
    for (var i = 0; i < data.length; i++) {
        var ps = data[i].praisedStaff;
        if (ps && ps.trim() !== '') {
            var names = ps.split(',');
            for (var k = 0; k < names.length; k++) {
                var nm = names[k].trim();
                if (nm) counts[nm] = (counts[nm] || 0) + 1;
            }
        }
    }
    var el = document.getElementById('staffChart');
    if (!el) return;
    var html = '';
    for (var key in counts) {
        html += makeBar(key, counts[key] * 20);
    }
    el.innerHTML = html || '<p style="color:#999;">Veri yok</p>';
}

// BAR CIZICI
function makeBar(label, value) {
    var colorClass = 'bg-blue';
    if (value >= 90) colorClass = 'bg-gold';
    else if (value >= 70) colorClass = 'bg-green';
    return '<div class="bar-row"><div class="bar-label">' + label + '</div><div class="bar-area"><div class="bar-fill ' + colorClass + '" style="width:' + value + '%">' + value + '%</div></div></div>';
}

// TABLO
function drawTable(data) {
    var tbody = document.querySelector('#rawDataTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    var max = data.length > 10 ? 10 : data.length;
    for (var i = 0; i < max; i++) {
        var item = data[i];
        var tarih = item.date ? item.date.split(' ')[0] : '-';
        tbody.innerHTML += '<tr><td>' + tarih + '</td><td>' + (item.fullName || '-') + '</td><td>' + (item.roomNumber || '-') + '</td><td>' + (item.fiyatKalite || '-') + '/5</td></tr>';
    }
}

// YORUMLAR
function drawComments(data) {
    var div = document.getElementById('quickComments');
    if (!div) return;
    div.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.generalComments && item.generalComments.trim() !== '') {
            div.innerHTML += '<div style="background:#f9f9f9; padding:10px; border-radius:8px; margin-bottom:5px; font-size:13px;"><strong>' + (item.fullName || 'Misafir') + ':</strong> ' + item.generalComments + '</div>';
        }
    }
}

// TEMIZLE
function clearData() {
    if (confirm('Tum verileri silmek istediginize emin misiniz?')) {
        localStorage.removeItem('hotelSurveys');
        location.reload();
    }
}

// INDIR
function exportData() {
    var data = JSON.parse(localStorage.getItem('hotelSurveys') || '[]');
    if (data.length === 0) { alert('Veri yok!'); return; }
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'otel_verileri.json';
    link.click();
}