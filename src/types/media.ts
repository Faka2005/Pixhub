export type MediaViewer = {
  id: number;
  type: "image" | "video";
  title: string;
  url: string;
  ownerId: number;
  isFavorite: boolean;
};
