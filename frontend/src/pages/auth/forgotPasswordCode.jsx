import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { verifyResetCode } from "../../services";

// Página que permite al usuario verificar el código enviado por correo para restablecer su contraseña
export default function ForgotPasswordCode() {
  // Estado local para el código ingresado
  const [codigo, setCodigo] = useState("");

  // Estado local para mostrar errores
  const [error, setError] = useState("");

  // Hooks de navegación y acceso a estado previo
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera el correo desde el estado de navegación
  const correo = location.state?.correo || "";

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await verifyResetCode(correo, codigo); // Verifica el código ingresado
      navigate("/forgot-password/reset", { state: { correo } }); // Redirige al paso siguiente
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al verificar el código."); // Muestra error si ocurre
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        {/* Mensaje introductorio */}
        <p className="text-center text-gray-700">
          Ingresa el código que enviamos a tu correo
        </p>

        {/* Formulario de verificación */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <InputField
            label="Código de verificación"
            type="text"
            name="code"
            placeholder="Ej: 123456"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          {/* Mensaje de error si ocurre */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón de verificación */}
          <Button type="submit" full variant="green">
            Verificar código
          </Button>
        </form>

        {/* Enlaces de navegación auxiliar */}
        <div className="w-full flex justify-between text-sm text-gray-600 mt-2">
          <AuthLink to="/forgot-password">Volver</AuthLink>
          <AuthLink to="/resend-code">Reenviar código</AuthLink>
        </div>
      </div>
    </AuthLayout>
  );
}