import { FaSearch } from "react-icons/fa";

export default function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-500 hover:text-green-700 transition-colors"
      aria-label="Buscar"
    >
      <FaSearch className="w-5 h-5" />
    </button>
  );
}