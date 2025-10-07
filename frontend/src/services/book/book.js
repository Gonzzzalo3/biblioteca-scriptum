import axios from "../axiosInstance"; // Instancia con baseURL y token gestionado automáticamente

// Obtiene los libros más populares del sistema
export const getPopularBooks = () =>
  axios.get("/book/popular");

// Obtiene libros filtrados por categoría
export const getBooksByCategory = (id_categoria) =>
  axios.get(`/book/category/${id_categoria}`);

// Realiza búsqueda de libros por texto
export const searchBooks = (query) =>
  axios.get("/book/search", { params: { q: query } });

// Obtiene los detalles completos de un libro por ID
export const getBookDetail = (id) =>
  axios.get(`/book/${id}`);

// Crea un nuevo libro en el sistema (requiere permisos de bibliotecario)
export const createBook = (formData) =>
  axios.post("/book", formData);

// Actualiza los datos de un libro existente
export const updateBook = (id, data) =>
  axios.put(`/book/${id}`, data);

// Elimina un libro del sistema
export const deleteBook = (id) =>
  axios.delete(`/book/${id}`);

// Lista todos los libros disponibles (uso administrativo)
export const listAllBooks = async () => {
  const res = await axios.get("/book");
  return res.data;
};