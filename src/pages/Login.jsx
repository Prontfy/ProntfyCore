import { supabase } from "../services/supabase";
import "../styles/Login.css";

import logo from "../assets/logo-symbol.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";

export default function Login() {
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://prontfy.com.br/painel",
      },
    });

    if (error) {
      console.error("Erro ao entrar com Google:", error.message);
      alert("Erro ao entrar com Google");
    }
  }

  async function handleFacebookLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "https://prontfy.com.br/painel",
      },
    });

    if (error) {
      console.error("Erro ao entrar com Facebook:", error.message);
      alert("Erro ao entrar com Facebook");
    }
  }

  return (
    <main className="login-bg">
      <section className="login-card">
        {/* LOGO – tamanho explicitamente controlado */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logo}
            alt="Prontfy Core"
            className="login-brand"
            width={110}
            height="auto"
            draggable={false}
          />
        </div>

        <h1 className="login-title">Bem-vindo ao Prontfy Core</h1>

        <p className="login-sub">
          Acesse com sua conta para continuar — recomendamos usar a conta principal.
        </p>

        {/* GOOGLE */}
        <button type="button" className="btn-login" onClick={handleGoogleLogin}>
          <img
            src={googleIcon}
            alt=""
            className="btn-icon"
            width={24}
            height={24}
            draggable={false}
          />
          <span>Entrar com Google</span>
        </button>

        {/* FACEBOOK */}
        <button type="button" className="btn-login" onClick={handleFacebookLogin}>
          <img
            src={facebookIcon}
            alt=""
            className="btn-icon"
            width={24}
            height={24}
            draggable={false}
          />
          <span>Entrar com Facebook</span>
        </button>

        <div className="divider">ou</div>

        <input className="input" type="email" placeholder="Email" />
        <input className="input" type="password" placeholder="Senha" />

        <button type="button" className="btn-submit">
          Entrar
        </button>

        <p className="terms">
          Ao continuar, você concorda com nossos{" "}
          <a href="https://prontfy.com.br/termos-de-uso" target="_blank" rel="noreferrer">
            Termos
          </a>{" "}
          e{" "}
          <a
            href="https://prontfy.com.br/politica-de-privacidade"
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
