import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getPublicProfile } from "../../services";
import { formatDate } from "../../utils/formatDate";
import { FaIdBadge, FaUser, FaUserTag, FaCalendarAlt } from "react-icons/fa";
import FieldRow from "../../components/user/PersonalInfoSection/FieldRow";

export default function PublicProfilePage() {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getPublicProfile(id);
        const raw = res.data.perfil;

        const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
        const enriched = {
          ...raw,
          imgUrl: raw.img
            ? `${baseUrl}${raw.img}`
            : `${baseUrl}/img/usuarios/default.jpg`
        };

        setPerfil(enriched);
      } catch (err) {
        setError(err.response?.data?.mensaje || "Error al cargar el perfil.");
      }
    };
    fetchProfile();
  }, [id]);

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
        <div className="flex justify-center">
          <img
            src={perfil.imgUrl}
            alt={`${perfil.nombres} ${perfil.apellidos}`}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Información pública</h3>

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
        </div>
      </div>
    </MainLayout>
  );
}