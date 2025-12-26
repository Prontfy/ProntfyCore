// src/layouts/ProntfyMobileLayout.jsx
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./ProntfyMobileLayout.css";

export default function ProntfyMobileLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mobile-root">
      {/* TOP BAR */}
      <header className="mobile-topbar">
        <div className="mobile-logo" onClick={() => navigate("/")}>
          <img src="/images/logo-prontfy.svg" alt="Prontfy" />
          <span>Prontfy</span>
        </div>

        <div className="mobile-top-actions">
          <div className="notification">
            <span className="badge">3</span>
            🔔
          </div>

          <div className="avatar">
            <img
              src="https://i.pravatar.cc/100"
              alt="Avatar"
            />
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="mobile-content">
        <Outlet />
      </main>

      {/* BOTTOM NAV */}
      <nav className="mobile-bottom-nav">
        <button
          className={isActive("/") ? "active" : ""}
          onClick={() => navigate("/")}
        >
          🏠
        </button>

        <button
          onClick={() => alert("Abrir modal de criar / chat")}
        >
          ＋
        </button>

        <button
          className="center-logo"
          onClick={() => navigate("/hub")}
        >
          <img src="/images/p-logo.svg" alt="Prontfy P" />
        </button>

        <button
          className={isActive("/community") ? "active" : ""}
          onClick={() => navigate("/community")}
        >
          👥
        </button>

        <button
          className={isActive("/settings") ? "active" : ""}
          onClick={() => navigate("/settings")}
        >
          ⚙️
        </button>
      </nav>
    </div>
  );
}
