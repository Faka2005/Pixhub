import { useState, useEffect } from "react";
import API from "../utils/api";
import type { User } from "../types/user";
import type { Credentials, AuthStatus } from "../types/auth";

const STORAGE_KEY_USER = "pixhub_user";
const STORAGE_KEY_STATUS = "pixhub_status";

export function useAuth() {
  const storedUser = localStorage.getItem(STORAGE_KEY_USER);
  const storedStatus = localStorage.getItem(STORAGE_KEY_STATUS) as AuthStatus | null;

  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [status, setStatus] = useState<AuthStatus>(storedStatus || "loggedOut");
  const [error, setError] = useState<string | null>(null);

  // 🔄 Synchroniser automatiquement avec localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }

    if (status) {
      localStorage.setItem(STORAGE_KEY_STATUS, status);
    } else {
      localStorage.removeItem(STORAGE_KEY_STATUS);
    }
  }, [user, status]);

  /** 🔑 Connexion */
  const login = async (credentials: Credentials) => {
    setStatus("checking");
    setError(null);
    try {
      const res = await API.post("/login", credentials);
      const data = res.data;

      const loggedUser: User = {
        id: data.id || data._id,
        username: data.username,
        email: data.email,
        password: credentials.password,
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        avatar: data.avatar || "",
        subscription: data.subscription || "free",
        type: data.type || "standard",
      };

      setUser(loggedUser);
      setStatus("loggedIn");
      return loggedUser;
    } catch (err) {
      setError("Erreur de connexion");
      setStatus("loggedOut");
    }
  };

  /** ✨ Inscription */
  const signup = async (credentials: Credentials) => {
    setStatus("checking");
    setError(null);
    try {
      console.log("Payload envoyé au backend:", {
  username: credentials.username,
  email: credentials.email,
  password: credentials.password,
});

      const res = await API.post("/register", credentials);
      const data = res.data;

      const loggedUser: User = {
        id: data.id || data._id,
        username: data.username,
        email: data.email,
        password: credentials.password,
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        avatar: "",
        subscription: "free",
        type: "standard",
      };

      setUser(loggedUser);
      setStatus("loggedIn");
      return loggedUser;
    } catch (err) {
      setError("Erreur lors de l'inscription");
      setStatus("loggedOut");
    }
  };

  /** 🚪 Déconnexion */
  const logout = () => {
    setUser(null);
    setStatus("loggedOut");
    setError(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_STATUS);
  };

  return {
    user,
    status,
    error,
    login,
    signup,
    logout,
  };
}
