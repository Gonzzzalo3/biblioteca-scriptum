import { FaCommentDots, FaLightbulb } from "react-icons/fa";

export default function ActivityCard({ onViewComments, onViewSuggestions }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Mi actividad</h3>
      <button
        onClick={onViewComments}
        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition w-full"
      >
        <FaCommentDots /> Ver mis comentarios
      </button>
      <button
        onClick={onViewSuggestions}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition w-full"
      >
        <FaLightbulb /> Ver mis sugerencias
      </button>
    </div>
  );
}