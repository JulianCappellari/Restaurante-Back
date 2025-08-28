import sequelize from '../config/dbConfig';

import User from './User';
import Address from './Address';
import Order from './Order';
import OrderItem from './OrderItem';
import Menu from './Menu';
import PaymentMethod from './PaymentMethod';
import DishCustomization from './DishCustomization';

// 1) initialize solo donde existe initialize()
Menu.initialize();
DishCustomization.initialize();

// 2) associate
User.hasMany(Address, { foreignKey: 'userId', as: 'addresses', onDelete: 'CASCADE' });
Address.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.belongsTo(Address, { foreignKey: 'addressId', as: 'deliveryAddress' });

Menu.hasMany(DishCustomization, { foreignKey: 'menuId', as: 'dishCustomizations' });
DishCustomization.belongsTo(Menu, { foreignKey: 'menuId', as: 'menu' });

// OJO: usa los nombres de columnas reales del modelo OrderItem (snake_case)
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderItem.belongsTo(Menu,  { foreignKey: 'menu_id',  as: 'menu' });

Order.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId', as: 'paymentMethod' });

export { sequelize, User, Address, Order, OrderItem, Menu, PaymentMethod, DishCustomization };
