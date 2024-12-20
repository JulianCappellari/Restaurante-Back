import { Request, Response } from 'express';
import { getAllMenuItems, createMenu, getMenuById, updateMenu, deleteMenuItem } from '../services/menuService';
import { UpdateMenuDTO } from '../dto/menu.dto';

export const getAllMenuItemsController = async (req: Request, res: Response) => {
    try {
        const menuItems = await getAllMenuItems();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener los platos del menú: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const createMenuController = async (req: Request, res: Response) => {
    try {
        const newMenu = await createMenu(req.body);
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ error: `Error al crear el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const getMenuByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const menuItem = await getMenuById(Number(id));
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(404).json({ error: `Plato del menú con ID ${id} no encontrado: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const updateMenuController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UpdateMenuDTO = req.body;  // Usamos el DTO para la actualización
    try {
        const updatedMenuItem = await updateMenu(Number(id), data);
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar el plato del menú con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};

export const deleteMenuItemController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedMenuItem = await deleteMenuItem(Number(id));
        res.status(200).json(deletedMenuItem);
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar el plato del menú con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
