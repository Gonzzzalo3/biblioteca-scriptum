import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/category/category";

export default function CategoryField({ value, onChange, disabled = false }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
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