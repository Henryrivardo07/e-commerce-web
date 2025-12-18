"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GetMe } from "@/services/me.service";
import type { User } from "@/types/User.type";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      GetMe()
        .then((me) => {
          setUser(me);
          localStorage.setItem("user", JSON.stringify(me));
        })
        .catch((err: unknown) => {
          console.error("❌ Failed to fetch profile:", err);
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    // after login, immediately fetch user
    GetMe()
      .then((me) => {
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
      })
      .catch(() => {
        setUser(null);
      });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
