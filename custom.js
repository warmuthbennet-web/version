/* Zyphost.de - Branding & Copyright Script */
(function () {
  function applyBranding() {
    if (document.title && !document.title.includes("Zyphost")) {
      document.title = document.title.replace(/Pterodactyl/i, "Zyphost");
    }
    var badge = document.getElementById("zyphost-footer-badge");
    if (!badge) {
      badge = document.createElement("div");
      badge.id = "zyphost-footer-badge";
      document.body.appendChild(badge);
    }
    badge.innerHTML = "Pterodactyl&reg; &copy; 2015 - 2026<br>Zyphost&reg; &copy; 2015 - 2026";
  }
  document.addEventListener("DOMContentLoaded", applyBranding);
  // SPA Navigation abfangen
  setInterval(applyBranding, 1500);
})();
