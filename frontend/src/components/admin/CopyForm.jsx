import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function CopyForm({ mode, onClose }) {
  const [books, setBooks] = useState([]);
  const [copies, setCopies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCopy, setSelectedCopy] = useState(null);

  useEffect(() => {
    // Simulación de libros
    setBooks([
      { id: 101, titulo: "Cien años de soledad" },
      { id: 102, titulo: "El Principito" },
    ]);

    // Simulación de ejemplares
    setCopies([
      { id: "CP001", libroId: 101, codigo: "CP001", estado: "disponible" },
      { id: "CP002", libroId: 102, codigo: "CP002", estado: "no disponible" },
    ]);
  }, []);

  const filteredBooks = books.filter((book) =>
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCopies = copies.filter((copy) =>
    copy.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCopy = (copy) => {
    setSelectedCopy(copy);
    setSearchTerm(copy.codigo);
  };

  return (
    <div className="space-y-4 text-sm">
      <h3 className="text-sm font-semibold">
        {mode === "add"
          ? "Añadir ejemplares"
          : mode === "edit"
          ? "Editar ejemplar"
          : "Eliminar ejemplar"}
      </h3>

      {mode === "add" && (
        <>
          {/* Buscador de libro */}
          <div className="relative">
            <label className="block mb-1">Buscar libro</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Título del libro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-sm"
              />
            </div>

            {searchTerm && (
              <ul className="mt-2 border border-gray-300 rounded max-h-40 overflow-y-auto bg-white shadow-sm">
                {filteredBooks.map((book) => (
                  <li
                    key={book.id}
                    onClick={() => {
                      setSearchTerm(book.titulo);
                    }}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    {book.titulo}
                  </li>
                ))}
                {filteredBooks.length === 0 && (
                  <li className="px-3 py-1 text-gray-500">Sin resultados</li>
                )}
              </ul>
            )}
          </div>

          {/* Número de ejemplares */}
          <div>
            <label className="block mb-1">Cantidad de ejemplares</label>
            <input
              type="number"
              placeholder="Ejemplares a añadir"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </>
      )}

      {mode === "edit" && (
        <>
          {/* Buscador por código */}
          <div className="relative">
            <label className="block mb-1">Buscar ejemplar por código</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Código del ejemplar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedCopy(null);
                }}
                className="flex-1 outline-none text-sm"
              />
            </div>

            {searchTerm && !selectedCopy && (
              <ul className="mt-2 border border-gray-300 rounded max-h-40 overflow-y-auto bg-white shadow-sm">
                {filteredCopies.map((copy) => (
                  <li
                    key={copy.id}
                    onClick={() => handleSelectCopy(copy)}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    {copy.codigo}
                  </li>
                ))}
                {filteredCopies.length === 0 && (
                  <li className="px-3 py-1 text-gray-500">Sin resultados</li>
                )}
              </ul>
            )}
          </div>

          {/* Campos editables */}
          {selectedCopy && (
            <>
              <input
                type="text"
                defaultValue={selectedCopy.codigo}
                placeholder="Nuevo código del ejemplar"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />

              <select
                defaultValue={selectedCopy.estado}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="disponible">Disponible</option>
                <option value="no disponible">No disponible</option>
              </select>
            </>
          )}
        </>
      )}

      {mode === "delete" && (
        <>
          <div className="relative">
            <label className="block mb-1">Buscar ejemplar por código</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Código del ejemplar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedCopy(null);
                }}
                className="flex-1 outline-none text-sm"
              />
            </div>

            {searchTerm && !selectedCopy && (
              <ul className="mt-2 border border-gray-300 rounded max-h-40 overflow-y-auto bg-white shadow-sm">
                {filteredCopies.map((copy) => (
                  <li
                    key={copy.id}
                    onClick={() => handleSelectCopy(copy)}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    {copy.codigo}
                  </li>
                ))}
                {filteredCopies.length === 0 && (
                  <li className="px-3 py-1 text-gray-500">Sin resultados</li>
                )}
              </ul>
            )}
          </div>

          {selectedCopy && (
            <div className="border border-gray-200 rounded px-3 py-2 bg-gray-50 mt-2">
              <p className="text-sm text-gray-700">
                Ejemplar seleccionado: <strong>{selectedCopy.codigo}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Para modificar el código o el estado, usa el modo editar.
              </p>
            </div>
          )}
        </>
      )}

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