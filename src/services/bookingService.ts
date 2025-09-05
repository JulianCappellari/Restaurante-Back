import { Op } from 'sequelize';
import sequelize from '../config/dbConfig';
import Booking from '../models/Booking';
import Table from '../models/Table';
import User from '../models/User';

export interface CreateBookingParams {
  userId: number;
  date: string;                // YYYY-MM-DD
  shift: 'lunch' | 'dinner';
  numberPeople: number;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'no_show' | 'checked_in' | 'completed';
  tableIds: number[];
}

class BookingService {
  async createBooking(data: CreateBookingParams) {
    const tx = await sequelize.transaction();
    try {
      if (!data.tableIds?.length) {
        throw new Error('Debe seleccionar al menos una mesa');
      }

      // Mesas existen y no están en mantenimiento
      const tables = await Table.findAll({
        where: {
          id: { [Op.in]: data.tableIds },
          status: { [Op.ne]: 'maintenance' },
        },
        transaction: tx,
      });
      if (tables.length !== data.tableIds.length) {
        const found = new Set(tables.map(t => t.id));
        const missing = data.tableIds.filter(id => !found.has(id));
        throw new Error(`Mesas inexistentes o en mantenimiento: ${missing.join(', ')}`);
      }

      // Capacidad total
      const totalSeats = tables.reduce((sum, t) => sum + (t.getDataValue('ability') ?? 0), 0);
      if (totalSeats < data.numberPeople) {
        throw new Error(`Capacidad total (${totalSeats}) < personas (${data.numberPeople})`);
      }

      // Colisiones (date, shift, tableId) contra reservas activas
      const collisions = await Booking.count({
        where: {
          date: data.date,
          shift: data.shift,
          status: { [Op.in]: ['confirmed', 'checked_in'] },
        },
        include: [{
          model: Table,
          as: 'assignedTables',
          required: true,
          where: { id: { [Op.in]: data.tableIds } },
          through: { attributes: [] },
        }],
        transaction: tx,
      });
      if (collisions > 0) {
        throw new Error('Alguna de las mesas ya está reservada en ese turno');
      }

      // Crear reserva
      const booking = await Booking.create(
        {
          userId: data.userId,
          date: data.date,
          shift: data.shift,
          numberPeople: data.numberPeople,
          status: data.status ?? 'confirmed',
        },
        { transaction: tx }
      );

      // Asociar mesas (usa el alias — NO uses el pivote directo aquí)
      await booking.addAssignedTables(data.tableIds, { transaction: tx });

      await tx.commit();

      // Retornar con relaciones
      const bookingWithTables = await Booking.findByPk(booking.id, {
        include: [
          { model: Table, as: 'assignedTables', attributes: ['id', 'tableNum', 'ability', 'status'] },
          { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email', 'phone'] },
        ],
      });
      if (!bookingWithTables) throw new Error('Error al recuperar los detalles de la reserva');

      return bookingWithTables;
    } catch (err) {
      await tx.rollback();
      throw err instanceof Error ? err : new Error('Error al crear la reserva');
    }
  }

  async getBookingWithTables(id: number) {
    const booking = await Booking.findByPk(id, {
      include: [
        { model: Table, as: 'assignedTables', attributes: ['id', 'tableNum', 'ability', 'status'] },
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email', 'phone'] },
      ],
    });
    return booking;
  }

  async cancelBooking(id: number) {
    const tx = await sequelize.transaction();
    try {
      const booking = await Booking.findByPk(id, { transaction: tx, lock: tx.LOCK.UPDATE });
      if (!booking) throw new Error('Reserva no encontrada');
      if (booking.status === 'cancelled') throw new Error('La reserva ya está cancelada');

      await booking.update({ status: 'cancelled' }, { transaction: tx });
      await tx.commit();

      return this.getBookingWithTables(id);
    } catch (err) {
      await tx.rollback();
      throw err instanceof Error ? err : new Error('Error al cancelar la reserva');
    }
  }
}

export default new BookingService();
