import Order from '../models/Order';
import { CreateOrderDTO, UpdateOrderDTO } from '../dto/order.dto';

// Crear una nueva orden
export const createOrder = async (data: CreateOrderDTO) => {
    try {
        const newOrder = await Order.create({
            customerId: data.customerId,
            date: data.date,
            state: data.state,
            total_amount: data.total_amount,
        });
        return newOrder;
    } catch (error) {
        throw new Error(`Error al crear la orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Obtener todas las órdenes
export const getAllOrders = async () => {
    try {
        const orders = await Order.findAll();
        return orders;
    } catch (error) {
        throw new Error(`Error al listar las órdenes: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Obtener una orden por ID
export const getOrderById = async (id: number) => {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new Error(`Orden con ID ${id} no encontrada`);
        }
        return order;
    } catch (error) {
        throw new Error(`Error al obtener la orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Actualizar una orden
export const updateOrder = async (id: number, data: UpdateOrderDTO) => {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new Error(`Orden con ID ${id} no encontrada`);
        }
        const updatedOrder = await order.update(data);  // Actualización parcial
        return updatedOrder;
    } catch (error) {
        throw new Error(`Error al actualizar la orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Eliminar una orden
export const deleteOrder = async (id: number) => {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new Error(`Orden con ID ${id} no encontrada`);
        }
        const deletedOrder = await order.destroy();
        return deletedOrder;
    } catch (error) {
        throw new Error(`Error al eliminar la orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
