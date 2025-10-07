import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { resetPassword } from "../../services";

// Página que permite al usuario establecer una nueva contraseña tras verificación
export default function ResetPassword() {
  // Estados locales para los campos del formulario
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");

  // Estado para mostrar errores
  const [error, setError] = useState("");

  // Estado para mostrar éxito tras el cambio
  const [success, setSuccess] = useState(false);

  // Hooks de navegación y recuperación de estado previo
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera el correo desde el estado de navegación
  const correo = location.state?.correo || "";

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Llama al servicio de cambio de contraseña
      await resetPassword(correo, nuevaContraseña, repetirContraseña);
      setSuccess(true);

      // Redirige automáticamente tras 3 segundos
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al cambiar la contraseña.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        {/* Vista de éxito si el cambio fue exitoso */}
        {success ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">
              Contraseña cambiada exitosamente
            </p>
            <Button onClick={() => navigate("/login")} full variant="green">
              Ir al inicio de sesión
            </Button>
          </div>
        ) : (
          <>
            {/* Instrucción inicial */}
            <p className="text-center text-gray-700">
              Ingresa tu nueva contraseña
            </p>

            {/* Formulario de cambio de contraseña */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <InputField
                label="Nueva contraseña"
                type="password"
                name="password"
                placeholder="••••••••"
                value={nuevaContraseña}
                onChange={(e) => setNuevaContraseña(e.target.value)}
                required
              />
              <InputField
                label="Repetir contraseña"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={repetirContraseña}
                onChange={(e) => setRepetirContraseña(e.target.value)}
                required
              />
              {/* Mensaje de error si ocurre */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" full variant="green">
                Restablecer contraseña
              </Button>
            </form>

            {/* Enlace auxiliar para volver al login */}
            <div className="w-full flex justify-center text-sm text-gray-600 mt-2">
              <AuthLink to="/login">Volver al inicio de sesión</AuthLink>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}