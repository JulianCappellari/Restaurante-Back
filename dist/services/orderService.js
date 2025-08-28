"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByCustomerId = exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const OrderItem_1 = __importDefault(require("../models/OrderItem"));
// Crear una nueva orden
const createOrder = async (data) => {
    const { items, ...orderData } = data;
    try {
        // Crear la orden principal
        const newOrder = (await Order_1.default.create(orderData));
        // Crear los ítems asociados si existen
        let createdItems = [];
        if (items && Array.isArray(items)) {
            createdItems = await Promise.all(items.map(async (item) => {
                return await OrderItem_1.default.create({
                    ...item,
                    orderId: newOrder.id,
                });
            }));
        }
        // Puedes devolver la orden y los ítems creados
        return { order: newOrder, items: createdItems };
    }
    catch (error) {
        console.error("Error real al crear la orden:", error);
        throw new Error(`Error al crear la orden: ${error instanceof Error ? error.message : "Error inesperado"}`);
    }
};
exports.createOrder = createOrder;
// Obtener todas las órdenes
const getAllOrders = async () => {
    try {
        const orders = await Order_1.default.findAll();
        return orders;
    }
    catch (error) {
        throw new Error(`Error al listar las órdenes: ${error instanceof Error ? error.message : "Error inesperado"}`);
    }
};
exports.getAllOrders = getAllOrders;
// Obtener una orden por ID
const getOrderById = async (id) => {
    try {
        const order = await Order_1.default.findByPk(id, {
            include: [{ model: OrderItem_1.default, as: "items" }],
        });
        if (!order) {
            throw new Error(`Orden con ID ${id} no encontrada`);
        }
        return order;
    }
    catch (error) {
        throw new Error(`Error al obtener la orden: ${error instanceof Error ? error.message : "Error inesperado"}`);
    }
};
exports.getOrderById = getOrderById;
// Actualizar una orden
const updateOrder = async (id, data) => {
    try {
        const order = await Order_1.default.findByPk(id);
        if (!order) {
            throw new Error(`Orden con ID ${id} no encontrada`);
        }
        const updatedOrder = await order.update(data); // Actualización parcial
        return updatedOrder;
    }
    catch (error) {
        throw new Error(`Error al actualizar la orden: ${error instanceof Error ? error.message : "Error inesperado"}`);
    }
};
exports.updateOrder = updateOrder;
// Eliminar una orden
const deleteOrder = async (id) => {
    try {
        const order = await Order_1.default.findByPk(id);
        if (!order) {
            throw new Error(`Orden con ID ${id} no encontrada`);
        }
        const deletedOrder = await order.destroy();
        return deletedOrder;
    }
    catch (error) {
        throw new Error(`Error al eliminar la orden: ${error instanceof Error ? error.message : "Error inesperado"}`);
    }
};
exports.deleteOrder = deleteOrder;
const getOrdersByCustomerId = async (customerId) => {
    return await Order_1.default.findAll({
        where: { customerId },
        include: [{ model: OrderItem_1.default, as: "items" }],
    });
};
exports.getOrdersByCustomerId = getOrdersByCustomerId;
