import React, { useState, useRef, useEffect } from "react";
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
  const [profileOpen, setProfileOpen] = useState(false);

  const appsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (appsRef.current && !appsRef.current.contains(e.target)) {
        setAppsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`pc-root ${collapsed ? "collapsed" : ""}`}>
      {/* SIDEBAR */}
      <aside className="pc-sidebar">
        <div className="pc-sidebar-header">
          <button
            className="pc-hamburger"
            onClick={() => setCollapsed(v => !v)}
          >
            <FiMenu />
          </button>

          {!collapsed && (
            <button
              className="pc-logo-btn"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
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
            className="pc-logout-btn"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <FiLogOut />
            {!collapsed && "Sair"}
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
            <button className="pc-icon-btn">
              <FiBell className="pc-bell" />
            </button>

            {/* AVATAR */}
            {user && (
              <div className="pc-profile-wrapper" ref={profileRef}>
                <img
                  src={
                    user?.user_metadata?.avatar_url ||
                    "/images/avatar-placeholder.png"
                  }
                  alt="Avatar"
                  className="pc-avatar"
                  onClick={() => setProfileOpen(v => !v)}
                />

                {profileOpen && (
                  <div className="pc-profile-menu">
                    <img
                      src={
                        user?.user_metadata?.avatar_url ||
                        "/images/avatar-placeholder.png"
                      }
                      alt="Avatar"
                      className="pc-profile-avatar"
                    />

                    <strong className="pc-profile-name">
                      {user.user_metadata?.name || "Usuário"}
                    </strong>

                    <span className="pc-profile-email">
                      {user.email}
                    </span>

                    <div className="pc-profile-actions">
                      <button>Trocar foto</button>
                      <button>Configurações da conta</button>
                      <button
                        className="danger"
                        onClick={() => {
                          logout();
                          navigate("/login");
                        }}
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* APPS */}
            <div className="pc-apps-wrapper" ref={appsRef}>
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
                  >
                    <path
                      d="M25 10 v80 M25 10 h30 c20 0 20 40 0 40 h-30"
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
                </div>
              )}
            </div>
          </div>
        </header>

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
