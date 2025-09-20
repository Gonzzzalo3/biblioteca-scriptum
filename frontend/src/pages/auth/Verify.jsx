// src/pages/auth/Verify.jsx

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";

export default function Verify() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center text-gray-700">
          Ingresa el código de verificación enviado a tu correo
        </p>

        <form className="w-full flex flex-col gap-4">
          <InputField
            label="Código de verificación"
            type="text"
            name="verificationCode"
            placeholder="Ej: 123456"
            required
          />
          <Button type="submit" full variant="green">
            Continuar
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