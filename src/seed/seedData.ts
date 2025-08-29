// src/seed/seed.ts
import bcrypt from 'bcrypt';
import sequelize from '../config/dbConfig';

// Carga modelos y asociaciones (Menu.initialize, DishCustomization.initialize, etc.)
import '../models/Associations';

import User from '../models/User';
import Address from '../models/Address';
import PaymentMethod from '../models/PaymentMethod';
import Table from '../models/Table';
import Inventory from '../models/Inventory';
import Menu from '../models/Menu';
import DishCustomization from '../models/DishCustomization';
import Booking from '../models/Booking';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import OrderItemCustomization from '../models/OrderItemCustomization';

async function seed() {
  try {
    // Limpiar base (usa los nombres reales de tablas en tu MySQL)
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    const drops = [
      'order_item_customizations',
      'order_items',
      'orders',
      'bookings',
      'dish_customizations',
      'inventory',
      'payment_methods',
      'addresses',
      'menus',
      'tables',
      'users',
    ];
    for (const t of drops) await sequelize.query(`DROP TABLE IF EXISTS \`${t}\`;`);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    // Crear todas las tablas desde modelos + asociaciones
    await sequelize.sync({ force: true });
    console.log('✓ Tablas sincronizadas');

    // --- Usuarios ---
    const [adminPass, waiterPass, custPass] = await Promise.all([
      bcrypt.hash('admin123', 10),
      bcrypt.hash('waiter123', 10),
      bcrypt.hash('customer123', 10),
    ]);

    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@restaurant.com',
      phone: '+541111111111',
      password: adminPass,
      rol: 'Administrator',
    });

    const waiter = await User.create({
      firstName: 'John',
      lastName: 'Waiter',
      email: 'waiter@restaurant.com',
      phone: '+541122222222',
      password: waiterPass,
      rol: 'Waiter',
    });

    const customer = await User.create({
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria@example.com',
      phone: '+541133333333',
      password: custPass,
      rol: 'Customer',
    });
    console.log('✓ Users');

    // --- Direcciones ---
    const addr1 = await Address.create({
      userId: customer.id,
      street: 'Av. Corrientes',
      streetNumber: '1234',
      city: 'Buenos Aires',
      province: 'Buenos Aires',
      postalCode: 'C1043',
    });

    const addr2 = await Address.create({
      userId: customer.id,
      street: 'Lavalle',
      streetNumber: '567',
      city: 'Buenos Aires',
      province: 'Buenos Aires',
      postalCode: 'C1047',
      floor: '2',
      apartment: 'B',
    });
    console.log('✓ Addresses');

    // --- Métodos de pago del usuario ---
    const rawCard = '4111111111111111';
    const rawCvv = '123';
    const pm1 = await PaymentMethod.create({
      name: 'Visa Gold',
      type: 'card',          // ← nuevo campo
      isDefault: true,       // ← nuevo campo (default entre métodos guardados)
      cardHolderName: 'MARIA GARCIA',
      cardNumber: await bcrypt.hash(rawCard, 10),
      last4: rawCard.slice(-4),
      expirationDate: '12/26',
      cvv: await bcrypt.hash(rawCvv, 10),
      status: true,
      userId: customer.id,
    });
    console.log('✓ PaymentMethods');

    // --- Mesas ---
    await Promise.all([
      Table.create({ tableNum: 1, ability: 4, state: 'available' }),
      Table.create({ tableNum: 2, ability: 2, state: 'reserved' }),
      Table.create({ tableNum: 3, ability: 6, state: 'available' }),
    ]);
    console.log('✓ Tables');

    // --- Inventario ---
    await Promise.all([
      Inventory.create({ name: 'Tomatoes', amount: 100, minimumThreshold: 20 }),
      Inventory.create({ name: 'Cheese', amount: 50, minimumThreshold: 10 }),
      Inventory.create({ name: 'Olive Oil', amount: 30, minimumThreshold: 5 }),
    ]);
    console.log('✓ Inventory');

    // --- Menú (sin timestamps en tu modelo de Menu) ---
    const milanesa = await Menu.create({
      nameDish: 'Milanesa Napolitana',
      price: 15.99,
      available: true,
      typeDish: 'Plato Principal',
      imageUrl: '/images/milanesa.jpg',
    });
    const ravioles = await Menu.create({
      nameDish: 'Ravioles Ricotta y Espinaca',
      price: 14.5,
      available: true,
      typeDish: 'Plato Principal',
      imageUrl: '/images/ravioles.jpg',
    });
    const cesar = await Menu.create({
      nameDish: 'Ensalada César',
      price: 10.99,
      available: true,
      typeDish: 'Ensalada',
      imageUrl: '/images/cesar.jpg',
    });
    const agua = await Menu.create({
      nameDish: 'Agua con Gas 500ml',
      price: 2.5,
      available: true,
      typeDish: 'Bebida',
      imageUrl: '/images/agua.jpg',
    });
    console.log('✓ Menus');

    // --- Personalizaciones (sin timestamps en DishCustomization) ---
    const dcSinJamon = await DishCustomization.create({
      menuId: milanesa.id,
      name: 'Sin Jamón',
      description: 'Servir sin jamón',
      isRemovable: true,
      additionalPrice: 0,
      isDefaultIncluded: true,
      isRequired: false,
    });
    await DishCustomization.create({
      menuId: milanesa.id,
      name: 'Huevo Frito',
      description: 'Agrega un huevo',
      isRemovable: true,
      additionalPrice: 1.5,
      isDefaultIncluded: false,
      isRequired: false,
    });
    await DishCustomization.create({
      menuId: ravioles.id,
      name: 'Salsa Bolognesa',
      description: 'Cambiar salsa',
      isRemovable: true,
      additionalPrice: 0,
      isDefaultIncluded: false,
      isRequired: false,
    });
    const dcSinCrutones = await DishCustomization.create({
      menuId: cesar.id,
      name: 'Sin Crutones',
      description: 'Quitar crutones',
      isRemovable: true,
      additionalPrice: 0,
      isDefaultIncluded: true,
      isRequired: false,
    });
    await DishCustomization.create({
      menuId: agua.id,
      name: 'Sin Hielo',
      description: 'Servir sin hielo',
      isRemovable: true,
      additionalPrice: 0,
      isDefaultIncluded: false,
      isRequired: false,
    });
    console.log('✓ DishCustomizations');

    // --- Reservas ---
    await Promise.all([
      Booking.create({ userId: customer.id, bookingDate: new Date('2025-09-01T20:00:00Z'), numberPeople: 2 }),
      Booking.create({ userId: customer.id, bookingDate: new Date('2025-09-02T20:30:00Z'), numberPeople: 4 }),
    ]);
    console.log('✓ Bookings');

    // --- Órdenes (sin timestamps en Order) ---
    const order1 = await Order.create({
      customerId: customer.id,
      date: new Date('2025-09-03T12:00:00Z'),
      state: 'received',
      total_amount: 28.99,
      deliveryType: 'delivery',
      addressId: addr1.id,
      paymentType: 'cash',       // efectivo → paymentMethodId = null
      paymentMethodId: null,
    });

    const order2 = await Order.create({
      customerId: customer.id,
      date: new Date('2025-09-04T12:30:00Z'),
      state: 'preparing',
      total_amount: 19.49,
      deliveryType: 'in_place',
      addressId: null,
      paymentType: 'card',
      paymentMethodId: pm1.id,   // tarjeta guardada del usuario
    });
    console.log('✓ Orders');

    // --- Ítems de orden (sin timestamps en OrderItem) ---
    const it1 = await OrderItem.create({
      order_id: order1.id,
      menu_id: milanesa.id,
      quantity: 1,
      price: 15.99,
      notes: 'Bien cocida',
    });
    await OrderItem.create({
      order_id: order1.id,
      menu_id: agua.id,
      quantity: 2,
      price: 2.5,
      notes: 'Frías',
    });
    const it3 = await OrderItem.create({
      order_id: order2.id,
      menu_id: cesar.id,
      quantity: 1,
      price: 10.99,
      notes: 'Aderezo aparte',
    });
    console.log('✓ OrderItems');

    // --- Customizaciones por ítem ---
    await OrderItemCustomization.create({
      orderItemId: it1.id,
      customizationId: dcSinJamon.id,
      isIncluded: true,
      notes: null,
    });
    await OrderItemCustomization.create({
      orderItemId: it3.id,
      customizationId: dcSinCrutones.id,
      isIncluded: true,
      notes: 'Confirmar',
    });
    console.log('✓ OrderItemCustomizations');

    console.log('✅ Seed completado');
  } catch (err) {
    console.error('❌ Error en seed:', err);
  } finally {
    await sequelize.close();
  }
}

seed();
