import { useState } from "react";
import BookForm from "./BookForm";

export default function AdminModal({ onClose }) {
  const [actionType, setActionType] = useState("add");

  const renderForm = () => {
    const props = { mode: actionType, onClose };
    return <BookForm {...props} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Panel de administrador</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-3 gap-4">
          {["add", "edit", "delete"].map((action) => (
            <button
              key={action}
              onClick={() => setActionType(action)}
              className={`py-3 rounded font-semibold transition ${
                actionType === action
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </button>
          ))}
        </div>

        {/* Formulario dinámico (solo libros) */}
        <div className="pt-4">{renderForm()}</div>
      </div>
    </div>
  );
}