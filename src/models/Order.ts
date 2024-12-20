// src/models/Order.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import User from './User';

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
    type: DataTypes.ENUM('preparation', 'ready', 'delivered'),
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
});

Order.belongsTo(User, { foreignKey: 'customerId' });

export default Order;
