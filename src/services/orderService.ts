import { Model, DataTypes, Optional, Transaction } from 'sequelize';
import sequelize from '../config/dbConfig';
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import OrderItemCustomization from "../models/OrderItemCustomization";
import { CreateOrderDTO, UpdateOrderDTO } from "../dto/order.dto";
import { CreateOrderItemDTO } from "../dto/orderItem.dto";
import OrderModel from "../models/Order";

type OrderState = 'received' | 'preparing' | 'ready' | 'on_the_way' | 'delivered';

interface OrderItemWithPrice extends Omit<CreateOrderItemDTO, 'orderId'> {
  price: number;
}

interface OrderUpdateAttributes {
  id?: number;
  customerId?: number;
  date?: Date | string | any;
  state?: OrderState;
  total_amount?: number;
  deliveryType?: 'in_place' | 'delivery';
  addressId?: number | null;
  paymentType?: 'cash' | 'card' | 'mp';
  paymentMethodId?: number | null;
  items?: any[];
}

// Crear una nueva orden
export const createOrder = async (
  data: CreateOrderDTO
): Promise<{ order: OrderModel; items: OrderItem[] }> => {
  const { items, ...orderData } = data;
  const t = await sequelize.transaction();
  
  try {
    // Calcular el total si no se proporciona
    const totalAmount = orderData.total_amount || items?.reduce((sum, item) => {
      const itemTotal = (item as any).price * item.quantity;
      return sum + itemTotal;
    }, 0) || 0;

    // Crear la orden principal con los campos requeridos
    const newOrder = (await Order.create({
      ...orderData,
      date: orderData.date || new Date(),
      state: (orderData.state === 'preparation' ? 'preparing' : (orderData.state || 'received')),
      total_amount: totalAmount,
      // Asegurar que los campos opcionales tengan valores por defecto
      addressId: orderData.addressId || null,
      paymentMethodId: orderData.paymentMethodId || null,
    }, { transaction: t })) as OrderModel & {
      id: number;
    };

    // Crear los ítems asociados si existen
    let createdItems: OrderItem[] = [];
    if (items && Array.isArray(items)) {
      createdItems = await Promise.all(
        items.map(async (item) => {
          // Cast the item to include price since we know it's there
          const itemWithPrice = item as unknown as OrderItemWithPrice;
          // Extraer las personalizaciones si existen
          const { customizations, ...itemData } = itemWithPrice;
          
          // Crear el ítem de la orden
          const orderItem = await OrderItem.create({
            ...itemData,
            order_id: newOrder.id, // Usar order_id en lugar de orderId
            menu_id: itemWithPrice.menuId, // Usar menu_id en lugar de menuId
            quantity: itemWithPrice.quantity,
            price: itemWithPrice.price,
            notes: itemWithPrice.notes || ''
          }, { transaction: t });
          
          // Si hay personalizaciones, crearlas
          if (customizations && customizations.length > 0) {
            await Promise.all(
              customizations.map(customization => 
                OrderItemCustomization.create({
                  orderItemId: orderItem.id,
                  customizationId: customization.customizationId,
                  isIncluded: customization.isIncluded,
                  notes: customization.notes || ''
                }, { transaction: t })
              )
            );
          }
          
          return orderItem;
        })
      );
    }
    
    // Si todo salió bien, confirmar la transacción
    await t.commit();
    // Puedes devolver la orden y los ítems creados
    return { order: newOrder, items: createdItems };
  } catch (error) {
    // Rollback transaction on error
    if (t) await t.rollback();
    console.error("Error al crear la orden:", error);
    throw new Error(
      `Error al crear la orden: ${
        error instanceof Error ? error.message : "Error inesperado"
      }`
    );
  }
};

// Obtener todas las órdenes
export const getAllOrders = async () => {
  try {
    const orders = await Order.findAll();
    return orders;
  } catch (error) {
    throw new Error(
      `Error al listar las órdenes: ${
        error instanceof Error ? error.message : "Error inesperado"
      }`
    );
  }
};

// Obtener una orden por ID
export const getOrderById = async (id: number) => {
  try {
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem, as: "items" }],
    });
    if (!order) {
      throw new Error(`Orden con ID ${id} no encontrada`);
    }
    return order;
  } catch (error) {
    throw new Error(
      `Error al obtener la orden: ${
        error instanceof Error ? error.message : "Error inesperado"
      }`
    );
  }
};

// Actualizar una orden
// Update order state type to match database model
export const updateOrder = async (id: number, data: OrderUpdateAttributes) => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error(`Orden con ID ${id} no encontrada`);
    }
    const updatedOrder = await order.update(data); // Actualización parcial
    return updatedOrder;
  } catch (error) {
    throw new Error(
      `Error al actualizar la orden: ${
        error instanceof Error ? error.message : "Error inesperado"
      }`
    );
  }
};

// Eliminar una orden
export const deleteOrder = async (id: number) => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error(`Orden con ID ${id} no encontrada`);
    }
    const deletedOrder = await order.destroy();
    return deletedOrder;
  } catch (error) {
    throw new Error(
      `Error al eliminar la orden: ${
        error instanceof Error ? error.message : "Error inesperado"
      }`
    );
  }
};

export const getOrdersByCustomerId = async (customerId: number) => {
  return await Order.findAll({
    where: { customerId },
    include: [{ model: OrderItem, as: "items" }],
  });
};
