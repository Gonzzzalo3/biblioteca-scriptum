import { useState } from "react";

// Componente que representa un modal de confirmación para eliminar la cuenta del usuario
export default function DeleteAccountModal({ onClose, onConfirm }) {
  // Estado local para almacenar la contraseña ingresada
  const [contraseña, setContraseña] = useState("");

  // Maneja el envío del formulario y ejecuta la acción de confirmación
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(contraseña); // Envía la contraseña al controlador externo
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        {/* Título del modal */}
        <h2 className="text-lg font-semibold mb-4 text-red-600">Eliminar cuenta</h2>

        {/* Mensaje informativo sobre la acción irreversible */}
        <p className="text-sm text-gray-600 mb-4">
          Esta acción desactivará tu cuenta permanentemente. Ingresa tu contraseña para confirmar.
        </p>

        {/* Formulario de confirmación */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password" // Campo de entrada para contraseña
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)} // Actualiza el estado local
            className="w-full border rounded p-2"
            required
          />

          {/* Botones de acción: cancelar o eliminar */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose} // Cierra el modal sin realizar acción
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit" // Envía el formulario
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}