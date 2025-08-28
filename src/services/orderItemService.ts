import { Transaction } from 'sequelize';
import OrderItem from '../models/OrderItem';
import OrderItemCustomization from '../models/OrderItemCustomization';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '../dto/orderItem.dto';
import { getDishCustomizationById } from './dishCustomizationService';

// Helper para calcular el precio total con personalizaciones
const calculateItemPrice = async (menuId: number | null, customizations: Array<{ customizationId: number; isIncluded: boolean; notes?: string }> = []) => {
    if (menuId === null) {
        throw new Error('No se puede calcular el precio sin un menu_id válido');
    }
    // Obtener el precio base del menú
    const menuItem = await OrderItem.sequelize?.models.Menu.findByPk(menuId) as any;
    if (!menuItem) {
        throw new Error('Plato del menú no encontrado');
    }

    let totalPrice = Number(menuItem.price);
    const appliedCustomizations = [];

    // Sumar el precio de las personalizaciones seleccionadas
    for (const custom of customizations) {
        const customization = await getDishCustomizationById(custom.customizationId);
        if (!customization) {
            throw new Error(`Personalización con ID ${custom.customizationId} no encontrada`);
        }
        
        if (custom.isIncluded && !customization.isDefaultIncluded) {
            totalPrice += Number(customization.additionalPrice);
        } else if (!custom.isIncluded && customization.isDefaultIncluded) {
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
export const createOrderItem = async (data: CreateOrderItemDTO, transaction?: Transaction) => {
    const t = transaction || await OrderItem.sequelize?.transaction();
    
    try {
        const { customizations, ...itemData } = data;
        
        // Calcular el precio total con las personalizaciones
        const { totalPrice } = await calculateItemPrice(itemData.menuId, customizations);
        
        // Crear el ítem de la orden
        const newItem = await OrderItem.create({
            ...itemData,
            price: totalPrice
        }, { transaction: t });

        // Crear las personalizaciones del ítem si existen
        if (customizations && customizations.length > 0) {
            const itemCustomizations = customizations.map(custom => ({
                ...custom,
                orderItemId: newItem.id
            }));
            
            await OrderItemCustomization.bulkCreate(itemCustomizations, { transaction: t });
        }

        if (!transaction) await t?.commit();
        
        // Obtener el ítem con sus relaciones
        const result = await getOrderItemById(newItem.id, transaction);
        return result;
    } catch (error) {
        if (!transaction) await t?.rollback();
        throw new Error(`Error al crear el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Obtener todos los ítems de orden con sus personalizaciones
export const getAllOrderItems = async () => {
    try {
        const items = await OrderItem.findAll({
            include: [
                {
                    model: OrderItem.sequelize?.models.Menu,
                    as: 'menu',
                    attributes: ['nameDish', 'imageUrl']
                },
                {
                    model: OrderItemCustomization,
                    as: 'customizations',
                    include: [
                        {
                            model: OrderItem.sequelize?.models.DishCustomization,
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
    } catch (error) {
        throw new Error(`Error al listar los ítems de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Obtener un ítem de orden por ID con sus personalizaciones
export const getOrderItemById = async (id: number, transaction?: Transaction) => {
    try {
        const item = await OrderItem.findByPk(id, {
            include: [
                {
                    model: OrderItem.sequelize?.models.Menu,
                    as: 'menu',
                    attributes: ['nameDish', 'imageUrl']
                },
                {
                    model: OrderItemCustomization,
                    as: 'customizations',
                    include: [
                        {
                            model: OrderItem.sequelize?.models.DishCustomization,
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
            customizations: plainItem.customizations?.map((c: any) => ({
                ...c,
                name: c.customization?.name,
                additionalPrice: c.customization?.additionalPrice
            }))
        };
    } catch (error) {
        throw new Error(`Error al obtener el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Actualizar un ítem de orden con sus personalizaciones
export const updateOrderItem = async (id: number, data: UpdateOrderItemDTO, transaction?: Transaction) => {
    const t = transaction || await OrderItem.sequelize?.transaction();
    
    try {
        const { customizations, ...itemData } = data;
        const item = await OrderItem.findByPk(id, { transaction: t });
        
        if (!item) {
            throw new Error(`Ítem de orden con ID ${id} no encontrado`);
        }

        // Si hay cambios en las personalizaciones, recalcular el precio
        if (customizations) {
            if (!item.menu_id) {
                throw new Error('No se puede actualizar las personalizaciones sin un menu_id válido');
            }
            
            const { totalPrice } = await calculateItemPrice(item.menu_id, customizations);
            (itemData as any).price = totalPrice;  // Cast to any to bypass TypeScript error
            
            // Eliminar las personalizaciones existentes
            await OrderItemCustomization.destroy({
                where: { order_item_id: id },
                transaction: t
            });
            
            // Crear las nuevas personalizaciones
            if (customizations.length > 0) {
                const itemCustomizations = customizations.map(custom => ({
                    ...custom,
                    order_item_id: id  // Using snake_case to match database column
                }));
                
                await OrderItemCustomization.bulkCreate(itemCustomizations, { transaction: t });
            }
        }

        const updatedItem = await item.update(itemData, { transaction: t });
        
        if (!transaction) await t?.commit();
        
        // Obtener el ítem actualizado con sus relaciones
        const result = await getOrderItemById(updatedItem.id, transaction);
        return result;
    } catch (error) {
        if (!transaction) await t?.rollback();
        throw new Error(`Error al actualizar el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Eliminar un ítem de orden
export const deleteOrderItem = async (id: number) => {
    try {
        const item = await OrderItem.findByPk(id);
        if (!item) {
            throw new Error(`Ítem de orden con ID ${id} no encontrado`);
        }
        await item.destroy();
        return { message: `Ítem de orden con ID ${id} eliminado` };
    } catch (error) {
        throw new Error(`Error al eliminar el ítem de orden: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
