import { useEffect } from "react";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import { FiltersBar } from "../../components/gallery/FiltersBar";
import { UploadZone } from "../../components/gallery/UploadZone";
import { useGallery } from "../../hooks/useGallery";

const GalleryPage = () => {
  const { gallery, loadGallery, isLoading, error, addMedia, filterMedia } = useGallery();

  useEffect(() => {
    loadGallery(1);
  }, [loadGallery]);

  const handleFilter = (criteria: string) => filterMedia(criteria);

  const handleUpload = (file: File) => {
const newMedia = {
  id: Date.now(),
  type: (file.type.startsWith("image") ? "image" : "video") as "image" | "video",
  title: file.name,
  url: URL.createObjectURL(file),
  ownerId: 1,
  isFavorite: false,
};

    addMedia(newMedia);
  };

  return (
    <div className="gallery-page">
      <FiltersBar onFilter={handleFilter} />

      {isLoading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}

      {gallery && <GalleryGrid media={gallery.media} />}

      <UploadZone onUpload={handleUpload} />
    </div>
  );
};

export default GalleryPage;
