import { useState } from "react";
import {
  FaCommentDots,
  FaLightbulb,
  FaKey,
  FaUserSlash,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaIdBadge,
  FaUserTag,
  FaToggleOn,
  FaCalendarAlt
} from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout";
import DisableAccountModal from "../../components/user/disableAccountModal";

// Modal para confirmar cambios con contraseña
function PasswordConfirmModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Confirmar cambios</h2>
        <p className="text-gray-700 mb-4">
          Ingrese su contraseña para aplicar los cambios.
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

export default function UserProfilePage() {
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const [formData, setFormData] = useState({
    id: "USR-001",
    nombres: "Gonzalo Mauricio",
    apellidos: "Cáceres Murga",
    correo: "Gonzalo.caceres@gmail.com",
    celular: "987654321",
    rol: "Usuario",
    estado: "Activo",
    img: "/users/gonzalo.jpg",
    created_at: "2025-01-15",
  });

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = (field) => {
    setEditingField((prev) => (prev === field ? null : field));
  };

  const handleApplyChanges = () => {
    setShowPasswordModal(true);
  };

  const handleConfirmChanges = (password) => {
    console.log("Contraseña ingresada:", password);
    console.log("Datos actualizados:", formData);
    setShowPasswordModal(false);
    alert("Cambios aplicados correctamente.");
  };

  const handleDisableAccount = (password) => {
    console.log("Cuenta inhabilitada con contraseña:", password);
    setShowDisableModal(false);
    alert("Cuenta inhabilitada correctamente.");
  };

  const renderField = (label, field, icon, editable = false) => (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center gap-3">
        {icon}
        {editable && editingField === field ? (
          <input
            type="text"
            value={formData[field]}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            className="border border-gray-300 rounded p-1"
          />
        ) : (
          <span className="font-medium">{formData[field]}</span>
        )}
      </div>
      {editable && (
        <FaEdit
          className="text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={() => toggleEdit(field)}
        />
      )}
    </div>
  );

  return (
    <MainLayout isLoggedIn={true} user={formData}>
      <div className="space-y-8">
        {/* Imagen de perfil */}
        <div className="flex justify-center">
          <img
            src={formData.img}
            alt={formData.nombres}
            className="w-28 h-28 rounded-full object-cover border-4 border-green-500 shadow-lg"
          />
        </div>

        {/* Información personal */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Información personal</h3>
          {renderField("ID", "id", <FaIdBadge className="text-green-600" />)}
          {renderField("Nombres", "nombres", <FaUser className="text-green-600" />, true)}
          {renderField("Apellidos", "apellidos", <FaUser className="text-green-600" />, true)}
          {renderField("Correo", "correo", <FaEnvelope className="text-green-600" />, true)}
          {renderField("Celular", "celular", <FaPhone className="text-green-600" />, true)}
          {renderField("Rol", "rol", <FaUserTag className="text-green-600" />)}
          {renderField("Estado", "estado", <FaToggleOn className="text-green-600" />)}
          {renderField("Fecha de creación", "created_at", <FaCalendarAlt className="text-green-600" />)}

          {/* Botón aplicar cambios */}
          <div className="mt-4 text-right">
            <button
              onClick={handleApplyChanges}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Aplicar cambios
            </button>
          </div>
        </div>

        {/* Actividad y Configuración */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Mi actividad</h3>
            <button
              onClick={() => alert("Ver comentarios")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition w-full"
            >
              <FaCommentDots /> Ver mis comentarios
            </button>
            <button
              onClick={() => alert("Ver sugerencias")}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition w-full"
            >
              <FaLightbulb /> Ver mis sugerencias
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Configuración</h3>
            <button
              onClick={() => alert("Cambiar contraseña")}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition w-full"
            >
              <FaKey /> Cambiar contraseña
            </button>
            <button
              onClick={() => setShowDisableModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 transition w-full"
            >
              <FaUserSlash /> Inhabilitar cuenta
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordConfirmModal
          onClose={() => setShowPasswordModal(false)}
          onConfirm={handleConfirmChanges}
        />
      )}

      {showDisableModal && (
        <DisableAccountModal
          onClose={() => setShowDisableModal(false)}
          onConfirm={handleDisableAccount}
        />
      )}
    </MainLayout>
  );
}