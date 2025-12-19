import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiBell,
  FiLogOut,
  FiLogIn,
} from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import "./ProntfyCoreLayouts.css";

export default function ProntfyCoreLayouts() {
  const navigate = useNavigate();
  const { user, logout, loginWithGoogle } = useAuthStore();

  const [appsOpen, setAppsOpen] = useState(false);

  return (
    <div className="prontfy-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/images/logo-symbol-white.png" alt="Prontfy" />
          <span>Prontfy Core</span>
        </div>

        <nav className="sidebar-menu">
          <button onClick={() => navigate("/painel")}>
            <FiHome /> <span>Painel</span>
          </button>
          <button>
            <FiUsers /> <span>Usuários</span>
          </button>
          <button>
            <FiSettings /> <span>Configurações</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <FiLogOut /> <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main-area">

        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-search">
            <input type="text" placeholder="Pesquisar..." />
          </div>

          <div className="topbar-actions">

            {/* SININHO */}
            <button className="icon-btn">
              <FiBell />
              <span className="badge">9+</span>
            </button>

            {/* AVATAR OU AUTH */}
            {user ? (
              <img
                className="avatar"
                src={user.user_metadata?.avatar_url || "/images/avatar-placeholder.png"}
                alt="Avatar"
              />
            ) : (
              <div className="auth-actions">
                <button onClick={loginWithGoogle}>
                  <FiLogIn /> Entrar
                </button>
                <button className="outline" onClick={loginWithGoogle}>
                  Criar conta
                </button>
              </div>
            )}

            {/* GRID / P */}
            <div
              className="apps-wrapper"
              onMouseLeave={() => setAppsOpen(false)}
            >
              <button
                className="apps-btn"
                onClick={() => setAppsOpen(!appsOpen)}
              >
                <span className="grid-icon">⋮⋮</span>
                <span className="p-icon">P</span>
              </button>

              {appsOpen && (
                <div className="apps-menu">
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
            </div>

          </div>
        </header>

        {/* CONTEÚDO */}
        <main className="content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
