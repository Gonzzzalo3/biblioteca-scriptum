// src/components/bookDetail/CommentForm.jsx
import { useState } from "react";
import { FaStar } from "react-icons/fa";

// Componente que permite al usuario crear un nuevo comentario con calificación
export default function CommentForm({ onSubmit }) {
  // Estado para el contenido textual del comentario
  const [contenido, setContenido] = useState("");

  // Estado para la calificación en estrellas (1 a 5)
  const [calificacion, setCalificacion] = useState(0);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contenido.trim() || calificacion === 0) return;
    onSubmit({ contenido, calificacion }); // Llama a la función externa con los datos
    setContenido(""); // Resetea el campo de texto
    setCalificacion(0); // Resetea la calificación
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-3 p-4 border rounded-lg bg-gray-50"
    >
      {/* Campo de texto para el comentario */}
      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Escribe tu comentario..."
        className="w-full border rounded p-2"
        rows={3}
      />

      {/* Campo de calificación con estrellas */}
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

      {/* Botón para enviar el comentario */}
      <button
        type="submit"
        className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition"
      >
        Enviar comentario
      </button>
    </form>
  );
}