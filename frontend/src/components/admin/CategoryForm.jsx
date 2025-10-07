import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

// Componente para gestionar el formulario de categorías (agregar, editar, eliminar)
export default function CategoryForm({ mode, onClose }) {
  // Lista de categorías disponibles (actualmente simuladas)
  const [categories, setCategories] = useState([]);

  // Término de búsqueda para filtrar categorías
  const [searchTerm, setSearchTerm] = useState("");

  // Categoría seleccionada para edición o eliminación
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Carga inicial de categorías simuladas
  useEffect(() => {
    setCategories([
      { id: 1, nombre: "Ficción", descripcion: "Narrativa imaginativa" },
      { id: 2, nombre: "Historia", descripcion: "Eventos históricos" },
      { id: 3, nombre: "Ciencia", descripcion: "Conocimiento científico" },
      { id: 4, nombre: "Arte", descripcion: "Expresión artística" },
    ]);
  }, []);

  // Filtra categorías según el término de búsqueda
  const filteredCategories = categories.filter((cat) =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Selecciona una categoría desde la lista
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSearchTerm(cat.nombre);
  };

  // Renderiza el campo de búsqueda y resultados dinámicos
  const renderSearchField = () => (
    <div className="relative">
      <label className="block mb-1">Buscar categoría</label>
      <div className="flex items-center border border-gray-300 rounded px-3 py-2">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Nombre de la categoría..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedCategory(null);
          }}
          className="flex-1 outline-none text-sm"
        />
      </div>

      {/* Lista de resultados filtrados */}
      {searchTerm && !selectedCategory && (
        <ul className="mt-2 border border-gray-300 rounded max-h-40 overflow-y-auto bg-white shadow-sm">
          {filteredCategories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => handleSelectCategory(cat)}
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
            >
              {cat.nombre}
            </li>
          ))}
          {filteredCategories.length === 0 && (
            <li className="px-3 py-1 text-gray-500">Sin resultados</li>
          )}
        </ul>
      )}
    </div>
  );

  return (
    <div className="space-y-4 text-sm">
      {/* Título dinámico según el modo */}
      <h3 className="text-sm font-semibold">
        {mode === "add"
          ? "Añadir nueva categoría"
          : mode === "edit"
          ? "Editar categoría"
          : "Eliminar categoría"}
      </h3>

      {/* Campos para agregar nueva categoría */}
      {mode === "add" && (
        <>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <textarea
            placeholder="Descripción"
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
          />
        </>
      )}

      {/* Campo de búsqueda en modo edición o eliminación */}
      {(mode === "edit" || mode === "delete") && renderSearchField()}

      {/* Campo de descripción editable si hay categoría seleccionada */}
      {mode === "edit" && selectedCategory && (
        <>
          <textarea
            defaultValue={selectedCategory.descripcion}
            placeholder="Descripción"
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
          />
        </>
      )}

      {/* Vista de confirmación en modo eliminación */}
      {mode === "delete" && selectedCategory && (
        <div className="border border-gray-200 rounded px-3 py-2 bg-gray-50">
          <p className="text-sm text-gray-700">
            Categoría seleccionada: <strong>{selectedCategory.nombre}</strong>
          </p>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          {mode === "add"
            ? "Guardar"
            : mode === "edit"
            ? "Actualizar"
            : "Eliminar"}
        </button>
      </div>
    </div>
  );
}