// src/models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { ROLES, USER_STATUS } from '../config/constants.js';
import bcrypt from 'bcrypt';

/* 
Modelo de Usuario: representa a las cuentas que se registran en el sistema.
Un usuario puede ser cliente o bibliotecario, y en base a ese rol tendrá permisos distintos.

- Cliente: puede navegar, ver libros, reservarlos, ver perfiles, comentar, etc.
- Bibliotecario: puede suspender usuarios, crear libros, revisar sugerencias de clientes, etc.
*/

export const User = sequelize.define('User', {
    // identificador único autoincremental
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // nombres del usuario
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false, // obligatorio
    },

    // apellidos del usuario
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false, // obligatorio
    },

    // correo electrónico
    correo: {
        type: DataTypes.STRING(150),
        allowNull: false, // obligatorio
        unique: true, // no se puede repetir
        validate: {
            isEmail: true, // debe tener formato de email
        },
    },

    // número de celular
    celular: {
        type: DataTypes.STRING(15),
        allowNull: true, // opcional
        validate: {
            is: /^[0-9]{9,15}$/, // entre 9 y 15 dígitos
        },
    },

    // contraseña (se guarda hasheada con bcrypt)
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false, // obligatorio
    },

    // rol del usuario: cliente o bibliotecario
    rol: {
        type: DataTypes.ENUM(...Object.values(ROLES)),
        allowNull: false,
        defaultValue: ROLES.CLIENTE, // por defecto es cliente
    },

    // estado de la cuenta: activo, inactivo o suspendido
    estado: {
        type: DataTypes.ENUM(...Object.values(USER_STATUS)),
        allowNull: false,
        defaultValue: USER_STATUS.ACTIVO,
    },

    // foto de perfil
    img: {
        type: DataTypes.STRING(255),
        allowNull: true, // puede estar vacío
    },

    // código de verificación (se usa al registrarse)
    verify_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },

    // indica si la cuenta ya fue verificada
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    // código para restablecer contraseña
    reset_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },

    // fecha de expiración del código de restablecimiento
    reset_code_expire: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'users', // nombre de la tabla en la base de datos
});

// Hooks de Sequelize: se ejecutan antes de crear o actualizar un usuario

// Antes de crear un usuario
User.beforeCreate(async (user) => {
  // hashea la contraseña
  if (user.contraseña) {
    user.contraseña = await bcrypt.hash(user.contraseña, 10);
  }

  // hashea el código de verificación si existe
  if (user.verify_code) {
    user.verify_code = await bcrypt.hash(user.verify_code, 10);
  }

  // hashea el código de restablecimiento si existe
  if (user.reset_code) {
    user.reset_code = await bcrypt.hash(user.reset_code, 10);
  }

  // si no se subió imagen, asigna la imagen por defecto
  if (!user.img || user.img.trim() === '') {
    user.img = '/img/usuarios/default.jpg';
  }
});

// Antes de actualizar un usuario
User.beforeUpdate(async (user) => {
  // si cambió la contraseña, la vuelve a hashear
  if (user.changed('contraseña')) {
    user.contraseña = await bcrypt.hash(user.contraseña, 10);
  }

  // si cambió el código de verificación, lo hashea
  if (user.changed('verify_code') && user.verify_code) {
    user.verify_code = await bcrypt.hash(user.verify_code, 10);
  }

  // si cambió el código de restablecimiento, lo hashea
  if (user.changed('reset_code') && user.reset_code) {
    user.reset_code = await bcrypt.hash(user.reset_code, 10);
  }

  // si la imagen se cambió a vacío, asigna la imagen por defecto
  if (user.changed('img') && (!user.img || user.img.trim() === '')) {
    user.img = '/img/usuarios/default.jpg';
  }
});

// Método de instancia: compara una contraseña en texto plano con la hasheada
User.prototype.validarContraseña = function (password) {
  return bcrypt.compare(password, this.contraseña);
};