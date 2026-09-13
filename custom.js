/* Zyphost.de - Branding & Copyright Script */
(function () {
  function applyBranding() {
    // 1. Browser-Tab-Titel anpassen
    if (document.title && !document.title.includes("Zyphost")) {
      document.title = document.title.replace(/Pterodactyl/i, "Zyphost");
    }

    // 2. Alle Pterodactyl-Copyright-Texte im DOM finden und ersetzen
    var elements = document.querySelectorAll("*");
    elements.forEach(function(el) {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        let text = el.childNodes[0].nodeValue;
        // Pterodactyl Copyright komplett entfernen und durch Zyphost ersetzen
        if (text.includes("Pterodactyl") && text.includes("©")) {
          el.textContent = "Zyphost.de © 2015 - 2026";
        }
      }
    });

    // 3. Auch HTML-Content mit Pterodactyl ersetzen
    var footers = document.querySelectorAll("footer, [class*='footer'], [class*='Footer']");
    footers.forEach(function(footer) {
      if (footer.innerHTML.includes("Pterodactyl")) {
        footer.innerHTML = footer.innerHTML.replace(
          /Pterodactyl.*?© \d+ - \d+/gi,
          "Zyphost.de © 2015 - 2026"
        );
      }
    });
  }

  document.addEventListener("DOMContentLoaded", applyBranding);
  // Regelmäßig prüfen, da Pterodactyl als Single Page Application (SPA) neu rendert
  setInterval(applyBranding, 1000);
})();
