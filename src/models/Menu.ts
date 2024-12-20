// src/models/Menu.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class Menu extends Model {}

Menu.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameDish: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING, // Tipo string para la URL de la imagen
    allowNull: true, // Hacemos que sea opcional
  },
}, {
  sequelize,
  modelName: 'Menu',
  tableName: 'menu',
});

export default Menu;
