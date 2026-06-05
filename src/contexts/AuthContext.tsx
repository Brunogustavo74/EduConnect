"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Usuario } from "@/types";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (nome: string, email: string, password: string, escola: string, serie: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Usuario>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string, email: string, retries = 3): Promise<void> => {
    for (let attempt = 0; attempt < retries; attempt++) {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (data) {
        setUser({
          id: data.id,
          nome: data.nome,
          email: email,
          escola: data.escola || "",
          serie: data.serie || "",
          avatar: data.avatar || "",
        });
        return;
      }

      if (attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
      }
    }

    setUser({
      id: userId,
      nome: email.split("@")[0],
      email: email,
      escola: "",
      serie: "",
      avatar: "",
    });
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          await fetchProfile(session.user.id, session.user.email || "");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email || "");
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        await fetchProfile(data.user.id, email);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (nome: string, email: string, password: string, escola: string, serie: string) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nome, escola, serie }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        await new Promise((r) => setTimeout(r, 1000));
        await fetchProfile(authData.user.id, email);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<Usuario>) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          nome: data.nome,
          escola: data.escola,
          serie: data.serie,
          avatar: data.avatar,
        })
        .eq("id", user.id);

      if (error) throw error;
      setUser((prev) => (prev ? { ...prev, ...data } : null));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
