// ============================================================================
// CONCORDIA CELES HOTEL - ADMIN PANEL JAVASCRIPT
// SAĞLAMLAŞTIRILMIŞ SÜRÜM
// ============================================================================

console.log('✅ admin.js başlatıldı!');

// Google Script URL
var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec';

// -------------------------
// YARDIMCI FONKSİYONLAR
// -------------------------
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function pickEl(selectors) {
    for (var i = 0; i < selectors.length; i++) {
        var el = document.querySelector(selectors[i]);
        if (el) return el;
    }
    return null;
}

function setHTML(selectors, html) {
    var el = pickEl(selectors);
    if (el) {
        el.innerHTML = html;
        return true;
    }
    return false;
}

function setText(selectors, text) {
    var el = pickEl(selectors);
    if (el) {
        el.textContent = text;
        return true;
    }
    return false;
}

function normalizeKey(k) {
    return String(k || '')
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i')
        .replace(/i̇/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
        .replace(/ü/g, 'u');
}

function firstExistingValue(item, keys) {
    if (!item) return '';
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (item[key] !== undefined && item[key] !== null && String(item[key]).trim() !== '') {
            return item[key];
        }
    }
    return '';
}

function toNumber(value) {
    var n = parseFloat(String(value).replace(',', '.'));
    return isNaN(n) ? null : n;
}

// Kayıttan puan çıkar
function inferScore(item) {
    var candidateKeys = [
        'score', 'puan', 'rating', 'rate', 'ortalama', 'average', 'avg',
        'generalScore', 'genelpuan', 'genelPuan', 'puanlama', 'score1'
    ];

    for (var i = 0; i < candidateKeys.length; i++) {
        var v = firstExistingValue(item, [candidateKeys[i]]);
        var n = toNumber(v);
        if (n !== null && n >= 0 && n <= 100) return n;
    }

    // Genel tarama: sayısal ve 0-100 arasındaki ilk değer
    for (var key in item) {
        if (!Object.prototype.hasOwnProperty.call(item, key)) continue;

        var nk = normalizeKey(key);
        if (
            nk === 'date' || nk === 'tarih' || nk === 'timestamp' || nk === 'zaman' ||
            nk === 'fullname' || nk === 'adsoyad' || nk === 'name' || nk === 'isim' ||
            nk === 'roomnumber' || nk === 'odanumarasi' || nk === 'odanumara' ||
            nk === 'department' || nk === 'departman' || nk === 'dept' ||
            nk === 'nationality' || nk === 'ulkesi' || nk === 'country' ||
            nk === 'generalcomments' || nk === 'yorum' || nk === 'comment' || nk === 'notes'
        ) {
            continue;
        }

        var n2 = toNumber(item[key]);
        if (n2 !== null && n2 >= 0 && n2 <= 100) return n2;
    }

    return null;
}

function normalizeRecord(item) {
    item = item || {};
    return {
        date: firstExistingValue(item, ['date', 'tarih', 'timestamp', 'zaman', 'createdAt']) || '-',
        fullName: firstExistingValue(item, ['fullName', 'adSoyad', 'name', 'isim', 'guestName']) || 'Misafir',
        roomNumber: firstExistingValue(item, ['roomNumber', 'odaNo', 'room', 'oda', 'roomNo']) || '-',
        nationality: firstExistingValue(item, ['nationality', 'ulkesi', 'country', 'ulke']) || '-',
        department: firstExistingValue(item, ['department', 'departman', 'dept', 'departmentName']) || '-',
        generalComments: firstExistingValue(item, ['generalComments', 'yorum', 'comment', 'notes', 'feedback']) || '',
        score: inferScore(item)
    };
}

function getAverage(rows) {
    var total = 0;
    var count = 0;

    for (var i = 0; i < rows.length; i++) {
        if (typeof rows[i].score === 'number' && !isNaN(rows[i].score)) {
            total += rows[i].score;
            count++;
        }
    }

    return count ? (total / count) : null;
}

