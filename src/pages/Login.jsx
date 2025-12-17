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
        <img src={logo} alt="Prontfy Core" className="login-brand" />

        <h1 className="login-title">Bem-vindo ao Prontfy Core</h1>
        <p className="login-sub">
          Acesse com sua conta para continuar.
        </p>

        <button className="btn-login" onClick={() => loginOAuth("google")}>
          <img src={googleIcon} alt="" />
          Entrar com Google
        </button>

        <button className="btn-login" onClick={() => loginOAuth("facebook")}>
          <img src={facebookIcon} alt="" />
          Entrar com Facebook
        </button>

        <div className="divider">ou</div>

        <input className="input" type="email" placeholder="Email" />

        {/* PASSWORD COM OLHO PROFISSIONAL */}
        <div className="password-wrapper">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁"}
          </button>
        </div>

        <button className="btn-submit">Entrar</button>

        <p className="terms">
          Ao continuar, você concorda com nossos{" "}
          <a href="/termos-de-uso">Termos</a> e{" "}
          <a href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>
      </section>
    </main>
  );
}
