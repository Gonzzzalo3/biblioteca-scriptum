// src/middlewares/authorizeRole.js

export function authorizeRole(...rolesPermitidos) {
  return (req, res, next) => {
    const { rol } = req.usuario; 

    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado por rol.' });
    }

    next();
  };
}