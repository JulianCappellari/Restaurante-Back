import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig";

interface PaymentMethodAttributes {
  id: number;
  name: string;
  cardHolderName?: string;
  cardNumber?: string; // hash
  last4?: string;
  expirationDate?: string;
  cvv?: string; // hash
  status: boolean;
  userId: number
}

interface PaymentMethodCreationAttributes
  extends Optional<
    PaymentMethodAttributes,
    "id" | "cardHolderName" | "cardNumber" | "last4" | "expirationDate" | "cvv"
  > {}

class PaymentMethod
  extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes>
  implements PaymentMethodAttributes
{
  public id!: number;
  public name!: string;
  public cardHolderName?: string;
  public cardNumber?: string;
  public last4?: string;
  public expirationDate?: string;
  public cvv?: string;
  public status!: boolean;
  public userId!: number;
}

PaymentMethod.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardHolderName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PaymentMethod",
    tableName: "payment_methods",
    timestamps: false,
  }
);

export default PaymentMethod;
