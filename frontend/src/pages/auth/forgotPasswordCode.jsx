import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { verifyResetCode } from "../../services";

export default function ForgotPasswordCode() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const correo = location.state?.correo || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await verifyResetCode(correo, codigo);
      navigate("/forgot-password/reset", { state: { correo } });
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al verificar el código.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center text-gray-700">
          Ingresa el código que enviamos a tu correo
        </p>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" full variant="green">
            Verificar código
          </Button>
        </form>
        <div className="w-full flex justify-between text-sm text-gray-600 mt-2">
          <AuthLink to="/forgot-password">Volver</AuthLink>
          <AuthLink to="/resend-code">Reenviar código</AuthLink>
        </div>
      </div>
    </AuthLayout>
  );
}