import { useState } from "react";

// Componente que representa un modal para confirmar cambios mediante contraseña
export default function PasswordConfirmModal({ onClose, onConfirm }) {
  // Estado local para almacenar la contraseña ingresada
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Título del modal */}
        <h2 className="text-xl font-bold mb-4">Confirmar cambios</h2>

        {/* Mensaje explicativo */}
        <p className="text-gray-700 mb-4">
          Ingrese su contraseña para aplicar los cambios.
        </p>

        {/* Campo de entrada para la contraseña */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado local
          placeholder="Contraseña"
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />

        {/* Botones de acción: cancelar o confirmar */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose} // Cierra el modal sin aplicar cambios
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(password)} // Ejecuta la acción de confirmación
            disabled={!password} // Solo habilitado si se ingresó contraseña
            className={`px-4 py-2 rounded text-white transition ${
              password ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}