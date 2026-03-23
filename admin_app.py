import json
import urllib.request
import pandas as pd
import streamlit as st
import plotly.express as px
from datetime import datetime, timedelta

# ============================================================
# 🔧 AYARLAR - SADECE BURASI DEĞİŞTİRİLECEK
# ============================================================
# ESKİ
SHEET_ID = "BURAYA_GOOGLE_SHEETS_ID_YAZIN"

# YENİ ✅
SHEET_ID = "1P3UY9PEFN8csOUPjWMKZHJRhqReLPajZfLdg7jJQ54k"
# ============================================================

DEPARTMENTS = {
    "ÖN BÜRO RESEPSİYON": [
        "girisKarsilama", "checkInIslem", "tesisBilgi",
        "onBuroNezaket", "bellboy"
    ],
    "GUEST RELATION": [
        "grKararlama", "sorunCozum", "misafirTakip"
    ],
    "KAT HİZMETLERİ": [
        "katIlkTemizlik", "katGorunum", "katGunlukTemizlik",
        "minibar", "genelAlan", "sahilHavuz", "katNezaket"
    ],
    "YİYECEK HİZMETLERİ & MUTFAK": [
        "kahvaltiCesit", "kahvaltiSunum",
        "ogleCesit", "ogleSunum",
        "aksamCesit", "aksamSunum",
        "alacartYemek", "mutfakHijyen", "yiyecekNezaket"
    ],
    "SERVİS ve BARLAR": [
        "pollBar", "lobbyBar", "snackBar",
        "ickiKalite", "barHijyen", "barNezaket"
    ],
    "RESTAURANT HİZMETLERİ": [
        "restDuzen", "restYer", "restHijyen",
        "snackRest", "alacartRest", "restNezaket"
    ],
    "TEKNİK SERVİS": [
        "teknikSistem", "ariza",
        "cevreAydinlatma", "havuzSu", "teknikNezaket"
    ],
    "EĞLENCE HİZMETLERİ": [
        "animasyonGunduz", "sporAlan", "showlar",
        "miniclub", "eglenceNezaket"
    ],
    "DİĞER HİZMETLER": [
        "peyzaj", "spa", "esnaf", "fiyatKalite"
    ],
}

QUESTION_LABELS = {
    "girisKarsilama": "Giriş Karşılama",
    "checkInIslem": "Check-In İşlemleri",
    "tesisBilgi": "Tesis Hakkında Bilgilendirme",
    "onBuroNezaket": "Personelin İlgi ve Nezaketi",
    "bellboy": "Bellboy Hizmetleri",
    "grKararlama": "Karşılama Kalitesi",
    "sorunCozum": "Sorunları Çözüme Kavuşturma",
    "misafirTakip": "Misafir Takibi",
    "katIlkTemizlik": "İlk Varışta Oda Temizliği",
    "katGorunum": "Oda Fiziki Görünümü ve Konforu",
    "katGunlukTemizlik": "Konaklama Süresince Oda Temizliği",
    "minibar": "Minibar Hizmeti",
    "genelAlan": "Genel Alan Temizliği",
    "sahilHavuz": "Sahil ve Havuz Çevre Temizliği",
    "katNezaket": "Personelin İlgi ve Nezaketi",
    "kahvaltiCesit": "Kahvaltı Büfesi Çeşitliliği",
    "kahvaltiSunum": "Kahvaltı Büfesi Sunumu ve Kalitesi",
    "ogleCesit": "Öğle Yemeği Büfesi Çeşitliliği",
    "ogleSunum": "Öğle Yemeği Sunumu ve Kalitesi",
    "aksamCesit": "Akşam Yemeği Büfesi Çeşitliliği",
    "aksamSunum": "Akşam Yemeği Sunumu ve Kalitesi",
    "alacartYemek": "Alacart Yemek Sunumu ve Kalitesi",
    "mutfakHijyen": "Mutfağın Hijyen ve Temizliği",
    "yiyecekNezaket": "Personelin İlgi ve Nezaketi",
    "pollBar": "Pool Bar Servis Kalitesi",
    "lobbyBar": "Lobby Bar Servis Kalitesi",
    "snackBar": "Snack Bar Servis Kalitesi",
    "ickiKalite": "İçki Kalitesi ve Sunumu",
    "barHijyen": "Barların Hijyen ve Temizliği",
    "barNezaket": "Personelin İlgi ve Nezaketi",
    "restDuzen": "Restaurant Düzeni ve Kalitesi",
    "restYer": "Restaurant Yer Yeterliliği",
    "restHijyen": "Restaurant Hijyen ve Temizliği",
    "snackRest": "Snackbar Restaurant Hizmeti",
    "alacartRest": "Alacart Restaurant Hizmeti",
    "restNezaket": "Personelin İlgi ve Nezaketi",
    "teknikSistem": "Oda Teknik Sistemleri",
    "ariza": "Arıza Bildirimi ve Giderme",
    "cevreAydinlatma": "Çevre Aydınlatma ve Düzeni",
    "havuzSu": "Havuz Suyu Temizliği",
    "teknikNezaket": "Personelin İlgi ve Nezaketi",
    "animasyonGunduz": "Gündüz Aktiviteleri",
    "sporAlan": "Spor Alanları ve Ekipmanları",
    "showlar": "Akşam Showları",
    "miniclub": "Miniclub Aktiviteleri",
    "eglenceNezaket": "Personelin İlgi ve Nezaketi",
    "peyzaj": "Genel Düzenleme / Peyzaj",
    "spa": "Sauna-Hamam Hizmetleri",
    "esnaf": "Hotel Genel Esnaf Davranışları",
    "fiyatKalite": "Fiyat Kalitesi ve İlişkisi",
}


