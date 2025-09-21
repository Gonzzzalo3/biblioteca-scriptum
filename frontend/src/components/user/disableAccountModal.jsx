import { useState } from "react";

export default function DisableAccountModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Inhabilitar cuenta</h2>
        <p className="text-gray-700 mb-4">
          Esta acción es irreversible. Por favor, ingrese su contraseña para confirmar.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(password)}
            disabled={!password}
            className={`px-4 py-2 rounded text-white transition ${
              password
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}