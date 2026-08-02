document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. TOGGLE PILLARS / MATRIX =====
  const pillarsBtn = document.getElementById('tabPillarsBtn');
  const matrixBtn = document.getElementById('tabMatrixBtn');
  const pillarsView = document.getElementById('pillarsView');
  const matrixView = document.getElementById('matrixView');

  pillarsBtn?.addEventListener('click', () => {
    pillarsView.classList.remove('hidden');
    matrixView.classList.add('hidden');
    pillarsBtn.classList.add('active');
    matrixBtn.classList.remove('active');
  });

  matrixBtn?.addEventListener('click', () => {
    matrixView.classList.remove('hidden');
    pillarsView.classList.add('hidden');
    matrixBtn.classList.add('active');
    pillarsBtn.classList.remove('active');
  });

  // ===== 2. TEAM FILTER =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const teamCards = document.querySelectorAll('.team-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filterValue = button.getAttribute('data-cat');
      teamCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (filterValue === 'All' || cardCategory === filterValue) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ===== 3. THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if(themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span id="themeText" class="d-none d-lg-inline">Light Mode</span>';
  } else {
    if(themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> <span id="themeText" class="d-none d-lg-inline">Dark Mode</span>';
  }
  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const themeText = document.getElementById('themeText');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span id="themeText" class="d-none d-lg-inline">Light Mode</span>';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> <span id="themeText" class="d-none d-lg-inline">Dark Mode</span>';
    }
  });

  // ===== 4. LANGUAGE TOGGLE =====
  const translations = {
    en: {
      "logo": "Chameleon Works",
      "why": "Why Us", "team": "Team", "works": "Our Works", "services": "Services", "contact": "Contact Us", "faq": "FAQ", "reviews": "Customer Reviews",
      "cta": "Request Your Service Now",
      "hero_title1": "From Vision", "hero_title2": "To Value",
      "hero_desc": "Welcome to Chameleon Works — an elite 10-person startup of senior system architects, AI leads, motion designers, and product strategists.",
      "why_sub": "Why Choose Us", "why_title": "Designed for Radical Advantage", "why_desc": "Why do founders and enterprise leaders choose Chameleon Works?",
      "tab1": "Core Value Pillars", "tab2": "Agency Comparison Matrix",
      "team_sub": "The 9 Champions", "team_title": "Meet Every Person Behind Chameleon Works", "team_desc": "We are a tight-knit squad of 10 seasoned builders.",
      "services_sub": "Our Capabilities", "services_title": "Multi-Disciplinary Execution", "services_desc": "From custom-built websites and brand identities to photo & video editing.",
      "faq_sub": "GOT QUESTIONS?", "faq_title": "Frequently Asked Questions", "faq_desc": "Everything you need to know about engaging Chameleon Works.",
      "reviews_sub": "Customer Reviews", "reviews_title": "What Our Clients Say", "reviews_desc": "Real feedback from founders and leaders who trusted Chameleon Works.",
      "contact_sub": "Get In Touch", "contact_title": "Let's Shape-Shift Your Product", "contact_desc": "Schedule a 30-minute technical discovery session.",
      "faq_q1": "Why are you called Chameleon Works?", "faq_a1": "Like a chameleon adapting to any terrain, our startup adapts instantly to your industry.",
      "faq_q2": "How does working with an elite 10-person team benefit me?", "faq_a2": "No junior developers, no account managers, no delays. You work directly with 10 senior specialists.",
      "faq_q3": "What is your typical project timeline?", "faq_a3": "Discovery: 3 days. Design: 1 week. Development: 2-4 weeks. Launch: Week 6.",
      "faq_q4": "Do you work with startups and enterprises?", "faq_a4": "Yes. We’ve built MVPs for YC startups and re-architected systems for Fortune 500 companies.",
      "lang_btn": "العربية"
    },
    ar: {
      "logo": "كاميليون وركس",
      "why": "لماذا نحن", "team": "الفريق", "works": "أعمالنا", "services": "الخدمات", "contact": "تواصل معنا", "faq": "الاسئلة", "reviews": "آراء العملاء",
      "cta": "اطلب خدمتك الآن",
      "hero_title1": "من الرؤية", "hero_title2": "إلى القيمة",
      "hero_desc": "مرحبًا بك في كاميليون وركس — شركة ناشئة من 10 خبراء كبار في هندسة الأنظمة والذكاء الاصطناعي.",
      "why_sub": "لماذا تختارنا", "why_title": "مصمم لتحقيق ميزة جذرية", "why_desc": "لماذا يختار المؤسسون كاميليون وركس بدلاً من الوكالات الرقمية التقليدية؟",
      "tab1": "القيم الأساسية", "tab2": "مقارنة مع الوكالات",
      "team_sub": "الأبطال التسعة", "team_title": "تعرف على الفريق وراء كاميليون وركس", "team_desc": "نحن فريق مكون من 10 بناة محترفين.",
      "services_sub": "قدراتنا", "services_title": "تنفيذ متعدد التخصصات", "services_desc": "من المواقع وتحديد الهوية إلى المونتاج وتحليل البيانات.",
      "faq_sub": "عندك أسئلة؟", "faq_title": "الأسئلة الشائعة", "faq_desc": "كل ما تحتاج معرفته عن التعامل مع كاميليون وركس.",
      "reviews_sub": "آراء العملاء", "reviews_title": "ماذا يقول عملاؤنا", "reviews_desc": "آراء حقيقية من المؤسسين والقادة الذين وثقوا في كاميليون وركس.",
      "contact_sub": "تواصل معنا", "contact_title": "لنحول منتجك من الرؤية للقيمة", "contact_desc": "احجز جلسة 30 دقيقة مع المؤسسين مباشرة.",
      "faq_q1": "لماذا سميتم كاميليون وركس؟", "faq_a1": "مثل الحرباء التي تتكيف مع أي بيئة، شركتنا تتكيف فورًا مع مجالك وتقنياتك.",
      "faq_q2": "كيف يفيدني العمل مع فريق نخبة مكون من 10 أشخاص؟", "faq_a2": "لا مطورين مبتدئين ولا مدراء حسابات. أنت تعمل مباشرة مع 10 خبراء كبار.",
      "faq_q3": "ما هو الجدول الزمني النموذجي للمشروع؟", "faq_a3": "الاكتشاف: 3 أيام. التصميم: أسبوع. التطوير: 2-4 أسابيع. الإطلاق: الأسبوع السادس.",
      "faq_q4": "هل تعملون مع الشركات الناشئة والمؤسسات؟", "faq_a4": "نعم. لقد بنينا MVP لشركات YC وأعدنا هيكلة أنظمة لشركات Fortune 500.",
      "lang_btn": "English"
    }
  };

  const langToggle = document.getElementById('langToggle');
  const savedLang = localStorage.getItem('lang') || (navigator.language.startsWith('ar')? 'ar' : 'en');
  setLanguage(savedLang);

  langToggle?.addEventListener('click', () => {
    const currentLang = body.getAttribute('lang') === 'ar'? 'en' : 'ar';
    setLanguage(currentLang);
  });

  function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    body.setAttribute('lang', lang);

    if(lang === 'ar'){
      body.setAttribute('dir', 'rtl');
      document.getElementById('langText').textContent = translations.ar.lang_btn;
      body.style.fontFamily = "'Cairo', sans-serif";
    } else {
      body.setAttribute('dir', 'ltr');
      document.getElementById('langText').textContent = translations.en.lang_btn;
      body.style.fontFamily = "'Outfit', sans-serif";
    }

    // ترجمة كل حاجة عندها data-key
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.getAttribute('data-key');
      if(translations[lang][key]){
        element.textContent = translations[lang][key];
      }
    });

    // ترجمة الـ FAQ الثابت
    document.querySelectorAll('.faq-item').forEach((item, index) => {
      const q = item.querySelector('.faq-question span');
      const a = item.querySelector('.faq-answer p');
      if(q) q.textContent = translations[lang][`faq_q${index+1}`];
      if(a) a.textContent = translations[lang][`faq_a${index+1}`];
    });

    lucide.createIcons(); // اعادة رسم الايكونات بعد تغيير اللغة
  }

  // ضيف الـ data-key للعناصر الثابتة
  document.querySelector('.logo-title')?.setAttribute('data-key', 'logo');
  document.querySelectorAll('.nav-link')[0]?.setAttribute('data-key', 'why');
  document.querySelectorAll('.nav-link')[1]?.setAttribute('data-key', 'team');
  document.querySelectorAll('.nav-link')[2]?.setAttribute('data-key', 'works');
  document.querySelectorAll('.nav-link')[3]?.setAttribute('data-key', 'services');
  document.querySelectorAll('.nav-link')[4]?.setAttribute('data-key', 'faq');
  document.querySelectorAll('.nav-link')[5]?.setAttribute('data-key', 'reviews');
  document.querySelectorAll('.nav-link')[6]?.setAttribute('data-key', 'contact');
  document.querySelector('.btn[href="#contact-us"]')?.setAttribute('data-key', 'cta');
  document.querySelector('.hero-text h2')?.setAttribute('data-key', 'hero_title1');
  document.querySelector('.hero-text h2 span')?.setAttribute('data-key', 'hero_title2');
  document.querySelector('.hero-text p')?.setAttribute('data-key', 'hero_desc');
  document.querySelector('#why-us.sub-title')?.setAttribute('data-key', 'why_sub');
  document.querySelector('#why-us h2')?.setAttribute('data-key', 'why_title');
  document.querySelector('#why-us.section-header > p')?.setAttribute('data-key', 'why_desc');
  document.getElementById('tabPillarsBtn')?.setAttribute('data-key', 'tab1');
  document.getElementById('tabMatrixBtn')?.setAttribute('data-key', 'tab2');
  document.querySelector('#team.sub-title')?.setAttribute('data-key', 'team_sub');
  document.querySelector('#team h2')?.setAttribute('data-key', 'team_title');
  document.querySelector('#team.section-header > p')?.setAttribute('data-key', 'team_desc');
  document.querySelector('#services.sub-title')?.setAttribute('data-key', 'services_sub');
  document.querySelector('#services h2')?.setAttribute('data-key', 'services_title');
  document.querySelector('#services.section-header > p')?.setAttribute('data-key', 'services_desc');
  document.querySelector('#faq.sub-title')?.setAttribute('data-key', 'faq_sub');
  document.querySelector('#faq h2')?.setAttribute('data-key', 'faq_title');
  document.querySelector('#faq.section-header > p')?.setAttribute('data-key', 'faq_desc');
  document.querySelector('#customer-reviews.sub-title')?.setAttribute('data-key', 'reviews_sub');
  document.querySelector('#customer-reviews h2')?.setAttribute('data-key', 'reviews_title');
  document.querySelector('#customer-reviews.section-header > p')?.setAttribute('data-key', 'reviews_desc');
  document.querySelector('#contact-us.sub-title')?.setAttribute('data-key', 'contact_sub');
  document.querySelector('#contact-us h2')?.setAttribute('data-key', 'contact_title');
  document.querySelector('#contact-us.section-header > p')?.setAttribute('data-key', 'contact_desc');

  // ===== 5. FAQ TOGGLE بدون JS =====
  // مش محتاجين لاننا مستخدمين details

  // ===== 6. شغل الايكونات =====
  lucide.createIcons();
});