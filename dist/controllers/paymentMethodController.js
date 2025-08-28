"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentMethod = exports.updatePaymentMethod = exports.getPaymentMethodsByUser = exports.getPaymentMethods = exports.createPaymentMethod = void 0;
const paymentMethodService_1 = __importDefault(require("../services/paymentMethodService"));
const createPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await paymentMethodService_1.default.create(req.body);
        res.status(201).json(paymentMethod);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear el método de pago", error });
    }
};
exports.createPaymentMethod = createPaymentMethod;
const getPaymentMethods = async (_req, res) => {
    try {
        const paymentMethods = await paymentMethodService_1.default.findAll();
        res.json(paymentMethods);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener los métodos de pago", error });
    }
};
exports.getPaymentMethods = getPaymentMethods;
const getPaymentMethodsByUser = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        if (isNaN(userId))
            return res.status(400).json({ message: "ID de usuario inválido" });
        const paymentMethods = await paymentMethodService_1.default.findByUser(userId);
        res.json(paymentMethods);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener los métodos de pago", error });
    }
};
exports.getPaymentMethodsByUser = getPaymentMethodsByUser;
const updatePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await paymentMethodService_1.default.update(Number(req.params.id), req.body);
        if (!paymentMethod)
            return res.status(404).json({ message: "Método de pago no encontrado" });
        res.json(paymentMethod);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar el método de pago", error });
    }
};
exports.updatePaymentMethod = updatePaymentMethod;
const deletePaymentMethod = async (req, res) => {
    try {
        const deleted = await paymentMethodService_1.default.delete(Number(req.params.id));
        if (!deleted)
            return res.status(404).json({ message: "Método de pago no encontrado" });
        res.json({ message: "Método de pago eliminado" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar el método de pago", error });
    }
};
exports.deletePaymentMethod = deletePaymentMethod;
