// src/models/Booking.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import User from './User';

class Booking extends Model {}

Booking.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  numberPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
}, {
  sequelize,
  modelName: 'Booking',
  tableName: 'bookings',
});

Booking.belongsTo(User, { foreignKey: 'userId' });

export default Booking;
