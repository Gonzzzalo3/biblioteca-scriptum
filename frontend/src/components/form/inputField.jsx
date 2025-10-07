// src/components/form/InputField.jsx

// Componente reutilizable para campos de entrada con etiqueta y estilos consistentes
export default function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {/* Etiqueta del campo */}
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* Campo de entrada con estilos predefinidos */}
      <input
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        {...props} // Permite pasar dinámicamente atributos como type, value, onChange, etc.
      />
    </div>
  );
}