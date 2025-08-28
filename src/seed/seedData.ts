import sequelize from "../config/dbConfig";
import User from "../models/User";
import Table from "../models/Table";
import Order from "../models/Order";
import Booking from "../models/Booking";
import Menu from "../models/Menu";
import Inventory from "../models/Inventory";
import Address from "../models/Address";
import PaymentMethod from "../models/PaymentMethod";
import OrderItem from "../models/OrderItem";
import DishCustomization from "../models/DishCustomization";
import bcrypt from "bcrypt";

async function seedData() {
  try {
    // 1. Limpieza profunda de tablas (DROP TABLE IF EXISTS)
    // Primero deshabilitamos las verificaciones de claves foráneas
    await sequelize.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    
    // Luego eliminamos las tablas en el orden correcto para evitar violaciones de claves foráneas
    // Primero las tablas que tienen claves foráneas (dependientes)
    await sequelize.query(`DROP TABLE IF EXISTS order_item_customizations;`);
    await sequelize.query(`DROP TABLE IF EXISTS order_items;`);
    await sequelize.query(`DROP TABLE IF EXISTS orders;`);
    await sequelize.query(`DROP TABLE IF EXISTS bookings;`);
    await sequelize.query(`DROP TABLE IF EXISTS dish_customizations;`);
    await sequelize.query(`DROP TABLE IF EXISTS inventory;`);
    await sequelize.query(`DROP TABLE IF EXISTS payment_methods;`);
    await sequelize.query(`DROP TABLE IF EXISTS addresses;`);
    
    // Luego las tablas principales
    await sequelize.query(`DROP TABLE IF EXISTS menu;`); // Cambiado de 'menus' a 'menu'
    await sequelize.query(`DROP TABLE IF EXISTS tables;`);
    await sequelize.query(`DROP TABLE IF EXISTS users;`);
    
    // Finalmente, volvemos a habilitar las verificaciones de claves foráneas
    await sequelize.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    console.log("Tablas eliminadas correctamente");

    // 2. Sincroniza modelos (crea tablas limpias)
    await sequelize.sync({ force: true });
    console.log("Tablas creadas correctamente");

    // 3. Inserta datos en orden correcto
    // Usuarios
    const users = await User.bulkCreate([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "1436548211",
        password: await bcrypt.hash("password123", 10),
        rol: "Administrator",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "5436548216",
        password: await bcrypt.hash("password456", 10),
        rol: "Customer",
      },
      {
        firstName: "Carlos",
        lastName: "Lopez",
        email: "carlos.lopez@example.com",
        phone: "3436548213",
        password: await bcrypt.hash("password789", 10),
        rol: "Waiter",
      },
    ], { returning: true });

    // Mesas
    await Table.bulkCreate([
      { tableNum: 1, ability: 4, state: "available" },
      { tableNum: 2, ability: 2, state: "reserved" },
      { tableNum: 3, ability: 6, state: "available" },
      { tableNum: 4, ability: 2, state: "available" },
    ]);

    // Direcciones
    const addresses = await Address.bulkCreate([
      {
        street: "Calle Falsa",
        streetNumber: "123",
        city: "Córdoba",
        province: "Córdoba",
        postalCode: "5000",
        userId: users[0].id,
      },
      {
        street: "Avenida Siempre Viva",
        streetNumber: "742",
        city: "Córdoba",
        province: "Córdoba",
        postalCode: "5000",
        userId: users[1].id,
      },
      {
        street: "San Martín",
        streetNumber: "456",
        city: "Villa Allende",
        province: "Córdoba",
        postalCode: "5105",
        userId: users[2].id,
      },
      {
        street: "Belgrano",
        streetNumber: "987",
        city: "Córdoba",
        province: "Córdoba",
        postalCode: "5000",
        userId: users[1].id,
        floor: "2",
        apartment: "B",
      },
    ], { returning: true });

    // Menú - Platos Principales
    const menuItems = await Menu.bulkCreate([
      {
        nameDish: "Milanesa Napolitana con Papas Fritas",
        price: 15.99,
        available: true,
        typeDish: 'Plato Principal',
        imageUrl: '/images/milanesa-napolitana.jpg'
      },
      {
        nameDish: "Ravioles de Ricotta y Espinaca con Salsa Fileto",
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
      {
        nameDish: "Pechuga de Pollo a la Parrilla con Puré",
        price: 12.99,
        available: true,
        typeDish: 'Plato Principal',
        imageUrl: '/images/pollo-parrilla.jpg'
      },
      {
        nameDish: "Sorrentinos de Jamón y Queso con Salsa Cuatro Quesos",
        price: 16.50,
        available: true,
        typeDish: 'Plato Principal',
        imageUrl: '/images/sorrentinos.jpg'
      },
      // Ensaladas
      {
        nameDish: "Ensalada César con Pollo",
        price: 10.99,
        available: true,
        typeDish: 'Ensalada',
        imageUrl: '/images/cesar-pollo.jpg'
      },
      {
        nameDish: "Ensalada Capresse",
        price: 9.50,
        available: true,
        typeDish: 'Ensalada',
        imageUrl: '/images/capresse.jpg'
      },
      // Postres
      {
        nameDish: "Flan Casero con Dulce de Leche y Crema",
        price: 6.50,
        available: true,
        typeDish: 'Postre',
        imageUrl: '/images/flan-dulce-leche.jpg'
      },
      // Bebidas
      {
        nameDish: "Agua Mineral con Gas 500ml",
        price: 2.50,
        available: true,
        typeDish: 'Bebida',
        imageUrl: '/images/agua-gas.jpg'
      },
      {
        nameDish: "Gaseosa Linea Coca Cola 500ml",
        price: 3.00,
        available: true,
        typeDish: 'Bebida',
        imageUrl: '/images/gaseosa.jpg'
      }
    ], { returning: true });

    // Agregar personalizaciones a los platos
    // 1. Personalizaciones para Milanesa Napolitana
    await DishCustomization.bulkCreate([
      {
        menuId: menuItems[0].id,
        name: "Sin Jamón",
        description: "Se sirve sin jamón",
        isRemovable: true,
        additionalPrice: 0,
        isDefaultIncluded: true
      },
      {
        menuId: menuItems[0].id,
        name: "Sin Queso",
        description: "Se sirve sin queso",
        isRemovable: true,
        additionalPrice: 0,
        isDefaultIncluded: true
      },
      {
        menuId: menuItems[0].id,
        name: "Huevo Frito Extra",
        description: "Incluye un huevo frito adicional",
        isRemovable: true,
        additionalPrice: 1.50,
        isDefaultIncluded: false
      }
    ]);

    // 2. Personalizaciones para Ravioles
    await DishCustomization.bulkCreate([
      {
        menuId: menuItems[1].id,
        name: "Salsa Bolognesa",
        description: "Cambia la salsa fileto por bolognesa",
        isRemovable: true,
        additionalPrice: 0,
        isDefaultIncluded: false
      },
      {
        menuId: menuItems[1].id,
        name: "Queso Rayado Extra",
        description: "Agrega queso rayado extra",
        isRemovable: true,
        additionalPrice: 0.80,
        isDefaultIncluded: false
      }
    ]);

    // 3. Personalizaciones para Asado de Tira
    await DishCustomization.bulkCreate([
      {
        menuId: menuItems[2].id,
        name: "Punto de Cocción",
        description: "Seleccione el punto de cocción",
        isRemovable: false,
        additionalPrice: 0,
        isDefaultIncluded: true,
        isRequired: true
      },
      {
        menuId: menuItems[2].id,
        name: "Acompañamiento",
        description: "Elija su acompañamiento",
        isRemovable: false,
        additionalPrice: 0,
        isDefaultIncluded: true,
        isRequired: true
      }
    ]);

    // 4. Personalizaciones para Ensalada César
    await DishCustomization.bulkCreate([
      {
        menuId: menuItems[5].id,
        name: "Sin Crutones",
        description: "Se sirve sin crutones",
        isRemovable: true,
        additionalPrice: 0,
        isDefaultIncluded: true
      },
      {
        menuId: menuItems[5].id,
        name: "Aderezo Aparte",
        description: "El aderezo se sirve aparte",
        isRemovable: true,
        additionalPrice: 0,
        isDefaultIncluded: false
      },
      {
        menuId: menuItems[5].id,
        name: "Extra Pollo",
        description: "Agrega más pollo a la ensalada",
        isRemovable: true,
        additionalPrice: 2.50,
        isDefaultIncluded: false
      }
    ]);

    // 5. Personalizaciones para Gaseosas
    await DishCustomization.bulkCreate([
      {
        menuId: menuItems[9].id,
        name: "Sin Hielo",
        description: "Se sirve sin hielo",
        isRemovable: true,
        additionalPrice: 0,
        isDefaultIncluded: false
      },
      {
        menuId: menuItems[9].id,
        name: "Vaso con Limón",
        description: "Agrega rodajas de limón",
        isRemovable: true,
        additionalPrice: 0.50,
        isDefaultIncluded: false
      }
    ]);

    // Inventario
    await Inventory.bulkCreate([
      { name: "Tomatoes", amount: 100, minimumThreshold: 20 },
      { name: "Cheese", amount: 50, minimumThreshold: 10 },
      { name: "Olive Oil", amount: 30, minimumThreshold: 5 },
      { name: "Chicken", amount: 70, minimumThreshold: 15 },
    ]);

    // Métodos de pago asociados a usuarios válidos
    const card1 = "4111111111111111";
    const card2 = "5500000000000004";
    const cvv1 = "123";
    const cvv2 = "456";
    const paymentMethods = await PaymentMethod.bulkCreate([
      {
        name: "Visa Gold",
        cardHolderName: "Jane Smith",
        cardNumber: await bcrypt.hash(card1, 10),
        last4: card1.slice(-4),
        expirationDate: "12/26",
        cvv: await bcrypt.hash(cvv1, 10),
        status: true,
        userId: users[1].id,
      },
      {
        name: "Mastercard Black",
        cardHolderName: "Carlos Lopez",
        cardNumber: await bcrypt.hash(card2, 10),
        last4: card2.slice(-4),
        expirationDate: "11/27",
        cvv: await bcrypt.hash(cvv2, 10),
        status: true,
        userId: users[2].id,
      },
    ], { returning: true });

    // Bookings
    await Booking.bulkCreate([
      { userId: users[1].id, bookingDate: "2024-11-06", numberPeople: 4 },
      { userId: users[2].id, bookingDate: "2024-11-07", numberPeople: 2 },
    ]);

    // Órdenes para el cliente Jane Smith (users[1]) en todos los estados posibles
    const orders = await Order.bulkCreate([
      {
        customerId: users[1].id, // Jane Smith
        date: "2024-11-06",
        state: "received",
        total_amount: 20.99,
        deliveryType: "in_place",
        addressId: null,
        paymentType: "cash",
        paymentMethodId: null,
      },
      {
        customerId: users[1].id,
        date: "2024-11-07",
        state: "preparing",
        total_amount: 25.99,
        deliveryType: "in_place",
        addressId: null,
        paymentType: "cash",
        paymentMethodId: null,
      },
      {
        customerId: users[1].id,
        date: "2024-11-08",
        state: "ready",
        total_amount: 30.99,
        deliveryType: "in_place",
        addressId: null,
        paymentType: "cash",
        paymentMethodId: null,
      },
      {
        customerId: users[1].id,
        date: "2024-11-09",
        state: "on_the_way",
        total_amount: 35.99,
        deliveryType: "delivery",
        addressId: addresses[1].id,
        paymentType: "card",
        paymentMethodId: paymentMethods[0].id,
      },
      {
        customerId: users[1].id,
        date: "2024-11-10",
        state: "delivered",
        total_amount: 40.99,
        deliveryType: "delivery",
        addressId: addresses[1].id,
        paymentType: "card",
        paymentMethodId: paymentMethods[0].id,
      },
    ], { returning: true });

    // OrderItems para cada orden de Jane Smith
    await OrderItem.bulkCreate([
      {
        order_id: (orders[0] as any).id,
        menu_id: (menuItems[0] as any).id,
        quantity: 2,
        price: 12.99, // Precio del primer ítem del menú
        notes: "Sin queso",
      },
      {
        order_id: (orders[1] as any).id,
        menu_id: (menuItems[1] as any).id,
        quantity: 1,
        price: 14.99, // Precio del segundo ítem del menú
        notes: "Extra salsa",
      },
      {
        order_id: (orders[2] as any).id,
        menu_id: (menuItems[2] as any).id,
        quantity: 3,
        price: 10.50, // Precio del tercer ítem del menú
        notes: "Sin cebolla",
      },
      {
        order_id: (orders[3] as any).id,
        menu_id: (menuItems[3] as any).id,
        quantity: 1,
        price: 15.75, // Precio del cuarto ítem del menú
        notes: "Vegana",
      },
      {
        order_id: (orders[4] as any).id,
        menu_id: (menuItems[0] as any).id,
        quantity: 2,
        price: 12.99, // Mismo precio que el primer ítem
        notes: "Sin gluten",
      },
    ]);

    console.log("Datos insertados correctamente");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await sequelize.close();
  }
}

seedData();
