import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConfig';
import DishCustomization from './DishCustomization';

export interface MenuAttributes {
  id: number;
  nameDish: string;
  price: number;
  available: boolean;
  imageUrl?: string | null;
  typeDish: 'Entrada' | 'Plato Principal' | 'Postre' | 'Bebida' | 'Ensalada' | 'Guarnicion';
}
export interface MenuCreationAttributes extends Optional<MenuAttributes, 'id'> {}

class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  public id!: number;
  public nameDish!: string;
  public price!: number;
  public available!: boolean;
  public imageUrl?: string | null;
  public typeDish!: MenuAttributes['typeDish'];

  public static initialize() {
    Menu.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nameDish: { type: DataTypes.STRING(100), allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      available: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      imageUrl: { type: DataTypes.STRING(255), allowNull: true },
      typeDish: { type: DataTypes.ENUM('Entrada','Plato Principal','Postre','Bebida','Ensalada','Guarnicion'), allowNull: false },

    }, {
      sequelize,
      modelName: 'Menu',
      tableName: 'menus',
      timestamps: false,
      underscored: false, // columnas camelCase en DB
    });
  }

  public static associate() {
    Menu.hasMany(DishCustomization, {
      foreignKey: 'menuId',              // ← coincide con columna DB camelCase
      as: 'dishCustomizations',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default Menu;
