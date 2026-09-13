cat > install.sh << 'ZYPHOST_EOF'
#!/bin/bash
set -e

PANEL_DIR="${1:-/var/www/pterodactyl}"
THEME_DIR="$PANEL_DIR/public/themes/zyphost"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"

if [ ! -d "$PANEL_DIR" ]; then
  echo "Panel-Verzeichnis nicht gefunden: $PANEL_DIR"
  exit 1
fi

if [ ! -f "$WRAPPER_FILE" ]; then
  echo "wrapper.blade.php nicht gefunden unter:"
  echo "  $WRAPPER_FILE"
  exit 1
fi

echo "==> Erstelle Theme-Verzeichnis: $THEME_DIR"
mkdir -p "$THEME_DIR"

echo "==> Kopiere custom.css und custom.js"
cp "$(dirname "$0")/custom.css" "$THEME_DIR/custom.css"
cp "$(dirname "$0")/custom.js" "$THEME_DIR/custom.js"

echo "==> Sichere Original wrapper.blade.php"
if [ ! -f "$WRAPPER_FILE.zyphost-backup" ]; then
  cp "$WRAPPER_FILE" "$WRAPPER_FILE.zyphost-backup"
fi

if grep -q "zyphost/custom.css" "$WRAPPER_FILE"; then
  echo "Theme ist bereits eingebunden."
else
  echo "==> Binde Theme in wrapper.blade.php ein"
  sed -i 's#</head>#    <link rel="stylesheet" href="/themes/zyphost/custom.css">\n    <script defer src="/themes/zyphost/custom.js"></script>\n    </head>#' "$WRAPPER_FILE"
fi

chown -R www-data:www-data "$THEME_DIR" || true
chmod -R 755 "$THEME_DIR"

cd "$PANEL_DIR"
php artisan view:clear || true
php artisan config:clear || true

echo "Fertig! Theme installiert unter: $THEME_DIR"
ZYPHOST_EOF
chmod +x install.sh
bash install.sh /var/www/pterodactyl
