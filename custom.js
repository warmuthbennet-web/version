/* Zyphost.de - COMPLETE Branding Script */
(function () {
  const config = {
    checkInterval: 300,
    maxAttempts: 30,
    attempts: 0
  };

  function safeReplace() {
    // 1. Alle Text-Knoten durchsuchen und ersetzen
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
        .replace(/Pterodactyl®\s*©\s*\d+\s*-\s*\d+/g, "Zyphost.de © 2015 - 2026")
        .replace(/Pterodactyl/g, "Zyphost");
    });

    // 2. Title ersetzen
    if (document.title.includes("Pterodactyl")) {
      document.title = document.title.replace(/Pterodactyl/g, "Zyphost");
    }

    // 3. Alle Elemente durchsuchen die "Pterodactyl" enthalten
    document.querySelectorAll("*").forEach(el => {
      // Attributes
      Array.from(el.attributes || []).forEach(attr => {
        if (attr.value && attr.value.includes("Pterodactyl")) {
          attr.value = attr.value
            .replace(/Pterodactyl®?\s*©?\s*\d*\s*-\s*\d*/g, "Zyphost.de © 2015 - 2026")
            .replace(/Pterodactyl/g, "Zyphost");
        }
      });
    });

    // 4. Footer/Copyright Elemente VERSTECKEN
    document.querySelectorAll(
      "footer, [class*='footer'], [class*='copyright'], .pterodactyl-footer, .footer-badge"
    ).forEach(el => {
      el.style.display = "none !important";
    });

    // 5. Badge oben rechts erstellen (nur 1x)
    let badge = document.getElementById("zyphost-badge-top");
    if (!badge && document.body) {
      badge = document.createElement("div");
      badge.id = "zyphost-badge-top";
      badge.textContent = "Zyphost.de © 2015 - 2026";
      document.body.appendChild(badge);
    }
  }

  function init() {
    if (config.attempts < config.maxAttempts) {
      safeReplace();
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
  const observer = new MutationObserver(safeReplace);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();
