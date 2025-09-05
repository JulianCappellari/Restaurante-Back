import sequelize from '../config/dbConfig';

import User from './User';
import Address from './Address';
import Order from './Order';
import OrderItem from './OrderItem';
import OrderItemCustomization from './OrderItemCustomization';
import Menu from './Menu';
import PaymentMethod from './PaymentMethod';
import DishCustomization from './DishCustomization';
import Table from './Table';
import Booking from './Booking';
import TableSession from './TableSession';
import BookingTable from './BookingTable';

// Inicialización opcional (si existen)
Menu.initialize?.();
DishCustomization.initialize?.();

// User ↔ Address
User.hasMany(Address, { foreignKey: 'userId', as: 'addresses', onDelete: 'CASCADE' });
Address.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User ↔ Orders
User.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

// User ↔ PaymentMethod
User.hasMany(PaymentMethod, { foreignKey: 'userId', as: 'paymentMethods', onDelete: 'CASCADE' });
PaymentMethod.belongsTo(User, { foreignKey: 'userId', as: 'user' });
PaymentMethod.hasMany(Order, { foreignKey: 'paymentMethodId', as: 'orders' });

// Order ↔ Address
Order.belongsTo(Address, { foreignKey: 'addressId', as: 'deliveryAddress' });

// Menu ↔ DishCustomization
Menu.hasMany(DishCustomization, { foreignKey: 'menuId', as: 'dishCustomizations', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DishCustomization.belongsTo(Menu, { foreignKey: 'menuId', as: 'menu', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Order ↔ OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// OrderItem ↔ Menu
OrderItem.belongsTo(Menu, { foreignKey: 'menu_id', as: 'menu' });

// Order ↔ PaymentMethod
Order.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId', as: 'paymentMethod' });

// OrderItem ↔ OrderItemCustomization ↔ DishCustomization
OrderItem.hasMany(OrderItemCustomization, { foreignKey: 'orderItemId', as: 'customizations', onDelete: 'CASCADE' });
OrderItemCustomization.belongsTo(OrderItem, { foreignKey: 'orderItemId', as: 'orderItem', onDelete: 'CASCADE' });
OrderItemCustomization.belongsTo(DishCustomization, { foreignKey: 'customizationId', as: 'customization', onDelete: 'CASCADE' });

// Booking ↔ Table (N–N) — **UNA sola vez, sin duplicados**
Booking.belongsToMany(Table, {
  through: BookingTable,
  as: 'assignedTables',
  foreignKey: 'bookingId',
  otherKey: 'tableId',
});
Table.belongsToMany(Booking, {
  through: BookingTable,
  as: 'bookings',
  foreignKey: 'tableId',
  otherKey: 'bookingId',
});

// User ↔ Booking
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// TableSession (si lo usás)
Table.hasMany(TableSession, { foreignKey: 'tableId', as: 'sessions' });
TableSession.belongsTo(Table, { foreignKey: 'tableId', as: 'sessionTable' });

export {
  sequelize,
  User,
  Address,
  Order,
  OrderItem,
  OrderItemCustomization,
  Menu,
  PaymentMethod,
  DishCustomization,
  Table,
  Booking,
  TableSession,
  BookingTable,
};
