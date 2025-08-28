"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByCustomerIdController = exports.deleteOrderController = exports.updateOrderController = exports.getOrderByIdController = exports.createOrderController = exports.getAllOrdersController = void 0;
const orderService_1 = require("../services/orderService");
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await (0, orderService_1.getAllOrders)();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: `Error al obtener las órdenes: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getAllOrdersController = getAllOrdersController;
const createOrderController = async (req, res) => {
    try {
        const newOrder = await (0, orderService_1.createOrder)(req.body);
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: `Error al crear la orden: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.createOrderController = createOrderController;
const getOrderByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await (0, orderService_1.getOrderById)(Number(id));
        res.status(200).json(order);
    }
    catch (error) {
        res.status(404).json({ error: `Orden con ID ${id} no encontrada: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getOrderByIdController = getOrderByIdController;
const updateOrderController = async (req, res) => {
    const { id } = req.params;
    const data = req.body; // Usamos el DTO para la actualización
    try {
        const updatedOrder = await (0, orderService_1.updateOrder)(Number(id), data);
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ error: `Error al actualizar la orden con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.updateOrderController = updateOrderController;
const deleteOrderController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await (0, orderService_1.deleteOrder)(Number(id));
        res.status(200).json(deletedOrder);
    }
    catch (error) {
        res.status(500).json({ error: `Error al eliminar la orden con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.deleteOrderController = deleteOrderController;
const getOrdersByCustomerIdController = async (req, res) => {
    const { customerId } = req.params;
    try {
        const orders = await (0, orderService_1.getOrdersByCustomerId)(Number(customerId));
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener órdenes del cliente" });
    }
};
exports.getOrdersByCustomerIdController = getOrdersByCustomerIdController;
