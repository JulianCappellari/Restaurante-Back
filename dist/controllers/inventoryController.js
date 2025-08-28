"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryController = exports.updateInventoryController = exports.getInventoryByIdController = exports.createInventoryController = exports.getAllInventoriesController = void 0;
const inventoryService_1 = require("../services/inventoryService");
const getAllInventoriesController = async (req, res) => {
    try {
        const inventories = await (0, inventoryService_1.getAllInventories)();
        res.status(200).json(inventories);
    }
    catch (error) {
        res.status(500).json({ error: `Error al obtener todos los inventarios: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getAllInventoriesController = getAllInventoriesController;
const createInventoryController = async (req, res) => {
    try {
        const newInventory = await (0, inventoryService_1.createInventory)(req.body);
        res.status(201).json(newInventory);
    }
    catch (error) {
        res.status(500).json({ error: `Error al crear el inventario: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.createInventoryController = createInventoryController;
const getInventoryByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const inventory = await (0, inventoryService_1.getInventoryById)(Number(id));
        res.status(200).json(inventory);
    }
    catch (error) {
        res.status(404).json({ error: `Error al obtener el inventario con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getInventoryByIdController = getInventoryByIdController;
const updateInventoryController = async (req, res) => {
    const { id } = req.params;
    const data = req.body; // Usamos el DTO para actualizar
    try {
        const updatedInventory = await (0, inventoryService_1.updateInventory)(Number(id), data);
        res.status(200).json(updatedInventory);
    }
    catch (error) {
        res.status(500).json({ error: `Error al actualizar el inventario con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.updateInventoryController = updateInventoryController;
const deleteInventoryController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedInventory = await (0, inventoryService_1.deleteInventory)(Number(id));
        res.status(200).json(deletedInventory);
    }
    catch (error) {
        res.status(500).json({ error: `Error al eliminar el inventario con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.deleteInventoryController = deleteInventoryController;
