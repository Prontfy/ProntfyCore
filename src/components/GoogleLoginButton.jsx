import { supabase } from "../services/supabase";

export default function GoogleLoginButton({
  label = "Entrar com Google",
  redirectTo = "https://prontfy.com.br/painel",
}) {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error("Erro ao entrar com Google:", error.message);
      alert("Erro ao entrar com Google");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="btn-login"
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: 500,
        width: "100%",
      }}
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        width={20}
        height={20}
        draggable={false}
      />
      <span>{label}</span>
    </button>
  );
}
