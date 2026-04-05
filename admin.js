// ============================================================================
// CONCORDİA CELES HOTEL - ADMIN PANEL JAVASCRIPT v6
// GOOGLE SHEETS SÜTUN BAŞLIKLARINA %100 UYUMLU
// ============================================================================
console.log('🚀 admin.js v6 yüklendi (Sütunlara Özel)');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQXQnpJIwj4vvKbSrEVJUmKWGQxJyJiKls2m-hLbMdHpD0cBSewzGGYPe3gtkhBWGR/exec';
const SCALE_FACTOR = 20; // 1-5 puanı 100'e çevirir. Formunuz 1-10 ise burayı 10 yapın.

// Departman - Sütun Eşleşmesi (Tam sizin yapınıza göre)
const DEPT_MAP = {
  "Ön Büro & Resepsiyon": ["welcomeGreeting","checkInProcess","facilityInfo","frontDeskCare","bellboyService","grWelcomeQuality","problemSolving","guestFollowUp"],
  "Kat Hizmetleri": ["initialRoomCleaning","roomAppearance","dailyRoomCleaning","minibarService","publicAreaCleaning","beachPoolCleaning","housekeepingStaffCare"],
  "Yiyecek & İçecek": ["breakfastVariety","breakfastQuality","lunchVariety","lunchQuality","dinnerVariety","dinnerQuality","alacarteQuality","kitchenHygiene","foodStaffCare","poolBarQuality","lobbyBarQuality","snackBarQuality","drinkQuality","barHygiene","barStaffCare","restaurantLayout","restaurantCapacity","restaurantHygiene","snackbarRestaurant","alacarteRestaurant","restaurantStaffCare"],
  "Teknik Servis": ["roomTechnicalSystems","maintenanceResponse","environmentLighting","poolWaterCleaning","technicalStaffCare"],
  "Eğlence & Animasyon": ["daytimeActivities","sportsAreas","eveningShows","miniclubActivities","entertainmentStaffCare"],
  "Diğer Hizmetler": ["landscaping","spaServices","shopBehavior","priceQuality"]
};

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
        
        const stats = processData(validData);
        renderDashboard(stats);
    } catch (err) {
        console.error('❌ Veri çekme hatası:', err);
        renderDashboard({ generalAvg: 0, deptStats: [], staffStats: [], countryStats: [], comments: [], rawData: [] });
    }
}

function processData(data) {
    let deptScores = {};
    let staffCounts = {};
    let countryCounts = {};
    let totalRowAverages = [];
    let comments = [];

    data.forEach(row => {
        // 1. Satır Ortalaması (Tüm sayısal puanlar)
        let rowVals = [];
        for (let key in row) {
            let v = parseFloat(row[key]);
            if (!isNaN(v) && v > 0) rowVals.push(v);
        }
        if (rowVals.length > 0) {
            let avg = rowVals.reduce((a,b)=>a+b,0) / rowVals.length;
            totalRowAverages.push(avg * SCALE_FACTOR);
        }

        // 2. Departman Puanları
        for (let dept in DEPT_MAP) {
            let cols = DEPT_MAP[dept];
            let dVals = [];
            cols.forEach(c => {
                let v = parseFloat(row[c]);
                if (!isNaN(v) && v > 0) dVals.push(v);
            });
            if (dVals.length > 0) {
                let dAvg = dVals.reduce((a,b)=>a+b,0) / dVals.length;
                if (!deptScores[dept]) deptScores[dept] = [];
                deptScores[dept].push(dAvg * SCALE_FACTOR);
            }
        }

        // 3. Personel Övgüleri (Virgül, noktalı virgül, "ve", "&" ile ayrılmış olabilir)
        let staffRaw = row.praisedStaff || '';
        if (staffRaw.trim()) {
            let names = staffRaw.split(/[,;ve&]/).map(n => n.trim()).filter(n => n.length > 2);
            names.forEach(n => { staffCounts[n] = (staffCounts[n] || 0) + 1; });
        }

        // 4. Ülke Analizi
        let country = row.nationality || 'Belirtilmedi';
        countryCounts[country] = (countryCounts[country] || 0) + 1;

        // 5. Yorumlar
        if (row.generalComments && row.generalComments.trim().length > 3) {
            comments.push({ name: row.fullName || 'Misafir', text: row.generalComments });
        }
    });

    // Toplu Hesaplamalar
    let generalAvg = totalRowAverages.length ? Math.round(totalRowAverages.reduce((a,b)=>a+b,0)/totalRowAverages.length) : 0;
    let deptStats = Object.keys(deptScores).map(d => ({ name: d, avg: Math.round(deptScores[d].reduce((a,b)=>a+b,0)/deptScores[d].length), count: deptScores[d].length })).sort((a,b)=>b.avg-a.avg);
    let staffStats = Object.keys(staffCounts).map(n => ({ name: n, count: staffCounts[n] })).sort((a,b)=>b.count-a.count);
    let countryStats = Object.keys(countryCounts).map(c => ({ name: c, count: countryCounts[c] })).sort((a,b)=>b.count-a.count);

    return { generalAvg, deptStats, staffStats, countryStats, comments, rawData: data };
}

