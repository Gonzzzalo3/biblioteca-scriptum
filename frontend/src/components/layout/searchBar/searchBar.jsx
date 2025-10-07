// src/components/layout/searchBar/searchBar.jsx
import SearchButton from "./searchButton";
import SearchInput from "./searchInput";

// Componente que agrupa el campo de búsqueda y el botón de acción
export default function SearchBar({ value, onChange, onSearch, onKeyDown }) {
  return (
    <div className="flex items-center bg-gray-100 rounded px-4 py-2 w-full">
      {/* Campo de entrada para texto de búsqueda */}
      <SearchInput value={value} onChange={onChange} onKeyDown={onKeyDown} />

      {/* Botón para ejecutar la búsqueda */}
      <SearchButton onClick={onSearch} />
    </div>
  );
}