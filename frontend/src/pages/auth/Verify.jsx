import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { verifyAccount } from "../../services/auth/auth";
import { useUser } from "../../context/UserContext";

// Página que permite al usuario verificar su cuenta mediante un código recibido por correo
export default function Verify() {
  // Estado local para el código ingresado
  const [codigo, setCodigo] = useState("");

  // Estado de carga para evitar múltiples envíos
  const [loading, setLoading] = useState(false);

  // Estado para mostrar errores
  const [error, setError] = useState("");

  // Hooks de navegación y acceso al contexto de usuario
  const navigate = useNavigate();
  const { markUserAsVerified } = useUser();

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Llama al servicio de verificación
      const res = await verifyAccount(codigo);

      // Si la verificación es exitosa, actualiza el contexto y redirige
      if (res.status === 200) {
        markUserAsVerified();
        navigate("/");
      }
    } catch (err) {
      // Muestra mensaje de error si ocurre
      setError(err.response?.data?.mensaje || "Error al verificar la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        {/* Instrucción inicial */}
        <p className="text-center text-gray-700">
          Ingresa el código de verificación enviado a tu correo
        </p>

        {/* Formulario de verificación */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <InputField
            label="Código de verificación"
            type="text"
            name="verificationCode"
            placeholder="Ej: 123456"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          {/* Mensaje de error si ocurre */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" full variant="green" disabled={loading}>
            {loading ? "Verificando..." : "Continuar"}
          </Button>
        </form>

        {/* Enlaces auxiliares */}
        <div className="w-full flex justify-between text-sm text-gray-600 mt-2">
          <AuthLink to="/login">Volver al inicio de sesión</AuthLink>
          <AuthLink to="/resend-code">Reenviar código</AuthLink>
        </div>
      </div>
    </AuthLayout>
  );
}