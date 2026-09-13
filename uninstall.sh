#!/bin/bash
# Zyphost.de – Theme wieder entfernen
set -e

PANEL_DIR="${1:-/var/www/pterodactyl}"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"

if [ -f "$WRAPPER_FILE.zyphost-backup" ]; then
  cp "$WRAPPER_FILE.zyphost-backup" "$WRAPPER_FILE"
  echo "Original wrapper.blade.php wiederhergestellt."
else
  echo "Kein Backup gefunden. Entferne Theme-Zeilen manuell aus $WRAPPER_FILE:"
  echo '  <link rel="stylesheet" href="/themes/zyphost/custom.css">'
  echo '  <script defer src="/themes/zyphost/custom.js"></script>'
fi

rm -rf "$PANEL_DIR/public/themes/zyphost"

if [ -f "$PANEL_DIR/artisan" ]; then
  php "$PANEL_DIR/artisan" view:clear || true
fi

echo "Theme-Dateien entfernt und Cache geleert."
