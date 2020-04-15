const paymentMethodResources = {
    en: {
      paymentMethodOptions: {
        Cash: "Cash",
        "Credit Card": "Credit Card",
        "Wire Transfer": "Wire Transfer",
      },
      paymentMethodLabel: "Payment Method",
    },
    ar: {
      paymentMethodOptions: {
        Cash: "مال نقدي",
        "Credit Card": "بطاقة ائتمان",
        "Wire Transfer": "حوالة مصرفية",
      },
      paymentMethodLabel: "طريقة الدفع",
    },
    tr: {
      paymentMethodOptions: {
        Cash: "Nakit",
        "Credit Card": "kredi kartı",
        "Wire Transfer": "Electronik Transfer",
      },
      paymentMethodLabel: "Ödeme Şekli",
    },
  };
  
  const categoryResources = {
    en: {
      categoryOptions: {
        'Computer Equipments': 'Computer Equipments',
        'Computer Software': 'Computer Software',
        'Freelance/Independent Contractor Labor': 'Freelance/Independent Contractor Labor',
        'Utilities': 'Utilities',
        'Taxes': 'Taxes',
        'Professional Services': 'Professional Services',
        'Travel & Expo Expenses': 'Travel & Expo Expenses',
        'Vehicle Expense': 'Vehicle Expense',
        'Bank Charges': 'Bank Charges',
        'Insurance': 'Insurance',
        'Lease and Rent': 'Lease and Rent',
        'Penalties': 'Penalties',
        'Repairs': 'Repairs',
        'Furniture and Equipment': 'Furniture and Equipment',
        'Office Supplies and Expenses': 'Office Supplies and Expenses',
        'Salaries and Wages': 'Salaries and Wages',
        'Miscellaneous': 'Miscellaneous',
        'Advertising and Marketing': 'Advertising and Marketing',
        'Licenses and Intellectual Property': 'Licenses and Intellectual Property',
      },
      categoryLabel: "Category",
    },
    ar: {
      categoryOptions: {
        'Computer Equipments': 'معدات الكمبيوتر',
        'Computer Software': 'برامج الكمبيوتر',
        'Freelance/Independent Contractor Labor': 'عمل مستقل / مقاول مستقل',
        'Utilities': 'خدمات (الهاتف ، الإنترنت ، الكهرباء ...)',
        'Taxes': 'الضرائب',
        'Professional Services': 'خدمات احترافية',
        'Travel & Expo Expenses': 'نفقات السفر والمعرض',
        'Vehicle Expense': 'مصروفات السيارات',
        'Bank Charges': 'الرسوم المصرفية',
        'Insurance': 'تأمين',
        'Lease and Rent': 'تأجير وإيجار',
        'Penalties': 'ضربات الجزاء',
        'Repairs': 'التصليحات',
        'Furniture and Equipment': 'أثاث و معدات',
        'Office Supplies and Expenses': 'اللوازم المكتبية والمصاريف',
        'Salaries and Wages': 'الرواتب والأجور',
        'Miscellaneous': 'متنوع',
        'Advertising and Marketing': 'الإعلان والتسويق',
        'Licenses and Intellectual Property': 'التراخيص والملكية الفكرية',
      },
      categoryLabel: "قسم",
    },
    tr: {
      categoryOptions: {
        'Computer Equipments': 'Bilgisayar Ekipmanları',
        'Computer Software': 'Bilgisayar yazılımı',
        'Freelance/Independent Contractor Labor': 'Serbest / Bağımsız Müteahhit İşgücü',
        'Utilities': 'Kamu (Telefon, İnternet, Elektrik ...)',
        'Taxes': 'Vergiler',
        'Professional Services': 'Profesyonel hizmetler',
        'Travel & Expo Expenses': 'Seyahat ve Fuar Giderleri',
        'Vehicle Expense': 'Araç Giderleri',
        'Bank Charges': 'Banka masrafları',
        'Insurance': 'Sigorta',
        'Lease and Rent': 'Kira ve Kira',
        'Penalties': 'cezalar',
        'Repairs': 'tamirat',
        'Furniture and Equipment': 'Mobilya ve Ekipmanları',
        'Office Supplies and Expenses': 'Ofis Malzemeleri ve Giderleri',
        'Salaries and Wages': 'Maaşlar ve ücretler',
        'Miscellaneous': 'Çeşitli',
        'Advertising and Marketing': 'Reklam ve pazarlama',
        'Licenses and Intellectual Property': 'Lisanslar ve Fikri Mülkiyet',
      },
      categoryLabel: "kategori",
    },
  };
  
  const transactionDateResources = {
    en: {
      transactionDateLabel: "Transaction Date",
    },
  
    ar: {
      transactionDateLabel: "تاريخ الصفقة",
    },
    tr: {
      transactionDateLabel: "İşlem Tarihi",
    },
  };
  
  const amountResources = {
    en: {
      amountLabel: "Amount",
      currencyLabel: "Currency",
      currencyOptions: {
        TRY: "TRY",
        USD: "USD",
        EUR: "EUR",
      },
    },
    ar: {
      amountLabel: "مبلغ",
      currencyLabel: "عملة",
      currencyOptions: {
        TRY: "TRY",
        USD: "USD",
        EUR: "EUR",
      },
    },
    tr: {
      amountLabel: "Tutar",
      currencyLabel: "Para Birimi",
      currencyOptions: {
        TRY: "TRY",
        USD: "USD",
        EUR: "EUR",
      },
    },
  };
  
  const notesResources = {
    en: {
      notesLabel: "Notes",
    },
    ar: {
      notesLabel: "ملاحظات",
    },
    tr: {
      notesLabel: "notlar",
    },
  };

  const supplierResources = {
    en: {
      supplierLabel: "Supplier",
    },
    ar: {
      supplierLabel: "مورد",
    },
    tr: {
      supplierLabel: "Tedarikçi",
    },
  };
  const customerResources = {
    en: {
      customerLabel: "Customer",
    },
    ar: {
      customerLabel: "الزبون",
    },
    tr: {
      customerLabel: "Müşteri",
    },
  };

  const sendButtonResources = {
    en: {
      sendButtonText: "Submit",
    },
    ar: {
      sendButtonText: "إرسال",
    },
    tr: {
      sendButtonText: "Sunmak",
    },
  };

  const toasResources={
    en:{
      toastSuccessMessage: 'Success',
      toastFailureMessage: 'Error',
    },
    ar:{
      toastSuccessMessage: 'نجاح',
      toastFailureMessage: 'خطأ',
    },
    tr:{
      toastSuccessMessage: 'Başarı',
      toastFailureMessage: 'Hata',
    },
  }

  const loadingResources = {
    en : {
      loadingMessage: 'Loading...'
    },
    ar: {
      loadingMessage: '...جار التحميل'
    },
    tr : {
      loadingMessage: 'Yükleniyor...'
    },
  }

  const cameraResources = {
    en: {
      cameraClosedMessage: 'Camera Closed',
      cameraNotAvailableMessage: 'Camera not available'
    },
    ar: {
      cameraClosedMessage: 'تم إغلاق الكاميرا',
      cameraNotAvailableMessage: 'الكاميرا غير متاحة'
    },
    tr: {
      cameraClosedMessage: 'Ckamera Kapalı',
      cameraNotAvailableMessage:'Kamera mevcut değil'
    },
  }

  const layoutResources ={
    en:{
      layoutHomeLabel: 'Home',
      layoutSalesLabel : 'Sales',
      layoutPurchasesLabel : 'Purchases',
      layoutSettingsLabel : 'Settings',
      backButtonLabel: 'Back'

    },
    ar:{
      layoutHomeLabel: 'الصفحة الرئيسية',
      layoutSalesLabel : 'المبيعات',
      layoutPurchasesLabel : 'المشتريات',
      layoutSettingsLabel : 'إعدادات',
      backButtonLabel: 'الخلف'

    },
    tr:{
      layoutHomeLabel: 'Ana Sayfa',
      layoutSalesLabel : 'Satış',
      layoutPurchasesLabel : 'Satınalmalar',
      layoutSettingsLabel : 'Ayarlar',
      backButtonLabel: 'Geri'

    },
  }

  const settingsResources ={
    en: {
      languages: 'Languages',
      languageOptions:{
        Arabic: 'Arabic',
        English: 'English',
        Turkish: 'Turkish'
      },
      darkModeLabel:'Dark Mode',
      signOutButton: 'Sign Out'
    },
    
    ar: {
      languages: 'اللغات',
      languageOptions:{
        Arabic: 'العربية',
        English: 'الإنجليزية',
        Turkish: 'التركية'
      },
      darkModeLabel:'الوضع الداكن',
      signOutButton: 'تسجيل الخروج'
    },
    tr: {
      languages: 'Diller',
      languageOptions:{
        Arabic: 'Arapça',
        English: 'İngilizce',
        Turkish: 'Türkçe'
      },
      darkModeLabel:'Karanlık Mod',
      signOutButton: 'Oturumu Kapat'
    },

  }

 const  optionsResources = {
  en: {
    okButton: "Ok",
    cancelButton: 'Cancel'
  },

  ar: {
    okButton: "موافق",
    cancelButton: 'إلغاء'
  },
  tr: {
    okButton: "Tamam",
    cancelButton: 'İptal'
  },
  }
  
  export const RESOURCES = {
    en: {
      ...settingsResources.en,
      ...layoutResources.en,
      ...customerResources.en,
      ...cameraResources.en,
      ...loadingResources.en,
      ...toasResources.en,
      ...sendButtonResources.en,
      ...supplierResources.en,
      ...notesResources.en,
      ...amountResources.en,
      ...paymentMethodResources.en,
      ...categoryResources.en,
      ...transactionDateResources.en,
      ...optionsResources.en,
    },
    ar: {
      ...settingsResources.ar,
      ...layoutResources.ar,
      ...customerResources.ar,
      ...cameraResources.ar,
      ...loadingResources.ar,
      ...toasResources.ar,
      ...sendButtonResources.ar,
      ...supplierResources.ar,
      ...notesResources.ar,
      ...amountResources.ar,
      ...paymentMethodResources.ar,
      ...categoryResources.ar,
      ...transactionDateResources.ar,
      ...optionsResources.ar,
    },
    tr: {
      ...settingsResources.tr,
      ...layoutResources.tr,
      ...customerResources.tr,
      ...cameraResources.tr,
      ...loadingResources.tr,
      ...toasResources.tr,
      ...sendButtonResources.tr,
      ...supplierResources.tr,
      ...notesResources.tr,
      ...amountResources.tr,
      ...paymentMethodResources.tr,
      ...categoryResources.tr,
      ...transactionDateResources.tr,
      ...optionsResources.tr,
    },
  };
  