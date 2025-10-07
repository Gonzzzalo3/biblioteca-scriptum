import { FaIdBadge, FaUser, FaEnvelope, FaPhone, FaUserTag, FaToggleOn, FaCalendarAlt } from "react-icons/fa";
import FieldRow from "./FieldRow";
import { formatDate } from "../../../utils/formatDate";

// Componente que muestra la sección de información personal con campos editables
export default function PersonalInfoSection({
  data,
  editingField,
  onFieldEditToggle,
  onFieldChange,
  onApply
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      {/* Título de la sección */}
      <h3 className="text-lg font-semibold border-b pb-2">Información personal</h3>

      {/* Fila no editable: ID del usuario */}
      <FieldRow
        icon={<FaIdBadge className="text-green-600" />}
        value={data.id}
        editable={false}
      />

      {/* Fila editable: nombres */}
      <FieldRow
        icon={<FaUser className="text-green-600" />}
        value={data.nombres}
        editable
        isEditing={editingField === "nombres"}
        onEditToggle={() => onFieldEditToggle("nombres")}
        onChange={(v) => onFieldChange("nombres", v)}
      />

      {/* Fila editable: apellidos */}
      <FieldRow
        icon={<FaUser className="text-green-600" />}
        value={data.apellidos}
        editable
        isEditing={editingField === "apellidos"}
        onEditToggle={() => onFieldEditToggle("apellidos")}
        onChange={(v) => onFieldChange("apellidos", v)}
      />

      {/* Fila editable: correo electrónico */}
      <FieldRow
        icon={<FaEnvelope className="text-green-600" />}
        value={data.correo}
        editable
        isEditing={editingField === "correo"}
        onEditToggle={() => onFieldEditToggle("correo")}
        onChange={(v) => onFieldChange("correo", v)}
      />

      {/* Fila editable: número de celular */}
      <FieldRow
        icon={<FaPhone className="text-green-600" />}
        value={data.celular}
        editable
        isEditing={editingField === "celular"}
        onEditToggle={() => onFieldEditToggle("celular")}
        onChange={(v) => onFieldChange("celular", v)}
      />

      {/* Fila no editable: rol del usuario */}
      <FieldRow
        icon={<FaUserTag className="text-green-600" />}
        value={data.rol}
        editable={false}
      />

      {/* Fila no editable: estado del usuario */}
      <FieldRow
        icon={<FaToggleOn className="text-green-600" />}
        value={data.estado}
        editable={false}
      />

      {/* Fila no editable: fecha de creación de la cuenta */}
      <FieldRow
        icon={<FaCalendarAlt className="text-green-600" />}
        value={formatDate(data.created_at)}
        editable={false}
      />

      {/* Botón para aplicar los cambios realizados */}
      <div className="mt-4 text-right">
        <button
          onClick={onApply}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Aplicar cambios
        </button>
      </div>
    </div>
  );
}