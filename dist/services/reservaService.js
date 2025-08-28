"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.getBookingById = exports.getAllBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const createBooking = async (data) => {
    try {
        const newBooking = await Booking_1.default.create({
            bookingDate: data.bookingDate,
            numberPeople: data.numberPeople,
            tableNumber: data.tableNumber,
            userId: data.userId
        });
        return newBooking;
    }
    catch (error) {
        throw new Error(`Error al crear la reserva : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.createBooking = createBooking;
const getAllBookings = async () => {
    try {
        const bookings = await Booking_1.default.findAll();
        return bookings;
    }
    catch (error) {
        throw new Error(`Error al listar las reservas: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getAllBookings = getAllBookings;
const getBookingById = async (id) => {
    try {
        const booking = await Booking_1.default.findByPk(id);
        if (!booking) {
            throw new Error(`Reserva con ID ${id} no encontrada`);
        }
        return booking;
    }
    catch (error) {
        throw new Error(`Error al buscar la reserva : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getBookingById = getBookingById;
const updateBooking = async (id, data) => {
    try {
        const booking = await Booking_1.default.findByPk(id);
        if (!booking) {
            throw new Error(`Reserva con ID ${id} no encontrada`);
        }
        const updatedBooking = await booking.update(data);
        return updatedBooking;
    }
    catch (error) {
        throw new Error(`Error al actualizar la reserva : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (id) => {
    try {
        const booking = await Booking_1.default.findByPk(id);
        if (!booking) {
            throw new Error(`Reserva con ID ${id} no encontrada`);
        }
        const deletedBooking = await booking.destroy();
        return deletedBooking;
    }
    catch (error) {
        throw new Error(`Error al eliminar la reserva : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.deleteBooking = deleteBooking;
