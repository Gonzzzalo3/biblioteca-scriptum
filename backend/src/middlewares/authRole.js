// src/middlewares/authRole.js

//Este middleware se encarga de verificar si el usuario autenticado
//tiene uno de los roles permitidos para acceder a una ruta específica.
//Si el rol no está autorizado, devuelve un error 403 (acceso denegado).

export function authorizeRole(...rolesPermitidos) {
  return (req, res, next) => {
    const { rol } = req.usuario; //se obtiene el rol del usuario autenticado

    //si el rol del usuario no está dentro de los permitidos, se bloquea el acceso
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado por rol.' });
    }

    //si el rol es válido, se continúa con la siguiente función o controlador
    next();
  };
}