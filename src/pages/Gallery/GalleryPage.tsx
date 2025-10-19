import { useEffect, useState } from "react";
import type { Gallery, MediaViewer } from "../../types/gallery";
import { useGallery } from "../../hooks/useGallery";

const GalleryPage = () => {
  // 🔹 Récupérer l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem("pixhub_user") || "{}");
  const ownerId = user?.id?.toString() || "";

  const { galleries, loading, error, fetchGalleries, createGallery, deleteGallery, addMedia } = useGallery(ownerId);

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (ownerId) fetchGalleries();
  }, [fetchGalleries, ownerId]);

  const handleAddGallery = () => {
    if (!newTitle.trim()) return;
    createGallery(newTitle);
    setNewTitle("");
  };

  const handleUpload = (galleryId: number, file: File) => {
    addMedia(galleryId, ownerId, file);
  };

  return (
    <div className="gallery-page" style={{ padding: "20px" }}>
      <h2>Galeries de {user.username || "Utilisateur"}</h2>

      {/* Création nouvelle galerie */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nom de la galerie"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <button onClick={handleAddGallery}>Créer Galerie</button>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Liste des galeries */}
      {galleries.map(g => (
        <div key={g.id} style={{ border: "1px solid #ccc", marginBottom: "20px", padding: "10px" }}>
          <h3>{g.title}</h3>
          <button onClick={() => deleteGallery(g.id)} style={{ marginBottom: "10px" }}>
            Supprimer la galerie
          </button>

          {/* Upload média */}
          <div style={{ marginBottom: "10px" }}>
            <input
              type="file"
              onChange={e => e.target.files && handleUpload(g.id, e.target.files[0])}
            />
          </div>

          {/* Affichage des médias */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {g.media.map((m: MediaViewer) => (
              <div key={m.id} style={{ textAlign: "center" }}>
                {m.type === "image" ? (
                  <img src={m.url} alt={m.title} width={100} />
                ) : (
                  <video src={m.url} width={150} controls />
                )}
                <p style={{ fontSize: "12px" }}>{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryPage;
