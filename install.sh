#!/bin/bash
# =========================================================
#  Zyphost.de – Pterodactyl Theme Installer (Blade Template)
#  Auf dem Server ausführen, z.B.:
#     bash install.sh /var/www/pterodactyl
# =========================================================

set -e

PANEL_DIR="${1:-/var/www/pterodactyl}"
THEME_DIR="$PANEL_DIR/public/themes/zyphost"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"

if [ ! -d "$PANEL_DIR" ]; then
  echo "Panel-Verzeichnis nicht gefunden: $PANEL_DIR"
  echo "Aufruf z.B.: bash install.sh /var/www/pterodactyl"
  exit 1
fi

if [ ! -f "$WRAPPER_FILE" ]; then
  echo "Wrapper-Template nicht gefunden unter $WRAPPER_FILE"
  exit 1
fi

echo "==> Erstelle Theme-Verzeichnis: $THEME_DIR"
mkdir -p "$THEME_DIR"

echo "==> Kopiere custom.css und custom.js"
cp "$(dirname "$0")/custom.css" "$THEME_DIR/custom.css"
cp "$(dirname "$0")/custom.js" "$THEME_DIR/custom.js"

echo "==> Sichere Original wrapper.blade.php (falls noch nicht geschehen)"
if [ ! -f "$WRAPPER_FILE.zyphost-backup" ]; then
  cp "$WRAPPER_FILE" "$WRAPPER_FILE.zyphost-backup"
fi

echo "==> Prüfe ob Theme bereits eingebunden ist"
if grep -q "zyphost/custom.css" "$WRAPPER_FILE"; then
  echo "Theme ist bereits eingebunden. Aktualisiere es..."
else
  echo "==> Binde Theme in wrapper.blade.php ein"
  # Fügt CSS + JS direkt vor </head> im Blade-Template ein
  sed -i 's#</head>#  <link rel="stylesheet" href="/themes/zyphost/custom.css">\n  <script defer src="/themes/zyphost/custom.js"><\/script>\n</head>#' "$WRAPPER_FILE"
fi

echo "==> Setze korrekte Rechte"
chown -R www-data:www-data "$THEME_DIR" || true
chmod -R 755 "$THEME_DIR"

echo "==> Leere Laravel View-Cache und Compiled Cache"
if [ -f "$PANEL_DIR/artisan" ]; then
  php "$PANEL_DIR/artisan" view:clear || true
  php "$PANEL_DIR/artisan" cache:clear || true
  php "$PANEL_DIR/artisan" config:cache || true
fi

echo "==> Leere Browser-Cache Hinweis"
echo "WICHTIG: Öffne dein Browser-Developer-Tools und deaktiviere 'Cache'"
echo "oder lade die Seite mit Strg+Shift+R (Windows) oder Cmd+Shift+R (Mac)"

echo ""
echo "✅ Fertig! Theme installiert unter: $THEME_DIR"
echo "✅ Original Wrapper gesichert unter: $WRAPPER_FILE.zyphost-backup"
echo ""
echo "🔄 Nächste Schritte:"
echo "1. Browser-Cache leeren (Strg+Shift+R)"
echo "2. Panel neu laden"
echo "3. Falls immer noch alte Version: nginx/Apache neu starten"
echo "   sudo systemctl restart nginx  (oder apache2 / php-fpm)"
echo ""
