// src/controllers/auth/logout.controller.js
export async function logoutController(req, res) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict"
    });
    return res.status(200).json({ mensaje: "Sesión cerrada correctamente." });
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({ mensaje: "Error al cerrar sesión." });
  }
}