import { Request, Response } from 'express';
import bookingService from '../services/bookingService';
import { validationResult } from 'express-validator';
import { toDateShift } from '../utils/shift';

export const createBooking = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { userId, numberPeople, tableIds, dateTime } = req.body;

    if (!dateTime) {
      return res.status(400).json({ success: false, message: 'Se requiere dateTime' });
    }
    if (!Array.isArray(tableIds) || tableIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Debes pasar al menos una mesa (tableIds)' });
    }

    const { date, shift } = toDateShift(dateTime);

    const booking = await bookingService.createBooking({
      userId,
      date,
      shift,
      numberPeople,
      tableIds,
      status: 'confirmed',
    });

    return res.status(201).json({ success: true, message: 'Reserva creada', data: booking });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Error al crear la reserva' });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.getBookingWithTables(Number(id));
    if (!booking) return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    return res.status(200).json({ success: true, data: booking });
  } catch {
    return res.status(500).json({ success: false, message: 'Error al obtener la reserva' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.cancelBooking(Number(id));
    return res.status(200).json({ success: true, message: 'Reserva cancelada exitosamente', data: booking });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Error al cancelar la reserva' });
  }
};
