import { FaKey, FaUserSlash } from "react-icons/fa";

export default function SettingsCard({ onChangePassword, onDisableAccount }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Configuración</h3>

      {onChangePassword && (
        <button
          onClick={onChangePassword}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition w-full"
        >
          <FaKey /> Cambiar contraseña
        </button>
      )}

      {onDisableAccount && (
        <button
          onClick={onDisableAccount}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 transition w-full"
        >
          <FaUserSlash /> Inhabilitar cuenta
        </button>
      )}
    </div>
  );
}