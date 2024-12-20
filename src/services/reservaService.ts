import Booking from '../models/Booking';
import {CreateReservaDTO} from "../dto/reserva.dto"


export const createBooking = async (data: CreateReservaDTO) => {
    try {
        const newBooking = await Booking.create({
            bookingDate: data.bookingDate,
            numberPeople: data.numberPeople,
            tableNumber: data.tableNumber,
            userId: data.userId
        })
        return newBooking
    } catch (error) {
        throw new Error(`Error al crear la reserva : ${error instanceof Error ? error.message : 'Error inesperado'}`)
    }
}

export const getAllBookings = async () => {
    try {
        const bookings = await Booking.findAll();
        return bookings
    } catch (error) {
        throw new Error(`Error al listar las reservas: ${error instanceof Error ? error.message : 'Error inesperado'}`)
    }
}

export const getBookingById = async (id: number) => {
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            throw new Error(`Reserva con ID ${id} no encontrada`);
          }
        return booking
    } catch (error) {
        throw new Error(`Error al buscar la reserva : ${error instanceof Error ? error.message : 'Error inesperado'}`)
    }
}

export const updateBooking = async (id: number, data: CreateReservaDTO) => {
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            throw new Error(`Reserva con ID ${id} no encontrada`);
          }
        const updatedBooking = await booking.update(data);
        return updatedBooking
    } catch (error) {
        throw new Error(`Error al actualizar la reserva : ${error instanceof Error ? error.message : 'Error inesperado'}`)    
    }
}

export const deleteBooking = async (id: number) => {
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            throw new Error(`Reserva con ID ${id} no encontrada`);
          }
        const deletedBooking = await booking.destroy();
        return deletedBooking
    } catch (error) {
        throw new Error(`Error al eliminar la reserva : ${error instanceof Error ? error.message : 'Error inesperado'}`)    
    }
}