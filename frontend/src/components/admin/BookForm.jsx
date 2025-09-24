import { useEffect, useState } from "react";
import CategoryField from "./categoryField";
import {
  createBook,
  updateBook,
  listAllBooks,
  deleteBook,
} from "../../services/book/book";

export default function BookForm({ mode, onClose }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [isbn, setIsbn] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [stock, setStock] = useState(0);

  // Cargar todos los libros al entrar en modo editar o eliminar
  useEffect(() => {
    if (mode === "edit" || mode === "delete") {
      const fetchBooks = async () => {
        try {
          const data = await listAllBooks();
          setBooks(data.libros || []);
        } catch (err) {
          console.error("Error al listar libros:", err);
        }
      };
      fetchBooks();
    }
  }, [mode]);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    // Usar siempre portadaUrl si existe
    setSelectedImage(book.portadaUrl || null);

    // Rellenar campos para edición
    setTitulo(book.titulo);
    setAutor(book.autor);
    setSinopsis(book.sinopsis);
    setIsbn(book.isbn);
    setIdCategoria(book.id_categoria || book.categoriaId);
    setStock(book.stock || 0);
  };

  const handleSubmit = async () => {
    if (mode === "add") {
      if (!titulo || !autor || !isbn || !idCategoria) {
        alert("Completa todos los campos obligatorios.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("autor", autor);
        formData.append("sinopsis", sinopsis);
        formData.append("isbn", isbn);
        formData.append("id_categoria", idCategoria);
        formData.append("stock", stock);
        if (imageFile) {
          formData.append("portada", imageFile);
        }

        await createBook(formData);
        alert("Libro creado correctamente");
        onClose();
      } catch (error) {
        console.error("Error al crear libro:", error);
        alert("Hubo un error al guardar el libro.");
      }
    } else if (mode === "edit" && selectedBook) {
      try {
        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("autor", autor);
        formData.append("sinopsis", sinopsis);
        formData.append("isbn", isbn);
        formData.append("id_categoria", idCategoria);
        formData.append("stock", stock);
        if (imageFile) {
          formData.append("portada", imageFile);
        }

        await updateBook(selectedBook.id, formData);
        alert("Libro actualizado correctamente");
        onClose();
      } catch (error) {
        console.error("Error al actualizar libro:", error);
        alert("Hubo un error al actualizar el libro.");
      }
    } else if (mode === "delete" && selectedBook) {
      try {
        const confirmDelete = window.confirm(
          `¿Seguro que deseas eliminar el libro "${selectedBook.titulo}"?`
        );
        if (!confirmDelete) return;

        await deleteBook(selectedBook.id);
        alert("Libro eliminado correctamente");
        onClose();
      } catch (error) {
        console.error("Error al eliminar libro:", error);
        alert("Hubo un error al eliminar el libro.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 text-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-32 bg-gray-100 border border-gray-300 rounded shadow-sm flex items-center justify-center overflow-hidden">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Portada"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-500 text-xs">Sin portada</span>
          )}
        </div>

        {(mode === "add" || mode === "edit") && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const preview = URL.createObjectURL(file);
                setSelectedImage(preview);
                setImageFile(file);
              }
            }}
            className="text-xs"
          />
        )}
      </div>

      <div className="flex-1 space-y-4">
        <h3 className="text-sm font-semibold">
          {mode === "add"
            ? "Añadir nuevo libro"
            : mode === "edit"
            ? "Editar libro"
            : "Eliminar libro"}
        </h3>

        {(mode === "edit" || mode === "delete") && (
          <div>
            <label className="block mb-1">Seleccionar libro</label>
            <select
              value={selectedBook?.id || ""}
              onChange={(e) => {
                const book = books.find(
                  (b) => b.id === Number(e.target.value)
                );
                if (book) handleSelectBook(book);
              }}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Selecciona un libro --</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.titulo}
                </option>
              ))}
            </select>
          </div>
        )}

        {(mode === "add" || (mode === "edit" && selectedBook)) && (
          <>
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <CategoryField
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value)}
            />
            <input
              type="text"
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <textarea
              placeholder="Sinopsis"
              value={sinopsis}
              onChange={(e) => setSinopsis(e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
            />
            <input
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Stock inicial"
              value={stock}
              min="0"
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className={`px-3 py-2 text-white rounded ${
              mode === "delete"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {mode === "add"
              ? "Guardar"
              : mode === "edit"
              ? "Actualizar"
              : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}