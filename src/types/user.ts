// Type représentant un utilisateur de PixHub
export type User = {
  id: number;              // Identifiant unique
  name: string;            // Nom complet de l'utilisateur
  email: string;           // Adresse e-mail
  password: string;        // Mot de passe (pour mock / frontend uniquement, ne pas stocker en clair en prod)
  isLoggedIn: boolean;     // Indique si l'utilisateur est connecté
  createdAt: string;       // Date de création du compte
  avatar?: string;         // URL de l'avatar (optionnel)
  subscription?: string;   // Type d'abonnement (free, premium, etc.)
  type:string;             // Status (Utilsateur standart ou admin)
};




