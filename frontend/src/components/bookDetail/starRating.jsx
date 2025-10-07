// src/components/bookDetail/starRating.jsx
import { FaStar } from "react-icons/fa";

// Componente visual que representa una calificación con estrellas (1 a 5)
export default function StarRating({ rating }) {
  return (
    <div className="flex">
      {/* Renderiza cinco estrellas, coloreadas según el valor de calificación */}
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}