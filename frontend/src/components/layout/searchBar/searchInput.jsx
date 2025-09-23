// SearchInput.jsx
export default function SearchInput({ value, onChange, onKeyDown }) {
  return (
    <input
      type="text"
      placeholder="Buscar libros..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="bg-transparent outline-none flex-1 text-gray-800 placeholder-gray-400"
    />
  );
}