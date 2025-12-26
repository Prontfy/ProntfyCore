// src/pages/DashboardPublic.jsx
import React from "react";
import "../styles/mobile.css";

export default function DashboardPublic() {
  return (
    <div className="mobile-root">
      <section className="mobile-header">
        <h2>Olá 👋</h2>
        <p>
          Você já começou. Esse é o seu espaço de evolução no Prontfy Core.
        </p>
      </section>

      <section className="mobile-card progress-card">
        <div className="progress-circle">
          <svg width="140" height="140">
            <circle cx="70" cy="70" r="60" stroke="#eef1f6" strokeWidth="10" fill="none" />
            <circle
              cx="70"
              cy="70"
              r="60"
              stroke="#4c43ff"
              strokeWidth="10"
              fill="none"
              strokeDasharray={377}
              strokeDashoffset={330}
              strokeLinecap="round"
            />
          </svg>

          <div className="progress-center">
            <strong>12%</strong>
            <span>do projeto</span>
          </div>
        </div>

        <p className="muted">
          Esse progresso inicial existe porque você já deu o passo mais difícil: entrar.
        </p>
      </section>

      <section className="mobile-card">
        <h4>Engajamento</h4>
        <strong>3 ações</strong>
        <span className="muted">Interações recentes no sistema</span>
      </section>
    </div>
  );
}
