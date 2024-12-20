import Inventory from '../models/Inventory';
import { CreateInventoryDTO, UpdateInventoryDTO } from "../dto/inventory.dto";

export const createInventory = async (data: CreateInventoryDTO) => {
    try {
        const newInventory = await Inventory.create({
            name: data.name,
            amount: data.amount,
            minimumThreshold: data.minimumThreshold,
        });
        return newInventory;
    } catch (error) {
        throw new Error(`Error al crear el inventario : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

export const getAllInventories = async () => {
    try {
        const inventories = await Inventory.findAll();
        return inventories;
    } catch (error) {
        throw new Error(`Error al listar los inventarios: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

export const getInventoryById = async (id: number) => {
    try {
        const inventory = await Inventory.findByPk(id);
        if (!inventory) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        return inventory;
    } catch (error) {
        throw new Error(`Error al buscar el inventario : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

export const updateInventory = async (id: number, data: UpdateInventoryDTO) => {
    try {
        const inventory = await Inventory.findByPk(id);
        if (!inventory) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        const updatedInventory = await inventory.update(data);  // Actualización parcial
        return updatedInventory;
    } catch (error) {
        throw new Error(`Error al actualizar el inventario : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

export const deleteInventory = async (id: number) => {
    try {
        const inventory = await Inventory.findByPk(id);
        if (!inventory) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        const deletedInventory = await inventory.destroy();
        return deletedInventory;
    } catch (error) {
        throw new Error(`Error al eliminar el inventario : ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
