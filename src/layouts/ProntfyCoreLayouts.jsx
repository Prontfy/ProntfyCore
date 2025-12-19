// src/layouts/ProntfyCoreLayouts.jsx
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiBell,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useAuthStore } from "../store/auth";
import "./ProntfyCoreLayouts.css";

/* ===============================
   SVG DO P ORGÂNICO (INLINE)
================================ */
const ProntfyPSymbol = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40 15C40 15 75 15 75 45C75 70 40 70 40 70V15Z"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 70C40 70 40 95 65 105"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProntfyCoreLayouts() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverP, setHoverP] = useState(false);

  return (
    <div className="prontfy-layout-root">
      {/* ===============================
          SIDEBAR
      =============================== */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img
            src="/images/logo-symbol-white.png"
            alt="Prontfy Core"
            className="logo-img"
          />
          <span>Prontfy Core</span>
        </div>

        <nav className="sidebar-menu">
          <button onClick={() => navigate("/painel")}>
            <FiHome /> Painel
          </button>
          <button>
            <FiUsers /> Usuários
          </button>
          <button>
            <FiSettings /> Configurações
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <FiLogOut /> Sair
          </button>
        </div>
      </aside>

      {/* ===============================
          MAIN
      =============================== */}
      <main className="main">
        {/* ===============================
            TOPBAR
        =============================== */}
        <header className="topbar">
          <div className="topbar-left">
            <FiMenu className="mobile-menu" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="search-input"
            />
          </div>

          <div className="topbar-right">
            {/* NOTIFICAÇÃO */}
            <button className="icon-btn">
              <FiBell />
              <span className="badge">9+</span>
            </button>

            {/* AVATAR / LOGIN */}
            {user ? (
              <img
                src={
                  user.user_metadata?.avatar_url ||
                  "/images/avatar-placeholder.png"
                }
                alt="Avatar"
                className="avatar"
              />
            ) : (
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Entrar
              </button>
            )}

            {/* GRID → P ORGÂNICO */}
            <button
              className="grid-p-btn"
              onMouseEnter={() => setHoverP(true)}
              onMouseLeave={() => setHoverP(false)}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {!hoverP ? (
                <div className="grid-dots">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
              ) : (
                <ProntfyPSymbol />
              )}
            </button>
          </div>

          {/* DROPDOWN */}
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/painel")}>Painel</button>
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
        </header>

        {/* ===============================
            CONTEÚDO
        =============================== */}
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

