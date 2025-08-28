"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenu = exports.getMenuById = exports.getAllMenuItems = exports.createMenu = void 0;
const Associations_1 = require("../models/Associations");
// Crear un plato en el menú
const createMenu = async (data) => {
    try {
        const { customizations, ...menuData } = data;
        const newMenu = await Associations_1.Menu.create({
            ...menuData,
            imageUrl: menuData.imageUrl || null
        });
        // Handle customizations if provided
        if (customizations && customizations.length > 0) {
            const customizationsData = customizations.map(customization => ({
                ...customization,
                menuId: newMenu.id
            }));
            await Associations_1.DishCustomization.bulkCreate(customizationsData);
            // Reload the menu with its customizations
            return Associations_1.Menu.findByPk(newMenu.id, {
                include: [{
                        model: Associations_1.DishCustomization,
                        as: 'customizations',
                        where: { isActive: true },
                        required: false
                    }]
            });
        }
        return newMenu;
    }
    catch (error) {
        throw new Error(`Error al crear el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.createMenu = createMenu;
// Obtener todos los platos del menú
const getAllMenuItems = async () => {
    try {
        const menuItems = await Associations_1.Menu.findAll({
            include: [{
                    model: Associations_1.DishCustomization,
                    as: 'customizations',
                    where: { isActive: true },
                    required: false
                }],
            order: [['id', 'ASC']]
        });
        return menuItems;
    }
    catch (error) {
        console.error('Error en getAllMenuItems:', error);
        throw new Error(`Error al listar los platos del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getAllMenuItems = getAllMenuItems;
// Obtener un plato específico por ID
const getMenuById = async (id) => {
    try {
        const menuItem = await Associations_1.Menu.findByPk(id, {
            include: [{
                    model: Associations_1.DishCustomization,
                    as: 'customizations',
                    where: { isActive: true },
                    required: false
                }]
        });
        if (!menuItem) {
            throw new Error(`Plato del menú con ID ${id} no encontrado`);
        }
        return menuItem;
    }
    catch (error) {
        console.error(`Error en getMenuById para ID ${id}:`, error);
        throw new Error(`Error al obtener el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getMenuById = getMenuById;
// Actualizar un plato del menú
const updateMenu = async (id, data) => {
    try {
        const menuItem = await Associations_1.Menu.findByPk(id);
        if (!menuItem) {
            throw new Error(`Plato del menú con ID ${id} no encontrado`);
        }
        const updatedMenuItem = await menuItem.update(data); // Actualización parcial
        return updatedMenuItem;
    }
    catch (error) {
        throw new Error(`Error al actualizar el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.updateMenu = updateMenu;
// Eliminar un plato del menú
const deleteMenuItem = async (id) => {
    try {
        const menuItem = await Associations_1.Menu.findByPk(id);
        if (!menuItem) {
            throw new Error(`Plato del menú con ID ${id} no encontrado`);
        }
        const deletedMenuItem = await menuItem.destroy();
        return deletedMenuItem;
    }
    catch (error) {
        throw new Error(`Error al eliminar el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.deleteMenuItem = deleteMenuItem;
