import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function CommentForm({ onSubmit }) {
  const [contenido, setContenido] = useState("");
  const [calificacion, setCalificacion] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contenido.trim() || calificacion === 0) return;
    onSubmit({ contenido, calificacion });
    setContenido("");
    setCalificacion(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-3 p-4 border rounded-lg bg-gray-50"
    >
      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Escribe tu comentario..."
        className="w-full border rounded p-2"
        rows={3}
      />

      <div>
        <label className="block mb-1 font-medium">Calificación:</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setCalificacion(star)}
              className={`cursor-pointer ${
                star <= calificacion ? "text-yellow-400" : "text-gray-300"
              }`}
              size={24}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition"
      >
        Enviar comentario
      </button>
    </form>
  );
}