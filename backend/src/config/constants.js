// src/config/constants.js

//Este archivo se centra en estandarizar los valores que nunca van a cambiar en el sistema, y tenerlos todos definidos y organizados en un archivo

// Roles de usuario en el sistema
export const ROLES = Object.freeze({ 
  BIBLIOTECARIO: 'bibliotecario',
  CLIENTE: 'cliente',
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

//tipos de sugerencias que el usuario puede realizar a la biblioteca
export const SUGGESTION_TYPES = Object.freeze({
  LIBRO_RECOMENDADO: 'libro_recomendado',           
  ERROR_EN_CONTENIDO: 'error_en_contenido',        
  MEJORA_VISUAL: 'mejora_visual',                   
  FUNCIONALIDAD_NUEVA: 'funcionalidad_nueva',       
  EXPERIENCIA_USUARIO: 'experiencia_usuario',       
  GESTION_BIBLIOTECA: 'gestion_biblioteca',         
});

//Estados de una reserva en el sistema
export const RESERVATION_STATUS = Object.freeze({
  RESERVADO: 'reservado',
  PRESTADO: 'prestado',
  CANCELADO: "canncelado",
});

//Acciones de una reserva en el sistema (muy similar a los estados)
export const RESERVATION_ACTIONS = Object.freeze({
  RESERVAR: 'reservar',
  PRESTAR: 'prestar',
  CANCELAR: 'cancelar',
});