"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderItemController = exports.updateOrderItemController = exports.getOrderItemByIdController = exports.createOrderItemController = exports.getAllOrderItemsController = void 0;
const orderItemService_1 = require("../services/orderItemService");
const getAllOrderItemsController = async (req, res) => {
    try {
        const items = await (0, orderItemService_1.getAllOrderItems)();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ error: `Error al obtener los ítems de orden: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getAllOrderItemsController = getAllOrderItemsController;
const createOrderItemController = async (req, res) => {
    try {
        const newItem = await (0, orderItemService_1.createOrderItem)(req.body);
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).json({ error: `Error al crear el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.createOrderItemController = createOrderItemController;
const getOrderItemByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await (0, orderItemService_1.getOrderItemById)(Number(id));
        res.status(200).json(item);
    }
    catch (error) {
        res.status(404).json({ error: `Ítem de orden con ID ${id} no encontrado: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getOrderItemByIdController = getOrderItemByIdController;
const updateOrderItemController = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedItem = await (0, orderItemService_1.updateOrderItem)(Number(id), req.body);
        res.status(200).json(updatedItem);
    }
    catch (error) {
        res.status(500).json({ error: `Error al actualizar el ítem de orden con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.updateOrderItemController = updateOrderItemController;
const deleteOrderItemController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await (0, orderItemService_1.deleteOrderItem)(Number(id));
        res.status(200).json(deletedItem);
    }
    catch (error) {
        res.status(500).json({ error: `Error al eliminar el ítem de orden con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.deleteOrderItemController = deleteOrderItemController;
