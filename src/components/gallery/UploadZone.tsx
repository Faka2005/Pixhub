import React from "react";

type UploadZoneProps = {
  onUpload: (file: File) => void;
};

export const UploadZone = ({ onUpload }: UploadZoneProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
      e.target.value = "";
    }
  };

  return (
    <div className="upload-zone mt-4">
      <label className="border p-4 block text-center rounded cursor-pointer bg-gray-100 hover:bg-gray-200">
        Cliquer ou glisser un fichier pour uploader
        <input type="png mp4" accept="image/png, image/jpeg, image/jpg, video/mp4" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
};
