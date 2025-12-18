// src/layouts/ProntfyCoreLayouts.jsx
import React, { useState } from "react";
import {
  FiHome,
  FiSettings,
  FiUsers,
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

  return (
    <div className={`prontfy-layout ${collapsed ? "collapsed" : ""}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img
            src="/images/logo-symbol-white.png"
            alt="Prontfy"
            className="logo"
          />
          {!collapsed && <span>Prontfy Core</span>}
        </div>

        <nav className="sidebar-menu">
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

        <div className="sidebar-footer">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <FiLogOut /> {!collapsed && "Sair"}
          </button>

          <button
            className="collapse-btn"
            onClick={() => setCollapsed((v) => !v)}
            title="Recolher menu"
          >
            <FiMenu />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="left">
            <FiSearch />
            <input placeholder="Pesquisar..." />
          </div>

          <div className="right">
            <div className="notification">
              <FiBell />
              <span className="badge">9+</span>
            </div>

            <img
              src={user?.user_metadata?.avatar_url || "/images/avatar.png"}
              alt="Avatar"
              className="avatar"
            />

            <button className="apps-btn">⋮⋮</button>
          </div>
        </header>

        {/* CONTEÚDO */}
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