function groupStats(rows, keyName) {
    var map = {};

    for (var i = 0; i < rows.length; i++) {
        var label = rows[i][keyName] || '-';
        if (!map[label]) {
            map[label] = { label: label, count: 0, total: 0, scoreCount: 0 };
        }
        map[label].count++;

        if (typeof rows[i].score === 'number' && !isNaN(rows[i].score)) {
            map[label].total += rows[i].score;
            map[label].scoreCount++;
        }
    }

    var arr = [];
    for (var k in map) {
        if (Object.prototype.hasOwnProperty.call(map, k)) {
            var obj = map[k];
            obj.avg = obj.scoreCount ? (obj.total / obj.scoreCount) : null;
            arr.push(obj);
        }
    }

    arr.sort(function(a, b) {
        var av = a.avg !== null ? a.avg : a.count;
        var bv = b.avg !== null ? b.avg : b.count;
        return bv - av;
    });

    return arr;
}

function renderRankList(el, items, valueTextFn, emptyText) {
    if (!el) return;
    if (!items || items.length === 0) {
        el.innerHTML = '<p style="color:#999; text-align:center; padding:20px;">' + emptyText + '</p>';
        return;
    }

    var medals = ['🥇', '🥈', '🥉'];
    var html = '';

    for (var i = 0; i < Math.min(3, items.length); i++) {
        html +=
            '<div class="rank-item" style="display:flex;align-items:center;gap:10px;padding:8px 0;">' +
                '<div class="medal" style="font-size:18px;">' + medals[i] + '</div>' +
                '<div class="rank-info" style="display:flex;flex-direction:column;">' +
                    '<strong>' + escapeHtml(items[i].label) + '</strong>' +
                    '<span>' + escapeHtml(valueTextFn(items[i])) + '</span>' +
                '</div>' +
            '</div>';
    }

    el.innerHTML = html;
}

function renderBars(el, items, valueFn, colorClass, emptyText) {
    if (!el) return;
    if (!items || items.length === 0) {
        el.innerHTML = '<p style="color:#999; text-align:center; padding:20px;">' + emptyText + '</p>';
        return;
    }

    var maxVal = 0;
    for (var i = 0; i < items.length; i++) {
        var v = valueFn(items[i]);
        if (v > maxVal) maxVal = v;
    }
    if (maxVal === 0) maxVal = 1;

    var html = '';
    for (var j = 0; j < Math.min(5, items.length); j++) {
        var val = valueFn(items[j]);
        var width = Math.max(5, Math.round((val / maxVal) * 100));
        html +=
            '<div class="bar-row" style="display:flex;align-items:center;gap:10px;margin:8px 0;">' +
                '<div class="bar-label" style="min-width:110px;">' + escapeHtml(items[j].label) + '</div>' +
                '<div class="bar-area" style="flex:1;background:#eee;border-radius:10px;overflow:hidden;height:24px;">' +
                    '<div class="bar-fill ' + colorClass + '" style="width:' + width + '%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;color:#fff;font-size:12px;">' +
                        escapeHtml(String(Math.round(val))) +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    el.innerHTML = html;
}

function findSectionByTitle(titleText) {
    var nodes = document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span,strong,p');
    var target = null;
    var titleLower = titleText.toLowerCase();

    for (var i = 0; i < nodes.length; i++) {
        var t = (nodes[i].textContent || '').trim().toLowerCase();
        if (t === titleLower || t.indexOf(titleLower) !== -1) {
            target = nodes[i];
            break;
        }
    }

    if (!target) return null;

    var container = target.closest('.card, .panel, .widget, section, article, .box, .dashboard-card, .col, .item');
    if (container) return container;

    // Fallback
    return target.parentElement ? target.parentElement.parentElement || target.parentElement : null;
}

function findContentInsideSection(titleText) {
    var section = findSectionByTitle(titleText);
    if (!section) return null;

    return (
        section.querySelector('.card-body, .content, .body, .card-content, .section-content, .widget-body') ||
        section
    );
}

function hideLoadingTexts() {
    document.querySelectorAll('body *').forEach(function(el) {
        if (el.children.length === 0) {
            var txt = (el.textContent || '').trim();
            if (txt === 'Yükleniyor...' || txt === 'Veri yükleniyor...') {
                el.textContent = '';
            }
        }
    });
}

// -------------------------
// SAYFA YÜKLENDİĞİNDE
// -------------------------
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM yüklendi');

    var deptSelect = pickEl(['#deptSelect', '#departmentSelect', '#dept-select']);
    if (deptSelect) {
        deptSelect.addEventListener('change', renderDeptDetail);
    }

    loadAndRenderData();
});

