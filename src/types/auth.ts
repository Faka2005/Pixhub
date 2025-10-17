// ==============================
// 📁 src/types/auth.ts
// ==============================

// ✅ Données nécessaires pour se connecter ou s'inscrire
export type Credentials = {
  email: string;
  password: string;
  name?: string; // utilisé seulement pour l'inscription
};

// ✅ Réponse renvoyée par l'API d'authentification (login/signup)
export type LoginResponse = {
  success: boolean; // indique si la connexion est réussie
  user?: User; // objet utilisateur (importé depuis user.ts)
  token?: string; // token JWT pour la session
  refreshToken?: string; // optionnel : pour prolonger la session
  message?: string; // message d’erreur ou de succès
};

// ✅ Erreur d'authentification typée
export type AuthError = {
  field?: string; // champ concerné par l’erreur (email, password…)
  message: string; // message lisible par l'utilisateur
};

// ✅ États possibles de l’authentification dans l’app
export type AuthStatus = 'loggedIn' | 'loggedOut' | 'checking';

// ✅ Structure principale du contexte d’authentification (utile pour useAuth)
export type AuthContextType = {
  user: User | null; // utilisateur connecté
  status: AuthStatus; // état global (connecté, déconnecté, vérification…)
  login: (credentials: Credentials) => Promise<void>; // action de connexion
  logout: () => void; // déconnexion
  signup: (credentials: Credentials) => Promise<void>; // inscription
};

// ✅ Import du type User depuis user.ts (à créer si pas déjà fait)
import type { User } from './user';
