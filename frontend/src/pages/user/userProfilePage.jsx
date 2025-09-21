// pages/user/UserProfilePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import UserHeader from "../../components/user/userHeader";
import PersonalInfoSection from "../../components/user/PersonalInfoSection/PersonalInfoSection";
import ActivityCard from "../../components/user/ActivityCard";
import SettingsCard from "../../components/user/SettingsCard";
import PasswordConfirmModal from "../../components/user/PasswordConfirmModal";
import DisableAccountModal from "../../components/user/disableAccountModal";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editingField, setEditingField] = useState(null);

  // Datos simulados del usuario
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

  // Edición de campos
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldEditToggle = (field) => {
    setEditingField((prev) => (prev === field ? null : field));
  };

  // Aplicar cambios (abre modal de contraseña)
  const handleApply = () => setShowPasswordModal(true);

  const handleConfirmApply = (password) => {
    // Simula guardado en “BD”
    console.log("Confirmar cambios con contraseña:", password);
    console.log("Datos a guardar:", formData);
    setShowPasswordModal(false);
    setEditingField(null);
    alert("Cambios aplicados correctamente.");
  };

  // Inhabilitar cuenta
  const handleDisableAccount = (password) => {
    console.log("Inhabilitar cuenta con contraseña:", password);
    setShowDisableModal(false);
    alert("Cuenta inhabilitada.");
  };

  return (
    <MainLayout
      isLoggedIn={true}
      user={{
        avatarUrl: formData.img,
        name: `${formData.nombres} ${formData.apellidos}`,
        email: formData.correo,
      }}
    >
      <div className="space-y-8">
        <UserHeader
          img={formData.img}
          nombres={formData.nombres}
          apellidos={formData.apellidos}
          correo={formData.correo}
          celular={formData.celular}
          rol={formData.rol}
          createdAt={formData.created_at}
          estado={formData.estado}
        />

        <PersonalInfoSection
          data={formData}
          editingField={editingField}
          onFieldEditToggle={handleFieldEditToggle}
          onFieldChange={handleFieldChange}
          onApply={handleApply}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityCard
            onViewComments={() => navigate("/my-comments")}
            onViewSuggestions={() => navigate("/my-suggestions")}
          />
          <SettingsCard
            onChangePassword={() => alert("Cambiar contraseña")}
            onDisableAccount={() => setShowDisableModal(true)}
          />
        </div>
      </div>

      {showPasswordModal && (
        <PasswordConfirmModal
          onClose={() => setShowPasswordModal(false)}
          onConfirm={handleConfirmApply}
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
