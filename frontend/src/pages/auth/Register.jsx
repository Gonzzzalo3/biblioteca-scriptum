import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/form/inputField";
import Button from "../../components/ui/Button";
import AuthLink from "../../components/auth/AuthLink";
import { register } from "../../services/auth/auth";
import { useUser } from "../../context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useUser();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert("Completa todos los campos antes de continuar.");
      return;
    }
    setStep(2);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const res = await register({
        nombres: formData.firstName,
        apellidos: formData.lastName,
        celular: formData.phone,
        correo: formData.email,
        contraseña: formData.password,
      });

      const { usuario, accessToken } = res.data;

      setUser(usuario);
      setAccessToken(accessToken);

      navigate("/"); // o redirige a /verify si quieres que confirme el código
    } catch (err) {
      console.error("Error al registrar:", err);
      alert(err.response?.data?.mensaje || "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
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
              <Button type="submit" full variant="green" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear cuenta"}
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