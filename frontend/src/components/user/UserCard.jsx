// src/components/admin/UserCard.jsx
import { Link } from "react-router-dom";

// Componente que representa una tarjeta de usuario en el panel administrativo
export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between border">
      {/* Sección izquierda: imagen y datos del usuario */}
      <div className="flex items-center gap-4">
        <img
          src={user.img || "/img/usuarios/default.jpg"} // Imagen del usuario o imagen por defecto
          alt={user.nombres} // Texto alternativo accesible
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          {/* Enlace al perfil del usuario */}
          <Link
            to={`/profile/${user.id}`}
            className="font-semibold text-blue-600 hover:underline"
          >
            {user.nombres}
          </Link>

          {/* Información adicional del usuario */}
          <p className="text-sm text-gray-600">
            Libros con vencimiento: {user.vencimientos}
          </p>
          <p className="text-sm text-gray-600">
            Tiene reservas? {user.tieneReservas ? "Sí" : "No"}
          </p>
        </div>
      </div>

      {/* Botón para gestionar reservas activas del usuario */}
      <Link
        to={`/admin/active-reservations/${user.id}`}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
      >
        Gestionar
      </Link>
    </div>
  );
}