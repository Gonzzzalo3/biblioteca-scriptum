// src/components/auth/LogoAuth.jsx

// Componente que muestra el logotipo institucional en vistas de autenticación
export default function LogoAuth() {
  return (
    <div className="w-80 h-43">
      <img
        src="/assets/Scriptum-logo.png" // Ruta local del logotipo
        alt="Logo de biblioteca"
        className="w-full h-full object-contain" // Asegura que la imagen se ajuste sin recorte
      />
    </div>
  );
}