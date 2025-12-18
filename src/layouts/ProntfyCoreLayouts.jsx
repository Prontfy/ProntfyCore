// src/layouts/ProntfyCoreLayouts.jsx
import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiSettings,
  FiUsers,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import "./ProntfyCoreLayouts.css";

const menuItems = [
  { key: "painel", name: "Painel", icon: <FiHome /> },
  { key: "usuarios", name: "Usuários", icon: <FiUsers /> },
  { key: "config", name: "Configurações", icon: <FiSettings /> },
];

export default function ProntfyCoreLayouts() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState(false);
  const [showPMenu, setShowPMenu] = useState(false);

  return (
    <div className={`prontfy-core-container ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="logo-area">
          <button
            className="hamburger-btn"
            onClick={() => setCollapsed((v) => !v)}
            aria-label="Recolher menu"
          >
            <FiMenu />
          </button>

          <div className="logo">
            <img src="/images/logo-symbol.png" alt="Prontfy Core" />
            {!collapsed && <span>Prontfy Core</span>}
          </div>
        </div>

        <nav className="menu">
          {menuItems.map((item) => (
            <div key={item.key} className="menu-item">
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="logout-btn"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <FiLogOut />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        {/* TOPBAR */}
        <div className="topbar">
          {/* SEARCH (DESKTOP) */}
          <div className="search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* TOP ACTIONS */}
          <div className="top-actions">
            {/* NOTIFICAÇÕES */}
            <button className="icon-btn" aria-label="Notificações">
              <FiBell />
              <span className="badge">9+</span>
            </button>

            {/* AVATAR */}
            <div className="avatar-wrapper">
              <img
                src={user?.user_metadata?.avatar_url || "/images/avatar-default.png"}
                alt="Avatar"
                className="avatar"
              />
            </div>

            {/* BOLINHAS → P */}
            <div
              className="p-menu-wrapper"
              onMouseEnter={() => setShowPMenu(true)}
              onMouseLeave={() => setShowPMenu(false)}
            >
              <button className="p-trigger">
                {showPMenu ? "P" : "⋮⋮"}
              </button>

              {showPMenu && (
                <div className="p-menu">
                  <button onClick={() => navigate("/painel")}>Painel</button>
                  <button>Criadores</button>
                  <button>Ferramentas</button>
                  <button>Configurações</button>
                  <button>Ajuda</button>
                  <button>Atualizações</button>
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
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
