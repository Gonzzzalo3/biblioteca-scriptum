// src/models/index.js
import { sequelize } from '../config/db.js';

// Importación de modelos
import { User } from './User.js';
import { Category } from './Category.js';
import { Book } from './Book.js';
import { Exemplary } from './Exemplary.js';
import { Comment } from './Comment.js';
import { Suggestion } from './Suggestion.js';
import { Recommendation } from './Recommendation.js';
import { Reservation } from './Reservation.js';
import { ReservationEvent } from './ReservationEvent.js';

// Relaciones
Category.hasMany(Book, { foreignKey: 'id_categoria' });
Book.belongsTo(Category, { foreignKey: 'id_categoria' });

User.hasMany(Comment, { foreignKey: 'id_usuario' });
Comment.belongsTo(User, { foreignKey: 'id_usuario' });

Book.hasMany(Comment, { foreignKey: 'id_libro' });
Comment.belongsTo(Book, { foreignKey: 'id_libro' });

Book.hasMany(Exemplary, { foreignKey: 'id_libro' });
Exemplary.belongsTo(Book, { foreignKey: 'id_libro' });

User.hasMany(Recommendation, { foreignKey: 'id_usuario' });
Recommendation.belongsTo(User, { foreignKey: 'id_usuario' });

Book.hasMany(Recommendation, { foreignKey: 'id_libro' });
Recommendation.belongsTo(Book, { foreignKey: 'id_libro' });

User.hasMany(Reservation, { foreignKey: 'id_usuario' });
Reservation.belongsTo(User, { foreignKey: 'id_usuario' });

Exemplary.hasMany(Reservation, { foreignKey: 'id_ejemplar' });
Reservation.belongsTo(Exemplary, { foreignKey: 'id_ejemplar' });

Reservation.hasMany(ReservationEvent, { foreignKey: 'id_reserva' });
ReservationEvent.belongsTo(Reservation, { foreignKey: 'id_reserva' });

User.hasMany(Suggestion, { foreignKey: 'id_usuario' });
Suggestion.belongsTo(User, { foreignKey: 'id_usuario' });

// Exportación centralizada
export {
  sequelize,
  User,
  Category,
  Book,
  Exemplary,
  Comment,
  Suggestion,
  Recommendation,
  Reservation,
  ReservationEvent,
};