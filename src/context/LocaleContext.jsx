import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  fr: {
    direction: 'ltr',
    nav: {
      courses: 'Cours',
      dashboard: 'Mon espace',
      admin: 'Administration',
      login: 'Connexion',
      register: 'Inscription',
      profile: 'Profil',
      settings: 'Paramètres',
      menu: 'Menu',
    },
    hero: {
      tagline: 'Boostez vos compétences',
      title: 'LevelUp, la plateforme e-learning pour aller plus loin.',
      description: 'Découvrez des parcours interactifs, suivez votre progression et obtenez des certificats digitaux — sans backend complexe.',
      viewCourses: 'Voir les cours',
      startNow: 'Commencer maintenant',
      categories: 'Catégories populaires',
      testimonials: 'Témoignages',
      recentCourses: 'Cours récents',
      whyLearn: 'Pourquoi ce cours ?',
    },
    landing: {
      categories: 'Catégories populaires',
      testimonials: 'Témoignages',
      recentCourses: 'Cours récents',
      benefits: {
        modernCourses: {
          title: 'Cours modernes',
          description: 'Contenus pratiques mis à jour pour les métiers digitaux.',
        },
        trackedProgress: {
          title: 'Progrès suivis',
          description: 'Suivez votre avance et obtenez des certificats motivants.',
        },
        community: {
          title: 'Communauté active',
          description: 'Rejoignez une communauté d’apprenants et d’experts.',
        },
      },
    },
    courses: {
      title: 'Catalogue des cours',
      subtitle: 'Trouvez le parcours qui vous convient avec des filtres rapides.',
      searchPlaceholder: 'Rechercher un cours',
      all: 'Tous',
      free: 'Gratuit',
      below60: '< 60€',
      above60: '60€+',
      noResults: 'Aucun cours trouvé avec ces filtres.',
      instructor: 'Formateur',
      enroll: 'S’inscrire au cours',
      unenroll: 'Se désinscrire',
      program: 'Programme',
      reviews: 'Avis des apprenants',
      price: 'Prix',
      whyCourse: 'Accédez à des leçons structurées, des exercices pratiques et un suivi simple grâce à LevelUp.',
      students: '%{count} élèves',
      view: 'Voir',
      programTitle: 'Programme',
      noCourse: 'Ce cours est introuvable.',
      instructorLabel: 'Formateur',
      priceLabel: 'Prix',
      programSection: 'Programme',
      reviewsSection: 'Avis des apprenants',
    },
    profile: {
      title: 'Mon profil',
      description: 'Mettez à jour vos informations personnelles.',
      save: 'Enregistrer',
      updated: 'Profil mis à jour.',
    },
    auth: {
      loginTitle: 'Connexion',
      loginDescription: 'Entrez vos identifiants pour accéder à votre espace LevelUp.',
      registerTitle: 'Inscription',
      registerDescription: 'Créez un compte gratuit pour rejoindre LevelUp.',
      name: 'Nom complet',
      email: 'Email',
      password: 'Mot de passe',
      createAccount: 'Créer mon compte',
      alreadyRegistered: 'Déjà inscrit ? Connectez-vous',
      noAccount: 'Pas encore de compte ? Inscrivez-vous',
      submitLogin: 'Se connecter',
      profileUpdated: 'Profil mis à jour.',
      allFieldsRequired: 'Tous les champs sont requis.',
      invalidLogin: 'Email ou mot de passe invalide.',
      emailInUse: 'Cet email est déjà utilisé.',
      profileTitle: 'Mon profil',
    },
    dashboard: {
      welcome: 'Bienvenue, %{name}',
      subtitle: 'Votre espace apprenant contient votre progression, vos cours et vos certificats.',
      enrolled: 'Cours inscrits',
      progress: 'Progrès global',
      certificates: 'Certificats',
      myCourses: 'Mes cours',
      browseCourses: 'Parcourir les cours',
      noCourses: 'Vous n’êtes inscrit à aucun cours pour l’instant.',
    },
    admin: {
      dashboardTitle: 'Tableau de bord',
      backOffice: 'Espace admin',
      manageCourses: 'Gestion des cours',
      manageUsers: 'Gestion des utilisateurs',
      categories: 'Gestion des catégories',
      settings: 'Paramètres',
      createCourse: 'Créer un cours',
      editCourse: 'Modifier le cours',
      manageUsersDescription: 'Activez, désactivez ou changez de rôle pour les comptes fictifs.',
      categoriesDescription: 'Ajoutez ou supprimez des catégories pour votre catalogue.',
      settingsDescription: 'Configurez votre profil administrateur.',
      noResults: 'Aucun résultat trouvé.',
      activeUsers: 'Utilisateurs actifs',
      availableCourses: 'Cours disponibles',
      categoriesCount: 'Catégories',
      usersList: 'Liste des utilisateurs',
      usersListDescription: 'Voir et gérer tous les comptes de l’application.',
      viewUsers: 'Voir la liste',
      overview: 'Les chiffres ci-dessus sont simulés avec les données mock. Vous pouvez gérer les cours, utilisateurs et catégories sans backend.',
      activate: 'Activer',
      deactivate: 'Désactiver',
      adminRole: 'Passer admin',
      learnerRole: 'Passer apprenant',
      userRole: 'Rôle',
      delete: 'Supprimer',
      edit: 'Éditer',
    },
    labels: {
      instructor: 'Formateur',
      price: 'Prix',
      duration: 'Durée',
      level: 'Niveau',
      category: 'Catégorie',
    },
    notFound: {
      title: 'Page introuvable',
      message: 'La page que vous recherchez n’existe pas ou a été déplacée.',
      backHome: 'Retour à l\'accueil',
    },
    categories: {
      'category-1': 'Design',
      'category-2': 'Développement',
      'category-3': 'Marketing',
      'category-4': 'Productivité',
    },
    levels: {
      'Débutant': 'Débutant',
      'Intermédiaire': 'Intermédiaire',
      'Avancé': 'Avancé',
    },
    buttons: {
      save: 'Enregistrer',
      create: 'Créer',
      add: 'Ajouter',
      manage: 'Gérer',
      logout: 'Déconnexion',
    },
    footer: {
      copy: 'LevelUp © 2026 · Plateforme e-learning fictive',
    },
    languages: {
      fr: 'Français',
      en: 'Anglais',
      ar: 'العربية',
    },
  },
  en: {
    direction: 'ltr',
    nav: {
      courses: 'Courses',
      dashboard: 'Dashboard',
      admin: 'Admin',
      login: 'Login',
      register: 'Register',
      profile: 'Profile',
      settings: 'Settings',
      menu: 'Menu',
    },
    hero: {
      tagline: 'Boost your skills',
      title: 'LevelUp, the e-learning platform to go further.',
      description: 'Discover interactive paths, track your progress and earn digital certificates — without a complex backend.',
      viewCourses: 'View courses',
      startNow: 'Start now',
      categories: 'Popular categories',
      testimonials: 'Testimonials',
      recentCourses: 'Recent courses',
      whyLearn: 'Why this course?',
    },
    landing: {
      categories: 'Popular categories',
      testimonials: 'Testimonials',
      recentCourses: 'Recent courses',
      benefits: {
        modernCourses: {
          title: 'Modern courses',
          description: 'Practical content updated for digital careers.',
        },
        trackedProgress: {
          title: 'Tracked progress',
          description: 'Track your progress and earn motivating certificates.',
        },
        community: {
          title: 'Active community',
          description: 'Join a community of learners and experts.',
        },
      },
    },
    courses: {
      title: 'Courses catalog',
      subtitle: 'Find the path that fits you with quick filters.',
      searchPlaceholder: 'Search a course',
      all: 'All',
      free: 'Free',
      below60: '< €60',
      above60: '€60+',
      noResults: 'No courses found with these filters.',
      instructor: 'Instructor',
      enroll: 'Enroll in course',
      unenroll: 'Unenroll',
      program: 'Program',
      reviews: 'Learner reviews',
      price: 'Price',
      whyCourse: 'Access structured lessons, practical exercises and simple tracking with LevelUp.',
      students: '%{count} learners',
      view: 'View',
      programTitle: 'Program',
      noCourse: 'This course is not available.',
      instructorLabel: 'Instructor',
      priceLabel: 'Price',
      programSection: 'Program',
      reviewsSection: 'Learner reviews',
    },
    profile: {
      title: 'My profile',
      description: 'Update your personal information.',
      save: 'Save',
      updated: 'Profile updated.',
    },
    auth: {
      loginTitle: 'Login',
      loginDescription: 'Enter your credentials to access your LevelUp area.',
      registerTitle: 'Register',
      registerDescription: 'Create a free account to join LevelUp.',
      name: 'Full name',
      email: 'Email',
      password: 'Password',
      createAccount: 'Create account',
      alreadyRegistered: 'Already registered? Login',
      noAccount: 'No account yet? Register',
      submitLogin: 'Sign in',
      profileUpdated: 'Profile updated.',
      allFieldsRequired: 'All fields are required.',
      invalidLogin: 'Email or password is invalid.',
      emailInUse: 'This email is already in use.',
      profileTitle: 'My profile',
    },
    dashboard: {
      welcome: 'Welcome, %{name}',
      subtitle: 'Your learner space contains your progress, courses and certificates.',
      enrolled: 'Enrolled courses',
      progress: 'Overall progress',
      certificates: 'Certificates',
      myCourses: 'My courses',
      browseCourses: 'Browse courses',
      noCourses: 'You are not enrolled in any course yet.',
    },
    admin: {
      dashboardTitle: 'Dashboard',
      backOffice: 'Back Office',
      manageCourses: 'Course management',
      manageUsers: 'User management',
      categories: 'Categories management',
      settings: 'Settings',
      createCourse: 'Create course',
      editCourse: 'Edit course',
      manageUsersDescription: 'Activate, deactivate or change roles for mock accounts.',
      categoriesDescription: 'Add or remove categories for your catalog.',
      settingsDescription: 'Configure your admin profile.',
      noResults: 'No results found.',
      activeUsers: 'Active users',
      availableCourses: 'Available courses',
      categoriesCount: 'Categories',
      usersList: 'Users list',
      usersListDescription: 'View and manage all application accounts.',
      viewUsers: 'View list',
      overview: 'The figures above are mocked with local data. You can manage courses, users and categories without a backend.',
      activate: 'Activate',
      deactivate: 'Deactivate',
      adminRole: 'Make admin',
      learnerRole: 'Make learner',
      userRole: 'Role',
      delete: 'Delete',
      edit: 'Edit',
    },
    labels: {
      instructor: 'Instructor',
      price: 'Price',
      duration: 'Duration',
      level: 'Level',
      category: 'Category',
    },
    notFound: {
      title: 'Page not found',
      message: 'The page you are looking for does not exist or has been moved.',
      backHome: 'Back home',
    },
    categories: {
      'category-1': 'Design',
      'category-2': 'Development',
      'category-3': 'Marketing',
      'category-4': 'Productivity',
    },
    levels: {
      'Débutant': 'Beginner',
      'Intermédiaire': 'Intermediate',
      'Avancé': 'Advanced',
    },
    buttons: {
      save: 'Save',
      create: 'Create',
      add: 'Add',
      manage: 'Manage',
      logout: 'Logout',
    },
    footer: {
      copy: 'LevelUp © 2026 · Sample e-learning platform',
    },
    languages: {
      fr: 'Français',
      en: 'English',
      ar: 'العربية',
    },
  },
  ar: {
    direction: 'rtl',
    nav: {
      courses: 'الدورات',
      dashboard: 'لوحة التحكم',
      admin: 'الإدارة',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
    },
    hero: {
      tagline: 'ارتقِ بمهاراتك',
      title: 'LevelUp، منصة التعليم الإلكتروني لتتقدم.',
      description: 'اكتشف مسارات تفاعلية، تتبع تقدمك واحصل على شهادات رقمية - بدون بنية خلفية معقدة.',
      viewCourses: 'عرض الدورات',
      startNow: 'ابدأ الآن',
      categories: 'الفئات الشائعة',
      testimonials: 'آراء المتعلمين',
      recentCourses: 'الدورات الحديثة',
      whyLearn: 'لماذا هذه الدورة؟',
    },
    landing: {
      categories: 'الفئات الشائعة',
      testimonials: 'آراء المتعلمين',
      recentCourses: 'الدورات الحديثة',
      benefits: {
        modernCourses: {
          title: 'دورات حديثة',
          description: 'محتوى عملي محدث لمهن رقمية.',
        },
        trackedProgress: {
          title: 'تقدم متتبع',
          description: 'تابع تقدمك واحصل على شهادات محفزة.',
        },
        community: {
          title: 'مجتمع نشط',
          description: 'انضم إلى مجتمع من المتعلمين والخبراء.',
        },
      },
    },
    courses: {
      title: 'كتالوج الدورات',
      subtitle: 'ابحث عن المسار المناسب لك باستخدام عوامل تصفية سريعة.',
      searchPlaceholder: 'ابحث عن دورة',
      all: 'الكل',
      free: 'مجاني',
      below60: 'أقل من 60€',
      above60: '60€+',
      noResults: 'لم يتم العثور على دورات بهذه الفلاتر.',
      instructor: 'المدرب',
      enroll: 'التسجيل في الدورة',
      unenroll: 'إلغاء التسجيل',
      program: 'البرنامج',
      reviews: 'آراء المتعلمين',
      price: 'السعر',
      whyCourse: 'احصل على دروس منظمة، تمارين عملية وتتبع بسيط عبر LevelUp.',
      students: '%{count} متعلم',
      view: 'عرض',
      programTitle: 'البرنامج',
      noCourse: 'هذه الدورة غير موجودة.',
      instructorLabel: 'المدرب',
      priceLabel: 'السعر',
      programSection: 'البرنامج',
      reviewsSection: 'آراء المتعلمين',
    },
    profile: {
      title: 'ملفي الشخصي',
      description: 'قم بتحديث معلوماتك الشخصية.',
      save: 'حفظ',
      updated: 'تم تحديث الملف الشخصي.',
    },
    auth: {
      loginTitle: 'تسجيل الدخول',
      loginDescription: 'أدخل بياناتك للوصول إلى مساحة LevelUp الخاصة بك.',
      registerTitle: 'إنشاء حساب',
      registerDescription: 'أنشئ حسابًا مجانيًا للانضمام إلى LevelUp.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      createAccount: 'إنشاء حساب',
      alreadyRegistered: 'هل لديك حساب؟ تسجيل الدخول',
      noAccount: 'لا تملك حسابًا بعد؟ سجل الآن',
      submitLogin: 'دخول',
      profileUpdated: 'تم تحديث الملف الشخصي.',
      allFieldsRequired: 'جميع الحقول مطلوبة.',
      invalidLogin: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
      emailInUse: 'هذا البريد الإلكتروني مستخدم بالفعل.',
      profileTitle: 'ملفي الشخصي',
    },
    dashboard: {
      welcome: 'مرحبًا، %{name}',
      subtitle: 'تحتوي مساحة المتعلم على تقدمك ودوراتك وشهاداتك.',
      enrolled: 'الدورات المسجلة',
      progress: 'التقدم العام',
      certificates: 'الشهادات',
      myCourses: 'دوراتي',
      browseCourses: 'تصفح الدورات',
      noCourses: 'أنت غير مسجل في أي دورة بعد.',
    },
    admin: {
      dashboardTitle: 'لوحة التحكم',
      backOffice: 'لوحة الإدارة',
      manageCourses: 'إدارة الدورات',
      manageUsers: 'إدارة المستخدمين',
      categories: 'إدارة الفئات',
      settings: 'الإعدادات',
      createCourse: 'إنشاء دورة',
      editCourse: 'تعديل الدورة',
      manageUsersDescription: 'قم بتفعيل أو تعطيل الحسابات الوهمية أو تغيير الأدوار.',
      categoriesDescription: 'أضف أو احذف فئات من الكتالوج.',
      settingsDescription: 'قم بضبط ملفك الشخصي كمسؤول.',
      noResults: 'لم يتم العثور على نتائج.',
      activeUsers: 'المستخدمون النشطون',
      availableCourses: 'الدورات المتاحة',
      categoriesCount: 'الفئات',
      overview: 'الأرقام أعلاه مُحاكاة ببيانات محلية. يمكنك إدارة الدورات والمستخدمين والفئات بدون خادم.',
      activate: 'تفعيل',
      deactivate: 'تعطيل',
      adminRole: 'تعيين مشرف',
      learnerRole: 'تعيين متعلم',
      delete: 'حذف',
      edit: 'تعديل',
    },
    labels: {
      instructor: 'المدرب',
      price: 'السعر',
      duration: 'المدة',
      level: 'المستوى',
      category: 'الفئة',
    },
    notFound: {
      title: 'الصفحة غير موجودة',
      message: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      backHome: 'العودة للرئيسية',
    },
    categories: {
      'category-1': 'تصميم',
      'category-2': 'تطوير',
      'category-3': 'تسويق',
      'category-4': 'إنتاجية',
    },
    levels: {
      'Débutant': 'للمبتدئين',
      'Intermédiaire': 'متوسط',
      'Avancé': 'متقدم',
    },
    buttons: {
      save: 'حفظ',
      create: 'إنشاء',
      add: 'إضافة',
      manage: 'إدارة',
      logout: 'تسجيل الخروج',
    },
    footer: {
      copy: 'LevelUp © 2026 · منصة تعليم إلكتروني تجريبية',
    },
    languages: {
      fr: 'Français',
      en: 'English',
      ar: 'العربية',
    },
  },
};

const ThemeContext = createContext();
const STORAGE_KEY = 'levelup-theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

const LocaleContext = createContext();
const LOCALE_STORAGE_KEY = 'levelup-lang';
const defaultLocale = 'fr';

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => window.localStorage.getItem(LOCALE_STORAGE_KEY) || defaultLocale);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    const root = window.document.documentElement;
    const localeData = translations[locale] || translations[defaultLocale];
    root.lang = locale;
    root.dir = localeData.direction || 'ltr';
  }, [locale]);

  const t = (key, replacements) => {
    const parts = key.split('.');
    let result = translations[locale];
    for (const part of parts) {
      result = result?.[part];
      if (result == null) break;
    }
    if (result == null) {
      result = translations[defaultLocale];
      for (const part of parts) {
        result = result?.[part];
        if (result == null) break;
      }
    }
    if (typeof result !== 'string') return key;
    if (replacements) {
      return Object.entries(replacements).reduce((text, [token, value]) => text.replace(`%{${token}}`, value), result);
    }
    return result;
  };

  const value = useMemo(() => ({ locale, setLocale, t, languages: translations[locale]?.languages || translations[defaultLocale].languages }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