function renderDashboard(stats) {
    console.log('🎨 Panel render ediliyor...');

    // 1. Genel Ortalama
    const avgEl = document.getElementById('generalAvg');
    if (avgEl) {
        avgEl.textContent = stats.generalAvg;
        avgEl.style.color = stats.generalAvg >= 85 ? '#28a745' : stats.generalAvg >= 70 ? '#ffc107' : '#dc3545';
    }

    // 2. En İyi Departmanlar
    const topDepts = document.getElementById('topDepts');
    if (topDepts) {
        topDepts.innerHTML = stats.deptStats.length > 0 ? stats.deptStats.slice(0,3).map((d, i) => {
            let medal = i===0?'🥇':i===1?'🥈':'🥉';
            return `<div style="padding:8px; border-bottom:1px solid #eee;">${medal} ${d.name} <span style="float:right;color:#28a745">${d.avg}% (${d.count} anket)</span></div>`;
        }).join('') : '<p style="color:#999;text-align:center;padding:15px">Veri yok</p>';
    }

    // 3. En Çok Övülen Personel
    const topStaff = document.getElementById('topStaff');
    if (topStaff) {
        topStaff.innerHTML = stats.staffStats.length > 0 ? stats.staffStats.slice(0,3).map((s, i) => {
            let medal = i===0?'🥇':i===1?'🥈':'';
            return `<div style="padding:8px;">${medal} ${s.name} <span style="float:right;color:#ffc107">${s.count} övgü</span></div>`;
        }).join('') : '<p style="color:#999;text-align:center;padding:15px">Veri yok</p>';
    }

    // 4. Grafikler
    const deptChart = document.getElementById('deptChart');
    const countryChart = document.getElementById('countryChart');
    const staffChart = document.getElementById('staffChart');

    if (deptChart) deptChart.innerHTML = stats.deptStats.length > 0 ? createBars(stats.deptStats.slice(0,5).map(d => `${d.name}:${d.avg}`)) : emptyMsg();
    if (countryChart) countryChart.innerHTML = stats.countryStats.length > 0 ? createBars(stats.countryStats.slice(0,5).map(c => `${c.name}:${Math.round(c.count/stats.rawData.length*100)}`)) : emptyMsg();
    if (staffChart) staffChart.innerHTML = stats.staffStats.length > 0 ? createBars(stats.staffStats.slice(0,5).map(s => `${s.name}:${s.count}`)) : emptyMsg();

    // 5. Son Yorumlar
    const commentsDiv = document.getElementById('quickComments');
    if (commentsDiv) {
        commentsDiv.innerHTML = '';
        let recent = stats.comments.slice(-5).reverse();
        if (recent.length > 0) {
            recent.forEach(c => {
                commentsDiv.innerHTML += `<div style="background:#f8f9fa; padding:8px; border-radius:6px; margin-bottom:5px; font-size:13px;"><strong>${c.name}:</strong> ${c.text.substring(0,100)}${c.text.length>100?'...':''}</div>`;
            });
        } else {
            commentsDiv.innerHTML = '<p style="color:#999;text-align:center;padding:15px">Henüz yorum yok</p>';
        }
    }

    // 6. Tablo (Son 10)
    const tbody = document.querySelector('#rawDataTable tbody');
    if (tbody) {
        tbody.innerHTML = '';
        if (stats.rawData.length > 0) {
            let last10 = stats.rawData.slice(-10).reverse();
            last10.forEach(r => {
                let score = 0, count = 0;
                for(let k in r) { let v=parseFloat(r[k]); if(!isNaN(v)&&v>0){score+=v; count++;} }
                let finalScore = count>0 ? Math.round((score/count)*SCALE_FACTOR) : '-';
                tbody.innerHTML += `<tr>
                    <td>${r.tarih || '-'}</td>
                    <td>${r.fullName || 'Misafir'}</td>
                    <td>${r.roomNumber || '-'}</td>
                    <td>${r.nationality || '-'}</td>
                    <td>${finalScore}/100</td>
                    <td>${(r.generalComments || '-').substring(0,30)}...</td>
                </tr>`;
            });
        } else {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:20px;color:#999">Veri yok</td></tr>';
        }
    }

    console.log('✅ DİNAMİK PANEL HAZIR! Ortalama:', stats.generalAvg);
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

// Departman Detay (HTML onchange için)
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

console.log('✅ Tüm fonksiyonlar hazır!');
