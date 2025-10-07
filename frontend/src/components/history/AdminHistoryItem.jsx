// src/components/history/AdminHistoryItem.jsx
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

// Componente que representa un ítem del historial administrativo de préstamos o devoluciones
export default function AdminHistoryItem({ book }) {
  const today = new Date();
  const dueDate = book.dueDate ? new Date(book.dueDate) : null;

  // Estado visual por defecto
  let displayStatus = book.action;
  let statusColor = "text-gray-600";
  let StatusIcon = FaClock;

  // Lógica de visualización según tipo de acción
  if (book.rawAction === "devuelto") {
    statusColor = "text-green-600";
    StatusIcon = FaCheckCircle;
  } else if (book.rawAction === "prestado") {
    if (dueDate && today > dueDate) {
      displayStatus = "Vencido";
      statusColor = "text-red-600";
      StatusIcon = FaTimesCircle;
    } else {
      displayStatus = "En posesión";
      statusColor = "text-blue-600";
      StatusIcon = FaClock;
    }
  } else if (book.rawAction === "creado") {
    statusColor = "text-yellow-600";
    StatusIcon = FaClock;
  } else if (book.rawAction === "cancelado") {
    statusColor = "text-red-600";
    StatusIcon = FaTimesCircle;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 gap-4">
      {/* Información del libro */}
      <div className="flex items-center gap-4">
        <img
          src={book.cover}
          alt={book.title}
          className="w-24 h-32 object-cover rounded shadow"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{book.title}</h3>
          <p className="text-sm text-gray-600">por {book.author}</p>
          <p className="text-xs text-gray-500">Código: {book.code}</p>

          {/* Información del usuario si está presente */}
          {book.usuario && (
            <div className="flex items-center gap-2 mt-2">
              <img
                src={book.usuario.img || "/img/usuarios/default.jpg"} //Ruta local por defecto
                alt={`${book.usuario.nombres} ${book.usuario.apellidos}`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <Link
                to={`/profile/${book.usuario.id_usuario}`}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                {book.usuario.nombres} {book.usuario.apellidos}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Estado y fechas */}
      <div className="text-right flex flex-col justify-between items-end">
        <div className={`flex items-center gap-1 ${statusColor}`}>
          <StatusIcon />
          <span className="font-medium">{displayStatus}</span>
        </div>
        {book.date && (
          <p className="text-xs text-gray-500">Fecha: {book.date}</p>
        )}
        {book.dueDate && (
          <p className="text-xs text-gray-500">Vence: {book.dueDate}</p>
        )}
      </div>
    </div>
  );
}