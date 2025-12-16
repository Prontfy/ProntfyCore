// src/pages/router.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProntfyCoreLayouts from "../layouts/ProntfyCoreLayouts";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivacyPolicy from "./PrivacyPolicy";

import { useAuthStore } from "../store/auth";

/**
 * Router central:
 * - /login => Login (public)
 * - / => Home pública
 * - /politica-de-privacidade => Página pública exigida pela Meta
 * - /exclusao-de-dados => Página pública exigida pela Meta
 * - /painel => Dashboard protegido
 */

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();
  if (loading) return <div style={{ padding: 24 }}>Carregando...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Home pública */}
        <Route path="/" element={<ProntfyCoreLayouts />}>
          <Route index element={<div style={{ padding: 24 }}>Bem-vindo ao Prontfy Core</div>} />
        </Route>

        {/* Política de Privacidade (pública) */}
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />

        {/* Exclusão de dados (vamos criar já já) */}
        <Route
          path="/exclusao-de-dados"
          element={
            <main style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
              <h1>Exclusão de dados</h1>
              <p>
                O usuário pode solicitar a exclusão de seus dados pessoais a qualquer momento
                entrando em contato pelo e-mail:
              </p>
              <p>
                <strong>contato@prontfy.com.br</strong>
              </p>
              <p>
                A solicitação será processada conforme a legislação vigente.
              </p>
            </main>
          }
        />

        {/* Painel privado */}
        <Route
          path="/painel"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
