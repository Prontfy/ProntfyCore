// src/store/auth.js
import { create } from "zustand";
import { supabase } from "../services/supabase";

/**
 * useAuthStore
 * - Mantém user, loading e estado inicializado
 * - Exposição de loginWithGoogle, logout, checkSession, toggleCreator
 *
 * Observações:
 * - Ao importar, fazemos inicialização automática para recuperar sessão
 * - `user` segue o shape do Supabase user. Para flags do app (isCreator) usamos metadata.user_metadata.is_creator
 */

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  initialized: false,

  // Chamar quando quiser iniciar fluxo de OAuth (frontend)
  loginWithGoogle: async () => {
    // redireciona para o Google OAuth; Supabase retorna para /login por padrão
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

  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  },

  // recarrega sessão atual e popula user
  checkSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erro ao obter sessão:", error);
      }
      const sessionUser = data?.session?.user ?? null;
      if (sessionUser) {
        // lê flag customizada isCreator dentro de user_metadata (fallback false)
        const isCreator =
          sessionUser.user_metadata?.isCreator || sessionUser.user_metadata?.is_creator || false;

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

  // listener para mudanças de auth (SIGN_IN / SIGN_OUT)
  listenToAuthChanges: () => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const sessionUser = session.user;
        const isCreator =
          sessionUser.user_metadata?.isCreator || sessionUser.user_metadata?.is_creator || false;
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
    });

    return () => listener.subscription.unsubscribe();
  },

  // ativa manualmente o modo criador (marca na metadata local e tenta gravar via tabela se desejar no futuro)
  setCreatorFlagLocal: (flag = true) => {
    const cur = get().user;
    if (!cur) return;
    const updated = {
      ...cur,
      isCreator: flag,
      user_metadata: {
        ...cur.user_metadata,
        isCreator: flag,
      },
    };
    set({ user: updated });
  },
}));

// Inicialização automática (evita duplicidade caso importado várias vezes)
const _store = useAuthStore.getState();
if (!_store.initialized) {
  _store.checkSession();
  _store.listenToAuthChanges();
}
