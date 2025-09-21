export default function UserActions({ onChangePassword, onDisableAccount }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold">Configuración</h3>
      <button
        onClick={onChangePassword}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
      >
        Cambiar contraseña
      </button>
      <button
        onClick={onDisableAccount}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Inhabilitar cuenta
      </button>
    </div>
  );
}