# ============================================================
# 📊 VERİ YÜKLEME - GOOGLE SHEETS
# ============================================================
@st.cache_data(ttl=60)
def load_data() -> pd.DataFrame:
    try:
        url = (
            f"https://docs.google.com/spreadsheets/d/"
            f"{SHEET_ID}/export?format=csv&gid=0"
        )
        df = pd.read_csv(url)

        if df.empty:
            return df

        # Tarih kolonunu bul ve düzenle
        for col in ["tarih", "date", "submittedAt", "created_at"]:
            if col in df.columns:
                df["dt"] = pd.to_datetime(
                    df[col], errors="coerce", dayfirst=True
                )
                break
        else:
            df["dt"] = pd.Timestamp.now()

        return df

    except Exception as e:
        st.error(f"❌ Google Sheets bağlantı hatası: {e}")
        return pd.DataFrame()


# ============================================================
# 🛠️ YARDIMCI FONKSİYONLAR
# ============================================================
def get_rating_cols(df: pd.DataFrame) -> list:
    cols = []
    for keys in DEPARTMENTS.values():
        for k in keys:
            if k in df.columns:
                cols.append(k)
    return list(set(cols))


def to_numeric(df: pd.DataFrame, cols: list) -> pd.DataFrame:
    for c in cols:
        df[c] = pd.to_numeric(df[c], errors="coerce").fillna(0)
    return df


def get_max_score(df: pd.DataFrame, cols: list) -> float:
    if not cols:
        return 5.0
    mx = df[cols].max().max()
    if pd.isna(mx) or mx <= 0:
        return 5.0
    if mx <= 5:
        return 5.0
    if mx <= 10:
        return 10.0
    return 100.0


def scale100(value: float, max_score: float) -> int:
    if not value or pd.isna(value) or value <= 0:
        return 0
    return int(round((value / max_score) * 100))


def filter_by_time(df: pd.DataFrame, mode: str) -> pd.DataFrame:
    if df.empty or "dt" not in df.columns:
        return df
    now = pd.Timestamp.now()
    limits = {
        "Günlük": 1,
        "Haftalık": 7,
        "Aylık": 30,
        "Yıllık": 365,
    }
    if mode in limits:
        start = now - timedelta(days=limits[mode])
        return df[df["dt"] >= start]
    return df  # Tümü


