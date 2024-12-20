import {Request, Response} from 'express'
import { getAllBookings, createBooking, getBookingById, updateBooking, deleteBooking } from '../services/reservaService';



export const getAllBookingsController = async (req: Request, res: Response) => {
    try {
        const bookings = await getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener todas las reservas: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const createBookingController = async (req: Request, res: Response) => {
    try {
        const newBooking = await createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: `Error al crear la reserva: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const getBookingByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const booking = await getBookingById(Number(id));
        res.status(200).json(booking);
    } catch (error) {
        res.status(404).json({ error: `Error al obtener la reserva con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};  

export const updateBookingController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body
    try {
        const updatedBooking = await updateBooking(Number(id), data);
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar la reserva con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const deleteBookingController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedBooking = await deleteBooking(Number(id));
        res.status(200).json(deletedBooking);
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar la reserva con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};