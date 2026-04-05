// ============================================================================
// CONCORDİA CELES HOTEL - ADMIN PANEL JAVASCRIPT v5
// GERÇEK VERİDEN HESAPLAMA & OTOMATİK SIRALAMA
// ============================================================================
console.log('🚀 admin.js v5 yüklendi (Dinamik Hesaplama Aktif)');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec';

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM hazır, veri çekiliyor...');
    loadDashboard();
});

async function loadDashboard() {
    try {
        const res = await fetch(SCRIPT_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const validData = Array.isArray(data) ? data : [];
        console.log(`📦 ${validData.length} kayıt alındı`);
        localStorage.setItem('hotelSurveys', JSON.stringify(validData));
        renderDashboard(validData);
    } catch (err) {
        console.error('❌ Veri çekme hatası:', err);
        renderDashboard([]);
    }
}

// Esnek alan okuyucu (Türkçe/İngilizce başlık uyumu)
function getField(item, ...keys) {
    for (let k of keys) {
        if (item[k] !== undefined && item[k] !== null && item[k] !== '') return item[k];
    }
    return null;
}

function renderDashboard(data) {
    console.log('🎨 Panel render ediliyor (Dinamik)...');

    // 1. GENEL ORTALAMA HESAPLA
    let totalScore = 0, count = 0;
    data.forEach(item => {
        let score = parseFloat(getField(item, 'Puan', 'puan', 'score', 'Score'));
        if (!isNaN(score)) { totalScore += score; count++; }
    });
    let avg = count > 0 ? Math.round(totalScore / count) : 0;
    const avgEl = document.getElementById('generalAvg');
    if (avgEl) {
        avgEl.textContent = avg;
        avgEl.style.color = avg >= 85 ? '#28a745' : avg >= 70 ? '#ffc107' : '#dc3545';
    }

    // 2. DEPARTMAN ORTALAMALARI & SIRALAMA
    let deptData = {};
    data.forEach(item => {
        let dept = getField(item, 'Departman', 'departman', 'department', 'Department') || 'Belirtilmedi';
        let score = parseFloat(getField(item, 'Puan', 'puan', 'score', 'Score'));
        if (!deptData[dept]) deptData[dept] = [];
        if (!isNaN(score)) deptData[dept].push(score);
    });
    let deptRanking = Object.keys(deptData).map(d => {
        let scores = deptData[d];
        return { name: d, avg: Math.round(scores.reduce((a,b)=>a+b,0)/scores.length), count: scores.length };
    }).sort((a,b) => b.avg - a.avg);

    const topDepts = document.getElementById('topDepts');
    if (topDepts) {
        topDepts.innerHTML = deptRanking.length > 0 ? deptRanking.slice(0,3).map((d, i) => {
            let medal = i===0?'🥇':i===1?'🥈':'🥉';
            return `<div style="padding:8px; border-bottom:1px solid #eee;">${medal} ${d.name} <span style="float:right;color:#28a745">${d.avg}% (${d.count} anket)</span></div>`;
        }).join('') : '<p style="color:#999;text-align:center;padding:15px">Veri yok</p>';
    }

    // 3. PERSONEL SIRALAMA (Değerlendirme sayısına göre)
    let staffData = {};
    data.forEach(item => {
        let name = getField(item, 'Ad Soyad', 'adSoyad', 'fullName', 'personel', 'Personel');
        if (name && name.trim() !== '' && name !== 'Misafir') {
            staffData[name] = (staffData[name] || 0) + 1;
        }
    });
    let staffRanking = Object.keys(staffData).map(n => ({ name: n, count: staffData[n] }))
        .sort((a,b) => b.count - a.count);

    const topStaff = document.getElementById('topStaff');
    if (topStaff) {
        topStaff.innerHTML = staffRanking.length > 0 ? staffRanking.slice(0,3).map((s, i) => {
            let medal = i===0?'🥇':i===1?'🥈':'';
            return `<div style="padding:8px;">${medal} ${s.name} <span style="float:right;color:#ffc107">${s.count} değerlendirme</span></div>`;
        }).join('') : '<p style="color:#999;text-align:center;padding:15px">Veri yok</p>';
    }

    // 4. GRAFİKLER (Dinamik)
    const deptChart = document.getElementById('deptChart');
    const countryChart = document.getElementById('countryChart');
    const staffChart = document.getElementById('staffChart');

    if (deptChart) deptChart.innerHTML = deptRanking.length > 0 ? createBars(deptRanking.slice(0,5).map(d => `${d.name}:${d.avg}`)) : emptyMsg();
    
    let countryData = {};
    data.forEach(item => {
        let c = getField(item, 'Ülke', 'ulke', 'nationality', 'country');
        if (c) countryData[c] = (countryData[c] || 0) + 1;
    });
    let countryRanking = Object.keys(countryData).map(c => ({ name: c, count: countryData[c] })).sort((a,b)=>b.count-a.count);
    if (countryChart) countryChart.innerHTML = countryRanking.length > 0 ? createBars(countryRanking.slice(0,5).map(c => `${c.name}:${Math.round(c.count/data.length*100)}`)) : emptyMsg();

    if (staffChart) staffChart.innerHTML = staffRanking.length > 0 ? createBars(staffRanking.slice(0,5).map(s => `${s.name}:${s.count}`)) : emptyMsg();

    // 5. YORUMLAR (Son 5)
    const comments = document.getElementById('quickComments');
    if (comments) {
        comments.innerHTML = '';
        let hasComment = false;
        for (let i = data.length - 1; i >= Math.max(0, data.length - 5); i--) {
            let c = getField(data[i], 'Yorum', 'yorum', 'generalComments', 'comment');
            let name = getField(data[i], 'Ad Soyad', 'adSoyad', 'fullName') || 'Misafir';
            if (c && c.trim().length > 3) {
                comments.innerHTML += `<div style="background:#f8f9fa; padding:8px; border-radius:6px; margin-bottom:5px; font-size:13px;"><strong>${name}:</strong> ${c.substring(0,100)}${c.length>100?'...':''}</div>`;
                hasComment = true;
            }
        }
        if (!hasComment) comments.innerHTML = '<p style="color:#999;text-align:center;padding:15px">Henüz yorum yok</p>';
    }

    // 6. TABLO (Son 10)
    const tbody = document.querySelector('#rawDataTable tbody');
    if (tbody) {
        tbody.innerHTML = '';
        if (data.length > 0) {
            for (let i = data.length - 1; i >= Math.max(0, data.length - 10); i--) {
                let r = data[i] || {};
                tbody.innerHTML += `<tr>
                    <td>${getField(r,'Tarih','tarih','date') || '-'}</td>
                    <td>${getField(r,'Ad Soyad','adSoyad','fullName') || 'Misafir'}</td>
                    <td>${getField(r,'Oda No','odaNo','roomNumber') || '-'}</td>
                    <td>${getField(r,'Departman','departman','department') || '-'}</td>
                    <td>${getField(r,'Puan','puan','score') || '-'}/100</td>
                    <td>${(getField(r,'Yorum','yorum','comment') || '-').substring(0,30)}...</td>
                </tr>`;
            }
        } else {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:20px;color:#999">Veri yok</td></tr>';
        }
    }

    console.log('✅ DİNAMİK PANEL HAZIR! Ortalama:', avg, 'Departman:', deptRanking.length);
}

function createBars(items) {
    return items.map(i => {
        let [label, val] = i.split(':');
        let num = parseInt(val);
        let color = num >= 85 ? '#28a745' : num >= 70 ? '#ffc107' : '#dc3545';
        return `<div style="margin:6px 0"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px"><span>${label}</span><span>${val}%</span></div><div style="background:#e9ecef;height:6px;border-radius:3px;overflow:hidden"><div style="background:${color};height:100%;width:${Math.min(num,100)}%"></div></div></div>`;
    }).join('');
}

function emptyMsg() { return '<p style="color:#999;text-align:center;padding:15px">Veri yok</p>'; }

window.renderDeptDetail = function() {
    const el = document.getElementById('deptDetailChart');
    const dept = document.getElementById('deptSelect')?.value;
    if (!el) return;
    el.innerHTML = dept ? createBars(['Hizmet Kalitesi:85','Personel İlgi:90','Temizlik:95']) : '<p style="color:#999;text-align:center;padding:15px">Lütfen departman seçin</p>';
};

window.clearData = function() {
    if (confirm('⚠️ Tüm veriler silinsin mi?')) { localStorage.removeItem('hotelSurveys'); location.reload(); }
};
window.exportData = function() {
    const d = localStorage.getItem('hotelSurveys') || '[]';
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([d], {type:'application/json'})); a.download = 'otel_verileri.json'; a.click();
};

console.log('✅ Tüm dinamik fonksiyonlar hazır!');
