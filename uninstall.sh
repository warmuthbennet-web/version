#!/bin/bash
# Zyphost.de – Theme wieder entfernen
set -e

PANEL_DIR="${1:-/var/www/pterodactyl}"
INDEX_FILE="$PANEL_DIR/public/index.html"

if [ -f "$INDEX_FILE.zyphost-backup" ]; then
  cp "$INDEX_FILE.zyphost-backup" "$INDEX_FILE"
  echo "Original index.html wiederhergestellt."
else
  echo "Kein Backup gefunden. Entferne Theme-Zeilen manuell aus $INDEX_FILE:"
  echo '  <link rel="stylesheet" href="/themes/zyphost/custom.css">'
  echo '  <script defer src="/themes/zyphost/custom.js"></script>'
fi

rm -rf "$PANEL_DIR/public/themes/zyphost"
echo "Theme-Dateien entfernt."
