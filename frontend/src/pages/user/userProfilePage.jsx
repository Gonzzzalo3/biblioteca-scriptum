import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import MainLayout from "../../layouts/MainLayout";
import UserHeader from "../../components/user/userHeader";
import PersonalInfoSection from "../../components/user/PersonalInfoSection/PersonalInfoSection";
import ActivityCard from "../../components/user/ActivityCard";
import SettingsCard from "../../components/user/SettingsCard";
import PasswordConfirmModal from "../../components/user/PasswordConfirmModal";
import ChangePasswordModal from "../../components/user/Modal/deleteAccountModal";
import DeleteAccountModal from "../../components/user/Modal/changePasswordModal";
import {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  deleteMyProfile,
} from "../../services";
import { useUser } from "../../context/UserContext";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { setUser, logout } = useUser();
  const [formData, setFormData] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        const u = res.data.perfil;
        setFormData({
          id: `USR-${u.id}`,
          nombres: u.nombres || "",
          apellidos: u.apellidos || "",
          correo: u.correo || "",
          celular: u.celular || "",
          rol: u.rol || "Usuario",
          estado: u.estado || "Activo",
          img: u.imgUrl
            ? `${u.imgUrl}?t=${Date.now()}`
            : `/img/usuarios/default.jpg?t=${Date.now()}`,
          created_at: u.created_at,
        });
      } catch (err) {
        console.error("Error cargando perfil:", err);
      }
    };
    fetchProfile();
  }, []);

  const esBibliotecario = formData?.rol === "bibliotecario";

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldEditToggle = (field) => {
    setEditingField((prev) => (prev === field ? null : field));
  };

  const handleApply = () => setShowPasswordModal(true);

  const handleConfirmApply = async (password) => {
    try {
      const fd = new FormData();
      fd.append("nombres", formData.nombres);
      fd.append("apellidos", formData.apellidos);
      fd.append("celular", formData.celular);
      fd.append("password", password);

      if (selectedImageFile) {
        fd.append("img", selectedImageFile);
      } else {
        const cleanImg = formData.img?.startsWith("http")
          ? formData.img.replace(/^https?:\/\/[^/]+/, "")
          : formData.img;
        fd.append("img", cleanImg);
      }

      const res = await updateMyProfile(fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const perfil = res.data.perfil;
      setFormData({
        id: `USR-${perfil.id}`,
        nombres: perfil.nombres,
        apellidos: perfil.apellidos,
        correo: perfil.correo,
        celular: perfil.celular,
        rol: perfil.rol,
        estado: perfil.estado,
        img: perfil.imgUrl
          ? `${perfil.imgUrl}?t=${Date.now()}`
          : `/img/usuarios/default.jpg?t=${Date.now()}`,
        created_at: perfil.createdAt,
      });
      setUser(perfil);

      setShowPasswordModal(false);
      setEditingField(null);
      setSelectedImageFile(null);
      alert("Cambios aplicados correctamente.");
    } catch (err) {
      console.error("Error actualizando perfil:", err);
      alert(err.response?.data?.mensaje || "Error al actualizar el perfil.");
    }
  };

  const handleChangePassword = async ({ actual, nueva, repetir }) => {
    try {
      await changeMyPassword(actual, nueva, repetir);
      alert("Contraseña actualizada correctamente.");
      setShowChangePasswordModal(false);
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al cambiar la contraseña.");
    }
  };

  const handleDeleteAccount = async (contraseña) => {
    try {
      await deleteMyProfile(contraseña);
      alert("Cuenta desactivada correctamente.");
      setShowDeleteAccountModal(false);
      logout();
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al eliminar la cuenta.");
    }
  };

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
          onImageSelect={(file) => {
            setSelectedImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, img: previewUrl }));
          }}
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
            {...(!esBibliotecario && {
              onViewSuggestions: () => navigate("/my-suggestions")
            })}
          />
          <SettingsCard
            onChangePassword={() => setShowChangePasswordModal(true)}
            {...(!esBibliotecario && {
              onDisableAccount: () => setShowDeleteAccountModal(true)
            })}
          />
        </div>
      </div>

      {showPasswordModal && (
        <PasswordConfirmModal
          onClose={() => setShowPasswordModal(false)}
          onConfirm={handleConfirmApply}
        />
      )}

      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
          onConfirm={handleChangePassword}
        />
      )}

      {showDeleteAccountModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteAccountModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
    </MainLayout>
  );
}