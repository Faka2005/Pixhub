import type { MediaViewer } from "./media";

// Type représentant une galerie d'un utilisateur
export type Gallery = {
  id: number;              // Identifiant unique de la galerie
  title: string;           // Nom de la galerie
  description?: string;    // Description optionnelle
  media: MediaViewer[];    // Liste des médias contenus dans la galerie
  ownerId: number;         // Identifiant de l'utilisateur propriétaire
};

