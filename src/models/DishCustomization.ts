import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConfig';
import Menu from './Menu';

interface DishCustomizationAttributes {
  id: number;
  menuId: number;
  name: string;
  description: string | null;
  isRemovable: boolean;
  additionalPrice: number;
  isDefaultIncluded: boolean;
  isRequired: boolean;
}
type Creation = Optional<DishCustomizationAttributes, 'id'>;

class DishCustomization
  extends Model<DishCustomizationAttributes, Creation>
  implements DishCustomizationAttributes {
  public id!: number;
  public menuId!: number;
  public name!: string;
  public description!: string | null;
  public isRemovable!: boolean;
  public additionalPrice!: number;
  public isDefaultIncluded!: boolean;
  public isRequired!: boolean;

  public static initialize() {
    DishCustomization.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      menuId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.STRING(255), allowNull: true },
      isRemovable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      additionalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      isDefaultIncluded: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      isRequired: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    }, {
      sequelize,
      modelName: 'DishCustomization',
      tableName: 'dish_customizations',
      timestamps: false,
      underscored: false, // createdAt/updatedAt en camelCase
    });
  }

  public static associate() {
    DishCustomization.belongsTo(Menu, {
      foreignKey: 'menuId',
      as: 'menu',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default DishCustomization;
