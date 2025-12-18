// src/layouts/ProntfyCoreLayouts.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiSettings, FiMenu, FiLogOut, FiSearch, FiBell } from "react-icons/fi";
import { useState } from "react";
import { useAuthStore } from "../store/auth";
import "./ProntfyCoreLayouts.css";

export default function ProntfyCoreLayouts() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`pc-layout ${collapsed ? "collapsed" : ""}`}>
      
      {/* SIDEBAR */}
      <aside className="pc-sidebar">
        <div className="pc-logo">
          <img src="/images/logo-symbol.png" alt="Prontfy" />
          {!collapsed && <span>Prontfy Core</span>}
        </div>

        <nav className="pc-menu">
          <button onClick={() => navigate("/painel")}><FiHome /> {!collapsed && "Painel"}</button>
          <button><FiUsers /> {!collapsed && "Usuários"}</button>
          <button><FiSettings /> {!collapsed && "Configurações"}</button>
        </nav>

        <div className="pc-sidebar-footer">
          <button onClick={() => { logout(); navigate("/login"); }}>
            <FiLogOut /> {!collapsed && "Sair"}
          </button>

          {/* BOTÃO RECOLHER – DO LADO CERTO */}
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(v => !v)}
            title="Recolher menu"
          >
            <FiMenu />
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="pc-content">

        {/* TOPBAR */}
        <header className="pc-topbar">
          <div className="pc-search">
            <FiSearch />
            <input placeholder="Pesquisar..." />
          </div>

          <div className="pc-actions">
            <FiBell />
            <img
              src={user?.user_metadata?.avatar_url || "/images/avatar.png"}
              alt="Avatar"
              className="pc-avatar"
            />
            <button className="pc-p-button" title="Menu rápido">
              ⋮⋮⋮
            </button>
          </div>
        </header>

        {/* CONTAINER CENTRAL */}
        <main className="pc-page">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
