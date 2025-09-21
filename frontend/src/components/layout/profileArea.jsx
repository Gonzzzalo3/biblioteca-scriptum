import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function ProfileArea() {
  const { user, accessToken } = useUser();
  const isLoggedIn = !!accessToken;
  const primerNombre = user?.nombres?.split(" ")[0] || "";
  const primerApellido = user?.apellidos?.split(" ")[0] || "";

  if (isLoggedIn) {
    console.log("Usuario en contexto:", user);

    return (
      <div className="flex items-center gap-3">
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.nombres}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-400 rounded-full" />
        )}

        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-gray-800">
            {`${primerNombre} ${primerApellido}`}
          </span>
          <span className="text-sm text-gray-500">{user?.correo}</span>
        </div>

        <Link
          to="/my-profile"
          className="ml-4 p-2 text-gray-500 hover:text-green-700 transition-colors"
          aria-label="Configurar perfil"
        >
          <FaCog className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Link
        to="/login"
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
      >
        Iniciar sesión
      </Link>
      <Link
        to="/register"
        className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
      >
        Registrarse
      </Link>
    </div>
  );
}
