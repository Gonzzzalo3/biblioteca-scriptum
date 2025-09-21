import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BackToProfileButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/my-profile")}
      className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-green-700 transition"
    >
      <FaArrowLeft className="w-4 h-4" />
      Volver al perfil
    </button>
  );
}