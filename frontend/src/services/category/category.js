import axios from "../axiosInstance";

export const getAllCategories = () =>
  axios.get("/category").then(res => res.data.categorias);

export const createCategory = (data) =>
  axios.post("/category", data);

export const updateCategory = (id, data) =>
  axios.put(`/category/${id}`, data);

export const deleteCategory = (id) =>
  axios.delete(`/category/${id}`);