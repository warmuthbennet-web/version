#!/bin/bash
# =========================================================
#  Zyphost.de – Pterodactyl Theme Installer
#  Auf dem Server ausführen (dort wo der Panel liegt), z.B.:
#     cd /var/www/pterodactyl
#     bash install.sh
# =========================================================

set -e

PANEL_DIR="${1:-/var/www/pterodactyl}"
THEME_DIR="$PANEL_DIR/public/themes/zyphost"
INDEX_FILE="$PANEL_DIR/public/index.html"

if [ ! -d "$PANEL_DIR" ]; then
  echo "Panel-Verzeichnis nicht gefunden: $PANEL_DIR"
  echo "Aufruf z.B.: bash install.sh /var/www/pterodactyl"
  exit 1
fi

if [ ! -f "$INDEX_FILE" ]; then
  echo "index.html nicht gefunden unter $PANEL_DIR/public"
  exit 1
fi

echo "==> Erstelle Theme-Verzeichnis: $THEME_DIR"
mkdir -p "$THEME_DIR"

echo "==> Kopiere custom.css und custom.js"
cp "$(dirname "$0")/custom.css" "$THEME_DIR/custom.css"
cp "$(dirname "$0")/custom.js" "$THEME_DIR/custom.js"

echo "==> Sichere Original index.html (falls noch nicht geschehen)"
if [ ! -f "$INDEX_FILE.zyphost-backup" ]; then
  cp "$INDEX_FILE" "$INDEX_FILE.zyphost-backup"
fi

echo "==> Prüfe ob Theme bereits eingebunden ist"
if grep -q "zyphost/custom.css" "$INDEX_FILE"; then
  echo "Theme ist bereits eingebunden. Nichts zu tun."
else
  echo "==> Binde Theme in index.html ein"
  # Fügt CSS + JS Link direkt vor </head> ein
  sed -i 's#</head>#  <link rel="stylesheet" href="/themes/zyphost/custom.css">\n  <script defer src="/themes/zyphost/custom.js"></script>\n</head>#' "$INDEX_FILE"
fi

echo "==> Setze korrekte Rechte"
chown -R www-data:www-data "$THEME_DIR" || true
chmod -R 755 "$THEME_DIR"

echo ""
echo "Fertig! Theme installiert unter: $THEME_DIR"
echo "Original index.html gesichert unter: $INDEX_FILE.zyphost-backup"
echo ""
echo "Hinweis: Nach jedem Panel-Update (php artisan p:upgrade) wird die"
echo "index.html neu generiert und der Link geht verloren. In dem Fall"
echo "dieses Script einfach erneut ausführen."
