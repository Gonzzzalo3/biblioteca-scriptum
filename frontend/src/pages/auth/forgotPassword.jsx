// src/pages/auth/forgotPassword.jsx

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center text-gray-700">
          Ingresa tu correo electrónico para restablecer tu contraseña
        </p>
        <form className="w-full flex flex-col gap-4">
          <InputField
            label="Correo electrónico"
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            required
          />
          <Button type="submit" full variant="green">
            Enviar código
          </Button>
        </form>
        <div className="w-full flex justify-center text-sm text-gray-600 mt-2">
          <AuthLink to="/login">Volver al inicio de sesión</AuthLink>
        </div>
      </div>
    </AuthLayout>
  );
}