// src/components/BottomNav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mobile.css";

export default function BottomNav({ onOpenCreate }) {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate("/")}>
        <span className="icon">🏠</span>
      </button>

      <button onClick={onOpenCreate}>
        <span className="icon">＋</span>
      </button>

      <button className="logo-p" onClick={() => navigate("/core")}>
        <img src="/p-logo.png" alt="Prontfy" />
      </button>

      <button onClick={() => navigate("/community")}>
        <span className="icon">👥</span>
      </button>

      <button onClick={() => navigate("/settings")}>
        <span className="icon">⚙️</span>
      </button>
    </nav>
  );
}
