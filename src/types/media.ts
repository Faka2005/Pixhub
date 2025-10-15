// Type représentant un média (photo ou vidéo) dans une galerie
export type MediaViewer = {
  id: string;              // Identifiant unique du média
  type: 'photo' | 'video'; // Type du média : photo ou vidéo
  url: string;             // Lien vers le fichier (stockage local ou cloud)
  title: string;           // Nom ou titre du média
  ownerId: number;         // Id de l'utilisateur propriétaire
  isFavorite: boolean;     // Indique si le média est favori
  isActive?: boolean;      // Optionnel : est affiché dans la visionneuse
  createdAt?: string;      // Optionnel : date de création ou upload
  thumbnailUrl?: string;   // Optionnel : miniature pour la galerie ou vidéos
  description?: string;    // Optionnel : légende ou description du média
};