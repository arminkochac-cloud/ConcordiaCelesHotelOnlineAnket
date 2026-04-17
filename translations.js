const LANG_NAMES = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
  pl: 'Polski',
  ro: 'Română'
};

const COUNTRY_OPTIONS = {
  tr: {
    'Türkiye': '🇹🇷 Türkiye',
    'Germany': '🇩🇪 Almanya',
    'United Kingdom': '🇬🇧 İngiltere',
    'Russia': '🇷🇺 Rusya',
    'Poland': '🇵🇱 Polonya',
    'Romania': '🇷🇴 Romanya',
    'France': '🇫🇷 Fransa',
    'Netherlands': '🇳🇱 Hollanda',
    'Italy': '🇮🇹 İtalya',
    'USA': '🇺🇸 ABD',
    'Other': 'Diğer'
  },
  en: {
    'Türkiye': '🇹🇷 Turkey',
    'Germany': '🇩🇪 Germany',
    'United Kingdom': '🇬🇧 United Kingdom',
    'Russia': '🇷🇺 Russia',
    'Poland': '🇵🇱 Poland',
    'Romania': '🇷🇴 Romania',
    'France': '🇫🇷 France',
    'Netherlands': '🇳🇱 Netherlands',
    'Italy': '🇮🇹 Italy',
    'USA': '🇺🇸 USA',
    'Other': 'Other'
  },
  de: {
    'Türkiye': '🇹🇷 Türkei',
    'Germany': '🇩🇪 Deutschland',
    'United Kingdom': '🇬🇧 Vereinigtes Königreich',
    'Russia': '🇷🇺 Russland',
    'Poland': '🇵🇱 Polen',
    'Romania': '🇷🇴 Rumänien',
    'France': '🇫🇷 Frankreich',
    'Netherlands': '🇳🇱 Niederlande',
    'Italy': '🇮🇹 Italien',
    'USA': '🇺🇸 USA',
    'Other': 'Andere'
  },
  ru: {
    'Türkiye': '🇹🇷 Турция',
    'Germany': '🇩🇪 Германия',
    'United Kingdom': '🇬🇧 Великобритания',
    'Russia': '🇷🇺 Россия',
    'Poland': '🇵🇱 Польша',
    'Romania': '🇷🇴 Румыния',
    'France': '🇫🇷 Франция',
    'Netherlands': '🇳🇱 Нидерланды',
    'Italy': '🇮🇹 Италия',
    'USA': '🇺🇸 США',
    'Other': 'Другое'
  },
  pl: {
    'Türkiye': '🇹🇷 Turcja',
    'Germany': '🇩🇪 Niemcy',
    'United Kingdom': '🇬🇧 Wielka Brytania',
    'Russia': '🇷🇺 Rosja',
    'Poland': '🇵🇱 Polska',
    'Romania': '🇷🇴 Rumunia',
    'France': '🇫🇷 Francja',
    'Netherlands': '🇳🇱 Niderlandy',
    'Italy': '🇮🇹 Włochy',
    'USA': '🇺🇸 USA',
    'Other': 'Inne'
  },
  ro: {
    'Türkiye': '🇹🇷 Turcia',
    'Germany': '🇩🇪 Germania',
    'United Kingdom': '🇬🇧 Regatul Unit',
    'Russia': '🇷🇺 Rusia',
    'Poland': '🇵🇱 Polonia',
    'Romania': '🇷🇴 România',
    'France': '🇫🇷 Franța',
    'Netherlands': '🇳🇱 Țările de Jos',
    'Italy': '🇮🇹 Italia',
    'USA': '🇺🇸 SUA',
    'Other': 'Altele'
  }
};

