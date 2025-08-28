import { Sequelize } from 'sequelize';
import config from '../config/dbConfig';

// Importar modelos
import User from './User';
import Table from './Table';
import Order from './Order';
import Booking from './Booking';
import Menu from './Menu';
import Inventory from './Inventory';
import Address from './Address';
import PaymentMethod from './PaymentMethod';
import OrderItem from './OrderItem';
import DishCustomization from './DishCustomization';
import OrderItemCustomization from './OrderItemCustomization';

// Inicializar la conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.host,
  port: config.port,
  database: config.database,
  username: config.username,
  password: config.password,
  logging: false,
});

// Inicializar modelos
const models = {
  User: User.initialize(sequelize),
  Table: Table.initialize(sequelize),
  Order: Order.initialize(sequelize),
  Booking: Booking.initialize(sequelize),
  Menu: Menu.initialize(sequelize),
  Inventory: Inventory.initialize(sequelize),
  Address: Address.initialize(sequelize),
  PaymentMethod: PaymentMethod.initialize(sequelize),
  OrderItem: OrderItem.initialize(sequelize),
  DishCustomization: DishCustomization.initialize(sequelize),
  OrderItemCustomization: OrderItemCustomization.initialize(sequelize),
};

// Importar y configurar asociaciones
import './Associations';

// Asociar modelos
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

export {
  sequelize,
  Sequelize,
  User,
  Table,
  Order,
  Booking,
  Menu,
  Inventory,
  Address,
  PaymentMethod,
  OrderItem,
  DishCustomization,
  OrderItemCustomization,
};

export default models;
