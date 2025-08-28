"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemController = exports.updateMenuController = exports.getMenuByIdController = exports.createMenuController = exports.getAllMenuItemsController = void 0;
const menuService_1 = require("../services/menuService");
const getAllMenuItemsController = async (req, res) => {
    try {
        const menuItems = await (0, menuService_1.getAllMenuItems)();
        res.status(200).json(menuItems);
    }
    catch (error) {
        res.status(500).json({ error: `Error al obtener los platos del menú: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getAllMenuItemsController = getAllMenuItemsController;
const createMenuController = async (req, res) => {
    try {
        const newMenu = await (0, menuService_1.createMenu)(req.body);
        res.status(201).json(newMenu);
    }
    catch (error) {
        res.status(500).json({ error: `Error al crear el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.createMenuController = createMenuController;
const getMenuByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const menuItem = await (0, menuService_1.getMenuById)(Number(id));
        res.status(200).json(menuItem);
    }
    catch (error) {
        res.status(404).json({ error: `Plato del menú con ID ${id} no encontrado: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getMenuByIdController = getMenuByIdController;
const updateMenuController = async (req, res) => {
    const { id } = req.params;
    const data = req.body; // Usamos el DTO para la actualización
    try {
        const updatedMenuItem = await (0, menuService_1.updateMenu)(Number(id), data);
        res.status(200).json(updatedMenuItem);
    }
    catch (error) {
        res.status(500).json({ error: `Error al actualizar el plato del menú con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.updateMenuController = updateMenuController;
const deleteMenuItemController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMenuItem = await (0, menuService_1.deleteMenuItem)(Number(id));
        res.status(200).json(deletedMenuItem);
    }
    catch (error) {
        res.status(500).json({ error: `Error al eliminar el plato del menú con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.deleteMenuItemController = deleteMenuItemController;
