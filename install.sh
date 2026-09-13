#!/bin/bash
# =========================================================
#  Zyphost.de – Pterodactyl Theme Installer (Direct HTML Injection)
#  Auf dem Server ausführen, z.B.:
#     bash install.sh /var/www/pterodactyl
# =========================================================

set -e

PANEL_DIR="${1:-/var/www/pterodactyl}"
PUBLIC_DIR="$PANEL_DIR/public"
INDEX_FILE="$PUBLIC_DIR/index.html"
THEME_DIR="$PUBLIC_DIR/themes/zyphost"

if [ ! -d "$PANEL_DIR" ]; then
  echo "❌ Panel-Verzeichnis nicht gefunden: $PANEL_DIR"
  exit 1
fi

echo "==> Erstelle Theme-Verzeichnis: $THEME_DIR"
mkdir -p "$THEME_DIR"

echo "==> Kopiere custom.css und custom.js"
cp "$(dirname "$0")/custom.css" "$THEME_DIR/custom.css"
cp "$(dirname "$0")/custom.js" "$THEME_DIR/custom.js"

echo "==> Setze korrekte Rechte"
chown -R www-data:www-data "$THEME_DIR" || true
chmod -R 644 "$THEME_DIR"/*

echo "==> Erstelle PHP-Wrapper in public/index.html"

# Backup
if [ -f "$INDEX_FILE" ]; then
  cp "$INDEX_FILE" "$INDEX_FILE.backup-$(date +%s)"
fi

# Erstelle direkte HTML mit injiziertem Script
cat > "$PUBLIC_DIR/inject.php" << 'PHPCODE'
<?php
// Auto-load und Theme-Injection für Pterodactyl
error_reporting(0);

// Theme-Dateien direkt einbinden
$css = file_get_contents(__DIR__ . '/themes/zyphost/custom.css');
$js = file_get_contents(__DIR__ . '/themes/zyphost/custom.js');

// HTML wird direkt modified
ob_start();
include __DIR__ . '/index.html';
$html = ob_get_clean();

// Injection vor </head>
$html = str_replace('</head>', 
  "<style>\n" . $css . "\n</style>\n" .
  "<script>\n" . $js . "\n</script>\n" .
  '</head>',
  $html
);

echo $html;
?>
PHPCODE

echo "==> Erstelle .htaccess für Apache (falls vorhanden)"
cat > "$PUBLIC_DIR/.htaccess" << 'HTCODE'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ inject.php [QSA,L]
</IfModule>
HTCODE

chmod 644 "$PUBLIC_DIR/.htaccess"

echo "==> Leere Laravel Cache"
if [ -f "$PANEL_DIR/artisan" ]; then
  cd "$PANEL_DIR"
  php artisan view:clear 2>/dev/null || true
  php artisan cache:clear 2>/dev/null || true
fi

echo ""
echo "✅ Fertig! Theme installiert"
echo ""
echo "Dateien:"
echo "  - $THEME_DIR/custom.css"
echo "  - $THEME_DIR/custom.js"
echo "  - $PUBLIC_DIR/inject.php"
echo ""
echo "🔄 Nächste Schritte:"
echo "1. Browser neu laden (Strg+F5)"
echo "2. Falls noch nicht: nginx/Apache neu starten"
echo "   sudo systemctl restart nginx"
echo ""
