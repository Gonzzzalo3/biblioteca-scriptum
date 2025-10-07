import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/category/category";

// Componente reutilizable para seleccionar una categoría desde la API
export default function CategoryField({ value, onChange, disabled = false }) {
  // Estado local para almacenar las categorías disponibles
  const [categories, setCategories] = useState([]);

  // Estado para controlar la carga inicial
  const [loading, setLoading] = useState(true);

  // Efecto que se ejecuta una sola vez al montar el componente
  useEffect(() => {
    async function fetchCategories() {
      try {
        // Llamada al servicio para obtener todas las categorías
        const data = await getAllCategories(); // Este servicio debe usar baseURL dinámica
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div>
      <label className="block mb-1">Categoría</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="" disabled>
          {loading ? "Cargando categorías..." : "Seleccionar categoría"}
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}