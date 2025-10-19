import React from "react";

type UploadZoneProps = {
  onUpload: (file: File) => void;
};

export const UploadZone = ({ onUpload }: UploadZoneProps) => {
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  Array.from(e.target.files).forEach((file) => {
    onUpload(file); // tu peux créer un MediaViewer dans le parent
  });

  e.target.value = ""; // reset pour pouvoir re-uploader les mêmes fichiers
};


  return (
<div className="upload-zone mt-4">
  <label className="border p-4 block text-center rounded cursor-pointer bg-gray-100 hover:bg-gray-200">
    Cliquer ou glisser un fichier pour uploader
    <input
      type="file"                     
      multiple                         //  permet plusieurs fichiers
      accept="image/png, image/jpeg, image/jpg, video/mp4" // types autorisés
      onChange={handleFileChange}
      className="hidden"
    />
  </label>
</div>

  );
};
