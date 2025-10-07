import { FaEdit } from "react-icons/fa";

// Componente que representa una fila editable con ícono, valor y botón de edición
export default function FieldRow({ icon, value, editable, isEditing, onEditToggle, onChange }) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      {/* Sección izquierda con ícono y valor o campo editable */}
      <div className="flex items-center gap-3">
        {icon} {/* Ícono representativo del campo */}

        {/* Modo edición: muestra input si está activo */}
        {editable && isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)} // Actualiza el valor al escribir
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span className="font-medium">{value}</span> // Muestra el valor en modo lectura
        )}
      </div>

      {/* Botón de edición si el campo es editable */}
      {editable && (
        <FaEdit
          className="text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={onEditToggle} // Alterna entre modo edición y lectura
        />
      )}
    </div>
  );
}