import sequelize from '../config/dbConfig';
import User from '../models/User';
import Table from '../models/Table';
import Order from '../models/Order';
import Booking from '../models/Booking';
import Menu from '../models/Menu';
import Inventory from '../models/Inventory';

async function seedData() {
  try {
    // Sincroniza la base de datos antes de insertar los datos
    await sequelize.sync({ alter: true });

    await sequelize.query('SET foreign_key_checks = 0;');

   // Eliminar todos los datos existentes en las tablas dependientes primero
   await Order.truncate({ cascade: true });
   await Booking.truncate({ cascade: true });
   
   // Ahora podemos truncar las tablas sin problemas
   await User.truncate({ cascade: true });
   await Table.truncate({ cascade: true });
   await Menu.truncate({ cascade: true });
   await Inventory.truncate({ cascade: true });

   
    console.log('Datos existentes eliminados');

    // Insertar datos en la tabla `User`
    await User.bulkCreate([
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123', rol: 'Administrator' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', password: 'password456', rol: 'Customer' },
      { firstName: 'Carlos', lastName: 'Lopez', email: 'carlos.lopez@example.com', password: 'password789', rol: 'Waiter' },
    ]);

    // Insertar datos en la tabla `Table`
    await Table.bulkCreate([
      { tableNum: 1, ability: 4, state: 'available' },
      { tableNum: 2, ability: 2, state: 'reserved' },
      { tableNum: 3, ability: 6, state: 'available' },
      { tableNum: 4, ability: 2, state: 'available' },
    ]);

    // Insertar datos en la tabla `Menu`
    await Menu.bulkCreate([
      { nameDish: 'Pasta', price: 12.99, available: true },
      { nameDish: 'Pizza', price: 9.99, available: true },
      { nameDish: 'Burger', price: 8.99, available: true },
      { nameDish: 'Salad', price: 7.99, available: false },
    ]);

    // Insertar datos en la tabla `Inventory`
    await Inventory.bulkCreate([
      { name: 'Tomatoes', amount: 100, minimumThreshold: 20 },
      { name: 'Cheese', amount: 50, minimumThreshold: 10 },
      { name: 'Olive Oil', amount: 30, minimumThreshold: 5 },
      { name: 'Chicken', amount: 70, minimumThreshold: 15 },
    ]);

    // Obtener los usuarios creados
    const users = await User.findAll();

    // Insertar datos en la tabla `Booking`
    await Booking.bulkCreate([
      { userId: users[1].id, bookingDate: '2024-11-06', numberPeople: 4 },
      { userId: users[2].id, bookingDate: '2024-11-07', numberPeople: 2 },
    ]);

    // Insertar datos en la tabla `Order`
    await Order.bulkCreate([
      { customerId: users[1].id, date: '2024-11-06', state: 'preparation', total_amount: 30.99 },
      { customerId: users[1].id, date: '2024-11-06', state: 'ready', total_amount: 22.99 },
      { customerId: users[2].id, date: '2024-11-07', state: 'delivered', total_amount: 45.99 },
    ]);

    await sequelize.query('SET foreign_key_checks = 1;');
    console.log('Datos insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    await sequelize.close();
  }
}

seedData();
