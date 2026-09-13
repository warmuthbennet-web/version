/* ZypeHost - COMPLETE Branding & Localization Script */
(function () {
  const config = {
    checkInterval: 300,
    maxAttempts: 30,
    attempts: 0
  };

  // Translations
  const translations = {
    de: {
      pterodactyl: 'ZypeHost',
      pterodactylCopyright: '© 2015 - 2026 ZypeHost',
      login: 'Anmelden',
      username: 'Benutzername oder E-Mail',
      password: 'Passwort',
      forgotPassword: 'Passwort vergessen?',
      lang_de: 'Deutsch',
      lang_en: 'English'
    },
    en: {
      pterodactyl: 'ZypeHost',
      pterodactylCopyright: '© 2015 - 2026 ZypeHost',
      login: 'Login',
      username: 'Username or Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      lang_de: 'Deutsch',
      lang_en: 'English'
    }
  };

  let currentLang = localStorage.getItem('zypehost-lang') || 'de';

  function getTranslation(key) {
    return translations[currentLang]?.[key] || translations.de[key] || key;
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('zypehost-lang', lang);
    applyTranslations();
    updateLangButtons();
  }

  function applyTranslations() {
    // Ersetze Pterodactyl überall
    const walk = document.createTreeWalker(
      document.documentElement,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    const nodesToReplace = [];
    while (node = walk.nextNode()) {
      if (node.nodeValue && node.nodeValue.includes('Pterodactyl')) {
        nodesToReplace.push(node);
      }
    }

    nodesToReplace.forEach(n => {
      n.nodeValue = n.nodeValue
        .replace(/Pterodactyl®\s*©\s*\d+\s*-\s*\d+/g, getTranslation('pterodactylCopyright'))
        .replace(/Pterodactyl/g, 'ZypeHost');
    });

    // Title
    if (document.title.includes('Pterodactyl')) {
      document.title = document.title.replace(/Pterodactyl/g, 'ZypeHost');
    }
  }

  function createBadgeMenuAndFooter() {
    // Logo Badge oben rechts
    let badge = document.getElementById('zypehost-badge-top');
    if (!badge && document.body) {
      badge = document.createElement('a');
      badge.id = 'zypehost-badge-top';
      badge.href = 'https://zyphost.de';
      badge.target = '_blank';
      badge.rel = 'noopener noreferrer';
      
      const img = document.createElement('img');
      img.src = '/themes/zypehost/logo.png';
      img.alt = 'ZypeHost';
      img.style.cssText = 'height: 40px; width: auto;';
      
      badge.appendChild(img);
      document.body.appendChild(badge);
    }

    // Sprach-Menü
    let langMenu = document.getElementById('zypehost-lang-menu');
    if (!langMenu && document.body) {
      langMenu = document.createElement('div');
      langMenu.id = 'zypehost-lang-menu';
      langMenu.className = 'zypehost-lang-menu';

      const deBtn = document.createElement('button');
      deBtn.textContent = getTranslation('lang_de');
      deBtn.classList.add('lang-btn');
      if (currentLang === 'de') deBtn.classList.add('active');
      deBtn.onclick = () => setLanguage('de');

      const enBtn = document.createElement('button');
      enBtn.textContent = getTranslation('lang_en');
      enBtn.classList.add('lang-btn');
      if (currentLang === 'en') enBtn.classList.add('active');
      enBtn.onclick = () => setLanguage('en');

      langMenu.appendChild(deBtn);
      langMenu.appendChild(enBtn);
      document.body.appendChild(langMenu);
    }

    // Copyright Footer unten - IMMER SICHTBAR
    let copyrightFooter = document.getElementById('zypehost-copyright-footer');
    if (!copyrightFooter && document.body) {
      copyrightFooter = document.createElement('div');
      copyrightFooter.id = 'zypehost-copyright-footer';
      copyrightFooter.textContent = getTranslation('pterodactylCopyright');
      document.body.appendChild(copyrightFooter);
    } else if (copyrightFooter) {
      copyrightFooter.textContent = getTranslation('pterodactylCopyright');
    }
  }

  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelectorAll(`.lang-btn`).forEach((btn, idx) => {
      if ((currentLang === 'de' && idx === 0) || (currentLang === 'en' && idx === 1)) {
        btn.classList.add('active');
      }
    });
  }

  function hideOldFooter() {
    document.querySelectorAll(
      'footer, [class*="footer"], [class*="copyright"], .pterodactyl-footer, .footer-badge'
    ).forEach(el => {
      if (el.id !== 'zypehost-copyright-footer' && el.id !== 'zypehost-lang-menu' && el.id !== 'zypehost-badge-top') {
        el.style.display = 'none !important';
      }
    });
  }

  function init() {
    if (config.attempts < config.maxAttempts) {
      applyTranslations();
      createBadgeMenuAndFooter();
      hideOldFooter();
      config.attempts++;
      setTimeout(init, config.checkInterval);
    }
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Observer
  const observer = new MutationObserver(() => {
    applyTranslations();
    hideOldFooter();
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // Globale Funktion
  window.setZypeHostLanguage = setLanguage;
})();