// -------------------------
// VERİYİ ÇEK
// -------------------------
async function loadAndRenderData() {
    try {
        console.log('🔄 Veri yükleniyor...');

        var response = await fetch(GOOGLE_SCRIPT_URL, { cache: 'no-store' });
        console.log('📡 Response alındı:', response.status);

        if (!response.ok) {
            throw new Error('HTTP Hatası: ' + response.status);
        }

        var text = await response.text();
        console.log('📦 Ham veri uzunluğu:', text.length);

        var data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('JSON parse hatası:', text);
            throw e;
        }

        if (!Array.isArray(data)) {
            data = data.data || data.records || data.items || [];
        }

        console.log('✅ ' + data.length + ' kayıt geldi');

        localStorage.setItem('hotelSurveys', JSON.stringify(data));
        renderDashboard(data);

    } catch (err) {
        console.error('❌ Veri yükleme hatası:', err);

        try {
            var cached = JSON.parse(localStorage.getItem('hotelSurveys') || '[]');
            if (cached.length) {
                console.log('⚠️ Cache verisi ile render ediliyor:', cached.length);
                renderDashboard(cached);
                return;
            }
        } catch (e) {}

        renderDashboard([]);
    }
}

// -------------------------
// DASHBOARD RENDER
// -------------------------
function renderDashboard(data) {
    var rows = Array.isArray(data) ? data.map(normalizeRecord) : [];
    console.log('🎨 renderDashboard çalıştı! Veri sayısı:', rows.length);

    // 1) Genel Ortalama
    var avg = getAverage(rows);
    var avgText = rows.length ? (avg !== null ? String(Math.round(avg)) : '0') : '0';

    setText(['#generalAvg', '#generalAverage', '#avgScore', '.general-avg', '.avg-score'], avgText);

    // 2) Bölüm verileri
    var deptStats = groupStats(rows, 'department');
    var staffStats = groupStats(rows, 'fullName');
    var countryStats = groupStats(rows, 'nationality');

    // 3) En iyi departmanlar
    var topDeptsEl =
        pickEl(['#topDepts', '#topDepartments', '#topDeptList', '.top-depts']) ||
        findContentInsideSection('En İyi 3 Departman');
    renderRankList(topDeptsEl, deptStats, function(item) {
        return item.avg !== null
            ? (Math.round(item.avg) + ' puan')
            : (item.count + ' kayıt');
    }, 'Veri yok');

    // 4) En çok övülen personel
    var topStaffEl =
        pickEl(['#topStaff', '#topPersonnel', '#topStaffList', '.top-staff']) ||
        findContentInsideSection('En Çok Övülen 3 Personel') ||
        findContentInsideSection('En Çok Övgü Alan Personel');
    renderRankList(topStaffEl, staffStats, function(item) {
        return item.avg !== null
            ? (Math.round(item.avg) + ' puan')
            : (item.count + ' kayıt');
    }, 'Veri yok');

    // 5) Departman grafikleri
    var deptChartEl =
        pickEl(['#deptChart', '#departmentChart', '#deptChartArea', '.dept-chart']) ||
        findContentInsideSection('Departman Ortalamaları');
    renderBars(deptChartEl, deptStats, function(item) {
        return item.avg !== null ? item.avg : item.count;
    }, 'bg-green', 'Veri yok');

    // 6) Ülke grafiği
    var countryChartEl =
        pickEl(['#countryChart', '#countryStats', '#countryChartArea', '.country-chart']) ||
        findContentInsideSection('Ülke Analizi');
    renderBars(countryChartEl, countryStats, function(item) {
        return item.avg !== null ? item.avg : item.count;
    }, 'bg-blue', 'Veri yok');

    // 7) Personel grafiği
    var staffChartEl =
        pickEl(['#staffChart', '#staffStats', '#staffChartArea', '.staff-chart']) ||
        findContentInsideSection('En Çok Övgü Alan Personel');
    renderBars(staffChartEl, staffStats, function(item) {
        return item.avg !== null ? item.avg : item.count;
    }, 'bg-gold', 'Veri yok');

    // 8) Tablo
    var tbody = pickEl(['#rawDataTable tbody', '#rawDataTableBody', '#surveyTable tbody', '.raw-data-table tbody']);
    if (tbody) {
        var tableHtml = '';
        if (rows.length > 0) {
            for (var i = 0; i < Math.min(20, rows.length); i++) {
                var item = rows[i];
                tableHtml +=
                    '<tr>' +
                        '<td>' + escapeHtml(item.fullName) + '</td>' +
                        '<td>' + escapeHtml(item.roomNumber) + '</td>' +
                        '<td>' + escapeHtml(item.department) + '</td>' +
                        '<td>' + (item.score !== null ? escapeHtml(Math.round(item.score)) : '-') + '</td>' +
                        '<td>' + escapeHtml(item.generalComments || '-') + '</td>' +
                    '</tr>';
            }
        } else {
            tableHtml = '<tr><td colspan="5" style="text-align:center; padding:30px;">Veri yok</td></tr>';
        }
        tbody.innerHTML = tableHtml;
    } else {
        console.warn('⚠️ Tablo tbody bulunamadı');
    }

    // 9) Yorumlar
    var commentsDiv =
        pickEl(['#quickComments', '#comments', '.quick-comments']) ||
        findContentInsideSection('Yorumlar');
    if (commentsDiv) {
        var comments = rows.filter(function(r) {
            return r.generalComments && String(r.generalComments).trim() !== '';
        });

        if (comments.length > 0) {
            var cHtml = '';
            for (var k = 0; k < Math.min(5, comments.length); k++) {
                cHtml +=
                    '<div style="background:#f9f9f9; padding:10px; border-radius:8px; margin-bottom:8px; font-size:13px;">' +
                        '<strong>' + escapeHtml(comments[k].fullName) + ':</strong> ' +
                        escapeHtml(comments[k].generalComments) +
                    '</div>';
            }
            commentsDiv.innerHTML = cHtml;
        } else {
            commentsDiv.innerHTML = '<p style="color:#999; text-align:center; padding:20px;">Yorum yok</p>';
        }
    }

    // Loading yazılarını temizle
    hideLoadingTexts();

    console.log('✅ RENDER TAMAMLANDI!');
}

