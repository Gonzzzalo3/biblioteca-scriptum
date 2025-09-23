import { Reservation, Exemplary, Book, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getUserReservationsController(req, res) {
  try {
    const id_usuario = req.usuario.id;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const reservas = await Reservation.findAll({
      where: { id_usuario },
      include: [
        {
          model: Exemplary,
          include: {
            model: Book,
            attributes: ['titulo', 'autor', 'portada']
          }
        },
        {
          model: User,
          attributes: ['nombres', 'apellidos', 'img']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const reservasConUrl = reservas.map(r => {
      const data = r.toJSON();
      const portadaRelativa = data.Exemplary?.Book?.portada?.startsWith('/')
        ? data.Exemplary.Book.portada
        : `/${data.Exemplary?.Book?.portada || ''}`;

      return {
        ...data,
        Exemplary: {
          ...data.Exemplary,
          Book: {
            ...data.Exemplary.Book,
            portadaUrl: data.Exemplary.Book?.portada
              ? `${baseUrl}${portadaRelativa}`
              : `${baseUrl}/covers/default.jpg`
          }
        }
      };
    });

    res.status(200).json({ reservas: reservasConUrl });
  } catch (error) {
    console.error('Error al obtener reservas del usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}