def dept_avg(df: pd.DataFrame, metric: str) -> pd.DataFrame:
    rows = []
    for dep, keys in DEPARTMENTS.items():
        present = [k for k in keys if k in df.columns]
        if not present:
            continue
        vals = df[present].replace(0, pd.NA)
        if metric == "Toplam":
            score = float(vals.sum(axis=1, skipna=True).sum(skipna=True))
        else:
            score = float(vals.mean(axis=1, skipna=True).mean(skipna=True))
        rows.append({"Departman": dep, "Skor": score if pd.notna(score) else 0.0})
    return pd.DataFrame(rows).sort_values("Skor", ascending=False)


def question_avg(df: pd.DataFrame, dep: str, metric: str) -> pd.DataFrame:
    keys = [k for k in DEPARTMENTS.get(dep, []) if k in df.columns]
    rows = []
    for k in keys:
        s = df[k].replace(0, pd.NA)
        v = s.sum(skipna=True) if metric == "Toplam" else s.mean(skipna=True)
        rows.append({
            "Soru": QUESTION_LABELS.get(k, k),
            "Skor": float(v) if pd.notna(v) else 0.0
        })
    return pd.DataFrame(rows).sort_values("Skor", ascending=False)


def top_staff(df: pd.DataFrame, n: int = 10) -> pd.DataFrame:
    if "praisedStaff" not in df.columns:
        return pd.DataFrame(columns=["Personel", "Övgü Sayısı"])
    s = df["praisedStaff"].fillna("").astype(str).str.strip()
    s = s[s != ""]
    if s.empty:
        return pd.DataFrame(columns=["Personel", "Övgü Sayısı"])
    names = []
    for x in s:
        names.extend([p.strip() for p in x.split(",") if p.strip()])
    vc = pd.Series(names).value_counts().head(n).reset_index()
    vc.columns = ["Personel", "Övgü Sayısı"]
    return vc


def country_avg(df: pd.DataFrame, metric: str, cols: list) -> pd.DataFrame:
    if "nationality" not in df.columns or not cols:
        return pd.DataFrame(columns=["Ülke", "Skor"])
    tmp = df.copy()
    tmp["Ülke"] = tmp["nationality"].fillna("Bilinmiyor").astype(str)
    tmp["_avg"] = tmp[cols].replace(0, pd.NA).mean(axis=1, skipna=True)
    if metric == "Toplam":
        g = tmp.groupby("Ülke")["_avg"].sum(min_count=1)
    else:
        g = tmp.groupby("Ülke")["_avg"].mean()
    return g.reset_index().rename(columns={"_avg": "Skor"}).sort_values(
        "Skor", ascending=False
    )


def time_trend(df: pd.DataFrame, mode: str, metric: str) -> pd.DataFrame:
    rows = []
    df = df.copy()

    fmt = {
        "Günlük": lambda s: s.dt.strftime("%Y-%m-%d"),
        "Haftalık": lambda s: s.dt.to_period("W").astype(str),
        "Aylık": lambda s: s.dt.to_period("M").astype(str),
        "Yıllık": lambda s: s.dt.to_period("Y").astype(str),
        "Tümü": lambda s: s.dt.to_period("M").astype(str),
    }
    df["Bucket"] = fmt.get(mode, fmt["Aylık"])(df["dt"])

    for dep, keys in DEPARTMENTS.items():
        present = [k for k in keys if k in df.columns]
        if not present:
            continue
        vals = df[present].replace(0, pd.NA)
        if metric == "Toplam":
            df["_s"] = vals.sum(axis=1, skipna=True)
            g = df.groupby("Bucket")["_s"].sum(min_count=1).reset_index()
        else:
            df["_s"] = vals.mean(axis=1, skipna=True)
            g = df.groupby("Bucket")["_s"].mean().reset_index()
        g["Departman"] = dep
        g = g.rename(columns={"_s": "Skor"})
        rows.append(g)

    if not rows:
        return pd.DataFrame(columns=["Bucket", "Skor", "Departman"])
    return pd.concat(rows, ignore_index=True).sort_values(["Bucket", "Departman"])


