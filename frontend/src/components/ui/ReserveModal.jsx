// src/components/ui/ReserveModal.jsx
import { useState } from "react";

// Componente que representa un modal de confirmación de reserva con políticas visibles
export default function ReserveModal({ onClose, onConfirm }) {
  // Estado local para controlar si el usuario ha aceptado las políticas
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {/* Título del modal */}
        <h2 className="text-xl font-bold mb-4">Políticas de la Biblioteca</h2>

        {/* Texto informativo sobre condiciones de préstamo */}
        <p className="text-gray-700 mb-4">
          El servicio de préstamo es gratuito, pero el cliente se compromete a cuidar el libro y devolverlo en el tiempo correspondiente. 
          De lo contrario, podrían aplicarse penalidades.
        </p>
        <p className="text-gray-700 mb-4">
          La reserva solo dura <strong>3 días</strong>. Si en ese tiempo no acude a la biblioteca a recogerlo, perderá la reserva.
        </p>
        <p className="text-gray-700 mb-4">
          Múltiples reservas sin recoger pueden llevar a la suspensión del servicio de biblioteca.
        </p>

        {/* Checkbox para aceptar las políticas */}
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>Acepto las políticas de la biblioteca</span>
        </label>

        {/* Botones de acción: cancelar o confirmar */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose} // Cierra el modal
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm} // Confirma la reserva
            disabled={!accepted} // Solo habilitado si se aceptan las políticas
            className={`px-4 py-2 rounded text-white transition ${
              accepted
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-300 cursor-not-allowed"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}