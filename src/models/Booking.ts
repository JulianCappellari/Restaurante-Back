import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
import sequelize from '../config/dbConfig';
import User from './User';
import Table from './Table';
import BookingTable from './BookingTable';

export type Shift = 'lunch' | 'dinner';

export interface BookingAttributes {
  id: number;
  userId: number;
  date: string;                // YYYY-MM-DD
  shift: Shift;                // 'lunch' | 'dinner'
  numberPeople: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'no_show' | 'checked_in' | 'completed';
}

export type BookingCreationAttributes = Optional<BookingAttributes, 'id' | 'status'>;

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public userId!: number;
  public date!: string;
  public shift!: Shift;
  public numberPeople!: number;
  public status!: 'pending' | 'confirmed' | 'cancelled' | 'no_show' | 'checked_in' | 'completed';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Mixins generados por alias 'assignedTables'
  declare public addAssignedTables: BelongsToManyAddAssociationsMixin<Table, number>;
  declare public getAssignedTables: BelongsToManyGetAssociationsMixin<Table>;

  public static associations: {
    assignedTables: Association<Booking, Table>;
  };
}

Booking.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    shift: { type: DataTypes.ENUM('lunch', 'dinner'), allowNull: false },
    numberPeople: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'no_show', 'checked_in', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  { sequelize, modelName: 'Booking', tableName: 'bookings' }
);

// Las asociaciones reales se definen en Associations.ts
export default Booking;
