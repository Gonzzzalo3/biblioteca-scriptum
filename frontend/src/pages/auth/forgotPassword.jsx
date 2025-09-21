import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { forgotPassword } from "../../services";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // evita doble clic
    setError("");
    setLoading(true);
    try {
      await forgotPassword(correo);
      navigate("/forgot-password/code", { state: { correo } });
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al enviar el código.");
      setLoading(false); // vuelve a habilitar si hay error
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center text-gray-700">
          Ingresa tu correo electrónico para restablecer tu contraseña
        </p>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" full variant="green" disabled={loading}>
            {loading ? "Enviando..." : "Enviar código"}
          </Button>
        </form>
        <div className="w-full flex justify-center text-sm text-gray-600 mt-2">
          <AuthLink to="/login">Volver al inicio de sesión</AuthLink>
        </div>
      </div>
    </AuthLayout>
  );
}