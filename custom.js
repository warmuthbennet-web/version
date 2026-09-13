/* ZypeHost - Complete Branding & Localization */
(function () {
  const config = {
    checkInterval: 200,
    maxAttempts: 50,
    attempts: 0,
    initialized: false
  };

  // ===== TRANSLATIONS =====
  const translations = {
    de: {
      pterodactyl: 'ZypeHost',
      pterodactylCopyright: '© 2015 - 2026 ZypeHost',
      login: 'Anmelden',
      username: 'Benutzername oder E-Mail',
      password: 'Passwort',
      forgotPassword: 'Passwort vergessen?',
      lang_de: 'DE',
      lang_en: 'EN'
    },
    en: {
      pterodactyl: 'ZypeHost',
      pterodactylCopyright: '© 2015 - 2026 ZypeHost',
      login: 'Login',
      username: 'Username or Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      lang_de: 'DE',
      lang_en: 'EN'
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

  // ===== REMOVE ALL PTERODACTYL SVG LOGOS =====
  function removePterodactylLogos() {
    // Entferne alle SVG mit Pterodactyl
    document.querySelectorAll('svg').forEach(svg => {
      const viewBox = svg.getAttribute('viewBox');
      if (viewBox && viewBox.includes('1280')) {
        svg.remove();
      }
    });

    // Entferne Pterodactyl Bilder/Icons
    document.querySelectorAll('img[src*="pterodactyl"], img[src*="logo"]').forEach(img => {
      if (!img.id.startsWith('zypehost')) {
        img.style.display = 'none';
      }
    });
  }

  // ===== TEXT REPLACEMENT =====
  function applyTranslations() {
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
        .replace(/Pterodactyl/g, 'ZypeHost')
        .replace(/Login to Continue/gi, getTranslation('login'))
        .replace(/Username or Email/gi, getTranslation('username'))
        .replace(/Password/gi, getTranslation('password'))
        .replace(/Forgot Password/gi, getTranslation('forgotPassword'));
    });

    // Update page title
    if (document.title.includes('Pterodactyl')) {
      document.title = document.title.replace(/Pterodactyl/g, 'ZypeHost');
    }
  }

  // ===== CREATE UI ELEMENTS =====
  function createUIElements() {
    // ===== LOGO BADGE =====
    let badge = document.getElementById('zypehost-badge-top');
    if (!badge && document.body) {
      badge = document.createElement('a');
      badge.id = 'zypehost-badge-top';
      badge.href = 'https://zyphost.de';
      badge.target = '_blank';
      badge.rel = 'noopener noreferrer';
      badge.title = 'Visit ZypeHost';

      const img = document.createElement('img');
      img.src = '/themes/zypehost/logo.png';
      img.alt = 'ZypeHost Logo';
      img.onerror = () => {
        // Fallback wenn logo.png nicht existiert
        img.remove();
        badge.textContent = 'ZypeHost';
        badge.style.cssText = 'font-weight: bold; font-size: 16px; color: #e2e8f0;';
      };

      badge.appendChild(img);
      document.body.appendChild(badge);
    }

    // ===== LANGUAGE MENU =====
    let langMenu = document.getElementById('zypehost-lang-menu');
    if (!langMenu && document.body) {
      langMenu = document.createElement('div');
      langMenu.id = 'zypehost-lang-menu';
      langMenu.className = 'zypehost-lang-menu';

      // Deutsch Button
      const deBtn = document.createElement('button');
      deBtn.className = 'lang-btn';
      deBtn.textContent = getTranslation('lang_de');
      deBtn.title = 'Deutsch';
      if (currentLang === 'de') deBtn.classList.add('active');
      deBtn.onclick = (e) => {
        e.preventDefault();
        setLanguage('de');
      };

      // English Button
      const enBtn = document.createElement('button');
      enBtn.className = 'lang-btn';
      enBtn.textContent = getTranslation('lang_en');
      enBtn.title = 'English';
      if (currentLang === 'en') enBtn.classList.add('active');
      enBtn.onclick = (e) => {
        e.preventDefault();
        setLanguage('en');
      };

      langMenu.appendChild(deBtn);
      langMenu.appendChild(enBtn);
      document.body.appendChild(langMenu);
    }

    // ===== COPYRIGHT FOOTER =====
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

  // ===== UPDATE BUTTONS =====
  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.lang-btn');
    if (currentLang === 'de' && buttons[0]) buttons[0].classList.add('active');
    if (currentLang === 'en' && buttons[1]) buttons[1].classList.add('active');
  }

  // ===== HIDE OLD FOOTER =====
  function hideOldElements() {
    document.querySelectorAll(
      'footer, [class*="footer"], [class*="copyright"], .pterodactyl-footer, .footer-badge'
    ).forEach(el => {
      if (el.id !== 'zypehost-copyright-footer' && 
          el.id !== 'zypehost-lang-menu' && 
          el.id !== 'zypehost-badge-top') {
        el.style.display = 'none !important';
      }
    });

    removePterodactylLogos();
  }

  // ===== INIT =====
  function init() {
    if (config.attempts < config.maxAttempts) {
      if (!config.initialized) {
        createUIElements();
        config.initialized = true;
      }
      applyTranslations();
      hideOldElements();
      config.attempts++;
      setTimeout(init, config.checkInterval);
    }
  }

  // ===== START =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ===== MUTATION OBSERVER =====
  const observer = new MutationObserver(() => {
    applyTranslations();
    hideOldElements();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // ===== GLOBAL API =====
  window.ZypeHost = {
    setLanguage: setLanguage,
    getCurrentLanguage: () => currentLang,
    getTranslation: getTranslation
  };

  console.log('✅ ZypeHost Theme aktiv');
})();
