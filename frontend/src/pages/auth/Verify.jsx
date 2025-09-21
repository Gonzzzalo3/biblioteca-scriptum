import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { verifyAccount } from "../../services/auth/auth";
import { useUser } from "../../context/UserContext";

export default function Verify() {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { markUserAsVerified } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await verifyAccount(codigo);
      if (res.status === 200) {
        markUserAsVerified(); // ✅ actualiza el contexto
        navigate("/"); // o la ruta que quieras
      }
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al verificar la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center text-gray-700">
          Ingresa el código de verificación enviado a tu correo
        </p>

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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" full variant="green" disabled={loading}>
            {loading ? "Verificando..." : "Continuar"}
          </Button>
        </form>

        <div className="w-full flex justify-between text-sm text-gray-600 mt-2">
          <AuthLink to="/login">Volver al inicio de sesión</AuthLink>
          <AuthLink to="/resend-code">Reenviar código</AuthLink>
        </div>
      </div>
    </AuthLayout>
  );
}