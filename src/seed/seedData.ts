// src/seed/seed.ts
import bcrypt from 'bcrypt';
import sequelize from '../config/dbConfig';

// Carga modelos y asociaciones (Menu.initialize?, etc.)
import '../models/Associations';

import User from '../models/User';
import Address from '../models/Address';
import PaymentMethod from '../models/PaymentMethod';
import Table from '../models/Table';
import Inventory from '../models/Inventory';
import Menu from '../models/Menu';
import DishCustomization from '../models/DishCustomization';
import Booking from '../models/Booking';
import BookingTable from '../models/BookingTable';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import OrderItemCustomization from '../models/OrderItemCustomization';

async function seed() {
  try {
    // Limpieza (usa nombres reales de tablas)
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    const drops = [
      'table_sessions',
      'booking_tables',
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

    // Crear schema
    await sequelize.sync({ force: true });
    console.log('✓ Tablas sincronizadas');

    // --- Usuarios ---
    const [adminPass, waiterPass, custPass, receptionistPass, chefPass] = await Promise.all([
      bcrypt.hash('admin123', 10),
      bcrypt.hash('waiter123', 10),
      bcrypt.hash('customer123', 10),
      bcrypt.hash('receptionist123', 10),
      bcrypt.hash('chef123', 10),
    ]);

    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@restaurant.com',
      phone: '+541111111111',
      password: adminPass,
      role: 'Administrator',
    });

    const waiter = await User.create({
      firstName: 'John',
      lastName: 'Waiter',
      email: 'waiter@restaurant.com',
      phone: '+541122222222',
      password: waiterPass,
      role: 'Waiter',
    });

    const receptionist = await User.create({
      firstName: 'Sarah',
      lastName: 'Receptionist',
      email: 'reception@restaurant.com',
      phone: '+541144444444',
      password: receptionistPass,
      role: 'Receptionist',
    });

    const chef = await User.create({
      firstName: 'Carlos',
      lastName: 'Chef',
      email: 'chef@restaurant.com',
      phone: '+541155555555',
      password: chefPass,
      role: 'Chef',
    });

    const customer = await User.create({
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria@example.com',
      phone: '+541133333333',
      password: custPass,
      role: 'Customer',
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

    // --- Métodos de pago ---
    const rawCard = '4111111111111111';
    const rawCvv = '123';
    const pm1 = await PaymentMethod.create({
      name: 'Visa Gold',
      type: 'card',
      isDefault: true,
      cardHolderName: 'MARIA GARCIA',
      cardNumber: await bcrypt.hash(rawCard, 10),
      last4: rawCard.slice(-4),
      expirationDate: '12/26',
      cvv: await bcrypt.hash(rawCvv, 10),
      status: true,
      userId: customer.id,
    });
    console.log('✓ PaymentMethods');

    // --- Mesas (solo 2 y 4) ---
    const tables = await Promise.all([
      // 2 personas
      Table.create({ tableNum: 1, ability: 2, status: 'available' }),
      Table.create({ tableNum: 2, ability: 2, status: 'available' }),
      Table.create({ tableNum: 3, ability: 2, status: 'available' }),
      Table.create({ tableNum: 4, ability: 2, status: 'reserved' }),

      // 4 personas
      Table.create({ tableNum: 5, ability: 4, status: 'available' }),
      Table.create({ tableNum: 6, ability: 4, status: 'available' }),
      Table.create({ tableNum: 7, ability: 4, status: 'available' }),
      Table.create({ tableNum: 8, ability: 4, status: 'reserved' }),
    ]);
    console.log('✓ Tables');

    // --- Inventario ---
    await Promise.all([
      Inventory.create({ name: 'Tomatoes', amount: 100, minimumThreshold: 20 }),
      Inventory.create({ name: 'Cheese', amount: 50, minimumThreshold: 10 }),
      Inventory.create({ name: 'Olive Oil', amount: 30, minimumThreshold: 5 }),
    ]);
    console.log('✓ Inventory');

    // --- Menú ---
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

    // --- Personalizaciones ---
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

// ---- Reservas (date+shift, N–N) ----
    // 2025-01-15 (DINNER): ocupar mesas #5 y #6 (4pax) y #1,#2 (2pax)
    const b1 = await Booking.create({ userId: customer.id, date: '2025-09-15', shift: 'dinner', numberPeople: 4, status: 'confirmed' });
    const b2 = await Booking.create({ userId: customer.id, date: '2025-09-15', shift: 'dinner', numberPeople: 4, status: 'confirmed' });
    const b3 = await Booking.create({ userId: customer.id, date: '2025-09-15', shift: 'dinner', numberPeople: 2, status: 'confirmed' });
    const b4 = await Booking.create({ userId: customer.id, date: '2025-09-15', shift: 'dinner', numberPeople: 2, status: 'confirmed' });
    await BookingTable.create({ bookingId: b1.id, tableId: tables[4].id }); // #5
    await BookingTable.create({ bookingId: b2.id, tableId: tables[5].id }); // #6
    await BookingTable.create({ bookingId: b3.id, tableId: tables[0].id }); // #1
    await BookingTable.create({ bookingId: b4.id, tableId: tables[1].id }); // #2

    // 2025-01-20 (LUNCH): FULL (todas las mesas #1..#8 ocupadas)
    const lunchFullDate = '2025-09-20';
    const bookingsLunchFull = await Promise.all([
      Booking.create({ userId: customer.id, date: lunchFullDate, shift: 'lunch', numberPeople: 2, status: 'confirmed' }),
      Booking.create({ userId: customer.id, date: lunchFullDate, shift: 'lunch', numberPeople: 2, status: 'confirmed' }),
      Booking.create({ userId: customer.id, date: lunchFullDate, shift: 'lunch', numberPeople: 2, status: 'confirmed' }),
      Booking.create({ userId: customer.id, date: lunchFullDate, shift: 'lunch', numberPeople: 2, status: 'confirmed' }),
      Booking.create({ userId: customer.id, date: lunchFullDate, shift: 'lunch', numberPeople: 4, status: 'confirmed' }),
      Booking.create({ userId: customer.id, date: lunchFullDate, shift: 'lunch', numberPeople: 4, status: 'confirmed' }),
      Booking.create({ userId: customer.id, date: lunchFullDate, shift: 'lunch', numberPeople: 4, status: 'confirmed' }),
      Booking.create({ userId: customer.id, date: lunchFullDate, shift: 'lunch', numberPeople: 4, status: 'confirmed' }),
    ]);
    // mapear a mesas 1..8
    for (let i = 0; i < 8; i++) {
      await BookingTable.create({ bookingId: bookingsLunchFull[i].id, tableId: tables[i].id });
    }

    // 2025-01-21 (LUNCH): solo dos mesas de 2 ocupadas (#1 y #2) → quedan #3,#4 y todas las de 4 libres
    const b5 = await Booking.create({ userId: customer.id, date: '2025-09-21', shift: 'lunch', numberPeople: 2, status: 'confirmed' });
    const b6 = await Booking.create({ userId: customer.id, date: '2025-09-21', shift: 'lunch', numberPeople: 2, status: 'confirmed' });
    await BookingTable.create({ bookingId: b5.id, tableId: tables[0].id }); // #1
    await BookingTable.create({ bookingId: b6.id, tableId: tables[1].id }); // #2

    // 2025-01-21 (DINNER): ejemplo de grupo de 6 con 4+2 (#5 y #3)
    const b7 = await Booking.create({ userId: customer.id, date: '2025-09-21', shift: 'dinner', numberPeople: 6, status: 'confirmed' });
    await BookingTable.create({ bookingId: b7.id, tableId: tables[4].id }); // #5 (4pax)
    await BookingTable.create({ bookingId: b7.id, tableId: tables[2].id }); // #3 (2pax)

    console.log('✓ Bookings');
    const order1 = await Order.create({
      customerId: customer.id,
      date: new Date('2025-09-03T12:00:00Z'),
      state: 'received',
      total_amount: 28.99,
      deliveryType: 'delivery',
      addressId: addr1.id,
      paymentType: 'cash',       // efectivo ⇒ paymentMethodId = null por hook
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
      paymentMethodId: pm1.id,   // tarjeta del usuario
    });
    console.log('✓ Orders');

    // --- Ítems de orden ---
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
