// src/store/auth.js
import { create } from "zustand";
import { supabase } from "../services/supabase";

/**
 * useAuthStore
 * - Controla sessão, usuário e estado inicial
 * - Guarda memória do usuário (para "Bem-vindo de volta")
 * - Centraliza auth (Google / Facebook / Email no futuro)
 */

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  initialized: false,

  // LOGIN GOOGLE
  loginWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      console.error("Erro ao iniciar login Google:", error.message);
      return { error };
    }

    return { error: null };
  },

  // LOGOUT
  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  },

  // CHECA SESSÃO (MEMÓRIA DE LOGIN)
  checkSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Erro ao obter sessão:", error);

      const sessionUser = data?.session?.user ?? null;

      if (sessionUser) {
        const isCreator =
          sessionUser.user_metadata?.isCreator ||
          sessionUser.user_metadata?.is_creator ||
          false;

        set({
          user: {
            ...sessionUser,
            isCreator,
          },
        });
      } else {
        set({ user: null });
      }
    } catch (err) {
      console.error("checkSession error:", err);
      set({ user: null });
    } finally {
      set({ loading: false, initialized: true });
    }
  },

  // LISTENER GLOBAL (LOGIN / LOGOUT)
  listenToAuthChanges: () => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const sessionUser = session.user;
          const isCreator =
            sessionUser.user_metadata?.isCreator ||
            sessionUser.user_metadata?.is_creator ||
            false;

          set({
            user: {
              ...sessionUser,
              isCreator,
            },
          });
        }

        if (event === "SIGNED_OUT") {
          set({ user: null });
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  },

  // FLAG LOCAL (sem backend por enquanto)
  setCreatorFlagLocal: (flag = true) => {
    const cur = get().user;
    if (!cur) return;

    set({
      user: {
        ...cur,
        isCreator: flag,
        user_metadata: {
          ...cur.user_metadata,
          isCreator: flag,
        },
      },
    });
  },
}));

// 🔁 Inicialização automática (executa UMA vez)
const state = useAuthStore.getState();
if (!state.initialized) {
  state.checkSession();
  state.listenToAuthChanges();
}
