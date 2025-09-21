// components/user/DisableAccountModal.jsx
import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function DisableAccountModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [ack, setAck] = useState(false);

  const canConfirm = password.trim().length > 0 && ack;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <FaExclamationTriangle className="text-red-600 mt-1" />
          <div>
            <h2 className="text-xl font-bold">Inhabilitar cuenta</h2>
            <p className="text-gray-700 mt-1">
              Esta acción desactivará tu cuenta. Para confirmar, ingresa tu contraseña.
            </p>
          </div>
        </div>

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

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(password)}
            disabled={!canConfirm}
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