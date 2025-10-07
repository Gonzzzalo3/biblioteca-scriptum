// src/components/ui/Button.jsx

// Componente reutilizable que representa un botón estilizado con variantes
export default function Button({ children, full, variant = 'primary', ...props }) {
  // Estilos base aplicables a todos los botones
  const base = 'py-2 px-4 rounded-md transition font-semibold';

  // Variantes de estilo disponibles
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    green: 'bg-[#a3d9a5] text-gray-800 hover:bg-[#8ccf8f]',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${full ? 'w-full' : ''}`} // Composición de clases según props
      {...props} // Propagación de propiedades adicionales (ej. onClick, type)
    >
      {children} {/* Contenido interno del botón */}
    </button>
  );
}