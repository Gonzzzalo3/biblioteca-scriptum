// src/components/bookDetail/bookInfo.jsx
import ReserveButton from "../ui/ReserveButton";

// Componente que muestra la información detallada de un libro, incluyendo portada, sinopsis y botón de reserva
export default function BookInfo({ book, showReserveButton, onReserve }) {
  return (
    <>
      {/* Encabezado con título y autor */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 mb-4">por {book.author}</p>
        </div>

        {/* Botón de reserva visible solo si está habilitado */}
        {showReserveButton && (
          <ReserveButton onClick={onReserve} />
        )}
      </div>

      {/* Sección con portada e información adicional */}
      <div className="flex gap-6">
        <img
          src={book.cover} // URL de la imagen de portada
          alt={book.title}
          className="w-48 h-64 object-cover rounded shadow"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Sinopsis</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">{book.synopsis}</p>
          <p className="mb-2">
            <span className="font-semibold">Categoría:</span> {book.category}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Stock:</span> {book.stock}
          </p>
        </div>
      </div>
    </>
  );
}