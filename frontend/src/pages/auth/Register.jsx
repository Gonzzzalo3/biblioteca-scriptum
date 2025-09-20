// src/pages/auth/Register.jsx

import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Aquí podrías validar los campos del paso 1 antes de avanzar
    setStep(2);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica final de registro
    console.log("Datos enviados:", formData);
  };

  return (
    <AuthLayout>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={step === 1 ? handleNext : handleSubmit}
      >
        {step === 1 && (
          <>
            <InputField
              label="Nombres"
              type="text"
              name="firstName"
              placeholder="Tus nombres"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Apellidos"
              type="text"
              name="lastName"
              placeholder="Tus apellidos"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Teléfono"
              type="tel"
              name="phone"
              placeholder="Ej: +51 999 999 999"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Button type="submit" full variant="green">
              Siguiente
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <InputField
              label="Correo electrónico"
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Contraseña"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <InputField
              label="Repetir contraseña"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className="flex gap-2">
              <Button type="button" onClick={handleBack} full>
                Atrás
              </Button>
              <Button type="submit" full variant="green">
                Crear cuenta
              </Button>
            </div>
          </>
        )}
      </form>

      <div className="w-full flex justify-between text-sm text-gray-600 mt-2">
        <AuthLink to="/login">¿Ya tienes cuenta? Inicia sesión</AuthLink>
        <AuthLink to="/forgot">¿Olvidaste tu contraseña?</AuthLink>
      </div>
    </AuthLayout>
  );
}