# ============================================================
# 🎨 STREAMLIT ARAYÜZ
# ============================================================
st.set_page_config(
    page_title="🏨 Otel Yönetim Paneli",
    page_icon="🏨",
    layout="wide"
)

# Başlık
st.markdown("""
    <h1 style='text-align:center; color:#1a73e8;'>
        🏨 Concordia Celes Hotel
    </h1>
    <h3 style='text-align:center; color:#666;'>
        📊 Misafir Memnuniyet Yönetim Paneli
    </h3>
    <hr>
""", unsafe_allow_html=True)

# Veri yükle
df_all = load_data()

if df_all.empty:
    st.warning("⚠️ Henüz veri yok veya Google Sheets bağlantısı kurulamadı.")
    st.info("👆 SHEET_ID değişkenini doğru girdiğinizden emin olun.")
    st.stop()

# dt boş olanları at
if "dt" in df_all.columns:
    df_all = df_all[df_all["dt"].notna()].copy()

rating_cols_all = get_rating_cols(df_all)
df_all = to_numeric(df_all, rating_cols_all)
max_score = get_max_score(df_all, rating_cols_all)

# ── Sidebar Filtreler ──
with st.sidebar:
    st.image("https://via.placeholder.com/200x80?text=Hotel+Logo", width=200)
    st.markdown("---")
    st.markdown("### ⚙️ Filtreler")

    time_mode = st.radio(
        "📅 Zaman Filtresi",
        ["Günlük", "Haftalık", "Aylık", "Yıllık", "Tümü"],
        index=2
    )

    metric_mode = st.selectbox(
        "📐 Hesaplama Kriteri",
        ["Ortalama", "Toplam"],
        index=0
    )

    st.markdown("---")
    if st.button("🔄 Veriyi Yenile"):
        st.cache_data.clear()
        st.rerun()

    st.markdown("---")
    st.markdown(f"📋 **Toplam Anket:** {len(df_all)}")
    st.markdown(f"🕐 **Son Güncelleme:** {datetime.now().strftime('%H:%M:%S')}")

# Filtrelenmiş veri
df = filter_by_time(df_all, time_mode).copy()
rating_cols = get_rating_cols(df)
df = to_numeric(df, rating_cols)

# ══════════════════════════════════════════
# 1) ÖZET KARTLAR
# ══════════════════════════════════════════
st.markdown("## 📈 Genel Özet")

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        label="📋 Toplam Anket",
        value=len(df_all),
        delta=f"{len(df)} ({time_mode})"
    )

with col2:
    if rating_cols and not df.empty:
        vals = df[rating_cols].replace(0, pd.NA)
        genel = float(vals.mean(axis=1, skipna=True).mean(skipna=True))
        puan = scale100(genel, max_score)
    else:
        puan = 0
    st.metric(
        label="⭐ Genel Puan (100 üzerinden)",
        value=f"{puan}/100",
        delta="Ortalama" if puan >= 70 else "Düşük"
    )

with col3:
    if "willReturn" in df.columns:
        donus = df["willReturn"].astype(str).str.lower()
        evet = donus.isin(["evet", "yes", "да"]).sum()
        oran = int((evet / len(df) * 100)) if len(df) > 0 else 0
        st.metric(label="🔄 Tekrar Gelir", value=f"%{oran}")
    else:
        st.metric(label="🔄 Tekrar Gelir", value="N/A")

with col4:
    if "wouldRecommend" in df.columns:
        tavsiye = df["wouldRecommend"].astype(str).str.lower()
        evet2 = tavsiye.isin(["evet", "yes", "да"]).sum()
        oran2 = int((evet2 / len(df) * 100)) if len(df) > 0 else 0
        st.metric(label="👍 Tavsiye Eder", value=f"%{oran2}")
    else:
        st.metric(label="👍 Tavsiye Eder", value="N/A")

st.divider()

# ══════════════════════════════════════════
# 2) EN İYİ 3 DEPARTMAN & PERSONEL
# ══════════════════════════════════════════
st.markdown("## 🏆 En İyi Departman & Personel")

