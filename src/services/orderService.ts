import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import { CreateOrderDTO, UpdateOrderDTO } from "../dto/order.dto";
import { CreateOrderItemDTO } from "../dto/orderItem.dto";
import OrderModel from "../models/Order";

// Crear una nueva orden
export const createOrder = async (
  data: CreateOrderDTO
): Promise<{ order: OrderModel; items: OrderItem[] }> => {
  const { items, ...orderData } = data;
  try {
    // Crear la orden principal
    const newOrder = (await Order.create(orderData)) as OrderModel & {
      id: number;
    };

    // Crear los ítems asociados si existen
    let createdItems: OrderItem[] = [];
    if (items && Array.isArray(items)) {
      createdItems = await Promise.all(
        items.map(async (item: Omit<CreateOrderItemDTO, "orderId">) => {
          return await OrderItem.create({
            ...item,
            orderId: newOrder.id,
          });
        })
      );
    }
    // Puedes devolver la orden y los ítems creados
    return { order: newOrder, items: createdItems };
  } catch (error) {
    console.error("Error real al crear la orden:", error);
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
export const updateOrder = async (id: number, data: UpdateOrderDTO) => {
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
