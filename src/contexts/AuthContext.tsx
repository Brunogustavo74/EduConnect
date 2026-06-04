/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Usuario } from "@/types";
import { usuarioAtual as mockUser } from "@/lib/mock-data";

interface AuthContextType {
  user: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (nome: string, email: string, escola: string, serie: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Usuario>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(mockUser);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (_email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Simula autenticação — será substituído pelo Supabase Auth
      await new Promise((r) => setTimeout(r, 800));
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (nome: string, email: string, escola: string, serie: string) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setUser({
        id: String(Date.now()),
        nome,
        email,
        escola,
        serie,
        avatar: "",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<Usuario>) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      setUser((prev) => (prev ? { ...prev, ...data } : null));
    } finally {
      setIsLoading(false);
    }
  }, []);

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
