import { create } from "zustand";
import { supabase } from "../services/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  checkSession: async () => {
    const { data } = await supabase.auth.getSession();
    set({ user: data?.session?.user || null, loading: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// inicialização
useAuthStore.getState().checkSession();
