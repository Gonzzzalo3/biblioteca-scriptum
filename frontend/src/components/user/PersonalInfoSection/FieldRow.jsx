import { FaEdit } from "react-icons/fa";

export default function FieldRow({ icon, value, editable, isEditing, onEditToggle, onChange }) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center gap-3">
        {icon}
        {editable && isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span className="font-medium">{value}</span>
        )}
      </div>
      {editable && (
        <FaEdit
          className="text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={onEditToggle}
        />
      )}
    </div>
  );
}