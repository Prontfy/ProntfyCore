// src/pages/Login.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) navigate("/", { replace: true });
      } catch {}
    }
    checkSession();
  }, [navigate]);

  const handleGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login`,
          queryParams: { prompt: "select_account" },
        },
      });
    } catch (err) {
      alert("Erro ao entrar: " + (err.message || err));
    }
  };

  const handleFacebook = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });
    } catch (err) {
      alert("Erro ao entrar: " + (err.message || err));
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">

        {/* Logo principal */}
        <img
          src="/images/logo-symbol.png"
          alt="Prontfy"
          className="login-brand"
        />

        {/* Título */}
        <h1 className="login-title">Bem-vindo ao Prontfy Core</h1>

        {/* Texto */}
        <p className="login-sub">
          Acesse com sua conta para continuar — recomendamos usar a conta principal / Gmail.
        </p>

        {/* Botão Google */}
        <button className="btn-login" onClick={handleGoogle}>
          <img src="/images/google-icon.png" alt="Google" className="btn-icon" />
          Entrar com Google
        </button>

        {/* Botão Facebook */}
        <button className="btn-login" onClick={handleFacebook}>
          <img src="/images/facebook-icon.png" alt="Facebook" className="btn-icon" />
          Entrar com Facebook
        </button>

        <div className="divider">ou</div>

        {/* Login tradicional */}
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Senha" className="input" />

        <button className="btn-submit">Entrar</button>

        <p className="terms">
          Ao continuar, concorda com nossos <a href="#">Termos</a> e <a href="#">Políticas</a>.
        </p>
      </div>
    </div>
  );
}
