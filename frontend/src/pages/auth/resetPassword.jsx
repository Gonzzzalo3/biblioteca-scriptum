// src/pages/auth/resetPassword.jsx

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center text-gray-700">
          Ingresa tu nueva contraseña
        </p>
        <form className="w-full flex flex-col gap-4">
          <InputField
            label="Nueva contraseña"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <InputField
            label="Repetir contraseña"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            required
          />
          <Button type="submit" full variant="green">
            Restablecer contraseña
          </Button>
        </form>
        <div className="w-full flex justify-center text-sm text-gray-600 mt-2">
          <AuthLink to="/login">Volver al inicio de sesión</AuthLink>
        </div>
      </div>
    </AuthLayout>
  );
}