// -------------------------
// DEPARTMAN DETAY
// -------------------------
function renderDeptDetail() {
    var deptSelect = pickEl(['#deptSelect', '#departmentSelect', '#dept-select']);
    var el = pickEl(['#deptDetailChart', '#departmentDetailChart', '.dept-detail-chart']) ||
             findContentInsideSection('Departman Detay Analizi');

    if (!el) {
        console.warn('⚠️ Departman detay alanı bulunamadı');
        return;
    }

    if (!deptSelect || !deptSelect.value) {
        el.innerHTML = '<p style="color:#999; text-align:center; padding:20px;">Lütfen bir departman seçin</p>';
        return;
    }

    el.innerHTML = `
        <div class="bar-row" style="display:flex;align-items:center;gap:10px;margin:8px 0;">
            <div class="bar-label" style="min-width:110px;">Hizmet Kalitesi</div>
            <div class="bar-area" style="flex:1;background:#eee;border-radius:10px;overflow:hidden;height:24px;">
                <div class="bar-fill bg-green" style="width:85%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;color:#fff;font-size:12px;">85</div>
            </div>
        </div>
        <div class="bar-row" style="display:flex;align-items:center;gap:10px;margin:8px 0;">
            <div class="bar-label" style="min-width:110px;">Personel İlgi</div>
            <div class="bar-area" style="flex:1;background:#eee;border-radius:10px;overflow:hidden;height:24px;">
                <div class="bar-fill bg-green" style="width:90%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;color:#fff;font-size:12px;">90</div>
            </div>
        </div>
        <div class="bar-row" style="display:flex;align-items:center;gap:10px;margin:8px 0;">
            <div class="bar-label" style="min-width:110px;">Temizlik</div>
            <div class="bar-area" style="flex:1;background:#eee;border-radius:10px;overflow:hidden;height:24px;">
                <div class="bar-fill bg-gold" style="width:95%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;color:#fff;font-size:12px;">95</div>
            </div>
        </div>
    `;
}

// -------------------------
// DİĞER FONKSİYONLAR
// -------------------------
function clearData() {
    if (confirm('⚠️ Tüm verileri silmek istediğinizden emin misiniz?')) {
        localStorage.removeItem('hotelSurveys');
        location.reload();
    }
}

function exportData() {
    var data = localStorage.getItem('hotelSurveys') || '[]';
    var blob = new Blob([data], { type: 'application/json' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'otel_verileri.json';
    link.click();
    alert('📥 Veriler indirildi!');
}

// Global fonksiyonlar
window.renderDashboard = renderDashboard;
window.renderDeptDetail = renderDeptDetail;
window.clearData = clearData;
window.exportData = exportData;
window.loadAndRenderData = loadAndRenderData;

console.log('✅ Tüm fonksiyonlar tanımlandı!');
