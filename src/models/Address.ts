import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/dbConfig";

interface AddressAttributes {
  id: number;
  userId: number;
  street: string;
  streetNumber: string;
  city: string;
  province: string;
  postalCode: string;
  floor?: string;
  apartment?: string;
}
interface AddressCreationAttributes
  extends Optional<AddressAttributes, "id" | "floor" | "apartment"> {}

class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public userId!: number;
  public street!: string;
  public streetNumber!: string;
  public city!: string;
  public province!: string;
  public postalCode!: string;
  public floor?: string;
  public apartment?: string;
}
Address.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    streetNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    floor: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    apartment: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
  })
  
  export default Address