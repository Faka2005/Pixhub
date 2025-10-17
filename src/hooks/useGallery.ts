import { useState, useCallback } from "react";
import type { Gallery } from "../types/gallery";
import type { MediaViewer } from "../types/media";

export function useGallery() {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadGallery = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const fakeGallery: Gallery = {
        id,
        title: "Ma galerie de test",
        description: "Une galerie d'exemple",
        ownerId: 1,
        media: [
          {
            id: 1,
            type: "image",
            title: "Image de démo",
            url: "https://picsum.photos/300/200",
            ownerId: 1,
            isFavorite: false,
          },
          {
            id: 2,
            type: "video",
            title: "Vidéo d’exemple",
            url: "https://www.w3schools.com/html/mov_bbb.mp4",
            ownerId: 1,
            isFavorite: false,
          },
        ],
      };

      setGallery(fakeGallery);
    } catch {
      setError("Impossible de charger la galerie");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMedia = useCallback(
    (media: MediaViewer) => {
      if (!gallery) return;
      setGallery({ ...gallery, media: [...gallery.media, media] });
    },
    [gallery]
  );

  const filterMedia = useCallback(
    (type: string) => {
      if (!gallery) return;
      setGallery({
        ...gallery,
        media: type ? gallery.media.filter((m) => m.type === type) : gallery.media,
      });
    },
    [gallery]
  );

  return { gallery, loadGallery, isLoading, error, addMedia, filterMedia };
}
