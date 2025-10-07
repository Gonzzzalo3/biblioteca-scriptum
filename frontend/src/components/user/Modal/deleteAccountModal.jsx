import { useState } from "react";

// Componente que representa un modal para cambiar la contraseña del usuario
export default function ChangePasswordModal({ onClose, onConfirm }) {
  // Estado local para la contraseña actual ingresada por el usuario
  const [actual, setActual] = useState("");

  // Estado local para la nueva contraseña propuesta
  const [nueva, setNueva] = useState("");

  // Estado local para la confirmación de la nueva contraseña
  const [repetir, setRepetir] = useState("");

  // Maneja el envío del formulario y pasa los datos al controlador externo
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ actual, nueva, repetir }); // Envía las tres contraseñas al callback
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        {/* Título del modal */}
        <h2 className="text-lg font-semibold mb-4">Cambiar contraseña</h2>

        {/* Formulario para ingresar y confirmar nueva contraseña */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Contraseña actual</label>
            <input
              type="password"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nueva contraseña</label>
            <input
              type="password"
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Repetir nueva contraseña</label>
            <input
              type="password"
              value={repetir}
              onChange={(e) => setRepetir(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>

          {/* Botones de acción: cancelar o guardar */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose} // Cierra el modal sin guardar cambios
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit" // Envía el formulario para procesar el cambio
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}