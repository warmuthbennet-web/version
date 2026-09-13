# Zyphost.de – Pterodactyl Panel Theme

Ein eigenständiges, dunkles Gaming-Theme für das Pterodactyl Panel mit
lila/cyan Akzenten, angepassten Buttons, Login-Screen und einem dezenten
"Powered by Zyphost.de"-Badge.

## Inhalt
- `custom.css` – das eigentliche Theme (Farben, Sidebar, Buttons, Login-Box, Tabellen)
- `custom.js` – setzt den Browser-Tab-Titel auf "Zyphost" und blendet das Badge ein
- `install.sh` – bindet das Theme automatisch in dein Panel ein
- `uninstall.sh` – macht alles rückgängig

## Voraussetzungen
- Root- oder sudo-Zugriff auf den Server, auf dem das Pterodactyl **Panel**
  läuft (nicht der Wings/Daemon-Node, sondern der Webserver mit dem Panel).
- Panel-Installationspfad, standardmäßig `/var/www/pterodactyl`

## Installation per SSH

1. ZIP auf den Server hochladen, z.B. per `scp`:
   ```bash
   scp zyphost-theme.zip root@DEIN-SERVER-IP:/root/
   ```

2. Auf dem Server per SSH einloggen:
   ```bash
   ssh root@DEIN-SERVER-IP
   ```

3. Entpacken und installieren:
   ```bash
   cd /root
   unzip zyphost-theme.zip
   cd zyphost-theme
   chmod +x install.sh uninstall.sh
   bash install.sh /var/www/pterodactyl
   ```
   (Pfad anpassen, falls dein Panel woanders liegt)

4. Browser-Cache leeren bzw. Seite hart neu laden (Strg+F5). Fertig!

## Deinstallation
```bash
bash uninstall.sh /var/www/pterodactyl
```

## Wichtiger Hinweis
Pterodactyl generiert `public/index.html` bei jedem Panel-Update
(`php artisan p:upgrade`) neu. Dabei geht die Einbindung des Themes verloren.
Nach einem Update also einfach erneut `bash install.sh` ausführen –
die CSS/JS-Dateien selbst bleiben erhalten, es muss nur der Link neu
eingefügt werden.

## Anpassen
Farben lassen sich einfach in `custom.css` oben im `:root { ... }`-Block
ändern (`--zh-accent`, `--zh-accent-2` usw.), ohne den Rest des Themes
anzufassen.
