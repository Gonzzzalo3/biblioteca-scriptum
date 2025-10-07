// components/user/DisableAccountModal.jsx
import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

// Componente que representa un modal de confirmación para inhabilitar la cuenta del usuario
export default function DisableAccountModal({ onClose, onConfirm }) {
  // Estado local para almacenar la contraseña ingresada
  const [password, setPassword] = useState("");

  // Estado local para confirmar la aceptación explícita del usuario
  const [ack, setAck] = useState(false);

  // Condición que habilita el botón de confirmación
  const canConfirm = password.trim().length > 0 && ack;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        {/* Encabezado con ícono de advertencia y mensaje explicativo */}
        <div className="flex items-start gap-3 mb-4">
          <FaExclamationTriangle className="text-red-600 mt-1" />
          <div>
            <h2 className="text-xl font-bold">Inhabilitar cuenta</h2>
            <p className="text-gray-700 mt-1">
              Esta acción desactivará tu cuenta. Para confirmar, ingresa tu contraseña.
            </p>
          </div>
        </div>

        {/* Campos de entrada: contraseña y confirmación por checkbox */}
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={ack}
              onChange={(e) => setAck(e.target.checked)}
            />
            Confirmo que deseo inhabilitar mi cuenta.
          </label>
        </div>

        {/* Botones de acción: cancelar o confirmar inhabilitación */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose} // Cierra el modal sin realizar acción
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(password)} // Ejecuta la acción de inhabilitación
            disabled={!canConfirm} // Solo habilitado si se cumple la condición
            className={`px-4 py-2 rounded text-white transition ${
              canConfirm ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Inhabilitar
          </button>
        </div>
      </div>
    </div>
  );
}