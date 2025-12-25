import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiSearch,
  FiMenu,
  FiLogOut,
  FiBell,
} from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import "./ProntfyCoreLayouts.css";

export default function ProntfyCoreLayouts() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [collapsed, setCollapsed] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);

  const goHome = () => {
    navigate("/painel");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`pc-root ${collapsed ? "collapsed" : ""}`}>
      {/* SIDEBAR */}
      <aside className="pc-sidebar">
        <div className="pc-sidebar-header">
          <button
            className="pc-hamburger"
            onClick={() => setCollapsed(v => !v)}
            aria-label="Recolher menu"
          >
            <FiMenu />
          </button>

          {!collapsed && (
            <button className="pc-logo-btn" onClick={goHome}>
              <img
                src="/images/logo-symbol-white.png"
                alt="Prontfy"
                className="pc-logo-img"
              />
              <span>Prontfy Core</span>
            </button>
          )}
        </div>

        <nav className="pc-menu">
          <button onClick={() => navigate("/painel")}>
            <FiHome /> {!collapsed && "Painel"}
          </button>
          <button>
            <FiUsers /> {!collapsed && "Usuários"}
          </button>
          <button>
            <FiSettings /> {!collapsed && "Configurações"}
          </button>
        </nav>

        <div className="pc-sidebar-footer">
          <button
            className="logout"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <FiLogOut /> {!collapsed && "Sair"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="pc-main">
        {/* TOPBAR */}
        <header className="pc-topbar">
          <div className="pc-search">
            <FiSearch />
            <input placeholder="Pesquisar..." />
          </div>

          <div className="pc-top-actions">
            {/* SININHO */}
            <button className="pc-icon-btn" aria-label="Notificações">
              <FiBell className="pc-bell" />
            </button>

            {/* AVATAR / LOGIN */}
            {user ? (
              <img
                src={
                  user?.user_metadata?.avatar_url ||
                  "/images/avatar-placeholder.png"
                }
                alt="Avatar"
                className="pc-avatar"
              />
            ) : (
              <button
                className="pc-login-btn"
                onClick={() => navigate("/login")}
              >
                Entrar
              </button>
            )}

            {/* APPS */}
            <button
              className="pc-apps-btn"
              onClick={() => setAppsOpen(v => !v)}
              aria-label="Abrir apps"
            >
              <div className="pc-apps-icon">
                {/* BOLINHAS */}
                <div className="pc-dots-grid">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>

                {/* SVG P INLINE */}
                <svg
                  className="pc-p-symbol"
                  viewBox="0 0 120 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 10
                       Q30 10 30 30
                       V130
                       Q30 145 45 145
                       Q60 145 60 130
                       V95
                       Q60 95 85 95
                       Q110 95 110 60
                       Q110 25 85 25
                       H45"
                    stroke="#111"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {appsOpen && (
              <div className="pc-apps-menu">
                <button>Painel</button>
                <button>Criadores</button>
                <button>Ferramentas</button>
                <button>Configurações</button>
                <button>Ajuda</button>
                <button>Atualizações</button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </header>

        {/* HERO */}
        <section className="pc-hero">
          <h1>Bem-vindo ao Prontfy Core</h1>
          <p>Você está no início do seu painel de controle.</p>
        </section>

        <section className="pc-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
