import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { formatDate } from "../../utils/formatDate"
import MainLayout from "../../layouts/MainLayout";
import UserHeader from "../../components/user/userHeader";
import PersonalInfoSection from "../../components/user/PersonalInfoSection/PersonalInfoSection";
import ActivityCard from "../../components/user/ActivityCard";
import SettingsCard from "../../components/user/SettingsCard";
import PasswordConfirmModal from "../../components/user/PasswordConfirmModal";
import DisableAccountModal from "../../components/user/disableAccountModal";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState(null);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editingField, setEditingField] = useState(null);

  // Inicializar datos desde el contexto
  useEffect(() => {
    if (user) {
      setFormData({
        id: `USR-${user.id}`,
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        correo: user.correo || "",
        celular: user.celular || "",
        rol: user.rol || "Usuario",
        estado: user.estado || "Activo",
        img: user.img || "/users/default.jpg",
        created_at: user.createdAt
      });
    }
  }, [user]);

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
    console.log("Confirmar cambios con contraseña:", password);
    console.log("Datos a guardar:", formData);
    setShowPasswordModal(false);
    setEditingField(null);
    alert("Cambios aplicados correctamente.");
    // Aquí podrías hacer un PUT al backend para guardar los cambios
  };

  // Inhabilitar cuenta
  const handleDisableAccount = (password) => {
    console.log("Inhabilitar cuenta con contraseña:", password);
    setShowDisableModal(false);
    alert("Cuenta inhabilitada.");
    // Aquí podrías hacer un DELETE o PATCH al backend
  };

  // Mostrar mientras carga
  if (!formData) {
    return (
      <MainLayout>
        <p className="text-center text-gray-500">Cargando perfil...</p>
      </MainLayout>
    );
  }

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
          createdAt={formatDate(formData.created_at)}
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