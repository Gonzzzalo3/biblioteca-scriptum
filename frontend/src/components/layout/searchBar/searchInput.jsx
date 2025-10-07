//src/components/layout/searchBar/searchInput.jsx

// Componente que representa el campo de entrada de texto para búsquedas
export default function SearchInput({ value, onChange, onKeyDown }) {
  return (
    <input
      type="text" // Tipo de campo: texto
      placeholder="Buscar libros..." // Texto guía para el usuario
      value={value} // Valor actual del campo
      onChange={onChange} // Función que actualiza el estado al escribir
      onKeyDown={onKeyDown} // Función que detecta eventos de teclado (ej. Enter)
      className="bg-transparent outline-none flex-1 text-gray-800 placeholder-gray-400"
    />
  );
}