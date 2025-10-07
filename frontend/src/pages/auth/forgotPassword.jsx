import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { forgotPassword } from "../../services";

// Página que permite al usuario solicitar el restablecimiento de contraseña
export default function ForgotPassword() {
  // Estado local para el correo ingresado
  const [correo, setCorreo] = useState("");

  // Estado local para mostrar errores
  const [error, setError] = useState("");

  // Estado de carga para evitar múltiples envíos
  const [loading, setLoading] = useState(false);

  // Hook de navegación para redirigir al usuario
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Previene envíos duplicados

    setError("");
    setLoading(true);

    try {
      await forgotPassword(correo); // Llama al servicio de recuperación
      navigate("/forgot-password/code", { state: { correo } }); // Redirige con estado
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al enviar el código."); // Muestra error
      setLoading(false); // Reactiva el botón
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        {/* Mensaje introductorio */}
        <p className="text-center text-gray-700">
          Ingresa tu correo electrónico para restablecer tu contraseña
        </p>

        {/* Formulario de recuperación */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <InputField
            label="Correo electrónico"
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          {/* Mensaje de error si ocurre */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón de envío */}
          <Button type="submit" full variant="green" disabled={loading}>
            {loading ? "Enviando..." : "Enviar código"}
          </Button>
        </form>

        {/* Enlace para volver al login */}
        <div className="w-full flex justify-center text-sm text-gray-600 mt-2">
          <AuthLink to="/login">Volver al inicio de sesión</AuthLink>
        </div>
      </div>
    </AuthLayout>
  );
}