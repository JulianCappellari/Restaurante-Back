import { Request, Response } from 'express';
import { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder, getOrdersByCustomerId } from '../services/orderService';
import { UpdateOrderDTO } from '../dto/order.dto';

export const getAllOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las órdenes: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const createOrderController = async (req: Request, res: Response) => {
    try {
        const newOrder = await createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: `Error al crear la orden: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await getOrderById(Number(id));
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ error: `Orden con ID ${id} no encontrada: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const updateOrderController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UpdateOrderDTO = req.body;  // Usamos el DTO para la actualización
    try {
        const updatedOrder = await updateOrder(Number(id), data);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar la orden con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const deleteOrderController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedOrder = await deleteOrder(Number(id));
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar la orden con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const getOrdersByCustomerIdController = async (req: Request, res: Response) => {
    const { customerId } = req.params;
    try {
      const orders = await getOrdersByCustomerId(Number(customerId));
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener órdenes del cliente" });
    }
};