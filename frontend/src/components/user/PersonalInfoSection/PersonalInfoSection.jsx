import { FaIdBadge, FaUser, FaEnvelope, FaPhone, FaUserTag, FaToggleOn, FaCalendarAlt } from "react-icons/fa";
import FieldRow from "./FieldRow";
import { formatDate } from "../../../utils/formatDate";

export default function PersonalInfoSection({
  data,
  editingField,
  onFieldEditToggle,
  onFieldChange,
  onApply
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Información personal</h3>

      <FieldRow icon={<FaIdBadge className="text-green-600" />} value={data.id} editable={false} />
      <FieldRow icon={<FaUser className="text-green-600" />} value={data.nombres} editable isEditing={editingField === "nombres"} onEditToggle={() => onFieldEditToggle("nombres")} onChange={(v) => onFieldChange("nombres", v)} />
      <FieldRow icon={<FaUser className="text-green-600" />} value={data.apellidos} editable isEditing={editingField === "apellidos"} onEditToggle={() => onFieldEditToggle("apellidos")} onChange={(v) => onFieldChange("apellidos", v)} />
      <FieldRow icon={<FaEnvelope className="text-green-600" />} value={data.correo} editable isEditing={editingField === "correo"} onEditToggle={() => onFieldEditToggle("correo")} onChange={(v) => onFieldChange("correo", v)} />
      <FieldRow icon={<FaPhone className="text-green-600" />} value={data.celular} editable isEditing={editingField === "celular"} onEditToggle={() => onFieldEditToggle("celular")} onChange={(v) => onFieldChange("celular", v)} />
      <FieldRow icon={<FaUserTag className="text-green-600" />} value={data.rol} editable={false} />
      <FieldRow icon={<FaToggleOn className="text-green-600" />} value={data.estado} editable={false} />
      <FieldRow icon={<FaCalendarAlt className="text-green-600" />} value={formatDate(data.created_at)} editable={false} />

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