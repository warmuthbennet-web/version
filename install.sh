#!/bin/bash
# =========================================================
#  Zyphost.de – Pterodactyl Theme Installer
#  Direct index.php injection - GUARANTEED to work!
#  Auf dem Server ausführen, z.B.:
#     bash install.sh /var/www/pterodactyl
# =========================================================

set -e

PANEL_DIR="${1:-/var/www/pterodactyl}"
PUBLIC_DIR="$PANEL_DIR/public"
INDEX_FILE="$PUBLIC_DIR/index.php"
THEME_DIR="$PUBLIC_DIR/themes/zyphost"

if [ ! -d "$PANEL_DIR" ]; then
  echo "❌ Panel-Verzeichnis nicht gefunden: $PANEL_DIR"
  exit 1
fi

if [ ! -f "$INDEX_FILE" ]; then
  echo "❌ index.php nicht gefunden: $INDEX_FILE"
  exit 1
fi

echo "✅ ==> Erstelle Theme-Verzeichnis: $THEME_DIR"
mkdir -p "$THEME_DIR"

echo "✅ ==> Kopiere custom.css und custom.js"
cp "$(dirname "$0")/custom.css" "$THEME_DIR/custom.css"
cp "$(dirname "$0")/custom.js" "$THEME_DIR/custom.js"

echo "✅ ==> Setze korrekte Rechte"
chown -R www-data:www-data "$THEME_DIR" 2>/dev/null || true
chmod -R 644 "$THEME_DIR"/*

echo "✅ ==> Sichere Original index.php"
if [ ! -f "$INDEX_FILE.zyphost-backup" ]; then
  cp "$INDEX_FILE" "$INDEX_FILE.zyphost-backup"
  echo "     Backup erstellt: $INDEX_FILE.zyphost-backup"
fi

echo "✅ ==> Erstelle neue index.php mit Theme-Injection"

# Prüfe ob Theme bereits injiziert ist
if grep -q "ZYPHOST_THEME_INJECTED" "$INDEX_FILE"; then
  echo "     Theme ist bereits injiziert!"
else
  # Erstelle neue index.php mit Injection am Anfang
  cat > "$INDEX_FILE.new" << 'PHPCODE'
<?php
// ====================================================
// ZYPHOST THEME INJECTION - DO NOT REMOVE
// ZYPHOST_THEME_INJECTED
// ====================================================

if (file_exists(__DIR__ . '/themes/zyphost/custom.css') && 
    file_exists(__DIR__ . '/themes/zyphost/custom.js')) {
    
    // CSS & JS laden
    $zyphost_css = file_get_contents(__DIR__ . '/themes/zyphost/custom.css');
    $zyphost_js = file_get_contents(__DIR__ . '/themes/zyphost/custom.js');
    
    // Output buffering für HTML-Manipulation
    ob_start();
}

// ====================================================
// Original Pterodactyl index.php
// ====================================================
PHPCODE

  # Original code (ab Zeile 2) anhängen
  tail -n +2 "$INDEX_FILE.zyphost-backup" >> "$INDEX_FILE.new"
  
  # Neue index.php am Ende erweitern für Output-Handling
  cat >> "$INDEX_FILE.new" << 'PHPCODE'

// ====================================================
// ZYPHOST THEME OUTPUT INJECTION
// ====================================================
if (isset($zyphost_css) && isset($zyphost_js)) {
    $output = ob_get_clean();
    
    // Injiziere CSS & JS vor </head>
    $output = str_replace(
        '</head>',
        "<style>\n/* Zyphost Theme */\n" . $zyphost_css . "\n</style>\n" .
        "<script>\n/* Zyphost Branding */\n" . $zyphost_js . "\n</script>\n" .
        '</head>',
        $output
    );
    
    echo $output;
} else {
    echo ob_get_clean();
}
PHPCODE

  # Ersetze alte index.php
  mv "$INDEX_FILE.new" "$INDEX_FILE"
  chmod 644 "$INDEX_FILE"
  chown www-data:www-data "$INDEX_FILE" 2>/dev/null || true
  
  echo "     ✅ index.php erfolgreich injiziert!"
fi

echo ""
echo "✅ ==> Leere Laravel Cache"
if [ -f "$PANEL_DIR/artisan" ]; then
  cd "$PANEL_DIR"
  php artisan view:clear 2>/dev/null || true
  php artisan cache:clear 2>/dev/null || true
  php artisan config:clear 2>/dev/null || true
fi

echo ""
echo "════════════════════════════════════════════════════"
echo "✅ FERTIG! Theme installiert"
echo "════════════════════════════════════════════════════"
echo ""
echo "Dateien:"
echo "  ✅ $THEME_DIR/custom.css"
echo "  ✅ $THEME_DIR/custom.js"
echo "  ✅ $INDEX_FILE (INJIZIERT)"
echo "  📦 Backup: $INDEX_FILE.zyphost-backup"
echo ""
echo "🔄 Nächste Schritte:"
echo "  1. Nginx/Apache neu starten:"
echo "     systemctl restart nginx"
echo "     (oder: systemctl restart apache2)"
echo ""
echo "  2. Browser komplett neu laden:"
echo "     Strg+Shift+R (Windows/Linux)"
echo "     Cmd+Shift+R (Mac)"
echo ""
echo "  3. Falls immer noch alt:"
echo "     php artisan queue:restart"
echo "     systemctl restart php-fpm"
echo ""
echo "════════════════════════════════════════════════════"
