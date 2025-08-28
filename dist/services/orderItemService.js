"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderItem = exports.updateOrderItem = exports.getOrderItemById = exports.getAllOrderItems = exports.createOrderItem = void 0;
const OrderItem_1 = __importDefault(require("../models/OrderItem"));
const OrderItemCustomization_1 = __importDefault(require("../models/OrderItemCustomization"));
const dishCustomizationService_1 = require("./dishCustomizationService");
// Helper para calcular el precio total con personalizaciones
const calculateItemPrice = async (menuId, customizations = []) => {
    if (menuId === null) {
        throw new Error('No se puede calcular el precio sin un menu_id válido');
    }
    // Obtener el precio base del menú
    const menuItem = await OrderItem_1.default.sequelize?.models.Menu.findByPk(menuId);
    if (!menuItem) {
        throw new Error('Plato del menú no encontrado');
    }
    let totalPrice = Number(menuItem.price);
    const appliedCustomizations = [];
    // Sumar el precio de las personalizaciones seleccionadas
    for (const custom of customizations) {
        const customization = await (0, dishCustomizationService_1.getDishCustomizationById)(custom.customizationId);
        if (!customization) {
            throw new Error(`Personalización con ID ${custom.customizationId} no encontrada`);
        }
        if (custom.isIncluded && !customization.isDefaultIncluded) {
            totalPrice += Number(customization.additionalPrice);
        }
        else if (!custom.isIncluded && customization.isDefaultIncluded) {
            // No restamos el precio si es una personalización por defecto que se está eliminando
            // ya que el precio base ya la incluye
        }
        appliedCustomizations.push({
            ...customization.toJSON(),
            isIncluded: custom.isIncluded,
            notes: custom.notes
        });
    }
    return { totalPrice, appliedCustomizations };
};
// Crear un nuevo ítem de orden con sus personalizaciones
const createOrderItem = async (data, transaction) => {
    const t = transaction || await OrderItem_1.default.sequelize?.transaction();
    try {
        const { customizations, ...itemData } = data;
        // Calcular el precio total con las personalizaciones
        const { totalPrice } = await calculateItemPrice(itemData.menuId, customizations);
        // Crear el ítem de la orden
        const newItem = await OrderItem_1.default.create({
            ...itemData,
            price: totalPrice
        }, { transaction: t });
        // Crear las personalizaciones del ítem si existen
        if (customizations && customizations.length > 0) {
            const itemCustomizations = customizations.map(custom => ({
                ...custom,
                orderItemId: newItem.id
            }));
            await OrderItemCustomization_1.default.bulkCreate(itemCustomizations, { transaction: t });
        }
        if (!transaction)
            await t?.commit();
        // Obtener el ítem con sus relaciones
        const result = await (0, exports.getOrderItemById)(newItem.id, transaction);
        return result;
    }
    catch (error) {
        if (!transaction)
            await t?.rollback();
        throw new Error(`Error al crear el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.createOrderItem = createOrderItem;
// Obtener todos los ítems de orden con sus personalizaciones
const getAllOrderItems = async () => {
    try {
        const items = await OrderItem_1.default.findAll({
            include: [
                {
                    model: OrderItem_1.default.sequelize?.models.Menu,
                    as: 'menu',
                    attributes: ['nameDish', 'imageUrl']
                },
                {
                    model: OrderItemCustomization_1.default,
                    as: 'customizations',
                    include: [
                        {
                            model: OrderItem_1.default.sequelize?.models.DishCustomization,
                            as: 'customization',
                            attributes: ['name', 'additionalPrice']
                        }
                    ]
                }
            ]
        });
        return items.map(item => {
            const plainItem = item.get({ plain: true });
            return {
                ...plainItem,
                customizations: plainItem.customizations?.map(c => ({
                    ...c,
                    name: c.customization?.name,
                    additionalPrice: c.customization?.additionalPrice
                }))
            };
        });
    }
    catch (error) {
        throw new Error(`Error al listar los ítems de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getAllOrderItems = getAllOrderItems;
// Obtener un ítem de orden por ID con sus personalizaciones
const getOrderItemById = async (id, transaction) => {
    try {
        const item = await OrderItem_1.default.findByPk(id, {
            include: [
                {
                    model: OrderItem_1.default.sequelize?.models.Menu,
                    as: 'menu',
                    attributes: ['nameDish', 'imageUrl']
                },
                {
                    model: OrderItemCustomization_1.default,
                    as: 'customizations',
                    include: [
                        {
                            model: OrderItem_1.default.sequelize?.models.DishCustomization,
                            as: 'customization',
                            attributes: ['name', 'additionalPrice']
                        }
                    ]
                }
            ],
            transaction
        });
        if (!item) {
            throw new Error(`Ítem de orden con ID ${id} no encontrado`);
        }
        const plainItem = item.get({ plain: true });
        return {
            ...plainItem,
            customizations: plainItem.customizations?.map((c) => ({
                ...c,
                name: c.customization?.name,
                additionalPrice: c.customization?.additionalPrice
            }))
        };
    }
    catch (error) {
        throw new Error(`Error al obtener el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getOrderItemById = getOrderItemById;
// Actualizar un ítem de orden con sus personalizaciones
const updateOrderItem = async (id, data, transaction) => {
    const t = transaction || await OrderItem_1.default.sequelize?.transaction();
    try {
        const { customizations, ...itemData } = data;
        const item = await OrderItem_1.default.findByPk(id, { transaction: t });
        if (!item) {
            throw new Error(`Ítem de orden con ID ${id} no encontrado`);
        }
        // Si hay cambios en las personalizaciones, recalcular el precio
        if (customizations) {
            if (!item.menu_id) {
                throw new Error('No se puede actualizar las personalizaciones sin un menu_id válido');
            }
            const { totalPrice } = await calculateItemPrice(item.menu_id, customizations);
            itemData.price = totalPrice; // Cast to any to bypass TypeScript error
            // Eliminar las personalizaciones existentes
            await OrderItemCustomization_1.default.destroy({
                where: { order_item_id: id },
                transaction: t
            });
            // Crear las nuevas personalizaciones
            if (customizations.length > 0) {
                const itemCustomizations = customizations.map(custom => ({
                    ...custom,
                    order_item_id: id // Using snake_case to match database column
                }));
                await OrderItemCustomization_1.default.bulkCreate(itemCustomizations, { transaction: t });
            }
        }
        const updatedItem = await item.update(itemData, { transaction: t });
        if (!transaction)
            await t?.commit();
        // Obtener el ítem actualizado con sus relaciones
        const result = await (0, exports.getOrderItemById)(updatedItem.id, transaction);
        return result;
    }
    catch (error) {
        if (!transaction)
            await t?.rollback();
        throw new Error(`Error al actualizar el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.updateOrderItem = updateOrderItem;
// Eliminar un ítem de orden
const deleteOrderItem = async (id) => {
    try {
        const item = await OrderItem_1.default.findByPk(id);
        if (!item) {
            throw new Error(`Ítem de orden con ID ${id} no encontrado`);
        }
        await item.destroy();
        return { message: `Ítem de orden con ID ${id} eliminado` };
    }
    catch (error) {
        throw new Error(`Error al eliminar el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.deleteOrderItem = deleteOrderItem;
