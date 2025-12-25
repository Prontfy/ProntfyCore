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
            <div className="pc-logo">
              <img
                src="/images/logo-symbol-white.png"
                alt="Prontfy"
                className="pc-logo-img"
              />
              <span>Prontfy Core</span>
            </div>
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
            <FiBell className="pc-bell" />

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
                <div className="pc-dots-grid">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>

                {/* SVG P ORGÂNICO */}
                <img
                  src="/images/p-organico.svg"
                  alt="Prontfy"
                  className="pc-p-symbol"
                />
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
