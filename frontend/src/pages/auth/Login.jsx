import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { login } from "../../services/auth/auth";
import { useUser } from "../../context/UserContext";

// Página de inicio de sesión para usuarios registrados
export default function Login() {
  // Estados locales para campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Acceso al contexto global de usuario
  const { setUser, setAccessToken } = useUser();

  // Hook de navegación para redirigir tras login exitoso
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Llama al servicio de autenticación
      const res = await login({ correo: email, contraseña: password });
      const { usuario, accessToken } = res.data;

      // Guarda usuario y token en el contexto
      console.log("Usuario recibido del backend:", usuario);
      setUser(usuario);
      setAccessToken(accessToken);

      // Redirige al home
      navigate("/");
    } catch (err) {
      // Muestra mensaje de error si ocurre
      const backendMsg =
        err.response?.data?.mensaje || err.response?.data?.error;
      setError(backendMsg || "Correo o contraseña incorrectos");
    }
  };

  return (
    <AuthLayout>
      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <InputField
          label="Correo electrónico"
          type="email"
          name="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" full variant="green">
          Iniciar sesión
        </Button>
        {/* Mensaje de error si ocurre */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {/* Enlaces auxiliares para registro y recuperación */}
      <div className="w-full flex justify-between text-sm text-gray-600 mt-2">
        <AuthLink to="/register">¿No tienes cuenta? Regístrate</AuthLink>
        <AuthLink to="/forgot-password">¿Olvidaste tu contraseña?</AuthLink>
      </div>
    </AuthLayout>
  );
}