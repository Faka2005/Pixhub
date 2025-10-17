
import { MediaItem } from "./MediaItem";
import type { MediaViewer } from "../../types/media";

type GalleryGridProps = {
  media: MediaViewer[];
};

const GalleryGrid = ({ media }: GalleryGridProps) => {
  if (!media || media.length === 0) return <p>Aucun média à afficher.</p>;

  return (
    <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((item) => (
        <MediaItem key={item.id} media={item} />
      ))}
    </div>
  );
};

export default GalleryGrid;
