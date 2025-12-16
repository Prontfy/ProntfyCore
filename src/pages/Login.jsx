import "./Login.css";
import { supabase } from "../services/supabase";

import logo from "../assets/logo-prontfy.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";

export default function Login() {
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/painel`,
      },
    });

    if (error) {
      alert("Erro ao entrar com Google");
      console.error(error);
    }
  }

  async function handleFacebookLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/painel`,
      },
    });

    if (error) {
      alert("Erro ao entrar com Facebook");
      console.error(error);
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <img src={logo} alt="Prontfy Core" className="login-brand" />

        <h1 className="login-title">Bem-vindo ao Prontfy Core</h1>

        <p className="login-sub">
          Acesse com sua conta para continuar — recomendamos usar a conta
          principal / Gmail.
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
          Ao continuar, concorda com nossos{" "}
          <a href="#">Termos</a> e <a href="#">Políticas</a>.
        </p>
      </div>
    </div>
  );
}
