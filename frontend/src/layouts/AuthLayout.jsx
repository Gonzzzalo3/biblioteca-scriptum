// src/layouts/AuthLayout
import AuthImageRotator from "../components/auth/AuthImageRotator";
import LogoAuth from "../components/auth/LogoAuth";

// Componente de layout para vistas de autenticación (login, registro, etc.)
export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sección izquierda: carrusel visual o imagen rotativa */}
      <AuthImageRotator />

      {/* Sección derecha: contenedor del formulario */}
      <div className="w-1/2 bg-[#fff7e2] relative flex justify-center px-8">
        {/* Logo posicionado en la parte superior */}
        <div className="absolute top-6">
          <LogoAuth />
        </div>

        {/* Área principal para renderizar contenido dinámico (formulario u otros elementos) */}
        <div className="w-full max-w-md flex flex-col gap-4 pt-[200px]">
          {children}
        </div>
      </div>
    </div>
  );
}