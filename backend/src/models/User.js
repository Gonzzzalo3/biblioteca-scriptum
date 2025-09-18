// src/models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { ROLES, USER_STATUS } from '../config/constants.js';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    nombres: {
        type: DataTypes.STRING(100), // hasta 100 caracteres
        allowNull: false,
    },

    apellidos: {
        type: DataTypes.STRING(100), // hasta 100 caracteres
        allowNull: false,
    },

    correo: {
        type: DataTypes.STRING(150), // correos largos con subdominios
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },

    celular: {
        type: DataTypes.STRING(15), // máximo 15 dígitos (formato internacional)
        allowNull: true,
        validate: {
            is: /^[0-9]{9,15}$/, // acepta 9 a 15 dígitos
        },
    },

    contraseña: {
        type: DataTypes.STRING(255), // hash bcrypt ocupa ~60 caracteres, 255 es seguro
        allowNull: false,
    },

    rol: {
        type: DataTypes.ENUM(...Object.values(ROLES)),
        allowNull: false,
        defaultValue: ROLES.USUARIO,
    },

    estado: {
        type: DataTypes.ENUM(...Object.values(USER_STATUS)),
        allowNull: false,
        defaultValue: USER_STATUS.ACTIVO,
    },

    img: {
        type: DataTypes.STRING(255), 
        allowNull: true,
    },

    verify_code: {
        type: DataTypes.STRING(10), 
        allowNull: true,
    },

    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    reset_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },

    reset_code_expire: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'users', 
});

User.beforeCreate(async (user) => {
  if (user.contraseña) {
    user.contraseña = await bcrypt.hash(user.contraseña, 10);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed('contraseña')) {
    user.contraseña = await bcrypt.hash(user.contraseña, 10);
  }
});

User.prototype.validarContraseña = function (password) {
  return bcrypt.compare(password, this.contraseña);
};