dep_df = dept_avg(df, metric_mode)
staff_df = top_staff(df, 3)

col_a, col_b = st.columns(2)

medals = ["🥇", "🥈", "🥉"]

with col_a:
    st.markdown("### 🏢 En İyi 3 Departman")
    if dep_df.empty:
        st.info("Veri bulunamadı.")
    else:
        for i, row in enumerate(dep_df.head(3).itertuples()):
            color = ["#FFD700", "#C0C0C0", "#CD7F32"][i]
            st.markdown(f"""
                <div style='background:{color}22; border-left:4px solid {color};
                padding:10px; margin:5px 0; border-radius:5px;'>
                    <b>{medals[i]} {row.Departman}</b>
                    <span style='float:right; font-weight:bold;'>
                        {row.Skor:.2f}
                    </span>
                </div>
            """, unsafe_allow_html=True)

with col_b:
    st.markdown("### 👤 En Çok Övülen 3 Personel")
    if staff_df.empty:
        st.info("Henüz övülen personel yok.")
    else:
        for i, row in enumerate(staff_df.head(3).itertuples()):
            color = ["#FFD700", "#C0C0C0", "#CD7F32"][i]
            st.markdown(f"""
                <div style='background:{color}22; border-left:4px solid {color};
                padding:10px; margin:5px 0; border-radius:5px;'>
                    <b>{medals[i]} {row.Personel}</b>
                    <span style='float:right; font-weight:bold;'>
                        {row._2} övgü
                    </span>
                </div>
            """, unsafe_allow_html=True)

st.divider()

# ══════════════════════════════════════════
# 3) DEPARTMAN PUANLARI GRAFİĞİ
# ══════════════════════════════════════════
st.markdown("## 📊 Departman Puanları")

if dep_df.empty:
    st.info("Grafik için veri yok.")
else:
    fig1 = px.bar(
        dep_df,
        x="Departman",
        y="Skor",
        color="Skor",
        color_continuous_scale="RdYlGn",
        title=f"Departman Skorları ({time_mode} | {metric_mode})",
        text="Skor"
    )
    fig1.update_traces(texttemplate='%{text:.2f}', textposition='outside')
    fig1.update_layout(showlegend=False, height=450)
    st.plotly_chart(fig1, use_container_width=True)

st.divider()

# ══════════════════════════════════════════
# 4) SORU BAZLI ANALİZ
# ══════════════════════════════════════════
st.markdown("## 🔍 Departman & Soru Bazlı Analiz")

dep_choice = st.selectbox(
    "Departman Seçin",
    list(DEPARTMENTS.keys()),
    index=0
)

q_df = question_avg(df, dep_choice, metric_mode)

if q_df.empty:
    st.info("Seçilen departman için veri yok.")
else:
    fig2 = px.bar(
        q_df,
        x="Soru",
        y="Skor",
        color="Skor",
        color_continuous_scale="RdYlGn",
        title=f"{dep_choice} — Soru Bazlı Analiz",
        text="Skor"
    )
    fig2.update_traces(texttemplate='%{text:.2f}', textposition='outside')
    fig2.update_layout(showlegend=False, height=400)
    st.plotly_chart(fig2, use_container_width=True)

st.divider()

# ══════════════════════════════════════════
# 5) ÜLKE ANALİZİ
# ══════════════════════════════════════════
st.markdown("## 🌍 Ülke Bazlı Analiz")

c_df = country_avg(df, metric_mode, rating_cols)

if c_df.empty:
    st.info("Ülke verisi bulunamadı.")
else:
    fig3 = px.bar(
        c_df.head(20),
        x="Ülke",
        y="Skor",
        color="Skor",
        color_continuous_scale="Blues",
        title="Ülke Bazlı Memnuniyet Skoru",
        text="Skor"
    )
    fig3.update_traces(texttemplate='%{text:.2f}', textposition='outside')
    fig3.update_layout(showlegend=False, height=400)
    st.plotly_chart(fig3, use_container_width=True)

