// src/models/Order.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import User from './User';
import Address from './Address';
import OrderItem from './OrderItem';
import PaymentMethod from './PaymentMethod';

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM('received', 'preparing', 'ready', 'on_the_way', 'delivered'),
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  deliveryType: {
    type: DataTypes.ENUM('in_place', 'delivery'),
    allowNull: false,
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: true, // puede ser null si es 'in_place'
    references: {
      model: Address,
      key: 'id',
    },
  },
  paymentType: {
    type: DataTypes.ENUM('cash', 'card', 'mp'),
    allowNull: false,
  },
  paymentMethodId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true, // null si es efectivo
    references: {
      model: 'payment_methods', // o el nombre de tu tabla de métodos de pago
      key: 'id',
    },
  },

}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
});

Order.belongsTo(User, { foreignKey: 'customerId' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
Order.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });

export default Order;
