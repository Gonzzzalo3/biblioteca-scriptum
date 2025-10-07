// src/components/layout/header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar/searchBar";
import ProfileArea from "./profileArea";

// Componente que representa el encabezado principal de la aplicación
export default function Header({ isLoggedIn, user }) {
  const [query, setQuery] = useState(""); // Estado local para la consulta de búsqueda
  const navigate = useNavigate(); // Hook para navegación programática

  // Ejecuta la búsqueda si el campo no está vacío
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Detecta la tecla Enter para activar la búsqueda
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="flex items-center justify-between border-b px-6 pt-[22px] pb-[22px]">
      {/* Sección izquierda con barra de búsqueda */}
      <div className="flex-1 max-w-xl">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Sección derecha con área de perfil */}
      <div className="ml-6">
        <ProfileArea isLoggedIn={isLoggedIn} user={user} />
      </div>
    </header>
  );
}