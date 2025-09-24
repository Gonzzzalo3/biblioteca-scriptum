// src/components/admin/UserCard.jsx
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between border">
      <div className="flex items-center gap-4">
        <img
          src={user.img || "/img/usuarios/default.jpg"}
          alt={user.nombres}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          {/* Nombre clickeable que lleva a /profile/:id */}
          <Link
            to={`/profile/${user.id}`}
            className="font-semibold text-blue-600 hover:underline"
          >
            {user.nombres}
          </Link>
          <p className="text-sm text-gray-600">
            Libros con vencimiento: {user.vencimientos}
          </p>
          <p className="text-sm text-gray-600">
            Tiene reservas? {user.tieneReservas ? "Sí" : "No"}
          </p>
        </div>
      </div>
      <Link
        to={`/admin/active-reservations/${user.id}`}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
      >
        Gestionar
      </Link>
    </div>
  );
}