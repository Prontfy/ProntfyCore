import { supabase } from "../services/supabase";

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/painel`,
      },
    });

    if (error) {
      console.error(error);
      alert("Erro ao iniciar login com Google");
    }
  };

  return (
    <button onClick={handleLogin}>
      Entrar com Google
    </button>
  );
}