const TRANSLATIONS = {
  tr: {
    pageTitle: '🏨 Otel Misafir Anket Sistemi',
    languageHeader: 'Select Language / Dil Seçin',
    hotelName: 'Concordia Celes Hotel',
    surveyTitle: 'Misafir Memnuniyet Anketi',

    generalInfo: 'GENEL BİLGİLER',
    fullName: 'Ad Soyad *',
    gender: 'Cinsiyetiniz *',
    female: 'Kadın',
    male: 'Erkek',
    nationality: 'Uyruğu *',
    selectOption: 'Seçiniz...',
    other: 'Diğer',
    roomNumber: 'Oda Numarası *',
    checkIn: 'Giriş Tarihi *',
    checkOut: 'Çıkış Tarihi *',
    email: 'Mail Adresi',
    kvkkText: 'Kişisel verilerimin Concordia Celes Hotel tarafından misafir memnuniyeti amacıyla işlenmesine onay veriyorum.',
    kvkkLink: 'KVKK Aydınlatma Metni',
    next: 'İleri',
    back: 'Geri',

    frontOffice: 'ÖN BÜRO RESEPSİYON',
    welcomeGreeting: 'Giriş Karşılama',
    checkInProcess: 'Check-In İşlemleri',
    facilityInfo: 'Tesis Hakkında Bilgilendirme',
    frontDeskCare: 'Personelin İlgi ve Nezaketi',
    bellboyService: 'Bellboy Hizmetleri',

    guestRelation: 'MİSAFİR İLİŞKİLERİ',
    grWelcomeQuality: 'Misafir ile İletişimi',
    problemSolving: 'Bilgilendirme Yeterliliği',
    guestFollowUp: 'Personelin İlgi ve Nezaketi',

    housekeeping: 'KAT HİZMETLERİ',
    initialRoomCleaning: 'İlk Varışınızda Oda Temizliği',
    roomAppearance: 'Oda Fiziki Görünümü ve Konforu',
    dailyRoomCleaning: 'Konaklama Süresince Oda Temizliği ve Düzeni',
    minibarService: 'Minibar Hizmeti',
    publicAreaCleaning: 'Genel Alan Temizliği',
    beachPoolCleaning: 'Sahil ve Havuz Çevre Temizliği',
    housekeepingStaffCare: 'Personelin İlgi ve Nezaketi',

    foodServices: 'MUTFAK',
    breakfastVariety: 'Kahvaltı Büfesi Çeşitliliği',
    lunchVariety: 'Öğle Yemeği Büfesi Çeşitliliği',
    dinnerVariety: 'Akşam Yemeği Büfesi Çeşitliliği',
    breakfastQuality: 'Kahvaltı Kalitesi',
    lunchQuality: 'Öğle Yemeği Kalitesi',
    dinnerQuality: 'Akşam Yemeği Kalitesi',
    alacarteQuality: 'Alacart Restaurant Yemek Sunumu ve Kalitesi',
    kitchenHygiene: 'Mutfağın Hijyen ve Temizliği',
    foodStaffCare: 'Personelin İlgi ve Nezaketi',

    barsServices: 'BARLAR',
    poolBarQuality: 'Pool Bar Servis Kalitesi',
    lobbyBarQuality: 'Lobby Bar Servis Kalitesi',
    snackBarQuality: 'Snack Bar Servis Kalitesi',
    drinkQuality: 'İçki Kalitesi ve Sunumu',
    barHygiene: 'Barların Hijyen ve Temizliği',
    barStaffCare: 'Personelin İlgi ve Nezaketi',

    restaurantServices: 'RESTAURANT HİZMETLERİ',
    restaurantLayout: 'Restaurant Düzeni ve Kalitesi',
    restaurantCapacity: 'Restaurant Yer Yeterliliği',
    restaurantHygiene: 'Restaurant Hijyen ve Temizliği',
    snackbarRestaurant: 'Snackbar Restaurant Hizmeti',
    alacarteRestaurant: 'Alacart Restaurant Hizmeti ve Personel İlgisi',
    restaurantStaffCare: 'Personelin İlgi ve Nezaketi',

    technicalService: 'TEKNİK SERVİS',
    roomTechnicalSystems: 'Oda Teknik Sistemleri',
    maintenanceResponse: 'Arıza Bildirimi ve Giderme',
    environmentLighting: 'Çevre Aydınlatma ve Düzeni',
    poolWaterCleaning: 'Havuz Suyu Temizliği',
    technicalStaffCare: 'Personelin İlgi ve Nezaketi',

    entertainmentServices: 'EĞLENCE HİZMETLERİ',
    daytimeActivities: 'Animasyon Ekibi ile Gündüz Aktiviteleri',
    sportsAreas: 'Aktivite ve Spor Alanları ve Ekipmanları',
    eveningShows: 'Akşam Aktiviteleri ve Showlar',
    miniclubActivities: 'Miniclub Aktiviteleri',
    entertainmentStaffCare: 'Personelin İlgi ve Nezaketi',

    otherServices: 'DİĞER HİZMETLER',
    landscaping: 'Genel Düzenleme / Peyzaj',
    spaServices: 'Sauna-Hamam Hizmetleri',
    shopBehavior: 'Hotel Genel Esnaf Davranışları',
    priceQuality: 'Fiyat Kalitesi ve İlişkisi',

    suggestions: 'ÖNERİLERİNİZ',
    previousStay: 'Otelimizde Daha Önce Bulundunuz Mu? *',
    yes: 'Evet',
    no: 'Hayır',
    praisedStaff: 'Hizmetinden Dolayı Övgüye Bulunduğunuz Personelin İsmi',
    generalComments: 'Genel Düşünce ve Yorumlarınız (0-500 karakter)',
    willReturnQuestion: 'Tekrar Gelir Misiniz? *',
    wouldRecommend: 'Bizi Çevrenize Tavsiye Eder Misiniz? *',
    submit: 'Anketi Gönder',

    thankYouTitle: 'Teşekkür Ederiz!',
    thankYouMessage: 'Değerli görüşleriniz bizim için çok önemli.',
    newSurvey: 'Yeni Anket',

    roomNumberPlaceholder: 'Örn: 305',
    emailPlaceholder: 'ornek@email.com',
    praisedStaffPlaceholder: 'Örn: Ayşe / Mehmet',
    generalCommentsPlaceholder: 'Yorumlarınızı buraya yazabilirsiniz...'
  },

  en: {
    pageTitle: '🏨 Hotel Guest Survey System',
    languageHeader: 'Select Language / Choose Language',
    hotelName: 'Concordia Celes Hotel',
    surveyTitle: 'Guest Satisfaction Survey',

    generalInfo: 'GENERAL INFORMATION',
    fullName: 'Full Name *',
    gender: 'Gender *',
    female: 'Female',
    male: 'Male',
    nationality: 'Nationality *',
    selectOption: 'Select...',
    other: 'Other',
    roomNumber: 'Room Number *',
    checkIn: 'Check-in Date *',
    checkOut: 'Check-out Date *',
    email: 'Email Address',
    kvkkText: 'I consent to my personal data being processed by Concordia Celes Hotel for guest satisfaction purposes.',
    kvkkLink: 'Privacy Notice',
    next: 'Next',
    back: 'Back',

    frontOffice: 'FRONT OFFICE & RECEPTION',
    welcomeGreeting: 'Welcome Greeting',
    checkInProcess: 'Check-in Procedures',
    facilityInfo: 'Information About the Facility',
    frontDeskCare: 'Staff Care and Courtesy',
    bellboyService: 'Bellboy Services',

    guestRelation: 'GUEST RELATION',
    grWelcomeQuality: 'Communication with Guests',
    problemSolving: 'Information Adequacy',
    guestFollowUp: 'Staff Courtesy and Attention',

    housekeeping: 'HOUSEKEEPING',
    initialRoomCleaning: 'Room Cleanliness on Arrival',
    roomAppearance: 'Room Appearance and Comfort',
    dailyRoomCleaning: 'Room Cleaning and Order During Stay',
    minibarService: 'Minibar Service',
    publicAreaCleaning: 'Public Area Cleanliness',
    beachPoolCleaning: 'Beach and Pool Surrounding Cleanliness',
    housekeepingStaffCare: 'Staff Courtesy and Attention',

    foodServices: 'KITCHEN',
    breakfastVariety: 'Breakfast Buffet Variety',
    lunchVariety: 'Lunch Buffet Variety',
    dinnerVariety: 'Dinner Buffet Variety',
    breakfastQuality: 'Breakfast Quality',
    lunchQuality: 'Lunch Quality',
    dinnerQuality: 'Dinner Quality',
    alacarteQuality: 'À la Carte Restaurant Presentation and Quality',
    kitchenHygiene: 'Kitchen Hygiene and Cleanliness',
    foodStaffCare: 'Staff Courtesy and Attention',

    barsServices: 'BARS',
    poolBarQuality: 'Pool Bar Service Quality',
    lobbyBarQuality: 'Lobby Bar Service Quality',
    snackBarQuality: 'Snack Bar Service Quality',
    drinkQuality: 'Beverage Quality and Presentation',
    barHygiene: 'Bar Hygiene and Cleanliness',
    barStaffCare: 'Staff Courtesy and Attention',

    restaurantServices: 'RESTAURANT SERVICES',
    restaurantLayout: 'Restaurant Layout and Quality',
    restaurantCapacity: 'Restaurant Seating Capacity',
    restaurantHygiene: 'Restaurant Hygiene and Cleanliness',
    snackbarRestaurant: 'Snackbar Restaurant Service',
    alacarteRestaurant: 'À la Carte Restaurant Service and Staff Attention',
    restaurantStaffCare: 'Staff Courtesy and Attention',

    technicalService: 'TECHNICAL SERVICE',
    roomTechnicalSystems: 'Room Technical Systems',
    maintenanceResponse: 'Maintenance Response and Repair',
    environmentLighting: 'Outdoor Lighting and Order',
    poolWaterCleaning: 'Pool Water Cleanliness',
    technicalStaffCare: 'Staff Courtesy and Attention',

    entertainmentServices: 'ENTERTAINMENT SERVICES',
    daytimeActivities: 'Daytime Activities with Animation Team',
    sportsAreas: 'Activity / Sports Areas and Equipment',
    eveningShows: 'Evening Activities and Shows',
    miniclubActivities: 'Mini Club Activities',
    entertainmentStaffCare: 'Staff Courtesy and Attention',

    otherServices: 'OTHER SERVICES',
    landscaping: 'Landscaping / Garden Design',
    spaServices: 'Sauna / Hammam Services',
    shopBehavior: 'General Merchant Behavior in the Hotel',
    priceQuality: 'Price / Quality Relationship',

    suggestions: 'YOUR SUGGESTIONS',
    previousStay: 'Have You Stayed at Our Hotel Before? *',
    yes: 'Yes',
    no: 'No',
    praisedStaff: 'Name of the Staff Member You Praised',
    generalComments: 'Your General Thoughts and Comments (0-500 characters)',
    willReturnQuestion: 'Will You Return? *',
    wouldRecommend: 'Would You Recommend Us to Others? *',
    submit: 'Submit Survey',

    thankYouTitle: 'Thank You!',
    thankYouMessage: 'Your valuable feedback is very important to us.',
    newSurvey: 'New Survey',

    roomNumberPlaceholder: 'e.g. 305',
    emailPlaceholder: 'example@email.com',
    praisedStaffPlaceholder: 'e.g. Ayşe / Mehmet',
    generalCommentsPlaceholder: 'You can write your comments here...'
  },

  de: {
    pageTitle: '🏨 Hotel-Gästebefragung',
    languageHeader: 'Sprache wählen',
    hotelName: 'Concordia Celes Hotel',
    surveyTitle: 'Gästebefragung zur Zufriedenheit',

    generalInfo: 'ALLGEMEINE INFORMATIONEN',
    fullName: 'Vor- und Nachname *',
    gender: 'Geschlecht *',
    female: 'Weiblich',
    male: 'Männlich',
    nationality: 'Nationalität *',
    selectOption: 'Bitte wählen...',
    other: 'Andere',
    roomNumber: 'Zimmernummer *',
    checkIn: 'Anreisedatum *',
    checkOut: 'Abreisedatum *',
    email: 'E-Mail-Adresse',
    kvkkText: 'Ich stimme der Verarbeitung meiner personenbezogenen Daten durch das Concordia Celes Hotel zum Zweck der Gästebefragung zu.',
    kvkkLink: 'Datenschutzhinweis',
    next: 'Weiter',
    back: 'Zurück',

    frontOffice: 'REZEPTION / FRONT OFFICE',
    welcomeGreeting: 'Begrüßung bei Ankunft',
    checkInProcess: 'Check-in Vorgang',
    facilityInfo: 'Informationen über die Anlage',
    frontDeskCare: 'Freundlichkeit und Aufmerksamkeit des Personals',
    bellboyService: 'Bellboy-Service',

    guestRelation: 'GÄSTEBETREUUNG',
    grWelcomeQuality: 'Kommunikation mit dem Gast',
    problemSolving: 'Ausreichende Information',
    guestFollowUp: 'Freundlichkeit und Aufmerksamkeit des Personals',

    housekeeping: 'ZIMMERSERVICE / HOUSEKEEPING',
    initialRoomCleaning: 'Zimmerreinigung bei Ankunft',
    roomAppearance: 'Erscheinungsbild und Komfort des Zimmers',
    dailyRoomCleaning: 'Zimmerreinigung und Ordnung während des Aufenthalts',
    minibarService: 'Minibar-Service',
    publicAreaCleaning: 'Sauberkeit der öffentlichen Bereiche',
    beachPoolCleaning: 'Sauberkeit rund um Strand und Pool',
    housekeepingStaffCare: 'Freundlichkeit und Aufmerksamkeit des Personals',

    foodServices: 'KÜCHE',
    breakfastVariety: 'Vielfalt des Frühstücksbuffets',
    lunchVariety: 'Vielfalt des Mittagsbuffets',
    dinnerVariety: 'Vielfalt des Abendbuffets',
    breakfastQuality: 'Frühstücksqualität',
    lunchQuality: 'Mittagsqualität',
    dinnerQuality: 'Abendessensqualität',
    alacarteQuality: 'Präsentation und Qualität des À-la-carte-Restaurants',
    kitchenHygiene: 'Hygiene und Sauberkeit der Küche',
    foodStaffCare: 'Freundlichkeit und Aufmerksamkeit des Personals',

    barsServices: 'BARS',
    poolBarQuality: 'Servicequalität der Poolbar',
    lobbyBarQuality: 'Servicequalität der Lobbybar',
    snackBarQuality: 'Servicequalität der Snackbar',
    drinkQuality: 'Getränkequalität und Präsentation',
    barHygiene: 'Hygiene und Sauberkeit der Bars',
    barStaffCare: 'Freundlichkeit und Aufmerksamkeit des Personals',

    restaurantServices: 'RESTAURANTSERVICE',
    restaurantLayout: 'Layout und Qualität des Restaurants',
    restaurantCapacity: 'Sitzplatzkapazität des Restaurants',
    restaurantHygiene: 'Hygiene und Sauberkeit des Restaurants',
    snackbarRestaurant: 'Snackbar-Restaurantservice',
    alacarteRestaurant: 'À-la-carte-Restaurantservice und Aufmerksamkeit des Personals',
    restaurantStaffCare: 'Freundlichkeit und Aufmerksamkeit des Personals',

    technicalService: 'TECHNISCHER SERVICE',
    roomTechnicalSystems: 'Technische Systeme im Zimmer',
    maintenanceResponse: 'Reaktion auf Störungen und Reparaturen',
    environmentLighting: 'Außenbeleuchtung und Ordnung',
    poolWaterCleaning: 'Sauberkeit des Poolwassers',
    technicalStaffCare: 'Freundlichkeit und Aufmerksamkeit des Personals',

    entertainmentServices: 'UNTERHALTUNGSSERVICE',
    daytimeActivities: 'Tagesaktivitäten mit dem Animationsteam',
    sportsAreas: 'Aktivitäts- / Sportbereiche und Ausrüstung',
    eveningShows: 'Abendaktivitäten und Shows',
    miniclubActivities: 'Miniclub-Aktivitäten',
    entertainmentStaffCare: 'Freundlichkeit und Aufmerksamkeit des Personals',

    otherServices: 'WEITERE DIENSTE',
    landscaping: 'Landschaftsgestaltung / Gartenanlage',
    spaServices: 'Sauna- / Hammam-Service',
    shopBehavior: 'Allgemeines Verhalten der Händler im Hotel',
    priceQuality: 'Preis- / Leistungsverhältnis',

    suggestions: 'IHRE VORSCHLÄGE',
    previousStay: 'Waren Sie schon einmal in unserem Hotel? *',
    yes: 'Ja',
    no: 'Nein',
    praisedStaff: 'Name des Mitarbeiters, den Sie gelobt haben',
    generalComments: 'Ihre allgemeinen Gedanken und Kommentare (0-500 Zeichen)',
    willReturnQuestion: 'Werden Sie wiederkommen? *',
    wouldRecommend: 'Würden Sie uns weiterempfehlen? *',
    submit: 'Befragung absenden',

    thankYouTitle: 'Vielen Dank!',
    thankYouMessage: 'Ihr wertvolles Feedback ist uns sehr wichtig.',
    newSurvey: 'Neue Befragung',

    roomNumberPlaceholder: 'z. B. 305',
    emailPlaceholder: 'beispiel@email.com',
    praisedStaffPlaceholder: 'z. B. Ayşe / Mehmet',
    generalCommentsPlaceholder: 'Sie können hier Ihre Kommentare schreiben...'
  },

  ru: {
    pageTitle: '🏨 Опрос гостей отеля',
    languageHeader: 'Выберите язык',
    hotelName: 'Concordia Celes Hotel',
    surveyTitle: 'Опрос удовлетворенности гостей',

    generalInfo: 'ОБЩАЯ ИНФОРМАЦИЯ',
    fullName: 'Имя и фамилия *',
    gender: 'Пол *',
    female: 'Женщина',
    male: 'Мужчина',
    nationality: 'Гражданство *',
    selectOption: 'Выберите...',
    other: 'Другое',
    roomNumber: 'Номер комнаты *',
    checkIn: 'Дата заезда *',
    checkOut: 'Дата выезда *',
    email: 'Адрес электронной почты',
    kvkkText: 'Я даю согласие на обработку моих персональных данных отелем Concordia Celes Hotel в целях оценки удовлетворенности гостей.',
    kvkkLink: 'Уведомление о конфиденциальности',
    next: 'Далее',
    back: 'Назад',

    frontOffice: 'РЕЦЕПЦИЯ / FRONT OFFICE',
    welcomeGreeting: 'Приветствие при заезде',
    checkInProcess: 'Процедура заселения',
    facilityInfo: 'Информация об отеле',
    frontDeskCare: 'Вежливость и внимательность персонала',
    bellboyService: 'Услуги носильщика',

    guestRelation: 'РАБОТА С ГОСТЯМИ',
    grWelcomeQuality: 'Общение с гостем',
    problemSolving: 'Достаточность информации',
    guestFollowUp: 'Вежливость и внимательность персонала',

    housekeeping: 'УБОРКА НОМЕРОВ',
    initialRoomCleaning: 'Чистота номера при заезде',
    roomAppearance: 'Внешний вид и комфорт номера',
    dailyRoomCleaning: 'Уборка и порядок в течение проживания',
    minibarService: 'Мини-бар',
    publicAreaCleaning: 'Чистота общественных зон',
    beachPoolCleaning: 'Чистота пляжа и территории бассейна',
    housekeepingStaffCare: 'Вежливость и внимательность персонала',

    foodServices: 'КУХНЯ',
    breakfastVariety: 'Разнообразие завтрака',
    lunchVariety: 'Разнообразие обеда',
    dinnerVariety: 'Разнообразие ужина',
    breakfastQuality: 'Качество завтрака',
    lunchQuality: 'Качество обеда',
    dinnerQuality: 'Качество ужина',
    alacarteQuality: 'Подача и качество ресторана à la carte',
    kitchenHygiene: 'Гигиена и чистота кухни',
    foodStaffCare: 'Вежливость и внимательность персонала',

    barsServices: 'БАРЫ',
    poolBarQuality: 'Качество обслуживания в баре у бассейна',
    lobbyBarQuality: 'Качество обслуживания в лобби-баре',
    snackBarQuality: 'Качество обслуживания в снэк-баре',
    drinkQuality: 'Качество и подача напитков',
    barHygiene: 'Гигиена и чистота баров',
    barStaffCare: 'Вежливость и внимательность персонала',

    restaurantServices: 'УСЛУГИ РЕСТОРАНА',
    restaurantLayout: 'Планировка и качество ресторана',
    restaurantCapacity: 'Вместимость ресторана',
    restaurantHygiene: 'Гигиена и чистота ресторана',
    snackbarRestaurant: 'Обслуживание в Snackbar Restaurant',
    alacarteRestaurant: 'Обслуживание в ресторане à la carte и внимание персонала',
    restaurantStaffCare: 'Вежливость и внимательность персонала',

    technicalService: 'ТЕХНИЧЕСКИЙ СЕРВИС',
    roomTechnicalSystems: 'Технические системы в номере',
    maintenanceResponse: 'Реакция на неисправности и ремонт',
    environmentLighting: 'Освещение и порядок на территории',
    poolWaterCleaning: 'Чистота воды в бассейне',
    technicalStaffCare: 'Вежливость и внимательность персонала',

    entertainmentServices: 'РАЗВЛЕЧЕНИЯ',
    daytimeActivities: 'Дневные активности с анимационной командой',
    sportsAreas: 'Спортивные / активные зоны и оборудование',
    eveningShows: 'Вечерние программы и шоу',
    miniclubActivities: 'Активности мини-клуба',
    entertainmentStaffCare: 'Вежливость и внимательность персонала',

    otherServices: 'ДРУГИЕ УСЛУГИ',
    landscaping: 'Ландшафт / благоустройство',
    spaServices: 'Сауна / хамам',
    shopBehavior: 'Поведение торговцев на территории отеля',
    priceQuality: 'Соотношение цены и качества',

    suggestions: 'ВАШИ ПРЕДЛОЖЕНИЯ',
    previousStay: 'Вы уже были в нашем отеле? *',
    yes: 'Да',
    no: 'Нет',
    praisedStaff: 'Имя сотрудника, которого вы похвалили',
    generalComments: 'Ваши общие мысли и комментарии (0-500 символов)',
    willReturnQuestion: 'Вы вернетесь снова? *',
    wouldRecommend: 'Порекомендуете ли вы нас? *',
    submit: 'Отправить опрос',

    thankYouTitle: 'Спасибо!',
    thankYouMessage: 'Ваше ценное мнение очень важно для нас.',
    newSurvey: 'Новый опрос',

    roomNumberPlaceholder: 'например: 305',
    emailPlaceholder: 'example@email.com',
    praisedStaffPlaceholder: 'например: Ayşe / Mehmet',
    generalCommentsPlaceholder: 'Вы можете написать здесь свои комментарии...'
  },

  pl: {
    pageTitle: '🏨 Ankieta Gości Hotelowych',
    languageHeader: 'Wybierz język',
    hotelName: 'Concordia Celes Hotel',
    surveyTitle: 'Ankieta satysfakcji gości',

    generalInfo: 'INFORMACJE OGÓLNE',
    fullName: 'Imię i nazwisko *',
    gender: 'Płeć *',
    female: 'Kobieta',
    male: 'Mężczyzna',
    nationality: 'Narodowość *',
    selectOption: 'Wybierz...',
    other: 'Inne',
    roomNumber: 'Numer pokoju *',
    checkIn: 'Data zameldowania *',
    checkOut: 'Data wymeldowania *',
    email: 'Adres e-mail',
    kvkkText: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Concordia Celes Hotel w celu badania satysfakcji gości.',
    kvkkLink: 'Informacja o prywatności',
    next: 'Dalej',
    back: 'Wstecz',

    frontOffice: 'RECEPCJA / FRONT OFFICE',
    welcomeGreeting: 'Powitanie przy przyjeździe',
    checkInProcess: 'Procedura zameldowania',
    facilityInfo: 'Informacje o obiekcie',
    frontDeskCare: 'Uprzejmość i troska personelu',
    bellboyService: 'Usługi bagażowego',

    guestRelation: 'RELACJE Z GOŚĆMI',
    grWelcomeQuality: 'Komunikacja z gościem',
    problemSolving: 'Wystarczalność informacji',
    guestFollowUp: 'Uprzejmość i troska personelu',

    housekeeping: 'SPRZĄTANIE POKOI',
    initialRoomCleaning: 'Czystość pokoju po przyjeździe',
    roomAppearance: 'Wygląd i komfort pokoju',
    dailyRoomCleaning: 'Sprzątanie i porządek podczas pobytu',
    minibarService: 'Minibar',
    publicAreaCleaning: 'Czystość części wspólnych',
    beachPoolCleaning: 'Czystość plaży i otoczenia basenu',
    housekeepingStaffCare: 'Uprzejmość i troska personelu',

    foodServices: 'KUCHNIA',
    breakfastVariety: 'Różnorodność bufetu śniadaniowego',
    lunchVariety: 'Różnorodność bufetu obiadowego',
    dinnerVariety: 'Różnorodność bufetu kolacyjnego',
    breakfastQuality: 'Jakość śniadania',
    lunchQuality: 'Jakość obiadu',
    dinnerQuality: 'Jakość kolacji',
    alacarteQuality: 'Prezentacja i jakość restauracji à la carte',
    kitchenHygiene: 'Higiena i czystość kuchni',
    foodStaffCare: 'Uprzejmość i troska personelu',

    barsServices: 'BARY',
    poolBarQuality: 'Jakość obsługi w barze przy basenie',
    lobbyBarQuality: 'Jakość obsługi w lobby barze',
    snackBarQuality: 'Jakość obsługi w snack barze',
    drinkQuality: 'Jakość i podanie napojów',
    barHygiene: 'Higiena i czystość barów',
    barStaffCare: 'Uprzejmość i troska personelu',

    restaurantServices: 'USŁUGI RESTAURACYJNE',
    restaurantLayout: 'Układ i jakość restauracji',
    restaurantCapacity: 'Wystarczająca liczba miejsc w restauracji',
    restaurantHygiene: 'Higiena i czystość restauracji',
    snackbarRestaurant: 'Obsługa Snackbar Restaurant',
    alacarteRestaurant: 'Obsługa restauracji à la carte i podejście personelu',
    restaurantStaffCare: 'Uprzejmość i troska personelu',

    technicalService: 'SERWIS TECHNICZNY',
    roomTechnicalSystems: 'Systemy techniczne w pokoju',
    maintenanceResponse: 'Zgłoszenie i usuwanie usterek',
    environmentLighting: 'Oświetlenie i porządek otoczenia',
    poolWaterCleaning: 'Czystość wody w basenie',
    technicalStaffCare: 'Uprzejmość i troska personelu',

    entertainmentServices: 'ROZRYWKA',
    daytimeActivities: 'Zajęcia dzienne z zespołem animacyjnym',
    sportsAreas: 'Strefy aktywności / sportowe i sprzęt',
    eveningShows: 'Wieczorne atrakcje i pokazy',
    miniclubActivities: 'Aktywności mini klubu',
    entertainmentStaffCare: 'Uprzejmość i troska personelu',

    otherServices: 'INNE USŁUGI',
    landscaping: 'Zagospodarowanie terenu / krajobraz',
    spaServices: 'Sauna / hammam',
    shopBehavior: 'Ogólne zachowanie sprzedawców na terenie hotelu',
    priceQuality: 'Stosunek jakości do ceny',

    suggestions: 'TWOJE SUGESTIE',
    previousStay: 'Czy byłeś/aś wcześniej w naszym hotelu? *',
    yes: 'Tak',
    no: 'Nie',
    praisedStaff: 'Imię pracownika, którego pochwaliłeś/aś',
    generalComments: 'Twoje ogólne uwagi i komentarze (0-500 znaków)',
    willReturnQuestion: 'Czy wrócisz ponownie? *',
    wouldRecommend: 'Czy poleciłbyś/poleciłabyś nas innym? *',
    submit: 'Wyślij ankietę',

    thankYouTitle: 'Dziękujemy!',
    thankYouMessage: 'Twoja cenna opinia jest dla nas bardzo ważna.',
    newSurvey: 'Nowa ankieta',

    roomNumberPlaceholder: 'np. 305',
    emailPlaceholder: 'example@email.com',
    praisedStaffPlaceholder: 'np. Ayşe / Mehmet',
    generalCommentsPlaceholder: 'Tutaj możesz wpisać swoje komentarze...'
  },

  ro: {
    pageTitle: '🏨 Sondaj pentru oaspeții hotelului',
    languageHeader: 'Alegeți limba',
    hotelName: 'Concordia Celes Hotel',
    surveyTitle: 'Sondaj de satisfacție a oaspeților',

    generalInfo: 'INFORMAȚII GENERALE',
    fullName: 'Nume și prenume *',
    gender: 'Sex *',
    female: 'Femeie',
    male: 'Bărbat',
    nationality: 'Naționalitate *',
    selectOption: 'Alegeți...',
    other: 'Altele',
    roomNumber: 'Număr cameră *',
    checkIn: 'Data sosirii *',
    checkOut: 'Data plecării *',
    email: 'Adresă de e-mail',
    kvkkText: 'Îmi dau acordul ca datele mele personale să fie prelucrate de Concordia Celes Hotel în scopul evaluării satisfacției oaspeților.',
    kvkkLink: 'Notificare de confidențialitate',
    next: 'Înainte',
    back: 'Înapoi',

    frontOffice: 'RECEPȚIE / FRONT OFFICE',
    welcomeGreeting: 'Salut la sosire',
    checkInProcess: 'Procesul de check-in',
    facilityInfo: 'Informații despre hotel',
    frontDeskCare: 'Amabilitatea și atenția personalului',
    bellboyService: 'Servicii bellboy',

    guestRelation: 'RELAȚIA CU OASPETELE',
    grWelcomeQuality: 'Comunicarea cu oaspetele',
    problemSolving: 'Suficiența informațiilor',
    guestFollowUp: 'Amabilitatea și atenția personalului',

    housekeeping: 'CURĂȚENIA CAMEREI',
    initialRoomCleaning: 'Curățenia camerei la sosire',
    roomAppearance: 'Aspectul și confortul camerei',
    dailyRoomCleaning: 'Curățenia și ordinea camerei în timpul sejurului',
    minibarService: 'Mini-bar',
    publicAreaCleaning: 'Curățenia zonelor comune',
    beachPoolCleaning: 'Curățenia zonei plajei și piscinei',
    housekeepingStaffCare: 'Amabilitatea și atenția personalului',

    foodServices: 'BUCĂTĂRIE',
    breakfastVariety: 'Varietatea bufetului de mic dejun',
    lunchVariety: 'Varietatea bufetului de prânz',
    dinnerVariety: 'Varietatea bufetului de cină',
    breakfastQuality: 'Calitatea micului dejun',
    lunchQuality: 'Calitatea prânzului',
    dinnerQuality: 'Calitatea cinei',
    alacarteQuality: 'Prezentarea și calitatea restaurantului à la carte',
    kitchenHygiene: 'Igiena și curățenia bucătăriei',
    foodStaffCare: 'Amabilitatea și atenția personalului',

    barsServices: 'BARURI',
    poolBarQuality: 'Calitatea serviciului la pool bar',
    lobbyBarQuality: 'Calitatea serviciului la lobby bar',
    snackBarQuality: 'Calitatea serviciului la snack bar',
    drinkQuality: 'Calitatea și prezentarea băuturilor',
    barHygiene: 'Igiena și curățenia barurilor',
    barStaffCare: 'Amabilitatea și atenția personalului',

    restaurantServices: 'SERVICII RESTAURANT',
    restaurantLayout: 'Aspectul și calitatea restaurantului',
    restaurantCapacity: 'Capacitatea de locuri a restaurantului',
    restaurantHygiene: 'Igiena și curățenia restaurantului',
    snackbarRestaurant: 'Serviciul Snackbar Restaurant',
    alacarteRestaurant: 'Serviciul restaurantului à la carte și atenția personalului',
    restaurantStaffCare: 'Amabilitatea și atenția personalului',

    technicalService: 'SERVICIU TEHNIC',
    roomTechnicalSystems: 'Sisteme tehnice în cameră',
    maintenanceResponse: 'Raportarea și remedierea defecțiunilor',
    environmentLighting: 'Iluminarea și ordinea zonei',
    poolWaterCleaning: 'Curățenia apei din piscină',
    technicalStaffCare: 'Amabilitatea și atenția personalului',

    entertainmentServices: 'SERVICII DE DIVERTISMENT',
    daytimeActivities: 'Activități de zi cu echipa de animație',
    sportsAreas: 'Zone și echipamente sportive / de activitate',
    eveningShows: 'Activități de seară și spectacole',
    miniclubActivities: 'Activități miniclub',
    entertainmentStaffCare: 'Amabilitatea și atenția personalului',

    otherServices: 'ALTE SERVICII',
    landscaping: 'Amenajare / peisagistică',
    spaServices: 'Saună / hammam',
    shopBehavior: 'Comportamentul general al comercianților din hotel',
    priceQuality: 'Raport calitate / preț',

    suggestions: 'SUGESTIILE DVS.',
    previousStay: 'Ați mai fost la hotelul nostru? *',
    yes: 'Da',
    no: 'Nu',
    praisedStaff: 'Numele angajatului pe care l-ați lăudat',
    generalComments: 'Opiniile și comentariile dvs. generale (0-500 caractere)',
    willReturnQuestion: 'Vă veți întoarce? *',
    wouldRecommend: 'Ne-ați recomanda? *',
    submit: 'Trimite sondajul',

    thankYouTitle: 'Vă mulțumim!',
    thankYouMessage: 'Părerea dvs. valoroasă este foarte importantă pentru noi.',
    newSurvey: 'Sondaj nou',

    roomNumberPlaceholder: 'de ex. 305',
    emailPlaceholder: 'example@email.com',
    praisedStaffPlaceholder: 'de ex. Ayşe / Mehmet',
    generalCommentsPlaceholder: 'Puteți scrie comentariile dvs. aici...'
  }
};

