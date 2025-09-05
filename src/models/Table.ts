import { Model, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../config/dbConfig';
import TableSession from './TableSession';

class Table extends Model {
  public id!: number;
  public tableNum!: number;
  public ability!: number; // capacidad (2 o 4)
  public status!: 'available' | 'occupied' | 'reserved' | 'maintenance';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getSessions!: HasManyGetAssociationsMixin<TableSession>;
}

Table.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tableNum: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    ability: { type: DataTypes.INTEGER, allowNull: false, validate: { isIn: [[2, 4]] } },
    status: {
      type: DataTypes.ENUM('available', 'occupied', 'reserved', 'maintenance'),
      allowNull: false,
      defaultValue: 'available',
    },
  },
  {
    sequelize,
    modelName: 'Table',
    tableName: 'tables',
    scopes: {
      twoSeaters: { where: { ability: 2 } },
      fourSeaters: { where: { ability: 4 } },
    },
  }
);

export default Table;
