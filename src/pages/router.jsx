* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f6f7f9;
  font-family: Inter, system-ui, sans-serif;
}

/* ROOT */
.pm-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== TOPO ===== */
.pm-topbar {
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
}

.pm-logo-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.pm-logo {
  width: 28px;
  height: 28px;
}

.pm-logo-text {
  font-weight: 600;
  font-size: 16px;
}

.pm-top-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.pm-icon-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.pm-notification-dot {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 999px;
}

.pm-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}

/* ===== CONTEÚDO ===== */
.pm-content {
  flex: 1;
  padding: 16px;
  padding-bottom: 90px;
}

/* ===== MENU INFERIOR ===== */
.pm-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 50;
}

.pm-nav-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: #111;
  cursor: pointer;
}

.pm-nav-btn.active {
  color: #2563eb;
}

/* PLUS */
.pm-plus {
  font-size: 24px;
}

/* BOTÃO CENTRAL */
.pm-nav-center {
  background: none;
  border: none;
  cursor: pointer;
  transform: translateY(-6px);
}

.pm-p-logo {
  width: 42px;
  height: 42px;
}
