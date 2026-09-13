/* =========================================================
   Zyphost.de – Custom Pterodactyl Panel Theme
   Dunkles Gaming-Theme mit Neon-Akzenten
   ========================================================= */

:root {
  --zh-bg: #0d1117;
  --zh-bg-alt: #12151c;
  --zh-panel: #161b22;
  --zh-border: #2a2f3a;
  --zh-accent: #7c3aed;      /* Lila-Akzent */
  --zh-accent-2: #06b6d4;    /* Cyan-Akzent */
  --zh-text: #e6e6e6;
  --zh-text-dim: #9aa4b2;
  --zh-danger: #ef4444;
  --zh-success: #22c55e;
}

/* Grundlayout */
body {
  background: var(--zh-bg) !important;
  color: var(--zh-text) !important;
  font-family: 'Inter', 'Segoe UI', sans-serif !important;
}

/* Sidebar */
.sidebar, [class*="Sidebar"], nav {
  background: linear-gradient(180deg, var(--zh-bg-alt), var(--zh-bg)) !important;
  border-right: 1px solid var(--zh-border) !important;
}

/* Logo-Bereich oben in der Sidebar */
.sidebar .logo, [class*="SidebarLogo"] {
  background: var(--zh-panel) !important;
  border-bottom: 1px solid var(--zh-border) !important;
}

/* Panel / Cards */
.panel, .card, [class*="Box"], [class*="ContentBox"] {
  background: var(--zh-panel) !important;
  border: 1px solid var(--zh-border) !important;
  border-radius: 10px !important;
  box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.05) !important;
}

/* Buttons – primär */
.btn-primary, button[class*="primary"], [class*="Button"][class*="primary"] {
  background: linear-gradient(135deg, var(--zh-accent), var(--zh-accent-2)) !important;
  border: none !important;
  color: #fff !important;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-primary:hover, button[class*="primary"]:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 18px rgba(124, 58, 237, 0.45) !important;
}

/* Links */
a { color: var(--zh-accent-2) !important; }
a:hover { color: var(--zh-accent) !important; }

/* Server-Status Badges */
.status-running, [class*="badge"][class*="success"] {
  background: rgba(34, 197, 94, 0.15) !important;
  color: var(--zh-success) !important;
  border: 1px solid rgba(34, 197, 94, 0.4) !important;
}
.status-offline, [class*="badge"][class*="danger"] {
  background: rgba(239, 68, 68, 0.15) !important;
  color: var(--zh-danger) !important;
  border: 1px solid rgba(239, 68, 68, 0.4) !important;
}

/* Schöner Login / Auth Bereich (Glasmorphismus & Neon-Glow) */
.login-box, [class*="LoginBox"], [class*="AuthBox"], form[class*="auth"] {
  background: rgba(22, 27, 34, 0.8) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(124, 58, 237, 0.25) !important;
  border-radius: 16px !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 50px rgba(124, 58, 237, 0.2) !important;
  padding: 35px !important;
}
body[class*="login"], .auth-wrapper, [class*="LoginContainer"] {
  background: radial-gradient(circle at 50% 25%, #1e1b4b 0%, var(--zh-bg) 75%) !important;
}

/* Eingabefelder im Login / Panel */
input[type="text"], input[type="password"], input[type="email"], .form-control {
  background: rgba(13, 17, 23, 0.85) !important;
  border: 1px solid var(--zh-border) !important;
  color: var(--zh-text) !important;
  border-radius: 8px !important;
  padding: 11px 15px !important;
}
input[type="text"]:focus, input[type="password"]:focus, input[type="email"]:focus, .form-control:focus {
  border-color: var(--zh-accent) !important;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3) !important;
  outline: none !important;
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: var(--zh-bg); }
::-webkit-scrollbar-thumb {
  background: var(--zh-accent);
  border-radius: 4px;
}

/* Tabellen */
table, [class*="Table"] {
  background: var(--zh-panel) !important;
  color: var(--zh-text) !important;
}
th { color: var(--zh-text-dim) !important; }

/* Copyright Footer unten rechts */
#zyphost-footer-badge {
  position: fixed;
  bottom: 12px;
  right: 16px;
  font-size: 11px;
  line-height: 1.4;
  text-align: right;
  color: var(--zh-text-dim);
  opacity: 0.75;
  z-index: 9999;
  pointer-events: none;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
