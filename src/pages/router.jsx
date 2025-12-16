// src/pages/router.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProntfyCoreLayouts from "../layouts/ProntfyCoreLayouts";

import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivacyPolicy from "./PrivacyPolicy";

import { useAuthStore } from "../store/auth";

/**
 * Router oficial do Prontfy Core
 *
 * 🔓 PÁGINAS PÚBLICAS (SEM layout do app)
 * - /politica-de-privacidade
 * - /exclusao-de-dados
 *
 * 🧩 APP (COM layout)
 * - /
 * - /login
 * - /painel (protegido)
 */

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div style={{ padding: 24 }}>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================
            PÁGINAS INSTITUCIONAIS
            (Meta / Facebook exige)
           ============================ */}

        <Route
          path="/politica-de-privacidade"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/exclusao-de-dados"
          element={
            <main
              style={{
                padding: "40px 20px",
                maxWidth: 900,
                margin: "0 auto",
                fontFamily: "system-ui, sans-serif",
                lineHeight: 1.6,
              }}
            >
              <h1>Exclusão de dados</h1>

              <p>
                O Prontfy Core respeita a privacidade dos usuários e garante o
                direito à exclusão de dados pessoais.
              </p>

              <p>
                Caso deseje solicitar a exclusão dos seus dados, envie um e-mail
                para:
              </p>

              <p>
                <strong>contato@prontfy.com.br</strong>
              </p>

              <p>
                A solicitação será analisada e processada conforme a legislação
                vigente (LGPD).
              </p>
            </main>
          }
        />

        {/* ============================
            APP COM LAYOUT
           ============================ */}

        <Route element={<ProntfyCoreLayouts />}>
          <Route
            path="/"
            element={
              <div style={{ padding: 24 }}>
                Bem-vindo ao Prontfy Core
              </div>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/painel"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ============================
            FALLBACK
           ============================ */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
