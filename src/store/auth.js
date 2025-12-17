// src/store/auth.js
import { create } from "zustand";
import { supabase } from "../services/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  /* =========================
     SESSÃO
  ========================== */
  checkSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erro ao obter sessão:", error.message);
      }

      set({
        user: data?.session?.user || null,
        loading: false,
      });
    } catch (err) {
      console.error("checkSession error:", err);
      set({ user: null, loading: false });
    }
  },

  /* =========================
     LOGOUT
  ========================== */
  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  },

  /* =========================
     RECUPERAÇÃO DE SENHA
     (Esqueci minha senha)
  ========================== */
  recoverPassword: async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      });

      if (error) {
        console.error("Erro ao enviar recuperação:", error.message);
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error("recoverPassword error:", err);
      return { error: err };
    }
  },

  /* =========================
     ATUALIZAR SENHA
     (após link/código)
  ========================== */
  updatePassword: async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Erro ao atualizar senha:", error.message);
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error("updatePassword error:", err);
      return { error: err };
    }
  },
}));

/* =========================
   INICIALIZAÇÃO AUTOMÁTICA
========================== */
useAuthStore.getState().checkSession();
