import { FaCog } from "react-icons/fa";

export default function ProfileArea({ isLoggedIn, user }) {
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-400 rounded-full" />
        )}

        {/* Nombre y correo */}
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-gray-800">{user?.name}</span>
          <span className="text-sm text-gray-500">{user?.email}</span>
        </div>

        {/* Botón de configuración */}
        <button
          className="ml-4 p-2 text-gray-500 hover:text-green-700 transition-colors"
          aria-label="Configurar perfil"
        >
          <FaCog className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button className="bg-green-600 text-white px-3 py-1 rounded">
        Iniciar sesión
      </button>
      <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded">
        Registrarse
      </button>
    </div>
  );
}