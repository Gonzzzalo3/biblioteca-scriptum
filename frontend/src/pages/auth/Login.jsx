// src/pages/auth/Login.jsx

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";

export default function Login() {
  return (
    <AuthLayout>
      <form className="w-full flex flex-col gap-4">
        <InputField
          label="Correo electrónico"
          type="email"
          name="email"
          placeholder="ejemplo@correo.com"
          required
        />
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button type="submit" full variant="green">
          Iniciar sesión
        </Button>
      </form>

      <div className="w-full flex justify-between text-sm text-gray-600 mt-2">
        <AuthLink to="/register">¿No tienes cuenta? Regístrate</AuthLink>
        <AuthLink to="/forgot-password">¿Olvidaste tu contraseña?</AuthLink>
      </div>
    </AuthLayout>
  );
}
