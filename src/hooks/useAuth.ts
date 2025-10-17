// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import type{ User } from "../types/user";
import type{ Credentials, LoginResponse, AuthStatus } from "../types/auth";

/**
 * 🔐 Hook personnalisé pour gérer l'authentification dans PixHub.
 * Il simule un backend (mock) avec localStorage :
 * - login
 * - signup
 * - logout
 * - récupération de session
 */

export function useAuth() {
  // 👤 Utilisateur connecté (ou null si déconnecté)
  const [user, setUser] = useState<User | null>(null);

  // ⚙️ État d’authentification global : "loggedIn", "loggedOut", "checking"
  const [status, setStatus] = useState<AuthStatus>("checking");

  // 🚨 Message d’erreur éventuel (connexion, inscription…)
  const [error, setError] = useState<string | null>(null);

  /**
   * 🧭 Vérifie si un utilisateur est déjà stocké localement (session persistante)
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setStatus("loggedIn");
    } else {
      setStatus("loggedOut");
    }
  }, []);

  /**
   * 🔑 Connexion utilisateur (mockée)
   * Vérifie les identifiants, stocke l'utilisateur et renvoie un faux token
   */
  const login = async (credentials: Credentials): Promise<LoginResponse | void> => {
    try {
      setStatus("checking");
      setError(null);

      // 🎭 Exemple d'utilisateur “mock”
      const mockUser: User = {
        id: 1,
        name: "Yassir",
        email: credentials.email,
        password: credentials.password,
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        avatar: "/assets/avatar.png",
        subscription: "free",
        type: "admin",
      };

      // ✅ Condition de succès simulée
      if (credentials.email === "test@pixhub.com" && credentials.password === "123456") {
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
        setStatus("loggedIn");

        return {
            success:true,
            user: mockUser,
            token: "fake-jwt-token",
            message: "Connexion réussie ✅",
        };
      } else {
        setError("Email ou mot de passe invalide ❌");
        setStatus("loggedOut");
      }
    } catch (err) {
      setError("Erreur lors de la connexion ⚠️");
      setStatus("loggedOut");

    }
  };

  /**
   * ✨ Inscription utilisateur (mockée)
   * Crée un “nouvel utilisateur” localement
   */
  const signup = async (credentials: Credentials): Promise<LoginResponse | void> => {
    try {
      setStatus("checking");
      setError(null);

      const newUser: User = {
        id: Date.now(),
        name: credentials.name || "Utilisateur",
        email: credentials.email,
        password: credentials.password,
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        avatar: "/assets/default-avatar.png",
        subscription: "free",
        type: "admin",
      };

      // 💾 Simule un enregistrement local
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      setStatus("loggedIn");

      return {
        success:true,
        user: newUser,
        token: "fake-signup-token",
        message: "Inscription réussie 🎉",
      };
    } catch (_) {
      setError("Erreur lors de l’inscription ⚠️");
      setStatus("loggedOut");
    }
  };

  /**
   * 🚪 Déconnexion
   * Supprime la session locale et réinitialise l’état
   **/
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setStatus("loggedOut");
  };

  // ✅ Hook renvoie toutes les fonctions et états utiles
  return {
    user,
    status,
    error,
    login,
    signup,
    logout,
  };
}
