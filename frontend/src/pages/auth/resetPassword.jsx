import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { resetPassword } from "../../services";

export default function ResetPassword() {
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const correo = location.state?.correo || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(correo, nuevaContraseña, repetirContraseña);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al cambiar la contraseña.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
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
            <p className="text-center text-gray-700">
              Ingresa tu nueva contraseña
            </p>
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" full variant="green">
                Restablecer contraseña
              </Button>
            </form>
            <div className="w-full flex justify-center text-sm text-gray-600 mt-2">
              <AuthLink to="/login">Volver al inicio de sesión</AuthLink>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}