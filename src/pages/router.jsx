// src/pages/router.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuthStore } from "../store/auth";

// Layouts
import ProntfyMobileLayout from "../layouts/ProntfyMobileLayout";
import ProntfyCoreLayouts from "../layouts/ProntfyCoreLayouts"; // 👈 PLURAL

// Pages
import Dashboard from "./Dashboard";
import Login from "./Login";

// Helper simples para detectar mobile
function isMobile() {
  return window.innerWidth <= 768;
}

export default function AppRouter() {
  const user = useAuthStore((s) => s.user);

  const Layout = isMobile()
    ? ProntfyMobileLayout
    : ProntfyCoreLayouts;

  return (
    <BrowserRouter>
      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hub" element={<div>Hub Prontfy</div>} />
          <Route path="/community" element={<div>Comunidade</div>} />
          <Route path="/settings" element={<div>Configurações</div>} />
        </Route>

        {/* LOGIN */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
