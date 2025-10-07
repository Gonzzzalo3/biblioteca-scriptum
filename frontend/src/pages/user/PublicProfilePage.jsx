import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getPublicProfile, updateUserStatus } from "../../services";
import { formatDate } from "../../utils/formatDate";
import {
  FaIdBadge,
  FaUser,
  FaUserTag,
  FaCalendarAlt,
  FaUserSlash,
  FaUserCheck,
} from "react-icons/fa";
import FieldRow from "../../components/user/PersonalInfoSection/FieldRow";
import { useUser } from "../../context/UserContext";
import { USER_STATUS } from "../../utils/constants";

// Página que muestra el perfil público de un usuario.
// Si el usuario autenticado accede a su propio perfil público, se redirige automáticamente a su perfil privado.
export default function PublicProfilePage() {
  const { id } = useParams(); // ID del perfil público desde la URL
  const navigate = useNavigate();
  const { user } = useUser(); // Usuario autenticado

  const [perfil, setPerfil] = useState(null); // Datos del perfil público
  const [error, setError] = useState(""); // Mensaje de error en caso de fallo
  const [redirecting, setRedirecting] = useState(false); // Estado de redirección automática
  const [loadingStatus, setLoadingStatus] = useState(false); // Estado de carga para el botón de suspensión

  // Efecto que se ejecuta al montar el componente o cambiar el ID
  useEffect(() => {
    // Si el usuario intenta ver su propio perfil público, se redirige al privado
    if (user?.id && parseInt(id) === user.id) {
      setRedirecting(true);
      setTimeout(() => {
        navigate("/my-profile", { replace: true });
      }, 1000);
      return;
    }

    // Carga el perfil público desde el backend
    const fetchProfile = async () => {
      try {
        const res = await getPublicProfile(id);
        const raw = res.data.perfil;

        // Construcción de URL de imagen con fallback a variable de entorno
        const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
        const enriched = {
          ...raw,
          estado: raw.estado?.toLowerCase(),
          imgUrl: raw.img
            ? `${baseUrl}${raw.img}`
            : `${baseUrl}/img/usuarios/default.jpg`,
        };

        setPerfil(enriched);
      } catch (err) {
        setError(err.response?.data?.mensaje || "Error al cargar el perfil.");
      }
    };

    fetchProfile();
  }, [id, user?.id, navigate]);

  // Alterna el estado del usuario entre suspendido y activo
  const handleToggleStatus = async () => {
    const accion =
      perfil.estado === USER_STATUS.SUSPENDIDO ? "desbloquear" : "bloquear";

    const confirmacion = window.confirm(
      `¿Estás seguro de que quieres ${
        accion === "bloquear" ? "bloquear" : "quitar la suspensión a"
      } este usuario?`
    );

    if (!confirmacion) return;

    try {
      setLoadingStatus(true);
      const res = await updateUserStatus(perfil.id, accion);

      setPerfil((prev) => ({
        ...prev,
        estado: res.data.estado?.toLowerCase(),
      }));

      alert(res.data.mensaje || "Estado actualizado correctamente.");
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al actualizar estado.");
    } finally {
      setLoadingStatus(false);
    }
  };

  // Renderizado condicional según estado de redirección, error o carga
  if (redirecting) {
    return (
      <MainLayout>
        <p className="text-center text-gray-500">
          Redirigiendo a tu perfil privado...
        </p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-500">{error}</p>
      </MainLayout>
    );
  }

  if (!perfil) {
    return (
      <MainLayout>
        <p className="text-center text-gray-500">Cargando perfil...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Imagen de perfil */}
        <div className="flex justify-center">
          <img
            src={perfil.imgUrl}
            alt={`${perfil.nombres} ${perfil.apellidos}`}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>

        {/* Información pública del usuario */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Información pública
          </h3>

          <FieldRow
            icon={<FaIdBadge className="text-green-600" />}
            value={`USR-${perfil.id}`}
            editable={false}
          />
          <FieldRow
            icon={<FaUser className="text-green-600" />}
            value={perfil.nombres}
            editable={false}
          />
          <FieldRow
            icon={<FaUser className="text-green-600" />}
            value={perfil.apellidos}
            editable={false}
          />
          <FieldRow
            icon={<FaUserTag className="text-green-600" />}
            value={perfil.rol}
            editable={false}
          />
          <FieldRow
            icon={<FaCalendarAlt className="text-green-600" />}
            value={formatDate(perfil.created_at)}
            editable={false}
          />
          <FieldRow
            icon={<FaUserTag className="text-green-600" />}
            value={
              perfil.estado === USER_STATUS.ACTIVO
                ? "Disponible"
                : perfil.estado === USER_STATUS.SUSPENDIDO
                ? "Suspendido"
                : "Inactivo"
            }
            editable={false}
          />

          {/* Botón de suspensión/desbloqueo visible solo para bibliotecarios */}
          {user?.rol === "bibliotecario" && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleToggleStatus}
                disabled={loadingStatus}
                className={`flex items-center gap-2 px-4 py-2 rounded transition text-sm font-medium ${
                  perfil.estado === USER_STATUS.SUSPENDIDO
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "bg-red-50 text-red-700 hover:bg-red-100"
                }`}
              >
                {perfil.estado === USER_STATUS.SUSPENDIDO ? (
                  <FaUserCheck />
                ) : (
                  <FaUserSlash />
                )}
                {loadingStatus
                  ? "Procesando..."
                  : perfil.estado === USER_STATUS.SUSPENDIDO
                  ? "Quitar suspensión"
                  : "Suspender usuario"}
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}