// src/pages/router.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProntfyCoreLayouts from "../layouts/ProntfyCoreLayouts";

import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivacyPolicy from "./PrivacyPolicy";

import { useAuthStore } from "../store/auth";

/* ===============================
   ROTA PROTEGIDA
================================ */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div style={{ padding: 24 }}>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

/* ===============================
   ROUTER PRINCIPAL (ÚNICO)
================================ */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===============================
            ROTAS PÚBLICAS / META
        =============================== */}
        <Route path="/" element={<PublicLayout />}>
          <Route
            path="politica-de-privacidade"
            element={<PrivacyPolicy />}
          />

          <Route
            path="termos-de-servico"
            element={
              <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
                <h1>Termos de Serviço</h1>
                <p>Ao utilizar a plataforma Prontfy, você concorda com estes termos.</p>
                <p>O uso da plataforma deve respeitar a legislação vigente.</p>
                <p>Estes termos podem ser atualizados a qualquer momento.</p>
              </main>
            }
          />

          <Route
            path="exclusao-de-dados"
            element={
              <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
                <h1>Exclusão de dados</h1>
                <p>O usuário pode solicitar a exclusão de seus dados pessoais.</p>
                <p>
                  Contato: <strong>contato@prontfy.com.br</strong>
                </p>
              </main>
            }
          />
        </Route>

        {/* ===============================
            LOGIN (FORA DO APP)
        =============================== */}
        <Route path="/login" element={<Login />} />

        {/* ===============================
            APLICAÇÃO (DESKTOP + MOBILE)
        =============================== */}
        <Route path="/" element={<ProntfyCoreLayouts />}>
          <Route
            index
            element={
              <div style={{ padding: 24 }}>
                Bem-vindo ao Prontfy Core
              </div>
            }
          />

          <Route
            path="painel"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ===============================
            FALLBACK GLOBAL
        =============================== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
