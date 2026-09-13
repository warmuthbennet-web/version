/* Zyphost.de - Aggressives Branding & Copyright Script */
(function () {
  const ZYPHOST_TEXT = "Zyphost.de © 2015 - 2026";
  
  function replaceAllText() {
    // Alle Text-Nodes durchsuchen und Pterodactyl ersetzen
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      if (node.nodeValue.includes("Pterodactyl")) {
        node.nodeValue = node.nodeValue.replace(/Pterodactyl[®]?\s*©\s*\d+\s*-\s*\d+/gi, ZYPHOST_TEXT);
        node.nodeValue = node.nodeValue.replace(/Pterodactyl/gi, "Zyphost");
      }
    }
  }

  function replaceInHTML() {
    // innerHTML durchsuchen
    if (document.body.innerHTML.includes("Pterodactyl")) {
      document.body.innerHTML = document.body.innerHTML.replace(
        /Pterodactyl[®]?\s*©\s*\d+\s*-\s*\d+/gi,
        ZYPHOST_TEXT
      );
    }
  }

  function updateTitle() {
    if (document.title.includes("Pterodactyl")) {
      document.title = document.title.replace(/Pterodactyl/gi, "Zyphost");
    }
  }

  function applyBranding() {
    updateTitle();
    replaceAllText();
  }

  // Initial beim Laden
  document.addEventListener("DOMContentLoaded", function() {
    applyBranding();
    replaceInHTML();
  });

  // MutationObserver - lauscht auf ALLE DOM-Änderungen
  const observer = new MutationObserver(function(mutations) {
    applyBranding();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: false
  });

  // Extra-Intervall zur Sicherheit
  setInterval(applyBranding, 800);
})();
