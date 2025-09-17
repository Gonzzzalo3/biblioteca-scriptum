// src/config/constants.js

//Este archivo se centra en estandarizar los valores que nunca van a cambiar en el sistema, y tenerlos todos definidos y organizados en un archivo

// Roles de usuario en el sistema
export const ROLES = Object.freeze({ 
  BIBLIOTECARIO: 'bibliotecario',
  USUARIO: 'cliente',
});

// Estados de un usuario en el sistema
export const USER_STATUS = Object.freeze({
  ACTIVO: 'activo',
  INACTIVO: 'inactivo',
  SUSPENDIDO: 'suspendido',
});

// Estados de un ejemplar en el sistema
export const EXEMPLARY_STATUS = Object.freeze({
  DISPONIBLE: 'disponible',
  PRESTADO: 'prestado',
  RESERVADO: 'reservado',
  NO_DISPONIBLE: 'no_disponible',
});
