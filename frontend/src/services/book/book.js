import axios from "../axiosInstance";

export const getPopularBooks = () => axios.get("/book/popular");
export const getBooksByCategory = (id_categoria) => axios.get(`/book/category/${id_categoria}`);
export const searchBooks = (query) => axios.get(`/book/search`, { params: { q: query } });
export const getBookDetail = (id) => axios.get(`/book/${id}`);
export const createBook = (data) => axios.post("/book", data);
export const updateBook = (id, data) => axios.put(`/book/${id}`, data);
export const deleteBook = (id) => axios.delete(`/book/${id}`);
export const listAllBooks = () => axios.get("/book");