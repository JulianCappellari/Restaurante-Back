import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig";
import type User from "./User";
import type Order from "./Order";

export interface PaymentMethodAttributes {
  id: number;
  name: string;
  type: 'card' | 'mp';
  cardHolderName?: string;
  cardNumber?: string;   // hash
  last4?: string;
  expirationDate?: string;
  cvv?: string;          // hash
  isDefault: boolean;
  status: boolean;
  userId: number;

  // Asociaciones (solo tipado)
  user?: User;
  orders?: Order[];
}

export type PaymentMethodCreationAttributes = Optional<
  PaymentMethodAttributes,
  "id" | "cardHolderName" | "cardNumber" | "last4" | "expirationDate" | "cvv" | "isDefault" | "status"
>;

class PaymentMethod
  extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes>
  implements PaymentMethodAttributes
{
  public id!: number;
  public name!: string;
  public type!: 'card' | 'mp';
  public cardHolderName?: string;
  public cardNumber?: string;
  public last4?: string;
  public expirationDate?: string;
  public cvv?: string;
  public isDefault!: boolean;
  public status!: boolean;
  public userId!: number;

  // Asociaciones (solo tipado)
  public readonly user?: User;
  public readonly orders?: Order[];
}

PaymentMethod.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('card', 'mp'), allowNull: false },
    cardHolderName: { type: DataTypes.STRING, allowNull: true },
    cardNumber: { type: DataTypes.STRING, allowNull: true },
    last4: { type: DataTypes.STRING, allowNull: true },
    expirationDate: { type: DataTypes.STRING, allowNull: true },
    cvv: { type: DataTypes.STRING, allowNull: true },
    isDefault: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "PaymentMethod",
    tableName: "payment_methods",
    timestamps: false,
  }
);

export default PaymentMethod;
