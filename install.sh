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
  echo "Theme ist bereits eingebunden. Nichts zu tun."
else
  echo "==> Binde Theme in wrapper.blade.php ein"
  # Fügt CSS + JS direkt vor </head> im Blade-Template ein
  sed -i 's#</head>#  <link rel="stylesheet" href="/themes/zyphost/custom.css">\n  <script defer src="/themes/zyphost/custom.js"></script>\n</head>#' "$WRAPPER_FILE"
fi

echo "==> Setze korrekte Rechte"
chown -R www-data:www-data "$THEME_DIR" || true
chmod -R 755 "$THEME_DIR"

echo "==> Leere Laravel View-Cache"
if [ -f "$PANEL_DIR/artisan" ]; then
  php "$PANEL_DIR/artisan" view:clear || true
fi

echo ""
echo "Fertig! Theme installiert unter: $THEME_DIR"
echo "Original Wrapper gesichert unter: $WRAPPER_FILE.zyphost-backup"
echo ""
echo "Hinweis: Nach jedem Panel-Update (php artisan p:upgrade) oder wenn"
echo "du manuell den Cache leereSst, bleibt das Theme erhalten, da Laravel"
echo "nun das Blade-Template nutzt."
