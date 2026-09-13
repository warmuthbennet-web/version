/* Zyphost.de - Branding & Copyright Script */
(function () {
  function applyBranding() {
    // 1. Browser-Tab-Titel anpassen
    if (document.title && !document.title.includes("Zyphost")) {
      document.title = document.title.replace(/Pterodactyl/i, "Zyphost");
    }

    // 2. Pterodactyl Copyright im DOM finden und ersetzen
    var elements = document.querySelectorAll("*");
    elements.forEach(function(el) {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        let text = el.childNodes[0].nodeValue;
        if (text.includes("Pterodactyl") && text.includes("©")) {
          el.innerHTML = "Pterodactyl&reg; &copy; 2015 - 2026<br>Zyphost&reg; &copy; 2015 - 2026";
        }
      }
    });

    // 3. Fallback: Falls kein Copyright-Element gefunden wurde, fix unten rechts einblenden
    if (!document.getElementById("zyphost-footer-badge")) {
      var badge = document.createElement("div");
      badge.id = "zyphost-footer-badge";
      badge.innerHTML = "Pterodactyl&reg; &copy; 2015 - 2026<br>Zyphost&reg; &copy; 2015 - 2026";
      document.body.appendChild(badge);
    }
  }

  document.addEventListener("DOMContentLoaded", applyBranding);
  // Regelmäßig prüfen, da Pterodactyl als Single Page Application (SPA) neu rendert
  setInterval(applyBranding, 1000);
})();
