// src/layouts/ProntfyMobileLayout.jsx
import React from "react";
import {
  FiHome,
  FiBell,
  FiPlus,
  FiUsers,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import "./ProntfyMobileLayout.css";

export default function ProntfyMobileLayout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="pm-root">
      {/* TOPBAR MOBILE */}
      <header className="pm-topbar">
        <button className="pm-icon-btn">
          <FiMenu size={22} />
        </button>

        <div
          className="pm-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Prontfy
        </div>

        <img
          src={
            user?.user_metadata?.avatar_url ||
            "/images/avatar-placeholder.png"
          }
          alt="Avatar"
          className="pm-avatar"
          onClick={() => navigate("/perfil")}
        />
      </header>

      {/* CONTEÚDO */}
      <main className="pm-content">
        <Outlet />
      </main>

      {/* BOTTOM NAV */}
      <nav className="pm-bottom-nav">
        <button onClick={() => navigate("/painel")}>
          <FiHome />
        </button>

        <button onClick={() => navigate("/notificacoes")}>
          <FiBell />
        </button>

        <button
          className="pm-create-btn"
          onClick={() => navigate("/criar")}
        >
          <span>P</span>
        </button>

        <button onClick={() => navigate("/usuarios")}>
          <FiUsers />
        </button>

        <button onClick={() => navigate("/configuracoes")}>
          <FiSettings />
        </button>
      </nav>
    </div>
  );
}
