// src/models/TableSession.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/dbConfig";
import Table from "./Table";
import Booking from "./Booking";

// Types for TableSession attributes
export interface ITableSessionAttributes {
  id: number;
  tableId: number;
  bookingId: number | null;
  startedAt: Date;
  endedAt: Date | null;
  partySize: number;
  status: "active" | "closed";
  notes?: string | null;
  waiterId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Input types for TableSession creation
export interface ITableSessionCreationAttributes
  extends Optional<
    ITableSessionAttributes,
    "id" | "status" | "endedAt" | "notes" | "waiterId"
  > {}

class TableSession
  extends Model<ITableSessionAttributes, ITableSessionCreationAttributes>
  implements ITableSessionAttributes
{
  public id!: number;
  public tableId!: number;
  public bookingId!: number | null;
  public startedAt!: Date;
  public endedAt!: Date | null;
  public partySize!: number;
  public status!: "active" | "closed";
  public notes!: string | null;
  public waiterId!: number | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public table?: Table;
  public booking?: Booking | null;

  // Instance methods
  public async endSession(): Promise<void> {
    this.endedAt = new Date();
    this.status = "closed";
    await this.save();

    // Update table status
    const table = await Table.findByPk(this.tableId);
    if (table) {
      table.status = "available";
      await table.save();
    }
  }

  public async extendSession(minutes: number): Promise<void> {
    if (this.status === "active") {
      await this.update({}); // This will update the updatedAt timestamp
    }
  }
}

TableSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tables",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "bookings",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    waiterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    partySize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 20,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "closed"),
      allowNull: false,
      defaultValue: "active",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TableSession",
    tableName: "table_sessions",
    timestamps: true,
    indexes: [
      { fields: ["tableId", "status", "startedAt"] },
      { fields: ["bookingId"] },
      { fields: ["waiterId"] },
      { fields: ["status"] },
    ],
    // src/models/TableSession.ts (solo hooks y updates relevantes)
    hooks: {
      beforeCreate: async (session: TableSession) => {
        const table = await Table.findByPk(session.tableId);
        if (!table) throw new Error("Table not found");

        const isReservedCheckIn =
          table.status === "reserved" && !!session.bookingId;
        const isAvailable = table.status === "available";

        if (!isAvailable && !isReservedCheckIn) {
          throw new Error("Table is not available");
        }
        table.status = "occupied";
        await table.save();
      },
      afterDestroy: async (session: TableSession) => {
        const count = await TableSession.count({
          where: { tableId: session.tableId, status: "active" },
        });
        if (count === 0) {
          const table = await Table.findByPk(session.tableId);
          if (table) {
            table.status = "available";
            await table.save();
          }
        }
      },
    },
  }
);

// Associations
TableSession.belongsTo(Table, {
  foreignKey: "tableId",
  as: "table",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

TableSession.belongsTo(Booking, {
  foreignKey: "bookingId",
  as: "booking",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

export default TableSession;
