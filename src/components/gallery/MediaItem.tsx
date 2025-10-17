import type { MediaViewer } from "../../types/media";

type MediaItemProps = {
  media: MediaViewer;
};

export const MediaItem = ({ media }: MediaItemProps) => {
  return (
    <div className="media-item border rounded overflow-hidden shadow-sm">
      {media.type === "image" ? (
        <img src={media.url} alt={media.title} className="w-full h-auto" />
      ) : (
        <video controls className="w-full h-auto">
          <source src={media.url} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      )}
      <div className="p-2">
        <p className="text-sm font-medium">{media.title}</p>
      </div>
    </div>
  );
};
