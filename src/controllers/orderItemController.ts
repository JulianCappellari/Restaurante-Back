import { Request, Response } from 'express';
import { getAllOrderItems, createOrderItem, getOrderItemById, updateOrderItem, deleteOrderItem } from '../services/orderItemService'

export const getAllOrderItemsController = async (req: Request, res: Response) => {
    try {
        const items = await getAllOrderItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener los ítems de orden: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const createOrderItemController = async (req: Request, res: Response) => {
    try {
        const newItem = await createOrderItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: `Error al crear el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const getOrderItemByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const item = await getOrderItemById(Number(id));
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: `Ítem de orden con ID ${id} no encontrado: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const updateOrderItemController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedItem = await updateOrderItem(Number(id), req.body);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar el ítem de orden con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const deleteOrderItemController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedItem = await deleteOrderItem(Number(id));
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar el ítem de orden con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
