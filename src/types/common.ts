// ==============================
// 📁 src/types/common.ts
// ==============================

// ✅ Réponse API générique — s'adapte à n'importe quel type de données (User, Gallery, etc.)
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

// ✅ Structure de pagination — utile pour les listes de galeries, médias, etc.
export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

// ✅ Option de tri — indique sur quel champ et dans quel ordre trier
export type SortOption = {
  field: string;
  order: 'asc' | 'desc';
};

// ✅ Option de filtre — sert à filtrer des listes selon un critère
export type FilterOption = {
  field: string;
  value: string | number | boolean;
};

// ✅ Type combiné pour les requêtes complexes (tri + filtre + pagination)
export type QueryOptions = {
  pagination?: Pagination;
  sort?: SortOption;
  filters?: FilterOption[];
};