st.divider()

# ══════════════════════════════════════════
# 6) PERSONEL ÖVGÜ GRAFİĞİ
# ══════════════════════════════════════════
st.markdown("## 👏 Personel Övgü Analizi")

staff_all = top_staff(df, 20)

if staff_all.empty:
    st.info("Övülen personel verisi yok.")
else:
    fig4 = px.bar(
        staff_all,
        x="Personel",
        y="Övgü Sayısı",
        color="Övgü Sayısı",
        color_continuous_scale="Greens",
        title="En Çok Övülen Personel",
        text="Övgü Sayısı"
    )
    fig4.update_traces(textposition='outside')
    fig4.update_layout(showlegend=False, height=400)
    st.plotly_chart(fig4, use_container_width=True)

st.divider()

# ══════════════════════════════════════════
# 7) ZAMAN TREND ANALİZİ
# ══════════════════════════════════════════
st.markdown("## 📈 Zaman Trend Analizi")

trend_df = time_trend(df, time_mode, metric_mode)

if trend_df.empty:
    st.info("Trend grafiği için yeterli veri yok.")
else:
    fig5 = px.line(
        trend_df,
        x="Bucket",
        y="Skor",
        color="Departman",
        title=f"Departman Trend ({time_mode})",
        markers=True
    )
    fig5.update_layout(height=500)
    st.plotly_chart(fig5, use_container_width=True)

st.divider()

# ══════════════════════════════════════════
# 8) MİSAFİR YORUMLARI
# ══════════════════════════════════════════
st.markdown("## 💬 Misafir Yorumları")

if "generalComments" in df.columns:
    comments = (
        df["generalComments"]
        .fillna("")
        .astype(str)
        .str.strip()
    )
    comments = comments[comments != ""]

    st.markdown(f"**Toplam Yorum: {len(comments)}**")

    if not comments.empty:
        for i, (idx, comment) in enumerate(comments.head(50).items()):
            name = df.loc[idx, "fullName"] if "fullName" in df.columns else "Misafir"
            country = df.loc[idx, "nationality"] if "nationality" in df.columns else ""
            st.markdown(f"""
                <div style='background:#f8f9fa; border-left:3px solid #1a73e8;
                padding:10px; margin:8px 0; border-radius:5px;'>
                    <b>👤 {name}</b>
                    {'🌍 ' + str(country) if country else ''}
                    <br><small style='color:#666;'>{comment}</small>
                </div>
            """, unsafe_allow_html=True)
else:
    st.info("Yorum verisi bulunamadı.")

st.divider()

# ══════════════════════════════════════════
# 9) HAM VERİ TABLOSU
# ══════════════════════════════════════════
st.markdown("## 📋 Ham Veri Tablosu")

show_cols = [
    c for c in [
        "dt", "fullName", "gender", "nationality",
        "roomNumber", "checkIn", "checkOut",
        "praisedStaff", "generalComments",
        "onceGeldiniz", "tekrarGelir", "tavsiye"
    ] if c in df.columns
]

st.dataframe(
    df[show_cols].sort_values("dt", ascending=False)
    if "dt" in df.columns else df[show_cols],
    use_container_width=True,
    height=400
)

# Excel İndirme
try:
    import io
    buffer = io.BytesIO()
    df.to_excel(buffer, index=False, engine='openpyxl')
    buffer.seek(0)
    st.download_button(
        label="📥 Excel Olarak İndir",
        data=buffer,
        file_name=f"anket_verileri_{datetime.now().strftime('%Y%m%d')}.xlsx",
        mime="application/vnd.ms-excel"
    )
except Exception:
    st.info("Excel indirme için 'openpyxl' kütüphanesi gerekli.")

st.divider()

# Footer
st.markdown("""
    <div style='text-align:center; color:#999; padding:20px;'>
        🏨 Concordia Celes Hotel — Misafir Memnuniyet Sistemi<br>
        <small>Veriler Google Sheets'ten otomatik yüklenmektedir</small>
    </div>
""", unsafe_allow_html=True)