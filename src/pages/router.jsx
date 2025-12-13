// src/pages/router.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProntfyCoreLayouts from "../layouts/ProntfyCoreLayouts";
import Login from "./Login";
import Dashboard from "./Dashboard";

import { useAuthStore } from "../store/auth";

/**
 * Router central:
 * - /login => Login (public)
 * - /painel => Dashboard protegido (criador/usuário depois)
 * - / (root) => ProntfyCoreLayouts (público, com conteúdo)
 *
 * Observação: usamos /painel como rota principal pós-login.
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

        {/* Home pública usando o layout */}
        <Route path="/" element={<ProntfyCoreLayouts />}>
          <Route index element={<div style={{ padding: 24 }}>Bem-vindo ao Prontfy Core</div>} />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
