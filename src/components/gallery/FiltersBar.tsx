import React, { useState } from "react";

type FiltersBarProps = {
  onFilter: (criteria: string) => void;
};

export const FiltersBar = ({ onFilter }: FiltersBarProps) => {
  const [filter, setFilter] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
  };

  return (
    <div className="filters-bar mb-4">
      <label htmlFor="filter">Filtrer par type : </label>
      <select id="filter" value={filter} onChange={handleChange} className="border p-1 rounded">
        <option value="">Tous</option>
        <option value="image">Images</option>
        <option value="video">Vidéos</option>
      </select>
    </div>
  );
};
