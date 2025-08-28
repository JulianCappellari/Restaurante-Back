"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventory = exports.updateInventory = exports.getInventoryById = exports.getAllInventories = exports.createInventory = void 0;
const Inventory_1 = __importDefault(require("../models/Inventory"));
const createInventory = async (data) => {
    try {
        const newInventory = await Inventory_1.default.create({
            name: data.name,
            amount: data.amount,
            minimumThreshold: data.minimumThreshold,
        });
        return newInventory;
    }
    catch (error) {
        throw new Error(`Error al crear el inventario : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.createInventory = createInventory;
const getAllInventories = async () => {
    try {
        const inventories = await Inventory_1.default.findAll();
        return inventories;
    }
    catch (error) {
        throw new Error(`Error al listar los inventarios: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getAllInventories = getAllInventories;
const getInventoryById = async (id) => {
    try {
        const inventory = await Inventory_1.default.findByPk(id);
        if (!inventory) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        return inventory;
    }
    catch (error) {
        throw new Error(`Error al buscar el inventario : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getInventoryById = getInventoryById;
const updateInventory = async (id, data) => {
    try {
        const inventory = await Inventory_1.default.findByPk(id);
        if (!inventory) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        const updatedInventory = await inventory.update(data); // Actualización parcial
        return updatedInventory;
    }
    catch (error) {
        throw new Error(`Error al actualizar el inventario : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.updateInventory = updateInventory;
const deleteInventory = async (id) => {
    try {
        const inventory = await Inventory_1.default.findByPk(id);
        if (!inventory) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        const deletedInventory = await inventory.destroy();
        return deletedInventory;
    }
    catch (error) {
        throw new Error(`Error al eliminar el inventario : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.deleteInventory = deleteInventory;
