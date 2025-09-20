// src/pages/auth/forgotPasswordCode.jsx

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";

export default function ForgotPasswordCode() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center text-gray-700">
          Ingresa el código que enviamos a tu correo
        </p>
        <form className="w-full flex flex-col gap-4">
          <InputField
            label="Código de verificación"
            type="text"
            name="code"
            placeholder="Ej: 123456"
            required
          />
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