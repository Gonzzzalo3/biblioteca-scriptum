export default function UserActivity({ onViewComments, onViewSuggestions }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold">Mi actividad</h3>
      <div className="flex gap-4">
        <button
          onClick={onViewComments}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver mis comentarios
        </button>
        <button
          onClick={onViewSuggestions}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Ver mis sugerencias
        </button>
      </div>
    </div>
  );
}