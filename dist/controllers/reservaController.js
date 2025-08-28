"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingController = exports.updateBookingController = exports.getBookingByIdController = exports.createBookingController = exports.getAllBookingsController = void 0;
const reservaService_1 = require("../services/reservaService");
const getAllBookingsController = async (req, res) => {
    try {
        const bookings = await (0, reservaService_1.getAllBookings)();
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: `Error al obtener todas las reservas: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getAllBookingsController = getAllBookingsController;
const createBookingController = async (req, res) => {
    try {
        const newBooking = await (0, reservaService_1.createBooking)(req.body);
        res.status(201).json(newBooking);
    }
    catch (error) {
        res.status(500).json({ error: `Error al crear la reserva: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.createBookingController = createBookingController;
const getBookingByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await (0, reservaService_1.getBookingById)(Number(id));
        res.status(200).json(booking);
    }
    catch (error) {
        res.status(404).json({ error: `Error al obtener la reserva con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getBookingByIdController = getBookingByIdController;
const updateBookingController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedBooking = await (0, reservaService_1.updateBooking)(Number(id), data);
        res.status(200).json(updatedBooking);
    }
    catch (error) {
        res.status(500).json({ error: `Error al actualizar la reserva con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.updateBookingController = updateBookingController;
const deleteBookingController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await (0, reservaService_1.deleteBooking)(Number(id));
        res.status(200).json(deletedBooking);
    }
    catch (error) {
        res.status(500).json({ error: `Error al eliminar la reserva con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.deleteBookingController = deleteBookingController;
