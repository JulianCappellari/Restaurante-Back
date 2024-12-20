// src/models/Inventory.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class Inventory extends Model {}

Inventory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  minimumThreshold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Inventory',
  tableName: 'inventory',
});

export default Inventory;
