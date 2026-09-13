/* Zyphost.de - kleines Branding-Script
   Ändert den Browser-Tab-Titel und fügt ein dezentes Badge ein */
(function () {
  function applyBranding() {
    if (document.title && !document.title.includes("Zyphost")) {
      document.title = document.title.replace(/Pterodactyl/i, "Zyphost");
    }
    if (!document.getElementById("zyphost-footer-badge")) {
      var badge = document.createElement("div");
      badge.id = "zyphost-footer-badge";
      badge.innerText = "Powered by Zyphost.de";
      document.body.appendChild(badge);
    }
  }
  document.addEventListener("DOMContentLoaded", applyBranding);
  // Panel ist eine SPA -> Titel ändert sich bei Navigation, daher Interval
  setInterval(applyBranding, 1500);
})();
