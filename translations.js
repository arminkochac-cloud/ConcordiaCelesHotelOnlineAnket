const translations = {
    tr: {
        hotelName: "Concordia Celes Hotel",
        surveyTitle: "Misafir Memnuniyet Anketi",
        generalInfo: "GENEL BİLGİLER",
        frontOffice: "ÖN BÜRO & RESEPSİYON",
        fullName: "Ad Soyad *",
        gender: "Cinsiyetiniz *",
        female: "Kadın",
        male: "Erkek",
        nationality: "Uyruğu *",
        selectOption: "Seçiniz...",
        roomNumber: "Oda Numarası *",
        checkIn: "Giriş Tarihi *",
        checkOut: "Çıkış Tarihi *",
        email: "Mail Adresi",
        kvkkText: "Kişisel verilerimin Concordia Celes Hotel tarafından misafir memnuniyeti amacıyla işlenmesine onay veriyorum.",
        kvkkLink: "KVKK Aydınlatma Metni",
        next: "İleri →",
        back: "← Geri",
        submit: "Anketi Gönder",
        thankYouTitle: "Teşekkür Ederiz!",
        thankYouMessage: "Değerli görüşleriniz bizim için çok önemli.",
        newSurvey: "Yeni Anket",

        // Departman Soruları
        welcomeGreeting: "Giriş Karşılama",
        checkInProcess: "Check-In İşlemleri",
        facilityInfo: "Tesis Hakkında Bilgilendirme",
        frontDeskCare: "Personelin İlgi ve Nezaketi",
        bellboyService: "Bellboy Hizmetleri"
    },
    en: {
        hotelName: "Concordia Celes Hotel",
        surveyTitle: "Guest Satisfaction Survey",
        generalInfo: "GENERAL INFORMATION",
        frontOffice: "FRONT OFFICE & RECEPTION",
        fullName: "Full Name *",
        gender: "Gender *",
        female: "Female",
        male: "Male",
        nationality: "Nationality *",
        selectOption: "Select...",
        roomNumber: "Room Number *",
        checkIn: "Check-in Date *",
        checkOut: "Check-out Date *",
        email: "Email Address",
        kvkkText: "I consent to the processing of my personal data for guest satisfaction purposes.",
        kvkkLink: "KVKK Disclosure Text",
        next: "Next →",
        back: "← Back",
        submit: "Submit Survey",
        thankYouTitle: "Thank You!",
        thankYouMessage: "Your feedback is very valuable to us.",
        newSurvey: "New Survey",

        welcomeGreeting: "Welcome Greeting",
        checkInProcess: "Check-in Procedures",
        facilityInfo: "Information About the Facility",
        frontDeskCare: "Staff Care and Courtesy",
        bellboyService: "Bellboy Services"
    }
};

window.updateTranslations = function(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
};
