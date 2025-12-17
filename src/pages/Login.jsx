import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/Login.css";

import logo from "../assets/logo-symbol.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";

export default function Login() {
  const [returningUser, setReturningUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const lastUser = localStorage.getItem("lastUser");
    if (lastUser) {
      setReturningUser(JSON.parse(lastUser));
    }
  }, []);

  async function handleOAuth(provider) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "https://prontfy.com.br/painel",
      },
    });

    if (error) {
      alert(`Erro ao entrar com ${provider}`);
      console.error(error);
    }
  }

  function handleRemoveAccounts() {
    localStorage.removeItem("lastUser");
    setReturningUser(null);
  }

  return (
    <main className="login-bg">
      <section className="login-card">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="Prontfy Core" className="login-brand" width={110} />
        </div>

        {returningUser ? (
          <>
            <h1 className="login-title">Bem-vindo de volta</h1>

            <div className="return-user">
              <div className="avatar">
                {returningUser.avatar ? (
                  <img src={returningUser.avatar} alt="" />
                ) : (
                  <span>{returningUser.name?.charAt(0) || "U"}</span>
                )}
              </div>
              <strong>{returningUser.name}</strong>
              <small>{returningUser.email}</small>
            </div>

            <button className="btn-submit" onClick={() => handleOAuth("google")}>
              Continuar
            </button>

            <button className="btn-link" onClick={() => setReturningUser(null)}>
              Continuar com outra conta
            </button>

            <button className="btn-link danger" onClick={handleRemoveAccounts}>
              Remover contas
            </button>
          </>
        ) : (
          <>
            <h1 className="login-title">Bem-vindo ao Prontfy Core</h1>

            <p className="login-sub">
              Acesse com sua conta para continuar — recomendamos usar a conta principal.
            </p>

            <button className="btn-login" onClick={() => handleOAuth("google")}>
              <img src={googleIcon} alt="" className="btn-icon" />
              Entrar com Google
            </button>

            <button className="btn-login" onClick={() => handleOAuth("facebook")}>
              <img src={facebookIcon} alt="" className="btn-icon" />
              Entrar com Facebook
            </button>

            <div className="divider">ou</div>

            <input className="input" type="email" placeholder="Email" />

            <div className="password-field">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
              />
              <button
                type="button"
                className="toggle-pass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button className="btn-submit">Entrar</button>
          </>
        )}

        <p className="terms">
          Ao continuar, você concorda com nossos{" "}
          <a href="/termos-de-uso" target="_blank">Termos</a> e{" "}
          <a href="/politica-de-privacidade" target="_blank">
            Política de Privacidade
          </a>.
        </p>
      </section>
    </main>
  );
}
