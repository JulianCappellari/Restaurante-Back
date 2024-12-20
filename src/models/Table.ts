// src/models/Table.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class Table extends Model {}

Table.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tableNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ability: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM('available', 'reserved'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Table',
  tableName: 'tables',
});

export default Table;
