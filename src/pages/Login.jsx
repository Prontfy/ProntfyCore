import { useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/Login.css";

import logo from "../assets/logo-symbol.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  async function loginOAuth(provider) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/painel`,
      },
    });

    if (error) {
      console.error(error);
      alert(`Erro ao entrar com ${provider}`);
    }
  }

  return (
    <main className="login-bg">
      <section className="login-card">
        {/* LOGO */}
        <img
          src={logo}
          alt="Prontfy Core"
          className="login-brand"
          draggable={false}
        />

        <h1 className="login-title">Bem-vindo ao Prontfy Core</h1>

        <p className="login-sub">
          Acesse com sua conta para continuar.
        </p>

        {/* GOOGLE */}
        <button
          type="button"
          className="btn-login"
          onClick={() => loginOAuth("google")}
        >
          <img
            src={googleIcon}
            alt=""
            width={20}
            height={20}
            draggable={false}
          />
          <span>Entrar com Google</span>
        </button>

        {/* FACEBOOK */}
        <button
          type="button"
          className="btn-login"
          onClick={() => loginOAuth("facebook")}
        >
          <img
            src={facebookIcon}
            alt=""
            width={20}
            height={20}
            draggable={false}
          />
          <span>Entrar com Facebook</span>
        </button>

        <div className="divider">ou</div>

        {/* EMAIL */}
        <input
          className="input"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />

        {/* SENHA COM OLHO PROFISSIONAL */}
        <div className="password-wrapper">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            autoComplete="current-password"
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {/* ÍCONE SVG (preto/cinza, padrão de mercado) */}
            {showPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.74-1.78 1.84-3.39 3.19-4.69" />
                <path d="M1 1l22 22" />
                <path d="M9.53 9.53a3.5 3.5 0 0 0 4.95 4.95" />
                <path d="M14.47 14.47L9.53 9.53" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {/* ESQUECI MINHA SENHA */}
        <div className="forgot-password">
          <a href="/recuperar-senha">Não lembro ou não tenho a senha</a>
        </div>

        <button type="button" className="btn-submit">
          Entrar
        </button>

        <p className="terms">
          Ao continuar, você concorda com nossos{" "}
          <a href="/termos-de-uso" target="_blank" rel="noreferrer">
            Termos
          </a>{" "}
          e{" "}
          <a
            href="/politica-de-privacidade"
            target="_blank"
            rel="noreferrer"
          >
            Política de Privacidade
          </a>.
        </p>
      </section>
    </main>
  );
}
