// src/components/layout/searchBar/searchButton.jsx
import { FaSearch } from "react-icons/fa";

// Componente que representa el botón de búsqueda con ícono
export default function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick} // Acción que se ejecuta al hacer clic
      className="p-2 text-gray-500 hover:text-green-700 transition-colors"
      aria-label="Buscar" // Etiqueta accesible para lectores de pantalla
    >
      <FaSearch className="w-5 h-5" /> {/* Ícono de lupa */}
    </button>
  );
}