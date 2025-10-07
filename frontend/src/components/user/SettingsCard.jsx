import { FaKey, FaUserSlash } from "react-icons/fa";

// Componente que representa una tarjeta de configuración con acciones disponibles para el usuario
export default function SettingsCard({ onChangePassword, onDisableAccount }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      {/* Título de la sección */}
      <h3 className="text-lg font-semibold border-b pb-2">Configuración</h3>

      {/* Botón para cambiar contraseña, si la función está definida */}
      {onChangePassword && (
        <button
          onClick={onChangePassword} // Ejecuta la acción de cambio de contraseña
          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition w-full"
        >
          <FaKey /> Cambiar contraseña
        </button>
      )}

      {/* Botón para inhabilitar cuenta, si la función está definida */}
      {onDisableAccount && (
        <button
          onClick={onDisableAccount} // Ejecuta la acción de inhabilitación de cuenta
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 transition w-full"
        >
          <FaUserSlash /> Inhabilitar cuenta
        </button>
      )}
    </div>
  );
}