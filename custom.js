/* Zyphost.de - COMPLETE Branding Script */
(function () {
  const config = {
    checkInterval: 500,
    maxAttempts: 20,
    attempts: 0
  };

  function hardReplace() {
    // 1. Alle HTML durchsuchen
    const bodyHTML = document.documentElement.innerHTML;
    if (bodyHTML.includes("Pterodactyl")) {
      document.documentElement.innerHTML = bodyHTML
        .replace(/Pterodactyl®\s*©\s*\d+\s*-\s*\d+/g, "Zyphost.de © 2015 - 2026")
        .replace(/Pterodactyl/g, "Zyphost");
    }

    // 2. Alle Text-Knoten
    const walk = document.createTreeWalker(
      document.documentElement,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    const nodesToReplace = [];
    while (node = walk.nextNode()) {
      if (node.nodeValue && node.nodeValue.includes("Pterodactyl")) {
        nodesToReplace.push(node);
      }
    }

    nodesToReplace.forEach(n => {
      n.nodeValue = n.nodeValue
        .replace(/Pterodactyl®?\s*©?\s*\d*\s*-\s*\d*/g, "Zyphost.de © 2015 - 2026")
        .replace(/Pterodactyl/g, "Zyphost");
    });

    // 3. Title
    if (document.title.includes("Pterodactyl")) {
      document.title = document.title.replace(/Pterodactyl/g, "Zyphost");
    }

    // 4. Badge zentriert positionieren (nur 1x "Zyphost.de")
    let badge = document.getElementById("zyphost-footer-badge");
    if (!badge) {
      badge = document.createElement("div");
      badge.id = "zyphost-footer-badge";
      badge.textContent = "Zyphost.de © 2015 - 2026";
      document.body.appendChild(badge);
    }
  }

  function init() {
    if (config.attempts < config.maxAttempts) {
      hardReplace();
      config.attempts++;
      setTimeout(init, config.checkInterval);
    }
  }

  // Start beim Laden
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // MutationObserver für späte Änderungen
  const observer = new MutationObserver(hardReplace);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();
