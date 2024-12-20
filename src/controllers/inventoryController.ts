import { Request, Response } from 'express';
import { getAllInventories, createInventory, getInventoryById, updateInventory, deleteInventory } from '../services/inventoryService';
import { UpdateInventoryDTO } from '../dto/inventory.dto';

export const getAllInventoriesController = async (req: Request, res: Response) => {
    try {
        const inventories = await getAllInventories();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener todos los inventarios: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const createInventoryController = async (req: Request, res: Response) => {
    try {
        const newInventory = await createInventory(req.body);
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(500).json({ error: `Error al crear el inventario: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const getInventoryByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const inventory = await getInventoryById(Number(id));
        res.status(200).json(inventory);
    } catch (error) {
        res.status(404).json({ error: `Error al obtener el inventario con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};  

export const updateInventoryController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UpdateInventoryDTO = req.body;  // Usamos el DTO para actualizar
    try {
        const updatedInventory = await updateInventory(Number(id), data);
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar el inventario con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const deleteInventoryController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedInventory = await deleteInventory(Number(id));
        res.status(200).json(deletedInventory);
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar el inventario con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
