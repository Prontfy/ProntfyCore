import "./Login.css";
import { supabase } from "../services/supabase";

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
    <div className="login-bg">
      <div className="login-card">
        <img src={logo} alt="Prontfy Core" className="login-brand" />

        <h1 className="login-title">Bem-vindo ao Prontfy Core</h1>

        <p className="login-sub">
          Acesse com sua conta para continuar — recomendamos usar a conta principal.
        </p>

        <button className="btn-login" onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="Google" className="btn-icon" />
          Entrar com Google
        </button>

        <button className="btn-login" onClick={handleFacebookLogin}>
          <img src={facebookIcon} alt="Facebook" className="btn-icon" />
          Entrar com Facebook
        </button>

        <div className="divider">ou</div>

        <input className="input" type="email" placeholder="Email" />
        <input className="input" type="password" placeholder="Senha" />

        <button className="btn-submit">Entrar</button>

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
      </div>
    </div>
  );
}