const SECTION_TITLE_KEYS = {
  section1: 'generalInfo',
  section2: 'frontOffice',
  section3: 'guestRelation',
  section4: 'housekeeping',
  section5: 'foodServices',
  section6: 'barsServices',
  section7: 'restaurantServices',
  section8: 'technicalService',
  section9: 'entertainmentServices',
  section10: 'otherServices',
  section11: 'suggestions'
};

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.tr;

  document.documentElement.lang = lang;
  document.title = t.pageTitle || document.title;

  const langHeader = document.querySelector('.lang-header h2');
  if (langHeader) langHeader.textContent = t.languageHeader || 'Select Language / Dil Seçin';

  const hotelName = document.querySelector('[data-translate="hotelName"]');
  if (hotelName) hotelName.textContent = t.hotelName || 'Concordia Celes Hotel';

  const surveyTitle = document.querySelector('[data-translate="surveyTitle"]');
  if (surveyTitle) surveyTitle.textContent = t.surveyTitle || '';

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  Object.entries(SECTION_TITLE_KEYS).forEach(([sectionId, key]) => {
    const heading = document.querySelector(`#${sectionId} .section-title h2`);
    if (heading && t[key] !== undefined) {
      heading.textContent = t[key];
    }
  });

  document.querySelectorAll('.rating-item').forEach(item => {
    const hidden = item.querySelector('input[type="hidden"][name]');
    const label = item.querySelector('label');
    if (!hidden || !label) return;

    const key = hidden.name;
    if (t[key] !== undefined) {
      label.textContent = t[key];
    }
  });

  const nationalitySelect = document.querySelector('select[name="nationality"]');
  if (nationalitySelect) {
    Array.from(nationalitySelect.options).forEach(opt => {
      if (opt.value === '') {
        opt.textContent = t.selectOption || 'Select...';
      } else {
        const map = COUNTRY_OPTIONS[lang] || COUNTRY_OPTIONS.tr;
        if (map[opt.value]) opt.textContent = map[opt.value];
      }
    });
  }

  const roomNumber = document.querySelector('input[name="roomNumber"]');
  if (roomNumber) roomNumber.placeholder = t.roomNumberPlaceholder || '';

  const email = document.querySelector('input[name="email"]');
  if (email) email.placeholder = t.emailPlaceholder || '';

  const praisedStaff = document.querySelector('input[name="praisedStaff"]');
  if (praisedStaff) praisedStaff.placeholder = t.praisedStaffPlaceholder || '';

  const comments = document.querySelector('textarea[name="generalComments"]');
  if (comments && t.generalCommentsPlaceholder) {
    comments.placeholder = t.generalCommentsPlaceholder;
  }

  const currentLangName = document.getElementById('currentLangName');
  if (currentLangName) currentLangName.textContent = LANG_NAMES[lang] || 'Türkçe';

  const langSelector = document.getElementById('languageSelector');
  const surveyForm = document.getElementById('surveyForm');
  if (langSelector) langSelector.style.display = 'none';
  if (surveyForm) surveyForm.style.display = 'block';

  localStorage.setItem('selectedLang', lang);
}

function setLanguage(lang) {
  applyTranslations(lang);
}

function changeLanguage() {
  const langSelector = document.getElementById('languageSelector');
  const surveyForm = document.getElementById('surveyForm');
  const thankYou = document.getElementById('thankYou');

  if (surveyForm) surveyForm.style.display = 'none';
  if (thankYou) thankYou.style.display = 'none';
  if (langSelector) langSelector.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
  const savedLang = localStorage.getItem('selectedLang');
  if (savedLang && LANG_NAMES[savedLang]) {
    applyTranslations(savedLang);
  } else {
    const currentLangName = document.getElementById('currentLangName');
    if (currentLangName) currentLangName.textContent = 'Türkçe';
  }
});

window.setLanguage = setLanguage;
window.changeLanguage = changeLanguage;
window.applyTranslations = applyTranslations;
