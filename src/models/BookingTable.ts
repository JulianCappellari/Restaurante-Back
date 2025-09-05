import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class BookingTable extends Model {
  public id!: number;
  public bookingId!: number;
  public tableId!: number;
}

BookingTable.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bookingId: { type: DataTypes.INTEGER, allowNull: false },
    tableId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'BookingTable',
    tableName: 'booking_tables',
    timestamps: true,
    indexes: [{ unique: true, fields: ['bookingId', 'tableId'] }],
  }
);

export default BookingTable;
