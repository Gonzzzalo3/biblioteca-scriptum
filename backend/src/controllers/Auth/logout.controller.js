// src/controllers/auth/logout.controller.js

//Este controlador maneja el cierre de sesión de los usuarios.
//Su función principal es eliminar la cookie que contiene el refresh token,
//asegurando que ya no se pueda renovar la sesión. 
//De esta manera se invalida la persistencia de la autenticación en el cliente.

export async function logoutController(req, res) {
  try {
    //se elimina la cookie del refresh token
    res.clearCookie("refreshToken", {
      httpOnly: true, //no accesible desde JS en el navegador
      secure: true,   //solo se envía por HTTPS
      sameSite: "Strict" //previene ataques CSRF
    });

    //respuesta exitosa al cliente
    return res.status(200).json({ mensaje: "Sesión cerrada correctamente." });
  } catch (error) {
    //si ocurre un error inesperado, se registra y se devuelve error 500
    console.error("Error en logout:", error);
    return res.status(500).json({ mensaje: "Error al cerrar sesión." });
  }
}