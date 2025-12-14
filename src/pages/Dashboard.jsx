// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./Dashboard.css";
import { useAuthStore } from "../store/auth";

const chartData = [
  { month: "Jan", value: 8 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 28 },
  { month: "Apr", value: 42 },
  { month: "May", value: 56 },
  { month: "Jun", value: 68 },
  { month: "Jul", value: 82 },
];

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const data = useMemo(() => chartData, []);

  const TARGET_PROGRESS = 12;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= TARGET_PROGRESS) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dash-root">
      {/* HEADER */}
      <header className="dash-header">
        <h2>
          Olá{user?.name ? `, ${user.name}` : ""}
        </h2>
        <p className="muted">
          Você já começou. Esse é o seu espaço de evolução no Prontfy Core.
        </p>
      </header>

      {/* CARDS */}
      <section className="dash-cards">
        {/* PROGRESSO */}
        <div className="dash-card progress-card">
          <div className="progress-ring">
            <svg width="160" height="160">
              <circle
                className="progress-bg"
                cx="80"
                cy="80"
                r="68"
                strokeWidth="10"
              />
              <circle
                className="progress-bar"
                cx="80"
                cy="80"
                r="68"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 68}
                strokeDashoffset={
                  2 * Math.PI * 68 * (1 - progress / 100)
                }
              />
            </svg>

            <div className="progress-text">
              <strong>{progress}%</strong>
              <span>do projeto</span>
            </div>
          </div>

          <p className="progress-desc">
            Esse progresso inicial existe porque você já deu o passo mais difícil:
            entrar.
          </p>
        </div>

        {/* ENGAJAMENTO */}
        <div className="dash-card">
          <div className="card-top">Engajamento</div>
          <div className="card-mid">3 ações</div>
          <div className="card-btm muted">
            Interações recentes no sistema
          </div>
        </div>

        {/* USUÁRIOS */}
        <div className="dash-card">
          <div className="card-top">Usuários ativos</div>
          <div className="card-mid">18</div>
          <div className="card-btm muted">
            Últimos 30 dias
          </div>
        </div>
      </section>

      {/* GRÁFICO */}
      <section className="dash-chart-wrap">
        <div className="dash-chart-card">
          <div className="chart-head">
            <h3>Evolução de ações</h3>
            <span className="small-muted">
              Interações por mês
            </span>
          </div>

          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.08} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4c43ff"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  animationDuration={900}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
