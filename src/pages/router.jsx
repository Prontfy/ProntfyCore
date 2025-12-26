// src/pages/router.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProntfyCoreLayouts from "../layouts/ProntfyCoreLayouts";
import ProntfyMobileLayout from "../layouts/ProntfyMobileLayout";

import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivacyPolicy from "./PrivacyPolicy";

import { useAuthStore } from "../store/auth";

/* ===============================
   DETECTOR DE MOBILE
================================ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

/* ===============================
   ROTA PROTEGIDA
================================ */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) return <div style={{ padding: 24 }}>Carregando...</div>;

  return user ? children : <Navigate to="/login" replace />;
}

/* ===============================
   LAYOUT SWITCHER
================================ */
function AppLayout() {
  const isMobile = useIsMobile();
  return isMobile ? <ProntfyMobileLayout /> : <ProntfyCoreLayouts />;
}

/* ===============================
   ROUTER PRINCIPAL
================================ */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== ROTAS PÚBLICAS ===== */}
        <Route path="/" element={<AppLayout />}>
          {/* HOME / DASHBOARD VISUAL (SEM LOGIN) */}
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/" element={<PublicLayout />}>
          <Route path="politica-de-privacidade" element={<PrivacyPolicy />} />
        </Route>

        {/* ===== LOGIN ===== */}
        <Route path="/login" element={<Login />} />

        {/* ===== ROTAS PROTEGIDAS ===== */}
        <Route
          path="/painel"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
