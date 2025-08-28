import { Sequelize } from 'sequelize';
import sequelize from "../config/dbConfig";
import bcrypt from "bcryptjs";
import User from '../models/User';
import Address from '../models/Address';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Menu from '../models/Menu';
import PaymentMethod from '../models/PaymentMethod';
import DishCustomization from '../models/DishCustomization';
import Table from '../models/Table';
import Booking from '../models/Booking';
import Inventory from '../models/Inventory';
import OrderItemCustomization from '../models/OrderItemCustomization';
// Models will be initialized automatically by Sequelize

async function seedData() {
  try {
    // Initialize and sync all models
    await sequelize.sync({ force: true });
    console.log("Database synchronized");

    // 1. Create Users
    const users = await User.bulkCreate([
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@restaurant.com",
        password: await bcrypt.hash("admin123", 10),
        phone: "+541112345678",
        rol: "Administrator"
      },
      {
        firstName: "John",
        lastName: "Waiter",
        email: "waiter@restaurant.com",
        password: await bcrypt.hash("waiter123", 10),
        phone: "+541112345679",
        rol: "Waiter"
      },
      {
        firstName: "Maria",
        lastName: "Garcia",
        email: "maria@example.com",
        password: await bcrypt.hash("customer123", 10),
        phone: "+541112345670",
        rol: "Customer"
      }
    ]);

    // 2. Create Addresses
    const addresses = await Address.bulkCreate([
      {
        userId: users[2].id, // Maria's address
        street: "Av. Corrientes",
        streetNumber: "1234",
        city: "Buenos Aires",
        province: "Buenos Aires",
        postalCode: "C1043"
      },
      {
        userId: users[2].id, // Maria's second address
        street: "Lavalle",
        streetNumber: "567",
        city: "Buenos Aires",
        province: "Buenos Aires",
        postalCode: "C1047",
        floor: "2",
        apartment: "B"
      }
    ]);

    // 3. Create Payment Methods
    const paymentMethods = await PaymentMethod.bulkCreate([
      {
        userId: users[2].id, // Maria's payment method
        name: "Visa Gold",
        cardNumber: await bcrypt.hash("4111111111111111", 10),
        cardHolderName: "MARIA GARCIA",
        expirationDate: "12/25",
        cvv: await bcrypt.hash("123", 10),
        last4: "1111",
        status: true
      }
    ]);

    // 4. Create Menu Items
    const menus = await Menu.bulkCreate([
      // Main Dishes
      {
        nameDish: "Milanesa Napolitana con Papas Fritas",
        price: 15.99,
        available: true,
        typeDish: 'Plato Principal',
        imageUrl: '/images/milanesa-napolitana.jpg'
      },
      {
        nameDish: "Ravioles de Ricotta y Espinaca",
        price: 14.50,
        available: true,
        typeDish: 'Plato Principal',
        imageUrl: '/images/ravioles-espinaca.jpg'
      },
      {
        nameDish: "Asado de Tira con Ensalada Mixta",
        price: 18.99,
        available: true,
        typeDish: 'Plato Principal',
        imageUrl: '/images/asado-tira.jpg'
      },
      // Appetizers
      {
        nameDish: "Empanadas de Carne (x3)",
        price: 8.50,
        available: true,
        typeDish: 'Entrada',
        imageUrl: '/images/empanadas.jpg'
      },
      // Desserts
      {
        nameDish: "Tiramisú",
        price: 7.50,
        available: true,
        typeDish: 'Postre',
        imageUrl: '/images/tiramisu.jpg'
      },
      // Drinks
      {
        nameDish: "Agua Mineral 500ml",
        price: 2.50,
        available: true,
        typeDish: 'Bebida',
        imageUrl: '/images/agua.jpg'
      }
    ]);

    // 5. Create Dish Customizations
    const customizations = await DishCustomization.bulkCreate([
      // Customizations for Milanesa Napolitana
      {
        menuId: menus[0].id,
        name: "Sin Jamón",
        description: "Se sirve sin jamón",
        isRemovable: true,
        additionalPrice: 0,
        isDefaultIncluded: true,
        isRequired: false
      },
      {
        menuId: menus[0].id,
        name: "Huevo Extra",
        description: "Agregar un huevo frito extra",
        isRemovable: true,
        additionalPrice: 1.50,
        isDefaultIncluded: false,
        isRequired: false
      },
      // Customizations for Ravioles
      {
        menuId: menus[1].id,
        name: "Salsa Extra",
        description: "Porción extra de salsa fileto",
        isRemovable: true,
        additionalPrice: 1.00,
        isDefaultIncluded: false,
        isRequired: false
      }
    ]);

    // 6. Create Tables
    const tables = await Table.bulkCreate([
      { number: 1, capacity: 4, isAvailable: true },
      { number: 2, capacity: 2, isAvailable: true },
      { number: 3, capacity: 6, isAvailable: true },
      { number: 4, capacity: 2, isAvailable: true }
    ]);

    // 7. Create Bookings
    const bookings = await Booking.bulkCreate([
      {
        userId: users[2].id,
        bookingDate: new Date(Date.now() + 86400000), // Tomorrow
        numberPeople: 4,
        status: 'confirmed',
        customerName: 'Maria Garcia',
        customerPhone: users[2].phone,
        notes: 'Mesa cerca de la ventana'
      }
    ]);

    // 8. Create Orders
    const orders = await Order.bulkCreate([
      {
        customerId: users[2].id,
        date: new Date(),
        state: "preparing",
        total_amount: 35.48,
        deliveryType: "delivery",
        addressId: addresses[0].id,
        paymentType: "card",
        paymentMethodId: paymentMethods[0].id
      },
      {
        customerId: users[2].id,
        date: new Date(),
        state: "received",
        total_amount: 24.50,
        deliveryType: "in_place",
        paymentType: "cash"
      }
    ]);

    // 9. Create Order Items
    const orderItems = await OrderItem.bulkCreate([
      // Items for first order
      {
        order_id: orders[0].getDataValue('id'),
        menu_id: menus[0].id, // Milanesa Napolitana
        quantity: 2,
        price: 15.99,
        notes: "Una sin jamón"
      },
      {
        order_id: orders[0].getDataValue('id'),
        menu_id: menus[5].id, // Agua
        quantity: 1,
        price: 2.50,
        notes: "Sin gas"
      },
      // Items for second order
      {
        order_id: orders[1].getDataValue('id'),
        menu_id: menus[1].id, // Ravioles
        quantity: 1,
        price: 14.50,
        notes: "Salsa aparte"
      },
      {
        order_id: orders[1].getDataValue('id'),
        menu_id: menus[4].id, // Tiramisú
        quantity: 1,
        price: 7.50,
        notes: "Para compartir"
      }
    ]);

    // 10. Create Order Item Customizations
    await OrderItemCustomization.bulkCreate([
      {
        orderItemId: orderItems[0].id,
        customizationId: customizations[0].id, // Sin Jamón
        isIncluded: true
      },
      {
        orderItemId: orderItems[0].id,
        customizationId: customizations[1].id, // Huevo Extra
        isIncluded: true
      }
    ]);

    // 11. Create Inventory
    await Inventory.bulkCreate([
      { name: "Carne de Res", amount: 50, unit: "kg", minimumThreshold: 10 },
      { name: "Pollo", amount: 30, unit: "kg", minimumThreshold: 5 },
      { name: "Queso", amount: 20, unit: "kg", minimumThreshold: 5 },
      { name: "Huevos", amount: 120, unit: "unidades", minimumThreshold: 24 }
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
}

// Execute the seed function
seedData();