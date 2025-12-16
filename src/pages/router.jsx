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
 * - / => Home pública (com layout)
 * - /politica-de-privacidade => Página pública (SEM layout)
 * - /exclusao-de-dados => Página pública (SEM layout)
 * - /painel => Dashboard protegido
 */

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div style={{ padding: 24 }}>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

function DataDeletion() {
  return (
    <main
      style={{
        padding: 32,
        maxWidth: 800,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Exclusão de dados</h1>

      <p>
        O usuário pode solicitar a exclusão dos seus dados pessoais a qualquer
        momento entrando em contato pelo e-mail:
      </p>

      <p>
        <strong>contato@prontfy.com.br</strong>
      </p>

      <p>
        A solicitação será processada conforme a legislação vigente.
      </p>
    </main>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login público */}
        <Route path="/login" element={<Login />} />

        {/* Páginas públicas exigidas pela Meta (SEM layout) */}
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="/exclusao-de-dados" element={<DataDeletion />} />

        {/* Home pública COM layout */}
        <Route path="/" element={<ProntfyCoreLayouts />}>
          <Route
            index
            element={<div style={{ padding: 24 }}>Bem-vindo ao Prontfy Core</div>}
          />
        </Route>

        {/* Painel privado */}
        <Route
          path="/painel"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
