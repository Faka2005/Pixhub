import { useState, useCallback } from "react";
import API from "../utils/api";
import type { Gallery } from "../types/gallery";
import type { MediaViewer } from "../types/media";

export const useGallery = (ownerId: string) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Récupérer toutes les galeries
  const fetchGalleries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get<Gallery[]>(`/gallery/user/${ownerId}`);

      // Mapper _id → id pour correspondre à ton type
      const mapped: Gallery[] = res.data.map(g => ({
        id: Number(g.id) || Date.now(), // Convertir _id en number ou générer un fallback
        title: g.title,
        description: g.description || "",
        media: g.media || [],
        ownerId: Number(ownerId),
      }));

      setGalleries(mapped);
    } catch {
      setError("Impossible de récupérer les galeries");
    } finally {
      setLoading(false);
    }
  }, [ownerId]);

  // ➕ Créer une galerie
  const createGallery = async (title: string, description?: string) => {
    try {
      setLoading(true);
      const res = await API.post("/gallery", { title, description, ownerId });

      const newGallery: Gallery = {
        id: Number(res.data._id) || Date.now(), // mapper _id en id
        title: res.data.title,
        description: res.data.description || "",
        media: res.data.media || [],
        ownerId: Number(ownerId),
      };

      setGalleries(prev => [...prev, newGallery]);
    } catch {
      setError("Erreur création galerie");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Supprimer une galerie
  const deleteGallery = async (galleryId: number) => {
    try {
      setLoading(true);
      await API.delete(`/gallery/${galleryId}`);
      setGalleries(prev => prev.filter(g => g.id !== galleryId));
    } catch {
      setError("Erreur suppression galerie");
    } finally {
      setLoading(false);
    }
  };

  // 🎬 Ajouter un média
  const addMedia = async (galleryId: number, userId: string, file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await API.post<MediaViewer>(`/gallery/${galleryId}/${userId}/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setGalleries(prev =>
        prev.map(g => g.id === galleryId ? { ...g, media: [...g.media, res.data] } : g)
      );
    } catch {
      setError("Erreur ajout média");
    } finally {
      setLoading(false);
    }
  };

  return { galleries, loading, error, fetchGalleries, createGallery, deleteGallery, addMedia };
};
