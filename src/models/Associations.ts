import sequelize from '../config/dbConfig';

import User from './User';
import Address from './Address';
import Order from './Order';
import OrderItem from './OrderItem';
import OrderItemCustomization from './OrderItemCustomization';
import Menu from './Menu';
import PaymentMethod from './PaymentMethod';
import DishCustomization from './DishCustomization';

// inicialización solo en modelos que exponen initialize()
Menu.initialize();
DishCustomization.initialize();

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


// Order ↔ Address (entrega)
Order.belongsTo(Address, { foreignKey: 'addressId', as: 'deliveryAddress' });

// Menu ↔ DishCustomization
Menu.hasMany(DishCustomization, { foreignKey: 'menuId', as: 'dishCustomizations', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DishCustomization.belongsTo(Menu, { foreignKey: 'menuId', as: 'menu', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Order ↔ OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });           // único uso del alias 'items'
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// OrderItem ↔ Menu
OrderItem.belongsTo(Menu, { foreignKey: 'menu_id', as: 'menu' });

// Order ↔ PaymentMethod
Order.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId', as: 'paymentMethod' });

OrderItem.hasMany(OrderItemCustomization, { foreignKey: 'orderItemId', as: 'customizations', onDelete: 'CASCADE' });
OrderItemCustomization.belongsTo(OrderItem, { foreignKey: 'orderItemId', as: 'orderItem', onDelete: 'CASCADE' });

OrderItemCustomization.belongsTo(DishCustomization, { foreignKey: 'customizationId', as: 'customization', onDelete: 'CASCADE' });

export { sequelize, User, Address, Order, OrderItem, Menu, PaymentMethod, DishCustomization };
