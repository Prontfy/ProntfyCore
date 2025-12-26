import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProntfyCoreLayouts from "../layouts/ProntfyCoreLayouts";
import ProntfyMobileLayout from "../layouts/ProntfyMobileLayout";

import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivacyPolicy from "./PrivacyPolicy";

import { useAuthStore } from "../store/auth";

function isMobile() {
  return window.innerWidth <= 768;
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div style={{ padding: 24 }}>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  const Layout = isMobile()
    ? ProntfyMobileLayout
    : ProntfyCoreLayouts;

  return (
    <BrowserRouter>
      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route path="/" element={<PublicLayout />}>
          <Route path="politica-de-privacidade" element={<PrivacyPolicy />} />
        </Route>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* APP */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
