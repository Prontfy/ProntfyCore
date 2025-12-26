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
    <div className="pc-root theme-light">
      {/* SIDEBAR DESKTOP */}
      <aside className={`pc-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="pc-sidebar-header">
          <button
            className="pc-hamburger"
            onClick={() => setCollapsed(v => !v)}
          >
            <FiMenu />
          </button>

          {!collapsed && (
            <div
              className="pc-logo clickable"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
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
        {/* TOPBAR DESKTOP */}
        <header className="pc-topbar">
          <div className="pc-search">
            <FiSearch />
            <input placeholder="Pesquisar..." />
          </div>

          <div className="pc-top-actions">
            <button className="pc-icon-btn">
              <FiBell className="pc-bell" />
            </button>

            {user ? (
              <img
                src={user.user_metadata?.avatar_url || "/images/avatar-placeholder.png"}
                className="pc-avatar clickable"
                alt="Avatar"
              />
            ) : (
              <button className="pc-login-btn" onClick={() => navigate("/login")}>
                Entrar
              </button>
            )}

            <button
              className="pc-apps-btn"
              onClick={() => setAppsOpen(v => !v)}
            >
              <div className="pc-apps-icon">
                <div className="pc-dots-grid">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>

                <svg
                  className="pc-p-symbol"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#111"
                  strokeWidth="6"
                >
                  <path
                    d="M30 15v70M30 15h25c15 0 25 10 25 22s-10 22-25 22H30"
                  />
                  <path d="M30 59c8 0 16 6 16 16v10H30z" />
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
                <button onClick={logout}>Sair</button>
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

        {/* MOBILE BOTTOM NAV */}
        <nav className="pc-mobile-nav">
          <FiHome />
          <FiBell />
          <div className="pc-mobile-p">
            <svg viewBox="0 0 100 100">
              <path
                d="M30 15v70M30 15h25c15 0 25 10 25 22s-10 22-25 22H30"
                stroke="#111"
                strokeWidth="6"
                fill="none"
              />
            </svg>
          </div>
          <FiUsers />
          <FiSettings />
        </nav>
      </main>
    </div>
  );
}
