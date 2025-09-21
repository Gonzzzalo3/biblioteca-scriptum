export default function SuggestionTextArea({ value, onChange }) {
  return (
    <div>
      <label className="block font-semibold mb-2">Detalles adicionales:</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Cuéntenos un poco más acerca de su sugerencia..."
        className="w-full border border-gray-300 rounded p-2 h-32 resize-none"
      />
    </div>
  );
}