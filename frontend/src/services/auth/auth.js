import axios from "../axiosInstance";

export const login = (credentials) => axios.post("/auth/login", credentials);
export const register = (userData) => axios.post("/auth/register", userData);
export const verifyAccount = () => axios.post("/auth/verify");
export const refreshToken = () => axios.post("/auth/refresh-token");
export const forgotPassword = (email) => axios.post("/auth/forgot-password", { email });
export const verifyResetCode = (code) => axios.post("/auth/verify-reset-code", { code });
export const resetPassword = (data) => axios.post("/auth/reset-password", data);